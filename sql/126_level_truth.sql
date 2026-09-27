-- ═══════════════════════════════════════════════════════════════════════
-- 126 · مستوى الطالب — مصدرٌ واحدٌ يُختار بالمعنى لا بترتيب coalesce
--
-- مصدران للمستوى، ولكلٍّ معنًى مختلف:
--   `profiles.level_id`   ← **صفٌّ إداريّ** يعلنه الطالب ويُكتب بـ`set_my_grade`
--   `student_levels`      ← **مستوًى مقيس** يكتبه اختبارُ تسكين (`source='test'`)
--
-- 🔴 **والقارئُ كان يرجّح بترتيبٍ لا بمعنًى:** `coalesce(student_levels,
--    profiles)` — أي أنّ الاختبارَ يغلب الإعلان **في كلّ سلّم**. فطالبٌ
--    سُكّن ثمّ غيّر صفَّه من ملفّه **لا يتغيّر مستواه**، و«تغيير الصف»
--    يُقبَل ولا يقع. **عطلٌ صامت: الزرُّ يعمل والنتيجةُ لا تتحرّك.**
--
-- ✅ **وهو كامنٌ لا مشتعل — قيس قبل الإصلاح:** صفٌّ واحدٌ في
--    `student_levels` مصدرُه `test` وسلّمُه `نطاقات IELTS`، وصاحبُه
--    سلّمُه في `profiles` هو `البكالوريا المصرية`. **وصفرُ اختلافٍ اليوم.**
--    والمواد كلُّها متوافقة: `academic ⇔ placement='profile'` (١٧ مادة) و
--    `proficiency ⇔ placement='test'` (مادّتان). ⇒ **هذا الملفُّ لا يُغيّر
--    قيمةً واحدة اليوم، وإنّما يمنع ما يقع غداً.**
--
-- 🔑 **والعلاجُ يتبع قانونَ المشروع المكتوب** (٥-١ في STATE): «`level_from_score`
--    **لا تُخمّن الصفَّ من درجة** — الدرجة تقيس مهارةً، والصفُّ حقيقةٌ
--    إدارية. خلطُهما يُنزل طالباً صفّاً.» ⇒ المرجّحُ **نوعُ السلّم**:
--      `academic`    ⇒ الإعلانُ أولاً (الصفُّ حقيقةٌ إدارية لا تُقاس)
--      غيرُ ذلك      ⇒ المقيسُ أولاً (المهارةُ تُقاس ولا تُعلَن)
--
-- 🔑 **وقاعدةٌ واحدةٌ في موضعٍ واحد:** `my_rank` كانت **تكرّر الـcoalesce
--    بنفسها** — نسختان لحكمٍ واحد تتفارقان عند أوّل تعديلٍ لإحداهما.
--    ⇒ صارت تشتقّ من `my_level_id` ولا تعرف المصادر أصلاً.
--
-- 🔑 **وحارسٌ عند الكتابة لا عند القراءة وحدها:** `set_my_level` تمتنع عن
--    السلالم الأكاديمية. وهي **الكاتبُ الوحيد** لـ`student_levels` (فُحص
--    في `pg_proc`) — فالمنعُ عندها يسدّ البابَ كلَّه. ولا تناديها الواجهةُ
--    اليوم أصلاً، فالحارسُ بلا كلفة.
--    📌 **ولم يُوضع قيدٌ على `subjects`** يربط `placement` بنوع السلّم:
--       ذاك يحكم تصميمَ المحتوى، وهذا يحرس معنى المستوى. **حارسٌ عند
--       الفعل أهونُ من قيدٍ يمنع تصميماً لم يُتصوَّر بعد.**
-- ═══════════════════════════════════════════════════════════════════════

set check_function_bodies = off;


-- ═══════════════════════════════════════════════════════════════════════
-- معدَّلة لا منشأة · ① my_level_id — المرجّحُ نوعُ السلّم
--    ⚠️ ويبقى الرجوعُ إلى الآخر عند غياب الأوّل: مَن لم يُعلن صفَّه
--       وسُكّن يُقرأ تسكينُه، ومن أُعلن ولم يُسكَّن يُقرأ إعلانُه.
--       **الترجيحُ يحسم التعارض، ولا يهدر ما لا تعارضَ فيه.**
-- ═══════════════════════════════════════════════════════════════════════

create or replace function public.my_level_id(p_scale bigint, p_user uuid default auth.uid())
returns bigint language sql stable security definer set search_path to 'public'
as $function$
  select case when (select kind from scales where id = p_scale) = 'academic'
    then coalesce(
      (select level_id from profiles       where id      = p_user and scale_id = p_scale),
      (select level_id from student_levels where user_id = p_user and scale_id = p_scale))
    else coalesce(
      (select level_id from student_levels where user_id = p_user and scale_id = p_scale),
      (select level_id from profiles       where id      = p_user and scale_id = p_scale))
  end;
$function$;


-- ═══════════════════════════════════════════════════════════════════════
-- معدَّلة لا منشأة · ② my_rank — تشتقّ ولا تكرّر
--    و«‏-1‏» تبقى قيمةَ الغياب كما كانت: يقرؤها `set_my_grade` في
--    `from_rank <= coalesce(v_rank,-1)` وغيرُها — فتغييرُها يُحرّك مسارات.
-- ═══════════════════════════════════════════════════════════════════════

create or replace function public.my_rank(p_scale bigint, p_user uuid default auth.uid())
returns integer language sql stable security definer set search_path to 'public'
as $function$
  select coalesce(
    (select l.rank from levels l where l.id = my_level_id(p_scale, p_user)),
    -1);
$function$;


-- ═══════════════════════════════════════════════════════════════════════
-- معدَّلة لا منشأة · ③ set_my_level — لا تكتب صفّاً أكاديمياً
--    ⚠️ ونصُّ الامتناع يقول **ما يُفعل بدلاً منه**، وإلا قرأه المنفِّذُ
--       عطلاً وبحث عن التفافٍ عليه.
-- ═══════════════════════════════════════════════════════════════════════

create or replace function public.set_my_level(p_scale bigint, p_level bigint, p_source text default 'self'::text)
returns jsonb language plpgsql security definer set search_path to 'public'
as $function$
declare v_kind text;
begin
  if auth.uid() is null then raise exception 'يجب تسجيل الدخول'; end if;

  select kind into v_kind from scales where id = p_scale;
  if v_kind is null then
    return jsonb_build_object('ok', false, 'error', 'السلّم غير موجود');
  end if;

  -- 🔑 الصفُّ الأكاديميّ حقيقةٌ إدارية لا تُقاس باختبار (٥-١ · 126)
  if v_kind = 'academic' then
    return jsonb_build_object('ok', false,
      'error', 'الصفُّ الدراسيّ لا يُكتب باختبار — يُغيَّر من الملفّ الشخصيّ (set_my_grade)');
  end if;

  if not exists (select 1 from levels where id = p_level and scale_id = p_scale) then
    return jsonb_build_object('ok', false, 'error', 'هذا المستوى لا ينتمي إلى هذا السلّم');
  end if;

  insert into student_levels (user_id, scale_id, level_id, source)
  values (auth.uid(), p_scale, p_level, coalesce(p_source,'self'))
  on conflict (user_id, scale_id) do update
    set level_id = excluded.level_id, source = excluded.source, set_at = now();

  return jsonb_build_object('ok', true,
    'level', (select name from levels where id = p_level));
end $function$;


-- ═══════════════════════════════════════════════════════════════════════
-- ④ السجلّ
-- ═══════════════════════════════════════════════════════════════════════

insert into public.sql_log (n, title, applied_at)
values ('126', 'مستوى الطالب — مصدرٌ واحدٌ يُختار بالمعنى لا بترتيب coalesce', now())
on conflict (n) do update set applied_at = now();
