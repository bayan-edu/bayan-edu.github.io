-- ══════════════════════════════════════════════════════════════════════
--  ١٣٨ · فهرسُ الأهداف يُستورد — عقدُ المرحلة ② في دالّةٍ واحدة
-- ══════════════════════════════════════════════════════════════════════
--
--  العقدُ نفسُه عقدُ `import_lesson_map` حرفاً:
--    ① جافّةٌ أولاً: `p_dry_run = true` لا تكتب حرفاً، وتُرجع الخطّة كاملة.
--    ② الدفعةُ تُرفض جملةً: خطأٌ واحدٌ ⇒ لا شيءَ يُكتب، وكلُّ الأخطاء تُعرض.
--    ③ لا حذف: درسٌ خارج الملفّ لا يُمَسّ، وبندٌ قائمٌ لا يُحذف.
--    ④ الكتابةُ بالكُتّاب القائمين وحدهم: `save_objective` · `set_lesson_objectives`.
--    ⑤ كلُّ نداءٍ — جافّاً كان أو اعتماداً — يُسجَّل في `import_log`.
--
--  ثمانيةُ قراراتٍ في هذا الملفّ تُقرأ ولا تُستنتج:
--
--  ① **الهدفُ يسكن المادةَ لا المقرَّر.** ومفتاحُه `(سلّم، مادة، كود)`.
--     فأهدافُ «الرياضيات · الأول الثانوي» تهبط في مادةٍ تشترك فيها أربعةُ
--     مقرّرات — وذاك مقصودٌ: الهدفُ يعبر الصفوف (قانون ٤ من العقد).
--     ⇒ ومنه أخطرُ حارسٍ هنا: **كودٌ قائمٌ باسمٍ مخالف يُرفض**، ولا يُمرَّر
--     إلا بـ`p_allow_rename` صريحاً. وبغيره يصير استيرادُ الصفّ الثاني
--     إعادةَ تسميةٍ صامتةً لأهداف الصفّ الأول.
--
--  ② **العلاجُ القائم لا يُمسح.** `save_objective` تكتب `remedial_item_id`
--     بما يُمرَّر لها — فتمريرُ `null` يمحو رابطَ علاجٍ وصله إنسانٌ في المحرّر.
--     ⇒ تُقرأ القيمةُ القائمة وتُعاد كما هي في كلّ تحديث.
--
--  ③ **قائمةٌ فارغةٌ تُرفض.** `set_lesson_objectives` استبدالٌ كامل، فـ`[]`
--     تحذف توزيعَ الدرس. والدرسُ الذي لا أهدافَ له يُترك خارج الملفّ.
--
--  ④ **الاستبدالُ يُستأذن.** درسٌ له أهدافٌ قائمةٌ تخالف الواردة ⇒ يُرفض
--     حتى يُمرَّر `p_allow_replace`. وإعادةُ نفس الملفّ ليست استبدالاً.
--
--  ⑤ **`evidence` و`remedy` يُطلبان ولا يُخزَّنان.** لا عمودَ لهما اليوم،
--     ويُحفظان كاملين في `import_log.payload`. وطلبُهما ليس شكليّاً: البندُ
--     الذي لا يُوصَف له علاجٌ بندٌ فضفاض، والفضفاضُ يُنتج «راجع الدرس».
--     ⇒ والعمودان مقترحٌ للمناقشة، لا قرارُ هذا الملفّ.
--
--  ⑥ **`headings[].strand` كذلك: يُقرأ ويُحفظ في السجلّ ولا يُخزَّن.**
--     `objectives` بلا عمود فرع، وفرعُ السؤال يُشتقّ اليوم من المكوّن ثم
--     الدرس (`v_question_strand`) — فلا قارئَ لفرع العنوان.
--
--  ⑦ **طبقتان لا أكثر** — كما في `save_objective`: عنوانٌ وبنودٌ تحته.
--     والحرّاسُ هنا يفحصون ما في الملفّ وما في القاعدة معاً، في الجافّة،
--     قبل أن يُنادى كاتبٌ واحد.
--
--  ⑧ **الاستيرادُ لفريق الإشراف (`can_curate`)، والكتابةُ تلزم حقَّ التأليف
--     أيضاً** (`can_author` — تشترطه `set_lesson_objectives`). فيُفحص الحقّان
--     في الجافّة: نقصُ التأليف تحذيرٌ هناك، وخطأٌ عند الاعتماد.
--
--  التشغيل:
--    select import_objectives(4, $payload$ … $payload$::jsonb, true);   -- جافّة
--    select import_objectives(4, $payload$ … $payload$::jsonb, false);  -- اعتماد
-- ══════════════════════════════════════════════════════════════════════

create or replace function public.import_objectives(
  p_course        bigint,
  p_payload       jsonb,
  p_dry_run       boolean default true,
  p_allow_rename  boolean default false,
  p_allow_replace boolean default false
) returns jsonb
language plpgsql
security definer
set search_path to 'public'
as $function$
declare
  v_subject bigint; v_scale bigint; v_author boolean;
  v_err text[] := '{}'; v_warn text[] := '{}'; v_tmp text[];
  v_hnew jsonb := '[]'::jsonb; v_hupd jsonb := '[]'::jsonb;
  v_onew jsonb := '[]'::jsonb; v_oupd jsonb := '[]'::jsonb;
  v_plan jsonb := '[]'::jsonb; v_out jsonb := '[]'::jsonb;
  v_out_json jsonb; v_res jsonb; r record;
  v_id bigint; v_pid bigint; v_rem bigint; v_n int; v_txt text;
begin
  if auth.uid() is null then
    return jsonb_build_object('ok', false, 'error', 'يلزم تسجيل الدخول');
  end if;

  select c.subject_id into v_subject from courses c where c.id = p_course;
  if not found then
    return jsonb_build_object('ok', false, 'error', 'المقرّر غير موجود');
  end if;

  if not can_curate(v_subject) then
    return jsonb_build_object('ok', false, 'error', 'استيراد فهرس الأهداف لفريق الإشراف');
  end if;

  -- ② السلّم: الهدفُ لا يُكتب بلا سلّم — `save_objective` ترفضه
  select s.scale_id into v_scale from subjects s where s.id = v_subject;
  if v_scale is null then
    return jsonb_build_object('ok', false,
      'error', 'هذه المادة لا سلّمَ لها — ولا يُكتب هدفٌ بلا سلّم');
  end if;

  v_author := can_author(v_subject);
  if not v_author and not p_dry_run then
    return jsonb_build_object('ok', false,
      'error', 'ربطُ الدرس بأهدافه يلزم حقَّ التأليف في المادة');
  end if;

  perform pg_advisory_xact_lock(hashtext('import_objectives'), v_subject::int);

  if jsonb_typeof(p_payload->'objectives') <> 'array'
     or jsonb_array_length(p_payload->'objectives') = 0 then
    return jsonb_build_object('ok', false, 'error', 'الدفعة بلا بنود');
  end if;
  if jsonb_typeof(p_payload->'lessons') <> 'array'
     or jsonb_array_length(p_payload->'lessons') = 0 then
    return jsonb_build_object('ok', false, 'error', 'الدفعة بلا توزيع — وبندٌ لا يستهدفه درسٌ لا وجودَ له');
  end if;
  if p_payload ? 'headings' and jsonb_typeof(p_payload->'headings') <> 'array' then
    return jsonb_build_object('ok', false, 'error', 'العناوين تُرسل قائمةً أو لا تُرسل');
  end if;

  -- ═══ ① العناوينُ العريضة ═══
  drop table if exists _hed;
  create temp table _hed on commit drop as
  select e.ord_in                                  as seq,
         nullif(trim(e.value->>'code'), '')         as code,
         nullif(trim(e.value->>'name'), '')         as name,
         nullif(trim(e.value->>'strand'), '')       as strand_code
    from jsonb_array_elements(coalesce(p_payload->'headings', '[]'::jsonb))
         with ordinality as e(value, ord_in);

  -- ═══ ② البنود ═══
  drop table if exists _obj;
  create temp table _obj on commit drop as
  select e.ord_in                                  as seq,
         nullif(trim(e.value->>'code'), '')         as code,
         nullif(trim(e.value->>'parent'), '')       as parent_code,
         nullif(trim(e.value->>'name'), '')         as name,
         nullif(trim(e.value->>'evidence'), '')     as evidence,
         nullif(trim(e.value->>'remedy'), '')       as remedy
    from jsonb_array_elements(p_payload->'objectives')
         with ordinality as e(value, ord_in);

  -- ═══ ③ التوزيع: درسٌ وما يستهدفه ═══
  drop table if exists _dst;
  create temp table _dst on commit drop as
  select e.ord_in                                  as seq,
         nullif(trim(e.value->>'key'), '')          as k,
         nullif(trim(e.value->>'existing_id'), '')  as ex_raw,
         nullif(trim(e.value->>'title'), '')        as title,
         case when jsonb_typeof(e.value->'objectives') = 'array'
              then e.value->'objectives' end       as codes
    from jsonb_array_elements(p_payload->'lessons')
         with ordinality as e(value, ord_in);

  alter table _dst add column ex  bigint;
  alter table _dst add column lid bigint;
  update _dst set ex = case when ex_raw ~ '^[0-9]{1,18}$' then ex_raw::bigint end;
  update _dst set lid = coalesce(
    (select l.id from lessons l
      where l.id = _dst.ex and l.course_id = p_course and l.archived_at is null),
    (select l.id from lessons l
      where l.course_id = p_course and l.author_key = _dst.k and l.archived_at is null));

  drop table if exists _lnk;
  create temp table _lnk on commit drop as
  select d.seq, d.lid, d.k,
         nullif(trim(c.value #>> '{}'), '') as code,
         c.ord::int                         as ord
    from _dst d, jsonb_array_elements(coalesce(d.codes, '[]'::jsonb))
         with ordinality as c(value, ord);

  -- ══════════════════ حرّاسُ العناوين ══════════════════

  select array_agg('عنوان ' || seq || ': الكود مفقود أو مخالف للصيغة')
    into v_tmp from _hed where code is null or code !~ '^[A-Za-z0-9_.-]{2,40}$';
  v_err := v_err || coalesce(v_tmp, '{}');

  select array_agg('عنوان ' || seq || ': الاسم مفقود') into v_tmp from _hed where name is null;
  v_err := v_err || coalesce(v_tmp, '{}');

  -- العناوينُ والبنودُ في جدولٍ واحد، فكودُهما فضاءٌ واحد
  select array_agg('كودٌ مكرَّرٌ في الملفّ: ' || code)
    into v_tmp from (
      select code from (select code from _hed where code is not null
                        union all
                        select code from _obj where code is not null) a
       group by code having count(*) > 1) d;
  v_err := v_err || coalesce(v_tmp, '{}');

  -- عنوانٌ موجودٌ في المادة بنداً تحت غيره — لا يصير عنواناً فيُقطع عن أبيه
  select array_agg('عنوان ' || h.seq || ': «' || h.code || '» قائمٌ بنداً تحت «'
                   || p.code || '» — لا يصير عنواناً')
    into v_tmp from _hed h
    join objectives x on x.subject_id = v_subject and x.scale_id = v_scale and x.code = h.code
    join objectives p on p.id = x.parent_id;
  v_err := v_err || coalesce(v_tmp, '{}');

  -- ══════════════════ حرّاسُ البنود ══════════════════

  select array_agg('بند ' || seq || ': الكود مفقود أو مخالف للصيغة')
    into v_tmp from _obj where code is null or code !~ '^[A-Za-z0-9_.-]{2,40}$';
  v_err := v_err || coalesce(v_tmp, '{}');

  select array_agg('بند ' || seq || ': الاسم مفقود') into v_tmp from _obj where name is null;
  v_err := v_err || coalesce(v_tmp, '{}');

  select array_agg('بند ' || seq || ': بلا عنوانٍ عريض — ولا بندَ بلا عنوان')
    into v_tmp from _obj where parent_code is null;
  v_err := v_err || coalesce(v_tmp, '{}');

  -- عنوانٌ غائب: لا في الملفّ ولا في المادة
  -- وما كان بنداً في الملفّ يُترك لحارس الطبقة الثالثة — خطأٌ واحدٌ للعلّة الواحدة
  select array_agg('بند ' || o.seq || ': العنوان «' || o.parent_code || '» غير موجود')
    into v_tmp from _obj o
   where o.parent_code is not null
     and not exists (select 1 from _hed h where h.code = o.parent_code)
     and not exists (select 1 from _obj  p where p.code = o.parent_code)
     and not exists (select 1 from objectives x
                      where x.subject_id = v_subject and x.scale_id = v_scale
                        and x.code = o.parent_code);
  v_err := v_err || coalesce(v_tmp, '{}');

  -- طبقةٌ ثالثة: العنوانُ المذكور بندٌ لغيره — في الملفّ أو في القاعدة
  select array_agg('بند ' || o.seq || ': طبقتان لا أكثر — «' || o.parent_code || '» بندٌ لا عنوان')
    into v_tmp from _obj o
   where o.parent_code is not null
     and (exists (select 1 from _obj p where p.code = o.parent_code)
       or exists (select 1 from objectives x
                   where x.subject_id = v_subject and x.scale_id = v_scale
                     and x.code = o.parent_code and x.parent_id is not null));
  v_err := v_err || coalesce(v_tmp, '{}');

  -- بندٌ قائمٌ تحته بنود — `save_objective` ترفض تحويلَه، فيُقال هنا
  select array_agg('بند ' || o.seq || ': «' || o.code || '» عنوانٌ تحته بنودٌ في المادة — لا يصير بنداً')
    into v_tmp from _obj o
    join objectives x on x.subject_id = v_subject and x.scale_id = v_scale and x.code = o.code
   where exists (select 1 from objectives kk where kk.parent_id = x.id);
  v_err := v_err || coalesce(v_tmp, '{}');

  -- ① أخطرُ حارس: كودٌ قائمٌ باسمٍ مخالف — صفٌّ آخرُ في المادة كتبه قبلك
  select array_agg('الكود «' || a.code || '» قائمٌ في المادة باسم «' || a.old || '» — '
                   || case when p_allow_rename then 'سيُغيَّر' else 'والواردُ «' || a.nw
                           || '». ولا يُغيَّر إلا بـp_allow_rename' end)
    into v_tmp from (
      select t.code, x.name as old, t.name as nw
        from (select code, name from _hed union all select code, name from _obj) t
        join objectives x on x.subject_id = v_subject and x.scale_id = v_scale and x.code = t.code
       where norm_ar(lower(x.name)) is distinct from norm_ar(lower(t.name))) a;
  if p_allow_rename then
    v_warn := v_warn || coalesce(v_tmp, '{}');
  else
    v_err := v_err || coalesce(v_tmp, '{}');
  end if;

  -- ⑤ الدليلُ والعلاجُ يُطلبان — والبندُ الذي لا علاجَ يُوصَف له فضفاض
  select array_agg('بند ' || seq || ' («' || code || '»): ' ||
                   case when evidence is null and remedy is null then 'بلا دليلِ قياسٍ ولا علاج'
                        when evidence is null then 'بلا دليلِ قياس (evidence)'
                        else 'بلا علاج (remedy)' end)
    into v_tmp from _obj where evidence is null or remedy is null;
  v_err := v_err || coalesce(v_tmp, '{}');

  -- ══════════════════ حرّاسُ التوزيع ══════════════════

  select array_agg('سطر ' || seq || ': الدرس بلا مفتاحٍ ولا رقم')
    into v_tmp from _dst where k is null and ex is null;
  v_err := v_err || coalesce(v_tmp, '{}');

  select array_agg('سطر ' || seq || ': الدرس «' || coalesce(k, ex::text) || '» ليس في هذا المقرّر')
    into v_tmp from _dst where lid is null and (k is not null or ex is not null);
  v_err := v_err || coalesce(v_tmp, '{}');

  select array_agg('درسٌ مكرَّرٌ في الدفعة: ' || lid)
    into v_tmp from (select lid from _dst where lid is not null group by lid having count(*) > 1) d;
  v_err := v_err || coalesce(v_tmp, '{}');

  -- ③ فارغةٌ تحذف — فتُرفض
  select array_agg('سطر ' || seq || ': قائمةُ الأهداف مفقودةٌ أو فارغة — '
                   || 'الدرسُ الذي لا أهدافَ له يُترك خارج الملفّ ولا يُرسل فارغاً')
    into v_tmp from _dst where codes is null or jsonb_array_length(codes) = 0;
  v_err := v_err || coalesce(v_tmp, '{}');

  select array_agg('سطر ' || seq || ': كودُ هدفٍ فارغٌ أو مخالفٌ للصيغة في القائمة')
    into v_tmp from _lnk where code is null or code !~ '^[A-Za-z0-9_.-]{2,40}$';
  v_err := v_err || coalesce(v_tmp, '{}');

  select array_agg('سطر ' || seq || ': الهدف «' || code || '» مكرَّرٌ في الدرس نفسِه')
    into v_tmp from (select seq, code from _lnk where code is not null
                      group by seq, code having count(*) > 1) d;
  v_err := v_err || coalesce(v_tmp, '{}');

  -- كودٌ لا يُعرف: لا في الملفّ ولا في المادة
  -- والعنوانُ المكتوبُ في الملفّ معروفٌ، وعلّتُه أنّه عنوان — فيُترك لحارسه
  select array_agg('سطر ' || seq || ': الهدف «' || code || '» ليس في الملفّ ولا في المادة')
    into v_tmp from _lnk
   where code is not null
     and not exists (select 1 from _obj o where o.code = _lnk.code)
     and not exists (select 1 from _hed h where h.code = _lnk.code)
     and not exists (select 1 from objectives x
                      where x.subject_id = v_subject and x.scale_id = v_scale and x.code = _lnk.code);
  v_err := v_err || coalesce(v_tmp, '{}');

  -- عنوانٌ عريضٌ لا يُعلَّق على درس — حارسُ `set_lesson_objectives` يُقال هنا
  select array_agg('سطر ' || seq || ': «' || code || '» عنوانٌ عريضٌ لا يُعلَّق على درس — علّق بنودَه')
    into v_tmp from _lnk
   where code is not null
     and not exists (select 1 from _obj o where o.code = _lnk.code)
     and (exists (select 1 from _hed h where h.code = _lnk.code)
       or exists (select 1 from objectives x
                   where x.subject_id = v_subject and x.scale_id = v_scale
                     and x.code = _lnk.code and x.parent_id is null));
  v_err := v_err || coalesce(v_tmp, '{}');

  -- ④ الاستبدالُ يُستأذن: مجموعةٌ قائمةٌ تخالف الواردة
  with cur as (
    select lo.lesson_id, array_agg(x.code order by x.code) as codes
      from lesson_objectives lo join objectives x on x.id = lo.objective_id
     where lo.lesson_id in (select lid from _dst where lid is not null)
     group by lo.lesson_id),
  nw as (
    select lid, array_agg(distinct code) as codes from _lnk
     where lid is not null and code is not null group by lid)
  select array_agg('الدرس ' || c.lesson_id || ': له أهدافٌ قائمة ('
                   || array_to_string(c.codes, '، ') || ') تخالف الواردة — '
                   || case when p_allow_replace then 'ستُستبدل'
                           else 'ولا تُستبدل إلا بـp_allow_replace' end)
    into v_tmp
    from cur c join nw on nw.lid = c.lesson_id
   where (select array_agg(x order by x) from unnest(c.codes) x)
      is distinct from (select array_agg(x order by x) from unnest(nw.codes) x);
  if p_allow_replace then
    v_warn := v_warn || coalesce(v_tmp, '{}');
  else
    v_err := v_err || coalesce(v_tmp, '{}');
  end if;

  if array_length(v_err, 1) > 0 then
    return jsonb_build_object('ok', false, 'مرفوضة', true, 'أخطاء', to_jsonb(v_err));
  end if;

  -- ══════════════════ تحذيراتٌ تُرى ولا تمنع ══════════════════

  if not v_author then
    v_warn := v_warn || array['لا تملك حقَّ التأليف في هذه المادة — الجافّةُ تمرّ والاعتمادُ لا يمرّ'];
  end if;

  -- ⑥ فرعُ العنوان: يُقرأ ويُحفظ في السجلّ ولا موضعَ له اليوم
  select count(*) into v_n from _hed where strand_code is not null;
  if v_n > 0 then
    v_warn := v_warn || array['فرعُ العنوان (' || v_n || ' عنواناً) لا عمودَ له في القاعدة — '
                              || 'حُفظ في سجلّ الاستيراد ولم يُخزَّن'];
  end if;

  -- ⑤ الدليلُ والعلاجُ محفوظان في السجلّ لا في جدول الأهداف
  v_warn := v_warn || array['دليلُ القياس والعلاجُ الموصوف محفوظان في `import_log` — '
                            || 'ولا عمودَ لهما في `objectives` بعد'];

  -- قانون ٤: الهدفُ يعبر الصفوف، فلا صفَّ في كودٍ ولا اسم
  select array_agg('«' || code || '»: يبدو فيه صفٌّ دراسيّ — والهدفُ يعبر الصفوف')
    into v_tmp from (select code, name from _hed union all select code, name from _obj) t
   where code ~* '(^|[^a-z0-9])g[1-9]([^0-9]|$)' or code ~* 'grade'
      or name ~* 'grade' or name like '%الصف%';
  v_warn := v_warn || coalesce(v_tmp, '{}');

  -- عنوانٌ بلا بندٍ تحته — لا في الملفّ ولا في المادة
  select array_agg('العنوان «' || h.code || '» بلا بندٍ تحته')
    into v_tmp from _hed h
   where not exists (select 1 from _obj o where o.parent_code = h.code)
     and not exists (select 1 from objectives x join objectives p on p.id = x.parent_id
                      where p.subject_id = v_subject and p.scale_id = v_scale and p.code = h.code);
  v_warn := v_warn || coalesce(v_tmp, '{}');

  -- بندٌ لا يستهدفه درس — هدفٌ لا يُقاس لا وجودَ له
  select count(*), string_agg(code, '، ' order by code) into v_n, v_txt
    from (select o.code from _obj o
           where not exists (select 1 from _lnk k where k.code = o.code)
             and not exists (select 1 from lesson_objectives lo join objectives x on x.id = lo.objective_id
                              where x.subject_id = v_subject and x.scale_id = v_scale and x.code = o.code)
           order by o.seq limit 12) d;
  if v_n > 0 then
    v_warn := v_warn || array[v_n || ' بنداً لا يستهدفه درسٌ هنا ولا هناك: ' || v_txt];
  end if;

  -- قانون ٨: اثنا عشر حدٌّ أعلى — كما تحذّر `set_lesson_objectives`
  select array_agg('الدرس ' || lid || ' يستهدف ' || n || ' هدفاً — والذي يستهدف كلَّ شيءٍ لا يستهدف شيئاً')
    into v_tmp from (select lid, count(distinct code) n from _lnk group by lid having count(distinct code) > 12) d;
  v_warn := v_warn || coalesce(v_tmp, '{}');

  -- ══════════════════ الخطّة ══════════════════

  select coalesce(jsonb_agg(jsonb_build_object('code', h.code, 'name', h.name,
                                               'strand', h.strand_code) order by h.seq), '[]'::jsonb)
    into v_hnew from _hed h
   where not exists (select 1 from objectives x
                      where x.subject_id = v_subject and x.scale_id = v_scale and x.code = h.code);

  select coalesce(jsonb_agg(jsonb_build_object('code', h.code, 'name', h.name,
                              'الاسم السابق', x.name) order by h.seq), '[]'::jsonb)
    into v_hupd from _hed h
    join objectives x on x.subject_id = v_subject and x.scale_id = v_scale and x.code = h.code;

  select coalesce(jsonb_agg(jsonb_build_object('code', o.code, 'parent', o.parent_code,
                                               'name', o.name) order by o.seq), '[]'::jsonb)
    into v_onew from _obj o
   where not exists (select 1 from objectives x
                      where x.subject_id = v_subject and x.scale_id = v_scale and x.code = o.code);

  select coalesce(jsonb_agg(jsonb_build_object('code', o.code, 'parent', o.parent_code,
                              'name', o.name, 'الاسم السابق', x.name) order by o.seq), '[]'::jsonb)
    into v_oupd from _obj o
    join objectives x on x.subject_id = v_subject and x.scale_id = v_scale and x.code = o.code;

  select coalesce(jsonb_agg(jsonb_build_object(
           'id', d.lid, 'key', d.k, 'title', coalesce(d.title, l.title),
           'عددها', (select count(distinct k2.code) from _lnk k2 where k2.seq = d.seq),
           'أهداف', (select jsonb_agg(k3.code order by k3.ord) from _lnk k3 where k3.seq = d.seq),
           'قائمةٌ قبله', (select count(*) from lesson_objectives lo where lo.lesson_id = d.lid)
         ) order by l.position, d.lid), '[]'::jsonb)
    into v_plan from _dst d join lessons l on l.id = d.lid;

  select coalesce(jsonb_agg(jsonb_build_object('id', l.id, 'title', l.title,
           'أهدافُه الآن', (select count(*) from lesson_objectives lo where lo.lesson_id = l.id))
         order by l.position), '[]'::jsonb)
    into v_out from lessons l
   where l.course_id = p_course and l.archived_at is null
     and not exists (select 1 from _dst d where d.lid = l.id);

  v_out_json := jsonb_build_object(
    'ok', true, 'تجريبيّة', p_dry_run,
    'المقرّر', p_course, 'المادة', v_subject, 'السلّم', v_scale,
    'عناوينُ ستُنشأ', v_hnew, 'عناوينُ ستُحدَّث', v_hupd,
    'بنودٌ ستُنشأ',  v_onew, 'بنودٌ ستُحدَّث',  v_oupd,
    'توزيعٌ سيُكتب', v_plan, 'خارج الفهرس', v_out,
    'تحذيرات', to_jsonb(v_warn));

  -- ══════════════════ الاعتماد ══════════════════

  if not p_dry_run then

    -- العناوينُ أوّلاً: البندُ لا يُكتب قبل أبيه
    for r in select * from _hed order by seq loop
      select x.id into v_id from objectives x
       where x.subject_id = v_subject and x.scale_id = v_scale and x.code = r.code;
      v_res := save_objective(p_id => v_id, p_subject => v_subject, p_code => r.code,
                              p_name => r.name, p_parent => null,
                              p_remedial => null, p_scale => v_scale);
      if not coalesce((v_res->>'ok')::boolean, false) then
        raise exception 'تعثّر العنوان «%» : %', r.code, coalesce(v_res->>'error', '؟');
      end if;
    end loop;

    -- ثمّ البنود — ② والعلاجُ القائم يُعاد كما هو ولا يُمسح
    for r in select * from _obj order by seq loop
      select x.id, x.remedial_item_id into v_id, v_rem from objectives x
       where x.subject_id = v_subject and x.scale_id = v_scale and x.code = r.code;
      select x.id into v_pid from objectives x
       where x.subject_id = v_subject and x.scale_id = v_scale and x.code = r.parent_code;
      v_res := save_objective(p_id => v_id, p_subject => v_subject, p_code => r.code,
                              p_name => r.name, p_parent => v_pid,
                              p_remedial => v_rem, p_scale => v_scale);
      if not coalesce((v_res->>'ok')::boolean, false) then
        raise exception 'تعثّر البند «%» : %', r.code, coalesce(v_res->>'error', '؟');
      end if;
    end loop;

    -- ثمّ التوزيع — بترتيب ما كتبه المعلّم، والمكرَّرُ يُوحَّد بأوّل موضعِه
    for r in with g as (
               select k.lid, x.id as oid, min(k.ord) as ord
                 from _lnk k
                 join objectives x on x.subject_id = v_subject and x.scale_id = v_scale
                                  and x.code = k.code
                where k.lid is not null
                group by k.lid, x.id)
             select lid, array_agg(oid order by ord) as ids from g group by lid loop
      v_res := set_lesson_objectives(p_lesson => r.lid, p_objectives => r.ids);
      if not coalesce((v_res->>'ok')::boolean, false) then
        raise exception 'تعثّر توزيعُ الدرس % : %', r.lid, coalesce(v_res->>'error', '؟');
      end if;
    end loop;
  end if;

  insert into import_log (kind, course_id, subject_id, payload, result, dry_run, by_user)
  values ('objectives', p_course, v_subject, p_payload, v_out_json, p_dry_run, auth.uid());

  return v_out_json;
end
$function$;

revoke all on function public.import_objectives(bigint, jsonb, boolean, boolean, boolean) from public, anon;
grant execute on function public.import_objectives(bigint, jsonb, boolean, boolean, boolean) to authenticated;

comment on function public.import_objectives(bigint, jsonb, boolean, boolean, boolean) is
  'استيرادُ فهرس الأهداف (المرحلة ②): عناوينُ وبنودٌ وتوزيعٌ على الدروس. جافّةٌ أوّلاً، '
  'والدفعةُ تُرفض جملةً، ولا حذف. تكتب بـsave_objective وset_lesson_objectives حصراً. '
  'الهدفُ يسكن المادةَ لا المقرَّر، فكودٌ قائمٌ باسمٍ مخالف يُرفض إلا بـp_allow_rename. '
  'evidence وremedy وstrand تُحفظ في import_log ولا عمودَ لها بعد.';

insert into sql_log (n, title, applied_at)
values ('138', 'فهرسُ الأهداف يُستورد — والكودُ القائمُ لا يُعاد تسميتُه صامتاً', now())
on conflict (n) do nothing;
