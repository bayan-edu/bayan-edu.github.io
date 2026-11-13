-- ══════════════════════════════════════════════════════════
-- 208 · اختيارُ الجملة من النصّ — اختيارٌ من متعدّد خياراتُه جملُ النصّ نفسُها
--       (المرحلة ٧أ ① من `spec-reading-library.md` · ق١٦ · ١٣ نوفمبر ٢٠٢٦)
--
-- لماذا:
--   ① **قرارُ المالك (ق١٦):** «اختيارُ جملةٍ من النصّ يمكن أن يكون بشكل اختيارٍ من متعدّد» — وهو كذلك تقنيّاً: الجوابُ رقمُ
--      جملة، والمفتاحُ جملةٌ أو أكثر. فالنمطُ الجديد `sentence` **يسكن بناءَ الاختيار القائم كلَّه**: الجملُ صفوفٌ في `options`
--      بترتيب النصّ، والمفتاحُ `correct_ids` (أيُّها أصاب)، والجملةُ الخاطئة تحمل كودَ تشخيصها في `dx_map` كأيّ مشتّت —
--      **فتحليلُ الخيارات والتشخيصُ والمراجعةُ تعمل عليه بلا بناءٍ جديد.**
--   ② **والعرضُ نقرٌ في النصّ** (اختيارُ المالك) — في الواجهة. والقاعدةُ تضمن ما يجعله ممكناً: **الجملُ هي النصُّ نفسُه**
--      بترتيبه بلا حذفٍ ولا زيادة (المقارنةُ بلا مسافات: التقسيمُ لا يغيّر حرفاً). فإن حُرِّر النصُّ بعد تقسيمه افترقا —
--      **وحارسُ النشر يقول ذلك** (`quiz_readiness`) ولا يُنشر سؤالٌ ينقر الطالبُ فيه جملةً ليست في نصّه.
--   ③ **ولا خلطَ للجمل:** `get_quiz` تخلط خياراتِ `mcq` و`msq` وحدهما — والجملُ بترتيبها كما هي، فلم تُمسّ.
--   ④ **وحدودُه:** ثلاثُ جملٍ على الأقلّ (جملتان تُحسمان بالاستبعاد) · صحيحةٌ واحدةٌ أو أكثر · خاطئةٌ واحدةٌ على الأقلّ · وشرحٌ للخطأ.
--   ⑤ **ومفتاحُه في موضعين بحسب عدده:** جملةٌ واحدة في `correct_id` كالاختيار، وجملتان فأكثر في `correct_ids` كالمتعدّد — فقيدُ
--      `question_keys_correct_ids_chk` («اثنان فأكثر») يبقى حارسَ المتعدّد كما هو (قِيس في الجافّة: جملةٌ واحدة في `correct_ids` يردّها).
--      ⇒ كلُّ قارئٍ للمفتاح يقرأ الموضعين: التصحيحُ · المحرّرُ · النسخُ والإصدار · وحارسُ النشر.
--   ⑥ **ولم يدخل التدريبَ بعد** (`practice_snapshot_quiz` · `submit_practice_answer`): قائمتُه تُسقطه فلا يظهر فيه — صاخبٌ في
--      الوثيقة لا عطلٌ صامت، ويُضاف يومَ يُحتاج. **ولا الاستيراد** (`import_quiz`) — خطوةٌ تالية في ٧أ.
--
-- **قُرئت الحيّاتُ قبله (١٣ نوفمبر):** `save_question` · `submit_attempt` · `get_quiz` · `quiz_for_edit` · `quiz_readiness` ·
--   `duplicate_question` · `retire_question` · وقيدُ الأنماط. **وكلُّ رقعةٍ محروسةٌ بعدّ نصّها في الحيّة**، وتمضي إن وجدت أثرَها.
-- ══════════════════════════════════════════════════════════

-- ═══════════ معدَّلة: قيدُ الأنماط ═══════════

alter table public.questions drop constraint if exists questions_kind_check;
alter table public.questions add constraint questions_kind_check check (kind = any (array[
  'mcq', 'msq', 'gap', 'essay', 'audio', 'speaking', 'matching', 'ordering', 'truefalse', 'cloze', 'sentence']));

-- ═══════════ معدَّلة: الدوالّ — رُقعٌ بعدّ نصّها ═══════════

-- ① `save_question`: حدودُ اختيار الجملة · وحفظُه مع الاختيار (المفتاحُ `correct_ids` كالمتعدّد)
do $$
declare v text; n int;
        p_decl text := 'v_pairs int;';
        p_gap  text := 'elsif p_kind = ''gap'' then';
        p_kinds text := 'if p_kind in (''mcq'', ''msq'', ''matching'') then';
        p_keys text := 'insert into question_keys (question_id, correct_id, correct_ids,';
        norm   text := $n$-- 208 · وجملةٌ صحيحةٌ واحدة مفتاحُها `correct_id` كالاختيار: `correct_ids` اثنان فأكثر (قيدُ المتعدّد)
  if p_kind = 'sentence' and coalesce(array_length(v_ids, 1), 0) = 1 then
    v_correct := v_ids[1];
    v_ids     := '{}'::bigint[];
  end if;

  $n$;
        branch text := $b$elsif p_kind = 'sentence' then
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

    if coalesce(trim(p_explanation), '') = '' then
      return jsonb_build_object('ok', false,
        'error', 'شرح الخطأ مطلوب — الطالب يحتاج أن يعرف لماذا أخطأ');
    end if;

  $b$;
begin
  v := pg_get_functiondef('public.save_question(bigint,bigint,text,text,integer,jsonb,text,text,bigint,bigint,integer,text,text,text,text,text,text,jsonb,jsonb,jsonb)'::regprocedure);
  if position('p_kind = ''sentence''' in v) > 0 then raise notice 'save_question تعرف اختيارَ الجملة من قبل'; return; end if;

  n := (length(v) - length(replace(v, p_decl, ''))) / length(p_decl);
  if n <> 1 then raise exception 'save_question (التصريح): وُجد النصّ % مرّة لا مرّةً واحدة', n; end if;
  n := (length(v) - length(replace(v, p_gap, ''))) / length(p_gap);
  if n <> 1 then raise exception 'save_question (الفرع): وُجد النصّ % مرّة لا مرّةً واحدة', n; end if;
  n := (length(v) - length(replace(v, p_kinds, ''))) / length(p_kinds);
  if n <> 1 then raise exception 'save_question (الحفظ): وُجد النصّ % مرّة لا مرّةً واحدة', n; end if;
  -- «if p_kind = 'msq'» في حلقة الحفظ — لا «elsif» الحارس: قبلها مسافةٌ لا «s»
  n := (select count(*) from regexp_matches(v, '\sif p_kind = ''msq'' then', 'g'));
  if n <> 1 then raise exception 'save_question (المفتاح): وُجد النصّ % مرّة لا مرّةً واحدة', n; end if;
  n := (length(v) - length(replace(v, p_keys, ''))) / length(p_keys);
  if n <> 1 then raise exception 'save_question (الكتابة): وُجد النصّ % مرّة لا مرّةً واحدة', n; end if;

  v := replace(v, p_decl, p_decl || chr(10) || '  v_pbody text;          -- 208 · متنُ نصّ اختيار الجملة');
  v := replace(v, p_keys, norm || p_keys);
  v := replace(v, p_gap, branch || p_gap);
  v := replace(v, p_kinds, 'if p_kind in (''mcq'', ''msq'', ''matching'', ''sentence'') then');
  v := regexp_replace(v, '(\s)if p_kind = ''msq'' then', '\1if p_kind in (''msq'', ''sentence'') then');
  execute v;
end $$;

-- ② `submit_attempt`: الجملةُ تُصحَّح كالاختيار — صحيحةٌ إن كانت أيَّ جملةٍ في مفتاحها، والخاطئةُ تحمل كودَها
do $$
declare v text; n int;
        p1 text := 'if k.kind in (''mcq'', ''msq'', ''gap'', ''matching'', ''cloze'') then';
        p2 text := 'if k.kind = ''mcq'' then';
        p3 text := 'v_ok  := v_opt is not null and v_opt = k.correct_id;';
begin
  v := pg_get_functiondef('public.submit_attempt(bigint,jsonb,integer,boolean)'::regprocedure);
  if position('''sentence''' in v) > 0 then raise notice 'submit_attempt تعرف اختيارَ الجملة من قبل'; return; end if;
  n := (length(v) - length(replace(v, p1, ''))) / length(p1);
  if n <> 1 then raise exception 'submit_attempt (الأنماط): وُجد النصّ % مرّة لا مرّةً واحدة', n; end if;
  n := (length(v) - length(replace(v, p2, ''))) / length(p2);
  if n <> 1 then raise exception 'submit_attempt (الفرع): وُجد النصّ % مرّة لا مرّةً واحدة', n; end if;
  n := (length(v) - length(replace(v, p3, ''))) / length(p3);
  if n <> 1 then raise exception 'submit_attempt (الحكم): وُجد النصّ % مرّة لا مرّةً واحدة', n; end if;
  v := replace(v, p1, 'if k.kind in (''mcq'', ''msq'', ''gap'', ''matching'', ''cloze'', ''sentence'') then');
  v := replace(v, p2, 'if k.kind in (''mcq'', ''sentence'') then');
  v := replace(v, p3, 'v_ok  := v_opt is not null and (v_opt = k.correct_id'
       || ' or v_opt = any (coalesce(k.correct_ids, ''{}''::bigint[])));   -- 208 · والجملةُ أيُّ جملةٍ في مفتاحها');
  execute v;
end $$;

-- ③ `quiz_for_edit` · `duplicate_question` · `retire_question`: صوابُ الجملة من `correct_ids` كالمتعدّد
do $$
declare v text; n int; p text;
begin
  v := pg_get_functiondef('public.quiz_for_edit(bigint)'::regprocedure);
  p := '''correct'', case when x.kind = ''msq''';
  if position('''sentence''' in v) = 0 then
    n := (length(v) - length(replace(v, p, ''))) / length(p);
    if n <> 1 then raise exception 'quiz_for_edit: وُجد النصّ % مرّة لا مرّةً واحدة', n; end if;
    -- 208 · والجملةُ صحيحةٌ من الموضعين (⑤ في الرأس)
    execute replace(v, p, '''correct'', case when x.kind = ''sentence'' then (o.id is not distinct from k.correct_id'
                       || ' or coalesce(o.id = any (k.correct_ids), false)) when x.kind = ''msq''');
  end if;

  -- والنسخُ والإصدار: جملٌ صحيحةٌ متعدّدة (`correct_ids`) تُنسخ كالمتعدّد، والواحدةُ (`correct_id`) كالاختيار — الفرعُ القائم
  p := 'if v_kind = ''msq'' then';
  v := pg_get_functiondef('public.duplicate_question(bigint)'::regprocedure);
  if position('''sentence''' in v) = 0 then
    n := (length(v) - length(replace(v, p, ''))) / length(p);
    if n <> 1 then raise exception 'duplicate_question: وُجد النصّ % مرّة لا مرّةً واحدة', n; end if;
    execute replace(v, p, 'if v_kind = ''msq'' or (v_kind = ''sentence'' and v_oldids is not null) then   -- 208');
  end if;

  v := pg_get_functiondef('public.retire_question(bigint)'::regprocedure);
  if position('''sentence''' in v) = 0 then
    n := (length(v) - length(replace(v, p, ''))) / length(p);
    if n <> 1 then raise exception 'retire_question: وُجد النصّ % مرّة لا مرّةً واحدة', n; end if;
    execute replace(v, p, 'if v_kind = ''msq'' or (v_kind = ''sentence'' and v_oldids is not null) then   -- 208');
  end if;
end $$;

-- ④ `quiz_readiness`: يُعدّ موضوعيّاً · ويُحرس — بلا نصّ · جملٌ لا تطابق نصَّها · مفتاحٌ ناقص · كودٌ مجهول · بلا شرح
do $$
declare v text; n int; p_end text;
        p_kinds text := 'kind in (''mcq'',''msq'',''gap'',''matching'',''cloze'')';
        p_known text := 'kind not in (''mcq'',''msq'',''gap'',''essay'',''matching'',''cloze'')';
        p_decl  text := 'v_cloze int;';
        p_cnt   text := 'count(*) filter (where kind=''cloze'')';
        p_into  text := 'into v_mcq, v_msq, v_gap, v_essay, v_match, v_cloze from questions';
        p_sum   text := 'v_mcq + v_msq + v_gap + v_match + v_cloze';
        p_out   text := '''match'', v_match, ''cloze'', v_cloze, ''marks'', v_marks,';
        checks  text := $c$-- ─── 208 · اختيارُ الجملة (ق١٦) ───────────────────────────
  select count(*) into n from questions x
    left join passages pg on pg.id = x.passage_id
   where x.id = any(v_pool) and x.retired_at is null and x.kind='sentence'
     and coalesce(trim(pg.body), '') = '';
  if n > 0 then v_issues := v_issues || to_jsonb(n || ' سؤال اختيار جملة بلا نص مقروء'); end if;

  select count(*) into n from questions x
    join passages pg on pg.id = x.passage_id
   where x.id = any(v_pool) and x.retired_at is null and x.kind='sentence'
     and coalesce(trim(pg.body), '') <> ''
     and regexp_replace(pg.body, '\s', '', 'g') is distinct from
         regexp_replace(coalesce((select string_agg(o.body, '' order by o.position)
                                    from options o where o.question_id = x.id), ''), '\s', '', 'g');
  if n > 0 then
    v_issues := v_issues || to_jsonb(n || ' سؤال اختيار جملة جمله لا تطابق نصه — تغيّر النص بعد تقسيمه، فيُعاد التقسيم');
  end if;

  select count(*) into n from questions x
    left join question_keys k on k.question_id = x.id
   where x.id = any(v_pool) and x.retired_at is null and x.kind='sentence'
     and (coalesce(array_length(k.correct_ids, 1), 0) + (k.correct_id is not null)::int = 0
          or coalesce(array_length(k.correct_ids, 1), 0) + (k.correct_id is not null)::int >=
             (select count(*) from options o where o.question_id = x.id));
  if n > 0 then
    v_issues := v_issues || to_jsonb(n || ' سؤال اختيار جملة بلا جملة صحيحة أو بلا جملة خاطئة');
  end if;

  select count(*) into n from options o
    join questions x on x.id = o.question_id
    join question_keys k on k.question_id = x.id
   where x.id = any(v_pool) and x.retired_at is null and x.kind='sentence'
     and (k.dx_map ->> o.id::text) is not null
     and not exists (select 1 from dx_codes d where d.code = k.dx_map ->> o.id::text);
  if n > 0 then v_issues := v_issues || to_jsonb(n || ' كود تشخيص غير معروف'); end if;

  select count(*) into n from questions x
    join question_keys k on k.question_id = x.id
   where x.id = any(v_pool) and x.retired_at is null and x.kind='sentence'
     and coalesce(trim(k.explanation),'') = '';
  if n > 0 then v_issues := v_issues || to_jsonb(n || ' سؤال اختيار جملة بلا شرح للخطأ'); end if;

  $c$;
begin
  v := pg_get_functiondef('public.quiz_readiness(bigint)'::regprocedure);
  if position('''sentence''' in v) > 0 then raise notice 'quiz_readiness تعرف اختيارَ الجملة من قبل'; return; end if;

  n := (length(v) - length(replace(v, p_kinds, ''))) / length(p_kinds);
  if n <> 2 then raise exception 'quiz_readiness (الموضوعيّة): وُجد النصّ % مرّة لا مرّتين', n; end if;
  n := (length(v) - length(replace(v, p_known, ''))) / length(p_known);
  if n <> 1 then raise exception 'quiz_readiness (المعروفة): وُجد النصّ % مرّة لا مرّةً واحدة', n; end if;
  n := (length(v) - length(replace(v, p_decl, ''))) / length(p_decl);
  if n <> 1 then raise exception 'quiz_readiness (التصريح): وُجد النصّ % مرّة لا مرّةً واحدة', n; end if;
  n := (length(v) - length(replace(v, p_cnt, ''))) / length(p_cnt);
  if n <> 1 then raise exception 'quiz_readiness (العدّ): وُجد النصّ % مرّة لا مرّةً واحدة', n; end if;
  n := (length(v) - length(replace(v, p_into, ''))) / length(p_into);
  if n <> 1 then raise exception 'quiz_readiness (الحمل): وُجد النصّ % مرّة لا مرّةً واحدة', n; end if;
  n := (length(v) - length(replace(v, p_sum, ''))) / length(p_sum);
  if n <> 2 then raise exception 'quiz_readiness (المجموع): وُجد النصّ % مرّة لا مرّتين', n; end if;
  n := (length(v) - length(replace(v, p_out, ''))) / length(p_out);
  if n <> 1 then raise exception 'quiz_readiness (الردّ): وُجد النصّ % مرّة لا مرّةً واحدة', n; end if;
  n := (select count(*) from regexp_matches(v, 'return jsonb_build_object\(\s*''ok'', jsonb_array_length\(v_issues\) = 0,', 'g'));
  if n <> 1 then raise exception 'quiz_readiness (الختام): وُجد النصّ % مرّة لا مرّةً واحدة', n; end if;
  -- ⚠️ الإدراجُ بـ`replace` على النصّ المطابَق بعينه لا بـ`regexp_replace`: الفحوصُ فيها '\s'، و`\` في نصّ بديل التعبير
  --    النمطيّ له معنى (‹\1› · ‹\\›) — فقد يسقط فيصير ‹'s'› ويمحو حرفاً من كلّ نصّ.
  p_end := (regexp_match(v, '(return jsonb_build_object\(\s*''ok'', jsonb_array_length\(v_issues\) = 0,)'))[1];

  v := replace(v, p_kinds, 'kind in (''mcq'',''msq'',''gap'',''matching'',''cloze'',''sentence'')');
  v := replace(v, p_known, 'kind not in (''mcq'',''msq'',''gap'',''essay'',''matching'',''cloze'',''sentence'')');
  v := replace(v, p_decl, 'v_cloze int; v_sent int;   -- 208');
  v := replace(v, p_cnt, p_cnt || ',' || chr(10) || '         count(*) filter (where kind=''sentence'')');
  v := replace(v, p_into, 'into v_mcq, v_msq, v_gap, v_essay, v_match, v_cloze, v_sent from questions');
  v := replace(v, p_sum, p_sum || ' + v_sent');
  v := replace(v, p_out, p_out || ' ''sentence'', v_sent,');
  v := replace(v, p_end, checks || p_end);
  execute v;
end $$;

-- ═══════════ الختم ═══════════

insert into public.sql_log (n, title, applied_at)
values ('208', 'اختيارُ الجملة من النصّ — اختيارٌ من متعدّد خياراتُه جملُ النصّ نفسُها', now())
on conflict (n) do update set applied_at = now();
