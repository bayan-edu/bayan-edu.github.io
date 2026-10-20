/* ═══════════════════════════════════════════════════════════════════
   168 · الصوتُ يسكن R2 — وسمُ المفاتيح الثمانية بأسمائها

   لماذا:
   الملفّاتُ الخمسة نُسخت إلى Cloudflare R2 (المخزن `bayan-media` ·
   المجلّد `audio/`) **بأسمائها حرفاً**، وقِيست على النطاق
   `media.bayanclass.com`: ٢٠٠ · أحجامُها مطابقةٌ لـ`storage.objects`
   بالبايت · `Range` ⇒ ٢٠٦. والواجهةُ تعرف الوسمَ `r2:` منذ `b159`
   (قِيس على bayanclass.com: المفتاحُ يُترجَم، والصوتُ يُحمَّل ٩٧ ثانية
   من البيتين). فما بقي إلا أن تقول القاعدةُ أين يسكن كلُّ ملفّ —
   **والوسمُ وحده يتغيّر:**
       audio/l1-a1.mp3  ⇒  r2:audio/l1-a1.mp3

   🔴 **الوسمُ بالاسم لا بشرط.** `items.url` يحمل مساراتِ المحاكيات
      (`sims/…html` — المصادر ١٤ · ١٥ · ١٧)، و«كلُّ ما لا يبدأ بـhttp»
      يَسِمها فتسقط صامتة. وكان ذاك نصَّ المثال في تعليق `media.js`
      حتى `b159`.
   🔑 **والجردُ مسحَ كلَّ عمودٍ نصّيٍّ في `public`** (text · jsonb ·
      ARRAY) بحثاً عن الأسماء الخمسة: أربعةُ أعمدةٍ لا غير — `items.url`
      · `passages.media_url` · `questions.audio_url` · `passage_history`.
      و`cards.audio` صفرٌ اليوم، ويُوسَم معها إن وُجد.

   📐 **ما لا يُوسَم، وسببُه:**
      · **خمسُ إحالاتٍ إلى ملفّاتٍ لا وجود لها** (النصوص ٢٠ · ٢٦ · ٢٨ ·
        ٢٩ · وصفُّ `passage_history` ١) — بقايا رفعٍ متكرّرٍ لصوت
        الاختبار ١٢. لا ملفَّ يُنقل، ولا سؤالَ مرتبطٌ بأيٍّ منها. دَينٌ
        مكتوبٌ في STATE، والوسمُ لا يُصلحه ولا يُفسده.
      · **`passage_history` لا يُمسّ:** التاريخُ يشهد بما كان.

   📐 **ولماذا `update` مباشرٌ لا `save_passage`:** `save_passage` يكتب
      تاريخاً لأنّ مؤلّفاً غيّر محتوى. وهنا لم يتغيّر بايتٌ يسمعه الطالب
      — تغيّر عنوانُ البيت. **وتاريخٌ يُكتب لنقلٍ ضجيجٌ يُخفي التعديلاتِ
      الحقيقية.** ولا محفّزَ على الجداول الأربعة (قِيس)، ولا دالّةَ كاتبةَ
      تفحص شكلَ المفتاح (`save_item` · `save_passage` · `save_question`
      — قِيس) ⇒ **المحرّرُ يحفظ المفتاحَ الموسومَ كما هو.**

   📐 **والسؤالُ المُجاب لا يُمسّ محتواه:** السؤالان ٨٠ و٢٢٣ بلا
      إجاباتٍ أصلاً، وأسئلةُ النصّ ٣٠ لها خمسُ إجابات — **وما سمعه
      الطالبُ هو بعينه ما سيسمعه**، بالبايت.

   ⚠️ **والعددُ ثمانيةٌ محروسٌ:** إن وَسم الملفُّ غيرَ ثمانيةٍ (مفتاحٌ
      أُضيف منذ الجرد · أو نقص) تُردّ المعاملةُ كلُّها برسالةٍ تقول كم —
      **لا يُعتمد على الظنّ.** والجردُ يُعاد، والعددُ يُصحَّح بقصد.

   ⚙️ **قابلٌ لإعادة التشغيل:** الموسومُ لا يطابق الاسمَ الخام، فالمرّةُ
      الثانية تَسِم صفراً وتجد الثمانيةَ موسومةً سلفاً ⇒ تمرّ.
   ↩️ **والرجوعُ فوريّ:** ملفّاتُ Supabase باقيةٌ لم تُحذف، ونزعُ الوسم
      سطرٌ لكلّ عمود:  set url = substr(url, 4) where url like 'r2:audio/%'
   ═══════════════════════════════════════════════════════════════════ */

begin;

/* ───────────────────────── الوسم ───────────────────────── */

do $tag$
declare
  raw    text[] := array['audio/l1-a1.mp3',      'audio/q12-rriulq.mp3',
                         'audio/q13-dve7fv.mp3', 'audio/q14-xafza8.mp3',
                         'audio/q15-mhlqu2.mp3'];
  tagged text[] := array(select 'r2:' || k from unnest(raw) k);
  n_it int; n_ps int; n_qs int; n_cd int; n_was int;
begin
  /* ما وُسم في تشغيلٍ سابق — فإعادةُ التشغيل لا تُحسب نقصاً. */
  select (select count(*) from public.items     where url       = any(tagged))
       + (select count(*) from public.passages  where media_url = any(tagged))
       + (select count(*) from public.questions where audio_url = any(tagged))
       + (select count(*) from public.cards     where audio     = any(tagged))
    into n_was;

  update public.items     set url       = 'r2:' || url       where url       = any(raw);
  get diagnostics n_it = row_count;
  update public.passages  set media_url = 'r2:' || media_url where media_url = any(raw);
  get diagnostics n_ps = row_count;
  update public.questions set audio_url = 'r2:' || audio_url where audio_url = any(raw);
  get diagnostics n_qs = row_count;
  update public.cards     set audio     = 'r2:' || audio     where audio     = any(raw);
  get diagnostics n_cd = row_count;

  if n_it + n_ps + n_qs + n_cd + n_was <> 8 then
    raise exception '168 · وُسم % (مصادر % · نصوص % · أسئلة % · بطاقات %) وكان موسوماً % — والمقيسُ ثمانية. يُعاد الجردُ قبل التشغيل',
      n_it + n_ps + n_qs + n_cd, n_it, n_ps, n_qs, n_cd, n_was;
  end if;

  raise notice '168 · وُسم %: مصادر % · نصوص % · أسئلة % · بطاقات % — وكان موسوماً سلفاً %',
    n_it + n_ps + n_qs + n_cd, n_it, n_ps, n_qs, n_cd, n_was;
end $tag$;

/* ───────────────────────── السجلّ ───────────────────────── */

insert into public.sql_log (n, title, applied_at)
values ('168', 'الصوتُ يسكن R2 — وسمُ المفاتيح الثمانية بأسمائها', now())
on conflict (n) do update set applied_at = now();

commit;

/* ─────────── الفحص — جملةٌ واحدة، والمتوقَّعُ ثمانيةُ صفوف ─────────── */

select 'items' as الجدول, id as الصف, url as المفتاح
  from public.items     where url       like 'r2:%'
union all
select 'passages',  id, media_url from public.passages  where media_url like 'r2:%'
union all
select 'questions', id, audio_url from public.questions where audio_url like 'r2:%'
union all
select 'cards',     id, audio     from public.cards     where audio     like 'r2:%'
order by 1, 2;
