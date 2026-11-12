/* ══════════════════════════════════════════════════════════
   بيان — library.js · رفوفُ مكتبة بيان  (b236 · المرحلة ٣ من spec-reading-library.md)
                       وبطاقةُ الكتاب ودورتُه  (b237 · المرحلة ٤ — في آخر الملفّ)

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
      **والوسومُ بعائلات المنصّة نفسِها** (`badge ok` · `badge lock` · ومحايدٌ لـ«قيد القراءة»)
      لا بألوان المشهد (ق٩): الخشبُ والذهبُ والعاج زينةُ هذه الشاشة، والمعنى للعائلات.
      و«أُنجز» اسمُها في قائمة الدروس (`lcard`) — فلا اسمَ ثانٍ للحال نفسِها.
   🔑 **والرفُّ يُرسم ولو خلا:** الرفوفُ من `list_strands` لا ممّا ظهر في الدروس — فرفٌّ بلا
      كتبٍ يقول ذلك بنصّه ولا يختفي. وهو خلافُ شريط الفروع في قائمة الدروس عن قصد: الشريطُ
      مصفاةٌ فخيارٌ يُفضي إلى فراغٍ عطل، والرفُّ مكانٌ فغيابُه يُقرأ ضياعاً.
      ⚠️ وإن لم تصل الفروعُ رُسمت الرفوفُ ممّا في الدروس — فشلٌ يُنقص ولا يحجب.
   📐 **ثمانيةُ كتبٍ سعةُ الصفحة** (رفّان في أربع خانات · ق٣) لا قاعدةُ المحتوى: ما زاد يُقلَّب
      صفحات. **والهاتفُ عمودان بلا صفحاتٍ ولا منظور:** التمريرُ هناك طبيعيّ، والمنظورُ على
      عرضٍ ضيّقٍ يأكل الكتب.
   ♿ الرفُّ لسانٌ (`tab`) والكتابُ زرٌّ حقيقيّ: Tab بين الكتب، وEnter يفتح، **والسهمان يبدّلان
      الرفّ** — الأيمنُ للسابق والأيسرُ للتالي، فالصفحةُ عربيّة. **والرفوفُ الخلفيّة لا تُبلَغ
      بـTab:** تُرى ولا تُقرأ (`aria-hidden` · `tabindex=-1`)، ونقرُها يُحضرها إلى الصدارة.
   ══════════════════════════════════════════════════════════ */
import * as api from './api.js';
import { app, head, nav, toast, esc, escA, AR, N, icon, skeleton, errBox,
         sayable, sayGroup, bindSay, backText, dirOf, todayIso, yearsText, birthProblem } from './ui.js';
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

/* قفلٌ متّجهٌ لا إيموجي (هويّةُ اللغة §١١) — بنمط `svg()` في ui.js، وليس في معجمها قفل */
const LOCK = `<svg class="lb-lk" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
  stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="5" y="10.5" width="14"
  height="9.5" rx="2"/><path d="M8.5 10.5V7.8a3.5 3.5 0 017 0v2.7"/></svg>`;

/* ── حالُ الكتاب ونصُّه ── */
function stateOf(l){
  if(l.locked) return 'locked';
  if(l.done)   return 'done';
  if(l.best != null || (l.items || []).some(i => i.status)) return 'reading';
  return 'open';
}
const SAY = {
  done:    l => 'أُنجز' + (l.best != null ? ' ' + AR(Math.round(l.best)) + '٪' : ''),
  reading: () => 'قيد القراءة',
  locked:  () => 'مقفل',
  open:    () => '',
};
const BADGE = { done: 'ok', reading: 'lb-rd', locked: 'lock' };

/* ── الرفوف: الفروعُ النهائيّة بترتيبها، والكتبُ عليها بترتيب المنهج (`list_lessons`) ──
   📌 وترتيبُ الرفوف بـ`sort_order` الفرع نفسِه لا بأصله: «قصص · علوم · سِيَر» (203 ⑤) —
      فالأصلُ (سرديّ · معلوماتيّ) جنسُ النصّ لا ترتيبُ المشهد. */
function shelvesOf(strands, lessons){
  const leaves = (strands || []).filter(s => s.selectable)
    .sort((a, b) => (a.sort_order ?? 0) - (b.sort_order ?? 0) || String(a.name).localeCompare(String(b.name), 'ar'));
  const by = new Map(leaves.map(s => [String(s.id), { key: String(s.id), name: s.name, books: [] }]));
  const loose = [];
  for(const l of lessons){
    const k = l.strand ? String(l.strand.id) : null;
    /* الفروعُ لم تصل ⇒ الرفُّ ممّا في الدرس نفسِه (رأسُ الملفّ) */
    if(k && !leaves.length && !by.has(k)) by.set(k, { key: k, name: l.strand.name, books: [] });
    (k && by.has(k) ? by.get(k).books : loose).push(l);
  }
  const out = [...by.values()];
  /* درسٌ بلا فرعٍ أو على أصلٍ لا على رفّ — لا يضيع: `save_lesson` تمنعه اليوم، والقديمُ قد يحمله */
  if(loose.length) out.push({ key: '_', name: 'كتب أخرى', books: loose });
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
      ${say ? `<span class="badge lb-badge ${BADGE[st]}" aria-hidden="true">${st === 'locked' ? LOCK : ''}${esc(say)}</span>` : ''}
    </span>`;
}

function bookHtml(l, live){
  const st = stateOf(l), say = SAY[st](l);
  /* 📌 و`title` للفأر: لافتةُ العنوان سطرٌ واحدٌ يُقصّ في غلافٍ بعرض ٩٦px، والعنوانُ كاملاً في التلميح */
  return `<button type="button" class="lb-book is-${st}" data-l="${l.id}" ${live ? '' : 'tabindex="-1"'}
      title="${escA(l.title)}" aria-label="${escA(l.title + (say ? '، ' + say : ''))}">
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
  /* الرفُّ الخالي يقول ذلك في رفّه الأوّل فوق لوحه — لا وسطَ الخزانة حيث يقطعه لوحٌ */
  const empty = sh.books.length ? '' : '<p class="lb-empty"><span>لا كتب على هذا الرف بعد</span></p>';
  let html = '';
  for(let r = 0; r < rows; r++){
    const slots = [];
    for(let c = 0; c < cols; c++){
      const b = list[r * cols + c];
      slots.push(`<div class="lb-slot">${b ? bookHtml(b, live) : GHOST}</div>`);
    }
    html += `<div class="lb-row">${slots.join('')}${r === 0 ? empty : ''}</div>`;
  }
  return html;
}

function caseHtml(sh, i, page){
  return `<section class="lb-case" id="lb-c-${i}" role="tabpanel" aria-labelledby="lb-t-${i}" data-i="${i}">
    <header class="lb-crown"><span class="lb-plate" dir="auto">${esc(sh.name)}</span></header>
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

  /* 📌 والرأسُ والألسنةُ في لوحٍ واحد (`.lb-top`): الحديقةُ خلفيّةُ الصفحة كلِّها، والنصُّ لا يُكتب على صورة (library.css) */
  if(!shelves.length){
    app.innerHTML = `<div class="lb" id="lb"><div class="lb-top">${top}
      <div class="status">لا كتب في مستواك بعد</div></div></div>`;
    bindTop?.();
    return;
  }

  const many = shelves.length > 1;
  app.innerHTML = `
    <div class="lb" id="lb">
      <div class="lb-top">
        ${top}
        <div class="lb-prog" id="lbProg" hidden></div>
        <div class="tabs lb-tabs" role="tablist" aria-label="الأرفف">
          ${shelves.map((s, i) => `<button type="button" class="tab lb-tab" role="tab" id="lb-t-${i}"
              aria-controls="lb-c-${i}"><bdi>${esc(s.name)}</bdi><span class="lb-n">${AR(s.books.length)}</span></button>`).join('')}
        </div>
      </div>
      <div class="lb-stage">
        ${many ? `<button type="button" class="lb-arrow lb-prev" aria-label="الرف السابق">${icon('back')}</button>` : ''}
        <div class="lb-scene">${shelves.map((s, i) => caseHtml(s, i, pageOf(i))).join('')}</div>
        ${many ? `<button type="button" class="lb-arrow lb-next" aria-label="الرف التالي">${icon('back')}</button>` : ''}
      </div>
      <div class="lb-pager" hidden></div>
    </div>`;
  bindTop?.();

  const root  = document.getElementById('lb');
  const cases = [...root.querySelectorAll('.lb-case')];
  const tabs  = [...root.querySelectorAll('.lb-tab')];
  const pager = root.querySelector('.lb-pager');

  const save = () => {
    try{
      sessionStorage.setItem(keyOf(subj), JSON.stringify({
        shelf: shelves[at].key, pages: Object.fromEntries(pages) }));
    }catch(e){}
  };

  /* المواضعُ أربعة: الصدارة · السابقُ يميناً · التالي يساراً · وما خلفهما مخفيّ. والدورانُ حلقة:
     ثلاثةُ أرففٍ تُرى كلُّها دائماً، والأوّلُ سابقُه الأخير. */
  function place(){
    const n = shelves.length;
    cases.forEach((c, i) => {
      const d = ((i - at) % n + n) % n;
      const pos = d === 0 ? 'front' : d === 1 ? 'next' : d === n - 1 ? 'prev' : 'back';
      c.dataset.pos = pos;
      const live = pos === 'front';
      c.setAttribute('aria-hidden', live ? 'false' : 'true');
      c.querySelectorAll('button.lb-book').forEach(b => { b.tabIndex = live ? 0 : -1; });
    });
    tabs.forEach((t, i) => {
      const on = i === at;
      t.classList.toggle('on', on);
      t.setAttribute('aria-selected', on ? 'true' : 'false');
      t.tabIndex = on ? 0 : -1;
    });
    paintPager();
    save();
  }

  function go(i, focus){
    const n = shelves.length;
    at = ((i % n) + n) % n;
    place();
    if(focus) tabs[at].focus();
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
    const tab = e.target.closest('.lb-tab');
    if(tab) return go(tabs.indexOf(tab));

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

  /* السهمان يبدّلان الرفّ من أيّ موضعٍ في المكتبة إلا حقلاً يُكتب فيه — والتركيزُ إلى لسان الرفّ
     الجديد: كتابُ الرفّ الراحل خرج من Tab، فتركيزٌ يبقى عليه يتيه. */
  root.addEventListener('keydown', e => {
    if(!many || (e.key !== 'ArrowLeft' && e.key !== 'ArrowRight')) return;
    if(e.target.closest('input, textarea, select, [contenteditable="true"]')) return;
    e.preventDefault();
    go(at + (e.key === 'ArrowLeft' ? 1 : -1), true);
  });

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

  place();
  /* 🆕 b238 · وتاجُ المكتبة يلحق بالرفوف ولا يؤخّرها — نداءٌ بعد الرسم، وفشلُه يُبقيه مطويّاً */
  paintProgress(subj, root.querySelector('#lbProg'), hooks);
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

  const done = Number(d.done || 0), rule = d.rule, next = d.next;
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
    toast('انتقلت إلى ' + (r.level || ''));
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

const textOf = l => (l.items || []).find(i => i.kind === 'text');
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
  const text = textOf(l), quiz = quizOf(l);
  const read = text?.status === 'completed';
  const words = Number(l.cards || 0);

  /* الخطوات — ما ليس للكتاب لا يُعرض (كتابٌ بلا كلماتٍ يبدأ بالقراءة).
     📌 وعلامةُ «تمّت» محايدة لا `ok`: إنجازُ خطوةٍ حالٌ لا حكمٌ على إجابة (الهويّةُ البصريّة ①) —
        والحكمُ وسمُ «أُنجز» على الغلاف، بنتيجته. */
  const steps = [
    words ? { name: 'كلمات قبل القراءة', meta: N(words, 'كلمة', 'كلمتان', 'كلمات', 'كلمة') } : null,
    text  ? { name: 'القراءة', meta: read ? 'تمّت' : text.status ? 'بدأتها' : '', done: read } : null,
    quiz  ? { name: 'أسئلة الفهم', done: !!l.done,
              meta: l.best != null ? `أفضل نتيجة ${AR(Math.round(l.best))}٪` : `المطلوب ${AR(l.pass_mark ?? 80)}٪` } : null,
  ].filter(Boolean);

  /* الزرُّ الأوّل خطوتُك التالية، وما بعده أبوابُ الخطوات الأخرى — والأزرارُ مصادر (الهويّةُ اللغويّة §٦) */
  let main;
  if(l.done)              main = text ? ['read', 'إعادة القراءة'] : ['quiz', 'إعادة الاختبار'];
  else if(read && quiz)   main = ['quiz', 'أسئلة الفهم'];
  else if(text?.status)   main = ['read', 'متابعة القراءة'];
  else if(text || quiz)   main = [words ? 'words' : text ? 'read' : 'quiz', 'البدء'];
  const more = [];
  if(main && words && main[0] !== 'words') more.push(['words', 'الكلمات']);
  if(main && text && main[0] !== 'read')   more.push(['read', main[1] === 'البدء' ? 'تخطّي الكلمات' : 'القراءة']);
  if(main && quiz && main[0] !== 'quiz' && (read || l.done || l.best != null))
    more.push(['quiz', l.done ? 'إعادة الاختبار' : 'أسئلة الفهم']);

  const kicker = [l.strand?.name, l.level].filter(Boolean).map(x => `<bdi>${esc(x)}</bdi>`).join('، ');

  app.innerHTML = `
    <div class="lb lb-view" id="lb">
      <article class="lb-card">
        <div class="crumb" id="lbk">→ رجوع للرفوف</div>
        <div class="lb-card-in">
          <div class="lb-card-cover">${jacket(l, st, say)}</div>
          <div class="lb-card-body">
            ${kicker ? `<div class="lb-card-k">${kicker}</div>` : ''}
            <h2 class="lb-card-t" dir="auto">${esc(l.title)}</h2>
            ${l.summary ? `<p class="lb-card-sum" dir="auto">${esc(l.summary)}</p>` : ''}
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
    if(a === 'read' && text) return hooks.read(l, text);
    if(a === 'quiz' && quiz) return hooks.quiz(l, quiz);
  });
  /* الزرُّ الأوّل يُركَّز: لوحةُ المفاتيح تصل البطاقةَ من رفٍّ بـEnter، فتجد خطوتَها التالية تحت Enter ثانيةً */
  root.querySelector('.btn.primary')?.focus({ preventScroll: true });
  window.scrollTo(0, 0);
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
