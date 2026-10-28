/* ══════════════════════════════════════════════════════════
   بيان — voice_rows.js  🔊  صوتُ النصّ: منطقُ اللوحة بلا واجهة (b203 · الخطوة ٦ من ستّ)

   ما تراه لوحةُ الصوت في المحرّر (`voice_panel.js`) لكلّ جملة، وما تطلبه من دالّة التوليد (`tts`) —
   بلا DOM ولا شبكة ولا استيراد، فيُقاس في node (`tools/voice_panel.test.mjs`).
   🔑 **الجملةُ تُعرف بنصّها بحرفه** كما يقسمها الكتاب (`textSentences` · book.js): صفُّ `voice_clips` يحفظها كذلك
      وبصمتُه منها (189 ①) — فجملةٌ تغيّرت بلا صوت، وصوتُ القديمة باقٍ في القاعدة لا يُسمع ولا يُعرض.
   🔑 **والمقترحُ والإمساكُ نسخةٌ من قاعدتَي الدالّة** (`recommend` · `held` · `VOICES` في
      `supabase/functions/tts/core.js`): اللوحةُ تُريهما قبل التوليد، والدالّةُ تحكم بهما عنده. ونسختان تفترقان يوماً
      بصمت ⇒ **القياسُ يقرأ الملفّين ويقارن، ولا يثق بهذا التعليق.**
   ══════════════════════════════════════════════════════════ */

/* لوحةُ الأصوات — مفاتيحُها مفاتيحُ الدالّة، واسمُ الصوت في القاعدة (`voice_clips.voice`) يبدأ بـ`label`.
   والمقترحُ حكمُ المالك بعد الجولة الرابعة (٢٨ أكتوبر): Iapetus على Chirp للسرد، وAlgenib على Gemini للحوار. */
/* والدورُ معرَّفاً («الراوي»): «راوٍ» نكرةً يُرسم تنوينُه في القائمة أو يسقط فتبقى «راو» — قِيس في المتصفّح.
   و«رجل» و«امرأة» لا «شخصيّة رجاليّة/نسائيّة»: «Gacrux · شخصيّة نسائيّة (مقترح)» يحتاج ٢٣٥ بكسلاً، فقُطع «(مقترح)» في سطرٍ عرضُه ٢٠٨ — قِيس.
   و`tone` أيأخذ الصوتُ نبرةً: أصواتُ Gemini تأخذ التوجيه، وChirp لا (`core.js`).
   والصوتان النسائيّان حكمُ المالك بأذنه (٢٨ أكتوبر · `tools/tts_audition.mjs`): «Gacrux والثاني Achernar». */
export const VOICES = Object.freeze({
  iapetus:  Object.freeze({ name: 'Iapetus', role: 'الراوي', tone: false, label: 'chirp-3-hd · ar-XA · Iapetus' }),
  charon:   Object.freeze({ name: 'Charon', role: 'الراوي', tone: true, label: 'gemini-2.5-flash-tts · ar-001 · Charon' }),
  algenib:  Object.freeze({ name: 'Algenib', role: 'رجل', tone: true, label: 'gemini-2.5-flash-tts · ar-001 · Algenib' }),
  gacrux:   Object.freeze({ name: 'Gacrux', role: 'امرأة', tone: true, label: 'gemini-2.5-flash-tts · ar-001 · Gacrux' }),
  achernar: Object.freeze({ name: 'Achernar', role: 'امرأة', tone: true, label: 'gemini-2.5-flash-tts · ar-001 · Achernar' })
});
export const NARRATOR = 'iapetus', CHARACTER = 'algenib', FEMALE = 'gacrux';

/* نبراتٌ جاهزةٌ يُختار منها بلمسة، والكتابةُ باقيةٌ لما سواها — حكمُ المالك بعد سماع النبرة: «النبرة معقولة، يمكن إضافة أكثر من نبرة:
   سعيدة، مثيرة، ضاحكة… إلخ». **وهي صفةُ النبرة لا القائل** («نبرةٌ حزينة»)، فتصلح للرجل والمرأة بلفظٍ واحد. وتُرسل كما تُرى (`tone`)،
   فلا معنى خفيٌّ وراء الكلمة. مرتّبةٌ أسراً: الحزنُ (وهو ما طلبه المالكُ أوّلَ مرّة) · الفرحُ · الدهشةُ والغضبُ والخوف · السخريةُ
   والحزم · اللينُ · الرجاء. و«متحمّسة» بجوار «مثيرة»: الأولى حماسةُ القائل، والثانية تشويقُ السامع — ولفظُ «مثيرة» يحتمل غيرَه،
   فالأذنُ تحكم بينهما (`tools/tts_audition.mjs`). */
export const TONES = Object.freeze(['حزينة', 'منكسرة باكية', 'سعيدة', 'ضاحكة', 'متحمّسة', 'مثيرة', 'متعجّبة', 'غاضبة', 'خائفة',
  'ساخرة', 'حازمة', 'هادئة', 'حانية', 'هامسة', 'متوسّلة']);

const isTitle = s => s.kind === 'cover' || s.kind === 'h';
/* الكلامُ المباشر: سطرٌ يبدأ بشرطة الحوار أو بعلامة تنصيص — والعنوانُ لا يكون حواراً */
export const isDialogue = text => /^\s*[-–—]\s*\S/.test(text) || /^\s*[«"“]/.test(text);

/* مَن قال سطرَ الحوار: آخرُ فعلِ قولٍ في الجملة قبله — مؤنّثٌ ⇒ الصوتُ النسائيّ (حكمُ المالك: «نعم تلقائياً»). والقاعدةُ وحجّتُها في `core.js`
   (`femaleLead`)، وهذه نسختُها تُقاس عليها */
const SAY_F = ['قالت', 'صاحت', 'صرخت', 'هتفت', 'همست', 'اجابت', 'ردت', 'سألت', 'نادت', 'تمتمت', 'تابعت', 'اضافت', 'استطردت', 'قائلة'];
const SAY_M = ['قال', 'صاح', 'صرخ', 'هتف', 'همس', 'اجاب', 'سأل', 'نادى', 'تمتم', 'تابع', 'اضاف', 'استطرد', 'قائلا'];
const SAY = new RegExp(`(?<!\\p{L})[فو]?(${[...SAY_F, ...SAY_M].join('|')})(?:ه|ها|هما|هم|هن|ني|نا|ك|كما|كم)?(?!\\p{L})`, 'gu');
const SAID_F = new Set(SAY_F);
export function femaleLead(lead){
  const bare = String(lead || '').replace(/[ً-ٰٟـ]/g, '').replace(/(?<!\p{L})([فو]?)[أإآ]/gu, '$1ا');
  let last = null;
  for(const m of bare.matchAll(SAY)) last = m[1];
  return last !== null && SAID_F.has(last);
}
export const recommend = s => !isTitle(s) && isDialogue(s.text) ? (femaleLead(s.lead) ? FEMALE : CHARACTER) : NARRATOR;

/* 🆕 b207 · الجملةُ المقتبِسة آيةً تُقرأ أجزاءً: النثرُ وحده بصوته، والآيةُ بقوسيها وحدها تتلوها الدالّةُ من المصحف (`findQuote` في `core.js`)
   — على ترتيبها. والترقيمُ في صدر نثرٍ بعد آيةٍ يُنزع (الفاصلةُ بعدها)، وما لا حرفَ فيه يسقط (النقطةُ بعد آخر آية)، وصدرُ الجملة كما هو
   (شرطةُ الحوار). ⇒ null حين لا قوسَ فيها أو لا يتقابل قوساها · وإلّا [{ text, quote }]. **والكتابُ يجمع أصوات الأجزاء بها نفسِها**
   (`proseSeq` · media.js) — فما تولّده اللوحةُ جزءاً يجده الكتابُ بنصّه. */
export function quoteParts(text){
  const t = String(text ?? '');
  if(!/[﴿﴾]/.test(t) || !/^[^﴿﴾]*(?:﴿[^﴿﴾]+﴾[^﴿﴾]*)*$/.test(t)) return null;
  const out = [];
  t.split(/(﴿[^﴿﴾]+﴾)/).forEach((x, k) => {
    x = x.trim();
    if(x.startsWith('﴿')){ out.push({ text: x, quote: true }); return; }
    if(k > 0) x = x.replace(/^[\s،؛,.:!؟…\-–—]+/, '').trim();
    if(/\p{L}/u.test(x)) out.push({ text: x, quote: false });
  });
  return out;
}
/* وقوسان لا يتقابلان يُمسكان الجملةَ حتى يُصلَح النصّ — والسببُ بحرف الدالّة (`QUOTE_UNPAIRED`) */
export const HELD = 'قوسا الآية «﴿ ﴾» غير متقابلين، فتبقى بلا صوت حتى يُصلَح النص';
export const held = s => /[﴿﴾]/.test(String(s.text)) && !quoteParts(s.text);

/* مرجعُ الآية المقصوصة من اسم صوتها في القاعدة (`quoteLabel` في الدالّة): «الحصري · Husary_64kbps · 3:110 · كاملة» ⇒
   [{ s, a, whole, widened, from, to }] — الكلماتُ من الواحد · أو null لصوتٍ غيرِها (جزءٌ بقوسين ليس آيةً قرأه الصوتُ المولَّد) */
export const QUOTE_VOICE = 'الحصري · Husary_64kbps';
export function quoteRef(label){
  const t = String(label ?? '');
  if(!t.startsWith(QUOTE_VOICE + ' · ')) return null;
  const refs = t.slice(QUOTE_VOICE.length + 3).split(' + ').map(x => {
    const m = x.match(/^(\d+):(\d+) · (?:(كاملة للوصل)|(كاملة)|(\d+)-(\d+))$/);
    return m && { s: +m[1], a: +m[2], whole: !m[5], widened: !!m[3], from: m[5] ? +m[5] : null, to: m[6] ? +m[6] : null };
  });
  return refs.every(Boolean) ? refs : null;
}

/* وصوتُ جملة النثر في الكتاب: ملفُّها، أو أجزاؤها على ترتيبها إن اقتبست آية — ولا يُسمع منها شيءٌ ما لم تُعتمد أجزاؤها كلُّها، فجملةٌ نصفُها
   مسموعٌ أسوأُ من صامتة. `made`: الجملةُ بنصّها ⇒ { audio, ms } (المعتمدُ وحده · `approvedVoices`) ⇒ { keys, ms } أو null — و`ms` مجموعُ
   الأطوال المحفوظة: به تُقلَب صفحةُ الجملة المقسومة عند موضع قسمتها (b206) */
export function proseSeq(made, s){
  if(!s || s.q || !s.text) return null;
  const parts = /[﴿﴾]/.test(s.text) ? quoteParts(s.text) : [{ text: s.text }];
  const clips = parts && parts.map(p => made.get(p.text));
  if(!clips || clips.some(c => !c?.audio)) return null;
  return { keys: clips.map(c => c.audio), ms: clips.reduce((n, c) => n + (Number(c.ms) || 0), 0) };
}

/* أيُّ صوتٍ من اللوحة ولّد هذا الصفّ: اسمُه في القاعدة اسمُ صوته ومعه مصدرُ التشكيل (`voiceLabel` في الدالّة) */
export const voiceOf = label => Object.keys(VOICES).find(id => String(label || '').startsWith(VOICES[id].label)) || null;

/* سطورُ اللوحة: جملُ النصّ إلا الآيات (تُتلى بصوت الحصري · 189 ④)، ولكلٍّ صوتُها إن كان ⇒
   [{ i, text, kind, lead, talk, clip, state, recommended, voice }] — و`i` موضعُها في جمل النصّ (للسياق) · `lead` الجملةُ قبلها
   (بها يُعرف قائلُ الحوار ونبرتُه) · `talk` سطرُ حوار · state: 'none' بلا صوت · 'made' وُلّد ولم يُعتمد · 'ok' معتمد · 'held' ممسَكة ·
   voice: صوتُ صفّها أو المقترح. والجملةُ المكرَّرة سطرٌ في كلّ موضعٍ لها، وصوتُها واحد (البصمةُ من النصّ) */
/* 🆕 b207 · والجملةُ المقتبِسة سطورٌ بأجزائها (`part`: { k, n, of, quote }): النثرُ بصوته واختياره، والآيةُ بلا صوتٍ يُختار (`voice: null` —
   تتلوها الدالّةُ من المصحف). والجزءُ بعد آيةٍ ليس صدرَ حوار ولا يعرف الجملةَ قبله، ومقترحُه مقترحُ جملته — فيُرسل صوتُه صريحاً إن خالف ما
   تقترحه الدالّةُ لنصّه وحده (`voiceBatches`) */
export function voiceRows(sents, clips){
  const by = new Map((clips || []).map(c => [c.sentence, c]));
  const rows = [];
  (sents || []).forEach((s, i) => {
    if(s.kind === 'q') return;
    const lead = i > 0 ? sents[i - 1].text : null;
    const recommended = recommend({ ...s, lead });
    const row = text => {
      const clip = by.get(text) || null;
      return { i, text, kind: s.kind, lead, talk: !isTitle(s) && isDialogue(s.text), clip, recommended,
               state: !clip ? 'none' : clip.approved_at ? 'ok' : 'made', voice: (clip && voiceOf(clip.voice)) || recommended };
    };
    const parts = quoteParts(s.text);
    if(!parts){ rows.push(held(s) ? { ...row(s.text), state: 'held' } : row(s.text)); return; }
    parts.forEach((p, k) => {
      const part = { k, n: parts.length, of: s.text, quote: p.quote };
      rows.push(p.quote ? { ...row(p.text), lead: null, talk: false, recommended: null, voice: null, part }
                        : { ...row(p.text), ...(k ? { lead: null, talk: false } : {}), part });
    });
  });
  return rows;
}

export const tally = rows => rows.reduce((t, r) => (t[r.state]++, t), { none: 0, made: 0, ok: 0, held: 0 });

/* دفعاتُ التوليد: خمسُ جملٍ على الأكثر (حدُّ الدالّة)، والمكرَّرةُ مرّةً، والممسَكةُ لا تُرسل. ولكلّ دفعةٍ سياقُها —
   الجملتان قبل أوّل جملها في النصّ — يُقرأ للتشكيل وحده ولا يُشكَّل (`context` في الدالّة).
   `voice` و`spoken` و`tone` بنصّ الجملة: ما اختاره المؤلّف — والصوتُ يُرسل حين يخالف المقترحَ وحده، فيبقى المقترحُ حكمَ الدالّة.
   وسطرُ الحوار يحمل الجملةَ قبله (`lead`): بها تعرف الدالّةُ قائلَه ونبرتَه كما عرفتهما اللوحة.
   ⇒ [{ sentences: [{ text, kind, voice?, spoken?, lead?, tone? }], context }] */
export const BATCH = 5;
export function voiceBatches(sents, rows, { voice = {}, spoken = {}, tone = {} } = {}){
  const seen = new Set(), out = [];
  for(const r of rows){
    if(r.state === 'held' || seen.has(r.text)) continue;
    seen.add(r.text);
    let b = out[out.length - 1];
    if(!b || b.sentences.length === BATCH){
      b = { sentences: [], context: (sents || []).slice(Math.max(0, r.i - 2), r.i).map(s => s.text).join(' ') };
      out.push(b);
    }
    const one = { text: r.text, kind: r.kind };
    /* والآيةُ المقتبسة بنصّها وحده: لا صوتَ ولا نطقَ ولا نبرة — تعرفها الدالّةُ وتتلوها */
    if(!r.part?.quote){
      if(r.talk && r.lead) one.lead = r.lead;
      if(voice[r.text] && voice[r.text] !== recommend(one)) one.voice = voice[r.text];
      if(spoken[r.text]) one.spoken = spoken[r.text];
      if(tone[r.text]) one.tone = tone[r.text];
    }
    b.sentences.push(one);
  }
  return out;
}
