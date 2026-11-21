-- ══════════════════════════════════════════════════════════
-- 223 · في المكتبة تُحدَّد الجملةُ في فقرة الجواب — سبعُ جملٍ حدّاً أعلى (ق٢٠ من `spec-reading-library.md` · ٢٠ نوفمبر ٢٠٢٦)
--
-- لماذا:
--   ① **قرارُ المالك (ق٢٠ · المُقرّ):** «ما نقرّه هنا ينطبق على المكتبة فقط. جيد، الفقرة التي بها الجواب وبحد أقصى 7 جمل منها. مع تعديل جميع
--      الاختبارات الحالية بما يتوافق مع ذلك». فـ«اختيارُ الجملة» (208) و«حكمٌ ودليلُه» (209) في المكتبة (`family = 'reading'`) يُنقران في **نطاق**
--      الجواب لا في النصّ كلّه. وسائرُ الموادّ على 208/209 كما هي حرفاً.
--   ② **والنطاقُ هو خياراتُ السؤال نفسُها** — جملٌ متّصلةٌ من النصّ — فلا عمودَ جديد، والواجهةُ (`b255`) تلفّها وحدها وتُظلّلها.
--      **والمساحةُ تتبعه:** كلُّ سؤالٍ كان يحفظ النصَّ كلَّه صفّاً لكلّ جملة (١٫٢٩ مليونَ صفٍّ في `options` يوم ٢٠ نوفمبر)، ويحفظ الآن سبعاً فأقلّ.
--   ③ **والقاعدةُ في موضعٍ واحد — هنا، في `save_question`:** المحرّرُ وصندوقُ الاختبار والاستيرادُ يرسلون جملَ النصّ كلَّها كما كانوا،
--      **والقاعدةُ تحصرها في نطاق الجواب قبل الحفظ** — فلا تُكتب قاعدةُ النطاق في ثلاثة عملاء تفترق نسخُها، والتحويلُ يستعملها هي نفسَها.
--      والمحرّرُ يعيد تحميلَ السؤال بعد الحفظ (`reload`)، فيرى المؤلّفُ النطاقَ فوراً.
--   ④ **القاعدة (`sentence_range`):**
--      - **الفقرةُ** جملٌ متتالية لا يفصلها سطرٌ جديد (كلُّ فاصلٍ فيه `\n` حدُّ فقرة).
--      - **النطاقُ فقرةُ الجواب** (أو الفقرتان إن وقعت جملُ الجواب فيهما).
--      - **أطولُ من سبع ⇒ سبعٌ متّصلةٌ فيها الجوابُ كلُّه، بموضعٍ يتغيّر من سؤالٍ إلى سؤال** (من بصمة نصّ السؤال، فيثبت للسؤال نفسِه) —
--        قصٌّ يتوسّطه الجوابُ دائماً يعلّم الطالبَ أن ينقر الوسط.
--      - **أقصرُ من ثلاث ⇒ تُضمّ جارتُها** كاملةً ما بقي المجموعُ سبعاً، وإلّا ما يبلغ ثلاثاً منها — والجهةُ الأولى من البصمة أيضاً
--        (جوابٌ في رأس النطاق دائماً دليلٌ لا يُقصد). وجملتان تُحسمان بالاستبعاد (حارسُ 208).
--      - **جوابٌ موزَّعٌ على أكثر من سبع جمل ⇒ يُردّ** — نصُّ المالك (٢١ نوفمبر): «إعادة صياغة السؤال بحيث يكون على جزء واحد فقط في النص،
--        والسؤال الذي يرتبط بأجزاء متباعدة يأخذ صيغة أخرى». **وقِيس قبله:** «حكمٌ ودليلُه» كلُّه بحكمين مقبولين، دليلاهما أبعدُ من سبع جملٍ
--        في ٨٤٦ من ١٬٤٦٨ · و«اختيارُ الجملة» بصحيحاتٍ متباعدة في ٣٤١ من ٥٬٨٦٦. فهذه لا تُحصر آليّاً: قصُّ دليل حكمٍ مقبول يجعله خاطئاً عند من
--        اختاره، وظلٌّ على دليل أحد الحكمين يدلّ على «المطلوب». ⇒ **تُعاد صياغتُها (محتوى)، وحارسُ النشر يوقف اختبارَها حتى ذلك.**
--      - **وفي النطاق جملةٌ ليست جواباً على الأقلّ** — يُمدّ إليها ما بقي سبعاً، وإلّا يُردّ: نطاقٌ كلُّه أجوبةٌ لا يميّز شيئاً (حارسُ 208).
--        وقع في الجافّة الأولى: صحيحاتٌ ثلاثٌ متّصلة في فقرةٍ من ثلاث حُصرت عليها وحدها.
--   ⑤ **والحارسُ يتّسع للنطاق في المكتبة وحدها:** كان «الجملُ = النصُّ كلُّه» في الحفظ وحارسِ النشر، ويصير في المكتبة «أو قطعةٌ متّصلةٌ منه
--      من ٣ إلى ٧ جمل» (`library_slice_ok`). فإعادةُ حفظ سؤالٍ محصورٍ تمرّ كما هي، والنصُّ الكاملُ يُحصر.
--   ⑥ **والتحويلُ (`library_trim_question`) يُنادى دفعاتٍ بعد تطبيق الملفّ — لا في الملفّ:** تحويلُ ٧٬٣٥٧ سؤالاً وحذفُ نحو ١٫٢ مليون صفٍّ
--      يتجاوز مهلةَ النداء الواحد، والملفُّ يبقى قابلاً لإعادة التشغيل بلا أثر. **والسؤالُ المُجاب عنه لا يُعدَّل** (AGENTS §٤): يتقاعد بـ`retire_question`
--      بهويّة مؤلّف، ثمّ يُحصر وريثُه — والتحويلُ يردّه ولا يمسّه.
--   ⑦ **وفهرسٌ على `question_keys.correct_id`** — قِيس في الجافّة الأولى: حذفُ جمل روايةٍ واحدة (٢٬٨٨٠ صفّاً) ستُّ ثوانٍ، لأنّ المفتاحَ الأجنبيّ
--      إلى `options` بلا فهرس، فكلُّ صفٍّ يُحذف يمسح المفاتيحَ كلَّها (١٥٬٧٢٥) ليتأكّد أنّ أحداً لا يشير إليه. ومليونُ صفٍّ بهذا ساعات.
--      (و`answers.option_id` كذلك بلا فهرس — ٣٦ صفّاً اليوم، فلا يُمسّ هنا.)
--
-- **قُرئت الحيّتان قبله (٢٠ نوفمبر):** `save_question` (`3d866fcb` · مرساةُ الحارس مرّتان: فرعا الجملة والحكم · `v_pbody text;` مرّة ·
--   `  if p_id is null then` مرّة) · `quiz_readiness` (`7d9ebdf3` · مرساةُ حارسها مرّتان). **وكلُّ رقعةٍ
--   محروسةٌ بعدّ نصّها، وتمضي إن وجدت أثرَها.** ولا كودَ تشخيصٍ على جملةٍ في المكتبة اليوم (قِيس: صفر) — فالحصرُ لا يُسقط تشخيصاً.
-- ══════════════════════════════════════════════════════════

-- ═══════════ منشأة ═══════════

-- ① المكتبةُ: مادّةٌ عائلتُها القراءة (المادّتان ٧ و٥٥ اليوم)
create or replace function public.library_quiz(p_quiz bigint)
returns boolean
language sql
stable
set search_path to 'public'
as $$
  select exists (select 1 from quizzes z join subjects s on s.id = z.subject_id
                  where z.id = p_quiz and s.family = 'reading')
$$;

-- ② القاعدة: من جمل النصّ كلِّه (بترتيبها، وهي النصُّ بلا مسافات) ومواضعِ الجواب ⇒ أوّلُ النطاق وآخرُه (من ١)
create or replace function public.sentence_range(p_body text, p_sents text[], p_ans int[], p_seed text)
returns jsonb
language plpgsql
immutable
set search_path to 'public'
as $$
declare
  n    int := coalesce(array_length(p_sents, 1), 0);
  par  int[]; slen int[]; plen int[];
  nl   int; j int := 0; off int := 0; lend int := 0; i int; p int;
  lo int; hi int; a int; b int; s0 int; s1 int; e2 int; s2 int; cand int[];
  h    bigint := (hashtext(coalesce(p_seed, ''))::bigint & 2147483647);
  fwd  boolean;
begin
  if n = 0 then return jsonb_build_object('error', 'لا جمل'); end if;
  if coalesce(array_length(p_ans, 1), 0) = 0 then
    return jsonb_build_object('error', 'لا جواب يُبنى عليه النطاق');
  end if;
  par := array_fill(0, array[n]);

  /* الفقرات — **بالعدّ لا بالقصّ:** الجملُ هي النصُّ بلا مسافات، فكلُّ جملةٍ تبدأ عند مجموع ما قبلها من حروفٍ غير المسافات،
     والسطرُ يغطّي مداه من تلك الحروف. فالجملةُ في السطر الذي يحوي أوّلَ حروفها، وكلُّ سطرٍ فقرة (السطرُ الفارغ بلا حروف).
     ⚠️ ولا `substr` على النصّ: في نصٍّ من ١٥٠ ألف حرف يُعدّ من أوّله في كلّ نداء — ٢٬٨٩٠ جملة × ٧٥ ألفاً وسطيّاً. */
  select array_agg(length(regexp_replace(u.s, '\s', '', 'g')) order by u.ord) into slen
    from unnest(p_sents) with ordinality as u(s, ord);
  select array_agg(length(regexp_replace(x.t, '\s', '', 'g')) order by x.ord) into plen
    from regexp_split_to_table(coalesce(p_body, ''), E'\n') with ordinality as x(t, ord);
  nl := coalesce(array_length(plen, 1), 0);
  if (select sum(v) from unnest(slen) v) is distinct from (select sum(v) from unnest(plen) v) then
    return jsonb_build_object('error', 'الجمل لا تطابق النص — أعد التقسيم');
  end if;

  for i in 1..n loop
    while lend <= off and j < nl loop j := j + 1; lend := lend + plen[j]; end loop;
    par[i] := j;
    off := off + slen[i];
  end loop;
  select count(distinct v) into p from unnest(par) v;

  select min(x), max(x) into lo, hi from unnest(p_ans) x;
  if lo < 1 or hi > n then return jsonb_build_object('error', 'جواب خارج الجمل'); end if;
  if hi - lo + 1 > 7 then
    return jsonb_build_object('spread', true,
      'error', 'أجوبة السؤال في أجزاء متباعدة — يُعاد صياغته على جزء واحد، أو يُكتب اختياراً من متعدد');
  end if;

  -- فقرةُ الجواب (أو فقرتاه)
  a := lo; while a > 1 and par[a - 1] = par[lo] loop a := a - 1; end loop;
  b := hi; while b < n and par[b + 1] = par[hi] loop b := b + 1; end loop;

  if b - a + 1 > 7 then
    -- سبعٌ متّصلةٌ فيها الجوابُ كلُّه **وجملةٌ ليست جواباً**، وموضعُها من البصمة بين ما يصلح منها
    s0 := greatest(a, hi - 6);
    s1 := least(lo, b - 6);
    select array_agg(s order by s) into cand from generate_series(s0, s1) s
     where exists (select 1 from generate_series(s, s + 6) g where g <> all(p_ans));
    if cand is null then
      return jsonb_build_object('error', 'كل جمل النطاق أجوبة — يلزم جملة خاطئة واحدة على الأقل، فيُعاد صياغة السؤال');
    end if;
    a := cand[1 + (h % array_length(cand, 1))::int];
    b := a + 6;
  else
    fwd := (h % 2 = 0);
    while b - a + 1 < 3 and (a > 1 or b < n) loop
      if (fwd and b < n) or a = 1 then
        e2 := b + 1; while e2 < n and par[e2 + 1] = par[b + 1] loop e2 := e2 + 1; end loop;
        if e2 - a + 1 <= 7 then b := e2; else b := a + 2; end if;
      else
        s2 := a - 1; while s2 > 1 and par[s2 - 1] = par[a - 1] loop s2 := s2 - 1; end loop;
        if b - s2 + 1 <= 7 then a := s2; else a := b - 2; end if;
      end if;
      fwd := not fwd;
    end loop;
    -- وجملةٌ ليست جواباً: يُمدّ إليها جملةً جملة ما بقي النطاقُ سبعاً
    fwd := (h % 2 = 0);
    while not exists (select 1 from generate_series(a, b) g where g <> all(p_ans))
          and b - a + 1 < 7 and (a > 1 or b < n) loop
      if (fwd and b < n) or a = 1 then b := b + 1; else a := a - 1; end if;
      fwd := not fwd;
    end loop;
    if not exists (select 1 from generate_series(a, b) g where g <> all(p_ans)) then
      return jsonb_build_object('error', 'كل جمل النطاق أجوبة — يلزم جملة خاطئة واحدة على الأقل، فيُعاد صياغة السؤال');
    end if;
  end if;

  return jsonb_build_object('a', a, 'b', b, 'n', n, 'paras', p);
end $$;

-- ③ قطعةٌ متّصلةٌ من النصّ من ٣ إلى ٧ جمل — في المكتبة وحدها (النصُّ كلُّه قطعةٌ منه أيضاً)
create or replace function public.library_slice_ok(p_quiz bigint, p_body text, p_concat text, p_n int)
returns boolean
language sql
stable
set search_path to 'public'
as $$
  select library_quiz(p_quiz)
     and coalesce(p_n, 0) between 3 and 7
     and coalesce(regexp_replace(p_concat, '\s', '', 'g'), '') <> ''
     and position(regexp_replace(p_concat, '\s', '', 'g') in regexp_replace(coalesce(p_body, ''), '\s', '', 'g')) > 0
$$;

-- ④ وللسؤال المحفوظ (حارسُ النشر): جملُه من صفوفها
create or replace function public.library_slice_q(p_qid bigint, p_body text)
returns boolean
language sql
stable
set search_path to 'public'
as $$
  select library_slice_ok(q.quiz_id, p_body,
           (select string_agg(o.body, '' order by o.position) from options o
             where o.question_id = q.id and (q.kind = 'sentence' or o.item_key like 'S%')),
           (select count(*)::int from options o
             where o.question_id = q.id and (q.kind = 'sentence' or o.item_key like 'S%')))
    from questions q where q.id = p_qid
$$;

-- ⑤ الحصر: خياراتٌ هي النصُّ كلُّه في سؤال مكتبة ⇒ خياراتُ نطاق الجواب. وما سواه ⇒ `{}` (لا تغيير)
create or replace function public.library_range(p_quiz bigint, p_kind text, p_body text,
                                                p_options jsonb, p_accept jsonb, p_seed text)
returns jsonb
language plpgsql
stable
set search_path to 'public'
as $$
declare
  v_s text[]; v_ans int[]; v_r jsonb; a int; b int; v_opts jsonb; v_bad text;
begin
  if p_kind not in ('sentence', 'judge') or not library_quiz(p_quiz) then return '{}'::jsonb; end if;

  select array_agg(x.o->>'body' order by x.ord) into v_s
    from jsonb_array_elements(coalesce(p_options, '[]'::jsonb)) with ordinality as x(o, ord)
   where p_kind = 'sentence' or x.o->>'k' like 'S%';
  if v_s is null then return '{}'::jsonb; end if;

  -- قطعةٌ لا النصُّ كلُّه ⇒ حُصرت من قبل (أو يحكم فيها الحارس) — لا تُحصر ثانيةً
  if regexp_replace(array_to_string(v_s, ''), '\s', '', 'g') <> regexp_replace(coalesce(p_body, ''), '\s', '', 'g') then
    return '{}'::jsonb;
  end if;

  if p_kind = 'sentence' then
    select array_agg(y.i) into v_ans from (
      select row_number() over (order by x.ord)::int as i, x.o
        from jsonb_array_elements(p_options) with ordinality as x(o, ord)) y
     where coalesce((y.o->>'correct')::boolean, false);
  else
    select array_agg(y.i) into v_ans from (
      select row_number() over (order by x.ord)::int as i, x.o->>'k' as k
        from jsonb_array_elements(p_options) with ordinality as x(o, ord)
       where x.o->>'k' like 'S%') y
     where y.k in (select jsonb_array_elements_text(m.value) from jsonb_each(coalesce(p_accept->'map', '{}'::jsonb)) m);
  end if;

  v_r := sentence_range(p_body, v_s, v_ans, p_seed);
  if v_r ? 'error' then
    return jsonb_build_object('error', v_r->>'error', 'spread', coalesce(v_r->'spread', 'false'::jsonb));
  end if;
  a := (v_r->>'a')::int; b := (v_r->>'b')::int;

  -- ما يُحذف لا يحمل كودَ تشخيص — وإلّا سقط التشخيصُ صامتاً
  select left(y.o->>'body', 60) into v_bad from (
    select x.o, case when p_kind = 'sentence' or x.o->>'k' like 'S%'
                     then row_number() over (partition by (p_kind = 'sentence' or x.o->>'k' like 'S%') order by x.ord) end as i
      from jsonb_array_elements(p_options) with ordinality as x(o, ord)) y
   where y.i is not null and (y.i < a or y.i > b) and coalesce(trim(y.o->>'dx'), '') <> '' limit 1;
  if v_bad is not null then
    return jsonb_build_object('error', 'جملة عليها كود تشخيص خارج نطاق الجواب: «' || v_bad || '»');
  end if;

  select jsonb_agg(y.o order by y.ord) into v_opts from (
    select x.o, x.ord, case when p_kind = 'sentence' or x.o->>'k' like 'S%'
                            then row_number() over (partition by (p_kind = 'sentence' or x.o->>'k' like 'S%') order by x.ord) end as i
      from jsonb_array_elements(p_options) with ordinality as x(o, ord)) y
   where y.i is null or y.i between a and b;

  return jsonb_build_object('options', v_opts, 'a', a, 'b', b, 'n', v_r->'n');
end $$;

-- ⑥ التحويل: سؤالٌ قائمٌ في المكتبة ⇒ تُحذف جملُه خارج نطاق الجواب، ويُنقّى مفتاحُه (يُنادى دفعاتٍ بعد التطبيق)
create or replace function public.library_trim_question(p_qid bigint)
returns jsonb
language plpgsql
set search_path to 'public'
as $$
declare
  q record; v_opts jsonb; v_r jsonb; v_keep bigint[]; v_del int;
begin
  select x.id, x.kind, x.quiz_id, x.body, pg.body as pbody, k.accept, k.correct_id, k.correct_ids, k.dx_map
    into q
    from questions x join passages pg on pg.id = x.passage_id
    left join question_keys k on k.question_id = x.id
   where x.id = p_qid and x.retired_at is null and x.kind in ('sentence', 'judge');
  if q.id is null then return jsonb_build_object('ok', false, 'error', 'ليس سؤال جملة أو حكم حيّاً'); end if;
  if exists (select 1 from answers where question_id = p_qid) then
    return jsonb_build_object('ok', false, 'answered', true,
      'error', 'أُجيب عنه — يتقاعد (retire_question) ويُحصر وريثُه');
  end if;

  select jsonb_agg(jsonb_build_object('id', o.id, 'k', o.item_key, 'body', o.body,
           'correct', (o.id = q.correct_id or o.id = any(coalesce(q.correct_ids, '{}'::bigint[]))),
           'dx', q.dx_map->>(o.id::text)) order by o.position)
    into v_opts from options o where o.question_id = p_qid;

  v_r := library_range(q.quiz_id, q.kind, q.pbody, v_opts, q.accept, q.body);
  if v_r ? 'error' then
    return jsonb_build_object('ok', false, 'error', v_r->>'error', 'spread', coalesce(v_r->'spread', 'false'::jsonb));
  end if;
  if not (v_r ? 'options') then return jsonb_build_object('ok', true, 'unchanged', true); end if;

  select array_agg((e->>'id')::bigint) into v_keep from jsonb_array_elements(v_r->'options') e;
  delete from options where question_id = p_qid and not (id = any(v_keep));
  get diagnostics v_del = row_count;

  update question_keys
     set correct_ids = nullif(array(select u from unnest(coalesce(correct_ids, '{}'::bigint[])) u where u = any(v_keep)), '{}'::bigint[]),
         dx_map      = coalesce((select jsonb_object_agg(d.key, d.value) from jsonb_each(coalesce(dx_map, '{}'::jsonb)) d
                                  where d.key::bigint = any(v_keep)), '{}'::jsonb)
   where question_id = p_qid;

  return jsonb_build_object('ok', true, 'removed', v_del, 'kept', array_length(v_keep, 1),
                            'a', v_r->'a', 'b', v_r->'b', 'n', v_r->'n');
end $$;

-- الصلاحيات: دوالُّ داخليّة تناديها دوالُّ `security definer` بهويّة مالكها — لا يناديها عميل
revoke execute on function public.library_quiz(bigint)                                   from public, anon, authenticated;
revoke execute on function public.sentence_range(text, text[], int[], text)                from public, anon, authenticated;
revoke execute on function public.library_slice_ok(bigint, text, text, int)               from public, anon, authenticated;
revoke execute on function public.library_slice_q(bigint, text)                           from public, anon, authenticated;
revoke execute on function public.library_range(bigint, text, text, jsonb, jsonb, text)   from public, anon, authenticated;
revoke execute on function public.library_trim_question(bigint)                           from public, anon, authenticated;

-- ⑦ فهرسُ المفتاح الأجنبيّ — بلاه يمسح حذفُ كلّ جملةٍ المفاتيحَ كلَّها (رأسُ الملفّ ⑦)
create index if not exists question_keys_correct_id_idx on public.question_keys (correct_id);

-- ═══════════ معدَّلة: رُقعٌ بعدّ نصّها ═══════════

-- ① `save_question`: الحارسُ يقبل قطعةَ المكتبة · والنصُّ الكاملُ في المكتبة يُحصر قبل الحفظ
do $$
declare v text; n int; sig regprocedure;
        a_decl  text := 'v_pbody text;';
        r_decl  text := 'v_pbody text; v_lib jsonb;   -- 223';
        a_guard text := $a$if regexp_replace(v_pbody, '\s', '', 'g') <>$a$;
        r_guard text := $r$if not library_slice_ok(v_quizid, v_pbody,   -- 223 · قطعةُ المكتبة (٣–٧ جمل) تمرّ
         (select string_agg(o->>'body', '' order by t.ord) from jsonb_array_elements(p_options) with ordinality as t(o, ord)
           where p_kind = 'sentence' or o->>'k' like 'S%'),
         (select count(*)::int from jsonb_array_elements(p_options) o where p_kind = 'sentence' or o->>'k' like 'S%'))
       and regexp_replace(v_pbody, '\s', '', 'g') <>$r$;
        a_ins   text := '  if p_id is null then';
        r_ins   text := $i$  -- 223 · ق٢٠: في المكتبة يُحصر النصُّ الكامل في نطاق الجواب قبل الحفظ (sentence_range)
  if p_kind in ('sentence', 'judge') then
    v_lib := library_range(v_quizid, p_kind, v_pbody, p_options, p_accept, p_body);
    if v_lib ? 'error' then
      return jsonb_build_object('ok', false, 'error', v_lib->>'error');
    end if;
    if v_lib ? 'options' then p_options := v_lib->'options'; end if;
  end if;

  if p_id is null then$i$;
begin
  select p.oid::regprocedure into strict sig from pg_proc p
    join pg_namespace ns on ns.oid = p.pronamespace
   where ns.nspname = 'public' and p.proname = 'save_question';
  v := pg_get_functiondef(sig);
  if position('-- 223' in v) > 0 then raise notice '223 · save_question رُقعت من قبل'; return; end if;

  n := (length(v) - length(replace(v, a_decl, ''))) / length(a_decl);
  if n <> 1 then raise exception '223 · save_question: مرساةُ التصريح % مرّة لا ١', n; end if;
  n := (length(v) - length(replace(v, a_guard, ''))) / length(a_guard);
  if n <> 2 then raise exception '223 · save_question: مرساةُ الحارس % مرّة لا ٢', n; end if;
  n := (length(v) - length(replace(v, a_ins, ''))) / length(a_ins);
  if n <> 1 then raise exception '223 · save_question: مرساةُ الإدراج % مرّة لا ١', n; end if;

  v := replace(v, a_decl, r_decl);
  v := replace(v, a_guard, r_guard);
  v := replace(v, a_ins, r_ins);
  execute v;
end $$;

-- ② `quiz_readiness`: قطعةُ المكتبة لا تُعدّ «جملاً لا تطابق النص» · وسؤالُ مكتبةٍ لم يُحصر في جزءٍ عائقٌ للنشر
do $$
declare v text; n int;
        a_g text := $a$and regexp_replace(pg.body, '\s', '', 'g') is distinct from$a$;
        r_g text := $r$and not library_slice_q(x.id, pg.body)   -- 223 · قطعةُ المكتبة (٣–٧ جمل) تمرّ
     and regexp_replace(pg.body, '\s', '', 'g') is distinct from$r$;
        a_s text := '  -- ─── 208 · اختيارُ الجملة (ق١٦) ─';
        r_s text := $s$  -- ─── 223 · المكتبة (ق٢٠): سؤالُ جملةٍ أو حكمٍ على النصّ كلّه — يُحصر في جزءٍ أو تُعاد صياغتُه ───
  select count(*) into n from questions x
   where x.id = any(v_pool) and x.retired_at is null and x.kind in ('sentence', 'judge')
     and library_quiz(x.quiz_id)
     and (select count(*) from options o where o.question_id = x.id and (x.kind = 'sentence' or o.item_key like 'S%')) > 7;
  if n > 0 then
    v_issues := v_issues || to_jsonb(n || ' سؤال جملة أو حكم على النص كله — يُحصر في جزء واحد أو يُعاد صياغته');
  end if;

$s$;
begin
  v := pg_get_functiondef('public.quiz_readiness(bigint)'::regprocedure);
  if position('-- 223' in v) > 0 then raise notice '223 · quiz_readiness رُقعت من قبل'; return; end if;
  n := (length(v) - length(replace(v, a_g, ''))) / length(a_g);
  if n <> 2 then raise exception '223 · quiz_readiness: مرساةُ الحارس % مرّة لا ٢', n; end if;
  n := (length(v) - length(replace(v, a_s, ''))) / length(a_s);
  if n <> 1 then raise exception '223 · quiz_readiness: مرساةُ القسم % مرّة لا ١', n; end if;
  v := replace(v, a_g, r_g);
  v := replace(v, a_s, r_s || a_s);
  execute v;
end $$;

insert into public.sql_log (n, title, applied_at)
values ('223', 'في المكتبة تُحدَّد الجملةُ في فقرة الجواب — سبعُ جملٍ حدّاً أعلى · والتحويلُ دفعاتٍ بعده (ق٢٠)', now())
on conflict (n) do update set applied_at = now();
