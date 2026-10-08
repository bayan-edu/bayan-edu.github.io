-- ═══════════════════════════════════════════════════════════════════════
-- 153 · أداتا التمهيد تعودان من بابٍ واحد — الطبقةُ الثانية التي وعد بها 151
--
-- أغلق `151` المنحَ عن `make_admin` و`make_teacher`، **وبقي جسدُهما بلا
-- حارس**: `security definer` تكتبان `profiles.role` ولا تسألان من المنادي.
-- والمنحُ وحده طبقةٌ واحدة، **وسطرٌ شائعٌ في مشاريع Supabase يُعيد فتح
-- البابِ صامتاً:**
--     grant execute on all functions in schema public to anon, authenticated;
--
-- 🔑 **والعلاجُ ليس حارساً ثانياً يُنسخ، بل بابٌ واحد.** لو كُتب
--    `if not is_admin()` في كلٍّ منهما لصار في المنصّة **ثلاثةُ مواضعَ
--    تمنح الأدوار**، ولكلٍّ قانونُه: واحدٌ يحمي آخرَ مدير، واثنان لا.
--    **وقانونٌ في ثلاثة مواضعَ ينحرف.** ⇒ تصيران غلافين رقيقين فوق
--    `admin_set_role` (152)، فترثان منها الثلاثة معاً:
--      ① حارسَ `is_admin()`      ② منعَ خفضِ آخرِ مدير
--      ③ وسطرَ التدقيق في `admin_audit` — **وكان المنحُ يقع بلا أثر.**
--
-- 🔓 **وتعودان صالحتين للنداء من اللوحة والطرفية معاً** بعد أن كانتا
--    محجوبتين بالكلّية في `151`. والبريدُ مفتاحُهما، وهو أيسرُ على اليد
--    من `uuid` — فلهما بعد اليوم عملٌ حقيقيّ لا تقاعد.
--
-- 🔴 **وعطلٌ صامتٌ في `make_teacher` يُصلَح بالمناسبة:** كانت تقول
--    `where email = lower(p_email)` — **تُنزِّل المدخَل ولا تُنزِّل العمود.**
--    فبريدٌ مسجَّلٌ بحرفٍ كبير لا يُطابَق أبداً، وتردّ «لا يوجد مستخدم»
--    على حسابٍ قائم. **وخطأُ المطابقةِ يُقرأ غياباً، والغيابُ يُصدَّق.**
--
-- ⚠️ **ومسارُ الطوارئ إن خلت المنصّة من مديرٍ البتّة:** `is_admin()` تقرأ
--    `auth.uid()` وهي `null` في محرّر Supabase ⇒ **لا تمرّ هذه ولا تلك.**
--    وذاك مقصود: من لا جلسةَ له ليس مديراً. والرفعُ حينها بالكتابة
--    المباشرة بدور `postgres`، ولا تحتاج دالّةً أصلاً:
--      update profiles set role = 'admin'
--       where id = (select id from auth.users where lower(email) = lower('‹البريد›'));
--    📌 **ولا تُبنى لها دالّةٌ «تتخطّى عند غياب المدير»:** شرطٌ كهذا
--       يصير بابَ الاستيلاء نفسَه يوم يُحذف آخرُ مدير بالخطأ.
--
-- 🔒 وما لا يتغيّر: منحُ `151` مسحوبٌ كما هو — `public` و`anon` و
--    `authenticated` لا تنادي أيّاً منهما. والطبقتان تعملان معاً.
-- ═══════════════════════════════════════════════════════════════════════

set check_function_bodies = off;


-- ═══════════════════════════════════════════════════════════════════════
-- ① معدَّلتان لا منشأتان — قُرئتا حيّتين بـ`pg_get_functiondef` (⓪·ب ①).
--    التوقيعُ والنوعُ المرتجَع محفوظان بحرفهما (`text`)، وجسدُهما وحده
--    يتحوّل من كتابةٍ مباشرة إلى نداءِ البابِ الواحد.
-- ═══════════════════════════════════════════════════════════════════════

create or replace function public.make_admin(p_email text)
returns text language plpgsql security definer set search_path to 'public', 'auth'
as $function$
declare v_id uuid; v jsonb;
begin
  select id into v_id from auth.users where lower(email) = lower(btrim(p_email));
  if v_id is null then return '⚠️ لا حساب بهذا البريد'; end if;

  v := admin_set_role(v_id, 'admin', 'من make_admin');
  if coalesce((v->>'ok')::boolean, false) then
    return '✅ صار في الإدارة: ' || p_email;
  end if;
  return '⛔ ' || coalesce(v->>'error', 'تعذّر');
end $function$;


create or replace function public.make_teacher(p_email text)
returns text language plpgsql security definer set search_path to 'public', 'auth'
as $function$
declare v_id uuid; v jsonb;
begin
  -- 🔴 والعمودُ يُنزَّل كما يُنزَّل المدخَل — انظر الرأس
  select id into v_id from auth.users where lower(email) = lower(btrim(p_email));
  if v_id is null then return '⚠️ لا حساب بهذا البريد'; end if;

  v := admin_set_role(v_id, 'teacher', 'من make_teacher');
  if coalesce((v->>'ok')::boolean, false) then
    return '✅ صار في التعليم: ' || p_email;
  end if;
  return '⛔ ' || coalesce(v->>'error', 'تعذّر');
end $function$;


-- ═══════════════════════════════════════════════════════════════════════
-- ② الحُجَّة في موضعها — تُصحَّح بعد 151
-- ═══════════════════════════════════════════════════════════════════════

comment on function public.make_admin(text) is
  'غلافٌ بالبريد فوق admin_set_role (152 · 153) — يرث حارسَ is_admin ومنعَ '
  'خفضِ آخرِ مدير وسطرَ التدقيق. ومنحُه مسحوبٌ عن الويب منذ 151: لا يُنادى '
  'إلا بدور postgres أو service_role، أو من لوحة الإدارة عبر admin_set_role.';

comment on function public.make_teacher(text) is
  'نظيرةُ make_admin. وأُصلح فيها تطبيعُ البريد: كان العمودُ يُقارَن خاماً '
  'بمدخَلٍ منزَّل، فبريدٌ بحرفٍ كبير لا يُطابَق ويُردّ «لا يوجد مستخدم».';


-- ═══════════════════════════════════════════════════════════════════════
-- ③ الفحص — لكلّ حالةٍ سطرُها
-- ═══════════════════════════════════════════════════════════════════════
/*
-- ⓵ الغلافُ يستدعي البابَ الواحد لا يكتب بيده
select 'make_admin تنادي admin_set_role' as الفحص,
       case when pg_get_functiondef('public.make_admin(text)'::regprocedure) ~ 'admin_set_role'
             and pg_get_functiondef('public.make_admin(text)'::regprocedure) !~* 'update\s+profiles'
            then '✅' else '🔴' end as الحكم
union all
select 'make_teacher كذلك',
       case when pg_get_functiondef('public.make_teacher(text)'::regprocedure) ~ 'admin_set_role'
             and pg_get_functiondef('public.make_teacher(text)'::regprocedure) !~* 'update\s+profiles'
            then '✅' else '🔴' end
union all
select 'منحُ 151 باقٍ مسحوباً',
       case when has_function_privilege('anon','public.make_admin(text)','execute')
             or has_function_privilege('authenticated','public.make_admin(text)','execute')
             or has_function_privilege('anon','public.make_teacher(text)','execute')
             or has_function_privilege('authenticated','public.make_teacher(text)','execute')
            then '🔴 انفتح' else '✅ مسحوب' end
union all
select 'تطبيعُ البريد في الاثنتين',
       case when pg_get_functiondef('public.make_teacher(text)'::regprocedure) ~ 'lower\(email\)'
            then '✅ العمودُ يُنزَّل' else '🔴 خام' end;

-- ⓶ والحارسُ الموروث يُجرَّب حيّاً — بلا جلسةٍ فلا مدير، فتُردّ
select make_admin('la-ahad-bihadha@example.invalid') as بريدٌ_غيرُ_موجود,
       make_admin((select email from auth.users limit 1)) as بحسابٍ_قائمٍ_بلا_جلسة;
--     الثانيةُ تُردّ بـ«⛔ صلاحية المدير مطلوبة» ⇐ الحارسُ ورِث.
*/


-- ═══════════════════════════════════════════════════════════════════════
-- ④ السجلّ
-- ═══════════════════════════════════════════════════════════════════════

insert into public.sql_log (n, title, applied_at)
values ('153', 'أداتا التمهيد غلافان فوق admin_set_role — الطبقة الثانية', now())
on conflict (n) do update set applied_at = now();
