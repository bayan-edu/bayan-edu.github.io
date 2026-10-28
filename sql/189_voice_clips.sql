-- ══════════════════════════════════════════════════════════════════════
--  ١٨٩ · صوتُ الجملة المولَّد — يُحفظ بملفّه ومدّته، ويعتمده معلّمٌ قبل أن يبلغ الطالب
-- ══════════════════════════════════════════════════════════════════════
--
--  الخطوةُ الرابعة من ستٍّ لصوت النصّ العربيّ (قراراتُ المالك ٢٦–٢٧ أكتوبر · STATE ⑥-ج، وخطّةُ هذا الملفّ أقرّها قبل
--  كتابته): الآيةُ تلاوةُ الحصري (188 · b198 · b199)، وما سواها من النصّ صوتٌ يولّده Gemini مسبقاً بعد تشكيله آليّاً،
--  **يسمعه المعلّمُ ويعتمده قبل أن يبلغ الطالب** — وما لم يُعتمد صامت. وهذا الملفُّ بيتُ ذلك الصوت: صفٌّ لكلّ جملةٍ
--  وُلّد صوتُها. **ولا يولّد شيئاً:** التوليدُ دالّةٌ طرفيّة (الخطوة ٥ · قرارٌ للمالك — AGENTS §٠)، وهي التي تنادي
--  `save_voice` بهويّة المعلّم الذي طلبه.
--
--  وأحكام:
--  ① **الجملةُ تُعرف ببصمتها لا بموضعها** (`sentence_sha`): أوّلُ ١٦ خانةً من SHA-256 للجملة كما يقسمها الكتاب
--     (`textSentences` · book.js · b198). يعدّل المعلّمُ النصَّ فتتبدّل المواضع، والصوتُ يتبع جملته: جملةٌ تغيّرت يصمت
--     صوتُها ولا يُسمع صوتُ غيرها، وما لم يتغيّر يبقى بصوته واعتماده، والجملةُ القديمة تعود بصوتها إن عادت. وهو حكمُ
--     188 ① نفسُه: يُطابَق بالنصّ عند العرض، وما لا يطابق يصمت. **والبصمةُ تحسبها القاعدةُ كما يحسبها المتصفّح**
--     (`crypto.subtle`) — قِيس ٢٧ أكتوبر على جملتين، عربيّةٍ بتشكيلها وإنجليزيّة، فالناتجُ واحد. والقيدُ يعيد حسابها.
--  ② **والجملةُ نفسُها تُحفظ في صفّها** — نسخةٌ ممّا يراه الطالب، بها تُحسب البصمة، وبها تعرض لوحةُ الصوت الجملةَ وإن
--     تغيّر النصّ. **ولا يُحفظ هنا النصُّ المنطوق المشكول:** مكانُه R2 بجوار صوته (قرارُ المالك · ٢٧ أكتوبر)، والقاعدةُ
--     تحفظ مكانَه وحده. وأطولُ جملةٍ في النصوص اليوم ٧٧٥ حرفاً (قِيس) ⇒ الحدُّ ٢٠٠٠.
--  ③ **والملفُّ في مجلّد نصّه، واسمُه بصمةُ جملته** — `voice/{النصّ}/{البصمة}.{الإصدار}.mp3`، والنصُّ المنطوق بالاسم نفسه
--     `.txt` — فلا يشير صفٌّ إلى صوت جملةٍ أخرى. والإصدارُ في الاسم لأنّ الصوتَ المعاد توليدُه ملفٌّ جديد: لا يسمع أحدٌ
--     نسخةً قديمةً بقيت في ذاكرة متصفّحه أو في Cloudflare. ولا يكتب في `voice/` متصفّح: `r2-sign` لا يوقّع إلا `audio/`
--     و`img/` (قِيس) — فما فيه كتبته دالّةُ التوليد.
--  ④ **ولا صوتَ مولَّداً لآيةٍ مرقَّمة:** جملةٌ فيها «۝» (علامةُ رقم الآية) تُردّ — الآيةُ تلاوةٌ «غير مولَّدة» بحرف المالك،
--     وجملتُها تُتلى بصوت الحصري (188). قيدٌ على الجدول، فيُمسك كلَّ كاتبٍ اليومَ وغداً. **أمّا «﴿» و«﴾» فلا تُمنعان:**
--     تُستعملان لغير الآيات، والقيدُ عليهما «يعطّل العمل لا يخدمه» (حكمُ المالك · ٢٨ أكتوبر) — وكانتا فيه حين كُتب أوّلاً.
--  ⑤ **والاعتمادُ لكلّ جملة، وكلُّ إعادةِ توليدٍ تُسقطه** — فما يسمعه الطالبُ اعتمده معلّم. والقراءةُ بـRLS: من يقرأ النصَّ
--     يرى المعتمدَ من جمله (والحارسُ حارسُ النصّ نفسُه)، ومؤلّفو المادّة يرون الجملَ كلَّها للوحة الصوت (`can_author_item`)،
--     والزائرُ لا شيء. والكتابةُ بدالّتين حارسُهما واحد (`voice_problem`)، وهو حارسُ `save_item_quran` حرفاً: `can_author`،
--     ثمّ صاحبُ الإضافيّ أو المشرفُ على المعتمد.
--
--  📐 وما ليس هنا عمداً: دالّةُ التوليد (الخطوة ٥) · لوحةُ الصوت وتشغيلُ المولَّد في كتاب الطالب (الخطوة ٦) · وحذفُ صوت
--     جملةٍ خرجت من النصّ — لا يُسمع لأنّ بصمته لا تطابق جملة، ويعود إن عادت جملتُه، فلا دالّةَ حذف · وملفّاتُ R2 تبقى
--     بعد حذف النصّ وصفوفِه، كصور النصوص اليوم.
--  🗣️ والرسائلُ الجديدة محايدة (`bayan-language-identity` §٤): «لا صلاحية لك على هذه المادة» — وهي في القاعدة من قبل —
--     لا «لا تملك» التي تحملها رسائلُ التأليف القديمة.
-- ══════════════════════════════════════════════════════════════════════


-- ═══════════════════ ① البصمة — منشأة ═══════════════════

/* ثابتةٌ (immutable) وإن كانت `convert_to` مستقرّةً فحسب: ترميزُ القاعدة UTF8 لا يتغيّر (قِيس) ⇒ الجملةُ الواحدة
   بصمتُها واحدةٌ أبداً، وبها يُكتب قيدُ البصمة أدناه. */
create or replace function public.sentence_sha(p_sentence text)
returns text language sql immutable strict parallel safe set search_path to 'public'
as $fn$
  select left(encode(sha256(convert_to(p_sentence, 'UTF8')), 'hex'), 16)
$fn$;

comment on function public.sentence_sha(text) is
  'بصمةُ الجملة (189 ①): أوّلُ ١٦ خانةً من SHA-256 لنصّها بترميز UTF-8 — ويحسبها المتصفّحُ كذلك (crypto.subtle) فتطابق.';


-- ═══════════════════ ② الجدول وقيودُه — منشأ ═══════════════════

create table if not exists public.voice_clips (
  item_id      bigint      not null references public.items(id) on delete cascade,
  sha          text        not null,
  sentence     text        not null,
  audio        text        not null,
  spoken       text        not null,
  ms           integer     not null,
  voice        text        not null,
  approved_at  timestamptz,
  approved_by  uuid        references public.profiles(id),
  created_by   uuid        references public.profiles(id),
  created_at   timestamptz not null default now(),
  primary key (item_id, sha)
);

/* القيودُ بأسمائها خارج الإنشاء — فإعادةُ الملفّ تعيدها وتفحص بها ما في الجدول (الانضباط §٣) */
alter table public.voice_clips drop constraint if exists voice_clips_sha;
alter table public.voice_clips add constraint voice_clips_sha
  check (sha = public.sentence_sha(sentence));                                         -- ①
alter table public.voice_clips drop constraint if exists voice_clips_sentence;
alter table public.voice_clips add constraint voice_clips_sentence
  check (char_length(sentence) between 1 and 2000 and sentence = btrim(sentence));     -- ②
alter table public.voice_clips drop constraint if exists voice_clips_no_ayah;
alter table public.voice_clips add constraint voice_clips_no_ayah
  check (position('۝' in sentence) = 0);                                               -- ④
alter table public.voice_clips drop constraint if exists voice_clips_audio;
alter table public.voice_clips add constraint voice_clips_audio
  check (audio ~ ('^r2:voice/' || item_id || '/' || sha || '\.[a-z0-9]{1,16}\.mp3$'));  -- ③
alter table public.voice_clips drop constraint if exists voice_clips_spoken;
alter table public.voice_clips add constraint voice_clips_spoken
  check (spoken = left(audio, -4) || '.txt');                                          -- ③ بجوار صوته
alter table public.voice_clips drop constraint if exists voice_clips_ms;
alter table public.voice_clips add constraint voice_clips_ms
  check (ms between 100 and 600000);
alter table public.voice_clips drop constraint if exists voice_clips_voice;
alter table public.voice_clips add constraint voice_clips_voice
  check (char_length(voice) between 1 and 120 and voice = btrim(voice));
alter table public.voice_clips drop constraint if exists voice_clips_approved;
alter table public.voice_clips add constraint voice_clips_approved
  check ((approved_at is null) = (approved_by is null));                               -- ⑤

comment on table public.voice_clips is
  'صوتُ الجملة المولَّد في نصّ (189): صفٌّ لكلّ جملةٍ وُلّد صوتُها، تُعرف ببصمتها لا بموضعها. يكتبه save_voice ويعتمده approve_voice، والطالبُ يرى المعتمدَ وحده.';
comment on column public.voice_clips.sha is
  'بصمةُ الجملة: sentence_sha(sentence)، وبها يطابق الكتابُ جملتَه (189 ①)';
comment on column public.voice_clips.sentence is
  'الجملةُ كما يراها الطالب، كما يقسمها الكتاب (textSentences · book.js · b198)';
comment on column public.voice_clips.audio is
  'r2:voice/{النصّ}/{البصمة}.{الإصدار}.mp3 — ملفٌّ جديدٌ لكلّ توليد (189 ③)';
comment on column public.voice_clips.spoken is
  'مكانُ النصّ المنطوق المشكول في R2، بجوار صوته بالاسم نفسه .txt (قرارُ المالك · 189 ②)';
comment on column public.voice_clips.ms is 'مدّةُ الصوت بالمللي ثانية';
comment on column public.voice_clips.voice is 'بمَ وُلّد: النموذجُ واللغةُ واسمُ الصوت';
comment on column public.voice_clips.approved_at is
  'اعتمادُ المعلّم بعد أن سمعه — وكلُّ إعادةِ توليدٍ تُسقطه، ولا يرى الطالبُ غيرَ المعتمد (189 ⑤)';


-- ═══════════════════ ③ القراءة — منحٌ وسياسة ═══════════════════

/* قراءةٌ وحدها، والكتابةُ بالدالّتين (④) — والزائرُ لا شيء */
alter table public.voice_clips enable row level security;
revoke all on public.voice_clips from anon, authenticated;
grant select on public.voice_clips to authenticated;

/* أمؤلّفٌ أنت في مادّة هذا النصّ؟ — `can_author` على مادّة درسه. 🔴 **والسياسةُ لا تنادي `can_author` نفسَها:** ليست
   ممنوحةً لـ`authenticated` (قِيس · مقفلةٌ منذ 154)، والسياسةُ تُقيَّم بصلاحية القارئ ⇒ كان الطالبُ يُردّ بخطأ صلاحيةٍ عن
   الجدول كلِّه لا عن الصفوف غيرِ المعتمدة وحدها. فالغلافُ يُمنح، ولا يكشف إلا نعم أو لا لنصٍّ واحد، ومنحُ `can_author`
   على حاله. */
create or replace function public.can_author_item(p_item bigint)
returns boolean language sql stable security definer set search_path to 'public'
as $fn$
  select coalesce((select can_author(l.subject_id)
                     from items i join lessons l on l.id = i.lesson_id
                    where i.id = p_item), false)
$fn$;

comment on function public.can_author_item(bigint) is
  'أيؤلّف المستدعي في مادّة هذا النصّ؟ — can_author على مادّة درسه، بغلافٍ ممنوح تناديه سياسةُ voice_clips (189 ③).';

/* من يقرأ النصَّ يرى المعتمدَ من جمله — والنصُّ يُقرأ هنا بسياسته (`p_items_read`)، فلا يُكتب حارسٌ ثانٍ يفترق عن الأوّل
   يوماً. ومؤلّفو المادّة يرون الجملَ كلَّها، معتمدةً وغيرَ معتمدة (للوحة الصوت). */
do $pol$
begin
  if exists (select 1 from pg_policies where schemaname = 'public' and tablename = 'voice_clips'
                                         and policyname = 'p_voice_clips_read') then
    alter policy p_voice_clips_read on public.voice_clips to authenticated
      using (exists (select 1 from public.items i where i.id = voice_clips.item_id)
             and (approved_at is not null or public.can_author_item(item_id)));
  else
    create policy p_voice_clips_read on public.voice_clips for select to authenticated
      using (exists (select 1 from public.items i where i.id = voice_clips.item_id)
             and (approved_at is not null or public.can_author_item(item_id)));
  end if;
end $pol$;


-- ═══════════════════ ④ الكتابة — منشأات ثلاث ═══════════════════

/* الحارسُ في موضعٍ واحد للدالّتين: حارسُ `save_item_quran` حرفاً (188 ③) — can_author على مادّة الدرس، ثمّ المعتمدُ
   (created_by null) للمشرف والإضافيُّ لصاحبه، والنصوصُ وحدها (needs = 'body'). ⇒ رسالةُ المانع، أو null */
create or replace function public.voice_problem(p_item bigint)
returns text language plpgsql stable security definer set search_path to 'public'
as $fn$
declare v_subject bigint; v_needs text; v_owner uuid;
begin
  if auth.uid() is null then return 'يلزم تسجيل الدخول'; end if;

  select l.subject_id, k.needs, i.created_by into v_subject, v_needs, v_owner
    from items i
    join lessons l on l.id = i.lesson_id
    left join item_kinds k on k.code = i.kind
   where i.id = p_item;
  if v_subject is null then return 'العنصر غير موجود'; end if;

  if not can_author(v_subject) then return 'لا صلاحية لك على هذه المادة'; end if;
  if v_needs is distinct from 'body' then return 'هذا المصدر ليس نصاً، والصوت يُولَّد للنصوص وحدها'; end if;
  /* 🔴 شرطان منفصلان لا تعبيرٌ واحد: هو في 188 داخل `where`، وهناك يُسقط null الصفَّ. وهنا كان «not (…)»: على المعتمد
     `v_owner = auth.uid()` null، و`false or null` null، و`not null` null ⇒ `if` لا يُردّ — **فحفظ مؤلّفٌ غيرُ مشرفٍ صوتاً
     على مصدرٍ معتمدٍ واعتمده.** كشفته الجافّةُ الأولى. */
  if v_owner is null then
    if not can_curate(v_subject) then return 'العنصر غير موجود أو ليس من تأليفك'; end if;
  elsif v_owner <> auth.uid() then
    return 'العنصر غير موجود أو ليس من تأليفك';
  end if;
  return null;
end $fn$;

comment on function public.voice_problem(bigint) is
  'حارسُ صوت النصّ (189): رسالةُ المانع أو null — حارسُ save_item_quran حرفاً. للدالّتين وحدهما، ولا تُنادى من خارجهما.';

/* صوتُ جملةٍ بعد توليده — تناديها دالّةُ التوليد (الخطوة ٥) بهويّة المعلّم الذي طلبه، بعد أن ترفع الملفّين إلى R2.
   والبصمةُ تُحسب هنا لا تُرسل، ومكانُ النصّ المنطوق يُشتقّ من مكان الصوت (③). وإعادةُ التوليد تكتب فوق صفّ جملتها
   وتُسقط اعتماده (⑤). ⇒ {ok, sha} أو {ok: false, error} */
create or replace function public.save_voice(p_item bigint, p_sentence text, p_audio text, p_ms integer, p_voice text)
returns jsonb language plpgsql security definer set search_path to 'public'
as $fn$
declare v_problem text; v_sha text;
begin
  v_problem := voice_problem(p_item);
  if v_problem is not null then return jsonb_build_object('ok', false, 'error', v_problem); end if;

  if p_sentence is null or char_length(p_sentence) not between 1 and 2000 or p_sentence <> btrim(p_sentence) then
    return jsonb_build_object('ok', false, 'error', 'الجملة غير صالحة: فارغة، أو أطول من ٢٠٠٠ حرف، أو في طرفيها مسافة');
  end if;
  if position('۝' in p_sentence) > 0 then
    return jsonb_build_object('ok', false, 'error', 'الآيات لا يُولَّد لها صوت: تُتلى بصوت الحصري');
  end if;
  v_sha := sentence_sha(p_sentence);
  if p_audio is null or p_audio !~ ('^r2:voice/' || p_item || '/' || v_sha || '\.[a-z0-9]{1,16}\.mp3$') then
    return jsonb_build_object('ok', false, 'error', 'ملف الصوت ليس في مجلد هذا النص، أو لا يحمل بصمة جملته');
  end if;
  if p_ms is null or p_ms not between 100 and 600000 then
    return jsonb_build_object('ok', false, 'error', 'مدة الصوت غير صالحة');
  end if;
  if p_voice is null or char_length(btrim(p_voice)) not between 1 and 120 then
    return jsonb_build_object('ok', false, 'error', 'اسم الصوت المستعمل مطلوب، ولا يزيد على ١٢٠ حرفاً');
  end if;

  insert into voice_clips (item_id, sha, sentence, audio, spoken, ms, voice, created_by)
  values (p_item, v_sha, p_sentence, p_audio, left(p_audio, -4) || '.txt', p_ms, btrim(p_voice), auth.uid())
  on conflict (item_id, sha) do update
     set sentence = excluded.sentence, audio = excluded.audio, spoken = excluded.spoken,
         ms = excluded.ms, voice = excluded.voice,
         approved_at = null, approved_by = null,
         created_by = excluded.created_by, created_at = now();

  return jsonb_build_object('ok', true, 'sha', v_sha);
end $fn$;

comment on function public.save_voice(bigint, text, text, integer, text) is
  'تحفظ صوتَ جملةٍ بعد توليده (189): البصمةُ تُحسب هنا، وإعادةُ التوليد تُسقط الاعتماد. تناديها دالّةُ التوليد بهويّة المعلّم.';

/* اعتمادُ المعلّم بعد أن سمع، أو سحبُه (p_ok = false) — لجملٍ بعينها ببصماتها، وبالحارس نفسِه. وجملةٌ بلا صوتٍ لا تُعتمد:
   لا صفَّ لها، فتُعاد في `missing`. ⇒ {ok, count, missing} أو {ok: false, error} */
create or replace function public.approve_voice(p_item bigint, p_shas text[], p_ok boolean default true)
returns jsonb language plpgsql security definer set search_path to 'public'
as $fn$
declare v_problem text; v_n integer; v_missing text[];
begin
  v_problem := voice_problem(p_item);
  if v_problem is not null then return jsonb_build_object('ok', false, 'error', v_problem); end if;

  if p_ok is null then
    return jsonb_build_object('ok', false, 'error', 'لم يُحدَّد الاعتماد أو سحبه');
  end if;
  if p_shas is null or cardinality(p_shas) = 0
     or exists (select 1 from unnest(p_shas) s where s is null or s !~ '^[0-9a-f]{16}$') then
    return jsonb_build_object('ok', false, 'error', 'بصمات الجمل غير صالحة');
  end if;

  update voice_clips
     set approved_at = case when p_ok then now() end,
         approved_by = case when p_ok then auth.uid() end
   where item_id = p_item and sha = any (p_shas);
  get diagnostics v_n = row_count;

  select coalesce(array_agg(distinct s), '{}') into v_missing
    from unnest(p_shas) s
   where not exists (select 1 from voice_clips c where c.item_id = p_item and c.sha = s);

  return jsonb_build_object('ok', true, 'count', v_n, 'missing', to_jsonb(v_missing));
end $fn$;

comment on function public.approve_voice(bigint, text[], boolean) is
  'اعتمادُ المعلّم صوتَ جملٍ بعينها بعد سماعها، أو سحبُه (189): بحارس save_voice، وما لا صوتَ له يُعاد في missing.';


-- ═══════════════════ ⑤ المنح ═══════════════════

/* الخمسُ جديدة ⇒ `fn_auto_lock` يسحب عنها PUBLIC و anon (154 · 186)، وهذا السطرُ يقول القصدَ صريحاً. والحارسُ لا يُمنح
   `authenticated` — ومنحُ المخطَّط الافتراضيّ يعطيه إيّاه (قِيس: `pg_default_acl`) فيُسحب: تناديه الدالّتان بصلاحية مالكهما */
revoke all on function public.sentence_sha(text), public.can_author_item(bigint), public.voice_problem(bigint),
                       public.save_voice(bigint, text, text, integer, text),
                       public.approve_voice(bigint, text[], boolean) from public, anon;
revoke all on function public.voice_problem(bigint) from authenticated;
grant execute on function public.sentence_sha(text), public.can_author_item(bigint),
                          public.save_voice(bigint, text, text, integer, text),
                          public.approve_voice(bigint, text[], boolean) to authenticated, service_role;


-- ═══════════════════ ⑥ الختام — لا يُسجَّل ما لم يتمّ ═══════════════════

do $chk$
begin
  if not (select relrowsecurity from pg_class where oid = 'public.voice_clips'::regclass) then
    raise exception '189: voice_clips بلا RLS';
  end if;
  if (select count(*) from pg_constraint where conrelid = 'public.voice_clips'::regclass and contype = 'c') <> 8 then
    raise exception '189: قيودُ voice_clips ليست ثمانية';
  end if;
  if not exists (select 1 from pg_policies where schemaname = 'public' and tablename = 'voice_clips'
                                             and policyname = 'p_voice_clips_read') then
    raise exception '189: سياسةُ القراءة غائبة';
  end if;
  /* ① البصمةُ بصمةُ المتصفّح — الجملتان قيستا بـcrypto.subtle (٢٧ أكتوبر) */
  if public.sentence_sha('مقدّمةٌ قصيرة: «قالَ» — وفيها جملتان.') <> 'db210e64ce0707c5'
     or public.sentence_sha('Dr. Ali met Mr. Omar.') <> 'e3e6ce529abc9ec6' then
    raise exception '189: البصمةُ لا تطابق بصمةَ المتصفّح';
  end if;
  if has_table_privilege('anon', 'public.voice_clips', 'select')
     or not has_table_privilege('authenticated', 'public.voice_clips', 'select')
     or has_table_privilege('authenticated', 'public.voice_clips', 'insert')
     or has_table_privilege('authenticated', 'public.voice_clips', 'update')
     or has_table_privilege('authenticated', 'public.voice_clips', 'delete') then
    raise exception '189: منحُ الجدول على غير ما كُتب';
  end if;
  if not (has_function_privilege('authenticated', 'public.save_voice(bigint, text, text, integer, text)', 'execute')
          and has_function_privilege('authenticated', 'public.approve_voice(bigint, text[], boolean)', 'execute')
          and has_function_privilege('authenticated', 'public.can_author_item(bigint)', 'execute'))
     or has_function_privilege('anon', 'public.can_author_item(bigint)', 'execute')
     or has_function_privilege('anon', 'public.save_voice(bigint, text, text, integer, text)', 'execute')
     or has_function_privilege('anon', 'public.approve_voice(bigint, text[], boolean)', 'execute')
     or has_function_privilege('authenticated', 'public.voice_problem(bigint)', 'execute') then
    raise exception '189: منحُ الدوالّ على غير ما كُتب';
  end if;
end $chk$;


-- ═══════════════════ السجلّ ═══════════════════

insert into public.sql_log (n, title, applied_at)
values ('189', 'صوتُ الجملة المولَّد — يُحفظ بملفّه ومدّته، ويعتمده معلّمٌ قبل أن يبلغ الطالب', now())
on conflict (n) do update set applied_at = now();
