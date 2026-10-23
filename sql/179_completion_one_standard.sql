-- ══════════════════════════════════════════════════════════════════════
--  ١٧٩ · «الإنجاز» بمعيارٍ واحد — الدرسُ يُنجَز بالنجاح في الأداء كما في البطاقات والقفل
-- ══════════════════════════════════════════════════════════════════════
--
--  قرارُ المالك (٢٣ أكتوبر): «لماذا لا نوحّد المعيار أوّلاً؟ كلمةُ إنجاز
--  هنا غيرُ معبّرة — المقصودُ نسبةُ الدروس التي خِيض اختبارُها».
--
--  🔴 **كان الجذرُ الواحد يحمل معنيين على شاشتين:**
--     · الأداء (`student_performance` · «الإنجاز»): الاختباراتُ المطلوبة في
--       مستوى الطالب التي **دخلها ولو رسب**.
--     · البطاقات و«متابعة» وشارةُ «أُنجز» على الدرس (`list_subjects` ·
--       `list_lessons`) — **والقفلُ نفسُه** (`can_access_lesson`): الدرسُ لا
--       يُعدّ ولا يَفتح ما بعده إلا **بالنجاح** (`lesson_done`).
--     فطالبٌ رسب يرى «الإنجاز» يرتفع، والدرسُ التالي ما زال مقفلاً أمامه.
--     واختلف النطاقُ معه: الأداءُ بمستوى الملفّ (`required_quizzes`)،
--     والبطاقاتُ بمقرّرات الطالب الحاليّة — مسارُه واختياريّاتُه.
--
--  ⇒ **الإنجازُ = `lesson_done`، في نطاق البطاقات.** وثلاثةُ قرارات:
--
--  ① **تعريفٌ واحد لا نسختان.** `lesson_done_at` تحمل القاعدة وتقول **متى**
--     (لخطّ الأداء الأسبوعيّ)، و`lesson_done` صارت ظلَّها (`is not null`).
--     و`courses_of(p_user)` تحمل النطاق، و`my_courses()` صارت
--     `courses_of(auth.uid())`. فالقفلُ والبطاقاتُ والأداءُ يقرؤون مصدراً
--     واحداً — **ومن غيّر القاعدةَ غيّرها مرّة.**
--  ② **ولماذا وسيطُ المستخدم؟** الأداءُ يفتحه المعلّمُ لطالبه (`p_student`)،
--     و`my_courses()` لا تعرف إلا المستخدمَ الحاليّ.
--  ③ **والبابُ واحدٌ مُحرَس:** `lesson_progress` وحدها تُمنح للمسجَّل، ولا
--     تجيب إلا عن صاحبها أو عمّن `teaches()` — حكمُ `p_attempts_read` بعينه.
--     والعونُ الداخليّ (`courses_of` · `lesson_done_at`) مغلقٌ كأخويه
--     (`my_courses` · `lesson_done`): دالّةٌ مُعرِّفةٌ تأخذ مستخدماً وسيطاً
--     تتخطّى RLS، فلو مُنحت لقرأ كلُّ طالبٍ إنجازَ غيره.
--
--  📌 **«الإنجاز» العامّ = موادُّ الصفّ** (`placement = 'profile'`) — مجموعةُ
--     «موادّ صفّي» في الرئيسة نفسُها. وبمادّةٍ = مقرّراتُها الحاليّة،
--     والمهاراتُ معها.
--  📌 **و`trying` — دروسٌ دخلها ولم يُنجزها — تُضاف إلى الإنجاز عدداً لا
--     نسبةً ثانية:** جهدُ من حاول لا يضيع، ولا يُسمّى إنجازاً.
--  📌 **وما لم يُمسّ عمداً:** قائمتا `next` و`locked` (اختباراتٌ مطلوبة لم
--     تُدخَل بعد، بمستوى الملفّ) — دليلُ «ما التالي» لا نسبة. وتوحيدُ
--     نطاقهما خطوةٌ مستقلّة.
--  ⚠️ **وحُفظت غرابةٌ في `lesson_done` بحرفها:** تعدّ **العناصرَ** المحتسبة،
--     وتعدّ الناجحَ **اختباراتٍ متمايزة** — فاختبارٌ يحمله عنصران محتسبان في
--     درسٍ واحد يجعله لا يُنجَز أبداً. القفلُ لا يتغيّر في هذا الملفّ، وصفرُ
--     درسٍ كذلك اليوم (قِيس ٢٣ أكتوبر).
-- ══════════════════════════════════════════════════════════════════════


-- ═══════════ منشأة ═══════════

-- ① نطاقُ المقرّرات لمستخدمٍ بعينه — نصُّ `my_courses()` قبل هذا الملفّ بحرفه:
--    كلُّ `auth.uid()` صار `p_user`، و`is_teacher()` صار سؤالاً عن `p_user`،
--    و`my_level_id` و`can_view_level` أخذتا `p_user` وسيطاً.
--    ⚠️ و`can_view_level` تسأل `is_teacher()` عن **المنادي** لا عن `p_user`:
--       فالمعلّمُ يرى لطالبه مقرّراتٍ فوق رتبته — **غيرَ حاليّةٍ** دائماً
--       (`is_current` يشترط مستوى الطالب)، فلا تبلغ الإنجاز.
create or replace function public.courses_of(p_user uuid)
returns table(course_id bigint, subject_id bigint, level_id bigint, is_current boolean)
language sql
stable
security definer
set search_path to 'public'
as $function$
  select c.id, c.subject_id, c.level_id,
         (exists (select 1 from profiles where id = p_user and role in ('teacher','admin'))
          or c.level_id is null or c.level_id = my_level_id(s.scale_id, p_user))
  from courses c join subjects s on s.id = c.subject_id
  where c.active and s.active
    and (exists (select 1 from profiles where id = p_user and role in ('teacher','admin')) or (
      (s.placement <> 'profile'
       or s.scale_id is null
       or s.scale_id = (select scale_id from profiles where id = p_user))
    and (c.level_id is null or can_view_level(c.level_id, p_user))
    and (c.path_id is null
         or c.path_id = (select path_id from profiles where id = p_user))
    and (c.elective_group is null
      or exists (select 1 from student_courses x
                  where x.user_id = p_user and x.course_id = c.id)
      or not exists (select 1 from student_courses x
                     join courses c2 on c2.id = x.course_id
                     where x.user_id = p_user
                       and c2.level_id = c.level_id
                       and c2.path_id is not distinct from c.path_id
                       and c2.elective_group = c.elective_group))));
$function$;

-- ② متى أُنجز الدرس — والقاعدةُ هنا وحدها.
--    كلُّ اختبارٍ محتسبٍ فيه بلغ عتبةَ الدرس بمحاولةٍ ما؛ ووقتُ الإنجاز وقتُ
--    آخرِها بلوغاً (فالدرسُ يُنجَز يومَ يكتمل لا يومَ يبدأ). وما عدا الوقت
--    نصُّ `lesson_done` قبل هذا الملفّ بحرفه — وبه تُحفظ غرابتُه (رأسُ الملفّ).
create or replace function public.lesson_done_at(p_lesson bigint, p_user uuid default auth.uid())
returns timestamptz
language plpgsql
stable
security definer
set search_path to 'public'
as $function$
declare v_need int; v_ok int; v_mark int; v_at timestamptz;
begin
  select pass_mark into v_mark from lessons where id = p_lesson;

  select count(*) into v_need
    from items where lesson_id = p_lesson and is_graded and quiz_id is not null;

  if v_need = 0 then return null; end if;

  select count(*), max(t.at) into v_ok, v_at from (
    select i.quiz_id,
           min(a.submitted_at) filter (where a.pct >= v_mark) as at
      from items i
      join attempts a on a.quiz_id = i.quiz_id and a.user_id = p_user
     where i.lesson_id = p_lesson and i.is_graded and i.quiz_id is not null
     group by i.quiz_id
    having max(a.pct) >= v_mark
  ) t;

  if v_ok < v_need then return null; end if;
  return v_at;   -- لا يفرغ هنا: `submitted_at` إلزاميّ، وكلُّ صفٍّ بلغ العتبة
end $function$;

-- ③ البابُ الواحد — دروسُ النطاق وحالُها، لصاحبها أو لمن يعلّمه.
--    والنطاقُ نطاقُ `list_subjects` بشروطه الثلاثة (مقرّرٌ حاليّ · منشور ·
--    غيرُ مؤرشف) — فمجموعُ البطاقات ونسبةُ الأداء رقمٌ واحد.
--    والفرعُ بعناصره المحتسبة كما كان في `required_quizzes`
--    (`coalesce(i.strand_id, l.strand_id)`).
create or replace function public.lesson_progress(
  p_user uuid, p_subject bigint default null, p_strand bigint default null)
returns table(lesson_id bigint, subject_id bigint, done_at timestamptz, tried boolean)
language sql
stable
security definer
set search_path to 'public'
as $function$
  select l.id, m.subject_id,
         lesson_done_at(l.id, p_user),
         exists (select 1 from items i
                   join attempts a on a.quiz_id = i.quiz_id and a.user_id = p_user
                  where i.lesson_id = l.id and i.is_graded and i.quiz_id is not null)
    from courses_of(p_user) m
    join lessons  l on l.course_id = m.course_id
    join subjects s on s.id = m.subject_id
   where (p_user = auth.uid() or teaches(p_user))
     and m.is_current and l.published and l.archived_at is null
     and case when p_subject is null then s.placement = 'profile'
              else m.subject_id = p_subject end
     and (p_strand is null or exists (
           select 1 from items i
            where i.lesson_id = l.id and i.is_graded and i.quiz_id is not null
              and coalesce(i.strand_id, l.strand_id) = p_strand));
$function$;


-- ═══════════ معدَّلةٌ لا منشأة ═══════════

-- ④ my_courses — ظلُّ courses_of للمستخدم الحاليّ. ونصُّها القديم في ① بحرفه.
create or replace function public.my_courses()
returns table(course_id bigint, subject_id bigint, level_id bigint, is_current boolean)
language sql
stable
security definer
set search_path to 'public'
as $function$
  select * from courses_of(auth.uid());
$function$;

-- ⑤ lesson_done — ظلُّ lesson_done_at: القفلُ والبطاقاتُ يقرؤونها كما كانوا
create or replace function public.lesson_done(p_lesson bigint, p_user uuid default auth.uid())
returns boolean
language sql
stable
security definer
set search_path to 'public'
as $function$
  select lesson_done_at(p_lesson, p_user) is not null;
$function$;

-- ⑥ student_performance — ستّةُ مواضع لا نسخةٌ كاملة (نمطُ `163` · `164`):
--    الإنجازُ والخطُّ الأسبوعيّ من `lesson_progress`، و`trying` معهما.
--    وما سواها باقٍ بحرفه على الحيّة — ومنه `next` و`locked` (رأسُ الملفّ).
do $do$
declare
  sig regprocedure; v text; n int; i int;
  pairs text[] := array[
    array['tot as (', $n1$prog as (
  -- 🆕 179 · الإنجازُ من البابِ الواحد — نطاقُ البطاقات ومعيارُ القفل
  select pr.lesson_id, pr.done_at, pr.tried
    from me cross join lateral lesson_progress(me.uid, p_subject, p_strand) pr
),
tot as ($n1$],
    array['(select count(*) from req)', '(select count(*) from prog)'],
    array['(select count(*) from touched) as done_n',
          $n3$(select count(*) from prog where done_at is not null)        as done_n,
         (select count(*) from prog where done_at is null and tried) as try_n$n3$],
    array[$o4$'required', t.req_n::int,$o4$, $n4$'required', t.req_n::int,
             'trying',   t.try_n::int,$n4$],
    array['from touched tc', 'from prog pr'],
    array['where tc.at < wk.w', 'where pr.done_at < wk.w']
  ];
begin
  select p.oid::regprocedure into sig from pg_proc p
    join pg_namespace ns on ns.oid = p.pronamespace
   where ns.nspname = 'public' and p.proname = 'student_performance';
  v := replace(pg_get_functiondef(sig), E'\r\n', E'\n');   -- الحيّة لا اللقطة

  if position('lesson_progress(me.uid' in v) > 0 then
    raise notice 'student_performance: صُحّحت من قبل (179)'; return;
  end if;

  for i in 1 .. array_length(pairs, 1) loop
    n := (length(v) - length(replace(v, pairs[i][1], ''))) / length(pairs[i][1]);
    if n <> 1 then
      raise exception 'student_performance: «%» وُجد % مرّة لا مرّةً واحدة — لا يُستبدل على الظنّ',
        pairs[i][1], n;
    end if;
  end loop;

  for i in 1 .. array_length(pairs, 1) loop
    v := replace(v, pairs[i][1], pairs[i][2]);
  end loop;

  execute v;
end $do$;


-- ═══════════ الصلاحيات — والعونُ الداخليّ مغلقٌ كأخويه ═══════════
-- `my_courses` و`lesson_done` و`student_performance` تُستبدل بتوقيعها فتبقى منحُها.
revoke all on function public.courses_of(uuid)                      from public, anon, authenticated;
revoke all on function public.lesson_done_at(bigint, uuid)          from public, anon, authenticated;
revoke all on function public.lesson_progress(uuid, bigint, bigint) from public, anon, authenticated;
grant execute on function public.lesson_progress(uuid, bigint, bigint) to authenticated;

comment on function public.courses_of(uuid) is
  'مقرّراتُ مستخدمٍ بعينه — و my_courses() ظلُّها للمستخدم الحاليّ (179). مغلقة: تتخطّى RLS.';
comment on function public.lesson_done_at(bigint, uuid) is
  'متى أُنجز الدرس: كلُّ اختبارٍ محتسبٍ فيه بلغ عتبتَه، والوقتُ آخرُها بلوغاً (179). '
  'و lesson_done ظلُّها — فقاعدةُ الإنجاز هنا وحدها، يقرؤها القفلُ والبطاقاتُ والأداء.';
comment on function public.lesson_progress(uuid, bigint, bigint) is
  'دروسُ النطاق وحالُها (أُنجز متى · دخله) لصاحبها أو لمن يعلّمه — حكمُ p_attempts_read. '
  'بابُ الأداء إلى الإنجاز، بنطاق list_subjects (179).';

insert into public.sql_log (n, title, applied_at)
values ('179', '«الإنجاز» بمعيارٍ واحد — الدرسُ يُنجَز بالنجاح في الأداء كما في البطاقات والقفل', now())
on conflict (n) do update set applied_at = now();


-- ═══════════ الفحص بعد التطبيق — يُشغَّل جملةً جملة ═══════════
/*
-- ① الصلاحيات: البابُ للمسجَّل وحده، والعونُ مغلق
select p.oid::regprocedure::text as الدالّة,
       has_function_privilege('authenticated', p.oid, 'execute') as المسجَّل,
       has_function_privilege('anon', p.oid, 'execute')          as الزائر
  from pg_proc p join pg_namespace n on n.oid = p.pronamespace
 where n.nspname = 'public'
   and p.proname in ('courses_of','lesson_done_at','lesson_progress','my_courses','lesson_done','student_performance');
-- المتوقَّع: lesson_progress و student_performance للمسجَّل وحده · الأربعُ الباقية مغلقة

-- ② المواضعُ الستّة في الحيّة
select position('lesson_progress(me.uid' in pg_get_functiondef('public.student_performance(uuid,bigint,bigint)'::regprocedure)) > 0 as بُدّلت;
*/
