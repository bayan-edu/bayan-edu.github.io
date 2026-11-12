/* ══════════════════════════════════════════════════════════
   بيان — library.js · رفوفُ مكتبة بيان  (b236 · المرحلة ٣ من spec-reading-library.md)

   المكتبةُ واجهةُ عرضٍ لدروس المادّة ٧ (`sk_read`) لا نظامٌ جديد: الرفُّ فرعٌ من
   فروعها، والكتابُ درسٌ كما تُرجعه `list_lessons` — بغلافه (`203`) وحاله وأفضلِ
   نتيجته. فلا نداءَ هنا يكتب شيئاً، ولا حالَ تُحسب إلا ممّا وصل.
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
import { app, toast, esc, escA, AR, icon } from './ui.js';
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
function bookHtml(l, live){
  const st = stateOf(l), say = SAY[st](l);
  const src = l.cover ? mediaUrl(l.cover) : null;
  /* 🔑 الغلافُ المولَّد يُرسم دائماً تحت الصورة: فإن لم تصل الصورة (`error` في `paintLibrary`)
        أُزيلت فظهر ما تحتها — لا مستطيلٌ فارغ. وكتابٌ بلا غلافٍ اليوم هو الحالُ الغالب (عائقُ محتوى).
     📌 والنبرةُ من المعرّف لا عشوائيّة: الكتابُ يلبس اللونَ نفسَه في كلّ زيارة. */
  /* 📌 و`title` للفأر: لافتةُ العنوان سطرٌ واحدٌ يُقصّ في غلافٍ بعرض ٩٦px، والعنوانُ كاملاً في التلميح */
  return `<button type="button" class="lb-book is-${st}" data-l="${l.id}" ${live ? '' : 'tabindex="-1"'}
      title="${escA(l.title)}" aria-label="${escA(l.title + (say ? '، ' + say : ''))}">
    <span class="lb-jacket">
      <span class="lb-gen" data-t="${Math.abs(Number(l.id) || 0) % 4}" aria-hidden="true"><span
        class="lb-gen-t" dir="auto">${esc(l.title)}</span></span>
      ${src ? `<img class="lb-img" src="${escA(src)}" alt="" loading="lazy" decoding="async">` : ''}
      ${say ? `<span class="badge lb-badge ${BADGE[st]}" aria-hidden="true">${st === 'locked' ? LOCK : ''}${esc(say)}</span>` : ''}
    </span>
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
 * @param o        { top: رأسُ المادّة (html) · bindTop: ربطُه · open: فتحُ الدرس }
 */
export async function paintLibrary(subj, lessons, strands, { top = '', bindTop, open }){
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
}
