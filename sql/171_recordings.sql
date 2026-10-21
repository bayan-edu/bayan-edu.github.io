/* ═══════════════════════════════════════════════════════════════════
   171 · مخزنُ تسجيلات الطلاب — خاصٌّ، ولا يسمعه إلّا صاحبُه ومعلّمُه في المادّة

   لماذا:
   قرارُ المالك (٢٠ و٢١ أكتوبر): **Supabase يستقبل تسجيلات الطلاب وحدها**،
   تُحلَّل ثمّ تُحذف خلال أسبوع، وسائرُ الوسائط في R2. وصفحةُ الخصوصية
   (`b162`) صارت تعد بذلك. وهذا الملفُّ **الأساسُ وحده**: مخزنٌ وجدولٌ وحرّاس.
   ⇒ **لا واجهةَ تسجيلٍ قبل الحذف الأسبوعيّ** (الخطوة التالية) — فالوعدُ
     لا يسبقه تسجيلٌ واحد.

   🔒 ثلاثةُ أحكامٍ مقصودة:
   ① **المخزنُ خاصّ** (`public = false`): لا رابطَ عامٌّ يُخمَّن. صوتُ قاصرٍ
      لا يسكن خلف بابٍ يُفتح بالتخمين — قرارُ «ما يسكن أين» في STATE.
   ② **ولا رفعَ إلى مسارٍ يختاره المتصفّح:** `start_recording` تتحقّق من
      السؤال (`speaking` · غيرُ متقاعد · متاح) ثمّ **تُصدر المسارَ** وتكتب صفَّه.
      وحارسُ المخزن لا يقبل إلّا مساراً صدر لصاحبه قبل ١٥ دقيقة ولم يُحذف.
      فالميكروفون لا يُطلب إلّا حيث يطلب التمرينُ تسجيلاً (§٢ في الخصوصية).
   ③ **ومن يسمع = ما في §٥ من الخصوصية بحرفه:** الطالبُ ومعلّمُه **في المادّة
      نفسها**. ⇒ `teaches_subject` لا `teaches`:
      · `teaches()` القائمة **لا تعرف المادّة** — من يرشد الطالبَ في مادّةٍ يقرأ
        محاولاتِه في كلّ مادّة. فلا تُبنى عليها.
      · **والمشرفُ لا يسمع بصفته مشرفاً** — §٥ لا تذكره في صفّ التسجيلات.
        (ويسمع إن كان معلّمَ الطالب في المادّة — بصفته معلّماً.)
      · **وطريقُ الصفوف مقطوعٌ عمداً:** `classes` لا تحمل مادّة، والمقياسُ ١
        تشترك فيه ١٧ مادّة — فمعلّمُ صفٍّ يسمع كلَّ موادّ طلّابه. ولا صفوفَ اليوم
        (صفر). ⇒ يُفتح يوم يحمل الصفُّ مادّتَه.

   📐 وما ليس هنا عمداً:
   · **التقويمُ ونتيجةُ التحليل** — شكلُهما ينتظر قراراً تربويّاً: أخطاءُ النطق
     أتُكتب بأكواد التشخيص أم يحملها الهدف؟ (محكُّ `163`: لو نُبِّه، أيصحّح بنفسه؟)
   · **الحذف** — لا سياسةَ `delete` ولا `update` للمتصفّح. يحذف الكنّاسُ وحده
     عبر Storage API (حذفُ صفٍّ من `storage.objects` بـSQL يُيتّم الملفّ).
   · **ربطُ التسجيل بالمحاولة** (`attempt_id`) — يدخل مع نوع السؤال في الواجهة.
   ═══════════════════════════════════════════════════════════════════ */

begin;

/* ───────────────────────────── منشأة ───────────────────────────── */

/* ① المخزن — خاصٌّ، ٢ م.ب، وثلاثُ صيغٍ يُخرجها MediaRecorder:
   webm (كروم وإيدج) · ogg (فايرفوكس) · mp4 (سفاري). والنوعُ يُرسَل بلا
   `;codecs=` — فالقائمةُ تُطابَق حرفاً. ودقيقتان بـ١٢٨ ك.ب/ث ≈ ١٫٩ م.ب. */
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values ('recordings', 'recordings', false, 2097152, array['audio/webm', 'audio/ogg', 'audio/mp4'])
on conflict (id) do update
   set public = false,
       file_size_limit = excluded.file_size_limit,
       allowed_mime_types = excluded.allowed_mime_types;

/* ② الجدول — هويّةُ التسجيل ودورةُ حياته. ويبقى الصفُّ بعد حذف الصوت:
   فيه يُكتب التقويمُ لاحقاً، وهو «الأثرُ الذي يبقى» في §٢. */
create table if not exists public.recordings (
  id          bigint generated always as identity primary key,
  student_id  uuid   not null references public.profiles(id)  on delete cascade,
  question_id bigint not null references public.questions(id) on delete cascade,
  subject_id  bigint not null references public.subjects(id),
  path        text   not null unique,
  mime        text   not null check (mime in ('audio/webm', 'audio/ogg', 'audio/mp4')),
  created_at  timestamptz not null default now(),
  deleted_at  timestamptz
);

comment on table public.recordings is
  'تسجيلُ طالبٍ لسؤال speaking. الصوتُ في المخزن الخاصّ recordings ويُحذف خلال أسبوع؛ والصفُّ يبقى لتقويمه (171)';
comment on column public.recordings.path is
  'المسارُ داخل مخزن recordings: ‹uid›/q‹سؤال›-‹عشوائيّ›.‹لاحقة› — تُصدره start_recording لا المتصفّح (171)';
comment on column public.recordings.deleted_at is
  'وقتُ حذف الملفّ من المخزن (يكتبه الكنّاس). الصفُّ لا يُحذف معه (171)';

create index if not exists recordings_student_question on public.recordings (student_id, question_id, created_at desc);
create index if not exists recordings_live on public.recordings (created_at) where deleted_at is null;

/* ③ من يُعلّم الطالبَ في هذه المادّة — والمشرفُ ليس منهم بصفته (رأس الملفّ ③) */
create or replace function public.teaches_subject(p_student uuid, p_subject bigint)
returns boolean language sql stable security definer set search_path to 'public'
as $function$
  select auth.uid() is not null and exists (
    select 1 from mentorships m
     where m.student_id = p_student
       and m.subject_id = p_subject
       and m.teacher_id = auth.uid()
       and m.active
  );
$function$;

/* ④ إصدارُ مسار — الطريقُ الوحيد إلى المخزن */
create or replace function public.start_recording(p_question bigint, p_mime text)
returns jsonb language plpgsql volatile security definer set search_path to 'public'
as $function$
declare
  v_uid  uuid := auth.uid();
  v_quiz bigint; v_kind text; v_retired timestamptz; v_subject bigint;
  v_mime text := lower(split_part(coalesce(p_mime, ''), ';', 1));
  v_ext  text;  v_path text;  v_id bigint;
begin
  if v_uid is null then raise exception 'يجب تسجيل الدخول'; end if;

  select q.quiz_id, q.kind, q.retired_at, z.subject_id
    into v_quiz, v_kind, v_retired, v_subject
    from questions q join quizzes z on z.id = q.quiz_id
   where q.id = p_question;

  if v_kind is distinct from 'speaking' or v_retired is not null then
    return jsonb_build_object('ok', false, 'error', 'هذا السؤال لا يطلب تسجيلاً');
  end if;
  if not can_access(v_quiz, v_uid) then
    return jsonb_build_object('ok', false, 'error', 'هذا السؤال غير متاح لك');
  end if;

  v_ext := case v_mime when 'audio/webm' then 'webm' when 'audio/ogg' then 'ogg'
                       when 'audio/mp4'  then 'm4a' end;
  if v_ext is null then
    return jsonb_build_object('ok', false, 'error', 'صيغة التسجيل غير مقبولة');
  end if;

  /* خمسُ محاولاتٍ للسؤال في اليوم: تكفي من أعاد ليُحسن، ولا تفتح المخزنَ لسيل */
  if (select count(*) from recordings
       where student_id = v_uid and question_id = p_question
         and created_at > now() - interval '24 hours') >= 5 then
    return jsonb_build_object('ok', false, 'error', 'بلغت حدّ التسجيل لهذا السؤال اليوم');
  end if;

  v_path := v_uid::text || '/q' || p_question || '-'
         || substr(replace(gen_random_uuid()::text, '-', ''), 1, 8) || '.' || v_ext;

  insert into recordings (student_id, question_id, subject_id, path, mime)
  values (v_uid, p_question, v_subject, v_path, v_mime)
  returning id into v_id;

  return jsonb_build_object('ok', true, 'id', v_id, 'bucket', 'recordings',
                            'path', v_path, 'mime', v_mime, 'max_bytes', 2097152);
end $function$;

/* ⑤ حارسا المخزن — دالّتان لا استعلامان في السياسة: فلا تتشابك RLS الجدولين */
create or replace function public.recording_upload_ok(p_name text)
returns boolean language sql stable security definer set search_path to 'public'
as $function$
  select auth.uid() is not null and exists (
    select 1 from recordings r
     where r.path = p_name
       and r.student_id = auth.uid()
       and r.deleted_at is null
       and r.created_at > now() - interval '15 minutes'
  );
$function$;

create or replace function public.can_hear_recording(p_name text)
returns boolean language sql stable security definer set search_path to 'public'
as $function$
  select auth.uid() is not null and exists (
    select 1 from recordings r
     where r.path = p_name
       and r.deleted_at is null
       and (r.student_id = auth.uid() or teaches_subject(r.student_id, r.subject_id))
  );
$function$;

/* ───────────────────────── الصلاحيات ───────────────────────── */

revoke all on function public.teaches_subject(uuid, bigint)   from public, anon;
revoke all on function public.start_recording(bigint, text)   from public, anon;
revoke all on function public.recording_upload_ok(text)       from public, anon;
revoke all on function public.can_hear_recording(text)        from public, anon;
grant execute on function public.teaches_subject(uuid, bigint) to authenticated;
grant execute on function public.start_recording(bigint, text) to authenticated;
grant execute on function public.recording_upload_ok(text)     to authenticated;
grant execute on function public.can_hear_recording(text)      to authenticated;

alter table public.recordings enable row level security;
revoke all on public.recordings from anon;
revoke insert, update, delete, truncate on public.recordings from authenticated;
grant select on public.recordings to authenticated;

/* السياساتُ تُنشأ أو تُعدَّل في موضعها — بلا هدمٍ ثمّ بناء: فلا لحظةَ يكون
   فيها المخزنُ بلا حارس، والملفُّ يُعاد تشغيله.
   المخزن: رفعٌ وقراءة فقط — لا تعديلَ ولا حذفَ من المتصفّح. */
do $pol$
begin
  if exists (select 1 from pg_policies where schemaname = 'public' and tablename = 'recordings'
                                         and policyname = 'recordings_read') then
    alter policy recordings_read on public.recordings to authenticated
      using (student_id = auth.uid() or teaches_subject(student_id, subject_id));
  else
    create policy recordings_read on public.recordings for select to authenticated
      using (student_id = auth.uid() or teaches_subject(student_id, subject_id));
  end if;

  if exists (select 1 from pg_policies where schemaname = 'storage' and tablename = 'objects'
                                         and policyname = 'recordings_write') then
    alter policy recordings_write on storage.objects to authenticated
      with check (bucket_id = 'recordings' and public.recording_upload_ok(name));
  else
    create policy recordings_write on storage.objects for insert to authenticated
      with check (bucket_id = 'recordings' and public.recording_upload_ok(name));
  end if;

  if exists (select 1 from pg_policies where schemaname = 'storage' and tablename = 'objects'
                                         and policyname = 'recordings_hear') then
    alter policy recordings_hear on storage.objects to authenticated
      using (bucket_id = 'recordings' and public.can_hear_recording(name));
  else
    create policy recordings_hear on storage.objects for select to authenticated
      using (bucket_id = 'recordings' and public.can_hear_recording(name));
  end if;
end $pol$;

/* ───────────────────────── السجلّ ───────────────────────── */

insert into public.sql_log (n, title, applied_at)
values ('171', 'مخزنُ تسجيلات الطلاب — خاصٌّ، ولا يسمعه إلّا صاحبُه ومعلّمُه في المادّة', now())
on conflict (n) do update set applied_at = now();

commit;
