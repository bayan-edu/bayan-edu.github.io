/* ═══════════════════════════════════════════════════════════════════
   177 · التحليلُ الآليّ في شاشة المعلّم — مسودةٌ لملاحظته، لا يراها الطالب

   لماذا:
   `176` جعل التحليلَ يعمل (Whisper على Cloudflare + مقارنةٌ بشيفرة) وقِيس
   على صوت المالك: التقط الأخطاءَ المتعمَّدة كلَّها. لكنّه قِيس على صوتٍ واحد
   في غرفةٍ هادئة — **لا على طالبٍ بلهجته وضجيج فصله وهاتفه.** فقرارُ المالك
   (٢٣ أكتوبر): **الخطوةُ الأولى المعلّمُ لا الطالب.** يرى المعلّمُ التحليلَ بجوار
   الصوت مسودةً لملاحظته، فيُقِرّ أو يُعدّل، والطالبُ لا يرى إلّا ما أرسله المعلّم.
   وبهذا تُقاس الدقّةُ على أصوات الطلّاب **دون أن يقرأ طالبٌ حكماً خاطئاً.**

   🔒 ثلاثةُ أحكام:
   ① **مفتاحٌ لكلّ مادّة، مطفأٌ افتراضاً** (`subjects.reading_ai`) — أخو
      `reading_aloud` في `174`: ذاك يفتح التسجيل، وهذا يفتح التحليل. ولا يُشعَل
      لمادّةٍ قبل أن تُسمّي صفحةُ الخصوصية Cloudflare وتُحسم موافقةُ وليّ الأمر.
   ② **التحليلُ حين يفتح المعلّمُ القراءةَ لا حين يرفعها الطالب** — فلا يُحلَّل
      صوتٌ لن يسمعه أحد (أقلُّ معالجةٍ للبيانات تكفي الغرض). ومرّةً لكلّ قراءة:
      تحليلٌ قائم لا يُعاد، وطلبٌ قيد التنفيذ لا يتكرّر (ثلاثُ دقائق)، وثلاثُ
      محاولاتٍ فاشلةٍ تكفي.
   ③ **الحارسُ `teaches_subject` كما في `175`** — المعلّمُ يرى تحليلَ طالبه في
      مادّته وحدها، والمشرفُ بصفته لا يرى (`reading_analyses` له عبر RLS أصلاً).

   📌 والتحليلُ القائم يُعرض وإن كان المفتاحُ مطفأً — ولا يوجد اليوم إلّا على
      تسجيلَي المالك التجريبيّين (`13` · `14`). المفتاحُ يحكم **الطلبَ** لا العرض.
   ═══════════════════════════════════════════════════════════════════ */

begin;

/* ───────────────────────────── منشأة ───────────────────────────── */

/* ① مفتاحُ المادّة */
alter table public.subjects add column if not exists reading_ai boolean not null default false;
comment on column public.subjects.reading_ai is
  'التحليلُ الآليّ للقراءة الجهرية في شاشة المعلّم (177) — مطفأٌ حتى تُسمّي الخصوصيةُ Cloudflare وتُحسم موافقةُ وليّ الأمر';

/* ② متى طُلب التحليلُ آخرَ مرّة — يمنع الطلبَ المكرَّر أثناء التحليل */
alter table public.recordings add column if not exists analysis_requested_at timestamptz;

/* ③ ما يراه المعلّم: آخرُ تحليلٍ ناجح، أو حالُ الطلب
      الحالات: ready (يُعرض) · pending (قيد التحليل) · failed (تعذّر) ·
               none (المفتاحُ مشتعلٌ ولا تحليل ⇒ يُطلب) · off (مطفأ ⇒ لا لوحة) ·
               gone (حُذف الصوتُ قبل أن يُحلَّل)
      ولا يُرسَل الصفُّ كاملاً: لا نصَّ الدرس (عند المعلّم من `teacher_reading`)
      ولا مقاطعُ Whisper — بل ما تحتاجه اللوحة. */
create or replace function public.teacher_reading_analysis(p_recording bigint)
returns jsonb language plpgsql stable security definer set search_path to 'public'
as $function$
declare
  r  recordings%rowtype;
  a  reading_analyses%rowtype;
  v_on boolean;
begin
  if auth.uid() is null then return null; end if;
  select * into r from recordings where id = p_recording;
  if not found or r.item_id is null or not teaches_subject(r.student_id, r.subject_id) then
    return null;
  end if;

  select * into a from reading_analyses
   where recording_id = r.id and error is null and alignment is not null
   order by id desc limit 1;
  if found then
    return jsonb_build_object(
      'status',      'ready',
      'at',          a.created_at,
      'ref_words',   a.alignment->'ref_words',
      'correct',     a.alignment->'correct',
      'substituted', a.alignment->'substituted',
      'omitted',     a.alignment->'omitted',
      'inserted',    a.alignment->'inserted',
      'accuracy',    a.alignment->'accuracy',
      'issues',      coalesce((select jsonb_agg(x.v order by x.k)
                                 from jsonb_array_elements(a.alignment->'issues') with ordinality x(v, k)
                                where x.k <= 60), '[]'::jsonb),
      'more',        greatest(coalesce(jsonb_array_length(a.alignment->'issues'), 0) - 60, 0),
      'wpm',         a.feedback->'asr'->'wpm',
      'long_pauses', a.feedback->'asr'->'long_pauses',
      'lang',        a.lang);
  end if;

  if r.analysis_requested_at > now() - interval '3 minutes' then
    return jsonb_build_object('status', 'pending');
  end if;
  if r.deleted_at is not null then
    return jsonb_build_object('status', 'gone');
  end if;
  select coalesce(s.reading_ai, false) into v_on from subjects s where s.id = r.subject_id;
  if exists (select 1 from reading_analyses where recording_id = r.id) then
    return jsonb_build_object('status', 'failed', 'retry',
      v_on and (select count(*) from reading_analyses where recording_id = r.id) < 3);
  end if;
  return jsonb_build_object('status', case when v_on then 'none' else 'off' end);
end $function$;

/* ④ طلبُ التحليل — يناديه فتحُ المعلّم للقراءة. يرسل إلى الدالّة الطرفيّة
      `reading-analyze` عبر pg_net بمفتاح Vault (نمطُ `172` · `176`)، ولا ينتظرها:
      النتيجةُ تُقرأ بـ`teacher_reading_analysis` حين تكتمل. */
create or replace function public.request_reading_analysis(p_recording bigint)
returns jsonb language plpgsql volatile security definer set search_path to 'public'
as $function$
declare
  r  recordings%rowtype;
  v_on boolean;
  v_secret text;
begin
  if auth.uid() is null then raise exception 'يجب تسجيل الدخول'; end if;
  select * into r from recordings where id = p_recording for update;
  if not found or r.item_id is null or not teaches_subject(r.student_id, r.subject_id) then
    return jsonb_build_object('ok', false, 'error', 'هذه القراءة ليست لطالب تعلّمه في مادّتها');
  end if;

  select coalesce(s.reading_ai, false) into v_on from subjects s where s.id = r.subject_id;
  if not v_on then return jsonb_build_object('ok', false, 'status', 'off'); end if;

  if exists (select 1 from reading_analyses
              where recording_id = r.id and error is null and alignment is not null) then
    return jsonb_build_object('ok', true, 'status', 'ready');
  end if;
  if r.analysis_requested_at > now() - interval '3 minutes' then
    return jsonb_build_object('ok', true, 'status', 'pending');
  end if;
  if r.deleted_at is not null
     or not exists (select 1 from storage.objects o where o.bucket_id = 'recordings' and o.name = r.path) then
    return jsonb_build_object('ok', false, 'status', 'gone');
  end if;
  if (select count(*) from reading_analyses where recording_id = r.id) >= 3 then
    return jsonb_build_object('ok', false, 'status', 'failed');
  end if;

  select decrypted_secret into v_secret from vault.decrypted_secrets where name = 'reading_analyze_secret';
  if v_secret is null then raise exception 'مفتاح التحليل غائب عن Vault'; end if;

  update recordings set analysis_requested_at = now() where id = r.id;
  perform net.http_post(
    url     := 'https://tjzrfevymfpktfuormhs.supabase.co/functions/v1/reading-analyze',
    headers := jsonb_build_object('Content-Type', 'application/json', 'x-analyze-secret', v_secret),
    body    := jsonb_build_object('recording_id', r.id),
    timeout_milliseconds := 150000);
  return jsonb_build_object('ok', true, 'status', 'pending');
end $function$;

revoke all on function public.teacher_reading_analysis(bigint) from public, anon;
revoke all on function public.request_reading_analysis(bigint) from public, anon;
grant execute on function public.teacher_reading_analysis(bigint) to authenticated;
grant execute on function public.request_reading_analysis(bigint) to authenticated;

/* ───────────────────────── السجلّ ───────────────────────── */

insert into public.sql_log (n, title, applied_at)
values ('177', 'التحليلُ الآليّ في شاشة المعلّم — مسودةٌ لملاحظته، لا يراها الطالب', now())
on conflict (n) do update set applied_at = now();

commit;
