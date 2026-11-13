-- ══════════════════════════════════════════════════════════
-- 211 · جلسةُ التدرّب تعرف أنماطَ ق١٦ الثلاثة — اختيارَ الجملة والحكمَ ودليلَه والترتيب
--       (المرحلة ٧أ — «والتدريب» الباقي بعد 208 و209 و210 · ١٣ نوفمبر ٢٠٢٦)
--
-- لماذا:
--   ① **رابطُ التدرّب كان يُسقطها صامتاً:** `practice_snapshot_quiz` تنتقي `mcq · msq · gap · matching · cloze` وحدها، فاختبارٌ
--      أسئلتُه من الأنماط الجديدة يُنشئ جلسةً ناقصة — أو «لا سؤال يُتدرَّب عليه» وفيه أسئلة. و`submit_practice_answer` لا فرعَ لها.
--   ② **والتصحيحُ تصحيحُ `submit_attempt` نفسُه** (208 · 209 · 210) — لكن من **اللقطة** لا من الجداول: الجلسةُ تُجمَّد يومَ تُنشأ
--      (`practice_sessions.snapshot`)، فيُصحَّح بما رآه المتدرّب ولو حُرِّر السؤالُ بعدها.
--        · الجملةُ صحيحةٌ إن كانت `correct_id` أو في `correct_ids` · وكودُها من خريطة التشخيص.
--        · الحكمُ ودليلُه بمفاتيح خيارات اللقطة (`k`): ٢/١/٠ أو ١/٠ — وكودُ الحكم المرفوض، أو كودُ الجملة التي لا تدلّ.
--        · الترتيبُ: الصوابُ ترتيبُ الخيارات في اللقطة (مواضعُها)، ولكلّ رابطٍ متتالٍ صحيحٍ نقطة.
--      والدرجةُ الجزئيّة تُردّ في `hits` و`of` كالمزاوجة — فتقول الشاشةُ «أصبت ٢ من ٤» بالسطر القائم.
--   ③ **والعرض:** `open_practice_session` تردّ الخياراتِ بترتيب اللقطة، وهو **ترتيبُ الصواب في الترتيب** ⇒ يُخلط هنا، **بالقاعدة نفسِها**
--      التي تخلط بها `get_quiz` (210 ⑤): `order_shuffle` — منشأةٌ هنا، و`ordering_pool` تُبنى عليها فلا تصير القاعدةُ قاعدتين.
--      والبذرةُ رمزُ الجلسة: كلُّ من فتح الرابطَ يرى خلطاً واحداً (والتدرّبُ بلا حساب، فلا هويّةَ تُبذَر بها).
--      **والأحكامُ تُخلط** كخيارات الاختيار في `get_quiz` (209 ⑤)، والجملُ بعدها بترتيب النصّ.
--   ④ ⚠️ **وخياراتُ الاختيار من متعدّد في التدرّب ما زالت بترتيب التأليف** — كما كانت قبل هذا الملفّ. لم يُطلب تغييرُه هنا، ويُذكر.
--
-- **قُرئت الحيّاتُ قبله (١٣ نوفمبر):** `practice_snapshot_quiz` · `open_practice_session` · `submit_practice_answer` ·
--   `create_practice_session` · `ordering_pool`. **وكلُّ رقعةٍ محروسةٌ بعدّ نصّها، و`ordering_pool` ببصمتها.**
-- ══════════════════════════════════════════════════════════

-- ═══════════ منشأة: قاعدةُ الخلط الواحدة ═══════════

-- المعرّفاتُ بترتيب الصواب ⇒ خلطٌ بالبذرة يُقلب إن كانت روابطُه الصحيحةُ أكثرَ من مقلوبه — فلا يصل الصوابُ مرتّباً أبداً (210 ⑤).
-- داخليّة: من نادى بها بمعرّفاتٍ وبذورٍ كثيرة لم يستفد شيئاً لا يعرفه — لكنّها لا تُمنح إلا للدوالّ المالكة كأختها.
create or replace function public.order_shuffle(p_ids bigint[], p_seed text)
returns bigint[]
language sql immutable
set search_path = public
as $$
  with o as (select u.id, u.rn from unnest(p_ids) with ordinality as u(id, rn)),
       s as (select o.id, o.rn, row_number() over (order by md5(p_seed || 'k' || o.id::text)) as i from o),
       f as (select count(*) filter (where b.rn = a.rn + 1) as fwd,
                    count(*) filter (where b.rn = a.rn - 1) as bwd
               from s a join s b on b.i = a.i + 1)
  select array_agg(s.id order by case when f.bwd < f.fwd then -s.i else s.i end)
    from s, f
$$;
revoke all on function public.order_shuffle(bigint[], text) from public, anon, authenticated;

-- ═══════════ معدَّلة: `ordering_pool` تُبنى على القاعدة الواحدة — والناتجُ نفسُه (يُقاس في الجافّة) ═══════════

do $$
declare v text;
begin
  v := pg_get_functiondef('public.ordering_pool(bigint,text)'::regprocedure);
  if position('order_shuffle' in v) > 0 then raise notice 'ordering_pool مبنيّةٌ على order_shuffle من قبل'; return; end if;
  if left(md5(v), 8) <> '51d09565' then
    raise exception 'ordering_pool تغيّرت بعد 210 (البصمة %) — لا تُستبدل على الظنّ', left(md5(v), 8);
  end if;
  execute $f$
create or replace function public.ordering_pool(p_q bigint, p_seed text)
returns bigint[]
language sql stable
set search_path = public
as $q$
  -- 211 · القاعدةُ في order_shuffle — والمعرّفاتُ هنا بترتيب الصواب (المواضع)
  select order_shuffle(array(select o.id from options o where o.question_id = p_q order by o.position, o.id), p_seed)
$q$;
$f$;
  revoke all on function public.ordering_pool(bigint, text) from public, anon, authenticated;
end $$;

-- ═══════════ معدَّلة: الدوالّ — رُقعٌ بعدّ نصّها ═══════════

-- ① `practice_snapshot_quiz`: الأنماطُ الثلاثة في اللقطة
do $$
declare v text; n int;
        p text := 'and x.kind in (''mcq'',''msq'',''gap'',''matching'',''cloze'')';
begin
  v := pg_get_functiondef('public.practice_snapshot_quiz(bigint)'::regprocedure);
  if position('''ordering''' in v) > 0 then raise notice 'practice_snapshot_quiz تعرف الأنماطَ الثلاثة من قبل'; return; end if;
  n := (length(v) - length(replace(v, p, ''))) / length(p);
  if n <> 1 then raise exception 'practice_snapshot_quiz: وُجد النصّ % مرّة لا مرّةً واحدة', n; end if;
  execute replace(v, p, 'and x.kind in (''mcq'',''msq'',''gap'',''matching'',''cloze'',''sentence'',''judge'',''ordering'')   -- 211');
end $$;

-- ② `open_practice_session`: الترتيبُ يُخلط بالقاعدة الواحدة · والأحكامُ تُخلط والجملُ بترتيب النصّ
do $$
declare v text; n int;
        p text := '''options'', q->''options'',';
begin
  v := pg_get_functiondef('public.open_practice_session(text)'::regprocedure);
  if position('order_shuffle' in v) > 0 then raise notice 'open_practice_session تخلط من قبل'; return; end if;
  n := (length(v) - length(replace(v, p, ''))) / length(p);
  if n <> 1 then raise exception 'open_practice_session: وُجد النصّ % مرّة لا مرّةً واحدة', n; end if;
  execute replace(v, p, $r$'options', case                                        -- 211 · ق١٦
                 when q->>'kind' = 'ordering' then (
                   select jsonb_agg(t.o order by array_position(order_shuffle(
                            (select array_agg((x->>'id')::bigint order by m)
                               from jsonb_array_elements(q->'options') with ordinality as u(x, m)), p_token),
                            (t.o->>'id')::bigint))
                     from jsonb_array_elements(q->'options') as t(o))
                 when q->>'kind' = 'judge' then (
                   select jsonb_agg(t.o order by (t.o->>'k' like 'S%'),
                                                 case when t.o->>'k' like 'J%' then md5(p_token || 'k' || (t.o->>'id')) end,
                                                 t.n)
                     from jsonb_array_elements(q->'options') with ordinality as t(o, n))
                 else q->'options' end,$r$);
end $$;

-- ③ `submit_practice_answer`: الفروعُ الثلاثة من اللقطة · و`of` للدرجة الجزئيّة
do $$
declare v text; n int;
        p_decl text := 'v_correct jsonb; v_rating int;';
        p_gap  text := 'elsif q->>''kind'' = ''gap'' then';
        p_of   text := '''of'', coalesce(v_g->''slots'', v_g->''pairs'')';
        branch text := $b$elsif q->>'kind' = 'sentence' then
    -- 211 · اختيارُ الجملة كالاختيار — والصوابُ جملةٌ أو أكثر (208)
    --       ⚠️ و`correct_ids` في اللقطة **null بصيغة JSON** لا null القاعدة (`jsonb_build_object` يكتبه) — فـ`coalesce` لا تراه،
    --       ويسقط الاستخراجُ منه («cannot extract elements from a scalar» — قِيس في الجافّة). ⇒ يُسأل عن نوعه.
    v_opt := nullif(p_answer->>'o', '');
    v_correct := case when jsonb_typeof(q->'key'->'correct_ids') = 'array' then q->'key'->'correct_ids'
                      else jsonb_build_array(q->'key'->'correct_id') end;
    v_ok  := v_opt is not null
             and exists (select 1 from jsonb_array_elements_text(v_correct) c where c = v_opt);
    if not v_ok and v_opt is not null then
      v_dx   := q->'dx'->v_opt->>'code';
      v_note := q->'dx'->v_opt->>'note';
    end if;

  elsif q->>'kind' = 'judge' then
    -- 211 · الحكمُ في `j` والدليلُ في `o` — بمفاتيح خيارات اللقطة (209)
    v_j   := nullif(p_answer->>'j', '');
    v_opt := nullif(p_answer->>'o', '');
    select o->>'k' into v_jk from jsonb_array_elements(q->'options') o where o->>'id' = v_j   and o->>'k' like 'J%';
    select o->>'k' into v_sk from jsonb_array_elements(q->'options') o where o->>'id' = v_opt and o->>'k' like 'S%';
    v_keyed := v_jk is not null and coalesce((q->'key'->'accept'->'map') ? v_jk, false);
    v_sup   := v_keyed and v_sk is not null and coalesce((q->'key'->'accept'->'map'->v_jk) ? v_sk, false);
    v_pts   := case when q->'key'->'accept'->>'mode' = 'two'
                    then case when v_sup then 2 when v_keyed then 1 else 0 end
                    else case when v_sup then 1 else 0 end end;
    v_ok := v_sup;
    v_g  := jsonb_build_object('hits', v_pts, 'of', case when q->'key'->'accept'->>'mode' = 'two' then 2 else 1 end);
    if v_jk is not null and not v_keyed then
      v_dx := q->'dx'->v_j->>'code';   v_note := q->'dx'->v_j->>'note';      -- حكمٌ لا يدعمه النصّ
    elsif v_keyed and not v_sup and v_sk is not null then
      v_dx := q->'dx'->v_opt->>'code'; v_note := q->'dx'->v_opt->>'note';    -- حكمٌ مقبولٌ بجملةٍ لا تدلّ
    end if;
    v_correct := q->'key'->'accept';

  elsif q->>'kind' = 'ordering' then
    -- 211 · الصوابُ ترتيبُ الخيارات في اللقطة (مواضعُها · 210) — ولكلّ رابطٍ متتالٍ صحيحٍ نقطة.
    --       وما ليس من البند أو تكرّر يُسقَط، و`seq` غيرُ المصفوفة صفر.
    select array_agg((o->>'id')::bigint order by t.n) into v_key
      from jsonb_array_elements(q->'options') with ordinality as t(o, n);
    select coalesce(array_agg(x.id order by x.ord), '{}'::bigint[]) into v_seq
      from (select distinct on (k.id) k.id, t.ord
              from jsonb_array_elements_text(case when jsonb_typeof(p_answer->'seq') = 'array'
                                                  then p_answer->'seq' else '[]'::jsonb end) with ordinality as t(e, ord)
              join unnest(v_key) as k(id) on k.id::text = t.e
             order by k.id, t.ord) x;
    select count(*) into v_pts
      from unnest(v_seq[1:cardinality(v_seq) - 1], v_seq[2:cardinality(v_seq)]) as l(a1, b1)
     where array_position(v_key, l.b1) = array_position(v_key, l.a1) + 1;
    v_ok := v_pts > 0 and v_pts = cardinality(v_key) - 1;
    v_g  := jsonb_build_object('hits', v_pts, 'of', cardinality(v_key) - 1);
    v_correct := to_jsonb(v_key);

  $b$;
begin
  v := pg_get_functiondef('public.submit_practice_answer(text,text,text,jsonb)'::regprocedure);
  if position('''ordering''' in v) > 0 then raise notice 'submit_practice_answer تعرف الأنماطَ الثلاثة من قبل'; return; end if;
  n := (length(v) - length(replace(v, p_decl, ''))) / length(p_decl);
  if n <> 1 then raise exception 'submit_practice_answer (التصريح): وُجد النصّ % مرّة لا مرّةً واحدة', n; end if;
  n := (length(v) - length(replace(v, p_gap, ''))) / length(p_gap);
  if n <> 1 then raise exception 'submit_practice_answer (الفرع): وُجد النصّ % مرّة لا مرّةً واحدة', n; end if;
  n := (length(v) - length(replace(v, p_of, ''))) / length(p_of);
  if n <> 1 then raise exception 'submit_practice_answer (الدرجة): وُجد النصّ % مرّة لا مرّةً واحدة', n; end if;

  v := replace(v, p_decl, p_decl || chr(10)
       || '        v_j text; v_jk text; v_sk text; v_keyed bool; v_sup bool; v_pts int; v_seq bigint[]; v_key bigint[];   -- 211');
  v := replace(v, p_gap, branch || p_gap);
  v := replace(v, p_of, '''of'', coalesce(v_g->''slots'', v_g->''pairs'', v_g->''of'')');
  execute v;
end $$;

insert into public.sql_log (n, title, applied_at)
values ('211', 'جلسةُ التدرّب تعرف أنماطَ ق١٦ الثلاثة — اختيارَ الجملة والحكمَ ودليلَه والترتيب', now())
on conflict (n) do update set applied_at = now();
