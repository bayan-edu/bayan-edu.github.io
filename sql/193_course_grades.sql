-- ══════════════════════════════════════════════════════════════════════
--  ١٩٣ · مدى الصفوف على المقرَّر — مقرَّرٌ لصفوفٍ عبر المناهج كلّها، والصفُّ لا العمرُ يحدّد ما يراه الطالب
-- ══════════════════════════════════════════════════════════════════════
--
--  قرارُ المالك (٣١ أكتوبر): «اكتب 193 بالتوصيات كلّها، ومعه إسقاطُ courses_uniq_stream لصالح فهرسٍ فريدٍ يعرف
--  المدى» — بعد مقترح `spec-course-grades.md` (مشروع «كيف تذاكر») وتقييمه على الحيّة.
--
--  🎯 **المطلوب:** مقرَّرٌ يُحدَّد بمدىً من الصفوف عبر المناهج كلّها. وأوّلُه «كيف أذاكر؟» (المقرَّر ٢٧) للمرحلة الثانوية
--     وحدها: الصفوف ١٠–١٢ في البكالوريا المصريّة والثانويّة السعوديّة معاً. ومن ورائه قرارُ المشروع: **الصفُّ لا تاريخُ
--     الميلاد يحدّد المحتوى**، وتُضاف شريحةُ ١٢–١٥ لاحقاً مقرَّراً بمدىً آخر في المادّة نفسها.
--
--  🔴 **والقائمُ لا يكفي:** `courses.level_id` مستوًى من منهجٍ واحد، و`can_view_level` تقارن الرتبةَ داخل منهجه ⇒ مقرَّرٌ
--     على «الأول الثانوي» المصريّ لا يراه السعوديّ أبداً، و`is_current` يطابق المستوى بعينه فيراه الثاني والثالث مراجعةً.
--     والشُّعبُ (183) يختارها الطالبُ بيده، والمساراتُ داخل منهجٍ واحد.
--
--  أحدَ عشرَ حكماً تُقرأ ولا تُستنتج:
--
--  ① **المفتاحُ `levels.rank`، وقانونُه: رتبةُ المستوى الدراسيّ رقمُ صفّه من ١ إلى ١٢.** وهي اليوم ١٠ · ١١ · ١٢ في
--     المنهجين، ولا رتبةَ دراسيّةَ غيرُها (قِيس) ⇒ يُضاف المتوسّطُ يوماً بـ٧–٩ والابتدائيُّ بـ١–٦. **ويحرسه `save_level`
--     من اليوم** — كاتبُ المستويات الوحيد (قِيس): رتبةٌ خارجه تُدخل الصفَّ في مدىً ليس له، أو تُخرجه من مداه، بلا شكوى.
--  ② **مدىً أو صفٌّ، لا الاثنان** (`courses_rank_range_chk`). فذو المدى بلا `level_id` ⇒ «حاليٌّ» لكلّ من يراه،
--     و`is_current` لا يُمسّ.
--  ③ **صفُّ الطالب من `my_rank` على منهجه الدراسيّ** — القارئُ الواحد للمستوى (126: «نسختان لحكمٍ واحد تتفارقان»)،
--     لا قراءةٌ ثانيةٌ لـ`profiles.level_id`. ومن لا صفَّ دراسيّاً له (جامعيّ · أخرى · لم يحدّد صفّه) لا يرى ذا المدى، ولا الزائر.
--  ④ **`courses_of` موضعٌ واحد** يمرّ به: `my_courses` · `list_subjects` · `list_lessons` · `lesson_member` ←
--     `can_access_lesson` · `lesson_progress` · `required_quizzes`. والشرطُ في فرع غير المعلّمين، فالمعلّمُ والمديرُ يريان
--     كلَّ شيءٍ كما كانا.
--  ⑤ **`list_subjects`:** المادّةُ غيرُ `profile` كانت تُعرض لكلّ طالبٍ ولو لم يكن له فيها مقرَّر ⇒ لو بقيت لرأى الجامعيُّ
--     بطاقةَ «كيف أذاكر؟» فارغةً أبداً. فمادّةٌ فيها مقرَّرٌ نشطٌ بمدى تغيب عمّن لا يرى منها مقرَّراً، ومن رأى أبقته الفاصلةُ
--     التالية في الدالّة (`my_courses`). والمفتوحةُ بلا مدى كما كانت (Reading Comprehension · IELTS).
--  ⑥ **الفهرسُ الفريد يعرف المدى:** `courses_uniq_stream` كان يعدّ مقرَّرين بلا صفٍّ ولا مسارٍ ولا شعبةٍ في مادّةٍ واحدة
--     مقرَّراً واحداً ⇒ تصطدم الشريحةُ الثانية بالأولى عند إنشائها، قبل أن تُعطى مداها. فحلّ محلَّه `courses_uniq_grades`
--     — أوسعُ منه بعمودين، فلا صفَّ قائماً يخالفه — وأُسقط القديمُ بإذن المالك. ولا دالّةَ تسمّيه ولا `on conflict` عليه (قِيس).
--  ⑦ **حارسٌ واحد — `course_range_problem`:** حدّان معاً · من ١ إلى ١٢ · البدايةُ لا بعد النهاية · لا مع صفّ · **ولا
--     تداخلَ بين مقرَّرين في المادّة والمسار والشعبة نفسها** — ولو كان أحدُهما معطَّلاً، فالفهرسُ يردّ المدى نفسَه عليه أيضاً،
--     والرسالةُ تسمّيه. ولا تُستثنى مجموعةُ الاختيار: الاختيارُ اليوم بين موادّ لا داخل مادّة، والفهرسُ القديم لم يكن يُقيم
--     أختين في مادّةٍ وصفٍّ واحد. **تسأله `set_course_grades`، و`save_course` قبل أن تكتب** — فاختيارُ صفٍّ لمقرَّرٍ ذي مدى،
--     أو مادّةٌ أو مسارٌ أو شعبةٌ تجعله يتداخل، يُردّ برسالةٍ لا بخطأ قيد. والقيدُ والفهرسُ حاجزان بعده.
--  ⑧ **`set_course_grades` مستقلّة، وتوقيعُ `save_course` لا يُمسّ:** وسيطٌ جديد يُنشئ نسخةً ثانيةً من الدالّة، وقيمتُه
--     الافتراضيّة `null` تمحو المدى بصمتٍ في كلّ حفظٍ لا يرسله. و`update` في `save_course` لا يكتب العمودين، فيبقى المدى.
--     ومتنُها يُرقَّع بالحارس وحده (⑦). ومعاملا الحدّين `integer`: الرقمُ الصريح في SQL لا يبلغ `smallint` (قِيس).
--  ⑨ **عدّادُ `author_tree`:** صار ٠ للمقرَّر ٢٧ حين رُبطت مادّتُه بمنهجٍ من نوع `proficiency` (٣٠ أكتوبر)، والعرضُ وحده
--     المخطئ: ما يراه الطالب لم يتغيّر. والدالّةُ تتفرّع بالمنهج لا بالتسكين ⇒ فرعان قبل فروعها: ذو المدى ⇒ من رتبةُ صفّه
--     فيه (بشروط `courses_of`: منهجُ المادّة · المسار)، والمادّةُ المفتوحة ⇒ الطلابُ كلّهم (فهي لكلّ طالبٍ في `courses_of`).
--  ⑩ **الحقلان حيث يُقرأ المقرَّر:** `author_tree` (المحرّر) · `content_tree` (نموذجُ المقرَّر في «المناهج» — وهناك يُنادى
--     `save_course`) · `course_state` (عقدُ التأليف ⓪: لمن المقرَّر).
--  ⑪ **البيانات:** المقرَّر ٢٧ («كيف أذاكر؟» · المادّة ٩ · بلا صفّ) للصفوف ١٠–١٢ — قرارُ المالك ٣١ أكتوبر. ويُكتب هنا لا
--     بالدالّة: الهجرةُ بدور `postgres` فلا يمرّ عليها `is_admin()`. والطلابُ الأربعة اليوم في الرتبتين ١٠ و١١ (قِيس) ⇒ لا
--     يتغيّر لأحدٍ منهم شيء، والبرهانُ في حالاتٍ تُصنع داخل التجربة الجافّة وتُنقض.
--
--  📐 **ترقيعٌ بالمرسى في الحيّة** (نسقُ 185 و191): سبعُ دوالّ وثمانيةُ مراسٍ، كلٌّ قِيس على الحيّة (٣١ أكتوبر) مرّةً واحدة.
--     والمرقِّعُ يقرأ نهايةَ السطر في كلّ دالّة (`\r\n` في `author_tree` و`content_tree` و`save_level`)، ونصُّ الملفّ بأيّ
--     نهايةٍ كُتب. و`create or replace` يُبقي منحَ المرقَّعة كما هو، والجديدتان تُمنحان صراحةً (آخرَ «منشأة»).
--
--  📐 وما ليس هنا عمداً:
--  · الواجهةُ (حقلا «من الصفّ» و«إلى الصفّ» في نموذج المقرَّر · شارةُ البطاقة) — بناءٌ بعد هذا.
--  · `is_teacher()` في `can_view_level` تسأل عن السائل لا عن `p_user` — دَينُ `STATE` ⑧ وقد صار له أثر: `courses_of` على
--    الطلاب الأربعة ٢٣ صفّاً بلا هويّة، و٨٠ إذا سأل معلّمٌ أو مدير. ملفٌّ مستقلّ بعد هذا.
--  · البطاقاتُ: `can_see_deck` و`can_see_card` (لبطاقةٍ بلا درس) تحرسان بمستوى المجموعة لا بالمقرَّر — ولا مجموعةَ في المادّة ٩.
--  · الاستعارةُ بين مقرَّرين ذوَي مدى تُقبل أيّاً كان المدى (`unit_link_problem` تقارن `level_id` وحده) — مقصود: قد تتشارك
--    الشريحتان وحدات.
--  · تغييرُ نوع منهجٍ له مستويات (`save_scale`) لا يحرسه قانونُ ①.
-- ══════════════════════════════════════════════════════════════════════


-- ═══════════════════ البنية ═══════════════════

alter table public.courses
  add column if not exists min_rank smallint,
  add column if not exists max_rank smallint;

-- ② مدىً أو صفٌّ لا الاثنان — والحدّان معاً، من ١ إلى ١٢
alter table public.courses drop constraint if exists courses_rank_range_chk;
alter table public.courses add constraint courses_rank_range_chk check (
      (min_rank is null) = (max_rank is null)
  and (min_rank is null or (min_rank >= 1 and max_rank <= 12 and min_rank <= max_rank))
  and (min_rank is null or level_id is null));

-- ⑥ الفهرسُ الفريد يعرف المدى، ثمّ يُسقط القديم (إذنُ المالك ٣١ أكتوبر)
create unique index if not exists courses_uniq_grades on public.courses
  (subject_id, coalesce(level_id, 0), coalesce(path_id, 0), coalesce(stream_id, 0),
   coalesce(min_rank, 0), coalesce(max_rank, 0));
drop index if exists public.courses_uniq_stream;


-- ═══════════════════ منشأة ═══════════════════

-- ⑦ الحارسُ الواحد — نصٌّ يقرؤه المدير، أو null
create or replace function public.course_range_problem(
  p_course bigint, p_subject bigint, p_level bigint, p_path bigint, p_stream bigint,
  p_min integer, p_max integer)
returns text
language plpgsql stable security definer
set search_path to 'public'
as $fn$
declare o record;
begin
  if p_min is null and p_max is null then return null; end if;           -- بلا مدى: لا شيء يُسأل
  if p_min is null or p_max is null then
    return 'حدّا المدى يُكتبان معاً أو يُتركان معاً';
  end if;
  if p_min < 1 or p_max > 12 then
    return 'المدى بين الصفّ ١ والصفّ ١٢';
  end if;
  if p_min > p_max then
    return 'بداية المدى بعد نهايته';
  end if;
  if p_level is not null then
    return 'المقرَّر لصفّ واحد أو لمدى صفوف، لا للاثنين معاً';
  end if;

  select c.title, c.min_rank, c.max_rank, c.active into o
    from courses c
   where c.subject_id = p_subject
     and c.id is distinct from p_course
     and c.min_rank <= p_max and p_min <= c.max_rank                     -- يتداخلان، والفارغُ لا يتداخل
     and c.path_id   is not distinct from p_path
     and c.stream_id is not distinct from p_stream
   order by c.active desc, c.id
   limit 1;
  if found then
    return format('مدى هذا المقرَّر يتداخل مع «%s» (الصفوف %s–%s%s)', o.title,
                  translate(o.min_rank::text, '0123456789', '٠١٢٣٤٥٦٧٨٩'),
                  translate(o.max_rank::text, '0123456789', '٠١٢٣٤٥٦٧٨٩'),
                  case when o.active then '' else ' · معطَّل' end);
  end if;
  return null;
end $fn$;

-- ⑧ كاتبُ المدى — للمدير وحده، والفراغان يمحوانه
create or replace function public.set_course_grades(
  p_course bigint, p_min integer, p_max integer, p_note text default null)
returns jsonb
language plpgsql security definer
set search_path to 'public'
as $fn$
declare r courses; v_before jsonb; v text;
begin
  if not is_admin() then return jsonb_build_object('ok', false, 'error', 'صلاحية المدير مطلوبة'); end if;

  select * into r from courses where id = p_course;
  if not found then return jsonb_build_object('ok', false, 'error', 'لا مقرَّر بهذا المعرّف'); end if;

  v := course_range_problem(r.id, r.subject_id, r.level_id, r.path_id, r.stream_id, p_min, p_max);
  if v is not null then return jsonb_build_object('ok', false, 'error', v); end if;

  if r.min_rank is not distinct from p_min and r.max_rank is not distinct from p_max then
    return jsonb_build_object('ok', true, 'id', r.id, 'same', true);       -- لا تغيير ⇒ لا سطرَ في السجلّ
  end if;

  v_before := to_jsonb(r);
  update courses set min_rank = p_min, max_rank = p_max where id = p_course;
  perform admin_log('content', null, v_before,
    jsonb_build_object('table','courses') || to_jsonb((select c from courses c where c.id = p_course)), p_note);
  return jsonb_build_object('ok', true, 'id', r.id, 'min_rank', p_min, 'max_rank', p_max);
end $fn$;

-- المنح: الحارسُ بابٌ داخليّ مغلق، والكاتبةُ للمسجَّل وحارسُها في داخلها (is_admin). ومنحُ المخطَّط الافتراضيّ يعطي
-- الجديدةَ `authenticated` (كشفته التجربةُ الجافّة)، و`fn_auto_lock` لا يسحب إلّا PUBLIC و anon ⇒ يُسحب عن الحارس
-- صراحةً: تناديه الدالّتان بصلاحية مالكهما (نسقُ 184 و189).
revoke all on function public.course_range_problem(bigint, bigint, bigint, bigint, bigint, integer, integer)
  from public, anon, authenticated;
revoke all on function public.set_course_grades(bigint, integer, integer, text) from public, anon;
grant execute on function public.set_course_grades(bigint, integer, integer, text) to authenticated;


-- ═══════════════════ معدَّلة لا منشأة — ترقيعٌ بالمرسى ═══════════════════

-- المُرقِّع: أثلاثُ [مرسى، بديل، عدد] على الحيّة — والعددُ ما قِيس أو لا شيء (نسقُ 191).
-- ويقرأ نهايةَ السطر في الدالّة، ونصُّ الملفّ بأيّ نهايةٍ كُتب.
create or replace function pg_temp.patch193(p_fn regprocedure, p_patches text[])
returns text language plpgsql as $f$
declare v text := pg_get_functiondef(p_fn); a text; b text; k int; n int;
        crlf boolean := position(E'\r' in pg_get_functiondef(p_fn)) > 0;
begin
  if coalesce(array_length(p_patches, 1), 0) % 3 <> 0 then
    raise exception '193 · %: المراسي أثلاثٌ [مرسى، بديل، عدد]', p_fn;
  end if;
  for i in 1 .. array_length(p_patches, 1) by 3 loop
    a := replace(p_patches[i],     E'\r\n', E'\n');
    b := replace(p_patches[i + 1], E'\r\n', E'\n');
    k := p_patches[i + 2]::int;
    if crlf then a := replace(a, E'\n', E'\r\n'); b := replace(b, E'\n', E'\r\n'); end if;
    n := (length(v) - length(replace(v, a, ''))) / length(a);
    if n <> k then
      raise exception '193 · %: وُجد المرسى «%» % مرّةً لا % — لا يُرقَّع على الظنّ', p_fn, a, n, k;
    end if;
    v := replace(v, a, b);
  end loop;
  return v;
end $f$;

-- ③④ courses_of — شرطُ المدى بعد شرط المستوى، في فرع غير المعلّمين
do $$
begin
  if position('193 ·' in pg_get_functiondef('public.courses_of(uuid,bigint)'::regprocedure)) > 0 then
    raise notice '193: شرطُ المدى قائمٌ في courses_of من قبل — لا تغيير'; return;
  end if;
  execute pg_temp.patch193('public.courses_of(uuid,bigint)', array[
    $a$and (c.level_id is null or can_view_level(c.level_id, p_user))$a$,
    $b$and (c.level_id is null or can_view_level(c.level_id, p_user))
    -- 193 · مدى الصفوف: رتبةُ صفّ الطالب في منهجه الدراسيّ بين حدّي المقرَّر — بـmy_rank، القارئِ الواحد للمستوى (126).
    --       ومن لا صفَّ دراسيّاً له (جامعيّ · أخرى · لم يحدّد صفّه) لا يراه
    and (c.min_rank is null or (
          select my_rank(pr.scale_id, p_user) from profiles pr
            join scales sx on sx.id = pr.scale_id and sx.kind = 'academic'
           where pr.id = p_user) between c.min_rank and c.max_rank)$b$, '1']);
end $$;

-- ⑤ list_subjects — المادّةُ المفتوحة ذاتُ المدى تغيب عمّن لا يرى منها مقرَّراً
do $$
begin
  if position('193 ·' in pg_get_functiondef('public.list_subjects()'::regprocedure)) > 0 then
    raise notice '193: شرطُ المدى قائمٌ في list_subjects من قبل — لا تغيير'; return;
  end if;
  execute pg_temp.patch193('public.list_subjects()', array[
    $a$or s.placement <> 'profile'$a$,
    $b$or (s.placement <> 'profile'
            -- 193 · وفيها مقرَّرٌ نشطٌ بمدى صفوف ⇒ تغيب عمّن لا يرى منها مقرَّراً، وإلّا رأى الجامعيُّ بطاقتَها فارغةً أبداً.
            --       ومن رأى منها مقرَّراً أبقته الفاصلةُ التالية (my_courses)
            and not exists (select 1 from courses c
                             where c.subject_id = s.id and c.active and c.min_rank is not null))$b$, '1']);
end $$;

-- ⑨⑩ author_tree — الحقلان، وعدّادُ الطلاب بحكم المدى
do $$
begin
  if position('193 ·' in pg_get_functiondef('public.author_tree()'::regprocedure)) > 0 then
    raise notice '193: المدى قائمٌ في author_tree من قبل — لا تغيير'; return;
  end if;
  execute pg_temp.patch193('public.author_tree()', array[
    $a$'stream_id', c.stream_id,$a$,
    $b$'min_rank', c.min_rank, 'max_rank', c.max_rank,                          -- 193 · مدى الصفوف
        'stream_id', c.stream_id,$b$, '1',

    $a$when s2.scale_id is null then$a$,
    $b$when c.min_rank is not null then                 -- 193 · مدى صفوف: من رتبةُ صفّه فيه، بشروط courses_of
            (select count(*) from profiles pr
               join scales sx on sx.id = pr.scale_id and sx.kind = 'academic'
              where pr.role = 'student'
                and my_rank(pr.scale_id, pr.id) between c.min_rank and c.max_rank
                and (s2.placement <> 'profile' or s2.scale_id is null or pr.scale_id = s2.scale_id)
                and (c.path_id is null or pr.path_id = c.path_id))
          when s2.placement = 'open' then                  -- 193 · مفتوحة: لكلّ طالبٍ في courses_of، ومنهجُها لا يحجب
            (select count(*) from profiles pr where pr.role = 'student')
          when s2.scale_id is null then$b$, '1']);
end $$;

-- ⑩ content_tree — الحقلان في نموذج المقرَّر («المناهج»)
do $$
begin
  if position('193 ·' in pg_get_functiondef('public.content_tree()'::regprocedure)) > 0 then
    raise notice '193: المدى قائمٌ في content_tree من قبل — لا تغيير'; return;
  end if;
  execute pg_temp.patch193('public.content_tree()', array[
    $a$'stream_id', c.stream_id, 'stream', (select name from streams where id = c.stream_id),$a$,
    $b$'min_rank', c.min_rank, 'max_rank', c.max_rank,                              -- 193 · مدى الصفوف
        'stream_id', c.stream_id, 'stream', (select name from streams where id = c.stream_id),$b$, '1']);
end $$;

-- ⑩ course_state — لمن المقرَّر (عقدُ التأليف ⓪)
do $$
begin
  if position('193 ·' in pg_get_functiondef('public.course_state(bigint)'::regprocedure)) > 0 then
    raise notice '193: المدى قائمٌ في course_state من قبل — لا تغيير'; return;
  end if;
  execute pg_temp.patch193('public.course_state(bigint)', array[
    $a$'level', lv.name, 'title', c.title,$a$,
    $b$'level', lv.name, 'title', c.title,
    'min_rank', c.min_rank, 'max_rank', c.max_rank,    -- 193 · لمن المقرَّر: مدى صفوفه، أو صفُّه في level$b$, '1']);
end $$;

-- ⑦⑧ save_course — الحارسُ قبل الكتابة، والتوقيعُ كما هو
do $$
begin
  if position('193 ·' in pg_get_functiondef('public.save_course(bigint,bigint,bigint,text,bigint,text,integer,boolean,text,bigint)'::regprocedure)) > 0 then
    raise notice '193: حارسُ المدى قائمٌ في save_course من قبل — لا تغيير'; return;
  end if;
  execute pg_temp.patch193('public.save_course(bigint,bigint,bigint,text,bigint,text,integer,boolean,text,bigint)', array[
    $a$select to_jsonb(c) into v_before from courses c where c.id = p_id;$a$,
    $b$select to_jsonb(c) into v_before from courses c where c.id = p_id;

  /* 193 · مدى الصفوف — الحارسُ الذي تسأله set_course_grades، بقيم هذا الحفظ ومدى المقرَّر القائم:
     صفٌّ يُختار لمقرَّرٍ ذي مدى، أو مادّةٌ أو مسارٌ أو شعبةٌ تجعله يتداخل مع أخيه — يُردّ هنا لا بخطأ قيد */
  declare v_range text;
  begin
    v_range := course_range_problem(p_id, p_subject, p_level, p_path, p_stream,
                                    (v_before->>'min_rank')::int, (v_before->>'max_rank')::int);
    if v_range is not null then return jsonb_build_object('ok', false, 'error', v_range); end if;
  end;$b$, '1']);
end $$;

-- ① save_level — قانونُ الرتبة الدراسيّة
do $$
begin
  if position('193 ·' in pg_get_functiondef('public.save_level(bigint,bigint,text,text,integer,integer,integer,text)'::regprocedure)) > 0 then
    raise notice '193: قانونُ الرتبة قائمٌ في save_level من قبل — لا تغيير'; return;
  end if;
  execute pg_temp.patch193('public.save_level(bigint,bigint,text,text,integer,integer,integer,text)', array[
    $a$select to_jsonb(l) into v_before from levels l where l.id = p_id;$a$,
    $b$select to_jsonb(l) into v_before from levels l where l.id = p_id;

  /* 193 · رتبةُ المستوى الدراسيّ رقمُ صفّه من ١ إلى ١٢ — وعليها يقوم مدى المقرَّرات (courses.min_rank · max_rank)،
     فرتبةٌ خارجها تُدخل الصفَّ في مدىً ليس له، أو تُخرجه من مداه، بلا شكوى */
  if (select kind from scales where id = p_scale) = 'academic'
     and coalesce(p_rank, 0) not between 1 and 12 then
    return jsonb_build_object('ok', false, 'error', 'الرتبة في المنهج الدراسيّ رقم الصفّ نفسه: من ١ إلى ١٢');
  end if;$b$, '1']);
end $$;


-- ═══════════════════ البيانات ═══════════════════

-- ⑪ «كيف أذاكر؟» للمرحلة الثانوية — قرارُ المالك ٣١ أكتوبر. ومرّةً واحدة: ما كتبه المديرُ بعدُ لا يُعاد
update public.courses set min_rank = 10, max_rank = 12
 where id = 27 and subject_id = 9 and level_id is null and min_rank is null;

do $$
begin
  if not exists (select 1 from public.courses where id = 27 and min_rank is not null) then
    raise exception '193: المقرَّر ٢٧ ليس «كيف أذاكر؟» بلا صفّ كما قِيس — فلا يُعطى مداه على الظنّ';
  end if;
end $$;


-- ═══════════════════ السجلّ ═══════════════════

insert into public.sql_log (n, title, applied_at)
values ('193', 'مدى الصفوف على المقرَّر — مقرَّرٌ لصفوفٍ عبر المناهج كلّها، والصفُّ لا العمرُ يحدّد ما يراه الطالب', now())
on conflict (n) do update set applied_at = now();
