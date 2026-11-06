-- ══════════════════════════════════════════════════════════════════════
--  ١٩٩ · الحوارُ المولَّد — حارسُه قبل الكلفة، ومسوّدتُه محفوظة، وتجميعُه نصٌّ لملفّه بوصفته
-- ══════════════════════════════════════════════════════════════════════
--
--  الخطوةُ الثانية من «مختبر الصوتيّات» — وقرارُ المالك (٦ نوفمبر) قبلها: «وسّع» (ق١): الغرضُ الرابع للدوالّ الطرفيّة يشمل
--  سطورَ الاستماع الإنجليزيّة للمؤلّفين (AGENTS §٠). الحوارُ يُولَّد سطراً سطراً بأصوات Google في الدالّة `tts`، ثمّ يُوصل ملفّاً
--  واحداً (`joinClips` في core.js)، ويملأ مفتاحُه حقلَ الرابط في نموذج «مقطع صوتي» — وحفظُ المصدر هو الاعتماد.
--
--  وأحكام:
--  ① **الحارسُ بالدرس لا بالمصدر** (`dialogue_problem`): الحوارُ الجديد لا مصدرَ له بعد (المصدرُ يُحفظ بعد التجميع)، والدرسُ
--     معلوم. ⇒ `can_author` على مادّة الدرس — حكمُ من يضيف مصدراً فيه. وتسأله الدالّةُ بهويّة المستدعي قبل الأسرار وقبل
--     أيّ نداءٍ لـGoogle (كـ`voice_problem` في `190`)، فيُمنح لـ`authenticated`.
--  ② **والمسوّدةُ لكلّ مؤلّفٍ في كلّ درس** (`audio_drafts`): المشهد والمتحدّثون وأصواتُهم والسطورُ بنبراتها ووقفاتها، وما وُلّد منها
--     بمفتاح ملفّه — فلا يضيع عملٌ بالمغادرة ولا بتعذّر شبكة. و`base` مفتاحُ الحوار المجمَّع الذي بُنيت منه، أو null لحوارٍ جديد.
--  ③ **والتجميعُ يكتب نصَّ ملفّه بوصفته** (`save_track_lines`): السطورُ بمواضعها في الملفّ الموصول (`source = 'tts'`)، والوصفةُ
--     (`audio_scripts.draft`) ليُعاد منها سطرٌ ويُجمَّع ثانيةً ملفّاً جديداً. والمفتاحُ في مجلّد الدرس بإصداره
--     (`voice/dialogues/l{الدرس}/track.{الإصدار}.mp3`) — لا يكتب فيه متصفّح، فما فيه ولّدته الدالّة. ومفتاحٌ قائمٌ يُردّ: الملفُّ لا يُطمس.
--  ④ **وكشفُ النصّ على افتراضه** (`198`): `never` حتى يختار المعلّم.
--  ⑤ **والوصفةُ تُفحص شكلاً وحدوداً** (`dialogue_draft_problem`) في الموضعين — كما تُفحص في الدالّة (`checkDialogue`):
--     ٦٠٠ للمشهد · ٨ متحدّثين · ٦٠ سطراً · ١٠٠٠ للسطر · ٤٠ للاسم · ٢٠٠ للنبرة · ٥ ثوانٍ وقفة · واللهجاتُ الأربع.
--
--  📐 وما ليس هنا عمداً: سطورُ الملفّ المرفوع (`197` · `save_item_lines`) · وكشفُ النصّ (`198`). ولا تُمسّ ملفّاتُ R2.
-- ══════════════════════════════════════════════════════════════════════


-- ═══════════════════ ① الحارس — منشأ ═══════════════════

create or replace function public.dialogue_problem(p_lesson bigint)
returns text language plpgsql stable security definer set search_path to 'public'
as $fn$
declare v_subject bigint;
begin
  if auth.uid() is null then return 'يلزم تسجيل الدخول'; end if;
  select l.subject_id into v_subject from lessons l where l.id = p_lesson;
  if v_subject is null then return 'الدرس غير موجود'; end if;
  if not can_author(v_subject) then return 'لا صلاحية لك على هذه المادة'; end if;
  return null;
end $fn$;

comment on function public.dialogue_problem(bigint) is
  'حارسُ الحوار المولَّد (199 ①): رسالةُ المانع أو null — can_author على مادّة الدرس. تسأله الدالّةُ tts بهويّة المستدعي قبل أيّ كلفة.';


-- ═══════════════════ ⑤ فحصُ الوصفة — منشأ ═══════════════════

create or replace function public.dialogue_draft_problem(p_lesson bigint, p_draft jsonb)
returns text language plpgsql immutable set search_path to 'public'
as $fn$
declare r jsonb; k int := 0;
        v_clip text := '^r2:voice/dialogues/l' || p_lesson || '/[0-9a-f]{16}\.[a-z0-9]{1,16}\.mp3$';
        v_track text := '^r2:voice/dialogues/l' || p_lesson || '/track\.[a-z0-9]{1,16}\.mp3$';
begin
  if jsonb_typeof(p_draft) is distinct from 'object' then return 'الوصفة ليست كائناً'; end if;
  if char_length(coalesce(p_draft->>'scene', '')) > 600 then return 'المشهد أطول من ٦٠٠ حرف'; end if;
  if p_draft ? 'base' and jsonb_typeof(p_draft->'base') <> 'null' and coalesce(p_draft->>'base', '') !~ v_track then
    return 'أصل الحوار ليس ملفاً في مجلد هذا الدرس';
  end if;
  if jsonb_typeof(coalesce(p_draft->'cast', '[]')) <> 'array' or jsonb_array_length(coalesce(p_draft->'cast', '[]')) > 8 then
    return 'المتحدثون ثمانية على الأكثر';
  end if;
  for r in select value from jsonb_array_elements(coalesce(p_draft->'cast', '[]')) loop
    if char_length(btrim(coalesce(r->>'name', ''))) not between 1 and 40
       or coalesce(r->>'voice', '') !~ '^[a-z]{2,20}$'
       or coalesce(r->>'accent', '') not in ('en-US', 'en-GB', 'en-IN', 'en-AU') then
      return 'متحدثٌ بلا اسم، أو بصوتٍ أو لهجةٍ غير معروفة';
    end if;
  end loop;
  if jsonb_typeof(coalesce(p_draft->'lines', '[]')) <> 'array' or jsonb_array_length(coalesce(p_draft->'lines', '[]')) > 60 then
    return 'الحوار ستون سطراً على الأكثر';
  end if;
  for r in select value from jsonb_array_elements(coalesce(p_draft->'lines', '[]')) loop
    k := k + 1;
    if char_length(btrim(coalesce(r->>'text', ''))) not between 1 and 1000
       or char_length(coalesce(r->>'speaker', '')) > 40
       or char_length(coalesce(r->>'tone', '')) > 200
       or (r ? 'gap' and jsonb_typeof(r->'gap') <> 'null'
           and (jsonb_typeof(r->'gap') <> 'number' or (r->>'gap')::numeric not between 0 and 5000))
       or (r ? 'clip' and jsonb_typeof(r->'clip') <> 'null' and coalesce(r->>'clip', '') !~ v_clip)
       or (r ? 'ms' and jsonb_typeof(r->'ms') <> 'null'
           and (jsonb_typeof(r->'ms') <> 'number' or (r->>'ms')::numeric not between 100 and 600000))
       or (r ? 'sig' and jsonb_typeof(r->'sig') <> 'null' and coalesce(r->>'sig', '') !~ '^[0-9a-f]{16}$') then
      return format('السطر %s من الحوار غير صالح', translate(k::text, '0123456789', '٠١٢٣٤٥٦٧٨٩'));
    end if;
  end loop;
  if pg_column_size(p_draft) > 200000 then return 'الوصفة أكبر من حدّها'; end if;
  return null;
end $fn$;

comment on function public.dialogue_draft_problem(bigint, jsonb) is
  'فحصُ وصفة الحوار المولَّد (199 ⑤): شكلُها وحدودُها ومجلّدُ ملفّاتها — رسالةُ المانع أو null. لدالّتَي المسوّدة والتجميع وحدهما.';


-- ═══════════════════ ② المسوّدة — جدولٌ ودالّتان، منشأة ═══════════════════

create table if not exists public.audio_drafts (
  lesson_id   bigint      not null references public.lessons(id) on delete cascade,
  user_id     uuid        not null references public.profiles(id) on delete cascade,
  draft       jsonb       not null,
  updated_at  timestamptz not null default now(),
  primary key (lesson_id, user_id)
);
alter table public.audio_drafts enable row level security;
revoke all on public.audio_drafts from anon, authenticated;

comment on table public.audio_drafts is
  'مسوّدةُ الحوار المولَّد (199 ②): لكلّ مؤلّفٍ في كلّ درس — المشهدُ والمتحدّثون والسطورُ وما وُلّد منها. تُقرأ وتُكتب بدالّتيها وحدهما.';

create or replace function public.dialogue_draft(p_lesson bigint)
returns jsonb language plpgsql stable security definer set search_path to 'public'
as $fn$
declare v_problem text;
begin
  v_problem := dialogue_problem(p_lesson);
  if v_problem is not null then return jsonb_build_object('ok', false, 'error', v_problem); end if;
  return jsonb_build_object('ok', true, 'draft',
    (select d.draft from audio_drafts d where d.lesson_id = p_lesson and d.user_id = auth.uid()));
end $fn$;

create or replace function public.save_dialogue_draft(p_lesson bigint, p_draft jsonb)
returns jsonb language plpgsql security definer set search_path to 'public'
as $fn$
declare v_problem text;
begin
  v_problem := dialogue_problem(p_lesson);
  if v_problem is not null then return jsonb_build_object('ok', false, 'error', v_problem); end if;
  if p_draft is null or jsonb_typeof(p_draft) = 'null' then
    delete from audio_drafts where lesson_id = p_lesson and user_id = auth.uid();
    return jsonb_build_object('ok', true, 'draft', null);
  end if;
  v_problem := dialogue_draft_problem(p_lesson, p_draft);
  if v_problem is not null then return jsonb_build_object('ok', false, 'error', v_problem); end if;
  insert into audio_drafts (lesson_id, user_id, draft) values (p_lesson, auth.uid(), p_draft)
  on conflict (lesson_id, user_id) do update set draft = excluded.draft, updated_at = now();
  return jsonb_build_object('ok', true);
end $fn$;

comment on function public.dialogue_draft(bigint) is 'مسوّدةُ المستدعي للحوار في الدرس (199 ②) — بحارس dialogue_problem.';
comment on function public.save_dialogue_draft(bigint, jsonb) is
  'تحفظ مسوّدةَ الحوار للمستدعي في الدرس (199 ②)، وnull يمحوها — بحارس dialogue_problem وفحص dialogue_draft_problem.';


-- ═══════════════════ ③ التجميع — عمودٌ ودالّتان، منشأة ═══════════════════

alter table public.audio_scripts add column if not exists draft jsonb;
comment on column public.audio_scripts.draft is
  'وصفةُ الحوار المولَّد (199 ③): المشهدُ والمتحدّثون والسطورُ بملفّاتها — يُعاد منها سطرٌ ويُجمَّع ملفّاً جديداً. وللملفّ المرفوع null.';

/* ⇒ { ok, script } أو { ok: false, error } — تناديها الدالّةُ tts بهويّة المستدعي بعد رفع الملفّ الموصول */
create or replace function public.save_track_lines(p_lesson bigint, p_track text, p_lines jsonb, p_draft jsonb)
returns jsonb language plpgsql security definer set search_path to 'public'
as $fn$
declare v_problem text; v_subject bigint; v_sid bigint; v_n int; k int := 0; v_prev numeric := -1; v_s numeric; v_e numeric; r jsonb;
begin
  v_problem := dialogue_problem(p_lesson);
  if v_problem is not null then return jsonb_build_object('ok', false, 'error', v_problem); end if;
  if p_track is null or p_track !~ ('^r2:voice/dialogues/l' || p_lesson || '/track\.[a-z0-9]{1,16}\.mp3$') then
    return jsonb_build_object('ok', false, 'error', 'الملف الموصول ليس في مجلد هذا الدرس');
  end if;
  if exists (select 1 from audio_scripts s where s.track_key = p_track) then
    return jsonb_build_object('ok', false, 'error', 'لهذا الملف نصٌّ من قبل، والملف لا يُطمس');
  end if;
  if p_draft is not null then
    v_problem := dialogue_draft_problem(p_lesson, p_draft);
    if v_problem is not null then return jsonb_build_object('ok', false, 'error', v_problem); end if;
  end if;
  if jsonb_typeof(p_lines) is distinct from 'array' then return jsonb_build_object('ok', false, 'error', 'السطور ليست قائمة'); end if;
  v_n := jsonb_array_length(p_lines);
  if v_n not between 1 and 60 then return jsonb_build_object('ok', false, 'error', 'الحوار من سطرٍ إلى ستين'); end if;
  for r in select value from jsonb_array_elements(p_lines) loop
    k := k + 1;
    v_s := case when jsonb_typeof(r->'start_ms') = 'number' then (r->>'start_ms')::numeric end;
    v_e := case when jsonb_typeof(r->'end_ms') = 'number' then (r->>'end_ms')::numeric end;
    if char_length(btrim(coalesce(r->>'text', ''))) not between 1 and 1000 or char_length(coalesce(r->>'speaker', '')) > 40
       or v_s is null or v_e is null or v_s <> trunc(v_s) or v_e <> trunc(v_e) or v_s <= v_prev or v_e <= v_s or v_e > 3600000 then
      return jsonb_build_object('ok', false, 'error',
        format('السطر %s من الحوار المجمَّع غير صالح', translate(k::text, '0123456789', '٠١٢٣٤٥٦٧٨٩')));
    end if;
    v_prev := v_s;
  end loop;

  select l.subject_id into v_subject from lessons l where l.id = p_lesson;
  insert into audio_scripts (track_key, subject_id, lang, created_by, updated_by, draft)
  values (p_track, v_subject, 'en', auth.uid(), auth.uid(), p_draft)
  returning id into v_sid;
  insert into audio_lines (script_id, n, speaker, body, start_ms, end_ms, source)
  select v_sid, t.ord::int, nullif(btrim(coalesce(t.value->>'speaker', '')), ''), btrim(t.value->>'text'),
         (t.value->>'start_ms')::numeric::int, (t.value->>'end_ms')::numeric::int, 'tts'
    from jsonb_array_elements(p_lines) with ordinality as t(value, ord);
  return jsonb_build_object('ok', true, 'script', v_sid);
end $fn$;

comment on function public.save_track_lines(bigint, text, jsonb, jsonb) is
  'نصُّ الحوار المجمَّع (199 ③): سطورُه بمواضعها في الملفّ الموصول (tts) ووصفتُه — بحارس dialogue_problem. تناديها الدالّةُ tts وحدها عملياً.';

/* وصفةُ الحوار الذي في المصدر — لمن يحرّره (حارسُ السطور · 197) ⇒ { ok, draft } (null لملفٍّ مرفوع أو بلا نصّ) */
create or replace function public.track_draft(p_item bigint)
returns jsonb language plpgsql stable security definer set search_path to 'public'
as $fn$
declare v_problem text;
begin
  v_problem := audio_lines_problem(p_item);
  if v_problem is not null then return jsonb_build_object('ok', false, 'error', v_problem); end if;
  return jsonb_build_object('ok', true, 'draft',
    (select s.draft from audio_scripts s join items i on i.url = s.track_key where i.id = p_item));
end $fn$;

comment on function public.track_draft(bigint) is
  'وصفةُ الحوار المولَّد الذي في المصدر (199 ③) لمن يحرّره — بحارس audio_lines_problem.';


-- ═══════════════════ المنح ═══════════════════

/* جديدةٌ كلُّها ⇒ `fn_auto_lock` يسحب PUBLIC و anon (154 · 186)، وهذا السطرُ يقول القصدَ صريحاً. والحارسُ يُمنح لتسأله الدالّة
   (①)، وفحصُ الوصفة لا: تناديه الدالّتان بصلاحية مالكهما */
revoke all on function public.dialogue_problem(bigint), public.dialogue_draft_problem(bigint, jsonb), public.dialogue_draft(bigint),
                       public.save_dialogue_draft(bigint, jsonb), public.save_track_lines(bigint, text, jsonb, jsonb),
                       public.track_draft(bigint) from public, anon;
revoke all on function public.dialogue_draft_problem(bigint, jsonb) from authenticated;
grant execute on function public.dialogue_problem(bigint), public.dialogue_draft(bigint), public.save_dialogue_draft(bigint, jsonb),
                          public.save_track_lines(bigint, text, jsonb, jsonb), public.track_draft(bigint) to authenticated, service_role;


-- ═══════════════════ الختام — لا يُسجَّل ما لم يتمّ ═══════════════════

do $chk$
begin
  if not (select relrowsecurity from pg_class where oid = 'public.audio_drafts'::regclass)
     or has_table_privilege('authenticated', 'public.audio_drafts', 'select') then
    raise exception '199: المسوّدةُ مقروءةٌ مباشرة أو بلا RLS';
  end if;
  if not exists (select 1 from information_schema.columns where table_schema = 'public'
                    and table_name = 'audio_scripts' and column_name = 'draft') then
    raise exception '199: عمودُ الوصفة غائب';
  end if;
  if not has_function_privilege('authenticated', 'public.dialogue_problem(bigint)', 'execute')
     or not has_function_privilege('authenticated', 'public.save_track_lines(bigint, text, jsonb, jsonb)', 'execute')
     or has_function_privilege('authenticated', 'public.dialogue_draft_problem(bigint, jsonb)', 'execute')
     or has_function_privilege('anon', 'public.dialogue_problem(bigint)', 'execute') then
    raise exception '199: منحُ الدوالّ على غير ما قُصد';
  end if;
end $chk$;

insert into public.sql_log (n, title, applied_at)
values ('199', 'الحوارُ المولَّد — حارسُه قبل الكلفة، ومسوّدتُه محفوظة، وتجميعُه نصٌّ لملفّه بوصفته', now())
on conflict (n) do update set applied_at = now();
