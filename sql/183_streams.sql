-- ══════════════════════════════════════════════════════════════════════
--  ١٨٣ · الشُّعبة — تُكتب في المادّة، ويختارها الطالبُ مرّةً لكلّ مادّة
-- ══════════════════════════════════════════════════════════════════════
--
--  قرارُ المالك (٢٥–٢٦ أكتوبر): تصميمُ الطبقات الثلاث (`spec-content-layers.md`
--  في الجذر) مقبولٌ للبناء، والخطوةُ الأولى الشُّعبةُ وحدها (§٨ ١) — وق١ وق٢ على
--  التوصية (§٧). وهذا الملفُّ البنيةُ وحدها: لا شُعبةَ فيه لمادّة.
--
--  🔑 **ولماذا جدولٌ جديد لا `paths` ولا `elective_group`** (§٢ «الواقع»):
--     · `paths` مسارٌ مدرسيٌّ للسلّم كلِّه يُختار في الملفّ الشخصيّ عند `from_rank`،
--       ويحكم كلَّ موادّ السلّم — والسلّمُ السعوديُّ بلا مسارات.
--     · و`elective_group` مع `student_courses` اختيارٌ مربوطٌ بالصفّ ⇒ طالبُ IELTS
--       يُسأل من جديد عند كلّ نطاق. والشُّعبةُ تُختار **مرّةً لكلّ مادّة**.
--  🔑 **والاسمُ في القاعدة `streams` وحده، والطالبُ لا يراه:** كلُّ مادّةٍ تسمّي شُعبَها
--     بكلمتها (`subjects.stream_label`) — فلا مصطلحَ عامٌّ يزاحم «المسار» (طريقُ التسكين
--     في معجم بيان) ولا «الصف».
--
--  وثمانيةُ أحكامٍ تُقرأ ولا تُستنتج:
--
--  ① **ق١ — الطالبُ يختار، ولا تُفرض شُعبةٌ ولا تُستنتج** من صفٍّ أو مسار: طالبُ الأوّل
--     الثانويّ لم يُحدَّد مسارُه المدرسيُّ بعد. والتغييرُ متى شاء بالدالّة نفسِها
--     (`on conflict … do update`) **ولا يضيع شيء:** التقدّمُ على المصدر (`item_progress`)
--     والاختبار (`attempts`) لا على المقرَّر. وسطرُ العون («إن لم تحدّد بعد فالعلميّ …»)
--     **بياناتٌ في `streams.hint`** تأتي مع صفوف الخطوة ٤ — فالشُّعبةُ بياناتٌ لا شيفرة (§٩-١).
--  ② **ق٢ — الكلمةُ المعروضة نصٌّ في المادّة** («التخصص» · «نوع الاختبار»)، وقيمُها مع
--     محتواها. **ومادّةٌ لها شُعبٌ لا تبقى بلا كلمتها:** `save_stream` لا تُنشئ شُعبةً قبلها،
--     و`save_subject` لا تمحوها ما بقيت للمادّة شُعبة.
--  ③ **مقرَّرٌ بلا شُعبةٍ لكلّ الشُّعب، وذو الشُّعبة محجوبٌ عمّن لم يختر بعد** (`courses_of`).
--     ⇒ فالمادّةُ قبل الاختيار قد تخلو من مقرَّرٍ مرئيّ، **فلو بقي شرطُ `list_subjects` القديم
--     (مقرَّرٌ مرئيّ) لغابت المادّة ولم يُسأل الطالبُ أبداً.** فتبقى بنصف شرط `courses_of`
--     الذي يخصّ المادّة (سلّمُها)، وتحمل `needs_stream`، وفي مجموعة صفّه (`1_grade`).
--     ونصفُ المقرَّر (الصفّ · المسار · الاختيار) تجيب عنه المقرَّراتُ التي تكشفها الشُّعبة.
--     ⚠️ **وحدٌّ معلن:** مادّةٌ بالملفّ (`profile`) شُعبُها كلُّها في مقرَّراتٍ فوق صفّ الطالب
--     تسأله ثمّ تغيب. لا مادّةَ كذلك اليوم، ولا في الخطوة ٤ (مقرَّرا القدرات بلا صفّ).
--     **والمعلّمُ لا يُسأل:** يرى المقرَّراتِ كلَّها كما اليوم.
--  ④ **الثقب ③ (§١):** `c2.level_id = c.level_id` في المجموعة الاختياريّة ⇐ `is not distinct
--     from` — فمقرَّران اختياريّان بلا صفٍّ كانا يبقيان ظاهرين معاً بعد الاختيار. و`student_courses`
--     لا تكتبه دالّةٌ بعد: **الاختياريّاتُ المصريّةُ الثمانية قرارٌ منفصل** (ق٥).
--  ⑤ **ترقيعٌ في الحيّة لا نسخٌ لها** (مهارةُ الانضباط · §٣) — ستُّ دوالّ وعشرون مرسى،
--     **قِيس كلٌّ منها مرّةً واحدةً في الحيّة (٢٦ أكتوبر)**. ومُرقِّعٌ واحدٌ يعدّها كلَّها
--     (`pg_temp.patch183` — يعيش في الجلسة ويزول بزوالها): أيُّ عددٍ غيرُ الواحد ⇒ استثناءٌ
--     ولا يُكتب شيء. والشُّعبةُ قائمةٌ في الدالّة ⇒ يُخبر ويمضي (الملفُّ يُعاد تشغيلُه).
--     وما يُدرَج في جسدٍ أسطرُه `\r\n` يُدرَج بها، فلا يختلط في الجسد الواحد نوعان.
--  ⑥ 🔴 **`save_subject` و`save_course` بمعاملٍ جديد ⇒ توقيعٌ جديد، والقديمُ يُسقَط في
--     المعاملة نفسها** — وإلّا بقيت نسختان فأنتج كلُّ نداءٍ بالأسماء «function is not unique»
--     (سابقةُ `160` في `save_card`). **فالإسقاطُ شرطُ عملٍ لا تنظيف، ويحتاج إذناً.**
--     ومعاملُ الشُّعبة الفارغ «لكلّ الشُّعب» كـ`p_path` تماماً: الشاشةُ تُرسل الحالةَ كاملة.
--  ⑦ **الكتابةُ بدالّةٍ وحدها** (الثابت ⑦): لا منحَ كتابةٍ على الجدولين، والقراءةُ بسياسة.
--     وإدارةُ الشُّعب لمن له `can_curate` (`save_stream`)، والمادّةُ والمقرَّرُ للمدير كما كانا.
--     و`content_tree` و`author_tree` تحملان الشُّعبةَ إضافةً لا استبدالاً — للإدارة والشارة.
--  ⑧ 🔴 **`courses_uniq` لا يعرف الشُّعبة — كشفته الجافّة (٢٦ أكتوبر):** مقرَّرٌ واحدٌ لكلّ
--     (مادّة · صفّ · مسار)، فلا يقوم مقرَّران لا يفرّقهما إلا الشُّعبة — وهما بعينهما «القدرات ·
--     نظري» بجوار ٤٣ (الخطوة ٤) ونطاقاتُ IELTS بنوعيها. ⇒ **فهرسٌ بالشُّعبة رابعةً
--     (`courses_uniq_stream`) ثمّ يُسقط القديم.** ولا قيدَ يقوم عليه ولا دالّةَ تسمّيه (قِيس)،
--     و`save_course` كاتبُ `courses` الوحيد. **والإسقاطُ يحتاج إذناً** كإسقاط التوقيعين.
--
--  📐 وما ليس هنا عمداً:
--  · **الوحداتُ العابرة والبنوك وصفوفُ القدرات** — الخطوات ٢ و٣ و٤.
--  · 🔴 **`can_access_lesson` لا تعرف المقرَّر** (الثقب ④): درسٌ في مقرَّر شُعبةٍ يُفتح برابطه
--    أو من البحث لطالب الشُّعبة الأخرى ولمن لم يختر. يُغلق في الخطوة ٢ بالعضويّة.
--    واليوم: المقرَّر ٤٣ بلا درس — فلا شيءَ مكشوف.
--  · **حذفُ الشُّعبة** — لا دالّة له. والقيدان يردّانه ما بقي لها مقرَّرٌ أو طالب:
--    مصيرُ من اختارها قرار.
-- ══════════════════════════════════════════════════════════════════════


-- ═══════════════════ منشأة ═══════════════════

-- ① شُعبُ المادّة
create table if not exists public.streams (
  id         bigint  generated always as identity primary key,
  subject_id bigint  not null references public.subjects(id) on delete cascade,
  code       text    not null,
  name       text    not null,
  hint       text,
  sort_order integer not null default 0,
  constraint streams_subject_code_key unique (subject_id, code),
  -- مرسى القيدين المركّبين أدناه: الشُّعبةُ لا تُنسب إلا إلى مادّتها
  constraint streams_id_subject_key   unique (id, subject_id)
);

-- ② اختيارُ الطالب — سطرٌ لكلّ (طالب · مادّة). و'teacher' على عرف `student_levels`
--    محجوزٌ لتعيينٍ يأتي؛ ولا يكتب اليومَ إلا `set_my_stream` بـ'self'.
create table if not exists public.student_streams (
  user_id    uuid    not null references public.profiles(id) on delete cascade,
  subject_id bigint  not null references public.subjects(id) on delete cascade,
  stream_id  bigint  not null,
  source     text    not null default 'self' check (source in ('self', 'teacher')),
  set_at     timestamptz not null default now(),
  primary key (user_id, subject_id),
  constraint student_streams_stream_fk
    foreign key (stream_id, subject_id) references public.streams (id, subject_id)
);

-- ③ العمودان — وشُعبةُ المقرَّر من شُعب مادّته بقيدٍ لا بالدالّة وحدها
alter table public.courses  add column if not exists stream_id    bigint;
alter table public.subjects add column if not exists stream_label text;

do $con$
begin
  if not exists (select 1 from pg_constraint
                  where conname = 'courses_stream_fk' and conrelid = 'public.courses'::regclass) then
    alter table public.courses add constraint courses_stream_fk
      foreign key (stream_id, subject_id) references public.streams (id, subject_id);
  end if;
end $con$;

--    وقاعدةُ التفرّد تعرف الشُّعبة (رأس الملفّ ⑧): مقرَّرٌ لكلّ (مادّة · صفّ · مسار · شُعبة)
create unique index if not exists courses_uniq_stream on public.courses
  (subject_id, coalesce(level_id, 0::bigint), coalesce(path_id, 0::bigint), coalesce(stream_id, 0::bigint));
--  ⛔ الإسقاطُ — شرطُ عملٍ لا تنظيف، ويحتاج إذناً (رأس الملفّ ⑧)
drop index if exists public.courses_uniq;

comment on table public.streams is
  'شُعبُ المادّة (علميّ · نظريّ — Academic · General Training): تُكتب مرّةً في المادّة، ويختار الطالبُ منها مرّةً لكلّ مادّة. والكلمةُ التي يراها في subjects.stream_label (183)';
comment on column public.streams.hint is
  'سطرُ عونٍ تحت الخيار في شاشة الاختيار — لمن يتردّد (183)';
comment on table public.student_streams is
  'شُعبةُ الطالب في كلّ مادّة — يكتبها set_my_stream وحده. والتغييرُ لا يُضيع شيئاً: التقدّمُ على المصدر والاختبار لا على المقرَّر (183)';
comment on column public.courses.stream_id is
  'شُعبةُ المقرَّر من شُعب مادّته، وفارغٌ ⇒ لكلّ الشُّعب. ويحجب courses_of المقرَّرَ عمّن اختار غيرها أو لم يختر بعد (183)';
comment on column public.subjects.stream_label is
  'الكلمةُ التي تسمّي بها المادّةُ شُعبَها للطالب («التخصص» · «نوع الاختبار») — فلا يرى كلمةً عامّة تزاحم «المسار» و«الصف» (183)';


-- ④ اختيارُ الطالب — دالّةٌ لا `update` (نسقُ `set_my_grade`)
create or replace function public.set_my_stream(p_subject bigint, p_stream bigint)
returns jsonb language plpgsql volatile security definer set search_path to 'public'
as $function$
declare v_uid uuid := auth.uid(); v_name text;
begin
  if v_uid is null then
    return jsonb_build_object('ok', false, 'error', 'يلزم تسجيل الدخول');
  end if;

  select st.name into v_name
    from streams st join subjects s on s.id = st.subject_id
   where st.id = p_stream and st.subject_id = p_subject and s.active;
  if v_name is null then
    return jsonb_build_object('ok', false, 'error', 'هذا الخيار غير متاح في هذه المادّة');
  end if;

  insert into student_streams (user_id, subject_id, stream_id, source, set_at)
  values (v_uid, p_subject, p_stream, 'self', now())
  on conflict (user_id, subject_id) do update
     set stream_id = excluded.stream_id, source = excluded.source, set_at = excluded.set_at;

  return jsonb_build_object('ok', true, 'subject_id', p_subject,
                            'stream_id', p_stream, 'name', v_name);
end $function$;

-- ⑤ إدارةُ الشُّعب — إضافةٌ وتعديل لمن يشرف على المادّة
create or replace function public.save_stream(
  p_id bigint, p_subject bigint, p_code text, p_name text,
  p_hint text default null, p_sort integer default 0, p_note text default null)
returns jsonb language plpgsql security definer set search_path to 'public'
as $function$
/* 🔑 مادّةُ الشُّعبة عند التعديل من صفّها لا من المستدعي — فلا تنتقل شُعبةٌ بين مادّتين،
      ولا يُحكَم بإشرافٍ على مادّةٍ غيرِ مادّتها. */
declare v_id bigint; v_before jsonb; v_subject bigint := p_subject;
        v_code text := lower(btrim(coalesce(p_code,'')));
begin
  if p_id is not null then
    select subject_id into v_subject from streams where id = p_id;
    if v_subject is null then
      return jsonb_build_object('ok', false, 'error', 'لا شعبة بهذا المعرّف');
    end if;
    if p_subject is not null and p_subject <> v_subject then
      return jsonb_build_object('ok', false, 'error', 'الشعبة لا تنتقل إلى مادّة أخرى');
    end if;
  end if;

  if not can_curate(v_subject) then
    return jsonb_build_object('ok', false, 'error', 'صلاحية الإشراف على المادّة مطلوبة');
  end if;
  if not exists (select 1 from subjects where id = v_subject) then
    return jsonb_build_object('ok', false, 'error', 'المادّة غير موجودة');
  end if;
  if v_code = '' or coalesce(btrim(p_name),'') = '' then
    return jsonb_build_object('ok', false, 'error', 'الكود والاسم لازمان');
  end if;
  if v_code !~ '^[a-z][a-z0-9_]{0,15}$' then
    return jsonb_build_object('ok', false, 'error',
      'الكود حروف إنجليزية صغيرة وأرقام، يبدأ بحرف، حتى ١٦ خانة');
  end if;
  if exists (select 1 from streams
              where subject_id = v_subject and name = btrim(p_name) and id is distinct from p_id) then
    return jsonb_build_object('ok', false, 'error', 'الاسم مستعمل في شعبة أخرى من المادّة');
  end if;
  if (select nullif(btrim(coalesce(stream_label,'')),'') from subjects where id = v_subject) is null then
    return jsonb_build_object('ok', false, 'error',
      'الكلمة المعروضة للشعب لازمة في المادّة قبل أوّل شعبة');
  end if;

  select to_jsonb(st) into v_before from streams st where st.id = p_id;

  if p_id is null then
    insert into streams (subject_id, code, name, hint, sort_order)
    values (v_subject, v_code, btrim(p_name), nullif(btrim(coalesce(p_hint,'')),''),
            coalesce(p_sort,0))
    returning id into v_id;
  else
    update streams set code = v_code, name = btrim(p_name),
           hint = nullif(btrim(coalesce(p_hint,'')),''), sort_order = coalesce(p_sort,0)
     where id = p_id returning id into v_id;
  end if;

  perform admin_log('content', null, v_before,
    jsonb_build_object('table','streams') || to_jsonb((select st from streams st where st.id = v_id)), p_note);
  return jsonb_build_object('ok', true, 'id', v_id, 'name', btrim(p_name));
exception when unique_violation then
  return jsonb_build_object('ok', false, 'error', 'الكود مستعمل في شعبة أخرى من المادّة: ' || v_code);
end $function$;


-- ═══════════════════ معدَّلةٌ لا منشأة ═══════════════════

-- المُرقِّع (رأس الملفّ ⑤): أزواجُ [مرسى، بديل] على الحيّة، والعددُ واحدٌ أو لا شيء
create or replace function pg_temp.patch183(p_fn regprocedure, p_patches text[])
returns text language plpgsql as $f$
declare v text := pg_get_functiondef(p_fn); a text; b text; n int;
begin
  if coalesce(array_length(p_patches, 1), 0) % 2 <> 0 then
    raise exception '183 · %: المراسي أزواجٌ [مرسى، بديل]', p_fn;
  end if;
  for i in 1 .. array_length(p_patches, 1) by 2 loop
    a := p_patches[i];
    b := p_patches[i + 1];
    if position(E'\r' in v) > 0 then b := replace(b, E'\n', E'\r\n'); end if;
    n := (length(v) - length(replace(v, a, ''))) / length(a);
    if n <> 1 then
      raise exception '183 · %: وُجد المرسى «%» % مرّةً لا مرّةً واحدة — لا يُرقَّع على الظنّ', p_fn, a, n;
    end if;
    v := replace(v, a, b);
  end loop;
  return v;
end $f$;

-- ⑥ courses_of — شرطُ الشُّعبة، والثقب ③
do $$
begin
  if position('stream_id' in pg_get_functiondef('public.courses_of(uuid)'::regprocedure)) > 0 then
    raise notice '183: الشُّعبةُ قائمةٌ في courses_of من قبل — لا تغيير'; return;
  end if;
  execute pg_temp.patch183('public.courses_of(uuid)', array[
    $a$c2.level_id = c.level_id$a$,
    $b$c2.level_id is not distinct from c.level_id$b$,

    $a$or c.path_id = (select path_id from profiles where id = p_user))$a$,
    $b$or c.path_id = (select path_id from profiles where id = p_user))
    -- 183 · الشُّعبة: فارغةٌ لكلّ الشُّعب، وإلّا فشُعبةُ الطالب في مادّة المقرَّر — ومن لم يختر لا يراه
    and (c.stream_id is null
         or c.stream_id = (select ss.stream_id from student_streams ss
                            where ss.user_id = p_user and ss.subject_id = c.subject_id))$b$]);
end $$;

-- ⑦ list_subjects — needs_stream · streams · my_stream · stream_label، والمادّةُ تبقى لتُسأل
do $$
begin
  if position('needs_stream' in pg_get_functiondef('public.list_subjects()'::regprocedure)) > 0 then
    raise notice '183: الشُّعبةُ قائمةٌ في list_subjects من قبل — لا تغيير'; return;
  end if;
  execute pg_temp.patch183('public.list_subjects()', array[
    $a$'needs_placement', s.placement = 'test'$a$,
    $b$'needs_stream', ns.needs_stream,
      'streams', coalesce((select jsonb_agg(jsonb_build_object(
                     'id', st.id, 'code', st.code, 'name', st.name, 'hint', st.hint)
                     order by st.sort_order, st.id)
                   from streams st where st.subject_id = s.id), '[]'::jsonb),
      'my_stream', (select ss.stream_id from student_streams ss
                    where ss.user_id = auth.uid() and ss.subject_id = s.id),
      'stream_label', s.stream_label,
      'needs_placement', s.placement = 'test'$b$,

    $a$else '2_past' end,$a$,
    $b$when ns.needs_stream then '1_grade'   -- 183: مادّةُ صفّه وإن لم تظهر مقرَّراتُها بعد
        else '2_past' end,$b$,

    $a$from subjects s$a$,
    $b$from subjects s
    -- 183 · للمادّة شُعبٌ ولم يختر الطالبُ بعد — والمعلّمُ لا يُسأل: يرى المقرَّراتِ كلَّها
    cross join lateral (
      select not is_teacher()
         and exists (select 1 from streams st where st.subject_id = s.id)
         and not exists (select 1 from student_streams ss
                          where ss.user_id = auth.uid() and ss.subject_id = s.id)
        as needs_stream) ns$b$,

    $a$or exists (select 1 from my_courses() m where m.subject_id = s.id))$a$,
    $b$or exists (select 1 from my_courses() m where m.subject_id = s.id)
        -- 183 · ومقرَّراتُها محجوبةٌ حتى يختار ⇒ تبقى بشرط المادّة وحده (سلّمُها) لتُسأل
        or (ns.needs_stream
            and (s.scale_id is null
                 or s.scale_id = (select p.scale_id from profiles p where p.id = auth.uid()))))$b$]);
end $$;

-- ⑧ content_tree — شُعبُ المادّة وكلمتُها، وشُعبةُ المقرَّر (لشاشة إدارة المحتوى)
do $$
begin
  if position('stream_label' in pg_get_functiondef('public.content_tree()'::regprocedure)) > 0 then
    raise notice '183: الشُّعبةُ قائمةٌ في content_tree من قبل — لا تغيير'; return;
  end if;
  execute pg_temp.patch183('public.content_tree()', array[
    $a$'description', sj.description, 'sort', sj.sort_order,$a$,
    $b$'description', sj.description, 'sort', sj.sort_order,
        'stream_label', sj.stream_label,                                  -- 183
        'streams', (select coalesce(jsonb_agg(jsonb_build_object(
            'id', st.id, 'code', st.code, 'name', st.name, 'hint', st.hint, 'sort', st.sort_order,
            'courses',  (select count(*) from courses c where c.stream_id = st.id),
            'students', (select count(*) from student_streams ss where ss.stream_id = st.id)
          ) order by st.sort_order, st.id), '[]'::jsonb) from streams st where st.subject_id = sj.id),$b$,

    $a$'elective_group', c.elective_group, 'position', c.position, 'active', c.active,$a$,
    $b$'elective_group', c.elective_group, 'position', c.position, 'active', c.active,
        'stream_id', c.stream_id, 'stream', (select name from streams where id = c.stream_id),   -- 183$b$]);
end $$;

-- ⑨ author_tree — شُعبةُ المقرَّر لشارة بطاقته في شاشة التأليف
do $$
begin
  if position('stream_id' in pg_get_functiondef('public.author_tree()'::regprocedure)) > 0 then
    raise notice '183: الشُّعبةُ قائمةٌ في author_tree من قبل — لا تغيير'; return;
  end if;
  execute pg_temp.patch183('public.author_tree()', array[
    $a$'curate', can_curate(c.subject_id),$a$,
    $b$'stream_id', c.stream_id,                                              -- 183
        'stream', (select st.name from streams st where st.id = c.stream_id),
        'curate', can_curate(c.subject_id),$b$]);
end $$;

-- ⑩ save_subject + p_stream_label — توقيعٌ جديد من الحيّة (رأس الملفّ ⑥)
do $$
begin
  if to_regprocedure('public.save_subject(bigint,text,text,bigint,text,text,text,boolean,text,text,text,integer,text,text)') is not null then
    raise notice '183: save_subject بالكلمة المعروضة قائمةٌ من قبل — لا تغيير'; return;
  end if;
  execute pg_temp.patch183('public.save_subject(bigint,text,text,bigint,text,text,text,boolean,text,text,text,integer,text)', array[
    $a$p_sort integer DEFAULT 0, p_note text DEFAULT NULL::text)$a$,
    $b$p_sort integer DEFAULT 0, p_note text DEFAULT NULL::text, p_stream_label text DEFAULT NULL::text)$b$,

    $a$declare v_id bigint; v_before jsonb;$a$,
    $b$declare v_id bigint; v_before jsonb;
        v_label text := nullif(btrim(coalesce(p_stream_label,'')),'');$b$,

    $a$select to_jsonb(s) into v_before from subjects s where s.id = p_id;$a$,
    $b$/* 183 · مادّةٌ لها شُعبٌ لا تبقى بلا كلمتها: الطالبُ لا يرى كلمةً عامّة */
  if v_label is null and exists (select 1 from streams st where st.subject_id = p_id) then
    return jsonb_build_object('ok', false, 'error', 'للمادّة شعب، فكلمتها المعروضة لازمة');
  end if;

  select to_jsonb(s) into v_before from subjects s where s.id = p_id;$b$,

    $a$active, icon, tool, description, sort_order)$a$,
    $b$active, icon, tool, description, sort_order, stream_label)$b$,

    $a$p_description, coalesce(p_sort,0))$a$,
    $b$p_description, coalesce(p_sort,0), v_label)$b$,

    $a$tool = p_tool, description = p_description, sort_order = coalesce(p_sort,0)$a$,
    $b$tool = p_tool, description = p_description, sort_order = coalesce(p_sort,0),
           stream_label = v_label$b$]);
end $$;

-- ⑪ save_course + p_stream — توقيعٌ جديد من الحيّة (رأس الملفّ ⑥)
do $$
begin
  if to_regprocedure('public.save_course(bigint,bigint,bigint,text,bigint,text,integer,boolean,text,bigint)') is not null then
    raise notice '183: save_course بالشُّعبة قائمةٌ من قبل — لا تغيير'; return;
  end if;
  execute pg_temp.patch183('public.save_course(bigint,bigint,bigint,text,bigint,text,integer,boolean,text)', array[
    $a$p_active boolean DEFAULT true, p_note text DEFAULT NULL::text)$a$,
    $b$p_active boolean DEFAULT true, p_note text DEFAULT NULL::text, p_stream bigint DEFAULT NULL::bigint)$b$,

    $a$select to_jsonb(c) into v_before from courses c where c.id = p_id;$a$,
    $b$/* 183 · والشُّعبةُ من شُعب مادّة المقرَّر — والقيدُ المركّب في الجدول يحرسها أيضاً */
  if p_stream is not null
     and not exists (select 1 from streams st
                      where st.id = p_stream and st.subject_id = p_subject) then
    return jsonb_build_object('ok', false, 'error', 'هذه الشعبة ليست من شعب المادّة');
  end if;

  select to_jsonb(c) into v_before from courses c where c.id = p_id;$b$,

    $a$insert into courses (subject_id, level_id, path_id, title, elective_group, position, active)$a$,
    $b$insert into courses (subject_id, level_id, path_id, title, elective_group, position, active, stream_id)$b$,

    $a$coalesce(p_position,0), coalesce(p_active,true))$a$,
    $b$coalesce(p_position,0), coalesce(p_active,true), p_stream)$b$,

    $a$position = coalesce(p_position,0), active = coalesce(p_active,true)$a$,
    $b$position = coalesce(p_position,0), active = coalesce(p_active,true),
           stream_id = p_stream$b$]);
end $$;

--  ⛔ الإسقاطُ — شرطُ عملٍ لا تنظيف، ويحتاج إذناً (رأس الملفّ ⑥)
drop function if exists public.save_subject(bigint,text,text,bigint,text,text,text,boolean,text,text,text,integer,text);
drop function if exists public.save_course(bigint,bigint,bigint,text,bigint,text,integer,boolean,text);


-- ═══════════════════ الصلاحيات — ثلاثُ طبقات ═══════════════════

-- ① المنح: الدالّةُ صريحةٌ لكلّ توقيع — لا يُورَث عن أخٍ سقط
revoke all on function public.set_my_stream(bigint, bigint)                               from public, anon;
revoke all on function public.save_stream(bigint, bigint, text, text, text, integer, text) from public, anon;
revoke all on function public.save_subject(bigint,text,text,bigint,text,text,text,boolean,text,text,text,integer,text,text) from public, anon;
revoke all on function public.save_course(bigint,bigint,bigint,text,bigint,text,integer,boolean,text,bigint)             from public, anon;
grant execute on function public.set_my_stream(bigint, bigint)                               to authenticated;
grant execute on function public.save_stream(bigint, bigint, text, text, text, integer, text) to authenticated;
grant execute on function public.save_subject(bigint,text,text,bigint,text,text,text,boolean,text,text,text,integer,text,text) to authenticated;
grant execute on function public.save_course(bigint,bigint,bigint,text,bigint,text,integer,boolean,text,bigint)             to authenticated;

--    والجدولان: قراءةٌ وحدها — والكتابةُ بالدالّتين (الثابت ⑦)
alter table public.streams         enable row level security;
alter table public.student_streams enable row level security;
revoke all on public.streams         from anon, authenticated;
revoke all on public.student_streams from anon, authenticated;
grant select on public.streams         to authenticated;
grant select on public.student_streams to authenticated;

-- ② الصفّ: الشُّعبُ يقرؤها كلُّ مسجَّل كالمادّة · والاختيارُ صاحبُه ومن يُعلّمه كـ`student_levels`.
--    والسياساتُ تُنشأ أو تُعدَّل في موضعها — بلا هدمٍ ثمّ بناء.
do $pol$
begin
  if exists (select 1 from pg_policies where schemaname = 'public' and tablename = 'streams'
                                         and policyname = 'p_streams_read') then
    alter policy p_streams_read on public.streams to authenticated
      using (auth.uid() is not null);
  else
    create policy p_streams_read on public.streams for select to authenticated
      using (auth.uid() is not null);
  end if;

  if exists (select 1 from pg_policies where schemaname = 'public' and tablename = 'student_streams'
                                         and policyname = 'p_sstreams_read') then
    alter policy p_sstreams_read on public.student_streams to authenticated
      using (user_id = auth.uid() or teaches(user_id));
  else
    create policy p_sstreams_read on public.student_streams for select to authenticated
      using (user_id = auth.uid() or teaches(user_id));
  end if;
end $pol$;

-- ③ المعنى: في الدوالّ أعلاه (`security definer` + `search_path`) — وتعليقُها هنا
comment on function public.set_my_stream(bigint, bigint) is
  'الطالبُ يختار شُعبتَه في مادّةٍ أو يغيّرها — والشُّعبةُ من المادّة نفسها والمادّةُ نشطة (183)';
comment on function public.save_stream(bigint, bigint, text, text, text, integer, text) is
  'إضافةُ شُعبةٍ أو تعديلُها لمن يشرف على المادّة (can_curate). لا تُنشأ قبل الكلمة المعروضة، ولا تنتقل بين مادّتين (183)';
comment on function public.save_subject(bigint,text,text,bigint,text,text,text,boolean,text,text,text,integer,text,text) is
  'حفظُ المادّة للمدير (155). ووُسّعت في 183 بـp_stream_label، وأُسقط توقيعُها القديم في المعاملة نفسها: فنسختان بمعاملٍ فارق تُنتجان «function is not unique» على كلّ نداءٍ بالأسماء.';
comment on function public.save_course(bigint,bigint,bigint,text,bigint,text,integer,boolean,text,bigint) is
  'حفظُ المقرَّر للمدير (155). ووُسّعت في 183 بـp_stream — وفارغٌ لكلّ الشُّعب — وأُسقط توقيعُها القديم في المعاملة نفسها.';
comment on function public.courses_of(uuid) is
  'مقرّراتُ مستخدمٍ بعينه — و my_courses() ظلُّها للمستخدم الحاليّ (179). وذو الشُّعبة لمن اختارها وحده، ومن لم يختر لا يراه (183). مغلقة: تتخطّى RLS.';


-- ═══════════════════ السجلّ ═══════════════════

insert into public.sql_log (n, title, applied_at)
values ('183', 'الشُّعبة — تُكتب في المادّة، ويختارها الطالبُ مرّةً لكلّ مادّة', now())
on conflict (n) do update set applied_at = now();
