/* ══════════════════════════════════════════════════════════
   بيان — reading-analyze · core.js  (176 · تجربة)
   المنطقُ النقيّ لتحليل القراءة الجهريّة: لا Deno ولا شبكة ولا سرّ.
   فيُقاس في node كما يُشحن (`node tools/reading_analyze.test.mjs`).

   🎯 لماذا مرّتان لا مرّة؟ — النموذجُ الذي يرى نصَّ الدرس وهو يسمع يميل
      إلى أن «يسمع» النصَّ لا الطالب: يُصلح الكلمةَ المحذوفة ويُكمل الناقصة.
      ⇒ **المرّة الأولى يكتب ما سمعه حرفيّاً ولا يرى النصّ** · ثمّ تُقارَن
      كتابتُه بالنصّ **هنا، بشيفرةٍ لا بنموذج** (حذف · إبدال · زيادة) · ثمّ
      **المرّة الثانية** يسمع ثانيةً ومعه النصُّ والمقارنة، فيؤكّد أو ينفي،
      ويضيف ما سمعه من نطقٍ وإعراب — **وما لم يتيقّنه لا يذكره.**
   ══════════════════════════════════════════════════════════ */

/* ═══════════ تطبيعُ الكلمة ═══════════ */

const AR_DIAC = /[ً-ْٰـ]/g;          // الحركات والتنوين والشدّة والسكون + ألفٌ خنجريّة + تطويل
const PUNCT   = /[.,!?;:"“”«»()\[\]{}…،؛؟\-–—_*\/\\]/g;

/** الكلمةُ للمطابقة: بلا ترقيم ولا حركات، والهمزاتُ ألفاً، والحروفُ صغيرة */
export function base(w, lang){
  let s = String(w || '').replace(PUNCT, '').trim();
  if(lang === 'ar'){
    s = s.replace(AR_DIAC, '')
         .replace(/[أإآٱ]/g, 'ا')
         .replace(/ى/g, 'ي');
  } else {
    s = s.toLowerCase().replace(/[’‘`]/g, "'");
  }
  return s;
}

/** حركةُ آخر الكلمة (للإعراب) — أو '' إن لم تُكتب */
export function ending(w){
  /* تنوينُ الفتح يُكتب قبل الألف الأخيرة («مبكّرًا») — فالألفُ تُنحّى ليُقرأ */
  const s = String(w || '').replace(PUNCT, '').trim().replace(/(ً)[اى]$/, '$1');
  const m = s.match(/([ً-ْ]+)$/);
  if(!m) return '';
  return m[1].replace(/ّ/g, '');      // الشدّة ليست إعراباً
}

/* ═══════════ النصُّ كما يُقرأ لا كما يُكتب ═══════════
   جسمُ النصّ في القاعدة فيه وسومٌ يرسمها القارئ ولا ينطقها الطالب. ولو
   دخلت المقارنةَ لعُدّت كلماتُها «محذوفة» ظلماً — وصورةٌ واحدةٌ بتعليقها
   تُسقط الدقّةَ عشرَ نقاط. ⇒ تُنزع هنا بالقواعد نفسِها التي في `js/book.js`:
   ① سطرُ الصورة والفيديو (FIG · b165 · b170) ② رقمُ الفقرة الذي كتبه المؤلّف
   «(١)» — ينتقل إلى الهامش ③ علاماتُ التنسيق ** __ _ ④ أقواسُ الرياضيات \( \).
   📌 والعنوانُ يبقى: قد يقرؤه الطالب، والزيادةُ في أوّل القراءة تُعدّ زيادةً لا خطأ. */
const FIG = /^\[\s*(صورة|image|فيديو|video)\s*[:：]\s*([^|\]\n]+?)\s*(?:\|\s*([^\]\n]*?))?\s*\]$/i;
const OWN_NUM = /^\s*[(（]\s*[0-9٠-٩]+\s*[)）]\s*/;

export function readable(body){
  return String(body || '').replace(/\r\n?/g, '\n')
    .split('\n').filter(l => !FIG.test(l.trim())).join('\n')
    .split(/\n[ \t]*\n+/).map(p => p.trim().replace(OWN_NUM, '')).filter(Boolean).join('\n\n')
    .replace(/\*\*|__|_/g, '')                 // كما يفعل `plainText` في القارئ: «و_جميل_» عربيّةٌ لا حدَّ قبلها
    .replace(/\\[()[\]]/g, ' ')
    .replace(/[ \t]+/g, ' ')
    .trim();
}

export function words(text, lang){
  return String(text || '').split(/\s+/).map(raw => ({ raw, b: base(raw, lang) })).filter(t => t.b);
}

/* ═══════════ المقارنة: كتابةُ الطالب مقابل نصّ الدرس ═══════════
   مسافةُ تحريرٍ على مستوى الكلمة (Levenshtein) ثمّ تتبُّعٌ عكسيّ.
   ⇒ لكلّ كلمةٍ في النصّ: صحيحة · مُبدَلة · محذوفة، وما زاده الطالب: زيادة.
   🔑 والإعرابُ يُقارَن حيث كُتبت حركةُ الآخر في **الطرفين** — نصٌّ غيرُ مشكول
      لا يُحكم منه على إعراب، وهذا يُقال صراحةً (`ending_checked`). */
export function align(refText, hypText, lang){
  const R = words(refText, lang), H = words(hypText, lang);
  const n = R.length, m = H.length;
  const D = Array.from({ length: n + 1 }, () => new Uint16Array(m + 1));
  for(let i = 0; i <= n; i++) D[i][0] = i;
  for(let j = 0; j <= m; j++) D[0][j] = j;
  for(let i = 1; i <= n; i++){
    for(let j = 1; j <= m; j++){
      const same = R[i - 1].b === H[j - 1].b ? 0 : 1;
      D[i][j] = Math.min(D[i - 1][j] + 1, D[i][j - 1] + 1, D[i - 1][j - 1] + same);
    }
  }
  const ops = [];
  let i = n, j = m;
  while(i > 0 || j > 0){
    if(i > 0 && j > 0 && D[i][j] === D[i - 1][j - 1] + (R[i - 1].b === H[j - 1].b ? 0 : 1)){
      ops.push({ op: R[i - 1].b === H[j - 1].b ? 'ok' : 'sub', ref: R[i - 1].raw, hyp: H[j - 1].raw, at: i - 1 });
      i--; j--;
    } else if(i > 0 && D[i][j] === D[i - 1][j] + 1){
      ops.push({ op: 'del', ref: R[i - 1].raw, at: i - 1 }); i--;
    } else {
      ops.push({ op: 'ins', hyp: H[j - 1].raw, at: i }); j--;
    }
  }
  ops.reverse();

  let endingChecked = 0;
  const endings = [];
  if(lang === 'ar'){
    for(const o of ops){
      if(o.op !== 'ok') continue;
      const er = ending(o.ref), eh = ending(o.hyp);
      if(er && eh){
        endingChecked++;
        if(er !== eh) endings.push({ ref: o.ref, hyp: o.hyp, at: o.at });
      }
    }
  }

  const count = k => ops.filter(o => o.op === k).length;
  const ok = count('ok');
  return {
    ref_words: n, heard_words: m,
    correct: ok, substituted: count('sub'), omitted: count('del'), inserted: count('ins'),
    accuracy: n ? Math.round((ok / n) * 1000) / 10 : 0,
    ending_checked: endingChecked, ending_mismatch: endings,
    issues: ops.filter(o => o.op !== 'ok')
  };
}

/** خلاصةُ المقارنة للنموذج في المرّة الثانية — قصيرةٌ ومحدودة (لا نُغرقه بنصٍّ طويل) */
export function alignmentBrief(a, max = 40){
  const lines = a.issues.slice(0, max).map(o =>
    o.op === 'sub' ? `- replaced: expected «${o.ref}» heard «${o.hyp}»`
  : o.op === 'del' ? `- omitted: «${o.ref}»`
  :                  `- inserted: «${o.hyp}»`);
  for(const e of a.ending_mismatch.slice(0, 20)) lines.push(`- ending differs: expected «${e.ref}» heard «${e.hyp}»`);
  return `words in text: ${a.ref_words} · read correctly: ${a.correct} · replaced: ${a.substituted} · omitted: ${a.omitted} · inserted: ${a.inserted}\n`
       + (lines.length ? lines.join('\n') : '- no word-level differences found');
}

/* ═══════════ التعليمات للنموذج ═══════════ */

export function transcribePrompt(lang){
  const common = 'You are a careful transcriber of a learner reading a text aloud. '
    + 'Write EXACTLY what the speaker says, word by word, including mistakes, skipped words, repeated words, '
    + 'false starts and mispronounced words as they sound. Do NOT correct anything, do NOT complete missing words, '
    + 'do NOT guess the intended text. If a part is unclear write [unclear]. ';
  const ar = 'The speech is Arabic (Modern Standard Arabic). Write the Arabic WITH full diacritics (tashkeel) exactly as '
    + 'pronounced, especially the vowel on the LAST letter of every word (case endings). ';
  const en = 'The speech is English. Use normal spelling for correctly pronounced words. ';
  return common + (lang === 'ar' ? ar : en)
    + 'Return JSON only: {"transcript": "<the words>", "clear": true|false}';
}

export function feedbackPrompt(lang, reference, transcript, brief){
  const langNote = lang === 'ar'
    ? 'The text is Arabic. Check pronunciation of letters (makharij), and case endings (i\'rab) on word endings. '
    : 'The text is English. Check pronunciation of sounds (e.g. th, v/w, vowel length), word stress, and fluency. ';
  return 'You are an experienced reading teacher. A learner read the TEXT aloud; the audio is attached. '
    + 'A first listening produced the TRANSCRIPT, and a program compared it with the TEXT (COMPARISON). '
    + langNote
    + 'Listen to the audio again. For each difference in COMPARISON, confirm it only if you clearly hear it. '
    + 'Add other pronunciation problems ONLY if you are sure; when unsure, leave it out — a wrong correction harms the learner more than a missed one. '
    + 'Be specific (the word, what was heard, what is expected). '
    + 'Write "summary_ar" in simple Arabic (max 3 short sentences) for the teacher, and "student_note" in simple '
    + (lang === 'ar' ? 'Arabic' : 'English')
    + ' addressed to the learner: one strength, then at most 3 things to practise.\n'
    + `TEXT:\n${reference}\n\nTRANSCRIPT:\n${transcript}\n\nCOMPARISON:\n${brief}\n\n`
    + 'Return JSON only: {"confirmed":[{"word":"","heard":"","expected":"","type":"omission|substitution|insertion|pronunciation|ending|fluency","note":""}],'
    + '"strengths":[""],"fluency":"smooth|some hesitation|slow","summary_ar":"","student_note":"","confidence":"high|medium|low"}';
}

/* ═══════════ قراءةُ ردّ Gemini ═══════════ */

/** النصُّ من أوّل مرشّح، ثمّ JSON — ويحتمل سياجَ ```json الذي تضعه النماذج أحياناً */
export function parseGemini(resp){
  const parts = resp?.candidates?.[0]?.content?.parts || [];
  const text = parts.map(p => p.text || '').join('').trim();
  if(!text) return { error: resp?.promptFeedback?.blockReason ? 'blocked: ' + resp.promptFeedback.blockReason : 'empty response' };
  const clean = text.replace(/^```(?:json)?\s*/i, '').replace(/\s*```$/, '');
  try { return { data: JSON.parse(clean) }; }
  catch(e){ return { error: 'not json', raw: text.slice(0, 500) }; }
}

/** نوعُ الملفّ من لاحقته — لما يقبله Gemini */
export function mimeOf(path){
  const ext = String(path || '').split('.').pop().toLowerCase();
  return ({ webm: 'audio/webm', ogg: 'audio/ogg', m4a: 'audio/mp4', mp4: 'audio/mp4', mp3: 'audio/mp3',
            wav: 'audio/wav', aac: 'audio/aac', flac: 'audio/flac' })[ext] || null;
}
