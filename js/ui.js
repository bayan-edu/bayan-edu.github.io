/* ══════════════════════════════════════════════════════════
   بيان — ui.js
   أدوات العرض المشتركة. لا تتصل بقاعدة البيانات إطلاقاً.
   ══════════════════════════════════════════════════════════ */

import { S } from './state.js';
import { mediaUrl, isManaged } from './media.js';
import { renderMark, whenReady as avatarReady } from './avatar.js';

/* ── بصمة النسخة — لمعرفة أي شيفرة يشغّلها المتصفح فعلاً ── */
export const BUILD = "b120";

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
   الإصلاح الجذريّ (قراءةٌ من item_kinds مباشرة) مؤجَّلٌ لا مقرَّر.

   🆕 b106 · وكانت إيموجي (📄 🎬 🎧 …) فصارت متجهاتٍ من `ICO`. والحجّة
   مكتوبةٌ عند `ICO` منذ كُتبت: **الإيموجي يرسمه نظام التشغيل**، فوزنُه
   يختلف بين المنصّات وينكسر الصفّ، ولونُه مخبوزٌ في المحرف فلا يتبع
   السِمة ولا حالةَ البند — وهو خارج عائلات المعنى الخمس كلِّها.
   ⚠️ والبديلُ عند نمطٍ مجهول يبقى '•' نصّاً: `ICONS[k] || '•'` منتشرةٌ
   في ثلاثة مواضع، والفراغُ فيها يُسقط الصفّ بلا صوت.
   📌 **وتُبنى تحت `ICO` لا هنا** — فهي مشتقّةٌ منها، ومصدرٌ واحد لرسمٍ
   واحد. وموضعُ التعليق هنا لأنّ القارئ يبحث عنها مع `KINDS`. */
export let ICONS;

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
     head() تُستدعى في كل عرض، فهي المكان الوحيد الذي لا يُنسى.
     🆕 b95 · و`screen` تُضاف معها — معناها «شاشةٌ رسمتها الشيفرة».
     وبها يُخفى تذييلُ الخصوصية خارج البوّابة **إثباتاً لا نفياً**،
     فيبقى الرابط في HTML الساكن إن تعطّلت جافاسكربت أو قبل أن تعمل.
     التعليل كاملاً عند `.site-foot` في base.css. */
  document.body.classList.remove("gate");
  document.body.classList.add("screen");
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

/* 🆕 b103 · وجهةٌ تُطلب من داخل شاشة — بالمُوجِّه نفسِه الذي يخدم الدرج.
   ولولاها لاستوردت كلُّ شاشةٍ شاشةَ وجهتها مباشرةً، **فتنشأ دوراتُ
   استيرادٍ يوم تُشير إحداهما إلى الأخرى.** */
export function goRoute(key){
  const go = ROUTES[key];
  if(go) go();
}

const DEST = {
  student: [['subjects','المواد'], ['cards','تذكّرها'], ['perf','الأداء'],
            ['feedback','ملاحظاتي'], ['chat','الرسائل']],
  teacher: [['grade','التصحيح'],   ['students','الأداء'],   ['inbox','الرسائل'],
            ['mySubjects','موادّي'], ['editor','التأليف']],
  /* 🔓 b90 · «الطلبات» تقاعدت من شريط المدير: لم يعد أحدٌ يصل
     `pending_teacher` — `register_teacher` تمنح الدور فوراً، والتأليفُ
     يُحرسه تحقّقُ البريد (120). واللوحةُ وجداولُها باقيةٌ في القاعدة
     بلا حذف — تقاعدٌ رخيصٌ قابلٌ للتراجع، لا هجرةُ بيانات.
     🟡 وطرفٌ مكشوفٌ يُقال: `request_teacher_access` ما زالت ممنوحةً
        ويمكن نداؤها مباشرةً فتُنتج `pending_teacher` بلا لوحةٍ تبتّ
        فيه. لا تناديها الواجهة، ويُسحب منحُها في ملفٍّ تالٍ. */
  admin:   [['students','الأداء'],  ['editor','التأليف'],
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
  /* 🆕 b103 · الملفّ — شخصٌ مفردٌ لا مجموعة: `students` جماعةٌ يراها
     المعلّم، و`perf` مخطَّطٌ. وأيقونةٌ واحدةٌ لبندين تُربك أكثر ممّا تُوفّر. */
  profile:   '<circle cx="12" cy="8" r="3.6"/><path d="M5.2 19.4a6.8 6.8 0 0113.6 0"/>',
  /* 🆕 b107 · قلمُ العلامة — **نسخةُ الحجم الصغير من `editor`، لا معنًى
     ثانٍ له**: يُرسم عند ١٢px في قرصٍ على الصورة، وتفاصيلُ `editor`
     (الشقُّ والحدُّ الفاصل) تذوب هناك فتصير خربشة. ونفسُ منطق الشعار:
     نسخةٌ مبسّطة لأجل الأحجام الصغيرة لا رسمٌ آخر. */
  pen:       '<path d="M5 19l1-3.4L15.6 6l2.4 2.4L8.4 18z"/>',
  theme:     '<circle cx="12" cy="12" r="8.2"/><path d="M12 3.8a8.2 8.2 0 010 16.4z" fill="currentColor" stroke="none"/>',
  /* الاستئناف — مثلَّثٌ محدَّدٌ لا ممتلئ: يجاور أيقوناتٍ خطّيةً كلَّها،
     وقرصٌ أسودُ بينها يُقرأ حالةً لا فعلاً. */
  resume:    '<circle cx="12" cy="12" r="8.6"/><path d="M10.4 8.9l4.8 3.1-4.8 3.1z"/>',
  search:    '<circle cx="11" cy="11" r="6.6"/><path d="M15.7 15.7L20 20"/>',
  /* الخروج يتبع اتجاه الصفحة: السهم إلى اليسار لأن العربية تخرج يساراً */
  out:       '<path d="M10.5 4.5H17A2 2 0 0119 6.5v11a2 2 0 01-2 2h-6.5"/><path d="M7.5 15L4.5 12l3-3M4.5 12h8.5"/>',

  /* ── أنماط المصادر (b106) — كانت إيموجي في ICONS، والتعليق فوقها
     يقول لماذا لا تصلح: وزنُها يختلف بين المنصّات فينكسر الصفّ،
     ولونُها مخبوزٌ في المحرف فلا يتبع السِمة ولا حالةَ البند.
     🔑 ومفاتيحها أسماءُ `item_kinds` نفسها، فلا خريطةَ ثانية بينهما. */
  pdf:        '<path d="M6.5 3.5h7L18.5 8v12a1.5 1.5 0 01-1.5 1.5H6.5A1.5 1.5 0 015 20V5a1.5 1.5 0 011.5-1.5z"/><path d="M13.3 3.6V8h4.9"/><path d="M8.3 12.4h5.6M8.3 15.6h5.6M8.3 18.2h3.4"/>',
  video:      '<rect x="3.2" y="5" width="17.6" height="14" rx="2.6"/><path d="M10.3 9.4l5 2.6-5 2.6z"/>',
  audio:      '<path d="M4.6 14.4v-2.6a7.4 7.4 0 0114.8 0v2.6"/><path d="M4.6 13.4h1.9a1 1 0 011 1v3.2a1 1 0 01-1 1H5.8a1.2 1.2 0 01-1.2-1.2z"/><path d="M19.4 13.4h-1.9a1 1 0 00-1 1v3.2a1 1 0 001 1h.7a1.2 1.2 0 001.2-1.2z"/>',
  image:      '<rect x="3.4" y="4.8" width="17.2" height="14.4" rx="2.4"/><circle cx="8.6" cy="9.8" r="1.7"/><path d="M3.6 16.7l4.3-4a2 2 0 012.7 0l3.2 3 2-1.8a2 2 0 012.7 0l2.1 2"/>',
  link:       '<path d="M10.2 13.8a3.6 3.6 0 005.4.4l2.6-2.6a3.6 3.6 0 00-5.1-5.1l-1.5 1.5"/><path d="M13.8 10.2a3.6 3.6 0 00-5.4-.4l-2.6 2.6a3.6 3.6 0 005.1 5.1l1.5-1.5"/>',
  text:       '<path d="M5.5 5.2h13"/><path d="M12 5.4v13.4"/><path d="M9.2 18.8h5.6"/>',
  quiz:       '<rect x="4.4" y="4" width="15.2" height="16" rx="2.4"/><path d="M8 9.6l1.5 1.5 2.6-2.8"/><path d="M8 15.4l1.5 1.5 2.6-2.8"/><path d="M14.4 10h2.4M14.4 15.8h2.4"/>',
  recording:  '<rect x="9" y="3.2" width="6" height="10.4" rx="3"/><path d="M5.8 11.6a6.2 6.2 0 0012.4 0"/><path d="M12 17.8v3"/>',
  mindmap:    '<circle cx="12" cy="12" r="2.8"/><circle cx="5" cy="5.6" r="2.1"/><circle cx="19" cy="5.6" r="2.1"/><circle cx="19" cy="18.4" r="2.1"/><path d="M6.6 7.2l3.5 3.1M17.4 7.2l-3.5 3.1M17.5 16.9l-3.6-3"/>',
  infographic:'<path d="M4 20h16"/><rect x="5.6" y="12" width="3.4" height="6" rx="1"/><rect x="10.3" y="7.6" width="3.4" height="10.4" rx="1"/><rect x="15" y="10" width="3.4" height="8" rx="1"/>',
  slides:     '<rect x="3.2" y="4.2" width="17.6" height="12" rx="2.2"/><path d="M12 16.4v3.4"/><path d="M8.8 19.8h6.4"/>',
  worksheet:  '<path d="M6.6 3.6h10.8A1.4 1.4 0 0118.8 5v14a1.4 1.4 0 01-1.4 1.4H6.6A1.4 1.4 0 015.2 19V5a1.4 1.4 0 011.4-1.4z"/><path d="M8.4 8h7.2M8.4 11.6h7.2M8.4 15.2h4.2"/>',
  simulation: '<path d="M10.2 3.6v5.5L5.6 17a2.2 2.2 0 001.9 3.4h9a2.2 2.2 0 001.9-3.4l-4.6-7.9V3.6"/><path d="M9 3.6h6"/><path d="M7.7 14.2h8.6"/>'
};

const svg = k => `<svg class="ic" viewBox="0 0 24 24" fill="none" stroke="currentColor"
  stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${ICO[k] || ''}</svg>`;

/* اسمٌ عامٌّ لنفس الدالّة — تستعمله الشاشات، ويبقى svg داخلياً قصيراً.
   ولا نسخةَ ثانية: نفس المرجع باسمين، فلا يفترق الرسمان يوماً. */
export const icon = svg;

/* أيقونات أنماط المصادر — مشتقّةٌ من ICO لا مكتوبةٌ ثانية (التعليل عند
   تصريحها فوق، مع KINDS حيث يبحث عنها القارئ). */
ICONS = Object.fromEntries(
  ['pdf','video','audio','image','link','text','quiz','recording',
   'mindmap','infographic','slides','worksheet','simulation']
  .map(k => [k, svg(k)]));

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
  return `<span class="sr-only" role="status">جار التحميل…</span>`
       + (SKEL[kind] || SKEL.rows)(n);
}

/* الوجهة ← حقلُها في my_counts. و«المستحقّ» هنا لأنه شارةٌ على بندٍ،
   وليس في BELL أدناه لأنه حالٌ لا حدث (القرار ②). */
const NCOUNT = { cards:'due', feedback:'feedback', chat:'messages',
                 inbox:'messages', grade:'grading', requests:'requests' };

/* بنودُ الجرس — [الوجهة · الحقل · النصّ]. ولا يُعرض بندٌ لوجهةٍ ليست
   في دور المستخدم، فيُفرز chat عن inbox بلا شرطٍ على الدور. */
const BELL = [
  /* 🆕 124 · «من معلّمك» سقطت — **ولا صيغةَ لها أصلاً**: الجرسُ عامٌّ
     على المواد كلّها، وللطالب معلّمٌ في كلّ مادة. فواحدٌ مفردٌ خبرٌ
     غيرُ صادق قبل أن يكون صيغةً خاطئة. ⇒ يُسمّى **موضعُ الجديد**. */
  ['feedback', 'feedback', n => `${N(n,'ملاحظة جديدة','ملاحظتان جديدتان','ملاحظات جديدة','ملاحظة جديدة')} على إجاباتك`],
  ['chat',     'messages', n => `${N(n,'رسالة جديدة','رسالتان جديدتان','رسائل جديدة','رسالة جديدة')} في مراسلاتك`],
  ['inbox',    'messages', n => `${N(n,'رسالة','رسالتان','رسائل','رسالة')} من طلابك`],
  ['grade',    'grading',  n => `${N(n,'إجابة مقالية','إجابتان مقاليتان','إجابات مقالية','إجابة مقالية')} تنتظر تصحيحك`],
  ['requests', 'requests', n => `${N(n,'طلب','طلبان','طلبات','طلب')} انضمام معلّم`]
];

let countsFetcher = null;
export function registerCounts(fn){ countsFetcher = fn; }

/* 🔒 وكاتبُ صيغة المخاطبة مثلُه — `ui.js` لا تلمس القاعدة (الثابت ①).
   يُسجَّل من `auth.js`، فتبقى هذه الوحدة ورقةً في شجرة الاستيراد. */
let gramSetter = null;
export function registerGram(fn){ gramSetter = fn; }

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

/* ═══════════ خانةُ العلامة (125) ═══════════
   🔓 **وحلّت محلّ `initials()`** — كانت تأخذ أوّل حرفٍ بلا قاعدة، فتُعطي
      «ا» لكلّ من عُرّف اسمُه و«إ» لإبراهيم. والقاعدةُ العربية صارت في
      `avatarLetter` مع تطبيع الهمزات وتجاوز «ال» ومسارٍ لاتينيّ.
   🔴 **والخانةُ ليست زينةً في المُصيِّر:** العلامةُ تُقاس من مِداد الخطّ،
      وأوّلُ رسمٍ قد يقع **قبل تحميل Almarai** فيُقاس خطُّ الاحتياط.
      ⇒ تُحاط بعنصرٍ يُعاد ملؤه مرّةً عند جاهزية الخطّ. ولولا ذلك لرأى
         المستخدمُ حرفاً منزاحاً ثمّ لا يفهم لماذا استقام بعد لحظة. */
const markSlot = (prof, size) =>
  `<span class="av-slot" data-s="${size}">${renderMark(prof, size)}</span>`;

let _marksSynced = false;
function syncMarks(){
  if(_marksSynced) return;
  _marksSynced = true;
  avatarReady().then(() => {
    document.querySelectorAll('.av-slot').forEach(el => {
      el.innerHTML = renderMark(S.prof || {}, +el.dataset.s || 32);
    });
  });
}

/* ═══════════ صيغةُ المخاطبة — طبقةُ النصّ (123 · 124) ═══════════

   `G(g, m, f, n)` — دالّةٌ نقيّة: `g` قيمةُ `gram_gender` لا ملفٌّ شخصيّ.

   🔑 **ولماذا قيمةٌ لا ملفّ:** الجملةُ الواحدة قد تحتاج صيغتين معاً —
      «انضممتِ إلى أ. هدى» فيها صيغةُ الطالبة وصيغةُ المعلّمة. فلا ملفَّ
      واحدٌ يسعهما، والحقلُ يُقرأ في اتّجاهين: عن صاحبه، وعنه في نصّ غيره.
      ولذلك حُمل `g` في حمولات `list_mentors` و`my_mentor` و`list_subjects`
      و`choose_mentor` (124).

   🔑 **والقاعدة الحاكمة: حيث تُمكن المحايدةُ تُكتب محايدةً من الأصل،
      ولا تُستدعى هذه الدالّةُ أصلاً.** كلُّ نداءٍ هنا **ضريبةُ كتابةٍ
      دائمة**: كلُّ نصٍّ جديد بعده يتضاعف. وليست مهمّةً تُنجَز مرّة.

   🔴 **والغيابُ يُصاح به ولا يُسكَت عنه.** لو رُدَّ المذكَّرُ صامتاً عند
      `null` لعاد الافتراضُ الذي بُني العمودُ كلُّه لمنعه — فمن نسي كتابة
      المحايدة يُقال له، مرّةً لكلّ نصّ. **والخطأ الصاخب يُصلَح، والصامت
      يُصدَّق.** */
const _gWarned = new Set();
export function G(g, m, f, n){
  if(g === 'f') return f;
  if(g === 'm') return m;
  if(n !== undefined) return n;
  if(!_gWarned.has(m)){
    _gWarned.add(m);
    console.warn('[بيان · 123] نصّ بلا صيغة محايدة، فرُدّ المذكّر:', m);
  }
  return m;
}

/* ══════════════════════════════════════════════════════════════
   N · العدد والمعدود — دالّةٌ نقيّةٌ ثانية بجانب G()  (b106)

   🔑 **تحسم عند كتابة الرقم ما حسمته G() عند كتابة الصيغة.** وكانت
      الشيفرة تكتب المعدودَ مفرداً منصوباً لكلّ عدد — «٧ درساً» ·
      «٣ طالباً» — وهو خطأٌ نحويٌّ **يقرؤه الطالب** في بطاقة المادّة
      وفي كلّ لوحة.

   والصوابُ يتبع العدد:  ١ بلا عدد · ٢ مثنّى · ٣–١٠ جمعٌ مجرور ·
   ١١–٩٩ مفردٌ منصوب · ١٠٠ فصاعداً مفردٌ مجرور. والمركَّبُ يتبع
   آخرَه: ١٠٥ ⇒ «دروس» · ١١٥ ⇒ «درساً» — ولهذا `% 100`.

   📌 **وسابقتُها في المستودع لا خارجَه:** `card_game_match.js:59`
      فرّقت أربعَ حالاتٍ بيدها (بلا خدش · خدشٌ واحد · خدشان · خدوش).
      فهذه تعميمُ ما عمل هناك، لا اختراعُ نمطٍ جديد.

   ⚠️ **ولا تُستدعى حيث لا معدود:** «٧٥٪» و«٥ / ٧» ليسا عدداً ومعدوداً.
   ══════════════════════════════════════════════════════════════ */

/* الكلمةُ وحدها — لمن كتب الرقمَ بنفسه (كسرٌ · «س من ص» · صفٌّ ضيّق) */
export const NW = (n, one, two, few, many) => {
  const r = Math.abs(Number(n) || 0) % 100;
  return r >= 3 && r <= 10 ? few : r < 3 ? one : many;
};

/* العبارةُ كاملةً — وهي الأصل. والواحدُ والاثنان بلا رقمٍ لأنّ العربية
   لا تقول «١ درس» ولا «٢ درسان»: الصيغةُ نفسُها تحمل العدد. */
export function N(n, one, two, few, many){
  const v = Math.abs(Number(n) || 0);
  if(v === 1) return one;
  if(v === 2) return two;
  return `${AR(n)} ${NW(v, one, two, few, many)}`;
}

/* اسمُ الدور — ومحايدُه **فراغ** لا مذكّر: الدرجُ يعرض تحته الصفَّ أو
   المدرسة، فيبقى السطرُ ذا معنًى بلا كلمة الدور. ولو رُدَّ «طالب» عند
   الغياب لخاطب تسعةَ عشرَ حساباً قائماً بصيغةٍ لم يختاروها. */
const roleWord = (role, g) =>
  role === 'student'         ? G(g, 'طالب', 'طالبة', '')
: role === 'teacher'         ? G(g, 'معلّم', 'معلّمة', '')
: role === 'admin'           ? G(g, 'مدير', 'مديرة', '')
: role === 'pending_teacher' ? 'طلب قيد المراجعة'
:                              '';

function bellHtml(){
  const c = S.counts || {}, keys = destsOf().map(([k]) => k);
  const rows = BELL.filter(([dest, field]) => keys.includes(dest) && (c[field] || 0) > 0);
  if(!rows.length)
    return `<div class="bell-empty">لا جديد — وهذا خبر طيّب</div>`;
  return rows.map(([dest, field, text]) =>
    `<button class="bell-item" data-r="${dest}" role="menuitem">
       <span class="bell-ic">${svg(dest)}</span>
       <span>${text(c[field])}</span>
     </button>`).join('');
}

/* الشعار — يُستنسخ من `#brand` حيث لزم: الشريطُ ورأسُ الدرج (b107).
   ⚠️ ولا نقرأ صنفَ العنصر كما هو: `nav()` تسبق `head()` في أكثر
      الشاشات، فقد نلتقط `hero` عالقةً من البوّابة. ⇒ الأصنافُ تُكتب
      هنا صراحةً، ولا يُؤخذ من الوسم إلا متّجهُه.
   📌 و`has-logo` مقصودةٌ لا غائبة: الشعار متّجهٌ حقيقيّ بنسخةٍ
      `compact` مبسّطة لأجل الأحجام الصغيرة، فيبقى حادّاً عند ٢٥px
      بلا حاجةٍ إلى الوردمارك النصّيّ الذي كان يعوّض عن الصورة القديمة. */
const brandMark = () =>
  `<div class="brand topbrand has-logo">${document.getElementById('brand')?.innerHTML || ''}</div>`;

/* ══════════════════════════════════════════════════════════════
   اللوحتان المتدلّيتان — الجرس وقائمة الحساب  (b107)

   🔓 **بابان لغرفتين، بعد أن كانا باباً لغرفةٍ واحدة.** كان زرُّ الحساب
      يفتح الدرجَ نفسَه، وعلّلناه بـ«بابان لغرفةٍ واحدة لا قائمتان».
      والنقضُ أنّ الغرفتين اثنتان لا واحدة: من نقر ☰ يسأل **أين أذهب**،
      ومن نقر صورتَه يسأل **ما شأن حسابي**. فكان الثاني يُفتح له درجُ
      الوجهات ويبحث عن «ملفّي» في ذيله. ⇒ الوجهةُ تُطلب من ☰،
      والحسابُ يُطلب من صورته.

   ⚠️ **ولوحةٌ تُفتح تطوي أختَها.** اللوحتان تتدلّيان من طرفي الشريط
      وعرضُ كلٍّ منهما ٣٠٠px، فشريطُ جوّالٍ لا يسعهما معاً.

   📌 والجرسُ يبقى **خارج** الاثنين كما كان (القرار ①): يُخفى الطريق
      لا النداء.
   ══════════════════════════════════════════════════════════════ */
const POP = {
  bell: ['bellPanel', 'bellBtn', '.bellwrap'],
  acct: ['acctPanel', 'acctBtn', '.acctwrap']
};

const popOpen = k => {
  const p = document.getElementById(POP[k][0]);
  return !!p && !p.hidden;
};

/* refocus: يُعاد التركيز إلى زرّها — لمن أغلق بـEsc، وإلا ضاع تركيزُه
   في أوّل الصفحة بلا خبر. ولا يُعاد عند النقر خارجها: الفأرةُ ذهبت
   إلى ما نقرته، فسحبُ التركيز منه يخطف ما قصده. */
function shutPop(k, refocus){
  if(!popOpen(k)) return;
  document.getElementById(POP[k][0]).hidden = true;
  const b = document.getElementById(POP[k][1]);
  b?.setAttribute('aria-expanded', 'false');
  if(refocus) b?.focus();
}

function closePops(){ Object.keys(POP).forEach(k => shutPop(k)); }

function togglePop(k, render){
  const show = !popOpen(k);
  closePops();
  if(!show) return;
  const p = document.getElementById(POP[k][0]);
  if(!p) return;
  render(p);
  p.hidden = false;
  document.getElementById(POP[k][1])?.setAttribute('aria-expanded', 'true');
  /* ⚠️ أوّلُ **بند** لا أوّلُ زرّ: قائمةُ الحساب قد تحمل سؤالَ الصيغة
     قبل بنودها، وإنزالُ التركيز على «أنا طالب» يجعل مسافةً واحدة
     جواباً عن سؤالٍ لم يُقرأ. */
  (p.querySelector('.menu-item') || p.querySelector('button'))?.focus();
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
  d.setAttribute('aria-label', 'التنقّل');   // اسمان لقائمتين — لا «القائمة» لكليهما
  document.body.append(scrim, d);

  /* نقرةٌ خارج لوحةٍ متدلّية تطويها — وللدرج غطاؤه فلا يشترك معهما.
     ⚠️ وموضعُه هنا لا في nav(): تلك تُنادى في كلّ شاشة، فمستمعٌ فيها
        يتراكم حتى يصير على المستند عشرون مستمعاً لحدثٍ واحد. */
  document.addEventListener('click', e => {
    const t = e.target;
    if(!(t instanceof Element)) return;
    Object.keys(POP).forEach(k => { if(!t.closest(POP[k][2])) shutPop(k); });
  });

  /* حبسُ التركيز والإغلاق بـEsc — على المستند لأن الدرج قد يُعاد رسمه */
  document.addEventListener('keydown', e => {
    /* واللوحةُ المتدلّية أولى بالإغلاق: التركيزُ فيها، وهي لا تُفتح
       مع الدرج أصلاً. ولذلك تسبق حارسَ `drawer-open` أدناه. */
    if(e.key === 'Escape')
      for(const k of Object.keys(POP))
        if(popOpen(k)){ shutPop(k, true); return; }
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

/* ═══════════ السؤالُ مرّةً — لمن لم يُسأل (123 · 125) ═══════════

   التسعةَ عشرَ القائمون سجّلوا قبل العمود، فصيغتُهم `null`. ومستوى
   النصّ يعاملهم بالمحايدة — **وهي حلٌّ مؤقّت لا غاية**: العربيةُ تُلزم
   بالصيغة، والمحايدةُ تُجمّد صوتَ بيان حيث كان يخاطب.

   🔑 **والنصُّ يقول لماذا، وإلا قُرئ جمعاً للجنس.** سؤالٌ عن «ذكر أم
      أنثى» في قائمة الحساب يُقرأ سمةً ديموغرافية تُجمَع — وهو بالضبط
      ما لا تفعله بيان. فيُسأل عن **الخطاب** ويُقال إنّه لغةٌ لا سمة.

   🔑 **والخياران بمفردات التسجيل نفسِها** («أنا طالبة» لا «مؤنّث»):
      المسجِّلُ رأى هذه العبارةَ يوم سجّل، **ومفردةٌ ثانية لشيءٍ واحد
      تُقرأ شيئاً آخر.**

   📌 **ولا زرَّ صرفٍ ولا تذكيرٌ متكرّر:** الكتلةُ لا تسبق شاشةً، ولا
      تُرى إلا حين يفتح صاحبُها قائمتَه بنفسه. وتختفي بالجواب.
   🔓 **وموضعُها انتقل من الدرج إلى قائمة الحساب (b107)**، والمبدأ لم
      يتغيّر بل اشتدّ: صيغةُ المخاطبة شأنُ حسابٍ لا وجهةُ تنقّل. */
function gramAsk(prof){
  if(prof.gram_gender || !prof.id) return '';
  const r = roleOf();
  const m = r === 'teacher' ? 'أنا معلّم' : r === 'admin' ? 'أنا مدير'   : 'أنا طالب';
  const f = r === 'teacher' ? 'أنا معلّمة': r === 'admin' ? 'أنا مديرة'  : 'أنا طالبة';
  return `
    <div class="gram-ask" id="gramAsk">
      <b>كيف نخاطبك؟</b>
      <p>لتصحّ صيغة الجُمَل — «أحسنتَ» أم «أحسنتِ». إعداد لغويّ
         يُقرأ في النصّ وحده، ولا يُستعمل في غيره.</p>
      <div class="nav">
        <button class="btn ghost" data-g="m">${m}</button>
        <button class="btn ghost" data-g="f">${f}</button>
      </div>
    </div>`;
}

/* الدرج — وجهاتٌ وحدها بعد `b107`. ورأسُه الشعارُ لا الهويّة: الهويّةُ
   صارت رأسَ قائمة الحساب، **وسطرٌ واحدٌ في موضعين يُضعف كليهما**.
   والدرجُ يغطّي الشعارَ في الشريط حين ينفتح، فيحمله بدله. */
function renderDrawer(active){
  const d = document.getElementById('drawer');
  if(!d) return;
  d.innerHTML = `
    <div class="drawer-head">
      ${brandMark()}
      <button class="iconbtn" id="drawerX" aria-label="إغلاق">${svg('close')}</button>
    </div>
    <nav class="drawer-nav">
      ${destsOf().map(([k, label]) => `
        <button class="menu-item ${k === active ? 'on' : ''}" data-r="${k}">
          ${svg(k)}<span>${label}</span>
          ${NCOUNT[k] ? `<span class="bdg soft" data-n="${NCOUNT[k]}" hidden></span>` : ''}
        </button>`).join('')}
    </nav>`;
  d.querySelector('#drawerX').onclick = closeDrawer;
  wire(d);
}

/* ═══════════ قائمة الحساب — ما يخصّ صاحبَها لا وجهتَه  (b107) ═══════════

   ⚠️ **ولا `role="menu"` عليها.** فيها ما ليس ببند: سطرُ الهويّة وسؤالُ
      الصيغة. ولوحةٌ تُعلن نفسَها قائمةَ بنودٍ ثمّ تحمل غيرَها **تكذب على
      قارئ الشاشة**، وهو لا يرى ما يصحّح لها. والجرسُ بنودٌ خُلَّص فبقي
      على `role="menu"` — الفرقُ في المحتوى لا في الذوق. */
function renderAcct(p){
  const prof = S.prof || {};
  /* 🆕 123 · سطرُ الهوية: الدورُ بصيغة صاحبه، ثمّ ما يُعرِّفه — الصفُّ
     للطالب والمدرسةُ للمعلّم. ومن لم يُسأل بعدُ يسقط دورُه ويبقى
     تعريفُه، **فلا يُخاطَب بصيغةٍ لم يخترها**. والسطرُ يُخفى إن خلا
     الاثنان معاً، وإلا حجز حشوَه فارغاً. */
  const sub = [roleWord(roleOf(), prof.gram_gender),
               prof.klass || prof.school].filter(Boolean).join(' · ');
  p.innerHTML = `
    <div class="who acct-head">
      ${/* 🔓 b107 · «تغيير صورتي» لم يعد بنداً — صار **قلماً على الصورة
            نفسِها**. والحجّة أنّ الفعل يسكن الشيءَ الذي يغيّره: بندٌ في
            قائمةٍ يسمّي الصورةَ بالكلام، وقلمٌ عليها يشير إليها بلا
            كلام. وبندٌ أقلُّ في قائمةٍ تُفتح كلَّ يوم.
            📌 وسابقتُه في المستودع: `125` جعل أيقونةَ البند علامتَه
               نفسَها مصغَّرةً — «أصدقُ أيقونةٍ للفعل نتيجتُه». وهذا
               تمامُ تلك الفكرة لا نقضُها. */''}
      <button class="av-edit" data-r="avatar" aria-label="تغيير صورتي">
        ${markSlot(prof, 40)}
        <span class="av-pen">${svg('pen')}</span>
      </button>
      <span class="who-t">
        <b dir="auto">${esc(prof.full_name || 'حسابك')}</b>
        ${sub ? `<span>${esc(sub)}</span>` : ''}
      </span>
    </div>
    ${gramAsk(prof)}
    ${/* 🆕 b103 · و«ملفّي» شاشةٌ واحدةٌ للدورين تتفرّع بالدور — قسمُ
          الحساب فيها واحدٌ حرفاً، ونسختان تتفارقان. */''}
    <button class="menu-item" data-r="profile">${svg('profile')}<span>ملفّي</span></button>
    <button class="menu-item" id="themeBtn">${svg('theme')}<span>تبديل السِمة</span></button>
    <button class="menu-item danger" data-r="out">${svg('out')}<span>خروج</span></button>`;

  /* والسِمةُ لا تطوي اللوحة: من بدّلها قد يبدّلها ثانيةً ليقارن. */
  p.querySelector('#themeBtn').onclick = toggleTheme;

  /* 🔴 **والفشلُ يُقال ولا يُبتلع.** لو أُخفيت الكتلةُ بمجرّد النقر ثمّ
     رُدّ الحفظ لظنّ صاحبُها أنّه أجاب، ثمّ وجد السؤالَ عائداً غداً بلا
     سبب. ⇒ يُعطَّل الزرّان ريثما يُردّ الجواب، ويُرجَعان عند الخطأ. */
  p.querySelectorAll('#gramAsk [data-g]').forEach(b => b.onclick = async () => {
    if(!gramSetter) return;
    const btns = p.querySelectorAll('#gramAsk [data-g]');
    btns.forEach(x => x.disabled = true);
    const err = await gramSetter(b.dataset.g);
    if(err){
      btns.forEach(x => x.disabled = false);
      toast('تعذّر الحفظ — ' + (err.message || '')); return;
    }
    S.prof.gram_gender = b.dataset.g;
    renderAcct(p);                 // السطرُ والكتلةُ يتبعان الجواب فوراً
  });

  wire(p);
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
  closePops();                     // لوحةٌ متدلّيةٌ تحت الغطاء تُنقر ولا تُرى
  document.body.classList.add('drawer-open');
  document.getElementById('menuBtn')?.setAttribute('aria-expanded', 'true');
  /* بعد الرسم لا قبله، وإلا ذهب التركيز إلى عنصرٍ لم يظهر بعد */
  requestAnimationFrame(() =>
    document.querySelector('#drawer .menu-item')?.focus());
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
               placeholder="دروسك ومصادرك وبطاقاتك وأخطائك"
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
    box.innerHTML = `<div class="s-msg"><b>حرفان فأكثر</b>
      يبحث في دروسك ومصادرها وبطاقاتك — وفي أخطائك وتشخيصها.
      ويمكن كتابة نوع الخطأ نفسه.</div>`;
    return;
  }
  if(!hits.length){
    box.innerHTML = `<div class="s-msg"><b>لا شيء يطابق «${esc(q)}»</b>
      كلمة واحدة، أو جذر الكلمة بلا سوابق ولواحق.</div>`;
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
  closePops();
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

const toggleBell = () => togglePop('bell', p => { p.innerHTML = bellHtml(); wire(p); });
const toggleAcct = () => togglePop('acct', renderAcct);

/* ممرٌّ واحد للتوجيه: كلُّ [data-r] يُغلق ما فُتح ثم يذهب.
   والإغلاق قبل الذهاب لا بعده — فالشاشة الجديدة تُرسم وقد خلا الطريق. */
function wire(root){
  root.querySelectorAll('[data-r]').forEach(b => b.onclick = () => {
    const go = ROUTES[b.dataset.r];
    closeDrawer();
    closePops();
    if(go) go();
  });
}

// active = مفتاح الوجهة الحالية · النقر على النشط يُعيد التحميل
export function nav(active){
  setWide(false);
  bar.innerHTML =`<div class="topbar">
    <button class="iconbtn" id="menuBtn" aria-label="التنقّل"
            aria-expanded="false" aria-controls="drawer">${svg('menu')}</button>
    ${brandMark()}
    <span class="topgap"></span>
    <button class="iconbtn" id="searchBtn" aria-label="البحث">${svg('search')}</button>
    <span class="bellwrap">
      <button class="iconbtn" id="bellBtn" aria-label="الإشعارات"
              aria-expanded="false" aria-haspopup="menu">${svg('bell')}<span
        class="bdg" id="bellBdg" hidden></span></button>
      <div class="bellpanel" id="bellPanel" role="menu" hidden></div>
    </span>
    <span class="acctwrap">
      <button class="acct" id="acctBtn" aria-label="حسابك"
              aria-expanded="false" aria-haspopup="true">
        ${markSlot(S.prof || {}, 30)}
        <span class="acct-n" dir="auto">${esc((S.prof?.full_name || '').split(/\s+/)[0] || '')}</span>
      </button>
      <div class="acctpanel" id="acctPanel" aria-label="حسابك" hidden></div>
    </span>
  </div>`;

  ensureDrawer();
  ensureSearch();
  bindSlash();
  renderDrawer(active);
  paintCounts();
  syncMarks();      // مرّةً في عمر الصفحة — الحارسُ داخلها (125)

  bar.querySelector('#searchBtn').onclick = openSearch;
  bar.querySelector('#menuBtn').onclick = openDrawer;
  bar.querySelector('#acctBtn').onclick = toggleAcct;   // غرفتان وبابان (b107)
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
