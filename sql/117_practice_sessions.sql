-- ═══════════════════════════════════════════════════════════════════════
-- 117 · جلسات التدرّب — البنية والتجميد وحدهما، وبابُ الزائر مغلق
--
-- معلّمٌ يولّد رابطاً لاختبارٍ ألّفه أو رزمةِ بطاقات، فيدخل حاملُ الرابط
-- بلا حسابٍ ولا تسجيل، ويتدرّب بمحاولاتٍ غير محدودة، **ويأخذ تشخيصاً
-- كامل الجودة**. ولا تقييمَ ولا قياسَ ولا سجلَّ تعلّمٍ يترتّب على ذلك.
--
-- 🔒 **وهذا الملفّ لا يمنح `anon` شيئاً.** الدالّتان اللتان يمسّهما
--    الزائر (`open_practice_session` · `submit_practice_answer`) في
--    `118`، والبابُ هنا مغلق. وهو مسلكُ `109` يوم بلغت المزاوجةُ
--    المحرّرَ قبل أن تبلغ الطالب: **بنيةٌ تُختبَر قبل أن تُفتح.**
--
-- 🔑 **الحكم المعماريّ: الجلسة نسخةٌ معزولة لا مؤشّرٌ حيّ.**
--    لا مفتاحَ خارجيّاً من هذين الجدولين إلى `questions` ولا `options`
--    ولا `dx_codes` ولا `quizzes`. و`source_id` رقمٌ **بلا مفتاح خارجيّ
--    عمداً** — مرجعيّةٌ للمعلّم في قائمته، لا طريقٌ إلى القاعدة.
--    ⇒ فالعزلُ حقيقةٌ بنيوية لا وعدٌ في سياسةٍ تُخطئ كتابتُها يوماً،
--      ومن ملك التوكن لا يملك مساراً فيزيائياً إلى شيءٍ آخر.
--    ⇒ وتعديلُ المعلّم لأصله بعدها **لا ينعكس على رابطٍ وُلد** — تجميدٌ
--      مقصود. وهو ثمنٌ يُدفع عن علم: ما رآه الزائر يبقى كما رآه.
--
-- 🔑 **والتشخيصُ يُنسَخ كاملاً — وإلّا فلا معنى للجلسة.** لكلّ مشتّتٍ
--    كودُه **ونصُّ الطالب وحده** (`dx_codes.student_note`). ولغةُ المعلّم
--    (`name` · `remedy`) **لا تُنسَخ إطلاقاً** — وهو حارس `62` و`95`
--    بحرفه: البابُ إلى الطالب ضيّقٌ، والزائرُ دونه.
--
-- ⚠️ **والمقاليُّ يُستبعَد ويُقال عددُه.** لا مصحِّحَ آلياً له، ولا
--    معلّمَ يقرأ إجابة زائرٍ مجهول ⇒ سؤالٌ يُجاب ولا يُردّ عليه بشيء.
--    و`create_practice_session` تُرجع `skipped_essay` — **فالنقصُ يُرى
--    ولا يُصمَت عنه** (⑤). وفي القاعدة اليوم خمسةٌ وعشرون منها.
--
-- ⚠️ **والبطاقةُ ظهرُها في اللقطة ولا يُحجَب** — لأنّ البطاقة حكمُ
--    المتعلّم على نفسه لا تصحيحٌ يُخفى عنه مفتاحُه. وهو سلوكُها في
--    التطبيق نفسِه، لا تساهلٌ أُحدث هنا.
-- ═══════════════════════════════════════════════════════════════════════

set check_function_bodies = off;


-- ═══════════════════════════════════════════════════════════════════════
-- ① الجدولان
-- ═══════════════════════════════════════════════════════════════════════

create table if not exists public.practice_sessions (
  id          text        primary key,          -- توكنٌ عشوائيّ لا متسلسل
  kind        text        not null,
  title       text        not null,
  created_by  uuid        not null references public.profiles(id) on delete cascade,
  source_id   bigint,                            -- 🔒 بلا مفتاح خارجيّ عمداً
  snapshot    jsonb       not null,
  opens_at    timestamptz not null default now(),
  expires_at  timestamptz not null,
  created_at  timestamptz not null default now()
);

alter table public.practice_sessions drop constraint if exists practice_sessions_kind_ck;
alter table public.practice_sessions add  constraint practice_sessions_kind_ck
  check (kind in ('quiz','cards'));

alter table public.practice_sessions drop constraint if exists practice_sessions_window_ck;
alter table public.practice_sessions add  constraint practice_sessions_window_ck
  check (expires_at > opens_at);

-- الصفُّ الوحيد الذي يعود إلى جدولٍ آخر — وهو الجلسة نفسُها لا المحتوى
create table if not exists public.practice_responses (
  id           bigserial   primary key,
  session_id   text        not null references public.practice_sessions(id) on delete cascade,
  ref          text        not null,   -- معرّفُ السؤال داخل اللقطة، نصّاً
  display_name text,                   -- نصٌّ حرّ غيرُ موثَّق — قد يكون وهمياً
  answer       jsonb,
  is_correct   boolean,
  dx_code      text,                   -- الكودُ وحده: نصُّه في اللقطة
  submitted_at timestamptz not null default now()
);

create index if not exists practice_sessions_mine_ix
  on public.practice_sessions (created_by, created_at desc);
-- يخدم حدَّ التكرار في 118 ولوحةَ المعلّم المؤجَّلة معاً
create index if not exists practice_responses_sess_ix
  on public.practice_responses (session_id, submitted_at desc);


-- ═══════════════════════════════════════════════════════════════════════
-- ② الإغلاق — لا صلاحية بالعمود ولا سياسة بالصفّ
--    RLS مفعَّلٌ **بلا سياسةٍ واحدة**، والمنحُ مسحوب. فلا `anon` ولا
--    `authenticated` يمسّ الجدولين مباشرةً بحال. والمنفذُ الوحيد دالّةٌ
--    `security definer` يملكها postgres — تتخطّى RLS بحكم الملكية.
--    🔑 نقطةُ دخولٍ واحدة محكومةٌ بمنطقٍ صريح، لا جدولٌ مفتوحٌ بسياسة.
-- ═══════════════════════════════════════════════════════════════════════

alter table public.practice_sessions  enable row level security;
alter table public.practice_responses enable row level security;

revoke all on public.practice_sessions  from anon, authenticated;
revoke all on public.practice_responses from anon, authenticated;
revoke all on sequence public.practice_responses_id_seq from anon, authenticated;


-- ═══════════════════════════════════════════════════════════════════════
-- ③ اللقطة — ما الذي يُجمَّد
--    داخليّتان: لا تُمنحان لأحد، وتُناديان من create_practice_session
--    وحدها. ولو مُنحتا لصارتا باباً يقرأ المفاتيح بلا جلسة.
-- ═══════════════════════════════════════════════════════════════════════

create or replace function public.practice_snapshot_quiz(p_quiz bigint)
returns jsonb language sql stable security definer set search_path to 'public'
as $function$
  select jsonb_build_object(
    'kind',  'quiz',
    'title', q.title,
    'minutes', q.minutes,

    -- النصُّ المشترك يُنسخ كاملاً: سؤالٌ بلا نصّه لا يُجاب
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

        -- 🔒 ما لا يُرسَل إلا بعد الإجابة — يسكن اللقطة، وتحجبه 118
        'key', jsonb_build_object(
                 'correct_id',  k.correct_id,
                 'correct_ids', k.correct_ids,
                 'accept',      k.accept,
                 'bank',        k.bank),
        'explanation', k.explanation,

        -- التشخيص: كودٌ ونصُّ طالبٍ فقط. لغةُ المعلّم لا تُنسخ (62 · 95)
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
       -- ⚠️ المقاليُّ خارجٌ: لا مصحِّحَ له ولا قارئَ لإجابة زائر
       and x.kind in ('mcq','msq','gap','matching','cloze')
    ), '[]'::jsonb))
  from quizzes q where q.id = p_quiz;
$function$;

create or replace function public.practice_snapshot_cards(p_deck bigint)
returns jsonb language sql stable security definer set search_path to 'public'
as $function$
  select jsonb_build_object(
    'kind',  'cards',
    'title', d.title,
    -- ⚠️ الظهرُ هنا ولا يُحجَب: البطاقةُ حكمُ المتعلّم على نفسه،
    --    وحجبُ ظهرِها يُبطلها لا يحرسها.
    'cards', coalesce((
      select jsonb_agg(jsonb_build_object(
               'id', c.id, 'front', c.front, 'back', c.back, 'note', c.note,
               'audio', c.audio, 'image', c.image, 'lang', c.lang)
             order by c.position)
        from cards c where c.deck_id = d.id), '[]'::jsonb))
  from decks d where d.id = p_deck;
$function$;

-- 🔴 **وإغلاقُ دالّةٍ يحتاج ثلاثةً لا واحداً — وقيس على الحيّة مرّتين:**
--    ① بوستجريس يمنح `EXECUTE` لـ`PUBLIC` في كلّ دالّةٍ تُنشأ.
--    ② **وسوبابيس فوقه** يضبط `alter default privileges in schema public
--      grant execute on functions to anon, authenticated, service_role`
--      — يُقرأ في `pg_default_acl` — فكلُّ دالّةٍ جديدة **تُولد وفي
--      عنقها منحٌ صريحٌ لـ`anon`**، والسحبُ من `public` لا يمسّه.
--    ⇒ `revoke … from public, anon, authenticated` ثمّ منحٌ صريح.
--    🔴 **والظنُّ هنا أخطرُ من الجهل:** سطرُ `revoke` يمرّ بلا خطأ
--      فيُقرأ إغلاقاً، والدالّة مفتوحة. وهاتان تقرآن المفاتيح والتشخيص
--      ⇒ فتحُهما يُغني عن الجلسة كلِّها.
--    📌 وهذا نفسُه ما يجعل `sql/58` (إحكام EXECUTE) عملاً لم يبدأ:
--      **كلُّ دالّةٍ في المشروع مفتوحةٌ لـ`anon` ما لم تُسحب صراحةً.**
revoke all on function public.practice_snapshot_quiz(bigint)  from public, anon, authenticated;
revoke all on function public.practice_snapshot_cards(bigint) from public, anon, authenticated;


-- ═══════════════════════════════════════════════════════════════════════
-- ④ التوليد — للمعلّم وحده
-- ═══════════════════════════════════════════════════════════════════════

create or replace function public.create_practice_session(
  p_kind text, p_source bigint, p_days integer)
returns jsonb language plpgsql security definer set search_path to 'public'
as $function$
declare v_subject bigint; v_title text; v_owner uuid;
        v_snap jsonb; v_tok text; v_n int; v_essay int := 0;
        v_days int; v_exp timestamptz;
begin
  if not is_teacher() then raise exception 'صلاحية المعلم مطلوبة'; end if;

  -- المدّة تُحدَّد عند التوليد ولا تُعدَّل بعده (حكمُ الوثيقة)
  v_days := greatest(1, least(90, coalesce(p_days, 14)));
  v_exp  := now() + make_interval(days => v_days);

  if p_kind = 'quiz' then
    select q.subject_id, q.title, q.created_by into v_subject, v_title, v_owner
      from quizzes q where q.id = p_source;
    if v_title is null then
      return jsonb_build_object('ok', false, 'error', 'الاختبار غير موجود');
    end if;
    -- مقاليٌّ يُعَدّ قبل أن يُستبعَد، ليُقال عددُه للمعلّم لا ليُصمَت عنه
    select count(*) into v_essay from questions
     where quiz_id = p_source and retired_at is null and kind = 'essay';
    v_snap := practice_snapshot_quiz(p_source);
    v_n    := jsonb_array_length(v_snap -> 'questions');

  elsif p_kind = 'cards' then
    select d.subject_id, d.title, coalesce(d.owner_id, d.created_by)
      into v_subject, v_title, v_owner
      from decks d where d.id = p_source;
    if v_title is null then
      return jsonb_build_object('ok', false, 'error', 'الرزمة غير موجودة');
    end if;
    v_snap := practice_snapshot_cards(p_source);
    v_n    := jsonb_array_length(v_snap -> 'cards');

  else
    return jsonb_build_object('ok', false, 'error', 'نمطٌ غير معروف: ' || coalesce(p_kind,'—'));
  end if;

  -- 🔑 حارسُ التأليف نفسُه لا حارسٌ ثانٍ: من يملك تأليفَه يملك مشاركتَه.
  --    ومالكُه يملكه ولو زالت مادّتُه عنه.
  -- 🔴 **والفراغُ يُغلق لا يُفتح — وقيس أنّه كان يفتح:** محتوى المنصّة
  --    `created_by` فيه فارغ، فكان `v_owner = auth.uid()` ⇐ NULL، و
  --    `false or NULL` ⇐ NULL، و`if not NULL` **فرعٌ لا يُنفَّذ**. فمرّ
  --    الحارسُ كأنّه لم يكن، **بلا خطأٍ يُرفع**، وولّد معلّمٌ رابطاً
  --    لاختبارٍ في مادّةٍ ليست له. ⇒ `coalesce` على الطرفين، و
  --    `is not null` قبل المقارنة: **منطقُ القيم الثلاث يسقط مفتوحاً
  --    ما لم يُغلَق بيدك.**
  if not (coalesce(can_author(v_subject), false)
          or (v_owner is not null and v_owner = auth.uid())) then
    return jsonb_build_object('ok', false, 'error', 'لا تملك هذا المحتوى');
  end if;

  -- جلسةٌ فارغة رابطٌ يفتح على لا شيء — تُمنع عند التوليد لا عند الزيارة
  if coalesce(v_n, 0) = 0 then
    return jsonb_build_object('ok', false,
      'error', case when p_kind = 'quiz'
                    then 'لا سؤال يُتدرَّب عليه — والمقاليُّ لا يدخل جلسة التدرّب'
                    else 'لا بطاقة في هذه الرزمة' end);
  end if;

  v_tok := replace(gen_random_uuid()::text, '-', '');

  insert into practice_sessions (id, kind, title, created_by, source_id, snapshot, expires_at)
  values (v_tok, p_kind, v_title, auth.uid(), p_source, v_snap, v_exp);

  return jsonb_build_object('ok', true, 'token', v_tok, 'kind', p_kind,
    'title', v_title, 'count', v_n, 'skipped_essay', v_essay,
    'expires_at', v_exp);
end $function$;

-- الثلاثةُ ثمّ المنح — وإلّا ناداها `anon` (فتُردّ بـ`is_teacher()`،
-- لكنّ الحراسة بالمنطق وحده اتّكاءٌ على طبقةٍ واحدة لا على ثلاث).
revoke all  on function public.create_practice_session(text, bigint, integer)
  from public, anon, authenticated;
grant execute on function public.create_practice_session(text, bigint, integer)
  to authenticated, service_role;


-- ═══════════════════════════════════════════════════════════════════════
-- ⑤ قائمة المعلّم — ولا تُرجع اللقطة
--    اللقطةُ تحمل المفاتيحَ والتشخيص، وقائمةٌ تحملها تُرسل بنكَ الأسئلة
--    كلَّه في كلّ فتحةِ شاشة. ⇒ العدُّ يُحسب، والمتنُ يبقى مكانه.
-- ═══════════════════════════════════════════════════════════════════════

create or replace function public.my_practice_sessions()
returns jsonb language sql stable security definer set search_path to 'public'
as $function$
  select coalesce(jsonb_agg(jsonb_build_object(
    'token', s.id, 'kind', s.kind, 'title', s.title,
    'source_id', s.source_id,
    'count', case when s.kind = 'quiz'
                  then jsonb_array_length(s.snapshot -> 'questions')
                  else jsonb_array_length(s.snapshot -> 'cards') end,
    'opens_at', s.opens_at, 'expires_at', s.expires_at,
    'live', now() between s.opens_at and s.expires_at,
    'answers', (select count(*) from practice_responses r where r.session_id = s.id)
  ) order by s.created_at desc), '[]'::jsonb)
  from practice_sessions s
  where s.created_by = auth.uid();
$function$;

revoke all  on function public.my_practice_sessions() from public, anon, authenticated;
grant execute on function public.my_practice_sessions()
  to authenticated, service_role;


-- ═══════════════════════════════════════════════════════════════════════
-- ⑥ السجلّ
-- ═══════════════════════════════════════════════════════════════════════

insert into public.sql_log (n, title, applied_at)
values ('117', 'جلسات التدرّب — البنية والتجميد وحدهما، وبابُ الزائر مغلق', now())
on conflict (n) do update set applied_at = now();
