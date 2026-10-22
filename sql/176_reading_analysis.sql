/* ═══════════════════════════════════════════════════════════════════
   176 · تجربةُ التحليل الآليّ للقراءة الجهريّة — Gemini، والنتيجةُ للمالك وحده

   لماذا:
   الخطوةُ ٥ من خمس، **تجربةً لا ميزة.** قرارُ المالك (٢٢ أكتوبر): Gemini
   بمفتاحٍ من مشروعٍ مدفوع (فلا تُدرَّب نماذجُ Google على التسجيلات).
   والتجربةُ على **تسجيلاتٍ من المالك لا من الطلّاب**: يقرأ ويتعمّد أخطاءً،
   ثمّ نرى ما التقطه النموذجُ وما اخترعه — **قبل أن يقرأ طالبٌ حكماً واحداً منه.**

   🔒 ثلاثةُ أحكام:
   ① **النتيجةُ لا يقرؤها إلا المشرف** (`reading_analyses` · سياسةُ `is_admin()`
      وحدها). لا واجهةَ للطالب ولا للمعلّم بعد — فالحكمُ الذي لم يُقَس لا يُعرض.
   ② **والدالّةُ الطرفيّة لا يناديها متصفّح:** مفتاحٌ يُولَّد داخل القاعدة ويسكن
      Vault (نمطُ `172`)، فتُنادى من SQL وحدَه (`pg_net`) — يدويّاً في التجربة،
      وبالمؤقّت يومَ تصير ميزة.
   ③ **والنتيجةُ تبقى بعد حذف الصوت** — هي «نتيجةُ التحليل» التي تعدها الخصوصية
      §٢ أثراً. والمسارُ يُحفظ نصّاً لا مفتاحاً أجنبيّاً: ملفُّ التجربة قد لا صفَّ له.

   ⚠️ **وقبل أن يُحلَّل تسجيلُ طالبٍ واحد (لا في هذه التجربة):** صفحةُ الخصوصية
      §٦ تقول «عدم الاحتفاظ بالتسجيل بعد إتمام التحليل»، **ومفتاحُ Gemini يُبقي
      الطلبات مدّةً محدودة لمراقبة سوء الاستخدام** ⇒ تعديلُ العبارة وتسميةُ Google
      — عملُ المستشار القانوني. وإبلاغُ من وافق على النسخة السابقة (§١٢).
   ═══════════════════════════════════════════════════════════════════ */

begin;

/* ───────────────────────────── منشأة ───────────────────────────── */

/* ① المفتاح — يُولَّد مرّةً داخل القاعدة ولا يمرّ بملفّ ولا بيد */
do $sec$
begin
  if not exists (select 1 from vault.secrets where name = 'reading_analyze_secret') then
    perform vault.create_secret(
      replace(gen_random_uuid()::text, '-', '') || replace(gen_random_uuid()::text, '-', ''),
      'reading_analyze_secret',
      'مفتاحُ دالّة تحليل القراءة الجهرية (176): يرسله SQL، وتطابقه reading_analyze_ok');
  end if;
end $sec$;

/* ② النتائج */
create table if not exists public.reading_analyses (
  id            bigint generated always as identity primary key,
  recording_id  bigint references public.recordings(id) on delete set null,
  path          text not null,
  lang          text not null check (lang in ('ar', 'en')),
  model         text not null,
  reference     text not null,
  transcript    text,
  alignment     jsonb,
  feedback      jsonb,
  error         text,
  ms            integer,
  created_at    timestamptz not null default now()
);
comment on table public.reading_analyses is
  'تجربةُ التحليل الآليّ للقراءة الجهرية (176): النصُّ المسموع · المقارنةُ بنصّ الدرس · ملاحظةُ النموذج. للمشرف وحده حتى تُقاس';

alter table public.reading_analyses enable row level security;
revoke all on public.reading_analyses from anon, authenticated;
grant select on public.reading_analyses to authenticated;

do $pol$
begin
  if exists (select 1 from pg_policies where schemaname = 'public' and tablename = 'reading_analyses'
                                         and policyname = 'reading_analyses_admin') then
    alter policy reading_analyses_admin on public.reading_analyses to authenticated using (is_admin());
  else
    create policy reading_analyses_admin on public.reading_analyses for select to authenticated using (is_admin());
  end if;
end $pol$;

/* ③ مطابقةُ المفتاح — لـservice_role وحده (تناديها الدالّةُ الطرفيّة) */
create or replace function public.reading_analyze_ok(p_secret text)
returns boolean language sql stable security definer set search_path to 'public'
as $function$
  select coalesce(length(p_secret), 0) >= 32 and exists (
    select 1 from vault.decrypted_secrets
     where name = 'reading_analyze_secret' and decrypted_secret = p_secret
  );
$function$;

revoke all on function public.reading_analyze_ok(text) from public, anon, authenticated;
grant execute on function public.reading_analyze_ok(text) to service_role;

/* ───────────────────────── السجلّ ───────────────────────── */

insert into public.sql_log (n, title, applied_at)
values ('176', 'تجربةُ التحليل الآليّ للقراءة الجهريّة — Gemini، والنتيجةُ للمالك وحده', now())
on conflict (n) do update set applied_at = now();

commit;
