-- ═══════════════════════════════════════════════════════════════════════
-- 155 · إدارةُ المحتوى — الهيكلُ فوق الدرس يصير له فمٌ محروس
--
-- 🔴 **المسألة مقيسة: صفرُ دالّةِ كتابةٍ** لـ`scales` و`levels` و`paths`
--    و`subjects` و`courses` و`dx_codes`. فالهيكلُ كلُّه — ٦ مقاييس و١٨
--    مستوًى و٢٠ مادّة و٤ مسارات و٤٠ مقرّراً و٣٦ كود تشخيص — **يُكتب
--    بيدٍ في محرّر القاعدة حتى اليوم.** ولا سجلَّ لمن كتب ولا متى.
--    (والموجود `save_unit` وحدها، ومعها مستورِدان — فالوحدةُ فما لها.)
--
-- 🔑 **والحدُّ الفاصل: ما يُؤلَّف يبقى في المحرّر، وما يُفتح ويُسمّى
--    يأتي هنا.** فلا تلمس هذه الدوالُّ درساً ولا وحدةً ولا سؤالاً:
--      المحرّر ⇐ الدرس · الوحدة · البند · السؤال · الاختبار
--      الإدارة ⇐ المقياس · المستوى · المسار · المادّة · المقرَّر · الكود
--    🔴 **ولماذا هذا الحدّ:** فمان لقاعدةٍ واحدة ينحرف أحدُهما عن الآخر —
--       وتلك عينُ العلّة التي جاء `147` يُنهيها حين نقل عقدَ الاستيراد
--       إلى القاعدة: «حراسةُ المحرّر نفسُها، ولا ينحرف فمٌ عن فم».
--
-- ═══ ثلاثةُ أحكامٍ تُقرأ هنا لأنّها لا تُقرأ من الشيفرة ═══
--
-- ⛔ **① لا حذفَ البتّة.** حذفُ مادّةٍ يجرّ `courses` ← `units` ← `lessons`
--    ← `items` ← `quizzes` ← `questions` ← `answers` بـ`on delete cascade`.
--    **ومحاولةُ طالبٍ تُمحى بنقرةٍ على زرٍّ في لوحة.** ⇒ التعديلُ يُفتح،
--    والإخفاءُ بـ`active` حيث وُجد العمود، **والحذفُ يبقى فعلاً متعمَّداً
--    في محرّر القاعدة بتجربةٍ جافّة.** وهو نظيرُ قانون المنصّة: السؤالُ
--    المُجاب عنه **يتقاعد ولا يُحذف**.
--    ⚠️ و`scales` و`levels` و`dx_codes` **بلا عمود `active`** ⇒ لا إخفاءَ
--       لها، والتعديلُ وحده. ولا يُضاف عمودٌ قبل أن يُطلب.
--
-- 🔑 **② و`family` حرٌّ لا مقيَّد — عمداً.** لا `check` على
--    `subjects.family` ولا على `dx_codes.family` في القاعدة، والقائمُ
--    قيمٌ مرصودة لا قانون. ⇒ الدوالُّ **تقبل الجديد ولا تردّه**، والشاشةُ
--    تعرض المرصود اقتراحاً. **ودالّةٌ تردّ ما تقبله القاعدةُ تكذب على
--    صاحبها.**
--
-- 🔑 **③ والتفرُّد يُردّ رسالةً لا انفجاراً.** `scales.code` و
--    `subjects.code` و`(scale_id,code)` و`(scale_id,rank)` في `levels`
--    و`(scale_id,code)` في `paths` — كلُّها فريدة. ⇒ `unique_violation`
--    يُلتقط ويُردّ `{ok:false}` بعربيّةٍ تقول أيُّ حقلٍ تكرّر، **فالشاشةُ
--    تعرض سبباً لا رمزَ خطإٍ بلغةٍ أخرى.**
--
-- 🔒 والحارسُ `is_admin()` في كلٍّ منها، والمنحُ لـ`authenticated` وحدها،
--    وكلُّ كتابةٍ تمرّ بـ`admin_log` — فالسجلُّ يشمل المحتوى كما شمل
--    الصلاحيات. و`fn_auto_lock_trg` (154) يسحب `anon` عنها لحظةَ إنشائها.
-- ═══════════════════════════════════════════════════════════════════════

set check_function_bodies = off;


-- ═══════════════════════════════════════════════════════════════════════
-- ① معدَّلٌ لا منشأ — سجلُّ التدقيق يتّسع لفعلٍ خامس
--    🔑 و«المحتوى» فعلٌ واحدٌ لا ستّة: الجدولُ المقصود في `before/after`،
--       والسجلُّ يُقرأ بالفعل لا بالجدول. وستّةُ أفعالٍ تُثقل القيد ولا
--       تزيد صدقاً.
-- ═══════════════════════════════════════════════════════════════════════

alter table public.admin_audit drop constraint if exists admin_audit_action_ck;
alter table public.admin_audit add  constraint admin_audit_action_ck
  check (action in ('role','curator','subjects','request','content'));


-- ═══════════════════════════════════════════════════════════════════════
-- ② منشأة — قارئٌ واحدٌ للهيكل كلِّه
--    🔑 **ومعه عددُ ما يتعلّق بكلّ عقدة** — مقرَّراتُ المادّة ودروسُ
--       المقرَّر وأسئلةُ الكود. **فمن يعدّل يرى ما يمسّه قبل أن يمسّه**،
--       ولا يُغيّر مقياساً تحته ثمانيةَ عشرَ مستوًى وهو يحسبه فارغاً.
-- ═══════════════════════════════════════════════════════════════════════

create or replace function public.content_tree()
returns jsonb language plpgsql stable security definer set search_path to 'public' as $function$
declare v jsonb;
begin
  if not is_admin() then raise exception 'صلاحية المدير مطلوبة'; end if;

  select jsonb_build_object(
    'scales', (select coalesce(jsonb_agg(jsonb_build_object(
        'id', s.id, 'code', s.code, 'name', s.name, 'kind', s.kind,
        'country', s.country, 'track', s.track, 'sort', s.sort_order,
        'levels', (select coalesce(jsonb_agg(jsonb_build_object(
            'id', l.id, 'code', l.code, 'name', l.name, 'rank', l.rank,
            'min_score', l.min_score, 'max_score', l.max_score,
            'courses', (select count(*) from courses c where c.level_id = l.id)
          ) order by l.rank), '[]'::jsonb) from levels l where l.scale_id = s.id),
        'paths',  (select coalesce(jsonb_agg(jsonb_build_object(
            'id', p.id, 'code', p.code, 'name', p.name,
            'from_rank', p.from_rank, 'sort', p.sort_order, 'active', p.active
          ) order by p.sort_order), '[]'::jsonb) from paths p where p.scale_id = s.id),
        'subjects', (select count(*) from subjects sj where sj.scale_id = s.id)
      ) order by s.sort_order, s.id), '[]'::jsonb) from scales s),

    'subjects', (select coalesce(jsonb_agg(jsonb_build_object(
        'id', sj.id, 'code', sj.code, 'name', sj.name, 'scale_id', sj.scale_id,
        'scale', (select name from scales where id = sj.scale_id),
        'family', sj.family, 'placement', sj.placement, 'progression', sj.progression,
        'active', sj.active, 'icon', sj.icon, 'tool', sj.tool,
        'description', sj.description, 'sort', sj.sort_order,
        'courses', (select count(*) from courses c where c.subject_id = sj.id),
        'teachers', (select count(*) from teacher_subjects t where t.subject_id = sj.id)
      ) order by sj.sort_order, sj.id), '[]'::jsonb) from subjects sj),

    'courses', (select coalesce(jsonb_agg(jsonb_build_object(
        'id', c.id, 'title', c.title, 'subject_id', c.subject_id,
        'subject', (select name from subjects where id = c.subject_id),
        'level_id', c.level_id, 'level', (select name from levels where id = c.level_id),
        'path_id', c.path_id,  'path',  (select name from paths  where id = c.path_id),
        'elective_group', c.elective_group, 'position', c.position, 'active', c.active,
        'units',   (select count(*) from units u where u.course_id = c.id),
        'lessons', (select count(*) from lessons ls
                     join units u2 on u2.id = ls.unit_id where u2.course_id = c.id)
      ) order by c.subject_id, c.position, c.id), '[]'::jsonb) from courses c),

    'dx', (select coalesce(jsonb_agg(jsonb_build_object(
        'code', d.code, 'name', d.name, 'remedy', d.remedy,
        'family', d.family, 'student_note', d.student_note,
        /* عددُ المواضع التي يُستعمل فيها الكود — كودٌ بصفرٍ مرشَّحٌ للمراجعة */
        'uses', (select count(*) from question_keys k, jsonb_each_text(k.dx_map) e
                  where e.value = d.code)
      ) order by d.family, d.code), '[]'::jsonb) from dx_codes d),

    /* القيمُ المرصودة — اقتراحٌ للشاشة لا قانون (الحكم ②) */
    'families', jsonb_build_object(
      'subject', (select coalesce(jsonb_agg(distinct family), '[]'::jsonb)
                    from subjects where family is not null),
      'dx',      (select coalesce(jsonb_agg(distinct family), '[]'::jsonb)
                    from dx_codes where family is not null))
  ) into v;

  return v;
end $function$;


-- ═══════════════════════════════════════════════════════════════════════
-- ③ منشأة — الكتابة. ستٌّ على نسقٍ واحد:
--    `p_id` فارغٌ ⇒ إنشاء · وإلا تعديل · والردُّ `{ok, id, name}` دائماً.
-- ═══════════════════════════════════════════════════════════════════════

create or replace function public.save_scale(
  p_id bigint, p_code text, p_name text, p_kind text,
  p_country text default null, p_track text default null,
  p_sort integer default 0, p_note text default null)
returns jsonb language plpgsql security definer set search_path to 'public' as $function$
declare v_id bigint; v_before jsonb;
begin
  if not is_admin() then return jsonb_build_object('ok', false, 'error', 'صلاحية المدير مطلوبة'); end if;
  if coalesce(btrim(p_code),'') = '' or coalesce(btrim(p_name),'') = '' then
    return jsonb_build_object('ok', false, 'error', 'الكود والاسم لازمان');
  end if;
  if p_kind not in ('academic','proficiency') then
    return jsonb_build_object('ok', false, 'error', 'النوع: academic أو proficiency');
  end if;

  select to_jsonb(s) into v_before from scales s where s.id = p_id;

  if p_id is null then
    insert into scales (code, name, kind, country, track, sort_order)
    values (btrim(p_code), btrim(p_name), p_kind, p_country, p_track, coalesce(p_sort,0))
    returning id into v_id;
  else
    update scales set code = btrim(p_code), name = btrim(p_name), kind = p_kind,
           country = p_country, track = p_track, sort_order = coalesce(p_sort,0)
     where id = p_id returning id into v_id;
    if v_id is null then return jsonb_build_object('ok', false, 'error', 'لا مقياس بهذا المعرّف'); end if;
  end if;

  perform admin_log('content', null, v_before,
    jsonb_build_object('table','scales') || to_jsonb((select s from scales s where s.id = v_id)), p_note);
  return jsonb_build_object('ok', true, 'id', v_id, 'name', btrim(p_name));
exception when unique_violation then
  return jsonb_build_object('ok', false, 'error', 'الكود مستعمل في مقياس آخر: ' || btrim(p_code));
end $function$;


create or replace function public.save_level(
  p_id bigint, p_scale bigint, p_code text, p_name text, p_rank integer,
  p_min integer default null, p_max integer default null, p_note text default null)
returns jsonb language plpgsql security definer set search_path to 'public' as $function$
declare v_id bigint; v_before jsonb;
begin
  if not is_admin() then return jsonb_build_object('ok', false, 'error', 'صلاحية المدير مطلوبة'); end if;
  if coalesce(btrim(p_code),'') = '' or coalesce(btrim(p_name),'') = '' then
    return jsonb_build_object('ok', false, 'error', 'الكود والاسم لازمان');
  end if;
  if not exists (select 1 from scales where id = p_scale) then
    return jsonb_build_object('ok', false, 'error', 'المقياس غير موجود');
  end if;

  select to_jsonb(l) into v_before from levels l where l.id = p_id;

  if p_id is null then
    insert into levels (scale_id, code, name, rank, min_score, max_score)
    values (p_scale, btrim(p_code), btrim(p_name), p_rank, p_min, p_max)
    returning id into v_id;
  else
    update levels set scale_id = p_scale, code = btrim(p_code), name = btrim(p_name),
           rank = p_rank, min_score = p_min, max_score = p_max
     where id = p_id returning id into v_id;
    if v_id is null then return jsonb_build_object('ok', false, 'error', 'لا مستوى بهذا المعرّف'); end if;
  end if;

  perform admin_log('content', null, v_before,
    jsonb_build_object('table','levels') || to_jsonb((select l from levels l where l.id = v_id)), p_note);
  return jsonb_build_object('ok', true, 'id', v_id, 'name', btrim(p_name));
exception when unique_violation then
  return jsonb_build_object('ok', false, 'error',
    'الكود أو الرتبة مستعملان في هذا المقياس — ولكلٍّ منهما تفرُّدُه');
end $function$;


create or replace function public.save_path(
  p_id bigint, p_scale bigint, p_code text, p_name text,
  p_from_rank integer default null, p_sort integer default 0,
  p_active boolean default true, p_note text default null)
returns jsonb language plpgsql security definer set search_path to 'public' as $function$
declare v_id bigint; v_before jsonb;
begin
  if not is_admin() then return jsonb_build_object('ok', false, 'error', 'صلاحية المدير مطلوبة'); end if;
  if coalesce(btrim(p_code),'') = '' or coalesce(btrim(p_name),'') = '' then
    return jsonb_build_object('ok', false, 'error', 'الكود والاسم لازمان');
  end if;
  if not exists (select 1 from scales where id = p_scale) then
    return jsonb_build_object('ok', false, 'error', 'المقياس غير موجود');
  end if;

  select to_jsonb(p) into v_before from paths p where p.id = p_id;

  if p_id is null then
    insert into paths (scale_id, code, name, from_rank, sort_order, active)
    values (p_scale, btrim(p_code), btrim(p_name), p_from_rank, coalesce(p_sort,0), coalesce(p_active,true))
    returning id into v_id;
  else
    update paths set scale_id = p_scale, code = btrim(p_code), name = btrim(p_name),
           from_rank = p_from_rank, sort_order = coalesce(p_sort,0), active = coalesce(p_active,true)
     where id = p_id returning id into v_id;
    if v_id is null then return jsonb_build_object('ok', false, 'error', 'لا مسار بهذا المعرّف'); end if;
  end if;

  perform admin_log('content', null, v_before,
    jsonb_build_object('table','paths') || to_jsonb((select p from paths p where p.id = v_id)), p_note);
  return jsonb_build_object('ok', true, 'id', v_id, 'name', btrim(p_name));
exception when unique_violation then
  return jsonb_build_object('ok', false, 'error', 'الكود مستعمل في مسارٍ آخر داخل المقياس');
end $function$;


create or replace function public.save_subject(
  p_id bigint, p_code text, p_name text, p_scale bigint,
  p_family text default null, p_placement text default 'profile',
  p_progression text default 'chain', p_active boolean default true,
  p_icon text default null, p_tool text default null,
  p_description text default null, p_sort integer default 0, p_note text default null)
returns jsonb language plpgsql security definer set search_path to 'public' as $function$
declare v_id bigint; v_before jsonb;
begin
  if not is_admin() then return jsonb_build_object('ok', false, 'error', 'صلاحية المدير مطلوبة'); end if;
  if coalesce(btrim(p_code),'') = '' or coalesce(btrim(p_name),'') = '' then
    return jsonb_build_object('ok', false, 'error', 'الكود والاسم لازمان');
  end if;
  if p_placement not in ('profile','test','open') then
    return jsonb_build_object('ok', false, 'error', 'التسكين: profile أو test أو open');
  end if;
  if p_progression not in ('chain','level','free') then
    return jsonb_build_object('ok', false, 'error', 'التدرّج: chain أو level أو free');
  end if;
  if p_scale is not null and not exists (select 1 from scales where id = p_scale) then
    return jsonb_build_object('ok', false, 'error', 'المقياس غير موجود');
  end if;

  select to_jsonb(s) into v_before from subjects s where s.id = p_id;

  if p_id is null then
    insert into subjects (code, name, scale_id, family, placement, progression,
                          active, icon, tool, description, sort_order)
    values (btrim(p_code), btrim(p_name), p_scale, nullif(btrim(coalesce(p_family,'')),''),
            p_placement, p_progression, coalesce(p_active,true), p_icon, p_tool,
            p_description, coalesce(p_sort,0))
    returning id into v_id;
  else
    update subjects set code = btrim(p_code), name = btrim(p_name), scale_id = p_scale,
           family = nullif(btrim(coalesce(p_family,'')),''), placement = p_placement,
           progression = p_progression, active = coalesce(p_active,true), icon = p_icon,
           tool = p_tool, description = p_description, sort_order = coalesce(p_sort,0)
     where id = p_id returning id into v_id;
    if v_id is null then return jsonb_build_object('ok', false, 'error', 'لا مادّة بهذا المعرّف'); end if;
  end if;

  perform admin_log('content', null, v_before,
    jsonb_build_object('table','subjects') || to_jsonb((select s from subjects s where s.id = v_id)), p_note);
  return jsonb_build_object('ok', true, 'id', v_id, 'name', btrim(p_name));
exception when unique_violation then
  return jsonb_build_object('ok', false, 'error', 'الكود مستعمل في مادّة أخرى: ' || btrim(p_code));
end $function$;


create or replace function public.save_course(
  p_id bigint, p_subject bigint, p_level bigint, p_title text,
  p_path bigint default null, p_elective_group text default null,
  p_position integer default 0, p_active boolean default true, p_note text default null)
returns jsonb language plpgsql security definer set search_path to 'public' as $function$
declare v_id bigint; v_before jsonb;
begin
  if not is_admin() then return jsonb_build_object('ok', false, 'error', 'صلاحية المدير مطلوبة'); end if;
  if coalesce(btrim(p_title),'') = '' then
    return jsonb_build_object('ok', false, 'error', 'العنوان لازم');
  end if;
  if not exists (select 1 from subjects where id = p_subject) then
    return jsonb_build_object('ok', false, 'error', 'المادّة غير موجودة');
  end if;
  if p_level is not null and not exists (select 1 from levels where id = p_level) then
    return jsonb_build_object('ok', false, 'error', 'المستوى غير موجود');
  end if;
  if p_path is not null and not exists (select 1 from paths where id = p_path) then
    return jsonb_build_object('ok', false, 'error', 'المسار غير موجود');
  end if;

  select to_jsonb(c) into v_before from courses c where c.id = p_id;

  if p_id is null then
    insert into courses (subject_id, level_id, path_id, title, elective_group, position, active)
    values (p_subject, p_level, p_path, btrim(p_title),
            nullif(btrim(coalesce(p_elective_group,'')),''), coalesce(p_position,0), coalesce(p_active,true))
    returning id into v_id;
  else
    update courses set subject_id = p_subject, level_id = p_level, path_id = p_path,
           title = btrim(p_title), elective_group = nullif(btrim(coalesce(p_elective_group,'')),''),
           position = coalesce(p_position,0), active = coalesce(p_active,true)
     where id = p_id returning id into v_id;
    if v_id is null then return jsonb_build_object('ok', false, 'error', 'لا مقرَّر بهذا المعرّف'); end if;
  end if;

  perform admin_log('content', null, v_before,
    jsonb_build_object('table','courses') || to_jsonb((select c from courses c where c.id = v_id)), p_note);
  return jsonb_build_object('ok', true, 'id', v_id, 'name', btrim(p_title));
end $function$;


/* 🔴 وكودُ التشخيص مفتاحُه نصُّه، فلا `p_id` له. وتعديلُ الكود نفسِه
   ممنوع: المفتاحُ الأجنبيُّ في `answers.dx_code` يحمله، **وتغييرُه
   يقطع تشخيصَ محاولاتٍ وقعت**. ⇒ الكودُ يُنشأ ويُعدَّل اسمُه وعلاجُه،
   ولا يُعاد تسميتُه. ومن أراد اسماً آخرَ أنشأ كوداً جديداً. */
create or replace function public.save_dx_code(
  p_code text, p_name text, p_remedy text default null,
  p_family text default null, p_student_note text default null, p_note text default null)
returns jsonb language plpgsql security definer set search_path to 'public' as $function$
declare v_before jsonb; v_code text := upper(btrim(coalesce(p_code,'')));
begin
  if not is_admin() then return jsonb_build_object('ok', false, 'error', 'صلاحية المدير مطلوبة'); end if;
  if v_code = '' or coalesce(btrim(p_name),'') = '' then
    return jsonb_build_object('ok', false, 'error', 'الكود والاسم لازمان');
  end if;
  if v_code !~ '^[A-Z][A-Z0-9_]{0,15}$' then
    return jsonb_build_object('ok', false, 'error',
      'الكود حروف إنجليزية كبيرة وأرقام، يبدأ بحرف، حتى ١٦ خانة');
  end if;

  select to_jsonb(d) into v_before from dx_codes d where d.code = v_code;

  insert into dx_codes (code, name, remedy, family, student_note)
  values (v_code, btrim(p_name), p_remedy, nullif(btrim(coalesce(p_family,'')),''), p_student_note)
  on conflict (code) do update
    set name = excluded.name, remedy = excluded.remedy,
        family = excluded.family, student_note = excluded.student_note;

  perform admin_log('content', null, v_before,
    jsonb_build_object('table','dx_codes') || to_jsonb((select d from dx_codes d where d.code = v_code)), p_note);
  return jsonb_build_object('ok', true, 'id', v_code, 'name', btrim(p_name),
    'created', v_before is null);
end $function$;


-- ═══════════════════════════════════════════════════════════════════════
-- ④ المنح — صريحٌ لكلّ دالّة. و`fn_auto_lock_trg` (154) سحب `anon`
--    لحظةَ الإنشاء، فلا يبقى إلا المنحُ المقصود.
-- ═══════════════════════════════════════════════════════════════════════

revoke all on function public.content_tree()                                            from public, anon;
revoke all on function public.save_scale(bigint,text,text,text,text,text,integer,text)   from public, anon;
revoke all on function public.save_level(bigint,bigint,text,text,integer,integer,integer,text) from public, anon;
revoke all on function public.save_path(bigint,bigint,text,text,integer,integer,boolean,text)  from public, anon;
revoke all on function public.save_subject(bigint,text,text,bigint,text,text,text,boolean,text,text,text,integer,text) from public, anon;
revoke all on function public.save_course(bigint,bigint,bigint,text,bigint,text,integer,boolean,text) from public, anon;
revoke all on function public.save_dx_code(text,text,text,text,text,text)                from public, anon;

grant execute on function public.content_tree()                                          to authenticated;
grant execute on function public.save_scale(bigint,text,text,text,text,text,integer,text) to authenticated;
grant execute on function public.save_level(bigint,bigint,text,text,integer,integer,integer,text) to authenticated;
grant execute on function public.save_path(bigint,bigint,text,text,integer,integer,boolean,text)  to authenticated;
grant execute on function public.save_subject(bigint,text,text,bigint,text,text,text,boolean,text,text,text,integer,text) to authenticated;
grant execute on function public.save_course(bigint,bigint,bigint,text,bigint,text,integer,boolean,text) to authenticated;
grant execute on function public.save_dx_code(text,text,text,text,text,text)              to authenticated;


-- ═══════════════════════════════════════════════════════════════════════
-- ⑤ الفحص — سطرٌ لكلّ حالة، ويُشغَّل بعد التطبيق
-- ═══════════════════════════════════════════════════════════════════════
/*
select 'السبعُ منشأةٌ وممنوحةٌ للمسجَّل ومحجوبةٌ عن الزائر' as الفحص,
       (select count(*)::text || ' / 7' from pg_proc p join pg_namespace n on n.oid=p.pronamespace
         where n.nspname='public' and p.proname in ('content_tree','save_scale','save_level',
               'save_path','save_subject','save_course','save_dx_code')
           and has_function_privilege('authenticated', p.oid,'execute')
           and not has_function_privilege('anon', p.oid,'execute')) as الحكم
union all
select 'قيدُ السجلّ يقبل content',
       case when pg_get_constraintdef((select oid from pg_constraint where conname='admin_audit_action_ck'))
              ~ 'content' then '✅' else '🔴' end
union all
select 'content_tree تُجيب',
       (select 'مقاييس ' || jsonb_array_length(t->'scales') || ' · مواد ' ||
               jsonb_array_length(t->'subjects') || ' · مقرّرات ' ||
               jsonb_array_length(t->'courses') || ' · أكواد ' || jsonb_array_length(t->'dx')
          from (select content_tree() t from (select set_config('request.jwt.claims',
                 json_build_object('sub',(select id::text from profiles where role='admin' limit 1))::text,
                 true)) _) z);

-- وتصريفُ الستِّ الكاتبة بلا أن تمسّ صفّاً — المعاملاتُ مرفوضةٌ قبل أيّ كتابة
select save_scale(null,'','',  'academic')            as تصريف_مقياس,
       save_level(null, -1, 'X','س', 1)               as تصريف_مستوى,
       save_path (null, -1, 'X','س')                  as تصريف_مسار,
       save_subject(null,'','', null)                 as تصريف_مادّة,
       save_course(null, -1, null, '')                as تصريف_مقرَّر,
       save_dx_code('', '')                           as تصريف_كود
  from (select set_config('request.jwt.claims',
         json_build_object('sub',(select id::text from profiles where role='admin' limit 1))::text, true)) _;
*/


-- ═══════════════════════════════════════════════════════════════════════
-- ⑥ السجلّ
-- ═══════════════════════════════════════════════════════════════════════

insert into public.sql_log (n, title, applied_at)
values ('155', 'إدارةُ المحتوى — فمٌ محروسٌ للهيكل فوق الدرس، بلا حذف', now())
on conflict (n) do update set applied_at = now();
