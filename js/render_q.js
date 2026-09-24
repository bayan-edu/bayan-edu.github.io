/* ── رسمُ بندٍ واحد — وحدةٌ يشترك فيها الطالبُ والمعاينةُ والمحرّر.
   كانت ثلاث نسخ، فوصل gap إلى واحدة وتخلّف عن اثنتين.
   والمعيار: ما يراه المؤلّف هو ما يراه الطالب — لأنها الدالّة نفسها. */

import { esc, fmt, dirOf, optLabel, AR } from './ui.js';

export const KIND_LABEL = {
  mcq:  'اختيار من متعدد',
  msq:  'اختيار متعدّد الإجابات',
  gap:  'إكمال الناقص',
  matching:'المزاوجة',
  essay:'مقالي قصير'
};

/* الفراغ يُعلَّم {{1}} في النصّ، فيُرسم الحقل في موضعه من الجملة.
   والسياق حول الفراغ هو ما يقيسه البند — لا يُفصل عنه. */
const SLOT = /\{\{(\d+)\}\}/g;

/* الأرقام المميّزة لا المطابقات — فحذف {{1}} لا يُنتج ترقيماً مكرّراً */
export const gapCount = body =>
  new Set([...String(body||'').matchAll(/\{\{(\d+)\}\}/g)].map(m => m[1])).size;

/* نصُّ البند: يُقسَم على {{n}} ويُنسج بحقولٍ في مواضعها.
   values: ما كتبه الطالب · ro: للعرض لا للكتابة */
export function bodyWithSlots(body, values = [], ro = false){
  const parts = String(body||'').split(SLOT);   // نصّ · رقم · نصّ · رقم …
  return parts.map((p, i) => {
    if(i % 2 === 0) return fmt(p);              // زوجيّ = نصّ
    const n = +p - 1;                           // فرديّ = رقم الفراغ
    return `<input class="gap-in" type="text" dir="auto" data-i="${n}"
              autocomplete="off" autocapitalize="off" spellcheck="false"
              value="${esc(values[n] || '')}" ${ro ? 'disabled' : ''}
              placeholder="${ro ? '' : '…'}"
              aria-label="الفراغ ${AR(n+1)}">`;
  }).join("");
}

/* جسم البند: الخيارات أو الحقول أو المزاوجة أو المقالي.
   opts = { picked, values, pairs, ro, bank } */
export function questionBody(q, opts = {}){
  const { picked = () => false, values = [], ro = false } = opts;
  const multi = q.kind === 'msq';

  if(q.kind === 'mcq' || multi)
    return `${multi ? `<div class="q-hint">اختر كل ما ينطبق — وقد ينطبق أكثر من خيار</div>` : ''}
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
        ? `<div class="q-hint">البند يُحتسب كاملاً أو لا يُحتسب</div>` : ''}
      ${bank.length ? `<div class="bank">${bank.map(w =>
        `<span class="bank-w">${esc(w)}</span>`).join("")}</div>` : ''}`;
  }

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
    const PH  = 'انقر أو اسحب مقابلاً';

    return `<div class="q-hint">لكلّ بندٍ درجة — وقد يبقى في العمود مقابلٌ لا يُزاوَج</div>
      <div class="mq${ro ? ' ro' : ''}">
        ${bank.length ? `<div class="bank">${bank.map(b => `
          <button type="button" class="bank-w" data-bw="${esc(b.k)}"
                  aria-pressed="false" ${ro ? 'disabled' : ''}>${esc(b.t)}</button>`
          ).join("")}</div>` : ''}

        <div class="pairs">${prompts.map((p, j) => {
          const v = pairs[p.k] || '';
          return `<div class="pair${v ? ' filled' : ''}">
            <span class="key">${AR(j+1)}</span>
            <span class="pair-p" dir="${dirOf(p.body)}">${fmt(p.body)}</span>
            <button type="button" class="pair-slot" data-k="${esc(p.k || '')}"
                    ${v ? `data-v="${esc(v)}"` : ''} ${ro ? 'disabled' : ''}>
              <span class="sr-only">مقابل البند ${AR(j+1)}</span>
              <span class="slot-t" data-ph="${esc(PH)}">${v ? esc(txt(v)) : esc(PH)}</span>
            </button>
            ${ro ? '' : `<button type="button" class="slot-x"
                                 aria-label="أزل مقابل البند ${AR(j+1)}">✕</button>`}
          </div>`;
        }).join("")}</div>

        <p class="mq-live sr-only" aria-live="polite" role="status"></p>
      </div>`;
  }

  return `<textarea class="essay" placeholder="اكتب السلسلة السببية كاملة…"
            ${ro ? 'disabled' : ''}>${esc(opts.essay || '')}</textarea>`;
}

/* نصُّ البند نفسه — بحقوله إن كان gap */
export const questionText = (q, values = [], ro = false) =>
  `<div class="qtext" dir="auto">${
     q.kind === 'gap' ? bodyWithSlots(q.body, values, ro) : fmt(q.body)}</div>`;
