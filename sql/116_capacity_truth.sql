-- ═══════════════════════════════════════════════════════════════════════
-- 116 · سعةُ المعلّم تقول هل حُفظت — لا «نعم» دائمة
--
-- يُبنى فوق هذه الدالّة تحكّمٌ ذاتيّ في شاشة «موادّي» (b88)، وقبل أن
-- يُبنى تُصلَح كذبةٌ فيها: جسمُها `update … ; return true;` — فالتحديث
-- الذي لا يمسّ صفّاً **يعود بـ«نجح»**.
--
-- 🔴 ومتى يقع ذلك فعلاً: `set_my_subjects` تُنشئ صفَّ `teacher_subjects`
--    وتحذفه. فمعلّمٌ نقر مادّةً ولم يحفظ بعدُ **لا صفَّ له فيها** —
--    فيضبط سعتَه، وتقول الشاشة «حُفظت»، ولا شيء حُفظ. وهو صنفُ العطل
--    الذي عالجه `106` بحرفه: «سياسة UPDATE لا تُطابق ⇒ صفر صفوفٍ بلا
--    خطأ ⇒ والعلاج دالّةٌ تُرجع ما تغيّر، فيُرى الفشل».
--
-- 🔑 و`found` لا نوعٌ جديد: تبديلُ نوع الإرجاع يقتضي `drop function`
--    على قاعدةٍ حيّة، وهذا يُغني عنه — **كلمةٌ واحدة تُبدَّل، والتوقيع
--    كما هو، ولا نداءَ قائمٌ ينكسر** (فُحص: لا مستدعيَ لها في الشيفرة
--    ولا في دالّةٍ أخرى ولا في سياسة).
--
-- ⚠️ والحدّان `1..500` يبقيان في القاعدة حارساً: الواجهة تقصّ للراحة،
--    والقاعدة تقصّ للأمان — ومن يثق بالواجهة وحدها يأتيه نداءٌ مباشر.
-- ═══════════════════════════════════════════════════════════════════════

set check_function_bodies = off;


-- ═══════════════════════════════════════════════════════════════════════
-- ① معدَّلة لا منشأة — set_subject_capacity
--    قُرئت حيّةً بـ pg_get_functiondef قبل الاستبدال (⓪·ب ①)،
--    والفرق `return true` ⇐ `return found`. وما عداه بحرفه.
-- ═══════════════════════════════════════════════════════════════════════

create or replace function public.set_subject_capacity(
  p_subject bigint, p_cap integer, p_accepting boolean)
returns boolean language plpgsql security definer set search_path to 'public'
as $function$
begin
  if not is_teacher() then raise exception 'صلاحية المعلم مطلوبة'; end if;
  update teacher_subjects
     set capacity = greatest(1, least(500, coalesce(p_cap, capacity))),
         accepting = coalesce(p_accepting, accepting)
   where teacher_id = auth.uid() and subject_id = p_subject;
  -- 🔑 لا `true` مطلقة: صفرُ صفوفٍ خبرٌ يُبلَّغ لا صمتٌ يُصدَّق
  return found;
end $function$;

grant execute on function public.set_subject_capacity(bigint, integer, boolean)
  to anon, authenticated, service_role;


-- ═══════════════════════════════════════════════════════════════════════
-- ② السجلّ
-- ═══════════════════════════════════════════════════════════════════════

insert into public.sql_log (n, title, applied_at)
values ('116', 'سعةُ المعلّم تقول هل حُفظت — لا «نعم» دائمة', now())
on conflict (n) do update set applied_at = now();
