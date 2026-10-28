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
   و`tone` أيأخذ الصوتُ نبرةً: أصواتُ Gemini تأخذ التوجيه، وChirp لا (`core.js`).
   والصوتان النسائيّان حكمُ المالك بأذنه (٢٨ أكتوبر · `tools/tts_audition.mjs`): «Gacrux والثاني Achernar». */
export const VOICES = Object.freeze({
  iapetus:  Object.freeze({ name: 'Iapetus', role: 'الراوي', tone: false, label: 'chirp-3-hd · ar-XA · Iapetus' }),
  charon:   Object.freeze({ name: 'Charon', role: 'الراوي', tone: true, label: 'gemini-2.5-flash-tts · ar-001 · Charon' }),
  algenib:  Object.freeze({ name: 'Algenib', role: 'شخصيّة رجاليّة', tone: true, label: 'gemini-2.5-flash-tts · ar-001 · Algenib' }),
  gacrux:   Object.freeze({ name: 'Gacrux', role: 'شخصيّة نسائيّة', tone: true, label: 'gemini-2.5-flash-tts · ar-001 · Gacrux' }),
  achernar: Object.freeze({ name: 'Achernar', role: 'شخصيّة نسائيّة', tone: true, label: 'gemini-2.5-flash-tts · ar-001 · Achernar' })
});
export const NARRATOR = 'iapetus', CHARACTER = 'algenib', FEMALE = 'gacrux';

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

/* ما فيه «﴿» تُمسكه الدالّةُ بلا صوت حتى تُبنى تلاوةُ الآيات المقتبسة — والسببُ بحرف الدالّة (`QUOTE_HELD`) */
export const HELD = 'فيها نص بين «﴿ ﴾»، فتبقى بلا صوت حتى تُبنى تلاوة الآيات المقتبسة';
export const held = s => String(s.text).includes('﴿');

/* أيُّ صوتٍ من اللوحة ولّد هذا الصفّ: اسمُه في القاعدة اسمُ صوته ومعه مصدرُ التشكيل (`voiceLabel` في الدالّة) */
export const voiceOf = label => Object.keys(VOICES).find(id => String(label || '').startsWith(VOICES[id].label)) || null;

/* سطورُ اللوحة: جملُ النصّ إلا الآيات (تُتلى بصوت الحصري · 189 ④)، ولكلٍّ صوتُها إن كان ⇒
   [{ i, text, kind, lead, talk, clip, state, recommended, voice }] — و`i` موضعُها في جمل النصّ (للسياق) · `lead` الجملةُ قبلها
   (بها يُعرف قائلُ الحوار ونبرتُه) · `talk` سطرُ حوار · state: 'none' بلا صوت · 'made' وُلّد ولم يُعتمد · 'ok' معتمد · 'held' ممسَكة ·
   voice: صوتُ صفّها أو المقترح. والجملةُ المكرَّرة سطرٌ في كلّ موضعٍ لها، وصوتُها واحد (البصمةُ من النصّ) */
export function voiceRows(sents, clips){
  const by = new Map((clips || []).map(c => [c.sentence, c]));
  const rows = [];
  (sents || []).forEach((s, i) => {
    if(s.kind === 'q') return;
    const clip = by.get(s.text) || null;
    const lead = i > 0 ? sents[i - 1].text : null;
    const recommended = recommend({ ...s, lead });
    const state = held(s) ? 'held' : !clip ? 'none' : clip.approved_at ? 'ok' : 'made';
    rows.push({ i, text: s.text, kind: s.kind, lead, talk: !isTitle(s) && isDialogue(s.text), clip, state, recommended,
                voice: (clip && voiceOf(clip.voice)) || recommended });
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
    if(voice[r.text] && voice[r.text] !== r.recommended) one.voice = voice[r.text];
    if(spoken[r.text]) one.spoken = spoken[r.text];
    if(r.talk && r.lead) one.lead = r.lead;
    if(tone[r.text]) one.tone = tone[r.text];
    b.sentences.push(one);
  }
  return out;
}
