/* ══════════════════════════════════════════════════════════
   بيان — library.js · رفوفُ مكتبة بيان  (b236 · المرحلة ٣ من spec-reading-library.md)
                       وبطاقةُ الكتاب ودورتُه  (b237 · المرحلة ٤ — في آخر الملفّ)

   🆕 b251 · ومكتبتان بهذه الشاشة: «Bayan Library» (`sk_read`) و«مكتبة بيان» العربيّة (`sk_read_ar` · 219
   · spec-arabic-library.md) — والفرقُ بينهما بياناتٌ لا شيفرة (السلّمُ والكتب).
   المكتبةُ واجهةُ عرضٍ لدروس المادّة ٧ (`sk_read`) لا نظامٌ جديد: الرفُّ فرعٌ من
   فروعها، والكتابُ درسٌ كما تُرجعه `list_lessons` — بغلافه (`203`) وحاله وأفضلِ
   نتيجته. فلا حالَ تُحسب إلا ممّا وصل، ولا نداءَ يكتب إلا ضمَّ كلمات الكتاب إلى
   «تذكّرها» حين تُفتح (`openWords` · حكمُ `openLessonDeck` بعينه).
   وتُنادى من `loadLessons` في student.js وحدها، بعد الجلب والأثر (`rememberSubject`):
   فالبوّاباتُ قبلها (الشُّعبة · التسكين · المعلّم) واحدةٌ للمكتبة ولغيرها.

   🔑 حالاتُ الكتاب أربع، وكلُّها من القاعدة:
        مقفل        ⇐ `locked` (وسببُه `reason` يُقال عند النقر)
        أُنجز        ⇐ `done` — الاختبارُ بلغ `pass_mark` — ومعه أفضلُ نتيجته `best`
        قيد القراءة ⇐ بدأه ولم ينجزه: محاولةٌ لها نتيجة أو مصدرٌ له حال
        متاح        ⇐ ما سوى ذلك، بلا وسم
      **والوسومُ بعائلات المنصّة نفسِها** (`ok` لما أُنجز · ومحايدٌ لـ«مقفل» و«قيد القراءة»)
      لا بألوان المشهد (ق٩): الخشبُ والذهبُ والعاج زينةُ هذه الشاشة، والمعنى للعائلات.
      و«أُنجز» اسمُها في قائمة الدروس (`lcard`) — فلا اسمَ ثانٍ للحال نفسِها.
      🆕 b250 · والوسمُ نقطةٌ بأيقونةٍ في زاوية الغلاف لا نصّ (`DOT`) — والاسمُ للقارئ الشاشيّ وتلميحِ الفأر.
   🔑 🆕 b251 · **عددُ الرفوف بعدد الكتب وأنواعها** (قرارُ المالك · ١٩ نوفمبر — للمكتبتين): لكلّ تصنيفٍ فيه كتبٌ
      رفُّه، فإن زادت كتبُه على سعة الخزانة فرفٌّ بعد رفٍّ تحته · وما لا تصنيفَ له يصطفّ رفوفاً متتالية **بتاريخ
      إدراجه** · **ولا رفَّ بلا كتب.** وكان قبله «الرفُّ يُرسم ولو خلا» من `list_strands` (b236): ثلاثُ خزائن وكتبُ
      المكتبة كلُّها في واحدة — فالدورانُ بين الرفوف دورانٌ بين فراغين.
      📌 و`list_strands` باقيةٌ لما لا يحمله الدرس: ترتيبُ التصنيفات (`sort_order`) ولافتاتُها (`shelf_title`).
      ⚠️ وإن لم تصل الفروعُ رُسمت التصنيفاتُ ممّا في الدروس نفسِها — فشلٌ يُنقص ولا يحجب.
   📐 **ثمانيةُ كتبٍ سعةُ الخزانة** (رفّان في أربع خانات · ق٣): ما زاد خزانةٌ تالية لا صفحةٌ تُقلَّب (b251).
      **والهاتفُ عمودان بلا منظور:** التمريرُ هناك طبيعيّ، والمنظورُ على عرضٍ ضيّقٍ يأكل الكتب.
   ♿ الرفُّ منطقةٌ مسمّاةٌ باسم فرعه (`region` · `aria-label` — واللافتةُ لا تُرى إلا بعنوانٍ من المحرّر · b250) والكتابُ زرٌّ حقيقيّ: Tab بين الكتب، وEnter يفتح،
      **وأسهمُ لوحة المفاتيح تبدّل الرفّ** — الأيمنُ للسابق والأيسرُ للتالي، فالصفحةُ عربيّة. **والرفوفُ الخلفيّة لا
      تُبلَغ بـTab:** تُرى ولا تُقرأ (`aria-hidden` · `tabindex=-1`)، ونقرُها يُحضرها إلى الصدارة.
   🆕 b249 · **وسقطت ألسنةُ الرفوف** (قرارُ المالك على لقطة الرفوف · ١٨ نوفمبر): اسمُ الرفّ مكتوبٌ على لافتته،
      فلسانٌ يكرّره فوقه نسخةٌ ثانيةٌ تزاحم الكتب على أوّل الشاشة. ⇒ **السهمان على كلّ عرضٍ** (والهاتفُ كان يبدّل
      بالألسنة وحدها)، **والسحبُ باللمس** على الهاتف واللوح، والتركيزُ بعد التبديل بلوحة المفاتيح إلى الرفّ نفسِه.
   ══════════════════════════════════════════════════════════ */
import * as api from './api.js';
import { app, head, nav, toast, esc, escA, AR, N, icon, skeleton, errBox,
         sayable, sayGroup, bindSay, backText, dirOf, todayIso, yearsText, birthProblem, levelText } from './ui.js';
import { mediaUrl } from './media.js';

/* ── النمطُ يُحمَّل مع الشاشة لا مع المنصّة — حجّةُ `book.css` بعينها (book.js) ── */
const CSS_HREF = new URL('../css/library.css', import.meta.url).href;
let cssReady = null;
function loadCss(){
  if(cssReady) return cssReady;
  if(document.querySelector('[data-lb-css]')) return (cssReady = Promise.resolve());
  cssReady = new Promise(done => {
    const l = document.createElement('link');
    l.rel = 'stylesheet'; l.href = CSS_HREF; l.dataset.lbCss = '1';
    /* فشلُ النمط لا يحجب الكتب — رفوفٌ بلا زينةٍ خيرٌ من ألّا تُرى */
    l.onload = done; l.onerror = done;
    document.head.append(l);
  });
  return cssReady;
}

const PER_PAGE = 8;                                   // رفّان × أربع خانات (ق٣)
const COLS = { wide: 4, phone: 2 };
/* ⚠️ الحدُّ نفسُه في library.css (`max-width:640px`) — ومسطرتان تفترقان: الخاناتُ تُبنى هنا
   بعددها، والشبكةُ تُرسم هناك بعددها. فإن تغيّر أحدُهما تغيّرا معاً. */
const PHONE = matchMedia('(max-width: 640px)');

/* 🆕 b250 · وسقط `LOCK` (قفلُ الوسم النصّيّ) — القفلُ اليوم أيقونةُ النقطة في `DOT` أدناه. والأيقوناتُ متّجهةٌ لا إيموجي (هويّةُ اللغة §١١). */

/* ── حالُ الكتاب ونصُّه ── */
function stateOf(l){
  if(l.draft)  return 'draft';                        // 🆕 b252 · في المعاينة وحدها (`library_preview` · 220)
  if(l.locked) return 'locked';
  if(l.done)   return 'done';
  if(l.best != null || (l.items || []).some(i => i.status)) return 'reading';
  return 'open';
}
const SAY = {
  done:    l => 'أُنجز' + (l.best != null ? ' ' + AR(Math.round(l.best)) + '٪' : ''),
  reading: () => 'قيد القراءة',
  locked:  () => 'مقفل',
  draft:   () => 'مسودة',
  open:    () => '',
};
/* 🆕 b250 · **والحالُ نقطةٌ بأيقونة لا وسمٌ بنصّ** (قرارُ المالك على لقطة الرفّ · ١٩ نوفمبر): «قيد القراءة» كان يغطّي
   اسمَ الكتاب على غلافه الحقيقيّ. ⇒ دائرةٌ صغيرةٌ في الزاوية اليمنى السفلى (والعليا غطّت العنوانَ أيضاً · library.css): ✔ خضراء لما أُنجز (عائلةُ `ok` — نجح اختبارُه، وهو حكمٌ
   على إجابات) · علامةُ كتابٍ محايدةٌ لما بدأه · وقفلٌ محايدٌ لما أُغلق. **والنصُّ لا يسقط:** هو اسمُ الزرّ لقارئ الشاشة
   (`aria-label`) وتلميحُه للفأر — والنسبةُ («أُنجز ٩٠٪») هناك وفي البطاقة. */
const DOT = {
  done:    '<path d="M5.5 12.5l4 4L18.5 7.5"/>',
  reading: '<path d="M7 4.5h10v15l-5-3.6-5 3.6z"/>',
  locked:  '<rect x="5.5" y="11" width="13" height="9" rx="2"/><path d="M8.5 11V8a3.5 3.5 0 017 0v3"/>',
  /* 🆕 b252 · قلمٌ محايد للمسودّة في المعاينة — نقطةُ «قيد القراءة» نفسُها لوناً (`.lb-dot` بلا صنف حال · library.css):
     المسودّةُ حالُ كتابٍ لا حكمٌ على إجابة، فلا عائلةَ معنًى لها. ولا تجتمع مع حال الطالب: المعاينةُ تُرسلها فارغة. */
  draft:   '<path d="M4.5 19.5h4l10-10-4-4-10 10z"/><path d="M13 7l4 4"/>',
};

/* ── الرفوف: الفروعُ النهائيّة بترتيبها، والكتبُ عليها بترتيب المنهج (`list_lessons`) ──
   📌 وترتيبُ الرفوف بـ`sort_order` الفرع نفسِه لا بأصله: «قصص · علوم · سِيَر» (203 ⑤) —
      فالأصلُ (سرديّ · معلوماتيّ) جنسُ النصّ لا ترتيبُ المشهد. */
/* 🆕 b250 · **ولافتةُ الرفّ لا تُكتب إلا بعنوانٍ حدّده المؤلّف** (قرارُ المالك على اللقطة الثانية · ١٨ نوفمبر): اسمُ الفرع
      («قصص ومغامرات») اسمُ تصنيفٍ يقرؤه المحرّرُ والتحليلات، لا عنوانٌ كُتب للطالب — فلم يعد يُكتب على الرفّ تلقائيّاً.
   ✅ **والعنوانُ `strands.shelf_title`** (218 · خانةُ «عنوان الرف» في شاشة فروع المادّة · `editor_strands.js`) — وفارغُه
      «لا لافتة». وقبل 218 لا يصل الحقلُ أصلاً، فالرفوفُ بلا لافتاتٍ كما أراد المالك: الغيابُ هنا لا يُخطئ.
   📌 والاسمُ لا يسقط من الشاشة كلِّها: الرفُّ منطقةٌ مسمّاةٌ به لقارئ الشاشة (`aria-label` · `caseHtml`). */
/* 🆕 b251 · والرفوفُ من الكتب لا من الفروع (رأسُ الملفّ): تصنيفٌ بلا كتبٍ لا خزانةَ له، وما زاد على ثمانيةٍ خزانةٌ تالية.
   🔑 **و«تاريخُ الإدراج» معرّفُ الدرس** (قرارُ المالك · ١٩ نوفمبر): المعرّفُ تسلسلٌ يُعطى ساعةَ الإنشاء، و`list_lessons`
      لا تُرسل `created_at` — فلا رقعةَ في القاعدة لقيمةٍ يحملها المعرّفُ بترتيبها.
   📌 **وكتبُ التصنيف بترتيب المنهج كما كانت** (`list_lessons`: المستوى ⇐ الوحدة ⇐ الموضع) — والقرارُ رتّب غيرَ المصنَّف وحده.
   📌 **واسمُ الخزانة لقارئ الشاشة** (`aria-label`): اسمُ تصنيفها، ومعه رقمُها إن كانت له خزائن — و«الكتب» حين لا تصنيفَ
      في المكتبة أصلاً، و«كتب أخرى» حين يجاور غيرُ المصنَّف تصنيفات. */
function shelvesOf(strands, lessons){
  const leaves = (strands || []).filter(s => s.selectable)
    .sort((a, b) => (a.sort_order ?? 0) - (b.sort_order ?? 0) || String(a.name).localeCompare(String(b.name), 'ar'));
  const by = new Map(leaves.map(s => [String(s.id), { key: String(s.id), name: s.name, title: (s.shelf_title || '').trim() || null, books: [] }]));
  const loose = [];
  for(const l of lessons){
    const k = l.strand ? String(l.strand.id) : null;
    /* الفروعُ لم تصل ⇒ التصنيفُ ممّا في الدرس نفسِه (رأسُ الملفّ) */
    if(k && !leaves.length && !by.has(k)) by.set(k, { key: k, name: l.strand.name, title: null, books: [] });
    /* درسٌ بلا فرعٍ أو على أصلٍ لا على رفٍّ نهائيّ ⇒ غيرُ مصنَّف — لا يضيع */
    (k && by.has(k) ? by.get(k).books : loose).push(l);
  }
  const groups = [...by.values()].filter(g => g.books.length);
  loose.sort((a, b) => (Number(a.id) || 0) - (Number(b.id) || 0));
  if(loose.length) groups.push({ key: '_', name: groups.length ? 'كتب أخرى' : 'الكتب', title: null, books: loose });

  const out = [];
  for(const g of groups){
    const n = Math.ceil(g.books.length / PER_PAGE);
    for(let i = 0; i < n; i++) out.push({
      key: i ? `${g.key}:${i}` : g.key,
      name: n > 1 ? `${g.name} ${AR(i + 1)}` : g.name,
      title: g.title,
      books: g.books.slice(i * PER_PAGE, (i + 1) * PER_PAGE),
    });
  }
  return out;
}

/* ── ما يُرسم ── */

/* الغلافُ ووسمُه — للكتاب على الرفّ ولبطاقته (b237): مصدرٌ واحدٌ لا نسختان.
   🔑 الغلافُ المولَّد يُرسم دائماً تحت الصورة: فإن لم تصل الصورة (`error` في `paintLibrary` و`openBook`)
      أُزيلت فظهر ما تحتها — لا مستطيلٌ فارغ. وكتابٌ بلا غلافٍ اليوم هو الحالُ الغالب (عائقُ محتوى).
   📌 والنبرةُ من المعرّف لا عشوائيّة: الكتابُ يلبس اللونَ نفسَه في كلّ زيارة. */
function jacket(l, st, say){
  const src = l.cover ? mediaUrl(l.cover) : null;
  return `<span class="lb-jacket">
      <span class="lb-gen" data-t="${Math.abs(Number(l.id) || 0) % 4}" aria-hidden="true"><span
        class="lb-gen-t" dir="auto">${esc(l.title)}</span></span>
      ${src ? `<img class="lb-img" src="${escA(src)}" alt="" loading="lazy" decoding="async">` : ''}
      ${DOT[st] ? `<span class="lb-dot is-${st}" aria-hidden="true" title="${escA(say)}"><svg viewBox="0 0 24 24" fill="none"
        stroke="currentColor" stroke-width="${st === 'done' ? 3 : 2.2}" stroke-linecap="round" stroke-linejoin="round">${DOT[st]}</svg></span>` : ''}
    </span>`;
}

function bookHtml(l, live){
  const st = stateOf(l), say = SAY[st](l);
  /* 📌 و`title` للفأر: لافتةُ العنوان سطرٌ واحدٌ يُقصّ في غلافٍ بعرض ٩٦px، والعنوانُ كاملاً في التلميح */
  return `<button type="button" class="lb-book is-${st}" data-l="${l.id}" ${live ? '' : 'tabindex="-1"'}
      title="${escA(l.title + (say ? '، ' + say : ''))}" aria-label="${escA(l.title + (say ? '، ' + say : ''))}">
    ${jacket(l, st, say)}
    <span class="lb-title" dir="auto" aria-hidden="true">${esc(l.title)}</span>
  </button>`;
}

/* خانةٌ فارغة تحمل مقاسَ الكتاب ولا تُرى — فالرفُّ يحفظ ارتفاعَه ولو قلّت كتبُه أو خلا */
const GHOST = `<span class="lb-book lb-ghost" aria-hidden="true"><span class="lb-jacket"></span>
  <span class="lb-title">&nbsp;</span></span>`;

function bodyHtml(sh, page, live){
  const phone = PHONE.matches, cols = phone ? COLS.phone : COLS.wide;
  const list = phone ? sh.books : sh.books.slice(page * PER_PAGE, (page + 1) * PER_PAGE);
  const rows = phone ? Math.max(1, Math.ceil(list.length / cols)) : PER_PAGE / cols;
  /* 🆕 b251 · وسقطت لافتةُ «لا كتب على هذا الرف بعد» (`.lb-empty`): لا خزانةَ بلا كتب (`shelvesOf`) */
  let html = '';
  for(let r = 0; r < rows; r++){
    const slots = [];
    for(let c = 0; c < cols; c++){
      const b = list[r * cols + c];
      slots.push(`<div class="lb-slot">${b ? bookHtml(b, live) : GHOST}</div>`);
    }
    html += `<div class="lb-row">${slots.join('')}</div>`;
  }
  return html;
}

/* 🆕 b254 · **رقمُ الخزانة على تاجها** (طلبُ المالك على لقطة المعاينة · ١٩ نوفمبر): «ليكون تغيّرُ الرفّ واضحاً عند التمرير».
   الخزائنُ متشابهةٌ خشباً وذهباً، والكتبُ وحدها تفرّقها — فمن مرّر لم يعرف أتبدّل الرفُّ أم أُعيد رسمُه.
   ⇒ وسامٌ نحاسيٌّ صغيرٌ بالرقم في **طرفَي التاج كليهما**: الجارُ يُرى منه طرفُه القريبُ من الصدارة وحده (`.lb-reel` · library.css)،
      وأيُّ طرفٍ هو يتبع جهتَه — فالوسامان يضمنان أن يُقرأ رقمُه أيّاً كانت. والهاتفُ يُبقي واحداً بجوار السهم (لا جيرانَ تُرى هناك).
   📌 والرقمُ لقارئ الشاشة في اسم المنطقة («…، الرف ٢ من ٥»)، والوسامُ نفسُه `aria-hidden` فلا يُقرأ مرّتين. */
function caseHtml(sh, i, page, n){
  const num = AR(i + 1);
  const medal = side => `<span class="lb-num lb-num-${side}" aria-hidden="true">${num}</span>`;
  const label = (sh.title || sh.name) + (n > 1 ? `، الرف ${num} من ${AR(n)}` : '');
  /* التاجُ يبقى بلا لافتة — خشبُ الخزانة لا يُقصّ — وأقصرُ (`.lb-crown.bare`) فلا يُرى فراغاً ينتظر اسماً */
  return `<section class="lb-case" id="lb-c-${i}" role="region" aria-label="${escA(label)}" tabindex="-1" data-i="${i}">
    <header class="lb-crown${sh.title ? '' : ' bare'}">${n > 1 ? medal('s') : ''}${sh.title ? `<span class="lb-plate" dir="auto">${esc(sh.title)}</span>` : ''}${n > 1 ? medal('e') : ''}</header>
    <div class="lb-body">${bodyHtml(sh, page, false)}</div>
    <div class="lb-plinth"></div>
  </section>`;
}

/* ── الحفظ: الرفُّ والصفحةُ لكلّ مادّة — من فتح كتاباً ثمّ عاد وجد رفَّه حيث تركه.
   🔑 `sessionStorage` لا `localStorage`: تسهيلُ جلسةٍ لا سجلّ، وحجّةُ `LAST_KEY` في student.js
      بعينها (غيابُه لا يمنع فعلاً). ⚠️ ويرمي في التصفّح الخاصّ ⇒ try في الطرفين. */
const keyOf = subj => 'bayan.lib.' + subj.id;
function recall(subj){
  try{ return JSON.parse(sessionStorage.getItem(keyOf(subj)) || 'null') || {}; }catch(e){ return {}; }
}

/**
 * يرسم رفوفَ المكتبة في `app`.
 * @param subj     المادّة كما في `list_subjects`
 * @param lessons  دروسُها كما في `list_lessons` (بعد تصفية الوجه)
 * @param strands  فروعُها كما في `list_strands` — وفارغةٌ إن تعذّرت
 * @param hooks    { top: رأسُ المادّة (html) · bindTop: ربطُه · open: فتحُ بطاقة الكتاب · relevel: بعد المنارة } (`libHooks` · student.js)
 */
export async function paintLibrary(subj, lessons, strands, hooks = {}){
  const { top = '', bindTop, open } = hooks;
  await loadCss();

  /* 🔑 **مستواك وحده على الرفوف** (`own_level` ⇐ `my_courses().is_current`): `courses_of` تفتح للطالب مقرّراتِ ما دون
        مستواه أيضاً (`can_view_level`)، فبلا هذا يجاور كتابُ R2 كتابَ R6 على رفٍّ واحد — والمكتبةُ «على قدر مستواك».
     ⏳ وكتبُ ما دون مستواك (مراجعةُ ما أُنجز قبل الترقية) سؤالٌ مفتوحٌ للمرحلة ٥ — لا تضيع: البحثُ يبلغها.
     ⚠️ و«ليس سابقاً» لا «حاضرٌ صراحةً» — حجّةُ `inView` في student.js: درسٌ بلا وسمٍ لا يختفي. */
  lessons = (lessons || []).filter(l => l.own_level !== false);

  const shelves = shelvesOf(strands, lessons);
  const byId = new Map((lessons || []).map(l => [String(l.id), l]));
  const kept = recall(subj);
  const pages = new Map(Object.entries(kept.pages || {}).map(([k, v]) => [k, Number(v) || 0]));
  /* الرفُّ المحفوظ، وإلّا **أوّلُ رفٍّ فيه كتب**: الصدارةُ لما يُقرأ، ورفٌّ خالٍ في أوّل زيارةٍ يُقرأ «لا كتب هنا» */
  let at = shelves.findIndex(s => s.key === kept.shelf);
  if(at < 0) at = Math.max(0, shelves.findIndex(s => s.books.length));
  const pageOf = i => Math.min(pages.get(shelves[i].key) || 0,
                               Math.max(0, Math.ceil(shelves[i].books.length / PER_PAGE) - 1));

  /* 📌 والشريطُ (`.lb-top`): بطاقاتٌ صغيرةٌ كلٌّ على لوحه الزجاجيّ — الحديقةُ خلفيّةُ الصفحة كلِّها، والنصُّ لا يُكتب
        على صورة (library.css). 🆕 b249 · ولا لوحَ كبيرَ يجمعها: سقط العنوانُ والألسنة، فلم يبقَ ما يستحقّ لوحاً. */
  /* 🆕 b252 · ونصُّ الفراغ من المستدعي إن قاله (`hooks.none`): المعاينةُ تختار مستوًى لا تسكنه — «مستواك» لا تصدق فيها */
  if(!shelves.length){
    app.innerHTML = `<div class="lb" id="lb"><div class="lb-top">${top}</div>
      <div class="lb-none status">${esc(hooks.none || 'لا كتب في مستواك بعد')}</div></div>`;
    bindTop?.();
    return;
  }

  const many = shelves.length > 1;
  app.innerHTML = `
    <div class="lb" id="lb">
      <div class="lb-top">
        ${top}
        <div class="lb-prog" id="lbProg" hidden></div>
      </div>
      <div class="lb-stage">
        ${many ? `<button type="button" class="lb-arrow lb-prev" aria-label="الرف السابق">${icon('back')}</button>` : ''}
        <div class="lb-reel"><div class="lb-scene lb-still">${shelves.map((s, i) => caseHtml(s, i, pageOf(i), shelves.length)).join('')}</div></div>
        ${many ? `<button type="button" class="lb-arrow lb-next" aria-label="الرف التالي">${icon('back')}</button>` : ''}
      </div>
      <div class="lb-pager" hidden></div>
    </div>`;
  bindTop?.();

  const root  = document.getElementById('lb');
  const cases = [...root.querySelectorAll('.lb-case')];
  const pager = root.querySelector('.lb-pager');

  const save = () => {
    try{
      sessionStorage.setItem(keyOf(subj), JSON.stringify({
        shelf: shelves[at].key, pages: Object.fromEntries(pages) }));
    }catch(e){}
  };

  /* 🆕 b254 · **الخزائنُ صفٌّ واحدٌ ينزلق لا حلقةٌ تدور** (طلبُ المالك · ١٩ نوفمبر: «كأنّ الرفّ يُمرَّر للجهة ويحلّ محلَّه
        الرفُّ الجديد»). كان الراحلُ يتراجع خلف الصدارة ويصغر والقادمُ يتقدّم من خلفه، فيتقاطعان في مكانٍ واحد — حركةُ
        بطاقاتٍ تُخلط لا رفٍّ يُزاح. ⇒ لكلّ خزانةٍ موضعٌ في الصفّ (`--s` = بُعدُها عن الصدارة: السابقُ يميناً سالباً، والتالي
        يساراً موجباً)، والتحويلُ في library.css يُزيحها بعرضها كاملاً لكلّ خطوة — فالراحلُ يخرج إلى جهته كلَّه والقادمُ
        يدخل من الأخرى، ولا يلتقيان.
     🔑 **ولا دوران:** في صفٍّ حقيقيٍّ لا يجاور الأخيرُ الأوّل، والرقمُ على التاج (`caseHtml`) يقول «هذا الخامس» — فرفُّ «١»
        يدخل من يسار «٥» يكذّبه. ⇒ السهمُ عند طرف الصفّ معطَّل، والسحبُ ولوحةُ المفاتيح لا يتجاوزانه.
     📌 وما بعد الجارين (‎|s| ≥ ٢) يقف عند الخطوة الثانية مخفيّاً — فلا يعبر المسرحَ كلَّه حين يقترب. */
  const prevBtn = root.querySelector('.lb-prev'), nextBtn = root.querySelector('.lb-next');
  function place(){
    cases.forEach((c, i) => {
      const s = Math.max(-2, Math.min(2, i - at));
      const pos = s === 0 ? 'front' : s === -1 ? 'prev' : s === 1 ? 'next' : 'back';
      c.dataset.pos = pos;
      c.style.setProperty('--s', s);
      const live = pos === 'front';
      c.setAttribute('aria-hidden', live ? 'false' : 'true');
      c.querySelectorAll('button.lb-book').forEach(b => { b.tabIndex = live ? 0 : -1; });
    });
    if(prevBtn) prevBtn.disabled = at === 0;
    if(nextBtn) nextBtn.disabled = at === shelves.length - 1;
    paintPager();
    save();
  }

  /* 📌 والتركيزُ إلى الرفّ نفسِه لا إلى كتابه الأوّل: الرفُّ منطقةٌ مسمّاة، فيُعلَن اسمُه — وكتابٌ يُركَّز يُعلن عنوانَه
        وحده فلا يُعرف أيُّ رفٍّ هذا. و`preventScroll`: الرفُّ في الصدارة أصلاً، وقفزةُ التمرير تقطع الحركة.
     ⚠️ والسهمُ الذي عُطِّل للتوّ يفقد التركيز في صمت (يذهب إلى `body`) ⇒ يُنقل إلى الرفّ نفسِه. */
  function go(i, focus){
    if(i < 0 || i > shelves.length - 1 || i === at) return;
    at = i;
    const lost = document.activeElement;
    place();
    if(focus || (lost && lost.disabled)) cases[at].focus({ preventScroll: true });
  }

  function paintPager(){
    const total = Math.ceil(shelves[at].books.length / PER_PAGE);
    if(PHONE.matches || total < 2){ pager.hidden = true; pager.innerHTML = ''; return; }
    const p = pageOf(at);
    pager.hidden = false;
    pager.innerHTML = `
      <button type="button" class="lb-pg" data-pg="-1" aria-label="الصفحة السابقة" ${p === 0 ? 'disabled' : ''}>${icon('back')}</button>
      <span>الصفحة ${AR(p + 1)} من ${AR(total)}</span>
      <button type="button" class="lb-pg lb-flip" data-pg="1" aria-label="الصفحة التالية" ${p >= total - 1 ? 'disabled' : ''}>${icon('back')}</button>`;
  }

  function repaintBody(i){
    cases[i].querySelector('.lb-body').innerHTML = bodyHtml(shelves[i], pageOf(i), i === at);
  }

  /* ── الأفعال: نقرٌ واحدٌ مفوَّض على الجذر ── */
  root.addEventListener('click', e => {
    if(e.target.closest('.lb-prev')) return go(at - 1);
    if(e.target.closest('.lb-next')) return go(at + 1);

    const pg = e.target.closest('.lb-pg');
    if(pg && !pg.disabled){
      pages.set(shelves[at].key, pageOf(at) + Number(pg.dataset.pg));
      repaintBody(at); paintPager(); save();
      return;
    }

    /* رفٌّ خلفيٌّ يُنقر ⇒ يتقدّم، ولا يُفتح كتابٌ منه: ما لا يُقرأ لا يُفتح */
    const c = e.target.closest('.lb-case');
    if(c && c.dataset.pos !== 'front') return go(Number(c.dataset.i));

    const b = e.target.closest('button.lb-book');
    if(!b) return;
    const l = byId.get(b.dataset.l);
    if(!l) return;
    if(l.locked){ toast(l.reason || 'هذا الكتاب غير متاح بعد'); return; }
    open(l);
  });

  /* السهمان يبدّلان الرفّ من أيّ موضعٍ في المكتبة إلا حقلاً يُكتب فيه — والتركيزُ إلى الرفّ
     الجديد: كتابُ الرفّ الراحل خرج من Tab، فتركيزٌ يبقى عليه يتيه. */
  root.addEventListener('keydown', e => {
    if(!many || (e.key !== 'ArrowLeft' && e.key !== 'ArrowRight')) return;
    if(e.target.closest('input, textarea, select, [contenteditable="true"]')) return;
    e.preventDefault();
    go(at + (e.key === 'ArrowLeft' ? 1 : -1), true);
  });

  /* 🆕 b249 · السحبُ باللمس يبدّل الرفّ — بديلُ الألسنة على الهاتف. والاتّجاهُ اتّجاهُ المشهد: التالي عن اليسار،
     فسحبُه إلى اليمين يُحضره (كمن يجرّ الرفَّ نحوه).
     🔑 **والأفقيُّ الصريحُ وحده:** إزاحةٌ ≥ ٥٠px وأكبرُ من ضعف الرأسيّة — فتمريرُ الصفحة على الهاتف (رفٌّ طويلٌ
        بعمودين) لا يبدّل رفّاً بانحرافٍ يسير. والمستمعان سلبيّان (`passive`): لا يمنعان التمرير ولا يؤخّرانه.
     ⚠️ ونقرةٌ بعد سحبٍ ناجحٍ لا تفتح كتاباً: الإصبعُ رُفع فوق غلافٍ لم يُقصد. */
  if(many){
    const stage = root.querySelector('.lb-stage');
    let x0 = null, y0 = 0, swiped = false;
    stage.addEventListener('touchstart', e => {
      if(e.touches.length !== 1){ x0 = null; return; }
      x0 = e.touches[0].clientX; y0 = e.touches[0].clientY;
    }, { passive: true });
    stage.addEventListener('touchend', e => {
      if(x0 == null) return;
      const t = e.changedTouches[0], dx = t.clientX - x0, dy = t.clientY - y0;
      x0 = null;
      if(Math.abs(dx) < 50 || Math.abs(dx) < Math.abs(dy) * 2) return;
      swiped = true; setTimeout(() => { swiped = false; }, 400);
      go(at + (dx > 0 ? 1 : -1));
    }, { passive: true });
    stage.addEventListener('click', e => {
      if(swiped){ e.stopPropagation(); e.preventDefault(); }
    }, true);
  }

  /* صورةُ غلافٍ لم تصل ⇒ تُزال فيظهر المولَّدُ تحتها (`bookHtml`). و`error` لا يصعد — فالالتقاط */
  root.addEventListener('error', e => {
    if(e.target?.classList?.contains('lb-img')) e.target.remove();
  }, true);

  /* عبورُ حدّ الهاتف يغيّر عددَ الخانات والصفحات ⇒ تُعاد الأجسامُ وحدها.
     ⚠️ والمستمعُ يُرفع حين تغادر الشاشة: `PHONE` ثابتٌ على الوحدة، ومستمعٌ يبقى بعدها يرسم في
        شاشةٍ أخرى. والمغادرةُ تُعرف بانفصال الجذر لا بنداءٍ يُنسى. */
  const onMedia = () => {
    if(!root.isConnected){ PHONE.removeEventListener('change', onMedia); return; }
    shelves.forEach((s, i) => repaintBody(i));
    place();
  };
  PHONE.addEventListener('change', onMedia);

  /* 🆕 b254 · الرسمُ الأوّلُ بلا انتقال (`.lb-still`): الخزائنُ تولد في الصدارة كلُّها (‎--s غائبة = ٠) ثمّ تأخذ مواضعها —
     ولولا هذا لانزلقت إليها أمام العين عند كلّ فتحٍ للمكتبة. ويُرفع بعد إطارين: الأوّلُ يرسم المواضع، والثاني بعده. */
  place();
  const scene = root.querySelector('.lb-scene');
  requestAnimationFrame(() => requestAnimationFrame(() => scene.classList.remove('lb-still')));
  /* 🆕 b238 · وتاجُ المكتبة يلحق بالرفوف ولا يؤخّرها — نداءٌ بعد الرسم، وفشلُه يُبقيه مطويّاً
     🆕 b252 · ولا تاجَ في المعاينة (`hooks.preview`): شرطُ الانتقال حالُ طالبٍ في مستواه، والناظرُ ليس فيه */
  if(!hooks.preview) paintProgress(subj, root.querySelector('#lbProg'), hooks);
}

/* ═══════════ تاجُ المكتبة: ما أنجزتَ من شرط مستواك، والمنارة (b238 · المرحلة ٥ · sql/205) ═══════════
   🔑 **والمنارةُ تضيء بما تقوله القاعدة لا بما يحسبه المتصفّح** (`ready` من `level_progress`)، وضغطُها يعيد الحسابَ
      هناك (`promote_level`) ثمّ يكتب المستوى التالي — فلا يرقّي زرٌّ من لم يبلغ، ولو عُدِّل في المتصفّح.
   🔑 **وأحوالُه أربع:** شرطٌ قائم (ما أنجزتَ من كم، وحدودُ الرفوف) · اكتمل (والمنارة) · مستوًى بلا شرطٍ (عددُ ما أنجزتَ
      وحده — لا وعدَ بلا شرط) · وأعلى مستوى.
   📐 والشريطُ `.pbar`/`.pfill` المنصّة بأحوال بطاقة المادّة نفسِها (`st-active` · `st-mid` · `st-done`) — لا لونٌ جديد. */
async function paintProgress(subj, host, hooks){
  if(!host) return;
  const { data: d } = await api.levelProgress(subj.id).then(r => r, e => ({ error: e }));
  if(!host.isConnected || !d?.ok || !d.applicable || !d.course_id) return;

  const done = Number(d.done || 0), rule = d.rule;
  /* 🆕 b250 · اسمُ المستوى التالي بقوسين (`levelText`) — في السطور الأربعة والزرّ معاً، فلا يُكتب بصيغتين في بطاقةٍ واحدة */
  const next = d.next && { ...d.next, name: levelText(d.next.name) };
  const cap = (a, b) => Math.min(Number(a) || 0, Number(b) || 0);
  /* 🆕 b240 · الانتظار (207 · ق١٥ ②): أتمّ الشرطَ والمستوى التالي فوق ما يُبلَغ في عمره الآن ⇒ يُقال متى يُفتح،
     ولا منارة. **ولا وسمَ للطالب** («موهوب» · «قدرات خاصّة»): الخبرُ عن الكتب والعمر لا عنه. */
  const waits = d.met && d.hold === 'age' && d.wait_age;
  let html;
  if(waits){
    html = `<div class="lb-prog-in st-done">
      <div class="lb-prog-t">أتممت شرط هذا المستوى</div>
      <div class="lb-prog-m">والمستوى التالي <bdi>${esc(next.name)}</bdi> يُفتح حين تبلغ ${yearsText(Number(d.wait_age))}</div>
    </div>`;
  } else if(d.met && d.hold === 'birth'){
    html = `<div class="lb-prog-in st-done">
      <div class="lb-prog-t">أتممت شرط هذا المستوى</div>
      <div class="lb-prog-m">ويلزم تاريخ ميلادك للانتقال — من ملفك الشخصي</div>
    </div>`;
  } else if(!next){
    html = `<div class="lb-prog-t">هذا أعلى مستوى في المكتبة</div>
      <div class="lb-prog-m">الكتب المنجزة: ${AR(done)}</div>`;
  } else if(!rule){
    html = `<div class="lb-prog-m">الكتب المنجزة في هذا المستوى: ${AR(done)}</div>`;
  } else {
    const pct = Math.min(100, Math.round(done / rule.total * 100));
    const st  = d.ready ? 'st-done' : pct >= 50 ? 'st-mid' : 'st-active';
    html = `<div class="lb-prog-in ${st}">
      <div class="lb-prog-t">${d.ready ? 'اكتمل شرط الانتقال إلى' : 'الانتقال إلى'} <bdi>${esc(next.name)}</bdi></div>
      <div class="lb-prog-m">الكتب المنجزة: ${AR(cap(done, rule.total))} من ${AR(rule.total)}</div>
      <div class="pbar" role="progressbar" aria-label="الكتب المنجزة" aria-valuemin="0"
           aria-valuemax="${rule.total}" aria-valuenow="${cap(done, rule.total)}"><div class="pfill" style="width:${pct}%"></div></div>
      ${(rule.mins || []).length ? `<div class="lb-prog-mins">${rule.mins.map(m => `<span class="chip">${
          m.done >= m.min ? '✔ ' : ''}<bdi>${esc(m.name)}</bdi>: ${AR(cap(m.done, m.min))} من ${AR(m.min)}</span>`).join('')}</div>` : ''}
      ${d.ready ? `<button type="button" class="btn primary lb-beacon" id="lbGo">الانتقال إلى <bdi>${esc(next.name)}</bdi></button>` : ''}
    </div>`;
  }
  host.innerHTML = html;
  host.hidden = false;

  const go = host.querySelector('#lbGo');
  if(go) go.onclick = async () => {
    go.disabled = true;
    const { data: r, error } = await api.promoteLevel(subj.id).then(x => x, e => ({ error: e }));
    if(error || !r?.ok){ go.disabled = false; toast(error?.message || r?.error || 'تعذر الانتقال'); return; }
    toast('انتقلت إلى ' + levelText(r.level || ''));
    /* المستوى تغيّر ⇒ المادّةُ تُقرأ من جديد (`list_subjects`) ثمّ رفوفُ المستوى الجديد — هذا في student.js */
    hooks.relevel?.();
  };
}


/* ═══════════ تاريخُ الميلاد — يُسأل مرّةً قبل الرفوف (b240 · المرحلة ٦ · sql/207) ═══════════
   🔑 **الطبقةُ منه** (ق٦ ④ · ق١٣): بلا تاريخٍ لا تُعرف رفوفُ عمره، والتسكينُ والترقيةُ تطلبانه. وهو إجباريٌّ في التسجيل
      (البوّابة · وشاشةُ الصفّ لمن سجّل بـGoogle) — **فهذا السؤالُ لمن سجّل قبله**، أو لتاريخٍ ردّه الحارسُ عند الختم.
   🔑 **والسببُ يُقال قبل السؤال، ومعه من يراه:** «لا يراه معلمك» — التاريخُ في جدولٍ لا يقرؤه غيرُ صاحبه، والمعلّمُ يرى
      الطبقةَ لا التاريخ. ومن سُئل عن ميلاده بلا سببٍ ولا حدٍّ يتردّد، وتردّدُه في محلّه.
   📐 في إطار المكتبة نفسِه (الحديقةُ واللوحُ الزجاجيّ) — فلا يُقرأ شاشةً أخرى انقطع إليها. */
export async function paintBirthAsk(subj, hooks = {}){
  const { top = '', bindTop } = hooks;
  await loadCss();
  app.innerHTML = `
    <div class="lb" id="lb">
      <div class="lb-top">${top}</div>
      <section class="card lb-ask" aria-labelledby="lbAskT">
        <h2 class="lb-ask-t" id="lbAskT">تاريخ ميلادك</h2>
        <p class="line">تُختار كتب المكتبة على قدر عمرك.</p>
        <label class="fl" for="lbBirth">تاريخ الميلاد</label>
        <input type="date" id="lbBirth" min="1930-01-01" max="${todayIso()}">
        <p class="small">يبقى لك وحدك ولا يراه معلمك، ويمكنك تعديله من ملفك الشخصي.</p>
        <div class="nav"><button type="button" class="btn primary" id="lbBirthGo">حفظ</button></div>
      </section>
    </div>`;
  bindTop?.();

  const inp = document.getElementById('lbBirth');
  const btn = document.getElementById('lbBirthGo');
  btn.onclick = async () => {
    const bad = birthProblem(inp.value);
    if(bad){ toast(bad); inp.focus(); return; }
    btn.disabled = true;
    const { data: r, error } = await api.setMyBirthdate(inp.value).then(x => x, e => ({ error: e }));
    if(error || !r?.ok){ btn.disabled = false; toast(error?.message || r?.error || 'تعذر الحفظ'); return; }
    toast('حُفظ تاريخ ميلادك');
    hooks.shelves?.();
  };
  inp.focus();
}


/* ═══════════ بطاقةُ الكتاب ودورتُه (b237 · المرحلة ٤) ═══════════

   الرفُّ ⇐ **بطاقةُ الكتاب** ⇐ «كلمات قبل القراءة» (تُتخطّى) ⇐ الكتابُ المقلَّب (`textBook` كما هو) ⇐ أسئلةُ الفهم
   ⇐ النتيجةُ التشخيصيّة ⇐ **الرفُّ** بحاله الجديدة (`quiz.js` تعود بـ`loadLessons`، وهي للمكتبة رفوف).
   🔑 **والبطاقةُ تقول أين أنت قبل أن تقول ماذا تفعل:** الخطواتُ الثلاث بحالها، والزرُّ الأوّل خطوتُك التالية —
      البدء · متابعة القراءة · أسئلة الفهم · إعادة القراءة. فمن قرأ ولم يُختبر لا يُردّ إلى أوّل الكتاب.
   🔑 **والحالُ من القاعدة وحدها:** القراءةُ «تمّت» بـ`status` مصدرِ النصّ (`completed` لا يُكتب إلا بختامٍ بسرعة
      قارئ · book.js)، والأسئلةُ بـ`best` و`done`. ولا يُحسب في المتصفّح ما لا تعرفه القاعدة.
   📌 والقراءةُ والأسئلةُ يفتحهما student.js (`hooks.read` · `hooks.quiz`): المحرّكان هناك، وهذه الشاشةُ لا
      تعرف إلا أنّ لهما باباً. والعودةُ من الكتاب إلى هذه البطاقة لا إلى صفحة الدرس (`openText` هناك). */

/* 🆕 b256 · **والكتابُ أجزاءٌ أحياناً** («… (Part 1/2)» · «(Part 2/2)»): نصٌّ طويلٌ يُقسَم مصادرَ نصٍّ في درسه، بترتيب
      `position`. وكان `textOf` يأخذ أوّلَها وحده ⇒ **الجزءُ الثاني لا يُبلغ من المكتبة أصلاً** (٢٧ كتاباً في المادّة ٧ · ٢٢ نوفمبر).
   ⇒ `textsOf` الأجزاءُ كلُّها، و`textOf` **الجزءُ الذي عليه الدور**: أوّلُ ما لم يُتمّ، فإن تمّت كلُّها فالأوّل (إعادة القراءة).
      والقراءةُ «تمّت» بتمام الأجزاء كلّها، و«بدأتها» بحالٍ لأيّها. والجزءُ التالي يُفتح من ختام سابقه أيضاً (`textBook` · student.js). */
export const textsOf = l => (l?.items || []).filter(i => i.kind === 'text')
  .sort((a, b) => (a.position ?? 0) - (b.position ?? 0) || (Number(a.id) || 0) - (Number(b.id) || 0));
const textOf = l => { const t = textsOf(l); return t.find(i => i.status !== 'completed') || t[0]; };
const quizOf = l => (l.items || []).find(i => i.kind === 'quiz' && i.quiz_id);

/**
 * بطاقةُ الكتاب.
 * @param hooks { shelves: إلى الرفوف · read(l, item) · quiz(l, item) }
 */
export async function openBook(subj, l, hooks){
  await loadCss();
  /* عنوانُ الدرس نفسُه (/subjects/7/lessons/42) — والتحديثُ يعود إلى هذه البطاقة (`openLessonAt`) */
  nav('subjects', `/subjects/${subj.id}/lessons/${l.id}`);
  /* بلا عنوان: الغلافُ والعنوانُ في البطاقة، واسمٌ يُكتب مرّتين في شاشةٍ واحدة يُقرأ سهواً — حجّةُ `openText` */
  head('', '');

  const st = stateOf(l), say = SAY[st](l);
  const parts = textsOf(l), quiz = quizOf(l);
  const text = textOf(l), first = parts[0];
  const read = parts.length > 0 && parts.every(i => i.status === 'completed');
  const begun = parts.some(i => i.status);
  /* موضعُ الطالب في كتابٍ أجزاء: «الجزء ٢ من ٣» — والكتابُ بجزءٍ واحدٍ كما كان */
  const where = parts.length > 1 && begun && !read ? `الجزء ${AR(parts.indexOf(text) + 1)} من ${AR(parts.length)}` : '';
  const words = Number(l.cards || 0);

  /* الخطوات — ما ليس للكتاب لا يُعرض (كتابٌ بلا كلماتٍ يبدأ بالقراءة).
     📌 وعلامةُ «تمّت» محايدة لا `ok`: إنجازُ خطوةٍ حالٌ لا حكمٌ على إجابة (الهويّةُ البصريّة ①) —
        والحكمُ وسمُ «أُنجز» على الغلاف، بنتيجته. */
  const steps = [
    words ? { name: 'كلمات قبل القراءة', meta: N(words, 'كلمة', 'كلمتان', 'كلمات', 'كلمة') } : null,
    text  ? { name: 'القراءة', meta: read ? 'تمّت' : where || (begun ? 'بدأتها' : ''), done: read } : null,
    quiz  ? { name: 'أسئلة الفهم', done: !!l.done,
              meta: l.best != null ? `أفضل نتيجة ${AR(Math.round(l.best))}٪` : `المطلوب ${AR(l.pass_mark ?? 80)}٪` } : null,
  ].filter(Boolean);

  /* الزرُّ الأوّل خطوتُك التالية، وما بعده أبوابُ الخطوات الأخرى — والأزرارُ مصادر (الهويّةُ اللغويّة §٦) */
  let main;
  if(l.done)              main = text ? ['read', 'إعادة القراءة'] : ['quiz', 'إعادة الاختبار'];
  else if(read && quiz)   main = ['quiz', 'أسئلة الفهم'];
  else if(begun)          main = ['read', 'متابعة القراءة'];
  else if(text || quiz)   main = [words ? 'words' : text ? 'read' : 'quiz', 'البدء'];
  const more = [];
  if(main && words && main[0] !== 'words') more.push(['words', 'الكلمات']);
  if(main && text && main[0] !== 'read')   more.push(['read', main[1] === 'البدء' ? 'تخطّي الكلمات' : 'القراءة']);
  if(main && quiz && main[0] !== 'quiz' && (read || l.done || l.best != null))
    more.push(['quiz', l.done ? 'إعادة الاختبار' : 'أسئلة الفهم']);

  /* 🆕 b250 · **لا سطرَ فوق العنوان ولا ملخّصَ تحته — بل كلماتُ الكتاب** (قرارُ المالك على لقطة البطاقة · ١٨ نوفمبر):
       ① الفرعُ والمستوى («قصص ومغامرات، R1 (Pre-A1)») سقطا: الطالبُ جاء من رفّه ويعرف مستواه من الشريط، فالسطرُ يكرّر.
       ② **والملخّصُ سقط لأنّه أصعبُ من الكتاب نفسِه في المستويات الأولى** — يكتبه المؤلّفُ بلغته لا بلغة R1، فكان أوّلُ ما
          يقرؤه الطالبُ عن الكتاب أعسرَ ما فيه. ويبقى للمؤلّف في المحرّر (`lessons.summary`) كما بقي ملخّصُ قائمة الدروس (b139).
       ③ **ومكانَه الكلماتُ القبليّة** (`lesson_cards`): الكلمةُ ومعناها رقاقاتٍ تُقرأ في نظرة — تمهيدٌ على قدر الطالب لا وصفٌ فوقه.
          وتُجلب بعد الرسم فلا تؤخّر البطاقة، وفشلُها يُبقي موضعَها فارغاً. **ولا تُضمّ إلى «تذكّرها» هنا:** الضمُّ حكمُ فتحِ
          قائمتها (`openWords`) — والنظرُ إلى البطاقة ليس أخذاً. */
  const WORDS_MAX = 10;

  app.innerHTML = `
    <div class="lb lb-view" id="lb">
      <article class="lb-card">
        <div class="crumb" id="lbk">→ رجوع للرفوف</div>
        <div class="lb-card-in">
          <div class="lb-card-cover">${jacket(l, st, say)}</div>
          <div class="lb-card-body">
            <h2 class="lb-card-t" dir="auto">${esc(l.title)}</h2>
            ${words ? '<ul class="lb-cw" id="lbcw" aria-label="كلمات قبل القراءة" hidden></ul>' : ''}
            ${steps.length ? `<ol class="lb-steps">${steps.map(s => `
              <li class="lb-step${s.done ? ' is-done' : ''}"><b>${s.name}</b>${s.meta ? `<span>${esc(s.meta)}</span>` : ''}</li>`).join('')}
            </ol>` : ''}
            ${main ? `<div class="nav lb-card-btns">
              <button type="button" class="btn primary" data-act="${main[0]}">${main[1]}</button>
              ${more.map(([a, t]) => `<button type="button" class="btn ghost" data-act="${a}">${t}</button>`).join('')}
            </div>` : '<div class="status">هذا الكتاب قيد الإعداد</div>'}
          </div>
        </div>
      </article>
    </div>`;

  const root = document.getElementById('lb');
  root.addEventListener('error', e => { if(e.target?.classList?.contains('lb-img')) e.target.remove(); }, true);
  document.getElementById('lbk').onclick = () => hooks.shelves();
  root.querySelectorAll('[data-act]').forEach(b => b.onclick = () => {
    const a = b.dataset.act;
    if(a === 'words') return openWords(subj, l, hooks);
    /* «إعادة القراءة» من أوّل الكتاب، وما سواها من الجزء الذي عليه الدور */
    if(a === 'read' && text) return hooks.read(l, l.done || read ? first : text);
    if(a === 'quiz' && quiz) return hooks.quiz(l, quiz);
  });
  /* الزرُّ الأوّل يُركَّز: لوحةُ المفاتيح تصل البطاقةَ من رفٍّ بـEnter، فتجد خطوتَها التالية تحت Enter ثانيةً */
  root.querySelector('.btn.primary')?.focus({ preventScroll: true });
  window.scrollTo(0, 0);

  /* الكلماتُ بعد الرسم (③ أعلاه). والمعنى سطرُه الأوّل وحده (`backText` قد يحمل سطرين بلسانين) — والكاملُ في قائمتها.
     ⚠️ `.then(نجاح، فشل)` لا `.catch` — حجّةُ `openWords` بعينها. */
  if(!words) return;
  const { data: cards } = await api.lessonCards(l.id).then(r => r, () => ({}));
  const cw = document.getElementById('lbcw');
  if(!cw || !cards?.length) return;                    // غادر قبل الوصول، أو لا كلمات
  const firstLine = s => String(s || '').split('\n').map(x => x.trim()).find(Boolean) || '';
  const shown = cards.slice(0, WORDS_MAX), rest = cards.length - shown.length;
  cw.innerHTML = shown.map(c => `<li class="lb-cw-i"><b dir="${dirOf(c.front)}">${esc(c.front)}</b>${
      firstLine(backText(c.back)) ? `<span dir="auto">${esc(firstLine(backText(c.back)))}</span>` : ''}</li>`).join('')
    /* ما زاد على عشرٍ بابٌ إلى قائمتها لا عددٌ يُحصى: «الكلمات كلها» اسمٌ لا يحتاج معدوداً يُعرَب */
    + (rest > 0 ? `<li class="lb-cw-more"><button type="button" class="lb-cw-all">الكلمات كلها</button></li>` : '');
  cw.hidden = false;
  cw.querySelector('.lb-cw-all')?.addEventListener('click', () => openWords(subj, l, hooks));
}

/* ── كلماتٌ قبل القراءة — بطاقاتُ الدرس قائمةً تُقرأ وتُسمع، لا جلسةَ تقليب ──
   🔑 **ولماذا لا `openLessonDeck`:** تلك جلسةُ استرجاعٍ (قلبٌ وتقديرٌ و«بعبارتك»)، ومغادرتُها تسأل «إنهاء الجلسة
      الآن؟» — والخطوةُ هنا تمهيدٌ يُتخطّى (spec · المرحلة ٤). فالكلمةُ ومعناها ونطقُها معاً، وزرٌّ واحدٌ إلى الكتاب.
   🔑 **والفتحُ أخذ:** ما ليس في «تذكّرها» يُضمّ الآن — حكمُ `openLessonDeck` بعينه («فتحُها هو أخذُها»)، فتعود الكلمةُ
      بعد أيّامٍ متباعدة. والفشلُ صامت: القائمةُ تُقرأ بلا اشتراك، ويُعاد في الفتح التالي.
   📌 والكلماتُ ملوّنةٌ في الكتاب نفسِه أيضاً (`bookLook` · الملحق) — فالسطرُ تحت العنوان يقول ذلك. */
async function openWords(subj, l, hooks){
  nav('subjects', `/subjects/${subj.id}/lessons/${l.id}`);
  head('', '');
  const text = textOf(l);
  app.innerHTML = `
    <div class="lb lb-view" id="lb">
      <article class="lb-card lb-words">
        <div class="crumb" id="lbk">→ <bdi>${esc(l.title)}</bdi></div>
        <h2 class="lb-card-t">كلمات قبل القراءة</h2>
        <p class="lb-card-sum">تظهر هذه الكلمات ملوّنة في الكتاب، ومعناها بضغطة عليها.</p>
        <div id="lbw">${skeleton('rows', 3)}</div>
        ${text ? '<div class="nav lb-card-btns"><button type="button" class="btn primary" id="lbgo">القراءة</button></div>' : ''}
      </article>
    </div>`;
  document.getElementById('lbk').onclick = () => openBook(subj, l, hooks);
  const go = document.getElementById('lbgo');
  if(go) go.onclick = () => hooks.read(l, text);

  /* ⚠️ `.then(نجاح، فشل)` لا `.catch`: مُنشئُ طلبات Supabase يملك `then` وحدها (عطلُ b155 · `textBook`) */
  const { data, error } = await api.lessonCards(l.id).then(r => r, e => ({ error: e }));
  const host = document.getElementById('lbw');
  if(!host) return;                                   // غادر قبل الوصول
  if(error){ host.innerHTML = errBox(error, 'كلمات الكتاب'); return; }
  const cards = data || [];
  if(!cards.length){ host.innerHTML = '<div class="status">لا كلمات لهذا الكتاب</div>'; return; }

  const fresh = cards.filter(c => !c.mine).map(c => c.id);
  if(fresh.length) api.subscribeCards(fresh).then(() => {}, () => {});

  host.innerHTML = `<ul class="lb-wlist">${cards.map((c, k) => `
    <li class="lb-w" data-k="${k}">
      ${c.front_image ? `<img class="lb-w-img" src="${escA(mediaUrl(c.front_image) || '')}" alt="" loading="lazy">` : ''}
      <div class="lb-w-f" dir="${dirOf(c.front)}"><b>${esc(c.front)}</b>${sayable(c) ? sayGroup(c, c.front) : ''}</div>
      <div class="lb-w-b" dir="auto">${esc(backText(c.back))}</div>
    </li>`).join('')}</ul>`;
  /* النطقُ يُربط بعد الرسم، لكلّ كلمةٍ بصوتها (`bindSay` · ui.js) */
  host.querySelectorAll('.lb-w').forEach(row => {
    const c = cards[Number(row.dataset.k)];
    const say = sayable(c);
    if(say) bindSay(row, c, say);
  });
  host.querySelectorAll('.lb-w-img').forEach(img => img.onerror = () => img.remove());
}
