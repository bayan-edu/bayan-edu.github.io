-- ═══════════════════════════════════════════════════════════════════════
-- 118 · جلسةُ التدرّب تبلغ الزائر — ويُفتح أوّلُ بابٍ لـ anon في المشروع
--
-- بنى `117` الجدولين واللقطةَ وأغلق البابَ. وهذا الملفّ يفتحه: دالّتان
-- ولا ثالثة، ولا صلاحيةَ على جدولٍ إطلاقاً.
--
-- 🔒 **وكلُّ حارسٍ داخل الدالّة لا في الواجهة.** النافذةُ الزمنية تُفحص
--    هنا، وحدُّ التكرار هنا، وحجمُ الإجابة هنا. فالواجهةُ راحةٌ لا
--    حراسة، ومن نادى الدالّة مباشرةً لقي ما يلقاه من الشاشة.
--
-- 🔑 **والتصحيحُ بمصحِّحِ المنصّة نفسِه:** `grade_gap` و`grade_match`
--    دالّتان `immutable` على jsonb محض — تعملان على اللقطة بحرفهما.
--    **ولا مصحِّحَ ثانٍ يُكتب**، لأنّ نسختين تتفارقان عند أوّل إصلاح.
--    وما لم يُغطّه (mcq · msq) مقارنةُ معرّفاتٍ داخل اللقطة، بترتيب
--    الخيارات فيها — وهو ترتيبُ `position` مجمَّداً.
--
-- 🔑 **ولا حدَّ للمحاولات.** الجلسةُ تدريبٌ بلا قياس، فمنعُ «التجربة حتى
--    الفهم» يمنع الغاية نفسَها. وحدُّ التكرار (١٢٠/دقيقة للجلسة) **حمايةُ
--    خادمٍ من آلةٍ، لا نزاهةُ تقييم** — وهو يسع صفّاً من ثلاثين يجيب
--    أربعَ مرّاتٍ في الدقيقة.
--
-- ⚠️ **والبطاقةُ لا تُصحَّح:** حكمُ المتعلّم على نفسه يُسجَّل تقديراً،
--    و`is_correct` يبقى **فارغاً** — لا `true` ولا `false`. وصفٌّ يقول
--    «صحيح» عن حكمٍ ذاتيّ يكذب على كلّ من يقرأ الجدول بعد سنة.
-- ═══════════════════════════════════════════════════════════════════════

set check_function_bodies = off;


-- ═══════════════════════════════════════════════════════════════════════
-- ① معدَّلة لا منشأة — practice_snapshot_quiz  (أصلُها 117)
--    قُرئت حيّةً قبل الاستبدال. والفرق `dx_extra`:
--
--    🔴 **سببُها عطلٌ كان سيقع صامتاً.** كودان يُسنِدهما المصحِّحُ نفسُه
--       لا خريطةُ المؤلّف: `PRC` (أصاب المعنى وأخطأ الصيغة) و`HLF`
--       (أصاب بعضاً وأخطأ بعضاً). وهما ليسا في `dx_map` ولا `wrong_map`
--       ⇒ فلقطةٌ بلا قاموسٍ لهما تُعيد **كوداً بلا نصّ**، والزائر يقرأ
--       «أخطأتَ» بلا «لماذا». **وصمتُ التشخيص أخطر من خطئه.**
-- ═══════════════════════════════════════════════════════════════════════

create or replace function public.practice_snapshot_quiz(p_quiz bigint)
returns jsonb language sql stable security definer set search_path to 'public'
as $function$
  select jsonb_build_object(
    'kind',  'quiz',
    'title', q.title,
    'minutes', q.minutes,

    -- قاموسُ ما يُسنده المصحِّح لا المؤلّف
    'dx_extra', coalesce((
      select jsonb_object_agg(d.code,
               jsonb_build_object('code', d.code, 'note', d.student_note))
        from dx_codes d where d.code in ('PRC','HLF')), '{}'::jsonb),

    'passages', coalesce((
      select jsonb_agg(jsonb_build_object(
               'id', g.id, 'title', g.title, 'body', g.body,
               'kind', g.kind, 'lang', g.lang, 'media', g.media_url)
             order by g.position)
        from passages g where g.quiz_id = q.id), '[]'::jsonb),

    'questions', coalesce((
      select jsonb_agg(jsonb_build_object(
        'id', x.id, 'kind', x.kind, 'body', x.body, 'position', x.position,
        'points', x.points, 'lang', x.lang, 'section', x.section,
        'passage', x.passage_id, 'difficulty', x.difficulty,
        'image', x.image_url, 'video', x.video_url, 'audio', x.audio_url,
        'options', coalesce((
          select jsonb_agg(jsonb_build_object(
                   'id', o.id, 'label', o.label, 'body', o.body,
                   'image', o.image_url, 'item_key', o.item_key)
                 order by o.position)
            from options o where o.question_id = x.id), '[]'::jsonb),
        'key', jsonb_build_object(
                 'correct_id',  k.correct_id,
                 'correct_ids', k.correct_ids,
                 'accept',      k.accept,
                 'bank',        k.bank),
        'explanation', k.explanation,
        'dx', coalesce((
          select jsonb_object_agg(e.key,
                   jsonb_build_object('code', e.value, 'note', d.student_note))
            from jsonb_each_text(coalesce(k.dx_map, '{}'::jsonb)) e
            left join dx_codes d on d.code = e.value), '{}'::jsonb),
        'wrong', coalesce((
          select jsonb_object_agg(e.key,
                   jsonb_build_object('code', e.value, 'note', d.student_note))
            from jsonb_each_text(coalesce(k.wrong_map, '{}'::jsonb)) e
            left join dx_codes d on d.code = e.value), '{}'::jsonb)
      ) order by x.position)
      from questions x
      left join question_keys k on k.question_id = x.id
     where x.quiz_id = q.id
       and x.retired_at is null
       and x.kind in ('mcq','msq','gap','matching','cloze')
    ), '[]'::jsonb))
  from quizzes q where q.id = p_quiz;
$function$;

revoke all on function public.practice_snapshot_quiz(bigint)
  from public, anon, authenticated;


-- ═══════════════════════════════════════════════════════════════════════
-- ② الفتح — ما يراه الزائر قبل أن يُجيب
--    🔒 يُحذف من كلّ سؤال: `key` · `explanation` · `dx` · `wrong`.
--       الحذفُ هنا لا في الواجهة — فما يصل المتصفّحَ يُقرأ في أدوات
--       المطوّر مهما أُخفي في الرسم.
-- ═══════════════════════════════════════════════════════════════════════

create or replace function public.open_practice_session(p_token text)
returns jsonb language plpgsql stable security definer set search_path to 'public'
as $function$
declare s record;
begin
  select id, kind, title, snapshot, opens_at, expires_at into s
    from practice_sessions where id = p_token;

  if not found then
    return jsonb_build_object('ok', false, 'error', 'رابطٌ غير معروف');
  end if;
  -- التمييزُ بين «انتهى» و«غير معروف» مقصود: التوكن ١٢٨ بتاً فالتعدادُ
  -- محال، والزائرُ الذي تأخّر يستحقّ أن يُقال له لماذا لا «لا شيء هنا».
  if now() < s.opens_at then
    return jsonb_build_object('ok', false, 'error', 'لم تُفتح هذه الجلسة بعد');
  end if;
  if now() > s.expires_at then
    return jsonb_build_object('ok', false, 'error', 'انتهت مدّة هذا الرابط');
  end if;

  if s.kind = 'cards' then
    -- ظهرُ البطاقة يصل: البطاقةُ حكمُ المتعلّم على نفسه لا تصحيحٌ يُخفى
    return jsonb_build_object('ok', true, 'kind', 'cards', 'title', s.title,
      'expires_at', s.expires_at,
      'cards', s.snapshot -> 'cards');
  end if;

  return jsonb_build_object('ok', true, 'kind', 'quiz', 'title', s.title,
    'expires_at', s.expires_at,
    'passages', s.snapshot -> 'passages',
    'questions', coalesce((
      select jsonb_agg(jsonb_build_object(
               'id', q->'id', 'kind', q->'kind', 'body', q->'body',
               'position', q->'position', 'points', q->'points',
               'lang', q->'lang', 'section', q->'section',
               'passage', q->'passage', 'difficulty', q->'difficulty',
               'image', q->'image', 'video', q->'video', 'audio', q->'audio',
               'options', q->'options',
               -- بنكُ المزاوجة والإكمال معروضٌ أصلاً للطالب — لا مفتاحَ فيه
               'bank', q->'key'->'bank')
             order by (q->>'position')::int, (q->>'id')::bigint)
      from jsonb_array_elements(s.snapshot -> 'questions') q), '[]'::jsonb));
end $function$;


-- ═══════════════════════════════════════════════════════════════════════
-- ③ التسليم — بابٌ واحد للنمطين
--    ولم تُكتب دالّتان: الحارسُ واحد وحدُّ التكرار واحد، وبابان إلى
--    غرفةٍ واحدة يُنسى أحدهما عند أوّل إحكام.
-- ═══════════════════════════════════════════════════════════════════════

create or replace function public.submit_practice_answer(
  p_token text, p_name text, p_ref text, p_answer jsonb)
returns jsonb language plpgsql security definer set search_path to 'public'
as $function$
declare s record; q jsonb; v_name text;
        v_ok bool := false; v_dx text; v_note text; v_g jsonb;
        v_opt text; v_picked bigint[]; v_keys bigint[];
        v_correct jsonb; v_rating int;
begin
  select id, kind, snapshot, opens_at, expires_at into s
    from practice_sessions where id = p_token;
  if not found then
    return jsonb_build_object('ok', false, 'error', 'رابطٌ غير معروف');
  end if;
  if now() not between s.opens_at and s.expires_at then
    return jsonb_build_object('ok', false, 'error', 'انتهت مدّة هذا الرابط');
  end if;

  -- حمايةُ خادمٍ من آلة، لا نزاهةُ تقييم: يسع صفّاً من ثلاثين
  if (select count(*) from practice_responses r
       where r.session_id = p_token
         and r.submitted_at > now() - interval '1 minute') >= 120 then
    return jsonb_build_object('ok', false, 'error', 'أبطئ قليلاً ثمّ أعد المحاولة');
  end if;

  if length(coalesce(p_answer::text, '')) > 4000 then
    return jsonb_build_object('ok', false, 'error', 'إجابةٌ أكبر ممّا يُقبل');
  end if;

  v_name := nullif(left(trim(coalesce(p_name, '')), 40), '');

  -- ── البطاقات: تقديرٌ يُسجَّل، ولا حكمَ صوابٍ يُكتب ──
  if s.kind = 'cards' then
    if not exists (select 1 from jsonb_array_elements(s.snapshot->'cards') c
                    where c->>'id' = p_ref) then
      return jsonb_build_object('ok', false, 'error', 'بطاقةٌ ليست في هذه الجلسة');
    end if;
    v_rating := least(4, greatest(1, coalesce((p_answer->>'rating')::int, 3)));
    insert into practice_responses (session_id, ref, display_name, answer, is_correct)
    values (p_token, p_ref, v_name, jsonb_build_object('rating', v_rating), null);
    return jsonb_build_object('ok', true, 'kind', 'cards', 'rating', v_rating);
  end if;

  -- ── الأسئلة ──
  select x into q from jsonb_array_elements(s.snapshot->'questions') x
   where x->>'id' = p_ref;
  if q is null then
    return jsonb_build_object('ok', false, 'error', 'سؤالٌ ليس في هذه الجلسة');
  end if;

  if q->>'kind' = 'mcq' then
    v_opt := nullif(p_answer->>'o', '');
    v_ok  := v_opt is not null and v_opt = (q->'key'->>'correct_id');
    if not v_ok and v_opt is not null then
      v_dx   := q->'dx'->v_opt->>'code';
      v_note := q->'dx'->v_opt->>'note';
    end if;
    v_correct := q->'key'->'correct_id';

  elsif q->>'kind' = 'msq' then
    select coalesce(array_agg(distinct (e #>> '{}')::bigint), '{}'::bigint[])
      into v_picked from jsonb_array_elements(coalesce(p_answer->'os','[]'::jsonb)) e;
    select coalesce(array_agg((e #>> '{}')::bigint), '{}'::bigint[])
      into v_keys from jsonb_array_elements(coalesce(q->'key'->'correct_ids','[]'::jsonb)) e;
    v_ok := (v_picked <@ v_keys) and (v_keys <@ v_picked);
    if not v_ok then
      -- أوّلُ خاطئٍ بترتيب الخيارات في اللقطة — وهو ترتيب position مجمَّداً
      select q->'dx'->(o->>'id')->>'code', q->'dx'->(o->>'id')->>'note'
        into v_dx, v_note
        from jsonb_array_elements(q->'options') with ordinality as t(o, n)
       where (o->>'id')::bigint = any (v_picked)
         and not ((o->>'id')::bigint = any (v_keys))
       order by t.n limit 1;
    end if;
    v_correct := q->'key'->'correct_ids';

  elsif q->>'kind' = 'gap' then
    v_g  := grade_gap(coalesce(q->'key'->'accept','{}'::jsonb),
                      coalesce(p_answer->'txt','[]'::jsonb));
    v_ok := coalesce((v_g->>'ok')::bool, false);
    if v_ok then
      if coalesce((v_g->>'case_slip')::bool, false) then v_dx := 'PRC'; end if;
    else
      select q->'wrong'->(t.ord::text || ':' || (t.e #>> '{}'))->>'code',
             q->'wrong'->(t.ord::text || ':' || (t.e #>> '{}'))->>'note'
        into v_dx, v_note
        from jsonb_array_elements(coalesce(p_answer->'txt','[]'::jsonb))
             with ordinality as t(e, ord)
       where q->'wrong' ? (t.ord::text || ':' || (t.e #>> '{}')) limit 1;
      if v_dx is null and coalesce((v_g->>'hits')::int,0) > 0 then v_dx := 'HLF'; end if;
    end if;
    v_correct := q->'key'->'accept'->'slots';

  elsif q->>'kind' in ('matching','cloze') then
    v_g  := grade_match(coalesce(q->'key'->'accept','{}'::jsonb),
                        coalesce(p_answer->'pairs','{}'::jsonb));
    v_ok := coalesce((v_g->>'ok')::bool, false);
    if not v_ok then
      select q->'wrong'->(g.key || ':' || g.value)->>'code',
             q->'wrong'->(g.key || ':' || g.value)->>'note'
        into v_dx, v_note
        from jsonb_each_text(coalesce(p_answer->'pairs','{}'::jsonb)) g
       where q->'wrong' ? (g.key || ':' || g.value) limit 1;
      if v_dx is null and coalesce((v_g->>'hits')::int,0) > 0 then v_dx := 'HLF'; end if;
    end if;
    -- المفاتيحُ تُردّ نصّاً من البنك لا رموزاً (درس 112)
    v_correct := coalesce((
      select jsonb_object_agg(a.key, coalesce((
               select b->>'t' from jsonb_array_elements(coalesce(q->'key'->'bank','[]'::jsonb)) b
                where b->>'k' = a.value), a.value))
        from jsonb_each_text(coalesce(q->'key'->'accept'->'pairs','{}'::jsonb)) a),
      '{}'::jsonb);

  else
    return jsonb_build_object('ok', false, 'error', 'نمطٌ لا يُصحَّح في جلسة التدرّب');
  end if;

  -- 🔑 كودٌ بلا نصّ صمتٌ — و PRC و HLF يُسنِدهما المصحِّح لا المؤلّف،
  --    فنصُّهما في قاموس اللقطة لا في خريطة السؤال.
  if v_dx is not null and v_note is null then
    v_note := s.snapshot->'dx_extra'->v_dx->>'note';
  end if;

  insert into practice_responses (session_id, ref, display_name, answer, is_correct, dx_code)
  values (p_token, p_ref, v_name, p_answer, v_ok, v_dx);

  return jsonb_build_object(
    'ok', true, 'kind', q->>'kind',
    'is_correct', v_ok,
    'dx', case when v_dx is null then null
               else jsonb_build_object('code', v_dx, 'note', v_note) end,
    'explanation', q->>'explanation',
    'correct', v_correct,
    'hits', v_g->'hits', 'of', coalesce(v_g->'slots', v_g->'pairs'));
end $function$;


-- ═══════════════════════════════════════════════════════════════════════
-- ④ المنح — وهو أوّلُ ما يُفتح لـ anon في هذا المشروع
--    والثلاثةُ قبله: بوستجريس يمنح PUBLIC، وسوبابيس يمنح anon بالافتراضيّ
--    (pg_default_acl) ⇒ السحبُ من الثلاثة ثمّ منحٌ صريحٌ يُقصد (117 · ⑤).
-- ═══════════════════════════════════════════════════════════════════════

revoke all on function public.open_practice_session(text)
  from public, anon, authenticated;
grant execute on function public.open_practice_session(text)
  to anon, authenticated, service_role;

revoke all on function public.submit_practice_answer(text, text, text, jsonb)
  from public, anon, authenticated;
grant execute on function public.submit_practice_answer(text, text, text, jsonb)
  to anon, authenticated, service_role;


-- ═══════════════════════════════════════════════════════════════════════
-- ⑤ السجلّ
-- ═══════════════════════════════════════════════════════════════════════

insert into public.sql_log (n, title, applied_at)
values ('118', 'جلسةُ التدرّب تبلغ الزائر — ويُفتح أوّلُ بابٍ لـ anon', now())
on conflict (n) do update set applied_at = now();
