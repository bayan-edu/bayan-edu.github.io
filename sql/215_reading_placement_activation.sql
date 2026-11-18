-- ══════════════════════════════════════════════════════════
-- 215 · تفعيل أداة تحديد المستوى لمكتبة بيان وفك تعارض المحطة القديمة
--       (المرحلة ٧ب من `spec-reading-library.md` · ١٨ نوفمبر ٢٠٢٦)
--
-- لماذا:
--   ① **ربطُ مادة مكتبة بيان (٧) بأداتها التكيفية:**
--      المادةُ `placement = 'test'` وكان `tool is null` في `subjects`، والواجهة (`startPlacement` في `js/student.js`)
--      تردّ فوراً «اختبار تحديد المستوى قيد الإعداد» إن كان `x.tool` فارغاً. وضبطُها `reading_placement` يفتح الباب
--      لنداء `placement_start('reading_placement')`.
--   ② **فكُّ تعارض الاختبار المهجور ١٩ (Routing):**
--      اختبارٌ قديمٌ فارغ (بلا نصوص ولا أسئلة) حَمَل `tool = 'reading_placement'` و`station_kind = 'routing'`.
--      وحارسُ الجاهزية (`tool_readiness` في `213`) يردّ «ليست بنكَ طبقة — والأداةُ التكيّفيّة لا محطّاتِ مسارٍ فيها»،
--      فيسقط فحص الجاهزية كلّه (`ok: false`). وتصفيرُ `tool` فيه يزيل العارض وتبقى بنوك الطبقات وحدها (`adaptive`).
-- ══════════════════════════════════════════════════════════

begin;

-- ① ربط مادة مكتبة بيان بأداتها
update public.subjects
   set tool = 'reading_placement'
 where id = 7
   and (tool is distinct from 'reading_placement');

-- ② تصفير الأداة للاختبار القديم المهجور ١٩ لفك التعارض مع المحرك التكيفي
update public.quizzes
   set tool = null
 where id = 19
   and tool is not null;

-- ③ ختم سجل الهجرات
insert into public.sql_log (n, title, applied_at)
values ('215', 'تفعيل أداة تحديد المستوى لمكتبة بيان وفك تعارض المحطة القديمة', now())
on conflict (n) do update set applied_at = now();

commit;
