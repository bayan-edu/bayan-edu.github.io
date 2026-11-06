-- ══════════════════════════════════════════════════════════════════════
--  ٢٠٠ · نصُّ الاستماع في الاختبار — سطورُ النصّ الصوتيّ يكتبها مؤلّفُ الاختبار، ولا يقرؤها الطالبُ إلا بعد التسليم إن أذن المعلّم
-- ══════════════════════════════════════════════════════════════════════
--
--  الخطوةُ الثالثة من «مختبر الصوتيّات». وحكمُ المالك (٦ نوفمبر) يحكمها: «كشف النص في أسئلة وتمارين الاستماع يفضل ان يوضع
--  كخيار يحدده المعلم في الاعدادات وليس افتراضيا في كل الاسئلة».
--
--  وأحكام:
--  ① **الخيارُ للاختبار لا للملفّ** (`quizzes.transcript`): لا يُكشف (الافتراض) · بعد التسليم مع المراجعة. ولم يُؤخذ
--     `audio_scripts.reveal` (198) لأنّ الملفّ الواحد قد يسمعه الطالبُ في درسٍ وفي اختبار — و«متاح» في الدرس لا يفتح الاختبار.
--     و«بعد التسليم» يتبع المراجعة: محطّةٌ لا تعرض شيئاً بعد التسليم (`reveal = 'never'`) لا تعرض النصَّ كذلك.
--  ② **والنصُّ لا يصل الطالبَ إلا بـ`attempt_lines(attempt)`:** محاولتُه هو، ونصوصُ الأسئلة التي قُدّمت فيها (فالنصُّ البديل في
--     البنك هو الذي سمعه بعينه)، وما له سطورٌ منها. ولا شيء أثناء المحاولة: `get_quiz` لم تُمسّ، والجدولان بلا منحٍ (198).
--  ③ **والكتابةُ نسخةٌ واحدة للمصدرين** (`write_track_lines`): `save_passage_lines` بحارس `passage_lines_problem` (`can_edit_quiz`
--     — حارسُ `save_passage` نفسُه)، و`save_item_lines` (197) صارت تناديها برسائلها وترتيبها — فلا يفترق فحصان لسطرٍ واحد.
--  ④ **والملفُّ المشترك يُنبَّه عليه ولا يُمنع** (`track_uses`): أين يُستعمل المفتاحُ أيضاً (مصادرُ الدروس ونصوصُ الاختبارات) وحالُ
--     كشف نصّه — فتقول اللوحةُ إنّ درساً يكشف النصَّ يُطلع الطالبَ عليه قبل الاختبار. ولا منع: مقطعٌ يُسمع في الدرس ثمّ يُختبر فيه
--     تصميمٌ مشروع، والقرارُ للمعلّم. (قِيس: `r2:audio/l1-a1.mp3` في مصدر الدرس `7` وفي النصّ `16` من الاختبار `5` معاً.)
--  ⑤ **و`quiz_for_edit` تحمل الخيار** — سطرٌ في الدالّة الحيّة يُستبدل بعد عدّه (مرّةً واحدة)، لا نسخةٌ منها تُجمَّد هنا.
--
--  📐 وما ليس هنا عمداً: الاستيراد مع الملفّ (الخطوة ٤) · وروابطُ التدرّب (`practice.js` — لا محاولةَ فيها) · وتعديلُ `submit_attempt`.
-- ══════════════════════════════════════════════════════════════════════


-- ═══════════════════ ① الخيار — عمودٌ في الاختبار ودالّتُه (منشأ) ═══════════════════

alter table public.quizzes add column if not exists transcript text not null default 'never';

do $c$
begin
  if not exists (select 1 from pg_constraint
                  where conrelid = 'public.quizzes'::regclass and conname = 'quizzes_transcript_chk') then
    alter table public.quizzes add constraint quizzes_transcript_chk check (transcript in ('never', 'after'));
  end if;
end $c$;

comment on column public.quizzes.transcript is
  'نصُّ الاستماع للطالب (200 ①): never لا يُكشف (الافتراض) · after بعد التسليم مع المراجعة — ويُقرأ بـattempt_lines وحدها.';

create or replace function public.set_quiz_transcript(p_quiz bigint, p_mode text)
returns jsonb language plpgsql security definer set search_path to 'public'
as $fn$
begin
  if auth.uid() is null then return jsonb_build_object('ok', false, 'error', 'يلزم تسجيل الدخول'); end if;
  if not can_edit_quiz(p_quiz) then return jsonb_build_object('ok', false, 'error', 'لا تملك تحرير هذا الاختبار'); end if;
  if p_mode is null or p_mode not in ('never', 'after') then
    return jsonb_build_object('ok', false, 'error', 'خيار نص الاستماع غير معروف');
  end if;
  update quizzes set transcript = p_mode where id = p_quiz;
  return jsonb_build_object('ok', true, 'transcript', p_mode);
end $fn$;

comment on function public.set_quiz_transcript(bigint, text) is
  'خيارُ نصّ الاستماع في الاختبار (200 ①) — بحارس can_edit_quiz.';


-- ═══════════════════ ③ الكتابة — نسخةٌ واحدة (منشأ) ═══════════════════

/* فحصُ `save_item_lines` (197) بحرفه ورسائله وترتيبه، من فحص المفتاح إلى الكتابة — ولا تُنادى إلا من دالّةٍ سألت حارسها */
create or replace function public.write_track_lines(p_key text, p_subject bigint, p_lang text, p_lines jsonb)
returns jsonb language plpgsql security definer set search_path to 'public'
as $fn$
declare
  v_sid bigint; v_owner uuid; v_sub bigint; v_n integer;
  v_prev numeric := -1; v_s numeric; v_e numeric; v_no text; v_body text; v_who text; r record;
begin
  /* ① مفتاحٌ في المخزن بحرفه — والرابطُ الخارجيّ لا: لا يُضمن أنّه لا يتبدّل تحت سطوره */
  if p_key is null or p_key !~ '^(r2:)?[a-z0-9][a-z0-9-]*/.+$' or char_length(p_key) > 300 then
    return jsonb_build_object('ok', false, 'error', 'السطور تُكتب لملفٍّ في مخزن المنصة، وهذا المقطع بلا ملفٍّ فيه');
  end if;

  if jsonb_typeof(p_lines) is distinct from 'array' then
    return jsonb_build_object('ok', false, 'error', 'السطور ليست قائمة');
  end if;
  v_n := jsonb_array_length(p_lines);
  if v_n > 400 then
    return jsonb_build_object('ok', false, 'error', 'السطور أكثر من ٤٠٠ سطر');
  end if;

  /* ④ نصُّ ملفٍّ كتبه غيرُك — لكاتبه أو للمشرف. و`for update`: حفظان معاً لا يتنازعان الصفّ */
  select s.id, s.created_by, s.subject_id into v_sid, v_owner, v_sub
    from audio_scripts s where s.track_key = p_key for update;
  if v_sid is not null and v_owner is distinct from auth.uid() and not can_curate(v_sub) then
    return jsonb_build_object('ok', false, 'error', 'سطور هذا الملف كتبها مؤلفٌ آخر، وتعديلها له أو لفريق الإشراف');
  end if;

  if v_n = 0 then
    delete from audio_scripts where id = v_sid;                      -- السطورُ تتبعه (on delete cascade)
    return jsonb_build_object('ok', true, 'lines', 0, 'script', null);
  end if;

  /* ⑤ السطورُ سطراً سطراً قبل أن يُكتب شيء — والرقمُ في الرسالة هنديّ كما يراه المعلّم */
  for r in select t.ord::int as k, t.value as v
             from jsonb_array_elements(p_lines) with ordinality as t(value, ord) loop
    v_no := translate(r.k::text, '0123456789', '٠١٢٣٤٥٦٧٨٩');
    if jsonb_typeof(r.v) is distinct from 'object' then
      return jsonb_build_object('ok', false, 'error', format('السطر %s ليس سطراً', v_no));
    end if;
    v_body := btrim(coalesce(r.v->>'text', ''));
    if char_length(v_body) not between 1 and 1000 then
      return jsonb_build_object('ok', false, 'error', format('السطر %s بلا نص، أو أطول من ١٠٠٠ حرف', v_no));
    end if;
    v_who := nullif(btrim(coalesce(r.v->>'speaker', '')), '');
    if v_who is not null and char_length(v_who) > 40 then
      return jsonb_build_object('ok', false, 'error', format('اسم المتحدث في السطر %s أطول من ٤٠ حرفاً', v_no));
    end if;
    if coalesce(jsonb_typeof(r.v->'start_ms'), 'null') not in ('number', 'null')
       or coalesce(jsonb_typeof(r.v->'end_ms'), 'null') not in ('number', 'null') then
      return jsonb_build_object('ok', false, 'error', format('زمن السطر %s ليس رقماً', v_no));
    end if;
    v_s := case when jsonb_typeof(r.v->'start_ms') = 'number' then (r.v->>'start_ms')::numeric end;
    v_e := case when jsonb_typeof(r.v->'end_ms')   = 'number' then (r.v->>'end_ms')::numeric end;
    if (v_s is not null and (v_s < 0 or v_s > 3600000 or v_s <> trunc(v_s)))
       or (v_e is not null and (v_e < 0 or v_e > 3600000 or v_e <> trunc(v_e))) then
      return jsonb_build_object('ok', false, 'error', format('زمن السطر %s غير صالح', v_no));
    end if;
    if v_e is not null and v_s is null then
      return jsonb_build_object('ok', false, 'error', format('للسطر %s نهايةٌ بلا بداية', v_no));
    end if;
    if v_e is not null and v_e <= v_s then
      return jsonb_build_object('ok', false, 'error', format('نهاية السطر %s قبل بدايته', v_no));
    end if;
    if v_s is not null then
      if v_s <= v_prev then
        return jsonb_build_object('ok', false, 'error', format('بداية السطر %s ليست بعد بداية ما قبله', v_no));
      end if;
      v_prev := v_s;
    end if;
  end loop;

  /* ثمّ الكتابة: النصُّ بمفتاحه (مادّتُه وكاتبُه الأوّلان باقيان)، والسطورُ تُستبدل كلُّها (197 ③) */
  insert into audio_scripts (track_key, subject_id, lang, created_by, updated_by)
  values (p_key, p_subject, coalesce(p_lang, 'en'), auth.uid(), auth.uid())
  on conflict (track_key) do update
     set lang = excluded.lang, updated_by = auth.uid(), updated_at = now()
  returning id into v_sid;

  delete from audio_lines where script_id = v_sid;
  insert into audio_lines (script_id, n, speaker, body, start_ms, end_ms, source)
  select v_sid, t.ord::int,
         nullif(btrim(coalesce(t.value->>'speaker', '')), ''),
         btrim(t.value->>'text'),
         case when jsonb_typeof(t.value->'start_ms') = 'number' then (t.value->>'start_ms')::numeric::int end,
         case when jsonb_typeof(t.value->'end_ms')   = 'number' then (t.value->>'end_ms')::numeric::int end,
         'upload'
    from jsonb_array_elements(p_lines) with ordinality as t(value, ord);

  return jsonb_build_object('ok', true, 'lines', v_n, 'script', v_sid);
end $fn$;

comment on function public.write_track_lines(text, bigint, text, jsonb) is
  'كتابةُ سطور ملفٍّ بمفتاحه (200 ③): الفحصُ كلُّه ثمّ الاستبدال — تناديها save_item_lines وsave_passage_lines بعد حارسيهما، ولا تُمنح.';


-- ═══════════════════ ③ سطورُ المصدر — معدَّلة (197): الفحصُ صار في write_track_lines ═══════════════════

create or replace function public.save_item_lines(p_item bigint, p_lines jsonb)
returns jsonb language plpgsql security definer set search_path to 'public'
as $fn$
declare v_problem text; v_key text; v_subject bigint; v_lang text;
begin
  v_problem := audio_lines_problem(p_item);
  if v_problem is not null then return jsonb_build_object('ok', false, 'error', v_problem); end if;

  select i.url, l.subject_id, i.lang into v_key, v_subject, v_lang
    from items i join lessons l on l.id = i.lesson_id
   where i.id = p_item;
  return write_track_lines(v_key, v_subject, v_lang, p_lines);
end $fn$;


-- ═══════════════════ ③ سطورُ النصّ الصوتيّ في الاختبار — منشأ ═══════════════════

create or replace function public.passage_lines_problem(p_passage bigint)
returns text language plpgsql stable security definer set search_path to 'public'
as $fn$
declare v_quiz bigint; v_kind text;
begin
  if auth.uid() is null then return 'يلزم تسجيل الدخول'; end if;
  select pg.quiz_id, pg.kind into v_quiz, v_kind from passages pg where pg.id = p_passage;
  if v_quiz is null then return 'النصّ غير موجود'; end if;
  if not can_edit_quiz(v_quiz) then return 'لا تملك تحرير هذا الاختبار'; end if;
  if v_kind is distinct from 'audio' then return 'هذا النص ليس مقطعاً صوتياً، والسطور تُكتب للمقاطع وحدها'; end if;
  return null;
end $fn$;

comment on function public.passage_lines_problem(bigint) is
  'حارسُ سطور النصّ الصوتيّ (200 ③): رسالةُ المانع أو null — can_edit_quiz على اختباره، والنوعُ صوت. لا يُمنح.';

create or replace function public.save_passage_lines(p_passage bigint, p_lines jsonb)
returns jsonb language plpgsql security definer set search_path to 'public'
as $fn$
declare v_problem text; v_key text; v_subject bigint; v_lang text;
begin
  v_problem := passage_lines_problem(p_passage);
  if v_problem is not null then return jsonb_build_object('ok', false, 'error', v_problem); end if;

  select pg.media_url, q.subject_id, pg.lang into v_key, v_subject, v_lang
    from passages pg join quizzes q on q.id = pg.quiz_id
   where pg.id = p_passage;
  return write_track_lines(v_key, v_subject, v_lang, p_lines);
end $fn$;

comment on function public.save_passage_lines(bigint, jsonb) is
  'سطورُ النصّ الصوتيّ في الاختبار (200 ③): تستبدلها كلَّها، والفراغُ يمحو — بحارس passage_lines_problem وفحص write_track_lines.';

/* لمحرّر الاختبار وحده: السطورُ بنصّها، ووصفةُ الحوار المولَّد إن كان الملفُّ منه (199 ③) */
create or replace function public.passage_lines(p_passage bigint)
returns jsonb language plpgsql stable security definer set search_path to 'public'
as $fn$
declare v_problem text; v_key text; v_sid bigint; v_lang text; v_reveal text; v_draft jsonb;
begin
  v_problem := passage_lines_problem(p_passage);
  if v_problem is not null then return jsonb_build_object('ok', false, 'error', v_problem); end if;

  select pg.media_url into v_key from passages pg where pg.id = p_passage;
  select s.id, s.lang, s.reveal, s.draft into v_sid, v_lang, v_reveal, v_draft
    from audio_scripts s where s.track_key = v_key;
  if v_sid is null then return jsonb_build_object('ok', true, 'script', null, 'lines', '[]'::jsonb); end if;

  return jsonb_build_object('ok', true, 'script', v_sid, 'lang', v_lang, 'reveal', v_reveal, 'text', true, 'draft', v_draft,
    'lines', coalesce((select jsonb_agg(jsonb_strip_nulls(jsonb_build_object(
                         'n', l.n, 'speaker', l.speaker, 'start_ms', l.start_ms, 'end_ms', l.end_ms, 'text', l.body)) order by l.n)
                         from audio_lines l where l.script_id = v_sid), '[]'::jsonb));
end $fn$;

comment on function public.passage_lines(bigint) is
  'سطورُ النصّ الصوتيّ بنصّها لمحرّر الاختبار (200 ③) — ومعها وصفةُ الحوار المولَّد. بحارس passage_lines_problem.';


-- ═══════════════════ ② النصُّ بعد التسليم — منشأ ═══════════════════

create or replace function public.attempt_lines(p_attempt bigint)
returns jsonb language plpgsql stable security definer set search_path to 'public'
as $fn$
declare v_user uuid; v_quiz bigint; v_mode text; v_reveal text;
begin
  if auth.uid() is null then return jsonb_build_object('ok', false, 'error', 'يلزم تسجيل الدخول'); end if;

  select a.user_id, a.quiz_id into v_user, v_quiz from attempts a where a.id = p_attempt;
  if v_user is distinct from auth.uid() then
    return jsonb_build_object('ok', false, 'error', 'المحاولة غير موجودة');
  end if;

  /* ① الخيارُ للاختبار، ويتبع المراجعة */
  select q.transcript, q.reveal into v_mode, v_reveal from quizzes q where q.id = v_quiz;
  if v_mode is distinct from 'after' or v_reveal = 'never' then
    return jsonb_build_object('ok', true, 'transcript', 'never', 'passages', '[]'::jsonb);
  end if;

  /* ② نصوصُ الأسئلة التي قُدّمت في هذه المحاولة بعينها، وما له سطورٌ منها */
  return jsonb_build_object('ok', true, 'transcript', 'after', 'passages', coalesce((
    select jsonb_agg(jsonb_build_object(
             'id', pg.id, 'title', pg.title, 'media', pg.media_url, 'lang', s.lang,
             'lines', (select jsonb_agg(jsonb_strip_nulls(jsonb_build_object(
                                 'n', l.n, 'speaker', l.speaker, 'start_ms', l.start_ms, 'end_ms', l.end_ms, 'text', l.body))
                               order by l.n)
                         from audio_lines l where l.script_id = s.id))
           order by pg.position, pg.id)
      from passages pg
      join audio_scripts s on s.track_key = pg.media_url
     where pg.kind = 'audio'
       and pg.id in (select x.passage_id from answers ans join questions x on x.id = ans.question_id
                      where ans.attempt_id = p_attempt and x.passage_id is not null)
       and exists (select 1 from audio_lines l where l.script_id = s.id)), '[]'::jsonb));
end $fn$;

comment on function public.attempt_lines(bigint) is
  'نصُّ الاستماع بعد التسليم (200 ②): لصاحب المحاولة وحده، إن كان الخيارُ after والمراجعةُ تُعرض — نصوصُ ما قُدّم فيها.';


-- ═══════════════════ ④ أين يُستعمل الملفّ — منشأ ═══════════════════

create or replace function public.track_uses(p_track text)
returns jsonb language plpgsql stable security definer set search_path to 'public'
as $fn$
begin
  if not is_teacher() then return jsonb_build_object('ok', false, 'error', 'للمعلمين وحدهم'); end if;
  return jsonb_build_object('ok', true,
    'reveal', (select s.reveal from audio_scripts s where s.track_key = p_track),
    'items', coalesce((select jsonb_agg(jsonb_build_object('id', i.id, 'lesson', l.title, 'published', l.published)
                                        order by l.id, i.id)
                         from items i join lessons l on l.id = i.lesson_id
                        where i.kind = 'audio' and i.url = p_track), '[]'::jsonb),
    'passages', coalesce((select jsonb_agg(jsonb_build_object('id', pg.id, 'quiz', q.title, 'transcript', q.transcript)
                                           order by q.id, pg.id)
                            from passages pg join quizzes q on q.id = pg.quiz_id
                           where pg.kind = 'audio' and pg.media_url = p_track), '[]'::jsonb));
end $fn$;

comment on function public.track_uses(text) is
  'أين يُستعمل مفتاحُ الملفّ (200 ④): مصادرُ الدروس ونصوصُ الاختبارات، وحالُ كشف نصّه — لتنبيه المعلّم. للمعلّمين.';


-- ═══════════════════ ⑤ quiz_for_edit — معدَّلة: سطرٌ واحد في الحيّة ═══════════════════

do $q$
declare
  v text; n int;
  pat constant text := $p$'plays', q.plays, 'reveal', q.reveal,$p$;
  rep constant text := $p$'plays', q.plays, 'reveal', q.reveal, 'transcript', q.transcript,   -- 200 · نصُّ الاستماع$p$;
begin
  v := pg_get_functiondef('public.quiz_for_edit(bigint)'::regprocedure);   -- الحيّة لا اللقطة
  if strpos(v, $p$'transcript', q.transcript$p$) > 0 then raise notice '200: quiz_for_edit تحمل الخيار من قبل'; return; end if;
  n := (char_length(v) - char_length(replace(v, pat, ''))) / char_length(pat);
  if n <> 1 then raise exception '200: وُجد سطرُ الخيارات في quiz_for_edit % مرّة لا مرّةً واحدة', n; end if;
  execute replace(v, pat, rep);
end $q$;


-- ═══════════════════ المنح ═══════════════════

/* جديدةٌ ⇒ `fn_auto_lock` يسحب PUBLIC و anon (154 · 186)، وهذا السطرُ يقول القصدَ صريحاً. والكتابةُ والحارسُ لا يُمنحان:
   تناديهما الدوالُّ بصلاحية مالكها. و`save_item_lines` و`quiz_for_edit` تبقيان على منحهما (create or replace لا يمسّه) */
revoke all on function public.set_quiz_transcript(bigint, text), public.write_track_lines(text, bigint, text, jsonb),
                       public.passage_lines_problem(bigint), public.save_passage_lines(bigint, jsonb), public.passage_lines(bigint),
                       public.attempt_lines(bigint), public.track_uses(text) from public, anon;
revoke all on function public.write_track_lines(text, bigint, text, jsonb), public.passage_lines_problem(bigint) from authenticated;
grant execute on function public.set_quiz_transcript(bigint, text), public.save_passage_lines(bigint, jsonb),
                          public.passage_lines(bigint), public.attempt_lines(bigint), public.track_uses(text)
                       to authenticated, service_role;


-- ═══════════════════ الختام — لا يُسجَّل ما لم يتمّ ═══════════════════

do $chk$
begin
  if not exists (select 1 from information_schema.columns where table_schema = 'public'
                    and table_name = 'quizzes' and column_name = 'transcript') then
    raise exception '200: عمودُ الخيار غائب';
  end if;
  if strpos(pg_get_functiondef('public.quiz_for_edit(bigint)'::regprocedure), $p$'transcript', q.transcript$p$) = 0 then
    raise exception '200: quiz_for_edit لا تحمل الخيار';
  end if;
  if strpos(pg_get_functiondef('public.save_item_lines(bigint, jsonb)'::regprocedure), 'write_track_lines(') = 0 then
    raise exception '200: save_item_lines لا تنادي الكتابة الواحدة';
  end if;
  if has_function_privilege('authenticated', 'public.write_track_lines(text, bigint, text, jsonb)', 'execute')
     or has_function_privilege('authenticated', 'public.passage_lines_problem(bigint)', 'execute')
     or not has_function_privilege('authenticated', 'public.attempt_lines(bigint)', 'execute')
     or not has_function_privilege('authenticated', 'public.save_passage_lines(bigint, jsonb)', 'execute')
     or not has_function_privilege('authenticated', 'public.save_item_lines(bigint, jsonb)', 'execute')
     or has_function_privilege('anon', 'public.attempt_lines(bigint)', 'execute')
     or has_function_privilege('anon', 'public.track_uses(text)', 'execute') then
    raise exception '200: منحُ الدوالّ على غير ما قُصد';
  end if;
end $chk$;

insert into public.sql_log (n, title, applied_at)
values ('200', 'نصُّ الاستماع في الاختبار — سطورُ النصّ الصوتيّ يكتبها مؤلّفُ الاختبار، ولا يقرؤها الطالبُ إلا بعد التسليم إن أذن المعلّم', now())
on conflict (n) do update set applied_at = now();
