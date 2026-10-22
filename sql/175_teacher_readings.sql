/* ═══════════════════════════════════════════════════════════════════
   175 · المعلّمُ يسمع القراءةَ الجهريّة ويكتب ملاحظته — والملاحظةُ تبقى

   لماذا:
   الخطوةُ ٤ من خمس. `174` جعل الطالبَ يقرأ النصَّ بصوته ويرسله، **وبلا هذا
   الملفّ تُحذف القراءةُ بعد خمسة أيام دون أن يسمعها أحد.** والملاحظةُ هي
   «الأثرُ الذي يبقى» في صفحة الخصوصية §٢ و§٨: يُحذف الصوتُ، ولا تُحذف.

   🔑 ثلاثةُ أحكام:
   ① **من يسمع = من يُعلّم الطالبَ في المادّة نفسها** (`teaches_subject` من
      `171`) — في القائمة وفي الشاشة وفي الحفظ. **والمشرفُ لا يرى قائمةَ
      أحد بصفته** (§٥ من الخصوصية لا يذكره في صفّ التسجيلات).
   ② **والملاحظةُ تُكتب بعد حذف الصوت أيضاً:** معلّمٌ سمع يوم الخميس وكتب يوم
      الأحد لا يُردّ. لكنّ الشاشةَ تقول له إنّ الصوت حُذف.
   ③ **والملاحظةُ نصٌّ وحده — لا كودَ تشخيص بعد.** أخطاءُ النطق أتُكتب بأكواد
      التشخيص الأربعةَ عشرَ أم يحملها الهدف؟ **قرارٌ تربويٌّ ينتظر المالكَ ومعلّمي
      الموادّ** (محكُّ `163`: لو نُبِّه الطالب، أيصحّح بنفسه؟). والعمودُ يُضاف يومها.

   📐 والطالبُ يقرأ ملاحظتَه حيث قرأ: `my_reading` تحملها مع قراءاته
      (ولا شاشةَ جديدة له، ولا إشعارَ بعد — يُضاف مع عدّاد المعلّم).
   ═══════════════════════════════════════════════════════════════════ */

begin;

/* ──────────────────── معدَّلة لا منشأة ──────────────────── */

/* ① أعمدةُ الملاحظة */
alter table public.recordings add column if not exists review_note text;
alter table public.recordings add column if not exists reviewed_by uuid references public.profiles(id) on delete set null;
alter table public.recordings add column if not exists reviewed_at timestamptz;
comment on column public.recordings.review_note is
  'ملاحظةُ المعلّم على القراءة (175). تبقى بعد حذف الصوت — «الأثرُ» في الخصوصية §٢';

do $con$
begin
  if not exists (select 1 from pg_constraint where conrelid = 'public.recordings'::regclass
                                             and conname = 'recordings_note_len') then
    alter table public.recordings
      add constraint recordings_note_len check (review_note is null or char_length(review_note) between 1 and 1000);
  end if;
end $con$;

/* ② my_reading — تحمل الملاحظةَ ووقتَها مع كلّ قراءة. وبقيّتُها كما في `174` حرفاً */
create or replace function public.my_reading(p_item bigint)
returns jsonb language sql stable security definer set search_path to 'public'
as $function$
  select jsonb_build_object(
    'enabled',     reading_aloud_subject(p_item) is not null,
    'max_seconds', 300,
    'today',       (select count(*) from recordings r
                     where r.student_id = auth.uid() and r.item_id = p_item
                       and r.created_at > now() - interval '24 hours'),
    'recent',      coalesce((select jsonb_agg(jsonb_build_object(
                                 'id', x.id, 'at', x.created_at, 'deleted', x.deleted_at is not null,
                                 'note', x.review_note, 'noted_at', x.reviewed_at)
                               order by x.created_at desc)
                               from (select id, created_at, deleted_at, review_note, reviewed_at from recordings r
                                      where r.student_id = auth.uid() and r.item_id = p_item
                                      order by created_at desc limit 5) x), '[]'::jsonb));
$function$;

/* ───────────────────────────── منشأة ───────────────────────────── */

/* ③ قائمةُ المعلّم — قراءاتُ طلّابه في موادّه، ما ينتظره أوّلاً.
   «ينتظر» = لم يُكتب عليه شيء والصوتُ قائم. وما جاوز ثلاثين يوماً يغيب. */
create or replace function public.teacher_readings()
returns jsonb language sql stable security definer set search_path to 'public'
as $function$
  select coalesce(jsonb_agg(x.j order by x.waiting desc, x.created_at desc), '[]'::jsonb)
    from (select r.created_at,
                 (r.reviewed_at is null and r.deleted_at is null) as waiting,
                 jsonb_build_object(
                   'id', r.id, 'at', r.created_at,
                   'student', p.full_name, 'subject', s.name,
                   'text', coalesce(i.title, l.title), 'lesson', l.title,
                   'deleted', r.deleted_at is not null,
                   'noted', r.reviewed_at is not null) as j
            from recordings r
            join items    i on i.id = r.item_id
            join lessons  l on l.id = i.lesson_id
            join subjects s on s.id = r.subject_id
            join profiles p on p.id = r.student_id
           where r.item_id is not null
             and r.created_at > now() - interval '30 days'
             and teaches_subject(r.student_id, r.subject_id)
           order by r.created_at desc
           limit 100) x;
$function$;

/* ④ شاشةُ القراءة — ومعها النصُّ ليتابعه المعلّمُ وهو يسمع، والمسارُ إن بقي الصوت */
create or replace function public.teacher_reading(p_id bigint)
returns jsonb language sql stable security definer set search_path to 'public'
as $function$
  select jsonb_build_object(
           'id', r.id, 'at', r.created_at,
           'student', p.full_name, 'subject', s.name,
           'text', coalesce(i.title, l.title), 'lesson', l.title,
           'body', i.body, 'lang', i.lang,
           'path', case when r.deleted_at is null then r.path end,
           'deleted', r.deleted_at is not null,
           'note', r.review_note, 'noted_at', r.reviewed_at)
    from recordings r
    join items    i on i.id = r.item_id
    join lessons  l on l.id = i.lesson_id
    join subjects s on s.id = r.subject_id
    join profiles p on p.id = r.student_id
   where r.id = p_id
     and teaches_subject(r.student_id, r.subject_id);
$function$;

/* ⑤ حفظُ الملاحظة */
create or replace function public.review_reading(p_id bigint, p_note text)
returns jsonb language plpgsql volatile security definer set search_path to 'public'
as $function$
declare v_note text := nullif(btrim(coalesce(p_note, '')), '');
begin
  if auth.uid() is null then raise exception 'يجب تسجيل الدخول'; end if;
  if v_note is null then
    return jsonb_build_object('ok', false, 'error', 'الملاحظة فارغة');
  end if;
  if char_length(v_note) > 1000 then
    return jsonb_build_object('ok', false, 'error', 'الملاحظة أطول من ١٠٠٠ حرف');
  end if;

  update recordings r
     set review_note = v_note, reviewed_by = auth.uid(), reviewed_at = now()
   where r.id = p_id and r.item_id is not null
     and teaches_subject(r.student_id, r.subject_id);
  if not found then
    return jsonb_build_object('ok', false, 'error', 'هذه القراءة ليست لطالب تعلّمه في مادّتها');
  end if;

  return jsonb_build_object('ok', true, 'at', now());
end $function$;

/* ───────────────────────── الصلاحيات ───────────────────────── */

revoke all on function public.teacher_readings()             from public, anon;
revoke all on function public.teacher_reading(bigint)        from public, anon;
revoke all on function public.review_reading(bigint, text)   from public, anon;
grant execute on function public.teacher_readings()           to authenticated;
grant execute on function public.teacher_reading(bigint)      to authenticated;
grant execute on function public.review_reading(bigint, text) to authenticated;

/* ───────────────────────── السجلّ ───────────────────────── */

insert into public.sql_log (n, title, applied_at)
values ('175', 'المعلّمُ يسمع القراءةَ الجهريّة ويكتب ملاحظته — والملاحظةُ تبقى', now())
on conflict (n) do update set applied_at = now();

commit;
