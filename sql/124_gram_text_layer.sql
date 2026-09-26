-- ═══════════════════════════════════════════════════════════════════════
-- 124 · صيغةُ المخاطبة تعبر إلى النصّ — والاتّجاه الثاني: عن المعلّم
--
-- العمودُ `gram_gender` (123) يحلّ نصفَ المسألة: مخاطبةَ صاحبِ الحساب،
-- وهي تُقرأ من ملفّه الحاضر في الواجهة بلا دالّة. **والنصفُ الآخر أنّ
-- النصَّ يتحدّث عن ثالث:** «معلمك الحالي» · «ملاحظات معلمي» · «أ. فلان».
-- وصيغةُ ذلك الثالث **ليست في الواجهة أصلاً** — فتُحمَل إليها.
--
-- 🔑 **ولذلك لا تكفي دالّةُ نصٍّ واحدة تأخذ الملفّ الشخصيّ.** الجملةُ
--    الواحدة قد تحتاج صيغتين معاً: «انضممتِ إلى أ.ة هدى» — صيغةُ
--    الطالبة وصيغةُ المعلّمة في سطرٍ واحد. فالدالّةُ في الواجهة تأخذ
--    **قيمةً** لا ملفّاً، وهذا الملفُّ يجلب القيمةَ الغائبة.
--
-- 📌 **وأربعُ دوالَّ تُعيد `jsonb` — فالمفتاحُ يُضاف بلا `drop`.** ولو
--    كانت تُعيد `table(...)` لاقتضى تغييرُ الخرج إسقاطَ الدالّة وإعادةَ
--    إنشائها، وهو ما لا يقع على قاعدةٍ حيّة بلا إذن. **الحمولةُ المرنة
--    كسبٌ يُقرأ هنا.**
--
-- ⚠️ **والأربعُ معدَّلةٌ لا منشأة** — أصولُها في ملفّاتٍ سابقة. قُرئ
--    تعريفُ كلٍّ منها من القاعدة الحيّة بـ`pg_get_functiondef` ونُقل
--    بحرفه، ولم يُزَد عليه إلا مفتاحٌ واحد. **ولا يُبنى على
--    `00_schema.sql`** — هو لقطةٌ مؤرَّخة، وقد أسقطت البناءُ عليها
--    نمطَ `gap` والإعداداتِ يوم ٥ سبتمبر.
--
-- ⚠️ **ولا تُمَسّ الصلاحيات.** الأربعُ اليوم على الافتراضيّ
--    (`=X/postgres` أي PUBLIC)، و`create or replace` **يحفظ الـACL**
--    لأنّ مُعرِّف الدالّة لا يتغيّر. وإحكامُها شأنُ `sql/58` وحده —
--    فمن شدّها هنا شدّ بابَ الزائر في `list_subjects` من حيث لا يقصد.
--
-- 🔑 **واسمُ المفتاح يتبع جاره لا هوًى:** `list_mentors` بطاقةُ معلّمٍ
--    فمفتاحُها `g`؛ و`my_mentor` فيها `teacher_name` فصار `teacher_g`؛
--    و`list_subjects` فيها `mentor_name` فصار `mentor_g`. **اسمٌ يخالف
--    جارَه يُقرأ شيئاً آخر.**
-- ═══════════════════════════════════════════════════════════════════════

set check_function_bodies = off;


-- ═══════════════════════════════════════════════════════════════════════
-- معدَّلة لا منشأة · ① list_mentors — بطاقاتُ المعلمين
--    الأصل: ملفُّ الإرشاد. والزيادةُ: 'g'
-- ═══════════════════════════════════════════════════════════════════════

create or replace function public.list_mentors(p_subject bigint)
returns jsonb language plpgsql stable security definer set search_path to 'public'
as $function$
declare v jsonb;
begin
  select jsonb_agg(jsonb_build_object(
    'id', p.id, 'name', p.full_name,
    'g', p.gram_gender,                                        -- 🆕 124
    'school', p.school, 'bio', p.bio, 'years', p.years_exp,
    'students', cnt.n, 'capacity', ts.capacity,
    'full', cnt.n >= ts.capacity or not ts.accepting
  ) order by (cnt.n >= ts.capacity or not ts.accepting), p.full_name) into v
  from teacher_subjects ts
  join profiles p on p.id = ts.teacher_id and p.role in ('teacher','admin')
  cross join lateral (
    select count(*)::int as n from mentorships m
    where m.teacher_id = ts.teacher_id and m.subject_id = ts.subject_id and m.active
  ) cnt
  where ts.subject_id = p_subject;
  return coalesce(v, '[]'::jsonb);
end $function$;


-- ═══════════════════════════════════════════════════════════════════════
-- معدَّلة لا منشأة · ② my_mentor — حالُ الإرشاد في مادّة
--    ⚠️ و`full outer join` مقصودٌ في الأصل: الصفُّ قد يكون «متابعةً
--       ذاتية» (‏teacher_id = null‏) فلا يقابله ملفٌّ — ويُنقل بحرفه.
--    والزيادةُ: 'teacher_g'
-- ═══════════════════════════════════════════════════════════════════════

create or replace function public.my_mentor(p_subject bigint)
returns jsonb language plpgsql stable security definer set search_path to 'public'
as $function$
declare v_used int; v_max int := max_mentor_switches(); v jsonb;
begin
  select greatest(count(*) - 1, 0) into v_used
    from mentorships
   where student_id = auth.uid() and subject_id = p_subject and teacher_id is not null;

  select jsonb_build_object(
    'chosen',       exists (select 1 from mentorships
                            where student_id = auth.uid() and subject_id = p_subject and active),
    'teacher_id',   m.teacher_id,
    'teacher_name', p.full_name,
    'teacher_g',    p.gram_gender,                             -- 🆕 124
    'self_study',   m.id is not null and m.teacher_id is null,
    'switches_used', v_used,
    'switches_left', greatest(v_max - v_used, 0),
    'teachers_tried', (select count(*) from mentorships
                       where student_id = auth.uid() and subject_id = p_subject
                         and teacher_id is not null),
    'can_switch',   v_used < v_max
  ) into v
  from (select * from mentorships
        where student_id = auth.uid() and subject_id = p_subject and active) m
  full outer join profiles p on p.id = m.teacher_id
  limit 1;

  return coalesce(v, jsonb_build_object(
    'chosen', false, 'switches_used', v_used, 'teachers_tried', 0,
    'switches_left', greatest(v_max - v_used, 0), 'can_switch', true));
end $function$;


-- ═══════════════════════════════════════════════════════════════════════
-- معدَّلة لا منشأة · ③ choose_mentor — الانضمام
--    الزيادةُ: 'teacher_g' في حمولة النجاح.
--    ⚠️ ونصوصُ الخطأ فيها مذكّرةٌ («استفدتَ») ولم تُمَسّ هنا: تحييدُ
--       نصوص القاعدة قرارٌ آخر، وملفٌّ آخر. **قرارٌ واحدٌ لكلّ ملفّ،
--       وإلّا تعذّر التراجعُ عن أحدهما وحده.**
-- ═══════════════════════════════════════════════════════════════════════

create or replace function public.choose_mentor(p_subject bigint, p_teacher uuid default null::uuid)
returns jsonb language plpgsql security definer set search_path to 'public'
as $function$
declare
  v_cur uuid; v_has bool; v_used int; v_max int := max_mentor_switches();
  v_cap int; v_cnt int; v_name text; v_g text;
begin
  if auth.uid() is null then raise exception 'يجب تسجيل الدخول'; end if;

  select teacher_id, true into v_cur, v_has from mentorships
   where student_id = auth.uid() and subject_id = p_subject and active;

  if v_has and v_cur is not distinct from p_teacher then
    return jsonb_build_object('ok', true, 'unchanged', true);
  end if;

  -- حدّ التبديل يُحسب على المعلمين فقط
  if p_teacher is not null then
    select greatest(count(*) - 1, 0) into v_used from mentorships
     where student_id = auth.uid() and subject_id = p_subject and teacher_id is not null;

    if v_used >= v_max then
      return jsonb_build_object('ok', false,
        'error', 'استفدتَ من فرص الانتقال المتاحة في هذه المادة. ' ||
                 'نرجو أن تعرض ما يشكل عليك على معلمك الحالي — ' ||
                 'فالاستمرار معه أنفع لمتابعة تقدّمك.');
    end if;

    select ts.capacity into v_cap from teacher_subjects ts
     where ts.teacher_id = p_teacher and ts.subject_id = p_subject and ts.accepting;
    if v_cap is null then
      return jsonb_build_object('ok', false,
        'error', 'لا يستقبل هذا المعلم طلاباً جدداً في هذه المادة حالياً');
    end if;

    select count(*) into v_cnt from mentorships
     where teacher_id = p_teacher and subject_id = p_subject and active;
    if v_cnt >= v_cap then
      return jsonb_build_object('ok', false,
        'error', 'اكتمل نصاب هذا المعلم في هذه المادة — نرجو اختيار معلم آخر');
    end if;
  end if;

  update mentorships set active = false, ended_at = now()
   where student_id = auth.uid() and subject_id = p_subject and active;

  insert into mentorships (student_id, subject_id, teacher_id)
  values (auth.uid(), p_subject, p_teacher);

  select full_name, gram_gender into v_name, v_g                -- 🆕 124
    from profiles where id = p_teacher;

  return jsonb_build_object('ok', true,
    'teacher', v_name,
    'teacher_g', v_g,                                           -- 🆕 124
    'self_study', p_teacher is null,
    'switches_left', greatest(v_max - (
      select greatest(count(*) - 1, 0) from mentorships
       where student_id = auth.uid() and subject_id = p_subject and teacher_id is not null), 0));
end $function$;


-- ═══════════════════════════════════════════════════════════════════════
-- معدَّلة لا منشأة · ④ list_subjects — بطاقاتُ المواد
--    الزيادةُ: 'mentor_g' بجوار 'mentor_name' بالاستعلام نفسِه.
--    ⚠️ ونُقلت الدالّةُ بحرفها ومنها `'tool'` و`'elective'`
--       و`'needs_placement'` — **إسقاطُ مفتاحٍ هنا يكسر شاشةً بعيدة.**
-- ═══════════════════════════════════════════════════════════════════════

create or replace function public.list_subjects()
returns jsonb language plpgsql stable security definer set search_path to 'public'
as $function$
declare v jsonb;
begin
  select jsonb_agg(x order by x->>'group_key', (x->>'sort')::int) into v from (
    select jsonb_build_object(
      'id', s.id, 'code', s.code, 'name', s.name,
      'description', s.description, 'icon', s.icon,
      'placement', s.placement, 'progression', s.progression,
      'tool', s.tool,
      'scale_id', s.scale_id, 'sort', s.sort_order,
      'group_key', case
        when s.placement <> 'profile' then '3_skills'
        when exists (select 1 from my_courses() m
                      where m.subject_id = s.id and m.is_current) then '1_grade'
        else '2_past' end,
      'my_level', (select l.name from levels l where l.id = my_level_id(s.scale_id)),
      'course', (select c.title from courses c join my_courses() m on m.course_id = c.id
                  where m.subject_id = s.id and m.is_current limit 1),
      'elective', exists (select 1 from courses c join my_courses() m on m.course_id = c.id
                           where m.subject_id = s.id and m.is_current
                             and c.elective_group is not null),
      'needs_placement', s.placement = 'test'
        and not exists (select 1 from student_levels
                        where user_id = auth.uid() and scale_id = s.scale_id),
      'mentor_chosen', exists (select 1 from mentorships m
                               where m.student_id = auth.uid() and m.subject_id = s.id and m.active),
      'mentor_name', (select p.full_name from mentorships m
                      join profiles p on p.id = m.teacher_id
                      where m.student_id = auth.uid() and m.subject_id = s.id and m.active),
      'mentor_g', (select p.gram_gender from mentorships m                 -- 🆕 124
                   join profiles p on p.id = m.teacher_id
                   where m.student_id = auth.uid() and m.subject_id = s.id and m.active),
      'mentors_available', (select count(*) from teacher_subjects t
                            where t.subject_id = s.id and t.accepting),

      -- التقدّم = دروس مقرَّر صفّي وحده
      'lessons_total', (select count(*) from lessons ls
                        join my_courses() m on m.course_id = ls.course_id
                        where m.subject_id = s.id and m.is_current
                          and ls.published and ls.archived_at is null),
      'lessons_done',  (select count(*) from lessons ls
                        join my_courses() m on m.course_id = ls.course_id
                        where m.subject_id = s.id and m.is_current
                          and ls.published and ls.archived_at is null
                          and lesson_done(ls.id)),
      -- دروس صفوف سابقة — للمراجعة · خارج الحساب
      'lessons_review', (select count(*) from lessons ls
                         join my_courses() m on m.course_id = ls.course_id
                         where m.subject_id = s.id and not m.is_current
                           and ls.published and ls.archived_at is null),
      'lessons_all', (select count(*) from lessons ls
                      where ls.subject_id = s.id and ls.published)
    ) as x
    from subjects s
    where s.active
      and (is_teacher()
        or s.placement <> 'profile'
        or exists (select 1 from my_courses() m where m.subject_id = s.id))
  ) t;
  return coalesce(v, '[]'::jsonb);
end $function$;


-- ═══════════════════════════════════════════════════════════════════════
-- ⑤ السجلّ
-- ═══════════════════════════════════════════════════════════════════════

insert into public.sql_log (n, title, applied_at)
values ('124', 'صيغةُ المخاطبة تعبر إلى النصّ — والاتّجاه الثاني: عن المعلّم', now())
on conflict (n) do update set applied_at = now();
