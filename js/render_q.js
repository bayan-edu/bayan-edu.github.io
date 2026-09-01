/* ── رسمُ بندٍ واحد — وحدةٌ يشترك فيها الطالبُ والمعاينةُ والمحرّر.
   كانت ثلاث نسخ، فوصل gap إلى واحدة وتخلّف عن اثنتين.
   والمعيار: ما يراه المؤلّف هو ما يراه الطالب — لأنها الدالّة نفسها. */

import { esc, fmt, dirOf, optLabel, AR } from './ui.js';

export const KIND_LABEL = {
  mcq:  'اختيار من متعدد',
  msq:  'اختيار متعدّد الإجابات',
  gap:  'إكمال الناقص',
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

/* جسم البند: الخيارات أو الحقول أو المقالي.
   opts = { picked, values, ro, bank } */
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
    const bank = q.bank || [];
    return `${gapCount(q.body) > 1
        ? `<div class="q-hint">البند يُحتسب كاملاً أو لا يُحتسب</div>` : ''}
      ${bank.length ? `<div class="bank">${bank.map(w =>
        `<span class="bank-w">${esc(w)}</span>`).join("")}</div>` : ''}`;
  }

  return `<textarea class="essay" placeholder="اكتب السلسلة السببية كاملة…"
            ${ro ? 'disabled' : ''}>${esc(opts.essay || '')}</textarea>`;
}

/* نصُّ البند نفسه — بحقوله إن كان gap */
export const questionText = (q, values = [], ro = false) =>
  `<div class="qtext" dir="auto">${
     q.kind === 'gap' ? bodyWithSlots(q.body, values, ro) : fmt(q.body)}</div>`;
