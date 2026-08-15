/* ══════════════════════════════════════════════════════════
   بيان — ui.js
   أدوات العرض المشتركة. لا تتصل بقاعدة البيانات إطلاقاً.
   ══════════════════════════════════════════════════════════ */

import { S } from './state.js';

/* ── بصمة النسخة — لمعرفة أي شيفرة يشغّلها المتصفح فعلاً ── */
export const BUILD = "b10";

/* ── مراسي الصفحة ── */
export const app = document.getElementById("app");
export const bar = document.getElementById("bar");

/* ── ثوابت العرض ── */
export const L = ["أ","ب","ج","د"];

export const ICONS = { pdf:'📄', video:'🎬', audio:'🎧', image:'🗺️', link:'🔗',
                       text:'📃', quiz:'📝', recording:'🎤' };

export const KINDS = { pdf:'ملف للقراءة', video:'شرح مرئي', audio:'مقطع صوتي',
                       image:'صورة', link:'مرجع خارجي', text:'نص',
                       quiz:'اختبار تشخيصي', recording:'تسجيل صوتي' };

/* ── تحويلات نصية ── */
export const esc  = s => String(s==null?"":s).replace(/&/g,"&amp;").replace(/</g,"&lt;");
export const AR   = n => String(n).replace(/[0-9]/g, d => "٠١٢٣٤٥٦٧٨٩"[+d]);
export const mmss = s => { const m=Math.floor(s/60), x=s%60; return m+":"+(x<10?"0":"")+x; };

/* ── الترويسة ── */
export function head(t, s, hero){
  const b = document.getElementById("brand"), h = document.getElementById("head");
  b.classList.toggle("hero", !!hero);
  h.textContent = t || "";
  h.style.display = t ? "" : "none";
  document.getElementById("subhead").textContent = s || "";
}

/* ── إشعار عابر ── */
export function toast(m){
  const t = document.getElementById("toast");
  t.textContent = m;
  t.classList.add("show");
  setTimeout(()=>t.classList.remove("show"), 2800);
}

/* ── الوسائط: مصادر موثوقة فقط ── */
const SAFE = /^https:\/\/(drive\.google\.com|lh3\.googleusercontent\.com|www\.youtube\.com|youtu\.be|i\.imgur\.com)\//;

export function media(q){
  let h = "";
  if(q.image && SAFE.test(q.image)) h += `<img class="media" src="${esc(q.image)}" alt="" loading="lazy">`;
  if(q.video && SAFE.test(q.video)) h += `<iframe class="media-v" src="${esc(q.video)}" allowfullscreen></iframe>`;
  return h;
}

/* ── فقاعة رسالة (يشترك فيها الطالب والمعلم) ── */
export function bubble(m, mine){
  return `<div class="msg ${mine?'me':'them'}">
    <div class="who">${esc(m.profiles?.full_name || (m.sender_role==='teacher'?'المعلم':'أنا'))}</div>
    <div>${esc(m.body).replace(/\n/g,"<br>")}</div>
    <div class="tm">${new Date(m.created_at).toLocaleString('ar-EG',
      {month:'2-digit',day:'2-digit',hour:'2-digit',minute:'2-digit'})}</div></div>`;
}

/* ══════════════════════════════════════════════
   شريط التنقّل الدائم
   ui.js لا يعرف شيئاً عن الشاشات — تُسجَّل عنده
   خريطة الوجهات مرة واحدة في start()، فيبقى ورقة
   في شجرة الاستيراد بلا دورة.
   ══════════════════════════════════════════════ */
const ROUTES = {};
export function registerRoutes(map){ Object.assign(ROUTES, map); }

const DEST = {
  student: [['subjects','المواد'], ['feedback','ملاحظاتي'], ['chat','الرسائل']],
  teacher: [['grade','التصحيح'],   ['inbox','الرسائل'],     ['mySubjects','موادّي'],
            ['editor','التأليف']],
  admin:   [['requests','الطلبات'], ['editor','التأليف'],   ['grade','التصحيح'],
            ['inbox','الرسائل'],    ['mySubjects','موادّي']]
};

/* المحرّر وحده يحتاج عرضاً أوسع: التأليف عمل مكتب لا إبهام.
   nav() تُعيد الضبط لأنها تُستدعى في كل شاشة. */
export function setWide(on){
  document.querySelector('.wrap')?.classList.toggle('wide', !!on);
}

// active = مفتاح الوجهة الحالية · النقر على النشط يُعيد التحميل
export function nav(active){
  setWide(false);
  const role  = S.roleInfo?.role || S.prof?.role || 'student';
  const dests = DEST[role] || DEST.student;
  bar.innerHTML = `<div class="topbar">
    <nav class="navlinks">${dests.map(([k,label]) =>
      `<button class="navlink ${k===active?'on':''}" data-r="${k}">${label}</button>`).join("")}</nav>
    <button class="navout" data-r="out">خروج ↩</button>
  </div>`;
  bar.querySelectorAll('[data-r]').forEach(b => b.onclick = () => {
    const go = ROUTES[b.dataset.r];
    if(go) go();
  });
}

/* ── صندوق خطأ: يُظهر رسالة Supabase كاملة بدل ابتلاعها ──
   يُدرَج في أعلى الشاشة ولا يمسح بقيتها. */
export function errBox(error, where){
  if(!error) return '';
  return `<div class="err"><b>تعذّر: ${esc(where)}</b>
    ${esc(error.message || 'خطأ غير معروف')}
    ${error.code    ? `<div class="line" style="margin-top:7px">الرمز: <b>${esc(error.code)}</b></div>` : ''}
    ${error.details ? `<div class="line">${esc(error.details)}</div>` : ''}
    ${error.hint    ? `<div class="line">تلميح: ${esc(error.hint)}</div>` : ''}
    <div class="line" style="margin-top:7px;opacity:.65">نسخة الواجهة: ${BUILD}</div></div>`;
}

/* ── التمرير ── */
export const scrollTop    = () => window.scrollTo({ top:0, behavior:'smooth' });
export const scrollBottom = () => window.scrollTo({ top:document.body.scrollHeight, behavior:'smooth' });
