/* ═══════════════════════════════════════════════════════════════════
   172 · كنّاسُ التسجيلات — لا يبقى صوتُ طالبٍ أكثر من سبعة أيام

   لماذا:
   صفحةُ الخصوصية (`b162`) تعد: «يُحذف التسجيل الصوتي نهائياً وتلقائياً
   خلال ٧ أيام من تسجيله». و`171` أنشأ المخزن. **فهذا الوعدُ يُنفَّذ هنا،
   قبل أن تُفتح واجهةُ التسجيل** (الخطوة ٣) — فلا تسجيلَ يسبق حذفَه.

   🔑 كيف يعمل:
   ① `pg_cron` كلَّ ست ساعات ⇐ `pg_net` ينادي الدالّةَ الطرفيّة
      `recordings-sweep` ومعه مفتاحٌ من Vault.
   ② الدالّةُ تسأل `recordings_sweep_due` عمّا يُحذف ⇐ تحذفه **بـStorage API**
      ⇐ تُخبر `recordings_sweep_done` فتختم الصفوفَ وتكتب سطراً في السجلّ.
   🔴 **والحذفُ بـStorage API لا بـSQL:** حذفُ صفٍّ من `storage.objects`
      يُيتّم الملفَّ في التخزين — يغيب اسمُه ويبقى صوتُه. فالقاعدةُ تقول
      «ماذا»، والدالّةُ تحذف.

   📐 الحساب — لماذا ستّة أيام لا سبعة:
      يمرّ الكنّاسُ كلَّ ستّ ساعات، ويحذف ما جاوز ستّة أيام. ⇒ أطولُ عمرٍ
      لتسجيل = ٦ أيام + ٦ ساعات، **ويبقى هامشُ ١٨ ساعة** تتّسع لمرورٍ يفشل
      ثمّ يُعاد. ولو كان الحدُّ سبعة لكان الوعدُ يُخلَف عند أوّل تعثّر.
   📐 ويحذف أيضاً **اليتيم**: ملفٌّ بلا صفٍّ حيّ جاوز ساعة (مثلاً صاحبُه حذف
      حسابَه فسقط صفُّه بالتتابع). والساعةُ أطولُ من نافذة الرفع (١٥ دقيقة
      في `171`) فلا يُحذف ملفٌّ في طريقه.

   🔒 المفتاح:
      يُولَّد **داخل القاعدة** ويسكن Vault، ولا يمرّ بيد أحد ولا بهذا الملفّ.
      يقرؤه cron فيرسله، والدالّتان تطابقانه. فلا سرَّ يُلصق في إعدادات
      الدالّة الطرفيّة، ومن نادى الرابطَ بلا مفتاحٍ رُدّ (`403`).
      والدالّتان لـ`service_role` وحده — لا يناديهما متصفّح.

   📊 والسجلّ `recording_sweeps` يجعل الوعدَ **مرئيّاً**: كلُّ مرورٍ سطر،
      و`overdue_left > 0` إنذارٌ صريح (ملفٌّ جاوز ستّة أيام وبقي).
   ═══════════════════════════════════════════════════════════════════ */

begin;

/* ───────────────────────────── منشأة ───────────────────────────── */

/* ① الإضافتان — جزءٌ من Supabase، والدوالّ الطرفيّة مُقرّةٌ للحذف (AGENTS) */
create extension if not exists pg_cron;
create extension if not exists pg_net with schema extensions;

/* ② المفتاح — يُولَّد مرّةً ولا يُكتب في ملف (٢٤٤ بتاً من عشوائيّة uuid v4) */
do $sec$
begin
  if not exists (select 1 from vault.secrets where name = 'recordings_sweep_secret') then
    perform vault.create_secret(
      replace(gen_random_uuid()::text, '-', '') || replace(gen_random_uuid()::text, '-', ''),
      'recordings_sweep_secret',
      'مفتاحُ كنّاس التسجيلات (172): يرسله cron، وتطابقه recordings_sweep_due و recordings_sweep_done');
  end if;
end $sec$;

/* ③ السجلّ — كلُّ مرورٍ سطر */
create table if not exists public.recording_sweeps (
  id           bigint generated always as identity primary key,
  ran_at       timestamptz not null default now(),
  listed       integer not null,
  removed      integer not null,
  marked       integer not null,
  overdue_left integer not null,
  note         text
);
comment on table public.recording_sweeps is
  'سجلُّ مرور كنّاس التسجيلات (172). overdue_left > 0 ⇒ ملفٌّ جاوز ستّة أيام وبقي — إنذار';

alter table public.recording_sweeps enable row level security;
revoke all on public.recording_sweeps from anon, authenticated;
grant select on public.recording_sweeps to authenticated;

do $pol$
begin
  if exists (select 1 from pg_policies where schemaname = 'public' and tablename = 'recording_sweeps'
                                         and policyname = 'recording_sweeps_admin') then
    alter policy recording_sweeps_admin on public.recording_sweeps to authenticated using (is_admin());
  else
    create policy recording_sweeps_admin on public.recording_sweeps for select to authenticated using (is_admin());
  end if;
end $pol$;

/* ④ مطابقةُ المفتاح — داخليّة، لا يناديها أحدٌ من خارج */
create or replace function public.recordings_sweep_ok(p_secret text)
returns boolean language sql stable security definer set search_path to 'public'
as $function$
  select coalesce(length(p_secret), 0) >= 32 and exists (
    select 1 from vault.decrypted_secrets
     where name = 'recordings_sweep_secret' and decrypted_secret = p_secret
  );
$function$;

/* ⑤ ماذا يُحذف — مصفوفةُ أسماءٍ داخل المخزن، الأقدمُ أوّلاً */
create or replace function public.recordings_sweep_due(p_secret text, p_limit integer default 500)
returns jsonb language plpgsql stable security definer set search_path to 'public'
as $function$
begin
  if not recordings_sweep_ok(p_secret) then
    raise exception 'مفتاحُ الكنّاس غير صحيح' using errcode = '42501';
  end if;

  return coalesce((
    select jsonb_agg(d.name order by d.created_at)
      from (select o.name, o.created_at
              from storage.objects o
             where o.bucket_id = 'recordings'
               and (o.created_at < now() - interval '6 days'
                    or (o.created_at < now() - interval '1 hour'
                        and not exists (select 1 from recordings r
                                         where r.path = o.name and r.deleted_at is null)))
             order by o.created_at
             limit greatest(1, least(coalesce(p_limit, 500), 1000))) d
  ), '[]'::jsonb);
end $function$;

/* ⑥ بعد الحذف — يختم كلَّ صفٍّ حيٍّ غاب ملفُّه، ويكتب سطرَ المرور.
   والختمُ بالواقع لا بقائمة الدالّة: «غاب الملفُّ» يُقرأ من المخزن نفسه —
   فيشمل ما حُذف الآن، وصفّاً لم يُرفع ملفُّه قطّ (جاوز ساعة). */
create or replace function public.recordings_sweep_done(p_secret text, p_listed integer,
                                                        p_removed integer, p_note text default null)
returns jsonb language plpgsql volatile security definer set search_path to 'public'
as $function$
declare v_marked int; v_left int;
begin
  if not recordings_sweep_ok(p_secret) then
    raise exception 'مفتاحُ الكنّاس غير صحيح' using errcode = '42501';
  end if;

  update recordings r set deleted_at = now()
   where r.deleted_at is null
     and r.created_at < now() - interval '1 hour'
     and not exists (select 1 from storage.objects o
                      where o.bucket_id = 'recordings' and o.name = r.path);
  get diagnostics v_marked = row_count;

  select count(*) into v_left from storage.objects o
   where o.bucket_id = 'recordings' and o.created_at < now() - interval '6 days';

  insert into recording_sweeps (listed, removed, marked, overdue_left, note)
  values (coalesce(p_listed, 0), coalesce(p_removed, 0), v_marked, v_left, left(p_note, 500));

  return jsonb_build_object('marked', v_marked, 'overdue_left', v_left);
end $function$;

revoke all on function public.recordings_sweep_ok(text)                           from public, anon, authenticated;
revoke all on function public.recordings_sweep_due(text, integer)                 from public, anon, authenticated;
revoke all on function public.recordings_sweep_done(text, integer, integer, text) from public, anon, authenticated;
grant execute on function public.recordings_sweep_due(text, integer)                 to service_role;
grant execute on function public.recordings_sweep_done(text, integer, integer, text) to service_role;

/* ⑦ الموعد — كلَّ ست ساعات عند الدقيقة ١٧ (لا عند رأس الساعة حيث تتزاحم المهامّ).
   و`cron.schedule` باسمٍ قائمٍ يُحدّثه — فالملفُّ يُعاد تشغيله. */
select cron.schedule(
  'recordings-sweep',
  '17 */6 * * *',
  $job$
  select net.http_post(
    url     := 'https://tjzrfevymfpktfuormhs.supabase.co/functions/v1/recordings-sweep',
    headers := jsonb_build_object(
                 'Content-Type', 'application/json',
                 'x-sweep-secret', (select decrypted_secret from vault.decrypted_secrets
                                     where name = 'recordings_sweep_secret')),
    body    := '{}'::jsonb,
    timeout_milliseconds := 60000);
  $job$
);

/* ───────────────────────── السجلّ ───────────────────────── */

insert into public.sql_log (n, title, applied_at)
values ('172', 'كنّاسُ التسجيلات — لا يبقى صوتُ طالبٍ أكثر من سبعة أيام', now())
on conflict (n) do update set applied_at = now();

commit;
