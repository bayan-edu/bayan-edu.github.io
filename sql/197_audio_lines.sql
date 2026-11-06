-- ══════════════════════════════════════════════════════════════════════
--  ١٩٧ · سطورُ المقطع الصوتيّ — نصُّه وحدودُ سطوره تتبع ملفَّه، يكتبها مؤلّفُه ويقرؤها من يقرأ المقطع
-- ══════════════════════════════════════════════════════════════════════
--
--  الخطوةُ الأولى من «مختبر الصوتيّات» (STATE §٠·د · ٦ نوفمبر): خطّةٌ أقرّها المالك بعد نقاشٍ في ستّ جولات، ثمّ
--  «ابدأ الخطوات بالتتابع لا تتوقف الا لقرار». والمختبرُ لوحةٌ في نموذج «مقطع صوتي» لا شاشة، **والحوارُ مقطعٌ له
--  سطور** — فالذي يولد هنا ليس نوعَ مصدرٍ جديداً بل بيتُ السطور: نصُّ كلّ سطرٍ وقائلُه وموضعُه في الملفّ. بها يُعيد
--  الطالبُ سطراً بعينه، ويُطوى النصُّ حتى يُكشف (الاستماعُ أوّلاً)، وعليها تُبنى الخطواتُ بعدها.
--
--  وأحكام:
--  ① **السطورُ تتبع الملفَّ لا موضعَه.** `audio_scripts.track_key` فريدٌ، وهو المفتاحُ كما في `items.url` بحرفه —
--     ومن المخزن وحده (مسطرةُ 180 · `c_key`). وملفّاتُ R2 لا تُطمس (`If-None-Match` في `r2-sign` و`tts` · 189 ③) ⇒
--     لا تنفصل السطورُ عن صوتها أبداً: ملفٌّ جديدٌ نصٌّ جديد. وكلُّ موضعٍ يستعمل المفتاح يجدها — المصدرُ اليوم،
--     والنصُّ الصوتيّ في الاختبار وEnglish Lab بعدُ — ونصٌّ صوتيٌّ تغيّر ملفُّه بعد أن أُجيب عنه يحفظ `passage_history`
--     مفتاحَه القديم، فتبقى سطورُه معه.
--  ② **والقراءةُ بسياسة المصادر نفسِها** كأختها `p_voice_clips_read` (189 ③): من يقرأ مقطعاً صوتيّاً بهذا المفتاح
--     (`p_items_read`) يقرأ سطورَه — فلا يُكتب حارسٌ ثانٍ يفترق عن الأوّل يوماً. والمعلّمُ يقرأ ما يقرأ من المصادر.
--     ⛔ **ولا سياسةَ للنصّ الصوتيّ في الاختبار هنا عمداً:** نصُّ الحوار لا يُقرأ أثناء المحاولة — `body` النصّ الصوتيّ
--     يُعرض تحت المشغّل (`quiz.js` · قِيس ٦ نوفمبر) — وبابُه بعد المحاولة دالّةٌ أختٌ لـ`submit_attempt` (الخطوة ٣).
--  ③ **والكتابةُ بدالّةٍ واحدة** (`save_item_lines`) بحارسٍ هو حارسُ `voice_problem` حرفاً إلا النوع: مقطعٌ صوتيّ
--     (`kind = 'audio'`) لا نصّ. **والسطورُ تُستبدل كلُّها في كلّ حفظ** — اللوحةُ تحفظ ما تعرض، فلا يبقى سطرٌ حذفه
--     المعلّمُ من شاشته — **وقائمةٌ فارغة تمحو نصَّ الملفّ** (وسطورُه معه).
--  ④ **ونصُّ ملفٍّ كتبه غيرُك لا يُطمس صامتاً:** المفتاحُ قد يُلصق في مصدرين، فالتعديلُ لكاتبه أو لفريق الإشراف
--     (`can_curate`)، وما سواهما يُردّ برسالةٍ تقول ذلك.
--  ⑤ **والحدودُ:** ٤٠٠ سطر · ١٠٠٠ حرفٍ للسطر · ٤٠ لاسم قائله · والزمنُ بالمللي ثانية حتى ساعة · والبداياتُ تتصاعد
--     بين ما وُقّت من السطور · والنهايةُ بعد البداية. **وسطرٌ بلا زمنٍ مقبول:** المعلّمُ يوقّت على مراحل ويحفظ بينها.
--  ⑥ **والمصدرُ (`source`) لكلّ سطر:** `upload` في هذه الخطوة — سطرٌ في ملفٍّ رُفع. ويقبل القيدُ من الآن `tts` و`record`
--     (الخطوتان ٢ و٥)، فلا يُعدَّل قيدٌ لكلٍّ منهما. **وهذه الدالّةُ لسطور الملفّ المرفوع وحده:** سطرُ الصوت المولَّد
--     يحمل ملفَّه ونبرته، وبابُه في الخطوة ٢.
--
--  📐 وما ليس هنا عمداً: التوليدُ وتجميعُ السطور (الخطوة ٢ · قرارُ المالك ق١) · النصُّ الصوتيّ في الاختبار ونصُّه بعد
--     المحاولة (الخطوة ٣) · الاستيرادُ مع الملفّ (الخطوة ٤) · ولا تُمسّ ملفّاتُ R2: نصٌّ يُمحى يُمحى صفُّه وحده.
--  🗣️ والرسائلُ محايدة (`bayan-language-identity` §٤)، وأربعٌ منها رسائلُ `voice_problem` بحرفها.
-- ══════════════════════════════════════════════════════════════════════


-- ═══════════════════ ① الجدولان وقيودُهما — منشآن ═══════════════════

create table if not exists public.audio_scripts (
  id          bigint      generated always as identity primary key,
  track_key   text        not null,
  subject_id  bigint      not null references public.subjects(id),
  lang        text        not null,
  created_by  uuid        references public.profiles(id),
  created_at  timestamptz not null default now(),
  updated_by  uuid        references public.profiles(id),
  updated_at  timestamptz not null default now()
);

/* المفتاحُ فريد — وبه يُكتب `on conflict` (①) */
create unique index if not exists audio_scripts_track_key on public.audio_scripts (track_key);

/* القيودُ بأسمائها خارج الإنشاء — فإعادةُ الملفّ تعيدها وتفحص بها ما في الجدول (الانضباط §٣) */
alter table public.audio_scripts drop constraint if exists audio_scripts_key;
alter table public.audio_scripts add constraint audio_scripts_key
  check (track_key ~ '^(r2:)?[a-z0-9][a-z0-9-]*/.+$' and char_length(track_key) <= 300);              -- ①
alter table public.audio_scripts drop constraint if exists audio_scripts_lang;
alter table public.audio_scripts add constraint audio_scripts_lang
  check (lang ~ '^[a-z]{2}$');

comment on table public.audio_scripts is
  'نصُّ مقطعٍ صوتيّ (197): صفٌّ لكلّ ملفٍّ كُتبت سطورُه، يُعرف بمفتاحه في المخزن لا بموضعه — فيجده كلُّ مصدرٍ يستعمل المفتاح. يكتبه save_item_lines.';
comment on column public.audio_scripts.track_key is
  'مفتاحُ الملفّ في المخزن كما في items.url بحرفه (r2:… أو مخزن/مسار) — والملفُّ لا يُطمس، فلا تنفصل السطورُ عن صوتها (197 ①)';
comment on column public.audio_scripts.subject_id is
  'مادّةُ المصدر الذي كُتب منه النصّ أوّلاً — وبها يُعرف فريقُ الإشراف الذي يعدّله مع كاتبه (197 ④)';
comment on column public.audio_scripts.lang is 'لغةُ المصدر يوم حُفظت السطور';

create table if not exists public.audio_lines (
  script_id  bigint  not null references public.audio_scripts(id) on delete cascade,
  n          integer not null,
  speaker    text,
  body       text    not null,
  start_ms   integer,
  end_ms     integer,
  source     text    not null default 'upload',
  primary key (script_id, n)
);

alter table public.audio_lines drop constraint if exists audio_lines_n;
alter table public.audio_lines add constraint audio_lines_n
  check (n between 1 and 400);                                                                       -- ⑤
alter table public.audio_lines drop constraint if exists audio_lines_body;
alter table public.audio_lines add constraint audio_lines_body
  check (char_length(body) between 1 and 1000 and body = btrim(body));                               -- ⑤
alter table public.audio_lines drop constraint if exists audio_lines_speaker;
alter table public.audio_lines add constraint audio_lines_speaker
  check (speaker is null or (char_length(speaker) between 1 and 40 and speaker = btrim(speaker)));   -- ⑤
alter table public.audio_lines drop constraint if exists audio_lines_time;
alter table public.audio_lines add constraint audio_lines_time
  check ((start_ms is null or start_ms between 0 and 3600000)
         and (end_ms is null or (start_ms is not null and end_ms > start_ms and end_ms <= 3600000)));  -- ⑤
alter table public.audio_lines drop constraint if exists audio_lines_source;
alter table public.audio_lines add constraint audio_lines_source
  check (source in ('upload', 'tts', 'record'));                                                     -- ⑥

comment on table public.audio_lines is
  'سطورُ نصّ المقطع (197): نصُّ السطر وقائلُه وموضعُه في الملفّ بالمللي ثانية. تُستبدل كلُّها في كلّ حفظ (197 ③).';
comment on column public.audio_lines.n is 'رقمُ السطر في النصّ، من ١';
comment on column public.audio_lines.speaker is 'قائلُ السطر — وفراغُه سطرٌ بلا قائلٍ مسمّى (نصٌّ يقرؤه واحد)';
comment on column public.audio_lines.body is 'نصُّ السطر كما يراه الطالب حين يكشفه';
comment on column public.audio_lines.start_ms is 'بدايةُ السطر في الملفّ — وفراغُه سطرٌ لم يُوقَّت بعد (197 ⑤)';
comment on column public.audio_lines.end_ms is 'نهايتُه إن ضُبطت — وفراغُها يعني: إلى بداية ما بعده أو آخر الملفّ';
comment on column public.audio_lines.source is
  'من أين صوتُ السطر: upload سطرٌ في ملفٍّ رُفع (197) · tts مولَّد (الخطوة ٢) · record تسجيلُ المعلّم (197 ⑥)';


-- ═══════════════════ ② القراءة — منحٌ وسياستان ═══════════════════

/* قراءةٌ وحدها، والكتابةُ بالدالّة (③) — والزائرُ لا شيء */
alter table public.audio_scripts enable row level security;
alter table public.audio_lines   enable row level security;
revoke all on public.audio_scripts, public.audio_lines from anon, authenticated;
grant select on public.audio_scripts, public.audio_lines to authenticated;

/* من يقرأ مقطعاً صوتيّاً بهذا المفتاح يقرأ نصَّه — والمقطعُ يُقرأ هنا بسياسته (`p_items_read`)، فلا حارسَ ثانٍ (②).
   🔑 وموازنةُ المفتاح (`i.url = track_key`) شرطٌ «leakproof» يُقدَّم على سياسة المصادر، فلا تُسأل `can_access_lesson`
   إلا عن صفوفٍ تحمل المفتاح نفسَه. ⛔ ولا `passages` هنا: نصُّ الحوار لا يُقرأ أثناء المحاولة (② · الخطوة ٣) */
do $pol$
begin
  if exists (select 1 from pg_policies where schemaname = 'public' and tablename = 'audio_scripts'
                                         and policyname = 'p_audio_scripts_read') then
    alter policy p_audio_scripts_read on public.audio_scripts to authenticated
      using (exists (select 1 from public.items i where i.url = audio_scripts.track_key and i.kind = 'audio'));
  else
    create policy p_audio_scripts_read on public.audio_scripts for select to authenticated
      using (exists (select 1 from public.items i where i.url = audio_scripts.track_key and i.kind = 'audio'));
  end if;

  if exists (select 1 from pg_policies where schemaname = 'public' and tablename = 'audio_lines'
                                         and policyname = 'p_audio_lines_read') then
    alter policy p_audio_lines_read on public.audio_lines to authenticated
      using (exists (select 1 from public.audio_scripts s where s.id = audio_lines.script_id));
  else
    create policy p_audio_lines_read on public.audio_lines for select to authenticated
      using (exists (select 1 from public.audio_scripts s where s.id = audio_lines.script_id));
  end if;
end $pol$;


-- ═══════════════════ ③ الكتابة — منشأتان ═══════════════════

/* الحارسُ: حارسُ `voice_problem` حرفاً (189 ④) إلا النوع — `can_author` على مادّة الدرس، ثمّ المعتمدُ (created_by null)
   للمشرف والإضافيُّ لصاحبه، والمقطعُ الصوتيّ وحده. والشرطان المنفصلان هناك (عطلُ null الذي كشفته جافّةُ 189) منفصلان
   هنا. ⇒ رسالةُ المانع، أو null */
create or replace function public.audio_lines_problem(p_item bigint)
returns text language plpgsql stable security definer set search_path to 'public'
as $fn$
declare v_subject bigint; v_kind text; v_owner uuid;
begin
  if auth.uid() is null then return 'يلزم تسجيل الدخول'; end if;

  select l.subject_id, i.kind, i.created_by into v_subject, v_kind, v_owner
    from items i
    join lessons l on l.id = i.lesson_id
   where i.id = p_item;
  if v_subject is null then return 'العنصر غير موجود'; end if;

  if not can_author(v_subject) then return 'لا صلاحية لك على هذه المادة'; end if;
  if v_kind is distinct from 'audio' then return 'هذا المصدر ليس مقطعاً صوتياً، والسطور تُكتب للمقاطع وحدها'; end if;
  if v_owner is null then
    if not can_curate(v_subject) then return 'العنصر غير موجود أو ليس من تأليفك'; end if;
  elsif v_owner <> auth.uid() then
    return 'العنصر غير موجود أو ليس من تأليفك';
  end if;
  return null;
end $fn$;

comment on function public.audio_lines_problem(bigint) is
  'حارسُ سطور المقطع (197): رسالةُ المانع أو null — حارسُ voice_problem حرفاً إلا النوع (مقطعٌ صوتيّ). لـsave_item_lines وحدها.';

/* سطورُ ملفّ المقطع كما تعرضها اللوحة: [{speaker?, text, start_ms?, end_ms?}] بترتيبها — تُستبدل كلُّها (③)،
   والفراغُ يمحو النصّ. والملفُّ ملفُّ المصدر المحفوظ (`items.url`) لا ما في حقل النموذج: اللوحةُ تكتب لملفٍّ حُفظ.
   ⇒ {ok, lines, script} أو {ok: false, error} — والخطأُ يسمّي رقمَ السطر الذي وقع فيه */
create or replace function public.save_item_lines(p_item bigint, p_lines jsonb)
returns jsonb language plpgsql security definer set search_path to 'public'
as $fn$
declare
  v_problem text; v_key text; v_subject bigint; v_lang text;
  v_sid bigint; v_owner uuid; v_sub bigint; v_n integer;
  v_prev numeric := -1; v_s numeric; v_e numeric; v_no text; v_body text; v_who text; r record;
begin
  v_problem := audio_lines_problem(p_item);
  if v_problem is not null then return jsonb_build_object('ok', false, 'error', v_problem); end if;

  select i.url, l.subject_id, i.lang into v_key, v_subject, v_lang
    from items i join lessons l on l.id = i.lesson_id
   where i.id = p_item;
  /* ① مفتاحٌ في المخزن بحرفه — والرابطُ الخارجيّ لا: لا يُضمن أنّه لا يتبدّل تحت سطوره */
  if v_key is null or v_key !~ '^(r2:)?[a-z0-9][a-z0-9-]*/.+$' or char_length(v_key) > 300 then
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
    from audio_scripts s where s.track_key = v_key for update;
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

  /* ثمّ الكتابة: النصُّ بمفتاحه (مادّتُه وكاتبُه الأوّلان باقيان)، والسطورُ تُستبدل كلُّها (③) */
  insert into audio_scripts (track_key, subject_id, lang, created_by, updated_by)
  values (v_key, v_subject, coalesce(v_lang, 'en'), auth.uid(), auth.uid())
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

comment on function public.save_item_lines(bigint, jsonb) is
  'تحفظ سطورَ ملفّ المقطع الصوتيّ (197): تُستبدل كلُّها، والفراغُ يمحو النصّ، ونصُّ غيرِك لكاتبه أو للمشرف. بحارس audio_lines_problem.';


-- ═══════════════════ ④ المنح ═══════════════════

/* الدالّتان جديدتان ⇒ `fn_auto_lock` يسحب عنهما PUBLIC و anon (154 · 186)، وهذا السطرُ يقول القصدَ صريحاً. والحارسُ لا
   يُمنح `authenticated` — ومنحُ المخطَّط الافتراضيّ يعطيه إيّاه (189 ⑤) فيُسحب: تناديه الدالّةُ بصلاحية مالكها */
revoke all on function public.audio_lines_problem(bigint), public.save_item_lines(bigint, jsonb) from public, anon;
revoke all on function public.audio_lines_problem(bigint) from authenticated;
grant execute on function public.save_item_lines(bigint, jsonb) to authenticated, service_role;


-- ═══════════════════ ⑤ الختام — لا يُسجَّل ما لم يتمّ ═══════════════════

do $chk$
begin
  if not (select relrowsecurity from pg_class where oid = 'public.audio_scripts'::regclass)
     or not (select relrowsecurity from pg_class where oid = 'public.audio_lines'::regclass) then
    raise exception '197: أحدُ الجدولين بلا RLS';
  end if;
  if (select count(*) from pg_constraint where conrelid = 'public.audio_scripts'::regclass and contype = 'c') <> 2 then
    raise exception '197: قيودُ audio_scripts ليست اثنين';
  end if;
  if (select count(*) from pg_constraint where conrelid = 'public.audio_lines'::regclass and contype = 'c') <> 5 then
    raise exception '197: قيودُ audio_lines ليست خمسة';
  end if;
  if (select count(*) from pg_policies where schemaname = 'public'
         and policyname in ('p_audio_scripts_read', 'p_audio_lines_read')) <> 2 then
    raise exception '197: سياستا القراءة ليستا قائمتين';
  end if;
  if to_regclass('public.audio_scripts_track_key') is null then
    raise exception '197: فهرسُ المفتاح الفريد غائب';
  end if;
  if not has_function_privilege('authenticated', 'public.save_item_lines(bigint, jsonb)', 'execute')
     or has_function_privilege('authenticated', 'public.audio_lines_problem(bigint)', 'execute')
     or has_function_privilege('anon', 'public.save_item_lines(bigint, jsonb)', 'execute') then
    raise exception '197: منحُ الدالّتين على غير ما قُصد';
  end if;
  if has_table_privilege('anon', 'public.audio_scripts', 'select')
     or has_table_privilege('authenticated', 'public.audio_lines', 'insert') then
    raise exception '197: منحُ الجدولين على غير ما قُصد';
  end if;
end $chk$;

insert into public.sql_log (n, title, applied_at)
values ('197', 'سطورُ المقطع الصوتيّ — نصُّه وحدودُ سطوره تتبع ملفَّه، يكتبها مؤلّفُه ويقرؤها من يقرأ المقطع', now())
on conflict (n) do update set applied_at = now();
