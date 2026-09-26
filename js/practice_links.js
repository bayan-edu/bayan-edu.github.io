/* ══════════════════════════════════════════════════════════
   بيان — practice_links.js  ·  جانبُ المعلّم من جلسات التدرّب

   صندوقٌ واحد يخدم الاختبارَ والرزمة معاً — والنمطُ وسيطٌ لا
   نسختان. ونسختان تتفارقان عند أوّل إصلاح، وهو داءُ هذا المشروع
   المسجَّل (KEYED في 114 · F_KIND · L_MATCH/L_CLOZE).

   🔑 والرابط **لا يشترط نشراً**: النشرُ يُدخل الاختبارَ البوّابةَ
      والدرجة، وهذه جلسةٌ لا تُقيَّم. لكنّ حالَ الأصل يُقال صراحةً
      قبل التوليد — **فاللقطةُ تُجمَّد على ما هو عليه الآن**، ومن
      ولّد رابطاً لمسودّةٍ يجب أن يعرف أنّه جمّد مسودّة.
   ══════════════════════════════════════════════════════════ */
import * as api from './api.js';
import { toast, esc, AR } from './ui.js';

const DAYS = [
  [1,  'يوم واحد'], [7,  'أسبوع'], [14, 'أسبوعان'],
  [30, 'شهر'],      [90, 'ثلاثة أشهر']
];

/* 🔑 العنوانُ يُبنى من الصفحة الحاضرة لا من ثابتٍ مكتوب: المنصّة
   تعمل على GitHub Pages وعلى خادمٍ محلّيّ، وثابتٌ هنا يُنتج روابط
   تشير إلى موضعٍ آخر في إحداهما — وبصمت. */
export const practiceUrl = token =>
  location.origin + location.pathname.replace(/index\.html$/, '') + '#/t/' + token;

const when = iso => {
  try { return new Date(iso).toLocaleDateString('ar-EG',
    { year:'numeric', month:'long', day:'numeric' }); }
  catch { return '—'; }
};


/* ═══════════ الصندوق ═══════════
   opts = { kind:'quiz'|'cards', source, title, note } */

export function practiceLinkBox({ kind, source, title, note }){
  const box = document.createElement('div');
  box.className = 'modal';
  box.innerHTML = `
    <div class="card" style="max-width:560px;margin:auto">
      <div class="ed-t" style="margin-bottom:6px">رابط تدرّب</div>
      <div class="line">من يملك الرابط يتدرّب <b>بلا حساب</b> ويأخذ تشخيصاً كاملاً —
        ولا تقييمَ ولا درجةَ ولا سجلَّ تعلّمٍ يترتّب عليه.</div>
      <div class="line" dir="auto" style="margin-top:8px;color:var(--text)">
        ${esc(title || '')}</div>
      ${note ? `<div class="eq-hint" style="margin:8px 0 0">${esc(note)}</div>` : ''}

      <label class="fl" style="margin-top:16px">مدّة الصلاحية</label>
      <select id="pl_d">${DAYS.map(([v,t],i) =>
        `<option value="${v}" ${i===2?'selected':''}>${t}</option>`).join("")}</select>
      <div class="eq-hint" style="margin-top:6px">
        تُحدَّد الآن ولا تُعدَّل بعدها — والرابط يتوقّف من نفسه.</div>

      <div id="pl_out" style="margin-top:16px"></div>

      <div class="nav" style="margin-top:18px">
        <button class="btn primary" id="pl_go">ولّد الرابط</button>
        <button class="btn ghost" id="pl_x">إغلاق</button>
      </div>

      <div id="pl_list" style="margin-top:18px"></div>
    </div>`;
  document.body.appendChild(box);

  const $ = id => box.querySelector('#' + id);
  $('pl_x').onclick = () => box.remove();

  $('pl_go').onclick = async e => {
    const b = e.currentTarget; if(b.disabled) return;
    b.disabled = true; b.textContent = '…';

    const { data, error } = await api.createPractice(kind, source, +$('pl_d').value);
    b.disabled = false; b.textContent = 'ولّد الرابط';

    if(error){ toast(error.message); return; }
    if(!data?.ok){ toast(data?.error || 'تعذّر التوليد'); return; }

    $('pl_out').innerHTML = result(data);
    wireCopy($, data.token);
    list($, kind, source);
  };

  list($, kind, source);
  return box;
}


/* ═══════════ ناتجُ التوليد ═══════════
   ⚠️ والمقاليُّ المستبعَد يُقال عددُه هنا لا في سجلٍّ يُقرأ بعد شهر:
      المعلّم ولّد رابطاً ظنَّه كاملاً، والنقصُ يُرى أو يُصدَّق. */
const result = d => `
  <div class="rev ok">
    <span class="tag ok">جاهز</span>
    <div class="line">${d.kind === 'cards'
      ? `${AR(d.count)} بطاقة` : `${AR(d.count)} سؤالاً`} ·
      صالحٌ حتى ${esc(when(d.expires_at))}</div>
    ${d.skipped_essay > 0 ? `<div class="line" style="margin-top:6px">
      ⚠️ استُبعد ${AR(d.skipped_essay)} سؤالاً مقالياً — لا مصحِّحَ آليّاً له،
      ولا يقرأ أحدٌ إجابةَ زائرٍ مجهول.</div>` : ''}
    <input id="pl_u" dir="ltr" readonly value="${esc(practiceUrl(d.token))}"
           style="margin-top:10px">
    <div class="nav" style="margin-top:10px">
      <button class="btn ghost" id="pl_c">نسخُ الرابط</button>
    </div>
  </div>`;

/* النسخُ قد يُرفض (سياقٌ غير آمن · إذنٌ محجوب) — فالحقلُ يبقى ظاهراً
   محدَّداً ليُنسخ باليد. ووعدٌ مرفوضٌ بلا إمساكٍ يمرّ صامتاً. */
function wireCopy($, token){
  const btn = $('pl_c'), inp = $('pl_u');
  if(!btn) return;
  btn.onclick = async () => {
    inp.select();
    try {
      await navigator.clipboard.writeText(practiceUrl(token));
      toast('نُسخ الرابط');
    } catch {
      toast('تعذّر النسخ تلقائياً — الرابط محدَّدٌ فانسخه');
    }
  };
}


/* ═══════════ روابطُ هذا المصدر ═══════════
   🔑 وتُصفّى على (النمط · المصدر) لا تُعرض كلُّها: المعلّم واقفٌ على
      اختبارٍ بعينه، وقائمةٌ بكلّ روابطه تُقرأ فهرساً لا سياقاً. */
async function list($, kind, source){
  const host = $('pl_list'); if(!host) return;
  const { data, error } = await api.myPractice();
  if(error){ host.innerHTML = `<div class="eq-hint">${esc(error.message)}</div>`; return; }

  const mine = (data || []).filter(s =>
    s.kind === kind && String(s.source_id) === String(source));
  if(!mine.length){ host.innerHTML = ''; return; }

  host.innerHTML = `
    <div class="ed-t" style="margin-bottom:8px">روابطُ هذا المصدر</div>
    ${mine.map(s => `
      <div class="rev ${s.live ? 'ok' : 'no'}">
        <span class="tag ${s.live ? 'ok' : 'no'}">${s.live ? 'يعمل' : 'انتهى'}</span>
        <div class="line">${s.kind === 'cards'
            ? `${AR(s.count)} بطاقة` : `${AR(s.count)} سؤالاً`} ·
          ${s.live ? `حتى ${esc(when(s.expires_at))}` : `انتهى ${esc(when(s.expires_at))}`} ·
          ${AR(s.answers)} إجابة</div>
        ${s.live ? `<input dir="ltr" readonly value="${esc(practiceUrl(s.token))}"
                      style="margin-top:8px">` : ''}
      </div>`).join("")}
    <div class="eq-hint" style="margin-top:6px">
      وعددُ الإجابات مجموعٌ بلا اسمٍ ولا تفصيل — الجلسةُ لا تُقيَّم.</div>`;
}
