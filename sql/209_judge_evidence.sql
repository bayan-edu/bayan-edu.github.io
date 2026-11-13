-- ══════════════════════════════════════════════════════════
-- 209 · حكمٌ ودليلُه — بندٌ واحدٌ بمرحلتين: حكمٌ يُختار، ثمّ جملةٌ من النصّ تدلّ عليه
--       (المرحلة ٧أ ② من `spec-reading-library.md` · ق١٦ · ١٣ نوفمبر ٢٠٢٦)
--
-- لماذا:
--   ① **«حكمٌ ودليلُه» و«بجزأين» صيغتان لبندٍ واحد** (ق١٦ · `test-blueprint.md` §3.5): الحكمُ ثمّ الجملةُ الدالّة عليه.
--      **ولا سؤالان مستقلّان:** صحّةُ الدليل تتوقّف على الحكم المختار، والمفتاحُ «كلُّ حكمٍ يُدافَع عنه ⇐ جملُه» — فلا «رأيَ
--      صحيحٌ سرّيّ». فنمطٌ واحد `judge` بإعدادٍ في المفتاح: `mode = 'two'` (٠–٢) أو `'point'` (٠/١ — لا نقطةَ إلا بالاثنين).
--   ② **ويسكن بناءَ الاختيار** كـ`sentence` (208): الأحكامُ والجملُ صفوفٌ في `options` **بمفتاحٍ ثابت** (`item_key`): `J1…` للأحكام
--      و`S1…` للجمل بترتيب النصّ. **والمفتاحُ بالمفاتيح لا بالمعرّفات** — `accept = {mode, map: {"J1": ["S5"], …}}` — فيعبر النسخَ
--      والإصدارَ كما هو (`duplicate_question` · `retire_question` تنسخان `item_key` و`accept` بحرفهما)، كما تعبره المزاوجة (112).
--      ⚠️ و`accept` يقبله قيدُه: `question_keys_accept_chk` لا يُقيّد إلا `slots` و`pairs` مصفوفتين، والكائنُ بلاهما يمرّ (قِيس).
--   ③ **والتصحيح:** «بجزأين» ٢ لحكمٍ مقبولٍ بجملته · ١ لحكمٍ مقبولٍ بجملةٍ لا تدعمه · ٠ لحكمٍ لا يدعمه النصّ — و«حكمٌ ودليلُه» ١ للاثنين
--      وإلّا صفر. **ويمرّ بطريق الدرجة الجزئيّة القائم** (`hits` كالمزاوجة) — والسؤالُ «صحيحٌ» حين نال كاملَ درجته.
--      **والكود:** حكمٌ لا يدعمه النصّ ⇐ كودُ الحكم · وحكمٌ مقبولٌ بجملةٍ لا تدعمه ⇐ كودُ الجملة — كلٌّ في `dx_map` كأيّ مشتّت.
--   ④ **والجوابُ** `{q, j, o}`: الحكمُ في `meta` والجملةُ في `option_id` — فتحليلُ الجمل كتحليل الخيارات.
--   ⑤ **والعرض:** الأحكامُ تُخلط كخيارات الاختيار (`get_quiz` · 150 — موضعُ الصواب الثابت يُقاس بدل المفهوم)، والجملُ بترتيب النصّ بعدها.
--   ⑥ **وحدودُه:** نصٌّ مشترك بمتن · حكمان فأكثر، منهما مقبولٌ واحدٌ على الأقلّ ومرفوضٌ واحد (وإلّا صار الجزءُ الأوّل هبة) · ثلاثُ جملٍ
--      فأكثر هي النصُّ نفسُه بلا مسافات · لكلّ حكمٍ مقبولٍ جملةٌ تدلّ عليه · لا كودَ على حكمٍ مقبول · وشرحٌ للخطأ.
--   ⑦ **ولم يدخل التدريبَ ولا الاستيراد** — كأخيه `sentence`، ويُبنى الاستيرادُ للثلاثة معاً بعد الترتيب (قرارُ المالك).
--
-- **قُرئت الحيّاتُ قبله (١٣ نوفمبر):** `save_question` · `submit_attempt` · `get_quiz` · `quiz_for_edit` · `quiz_readiness` ·
--   `duplicate_question` · `retire_question` · وقيودُ `question_keys`. **وكلُّ رقعةٍ محروسةٌ بعدّ نصّها في الحيّة.**
-- ══════════════════════════════════════════════════════════

-- ═══════════ معدَّلة: قيدُ الأنماط ═══════════

alter table public.questions drop constraint if exists questions_kind_check;
alter table public.questions add constraint questions_kind_check check (kind = any (array[
  'mcq', 'msq', 'gap', 'essay', 'audio', 'speaking', 'matching', 'ordering', 'truefalse', 'cloze', 'sentence', 'judge']));

-- ═══════════ معدَّلة: الدوالّ — رُقعٌ بعدّ نصّها ═══════════

-- ① `save_question`: حدودُ الحكم ودليله · وحفظُه بمفاتيح ثابتة ودرجةٍ من إعداده
do $$
declare v text; n int;
        p_gap   text := 'elsif p_kind = ''gap'' then';
        p_kinds text := 'if p_kind in (''mcq'', ''msq'', ''matching'', ''sentence'') then';
        p_ikey  text := 'case when p_kind = ''matching'' then r.o->>''k'' end';
        p_acc   text := 'case when p_kind in (''gap'',''matching'',''cloze'') then p_accept end';
        p_pts   text := 'when p_kind = ''cloze''    then v_gaps';
        branch  text := $b$elsif p_kind = 'judge' then
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
                where coalesce(o->>'k', '') !~ '^[JS][0-9]{1,3}$') then
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

    if coalesce(trim(p_explanation), '') = '' then
      return jsonb_build_object('ok', false,
        'error', 'شرح الخطأ مطلوب — الطالب يحتاج أن يعرف لماذا أخطأ');
    end if;

  $b$;
begin
  v := pg_get_functiondef('public.save_question(bigint,bigint,text,text,integer,jsonb,text,text,bigint,bigint,integer,text,text,text,text,text,text,jsonb,jsonb,jsonb)'::regprocedure);
  if position('p_kind = ''judge''' in v) > 0 then raise notice 'save_question تعرف الحكمَ ودليلَه من قبل'; return; end if;

  n := (length(v) - length(replace(v, p_gap, ''))) / length(p_gap);
  if n <> 1 then raise exception 'save_question (الفرع): وُجد النصّ % مرّة لا مرّةً واحدة', n; end if;
  n := (length(v) - length(replace(v, p_kinds, ''))) / length(p_kinds);
  if n <> 1 then raise exception 'save_question (الحفظ): وُجد النصّ % مرّة لا مرّةً واحدة', n; end if;
  n := (length(v) - length(replace(v, p_ikey, ''))) / length(p_ikey);
  if n <> 1 then raise exception 'save_question (المفتاح الثابت): وُجد النصّ % مرّة لا مرّةً واحدة', n; end if;
  n := (length(v) - length(replace(v, p_acc, ''))) / length(p_acc);
  if n <> 1 then raise exception 'save_question (accept): وُجد النصّ % مرّة لا مرّةً واحدة', n; end if;
  n := (length(v) - length(replace(v, p_pts, ''))) / length(p_pts);
  if n <> 2 then raise exception 'save_question (الدرجة): وُجد النصّ % مرّة لا مرّتين', n; end if;
  if position('v_pbody text;' in v) = 0 then raise exception 'save_question: `v_pbody` غائب — يُطبَّق 208 أوّلاً'; end if;

  v := replace(v, p_gap, branch || p_gap);
  v := replace(v, p_kinds, 'if p_kind in (''mcq'', ''msq'', ''matching'', ''sentence'', ''judge'') then');
  v := replace(v, p_ikey, 'case when p_kind in (''matching'', ''judge'') then r.o->>''k'' end');
  v := replace(v, p_acc, 'case when p_kind in (''gap'',''matching'',''cloze'',''judge'') then p_accept end');
  v := replace(v, p_pts, 'when p_kind = ''judge''    then case when p_accept->>''mode'' = ''two'' then 2 else 1 end   -- 209'
                         || chr(10) || '                 ' || p_pts);
  execute v;
end $$;

-- ② `submit_attempt`: الحكمُ ودليلُه بدرجته — بطريق الدرجة الجزئيّة القائم (`hits`)
do $$
declare v text; n int;
        p_decl  text := 'v_txt text; v_given jsonb; v_g jsonb;';
        p_kinds text := 'if k.kind in (''mcq'', ''msq'', ''gap'', ''matching'', ''cloze'', ''sentence'') then';
        p_gap   text := 'elsif k.kind = ''gap'' then';
        p_hits  text := 'if k.kind in (''matching'', ''cloze'') then';
        p_acc   text := '''accept'', case when q.kind = ''gap'' then qk.accept -> ''slots''';
        branch  text := $b$elsif k.kind = 'judge' then
        -- 209 · الحكمُ في `j` والدليلُ في `o` — والمفتاحُ بالمفاتيح الثابتة (J… ⇐ S…)
        v_opt := nullif(a->>'o', '')::bigint;
        v_j   := nullif(a->>'j', '')::bigint;
        select o.item_key into v_jk from options o where o.id = v_j   and o.question_id = v_q and o.item_key like 'J%';
        select o.item_key into v_sk from options o where o.id = v_opt and o.question_id = v_q and o.item_key like 'S%';
        if v_sk is null then v_opt := null; end if;            -- جملةٌ ليست من البند لا تُكتب في option_id
        v_keyed := v_jk is not null and coalesce((k.accept -> 'map') ? v_jk, false);
        v_sup   := v_keyed and v_sk is not null and coalesce((k.accept -> 'map' -> v_jk) ? v_sk, false);
        v_pts   := case when k.accept->>'mode' = 'two'
                        then case when v_sup then 2 when v_keyed then 1 else 0 end
                        else case when v_sup then 1 else 0 end end;
        v_ok    := v_sup;
        v_g     := jsonb_build_object('hits', v_pts);
        if v_jk is not null and not v_keyed then
          v_dx := k.dx_map ->> v_j::text;                       -- حكمٌ لا يدعمه النصّ
        elsif v_keyed and not v_sup and v_opt is not null then
          v_dx := k.dx_map ->> v_opt::text;                     -- حكمٌ مقبولٌ بجملةٍ لا تدعمه
        end if;
        v_meta := jsonb_build_object(
          'given', jsonb_build_object('j', v_j, 'o', v_opt, 'score', v_pts),
          'judge', jsonb_build_object('keyed', v_keyed, 'supported', v_sup));

      $b$;
begin
  v := pg_get_functiondef('public.submit_attempt(bigint,jsonb,integer,boolean)'::regprocedure);
  if position('''judge''' in v) > 0 then raise notice 'submit_attempt تعرف الحكمَ ودليلَه من قبل'; return; end if;
  n := (length(v) - length(replace(v, p_decl, ''))) / length(p_decl);
  if n <> 1 then raise exception 'submit_attempt (التصريح): وُجد النصّ % مرّة لا مرّةً واحدة', n; end if;
  n := (length(v) - length(replace(v, p_kinds, ''))) / length(p_kinds);
  if n <> 1 then raise exception 'submit_attempt (الأنماط): وُجد النصّ % مرّة لا مرّةً واحدة — يُطبَّق 208 أوّلاً', n; end if;
  n := (length(v) - length(replace(v, p_gap, ''))) / length(p_gap);
  if n <> 1 then raise exception 'submit_attempt (الفرع): وُجد النصّ % مرّة لا مرّةً واحدة', n; end if;
  n := (length(v) - length(replace(v, p_hits, ''))) / length(p_hits);
  if n <> 1 then raise exception 'submit_attempt (الدرجة): وُجد النصّ % مرّة لا مرّةً واحدة', n; end if;
  n := (length(v) - length(replace(v, p_acc, ''))) / length(p_acc);
  if n <> 1 then raise exception 'submit_attempt (المراجعة): وُجد النصّ % مرّة لا مرّةً واحدة', n; end if;

  v := replace(v, p_decl, p_decl || chr(10)
       || '  v_j bigint; v_jk text; v_sk text; v_keyed bool; v_sup bool; v_pts int;   -- 209 · الحكمُ ودليلُه');
  v := replace(v, p_kinds, 'if k.kind in (''mcq'', ''msq'', ''gap'', ''matching'', ''cloze'', ''sentence'', ''judge'') then');
  v := replace(v, p_gap, branch || p_gap);
  v := replace(v, p_hits, 'if k.kind in (''matching'', ''cloze'', ''judge'') then');
  -- والمراجعةُ تحمل المفتاحَ كلَّه بعد التسليم: أيُّ الأحكام مقبولٌ وبأيّ جمله — والطالبُ يرى الصوابَ في كلّ نمط
  v := replace(v, p_acc, '''accept'', case when q.kind = ''judge'' then qk.accept when q.kind = ''gap'' then qk.accept -> ''slots''');
  execute v;
end $$;

-- ③ `get_quiz`: الأحكامُ تُخلط كخيارات الاختيار، والجملُ بعدها بترتيب النصّ
do $$
declare v text; n int;
        p text := 'order by case when x.kind in (''mcq'', ''msq'')';
begin
  v := pg_get_functiondef('public.get_quiz(bigint)'::regprocedure);
  if position('''judge''' in v) > 0 then raise notice 'get_quiz تعرف الحكمَ ودليلَه من قبل'; return; end if;
  n := (length(v) - length(replace(v, p, ''))) / length(p);
  if n <> 1 then raise exception 'get_quiz: وُجد النصّ % مرّة لا مرّةً واحدة', n; end if;
  execute replace(v, p,
    'order by case when x.kind = ''judge'' then (o.item_key like ''S%'') end,   -- 209 · الأحكامُ ثمّ الجمل'
    || chr(10) || '                          case when (x.kind in (''mcq'', ''msq'') or (x.kind = ''judge'' and o.item_key like ''J%''))');
end $$;

-- ④ `quiz_readiness`: يُعدّ موضوعيّاً · ويُحرس — بلا نصّ · جملٌ لا تطابقه · مفتاحٌ ناقص أو بلا مرفوض · كودٌ مجهول · بلا شرح
do $$
declare v text; n int; p_end text;
        p_kinds text := 'kind in (''mcq'',''msq'',''gap'',''matching'',''cloze'',''sentence'')';
        p_known text := 'kind not in (''mcq'',''msq'',''gap'',''essay'',''matching'',''cloze'',''sentence'')';
        p_decl  text := 'v_cloze int; v_sent int;';
        p_cnt   text := 'count(*) filter (where kind=''sentence'')';
        p_into  text := 'into v_mcq, v_msq, v_gap, v_essay, v_match, v_cloze, v_sent from questions';
        p_sum   text := 'v_mcq + v_msq + v_gap + v_match + v_cloze + v_sent';
        p_out   text := '''sentence'', v_sent,';
        checks  text := $c$-- ─── 209 · الحكمُ ودليلُه (ق١٦) ────────────────────────────
  select count(*) into n from questions x
    left join passages pg on pg.id = x.passage_id
   where x.id = any(v_pool) and x.retired_at is null and x.kind='judge'
     and coalesce(trim(pg.body), '') = '';
  if n > 0 then v_issues := v_issues || to_jsonb(n || ' سؤال حكم ودليله بلا نص مقروء'); end if;

  select count(*) into n from questions x
    join passages pg on pg.id = x.passage_id
   where x.id = any(v_pool) and x.retired_at is null and x.kind='judge'
     and coalesce(trim(pg.body), '') <> ''
     and regexp_replace(pg.body, '\s', '', 'g') is distinct from
         regexp_replace(coalesce((select string_agg(o.body, '' order by o.position)
                                    from options o where o.question_id = x.id and o.item_key like 'S%'), ''), '\s', '', 'g');
  if n > 0 then
    v_issues := v_issues || to_jsonb(n || ' سؤال حكم ودليله جمله لا تطابق نصه — تغيّر النص بعد تقسيمه، فيُعاد التقسيم');
  end if;

  select count(*) into n from questions x
    left join question_keys k on k.question_id = x.id
   where x.id = any(v_pool) and x.retired_at is null and x.kind='judge'
     and (coalesce(k.accept->>'mode', '') not in ('two', 'point')
          or jsonb_typeof(k.accept -> 'map') is distinct from 'object'
          or not exists (select 1 from jsonb_each(k.accept -> 'map'))
          or (select count(*) from jsonb_each(k.accept -> 'map'))
             >= (select count(*) from options o where o.question_id = x.id and o.item_key like 'J%')
          or exists (select 1 from jsonb_each(k.accept -> 'map') m
                      where jsonb_typeof(m.value) <> 'array' or jsonb_array_length(m.value) = 0
                         or not exists (select 1 from options o where o.question_id = x.id and o.item_key = m.key)
                         or exists (select 1 from jsonb_array_elements_text(m.value) s
                                     where not exists (select 1 from options o
                                                        where o.question_id = x.id and o.item_key = s))));
  if n > 0 then
    v_issues := v_issues || to_jsonb(n || ' سؤال حكم ودليله مفتاحه ناقص — حكم مقبول بدليله، وحكم مرفوض واحد على الأقل');
  end if;

  select count(*) into n from options o
    join questions x on x.id = o.question_id
    join question_keys k on k.question_id = x.id
   where x.id = any(v_pool) and x.retired_at is null and x.kind='judge'
     and (k.dx_map ->> o.id::text) is not null
     and not exists (select 1 from dx_codes d where d.code = k.dx_map ->> o.id::text);
  if n > 0 then v_issues := v_issues || to_jsonb(n || ' كود تشخيص غير معروف'); end if;

  select count(*) into n from questions x
    join question_keys k on k.question_id = x.id
   where x.id = any(v_pool) and x.retired_at is null and x.kind='judge'
     and coalesce(trim(k.explanation),'') = '';
  if n > 0 then v_issues := v_issues || to_jsonb(n || ' سؤال حكم ودليله بلا شرح للخطأ'); end if;

  $c$;
begin
  v := pg_get_functiondef('public.quiz_readiness(bigint)'::regprocedure);
  if position('''judge''' in v) > 0 then raise notice 'quiz_readiness تعرف الحكمَ ودليلَه من قبل'; return; end if;

  n := (length(v) - length(replace(v, p_kinds, ''))) / length(p_kinds);
  if n <> 2 then raise exception 'quiz_readiness (الموضوعيّة): وُجد النصّ % مرّة لا مرّتين — يُطبَّق 208 أوّلاً', n; end if;
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
  -- ⚠️ بـ`replace` على النصّ المطابَق لا بـ`regexp_replace` — الفحوصُ فيها '\s' (رأسُ 208)
  p_end := (regexp_match(v, '(return jsonb_build_object\(\s*''ok'', jsonb_array_length\(v_issues\) = 0,)'))[1];

  v := replace(v, p_kinds, 'kind in (''mcq'',''msq'',''gap'',''matching'',''cloze'',''sentence'',''judge'')');
  v := replace(v, p_known, 'kind not in (''mcq'',''msq'',''gap'',''essay'',''matching'',''cloze'',''sentence'',''judge'')');
  v := replace(v, p_decl, 'v_cloze int; v_sent int; v_judge int;   -- 209');
  v := replace(v, p_cnt, p_cnt || ',' || chr(10) || '         count(*) filter (where kind=''judge'')');
  v := replace(v, p_into, 'into v_mcq, v_msq, v_gap, v_essay, v_match, v_cloze, v_sent, v_judge from questions');
  v := replace(v, p_sum, p_sum || ' + v_judge');
  v := replace(v, p_out, p_out || ' ''judge'', v_judge,');
  v := replace(v, p_end, checks || p_end);
  execute v;
end $$;

-- ═══════════ الختم ═══════════

insert into public.sql_log (n, title, applied_at)
values ('209', 'حكمٌ ودليلُه — بندٌ واحدٌ بمرحلتين: حكمٌ يُختار، ثمّ جملةٌ من النصّ تدلّ عليه', now())
on conflict (n) do update set applied_at = now();
