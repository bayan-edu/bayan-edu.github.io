-- ══════════════════════════════════════════════════════════════════════
--  ١٩٥ · صوتُ وجه البطاقة — حارسٌ قبل الكلفة · واللصقُ لا يمحو صوتاً · ولا يبقى صوتٌ لوجهٍ تغيّر
-- ══════════════════════════════════════════════════════════════════════
--
--  حكمُ المالك (٥ نوفمبر ٢٠٢٦): «يمكن بناء إضافة الصوت لشاشة تحرير البطاقات، ويتم التجربة يدويا عمليا بعدة بطاقات، ثم إذا المنتج
--  جيد يتم توليد جميع البطاقات أليا» — وأقرّ خطّتها: «نعم، نفّذ الخطة». فدالّةُ `tts` تولّد صوتَ الوجه، وملفُّه في R2 بمفتاح
--  `r2:voice/cards/<المجموعة>/…`، ونموذجُ البطاقة يكتبه في `cards.audio` بحفظه. ولا جدولَ جديد: **الحفظُ هو الاعتماد**، فما لم
--  يُحفظ لا يعرفه الطالب (`due_cards` و`practice_cards` و`lesson_cards` و`browse_deck` تردّ `audio` منذ قبل — قِيس على الحيّ).
--
--  ① الحارس: `tts` تدفع لـGoogle قبل أن يُكتب شيء، فتسأله أوّلاً بهويّة المستدعي — كما تسأل `voice_problem` للنصوص (190).
--     وشرطُه شرطُ `save_card` ومعه `can_author`: **`save_card` يأذن لمالك المجموعة أيّاً كان، والتوليدُ للمؤلّفين وحدهم** — حكمُ
--     المالك على شرط العمر في شروط Google: «التوليد يقوم به بالغون، والخدمة لا تصل إطلاقاً لمستخدمي الموقع من الطلاب».
--
--  ② `save_cards`: كانت تكتب `audio = excluded.audio`، واللصقُ والاستيراد (`import_cards` تناديها) بلا عمود صوت ⇒ `null` ⇒
--     **إعادةُ اللصق «تصحيحاً للمعاني» تمحو صوتَ البطاقات بلا كلمة**. والوجهُ لا يتغيّر عند التعارض (الدالّةُ لا تكتبه)، فالصوتُ
--     باقٍ صادقاً ما لم يأتِ غيرُه. ⚠️ والخطرُ نفسُه في `image` و`front_image`، ولا صورةَ اليوم (٠ من ٥٨١٢ بطاقة) ⇒ مكتوبٌ في STATE
--     ولا يُفتح هنا.
--
--  ③ والصوتُ المولَّد يتبع نصَّه: جملةُ النصّ تُعرف بنصّها فتسكت إن تغيّرت (189 ①)، والبطاقةُ هويّتُها رقمها فيبقى صوتُها على
--     وجهٍ جديد — ونطقٌ خاطئ يُحفظ أسوأ من لا نطق (`101`). ⇒ تغيّر الوجهُ ولم يتغيّر الصوت ⇒ يسقط، أيّاً كان المسار الكاتب.
--     **والمولَّدُ وحده:** الملفُّ المرفوع اختاره المعلّمُ بيده، وقد يصحّ بعد تعديلٍ كـ«pride (n)» ⇐ «pride».
-- ══════════════════════════════════════════════════════════════════════


-- ═══════════════ منشأة ═══════════════

create or replace function public.card_voice_problem(p_deck bigint)
returns text language plpgsql stable security definer set search_path to 'public' as $function$
declare v_subject bigint; v_owner uuid;
begin
  if auth.uid() is null then return 'يلزم تسجيل الدخول'; end if;

  select d.subject_id, d.owner_id into v_subject, v_owner from decks d where d.id = p_deck;
  if v_subject is null then return 'مجموعة البطاقات غير موجودة'; end if;

  /* 🔴 `coalesce` لا `not (…)` وحده: «not null» لا يدخل `if` فيمرّ — وهو عطلُ `voice_problem` الذي كشفته جافّةُ 189 */
  if not coalesce(can_author(v_subject), false) then return 'لا صلاحية لك على هذه المادة'; end if;
  if v_owner is distinct from auth.uid() and not coalesce(can_curate(v_subject), false) then
    return 'لا صلاحية لك على هذه المجموعة';
  end if;
  return null;
end $function$;

revoke all on function public.card_voice_problem(bigint) from public, anon;
grant execute on function public.card_voice_problem(bigint) to authenticated;


create or replace function public.cards_voice_follows_front()
returns trigger language plpgsql set search_path to 'public' as $function$
begin
  if new.front is distinct from old.front and new.audio is not distinct from old.audio
     and old.audio like 'r2:voice/cards/%' then
    new.audio := null;
  end if;
  return new;
end $function$;

drop trigger if exists cards_voice_follows_front on public.cards;
create trigger cards_voice_follows_front
  before update of front on public.cards
  for each row execute function public.cards_voice_follows_front();


-- ═══════════════ معدَّلة لا منشأة — save_cards ═══════════════
--  موضعٌ واحد في دالّةٍ حيّة (قُرئت بـ`pg_get_functiondef` قبل الكتابة، والنمطُ فيها مرّةً واحدة) — فلا تُنسخ كاملةً هنا.

do $$
declare v text; n int;
begin
  v := pg_get_functiondef('public.save_cards(bigint,jsonb)'::regprocedure);
  n := (select count(*) from regexp_matches(v, 'audio\s+= excluded\.audio', 'g'));
  if n = 0 then raise notice 'save_cards صُحّحت من قبل'; return; end if;
  if n <> 1 then raise exception 'وُجد النمط % مرّة لا مرّة واحدة', n; end if;
  execute regexp_replace(v, 'audio(\s+)= excluded\.audio', 'audio\1= coalesce(excluded.audio, cards.audio)', 'g');
end $$;


insert into public.sql_log (n, title, applied_at)
values ('195', 'صوتُ وجه البطاقة — حارسٌ قبل الكلفة · واللصقُ لا يمحو صوتاً · ولا يبقى صوتٌ لوجهٍ تغيّر', now())
on conflict (n) do update set applied_at = now();
