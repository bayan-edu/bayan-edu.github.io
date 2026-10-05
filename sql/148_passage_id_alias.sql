-- ══════════════════════════════════════════════════════════════════════
--  ١٤٨ · مُعرِّفُ النصّ المشترك: `ref` و`id` اسمانِ لمعنًى واحد
-- ══════════════════════════════════════════════════════════════════════
--
--  **لماذا:** محرّرُ بيان يكتب النصَّ المشترك بـ`ref` — تصديراً
--  (`editor_quiz.js:2437`) واستيراداً (`:2150`) — وملفّاتٌ سُلّمت على
--  Drive تكتبه `id` (`U1.LONGAGO` · `U1.HEAT`). فردَّتهما `147` بحقٍّ:
--  عقدٌ واحدٌ لا يعرف اسمين.
--
--  ⇒ **والقرار: تُقبل المرادفةُ، وفي الموضعين معاً.** فلو قُبلت في
--  القاعدة وحدها لدخل ملفٌّ من بابٍ ويُردّ من باب، **ومسارانِ يفترقان هو
--  عينُ ما جاءت `147` تُنهيه.** (وصندوقُ الواجهة يُعدَّل في خطوته،
--  والبناءُ يُرفَع معه.)
--
--  📐 **والأولويّة `ref` ثمّ `id`** — فمن كتب الاسمين قُرئ له الأوّل،
--  وهو ما يصدّره المحرّر.
--
--  🔑 **والبصمةُ لا تتبدّل لدفعةٍ كان يمكن أن تمرّ:** المشروعُ كان
--  `coalesce(ref,'')` وصار `coalesce(ref, id, '')`. فدفعةٌ بـ`ref`
--  بصمتُها هي، ودفعةٌ بلا نصوصٍ مشتركة بصمتُها هي، ودفعةٌ بـ`id` كانت
--  **تُردّ فلا بصمةَ لها محفوظة**. ⇒ `fp_rule` يبقى `v1` صادقاً، ولا
--  يُعاد استيرادُ ما استُورد. (و`U1L2.DISC` بلا نصوصٍ مشتركة أصلاً.)
--
--  🔁 قابلٌ لإعادة التشغيل · ولا DDL · والمنحُ يُعاد صريحاً.
-- ══════════════════════════════════════════════════════════════════════

-- ─────────────────────────────────────────────────────────────────────
--  ⚠️ معدَّلتانِ لا منشأتان — أصلُهما `147`، ولا يُبحث عنهما هناك
-- ─────────────────────────────────────────────────────────────────────

create or replace function public.quiz_payload_fp(p_payload jsonb)
returns text
language sql
immutable
set search_path to 'public'
as $function$
  with pg as (
    select string_agg(
             concat_ws('|', e.ord::text,
                       coalesce(e.value->>'ref', e.value->>'id', ''),
                       coalesce(e.value->>'title',''),
                       coalesce(e.value->>'kind',''), coalesce(e.value->>'lang',''),
                       coalesce(e.value->>'media',''), coalesce(e.value->>'body','')),
             E'\n' order by e.ord) as s
      from jsonb_array_elements(coalesce(p_payload->'passages', '[]'::jsonb))
           with ordinality as e(value, ord)
  ), op as (
    select e.ord as qord,
           string_agg(concat_ws(':',
                        case when coalesce((o.value->>'correct')::boolean, false)
                             then '1' else '0' end,
                        coalesce(o.value->>'dx',''), coalesce(o.value->>'k',''),
                        coalesce(o.value->>'label',''), coalesce(o.value->>'body','')),
                      ';' order by o.ord) as s
      from jsonb_array_elements(coalesce(p_payload->'questions', '[]'::jsonb))
           with ordinality as e(value, ord),
           jsonb_array_elements(coalesce(e.value->'options', '[]'::jsonb))
           with ordinality as o(value, ord)
     group by e.ord
  ), qs as (
    select string_agg(
             concat_ws('|', e.ord::text,
                       coalesce(e.value->>'kind','mcq'),
                       coalesce(e.value->>'objective',''), coalesce(e.value->>'section',''),
                       coalesce(e.value->>'variant',''),   coalesce(e.value->>'difficulty',''),
                       coalesce(e.value->>'passage',''),   coalesce(e.value->>'lang',''),
                       coalesce(e.value->>'points',''),
                       coalesce(e.value->>'image',''),     coalesce(e.value->>'video',''),
                       coalesce(e.value->>'audio',''),
                       coalesce(e.value->>'body',''),      coalesce(e.value->>'explanation',''),
                       coalesce(e.value->>'model',''),
                       coalesce(e.value->'accept' #>> '{}',''),
                       coalesce(e.value->'wrong'  #>> '{}',''),
                       coalesce(e.value->'bank'   #>> '{}',''),
                       coalesce((select s from op where op.qord = e.ord), '')),
             E'\n' order by e.ord) as s
      from jsonb_array_elements(coalesce(p_payload->'questions', '[]'::jsonb))
           with ordinality as e(value, ord)
  )
  select md5(concat_ws(E'\n',
           coalesce(p_payload->>'lesson_key', ''),
           concat_ws('|', coalesce(p_payload->'quiz'->>'title',''),
                          coalesce(p_payload->'quiz'->>'code',''),
                          coalesce(p_payload->'quiz'->>'minutes',''),
                          coalesce(p_payload->'quiz'->>'pass_mark',''),
                          coalesce(p_payload->'quiz'->>'shuffle',''),
                          coalesce(p_payload->'quiz'->>'reveal',''),
                          coalesce(p_payload->'quiz'->>'plays','')),
           coalesce((select s from pg), ''),
           coalesce((select s from qs), '')))
$function$;

create or replace function public.import_quiz(
  p_course   bigint,
  p_payload  jsonb,
  p_dry_run  boolean default true,
  p_official boolean default true
) returns jsonb
language plpgsql
security definer
set search_path to 'public'
as $function$
declare
  v_subject bigint; v_scale bigint; v_lesson bigint;
  v_author boolean; v_curate boolean;
  v_key text; v_title text; v_code text; v_ltitle text;
  v_err text[] := '{}'; v_warn text[] := '{}'; v_tmp text[];
  v_nq int; v_np int; v_fp text;
  v_oldq bigint; v_oldcode text; v_oldn int;
  v_plan jsonb; v_out jsonb; v_res jsonb;
  v_quiz bigint := null; v_item bigint := null;
  v_pass jsonb := '{}'::jsonb;    -- ref ← id
  v_vars jsonb := '{}'::jsonb;    -- variant ← [ids]
  v_done int := 0; v_paired int := 0;
  v_stage text := 'التحقّق';
  v_oid bigint; v_pid bigint; v_qid bigint; v_ids bigint[];
  v_var text; r record;
begin
  if auth.uid() is null then
    return jsonb_build_object('ok', false, 'error', 'يلزم تسجيل الدخول');
  end if;

  select c.subject_id into v_subject from courses c where c.id = p_course and c.active;
  if v_subject is null then
    return jsonb_build_object('ok', false, 'error', 'المقرَّر غير موجود أو معطَّل');
  end if;

  v_curate := can_curate(v_subject);
  v_author := can_author(v_subject);
  if not v_author then
    return jsonb_build_object('ok', false,
      'error', 'استيرادُ الاختبار يلزمه حقُّ التأليف في هذه المادة');
  end if;

  select s.scale_id into v_scale from subjects s where s.id = v_subject;

  -- درسٌ واحدٌ في كلّ مرّة ⇒ القفل على الدرس يكفي، ولا يَحجب مقرَّراً عن مقرَّر
  perform pg_advisory_xact_lock(hashtext('import_quiz'), p_course::int);

  -- ══════════════════ قراءةُ الدفعة ══════════════════

  v_key   := nullif(trim(coalesce(p_payload->>'lesson_key', p_payload->>'key')), '');
  v_title := nullif(trim(coalesce(p_payload->'quiz'->>'title', '')), '');
  v_code  := nullif(trim(coalesce(p_payload->'quiz'->>'code',  '')), '');
  v_fp    := quiz_payload_fp(p_payload);

  if v_key is null then
    v_err := v_err || array['الدفعة بلا مفتاح درس (lesson_key) — والاختبارُ يسكن درساً'];
  else
    select l.id, l.title into v_lesson, v_ltitle
      from lessons l
     where l.course_id = p_course and l.author_key = v_key and l.archived_at is null;
    if v_lesson is null then
      v_err := v_err || array['الدرس «' || v_key || '» ليس في هذا المقرَّر — '
                           || 'تُستورد خريطةُ الدروس أوّلاً (import_lesson_map)'];
    end if;
  end if;

  if v_title is null then
    v_err := v_err || array['عنوان الاختبار مطلوب في quiz.title'];
  end if;

  if jsonb_typeof(p_payload->'questions') <> 'array'
     or jsonb_array_length(p_payload->'questions') = 0 then
    v_err := v_err || array['الدفعة بلا أسئلة — ولا اختبارَ بلا سؤال'];
  end if;

  if p_payload ? 'passages' and jsonb_typeof(p_payload->'passages') <> 'array' then
    v_err := v_err || array['النصوص المشتركة تُرسل قائمةً أو لا تُرسل'];
  end if;

  if array_length(v_err, 1) > 0 then
    return jsonb_build_object('ok', false, 'مرفوضة', true,
             'lesson_key', v_key, 'content_fp', v_fp, 'أخطاء', to_jsonb(v_err));
  end if;

  v_nq := jsonb_array_length(p_payload->'questions');
  v_np := jsonb_array_length(coalesce(p_payload->'passages', '[]'::jsonb));

  -- ══════════════════ الاختبارُ القائم: لا جديد · أو تُردّ ══════════════════

  select q.id, q.code, q.question_count into v_oldq, v_oldcode, v_oldn
    from items i join quizzes q on q.id = i.quiz_id
   where i.lesson_id = v_lesson and i.kind = 'quiz'
   order by i.position, i.id
   limit 1;

  if v_oldq is not null then
    -- بصمةٌ مطابقةٌ لاستيرادٍ معتمَدٍ سابق ⇒ لا كتابةَ ولا شكوى ولا سطرَ سجلّ
    if exists (select 1 from import_log g
                where g.kind = 'quiz' and g.course_id = p_course
                  and g.dry_run = false
                  and coalesce((g.result->>'ok')::boolean, false)
                  and g.result->>'lesson_key' = v_key
                  and g.result->>'content_fp' = v_fp) then
      return jsonb_build_object('ok', true, 'لا جديد', true,
        'lesson_key', v_key, 'content_fp', v_fp,
        'quiz_id', v_oldq, 'quiz_code', v_oldcode, 'questions', v_oldn,
        'بيانٌ', 'هذه الدفعةُ بعينها استُوردت — فلا شيء يُكتب');
    end if;

    return jsonb_build_object('ok', false, 'مرفوضة', true,
      'lesson_key', v_key, 'content_fp', v_fp, 'quiz_id', v_oldq,
      'أخطاء', to_jsonb(array[
        'للدرس «' || v_key || '» اختبارٌ قائم (' || v_oldcode || ' · '
        || coalesce(v_oldn, 0) || ' سؤالاً) — والاستيرادُ يُنشئ ولا يُعدّل. '
        || 'وما أجاب عنه طالبٌ لا يُعدَّل بل يتقاعد ويولد وريثُه في المحرّر. '
        || 'فإن لم يُجَب عنه بعد فأزله من الدرس ثمّ أعد الاستيراد.']));
  end if;

  -- ══════════════════ تحقّقٌ لا يملكه حارسٌ آخر ══════════════════
  --  وما يملكه `save_question` لا يُكرَّر هنا: كودُ التشخيص والشرحُ
  --  والصوابُ الواحد ومفاتيحُ الأنماط — كلُّها تجري في الجافّة نفسِها.

  --  🔑 مُعرِّفُ النصّ المشترك يُقرأ `ref` أو `id` — اسمانِ لمعنًى واحد،
  --  والمحرّرُ يصدّر `ref` وملفّاتٌ سُلّمت تكتب `id`. والمرادفةُ في الموضعين
  --  معاً (هنا وفي صندوق الواجهة) — فمسارانِ يفترقان هو ما جئنا نُنهيه.
  select array_agg('النصّ المشترك ' || ord || ': بلا مُعرِّف (ref أو id) — والسؤالُ يشير إليه به')
    into v_tmp
    from jsonb_array_elements(coalesce(p_payload->'passages', '[]'::jsonb))
         with ordinality as e(value, ord)
   where nullif(trim(coalesce(e.value->>'ref', e.value->>'id', '')), '') is null;
  v_err := v_err || coalesce(v_tmp, '{}');

  --  ⚠️ التجميعُ داخلَ المصدر لا فوقه: `select … into` فوق `group by`
  --  يأخذ أوّلَ صفٍّ ويُسقط الباقي بلا شكوى
  select array_agg('مُعرِّفٌ مكرَّرٌ للنصّ المشترك: ' || d.ref) into v_tmp
    from (select nullif(trim(coalesce(e.value->>'ref', e.value->>'id')), '') as ref
            from jsonb_array_elements(coalesce(p_payload->'passages', '[]'::jsonb)) e
           where nullif(trim(coalesce(e.value->>'ref', e.value->>'id', '')), '') is not null
           group by 1 having count(*) > 1) d;
  v_err := v_err || coalesce(v_tmp, '{}');

  select array_agg('س' || ord || ': النصّ المشترك «' || (e.value->>'passage') || '» غير معرَّف')
    into v_tmp
    from jsonb_array_elements(p_payload->'questions') with ordinality as e(value, ord)
   where nullif(trim(coalesce(e.value->>'passage', '')), '') is not null
     and not exists (select 1
                       from jsonb_array_elements(coalesce(p_payload->'passages','[]'::jsonb)) g
                      where trim(coalesce(g.value->>'ref', g.value->>'id', ''))
                            = trim(e.value->>'passage'));
  v_err := v_err || coalesce(v_tmp, '{}');

  -- الهدفُ يُكتب بكوده: يُحَلّ مرّةً هنا، ويُحاسَب عليه قبل أن يُدرَج شيء
  select array_agg('س' || ord || ': الهدف «' || (e.value->>'objective')
                || '» ليس في فهرس أهداف المادة')
    into v_tmp
    from jsonb_array_elements(p_payload->'questions') with ordinality as e(value, ord)
   where nullif(trim(coalesce(e.value->>'objective', '')), '') is not null
     and not exists (select 1 from objectives x
                      where x.subject_id = v_subject
                        and (v_scale is null or x.scale_id = v_scale)
                        and x.code = trim(e.value->>'objective'));
  v_err := v_err || coalesce(v_tmp, '{}');

  --  ومنتقي الهدف في المحرّر محصورٌ في أهداف درس الاختبار (139) ⇒ هدفٌ
  --  من خارجها يُدرَج هنا ولا يُرى هناك: وسمٌ لا يُصلحه أحد.
  select array_agg('س' || ord || ': الهدف «' || (e.value->>'objective')
                || '» ليس من أهداف الدرس «' || v_key || '» — '
                || 'يُصحَّح الكود أو تُستورد أهدافُ المقرَّر (import_objectives)')
    into v_tmp
    from jsonb_array_elements(p_payload->'questions') with ordinality as e(value, ord)
   where nullif(trim(coalesce(e.value->>'objective', '')), '') is not null
     and exists (select 1 from objectives x
                  where x.subject_id = v_subject
                    and (v_scale is null or x.scale_id = v_scale)
                    and x.code = trim(e.value->>'objective'))
     and not exists (select 1 from lesson_objectives lo
                       join objectives x on x.id = lo.objective_id
                      where lo.lesson_id = v_lesson
                        and x.code = trim(e.value->>'objective'));
  v_err := v_err || coalesce(v_tmp, '{}');

  if array_length(v_err, 1) > 0 then
    return jsonb_build_object('ok', false, 'مرفوضة', true,
             'lesson_key', v_key, 'content_fp', v_fp, 'أخطاء', to_jsonb(v_err));
  end if;

  -- ══════════════════ تحذيراتٌ تُرى ولا تمنع ══════════════════

  if p_official and not v_curate then
    v_warn := v_warn || array['الاختبارُ الرسميّ ينشئه فريقُ الإشراف — '
                           || 'الجافّةُ تمرّ والاعتمادُ لا يمرّ'];
  end if;

  select count(*) into v_nq
    from jsonb_array_elements(p_payload->'questions') e
   where nullif(trim(coalesce(e.value->>'objective', '')), '') is null;
  if v_nq > 0 then
    v_warn := v_warn || array[v_nq || ' سؤالاً بلا هدف — '
                           || 'ولوحُ الفجوات لا يرى سؤالاً لا يستهدف شيئاً'];
  end if;
  v_nq := jsonb_array_length(p_payload->'questions');

  select array_agg('الخانة «' || d.v || '» بسؤالٍ واحد — لا تُقرن، '
                || 'وسؤالٌ وحده ليس نسخةً لشيء') into v_tmp
    from (select nullif(trim(e.value->>'variant'), '') as v
            from jsonb_array_elements(p_payload->'questions') e
           where nullif(trim(coalesce(e.value->>'variant', '')), '') is not null
           group by 1 having count(*) = 1) d;
  v_warn := v_warn || coalesce(v_tmp, '{}');

  if (p_payload->'quiz'->>'minutes') is null then
    v_warn := v_warn || array['الدفعة بلا زمنٍ (quiz.minutes) ⇒ ٢٥ دقيقة افتراضاً'];
  end if;
  if (p_payload->'quiz'->>'pass_mark') is null then
    v_warn := v_warn || array['الدفعة بلا عتبةِ نجاحٍ (quiz.pass_mark) ⇒ ٦٥٪ افتراضاً'];
  end if;

  -- ══════════════════ الخطّة — تُقرأ قبل أن يُكتب شيء ══════════════════

  select jsonb_build_object(
    'lesson_key', v_key, 'content_fp', v_fp, 'fp_rule', 'v1',
    'الدرس',   jsonb_build_object('id', v_lesson, 'العنوان', v_ltitle),
    'الاختبار', jsonb_build_object(
       'العنوان', v_title,
       'الكود',   coalesce(v_code, v_key),
       'الزمن',   coalesce((p_payload->'quiz'->>'minutes')::int, 25),
       'عتبة النجاح', coalesce((p_payload->'quiz'->>'pass_mark')::int, 65),
       'منسوبٌ إلى بيان', p_official),
    'أسئلة', v_nq,
    'بأنماطها', (select coalesce(jsonb_object_agg(k, n), '{}'::jsonb)
                   from (select coalesce(e.value->>'kind','mcq') as k, count(*) as n
                           from jsonb_array_elements(p_payload->'questions') e
                          group by 1) d),
    'بأقسامها', (select coalesce(jsonb_object_agg(s, n), '{}'::jsonb)
                   from (select coalesce(nullif(trim(e.value->>'section'),''),'—') as s,
                                count(*) as n
                           from jsonb_array_elements(p_payload->'questions') e
                          group by 1) d),
    'بأهدافها', (select coalesce(jsonb_object_agg(o, n), '{}'::jsonb)
                   from (select coalesce(nullif(trim(e.value->>'objective'),''),'—') as o,
                                count(*) as n
                           from jsonb_array_elements(p_payload->'questions') e
                          group by 1) d),
    'خاناتٌ ستُقرن', (select coalesce(jsonb_object_agg(v, n), '{}'::jsonb)
                   from (select nullif(trim(e.value->>'variant'),'') as v, count(*) as n
                           from jsonb_array_elements(p_payload->'questions') e
                          where nullif(trim(coalesce(e.value->>'variant','')),'') is not null
                          group by 1 having count(*) > 1) d),
    'نصوصٌ مشتركة', v_np
  ) into v_plan;

  -- ══════════════════ الاعتماد — والجافّةُ تمرّ به ثمّ يُنقَض ══════════════════

  begin
    v_stage := 'إنشاء الاختبار';
    v_res := save_quiz(p_course   => p_course,
                       p_title    => v_title,
                       p_minutes  => coalesce((p_payload->'quiz'->>'minutes')::int, 25),
                       p_code     => coalesce(v_code, v_key),
                       p_official => p_official,
                       p_pass_mark=> (p_payload->'quiz'->>'pass_mark')::int,
                       p_shuffle  => (p_payload->'quiz'->>'shuffle')::boolean,
                       p_reveal   => nullif(trim(coalesce(p_payload->'quiz'->>'reveal','')),''),
                       p_plays    => (p_payload->'quiz'->>'plays')::int);
    if not coalesce((v_res->>'ok')::boolean, false) then
      raise exception '%', coalesce(v_res->>'error', 'تعثّر بلا سبب');
    end if;
    v_quiz := (v_res->>'id')::bigint;

    --  البندُ في الدرس — وبه يبلغ الاختبارُ الطالب. وعنوانُه ثابتٌ
    --  اتّفاقاً مع ما أُدرج قبله بيدٍ («الاختبار التشخيصي» · الموضع ٩٩).
    v_stage := 'ربطُ الاختبار بالدرس';
    v_res := save_item(p_lesson     => v_lesson,
                       p_kind       => 'quiz',
                       p_title      => 'الاختبار التشخيصي',
                       p_quiz       => v_quiz,
                       p_position   => 99,
                       p_official   => p_official,
                       p_is_graded  => p_official,
                       p_required   => p_official,
                       p_visibility => case when p_official then 'class' else 'private' end);
    if not coalesce((v_res->>'ok')::boolean, false) then
      raise exception '%', coalesce(v_res->>'error', 'تعثّر بلا سبب');
    end if;
    v_item := (v_res->>'id')::bigint;

    for r in select e.value as q, e.ord as ord
               from jsonb_array_elements(coalesce(p_payload->'passages','[]'::jsonb))
                    with ordinality as e(value, ord)
              order by e.ord loop
      v_stage := 'النصّ المشترك ' || r.ord;
      v_res := save_passage(p_quiz     => v_quiz,
                            p_title    => nullif(trim(coalesce(r.q->>'title','')),''),
                            p_body     => nullif(trim(coalesce(r.q->>'body','')),''),
                            p_media    => nullif(trim(coalesce(r.q->>'media','')),''),
                            p_kind     => coalesce(nullif(trim(r.q->>'kind'),''), 'text'),
                            p_lang     => coalesce(nullif(trim(r.q->>'lang'),''), 'ar'),
                            p_position => r.ord::int);
      if not coalesce((v_res->>'ok')::boolean, false) then
        raise exception '%', coalesce(v_res->>'error', 'تعثّر بلا سبب');
      end if;
      --  مفتاحُ الخريطة من الملفّ (ref أو id)، وقيمتُها معرّفُ الصفّ في القاعدة
      v_pass := v_pass || jsonb_build_object(
                  trim(coalesce(r.q->>'ref', r.q->>'id')), v_res->>'id');
    end loop;

    for r in select e.value as q, e.ord as ord
               from jsonb_array_elements(p_payload->'questions')
                    with ordinality as e(value, ord)
              order by e.ord loop
      v_stage := 'السؤال ' || r.ord;

      v_oid := null;
      if nullif(trim(coalesce(r.q->>'objective','')),'') is not null then
        select x.id into v_oid from objectives x
         where x.subject_id = v_subject
           and (v_scale is null or x.scale_id = v_scale)
           and x.code = trim(r.q->>'objective');
      end if;

      v_pid := null;
      if nullif(trim(coalesce(r.q->>'passage','')),'') is not null then
        v_pid := (v_pass->>trim(r.q->>'passage'))::bigint;
      end if;

      --  🔑 الخياراتُ والمفاتيحُ تُمرَّر كما وردت، لا يُنتقى منها حقلٌ
      --  حقلاً. فثلاثُ علّاتٍ في `editor_quiz.js` كانت من انتقاءٍ يدويّ
      --  نُسي فيه حقل: `objective` ثمّ `matching` ثمّ `cloze`.
      v_res := save_question(p_quiz        => v_quiz,
                             p_kind        => coalesce(nullif(trim(r.q->>'kind'),''), 'mcq'),
                             p_body        => r.q->>'body',
                             p_position    => r.ord::int,
                             p_options     => coalesce(r.q->'options', '[]'::jsonb),
                             p_explanation => r.q->>'explanation',
                             p_model       => r.q->>'model',
                             p_passage     => v_pid,
                             p_objective   => v_oid,
                             p_points      => (r.q->>'points')::int,
                             p_lang        => coalesce(nullif(trim(r.q->>'lang'),''), 'ar'),
                             p_difficulty  => nullif(trim(coalesce(r.q->>'difficulty','')),''),
                             p_image       => nullif(trim(coalesce(r.q->>'image','')),''),
                             p_video       => nullif(trim(coalesce(r.q->>'video','')),''),
                             p_audio       => nullif(trim(coalesce(r.q->>'audio','')),''),
                             p_section     => nullif(trim(coalesce(r.q->>'section','')),''),
                             p_accept      => r.q->'accept',
                             p_wrong       => r.q->'wrong',
                             p_bank        => r.q->'bank');
      if not coalesce((v_res->>'ok')::boolean, false) then
        raise exception '%', coalesce(v_res->>'error', 'تعثّر بلا سبب');
      end if;
      v_qid := (v_res->>'id')::bigint;
      v_done := v_done + 1;

      v_var := nullif(trim(coalesce(r.q->>'variant','')),'');
      if v_var is not null then
        v_vars := jsonb_set(v_vars, array[v_var],
                            coalesce(v_vars->v_var, '[]'::jsonb) || to_jsonb(v_qid), true);
      end if;
    end loop;

    --  الاقترانُ بعد الإدراج كلِّه: المعرّفاتُ لا تُعرف قبل الحفظ
    for r in select key as v, value as ids from jsonb_each(v_vars) loop
      if jsonb_array_length(r.ids) < 2 then continue; end if;
      v_stage := 'اقترانُ الخانة «' || r.v || '»';
      select array_agg(x::bigint) into v_ids from jsonb_array_elements_text(r.ids) x;
      v_res := set_variant(v_ids);
      if not coalesce((v_res->>'ok')::boolean, false) then
        raise exception '%', coalesce(v_res->>'error', 'تعثّر بلا سبب');
      end if;
      v_paired := v_paired + 1;
    end loop;

    --  🧪 الجافّةُ: مرّ المسارُ كلُّه بحرّاسه الأحياء، ولا يبقى منه أثر
    if p_dry_run then
      raise exception using errcode = 'BY147', message = 'الجافّة تمّت';
    end if;

  exception
    when sqlstate 'BY147' then
      null;                                  -- نُقضت الكتابة، وبقي الحكم
    when others then
      v_out := jsonb_build_object(
        'ok', false, 'تجريبيّة', p_dry_run,
        'lesson_key', v_key, 'content_fp', v_fp,
        'توقّف عند', v_stage, 'السبب', sqlerrm,
        'أُدرج قبل النقض', v_done,
        'بيانٌ', 'لم يبقَ من الدفعة شيء — تُصحَّح وتُعاد كاملةً',
        'الخطّة', v_plan, 'تحذيرات', to_jsonb(v_warn));
      insert into import_log (kind, course_id, subject_id, payload, result, dry_run, by_user)
      values ('quiz', p_course, v_subject, p_payload, v_out, p_dry_run, auth.uid());
      return v_out;
  end;

  v_out := jsonb_build_object(
    'ok', true, 'تجريبيّة', p_dry_run,
    'lesson_key', v_key, 'content_fp', v_fp, 'fp_rule', 'v1',
    'quiz_id',  case when p_dry_run then null else v_quiz end,
    'item_id',  case when p_dry_run then null else v_item end,
    'questions', v_done, 'خاناتٌ قُرنت', v_paired,
    'الخطّة', v_plan, 'تحذيرات', to_jsonb(v_warn),
    'بيانٌ', case when p_dry_run
                  then 'جافّة: مرّ المسارُ كلُّه بحرّاسه ولم يبقَ أثر'
                  else 'اعتُمدت — والاختبارُ غيرُ منشور حتى يُنشره المعلّم' end);

  insert into import_log (kind, course_id, subject_id, payload, result, dry_run, by_user)
  values ('quiz', p_course, v_subject, p_payload, v_out, p_dry_run, auth.uid());

  return v_out;
end
$function$;

-- المنحُ يُعاد صريحاً: الاستبدالُ يحفظ الصلاحيات، والصراحةُ تحفظ القارئ
revoke execute on function public.quiz_payload_fp(jsonb)                      from public, anon;
revoke execute on function public.import_quiz(bigint, jsonb, boolean, boolean) from public, anon;
grant  execute on function public.quiz_payload_fp(jsonb)                      to authenticated, service_role;
grant  execute on function public.import_quiz(bigint, jsonb, boolean, boolean) to authenticated, service_role;

insert into public.sql_log (n, title, applied_at)
values ('148', 'مُعرِّفُ النصّ المشترك: ref وid اسمانِ لمعنًى واحد', now())
on conflict (n) do update set applied_at = now();
