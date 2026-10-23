/* ══════════════════════════════════════════════════════════
   بيان — reading-analyze · core.js  (176 · تجربة)
   المنطقُ النقيّ لتحليل القراءة الجهريّة: لا Deno ولا شبكة ولا سرّ.
   فيُقاس في node كما يُشحن (`node tools/reading_analyze.test.mjs`).

   🎯 الطريقُ: Whisper يكتب ما سمعه ⇐ **والمقارنةُ بنصّ الدرس هنا، بشيفرةٍ
      لا بنموذج** (حذف · إبدال · زيادة · والإعرابُ حيث شُكل الطرفان) ⇐ والسرعةُ
      والوقفاتُ من توقيت Whisper نفسِه. **لا نموذجَ يكتب حكماً** — المقارنةُ هي
      الملاحظة، دقيقةٌ ولا تخترع.
   🔴 وWhisper يخترع جملاً كاملةً في صمت الختام، وبغير ما اخترعه في المرّة السابقة
      (قِيس ٢٢ أكتوبر · ومرشّحُ الصوت `vad_filter` يُضاعفه ٣٦ كلمة ⇒ مردود). ⇒ ما بعد
      آخر كلمةٍ في النصّ يُحفظ «بعد النصّ» ولا يُعدّ على الطالب.
   ⛔ وكان التصميمُ الأوّل Gemini على مرّتين — وأُسقط ٢٢ أكتوبر: شروطُ Google
      (Gemini API وVertex AI) تمنع خدمةً «likely to be accessed by individuals
      under the age of 18». التفصيلُ في STATE.md عند `176`.
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
   ⇒ وما قبل النصّ وما بعده (`before_text` · `after_text`) يُحفظ ولا يُعدّ.
   ⇒ وللحذف والزيادة `next`: الكلمةُ التي تليهما في النصّ — فـ«is» و«a» تتكرّران في كلّ نصّ،
      والمعلّمُ يحتاج أن يعرف **أين** سقطت أو زيدت (b174).
   🔑 والإعرابُ يُقارَن حيث كُتبت حركةُ الآخر في **الطرفين** — نصٌّ غيرُ مشكول
      لا يُحكم منه على إعراب، وهذا يُقال صراحةً (`ending_checked`). */
/* 🔑 كلفةُ الإبدال (٣) أكبرُ من كلفة الحذف أو الزيادة (٢) وأقلُّ من مجموعهما (٤):
      فكلمةٌ واحدةٌ مكانَ أخرى إبدالٌ (learn بدل learning)، أمّا كلمةٌ سقطت وأخرى زيدت
      بعدها فحذفٌ وزيادة — لا إبدالان متتاليان يُخفيان أنّ الطالب قرأ «three» في موضعها.
      وكانت الكلفُ متساويةً (١) فاختارت المحاذاةُ الإبدالَين عند التساوي (قِيس ٢٣ أكتوبر). */
const INDEL = 2, SUB = 3;
export function align(refText, hypText, lang){
  const R = words(refText, lang), H = words(hypText, lang);
  const n = R.length, m = H.length;
  const D = Array.from({ length: n + 1 }, () => new Uint16Array(m + 1));
  for(let i = 0; i <= n; i++) D[i][0] = i * INDEL;
  for(let j = 0; j <= m; j++) D[0][j] = j * INDEL;
  const cost = (i, j) => R[i - 1].b === H[j - 1].b ? 0 : SUB;
  for(let i = 1; i <= n; i++){
    for(let j = 1; j <= m; j++){
      D[i][j] = Math.min(D[i - 1][j] + INDEL, D[i][j - 1] + INDEL, D[i - 1][j - 1] + cost(i, j));
    }
  }
  const ops = [];
  let i = n, j = m;
  while(i > 0 || j > 0){
    /* 🔑 بعد آخر كلمةٍ في النصّ: الزيادةُ أولى عند التساوي — فما يخترعه Whisper في صمت
       الختام يبقى «بعد النصّ» ولا يبتلع آخرَ كلمةٍ قالها الطالب (قِيس: «goods» ⇐ «Thanks») */
    if(i === n && j > 0 && D[i][j] === D[i][j - 1] + INDEL){
      ops.push({ op: 'ins', hyp: H[j - 1].raw, at: i, next: null }); j--; continue;
    }
    if(i > 0 && j > 0 && D[i][j] === D[i - 1][j - 1] + cost(i, j)){
      ops.push({ op: R[i - 1].b === H[j - 1].b ? 'ok' : 'sub', ref: R[i - 1].raw, hyp: H[j - 1].raw, at: i - 1 });
      i--; j--;
    } else if(i > 0 && D[i][j] === D[i - 1][j] + INDEL){
      ops.push({ op: 'del', ref: R[i - 1].raw, at: i - 1, next: i < n ? R[i].raw : null }); i--;
    } else {
      ops.push({ op: 'ins', hyp: H[j - 1].raw, at: i, next: i < n ? R[i].raw : null }); j--;
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

  /* ما قبل أوّل كلمةٍ وما بعد آخرها ليس من القراءة: عنوانٌ قرأه الطالب، أو ما ملأ به
     Whisper الصمت. يُحفظ ويُعرض **ولا يُعدّ خطأً** — والزيادةُ داخل النصّ وحدها زيادة. */
  const edge = o => o.op === 'ins' && (o.at === 0 || o.at === n);
  const before_text = ops.filter(o => o.op === 'ins' && o.at === 0).map(o => o.hyp);
  const after_text  = n ? ops.filter(o => o.op === 'ins' && o.at === n).map(o => o.hyp) : [];
  const inner = ops.filter(o => !edge(o));
  const count = k => inner.filter(o => o.op === k).length;
  const ok = count('ok');
  return {
    ref_words: n, heard_words: m,
    correct: ok, substituted: count('sub'), omitted: count('del'), inserted: count('ins'),
    accuracy: n ? Math.round((ok / n) * 1000) / 10 : 0,
    ending_checked: endingChecked, ending_mismatch: endings,
    before_text, after_text,
    issues: inner.filter(o => o.op !== 'ok')
  };
}

/** خلاصةُ المقارنة سطوراً — قصيرةٌ ومحدودة: تُقرأ في السجلّ، وتصلح مدخلاً لحكم التحدّث لاحقاً */
export function alignmentBrief(a, max = 40){
  const lines = a.issues.slice(0, max).map(o =>
    o.op === 'sub' ? `- replaced: expected «${o.ref}» heard «${o.hyp}»`
  : o.op === 'del' ? `- omitted: «${o.ref}»`
  :                  `- inserted: «${o.hyp}»`);
  for(const e of a.ending_mismatch.slice(0, 20)) lines.push(`- ending differs: expected «${e.ref}» heard «${e.hyp}»`);
  if(a.after_text?.length) lines.push(`- after the text (not counted): ${a.after_text.length} words`);
  return `words in text: ${a.ref_words} · read correctly: ${a.correct} · replaced: ${a.substituted} · omitted: ${a.omitted} · inserted: ${a.inserted}\n`
       + (lines.length ? lines.join('\n') : '- no word-level differences found');
}

/* ═══════════ ما يقوله توقيتُ Whisper عن الطلاقة ═══════════
   السرعةُ (كلمةٌ في الدقيقة) والوقفاتُ الطويلة (ثانيةٌ فأكثر بين كلمتين) — **محسوبةً على
   كلمات القراءة وحدها:** تُسقط `skip.start` كلمةً من أوّل التوقيت و`skip.end` من آخره
   (ما قبل النصّ وما بعده في المقارنة)، والمدّةُ من أوّل كلمةٍ مقروءة إلى آخرها — فلا يُحسب
   صمتُ البدء والختام ولا ما اخترعه Whisper فيه. وبلا توقيتٍ للكلمات ⇒ مدّةُ الملفّ كلُّه.
   وما غاب يُقال `null` لا صفراً — فالصفرُ حكمٌ والغيابُ جهل. */
const r1 = x => Math.round(x * 10) / 10;
export function asrInfo(res, lang = 'en', skip = { start: 0, end: 0 }){
  const segs = Array.isArray(res?.segments) ? res.segments : [];
  const all = segs.flatMap(sg => Array.isArray(sg?.words) ? sg.words : [])
                  .filter(w => Number.isFinite(Number(w?.start)) && Number.isFinite(Number(w?.end)));
  const s0 = Math.max(0, skip?.start | 0), s1 = Math.max(0, skip?.end | 0);
  const ws = all.slice(s0, Math.max(s0, all.length - s1));
  let dur, wc, pauses = null;
  if(ws.length > 1){
    dur = Number(ws[ws.length - 1].end) - Number(ws[0].start);
    wc = ws.length;
    pauses = 0;
    for(let k = 1; k < ws.length; k++) if(Number(ws[k].start) - Number(ws[k - 1].end) >= 1) pauses++;
  } else {
    const last = segs.length ? Number(segs[segs.length - 1]?.end) : NaN;
    dur = Number(res?.transcription_info?.duration) || (Number.isFinite(last) ? last : 0);
    wc = Math.max(0, words(res?.text, lang).length - s0 - s1);
  }
  return {
    duration_s: dur > 0 ? r1(dur) : null,
    words: wc,
    wpm: dur > 0 ? Math.round(wc / (dur / 60)) : null,
    long_pauses: pauses,
    language: res?.transcription_info?.language ?? null,
    segments: segs.length,
    word_timing: all.length > 0
  };
}

/** نوعُ الملفّ من لاحقته */
export function mimeOf(path){
  const ext = String(path || '').split('.').pop().toLowerCase();
  return ({ webm: 'audio/webm', ogg: 'audio/ogg', m4a: 'audio/mp4', mp4: 'audio/mp4', mp3: 'audio/mp3',
            wav: 'audio/wav', aac: 'audio/aac', flac: 'audio/flac' })[ext] || null;
}
