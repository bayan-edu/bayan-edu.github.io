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
/* والدورُ معرَّفاً («الراوي»): «راوٍ» نكرةً يُرسم تنوينُه في القائمة أو يسقط فتبقى «راو» — قِيس في المتصفّح */
export const VOICES = Object.freeze({
  iapetus: Object.freeze({ name: 'Iapetus', role: 'الراوي', label: 'chirp-3-hd · ar-XA · Iapetus' }),
  charon:  Object.freeze({ name: 'Charon', role: 'الراوي', label: 'gemini-2.5-flash-tts · ar-001 · Charon' }),
  algenib: Object.freeze({ name: 'Algenib', role: 'الشخصيّة', label: 'gemini-2.5-flash-tts · ar-001 · Algenib' })
});
export const NARRATOR = 'iapetus', CHARACTER = 'algenib';

const isTitle = s => s.kind === 'cover' || s.kind === 'h';
/* الكلامُ المباشر: سطرٌ يبدأ بشرطة الحوار أو بعلامة تنصيص — والعنوانُ لا يكون حواراً */
export const isDialogue = text => /^\s*[-–—]\s*\S/.test(text) || /^\s*[«"“]/.test(text);
export const recommend = s => !isTitle(s) && isDialogue(s.text) ? CHARACTER : NARRATOR;

/* ما فيه «﴿» تُمسكه الدالّةُ بلا صوت حتى تُبنى تلاوةُ الآيات المقتبسة — والسببُ بحرف الدالّة (`QUOTE_HELD`) */
export const HELD = 'فيها نص بين «﴿ ﴾»، فتبقى بلا صوت حتى تُبنى تلاوة الآيات المقتبسة';
export const held = s => String(s.text).includes('﴿');

/* أيُّ صوتٍ من اللوحة ولّد هذا الصفّ: اسمُه في القاعدة اسمُ صوته ومعه مصدرُ التشكيل (`voiceLabel` في الدالّة) */
export const voiceOf = label => Object.keys(VOICES).find(id => String(label || '').startsWith(VOICES[id].label)) || null;

/* سطورُ اللوحة: جملُ النصّ إلا الآيات (تُتلى بصوت الحصري · 189 ④)، ولكلٍّ صوتُها إن كان ⇒
   [{ i, text, kind, clip, state, recommended, voice }] — و`i` موضعُها في جمل النصّ (للسياق) ·
   state: 'none' بلا صوت · 'made' وُلّد ولم يُعتمد · 'ok' معتمد · 'held' ممسَكة · voice: صوتُ صفّها أو المقترح.
   والجملةُ المكرَّرة سطرٌ في كلّ موضعٍ لها، وصوتُها واحد (البصمةُ من النصّ) */
export function voiceRows(sents, clips){
  const by = new Map((clips || []).map(c => [c.sentence, c]));
  const rows = [];
  (sents || []).forEach((s, i) => {
    if(s.kind === 'q') return;
    const clip = by.get(s.text) || null;
    const recommended = recommend(s);
    const state = held(s) ? 'held' : !clip ? 'none' : clip.approved_at ? 'ok' : 'made';
    rows.push({ i, text: s.text, kind: s.kind, clip, state, recommended, voice: (clip && voiceOf(clip.voice)) || recommended });
  });
  return rows;
}

export const tally = rows => rows.reduce((t, r) => (t[r.state]++, t), { none: 0, made: 0, ok: 0, held: 0 });

/* دفعاتُ التوليد: خمسُ جملٍ على الأكثر (حدُّ الدالّة)، والمكرَّرةُ مرّةً، والممسَكةُ لا تُرسل. ولكلّ دفعةٍ سياقُها —
   الجملتان قبل أوّل جملها في النصّ — يُقرأ للتشكيل وحده ولا يُشكَّل (`context` في الدالّة).
   `voice` و`spoken` بنصّ الجملة: ما اختاره المؤلّف — والصوتُ يُرسل حين يخالف المقترحَ وحده، فيبقى المقترحُ حكمَ الدالّة.
   ⇒ [{ sentences: [{ text, kind, voice?, spoken? }], context }] */
export const BATCH = 5;
export function voiceBatches(sents, rows, { voice = {}, spoken = {} } = {}){
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
    b.sentences.push(one);
  }
  return out;
}
