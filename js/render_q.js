/* ── رسمُ بندٍ واحد — وحدةٌ يشترك فيها الطالبُ والمعاينةُ والمحرّر.
   كانت ثلاث نسخ، فوصل gap إلى واحدة وتخلّف عن اثنتين.
   والمعيار: ما يراه المؤلّف هو ما يراه الطالب — لأنها الدالّة نفسها. */

import { esc, fmt, dirOf, optLabel, AR } from './ui.js';

export const KIND_LABEL = {
  mcq:  'اختيار من متعدد',
  msq:  'اختيار متعدّد الإجابات',
  gap:  'إكمال الناقص',
  cloze:'إكمال من قائمة',
  matching:'المزاوجة',
  essay:'مقالي قصير'
};

/* ── 🆕 b142 · لسانٌ ثانٍ لما يقرؤه الطالب ─────────────────────────
   والقاعدةُ ليست جديدة: حرفُ الخيار يتبع لسانَ الخيار منذ `L_EN` في
   ui.js — «طالبٌ يقرأ سؤالاً إنجليزياً في ورقته يرى a) b) c)، فلا
   يصحّ أن تعرض الشاشة أ ب ج. **والفجوة بين التدريب والامتحان في
   مادة لغة مسألة تعليمية لا شكلية.**»

   🔑 والتوجيهُ أولى بها من الحرف: من يُمتحن في IELTS يقرأ في ورقته
      `Choose the correct answer`، فإن تدرّب على «اختيار من متعدد»
      تدرّب على غير ما يُمتحن فيه — والنمطُ هو نفسه والاسمُ غريب.

   ⚠️ والافتراضُ العربية في كلّ نداء (`en = false`): شاشةُ الدرس
      (`practice.js`) والمحرّرُ لا يُمرِّران شيئاً، فلا يتبدّل عندهما
      حرفٌ واحد بهذا التغيير.
   📌 وهذه **ليست ترجمةً حرفية** بل ما يقوله الامتحانُ نفسُه بلسانه:
      `Choose all that apply` لا `Multiple-answer choice`.           */

export const KIND_LABEL_EN = {
  mcq:  'Choose the correct answer',
  msq:  'Choose all that apply',
  gap:  'Complete the missing word',
  cloze:'Complete from the list',
  matching:'Matching',
  essay:'Short written answer'
};

export const kindLabel = (k, en) =>
  (en ? KIND_LABEL_EN[k] : KIND_LABEL[k]) || (en ? 'Question' : 'سؤال');

/* نصوصُ البند — والرقمُ معها: «سؤال ١» في ورقةٍ إنجليزية عطلٌ يُرى،
   فـ`num` جزءٌ من اللسان لا زينةٌ تُلحق به. */
const T_AR = {
  msq:    'يُختار كلّ ما ينطبق — وقد ينطبق أكثر من خيار',
  gapAll: 'البند يُحتسب كاملاً أو لا يُحتسب',
  pair:   'لكلّ بند درجة — وقد يبقى في العمود مقابل لا يُزاوَج',
  slotPH: 'بالنقر أو السحب: مقابل',
  slotSR: n => `مقابل البند ${AR(n)}`,
  slotX:  n => `إزالة مقابل البند ${AR(n)}`,
  gapSR:  n => `الفراغ ${AR(n)}`,
  essay:  'السلسلة السببية كاملة…',
  num:    AR
};

const T_EN = {
  msq:    'Choose every option that applies — more than one may be correct',
  gapAll: 'The item is marked as a whole — all the gaps or none',
  pair:   'Each item carries a mark — an option may be left unmatched',
  slotPH: 'Tap or drag: match',
  slotSR: n => `Match for item ${n}`,
  slotX:  n => `Remove the match for item ${n}`,
  gapSR:  n => `Gap ${n}`,
  essay:  'Write your answer in full…',
  num:    String
};

export const TX = en => en ? T_EN : T_AR;

/* ── لسانُ الورقة يُقاس من الورقة ───────────────────────────────────
   🔑 **والحَكَمُ اتجاهُ المحتوى لا وسمُ لغة** — وهو عينُ ما قُرِّر عند
      `optLabel` و`backText` في ui.js: لا عمودَ `lang` في `questions`
      أصلاً، ولو عُلِّق الحكمُ على اسم الأداة (`ielts_placement`) أو على
      رقم المادّة **لسقط صامتاً** يوم يُعاد تسميتُها أو تُنشَأ أختُها.
   ⚠️ **والأغلبيةُ لا أوّلُ سؤال**: محطّةُ استماعٍ قد يتصدّرها عنوانُ
      مقطعٍ بالعربية، وسؤالٌ واحد لا يحكم على ورقة.
   📌 وموضعُها هنا لا في `quiz.js`: يقرؤها الطالبُ والمؤلّفُ معاً،
      فنسختان منها تفترقان يوم يتغيّر المقياس — والثابت ⑨ يسقط صامتاً. */
export const paperIsEnglish = quiz => {
  const t = [...(quiz?.questions || []).map(q => q.body),
             ...(quiz?.passages  || []).map(p => p.title)].filter(Boolean);
  return t.length > 0 &&
         t.filter(x => dirOf(x) === 'ltr').length * 2 > t.length;
};

/* الفراغ يُعلَّم {{1}} في النصّ، فيُرسم الحقل في موضعه من الجملة.
   والسياق حول الفراغ هو ما يقيسه البند — لا يُفصل عنه. */
const SLOT = /\{\{(\d+)\}\}/g;

/* الأرقام المميّزة لا المطابقات — فحذف {{1}} لا يُنتج ترقيماً مكرّراً */
export const gapCount = body =>
  new Set([...String(body||'').matchAll(/\{\{(\d+)\}\}/g)].map(m => m[1])).size;

/* نصُّ البند: يُقسَم على {{n}} ويُنسج بحقولٍ في مواضعها.
   values: ما كتبه الطالب · ro: للعرض لا للكتابة */
export function bodyWithSlots(body, values = [], ro = false, en = false){
  const parts = String(body||'').split(SLOT);   // نصّ · رقم · نصّ · رقم …
  return parts.map((p, i) => {
    if(i % 2 === 0) return fmt(p);              // زوجيّ = نصّ
    const n = +p - 1;                           // فرديّ = رقم الفراغ
    return `<input class="gap-in" type="text" dir="auto" data-i="${n}"
              autocomplete="off" autocapitalize="off" spellcheck="false"
              value="${esc(values[n] || '')}" ${ro ? 'disabled' : ''}
              placeholder="${ro ? '' : '…'}"
              aria-label="${esc(TX(en).gapSR(n+1))}">`;
  }).join("");
}

/* ── 113 · إكمال من قائمة ─────────────────────────────────────
   نصُّ البند نفسه، لكنّ الفراغ **خانةُ اختيارٍ** لا حقلَ كتابة.
   والفرق ليس في اليد بل في القياس: في `gap` المجالُ مفتوح فلا
   يُشخَّص الخطأ إلا إن خمّن المؤلّفُ حرفَ ما سيُكتب؛ وهنا الاختيارُ
   مغلق ⇒ كلُّ كلمةٍ ليست صواباً مشتّتٌ معلومٌ باسمه، فتحمل كودها.

   🔑 والخانةُ تُرسَم بفئات المزاوجة نفسها (.pair-slot · .slot-t ·
      .bank-w) لا بفئاتٍ موازية: match_dnd.js تعمل عليها بالمفتاح
      والصنف وحدهما، فلا تُكتب آلةُ إسنادٍ ثانية تتفارق عن أختها.
      و`data-k` هنا **رقمُ الفراغ** نصّاً — وهو مفتاحه في accept.pairs. */
const czSlot = (n, bank, pairs, ro, en) => {
  const k = String(n);
  const v = pairs[k] || '';
  const t = (bank.find(b => b.k === v) || {}).t || '';
  const PH = '……';
  return `<button type="button" class="pair-slot cz-slot${v ? ' filled' : ''}"
            data-k="${esc(k)}"${v ? ` data-v="${esc(v)}"` : ''} ${ro ? 'disabled' : ''}>
      <span class="sr-only">${esc(TX(en).gapSR(n))}</span>
      <span class="slot-t" data-ph="${PH}">${v ? esc(t) : PH}</span>
    </button>`;
};

/* الوحدةُ كلُّها: قائمةُ الكلمات ثمّ الجملةُ بخاناتها.
   ولماذا في `questionText` لا في `questionBody`؟ لأنهما هنا شيءٌ
   واحد: الكلماتُ لا تُقرأ بمعزلٍ عن مواضعها، والخانةُ لا تُملأ بمعزلٍ
   عن قائمتها. وفصلُهما في عنصرين متجاورين يقطع `.mq` الذي تبحث عنه
   آلةُ الإسناد، فتصير الكلماتُ في وعاءٍ والخاناتُ في آخر. */
function clozeUnit(q, pairs = {}, ro = false, en = false){
  const bank = q.bank || [];        // [{k,t}] — مخلوطٌ بالبذرة عند الطالب
  const parts = String(q.body||'').split(SLOT);
  const text = parts.map((p, i) => i % 2 === 0
    ? fmt(p)
    : czSlot(+p, bank, pairs, ro, en)).join("");

  return `<div class="mq cz${ro ? ' ro' : ''}">
      ${bank.length ? `<div class="bank">${bank.map(b => `
        <button type="button" class="bank-w" data-bw="${esc(b.k)}"
                aria-pressed="false" ${ro ? 'disabled' : ''}>${esc(b.t)}</button>`
        ).join("")}</div>` : ''}
      <div class="qtext cz-text" dir="auto">${text}</div>
      <p class="mq-live sr-only" aria-live="polite" role="status"></p>
    </div>`;
}

/* جسم البند: الخيارات أو الحقول أو المزاوجة أو المقالي.
   opts = { picked, values, pairs, ro, bank } */
export function questionBody(q, opts = {}){
  const { picked = () => false, values = [], ro = false, en = false } = opts;
  const multi = q.kind === 'msq';
  const T = TX(en);

  if(q.kind === 'mcq' || multi)
    return `${multi ? `<div class="q-hint">${esc(T.msq)}</div>` : ''}
      <div class="opts${multi ? ' multi' : ''}">${(q.options||[]).map((o,j) => `
        <button class="opt ${picked(o) ? 'sel' : ''}" data-o="${o.id}" data-pvo="${j}"
                dir="${dirOf(o.body)}" style="text-align:start" ${ro ? 'disabled' : ''}>
          <span class="key">${esc(optLabel(o,j))}</span>
          <span style="flex:1">${fmt(o.body)}</span>
          ${multi ? `<span class="tick">${picked(o) ? '✔' : ''}</span>` : ''}
        </button>`).join("")}</div>`;

  if(q.kind === 'gap'){
    const bank = q.bank || [];   // نصوصٌ بلا مفاتيح — ولا مرجعَ يشير إلى كلمةٍ بعينها
    return `${gapCount(q.body) > 1
        ? `<div class="q-hint">${esc(T.gapAll)}</div>` : ''}
      ${bank.length ? `<div class="bank">${bank.map(w =>
        `<span class="bank-w">${esc(w)}</span>`).join("")}</div>` : ''}`;
  }

  /* 113 · رُسمت كاملةً في questionText — ولا يُترك الفرعُ للذيل
     المقاليّ تحته: نمطٌ يسقط في الافتراضيّ يُعرض مربّعَ نصٍّ صامتاً. */
  if(q.kind === 'cloze') return '';

  /* ── المزاوجة ─────────────────────────────────────────────────
     عمودُ المقابلات يُعرض كاملاً **فوق** البنود لا داخل القائمة وحدها:
     المزاوجة حكمٌ على المجموعة لا خمسةَ أحكامٍ منفصلة، والطالب يحتاج
     أن يرى المتشابهات معاً ليميّز بينها — وذاك هو ما يقيسه البند.

     🔓 وكان الإسنادُ بقائمةٍ أصيلة (select) «لا بسحبٍ وإفلات: تعمل
        باللمس وبلوحة المفاتيح وقارئ الشاشة، والسحبُ يسقط في الثلاثة».
        والحجّةُ صادقةٌ في **سحب HTML5 الأصليّ** وحده. ⇒ لم تُنقض بل
        استُوفيت: النواةُ نقرتان، والسحبُ ببصمة المؤشّر، والطرفان
        زرّان أصيلان. والشروحُ كاملةً في match_dnd.js — وهي التي
        تُحرّك ما يُرسَم هنا، وهذا الملفُّ يرسم ولا يُحرّك.

     🔑 والقيمةُ **مفتاحُ المقابل** لا نصُّه ولا فهرسُه (112).
        وكانت نصّاً بحجّة «يُقرأ بعد سنةٍ بلا مفتاح فكّ»، والحجّةُ قائمة
        لكنّ ثمنها بان فادحاً: تحريرُ حرفٍ في نصّ مقابلٍ يقطع كلَّ إشارةٍ
        إليه — في المفتاح وفي التشخيص معاً، وبصمت.
        ⇒ المفتاحُ يُرسَل، و submit_attempt تحفظ النصَّ المقروء في
           essay_text بجواره. فالسجلُّ يُقرأ، والإشارةُ لا تنقطع. */
  if(q.kind === 'matching'){
    const bank    = q.bank    || [];      // [{k,t}] — مخلوطٌ بالبذرة في get_quiz
    const prompts = q.options || [];      // [{k, body}]
    const pairs   = opts.pairs || {};     // { مفتاح البند: مفتاح المقابل }
    const txt = k => (bank.find(b => b.k === k) || {}).t || '';
    const PH  = T.slotPH;

    return `<div class="q-hint">${esc(T.pair)}</div>
      <div class="mq${ro ? ' ro' : ''}">
        ${bank.length ? `<div class="bank">${bank.map(b => `
          <button type="button" class="bank-w" data-bw="${esc(b.k)}"
                  aria-pressed="false" ${ro ? 'disabled' : ''}>${esc(b.t)}</button>`
          ).join("")}</div>` : ''}

        <div class="pairs">${prompts.map((p, j) => {
          const v = pairs[p.k] || '';
          return `<div class="pair${v ? ' filled' : ''}">
            <span class="key">${T.num(j+1)}</span>
            <span class="pair-p" dir="${dirOf(p.body)}">${fmt(p.body)}</span>
            <button type="button" class="pair-slot" data-k="${esc(p.k || '')}"
                    ${v ? `data-v="${esc(v)}"` : ''} ${ro ? 'disabled' : ''}>
              <span class="sr-only">${esc(T.slotSR(j+1))}</span>
              <span class="slot-t" data-ph="${esc(PH)}">${v ? esc(txt(v)) : esc(PH)}</span>
            </button>
            ${ro ? '' : `<button type="button" class="slot-x"
                                 aria-label="${esc(T.slotX(j+1))}">✕</button>`}
          </div>`;
        }).join("")}</div>

        <p class="mq-live sr-only" aria-live="polite" role="status"></p>
      </div>`;
  }

  return `<textarea class="essay" placeholder="${esc(T.essay)}"
            ${ro ? 'disabled' : ''}>${esc(opts.essay || '')}</textarea>`;
}

/* 🆕 114 · نصُّ البند حيث **يُقرأ ولا يُجاب**: المراجعة والتقارير.
   ‎{{1}}‎ رمزُ تأليفٍ لا يخصّ الطالب — وكان يظهر خاماً في مراجعة
   «إكمال الناقص» منذ 63، فيقرأ الطالب قوسين معقوفين في جملةٍ عربية.
   ⇒ يُرسَم الفراغُ برقمه، فيُقابل ترقيمَ إجاباته تحته. */
export const bodyRead = body => String(body||'').split(SLOT).map((p, i) =>
  i % 2 === 0 ? fmt(p) : `<span class="rev-blank">${AR(+p)}</span>`).join("");

/* نصُّ البند نفسه — بحقوله إن كان gap، وبخاناته إن كان cloze.
   و`values` هو **ما أدخله الطالب** في النمطين: مصفوفةُ نصوصٍ في
   `gap`، وكائنُ { رقم الفراغ: مفتاح الكلمة } في `cloze`. */
export const questionText = (q, values = [], ro = false, en = false) =>
  q.kind === 'cloze'
    ? clozeUnit(q, (values && !Array.isArray(values)) ? values : {}, ro, en)
    : `<div class="qtext" dir="auto">${
        q.kind === 'gap' ? bodyWithSlots(q.body, values, ro, en) : fmt(q.body)}</div>`;
