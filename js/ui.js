/* ══════════════════════════════════════════════════════════
   بيان — ui.js
   أدوات العرض المشتركة. لا تتصل بقاعدة البيانات إطلاقاً.
   ══════════════════════════════════════════════════════════ */

import { S } from './state.js';
import { mediaUrl, isManaged } from './media.js';

/* ── بصمة النسخة — لمعرفة أي شيفرة يشغّلها المتصفح فعلاً ── */
export const BUILD = "b33";

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

/* ── الرياضيات ─────────────────────────────────────────────────
   المصدر LaTeX نصّاً — لا HTML من المؤلّف، والثابت المحروس باقٍ.
   القرار وأدلّته في STATE.md ← «الرياضيات — قرارٌ مقيس». */

/* موضع المكتبة. للفحص الأول يجوز توجيهه إلى CDN، وفي الإنتاج
   يُستضاف في المستودع: لا طرفَ ثالثاً في مسار عرضِ الطالب. */
export const MATHJAX_SRC = 'https://cdnjs.cloudflare.com/ajax/libs/mathjax/2.7.9/MathJax.js?config=TeX-MML-AM_CHTML';
export const ARABIC_EXT  = 'https://cdn.jsdelivr.net/gh/OmarIthawi/arabic-mathjax@main/dist';

/* علم اللفّ — أيُقلب المحتوى إلى اتجاه الكتاب العربيّ؟
   🔴 الرياضيات نعم؛ والفيزياء والكيمياء تُكتبان LTR في كتبهما،
      فلفُّهما يقلبهما خطأً. ⇒ صفةُ مقرَّر لاحقاً، وموضع التغيير
      هذا السطر وحده. (STATE.md ← «جسر المقرَّر».) */
export let MATH_AR = true;

/* 🔴 المحدِّدان \(…\) و \[…\] — لا $…$ عمداً:
   نصُّ قراءةٍ منشورٌ فيه "$5 to $10" كان سيُقرأ رياضياتٍ صامتاً.
   التغيير يجب ألّا يُرى في محتوىً قائم. */
const TEX_RX = /\\\(([\s\S]+?)\\\)|\\\[([\s\S]+?)\\\]/g;
const AR_RX  = /[\u0600-\u06FF\u0750-\u077F\uFB50-\uFDFF\uFE70-\uFEFF]/;
const STRONG = /[\u0600-\u06FF\u0750-\u077F\uFB50-\uFDFF\uFE70-\uFEFF]|[A-Za-z\u00C0-\u024F]/;

/* أول محرف قويّ — نفس ما يفعله dir="auto" في المتصفح.
   نحسبه بأنفسنا حين نحتاج القرار في JS لا في العرض وحده:
   صندوق الخيار يبدأ بحرف المفتاح، فلو تُرك لـauto لحسم الاتجاه
   بالحرف نفسه — دورٌ مغلق. */
/* أول محرف قويّ — نفس ما يفعله dir="auto" في المتصفح.
   نحسبه بأنفسنا حين نحتاج القرار في JS لا في العرض وحده:
   صندوق الخيار يبدأ بحرف المفتاح، فلو تُرك لـauto لحسم الاتجاه
   بالحرف نفسه — دورٌ مغلق. */
export function dirOf(t){
  /* 🔴 تُسقط الرياضيات قبل البحث: في `\(\frac{1}{2}\)` أولُ محرفٍ
     قويّ هو `f` من `\frac` ⇒ ltr ⇒ optLabel تعطي A B C في مقرَّرٍ
     عربيّ — نقضٌ للقاعدة التي كُتبت لأجلها L_EN نفسها.
     وخيارٌ رياضيّ محضٌ يصير بلا محرفٍ قويّ ⇒ rtl ⇒ أ ب ج. وهو المطلوب. */
  const m = String(t || '').replace(TEX_RX, ' ').match(STRONG);
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
  /* شاشةٌ بلا عنوان ولا وصف كانت تحجز ٢٤px حشواً فارغاً — و.bare تُلغيه.
     والتبديل هنا لا في كل شاشة: head() ممرٌّ إجباريّ لا يُنسى. */
  h.closest("header")?.classList.toggle("bare", !t && !s);
}

/* ── إشعار عابر ── */
export function toast(m){
  const t = document.getElementById("toast");
  t.textContent = m;
  t.classList.add("show");
  setTimeout(()=>t.classList.remove("show"), 2800);
}

/* ── تنسيق خفيف: **غامق** _مائل_ __مسطَّر__ + رياضيات ──
   يُهرَّب النصّ أولاً ثم تُستبدل العلامات — فلا يدخل HTML من
   المؤلّف إطلاقاً. تغطية ما يحتاجه التعليم بلا سطح هجوم.
   🔑 و fmt تبقى **متزامنة ولا ترسم**: تُخرج نائباً نصُّه هو المصدر،
      والرسم يقع في mathBoot. لأنها تُستدعى داخل قوالبَ نصّية في
      عشرات المواضع، وجعلها async يهدم كلّ موضعٍ تُبنى فيه شاشة. */
export function fmt(s){
  const keep = [];

  /* ① اخطف الرياضيات أولاً — فـ_ و^ فيها معنىً آخر:
     fmt تجعل _نص_ مائلاً، و`_` في LaTeX هو الأسّ السفليّ. */
  const held = String(s==null?"":s).replace(TEX_RX, (m, inl, dsp) => {
    keep.push({ tex: inl ?? dsp, blk: dsp != null });
    return "\u0000" + (keep.length - 1) + "\u0000";
  });

  /* ② نسّق ما بقي — بلا تغييرٍ عمّا كان */
  const out = esc(held)
    .replace(/\*\*([^*\n]+)\*\*/g, '<b>$1</b>')
    .replace(/__([^_\n]+)__/g,        '<u>$1</u>')
    .replace(/_([^_\n]+)_/g,          '<i>$1</i>')
    .replace(/\n/g, '<br>');

  /* ③ أعِدها نائباً — والمصدر في النصّ لا في سمة data:
     esc لا تُهرّب علامة الاقتباس، وسمةٌ تحملها تنكسر.
     ⇒ وإن تعذّر تحميل المكتبة بقي المصدر مقروءاً، ولم تُترك
       للطالب فجوةٌ بيضاء في سؤالٍ أثناء اختبار. */
  return out.replace(/\u0000(\d+)\u0000/g, (_, i) => {
    const { tex, blk } = keep[i];
    /* اللفّ هنا لا في يد المؤلّف: \alwaysar نطاقٌ لا أمر، وما يقع
       خارج قوسيها لا يُترجم ولو جاوره. ⇒ التعبير كلُّه لفّةٌ واحدة. */
    const body = (MATH_AR && !/\\alwaysar/.test(tex)) ? `\\alwaysar{${tex}}` : tex;
    const src  = blk ? `\\[${body}\\]` : `\\(${body}\\)`;
    return `<span class="tex${blk ? ' blk' : ''}">${esc(src)}</span>`;
  });
}
/* ── الوسائط ──
   صنفان لا صنف، ولكلٍّ حارسه:
     مفتاحٌ من مخزننا (audio/…) ⇒ موثوقٌ ببنائه — نحن صنعنا الرابط
     رابطٌ خارجيّ (https://…)   ⇒ يمرّ بالقائمة البيضاء كما كان
   ⚠️ ولم نُضف نطاق تخزيننا إلى SAFE عمداً: لو فعلنا، لقُبل أيّ رابط
      Supabase مكتوبٍ يدوياً — مخزنٌ آخر أو مشروعٌ آخر. */
const SAFE = /^https:\/\/(drive\.google\.com|lh3\.googleusercontent\.com|www\.youtube\.com|youtu\.be|i\.imgur\.com)\//;

// يُعرض للمؤلّف حتى لا يضع مصدراً يُحجب صامتاً
export const SAFE_HOSTS = 'مفتاح المخزن (audio/…) · أو Google Drive · YouTube · imgur';

/* المصدر الصالح للعرض — أو null.
   الحارس الوحيد لكل الوسائط: نقطةٌ واحدة تُراجَع وتُختبر. */
export function srcOf(v){
  if(!v) return null;
  if(/["'<>]/.test(v)) return null;        // لا محرفٍ يكسر سمة HTML
  if(isManaged(v))     return mediaUrl(v); // مفتاح
  return SAFE.test(v) ? v : null;          // رابط خارجيّ
}

/* وسيط الفقرة: واحد ونوعه في kind */
export function pgMedia(p){
  if(!p?.media) return '';
  const u = srcOf(p.media);
  if(!u)
    return `<div class="err" style="margin:9px 0">مصدر غير مسموح — المسموح: ${SAFE_HOSTS}</div>`;
  if(p.kind === 'video')
    return `<iframe class="media-v" src="${esc(u)}" allowfullscreen></iframe>`;
  if(p.kind === 'image')
    return `<img class="media" src="${esc(u)}" alt="" loading="lazy">`;
  /* preload=metadata: تُعرف المدّة ولا يُنزَّل الملف حتى يُطلب.
     الطالب على شبكةٍ ضعيفة لا يدفع ثمن مقطعٍ قد لا يشغّله. */
  return `<audio controls preload="metadata" src="${esc(u)}"
                 style="width:100%;margin-bottom:12px"></audio>`;
}

export function media(q){
  let h = "";
  const i = srcOf(q.image), v = srcOf(q.video);
  if(i) h += `<img class="media" src="${esc(i)}" alt="" loading="lazy">`;
  if(v) h += `<iframe class="media-v" src="${esc(v)}" allowfullscreen></iframe>`;
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
  /* شريط عنوان المتصفح في الجوّال يتلوّن بـmeta theme-color لا بـCSS —
     فلو تُرك ثابتاً لبقي كحلياً معلَّقاً فوق صفحةٍ كريمية. */
  const m = document.querySelector('meta[name="theme-color"]');
  if(m) m.content = next === "dark" ? "#07182a" : "#EDE9DF";
  try{ localStorage.setItem("bayan.theme", next); }catch(e){}
}

// active = مفتاح الوجهة الحالية · النقر على النشط يُعيد التحميل
export function nav(active){
  setWide(false);
  const role  = S.roleInfo?.role || S.prof?.role || 'student';
  const dests = DEST[role] || DEST.student;
  /* ⚠️ لا نقرأ hero من className: nav() تسبق head() في أكثر الشاشات،
     فقد نلتقط hero عالقةً من البوابة. نأخذ has-logo وحدها صراحةً. */
  const bEl  = document.getElementById("brand");
  /* بلا has-logo عمداً: ٢٥px لا تكفي لشعارٍ مركَّب، فيظهر الوردمارك
     النصّيّ — حادٌّ في أي مقاس ويتلوّن مع السِمة بلا ملفٍّ ثانٍ. */
  const mark = `<div class="brand topbrand">${bEl.innerHTML}</div>`;
  bar.innerHTML = `<div class="topbar">
    ${mark}
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
/* ── محرّك الرياضيات: يُحمَّل كسولاً عند أول معادلة تُرى ──
   شاشةٌ بلا رياضيات لا تدفع بايتاً واحداً. */
let mjReady = null;
function loadMathJax(){
  if (mjReady) return mjReady;
  return mjReady = new Promise((ok, no) => {
    const css = document.createElement('link');
    css.rel = 'stylesheet'; css.href = ARABIC_EXT + '/arabic.css';
    document.head.appendChild(css);   // الإضافة لا تحمّل تنسيقها بنفسها

    /* الضبط يسبق التحميل، ومسارُ الإضافة داخل AuthorInit:
       MathJax.Ajax لا يوجد قبل التحميل، وضبطُ المسار يجب أن يقع
       قبل أن تبدأ في تحميل إضافاتها. لحظتان متعاكستان — و
       AuthorInit هي الدالّة التي تناديها المكتبة بينهما. */
    window.MathJax = {
      extensions: ["[arabic]/arabic.js"],
      jax: ["input/TeX", "output/CommonHTML"],
      CommonHTML: { undefinedFamily: 'Amiri' },  // ⚠️ اسمٌ واحد لا قائمة — علّة موثَّقة
      showMathMenu: false,
      messageStyle: 'none',
      /* تصريحٌ لازم: يمنع $ أن يصير محدِّداً في أي حال */
      tex2jax: { inlineMath: [['\\(','\\)']], displayMath: [['\\[','\\]']] },
      AuthorInit(){
        MathJax.Ajax.config.path["arabic"] = ARABIC_EXT;
        MathJax.Hub.Register.StartupHook("End", ok);
      }
    };
    const s = document.createElement('script');
    s.src = MATHJAX_SRC; s.onerror = no;
    document.head.appendChild(s);
  });
}

/* الممرّ الإجباريّ — مراقبٌ واحد يُسجَّل مرة في start().
   والبديل نداءٌ بعد كل innerHTML: يُنسى في أوّل شاشة تُكتب بعد
   شهر، فتظهر المعادلات مصدراً خاماً **بلا خطأ في أيّ سجلّ**. */
export function mathBoot(root){
  const draw = () => {
    const list = [...root.querySelectorAll('.tex:not(.done)')];
    if (!list.length) return;                 // ← الحارس: يوقف الدورة
    list.forEach(el => el.classList.add('done'));  // قبل الرسم لا بعده
    loadMathJax()
      .then(() => MathJax.Hub.Queue(["Typeset", MathJax.Hub, list]))
      .catch(() => {});                       // فشل ⇒ يبقى المصدر ظاهراً
  };
  new MutationObserver(draw).observe(root, { childList:true, subtree:true });
  draw();
}
