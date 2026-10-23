-- ══════════════════════════════════════════════════════════════════════
--  ١٧٨ · فهرسُ أهداف المادة يحمل دروسَه — للتصفية بالصف والدرس
-- ══════════════════════════════════════════════════════════════════════
--
--  الغرض: أن تُصفّى شاشةُ «أهداف المادة» (`143`) بالصفّ وبالدرس.
--
--  🔑 **ولماذا لا تكفي الواجهة؟** كانت `objectives_tree` تردّ لكلّ بندٍ
--  **عددَ** الدروس التي تستهدفه («٣ درس») ولا تقول **أيَّها** — فلا شيءَ
--  يُصفّى به. والهدفُ يسكن المادة فيعبر الصفوف (`138` · `141`): في English
--  يستهدف الأوّلُ الثانويّ ٦٩ بنداً والثاني ٩٨، ونحو ٤١ مشتركٌ بينهما —
--  فمن يراجع صفَّه يقرأ فهرسَ الصفّين معاً.
--
--  ⇒ ثلاثُ زيادات، **وإضافةٌ لا استبدال** (سابقةُ `145`): كلُّ حقلٍ قائمٍ
--    باقٍ بحرفه، فقارئٌ لا نراه لا ينكسر.
--    ① `courses` — مقرّراتُ المادة الفاعلةُ التي لها دروس، بصفوفها ومساراتها.
--    ② `lessons` — دروسُها الحيّة، بترتيب شاشة المقرّر (الوحدةُ ثمّ الموضع).
--       وكلاهما لقائمتَي الاختيار — **ولا يُبنى حقلُ اختيارٍ بنداءٍ ثانٍ**
--       (القرار ① في `143`، وبه رجعت الفروعُ مع الشجرة).
--    ③ لكلّ بند: `lesson_ids` (الدروسُ الحيّة التي تستهدفه) و`q_by_lesson`
--       (عددُ أسئلته الحيّة في كلّ درس).
--
--  وقراران يُقرآن ولا يُستنتجان:
--
--  ① **الأسئلةُ موزَّعةٌ على الدروس لا مجموعة.** فالتصفيةُ تحسب العيوبَ
--     داخل نطاقها، وأوّلُها لا يُرى إلا هكذا: **بندٌ يستهدفه الصفُّ الأوّل
--     ولا يقيسه إلا سؤالٌ في الثاني** — فلا ينطق التشخيصُ عنه لطالب الأوّل
--     أبداً، والعددُ الكلّيُّ يقول «يقيسه ٥ أسئلة» فيُطمئن كاذباً.
--     والسؤالُ يُنسَب إلى درسه بعنصره (`items.quiz_id`) كما في `course_state`،
--     و`count(distinct)` لاختبارٍ يحمله عنصران.
--     ⏱️ **ويُحسب التوزيعُ مرّةً للمادة (`qx`) لا لكلّ بند:** الأسئلةُ بلا
--     فهرسٍ على `objective_id`، فمسحُها في كلّ بندٍ ضاعف زمنَ English في
--     الجافّة (١٣٢ ← ٢٩٢ ملّي ثانية). و`materialized` لأنّ المرجعَ داخل
--     استعلامٍ مرتبطٍ يُنفَّذ لكلّ بند — والمُدمَجُ يُعاد حسابُه في كلّ مرّة.
--
--  ② **«حيّ» = غيرُ مؤرشفٍ في مقرّرٍ فاعل** — كما في `course_state`. وحقلُ
--     `lessons` القديم يعدّ الروابطَ كلَّها ولم يُمسّ (القرار ①)؛ والفرقُ
--     بينهما روابطُ دروسٍ مؤرشفة — **وصفرٌ منها اليوم** (قِيس ٢٣ أكتوبر).
-- ══════════════════════════════════════════════════════════════════════


-- ═══════════ معدَّلةٌ لا منشأة — أصلُها `143` ═══════════

create or replace function public.objectives_tree(p_subject bigint)
returns jsonb
language plpgsql
stable
security definer
set search_path to 'public'
as $function$
declare v_scale bigint; v jsonb;
begin
  if auth.uid() is null then
    return jsonb_build_object('ok', false, 'error', 'يلزم تسجيل الدخول');
  end if;

  if not exists (select 1 from subjects s where s.id = p_subject) then
    return jsonb_build_object('ok', false, 'error', 'المادة غير موجودة');
  end if;

  if not can_author(p_subject) then
    return jsonb_build_object('ok', false, 'error', 'لا تملك حقّ التأليف في هذه المادة');
  end if;

  select s.scale_id into v_scale from subjects s where s.id = p_subject;

  -- 🆕 ١٧٨ · أسئلةُ المادة موزَّعةً على دروسها — مرّةً للمادة لا لكلّ بند
  with qx as materialized (
    select q.objective_id, i.lesson_id, count(distinct q.id) as n
      from questions q
      join items i       on i.quiz_id = q.quiz_id
      join objectives ob on ob.id = q.objective_id
     where ob.subject_id = p_subject
       and q.retired_at is null
       and i.lesson_id is not null
     group by q.objective_id, i.lesson_id)
  select jsonb_build_object(
    'ok', true,
    'subject_id', p_subject,
    'scale', v_scale,

    -- ① فروعُ المادة، و`leaf` محسوبة
    'strands', coalesce((select jsonb_agg(jsonb_build_object(
        'id', st.id, 'code', st.code, 'name', st.name,
        'leaf', not exists (select 1 from strands c where c.parent_id = st.id))
        order by st.sort_order, st.id)
      from strands st where st.subject_id = p_subject), '[]'::jsonb),

    -- 🆕 ١٧٨ · مقرّراتُ المادة بصفوفها — لقائمة «الصف»
    'courses', coalesce((select jsonb_agg(jsonb_build_object(
        'id', c.id, 'level_id', c.level_id, 'level', lv.name, 'path', pa.name)
        order by lv.rank nulls first, c.position, c.id)
      from courses c
      left join levels lv on lv.id = c.level_id
      left join paths  pa on pa.id = c.path_id
     where c.subject_id = p_subject and c.active
       and exists (select 1 from lessons le
                    where le.course_id = c.id and le.archived_at is null)), '[]'::jsonb),

    -- 🆕 ١٧٨ · دروسُها الحيّة — لقائمة «الدرس»، بترتيب شاشة المقرّر
    'lessons', coalesce((select jsonb_agg(jsonb_build_object(
        'id', le.id, 'course_id', le.course_id, 'title', le.title,
        'unit', coalesce(un.title, le.unit))
        order by lv.rank nulls first, c.position, c.id,
                 un.position nulls last, le.position, le.id)
      from lessons le
      join courses c on c.id = le.course_id
      left join levels lv on lv.id = c.level_id
      left join units  un on un.id = le.unit_id
     where c.subject_id = p_subject and c.active
       and le.archived_at is null), '[]'::jsonb),

    'headings', coalesce((select jsonb_agg(jsonb_build_object(
        'id', h.id, 'code', h.code, 'name', h.name,
        'strand_id',   h.strand_id,
        'strand_code', (select st.code from strands st where st.id = h.strand_id),
        'strand_name', (select st.name from strands st where st.id = h.strand_id),
        'items', coalesce((select jsonb_agg(jsonb_build_object(
            'id', o.id, 'code', o.code, 'name', o.name,
            'evidence', o.evidence, 'remedy_note', o.remedy_note,
            'remedy_item_id', o.remedial_item_id,
            'remedy_item_title', (select it.title from items it
                                   where it.id = o.remedial_item_id),
            'lessons',   (select count(*) from lesson_objectives lo
                           where lo.objective_id = o.id),
            'questions', (select count(*) from questions q
                           where q.objective_id = o.id and q.retired_at is null),
            -- 🆕 ١٧٨ · أيُّ الدروس تستهدفه، وكم سؤالاً يقيسه في كلٍّ منها
            'lesson_ids', coalesce((select jsonb_agg(lo.lesson_id order by lo.lesson_id)
                            from lesson_objectives lo
                            join lessons le on le.id = lo.lesson_id
                            join courses c  on c.id = le.course_id
                           where lo.objective_id = o.id
                             and le.archived_at is null and c.active), '[]'::jsonb),
            'q_by_lesson', coalesce((select jsonb_object_agg(qx.lesson_id, qx.n)
                            from qx where qx.objective_id = o.id), '{}'::jsonb))
            order by o.code)
          from objectives o where o.parent_id = h.id), '[]'::jsonb))
        order by (select st.sort_order from strands st where st.id = h.strand_id)
                 nulls last, h.code)
      from objectives h
     where h.subject_id = p_subject
       and h.scale_id is not distinct from v_scale
       and h.parent_id is null), '[]'::jsonb),

    -- بنودٌ بلا عنوان: لا ينبغي أن توجد، وإن وُجدت فلا تُخفى
    'orphans', coalesce((select jsonb_agg(jsonb_build_object(
        'id', o.id, 'code', o.code, 'name', o.name) order by o.code)
      from objectives o
     where o.subject_id = p_subject and o.scale_id is not distinct from v_scale
       and o.parent_id is null
       and not exists (select 1 from objectives k where k.parent_id = o.id)
       and o.strand_id is null), '[]'::jsonb)
  ) into v;

  return v;
end
$function$;

-- المنحُ كما في `143` — والتوقيعُ لم يتغيّر فهي باقية، وتُعاد ليقوم الملفُّ وحده
revoke all on function public.objectives_tree(bigint) from public, anon;
grant execute on function public.objectives_tree(bigint) to authenticated;

comment on function public.objectives_tree(bigint) is
  'فهرسُ أهداف المادة لشاشة المحرّر: العناوينُ بفروعها، وتحت كلٍّ بنودُه '
  'بدليلها وعلاجها الموصوف والموصول، ومعها عددُ الدروس والأسئلة لكلّ بند — '
  'وبهذه الأعداد يُفحص الفهرس. ومعها فروعُ المادة لحقل اختيار العنوان (143). '
  'ومقرّراتُها ودروسُها الحيّة، ولكلّ بندٍ دروسُه وأسئلتُه موزَّعةً عليها — '
  'للتصفية بالصفّ والدرس (178).';

insert into public.sql_log (n, title, applied_at)
values ('178', 'فهرسُ أهداف المادة يحمل دروسَه — للتصفية بالصف والدرس', now())
on conflict (n) do update set applied_at = now();
