-- ═══════════════════════════════════════════════════════════════════════
-- 114 · «إكمال من قائمة» يبلغ الطالب — ويُرفع قفلُ المرحلة
--
-- بنى الملفُّ 113 النمطَ في المحرّر وحجب نشرَه، لأنّ get_quiz لا ترسله
-- و submit_attempt لا تصحّحه. وهذا الملفّ يبني مسارَه إلى الطالب ثمّ
-- يرفع القفلَ وحارسَه — ولا يُرفعان قبل أن يوجد ما يُغنيان عنه.
--
-- 🔑 ولا دالّةَ تصحيحٍ جديدة: accept.pairs مفاتيحُها **أرقامُ الفراغات**
--    نصّاً، فـ grade_match تعمل عليها بحرفها — وهي التي تصحّح المزاوجة.
--    ودالّةٌ ثانيةٌ تُكتب لتفعل الشيءَ نفسه تتفارق عن أختها عند أوّل
--    إصلاحٍ يقع في إحداهما.
--
-- 🔑 ودرجةٌ لكلّ فراغ لا حكمٌ واحد على الجملة (كالمزاوجة، وبخلاف gap):
--    القائمةُ مشتركةٌ بين الفراغات، فالسؤالُ في حقيقته إسنادُ مجموعةٍ
--    إلى مجموعة — وحكمٌ واحدٌ عليه يُخفي أيَّ فراغٍ سقط، وذاك ما
--    يقيسه التشخيص.
--
-- ⚠️ والخلطُ يُقرأ من wrong_map بمفتاحٍ «رقم الفراغ:مفتاح الكلمة»،
--    و HLF تُسجَّل حين يُصيب بعضاً ويُخطئ بعضاً بلا كودٍ مسجَّل —
--    نظيرُ المزاوجة بحرفه.
--
-- ⚠️ والقائمةُ تُخلَط بالبذرة كالمزاوجة — **بالمفتاح لا بالموضع** (112):
--    فلا تقفز كلمةٌ أمام الطالب إن حُرِّر نصُّها بين محاولتين.
-- ═══════════════════════════════════════════════════════════════════════

set check_function_bodies = off;


-- ═══════════════════════════════════════════════════════════════════════
-- ① معدَّلة لا منشأة — get_quiz  (أصلُها 22 · وآخر مسّ 112)
--    قُرئت حيّةً بـ pg_get_functiondef قبل الاستبدال، والفرق سطرٌ واحد:
--    قائمةُ «إكمال من قائمة» تُخلَط كقائمة المزاوجة — [{k,t}] بمفتاحها.
-- ═══════════════════════════════════════════════════════════════════════

create or replace function public.get_quiz(p_quiz bigint)
returns jsonb language plpgsql stable security definer set search_path to 'public'
as $function$
declare v jsonb; v_ids bigint[]; v_seed text; v_att int; v_lane bigint; v_sh bool;
begin
  if not can_access(p_quiz) and not is_teacher() then
    raise exception 'هذا الاختبار غير متاح لك بعد';
  end if;

  select shuffle into v_sh from quizzes where id = p_quiz;

  select count(*) into v_att
    from attempts where quiz_id = p_quiz and user_id = auth.uid();

  v_seed := coalesce(auth.uid()::text, 'anon') || ':' ||
            p_quiz::text || ':' || v_att::text;

  select passage_id into v_lane
    from questions
   where quiz_id = p_quiz and variant_key is not null and passage_id is not null
     and retired_at is null
   group by passage_id
   order by md5(v_seed || passage_id::text)
   limit 1;

  select array_agg(id) into v_ids from (
    select distinct on (variant_key) id
      from questions
     where quiz_id = p_quiz and variant_key is not null
       and retired_at is null
     order by variant_key,
              (passage_id is not distinct from v_lane) desc,
              (passage_id is null) desc,
              md5(v_seed || id::text)
  ) s;

  v_ids := coalesce(v_ids, '{}'::bigint[]) || coalesce((
    select array_agg(id) from questions
     where quiz_id = p_quiz and variant_key is null
       and retired_at is null), '{}'::bigint[]);

  select jsonb_build_object(
    'id', q.id, 'title', q.title, 'minutes', q.minutes, 'version', q.version,
    'plays', q.plays,
    'passages', coalesce((
      select jsonb_agg(jsonb_build_object(
        'id', pg.id, 'title', pg.title, 'body', pg.body,
        'media', pg.media_url, 'kind', pg.kind, 'lang', pg.lang)
        order by pg.position)
      from passages pg
     where pg.quiz_id = q.id
       and exists (select 1 from questions z
                    where z.id = any(v_ids) and z.passage_id = pg.id)), '[]'::jsonb),
    'questions', coalesce((
      select jsonb_agg(jsonb_build_object(
        'id', x.id, 'kind', x.kind, 'body', x.body,
        'section', x.section,
        'image', x.image_url, 'video', x.video_url, 'audio', x.audio_url,
        'passage_id', x.passage_id, 'lang', x.lang,
        'gaps', case when x.kind = 'gap' then gap_count(x.body) end,
        -- 112 · الإكمال نصوصٌ تُخلط بنصّها، والمزاوجة [{k,t}] تُخلط بمفتاحها
        --       فلا يقفز مقابلٌ أمام الطالب إن حُرِّر نصُّه بين محاولتين.
        -- 114 · و«إكمال من قائمة» قائمتُه [{k,t}] كالمزاوجة ⇒ تُخلط بمفتاحها
        'bank', case
                  when x.kind = 'gap' then
                    (select jsonb_agg(b order by md5(v_seed || x.id::text || b))
                       from question_keys k2,
                            jsonb_array_elements_text(k2.bank) b
                      where k2.question_id = x.id)
                  when x.kind in ('matching', 'cloze') then
                    (select jsonb_agg(b order by md5(v_seed || x.id::text || (b->>'k')))
                       from question_keys k2,
                            jsonb_array_elements(k2.bank) b
                      where k2.question_id = x.id)
                end,
        'options', coalesce((
          select jsonb_agg(jsonb_build_object('id', o.id, 'label', o.label,
                           'body', o.body, 'image', o.image_url,
                           'k', o.item_key)
                 order by o.position)
          from options o where o.question_id = x.id), '[]'::jsonb)
      )
      order by (select min(coalesce((select min(y.position) from questions y
                                      where y.quiz_id = z.quiz_id
                                        and y.variant_key = z.variant_key
                                        and y.retired_at is null), z.position))
                  from questions z
                 where z.id = any(v_ids) and z.quiz_id = x.quiz_id
                   and z.passage_id is not distinct from x.passage_id
                   and z.section    is not distinct from x.section),
               case when v_sh and x.passage_id is null
                    then md5(v_seed || 'o' || x.id::text) end,
               coalesce((select min(y.position) from questions y
                          where y.quiz_id = x.quiz_id
                            and y.variant_key = x.variant_key
                            and y.retired_at is null), x.position),
               x.position)
      from questions x where x.id = any(v_ids)), '[]'::jsonb)
  ) into v
  from quizzes q where q.id = p_quiz;

  return v;
end $function$;

grant execute on function public.get_quiz(bigint)
  to anon, authenticated, service_role;


-- ═══════════════════════════════════════════════════════════════════════
-- ② معدَّلة لا منشأة — submit_attempt  (أصلُها 05 · وآخر مسّ 112)
--    قُرئت حيّةً بـ pg_get_functiondef قبل الاستبدال، والفرق عن الحيّ:
--      · 'cloze' في الأنماط المصحَّحة   · فرعُه (grade_match بلا تعديل)
--      · درجتُه بعدد ما أصاب            · وثلاثةُ حقولٍ في المراجعة
-- ═══════════════════════════════════════════════════════════════════════

create or replace function public.submit_attempt(
  p_quiz bigint, p_answers jsonb, p_duration integer, p_auto boolean default false)
returns jsonb language plpgsql security definer set search_path to 'public'
as $function$
declare
  v_attempt bigint; v_score numeric := 0; v_total numeric := 0;
  a jsonb; k record; v_ok bool; v_dx text; v_pct int; v_res jsonb;
  v_item bigint; v_lesson bigint; v_ver int; v_reveal text;
  v_q bigint; v_opt bigint; v_meta jsonb;
  v_picked bigint[]; v_keys bigint[]; v_wrong bigint[]; v_missed bigint[];
  v_txt text; v_given jsonb; v_g jsonb;
begin
  if auth.uid() is null then raise exception 'يجب تسجيل الدخول'; end if;
  if not can_access(p_quiz) then raise exception 'هذا الاختبار غير متاح لك بعد'; end if;

  select i.id, i.lesson_id into v_item, v_lesson
    from items i where i.quiz_id = p_quiz
   order by i.id limit 1;
  select version, reveal into v_ver, v_reveal from quizzes where id = p_quiz;

  insert into attempts (user_id, quiz_id, duration_sec, auto_submitted,
                        item_id, quiz_version)
  values (auth.uid(), p_quiz, coalesce(p_duration,0), coalesce(p_auto,false),
          v_item, v_ver)
  returning id into v_attempt;

  for a in select * from jsonb_array_elements(p_answers) loop
    select qk.correct_id, qk.correct_ids, qk.dx_map, qk.accept, qk.wrong_map,
           qk.bank,
           q.kind, q.points
      into k
      from questions q left join question_keys qk on qk.question_id = q.id
     where q.id = (a->>'q')::bigint and q.quiz_id = p_quiz;

    if not found then continue; end if;

    v_q := (a->>'q')::bigint;

    if k.kind in ('mcq', 'msq', 'gap', 'matching', 'cloze') then
      v_total := v_total + coalesce(k.points,1);
      v_opt := null; v_dx := null; v_meta := '{}'::jsonb; v_txt := null; v_g := null;

      if k.kind = 'mcq' then
        v_opt := nullif(a->>'o','')::bigint;
        v_ok  := v_opt is not null and v_opt = k.correct_id;
        if not v_ok then v_dx := k.dx_map ->> (a->>'o'); end if;

      elsif k.kind = 'gap' then
        v_given := coalesce(a->'txt', '[]'::jsonb);
        v_txt   := (select string_agg(e #>> '{}', ' | ')
                      from jsonb_array_elements(v_given) e);
        v_g     := grade_gap(coalesce(k.accept, '{}'::jsonb), v_given);
        v_ok    := coalesce((v_g->>'ok')::bool, false);

        if v_ok then
          if coalesce((v_g->>'case_slip')::bool, false) then v_dx := 'PRC'; end if;
        else
          select k.wrong_map ->> ((t.ord)::text || ':' || (t.e #>> '{}')) into v_dx
            from jsonb_array_elements(v_given) with ordinality as t(e, ord)
           where k.wrong_map ? ((t.ord)::text || ':' || (t.e #>> '{}')) limit 1;
          if v_dx is null and (v_g->>'hits')::int > 0 then v_dx := 'HLF'; end if;
        end if;

        v_meta := jsonb_build_object('gap', v_g, 'given', v_given);

      /* ═══ 114 · إكمال من قائمة ═══════════════════════════════════
         المفتاحُ الأيسر **رقمُ الفراغ** نصّاً، والأيمنُ مفتاحُ الكلمة ⇒
         grade_match تعمل عليه بحرفها. وترتيبُ الجمع بالنصّ لا بالعدد
         عمداً: مفتاحٌ مشوَّهٌ من عميلٍ لا يُسقط التصحيح بخطأِ تحويل،
         وحتى ثمانيةِ فراغاتٍ يستوي الترتيبان. */
      elsif k.kind = 'cloze' then
        v_given := coalesce(a->'pairs', '{}'::jsonb);

        -- النصُّ المقروء يُحفَظ بجوار المفاتيح: السجلُّ يُقرأ بعد سنة (112)
        v_txt := (select string_agg(
                    coalesce((select b->>'t' from jsonb_array_elements(coalesce(k.bank,'[]'::jsonb)) b
                               where b->>'k' = g.value), g.value), ' | ' order by g.key)
                    from jsonb_each_text(v_given) g);

        v_g  := grade_match(coalesce(k.accept, '{}'::jsonb), v_given);
        v_ok := coalesce((v_g->>'ok')::bool, false);

        if not v_ok then
          select k.wrong_map ->> (g.key || ':' || g.value) into v_dx
            from jsonb_each_text(v_given) g
           where k.wrong_map ? (g.key || ':' || g.value) limit 1;
          if v_dx is null and (v_g->>'hits')::int > 0 then v_dx := 'HLF'; end if;
        end if;

        v_meta := jsonb_build_object(
          'cloze', v_g, 'given', v_given,
          'dx', coalesce((
            select jsonb_agg(k.wrong_map ->> (g.key || ':' || g.value) order by g.key)
              from jsonb_each_text(v_given) g
             where k.wrong_map ? (g.key || ':' || g.value)), '[]'::jsonb));

      elsif k.kind = 'matching' then
        v_given := coalesce(a->'pairs', '{}'::jsonb);

        v_txt := (select string_agg(
                    coalesce((select b->>'t' from jsonb_array_elements(coalesce(k.bank,'[]'::jsonb)) b
                               where b->>'k' = g.value), g.value), ' | ' order by g.key)
                    from jsonb_each_text(v_given) g);

        v_g  := grade_match(coalesce(k.accept, '{}'::jsonb), v_given);
        v_ok := coalesce((v_g->>'ok')::bool, false);

        if not v_ok then
          select k.wrong_map ->> (g.key || ':' || g.value) into v_dx
            from jsonb_each_text(v_given) g
           where k.wrong_map ? (g.key || ':' || g.value) limit 1;
          if v_dx is null and (v_g->>'hits')::int > 0 then v_dx := 'HLF'; end if;
        end if;

        v_meta := jsonb_build_object(
          'match', v_g, 'given', v_given,
          'dx', coalesce((
            select jsonb_agg(k.wrong_map ->> (g.key || ':' || g.value) order by g.key)
              from jsonb_each_text(v_given) g
             where k.wrong_map ? (g.key || ':' || g.value)), '[]'::jsonb));

      else
        select coalesce(array_agg(distinct (e #>> '{}')::bigint), '{}'::bigint[])
          into v_picked
          from jsonb_array_elements(coalesce(a->'os', '[]'::jsonb)) e;

        v_keys := coalesce(k.correct_ids, '{}'::bigint[]);
        v_ok   := (v_picked <@ v_keys) and (v_keys <@ v_picked);

        select coalesce(array_agg(x), '{}'::bigint[]) into v_wrong
          from unnest(v_picked) x where not (x = any (v_keys));
        select coalesce(array_agg(x), '{}'::bigint[]) into v_missed
          from unnest(v_keys) x where not (x = any (v_picked));

        if array_length(v_wrong, 1) is not null then
          select k.dx_map ->> o.id::text into v_dx
            from options o
           where o.question_id = v_q and o.id = any (v_wrong)
           order by o.position
           limit 1;
        end if;

        v_meta := jsonb_build_object(
          'picked', to_jsonb(v_picked),
          'wrong',  to_jsonb(v_wrong),
          'missed', to_jsonb(v_missed),
          'dx', coalesce((select jsonb_agg(k.dx_map ->> o.id::text order by o.position)
                            from options o
                           where o.question_id = v_q
                             and o.id = any (v_wrong)),
                         '[]'::jsonb));
      end if;

      -- 114 · ولكلّ فراغٍ درجة كما لكلّ بندٍ درجة — القائمةُ مشتركة فالحكمُ موزَّع
      if k.kind in ('matching', 'cloze') then
        v_score := v_score + coalesce((v_g->>'hits')::int, 0);
      elsif v_ok then
        v_score := v_score + coalesce(k.points,1);
      end if;

      insert into answers (attempt_id, question_id, option_id, is_correct,
                           dx_code, seconds, changes, confidence, meta, essay_text)
      values (v_attempt, v_q, v_opt, v_ok, v_dx,
              coalesce((a->>'sec')::int,0), coalesce((a->>'chg')::int,0),
              nullif(a->>'conf','')::int, v_meta, v_txt);

    else
      insert into answers (attempt_id, question_id, essay_text, seconds)
      values (v_attempt, v_q, a->>'essay', coalesce((a->>'sec')::int,0));
    end if;
  end loop;

  v_pct := case when v_total > 0 then round(v_score / v_total * 100)::int else 0 end;
  update attempts set score = v_score, total = v_total, pct = v_pct where id = v_attempt;

  if v_reveal = 'never' then
    return jsonb_build_object('attempt_id', v_attempt, 'reveal', 'never');
  end if;

  select jsonb_build_object(
    'attempt_id', v_attempt, 'score', v_score, 'total', v_total, 'pct', v_pct,
    'review', coalesce((
      select jsonb_agg(jsonb_build_object(
        'q', q.id, 'kind', q.kind, 'body', q.body,
        'chosen', ans.option_id, 'correct', qk.correct_id,
        /* 114 · وفي «إكمال من قائمة» الترتيب **رقمُ الفراغ** لا موضعُ
           بندٍ في options — فلا options له، والفراغ هو البند. */
        'given',  case when q.kind = 'matching' then (
                         select jsonb_agg(coalesce((
                                  select b->>'t'
                                    from jsonb_array_elements(coalesce(qk.bank,'[]'::jsonb)) b
                                   where b->>'k' = ans.meta -> 'given' ->> o.item_key), '')
                                order by o.position)
                           from options o
                          where o.question_id = q.id and o.item_key is not null)
                       when q.kind = 'cloze' then (
                         select jsonb_agg(coalesce((
                                  select b->>'t'
                                    from jsonb_array_elements(coalesce(qk.bank,'[]'::jsonb)) b
                                   where b->>'k' = ans.meta -> 'given' ->> i::text), '')
                                order by i)
                           from generate_series(1, gap_count(q.body)) i)
                       else ans.meta -> 'given' end,
        'accept', case when q.kind = 'gap' then qk.accept -> 'slots'
                       when q.kind = 'matching' then (
                         select jsonb_agg(coalesce((
                                  select b->>'t'
                                    from jsonb_array_elements(coalesce(qk.bank,'[]'::jsonb)) b
                                   where b->>'k' = qk.accept -> 'pairs' ->> o.item_key), '—')
                                order by o.position)
                           from options o
                          where o.question_id = q.id and o.item_key is not null)
                       when q.kind = 'cloze' then (
                         select jsonb_agg(coalesce((
                                  select b->>'t'
                                    from jsonb_array_elements(coalesce(qk.bank,'[]'::jsonb)) b
                                   where b->>'k' = qk.accept -> 'pairs' ->> i::text), '—')
                                order by i)
                           from generate_series(1, gap_count(q.body)) i) end,
        'is_correct', ans.is_correct,
        'note', d.student_note,
        'explanation', qk.explanation, 'model', qk.model_answer,
        'essay', case when q.kind in ('gap','matching','cloze') then null
                      else ans.essay_text end,
        'correct_ids', qk.correct_ids,
        'judgments', case when q.kind = 'msq' then coalesce((
            select jsonb_agg(jsonb_build_object(
                     'o',       o.id,
                     'key',     o.id = any (qk.correct_ids),
                     'picked',  coalesce(ans.meta -> 'picked', '[]'::jsonb)
                                  @> to_jsonb(o.id),
                     'note',    case when coalesce(ans.meta -> 'picked', '[]'::jsonb)
                                              @> to_jsonb(o.id)
                                      and not (o.id = any (qk.correct_ids))
                                     then d2.student_note end)
                   order by o.position)
              from options o
              left join dx_codes d2 on d2.code = qk.dx_map ->> o.id::text
             where o.question_id = q.id), '[]'::jsonb) end,
        'remedial', (select jsonb_build_object('title', it.title, 'kind', it.kind, 'url', it.url)
                     from objectives ob join items it on it.id = ob.remedial_item_id
                     where ob.id = q.objective_id)
      ) order by q.position)
      from answers ans
      join questions q on q.id = ans.question_id
      left join question_keys qk on qk.question_id = q.id
      left join dx_codes d on d.code = ans.dx_code
      where ans.attempt_id = v_attempt), '[]'::jsonb),
    'lesson_done', case when v_lesson is null then false else lesson_done(v_lesson) end,
    'unlocked', coalesce((
      select jsonb_agg(u.title) from lessons u
      where u.requires_id = v_lesson and lesson_done(v_lesson)), '[]'::jsonb)
  ) into v_res;

  return v_res;
end $function$;

grant execute on function public.submit_attempt(bigint, jsonb, integer, boolean)
  to anon, authenticated, service_role;


-- ═══════════════════════════════════════════════════════════════════════
-- ③ معدَّلة لا منشأة — save_question  (أصلُها 12 · وآخر مسّ 113)
--    والفرق عن 113 حذفٌ واحد: حارسُ «لا يُضاف إلى اختبارٍ منشور» يسقط،
--    فقد بُني ما كان يحرسه.
-- ═══════════════════════════════════════════════════════════════════════

create or replace function public.save_question(
  p_id bigint default null, p_quiz bigint default null,
  p_kind text default 'mcq', p_body text default null,
  p_position integer default 0, p_options jsonb default '[]'::jsonb,
  p_explanation text default null, p_model text default null,
  p_passage bigint default null, p_objective bigint default null,
  p_points integer default 1, p_lang text default 'ar',
  p_difficulty text default null, p_image text default null,
  p_video text default null, p_audio text default null,
  p_section text default null, p_accept jsonb default null,
  p_wrong jsonb default null, p_bank jsonb default null)
returns jsonb language plpgsql security definer set search_path to 'public'
as $function$
declare
  v_subject bigint; v_quizid bigint; v_qid bigint; v_oid bigint;
  v_correct bigint; v_dx jsonb := '{}'::jsonb;
  v_bad text; v_n int; v_k int; r record;
  v_ids bigint[] := '{}'::bigint[];
  v_gaps int;
  v_pairs int;
begin
  if auth.uid() is null then
    return jsonb_build_object('ok', false, 'error', 'يلزم تسجيل الدخول');
  end if;

  v_quizid := coalesce(p_quiz, (select q2.quiz_id from questions q2 where q2.id = p_id));
  select q.subject_id into v_subject from quizzes q where q.id = v_quizid;
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

    if exists (select 1 from jsonb_array_elements(p_options) o
                where not coalesce((o->>'correct')::boolean, false)
                  and coalesce(trim(o->>'dx'), '') = '') then
      return jsonb_build_object('ok', false,
        'error', 'كل خيار خاطئ يحتاج كود تشخيص — التشخيص هو ما يميّز بيان');
    end if;

    select o->>'dx' into v_bad from jsonb_array_elements(p_options) o
     where not coalesce((o->>'correct')::boolean, false)
       and not exists (select 1 from dx_codes d where d.code = o->>'dx')
     limit 1;
    if v_bad is not null then
      return jsonb_build_object('ok', false, 'error', 'كود تشخيص غير معروف: ' || v_bad);
    end if;

    if coalesce(trim(p_explanation), '') = '' then
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

    if exists (select 1 from jsonb_array_elements(p_options) o
                where not coalesce((o->>'correct')::boolean, false)
                  and coalesce(trim(o->>'dx'), '') = '') then
      return jsonb_build_object('ok', false,
        'error', 'كل خيار خاطئ يحتاج كود تشخيص — التشخيص هو ما يميّز بيان');
    end if;

    select o->>'dx' into v_bad from jsonb_array_elements(p_options) o
     where not coalesce((o->>'correct')::boolean, false)
       and not exists (select 1 from dx_codes d where d.code = o->>'dx')
     limit 1;
    if v_bad is not null then
      return jsonb_build_object('ok', false, 'error', 'كود تشخيص غير معروف: ' || v_bad);
    end if;

    if coalesce(trim(p_explanation), '') = '' then
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

    if coalesce(trim(p_explanation), '') = '' then
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

    if coalesce(trim(p_explanation), '') = '' then
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

    if coalesce(trim(p_explanation), '') = '' then
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

  if p_kind in ('mcq', 'msq', 'matching') then
    for r in select o, ord from jsonb_array_elements(p_options) with ordinality as t(o, ord) loop
      insert into options (question_id, position, label, body, image_url, item_key)
      values (v_qid, r.ord,
              nullif(trim(coalesce(r.o->>'label', '')), ''),
              trim(r.o->>'body'), nullif(r.o->>'image', ''),
              case when p_kind = 'matching' then r.o->>'k' end)
      returning id into v_oid;

      continue when p_kind = 'matching';

      if coalesce((r.o->>'correct')::boolean, false) then
        if p_kind = 'msq' then
          v_ids := v_ids || v_oid;
        else
          v_correct := v_oid;
        end if;
      else
        v_dx := v_dx || jsonb_build_object(v_oid::text, r.o->>'dx');
      end if;
    end loop;
  end if;

  insert into question_keys (question_id, correct_id, correct_ids,
                             explanation, model_answer, dx_map, accept, wrong_map, bank)
  values (v_qid, v_correct, nullif(v_ids, '{}'::bigint[]),
          nullif(trim(coalesce(p_explanation,'')), ''),
          nullif(trim(coalesce(p_model,'')), ''), v_dx,
          case when p_kind in ('gap','matching','cloze') then p_accept end,
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
end $function$;

grant execute on function public.save_question(bigint,bigint,text,text,integer,jsonb,
  text,text,bigint,bigint,integer,text,text,text,text,text,text,jsonb,jsonb,jsonb)
  to anon, authenticated, service_role;


-- ═══════════════════════════════════════════════════════════════════════
-- ④ معدَّلة لا منشأة — quiz_readiness  (أصلُها 22 · وآخر مسّ 113)
--    والفرق عن 113 حذفٌ واحد: قفلُ المرحلة يسقط. أمّا فحوصُ النمط
--    السبعةُ وتنبيهُ «بلا كلمةٍ زائدة» فتبقى — هي حراسةُ التأليف لا
--    حجبُ المرحلة، ولا تزول بزوالها.
-- ═══════════════════════════════════════════════════════════════════════

create or replace function public.quiz_readiness(p_quiz bigint)
returns jsonb language plpgsql stable security definer set search_path to 'public'
as $function$
declare v_mcq int; v_msq int; v_gap int; v_essay int; v_match int; v_cloze int;
        v_marks int;
        v_issues jsonb := '[]'::jsonb; v_warns jsonb := '[]'::jsonb;
        n int; v_kinds text;
begin
  if not exists (select 1 from quizzes where id = p_quiz) then
    return jsonb_build_object('ok', false, 'error', 'الاختبار غير موجود');
  end if;

  select count(*) filter (where kind='mcq'),
         count(*) filter (where kind='msq'),
         count(*) filter (where kind='gap'),
         count(*) filter (where kind='essay'),
         count(*) filter (where kind='matching'),
         count(*) filter (where kind='cloze')
    into v_mcq, v_msq, v_gap, v_essay, v_match, v_cloze from questions
   where quiz_id = p_quiz and retired_at is null;

  select coalesce(sum(points), 0) into v_marks from questions
   where quiz_id = p_quiz and retired_at is null
     and kind in ('mcq','msq','gap','matching','cloze');

  select string_agg(distinct kind, ' · ') into v_kinds
    from questions where quiz_id = p_quiz and retired_at is null
     and kind not in ('mcq','msq','gap','essay','matching','cloze');
  if v_kinds is not null then
    v_issues := v_issues || to_jsonb(
      'أنماط غير مبنيّة في الواجهة (' || v_kinds ||
      ') — ستُعرض للطالب كأسئلة مقالية');
  end if;

  if v_mcq + v_msq + v_gap + v_match + v_cloze < 6 then
    v_issues := v_issues || to_jsonb(
      'يلزم ٦ أسئلة موضوعية على الأقل — الموجود ' ||
      (v_mcq + v_msq + v_gap + v_match + v_cloze) ||
      ' (بأقلّ من ذلك تفقد عتبة ٦٥٪ معناها)');
  end if;

  select count(*) into n from questions x
    left join question_keys k on k.question_id = x.id
   where x.quiz_id = p_quiz and x.retired_at is null and x.kind='mcq' and (k.question_id is null or k.correct_id is null);
  if n > 0 then v_issues := v_issues || to_jsonb(n || ' سؤالاً بلا إجابة صحيحة محدَّدة'); end if;

  select count(*) into n from questions x
    join question_keys k on k.question_id = x.id
   where x.quiz_id = p_quiz and x.retired_at is null and x.kind='mcq' and coalesce(trim(k.explanation),'') = '';
  if n > 0 then v_issues := v_issues || to_jsonb(n || ' سؤالاً بلا شرح للخطأ'); end if;

  select count(*) into n from options o
    join questions x on x.id = o.question_id
    join question_keys k on k.question_id = x.id
   where x.quiz_id = p_quiz and x.retired_at is null and x.kind='mcq' and o.id is distinct from k.correct_id
     and coalesce(trim(k.dx_map ->> o.id::text), '') = '';
  if n > 0 then
    v_issues := v_issues || to_jsonb(n || ' خياراً خاطئاً بلا كود تشخيص — التشخيص هو ما يميّز بيان');
  end if;

  select count(*) into n from options o
    join questions x on x.id = o.question_id
    join question_keys k on k.question_id = x.id
   where x.quiz_id = p_quiz and x.retired_at is null and x.kind='mcq' and o.id is distinct from k.correct_id
     and (k.dx_map ->> o.id::text) is not null
     and not exists (select 1 from dx_codes d where d.code = k.dx_map ->> o.id::text);
  if n > 0 then v_issues := v_issues || to_jsonb(n || ' كود تشخيص غير معروف'); end if;

  select count(*) into n from questions x
    left join question_keys k on k.question_id = x.id
   where x.quiz_id = p_quiz and x.retired_at is null and x.kind='msq'
     and coalesce(array_length(k.correct_ids, 1), 0) < 2;
  if n > 0 then
    v_issues := v_issues || to_jsonb(n || ' سؤال اختيار متعدّد بأقلّ من إجابتين صحيحتين');
  end if;

  select count(*) into n from questions x
    join question_keys k on k.question_id = x.id
   where x.quiz_id = p_quiz and x.retired_at is null and x.kind='msq'
     and coalesce(array_length(k.correct_ids, 1), 0) >=
         (select count(*) from options o where o.question_id = x.id);
  if n > 0 then
    v_issues := v_issues || to_jsonb(
      n || ' سؤال اختيار متعدّد بلا خيار خاطئ — لا يميّز شيئاً');
  end if;

  select count(*) into n from options o
    join questions x on x.id = o.question_id
    join question_keys k on k.question_id = x.id
   where x.quiz_id = p_quiz and x.retired_at is null and x.kind='msq'
     and not (o.id = any (coalesce(k.correct_ids, '{}'::bigint[])))
     and coalesce(trim(k.dx_map ->> o.id::text), '') = '';
  if n > 0 then
    v_issues := v_issues || to_jsonb(
      n || ' خياراً خاطئاً في أسئلة الاختيار المتعدّد بلا كود تشخيص');
  end if;

  select count(*) into n from options o
    join questions x on x.id = o.question_id
    join question_keys k on k.question_id = x.id
   where x.quiz_id = p_quiz and x.retired_at is null and x.kind='msq'
     and (k.dx_map ->> o.id::text) is not null
     and not exists (select 1 from dx_codes d where d.code = k.dx_map ->> o.id::text);
  if n > 0 then v_issues := v_issues || to_jsonb(n || ' كود تشخيص غير معروف'); end if;

  select count(*) into n from questions x
    join question_keys k on k.question_id = x.id
   where x.quiz_id = p_quiz and x.retired_at is null and x.kind='msq' and coalesce(trim(k.explanation),'') = '';
  if n > 0 then
    v_issues := v_issues || to_jsonb(n || ' سؤال اختيار متعدّد بلا شرح للخطأ');
  end if;

  select count(*) into n from questions x
   where x.quiz_id = p_quiz and x.retired_at is null and x.kind='gap'
     and (gap_count(x.body) = 0 or not gap_seq_ok(x.body));
  if n > 0 then
    v_issues := v_issues || to_jsonb(
      n || ' سؤال إكمال بلا {{1}} في نصّه أو بأرقامٍ غير متتالية');
  end if;

  select count(*) into n from questions x
    left join question_keys k on k.question_id = x.id
   where x.quiz_id = p_quiz and x.retired_at is null and x.kind='gap'
     and (k.accept is null or jsonb_typeof(k.accept -> 'slots') <> 'array'
          or jsonb_array_length(k.accept -> 'slots') = 0);
  if n > 0 then
    v_issues := v_issues || to_jsonb(n || ' سؤال إكمال بلا مقبولات — لا يُصيبه أحد');
  end if;

  select count(*) into n from questions x
    join question_keys k on k.question_id = x.id
   where x.quiz_id = p_quiz and x.retired_at is null and x.kind='gap'
     and jsonb_typeof(k.accept -> 'slots') = 'array'
     and jsonb_array_length(k.accept -> 'slots') <> gap_count(x.body);
  if n > 0 then
    v_issues := v_issues || to_jsonb(
      n || ' سؤال إكمال لا يطابق عددُ مقبولاته عددَ فراغاته');
  end if;

  select count(*) into n from questions x
    join question_keys k on k.question_id = x.id
   where x.quiz_id = p_quiz and x.retired_at is null and x.kind='gap' and coalesce(trim(k.explanation),'') = '';
  if n > 0 then
    v_issues := v_issues || to_jsonb(n || ' سؤال إكمال بلا شرح للخطأ');
  end if;

  select count(*) into n from questions x
    join question_keys k on k.question_id = x.id,
       lateral jsonb_each(coalesce(k.wrong_map, '{}'::jsonb)) w
   where x.quiz_id = p_quiz and x.retired_at is null and x.kind='gap'
     and not exists (select 1 from dx_codes d where d.code = w.value #>> '{}');
  if n > 0 then v_issues := v_issues || to_jsonb(n || ' كود تشخيص غير معروف'); end if;

  -- 112 · البنك صار jsonb
  select count(*) into n from questions x
    join question_keys k on k.question_id = x.id
   where x.quiz_id = p_quiz and x.retired_at is null and x.kind='gap'
     and k.bank is not null
     and exists (select 1
                   from jsonb_array_elements(k.accept -> 'slots') s,
                        jsonb_array_elements_text(s) a
                  where not exists (select 1
                                      from jsonb_array_elements_text(k.bank) b
                                     where b = a));
  if n > 0 then
    v_issues := v_issues || to_jsonb(n || ' سؤالاً فيه مقبولٌ ليس في قائمة الكلمات');
  end if;

  -- ─── المزاوجة ────────────────────────────────────────────
  -- 112 · بندٌ بلا مفتاح: سؤالٌ من عهدٍ سابق لم يُحفَظ بعد الهجرة،
  --       ومفاتيحُه لا تُقرأ ⇒ لا يُصيبه أحد ولا يُشخَّص خطؤه.
  select count(distinct x.id) into n from questions x
    join options o on o.question_id = x.id
   where x.quiz_id = p_quiz and x.retired_at is null and x.kind='matching'
     and o.item_key is null;
  if n > 0 then
    v_issues := v_issues || to_jsonb(
      n || ' سؤال مزاوجة فيه بندٌ بلا مفتاح — افتحه في المحرّر واحفظه ليُبنى مفتاحه');
  end if;

  select count(*) into n from questions x
    left join question_keys k on k.question_id = x.id
   where x.quiz_id = p_quiz and x.retired_at is null and x.kind='matching'
     and not bank_keys_ok(k.bank);
  if n > 0 then
    v_issues := v_issues || to_jsonb(
      n || ' سؤال مزاوجة عمودُ مقابلاته مكسور — [ {"k":…,"t":…} ] بمفاتيحَ فريدة');
  end if;

  select count(*) into n from questions x
    left join question_keys k on k.question_id = x.id
   where x.quiz_id = p_quiz and x.retired_at is null and x.kind='matching'
     and match_pairs(k.accept) <>
         (select count(*) from options o where o.question_id = x.id);
  if n > 0 then
    v_issues := v_issues || to_jsonb(n || ' سؤال مزاوجة لا يطابق عددُ مفاتيحه عددَ بنوده');
  end if;

  select count(*) into n from questions x
    left join question_keys k on k.question_id = x.id
   where x.quiz_id = p_quiz and x.retired_at is null and x.kind='matching'
     and not match_key_ok(k.accept, k.bank);
  if n > 0 then
    v_issues := v_issues || to_jsonb(
      n || ' سؤال مزاوجة فيه مقابلٌ ليس في القائمة — وبندُه لا يُصيبه أحد');
  end if;

  -- 112 · مفتاحٌ في accept لا بندَ له — مفتاحٌ يتيمٌ لا يُقرأ أبداً
  select count(distinct x.id) into n from questions x
    join question_keys k on k.question_id = x.id,
       lateral jsonb_each_text(coalesce(k.accept -> 'pairs', '{}'::jsonb)) p
   where x.quiz_id = p_quiz and x.retired_at is null and x.kind='matching'
     and not exists (select 1 from options o
                      where o.question_id = x.id and o.item_key = p.key);
  if n > 0 then
    v_issues := v_issues || to_jsonb(
      n || ' سؤال مزاوجة فيه مفتاحُ بندٍ لا وجود له بين البنود');
  end if;

  select count(*) into n from questions x
    join question_keys k on k.question_id = x.id,
       lateral jsonb_each(coalesce(k.wrong_map, '{}'::jsonb)) w
   where x.quiz_id = p_quiz and x.retired_at is null and x.kind='matching'
     and not exists (select 1 from dx_codes d where d.code = w.value #>> '{}');
  if n > 0 then v_issues := v_issues || to_jsonb(n || ' كود تشخيص غير معروف'); end if;

  select count(*) into n from questions x
    join question_keys k on k.question_id = x.id
   where x.quiz_id = p_quiz and x.retired_at is null and x.kind='matching'
     and coalesce(trim(k.explanation),'') = '';
  if n > 0 then
    v_issues := v_issues || to_jsonb(n || ' سؤال مزاوجة بلا شرح للخطأ');
  end if;

  -- ⚠️ تنبيهٌ لا منع: بنكٌ استُهلك كلُّه ⇒ البند الأخير يُحلّ بالاستبعاد.
  --    112 · والمقارنة بالمفاتيح لا بالنصوص.
  select count(*) into n from questions x
    join question_keys k on k.question_id = x.id
   where x.quiz_id = p_quiz and x.retired_at is null and x.kind='matching'
     and k.bank is not null and match_pairs(k.accept) > 0
     and not exists (
           select 1 from jsonb_array_elements(k.bank) b
            where not exists (
                  select 1 from jsonb_each_text(k.accept -> 'pairs') p
                   where p.value = b ->> 'k'));
  if n > 0 then
    v_warns := v_warns || to_jsonb(
      n || ' سؤال مزاوجة بلا مقابلٍ زائد — البند الأخير يُحلّ بالاستبعاد فلا يُشخَّص');
  end if;

  -- ─── 113 · إكمال من قائمة ────────────────────────────────
  select count(*) into n from questions x
   where x.quiz_id = p_quiz and x.retired_at is null and x.kind='cloze'
     and (gap_count(x.body) < 2 or gap_count(x.body) > 8 or not gap_seq_ok(x.body));
  if n > 0 then
    v_issues := v_issues || to_jsonb(
      n || ' سؤال «إكمال من قائمة» فراغاتُه أقلُّ من اثنين أو أكثرُ من ثمانية '
        || 'أو أرقامُها غير متتالية من ١');
  end if;

  -- الفراغُ هو البند ⇒ خيارٌ مخزَّنٌ هنا لا يُقرأ أبداً
  select count(distinct x.id) into n from questions x
    join options o on o.question_id = x.id
   where x.quiz_id = p_quiz and x.retired_at is null and x.kind='cloze';
  if n > 0 then
    v_issues := v_issues || to_jsonb(
      n || ' سؤال «إكمال من قائمة» فيه خياراتٌ مخزَّنة — الفراغُ هو البند فلا خيارات له');
  end if;

  select count(*) into n from questions x
    left join question_keys k on k.question_id = x.id
   where x.quiz_id = p_quiz and x.retired_at is null and x.kind='cloze'
     and not bank_keys_ok(k.bank);
  if n > 0 then
    v_issues := v_issues || to_jsonb(
      n || ' سؤال «إكمال من قائمة» قائمةُ كلماته مكسورة — [ {"k":…,"t":…} ] بمفاتيحَ فريدة');
  end if;

  select count(*) into n from questions x
    left join question_keys k on k.question_id = x.id
   where x.quiz_id = p_quiz and x.retired_at is null and x.kind='cloze'
     and not cloze_keys_ok(k.accept, gap_count(x.body));
  if n > 0 then
    v_issues := v_issues || to_jsonb(
      n || ' سؤال «إكمال من قائمة» فيه فراغٌ بلا مفتاح — لكلّ فراغٍ مفتاحُه برقمه');
  end if;

  select count(*) into n from questions x
    left join question_keys k on k.question_id = x.id
   where x.quiz_id = p_quiz and x.retired_at is null and x.kind='cloze'
     and not match_key_ok(k.accept, k.bank);
  if n > 0 then
    v_issues := v_issues || to_jsonb(
      n || ' سؤال «إكمال من قائمة» فيه صوابٌ ليس في القائمة — وفراغُه لا يُصيبه أحد');
  end if;

  select count(*) into n from questions x
    join question_keys k on k.question_id = x.id,
       lateral jsonb_each(coalesce(k.wrong_map, '{}'::jsonb)) w
   where x.quiz_id = p_quiz and x.retired_at is null and x.kind='cloze'
     and not exists (select 1 from dx_codes d where d.code = w.value #>> '{}');
  if n > 0 then v_issues := v_issues || to_jsonb(n || ' كود تشخيص غير معروف'); end if;

  select count(*) into n from questions x
    join question_keys k on k.question_id = x.id
   where x.quiz_id = p_quiz and x.retired_at is null and x.kind='cloze'
     and coalesce(trim(k.explanation),'') = '';
  if n > 0 then
    v_issues := v_issues || to_jsonb(n || ' سؤال «إكمال من قائمة» بلا شرح للخطأ');
  end if;

  -- ⚠️ تنبيهٌ لا منع — نظيرُ تنبيه المزاوجة بحرفه: بلا كلمةٍ زائدة
  --    يُحلّ الفراغُ الأخير بالاستبعاد، فيُصيبه من يجهله ولا يُسجَّل له كود.
  select count(*) into n from questions x
    join question_keys k on k.question_id = x.id
   where x.quiz_id = p_quiz and x.retired_at is null and x.kind='cloze'
     and k.bank is not null and match_pairs(k.accept) > 0
     and not exists (
           select 1 from jsonb_array_elements(k.bank) b
            where not exists (
                  select 1 from jsonb_each_text(k.accept -> 'pairs') p
                   where p.value = b ->> 'k'));
  if n > 0 then
    v_warns := v_warns || to_jsonb(
      n || ' سؤال «إكمال من قائمة» بلا كلمةٍ زائدة — الفراغ الأخير يُحلّ بالاستبعاد فلا يُشخَّص');
  end if;

  select count(*) into n from questions x
    left join question_keys k on k.question_id = x.id
   where x.quiz_id = p_quiz and x.retired_at is null and x.kind='essay'
     and coalesce(trim(k.model_answer),'') = '';
  if n > 0 then v_issues := v_issues || to_jsonb(n || ' سؤالاً مقالياً بلا إجابة نموذجية'); end if;

  return jsonb_build_object(
    'ok', jsonb_array_length(v_issues) = 0,
    'mcq', v_mcq, 'msq', v_msq, 'gap', v_gap, 'essay', v_essay,
    'match', v_match, 'cloze', v_cloze, 'marks', v_marks,
    'issues', v_issues, 'warns', v_warns);
end $function$;

grant execute on function public.quiz_readiness(bigint)
  to authenticated, service_role;


-- ═══════════════════════════════════════════════════════════════════════
-- ⑤ السجلّ
-- ═══════════════════════════════════════════════════════════════════════

insert into public.sql_log (n, title, applied_at)
values ('114', '«إكمال من قائمة» يبلغ الطالب — ويُرفع قفلُ المرحلة', now())
on conflict (n) do update set applied_at = now();
