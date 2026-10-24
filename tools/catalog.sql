-- ══════════════════════════════════════════════════════════════════════
--  بيان — tools/catalog.sql  ·  فهرسُ المقرّرات لمولّد الطلبات
-- ══════════════════════════════════════════════════════════════════════
--
--  الغرض: يُنتج `bayan-content/catalog.json` — سطرٌ لكلّ مقرّرٍ مفعّل في
--  الصفوف كلّها، يقرؤه `make_requests.py --texts` ليعرف **لمن يكتب** طلباً.
--
--  🔑 **ولماذا ملفٌّ ثانٍ وقد كان `state.sql`:** طلبُ النصوص يقرأ حالةَ مقرّره
--     حيّةً من `course_state()` (181 · «الطريق الحيّ»)، فلا يحتاج المولّدُ من
--     الحالة إلا ما يقرّر به: أيُّ المقرّرات مضت مرحلتُها ①، وبأيّ اسمٍ يُسمّى
--     ملفُّها. وملفُّ الحالة للصفوف كلّها ١٫٥ ميجابايت (٢٤ أكتوبر) — وهذا
--     بضعةُ كيلوبايتات.
--  🔑 **وبلاه لا يضرّ كبلى ملفّ الحالة:** يقرّر **أيُّ** طلبٍ يُكتب، لا **ما**
--     يقرؤه المؤلّف — فذاك حيٌّ دائماً. ومقرّرٌ مضت مرحلتُه بعد توليده يُكتب
--     طلبُه في الدورة التالية، ولا يُؤلَّف على شيءٍ بالٍ.
--
--  التشغيل: محرّر Supabase ⇒ الصق هذا الملفّ ⇒ احفظ الناتج في
--           bayan-content/catalog.json
--
--  وثلاثةُ قرارات تُقرأ ولا تُستنتج:
--    ① **العدُّ كما في `state.sql` و`course_state`:** الدرسُ الحيّ غيرُ مؤرشف
--       (`archived_at is null`)، والنصُّ الرسميّ وحده (`created_by is null`).
--    ② **`keyed` لا `marhala`:** المرحلةُ تُشتقّ في `make_requests.py` من
--       العددين (`lessons` و`keyed`) — فلا تُكتب حكماً هنا فتفترق عن مشتقّها.
--    ③ **الترتيبُ ترتيبُ `state.sql`** (المادة · رتبةُ الصفّ · الرقم) — فتُقرأ
--       الدفعتان جنباً إلى جنب.
-- ══════════════════════════════════════════════════════════════════════

select jsonb_pretty(jsonb_build_object(
  'note', 'يُولَّد من قاعدة بيان بـtools/catalog.sql — لا يُحرَّر بيد. يقرؤه make_requests.py --texts وحده.',
  'generated_at', to_char(now() at time zone 'Asia/Riyadh', 'YYYY-MM-DD"T"HH24:MI:SS+03:00'),
  'db_migration', (select max(sql_log_sort(n))::text from sql_log),
  'courses', coalesce(jsonb_agg(jsonb_build_object(
      'course_id', c.id, 'subject', sb.name, 'subject_code', sb.code,
      'level', lv.name, 'title', c.title,
      'lessons', (select count(*) from lessons le
                   where le.course_id = c.id and le.archived_at is null),
      'keyed',   (select count(le.author_key) from lessons le
                   where le.course_id = c.id and le.archived_at is null),
      'texts',   (select count(*) from items i join lessons le on le.id = i.lesson_id
                   where le.course_id = c.id and le.archived_at is null
                     and i.kind = 'text' and i.created_by is null),
      'lessons_with_texts', (select count(distinct le.id) from items i join lessons le on le.id = i.lesson_id
                   where le.course_id = c.id and le.archived_at is null
                     and i.kind = 'text' and i.created_by is null)
    ) order by sb.name, lv.rank nulls first, c.id), '[]'::jsonb)
)) as catalog_json
from courses c
join subjects sb on sb.id = c.subject_id
left join levels lv on lv.id = c.level_id
where c.active;
