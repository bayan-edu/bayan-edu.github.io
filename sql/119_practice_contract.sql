-- ═══════════════════════════════════════════════════════════════════════
-- 119 · حمولةُ الزائر تُردّ إلى عقد render_q — والبنكُ يُخلَط
--
-- `render_q.js` هو الراسمُ الواحد في المنصّة: «ما يراه المؤلّف هو ما يراه
-- الطالب — لأنها الدالّة نفسها». وعقدُه يحدّده `get_quiz` لا غيرُه. وقُورن
-- به ما يرسله `118` فإذا ثلاثةُ أسماءٍ تتفارق وسلوكٌ ناقص:
--
-- 🔴 **وكلُّها تنكسر صامتةً:**
--   ① `options[].item_key` واسمُه في العقد **`k`**. و`render_q` يقرأ
--      `p.k` في المزاوجة ⇒ `data-k=""` في كلّ خانة، فتعود `pairs`
--      بمفاتيحَ فارغة، **فتُصحَّح كلُّها خطأً بلا خطأٍ يظهر**.
--   ② `passage` واسمُه في العقد `passage_id` ⇒ لا يُربط سؤالٌ بنصّه.
--   ③ `gaps` غائبة، و`get_quiz` تحسبها بـ`gap_count(body)`.
--
-- 🔒 **والبنكُ يُخلَط — وهي حراسةٌ لا زينة.** بنكٌ بترتيب التأليف يضع
--    مقابلَ البند الأوّل أوّلاً ⇒ **الموضعُ يكشف الإجابة**، فيُصيب من
--    يجهل ويُسجَّل له صواب. ولهذا يخلطه `get_quiz` بالبذرة.
--    ⚠️ **والخلطُ هنا بالمفتاح لا بالموضع ولا بالنصّ** — درس `112`:
--       تحريرُ حرفٍ في نصّ مقابلٍ كان يقطع كلَّ إشارةٍ إليه وبصمت.
--    ⚠️ **وثابتٌ لا عشوائيّ:** اللقطةُ مجمَّدة، ودالّةُ بنائها `stable`.
--       فالبذرة `id السؤال + مفتاح العنصر` — ليست ترتيبَ التأليف، وهو
--       المطلوب، وتبقى واحدةً لكلّ من فتح الرابط.
-- ═══════════════════════════════════════════════════════════════════════

set check_function_bodies = off;


-- ═══════════════════════════════════════════════════════════════════════
-- ① معدَّلة لا منشأة — practice_snapshot_quiz  (أصلُها 117 · وآخر مسّ 118)
--    قُرئت حيّةً قبل الاستبدال. والفروق: `k` بدل `item_key` ·
--    `passage_id` بدل `passage` · `gaps` تُضاف · والبنكُ يُخلَط.
--    وما عداه بحرفه — ومنه `dx_extra` الذي أضافه 118.
-- ═══════════════════════════════════════════════════════════════════════

create or replace function public.practice_snapshot_quiz(p_quiz bigint)
returns jsonb language sql stable security definer set search_path to 'public'
as $function$
  select jsonb_build_object(
    'kind',  'quiz',
    'title', q.title,
    'minutes', q.minutes,
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
        'difficulty', x.difficulty,
        -- ② الاسمُ كما في عقد get_quiz لا كما أهوى
        'passage_id', x.passage_id,
        'image', x.image_url, 'video', x.video_url, 'audio', x.audio_url,
        -- ③ تُحسب هنا كما تحسبها get_quiz، فلا تُحسب في الواجهة مرّتين
        'gaps', case when x.kind = 'gap' then gap_count(x.body) end,

        -- 🔒 البنكُ مخلوطٌ بالمفتاح (نصّاً في gap، و k في المزاوجة والإكمال)
        'bank', case
                  when x.kind = 'gap' then
                    (select jsonb_agg(b order by md5(x.id::text || b))
                       from jsonb_array_elements_text(coalesce(k.bank,'[]'::jsonb)) b)
                  when x.kind in ('matching','cloze') then
                    (select jsonb_agg(b order by md5(x.id::text || (b->>'k')))
                       from jsonb_array_elements(coalesce(k.bank,'[]'::jsonb)) b)
                end,

        -- ① `k` لا `item_key` — وهو ما يقرأه render_q في المزاوجة
        'options', coalesce((
          select jsonb_agg(jsonb_build_object(
                   'id', o.id, 'label', o.label, 'body', o.body,
                   'image', o.image_url, 'k', o.item_key)
                 order by o.position)
            from options o where o.question_id = x.id), '[]'::jsonb),

        'key', jsonb_build_object(
                 'correct_id',  k.correct_id,
                 'correct_ids', k.correct_ids,
                 'accept',      k.accept,
                 'bank',        k.bank),          -- الخامُ يبقى للتصحيح
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
-- ② معدَّلة لا منشأة — open_practice_session  (أصلُها 118)
--    🔑 والبنكُ المرسَل هو `bank` المخلوط **لا `key.bank` الخام**.
--       وكان يُرسَل الخام، فيصل الزائرَ بترتيب التأليف.
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
  if now() < s.opens_at then
    return jsonb_build_object('ok', false, 'error', 'لم تُفتح هذه الجلسة بعد');
  end if;
  if now() > s.expires_at then
    return jsonb_build_object('ok', false, 'error', 'انتهت مدّة هذا الرابط');
  end if;

  if s.kind = 'cards' then
    return jsonb_build_object('ok', true, 'kind', 'cards', 'title', s.title,
      'expires_at', s.expires_at, 'cards', s.snapshot -> 'cards');
  end if;

  return jsonb_build_object('ok', true, 'kind', 'quiz', 'title', s.title,
    'expires_at', s.expires_at,
    'passages', s.snapshot -> 'passages',
    'questions', coalesce((
      select jsonb_agg(jsonb_build_object(
               'id', q->'id', 'kind', q->'kind', 'body', q->'body',
               'position', q->'position', 'points', q->'points',
               'lang', q->'lang', 'section', q->'section',
               'passage_id', q->'passage_id', 'difficulty', q->'difficulty',
               'gaps', q->'gaps',
               'image', q->'image', 'video', q->'video', 'audio', q->'audio',
               'options', q->'options',
               'bank', q->'bank')          -- 🔒 المخلوط لا الخام
             order by (q->>'position')::int, (q->>'id')::bigint)
      from jsonb_array_elements(s.snapshot -> 'questions') q), '[]'::jsonb));
end $function$;

revoke all on function public.open_practice_session(text)
  from public, anon, authenticated;
grant execute on function public.open_practice_session(text)
  to anon, authenticated, service_role;


-- ═══════════════════════════════════════════════════════════════════════
-- ③ السجلّ
-- ═══════════════════════════════════════════════════════════════════════

insert into public.sql_log (n, title, applied_at)
values ('119', 'حمولةُ الزائر تُردّ إلى عقد render_q — والبنكُ يُخلَط', now())
on conflict (n) do update set applied_at = now();
