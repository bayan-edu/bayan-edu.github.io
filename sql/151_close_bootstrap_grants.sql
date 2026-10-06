-- ═══════════════════════════════════════════════════════════════════════
-- 151 · أدوات التمهيد تُغلق — بابٌ بقي مفتوحاً بعد أن أدّى عمله
--
-- 🔴 **ثقبُ استيلاءٍ كامل، لا ثغرةُ قراءة.** `make_admin(text)` و
--    `make_teacher(text)` كلتاهما `security definer` تكتبان `profiles.role`
--    **بلا حارسٍ واحدٍ في جسدهما**، ومنحُهما إلى `PUBLIC` و`anon`. وقيس
--    المنح لا استُنتج:
--
--      has_function_privilege('anon', 'public.make_admin(text)', 'execute') = true
--
--    ⇒ **نداءٌ واحدٌ على PostgREST ببريدٍ قائم يصيّر صاحبَه مديراً للمنصّة.**
--    بلا جلسةٍ ولا كلمةِ مرور. ومن سجّل حساباً بنفسه يرفع نفسَه.
--
-- 🔑 **ولماذا هما أسوأ ممّا في `STATE §⑦`:** ذاك يقول «الحراسة داخل الدوالّ
--    وحدها — طبقةٌ حيث ينبغي طبقتان». وهاتان **بلا طبقةٍ أصلاً**: لا في
--    المنح ولا في الجسد. وما قيل عن `58` يصف ضعفَ السقف، وهذا بابٌ بلا
--    مِصراع.
--
-- 📌 **وأصلُهما بريء:** أداتا تمهيدٍ من أيام الإعداد الأولى — بهما صُنع
--    المديرُ الأوّل يوم لم يكن في القاعدة مديرٌ يحرسُ البابَ أصلاً. أدّتا
--    عملهما ونُسيتا. **والخطأ الصامت يُصدَّق** (القاعدة ⑤).
--
-- 🟡 **وثالثةٌ أهونُ، أُعلنت ولم تُنفَّذ:** `request_teacher_access` ممنوحةٌ
--    لـ`anon` وتُنتج `pending_teacher` بلا لوحةٍ تبتّ فيه — وقد كُتب في
--    `js/ui.js:275` أنّ «منحَها يُسحب في ملفٍّ تالٍ». وهذا الملفّ.
--
-- ⚠️ **وهي تُنادى من الواجهة فعلاً** (`api.js:528` ← `auth.js:777`) — خلافاً
--    لما بدا. فلا تُسحب من `authenticated`: النداءُ يقع **بعد** التثبّت من
--    وجود جلسة (`auth.js:772`)، فالمنادي مسجَّلٌ دائماً ولا يكون `anon` أبداً.
--    ⇒ تُسحب من `public, anon` وحدهما، ومسارُ التسجيل يعمل كما هو.
--
-- ═══ ما لا يتغيّر بهذا الملفّ — قيس ولم يُفترض ═══
--   · `postgres` و`service_role` يحملان منحاً **صريحاً مستقلّاً** عن
--     `PUBLIC` (فُحص بـ`aclexplode`) ⇒ مسارُك من لوحة Supabase باقٍ.
--   · `curators` و`can_curate` لا يمسّهما حرف. وتنسيقُ المدير يأتي من
--     `is_admin()` — أي من **صفٍّ مخزَّن** في `profiles.role` — والمنحُ
--     يحكم النداء ولا يحكم صفّاً قائماً.
--   · `grant_curator` و`revoke_curator` خارج هذا الملفّ: منحُهما باقٍ
--     وحارسُ `is_admin()` فيهما قائمٌ من أوّل يوم. **وهما السليمتان
--     اللتان تُبنى عليهما لوحةُ الإدارة.**
--   · ولا `drop` ولا `delete`: الدالّتان تبقيان حيّتين بنصّهما.
--
-- 🟡 **وخطرٌ باقٍ يُقال ولا يُسكت عنه:** جسدُ الدالّتين ما زال بلا حارس.
--    والمنحُ وحده طبقةٌ واحدة، وسطرٌ شائعٌ في مشاريع Supabase —
--    `grant execute on all functions in schema public to anon, authenticated;`
--    — **يُعيد فتح البابِ صامتاً**. ⇒ الطبقةُ الثانية (حارسٌ في الجسد،
--    ومعه مسارٌ محروسٌ لتغيير الأدوار من اللوحة) تُبنى في الملفّ التالي
--    مع شاشة الإدارة. **وتُركت هنا عمداً** لأنّ استبدال جسد دالّةٍ حيّة
--    هو بعينه ما أوقع حادثة ٥ سبتمبر، فلا يُجمع مع سحبِ منحٍ في ملفٍّ واحد.
-- ═══════════════════════════════════════════════════════════════════════


-- ═══════════════════════════════════════════════════════════════════════
-- ① سحبُ المنح — معدَّلٌ لا منشأ · والسحبُ عديمُ الأثر عند الإعادة
-- ═══════════════════════════════════════════════════════════════════════

revoke execute on function public.make_admin(text)
  from public, anon, authenticated;

revoke execute on function public.make_teacher(text)
  from public, anon, authenticated;

-- `authenticated` تبقى — الواجهةُ تناديها بجلسةٍ قائمة (انظر الرأس)
revoke execute on function public.request_teacher_access(text, text, integer, text)
  from public, anon;


-- ═══════════════════════════════════════════════════════════════════════
-- ② الحُجَّة تُكتب حيث يقع السؤال — لا في ملفٍّ يُفتح مرّةً كلَّ سنة
--    من يقرأ الدالّة في القاعدة يقرأ سببَ إغلاقها معها.
-- ═══════════════════════════════════════════════════════════════════════

comment on function public.make_admin(text) is
  '⛔ أداةُ تمهيدٍ — محجوبةٌ عن الويب منذ 151. لا تُنادى إلا بدور postgres '
  'أو service_role من لوحة Supabase. كانت ممنوحةً لـanon بلا حارسٍ في جسدها '
  '⇒ استيلاءٌ كامل بنداءٍ واحد. ولرفع الأدوار من المنصّة: لوحةُ الإدارة.';

comment on function public.make_teacher(text) is
  '⛔ أداةُ تمهيدٍ — محجوبةٌ عن الويب منذ 151. نظيرةُ make_admin وعلّتُها. '
  'والمسارُ المعتمد لمنح دور المعلّم: admin_decide أو لوحةُ الإدارة.';

comment on function public.request_teacher_access(text, text, integer, text) is
  'تبقى لـauthenticated — تناديها js/auth.js:777 بعد التثبّت من الجلسة. '
  'وسُحبت من anon في 151. 🟡 وتُنتج pending_teacher ولا لوحةَ تبتّ فيه بعد '
  'تقاعدِ شاشة الطلبات (b90) — يُحسم مع لوحة الإدارة.';


-- ═══════════════════════════════════════════════════════════════════════
-- ③ الفحص — لكلّ حالةٍ سطرُها، ولا سطرَ واحدٌ على ثلاثة أشياء (القاعدة ④)
--    يُشغَّل بعد التطبيق. كلُّ سطرٍ يقول حكمَه بنفسه.
-- ═══════════════════════════════════════════════════════════════════════
/*
select 'make_admin · محجوبةٌ عن الزائر' as الفحص,
       case when has_function_privilege('anon','public.make_admin(text)','execute')
            then '🔴 ما زالت مفتوحة' else '✅ أُغلقت' end as الحكم
union all
select 'make_admin · محجوبةٌ عن المسجَّل',
       case when has_function_privilege('authenticated','public.make_admin(text)','execute')
            then '🔴 ما زالت مفتوحة' else '✅ أُغلقت' end
union all
select 'make_teacher · محجوبةٌ عن الزائر',
       case when has_function_privilege('anon','public.make_teacher(text)','execute')
            then '🔴 ما زالت مفتوحة' else '✅ أُغلقت' end
union all
select 'make_teacher · محجوبةٌ عن المسجَّل',
       case when has_function_privilege('authenticated','public.make_teacher(text)','execute')
            then '🔴 ما زالت مفتوحة' else '✅ أُغلقت' end
union all
select 'request_teacher_access · محجوبةٌ عن الزائر',
       case when has_function_privilege('anon','public.request_teacher_access(text,text,integer,text)','execute')
            then '🔴 ما زالت مفتوحة' else '✅ أُغلقت' end
union all
select 'request_teacher_access · باقيةٌ للمسجَّل ⇐ التسجيل يعمل',
       case when has_function_privilege('authenticated','public.request_teacher_access(text,text,integer,text)','execute')
            then '✅ باقية' else '🔴 سقطت — مسارُ تسجيل المعلّم معطوب' end
union all
select 'مسارُ الطوارئ · service_role باقٍ',
       case when has_function_privilege('service_role','public.make_admin(text)','execute')
            then '✅ باقٍ' else '🔴 سقط — لا سبيل لصنع مديرٍ أوّل' end
union all
select 'التنسيق · grant_curator لم تُمسّ',
       case when has_function_privilege('authenticated','public.grant_curator(text,bigint)','execute')
            then '✅ باقية' else '🔴 سقطت' end
union all
select 'الأدوار القائمة · لم ينقص أحد',
       (select string_agg(role||'='||c,' · ' order by c desc)
          from (select role, count(*) c from profiles group by role) x);
*/


-- ═══════════════════════════════════════════════════════════════════════
-- ④ السجلّ
-- ═══════════════════════════════════════════════════════════════════════

insert into public.sql_log (n, title, applied_at)
values ('151', 'أدوات التمهيد تُغلق — بابٌ بقي مفتوحاً بعد أن أدّى عمله', now())
on conflict (n) do update set applied_at = now();
