-- ══════════════════════════════════════════════════════════════════════
--  بيان — tools/state.sql  ·  مولِّدُ ملفّ الحالة للمجلد المشترك
-- ══════════════════════════════════════════════════════════════════════
--
--  الغرض: يُنتج محتوى `bayan-content/state/courses.json` كاملاً.
--
--  لماذا ملفٌّ لا استعلامٌ يُكتب في كل مرة: كُتب بيدٍ مرّتين في ٢ أكتوبر،
--  وفي الأولى قرأ `lessons.unit` (عموداً مهجوراً) فظهرت الوحداتُ فارغة.
--  **واستعلامٌ يُعاد تأليفُه يُعاد خطؤه.**
--
--  التشغيل:
--    محرّر Supabase ⇒ الصق هذا الملفّ ⇒ انسخ النصّ الناتج
--    ⇒ احفظه في  bayan-content/state/courses.json
--
--  خمسةُ قرارات في هذا الاستعلام تُقرأ ولا تُستنتج:
--    ① الوحدةُ من `units` عبر `unit_id`. و`coalesce(…, le.unit)` بقيَ
--       للعمود المتقاعد (`135`) وهو فارغٌ دائماً الآن — تحوّطٌ لا أكثر.
--    ② `active` وحدها تُدرَج: المقرّرُ المعطَّل لا يُطلب تأليفُه.
--    ③ الأسئلةُ تُعدّ بما فيها المتقاعدة — العدد هنا دليلُ حياةٍ لا إحصاء.
--    ④ `key` و`objectives` لكلّ درس: بهما **تُشتقّ المرحلةُ الحالية** لكلّ
--       مقرّر في `make_requests.py`، فلا تُكتب بيدٍ ولا تُنسى.
--       الدرسُ الآتي من استيرادٍ يحمل مفتاحاً، والمكتوبُ بيدٍ لا يحمله.
--    ⑤ `objectives_index`: أهدافُ **المادة** كلُّها — لا أهدافُ هذا المقرّر.
--       فالهدف يسكن المادةَ ويعبر الصفوف (`138`)، ومعلّمُ الصفّ الثاني
--       **لا يستطيع إعادةَ استعمال كودٍ لا يراه** — فيكتبه من جديد باسمٍ
--       آخر، فينقطع أثرُ الطالب الطوليّ. فالقائمةُ هنا شرطُ ذلك القانون.
-- ══════════════════════════════════════════════════════════════════════

with l as (
  select le.course_id, jsonb_agg(jsonb_build_object(
           'id', le.id, 'order', le.position,
           'unit', coalesce((select un.title from units un where un.id = le.unit_id), le.unit),
           'title', le.title, 'key', le.author_key,
           'strand', (select st.code from strands st where st.id = le.strand_id),
           'published', le.published,
           'objectives', (select count(*) from lesson_objectives lo where lo.lesson_id = le.id),
           'questions', (select count(*) from questions q where q.quiz_id in
                          (select i.quiz_id from items i
                            where i.lesson_id = le.id and i.quiz_id is not null))
         ) order by le.position, le.id) j
    from lessons le where le.archived_at is null group by le.course_id),
u as (
  select un.course_id, jsonb_agg(jsonb_build_object(
           'id', un.id, 'title', un.title, 'position', un.position)
         order by un.position, un.id) j
    from units un group by un.course_id),
s as (
  select st.subject_id, jsonb_agg(jsonb_build_object(
           'code', st.code, 'name', st.name,
           'parent', (select p.code from strands p where p.id = st.parent_id))
         order by st.sort_order, st.id) j
    from strands st group by st.subject_id),
o as (
  select ob.subject_id, jsonb_agg(jsonb_build_object(
           'code', ob.code, 'name', ob.name,
           'parent', (select p.code from objectives p where p.id = ob.parent_id),
           'lessons', (select count(*) from lesson_objectives lo where lo.objective_id = ob.id))
         order by coalesce((select p.code from objectives p where p.id = ob.parent_id), ob.code),
                  ob.parent_id nulls first, ob.code) j
    from objectives ob group by ob.subject_id)
select jsonb_pretty(jsonb_build_object(
  'note', 'يُولَّد من قاعدة بيان بـtools/state.sql — لا يُحرَّر بيد. أعِد توليده بعد كل استيراد.',
  'generated_at', to_char(now() at time zone 'Asia/Riyadh', 'YYYY-MM-DD"T"HH24:MI:SS+03:00'),
  'db_migration', (select max(sql_log_sort(n))::text from sql_log),
  'courses', coalesce(jsonb_agg(jsonb_build_object(
      'course_id', c.id, 'subject', sb.name, 'subject_code', sb.code,
      'level', lv.name, 'title', c.title,
      'strands', coalesce(s.j, '[]'::jsonb),
      'objectives_index', coalesce(o.j, '[]'::jsonb),
      'units',   coalesce(u.j, '[]'::jsonb),
      'lessons', coalesce(l.j, '[]'::jsonb)
    ) order by sb.name, lv.rank nulls first, c.id), '[]'::jsonb)
)) as courses_json
from courses c
join subjects sb on sb.id = c.subject_id
left join levels lv on lv.id = c.level_id
left join l on l.course_id = c.id
left join u on u.course_id = c.id
left join s on s.subject_id = c.subject_id
left join o on o.subject_id = c.subject_id
where c.active;
