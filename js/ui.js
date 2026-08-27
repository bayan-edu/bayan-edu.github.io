/* ══════════════════════════════════════════════════════════
   بيان — ui.js
   أدوات العرض المشتركة. لا تتصل بقاعدة البيانات إطلاقاً.
   ══════════════════════════════════════════════════════════ */

import { S } from './state.js';

/* ── بصمة النسخة — لمعرفة أي شيفرة يشغّلها المتصفح فعلاً ── */
export const BUILD = "b26";

/* ── مراسي الصفحة ── */
export const app = document.getElementById("app");
export const bar = document.getElementById("bar");

/* ── ثوابت العرض ── */
/* ── حروف الخيارات: تتبع لغة الخيار نفسه ──
   طالبٌ يقرأ سؤالاً إنجليزياً في ورقته يرى a) b) c) — فلا يصحّ
   أن تعرض الشاشة أ ب ج. والفجوة بين التدريب والامتحان في مادة
   لغة مسألة تعليمية لا شكلية. */
export const L    = ["أ","ب","ج","د","هـ","و"];
export const L_EN = ["A","B","C","D","E","F"];

const AR_RX  = /[\u0600-\u06FF\u0750-\u077F\uFB50-\uFDFF\uFE70-\uFEFF]/;
const STRONG = /[\u0600-\u06FF\u0750-\u077F\uFB50-\uFDFF\uFE70-\uFEFF]|[A-Za-z\u00C0-\u024F]/;

/* أول محرف قويّ — نفس ما يفعله dir="auto" في المتصفح.
   نحسبه بأنفسنا حين نحتاج القرار في JS لا في العرض وحده:
   صندوق الخيار يبدأ بحرف المفتاح، فلو تُرك لـauto لحسم الاتجاه
   بالحرف نفسه — دورٌ مغلق. */
export function dirOf(t){
  const m = String(t || '').match(STRONG);
  return m ? (AR_RX.test(m[0]) ? 'rtl' : 'ltr') : 'rtl';
}

/* حرف الخيار: المخزَّن إن وُجد (i · ii · iii) وإلا يُشتقّ من اتجاهه */
export const optLabel = (o, i) =>
  (o?.label && String(o.label).trim())
  || (dirOf(o?.body) === 'rtl' ? (L[i] || '') : (L_EN[i] || ''));

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
  /* البوابة وحدها تُخفي الترويسة. وإزالة الصنف هنا لا في كل شاشة:
     head() تُستدعى في كل عرض، فهي المكان الوحيد الذي لا يُنسى. */
  document.body.classList.remove("gate");
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

/* ── تنسيق خفيف: **غامق** _مائل_ __مسطَّر__ ──
   يُهرَّب النصّ أولاً ثم تُستبدل العلامات — فلا يدخل HTML من
   المؤلّف إطلاقاً. تغطية ما يحتاجه التعليم بلا سطح هجوم. */
export function fmt(s){
  return esc(s)
    .replace(/\*\*([^*\n]+)\*\*/g, '<b>$1</b>')
    .replace(/__([^_\n]+)__/g,        '<u>$1</u>')
    .replace(/_([^_\n]+)_/g,          '<i>$1</i>')
    .replace(/\n/g, '<br>');
}

/* ── الوسائط: مصادر موثوقة فقط ── */
const SAFE = /^https:\/\/(drive\.google\.com|lh3\.googleusercontent\.com|www\.youtube\.com|youtu\.be|i\.imgur\.com)\//;

// المصادر المسموحة — تُعرض للمؤلّف حتى لا يضع رابطاً يُحجب صامتاً
export const SAFE_HOSTS = 'Google Drive · YouTube · imgur';

/* وسيط الفقرة: واحد ونوعه في kind */
export function pgMedia(p){
  if(!p?.media) return '';
  if(!SAFE.test(p.media))
    return `<div class="err" style="margin:9px 0">مصدر غير مسموح — المسموح: ${SAFE_HOSTS}</div>`;
  if(p.kind === 'video')
    return `<iframe class="media-v" src="${esc(p.media)}" allowfullscreen></iframe>`;
  if(p.kind === 'image')
    return `<img class="media" src="${esc(p.media)}" alt="" loading="lazy">`;
  return `<audio controls src="${esc(p.media)}" style="width:100%;margin-bottom:12px"></audio>`;
}

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

/* ── السِمة: الفاتحة افتراضية، والاختيار يُحفظ ──
   ⚠️ القراءة الأولى ليست هنا بل في <head> داخل index.html — لأن
      الوحدات (modules) مؤجَّلة، فلو قرأنا هنا لرُسمت الشاشة بيضاء
      أوّلاً ثم صُبغت، فومض البياضُ في وجه من اختار الداكنة هرباً منه.
   ⚠️ ولا تُعطَ الزرَّ سمة data-r: حلقة التوجيه أسفلُ تلتقط كل
      [data-r] وتبحث له عن مسارٍ في ROUTES — ولا مسار للسِمة.
   ⚠️ وlocalStorage يرمي في وضع التصفّح الخاص ببعض المتصفحات، فلولا
      try لسقط تبديل السِمة كله لأجل حفظٍ فاشل. */
export function toggleTheme(){
  const next = document.documentElement.dataset.theme === "dark" ? "light" : "dark";
  document.documentElement.dataset.theme = next;
  try{ localStorage.setItem("bayan.theme", next); }catch(e){}
}

// active = مفتاح الوجهة الحالية · النقر على النشط يُعيد التحميل
export function nav(active){
  setWide(false);
  const role  = S.roleInfo?.role || S.prof?.role || 'student';
  const dests = DEST[role] || DEST.student;
  bar.innerHTML = `<div class="topbar">
    <nav class="navlinks">${dests.map(([k,label]) =>
      `<button class="navlink ${k===active?'on':''}" data-r="${k}">${label}</button>`).join("")}</nav>
    <button class="navtheme" id="themeBtn" aria-label="تبديل السِمة" title="تبديل السِمة">◐</button>
    <button class="navout" data-r="out">خروج</button>
  </div>`;
  bar.querySelectorAll('[data-r]').forEach(b => b.onclick = () => {
    const go = ROUTES[b.dataset.r];
    if(go) go();
  });
  bar.querySelector('#themeBtn').onclick = toggleTheme;
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
