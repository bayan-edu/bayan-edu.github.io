-- ══════════════════════════════════════════════════════════
-- 205 · شرطُ الترقية — عددُ الكتب المنجزة يكتبه المصمّم لكلّ مقرَّر، ويُطوَّر بالنتائج
--       (المرحلة ٥ من `spec-reading-library.md` · ق٥ بنصَّي المالك · ١٢ نوفمبر ٢٠٢٦)
--
-- لماذا:
--   ① **`progression='level'` كان وسماً لا محرّكاً** (spec §١-ب): لا شيء يرقّي طالباً، و`set_my_level` لا تناديها إلا
--      `placement_submit`. ⇒ الترقيةُ هنا بابٌ ثانٍ إلى المستوى: **بالنصاب** — أنجز الطالبُ من كتب مستواه ما كتبه المصمّم.
--   ② **والشرطُ على المقرَّر** (المادّة × المستوى × الطبقة · spec ق٥): لكلّ خانةٍ كتبُها، فلكلّ خانةٍ نصابُها — والمصمّمُ
--      يكتبه في شاشة دروس المقرَّر **أثناء بناء المكتبة** (نصُّ المالك ٢). سطرٌ بلا فرعٍ هو العددُ الكلّيّ (إلزاميٌّ لشرطٍ
--      قائم)، وسطورٌ اختياريّةٌ لحدٍّ أدنى من رفٍّ أو أصلٍ كامل («منها ٢ معلوماتيّ» — والأصلُ يعدّ كتبَ رفوفه).
--      **وجدولٌ لا `jsonb`:** السطرُ يشير إلى فرعٍ بمفتاحٍ أجنبيٍّ `restrict` — فحذفُ رفٍّ عليه شرطٌ يُردّ صاخباً، ولا يبقى شرطٌ
--      على رفٍّ زال.
--   ③ **«ويُطوَّر بالنتائج» (نصُّ المالك ٢) ⇒ ثلاثة:** العددُ يُعدَّل في أيّ وقتٍ وكلُّ تعديلٍ في `admin_audit` بما قبله وما
--      بعده · **وكلُّ ترقيةٍ تحفظ صورةَ الشرط الذي بلغته** (`level_promotions`) فتُقارَن النتائجُ بنسخة الشرط لا بآخرها ·
--      **ولا ترقيةَ تُسحب**: الدالّةُ ترفع ولا تُنزل، فرفعُ العدد لا يمسّ من رُقّي.
--   ④ **والحكمُ في القاعدة لا في المتصفّح:** `level_progress` تقول للطالب ما أنجز وما بقي، و`promote_level` **تعيد الحساب**
--      ثمّ تكتب المستوى التالي (`set_my_level` بمصدرٍ جديد `promotion` في قيد `student_levels`). فالمنارةُ تضيء بما تقوله
--      القاعدة، والضغطُ عليها لا يرقّي إلا من بلغ.
--   ⑤ **والكتابُ المنجَز = `lesson_done`** (كلُّ اختبارٍ محتسَبٍ فيه بلغ `pass_mark`) **في مقرَّر الطالب، منشوراً غيرَ مؤرشف**
--      (`course_lessons()` — بيتُه أو مستعارٌ إليه). و«مقرَّرُ الطالب» الحاضرُ في المادّة **بطبقته** (`reading_tier`).
--      ⏳ **و`reading_tier` مَفصلٌ للمرحلة ٦:** تردّ `M4` اليوم (طلابُ المنصّة كلُّهم في الثانويّ)، وتُستبدل بحسابها من تاريخ
--         الميلاد هناك — ولا يرى أحدٌ أثرها قبلها: لا طالبَ على سلّم القراءة إلا بالتسكين (المرحلة ٧).
--   ⑥ **وحارسُ المصمّم ينبّه ولا يمنع** (`course_promotion` · `problems`): مقرَّرٌ بلا شرطٍ ⇐ لا ترقيةَ منه · شرطٌ على أعلى
--      مستوى · عددٌ أكبرُ من المنشور · حدٌّ أكبرُ من منشور رفّه · ومجموعُ الحدود فوق العدد. **رموزٌ لا جمل:** النصُّ يُبنى في
--      الواجهة بأرقامنا وبهويّة اللغة، والقاعدةُ تقول ما وقع.
--   ⑦ **عامٌّ لكلّ مادّةٍ تدرّجُها بالمستوى** (`progression='level'`): المكتبةُ وIELTS اليوم. ومادّةٌ غيرُها لا شرطَ لها
--      (`save_promotion_rule` تردّه، و`course_promotion` تقول «لا ينطبق»).
--   ⑧ **ويُعاد تشغيلُه بلا أثرٍ ثانٍ:** الجدولان بـ`if not exists`، والقيدُ يُحذف ثمّ يُضاف، والدوالُّ `create or replace`.
-- ══════════════════════════════════════════════════════════

-- ═══════════ منشأة ═══════════

-- ① الشرط — سطرٌ للعدد الكلّيّ (`strand_id` فارغ) وسطورٌ للحدود
create table if not exists public.promotion_rules (
  course_id   bigint      not null references public.courses(id) on delete cascade,
  strand_id   bigint               references public.strands(id) on delete restrict,
  min_books   smallint    not null check (min_books between 1 and 99),
  updated_at  timestamptz not null default now(),
  updated_by  uuid                 references public.profiles(id) on delete set null
);
create unique index if not exists promotion_rules_uniq on public.promotion_rules (course_id, coalesce(strand_id, 0));
alter table public.promotion_rules enable row level security;
revoke all on public.promotion_rules from anon, authenticated;
comment on table public.promotion_rules is
  'شرطُ الترقية لكلّ مقرَّر (205): سطرٌ بلا فرعٍ هو عددُ الكتب المنجزة الكلّيّ، وسطورُ الفروع حدودٌ دنيا من رفٍّ أو أصل. يُقرأ ويُكتب بدوالّه وحدها.';

-- ② سجلُّ الترقيات — صورةُ الشرط الذي بلغه كلُّ مُرقًّى (③ في الرأس)
create table if not exists public.level_promotions (
  id          bigserial   primary key,
  user_id     uuid        not null references public.profiles(id) on delete cascade,
  subject_id  bigint      not null references public.subjects(id) on delete cascade,
  course_id   bigint               references public.courses(id) on delete set null,
  from_level  bigint      not null references public.levels(id),
  to_level    bigint      not null references public.levels(id),
  rule        jsonb       not null,
  at          timestamptz not null default now()
);
create index if not exists level_promotions_user on public.level_promotions (user_id, subject_id);
alter table public.level_promotions enable row level security;
revoke all on public.level_promotions from anon, authenticated;
comment on table public.level_promotions is
  'كلُّ ترقيةٍ بالنصاب (205) ومعها صورةُ الشرط ساعتَها (العددُ والحدودُ وما أنجزه الطالب) — لتُقارَن النتائجُ بنسخة الشرط. تكتبه promote_level وحدها.';

-- ③ الطبقة — مَفصلٌ تستبدله المرحلة ٦ (⑤ في الرأس)
create or replace function public.reading_tier(p_user uuid default auth.uid())
 returns text
 language sql
 stable security definer
 set search_path to 'public'
as $function$
  select 'M4'::text   -- 205 · مَفصل: طلابُ المنصّة اليوم في الثانويّ — والمرحلةُ ٦ تحسبها من تاريخ الميلاد
$function$;

-- ④ مقرَّرُ الطالب الحاضر في مادّة — بطبقته إن كانت للمقرّرات طبقات
create or replace function public.my_course_in(p_subject bigint, p_user uuid default auth.uid())
 returns bigint
 language sql
 stable security definer
 set search_path to 'public'
as $function$
  select co.course_id
    from courses_of(p_user) co
    join courses c on c.id = co.course_id
   where co.subject_id = p_subject and co.is_current and c.level_id is not null
     and (c.tier is null or c.tier = reading_tier(p_user))
   order by c.position, c.id
   limit 1
$function$;

-- ⑤ حالُ الشرط في مقرَّرٍ لطالب — قلبُ الحساب، تناديه الدوالُّ الثلاث ولا يُنادى من الواجهة
create or replace function public.promotion_state(p_course bigint, p_user uuid default auth.uid())
 returns jsonb
 language plpgsql
 stable security definer
 set search_path to 'public'
as $function$
declare
  v_course record;
  v_next   record;
  v_total  int;
  v_done   int;
  v_mins   jsonb;
  v_minok  boolean;
begin
  select c.id, c.subject_id, c.level_id, lv.scale_id, lv.rank, lv.name
    into v_course
    from courses c join levels lv on lv.id = c.level_id
   where c.id = p_course;
  if v_course.id is null then return null; end if;

  select n.id, n.name into v_next
    from levels n
   where n.scale_id = v_course.scale_id and n.rank > v_course.rank
   order by n.rank
   limit 1;

  select r.min_books into v_total
    from promotion_rules r where r.course_id = p_course and r.strand_id is null;

  -- الكتب: منشورةٌ غيرُ مؤرشفة في المقرَّر (بيتُها أو مستعارة)، ومعها رفُّها وأصلُه وإنجازُ الطالب
  with books as (
    select l.id, l.strand_id, s.parent_id, lesson_done(l.id, p_user) as done
      from course_lessons() m
      join lessons l on l.id = m.lesson_id
      left join strands s on s.id = l.strand_id
     where m.course_id = p_course and l.published and l.archived_at is null
  ), mins as (
    select r.strand_id, r.min_books, st.name,
           (select count(*) from books b
             where b.done and (b.strand_id = r.strand_id or b.parent_id = r.strand_id))::int as done
      from promotion_rules r
      join strands st on st.id = r.strand_id
     where r.course_id = p_course and r.strand_id is not null
  )
  select (select count(*) from books where done)::int,
         coalesce((select jsonb_agg(jsonb_build_object('strand_id', strand_id, 'name', name,
                                                       'min', min_books, 'done', done) order by name) from mins), '[]'::jsonb),
         coalesce((select bool_and(done >= min_books) from mins), true)
    into v_done, v_mins, v_minok;

  return jsonb_build_object(
    'course_id', p_course,
    'level', jsonb_build_object('id', v_course.level_id, 'name', v_course.name, 'rank', v_course.rank),
    'next',  case when v_next.id is null then null
                  else jsonb_build_object('id', v_next.id, 'name', v_next.name) end,
    'rule',  case when v_total is null then null
                  else jsonb_build_object('total', v_total, 'mins', v_mins) end,
    'done',  v_done,
    'ready', v_total is not null and v_next.id is not null and v_done >= v_total and v_minok);
end $function$;

-- ⑥ للمصمّم: الشرطُ وكتبُ المقرَّر في رفوفها وتنبيهاتُ الحارس (⑥ في الرأس)
create or replace function public.course_promotion(p_course bigint)
 returns jsonb
 language plpgsql
 stable security definer
 set search_path to 'public'
as $function$
declare
  v_subject bigint;
  v_prog    text;
  v_level   bigint;
  v_state   jsonb;
  v_counts  jsonb;
  v_strands jsonb;
  v_rule    jsonb;
  v_next    jsonb;
  v_probs   jsonb := '[]'::jsonb;
  v_total   int;
  v_pub     int;
  v_sum     int;
  v_m       record;     -- ⚠️ لا `m`: هو اسمُ `course_lessons()` المستعار في الاستعلام أدناه (قِيس في الجافّة)
begin
  if auth.uid() is null then
    return jsonb_build_object('ok', false, 'error', 'يلزم تسجيل الدخول');
  end if;
  select c.subject_id, s.progression, c.level_id into v_subject, v_prog, v_level
    from courses c join subjects s on s.id = c.subject_id
   where c.id = p_course;
  if v_subject is null then
    return jsonb_build_object('ok', false, 'error', 'المقرَّر غير موجود');
  end if;
  if not can_curate(v_subject) then
    return jsonb_build_object('ok', false, 'error', 'شرط الترقية لفريق الإشراف');
  end if;
  if v_prog is distinct from 'level' or v_level is null then
    return jsonb_build_object('ok', true, 'applicable', false);
  end if;

  v_state := promotion_state(p_course, auth.uid());

  -- كتبُ المقرَّر كلُّها (المسوّدةُ معها: المصمّمُ يبني قبل أن ينشر) — عدداً كلّيّاً وفي كلّ فرعٍ وأصله
  with books as (
    select l.id, l.published, l.strand_id, s.parent_id
      from course_lessons() m
      join lessons l on l.id = m.lesson_id
      left join strands s on s.id = l.strand_id
     where m.course_id = p_course and l.archived_at is null
  )
  select jsonb_build_object('all', (select count(*) from books),
                            'published', (select count(*) from books where published)),
         coalesce((select jsonb_agg(jsonb_build_object(
                     'id', st.id, 'name', st.name, 'parent_id', st.parent_id,
                     'leaf', not exists (select 1 from strands k where k.parent_id = st.id),
                     'all', (select count(*) from books b where b.strand_id = st.id or b.parent_id = st.id),
                     'published', (select count(*) from books b
                                    where b.published and (b.strand_id = st.id or b.parent_id = st.id)))
                     order by coalesce(pa.sort_order, st.sort_order), st.parent_id nulls first, st.sort_order, st.id)
                   from strands st left join strands pa on pa.id = st.parent_id
                  where st.subject_id = v_subject), '[]'::jsonb)
    into v_counts, v_strands;

  /* 🔴 `nullif(…, 'null')` لازمة — قِيس في الجافّة: `promotion_state` تكتب الغائبَ `null` جيسونيّاً داخل كائنها، و`->`
        تردّه قيمةً لا فراغاً، فـ`is null` عليه كاذبة — فسكت «بلا شرط» عن R6 و«أعلى مستوى» عن R24. */
  v_rule  := nullif(v_state->'rule', 'null'::jsonb);
  v_next  := nullif(v_state->'next', 'null'::jsonb);
  v_total := (v_rule->>'total')::int;
  v_pub   := (v_counts->>'published')::int;

  if v_rule is null and v_next is not null then
    v_probs := v_probs || jsonb_build_array(jsonb_build_object('code', 'no_rule'));
  end if;
  if v_rule is not null and v_next is null then
    v_probs := v_probs || jsonb_build_array(jsonb_build_object('code', 'top'));
  end if;
  if v_total is not null and v_total > v_pub then
    v_probs := v_probs || jsonb_build_array(jsonb_build_object('code', 'total_unreachable', 'need', v_total, 'have', v_pub));
  end if;
  for v_m in select (x->>'strand_id')::bigint as sid, x->>'name' as name, (x->>'min')::int as need
               from jsonb_array_elements(coalesce(v_rule->'mins', '[]'::jsonb)) x loop
    if v_m.need > coalesce((select (s->>'published')::int from jsonb_array_elements(v_strands) s
                             where (s->>'id')::bigint = v_m.sid), 0) then
      v_probs := v_probs || jsonb_build_array(jsonb_build_object('code', 'min_unreachable', 'strand_id', v_m.sid,
                   'name', v_m.name, 'need', v_m.need,
                   'have', coalesce((select (s->>'published')::int from jsonb_array_elements(v_strands) s
                                      where (s->>'id')::bigint = v_m.sid), 0)));
    end if;
  end loop;
  select sum((x->>'min')::int) into v_sum from jsonb_array_elements(coalesce(v_rule->'mins', '[]'::jsonb)) x;
  if v_total is not null and coalesce(v_sum, 0) > v_total then
    v_probs := v_probs || jsonb_build_array(jsonb_build_object('code', 'mins_exceed', 'sum', v_sum, 'total', v_total));
  end if;

  return jsonb_build_object('ok', true, 'applicable', true, 'course_id', p_course,
    'level', v_state->'level', 'next', v_state->'next',
    'rule', case when v_rule is null then null
                 else jsonb_build_object('total', v_total,
                        'mins', (select coalesce(jsonb_agg(jsonb_build_object('strand_id', x->'strand_id',
                                   'name', x->'name', 'min', x->'min')), '[]'::jsonb)
                                   from jsonb_array_elements(v_rule->'mins') x)) end,
    'counts', v_counts, 'strands', v_strands, 'problems', v_probs);
end $function$;

-- ⑦ للمصمّم: كتابةُ الشرط — يحلّ محلّ القديم كلِّه، والفارغُ يمحوه، والسجلُّ بما قبله وما بعده
create or replace function public.save_promotion_rule(p_course bigint, p_total int, p_mins jsonb default '[]'::jsonb,
                                                      p_note text default null)
 returns jsonb
 language plpgsql
 security definer
 set search_path to 'public'
as $function$
declare
  v_subject bigint;
  v_prog    text;
  v_level   bigint;
  v_before  jsonb;
  v_after   jsonb;
  v_x       jsonb;      -- ⚠️ لا `x`: الاسمُ نفسُه اسمُ الجدول المستعار في الاستعلامات أدناه، فيلتبس (قِيس في الجافّة)
  v_sid     bigint;
  v_min     int;
begin
  if auth.uid() is null then
    return jsonb_build_object('ok', false, 'error', 'يلزم تسجيل الدخول');
  end if;
  select c.subject_id, s.progression, c.level_id into v_subject, v_prog, v_level
    from courses c join subjects s on s.id = c.subject_id
   where c.id = p_course;
  if v_subject is null then
    return jsonb_build_object('ok', false, 'error', 'المقرَّر غير موجود');
  end if;
  if not can_curate(v_subject) then
    return jsonb_build_object('ok', false, 'error', 'شرط الترقية لفريق الإشراف');
  end if;
  if v_prog is distinct from 'level' or v_level is null then
    return jsonb_build_object('ok', false, 'error', 'هذا المقرَّر لا يُرقّى منه بالمستوى');
  end if;
  if p_total is not null and (p_total < 1 or p_total > 99) then
    return jsonb_build_object('ok', false, 'error', 'عدد الكتب بين ١ و٩٩');
  end if;

  -- الحدود: كلٌّ على فرعٍ من المادّة نفسِها، بين ١ و٩٩، والفرعُ مرّةً واحدة — ويُفحص كلُّه قبل أيّ كتابة
  for v_x in select * from jsonb_array_elements(coalesce(p_mins, '[]'::jsonb)) loop
    v_sid := nullif(v_x->>'strand_id', '')::bigint;
    v_min := nullif(v_x->>'min', '')::int;
    if v_min is null or v_min = 0 then continue; end if;
    if p_total is null then
      return jsonb_build_object('ok', false, 'error', 'الحد الأدنى لرف يحتاج عددا كليا معه');
    end if;
    if v_sid is null or not exists (select 1 from strands where id = v_sid and subject_id = v_subject) then
      return jsonb_build_object('ok', false, 'error', 'الرف ليس من هذه المادة');
    end if;
    if v_min < 1 or v_min > 99 then
      return jsonb_build_object('ok', false, 'error', 'الحد الأدنى لرف بين ١ و٩٩');
    end if;
  end loop;
  if (select count(*) from jsonb_array_elements(coalesce(p_mins, '[]'::jsonb)) x
       where coalesce(nullif(x->>'min', '')::int, 0) > 0)
     <> (select count(distinct x->>'strand_id') from jsonb_array_elements(coalesce(p_mins, '[]'::jsonb)) x
          where coalesce(nullif(x->>'min', '')::int, 0) > 0) then
    return jsonb_build_object('ok', false, 'error', 'الرف مكرر في الشرط');
  end if;

  v_before := (select jsonb_agg(jsonb_build_object('strand_id', strand_id, 'min', min_books) order by strand_id nulls first)
                 from promotion_rules where course_id = p_course);

  delete from promotion_rules where course_id = p_course;
  if p_total is not null then
    insert into promotion_rules (course_id, strand_id, min_books, updated_by)
    values (p_course, null, p_total, auth.uid());
    insert into promotion_rules (course_id, strand_id, min_books, updated_by)
    select p_course, (x->>'strand_id')::bigint, (x->>'min')::int, auth.uid()
      from jsonb_array_elements(coalesce(p_mins, '[]'::jsonb)) x
     where coalesce(nullif(x->>'min', '')::int, 0) > 0;
  end if;

  v_after := (select jsonb_agg(jsonb_build_object('strand_id', strand_id, 'min', min_books) order by strand_id nulls first)
                from promotion_rules where course_id = p_course);

  -- 📌 السجلُّ يُكتب ولو لم يتغيّر شيء؟ لا: حفظٌ بلا تغييرٍ ضجيجٌ في سجلٍّ يُقرأ لمقارنة النُّسخ
  if v_before is distinct from v_after then
    perform admin_log('content', null,
      jsonb_build_object('table', 'promotion_rules', 'course_id', p_course, 'rule', v_before),
      jsonb_build_object('table', 'promotion_rules', 'course_id', p_course, 'rule', v_after), p_note);
  end if;

  return jsonb_build_object('ok', true, 'course_id', p_course, 'rule', v_after);
end $function$;

-- ⑧ للطالب: ما أنجز من شرط مستواه وما بقي
create or replace function public.level_progress(p_subject bigint)
 returns jsonb
 language plpgsql
 stable security definer
 set search_path to 'public'
as $function$
declare v_course bigint;
begin
  if auth.uid() is null then
    return jsonb_build_object('ok', false, 'error', 'يلزم تسجيل الدخول');
  end if;
  if (select progression from subjects where id = p_subject) is distinct from 'level' then
    return jsonb_build_object('ok', true, 'applicable', false);
  end if;
  v_course := my_course_in(p_subject);
  if v_course is null then
    return jsonb_build_object('ok', true, 'applicable', true, 'course_id', null);
  end if;
  return jsonb_build_object('ok', true, 'applicable', true) || promotion_state(v_course);
end $function$;

-- ⑨ للطالب: المنارة — تعيد الحسابَ ثمّ ترفع إلى المستوى التالي وتحفظ صورةَ الشرط
create or replace function public.promote_level(p_subject bigint)
 returns jsonb
 language plpgsql
 security definer
 set search_path to 'public'
as $function$
declare
  v_course bigint;
  v_state  jsonb;
  v_scale  bigint;
  v_res    jsonb;
begin
  if auth.uid() is null then
    return jsonb_build_object('ok', false, 'error', 'يلزم تسجيل الدخول');
  end if;
  if (select progression from subjects where id = p_subject) is distinct from 'level' then
    return jsonb_build_object('ok', false, 'error', 'هذه المادة لا ترقية فيها');
  end if;
  v_course := my_course_in(p_subject);
  if v_course is null then
    return jsonb_build_object('ok', false, 'error', 'لا مستوى لك في هذه المادة بعد');
  end if;
  v_state := promotion_state(v_course);
  if not coalesce((v_state->>'ready')::boolean, false) then
    return jsonb_build_object('ok', false, 'error', 'شرط الترقية لم يكتمل بعد');
  end if;

  select lv.scale_id into v_scale from levels lv where lv.id = (v_state->'level'->>'id')::bigint;
  v_res := set_my_level(v_scale, (v_state->'next'->>'id')::bigint, 'promotion');
  if not coalesce((v_res->>'ok')::boolean, false) then return v_res; end if;

  insert into level_promotions (user_id, subject_id, course_id, from_level, to_level, rule)
  values (auth.uid(), p_subject, v_course, (v_state->'level'->>'id')::bigint, (v_state->'next'->>'id')::bigint,
          jsonb_build_object('rule', v_state->'rule', 'done', v_state->'done'));

  return jsonb_build_object('ok', true, 'level', v_state->'next'->>'name');
end $function$;

-- المنح: الثلاثُ للمسجَّلين، والقلبُ والمَفصلان داخليّة (تناديها دوالُّ التعريف وحدها)
revoke all on function public.reading_tier(uuid), public.my_course_in(bigint, uuid), public.promotion_state(bigint, uuid),
                       public.course_promotion(bigint), public.save_promotion_rule(bigint, int, jsonb, text),
                       public.level_progress(bigint), public.promote_level(bigint) from public, anon;
revoke all on function public.reading_tier(uuid), public.my_course_in(bigint, uuid), public.promotion_state(bigint, uuid)
  from authenticated;
grant execute on function public.course_promotion(bigint), public.save_promotion_rule(bigint, int, jsonb, text),
                          public.level_progress(bigint), public.promote_level(bigint) to authenticated;
grant execute on function public.reading_tier(uuid), public.my_course_in(bigint, uuid), public.promotion_state(bigint, uuid),
                          public.course_promotion(bigint), public.save_promotion_rule(bigint, int, jsonb, text),
                          public.level_progress(bigint), public.promote_level(bigint) to service_role;

-- ═══════════ معدَّلة ═══════════

-- ⑩ مصدرُ المستوى: `promotion` بابٌ خامس (④ في الرأس) — والأربعةُ القديمة كما هي
alter table public.student_levels drop constraint if exists student_levels_source_check;
alter table public.student_levels add constraint student_levels_source_check
  check (source = any (array['test', 'profile', 'self', 'teacher', 'promotion']));

-- ═══════════ الختم ═══════════

insert into public.sql_log (n, title, applied_at)
values ('205', 'شرطُ الترقية — عددُ الكتب المنجزة يكتبه المصمّم لكلّ مقرَّر، ويُطوَّر بالنتائج', now())
on conflict (n) do update set applied_at = now();
