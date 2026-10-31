-- ══════════════════════════════════════════════════════════════════════
--  ١٩٤ · حكمُ الوصول عن الطالب لا عن سائله — فيرى المعلّمُ الطالبَ كما يرى الطالبُ نفسَه
-- ══════════════════════════════════════════════════════════════════════
--
--  قرارُ المالك (٣١ أكتوبر): «ابدأ الإصلاح» — بعد شرح الخلل، وقد كشفه تقييمُ `193`.
--
--  🔴 **الخلل:** `can_view_level` و`can_access_lesson` و`can_access` تُسأل عن مستخدمٍ بعينه (`p_user`): «أيرى **هذا**
--     المستوى؟ أيفتح **هذا** الدرس؟ أيفتح **هذا** الاختبار؟». وأوّلُ سطرٍ في كلٍّ منها `if is_teacher() then return true` —
--     و`is_teacher()` تسأل عن **السائل** (`auth.uid()`). فإذا سأل معلّمٌ أو مديرٌ عن طالبٍ أجابت «نعم» لكلّ شيء، ولم تنظر
--     في الطالب أصلاً. وكان دَيناً في `STATE` ⑧ بأنّه «لا أثر اليوم — كلُّ المستدعيات بمعاملٍ واحد»، ثمّ صارت تُسأل عن غير
--     سائلها: `courses_of(p_user)` (179 · 184) و`student_performance` و`can_access_question`.
--
--  📊 **الأثرُ مقيساً (٣١ أكتوبر):** `courses_of` على الطلاب الأربعة ٢٣ صفّاً بلا سائل، و**٨٠** إذا سأل معلّمٌ أو مدير ·
--     و«أداءُ» الطالب `e3625395` عند معلّمه `25718b74`: «التالي» ٣٨ و«مقفل» ٠ — وعنده هو ١٨ و٥. **نقيضُ ما كُتب في
--     `student_performance` نفسِها:** «is_open تُحسب عن الطالب لا عن القارئ — نفس درس 90/94».
--
--  أربعةُ أحكامٍ تُقرأ ولا تُستنتج:
--
--  ① **دورُ المسؤول عنه لا دورُ السائل:** السطرُ نفسُه بمعنى `is_teacher()` حرفاً (`teacher` · `admin`)، على `p_user`.
--     ومن يسأل عن نفسه — كلُّ نداءٍ بمعاملٍ واحد، وكلُّ سياسات RLS (`p_questions_read` · `p_items_read` …) — `p_user`
--     عنده `auth.uid()`، فلا يتغيّر له شيء. والزائرُ (`null`) كما كان: لا دورَ له في الحالين.
--  ② **والإذنُ بالقراءة يبقى بالقارئ:** «أيحقّ لهذا المعلّم أن يرى أداءَ هذا الطالب؟» سؤالٌ عن السائل، وحارسُه `teaches()`
--     في `lesson_progress` و`required_quizzes` — لا يُمسّ. والذي تغيّر **ما يراه** بعد أن أُذن له: صورةُ الطالب لا صورتُه.
--  ③ **ما لا يُمسّ عمداً — حيث السؤالُ عن القارئ نفسِه:** `quiz_detail` و`student_dx` (أيرى القارئُ كودَ التشخيص؟) ·
--     `can_see_item` (أيرى القارئُ مصدرَ معلّمٍ عامّاً؟) · والسياسات. قِيست الدوالُّ كلُّها التي تذكر `is_teacher()` ولها
--     معاملٌ من نوع `uuid`: لا رابعةَ تُسأل عن غير سائلها.
--  ④ **ترقيعٌ بالمرسى في الحيّة** (نسقُ 191 و193): ثلاثُ دوالّ، ومرسى واحد في كلٍّ — `if is_teacher() then return true;
--     end if;` — قِيس على الحيّة (٣١ أكتوبر) مرّةً واحدة، و`\r\n` فيها كلِّها. و`create or replace` يُبقي المنحَ كما هو.
--
--  📐 وما ليس هنا عمداً: لا واجهة — الشاشاتُ تقرأ ما تُرجعه الدوالّ، فيصحّ «أداءُ» الطالب عند معلّمه بلا ختم.
-- ══════════════════════════════════════════════════════════════════════


-- ═══════════════════ تمهيد ═══════════════════

-- المُرقِّع: أثلاثُ [مرسى، بديل، عدد] على الحيّة — والعددُ ما قِيس أو لا شيء (نسقُ 193 بحرفه).
create or replace function pg_temp.patch194(p_fn regprocedure, p_patches text[])
returns text language plpgsql as $f$
declare v text := pg_get_functiondef(p_fn); a text; b text; k int; n int;
        crlf boolean := position(E'\r' in pg_get_functiondef(p_fn)) > 0;
begin
  if coalesce(array_length(p_patches, 1), 0) % 3 <> 0 then
    raise exception '194 · %: المراسي أثلاثٌ [مرسى، بديل، عدد]', p_fn;
  end if;
  for i in 1 .. array_length(p_patches, 1) by 3 loop
    a := replace(p_patches[i],     E'\r\n', E'\n');
    b := replace(p_patches[i + 1], E'\r\n', E'\n');
    k := p_patches[i + 2]::int;
    if crlf then a := replace(a, E'\n', E'\r\n'); b := replace(b, E'\n', E'\r\n'); end if;
    n := (length(v) - length(replace(v, a, ''))) / length(a);
    if n <> k then
      raise exception '194 · %: وُجد المرسى «%» % مرّةً لا % — لا يُرقَّع على الظنّ', p_fn, a, n, k;
    end if;
    v := replace(v, a, b);
  end loop;
  return v;
end $f$;


-- ═══════════════════ معدَّلة لا منشأة ═══════════════════

-- ① can_view_level — أيرى p_user هذا المستوى؟ (تناديها courses_of عن الطالب)
do $$
begin
  if position('194 ·' in pg_get_functiondef('public.can_view_level(bigint,uuid)'::regprocedure)) > 0 then
    raise notice '194: دورُ المسؤول عنه قائمٌ في can_view_level من قبل — لا تغيير'; return;
  end if;
  execute pg_temp.patch194('public.can_view_level(bigint,uuid)', array[
    $a$if is_teacher() then return true; end if;$a$,
    $b$-- 194 · دورُ p_user لا دورُ السائل: معلّمٌ يسأل عن طالبٍ يرى ما يراه الطالب
  if exists (select 1 from profiles where id = p_user and role in ('teacher','admin')) then return true; end if;$b$, '1']);
end $$;

-- ② can_access_lesson — أيفتح p_user هذا الدرس؟ (تناديها student_performance عن الطالب)
do $$
begin
  if position('194 ·' in pg_get_functiondef('public.can_access_lesson(bigint,uuid)'::regprocedure)) > 0 then
    raise notice '194: دورُ المسؤول عنه قائمٌ في can_access_lesson من قبل — لا تغيير'; return;
  end if;
  execute pg_temp.patch194('public.can_access_lesson(bigint,uuid)', array[
    $a$if is_teacher() then return true; end if;$a$,
    $b$-- 194 · دورُ p_user لا دورُ السائل: معلّمٌ يسأل عن طالبٍ يرى ما يراه الطالب
  if exists (select 1 from profiles where id = p_user and role in ('teacher','admin')) then return true; end if;$b$, '1']);
end $$;

-- ③ can_access — أيفتح p_user هذا الاختبار؟ (تناديها can_access_question عن صاحب السؤال)
do $$
begin
  if position('194 ·' in pg_get_functiondef('public.can_access(bigint,uuid)'::regprocedure)) > 0 then
    raise notice '194: دورُ المسؤول عنه قائمٌ في can_access من قبل — لا تغيير'; return;
  end if;
  execute pg_temp.patch194('public.can_access(bigint,uuid)', array[
    $a$if is_teacher() then return true; end if;$a$,
    $b$-- 194 · دورُ p_user لا دورُ السائل: معلّمٌ يسأل عن طالبٍ يرى ما يراه الطالب
  if exists (select 1 from profiles where id = p_user and role in ('teacher','admin')) then return true; end if;$b$, '1']);
end $$;


-- ═══════════════════ السجلّ ═══════════════════

insert into public.sql_log (n, title, applied_at)
values ('194', 'حكمُ الوصول عن الطالب لا عن سائله — فيرى المعلّمُ الطالبَ كما يرى الطالبُ نفسَه', now())
on conflict (n) do update set applied_at = now();
