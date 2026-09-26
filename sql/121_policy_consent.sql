-- ═══════════════════════════════════════════════════════════════════════
-- 121 · الموافقة على سياسة الخصوصية — تُسجَّل بنسختها ووقتها
--
-- صارت الموافقةُ شرطاً من شروط التسجيل. **وموافقةٌ لا تُسجَّل ليست
-- موافقة**: مربّعٌ يُنقَر في الواجهة ثمّ لا يُكتب أثرُه لا يُثبت شيئاً
-- يوم يُسأل عنه — لا للمستخدم ولا علينا.
--
-- 🔑 **ونسخةٌ لا «نعم» مجرّدة:** السياسةُ تتغيّر، ومن وافق على نصٍّ
--    لم يوافق على تاليه. فتُحفَظ النسخةُ مع الوقت، ويُعرَف **على ماذا**
--    وافق لا أنّه وافق.
--    ⚠️ والنسخةُ هي تاريخُ «آخر تحديث» في `privacy.html` بحرفه —
--       موضعان لقيمةٍ واحدة يتفارقان، فغيّرتَ أحدَهما؟ غيّر الآخر.
--       (وهو نظيرُ `--page` و`theme-color` في هذا المشروع.)
--
-- 🔑 **وأوّلُ موافقةٍ تُصان:** إعادةُ النداء بالنسخة نفسِها **لا تُحرّك
--    الوقت** — وإلا صار السجلُّ يقول إنّه وافق اليوم وقد وافق قبل سنة.
--    أمّا نسخةٌ جديدة فتُكتب بوقتها: موافقةٌ أخرى على نصٍّ آخر.
--
-- 🟡 **والتسعةَ عشرَ القائمون لم يوافقوا** — لم يُعرَض عليهم شيء.
--    ولا تُختَم لهم موافقةٌ لم تقع: **ختمٌ عن أحدٍ أسوأ من غيابه.**
--    ⇒ حقولُهم تبقى فارغة، وعرضُ السياسة عليهم قرارٌ لم يُتّخذ بعد.
--
-- ⚠️ **ولا تحرس هذه الدالّةُ باباً:** الموافقةُ شرطُ تسجيلٍ في الواجهة،
--    ولم تُربط بـ RLS ولا بـ`can_author`. وربطُها يقفل التسعةَ عشرَ
--    خارج حساباتهم في اللحظة نفسِها — قرارٌ يُناقَش ولا يُدسّ في ملفّ.
-- ═══════════════════════════════════════════════════════════════════════

set check_function_bodies = off;


-- ═══════════════════════════════════════════════════════════════════════
-- ① العمودان
-- ═══════════════════════════════════════════════════════════════════════

alter table public.profiles add column if not exists policy_accepted_at timestamptz;
alter table public.profiles add column if not exists policy_version     text;

comment on column public.profiles.policy_accepted_at is
  'وقتُ أوّل موافقةٍ على النسخة المحفوظة في policy_version. فارغٌ لمن سجّل قبل 121 (121)';
comment on column public.profiles.policy_version is
  'تاريخُ «آخر تحديث» في privacy.html وقتَ الموافقة — غيّرتَ الصفحة؟ غيّر الثابت في js/policy.js (121)';


-- ═══════════════════════════════════════════════════════════════════════
-- ② الختم
-- ═══════════════════════════════════════════════════════════════════════

create or replace function public.accept_policy(p_version text)
returns jsonb language plpgsql security definer set search_path to 'public'
as $function$
declare v_ver text; v_at timestamptz; v_new text;
begin
  if auth.uid() is null then raise exception 'يجب تسجيل الدخول'; end if;

  v_new := nullif(trim(coalesce(p_version,'')), '');
  if v_new is null then
    return jsonb_build_object('ok', false, 'error', 'نسخةُ السياسة غير معروفة');
  end if;

  select policy_version, policy_accepted_at into v_ver, v_at
    from profiles where id = auth.uid();

  -- 🔑 النسخةُ نفسُها ⇒ لا يُحرَّك الوقت: أوّلُ موافقةٍ هي الواقعة
  if v_ver is distinct from v_new or v_at is null then
    update profiles
       set policy_version = v_new, policy_accepted_at = now()
     where id = auth.uid();
    select policy_accepted_at into v_at from profiles where id = auth.uid();
  end if;

  return jsonb_build_object('ok', true, 'version', v_new, 'at', v_at);
end $function$;

revoke all  on function public.accept_policy(text) from public, anon, authenticated;
grant execute on function public.accept_policy(text) to authenticated, service_role;


-- ═══════════════════════════════════════════════════════════════════════
-- ③ السجلّ
-- ═══════════════════════════════════════════════════════════════════════

insert into public.sql_log (n, title, applied_at)
values ('121', 'الموافقة على سياسة الخصوصية — تُسجَّل بنسختها ووقتها', now())
on conflict (n) do update set applied_at = now();
