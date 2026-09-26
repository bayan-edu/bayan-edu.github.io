-- ═══════════════════════════════════════════════════════════════════════
-- 122 · قائمةُ المواد للتسجيل — بابٌ ضيّق لا سياسةٌ تُرخى
--
-- نموذجُ تسجيل المعلّم يحتاج **معرّفَ مادّة** (لتُنشأ `teacher_subjects`
-- في `register_teacher`)، ولا معرّفَ بلا قائمة. و`p_subjects_read`
-- تشترط `auth.uid() is not null` ⇒ لا تُقرأ القائمةُ قبل الجلسة،
-- فانقسم النموذجُ خطوتين — **والانقسامُ نتيجةٌ لا اختيار**.
--
-- 🔑 **ولمَ لم تُرخَ السياسة إلى `true` كأختيها؟** `scales` و`levels`
--    مفتوحتان، ويبدو `subjects` شاذّاً بينهما. لكنّ الجدول ليس أسماءً
--    فقط: فيه `owner_id` و`placement` و`progression` و`tool` —
--    **أمورٌ داخلية**. وفتحُ الجدول كلِّه لأجل حقلٍ في نموذجٍ يكشف
--    أكثرَ ممّا يحتاجه. ⇒ **الحقُّ يُعطى بقدره: اسمٌ ومعرّف.**
--
-- ⚠️ ولا `family` ولا `icon` ولا `code` — لا يحتاجها المنتقي، وكلُّ
--    عمودٍ يُضاف هنا يصير معلوماً لكلّ زائرٍ إلى الأبد. **والتوسيعُ
--    لاحقاً سطر، والتضييقُ بعد الانتشار ليس سطراً.**
--
-- 🔒 وبلا بيانات: أسماءُ موادَّ دراسية عامّة («English» · «الرياضيات»)،
--    لا أسماءَ أشخاصٍ ولا محتوًى ولا مفاتيح.
-- ═══════════════════════════════════════════════════════════════════════

set check_function_bodies = off;

create or replace function public.signup_subjects()
returns jsonb language sql stable security definer set search_path to 'public'
as $function$
  select coalesce(
    jsonb_agg(jsonb_build_object('id', s.id, 'name', s.name)
              order by s.sort_order, s.name),
    '[]'::jsonb)
  from subjects s where s.active;
$function$;

-- الثلاثةُ ثمّ المنح (درس 117): بوستجريس يمنح PUBLIC، وسوبابيس يمنح
-- anon بالافتراضيّ — فالسحبُ من واحدٍ لا يُغلق شيئاً.
revoke all  on function public.signup_subjects() from public, anon, authenticated;
grant execute on function public.signup_subjects()
  to anon, authenticated, service_role;


insert into public.sql_log (n, title, applied_at)
values ('122', 'قائمةُ المواد للتسجيل — بابٌ ضيّق لا سياسةٌ تُرخى', now())
on conflict (n) do update set applied_at = now();
