-- ══════════════════════════════════════════════════════════
-- 210 · ترتيبُ الأحداث — يرتّب الطالبُ الأحداثَ، ولكلّ رابطٍ متتالٍ صحيحٍ نقطة
--       (المرحلة ٧أ ③ من `spec-reading-library.md` · ق١٦ · ١٣ نوفمبر ٢٠٢٦)
--
-- لماذا:
--   ① **النوعُ الجديدُ فعلاً في ق١٦** — «اختيارُ الجملة» و«الحكمُ ودليلُه» اختيارٌ في ثوبين، والترتيبُ ليس اختياراً.
--      والقيدُ يعرف `ordering` من قبل (قيدُ الأنماط الأوّل) ولا دالّةَ تعرفه — فيُبنى هنا بلا تغييرٍ في القيد.
--   ② **والدرجةُ جزئيّةٌ بالروابط المتتالية، كلُّ رابطٍ نقطة** (قرارا المالك · ق١٦): في ن أحداثٍ ن−١ رابطاً، والرابطُ «ب بعد أ
--      مباشرةً كما في المفتاح». فمن قدّم الحدثَ الأوّلَ إلى آخر السلسلة لم يخسر إلا رابطاً واحداً — **وهذا مقصود:** ما فهمه من
--      تتابع القصّة محسوب، وموضعٌ مطلقٌ واحدٌ خاطئ لا يُسقط السلسلةَ كلَّها. **ويمرّ بطريق الدرجة الجزئيّة القائم** (`hits` كالمزاوجة).
--   ③ **والمفتاحُ مواضعُ البنود نفسُها:** يكتب المؤلّفُ الأحداثَ بترتيبها الصحيح، فـ`options.position` هو الصواب — **لا مفتاحَ ثانٍ
--      يُحفظ ولا يختلف عن الأوّل بصمت.** ولا `item_key` (فلا يصل الطالبَ ما يدلّ)، والنسخُ والإصدارُ ينسخان المواضعَ بحرفها.
--      ⚠️ والمعرّفاتُ تُكتب بترتيب الحفظ فتتبع الصوابَ — من فتح أدوات المطوّر رآه. **وهي فتحةُ المزاوجة نفسِها** (مفتاحا البند
--      والمقابل يصلان معاً · 112)، فلا تُغلق هنا وحدها.
--   ④ **والجوابُ** `{q, seq: [معرّف، …]}` بترتيب الطالب. وما ليس من البند أو تكرّر يُسقَط، و`seq` غيرُ المصفوفة صفر — **لا يُسقط
--      المحاولةَ جوابٌ مشوَّه.** ولا كودَ تشخيص: الخطأُ في الموضع لا في الحدث، و`PART` («غطّت مطلباً واحداً») لا يصفه — فالمراجعةُ
--      تقول ما فعله الطالب: «روابط صحيحة ٣ من ٤».
--   ⑤ **والعرض:** الأحداثُ تصل مخلوطةً بالبذرة (150)، **ولا تصل بترتيبها الصحيح أبداً** — `ordering_pool` تقلب الخلطَ إن كانت روابطُه
--      الصحيحةُ أكثرَ من مقلوبه. فبثلاثة أحداثٍ كان سُدسُ الطلاب يرى الجوابَ مرتّباً أمامه، ولا يرتّب إلا من الأعلى إلى الأسفل.
--      **والطالبُ يبني ترتيبَه بالنقر لا بتحريك القائمة** — فلا يُحسب له ترتيبٌ لم يلمسه.
--   ⑥ **وحدودُه:** ثلاثةُ أحداثٍ إلى ثمانية (حدثان رابطٌ واحد يُخمَّن، وما فوق الثمانية عبءُ قراءة — كالمزاوجة) · لكلّ حدثٍ نصٌّ
--      ولا يتكرّر نصّان · لا كود · وشرحٌ للخطأ. **والنصُّ المشترك اختياريّ:** الترتيبُ يصلح لخطوات تجربةٍ كما لأحداث قصّة.
--   ⑦ **ولم يدخل التدريبَ ولا الاستيراد** — والاستيرادُ للثلاثة معاً بعده (قرارُ المالك).
--
-- **قُرئت الحيّاتُ قبله (١٣ نوفمبر):** `save_question` · `submit_attempt` · `get_quiz` · `quiz_readiness` · `quiz_for_edit` ·
--   `duplicate_question` · `retire_question`. **وكلُّ رقعةٍ محروسةٌ بعدّ نصّها في الحيّة.**
--   و`quiz_for_edit` و`duplicate_question` و`retire_question` لم تُمسّ: تقرأ الخياراتِ وتنسخها بمواضعها، ولا مفتاحَ غيرها.
-- ══════════════════════════════════════════════════════════

-- ═══════════ منشأة: خلطُ الأحداث ═══════════

-- الأحداثُ بخلط البذرة (كالخيارات · 150)، ويُقلب الخلطُ إن كانت روابطُه الصحيحةُ أكثرَ من مقلوبه ⇒ لا يصل الترتيبُ الصحيحُ أبداً،
-- وأكثرُ ما يصل نصفُ الروابط. داخليّة: من نادى بها ببذورٍ كثيرة استنتج المفتاح ⇒ لا تُمنح إلا لـ`get_quiz`.
create or replace function public.ordering_pool(p_q bigint, p_seed text)
returns bigint[]
language sql stable
set search_path = public
as $$
  with o as (select o.id, row_number() over (order by o.position, o.id) as rn
               from options o where o.question_id = p_q),
       s as (select o.id, o.rn, row_number() over (order by md5(p_seed || 'k' || o.id::text)) as i from o),
       f as (select count(*) filter (where b.rn = a.rn + 1) as fwd,
                    count(*) filter (where b.rn = a.rn - 1) as bwd
               from s a join s b on b.i = a.i + 1)
  select array_agg(s.id order by case when f.bwd < f.fwd then -s.i else s.i end)
    from s, f
$$;
revoke all on function public.ordering_pool(bigint, text) from public, anon, authenticated;

-- ═══════════ معدَّلة: الدوالّ — رُقعٌ بعدّ نصّها ═══════════

-- ① `save_question`: حدودُ الترتيب · والخياراتُ بلا مفتاحٍ ولا كود · والدرجةُ عددُ الروابط
do $$
declare v text; n int;
        p_gap   text := 'elsif p_kind = ''gap'' then';
        p_kinds text := 'if p_kind in (''mcq'', ''msq'', ''matching'', ''sentence'', ''judge'') then';
        p_cont  text := 'continue when p_kind = ''matching'';';
        p_pts   text := 'when p_kind = ''cloze''    then v_gaps';
        branch  text := $b$elsif p_kind = 'ordering' then
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

    if coalesce(trim(p_explanation), '') = '' then
      return jsonb_build_object('ok', false,
        'error', 'شرح الخطأ مطلوب — الطالب يحتاج أن يعرف لماذا أخطأ');
    end if;

  $b$;
begin
  v := pg_get_functiondef('public.save_question(bigint,bigint,text,text,integer,jsonb,text,text,bigint,bigint,integer,text,text,text,text,text,text,jsonb,jsonb,jsonb)'::regprocedure);
  if position('p_kind = ''ordering''' in v) > 0 then raise notice 'save_question تعرف الترتيبَ من قبل'; return; end if;

  n := (length(v) - length(replace(v, p_gap, ''))) / length(p_gap);
  if n <> 1 then raise exception 'save_question (الفرع): وُجد النصّ % مرّة لا مرّةً واحدة', n; end if;
  n := (length(v) - length(replace(v, p_kinds, ''))) / length(p_kinds);
  if n <> 1 then raise exception 'save_question (الحفظ): وُجد النصّ % مرّة لا مرّةً واحدة — يُطبَّق 209 أوّلاً', n; end if;
  n := (length(v) - length(replace(v, p_cont, ''))) / length(p_cont);
  if n <> 1 then raise exception 'save_question (بلا مفتاح): وُجد النصّ % مرّة لا مرّةً واحدة', n; end if;
  n := (length(v) - length(replace(v, p_pts, ''))) / length(p_pts);
  if n <> 2 then raise exception 'save_question (الدرجة): وُجد النصّ % مرّة لا مرّتين', n; end if;

  v := replace(v, p_gap, branch || p_gap);
  v := replace(v, p_kinds, 'if p_kind in (''mcq'', ''msq'', ''matching'', ''sentence'', ''judge'', ''ordering'') then');
  v := replace(v, p_cont, 'continue when p_kind in (''matching'', ''ordering'');   -- 210 · والترتيبُ مفتاحُه موضعُه');
  v := replace(v, p_pts, 'when p_kind = ''ordering'' then jsonb_array_length(p_options) - 1   -- 210 · لكلّ رابطٍ نقطة'
                         || chr(10) || '                 ' || p_pts);
  execute v;
end $$;

-- ② `submit_attempt`: الترتيبُ في `seq` · ولكلّ رابطٍ متتالٍ صحيحٍ نقطة · والمراجعةُ تحمل الترتيبَ الصحيح
do $$
declare v text; n int;
        p_decl  text := 'v_j bigint; v_jk text; v_sk text; v_keyed bool; v_sup bool; v_pts int;   -- 209 · الحكمُ ودليلُه';
        p_kinds text := 'if k.kind in (''mcq'', ''msq'', ''gap'', ''matching'', ''cloze'', ''sentence'', ''judge'') then';
        p_gap   text := 'elsif k.kind = ''gap'' then';
        p_hits  text := 'if k.kind in (''matching'', ''cloze'', ''judge'') then';
        p_acc   text := '''accept'', case when q.kind = ''judge'' then qk.accept';
        p_essay text := '''essay'', case when q.kind in (''gap'',''matching'',''cloze'') then null';
        branch  text := $b$elsif k.kind = 'ordering' then
        -- 210 · ترتيبُ الطالب في `seq` معرّفاتٍ، والصوابُ مواضعُ البنود: الرابطُ صحيحٌ إن جاء «ب» بعد «أ» مباشرةً كما في المفتاح.
        --       وما ليس من البند أو تكرّر يُسقَط (أوّلُ ظهورٍ يبقى)، و`seq` غيرُ المصفوفة صفر.
        select coalesce(array_agg(x.id order by x.ord), '{}'::bigint[]) into v_seq
          from (select distinct on (o.id) o.id, t.ord
                  from jsonb_array_elements_text(case when jsonb_typeof(a->'seq') = 'array'
                                                      then a->'seq' else '[]'::jsonb end) with ordinality as t(e, ord)
                  join options o on o.question_id = v_q and o.id::text = t.e
                 order by o.id, t.ord) x;
        select count(*) into v_pts
          from unnest(v_seq[1:cardinality(v_seq) - 1], v_seq[2:cardinality(v_seq)]) as l(a1, b1)
          join options oa on oa.id = l.a1
          join options ob on ob.id = l.b1
         where ob.position = (select min(x.position) from options x
                               where x.question_id = v_q and x.position > oa.position);
        v_ok   := v_pts > 0 and v_pts = (select count(*) from options o where o.question_id = v_q) - 1;
        v_g    := jsonb_build_object('hits', v_pts);
        v_txt  := (select string_agg(o.body, ' | ' order by t.i)
                     from unnest(v_seq) with ordinality as t(id, i) join options o on o.id = t.id);
        v_meta := jsonb_build_object('given', to_jsonb(v_seq), 'order', jsonb_build_object('hits', v_pts));

      $b$;
begin
  v := pg_get_functiondef('public.submit_attempt(bigint,jsonb,integer,boolean)'::regprocedure);
  if position('''ordering''' in v) > 0 then raise notice 'submit_attempt تعرف الترتيبَ من قبل'; return; end if;
  n := (length(v) - length(replace(v, p_decl, ''))) / length(p_decl);
  if n <> 1 then raise exception 'submit_attempt (التصريح): وُجد النصّ % مرّة لا مرّةً واحدة — يُطبَّق 209 أوّلاً', n; end if;
  n := (length(v) - length(replace(v, p_kinds, ''))) / length(p_kinds);
  if n <> 1 then raise exception 'submit_attempt (الأنماط): وُجد النصّ % مرّة لا مرّةً واحدة', n; end if;
  n := (length(v) - length(replace(v, p_gap, ''))) / length(p_gap);
  if n <> 1 then raise exception 'submit_attempt (الفرع): وُجد النصّ % مرّة لا مرّةً واحدة', n; end if;
  n := (length(v) - length(replace(v, p_hits, ''))) / length(p_hits);
  if n <> 1 then raise exception 'submit_attempt (الدرجة): وُجد النصّ % مرّة لا مرّةً واحدة', n; end if;
  n := (length(v) - length(replace(v, p_acc, ''))) / length(p_acc);
  if n <> 1 then raise exception 'submit_attempt (المراجعة): وُجد النصّ % مرّة لا مرّةً واحدة', n; end if;
  n := (length(v) - length(replace(v, p_essay, ''))) / length(p_essay);
  if n <> 1 then raise exception 'submit_attempt (النصّ المقروء): وُجد النصّ % مرّة لا مرّةً واحدة', n; end if;

  v := replace(v, p_decl, p_decl || chr(10) || '  v_seq bigint[];   -- 210 · ترتيبُ الطالب');
  v := replace(v, p_kinds, 'if k.kind in (''mcq'', ''msq'', ''gap'', ''matching'', ''cloze'', ''sentence'', ''judge'', ''ordering'') then');
  v := replace(v, p_gap, branch || p_gap);
  v := replace(v, p_hits, 'if k.kind in (''matching'', ''cloze'', ''judge'', ''ordering'') then');
  v := replace(v, p_acc, '''accept'', case when q.kind = ''ordering'' then (select jsonb_agg(o.id order by o.position)'
                         || ' from options o where o.question_id = q.id)   -- 210 · الترتيبُ الصحيح'
                         || chr(10) || '                       when q.kind = ''judge'' then qk.accept');
  v := replace(v, p_essay, '''essay'', case when q.kind in (''gap'',''matching'',''cloze'',''ordering'') then null');
  execute v;
end $$;

-- ③ `get_quiz`: الأحداثُ بخلطٍ لا يُظهر الترتيبَ الصحيح
do $$
declare v text; n int;
        p text := 'order by case when x.kind = ''judge'' then (o.item_key like ''S%'') end,';
begin
  v := pg_get_functiondef('public.get_quiz(bigint)'::regprocedure);
  if position('ordering_pool' in v) > 0 then raise notice 'get_quiz تخلط الأحداثَ من قبل'; return; end if;
  n := (length(v) - length(replace(v, p, ''))) / length(p);
  if n <> 1 then raise exception 'get_quiz: وُجد النصّ % مرّة لا مرّةً واحدة — يُطبَّق 209 أوّلاً', n; end if;
  execute replace(v, p,
    'order by case when x.kind = ''ordering'' then array_position(ordering_pool(x.id, v_seed), o.id) end,   -- 210 · لا يصل الترتيبُ الصحيح'
    || chr(10) || '                          case when x.kind = ''judge'' then (o.item_key like ''S%'') end,');
end $$;

-- ④ `quiz_readiness`: الترتيبُ موضوعيٌّ معدود · وحدودُه محروسة
do $$
declare v text; n int; p_end text;
        p_kinds text := 'kind in (''mcq'',''msq'',''gap'',''matching'',''cloze'',''sentence'',''judge'')';
        p_known text := 'kind not in (''mcq'',''msq'',''gap'',''essay'',''matching'',''cloze'',''sentence'',''judge'')';
        p_decl  text := 'v_sent int; v_judge int;';
        p_cnt   text := 'count(*) filter (where kind=''judge'')';
        p_into  text := 'into v_mcq, v_msq, v_gap, v_essay, v_match, v_cloze, v_sent, v_judge from questions';
        p_sum   text := 'v_mcq + v_msq + v_gap + v_match + v_cloze + v_sent + v_judge';
        p_out   text := '''judge'', v_judge,';
        checks  text := $c$-- ─── 210 · ترتيبُ الأحداث (ق١٦) ───────────────────────────
  select count(*) into n from questions x
   where x.id = any(v_pool) and x.retired_at is null and x.kind='ordering'
     and (select count(*) from options o where o.question_id = x.id) not between 3 and 8;
  if n > 0 then v_issues := v_issues || to_jsonb(n || ' سؤال ترتيب أحداثه أقل من ثلاثة أو أكثر من ثمانية'); end if;

  select count(*) into n from questions x
   where x.id = any(v_pool) and x.retired_at is null and x.kind='ordering'
     and (select count(distinct lower(regexp_replace(trim(o.body), '\s+', ' ', 'g'))) from options o where o.question_id = x.id)
         <> (select count(*) from options o where o.question_id = x.id);
  if n > 0 then v_issues := v_issues || to_jsonb(n || ' سؤال ترتيب فيه حدثان بنص واحد'); end if;

  select count(*) into n from questions x
    left join question_keys k on k.question_id = x.id
   where x.id = any(v_pool) and x.retired_at is null and x.kind='ordering'
     and coalesce(trim(k.explanation),'') = '';
  if n > 0 then v_issues := v_issues || to_jsonb(n || ' سؤال ترتيب بلا شرح للخطأ'); end if;

  $c$;
begin
  v := pg_get_functiondef('public.quiz_readiness(bigint)'::regprocedure);
  if position('''ordering''' in v) > 0 then raise notice 'quiz_readiness تعرف الترتيبَ من قبل'; return; end if;

  n := (length(v) - length(replace(v, p_kinds, ''))) / length(p_kinds);
  if n <> 2 then raise exception 'quiz_readiness (الموضوعيّة): وُجد النصّ % مرّة لا مرّتين — يُطبَّق 209 أوّلاً', n; end if;
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
  p_end := (regexp_match(v, '(return jsonb_build_object\(\s*''ok'', jsonb_array_length\(v_issues\) = 0,)'))[1];

  v := replace(v, p_kinds, 'kind in (''mcq'',''msq'',''gap'',''matching'',''cloze'',''sentence'',''judge'',''ordering'')');
  v := replace(v, p_known, 'kind not in (''mcq'',''msq'',''gap'',''essay'',''matching'',''cloze'',''sentence'',''judge'',''ordering'')');
  v := replace(v, p_decl, 'v_sent int; v_judge int; v_ord int;   -- 210');
  v := replace(v, p_cnt, p_cnt || ',' || chr(10) || '         count(*) filter (where kind=''ordering'')');
  v := replace(v, p_into, 'into v_mcq, v_msq, v_gap, v_essay, v_match, v_cloze, v_sent, v_judge, v_ord from questions');
  v := replace(v, p_sum, p_sum || ' + v_ord');
  v := replace(v, p_out, p_out || ' ''ordering'', v_ord,');
  v := replace(v, p_end, checks || p_end);
  execute v;
end $$;

insert into public.sql_log (n, title, applied_at)
values ('210', 'ترتيبُ الأحداث — يرتّب الطالبُ الأحداثَ، ولكلّ رابطٍ متتالٍ صحيحٍ نقطة', now())
on conflict (n) do update set applied_at = now();
