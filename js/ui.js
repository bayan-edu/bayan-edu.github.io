/* ══════════════════════════════════════════════════════════
   بيان — ui.js
   أدوات العرض المشتركة. لا تتصل بقاعدة البيانات إطلاقاً.
   ══════════════════════════════════════════════════════════ */

import { S } from './state.js';
import { mediaUrl, isManaged } from './media.js';

/* ── بصمة النسخة — لمعرفة أي شيفرة يشغّلها المتصفح فعلاً ── */
export const BUILD = "b86";

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

  export const MATHJAX_SRC = 'vendor/mathjax/MathJax.js?config=TeX-MML-AM_CHTML';
export const ARABIC_EXT  = 'vendor/arabic-mathjax';

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

/* أمثلةٌ متعدّدة في حقلٍ واحد: سطرٌ لكلّ مثال في المحرّر، أو مفصولةٌ
   بـ«؛» في اللصق الجماعي (حيث السطر محجوزٌ لصفٍّ كامل).
   مصدرٌ واحد تستعمله البطاقة واللعبة والمعاينة — فلا ثلاث قواعد تفترق. */
export function examples(note){
  return String(note || '')
    .split(/\r?\n|؛|\s\|\s/)
    .map(s => s.trim())
    .filter(Boolean);
}

/* 🔑 يُنتقى مرّةً لكلّ ظهور لا لكلّ رسم: فلو تغيّر المثال مع كلّ قلبةٍ
   لبدت البطاقة غير مستقرّة. والتنويع بين اللقاءات هو المقصود —
   فمثالٌ ثابت يُحفظ بنصّه، ويصير الطالب يتعرّف الجملة لا المفهوم. */
export function pickExample(note){
  const xs = examples(note);
  return xs.length ? xs[Math.floor(Math.random() * xs.length)] : '';
}

/* حرف الخيار: المخزَّن إن وُجد (i · ii · iii) وإلا يُشتقّ من اتجاهه */
export const optLabel = (o, i) =>
  (o?.label && String(o.label).trim())
  || (dirOf(o?.body) === 'rtl' ? (L[i] || '') : (L_EN[i] || ''));

/* 🔑 مصدرها الحقيقي item_kinds في القاعدة (13_item_kinds.sql) — هذه نسخةٌ
   ثابتة لواجهة الطالب لتفادي نداء شبكةٍ إضافي عند فتح كل درس. أُبقيت
   يدوية عمداً حتى الآن، فإن أُضيف نمطٌ سادس عشر يوماً ولم يُحدَّث هنا،
   يظهر بأيقونة '•' — لا يكسر شيئاً، لكنه صامتٌ وجب أن يُرى:
   الإصلاح الجذريّ (قراءةٌ من item_kinds مباشرة) مؤجَّلٌ لا مقرَّر. */
export const ICONS = { pdf:'📄', video:'🎬', audio:'🎧', image:'🖼️', link:'🔗',
                       text:'📃', quiz:'📝', recording:'🎤',
                       mindmap:'🧠', infographic:'📊', slides:'🖥️',
                       worksheet:'📋', simulation:'⚗️' };

export const KINDS = { pdf:'ملف للقراءة', video:'شرح مرئي', audio:'مقطع صوتي',
                       image:'صورة', link:'مرجع خارجي', text:'نص',
                       quiz:'اختبار تشخيصي', recording:'تسجيل صوتي',
                       mindmap:'خريطة ذهنية', infographic:'إنفوجرافيك',
                       slides:'شرائح عرض', worksheet:'ورقة عمل',
                       simulation:'محاكاة تفاعلية' };

/* ── تحويلات نصية ── */
export const esc  = s => String(s==null?"":s).replace(/&/g,"&amp;").replace(/</g,"&lt;");
export const AR   = n => String(n).replace(/[0-9]/g, d => "٠١٢٣٤٥٦٧٨٩"[+d]);
export const mmss = s => { const m=Math.floor(s/60), x=s%60; return m+":"+(x<10?"0":"")+x; };

export function shrinkFont(face, target, basePx, minPx){
  let px = basePx;
  target.style.fontSize = px + 'px';
  while(face.scrollHeight > face.clientHeight + 1 && px > minPx){
    px -= 0.6; target.style.fontSize = px + 'px';
  }
}

/* ── الترويسة ── */
export function head(t, s, hero){
  /* البوابة وحدها تُخفي الترويسة. وإزالة الصنف هنا لا في كل شاشة:
     head() تُستدعى في كل عرض، فهي المكان الوحيد الذي لا يُنسى. */
  document.body.classList.remove("gate");
  const b = document.getElementById("brand"), h = document.getElementById("head");
  b.classList.toggle("hero", !!hero);
  h.textContent = t || "";
  h.style.display = t ? "" : "none";
  /* ⚠️ والوصفُ يُخفى حين يغيب لا يُفرَّغ: ‎.sub‎ فيها ‎margin-top‎،
     فالفارغُ يحجز حشوَه في صدر كلّ شاشةٍ بلا وصف. وهو نظيرُ ‎.bare‎
     أدناه: لا يُحجز فراغٌ لمحتوًى غير موجود. */
  const sb = document.getElementById("subhead");
  sb.textContent = s || "";
  sb.style.display = s ? "" : "none";
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
       /* لا تلفّ إن صرّح المؤلّف بأيٍّ من الشكلين — لفَّ صريحاً أو تركاً
       صريحاً. والقاعدة ثابتة لا تقرأ عَلَماً ولا مادة: دالّةٌ نقيّة
       ناتجُها من نصّها وحده. */
    const body = (MATH_AR && !/\\(alwaysar|en)\b/.test(tex)) ? `\\alwaysar{${tex}}` : tex;
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
  student: [['subjects','المواد'], ['cards','تذكّرها'], ['perf','الأداء'],
            ['feedback','ملاحظاتي'], ['chat','الرسائل']],
  teacher: [['grade','التصحيح'],   ['students','الأداء'],   ['inbox','الرسائل'],
            ['mySubjects','موادّي'], ['editor','التأليف']],
  admin:   [['requests','الطلبات'], ['students','الأداء'],  ['editor','التأليف'],
            ['grade','التصحيح'],    ['inbox','الرسائل'],     ['mySubjects','موادّي']]
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
  /* شريط عنوان المتصفح في الجوّال يتلوّن بـmeta theme-color لا بـCSS.
     واللونان يسكنان في الوسم نفسه (data-light · data-dark) — لا هنا.
     كانا في ثلاثة مواضع، فتغيّرت الصفحة (b61) وكاد الشريطُ يبقى كريمياً. */
  const m = document.querySelector('meta[name="theme-color"]');
  if(m) m.content = m.dataset[next];
  try{ localStorage.setItem("bayan.theme", next); }catch(e){}
}

/* ══════════════════════════════════════════════════════════════
   الهيكل — الشريط والدرج والجرس  (b65)

   ثلاثة قرارات لا تُقرأ من الشيفرة:

   ① **الوجهاتُ تُخفى والإشاراتُ لا تُخفى.** إخفاء التنقّل يُنقص
      اكتشافه — ثمنٌ مقبولٌ لوجهةٍ يعرفها العائد، ومرفوضٌ لما يقول
      «شيءٌ ينتظرك». ⇒ الجرس خارج الدرج، وأعدادُ الوجهات تظهر على
      بنودها داخله. **يُخفى الطريق لا النداء.**

   ② **الجرس للحدث لا للحال** (قرار `106`). ملاحظةُ معلّمٍ تقع مرّةً
      وتُقرأ فتنتهي؛ والبطاقةُ المستحقّة تتجدّد كلَّ يوم بتصميم FSRS.
      ⇒ المستحقُّ شارةٌ على «تذكّرها» **ولا يدخل الجرس أبداً** —
      وجرسٌ لا يسكت يُعلّم الصَّمَم.

   ③ **الدرج يسكن في `body` لا في `#bar`.** الاختبار يستبدل الشريط
      بعدّاده (`quiz.js`) والبوّابة تُفرغه (`auth.js`)، فلو سكن فيه
      لتبخّر مع أوّل اختبار. ⇒ يُبنى مرّةً، ويُحدَّث نصُّه عند كل تنقّل.

   🔒 وui.js لا تلمس القاعدة: الأعداد تُجلب في `auth.js` وتُسجَّل هنا
      بـregisterCounts — نفس نمط registerRoutes، فتبقى هذه الوحدة ورقةً.
   ══════════════════════════════════════════════════════════════ */

/* أيقوناتٌ خطّية بـcurrentColor. ولا إيموجي هنا خلافاً لـICONS أعلاه:
   وزنُ الإيموجي يختلف بين المنصّات فينكسر الصفّ، ولونُه مخبوزٌ في
   المحرف فلا يتبع السِمة ولا حالةَ البند. */
const ICO = {
  menu:      '<path d="M4 7h16M4 12h16M4 17h11"/>',
  bell:      '<path d="M6.5 9.5a5.5 5.5 0 1111 0c0 3.6 1 5 1.7 5.8H4.8c.7-.8 1.7-2.2 1.7-5.8z"/><path d="M10 19a2 2 0 004 0"/>',
  close:     '<path d="M6 6l12 12M18 6L6 18"/>',
  subjects:  '<path d="M4 5.5A2.5 2.5 0 016.5 3H19v14H6.5A2.5 2.5 0 004 19.5z"/><path d="M4 19.5A2.5 2.5 0 016.5 17H19v4H6.5A2.5 2.5 0 014 19.5z"/>',
  cards:     '<rect x="9" y="3" width="11" height="13" rx="2"/><path d="M6 6.5v10.5a3 3 0 003 3h8"/>',
  perf:      '<path d="M4 4v16h16"/><path d="M8 16.5v-3.5M12 16.5v-8M16 16.5v-5.5"/>',
  feedback:  '<rect x="4" y="4.5" width="16" height="13" rx="2.5"/><path d="M8 9.5h8M8 13h5"/>',
  chat:      '<path d="M20 12.2c0 3.5-3.6 6.3-8 6.3-.95 0-1.87-.13-2.72-.38L4.5 20l1.15-3.15C4.6 15.55 4 13.95 4 12.2 4 8.7 7.6 5.9 12 5.9s8 2.8 8 6.3z"/>',
  grade:     '<rect x="4" y="4" width="16" height="16" rx="3.5"/><path d="M8.5 12.3l2.6 2.6 4.4-5"/>',
  students:  '<circle cx="9.5" cy="8" r="3.2"/><path d="M3.8 19.2a5.7 5.7 0 0111.4 0"/><path d="M16.2 5.6a3.2 3.2 0 010 4.8"/><path d="M17.6 13.6a5.7 5.7 0 012.6 4.3"/>',
  inbox:     '<path d="M4 13.5l2.1-7.2A2 2 0 018 4.8h8a2 2 0 011.9 1.5L20 13.5"/><path d="M4 13.5h4.2l1.1 2.3h5.4l1.1-2.3H20v4a2 2 0 01-2 2H6a2 2 0 01-2-2z"/>',
  mySubjects:'<path d="M7.5 3.5h9A1.5 1.5 0 0118 5v15.3l-6-3.5-6 3.5V5a1.5 1.5 0 011.5-1.5z"/>',
  editor:    '<path d="M4.5 19.5l.9-3.6L16 5.3a2 2 0 012.8 0l.9.9a2 2 0 010 2.8L9.1 19.6l-3.6.9z"/><path d="M14.6 6.7l2.7 2.7"/>',
  requests:  '<circle cx="10" cy="8" r="3.2"/><path d="M4.3 19.2a5.7 5.7 0 0111.4 0"/><path d="M18.5 7v5M21 9.5h-5"/>',
  theme:     '<circle cx="12" cy="12" r="8.2"/><path d="M12 3.8a8.2 8.2 0 010 16.4z" fill="currentColor" stroke="none"/>',
  /* الاستئناف — مثلَّثٌ محدَّدٌ لا ممتلئ: يجاور أيقوناتٍ خطّيةً كلَّها،
     وقرصٌ أسودُ بينها يُقرأ حالةً لا فعلاً. */
  resume:    '<circle cx="12" cy="12" r="8.6"/><path d="M10.4 8.9l4.8 3.1-4.8 3.1z"/>',
  search:    '<circle cx="11" cy="11" r="6.6"/><path d="M15.7 15.7L20 20"/>',
  /* الخروج يتبع اتجاه الصفحة: السهم إلى اليسار لأن العربية تخرج يساراً */
  out:       '<path d="M10.5 4.5H17A2 2 0 0119 6.5v11a2 2 0 01-2 2h-6.5"/><path d="M7.5 15L4.5 12l3-3M4.5 12h8.5"/>'
};

const svg = k => `<svg class="ic" viewBox="0 0 24 24" fill="none" stroke="currentColor"
  stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${ICO[k] || ''}</svg>`;

/* اسمٌ عامٌّ لنفس الدالّة — تستعمله الشاشات، ويبقى svg داخلياً قصيراً.
   ولا نسخةَ ثانية: نفس المرجع باسمين، فلا يفترق الرسمان يوماً. */
export const icon = svg;

/* ══════════════════════════════════════════════════════════════
   أشكال المواد — هويةٌ ثابتة لا حالة  (b66)

   🔴 **الشكل يميّز واللون يخبر.** فلو حملت كلُّ مادةٍ لوناً خاصّاً
      لاستُهلك اللونُ في التمييز ولم يبقَ منه ما يقول «أين أنت من
      هذه المادة». والطالبُ يسأل الثاني يومياً ويحفظ الأولَ مرّة.
      ⇒ ستّةُ أشكالٍ بلا لون، واللونُ يُحقَن من CSS بـ--sh-f/--sh-s.

   ⚠️ ولا تُرتَّب الأشكال بالمعنى: لا «الدائرةُ للرياضيات». التوزيع
      بموضع المادة في القائمة — ثابتٌ ما ثبت ترتيبُها (sort في
      list_subjects)، ومادةٌ تُضاف في الوسط تُزيح ما بعدها. وذاك
      مقبول: الشكلُ يُميّز في الشاشة الواحدة ولا يُحفظ مدى العمر.
      🔓 ولو طُلب ثباتٌ مطلق يوماً فالموضع عمودُ `shape` في `subjects`
         — قرارُ بنيةٍ يُناقَش، لا رقعةٌ تُكتب هنا.

   ⚠️ والحشوُ في viewBox مقصود: الحدُّ ١٫٦px يخرج نصفُه عن المسار،
      ومساراتٌ تلامس ٠ أو ٤٨ تُقصّ حوافُّها في بعض المتصفحات.
   ══════════════════════════════════════════════════════════════ */
const SHAPES = [
  '<circle cx="24" cy="24" r="19"/>',                                    /* دائرة */
  '<polygon points="24,4.5 6.9,14.3 6.9,33.7 24,43.5 41.1,33.7 41.1,14.3"/>', /* سداسي */
  '<rect x="6" y="6" width="36" height="36" rx="11"/>',                  /* مربّع */
  '<polygon points="24,4.5 43.5,24 24,43.5 4.5,24"/>',                   /* معيّن */
  '<polygon points="24,4.5 5.2,18.1 12.4,40.2 35.6,40.2 42.8,18.1"/>',   /* خماسي */
  '<path d="M7 42V20a17 17 0 0134 0v22a3 3 0 01-3 3H10a3 3 0 01-3-3z"/>' /* قوس */
];

/* الباقي مضاعَفٌ ثم مُعاد: `-1 % 6` في جافاسكربت ‎-1‎ لا ‎5‎، وفهرسٌ
   سالبٌ يُخرج undefined فيظهر شكلٌ فارغ بلا خطأ في أيّ سجلّ. */
export const shape = i =>
  `<svg class="sh" viewBox="0 0 48 48" stroke-linejoin="round"
     aria-hidden="true">${SHAPES[((i % SHAPES.length) + SHAPES.length) % SHAPES.length]}</svg>`;

/* ══════════════════════════════════════════════════════════════
   الهياكل الشبحية — الانتظارُ يُرى شكلُه  (b68)

   🔴 **«جارٍ التحميل…» يُفرغ الشاشة، والشبحُ يُبقيها.** سطرٌ رماديٌّ في
      الوسط يمحو كلَّ أثرٍ لما كان ولما سيكون، فيبدأ نظرُ الطالب من
      الصفر في كلّ انتقال — وهو ينتقل عشراتِ المرّات في الجلسة الواحدة.
      والشبحُ يحفظ الهيئة: تستقرّ العينُ حيث سيقع النصّ قبل أن يقع.

   ⚠️ **والشبحُ يطابق ما سيحلّ محلَّه أو لا يُرسم.** شبحٌ مخالفٌ للقادم
      يُحدث قفزةً عند الحلول، وتلك أسوأُ من سطرٍ ساكن. ولذلك تحمل
      البطاقةُ الشبحيّة `subj` نفسها: شبكةُ `#app` تنطبق عليها كما
      تنطبق على الحقيقيّة، فلا يتبدّل عرضٌ ولا عددُ بطاقاتٍ في الصفّ.

   ⚠️ **واللونُ لا يأتي من الحركة.** `prefers-reduced-motion` يُطفئ كلَّ
      `animation` في base.css، فلو حُمِل الظهورُ على الإطار لرأى مَن
      يطلب سكونَ الحركة **شاشةً بيضاء لا شبحاً**. ⇒ القضيب ملوَّنٌ
      بنفسه، واللمعةُ زيادةٌ تسقط وحدها.

   ♿ **والنطقُ يُستردّ صراحةً.** «جارٍ التحميل…» كان يُقرأ لأنه نصّ،
      والقضبانُ زخرفةٌ صامتة. فلولا `role=status` لسمع قارئُ الشاشة
      صمتاً حيث كان يسمع خبراً — عطلٌ لا يراه المبصر أبداً.
   ══════════════════════════════════════════════════════════════ */
const skb = (w, h, more = '') =>
  `<i class="sk-b" style="width:${w};height:${h}px${more}"></i>`;

const rep = (n, f) => Array.from({ length: n }, (_, i) => f(i)).join('');

const SKEL = {
  /* المواد — ترتيبُ القضبان ترتيبُ البطاقة في b66: شكلٌ ثم اسمٌ ثم
     سطرُ الحال ثم الشريط. و`margin-top:auto` على الحال كما في .subj-m
     لتستوي القيعانُ عبر الصفّ الواحد. */
  subjects: n => rep(n ?? 6, () => `<div class="subj sk-card">
      <div class="sh-wrap">${skb('100%', 58, ';border-radius:50%')}</div>
      ${skb('72%', 13, ';margin-top:11px')}
      ${skb('46%', 10, ';margin-top:auto')}
      ${skb('100%', 6, ';margin-top:11px;border-radius:99px')}
    </div>`),

  /* الصفوف — دروسٌ وملاحظاتٌ ورسائل وحِزم. والعروضُ متفاوتةٌ عمداً:
     قضبانٌ متساويةُ الطول تُقرأ جدولاً لا نصّاً منتظَراً. */
  rows: n => rep(n ?? 4, i => `<div class="card sk-card">
      ${skb(`${[64, 48, 71, 55][i % 4]}%`, 14)}
      ${skb(`${[88, 73, 80, 67][i % 4]}%`, 10, ';margin-top:11px')}
      <div class="sk-chips">${
        rep(2 + (i % 2), () => skb('58px', 20, ';border-radius:99px'))}</div>
    </div>`),

  /* المعلّمون — شبكتُهم غيرُ شبكة المواد (٢٨٨px لا ١٥٠)، فلها شبحُها.
     ولو استُعير شبحُ المواد لانقلب عرضُ العمود عند الحلول. */
  mentors: n => rep(n ?? 3, i => `<div class="mentor sk-card">
      ${skb(`${[52, 44, 58][i % 3]}%`, 14)}
      ${skb(`${[70, 62, 66][i % 3]}%`, 10, ';margin-top:10px')}
      ${skb('90%', 10, ';margin-top:9px')}
      ${skb('40%', 10, ';margin-top:12px')}
    </div>`),

  /* شاشةٌ مفردة — فتحُ درسٍ أو اختبارٍ أو لوحة */
  screen: () => `<div class="card sk-card">
      ${skb('54%', 17)}
      ${skb('92%', 11, ';margin-top:14px')}
      ${skb('84%', 11, ';margin-top:8px')}
      ${skb('41%', 11, ';margin-top:8px')}
    </div>`
};

/* ⚠️ النطقُ عنصرٌ مستقلّ لا غلافٌ حولها: بطاقاتُ المواد يجب أن تبقى
   أبناءً مباشرين لـ`#app` وإلا سقطت عنها الشبكة (screens.css ⁶⁶). */
export function skeleton(kind = 'rows', n){
  return `<span class="sr-only" role="status">جارٍ التحميل…</span>`
       + (SKEL[kind] || SKEL.rows)(n);
}

/* الوجهة ← حقلُها في my_counts. و«المستحقّ» هنا لأنه شارةٌ على بندٍ،
   وليس في BELL أدناه لأنه حالٌ لا حدث (القرار ②). */
const NCOUNT = { cards:'due', feedback:'feedback', chat:'messages',
                 inbox:'messages', grade:'grading', requests:'requests' };

/* بنودُ الجرس — [الوجهة · الحقل · النصّ]. ولا يُعرض بندٌ لوجهةٍ ليست
   في دور المستخدم، فيُفرز chat عن inbox بلا شرطٍ على الدور. */
const BELL = [
  ['feedback', 'feedback', n => `${AR(n)} ملاحظة جديدة من معلّمك`],
  ['chat',     'messages', n => `${AR(n)} رسالة جديدة من معلّمك`],
  ['inbox',    'messages', n => `${AR(n)} رسالة من طلابك`],
  ['grade',    'grading',  n => `${AR(n)} إجابة مقالية تنتظر تصحيحك`],
  ['requests', 'requests', n => `${AR(n)} طلب انضمام معلّم`]
];

let countsFetcher = null;
export function registerCounts(fn){ countsFetcher = fn; }

/* تُنادى عند الإقلاع وبعد كلّ فعلٍ يُغيّر عدداً — لا عند كل شاشة.
   ⚠️ وفشلُ الجلب يُبقي العدد القديم ولا يصفّره: رقمٌ قديم أصدقُ من
      صفرٍ مخترع، والصفرُ الكاذب يقول «لا شيء ينتظرك» فيُهمل الطالبُ ما ينتظره. */
export async function refreshCounts(){
  if(!countsFetcher) return;
  try{ S.counts = (await countsFetcher()) || {}; }catch(e){ return; }
  paintCounts();
}

/* يُحدِّث الشارات في مكانها بلا إعادة رسم — فلا يفقد التركيزَ ولا يطبق درجاً مفتوحاً */
function paintCounts(){
  const c = S.counts || {};
  const bdg = document.getElementById('bellBdg');
  if(bdg){
    const n = c.bell || 0;
    bdg.textContent = AR(n);
    bdg.hidden = !n;
    document.getElementById('bellBtn')
      ?.setAttribute('aria-label', n ? `الإشعارات · ${AR(n)} جديدة` : 'الإشعارات · لا جديد');
  }
  document.querySelectorAll('#drawer [data-n]').forEach(el => {
    const n = c[el.dataset.n] || 0;
    el.textContent = AR(n);
    el.hidden = !n;
  });
  const p = document.getElementById('bellPanel');
  if(p && !p.hidden) p.innerHTML = bellHtml();
}

const roleOf  = () => S.roleInfo?.role || S.prof?.role || 'student';
const destsOf = () => DEST[roleOf()] || DEST.student;

/* حرفٌ واحد لا حرفان: «محمود محمد» يُنتج «مم» — تكرارٌ يبدو خطأً
   مطبعياً، والعربية لا تعرف اختصار الاسم بالأحرف أصلاً. */
function initials(name){
  return (String(name || '').trim()[0]) || '؟';
}

const ROLE_AR = { student:'طالب', teacher:'معلّم', admin:'مدير',
                  pending_teacher:'طلبٌ قيد المراجعة' };

function bellHtml(){
  const c = S.counts || {}, keys = destsOf().map(([k]) => k);
  const rows = BELL.filter(([dest, field]) => keys.includes(dest) && (c[field] || 0) > 0);
  if(!rows.length)
    return `<div class="bell-empty">لا جديد — وهذا خبرٌ طيّب</div>`;
  return rows.map(([dest, field, text]) =>
    `<button class="bell-item" data-r="${dest}" role="menuitem">
       <span class="bell-ic">${svg(dest)}</span>
       <span>${text(c[field])}</span>
     </button>`).join('');
}

/* الدرج يُبنى مرّةً في body — انظر القرار ③ */
function ensureDrawer(){
  if(document.getElementById('drawer')) return;
  const scrim = document.createElement('div');
  scrim.id = 'scrim'; scrim.className = 'scrim';
  scrim.onclick = closeDrawer;
  const d = document.createElement('aside');
  d.id = 'drawer'; d.className = 'drawer';
  d.setAttribute('role', 'dialog');
  d.setAttribute('aria-modal', 'true');
  d.setAttribute('aria-label', 'القائمة');
  document.body.append(scrim, d);

  /* نقرةٌ خارج لوحة الجرس تطويها. والدرج له غطاؤه فلا يشترك معها.
     ⚠️ وموضعُه هنا لا في nav(): تلك تُنادى في كلّ شاشة، فمستمعٌ فيها
        يتراكم حتى يصير على المستند عشرون مستمعاً لحدثٍ واحد. */
  document.addEventListener('click', e => {
    const p = document.getElementById('bellPanel');
    if(p && !p.hidden && !e.target.closest('.bellwrap')){
      p.hidden = true;
      document.getElementById('bellBtn')?.setAttribute('aria-expanded', 'false');
    }
  });

  /* حبسُ التركيز والإغلاق بـEsc — على المستند لأن الدرج قد يُعاد رسمه */
  document.addEventListener('keydown', e => {
    if(!document.body.classList.contains('drawer-open')) return;
    if(e.key === 'Escape'){ closeDrawer(); return; }
    if(e.key !== 'Tab') return;
    const f = [...d.querySelectorAll('button:not([disabled])')];
    if(!f.length) return;
    const first = f[0], last = f[f.length - 1];
    if(e.shiftKey && document.activeElement === first){ e.preventDefault(); last.focus(); }
    else if(!e.shiftKey && document.activeElement === last){ e.preventDefault(); first.focus(); }
  });
}

function renderDrawer(active){
  const d = document.getElementById('drawer');
  if(!d) return;
  const prof = S.prof || {};
  d.innerHTML = `
    <div class="drawer-head">
      <div class="who">
        <span class="avatar lg">${esc(initials(prof.full_name))}</span>
        <span class="who-t">
          <b dir="auto">${esc(prof.full_name || 'حسابك')}</b>
          <span>${esc(ROLE_AR[roleOf()] || '')}${
            prof.klass ? ' · ' + esc(prof.klass) : ''}</span>
        </span>
      </div>
      <button class="iconbtn" id="drawerX" aria-label="إغلاق القائمة">${svg('close')}</button>
    </div>
    <nav class="drawer-nav">
      ${destsOf().map(([k, label]) => `
        <button class="drawer-item ${k === active ? 'on' : ''}" data-r="${k}">
          ${svg(k)}<span>${label}</span>
          ${NCOUNT[k] ? `<span class="bdg soft" data-n="${NCOUNT[k]}" hidden></span>` : ''}
        </button>`).join('')}
    </nav>
    <div class="drawer-foot">
      <button class="drawer-item" id="themeBtn">${svg('theme')}<span>تبديل السِمة</span></button>
      <button class="drawer-item danger" data-r="out">${svg('out')}<span>خروج</span></button>
    </div>`;
  d.querySelector('#drawerX').onclick = closeDrawer;
  d.querySelector('#themeBtn').onclick = toggleTheme;
  wire(d);
}

export function closeDrawer(){
  if(!document.body.classList.contains('drawer-open')) return;
  document.body.classList.remove('drawer-open');
  const b = document.getElementById('menuBtn');
  b?.setAttribute('aria-expanded', 'false');
  b?.focus();
}

function openDrawer(){
  ensureDrawer();
  document.body.classList.add('drawer-open');
  document.getElementById('menuBtn')?.setAttribute('aria-expanded', 'true');
  /* بعد الرسم لا قبله، وإلا ذهب التركيز إلى عنصرٍ لم يظهر بعد */
  requestAnimationFrame(() =>
    document.querySelector('#drawer .drawer-item')?.focus());
}

/* ══════════════════════════════════════════════════════════════
   البحث  (b67)

   🔒 وui.js لا تلمس القاعدة — كعادتها. النداء والوجهةُ يُسجَّلان من
      auth.js بـregisterSearch، فتبقى هذه الوحدة ورقةً في شجرة
      الاستيراد بلا دورة. نفس نمط registerCounts و registerRoutes.

   🔴 والعرضُ مجموعٌ بالنوع لا قائمةً مسطّحة. والسبب مقيسٌ لا مذوَّق:
      word_similarity تقارن المكتوبَ بالمنصوص، ونصُّ البطاقة كلمةٌ
      ونصُّ الدرس جملة — فترتفع البطاقةُ فوق الدرس في قائمةٍ واحدة
      وإن كان الدرسُ هو المقصود. والرتبةُ **داخل النوع** صادقة،
      **وبين الأنواع** لا معنى لها. ⇒ تُستعمل حيث تصدُق وتُهمَل
      حيث لا تصدُق: ترتيبُ الأنواع تعليميٌّ ثابت — ما تتعلّم منه
      أوّلاً، ثمّ سجلُّ ما أخطأتَ فيه.
   ══════════════════════════════════════════════════════════════ */

/* [الأيقونة · العنوان] — وترتيبُ المفاتيح هو ترتيبُ المجموعات */
const SKIND = {
  lesson: ['subjects', 'الدروس'],
  item:   ['feedback', 'المصادر'],
  card:   ['cards',    'البطاقات'],
  answer: ['perf',     'أخطاؤك وتشخيصها']
};

let searchRun = null, searchGo = null;
export function registerSearch(run, go){ searchRun = run; searchGo = go; }

/* ⚠️ حارسُ السباق. الكتابةُ السريعة تُطلق نداءاتٍ متتابعة، وردودُها
   تصل بغير ترتيبها — فيغلب ردُّ «الهم» ردَّ «الهمزة» فيرى الطالب
   نتائجَ حرفٍ حذفه. ولا خطأ يظهر: نتائجُ معقولةٌ لسؤالٍ قديم. */
let sSeq = 0, sTimer = null;

function ensureSearch(){
  if(document.getElementById('sbox')) return;
  const b = document.createElement('div');
  b.id = 'sbox'; b.className = 'sbox';
  b.innerHTML = `
    <div class="spanel" role="dialog" aria-modal="true" aria-label="البحث">
      <div class="sbar">
        ${svg('search')}
        <input class="sin" id="sin" type="search" dir="auto" autocomplete="off"
               placeholder="ابحث في الدروس والمصادر والبطاقات وأخطائك"
               aria-label="نصّ البحث" aria-controls="sres">
        <button class="iconbtn" id="sx" aria-label="إغلاق البحث">${svg('close')}</button>
      </div>
      <div class="sres" id="sres" aria-live="polite"></div>
    </div>`;
  document.body.append(b);

  const input = b.querySelector('#sin');
  b.querySelector('#sx').onclick = closeSearch;
  /* نقرةٌ على الخلفية تُغلق، ونقرةٌ داخل اللوحة لا */
  b.onclick = e => { if(e.target === b) closeSearch(); };
  input.oninput = () => askSearch(input.value);

  /* ⚠️ المستمع على الصندوق لا على المستند: nav() تُستدعى في كل شاشة،
     ومستمعٌ فيها يتراكم حتى يصير عشرون لحدثٍ واحد. وهذا يُبنى مرّةً. */
  b.addEventListener('keydown', e => {
    if(e.key === 'Escape'){ e.preventDefault(); closeSearch(); return; }
    if(e.key !== 'ArrowDown' && e.key !== 'ArrowUp') return;
    const rows = [...b.querySelectorAll('.sr')];
    if(!rows.length) return;
    e.preventDefault();
    const i = rows.indexOf(document.activeElement);
    /* السهم الأعلى من أول صفٍّ يعود إلى الحقل لا يقف: الطالب يصحّح
       ما كتب أكثر ممّا يعيد الفتح. */
    const n = e.key === 'ArrowDown' ? Math.min(i + 1, rows.length - 1)
                                    : (i <= 0 ? -1 : i - 1);
    (n < 0 ? input : rows[n]).focus();
  });
}

/* الحدُّ الأدنى حرفان — والقاعدةُ هي الحاكمة لا هذا السطر: search_all
   تُطبّع ثمّ تردّ ما دون حرفين. وهذا يوفّر نداءً لا يُغيّر حكماً،
   فلا يُنسَخ منطقُ التطبيع هنا ليفارق أصلَه يوماً. */
function askSearch(q){
  clearTimeout(sTimer);
  const my = ++sSeq;
  if((q || '').trim().length < 2){ paintSearch(null, ''); return; }
  sTimer = setTimeout(async () => {
    if(!searchRun) return;
    let res;
    try{ res = await searchRun(q); }catch(e){ res = { error:e }; }
    if(my !== sSeq) return;                       // ردٌّ متأخّرٌ لسؤالٍ مضى
    paintSearch(res.error ? null : (res.data || []), q, res.error);
  }, 260);
}

function paintSearch(hits, q, error){
  const box = document.getElementById('sres');
  if(!box) return;

  if(error){ box.innerHTML = errBox(error, 'البحث'); return; }
  if(hits === null){
    box.innerHTML = `<div class="s-msg"><b>اكتب حرفين فأكثر</b>
      يبحث في دروسك ومصادرها وبطاقاتك — وفي أخطائك وتشخيصها.
      وتستطيع كتابة نوع الخطأ نفسه.</div>`;
    return;
  }
  if(!hits.length){
    box.innerHTML = `<div class="s-msg"><b>لا شيء يطابق «${esc(q)}»</b>
      جرّب كلمةً واحدة، أو جذر الكلمة بلا سوابقَ ولواحق.</div>`;
    return;
  }

  box.innerHTML = Object.entries(SKIND).map(([kind, [ic, label]]) => {
    const rows = hits.filter(h => h.kind === kind);
    if(!rows.length) return '';
    return `<div class="sgrp">${label}<i>${AR(rows.length)}</i></div>` +
      rows.map((h, i) => `
        <button class="sr" data-k="${esc(kind)}" data-i="${esc(String(i))}">
          <span class="sr-ic">${svg(ic)}</span>
          <span class="sr-b">
            <span class="sr-t" dir="auto">${esc(h.title || '')}</span>
            ${(h.subject || h.snippet) ? `<span class="sr-s" dir="auto">${
              esc([h.subject, h.snippet].filter(Boolean).join(' · '))}</span>` : ''}
            ${h.dx ? `<span class="sr-dx" dir="auto">${esc(h.dx)}</span>` : ''}
          </span>
        </button>`).join('');
  }).join('');

  box.querySelectorAll('.sr').forEach(el => el.onclick = () => {
    const hit = hits.filter(h => h.kind === el.dataset.k)[+el.dataset.i];
    closeSearch();
    if(hit && searchGo) searchGo(hit);
  });
}

export function openSearch(){
  ensureSearch();
  closeDrawer();
  const p = document.getElementById('bellPanel'); if(p) p.hidden = true;
  document.body.classList.add('search-open');
  /* بعد الرسم لا قبله: عنصرٌ ما زال visibility:hidden لا يقبل التركيز */
  requestAnimationFrame(() => {
    const i = document.getElementById('sin');
    if(i){ i.select(); i.focus(); }
    if(!document.getElementById('sres').innerHTML) paintSearch(null, '');
  });
}

export function closeSearch(){
  if(!document.body.classList.contains('search-open')) return;
  sSeq++;                                   // يُلغي ردّاً في الطريق
  clearTimeout(sTimer);
  document.body.classList.remove('search-open');
  document.getElementById('searchBtn')?.focus();
}

/* «/» يفتح البحث — ولا يُسرَق المحرف ممّن يكتبه في حقل.
   ويُسجَّل مرّةً واحدة عند أول nav()، لا في كل شاشة. */
let slashOn = false;
function bindSlash(){
  if(slashOn) return; slashOn = true;
  document.addEventListener('keydown', e => {
    if(e.key !== '/' || e.ctrlKey || e.metaKey || e.altKey) return;
    if(document.body.classList.contains('gate')) return;
    if(document.body.classList.contains('search-open')) return;
    const t = e.target;
    if(t && (t.isContentEditable || /^(INPUT|TEXTAREA|SELECT)$/.test(t.tagName))) return;
    e.preventDefault();
    openSearch();
  });
}

function toggleBell(){
  const p = document.getElementById('bellPanel'), b = document.getElementById('bellBtn');
  if(!p) return;
  const show = p.hidden;
  p.hidden = !show;
  b.setAttribute('aria-expanded', String(show));
  if(show){ p.innerHTML = bellHtml(); wire(p); p.querySelector('button')?.focus(); }
}

/* ممرٌّ واحد للتوجيه: كلُّ [data-r] يُغلق ما فُتح ثم يذهب.
   والإغلاق قبل الذهاب لا بعده — فالشاشة الجديدة تُرسم وقد خلا الطريق. */
function wire(root){
  root.querySelectorAll('[data-r]').forEach(b => b.onclick = () => {
    const go = ROUTES[b.dataset.r];
    closeDrawer();
    const p = document.getElementById('bellPanel');
    if(p) p.hidden = true;
    if(go) go();
  });
}

// active = مفتاح الوجهة الحالية · النقر على النشط يُعيد التحميل
export function nav(active){
  setWide(false);
  /* ⚠️ لا نقرأ hero من className: nav() تسبق head() في أكثر الشاشات،
     فقد نلتقط hero عالقةً من البوابة. نأخذ has-logo وحدها صراحةً. */
  const bEl  = document.getElementById("brand");
  /* has-logo صار مقصوداً هنا — لا غائباً كالسابق: الشعار متجهٌ حقيقيّ
     الآن بنسخةٍ compact مبسّطة لأجل الأحجام الصغيرة، فيبقى حادّاً عند
     ٢٥px بلا حاجةٍ للوردمارك النصّيّ الذي كان يعوّض عن الصورة القديمة. */
  const mark = `<div class="brand topbrand has-logo">${bEl.innerHTML}</div>`;

  bar.innerHTML = `<div class="topbar">
    <button class="iconbtn" id="menuBtn" aria-label="القائمة"
            aria-expanded="false" aria-controls="drawer">${svg('menu')}</button>
    ${mark}
    <span class="topgap"></span>
    <button class="iconbtn" id="searchBtn" aria-label="البحث">${svg('search')}</button>
    <span class="bellwrap">
      <button class="iconbtn" id="bellBtn" aria-label="الإشعارات"
              aria-expanded="false" aria-haspopup="menu">${svg('bell')}<span
        class="bdg" id="bellBdg" hidden></span></button>
      <div class="bellpanel" id="bellPanel" role="menu" hidden></div>
    </span>
    <button class="acct" id="acctBtn" aria-label="حسابك والقائمة">
      <span class="avatar">${esc(initials(S.prof?.full_name))}</span>
      <span class="acct-n" dir="auto">${esc((S.prof?.full_name || '').split(/\s+/)[0] || '')}</span>
    </button>
  </div>`;

  ensureDrawer();
  ensureSearch();
  bindSlash();
  renderDrawer(active);
  paintCounts();

  bar.querySelector('#searchBtn').onclick = openSearch;
  bar.querySelector('#menuBtn').onclick = openDrawer;
  bar.querySelector('#acctBtn').onclick = openDrawer;   // بابان لغرفةٍ واحدة — لا قائمتان
  bar.querySelector('#bellBtn').onclick = toggleBell;
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
             /* ماكرو تمرير: \en{…} يمرّ محتواه كما هو، ووجودُه وحده هو
         الإشارة إلى fmt بألّا تلفّ. ⇒ الباب اللاتينيّ في مقرَّرٍ عربيّ. */
      /* ماكرو تمرير: \en{…} يمرّ محتواه كما هو، ووجودُه وحده هو
         الإشارة إلى fmt بألّا تلفّ. ⇒ الباب اللاتينيّ في مقرَّرٍ عربيّ.
         🔑 ورموز المنهج (ت · ح · ك · ص) تُكتب حروفاً في المصدر لا ماكرو:
            قِيس أن الناتج واحد، والحرف يعرفه المؤلّف والماكرو لا. */
      TeX: { Macros: { en: ['#1', 1] } },
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
