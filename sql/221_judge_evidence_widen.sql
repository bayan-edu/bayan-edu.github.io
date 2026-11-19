-- ══════════════════════════════════════════════════════════════════
--  ٢٢١ · توسيعُ مفاتيح الجمل والأحكام في نمط «الحكم ودليله» (ق١٦)
-- ══════════════════════════════════════════════════════════════════
--
--  علّةُ هذا الملفّ: في الروايات الطويلة (مثل Round the World in Eighty Days)
--  يزيد عددُ الجمل على ألف جملة، فتأخذ الجملُ المفاتيح S1000..S1028 (أربعة أرقام).
--  وكان الحارسُ في 209 يشترط '^[JS][0-9]{1,3}$' (ثلاثة أرقام كحدّ أقصى 1..999)،
--  فرُدّت أسئلةُ الروايات الطويلة بـ «كل حكم مفتاحه J ورقم، وكل جملة S ورقم».
--  ⇒ توسيعُ القناع إلى '^[JS][0-9]{1,5}$' ليتّسع لما جاوز الألف.
--
-- ══════════════════ معدَّلة لا منشأة ══════════════════

CREATE OR REPLACE FUNCTION public.save_question(p_id bigint DEFAULT NULL::bigint, p_quiz bigint DEFAULT NULL::bigint, p_kind text DEFAULT 'mcq'::text, p_body text DEFAULT NULL::text, p_position integer DEFAULT 0, p_options jsonb DEFAULT '[]'::jsonb, p_explanation text DEFAULT NULL::text, p_model text DEFAULT NULL::text, p_passage bigint DEFAULT NULL::bigint, p_objective bigint DEFAULT NULL::bigint, p_points integer DEFAULT 1, p_lang text DEFAULT 'ar'::text, p_difficulty text DEFAULT NULL::text, p_image text DEFAULT NULL::text, p_video text DEFAULT NULL::text, p_audio text DEFAULT NULL::text, p_section text DEFAULT NULL::text, p_accept jsonb DEFAULT NULL::jsonb, p_wrong jsonb DEFAULT NULL::jsonb, p_bank jsonb DEFAULT NULL::jsonb)
 RETURNS jsonb
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
declare
  v_subject bigint; v_quizid bigint; v_qid bigint; v_oid bigint;
  v_correct bigint; v_dx jsonb := '{}'::jsonb;
  v_bad text; v_n int; v_k int; r record;
  v_ids bigint[] := '{}'::bigint[];
  v_gaps int;
  v_pairs int;
  v_pbody text;          -- 208 · متنُ نصّ اختيار الجملة
  v_tierbank boolean := false;   -- 214 · بنكُ اختبار المستوى: الشرحُ فيه دليلُ الإجابة للتوثيق، لا شرطٌ (reveal = never)
begin
  if auth.uid() is null then
    return jsonb_build_object('ok', false, 'error', 'يلزم تسجيل الدخول');
  end if;

  v_quizid := coalesce(p_quiz, (select q2.quiz_id from questions q2 where q2.id = p_id));
  select q.subject_id, coalesce(q.station_kind = 'adaptive', false) into v_subject, v_tierbank from quizzes q where q.id = v_quizid;
  if v_subject is null then
    return jsonb_build_object('ok', false, 'error', 'الاختبار غير موجود');
  end if;
  if not can_author(v_subject) then
    return jsonb_build_object('ok', false, 'error', 'لا تملك حقّ التأليف في هذه المادة');
  end if;

  if p_id is not null and exists (select 1 from answers where question_id = p_id) then
    return jsonb_build_object('ok', false,
      'error', 'أُجيب عن هذا السؤال — أنشئ نسخة جديدة من الاختبار بكود مختلف');
  end if;

  if coalesce(trim(p_body), '') = '' then
    return jsonb_build_object('ok', false, 'error', 'نصّ السؤال مطلوب');
  end if;

  if p_passage is not null
     and not exists (select 1 from passages pg
                      where pg.id = p_passage and pg.quiz_id = v_quizid) then
    return jsonb_build_object('ok', false, 'error', 'النصّ المشترك ليس من هذا الاختبار');
  end if;

  if p_difficulty is not null and p_difficulty not in ('easy','medium','hard') then
    return jsonb_build_object('ok', false,
      'error', 'مستوى الصعوبة: easy أو medium أو hard');
  end if;

  if p_kind = 'essay' then
    if coalesce(trim(p_model), '') = '' then
      return jsonb_build_object('ok', false,
        'error', 'السؤال المقالي يحتاج إجابة نموذجية — بها يقارن الطالب بنفسه');
    end if;

  elsif p_kind = 'mcq' then
    v_n := jsonb_array_length(coalesce(p_options, '[]'::jsonb));
    if v_n < 2 then
      return jsonb_build_object('ok', false, 'error', 'السؤال يحتاج خيارين على الأقل');
    end if;

    select count(*) into v_n from jsonb_array_elements(p_options) o
     where coalesce((o->>'correct')::boolean, false);
    if v_n <> 1 then
      return jsonb_build_object('ok', false, 'error', 'يلزم خيار صحيح واحد بالضبط');
    end if;

    if exists (select 1 from jsonb_array_elements(p_options) o
                where coalesce(trim(o->>'body'), '') = '') then
      return jsonb_build_object('ok', false, 'error', 'كل خيار يحتاج نصاً');
    end if;

    select o->>'dx' into v_bad from jsonb_array_elements(p_options) o
     where not coalesce((o->>'correct')::boolean, false)

       and coalesce(trim(o->>'dx'), '') <> ''

       and not exists (select 1 from dx_codes d where d.code = o->>'dx')
     limit 1;
    if v_bad is not null then
      return jsonb_build_object('ok', false, 'error', 'كود تشخيص غير معروف: ' || v_bad);
    end if;

    if coalesce(trim(p_explanation), '') = '' and not v_tierbank then
      return jsonb_build_object('ok', false,
        'error', 'شرح الخطأ مطلوب — الطالب يحتاج أن يعرف لماذا أخطأ');
    end if;

  elsif p_kind = 'msq' then
    v_k := jsonb_array_length(coalesce(p_options, '[]'::jsonb));
    if v_k < 3 then
      return jsonb_build_object('ok', false,
        'error', 'الاختيار المتعدّد يحتاج ثلاثة خيارات على الأقل — صحيحان وخاطئ');
    end if;

    select count(*) into v_n from jsonb_array_elements(p_options) o
     where coalesce((o->>'correct')::boolean, false);
    if v_n < 2 then
      return jsonb_build_object('ok', false,
        'error', 'يلزم خياران صحيحان على الأقل — وسؤالٌ صحيحه واحد هو اختيارٌ واحد متنكّر');
    end if;
    if v_n >= v_k then
      return jsonb_build_object('ok', false,
        'error', 'يلزم خيار خاطئ واحد على الأقل — سؤالٌ كل خياراته صحيحة لا يميّز شيئاً');
    end if;

    if exists (select 1 from jsonb_array_elements(p_options) o
                where coalesce(trim(o->>'body'), '') = '') then
      return jsonb_build_object('ok', false, 'error', 'كل خيار يحتاج نصاً');
    end if;

    select o->>'dx' into v_bad from jsonb_array_elements(p_options) o
     where not coalesce((o->>'correct')::boolean, false)

       and coalesce(trim(o->>'dx'), '') <> ''

       and not exists (select 1 from dx_codes d where d.code = o->>'dx')
     limit 1;
    if v_bad is not null then
      return jsonb_build_object('ok', false, 'error', 'كود تشخيص غير معروف: ' || v_bad);
    end if;

    if coalesce(trim(p_explanation), '') = '' and not v_tierbank then
      return jsonb_build_object('ok', false,
        'error', 'شرح الخطأ مطلوب — الطالب يحتاج أن يعرف لماذا أخطأ');
    end if;

  elsif p_kind = 'sentence' then
    -- 208 · اختيارُ الجملة (ق١٦): خياراتُه جملُ نصِّه بترتيبها — فالنصُّ شرطٌ، والجملُ تطابقه
    if p_passage is null then
      return jsonb_build_object('ok', false,
        'error', 'اختيار الجملة يحتاج نصاً مشتركاً — جمله هي الخيارات');
    end if;
    select pg.body into v_pbody from passages pg where pg.id = p_passage;
    if coalesce(trim(v_pbody), '') = '' then
      return jsonb_build_object('ok', false,
        'error', 'النص المشترك بلا متن — اختيار الجملة يحتاج نصاً مقروءاً');
    end if;

    v_k := jsonb_array_length(coalesce(p_options, '[]'::jsonb));
    if v_k < 3 then
      return jsonb_build_object('ok', false,
        'error', 'يلزم ثلاث جمل على الأقل — وجملتان تُحسمان بالاستبعاد');
    end if;
    if exists (select 1 from jsonb_array_elements(p_options) o
                where coalesce(trim(o->>'body'), '') = '') then
      return jsonb_build_object('ok', false, 'error', 'كل جملة تحتاج نصاً');
    end if;

    select count(*) into v_n from jsonb_array_elements(p_options) o
     where coalesce((o->>'correct')::boolean, false);
    if v_n < 1 then
      return jsonb_build_object('ok', false, 'error', 'حدّد الجملة الصحيحة — واحدة أو أكثر');
    end if;
    if v_n >= v_k then
      return jsonb_build_object('ok', false,
        'error', 'يلزم جملة خاطئة واحدة على الأقل — سؤال كل جمله صحيحة لا يميّز شيئاً');
    end if;

    -- الجملُ هي النصُّ نفسُه بترتيبه: بلا حذفٍ ولا زيادة (والمسافاتُ لا تُحسب — التقسيمُ لا يغيّر حرفاً)
    if regexp_replace(v_pbody, '\s', '', 'g') <>
       regexp_replace((select string_agg(o->>'body', '' order by t.ord)
                         from jsonb_array_elements(p_options) with ordinality as t(o, ord)), '\s', '', 'g') then
      return jsonb_build_object('ok', false,
        'error', 'الجمل لا تطابق النص المشترك — تُقسَّم من النص نفسه بلا حذف ولا زيادة. وإن تغيّر النص فأعد التقسيم');
    end if;

    select o->>'dx' into v_bad from jsonb_array_elements(p_options) o
     where not coalesce((o->>'correct')::boolean, false)
       and coalesce(trim(o->>'dx'), '') <> ''
       and not exists (select 1 from dx_codes d where d.code = o->>'dx')
     limit 1;
    if v_bad is not null then
      return jsonb_build_object('ok', false, 'error', 'كود تشخيص غير معروف: ' || v_bad);
    end if;

    if coalesce(trim(p_explanation), '') = '' and not v_tierbank then
      return jsonb_build_object('ok', false,
        'error', 'شرح الخطأ مطلوب — الطالب يحتاج أن يعرف لماذا أخطأ');
    end if;

  elsif p_kind = 'judge' then
    -- 209 · حكمٌ ودليلُه (ق١٦): الأحكامُ J… والجملُ S… في الخيارات، والمفتاحُ «حكمٌ ⇐ جملُه» في accept
    if p_passage is null then
      return jsonb_build_object('ok', false,
        'error', 'الحكم ودليله يحتاج نصاً مشتركاً — جمله هي الأدلّة');
    end if;
    select pg.body into v_pbody from passages pg where pg.id = p_passage;
    if coalesce(trim(v_pbody), '') = '' then
      return jsonb_build_object('ok', false,
        'error', 'النص المشترك بلا متن — الدليل جملة من نص مقروء');
    end if;

    if exists (select 1 from jsonb_array_elements(coalesce(p_options, '[]'::jsonb)) o
                where coalesce(o->>'k', '') !~ '^[JS][0-9]{1,5}$') then
      return jsonb_build_object('ok', false,
        'error', 'كل حكم مفتاحه J ورقم، وكل جملة S ورقم — والمحرّر يكتبهما');
    end if;
    if (select count(distinct o->>'k') from jsonb_array_elements(p_options) o)
       <> jsonb_array_length(p_options) then
      return jsonb_build_object('ok', false, 'error', 'مفتاحان متطابقان — والمفتاح يشير إلى واحد');
    end if;
    if exists (select 1 from jsonb_array_elements(p_options) o
                where coalesce(trim(o->>'body'), '') = '') then
      return jsonb_build_object('ok', false, 'error', 'كل حكم وكل جملة يحتاج نصاً');
    end if;

    select count(*) into v_n from jsonb_array_elements(p_options) o where o->>'k' like 'J%';
    if v_n < 2 then
      return jsonb_build_object('ok', false, 'error', 'يلزم حكمان على الأقل');
    end if;
    select count(*) into v_k from jsonb_array_elements(p_options) o where o->>'k' like 'S%';
    if v_k < 3 then
      return jsonb_build_object('ok', false,
        'error', 'يلزم ثلاث جمل على الأقل — والدليل يُختار من بينها');
    end if;

    if regexp_replace(v_pbody, '\s', '', 'g') <>
       regexp_replace((select string_agg(o->>'body', '' order by t.ord)
                         from jsonb_array_elements(p_options) with ordinality as t(o, ord)
                        where o->>'k' like 'S%'), '\s', '', 'g') then
      return jsonb_build_object('ok', false,
        'error', 'الجمل لا تطابق النص المشترك — تُقسَّم من النص نفسه بلا حذف ولا زيادة. وإن تغيّر النص فأعد التقسيم');
    end if;

    if p_accept is null or coalesce(p_accept->>'mode', '') not in ('two', 'point')
       or jsonb_typeof(p_accept -> 'map') <> 'object' then
      return jsonb_build_object('ok', false,
        'error', 'المفتاح: { "mode": "two" أو "point", "map": { "J1": ["S5"], … } }');
    end if;
    if not exists (select 1 from jsonb_each(p_accept -> 'map')) then
      return jsonb_build_object('ok', false, 'error', 'حدّد حكماً مقبولاً واحداً على الأقل ودليله');
    end if;
    select m.key into v_bad from jsonb_each(p_accept -> 'map') m
     where not exists (select 1 from jsonb_array_elements(p_options) o
                        where o->>'k' = m.key and m.key like 'J%') limit 1;
    if v_bad is not null then
      return jsonb_build_object('ok', false, 'error', 'حكم في المفتاح لا وجود له: ' || v_bad);
    end if;
    if (select count(*) from jsonb_each(p_accept -> 'map')) >= v_n then
      return jsonb_build_object('ok', false,
        'error', 'يلزم حكم لا يدعمه النص — وإلا صار اختيار الحكم هبة لا قياساً');
    end if;
    select m.key into v_bad from jsonb_each(p_accept -> 'map') m
     where jsonb_typeof(m.value) <> 'array' or jsonb_array_length(m.value) = 0 limit 1;
    if v_bad is not null then
      return jsonb_build_object('ok', false, 'error', 'الحكم المقبول يحتاج جملة تدلّ عليه: ' || v_bad);
    end if;
    select s into v_bad from jsonb_each(p_accept -> 'map') m, jsonb_array_elements_text(m.value) s
     where not exists (select 1 from jsonb_array_elements(p_options) o
                        where o->>'k' = s and s like 'S%') limit 1;
    if v_bad is not null then
      return jsonb_build_object('ok', false, 'error', 'دليل في المفتاح ليس من جمل النص: ' || v_bad);
    end if;

    select o->>'k' into v_bad from jsonb_array_elements(p_options) o
     where coalesce(trim(o->>'dx'), '') <> '' and (p_accept -> 'map') ? (o->>'k') limit 1;
    if v_bad is not null then
      return jsonb_build_object('ok', false,
        'error', 'الحكم المقبول لا كود له — الكود جواب «لماذا يُغري وهو خاطئ؟»: ' || v_bad);
    end if;
    select o->>'dx' into v_bad from jsonb_array_elements(p_options) o
     where coalesce(trim(o->>'dx'), '') <> ''
       and not exists (select 1 from dx_codes d where d.code = o->>'dx') limit 1;
    if v_bad is not null then
      return jsonb_build_object('ok', false, 'error', 'كود تشخيص غير معروف: ' || v_bad);
    end if;

    if coalesce(trim(p_explanation), '') = '' and not v_tierbank then
      return jsonb_build_object('ok', false,
        'error', 'شرح الخطأ مطلوب — الطالب يحتاج أن يعرف لماذا أخطأ');
    end if;

  elsif p_kind = 'ordering' then
    -- 210 · ترتيبُ الأحداث (ق١٦): الأحداثُ بترتيبها الصحيح — فموضعُ كلٍّ هو مفتاحُه
    v_k := jsonb_array_length(coalesce(p_options, '[]'::jsonb));
    if v_k < 3 or v_k > 8 then
      return jsonb_build_object('ok', false,
        'error', 'الترتيب من ثلاثة أحداث إلى ثمانية — والموجود ' || v_k ||
                 ' (حدثان رابط واحد يُخمَّن، وما فوق الثمانية عبء قراءة لا قياس)');
    end if;
    if exists (select 1 from jsonb_array_elements(p_options) o
                where coalesce(trim(o->>'body'), '') = '') then
      return jsonb_build_object('ok', false, 'error', 'كل حدث يحتاج نصاً');
    end if;
    if (select count(distinct lower(regexp_replace(trim(o->>'body'), '\s+', ' ', 'g')))
          from jsonb_array_elements(p_options) o) <> v_k then
      return jsonb_build_object('ok', false,
        'error', 'حدثان بنص واحد — والترتيب لا يفرّق بينهما');
    end if;
    if exists (select 1 from jsonb_array_elements(p_options) o
                where coalesce(trim(o->>'dx'), '') <> '') then
      return jsonb_build_object('ok', false,
        'error', 'لا كود تشخيص في الترتيب — الخطأ في موضع الحدث لا في الحدث');
    end if;

    if coalesce(trim(p_explanation), '') = '' and not v_tierbank then
      return jsonb_build_object('ok', false,
        'error', 'شرح الخطأ مطلوب — الطالب يحتاج أن يعرف لماذا أخطأ');
    end if;

  elsif p_kind = 'gap' then
    v_gaps := gap_count(p_body);

    if v_gaps = 0 then
      return jsonb_build_object('ok', false,
        'error', 'ضع فراغاً في النصّ: {{1}} — وفراغين: {{1}} و {{2}}');
    end if;
    if not gap_seq_ok(p_body) then
      return jsonb_build_object('ok', false,
        'error', 'أرقام الفراغات متتالية من ١ بلا فجوة ولا تكرار');
    end if;

    if p_accept is null or jsonb_typeof(p_accept -> 'slots') <> 'array' then
      return jsonb_build_object('ok', false,
        'error', 'الإجابة القصيرة تحتاج مقبولات — { "ordered":…, "slots":[[…]] }');
    end if;

    v_k := jsonb_array_length(p_accept -> 'slots');
    if v_k <> v_gaps then
      return jsonb_build_object('ok', false,
        'error', 'في النصّ ' || v_gaps || ' فراغاً، والمقبولات ' || v_k);
    end if;

    if exists (select 1 from jsonb_array_elements(p_accept -> 'slots') s
                where jsonb_typeof(s) <> 'array'
                   or jsonb_array_length(s) = 0
                   or exists (select 1 from jsonb_array_elements_text(s) a
                               where coalesce(trim(a),'') = '')) then
      return jsonb_build_object('ok', false,
        'error', 'كل فراغ يحتاج مقبولاً واحداً على الأقل، ولا مقبولَ فارغاً');
    end if;

    if p_wrong is not null then
      if jsonb_typeof(p_wrong) <> 'object' then
        return jsonb_build_object('ok', false,
          'error', 'الأخطاء المتوقّعة كائن: { "1:نصّ الخطأ": "كود" }');
      end if;
      select w.key into v_bad from jsonb_each(p_wrong) w
       where w.key !~ ('^[1-' || v_gaps || ']:.') limit 1;
      if v_bad is not null then
        return jsonb_build_object('ok', false,
          'error', 'مفتاح الخطأ يبدأ برقم الفراغ ثم نقطتين: ' || v_bad);
      end if;
      select w.value #>> '{}' into v_bad from jsonb_each(p_wrong) w
       where not exists (select 1 from dx_codes d where d.code = w.value #>> '{}')
       limit 1;
      if v_bad is not null then
        return jsonb_build_object('ok', false, 'error', 'كود تشخيص غير معروف: ' || v_bad);
      end if;
    end if;

    if p_bank is not null and jsonb_typeof(p_bank) = 'array'
       and jsonb_array_length(p_bank) > 0 then
      select a into v_bad
        from jsonb_array_elements(p_accept -> 'slots') s,
             jsonb_array_elements_text(s) a
       where not exists (select 1 from jsonb_array_elements_text(p_bank) b where b = a)
       limit 1;
      if v_bad is not null then
        return jsonb_build_object('ok', false,
          'error', 'مقبولٌ ليس في القائمة: ' || v_bad);
      end if;
    end if;

    if coalesce(trim(p_explanation), '') = '' and not v_tierbank then
      return jsonb_build_object('ok', false,
        'error', 'شرح الخطأ مطلوب — الطالب يحتاج أن يعرف لماذا أخطأ');
    end if;

  -- ═══ 113 · إكمال من قائمة ═══════════════════════════════════════
  elsif p_kind = 'cloze' then
    v_gaps := gap_count(p_body);

    if v_gaps < 2 then
      return jsonb_build_object('ok', false,
        'error', 'ضع فراغين على الأقل: {{1}} و {{2}} — وفراغٌ واحدٌ من قائمةٍ '
              || 'اختيارٌ من متعدد متنكّر، وذاك نمطُه أوضح');
    end if;
    if v_gaps > 8 then
      return jsonb_build_object('ok', false,
        'error', 'ثمانية فراغاتٍ حدٌّ كافٍ — والموجود ' || v_gaps ||
                 ' (وما فوقها عبءُ قراءةٍ لا قياس)');
    end if;
    if not gap_seq_ok(p_body) then
      return jsonb_build_object('ok', false,
        'error', 'أرقام الفراغات متتالية من ١ بلا فجوة ولا تكرار');
    end if;

    /* البنودُ هي الفراغات ⇒ لا options. وخيارٌ مُرسَلٌ هنا يُكتب في
       الجدول ولا يُقرأ أبداً — صمتٌ يُصدَّق. فيُرفض ناطقاً. */
    if jsonb_array_length(coalesce(p_options, '[]'::jsonb)) > 0 then
      return jsonb_build_object('ok', false,
        'error', 'في «إكمال من قائمة» الفراغُ هو البند ⇒ لا خيارات. '
              || 'الكلماتُ كلُّها في القائمة (bank)');
    end if;

    if not bank_keys_ok(p_bank) then
      return jsonb_build_object('ok', false,
        'error', 'قائمة الكلمات: [ {"k":"مفتاح","t":"كلمة"}, … ] — '
              || 'بمفاتيحَ فريدةٍ ونصوصٍ غير فارغة، ويُستحبّ أن تزيد على الفراغات');
    end if;

    if not cloze_keys_ok(p_accept, v_gaps) then
      return jsonb_build_object('ok', false,
        'error', 'لكلّ فراغٍ مفتاحُه برقمه من ١ إلى ' || v_gaps ||
                 ' — { "pairs": { "1":"مفتاح الكلمة", … } } والموجود ' ||
                 match_pairs(p_accept) || ' مفتاحاً');
    end if;

    if not match_key_ok(p_accept, p_bank) then
      select p.value into v_bad
        from jsonb_each_text(p_accept -> 'pairs') p
       where coalesce(trim(p.value), '') = ''
          or not exists (select 1 from jsonb_array_elements(p_bank) b
                          where b->>'k' = p.value) limit 1;
      return jsonb_build_object('ok', false,
        'error', 'صوابُ فراغٍ ليس في القائمة: ' || coalesce(v_bad, '—') ||
                 ' — وفراغُه لا يُصيبه أحد');
    end if;

    if p_wrong is not null then
      if jsonb_typeof(p_wrong) <> 'object' then
        return jsonb_build_object('ok', false,
          'error', 'الخلطُ المتوقَّع كائن: { "رقم الفراغ:مفتاح الكلمة": "كود" }');
      end if;

      select w.key into v_bad from jsonb_each(p_wrong) w
       where w.key !~ '^[1-9][0-9]*:[A-Za-z0-9_-]{1,16}$'
          or split_part(w.key, ':', 1)::int > v_gaps
          or not exists (select 1 from jsonb_array_elements(p_bank) b
                          where b->>'k' = split_part(w.key, ':', 2))
       limit 1;
      if v_bad is not null then
        return jsonb_build_object('ok', false,
          'error', 'مفتاح الخلط «رقم الفراغ:مفتاح الكلمة» وطرفاه موجودان: ' || v_bad);
      end if;

      /* خلطٌ إلى صوابِ الفراغ نفسه: كودٌ لا يُقرأ أبداً — يُقال ولا يُبتلع */
      select w.key into v_bad from jsonb_each(p_wrong) w
       where (p_accept -> 'pairs' ->> split_part(w.key, ':', 1))
             = split_part(w.key, ':', 2)
       limit 1;
      if v_bad is not null then
        return jsonb_build_object('ok', false,
          'error', 'خلطٌ إلى صواب الفراغ نفسه: ' || v_bad || ' — كودٌ لا يُقرأ أبداً');
      end if;

      select w.value #>> '{}' into v_bad from jsonb_each(p_wrong) w
       where not exists (select 1 from dx_codes d where d.code = w.value #>> '{}')
       limit 1;
      if v_bad is not null then
        return jsonb_build_object('ok', false, 'error', 'كود تشخيص غير معروف: ' || v_bad);
      end if;
    end if;

    if coalesce(trim(p_explanation), '') = '' and not v_tierbank then
      return jsonb_build_object('ok', false,
        'error', 'شرح الخطأ مطلوب — الطالب يحتاج أن يعرف لماذا أخطأ');
    end if;

  elsif p_kind = 'matching' then
    v_pairs := jsonb_array_length(coalesce(p_options, '[]'::jsonb));

    if jsonb_typeof(p_accept -> 'pairs') = 'array'
       or (p_bank is not null and jsonb_typeof(p_bank) = 'array'
           and jsonb_array_length(p_bank) > 0
           and jsonb_typeof(p_bank -> 0) <> 'object') then
      return jsonb_build_object('ok', false,
        'error', 'نسخة المحرّر قديمة: المزاوجة صارت بالمفاتيح لا بالنصّ والموضع '
              || '(112). حدّث الصفحة — وإن بقي، فالواجهة لم تصل بعد.');
    end if;

    if v_pairs < 3 or v_pairs > 8 then
      return jsonb_build_object('ok', false,
        'error', 'المزاوجة من ثلاثة بنودٍ إلى ثمانية — والموجود ' || v_pairs ||
                 ' (بندان يُحسمان بالاستبعاد، وما فوق الثمانية عبءُ قراءةٍ لا قياس)');
    end if;

    if exists (select 1 from jsonb_array_elements(p_options) o
                where coalesce(trim(o->>'body'), '') = '') then
      return jsonb_build_object('ok', false, 'error', 'كل بند يحتاج نصاً');
    end if;

    if exists (select 1 from jsonb_array_elements(p_options) o
                where coalesce(o->>'k', '') !~ '^[A-Za-z0-9_-]{1,16}$') then
      return jsonb_build_object('ok', false,
        'error', 'كل بندٍ يحتاج مفتاحاً ثابتاً (k) — حروفٌ وأرقامٌ إلى ستّةَ عشرَ محرفاً');
    end if;

    if (select count(distinct o->>'k') from jsonb_array_elements(p_options) o) <> v_pairs then
      return jsonb_build_object('ok', false,
        'error', 'مفتاحان متطابقان لبندين — والمفتاح يشير إلى واحدٍ لا إلى اثنين');
    end if;

    if exists (select 1 from jsonb_array_elements(p_options) o
                where coalesce(trim(o->>'dx'), '') <> '') then
      return jsonb_build_object('ok', false,
        'error', 'في المزاوجة الكودُ للاقتران لا للبند — ضعه في الأخطاء المتوقّعة: '
                 || '{ "مفتاح البند:مفتاح المقابل": "كود" }');
    end if;

    if not bank_keys_ok(p_bank) then
      return jsonb_build_object('ok', false,
        'error', 'عمود المقابلات: [ {"k":"مفتاح","t":"نصّ"}, … ] — '
              || 'بمفاتيحَ فريدةٍ ونصوصٍ غير فارغة، ويُستحبّ أن يزيد على البنود');
    end if;

    if match_pairs(p_accept) <> v_pairs then
      return jsonb_build_object('ok', false,
        'error', 'البنود ' || v_pairs || ' والمفاتيح ' || match_pairs(p_accept) ||
                 ' — { "pairs": { "مفتاح البند": "مفتاح المقابل" } }');
    end if;

    select p.key into v_bad
      from jsonb_each_text(p_accept -> 'pairs') p
     where not exists (select 1 from jsonb_array_elements(p_options) o
                        where o->>'k' = p.key) limit 1;
    if v_bad is not null then
      return jsonb_build_object('ok', false,
        'error', 'مفتاح بندٍ في المفاتيح لا وجود له بين البنود: ' || v_bad);
    end if;

    if not match_key_ok(p_accept, p_bank) then
      select p.value into v_bad
        from jsonb_each_text(p_accept -> 'pairs') p
       where coalesce(trim(p.value), '') = ''
          or not exists (select 1 from jsonb_array_elements(p_bank) b
                          where b->>'k' = p.value) limit 1;
      return jsonb_build_object('ok', false,
        'error', 'مقابلٌ ليس في القائمة: ' || coalesce(v_bad, '—') ||
                 ' — وبندُه لا يُصيبه أحد');
    end if;

    if p_wrong is not null then
      if jsonb_typeof(p_wrong) <> 'object' then
        return jsonb_build_object('ok', false,
          'error', 'الأخطاء المتوقّعة كائن: { "مفتاح البند:مفتاح المقابل": "كود" }');
      end if;

      select w.key into v_bad from jsonb_each(p_wrong) w
       where w.key !~ '^[A-Za-z0-9_-]{1,16}:[A-Za-z0-9_-]{1,16}$'
          or not exists (select 1 from jsonb_array_elements(p_options) o
                          where o->>'k' = split_part(w.key, ':', 1))
          or not exists (select 1 from jsonb_array_elements(p_bank) b
                          where b->>'k' = split_part(w.key, ':', 2))
       limit 1;
      if v_bad is not null then
        return jsonb_build_object('ok', false,
          'error', 'مفتاح الخلط «مفتاح البند:مفتاح المقابل» وطرفاه موجودان: ' || v_bad);
      end if;

      select w.value #>> '{}' into v_bad from jsonb_each(p_wrong) w
       where not exists (select 1 from dx_codes d where d.code = w.value #>> '{}')
       limit 1;
      if v_bad is not null then
        return jsonb_build_object('ok', false, 'error', 'كود تشخيص غير معروف: ' || v_bad);
      end if;
    end if;

    if coalesce(trim(p_explanation), '') = '' and not v_tierbank then
      return jsonb_build_object('ok', false,
        'error', 'شرح الخطأ مطلوب — الطالب يحتاج أن يعرف لماذا أخطأ');
    end if;

  else
    return jsonb_build_object('ok', false, 'error', 'نمط السؤال غير معروف: ' || coalesce(p_kind,'—'));
  end if;

  if p_id is null then
    insert into questions (quiz_id, position, kind, body, image_url, video_url, audio_url,
                           points, passage_id, objective_id, difficulty, lang, section)
    values (v_quizid, coalesce(p_position,0), p_kind, trim(p_body), p_image, p_video, p_audio,
            case when p_kind = 'matching' then v_pairs
                 when p_kind = 'judge'    then case when p_accept->>'mode' = 'two' then 2 else 1 end   -- 209
                 when p_kind = 'ordering' then jsonb_array_length(p_options) - 1   -- 210 · لكلّ رابطٍ نقطة
                 when p_kind = 'cloze'    then v_gaps      -- لكلّ فراغٍ درجة
                 else coalesce(p_points,1) end,
            p_passage, p_objective,
            coalesce(p_difficulty, 'medium'), coalesce(p_lang,'ar'),
            nullif(trim(coalesce(p_section,'')), ''))
    returning id into v_qid;
  else
    update questions set
      position = coalesce(p_position, position), kind = p_kind, body = trim(p_body),
      image_url = p_image, video_url = p_video, audio_url = p_audio,
      points = case when p_kind = 'matching' then v_pairs
                    when p_kind = 'judge'    then case when p_accept->>'mode' = 'two' then 2 else 1 end   -- 209
                 when p_kind = 'ordering' then jsonb_array_length(p_options) - 1   -- 210 · لكلّ رابطٍ نقطة
                 when p_kind = 'cloze'    then v_gaps
                    else coalesce(p_points, points) end,
      passage_id = p_passage,
      objective_id = p_objective, difficulty = coalesce(p_difficulty, difficulty),
      lang = coalesce(p_lang, lang),
      section = nullif(trim(coalesce(p_section,'')), '')
     where id = p_id
    returning id into v_qid;
    if v_qid is null then
      return jsonb_build_object('ok', false, 'error', 'السؤال غير موجود');
    end if;
    delete from question_keys where question_id = v_qid;
    delete from options       where question_id = v_qid;
  end if;

  if p_kind in ('mcq', 'msq', 'matching', 'sentence', 'judge', 'ordering') then
    for r in select o, ord from jsonb_array_elements(p_options) with ordinality as t(o, ord) loop
      insert into options (question_id, position, label, body, image_url, item_key)
      values (v_qid, r.ord,
              nullif(trim(coalesce(r.o->>'label', '')), ''),
              trim(r.o->>'body'), nullif(r.o->>'image', ''),
              case when p_kind in ('matching', 'judge') then r.o->>'k' end)
      returning id into v_oid;

      continue when p_kind in ('matching', 'ordering');   -- 210 · والترتيبُ مفتاحُه موضعُه

      if coalesce((r.o->>'correct')::boolean, false) then
        if p_kind in ('msq', 'sentence') then
          v_ids := v_ids || v_oid;
        else
          v_correct := v_oid;
        end if;
      else
        if coalesce(trim(r.o->>'dx'), '') <> '' then

          v_dx := v_dx || jsonb_build_object(v_oid::text, trim(r.o->>'dx'));

        end if;
      end if;
    end loop;
  end if;

  -- 208 · وجملةٌ صحيحةٌ واحدة مفتاحُها `correct_id` كالاختيار: `correct_ids` اثنان فأكثر (قيدُ المتعدّد)
  if p_kind = 'sentence' and coalesce(array_length(v_ids, 1), 0) = 1 then
    v_correct := v_ids[1];
    v_ids     := '{}'::bigint[];
  end if;

  insert into question_keys (question_id, correct_id, correct_ids,
                             explanation, model_answer, dx_map, accept, wrong_map, bank)
  values (v_qid, v_correct, nullif(v_ids, '{}'::bigint[]),
          nullif(trim(coalesce(p_explanation,'')), ''),
          nullif(trim(coalesce(p_model,'')), ''), v_dx,
          case when p_kind in ('gap','matching','cloze','judge') then p_accept end,
          case when p_kind in ('gap','matching','cloze') then p_wrong  end,
          case when p_kind in ('gap','matching','cloze') then p_bank   end)
  on conflict (question_id) do update
    set correct_id   = excluded.correct_id,
        correct_ids  = excluded.correct_ids,
        explanation  = excluded.explanation,
        model_answer = excluded.model_answer,
        dx_map       = excluded.dx_map,
        accept       = excluded.accept,
        wrong_map    = excluded.wrong_map,
        bank         = excluded.bank;

  update quizzes set question_count = (select count(*) from questions where quiz_id = v_quizid)
   where id = v_quizid;

  return jsonb_build_object(
    'ok', true, 'id', v_qid, 'kind', p_kind, 'gaps', v_gaps, 'pairs', v_pairs,
    'correct_n', coalesce(array_length(v_ids, 1), case when v_correct is null then 0 else 1 end),
    'dx_count', (select count(*) from jsonb_object_keys(v_dx)));
end $;


insert into public.sql_log (n, title, applied_at)
values ('221', 'توسيعُ مفاتيح الجمل في نمط الحكم ودليله ليتسع للروايات الطويلة (S1000 فأكثر)', now())
on conflict (n) do update set applied_at = now();
