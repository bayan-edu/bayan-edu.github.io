/* ══════════════════════════════════════════════════════════
   بيان — editor_cards.js  ④  البطاقات

   أداةُ إنتاجٍ لا استهلاك — ولهذا سبقت شاشةَ الطالب:
   الشاشة تُصقل ببطاقةٍ تُراجَع، والمحرّر هو الذي يُنتجها.

   🔑 والمجموعة تتبع (مادة · صفّ) لا مقرَّراً — لأن lessons لا
      تحمل course_id، وcourses.path_id يجعل الدرسَ الواحد ينتمي
      لعدّة مقرَّرات. ⇒ ندخل من المقرَّر ونكتب subject_id + level_id.

   وقلبُ الشاشة زرُّ «لصق قائمة»: عمودان من Word أو Excel، يُحلَّلان
   في المتصفح ثم save_cards في نداءٍ واحد. وإعادة اللصق **تصحيحٌ
   لا تكرار** — الفهرس على (deck_id, front_key) يتكفّل بذلك.

   🆕 b135 · وقد صار للوسائط محرّر: زرُّ رفعٍ لكلّ حقلٍ من الثلاثة
      (صورةُ الوجه · صورةُ المعنى · النُّطق) عبر `attachUpload`، والمفتاحُ
      يُلصق يدوياً كما كان فلا يُكسَر عُرف. والجرّةُ في الوجهين معاً —
      في المعاينة أسفلَ هذا الملفّ وفي جلسة الطالب بنداءٍ واحد
      (`cardImg` في `ui.js`)، فلا يرى المؤلّف ما لا يراه الطالب.
      وسلسلةُ الصورة: `160` العمودُ والمخزن · `161` البوّابةُ وdeck_cards ·
      `162` وdue_cards — فبلغت الطالبَ، وقِيس ذلك على الحيّ لا بالظنّ.

   🆕 b216 · وصوتُ الوجه العربيّ يُولَّد من النموذج نفسِه (`card_voice.js`): مفتاحُه يملأ حقلَ النطق، وحفظُ البطاقة هو الاعتماد.
   ══════════════════════════════════════════════════════════ */
import * as api from './api.js';
import { app, head, toast, esc, escA, AR, errBox, nav, setWide, scrollTop, dirOf, backText, backMeta, shrinkFont, examples, pickExample, sayable, sayGroup, bindSay, cardImg, N } from './ui.js';

import { openCourse, courseTags, toolBtn } from './editor.js';
import { practiceLinkBox } from './practice_links.js';
import { attachUpload } from './upload.js';
import { cardVoice } from './card_voice.js';
import { needVoice, deckVoices } from './voice_rows.js';

let ctx = null;   // { course, lessons }
let D   = [];     // المجموعات
let cur = null;   // المجموعة المفتوحة
let C   = [];     // بطاقاتها
let TAG = false;  // وضعُ الوسم الجماعي مفتوح؟ (b131)
let SEL = new Set();  // معرّفاتُ البطاقات المحدَّدة فيه
/* 🔴 والوجهةُ تُحفَظ خارج الرسم: كلُّ تحديدٍ يُعيد رسمَ الشريط، فمُنتقٍ
   يقرأ قيمتَه من DOM يعود إلى «— اختر درساً —» بعد كلّ نقرة — فيختار
   المؤلّف الدرسَ ثمّ يحدّد بطاقاته فيضيع اختيارُه بلا إنذار. */
let TG  = { lesson: '', strand: '' };

/* 🆕 b134 · وحالةُ المِصفاة تسكن هنا **للعلّة نفسِها** المكتوبة فوق:
   كلُّ تحديدٍ ووسمٍ يُعيد الرسم، ومِصفاةٌ تُقرأ من DOM تضيع عند أوّل
   نقرة — فيبحث المراجعُ ثمّ يُحدّد فيضيع بحثُه بلا إنذار. */
let F = { q: '', lesson: '', strand: '', flag: '', sort: 'pos' };

/* 🆕 b217 · وتشغيلُ «توليد الأصوات» الجاري أو الأخير ({ state, stop, done } · `deckVoices`) — يسكن هنا لا في الرسم: الشاشةُ تُرسم من جديد
   مع كلّ وسمٍ وتصفية، والتوليدُ يمضي عشرَ دقائق، فلوحتُه تُبنى من حاله أينما عاد المؤلّف إلى مجموعته. */
let VR = null;

/* 🆕 b224 · وموضعُ المؤلّف في القائمة يسكن هنا للعلّة نفسِها — طلبُ المالك (٧ نوفمبر) بلقطةٍ من ٣٩٧ بطاقة.
   🔴 **وكانت كلُّ عودةٍ تمرّ بـ`openDeck`:** تُفرغ المِصفاةَ والبحثَ والترتيب، وتصعد إلى أوّل القائمة. فمراجعةُ
      ٣٩٧ صوتاً من نماذجها (لوحةُ «أصوات المجموعة» تطلبها) بحثٌ عن الموضع ٣٩٧ مرّة — **قِيس قبل التعديل:** مِصفاةُ
      ٤٤ بطاقة ⇐ ٣٩٧ بلا مِصفاة، والبطاقةُ على بعد ٢٤٨٠٠px من أعلى الشاشة. ومثلُه كان في كلّ تحديدٍ بالوسم.
   ⇒ `LAST` آخرُ بطاقةٍ فُتح نموذجُها، وصفُّها يقول «هنا توقّفت». و`SPOT` موضعُ صفّها في النافذة لحظةَ فتحه
     وجارُه التالي في الظاهر (`keepSpot`) — والعودةُ تُعيده إلى موضعه بعينه (`backToList`).
   🔑 **والجارُ لبطاقةٍ أخرجها التعديلُ من المِصفاة** (أُضيفت صورةٌ في «بلا صورة»): يقوم مقامَها في موضعها،
      فتصير المِصفاةُ قائمةَ عملٍ تقصر مع كلّ إصلاح — ويُقال للمؤلّف إنّها خرجت، فلا يظنّها ضاعت. */
let LAST = null;
let SPOT = null;   // { id, top, next, y }

/* 🆕 b225 · والصفحات — طلبُ المالك (٧ نوفمبر): «عرضها على صفحات كلُّ صفحةٍ تحتوي على عددٍ معيّنٍ يمكن تحديده
   (10-20-30-100) لسهولة التحرير والتعديل».
   🔑 **والصفحةُ شريحةٌ من الظاهر لا مِصفاةٌ ثانية:** `visible()` تبقى حكمَ ما يُرى، والصفحةُ تقطعه — فالعدّادُ
      والرقائقُ ورابطُ التدرّب والمعاينةُ تعدّ ما طابق كلَّه، لا ما في الصفحة.
   📌 والعددُ يُحفظ في المتصفّح لا في القاعدة: راحةُ ناظرٍ لا حالُ مجموعة. والصفحةُ حالُ الجلسة كالمِصفاة —
      وفتحُ المجموعة من جديد يبدأ من الأولى. */
const SIZES = [10, 20, 30, 100];
const SIZE_KEY = 'ed-cards-page';
let PG = { size: 20, page: 1 };
try{ const v = +localStorage.getItem(SIZE_KEY); if(SIZES.includes(v)) PG.size = v; }catch(e){}


/* ═══════════ رقائقُ الحال — عدٌّ ومِصفاةٌ في عنصرٍ واحد ═══════════

   🔑 **والمِصفاةُ تُحاكي حارسَ البوّابة ولا تخترع معياراً.**
   `import_cards` (الملفّ `159`) تُنذر بثلاثةٍ بأعيانها: **أمثلةٌ أقلُّ
   من ثلاثة · بلا درس · بندان متطابقان** — فهذه هي الرقائق، لا غيرُها.
   **ومعيارٌ لا تقيسه البوّابةُ يُنتج مسطرتين تفترقان.**

   📌 وصيغتُها مُعادةٌ من `editor_quiz.js` («عدٌّ هو في حقيقته **فلتر**»)
      بفئتها `eq-kb` — **ولا ملفَّ ثانٍ ولا لونَ جديد.**

   ⚠️ **وفرقٌ مقيسٌ يُقال: البوّابةُ تعدّ الأمثلةَ بالفاصلة `؛` وحدَها،
      و`examples()` تشطر بها وبالسطر الجديد و` | ` معاً.** فنوتةٌ بأسطرٍ
      يختلف عدُّها بين الشاشة والبوّابة. واعتُمدت `examples()` هنا لأنّها
      **ما يقرؤه الطالبُ فعلاً** — والصفُّ نفسُه يعرض بها «٣ أمثلة».
      والتوحيدُ بينهما بندٌ مفتوحٌ لا يُحسم في شاشة.

   🆕 b135 · و«بلا صورة» دخلت بعد أن صار لها بيانات: `deck_cards` تردّ
      `front_image` منذ `161`. **وكانت مؤجَّلةً بقصد**، لأنّ رقيقةً تقول
      «بلا صورة» وفي البطاقة صورةُ وجهٍ **تكذب**.
      ⚖️ وهي الوحيدةُ التي ليست تحذيرَ بوّابة: **البوّابةُ لا تُنذر بغياب
         صورة، ولا ينبغي** — فليست كلُّ بطاقةٍ تستحقّها. وهي هنا **بُعدُ
         مراجعةٍ لا حكمَ نقص**، ولهذا تبقى محايدةً ولا تلبس الكهرمان. */

const FLAGS = {
  few: { label: 'أمثلتها أقلُّ من ثلاثة', warn: true,
         hit: c => examples(c.note).length < 3 },
  nol: { label: 'بلا درس', warn: true,
         hit: c => !(c.lessons || []).length },
  dup: { label: 'بندان متطابقان', warn: true,
         hit: c => { const x = examples(c.note);
                     return x.length > 1 && new Set(x).size !== x.length; } },
  nim: { label: 'بلا صورة', warn: false,
         hit: c => !c.image && !c.front_image },
};


/* الظاهرُ الآن — دالّةٌ نقيّة: لا حالةَ فيها ولا أثرَ لها خارجها.
   🔑 **والترشيحُ في المتصفّح لا في القاعدة:** `deck_cards` تجلب
   المجموعةَ كلَّها بنداءٍ واحد، وهي واحدةٌ لكلّ (مادة · صفّ) — فنداءٌ
   لكلّ حرفٍ يُكتب إسراف. والحدُّ يُعاد النظرُ فيه يوم يُقاس لا اليوم. */
function visible(){
  const q = F.q.trim().toLowerCase();
  const out = C.filter(c => {
    if(F.lesson && !(c.lessons || []).some(l => String(l.id) === F.lesson)) return false;
    if(F.strand && !(c.strands || []).some(s => String(s.id) === F.strand)) return false;
    if(F.flag   && !FLAGS[F.flag].hit(c)) return false;
    if(q && !`${c.front} ${c.back} ${c.note || ''}`.toLowerCase().includes(q)) return false;
    return true;
  });
  if(F.sort === 'abc') out.sort((a, b) => String(a.front).localeCompare(String(b.front), 'ar'));
  if(F.sort === 'new') out.sort((a, b) => b.id - a.id);
  return out;                 /* 'pos' — ترتيبُ المؤلّف كما ردّته القاعدة */
}

/* 🆕 b225 · الصفحاتُ من الظاهر. والصفحةُ تُحصر في مداها عند كلّ قراءة: حذفٌ أو مِصفاةٌ تُقصّر القائمة
   فلا تبقى صفحةٌ فارغةٌ يُسأل عمّا فيها. */
const pages    = () => Math.max(1, Math.ceil(visible().length / PG.size));
const clampPg  = () => { PG.page = Math.min(Math.max(1, PG.page), pages()); };
const pageRows = () => { clampPg(); return visible().slice((PG.page - 1) * PG.size, PG.page * PG.size); };
const pageOf   = id => {
  if(id == null) return null;
  const i = visible().findIndex(c => String(c.id) === String(id));
  return i < 0 ? null : Math.floor(i / PG.size) + 1;
};


/* ═══════════ الدخول ═══════════ */

/* 🆕 b151 · والوسيطُ الثاني **درسٌ يُرشَّح به عند الفتح** — يأتي من أيقونة
   البطاقات على صفّ الدرس في المحرّر (`167`). ولم يُبنَ له مرشّحٌ جديد:
   `F.lesson` قائمٌ في شريط المصفاة منذ كُتب، وهذا يُمهره لا غير.
   🔑 **والمِصفاةُ تُعرَض لا تُخفى:** المنسدلةُ تُظهر اسمَ الدرس المنتقى
      و«كلُّ الدروس» على بعد نقرة — فمن جاء من درسٍ يعرف لِمَ يرى بعضاً،
      ويخرج منه بلا أن يتعلّم مساراً جديداً. */
export async function openCards(course, lessonId){
  ctx = { course, lessons: [] };
  nav('editor'); setWide(true);
  /* 🆕 b187 · البروازُ (المادّة · الصفّ) بدل سطرٍ تحت العنوان — كشاشة دروس المقرَّر
     (`b186`)، وطلبُ المالك: «بنفس الأسلوب». وهما مفتاحُ المجموعة بعينه (رأسُ الملفّ)،
     ويُحسبان مرّةً هنا فيرثهما كلُّ ما يُفتح من المجموعة: الشاشاتُ الفرعيّة لا تنادي
     `head()`، فالرأسُ يبقى رأسَ المجموعة وهي مفتوحة. */
  ctx.tags = await courseTags(course);
  head("البطاقات", "", false, ctx.tags);
  app.innerHTML = `<div class="status">جار التحميل…</div>`;

  const [decks, lessons, strands] = await Promise.all([
    api.subjectDecks(course.subject_id),
    api.authorLessons(course.id),
    api.listStrands(course.subject_id)
  ]);
  if(decks.error){ app.innerHTML = errBox(decks.error, 'البطاقات'); return; }

  D = decks.data || [];
  ctx.lessons = lessons.data || [];
  /* الفروعُ المنتقاة وحدها: الأبُ غيرُ المنتقى عنوانٌ لا وجهةٌ للوسم */
  ctx.strands = (strands.data || []).filter(s => s.selectable !== false);

  /* 🆕 b134 · ولا شاشةَ وسطى بعد اليوم.
     🔴 **المجموعةُ الرسميّةُ واحدةٌ لكلّ (مادة · صفّ) منذ `157`** —
     **وقائمةٌ لا تحمل إلا واحداً ليست قائمة، بل بابٌ بين المؤلّف
     وعمله.** وكانت الشاشةُ صادقةً يومَ كانت المجموعاتُ عدّة، فبقيت
     بعد أن أفرغها القيد.
     📌 **ووظائفُها الثلاث بقيت، كلٌّ حيث يُرى سببُه:** الإنشاءُ حالةُ
        فراغٍ أدناه · والحذفُ وهي فارغةٌ في شاشة البطاقات · وعدُّ
        مجموعات الطلاب سطرٌ في ذيلها. */
  const off = D.find(d => !d.mine && (course.level_id ? d.level_id === course.level_id : true)) || D.find(d => !d.mine);
  off ? openDeck(off, lessonId) : renderNoDeck();
}


/* ═══════════ ① لا مجموعةَ بعد — حالةُ فراغٍ لا قائمةُ صفر ═══════════ */

function renderNoDeck(){
  app.innerHTML = `
    <div class="crumb" id="bk">→ عودة لدروس المقرَّر</div>
    <div class="ed-sec">
      <div class="grp">بطاقات المادة</div>
      <div class="ed-empty">لا مجموعة بعد. وهي حاويةٌ واحدةٌ لبطاقات المادة
        كلِّها — والتصنيفُ بالدرس والفرع على البطاقة نفسِها.</div>
      <div class="nav" style="margin-top:14px">
        <button class="btn primary" id="new">＋ إنشاء مجموعة المادة</button>
      </div>
    </div>`;
  document.getElementById('bk').onclick  = () => openCourse(ctx.course);
  document.getElementById('new').onclick = () => deckForm(null);
  scrollTop();
}


/* ═══════════ ② نموذج المجموعة ═══════════ */

function deckForm(d){
  app.innerHTML = `
    <div class="crumb" id="bk">→ عودة للبطاقات</div>
    <div class="ed-form">
      <div class="ed-side">
        <div class="ed-hint">💡 <b>المجموعة حاوية</b> واحدةٌ للمادة
          والصفّ، وليست تصنيفاً. وبها تُدخَل البطاقة مرّةً ولا تتكرّر
          في المادة.</div>
        <div class="ed-hint" style="opacity:.75">والتصنيفُ على البطاقة
          نفسِها ببُعدين: <b>الدرس</b> يقول أين تظهر، و<b>الفرع</b>
          يقول ما نوعُها. وبطاقةٌ واحدةٌ تظهر في عدّة دروس.</div>
      </div>

      <div class="card" style="flex:1">
        <label class="fl">عنوان المجموعة *</label>
        <input type="text" id="ti" value="${esc(d?.title || '')}"
               placeholder="مثال: بطاقات اللغة العربية">

        <div class="nav" style="margin-top:20px">
          <button class="btn primary" id="sv">حفظ</button>
        </div>
      </div>
    </div>`;

  document.getElementById('bk').onclick = () => openCards(ctx.course);
  document.getElementById('sv').onclick = async () => {
    const title = document.getElementById('ti').value.trim();
    if(!title) return toast('العنوان مطلوب', false);

    /* ولا lesson يُرسَل (sql/157): save_deck تصيح إن أُرسل */
    const { error } = await api.saveDeck({
      id: d?.id ?? null, title,
      subject: ctx.course.subject_id, level: ctx.course.level_id ?? null });
    if(error) return toast(error.message, false);
    toast('حُفظت'); openCards(ctx.course);
  };
  scrollTop();
}


/* ═══════════ ③ بطاقات المجموعة ═══════════ */

async function openDeck(d, lessonId){
  cur = d; TAG = false; SEL.clear(); LAST = SPOT = null; PG.page = 1;
  /* والدرسُ نصٌّ لا رقم: المقارنةُ في `pass()` و`sel()` كلتاهما
     `String(id) === F.lesson` — فرقمٌ هنا يُسقط المصفاة صامتاً. */
  F = { q: '', lesson: lessonId ? String(lessonId) : '',
        strand: '', flag: '', sort: 'pos' };
  head("البطاقات", "", false, ctx.tags);
  app.innerHTML = `<div class="status">جار التحميل…</div>`;
  const { data, error } = await api.deckCards(d.id);
  if(error){ app.innerHTML = errBox(error, 'بطاقات المجموعة'); return; }
  C = data || [];
  renderCards();
  scrollTop();
}

/* 🆕 b224 · يُحفظ الموضعُ قبل مغادرة القائمة إلى شاشةٍ من شاشاتها: نموذجُ البطاقة (`id` بطاقتُه، ولا `id` لجديدة)
   واللصقُ والمعاينةُ ورابطُ التدرّب. ويُقاس الصفُّ في النافذة لا الصفحةُ وحدها: ما فوقه قد يطول وهو غائب
   (لوحةُ الأصوات تُكمل توليدها)، فموضعُه من أعلى الشاشة أصدقُ من رقم التمرير. */
function keepSpot(id = null){
  const rows = visible(), i = rows.findIndex(c => c.id === id);
  const el = id == null ? null : document.querySelector(`#cdList .ed-row[data-c="${id}"]`);
  SPOT = { id, y: window.scrollY,
           top:  el ? el.getBoundingClientRect().top : null,
           next: i < 0 ? null : (rows[i + 1] || rows[i - 1] || {}).id ?? null };
}

/* 🔴 ونزولُ هذه الشاشات إلى أعلاها فوريٌّ لا انسيابيّ (`scrollTop`). الانسيابُ يجري بعد رسمها نصفَ ثانية، ومن عاد
   قبل تمامه (نقرةٌ خاطئةٌ على ✏️ ثمّ «عودة») طُبّقت بقيّتُه فوق العودة — **قِيس في Edge:** عودةٌ بعد ١٥٠ms أنزلت
   البطاقةَ ١٠٤–١٣٣px عن موضعها، وبعد ٦٠٠ms وقعت فيه بعينه. والشاشةُ تُستبدل كلُّها، فلا يُفقد بالفوريّ شيء. */
const toTop = () => window.scrollTo(0, 0);

/* والعودةُ إلى القائمة كما تُركت: المِصفاةُ والترتيبُ ووضعُ الوسم وتحديدُه على حالها، والبطاقةُ في موضعها من الشاشة.
   والقراءةُ من القاعدة لا من الذاكرة (حكمُ الوسم أدناه): ما حُفظ في النموذج يُرى في صفّه كما حُفظ.
   📌 و`made` بطاقةٌ جديدة حُفظت — لا موضعَ لها قبل الحفظ، فتُنزَل إليها في وسط الشاشة. */
async function backToList(made){
  const s = SPOT; SPOT = null;
  const id = s?.id ?? made ?? null;
  if(id != null) LAST = id;
  app.innerHTML = `<div class="status">جار التحميل…</div>`;
  const { data, error } = await api.deckCards(cur.id);
  if(error){ app.innerHTML = errBox(error, 'بطاقات المجموعة'); return; }
  C = data || [];
  /* 🆕 b225 · وصفحتُها قبل الرسم: صفحةُ البطاقة، أو صفحةُ جارِها إن خرجت من المِصفاة — وإلّا فالتي تُركت */
  PG.page = pageOf(id) ?? pageOf(s?.next) ?? PG.page;
  renderCards();
  if(!s) return;

  const row = k => k == null ? null : document.querySelector(`#cdList .ed-row[data-c="${k}"]`);
  const at  = (el, top) => window.scrollTo(0, window.scrollY + el.getBoundingClientRect().top - top);
  const el = row(id), nx = row(s.next);
  if(el && s.top != null) at(el, s.top);
  else if(el) el.scrollIntoView({ block: 'center' });
  else if(nx && s.top != null) at(nx, s.top);
  else window.scrollTo(0, s.y);
  /* والتركيزُ إلى زرّ تحريرها — أو جارِها إن خرجت: من يتنقّل بلوحة المفاتيح يكمل من موضعه، لا من أوّل الصفحة */
  if(id != null) (el || nx)?.querySelector('[data-ed]')?.focus({ preventScroll: true });
}

/* إعادةُ القراءة في موضعها — بعد حذفٍ من القائمة نفسِها: الصفُّ يغيب، وما تحته يصعد إلى مكانه */
async function reload(){
  const y = window.scrollY;
  const { data, error } = await api.deckCards(cur.id);
  if(error) return toast(error.message, false);
  C = data || [];
  renderCards();
  window.scrollTo(0, y);
}

/* شريطُ الفرز والمِصفاة — فوق القائمة، لا داخلَ صفوفها */
function filterBar(){
  const sel = (k, rows, label, head) => `
    <select id="f_${k}" data-fk="${k}" class="eq-obj" style="max-width:220px;margin:0">
      <option value="">${head}</option>
      ${rows.map(r => `<option value="${r.id}"${
        String(r.id) === F[k] ? ' selected' : ''}>${esc(r[label])}</option>`).join('')}
    </select>`;

  /* 🔑 **والصفرُ يُعرض ولا يُخفى** (سابقةُ `b133`): «بلا درس ٠» معلومةٌ
     يحتاجها المراجع — ورقيقةٌ غائبةٌ تُقرأ سهواً لا طمأنينة.
     📌 و`lack` الكهرمانيّة حيث العددُ فوق الصفر: هي جملةُ `warn`
        نفسُها — «انتبه»، لا حكمٌ على إجابةِ طالب. */
  const kb = k => {
    const m = C.filter(FLAGS[k].hit).length;
    return `<button class="eq-kb${F.flag === k ? ' on' : ''}${
      m && FLAGS[k].warn ? ' lack' : ''}"
      data-fl="${k}" title="${esc(FLAGS[k].label)} — عرضُها وحدها"
      ><b>${AR(m)}</b><span>${esc(FLAGS[k].label)}</span></button>`;
  };

  return `<div class="ed-filter">
    <div class="eq-brow">
      <input type="search" id="f_q" class="eq-obj" style="max-width:280px;margin:0"
             placeholder="بحثٌ في الوجه والمعنى والأمثلة" value="${esc(F.q)}">
      ${sel('lesson', ctx.lessons || [], 'title', 'كلُّ الدروس')}
      ${sel('strand', ctx.strands || [], 'name',  'كلُّ الفروع')}
      <span class="eq-strip-g"></span>
      <select id="f_sort" class="eq-obj" style="max-width:180px;margin:0">
        <option value="pos"${F.sort === 'pos' ? ' selected' : ''}>ترتيبُ المؤلّف</option>
        <option value="abc"${F.sort === 'abc' ? ' selected' : ''}>أبجديٌّ بالوجه</option>
        <option value="new"${F.sort === 'new' ? ' selected' : ''}>الأحدثُ إدخالاً</option>
      </select>
      ${/* 🆕 b225 · عددُ الصفحة بجوار الترتيب: كلاهما يقول كيف تُعرض القائمة لا ما فيها. ولا يظهر لمجموعةٍ
            لا تملأ أصغرَ صفحة — منتقٍ لا يغيّر شيئاً أثاثٌ لا أداة (حكمُ الشريط نفسِه على المجموعة الفارغة). */''}
      ${C.length > SIZES[0] ? `<select id="f_size" class="eq-obj" style="max-width:150px;margin:0"
              aria-label="عدد البطاقات في الصفحة">
        ${SIZES.map(n => `<option value="${n}"${n === PG.size ? ' selected' : ''}>${AR(n)} في الصفحة</option>`).join('')}
      </select>` : ''}
    </div>
    <div class="eq-brow" style="margin-top:10px">
      ${Object.keys(FLAGS).map(kb).join('')}
      <span class="eq-strip-g"></span>
      <span class="ed-fstat" id="cdStat">${statText(visible().length)}</span>
      ${/* 🔑 ومعطَّلٌ في الرسم لا في الربط وحده: بين أوّل طلاءٍ وعملِ
            JS لحظةٌ يبدو فيها الزرُّ فاعلاً وهو لا يفعل — وزرٌّ يكذب
            لحظةً يُعلّم أنّ الأزرار تكذب. قِيس في المتصفّح. */''}
      <button class="it-b" id="f_clr"${sifted() ? '' : ' disabled'}>رفعُ المِصفاة</button>
    </div>
  </div>`;
}

const sifted = () => !!(F.q || F.lesson || F.strand || F.flag);

const statText = n => sifted()
  ? `يُعرض ${AR(n)} من ${AR(C.length)}`
  : N(C.length, 'بطاقة', 'بطاقتان', 'بطاقات', 'بطاقة');


/* 🔴 **ولا يُعاد رسمُ الشريط عند كلّ حرف:** حقلُ البحث يفقد التركيز،
   فيكتب المراجعُ حرفاً ثمّ يُطرَد منه. فتُحدَّث القائمةُ وحدَها —
   وهي سابقةُ `editor_quiz.js` بنصّها: «الرقائق وحدها، فلا يُعاد رسمُ
   الشريط كلِّه عند تبديل فلتر». */
function redrawList(){
  const box = document.getElementById('cdList');
  if(!box) return renderCards();
  const rows = pageRows();
  box.innerHTML = rows.length ? rows.map(cardRow).join('') : emptyNote();
  const st = document.getElementById('cdStat');
  if(st) st.textContent = statText(visible().length);
  app.querySelectorAll('[data-fl]').forEach(b =>
    b.classList.toggle('on', b.dataset.fl === F.flag));
  const clr = document.getElementById('f_clr');
  if(clr) clr.disabled = !sifted();
  /* 🆕 b225 · والصفحاتُ تُرسم مع القائمة — وشريطُ الوسم معها إن كان مفتوحاً: عدّا زرَّي التحديد يتبعان الظاهر.
     🔴 وكان «تحديدُ الظاهر (٣٩٧)» يبقى بعدده بعد أن ترشّح المِصفاةُ ٤٤ (`redrawList` لم تكن ترسمه) — يحدّد
        الصحيحَ ويقول غيرَه. والمنتقيان فيه لا يضيعان: وجهتُهما في `TG` خارج الرسم. */
  drawPagers();
  if(TAG){ const tb = app.querySelector('.ed-tagbar'); if(tb){ tb.outerHTML = tagBar(); wireTagBar(); } }
  wireRows();
}

/* ═══════════ صفحاتُ القائمة (🆕 b225) ═══════════
   شريطان بنصٍّ واحد: فوق القائمة بجوار اسم المجموعة (فلا يزيد الشاشةَ سطراً)، وتحتها حيث تنتهي الصفحة —
   فمن راجع عشرين بطاقةً وجد «التالية» عند يده. ولا شريطَ لصفحةٍ واحدة: أزرارٌ لا تنقل إلى شيءٍ تكذب.
   📌 والأرقامُ الأولى والأخيرة وما حول الحاضرة، والنقاطُ لما بينها — فأربعون صفحةً لا تصير أربعين زرّاً.
   ⚠️ والصفحةُ الحاضرة `aria-current` وصبغةُ `accent` («اخترتَ» · كـ`.it-k.on`): هي اختيارُ المؤلّف، بخلاف
      «هنا توقّفت» المحايدة — تلك ذكرى لا اختيار. */
const pageList = (p, last) => {
  if(last <= 7) return Array.from({ length: last }, (_, i) => i + 1);
  let lo = Math.max(2, Math.min(p - 1, last - 4)), hi = Math.min(last - 1, Math.max(p + 1, 5));
  if(lo === 3) lo = 2;                 // نقاطٌ تُخفي صفحةً واحدةً أطولُ من رقمها
  if(hi === last - 2) hi = last - 1;
  const mid = [];
  for(let k = lo; k <= hi; k++) mid.push(k);
  return [1, ...(lo > 2 ? ['…'] : []), ...mid, ...(hi < last - 1 ? ['…'] : []), last];
};

function pager(label){
  const n = visible().length, last = pages();
  if(last < 2) return '';
  clampPg();
  const p = PG.page, from = (p - 1) * PG.size + 1, to = Math.min(n, p * PG.size);
  const num = k => k === '…' ? '<span class="cd-gap" aria-hidden="true">…</span>'
    : `<button type="button" class="it-b" data-pg="${k}" aria-label="الصفحة ${AR(k)}"${
        k === p ? ' aria-current="page"' : ''}>${AR(k)}</button>`;
  return `<nav class="cd-pg" aria-label="${label}">
    <button type="button" class="it-b" data-pg="${p - 1}" aria-label="الصفحة السابقة"${p > 1 ? '' : ' disabled'}>السابقة</button>
    ${pageList(p, last).map(num).join('')}
    <button type="button" class="it-b" data-pg="${p + 1}" aria-label="الصفحة التالية"${p < last ? '' : ' disabled'}>التالية</button>
    <span class="cd-rng">${from === to ? AR(from) : `${AR(from)}–${AR(to)}`} من ${AR(n)}</span>
  </nav>`;
}

const PG_TOP = 'صفحات البطاقات', PG_BOT = 'صفحات البطاقات، أسفل القائمة';
const wirePager = () => app.querySelectorAll('[data-pg]').forEach(x => x.onclick = () => goPage(+x.dataset.pg));

function drawPagers(){
  const t = document.getElementById('pgTop'), b = document.getElementById('pgBot');
  if(t) t.innerHTML = pager(PG_TOP);
  if(b) b.innerHTML = pager(PG_BOT);
  wirePager();
}

/* الانتقال: القائمةُ وحدها تُرسم والمِصفاةُ في مكانها. ورأسُ القائمة يُنزَل إليه إن كان تحت الشريط العلويّ —
   فمن نقر «التالية» أسفلَ الصفحة يبدأ من أوّل التالية لا من وسطها. والتركيزُ إلى أوّل بطاقة: هناك يُكمَل العمل. */
function goPage(p){
  PG.page = p; redrawList();
  const h = document.getElementById('cdHead'), bar = document.getElementById('bar');
  if(h && h.getBoundingClientRect().top < (bar ? bar.getBoundingClientRect().bottom : 0))
    h.scrollIntoView({ block: 'start' });
  document.querySelector('#cdList [data-ed]')?.focus({ preventScroll: true });
}

function wireFilterBar(){
  const $ = id => document.getElementById(id);
  /* 🆕 b225 · وكلُّ تغييرٍ فيما يُعرض يبدأ من الصفحة الأولى: الصفحةُ الثالثة من قائمةٍ أخرى رقمٌ لا معنى له */
  const q = $('f_q');
  if(q) q.oninput = () => { F.q = q.value; PG.page = 1; redrawList(); };

  app.querySelectorAll('[data-fk]').forEach(s =>
    s.onchange = () => { F[s.dataset.fk] = s.value; PG.page = 1; redrawList(); });

  const so = $('f_sort');
  if(so) so.onchange = () => { F.sort = so.value; PG.page = 1; redrawList(); };

  /* …إلّا عددَ الصفحة: أوّلُ بطاقةٍ في الصفحة الحاضرة تبقى ظاهرةً بعد التبديل — فالثانيةُ من مئة (١٠١–٢٠٠)
     تصير الحاديةَ عشرةَ من عشرة (١٠١–١١٠)، لا الأولى. */
  const sz = $('f_size');
  if(sz) sz.onchange = () => {
    const first = (PG.page - 1) * PG.size;
    PG.size = +sz.value;
    PG.page = Math.floor(first / PG.size) + 1;
    try{ localStorage.setItem(SIZE_KEY, String(PG.size)); }catch(e){}
    redrawList();
  };

  /* الرقيقةُ تُبدّل حالها: نقرةٌ تُظهرها وحدها، ونقرةٌ تُعيد الكلّ */
  app.querySelectorAll('[data-fl]').forEach(b => b.onclick = () => {
    F.flag = F.flag === b.dataset.fl ? '' : b.dataset.fl;
    PG.page = 1;
    redrawList();
  });

  const clr = $('f_clr');
  if(clr){
    clr.disabled = !sifted();
    clr.onclick  = () => {
      F.q = F.lesson = F.strand = F.flag = '';
      PG.page = 1;
      renderCards();          /* ترفع المِصفاةَ وتُعيد حقولَ الشريط معها */
    };
  }
}


function emptyNote(){
  return sifted()
    ? `<div class="ed-empty">ولا بطاقةَ تُطابق المِصفاة — ورفعُها بالزرّ أعلاه.</div>`
    /* 🆕 b134 · و«الصق» صارت مصدراً: أمرٌ مذكَّرٌ في نصّ المؤلّف، وهو
       أحدُ المواضع التي تنتظر في مهارة اللغة (§١٣) — وأُصلح لأنّ
       السطرَ نُقل في هذه الدفعة، لا توسيعاً لها. */
    : `<div class="ed-empty">لا بطاقة بعد.
       ولصقُ عمودين يكفي: الوجه ثمّ المعنى، والفاصل بينهما Tab.</div>`;
}


/* 🔑 والدرسُ والفرعُ يُعرضان على كلّ صفّ: بطاقةٌ بلا تصنيف لا تصل
   طالباً إلا باختياره، **وهذا صمتٌ يجب أن يُرى** — فالفراغ هنا
   معلومةٌ لا نقصُ زينة. */
function tags(c){
  const ls = c.lessons || [], ss = c.strands || [];
  if(!ls.length && !ss.length)
    return '<span class="chip warn">بلا درس ولا فرع</span>';
  /* 🆕 b172 · `dir="auto"` على الشارة نفسِها: متنُها نصُّ مؤلّفٍ خالصٌ
     (عنوانُ درس · اسمُ فرع) لا وسمَ معه — فلا حاجةَ إلى `bdi` كشارةِ 🌿
     في `editor.js`. وعنوانٌ ينتهي بعلامةٍ محايدة كان يُقرأ
     `?Reading: Whose Responsibility Is It` داخل الشارة. */
  return ls.map(l => `<span class="chip" dir="auto">${esc(l.title)}</span>`).join('')
       + ss.map(s => `<span class="chip g" dir="auto">${esc(s.name)}</span>`).join('');
}

/* 🆕 b224 · آخرُ بطاقةٍ فُتح نموذجُها (`LAST`) — والتعليلُ عند تعريفه أعلى الملفّ */
const isLast = c => LAST != null && String(c.id) === String(LAST);
const LAST_CHIP = '<span class="chip cd-last">هنا توقّفت</span>';

/* 🆕 b227 · الأمثلةُ في الصفّ — طلبُ المالك (٧ نوفمبر): «عرض الأمثلة أيضاً على البطاقة من الخارج لسهولة المراجعة، بحيث
   يتمّ الضغط على تحرير للتعديل عند ملاحظة خطأ».
   🔑 **كما يقرؤها الطالب** (`examples()` — مصدرُ البطاقة واللعبة والمعاينة)، سطراً لكلّ مثالٍ باتّجاه نصّه. والطالبُ يلقى
      واحداً منها في كلّ ظهور (`pickExample`)، والمراجعُ يراها كلَّها — فهو يحكم على ما قد يُعرض، لا على ما عُرض مرّة.
   ⚠️ **وخارج `.ed-bk` لا داخلها:** تلك `white-space:pre-line`، فكلُّ سطرٍ جديدٍ بين وسوم قائمةٍ فيها يصير سطراً فارغاً يُرى.
   📌 ومعاينةُ اللصق تناديها أيضاً: «معاينةٌ تخالف ما سيُرسم بعد الحفظ تكذب على صاحبها» (`pasteBox`). */
const exHtml = note => {
  const xs = examples(note);
  return xs.length ? `<ul class="cd-ex" aria-label="الأمثلة">${
    xs.map(x => `<li dir="${dirOf(x)}">${esc(x)}</li>`).join('')}</ul>` : '';
};

/* 🆕 b226 · والعلامةُ تنتقل في مكانها عند الاستماع (`wireRows`) بلا رسمٍ جديد: الرسمُ يهدم الزرَّ الذي في يد المؤلّف
   فيضيع تركيزُه، ويعيد بناءَ عشرين صفّاً لأجل صفّين. */
function markLast(id){
  LAST = id;
  app.querySelectorAll('#cdList .ed-row.last').forEach(r => { r.classList.remove('last'); r.querySelector('.cd-last')?.remove(); });
  const r = app.querySelector(`#cdList .ed-row[data-c="${id}"]`);
  if(!r) return;
  r.classList.add('last');
  r.querySelector('.ed-m')?.insertAdjacentHTML('afterbegin', LAST_CHIP);
}

/* 🆕 b134 · والصفُّ خرج من جوف الرسم لأنّ `redrawList` تُنادِيه وحدَها
   🆕 b224 · و«هنا توقّفت» شارةٌ تُقرأ لا لونٌ يُخمَّن: الإطارُ وحده لا يقول لِمَ اختلف الصفّ.
      والعبارةُ اسمُ المنصّة القائم للاستئناف («من حيث توقّفت» في `quiz.js`)، وماضيها يصحّ للمؤلّف والمؤلّفة
      بلا تشكيل (الهويّة اللغويّة §٤ · الدرجة ③). والشارةُ أوّلُ سطرها: إليها تقع العينُ قبل سواها.
   🆕 b226 · وزرُّ النطق في الصفّ — طلبُ المالك (٧ نوفمبر): «زرّ الاستماع على البطاقة من الخارج حتى يمكن الاستماع للكلمة
      دون الدخول إلى التحرير». **وهو زرُّ الطالب بعينه** (`sayable` · `sayGroup` · `bindSay` في ui.js — ثابت ⑨): ملفٌّ ⇐ «نُطق»،
      وإنجليزيّةٌ بلا ملفّ ⇐ قراءةُ الجهاز بلهجتيها، وعربيّةٌ بلا ملفّ ⇐ لا زرّ — فيسمع المؤلّفُ ما سيسمعه الطالب لا تقريباً له.
      ويقف بجوار المنطوق (الوجه أو المعنى) كما يقف في البطاقة. **وسقطت شارةُ «🔊 نُطق»:** الزرُّ يقولها ويُسمعها —
      إلّا لملفٍّ لا يجد له `sayable` موضعاً (لا لاتينيَّ فيه)، فتبقى الشارةُ خبراً كما كانت. */
const cardRow = c => {
  const say = sayable(c);
  const sayAt = side => say && say.side === side ? sayGroup(c, say.text) : '';
  return `
    <div class="ed-row${SEL.has(c.id) ? ' on' : ''}${isLast(c) ? ' last' : ''}" data-c="${c.id}">
      ${TAG ? `<label class="pick-c" title="حدّد">
        <input type="checkbox" data-sel="${c.id}" ${SEL.has(c.id) ? 'checked' : ''}>
      </label>` : ''}
      <div style="flex:0 0 34%;min-width:0">
        <div class="cd-fr" dir="${dirOf(c.front)}"><div class="ed-t">${esc(c.front)}</div>${sayAt('front')}</div>
        <div class="ed-m">
          ${isLast(c) ? LAST_CHIP : ''}
          ${(c.lang || 'ar') !== 'ar'
            ? `<span class="chip g">${esc(String(c.lang).toUpperCase())}</span>` : ''}
          ${c.audio && !say ? '<span class="chip">🔊 نُطق</span>' : ''}
          ${/* 🆕 b135 · وشارةٌ تقول أيَّ صورةٍ تحمل، لا أنّها تحمل صورة:
                «وجه» و«معنى» موضعان مختلفان في عين الطالب. */''}
          ${c.front_image ? '<span class="chip">🖼 وجه</span>' : ''}
          ${c.image ? '<span class="chip">🖼 معنى</span>' : ''}
          ${/* 🔓 b227 · وسقطت شارةُ «٣ أمثلة»: الأمثلةُ نفسُها تحت المعنى (`exHtml`)، وعدُّها يُرى بلمحة —
                وكانت تقول «٢ أمثلة» حيث الصوابُ «مثالان» (الهويّة اللغويّة §١١). ورقيقةُ «أمثلتها أقلُّ من ثلاثة» باقية. */''}
        </div>
        <div class="ed-m" style="margin-top:4px">${tags(c)}</div>
      </div>
      <div style="flex:1;min-width:0">
        <div class="ed-bk" style="color:var(--text-muted);font-size:var(--fs-meta);line-height:1.6"
             dir="${dirOf(c.back)}">${esc(backText(c.back))}${sayAt('back')}</div>${exHtml(c.note)}
      </div>
      ${/* 🆕 b227 · وللزرّين اسمان: «تحرير» اسمُ المالك له، وقارئُ الشاشة يسمع الوصفَ وحده — فوجهُ البطاقة فيه
            (حكمُ «إزالة مقابل البند ٣»). وكانا رسمين بلا اسم: «قلم» و«سلّة». */''}
      <button class="it-b wide" data-ed="${c.id}" title="تحرير" aria-label="${escA(`تحرير: ${c.front}`)}">✏️</button>
      <button class="it-b" data-rm="${c.id}" title="حذف" aria-label="${escA(`حذف: ${c.front}`)}">🗑</button>
    </div>`;
};


function renderCards(){
  const rows = pageRows();

  app.innerHTML = `
    <div class="crumb" id="bk">→ عودة لدروس المقرَّر</div>

    ${/* 🆕 b187 · شريطُ الأدوات بأسلوب دروس المقرَّر (`.ed-tools` · `b186`) — كانت خمسةَ
          أزرارٍ متساويةِ العرض. ⇒ الإنشاءُ (لصقُ قائمة · بطاقةٌ واحدة) | الوسمُ | وفي
          طرف الشريط ما يُري الطالبَ البطاقات (المعاينة · رابطُ التدرّب): الأوّلان
          يصنعان، والأوسطُ يصنّف، والآخران يُخرجان — وهو ترتيبُ العمل نفسُه.
       📌 والوسمُ وضعٌ يُفتح ويُغلق: `aria-pressed` تقول حالَه لقارئ الشاشة، وصبغةُ
          `accent` تقولها للعين («اخترتَ») — لا زرٌّ ممتلئٌ ثانٍ ينافس «لصق قائمة».
       📌 و«أضف بطاقاتٍ إلى درس» صارت «إضافة بطاقات إلى درس»: أمرٌ مذكّرٌ في زرّ،
          والزرُّ مصدر (الهويّة اللغويّة §٦). */''}
    <div class="ed-tools">
      <div class="ed-tg">
        ${toolBtn('paste', 'paste', 'لصق قائمة', ' pri')}
        ${toolBtn('one', 'plus', 'بطاقة واحدة')}
      </div>
      ${/* 🔴 b131 · ورُفع «⚙️ اسم المجموعة». المجموعةُ بعد `157` حاويةٌ
            واحدةٌ لكلّ (مادة · صفّ)، واسمُها مشتقٌّ من اسم المادة —
            فزرُّ إعادة التسمية **يدعو المؤلّف أن يكسر اسماً مشتقّاً**،
            ويعد بتصنيفٍ لا تفعله الحاويةُ أصلاً. والتصنيفُ على
            البطاقة: الدرسُ والفرع. ⇒ زرٌّ غامضُ الغرضِ ضرره أكبر. */''}
      ${/* 🆕 b89 · ولا يظهر لرزمةٍ فارغة: create_practice_session تردّها
            («لا بطاقة في هذه الرزمة»)، وزرٌّ لا يُنتج إلا رسالةَ رفضٍ
            يُعلّم أنّ الأزرار تكذب. — والحكمُ نفسُه على المعاينة والوسم. */''}
      ${C.length ? `<div class="ed-tg">
        ${toolBtn('tag', 'tag', TAG ? 'إنهاء الوسم' : 'إضافة بطاقات إلى درس', '',
                  `aria-pressed="${TAG}"`)}
      </div>
      ${/* 🆕 b217 · ولا يظهر إلا لمجموعةٍ فيها ما لا صوت له — حكمُ `b89` على زرٍّ لا يُنتج إلا رفضاً */''}
      ${needVoice(C).length || VR?.state.running ? `<div class="ed-tg">
        ${toolBtn('vall', 'speak', 'توليد الأصوات', '', VR?.state.running ? 'disabled' : '')}
      </div>` : ''}
      <div class="ed-tg ed-tend">
        ${toolBtn('pv', 'eye', 'معاينة بعين الطالب')}
        ${toolBtn('plink', 'link', 'رابط تدرّب')}
      </div>` : ''}
    </div>

    ${VR?.state.deck === cur.id ? `<section class="vp" id="vrun" style="margin:0 0 14px" aria-label="أصوات المجموعة">${runHtml(VR.state)}</section>` : ''}

    ${TAG ? tagBar() : ''}

    ${/* الشريطُ لا يُعرض لمجموعةٍ فارغة: مِصفاةٌ على صفرٍ أثاثٌ لا أداة */''}
    ${C.length ? filterBar() : ''}

    <div class="ed-sec">
      ${/* 🆕 b172 · وترويسةُ المجموعة كترويسة الوحدة في `editor.js`:
            اسمُ المادّة قد يكون لاتينيّاً (`English`)، والعدّادُ أرقامٌ
            هنديّةٌ لا تَحكم الاتجاه. */''}
      ${/* 🆕 b225 · والترويسةُ صفٌّ يحمل شريطَ الصفحات في طرفه (`.cd-head`) — والتعليلُ عند `pager()` */''}
      <div class="cd-head" id="cdHead">
        <div class="grp" dir="auto">${esc(cur.title)} <span class="chip">${AR(C.length)}</span></div>
        <div id="pgTop">${pager(PG_TOP)}</div>
      </div>
      <div id="cdList">${rows.length ? rows.map(cardRow).join("") : emptyNote()}</div>
      <div id="pgBot">${pager(PG_BOT)}</div>
    </div>

    ${/* 🆕 b134 · وظيفتان نزلتا من الشاشة الوسطى إلى حيث يُرى سببُهما */''}
    ${C.length === 0 ? `<div class="nav" style="margin-bottom:18px">
      <button class="btn" id="delDeck">🗑 حذف المجموعة الفارغة</button>
    </div>` : ''}

    ${D.some(d => d.mine) ? `<div class="ed-sec">
      <div class="grp">مجموعات الطلاب
        <span class="chip">${AR(D.filter(d => d.mine).length)}</span></div>
      <div class="ed-empty">تُعرض عدداً ولا تُفتح — محتواها ملك صاحبه.</div>
    </div>` : ''}`;

  document.getElementById('bk').onclick = () => openCourse(ctx.course);
  document.getElementById('paste').onclick = pasteBox;
  document.getElementById('one').onclick   = () => cardForm(null);
  const pv = document.getElementById('pv'); if(pv) pv.onclick = preview;

  const pl = document.getElementById('plink');
  if(pl) pl.onclick = linkPicker;

  const tg = document.getElementById('tag');
  if(tg) tg.onclick = () => { TAG = !TAG; SEL.clear(); renderCards(); };

  const va = document.getElementById('vall');
  if(va) va.onclick = voiceAll;
  wireRun();

  const dd = document.getElementById('delDeck');
  if(dd) dd.onclick = async () => {
    if(!confirm('حذف المجموعة الفارغة؟')) return;
    const { error } = await api.deleteDeck(cur.id);
    if(error) return toast(error.message, false);
    toast('حُذفت'); openCards(ctx.course);
  };

  wireFilterBar();
  wireTagBar();
  wireRows();
  wirePager();
  /* 🔴 b224 · ولا تمريرَ في الرسم. الرسمُ يُعاد مع كلّ تحديدٍ في الوسم وكلّ وسمٍ وانتهاءِ توليد الأصوات،
     و`scrollTop()` هنا كان يصعد بالمؤلّف إلى أوّل القائمة في كلٍّ منها — **قِيس:** تحديدُ بطاقةٍ على بعد
     ١٦٨٠٠px نادى الصعود. ⇒ الصعودُ للفتح وحده (`openDeck`)، والعودةُ إلى موضعها (`backToList`). */
}


/* 🆕 b217 · «توليد الأصوات»: صوتُ كلّ بطاقةٍ عربيّةٍ بلا صوت، يُكتب فيها ساعةَ توليده فيسمعه الطالب — حكمُ المالك في الاعتماد: «اعتماد آليّ
   فوري». والسؤالُ قبله يقول ذلك وعددَه، فنقرةٌ لا تُطلق عشرَ دقائق من الكلفة بلا علم. والتشغيلُ في المتصفّح بهويّة المؤلّف (حارسُ الدالّة
   `card_voice_problem`)، وإغلاقُ الصفحة يوقفه فيكمل الزرُّ ما بقي: ما كُتب لا يُعاد. */
function voiceAll(){
  const n = needVoice(C).length;
  if(!n) return toast('لكل بطاقة صوتها');
  if(!confirm(`عدد البطاقات بلا صوت: ${AR(n)}. يُولَّد صوتها بصوت الراوي Iapetus، ويُكتب في كل بطاقة فيسمعه الطالب فوراً. المتابعة؟`)) return;
  const deck = cur.id;
  VR = deckVoices({ deck, cards: C, api, onChange: s => {
    const box = document.getElementById('vrun');
    if(box && cur?.id === s.deck){ box.innerHTML = runHtml(s); wireRun(); }
  } });
  renderCards();
  /* وبعده تُقرأ البطاقاتُ ثانيةً: شارةُ «🔊 نُطق» ومن بقي بلا صوت — والمؤلّفُ ما زال في مجموعته */
  VR.done.then(async () => {
    if(cur?.id !== deck || !document.getElementById('cdList')) return;
    const { data } = await api.deckCards(deck);
    if(data && cur?.id === deck){ C = data; renderCards(); }
  });
}

function runHtml(s){
  const head = s.running ? `يُولَّد ${AR(s.done)} من ${AR(s.total)}…` : s.stopped ? 'أُوقف التوليد' : 'انتهى التوليد';
  /* والفاصلُ بعد العدد فاصلةٌ لا «·»: النقطةُ بعد رقمٍ هنديٍّ تُقرأ صفراً («١ ·» ⇐ «١٠») — قِيس في اللقطة */
  const tally = `الأصوات المكتوبة: ${AR(s.saved)}${s.failed.length ? `، وما تعذّر: ${AR(s.failed.length)}` : ''}`;
  const after = s.running ? 'وإغلاق الصفحة يوقفه، فيكمل الزر ما بقي.'
    : s.failed.length || s.stopped ? 'وما بقي بلا صوت يعيده الزر نفسه.' : 'ويُراجَع صوت كل بطاقة من نموذجها.';
  const shown = s.running ? [] : s.failed.slice(0, 40);
  return `<div class="vp-top"><b class="vp-h">أصوات المجموعة</b><span class="vp-sum">${head}</span></div>
    <p class="vp-say">${tally}. ${after}</p>
    ${s.running ? `<div class="vp-acts"><button type="button" class="mf-up" id="vstop"${s.stopped ? ' disabled' : ''}>إيقاف</button></div>` : ''}
    ${shown.map(f => `<p class="vp-rn bad"><bdi>${esc(f.front)}</bdi> — ${esc(f.error)}</p>`).join('')}
    ${s.failed.length > shown.length && !s.running ? `<p class="vp-rn">وغيرها ${AR(s.failed.length - shown.length)}.</p>` : ''}`;
}

function wireRun(){
  const b = document.getElementById('vstop');
  if(b) b.onclick = () => VR?.stop();
}


/* 🆕 b134 · وربطُ الصفوف خرج وحدَه: `redrawList` تُعيد بناءها بلا الشريط،
   فلو بقي الربطُ في `renderCards` لعادت الصفوفُ بلا أزرارٍ تعمل. */
function wireRows(){
  app.querySelectorAll('[data-ed]').forEach(b => b.onclick = e => {
    e.stopPropagation();
    cardForm(C.find(x => String(x.id) === b.dataset.ed));
  });
  app.querySelectorAll('[data-rm]').forEach(b => b.onclick = async e => {
    e.stopPropagation();
    if(!confirm('حذف البطاقة؟')) return;
    const id = +b.dataset.rm;
    const { error } = await api.deleteCard(id);
    if(error) return toast(error.message, false);   // 🔒 تُرفض إن كان يراجعها طلاب
    /* 🆕 b224 · والحذفُ في موضعه لا فتحٌ جديد: `openDeck` كانت تُفرغ المِصفاةَ وتصعد إلى أوّل القائمة.
       وما يتعلّق بالبطاقة الغائبة يغيب معها — تحديدُها في الوسم، وعلامةُ «هنا توقّفت». */
    SEL.delete(id); if(String(LAST) === String(id)) LAST = null;
    toast('حُذفت'); reload();
  });

  /* 🆕 b226 · زرُّ النطق في الصفّ — `bindSay` نفسُها (توقفُ النقرة عند الزرّ فلا تُحدّد الصفَّ في الوسم).
     🔑 **والاستماعُ فحص:** يحمل الصفُّ بعده «هنا توقّفت» كمن فتح البطاقة — «آخر بطاقةٍ تمّ تعديلها أو فحصها» بنصّ
        طلب المالك الأوّل. فمن راجع الأصوات صفّاً صفّاً ثمّ ابتعد في القائمة أو خرج إلى المعاينة وجد آخرَ ما سمعه معلَّماً. */
  app.querySelectorAll('#cdList .ed-row[data-c]').forEach(r => {
    const c = C.find(x => String(x.id) === r.dataset.c), say = sayable(c);
    if(!say) return;
    bindSay(r, c, say);
    r.querySelectorAll('[data-say]').forEach(b => b.addEventListener('click', () => markLast(c.id)));
  });
  if(!TAG) return;

  const flip = id => { SEL.has(id) ? SEL.delete(id) : SEL.add(id); renderCards(); };
  app.querySelectorAll('[data-sel]').forEach(b =>
    b.onchange = () => flip(+b.dataset.sel));

  /* والصفُّ كلُّه هدفٌ للنقر: تحديدُ عشرين بطاقةً بإصابة مربّعٍ من
     ١٨px عشرين مرّةً عملٌ يُتعب ويُخطئ — والمساحةُ موجودةٌ مجّاناً. */
  app.querySelectorAll('.ed-row[data-c]').forEach(r => r.onclick = e => {
    if(e.target.closest('button') || e.target.closest('input')) return;
    flip(+r.dataset.c);
  });
}


/* ═══════════ ③-أ الوسمُ الجماعي — أين تُضاف البطاقةُ القائمة لدرس ═══════════

   🔴 **والعطلُ أنّ البابَ لم يكن له مقبض.** `link_cards_lesson` و
   `link_cards_strand` مبنيّتان منذ `157` وتقبلان **دفعةً** من البطاقات —
   ولم تُنادَ إلا من صندوق اللصق، أي **عند الإدخال وحده**. فمن أدخل
   بطاقةً ثمّ أراد إضافتها إلى درسٍ لاحقاً لم يجد إلا فتحَ كلِّ بطاقةٍ
   على حدة. ومصطلحٌ يتكرّر في خمسة دروسٍ يعني خمسَ فتحاتٍ لبطاقةٍ واحدة.

   🔑 **والوسمُ شرطُ الوصول لا زينة:** قائمةُ مصطلحات السؤال تُبنى من
      `card_lessons` (158)، وطابورُ الطالب يُرتَّب بها (`due_cards` ③).
      فبطاقةٌ بلا درسٍ **لا تصل طالباً ولا تظهر لمؤلّفٍ يربط سؤالاً** —
      والشارةُ الكهرمانيّة «بلا درس ولا فرع» كانت تقول ذلك ولا تقول
      أين يُصلَح.

   📌 **والإزالةُ تُعرض مع الإضافة:** الوسمُ الجماعيُّ يُخطئ جماعيّاً،
      و`p_on` موجودٌ في الدالّتين منذ `157`. وفعلٌ لا رجعةَ له إلا
      بفتح البطاقات واحدةً واحدة ليس فعلاً جماعيّاً. */

function tagBar(){
  const n = SEL.size;
  /* 🆕 b225 · «الظاهرُ» صار اثنين حين تكون الصفحاتُ أكثرَ من واحدة: ما في الصفحة، وما طابق المِصفاةَ في صفحاتها كلّها.
     ⇒ زرّان يقول كلٌّ منهما ما يحدّده وعدده — فلا زرَّ يحدّد ما لا يُرى وهو يوهم أنّه ما يُرى (العلّةُ أدناه في `wireTagBar`).
     📌 وصفحةٌ واحدة ⇒ الزرُّ الواحد كما كان: الصفحةُ هي الظاهرُ كلُّه. */
  const all = visible().length, here = pageRows().length;
  const sel = (k, rows, label, head) => `
    <select id="tg_${k}" data-tgk="${k}" class="eq-obj" style="max-width:260px">
      <option value="">— ${head} —</option>
      ${rows.map(r => `<option value="${r.id}" ${
        String(r.id) === String(TG[k]) ? 'selected' : ''}>${esc(r[label])}</option>`).join('')}
    </select>`;

  return `<div class="ed-tagbar">
    <div class="eq-brow">
      <span class="eq-bt">🏷 وسمُ ما تُحدّده</span>
      <span class="chip${n ? ' g' : ''}">${n ? N(n,'بطاقة','بطاقتان','بطاقات','بطاقة')
                                             : 'لم تُحدّد بعد'}</span>
      <span class="eq-strip-g"></span>
      ${here < all
        ? `<button class="it-b" id="selpage">تحديد هذه الصفحة (${AR(here)})</button>
           <button class="it-b" id="selall">تحديد الصفحات كلّها (${AR(all)})</button>`
        : `<button class="it-b" id="selall">تحديدُ الظاهر (${AR(all)})</button>`}
      <button class="it-b" id="selnone">إلغاء التحديد</button>
    </div>

    <div class="eq-brow" style="margin-top:10px">
      ${sel('lesson', ctx.lessons || [], 'title', 'اختر درساً')}
      <button class="it-b" data-tg="lesson" data-on="1" ${n?'':'disabled'}>أضفها إليه</button>
      <button class="it-b lk" data-tg="lesson" data-on="0" ${n?'':'disabled'}>أزلها منه</button>
    </div>

    <div class="eq-brow" style="margin-top:8px">
      ${sel('strand', ctx.strands || [], 'name', 'اختر فرعاً')}
      <button class="it-b" data-tg="strand" data-on="1" ${n?'':'disabled'}>أضفها إليه</button>
      <button class="it-b lk" data-tg="strand" data-on="0" ${n?'':'disabled'}>أزلها منه</button>
    </div>

    <div class="ed-hint" style="margin-top:10px">💡 <b>الدرسُ يقول أين
      تظهر البطاقة</b> — وبه تدخل قائمةَ بطاقات أسئلة ذلك الدرس،
      وطابورَ طالبٍ فُتح له. <b>والفرعُ يقول ما نوعُها.</b>
      وبطاقةٌ واحدةٌ تُضاف إلى عدّة دروس.</div>
  </div>`;
}

function wireTagBar(){
  if(!TAG) return;
  const $ = id => document.getElementById(id);

  app.querySelectorAll('[data-tgk]').forEach(s =>
    s.onchange = () => { TG[s.dataset.tgk] = s.value; });

  /* 🔑 **ومكسبُ المِصفاة عملٌ لا عرض:** «تحديدُ الظاهر» يقع على ما
     رشّحته المِصفاةُ لا على المجموعة كلِّها. فرقيقةُ «بلا درس» ⇒
     تحديدُ الظاهر ⇒ وسمٌ واحد — **والمِصفاةُ تُطفئ بعينها الرقيقةَ
     التي أظهرتها.** وبدونه يكون الزرُّ فخّاً: يُحدّد ما لا يُرى. */
  const all = $('selall'), none = $('selnone'), page = $('selpage');
  if(all)  all.onclick  = () => { visible().forEach(c => SEL.add(c.id)); renderCards(); };
  if(page) page.onclick = () => { pageRows().forEach(c => SEL.add(c.id)); renderCards(); };
  if(none) none.onclick = () => { SEL.clear(); renderCards(); };

  app.querySelectorAll('[data-tg]').forEach(b => b.onclick = async () => {
    const kind = b.dataset.tg, on = b.dataset.on === '1';
    const pick = $('tg_' + kind);
    const id   = +pick.value;
    if(!id) return toast(kind === 'lesson' ? 'اختر درساً أوّلاً' : 'اختر فرعاً أوّلاً', false);
    if(!SEL.size) return toast('حدّد بطاقةً واحدةً على الأقل', false);

    const ids   = [...SEL];
    const label = pick.options[pick.selectedIndex].text;
    b.disabled = true;
    const { error } = kind === 'lesson'
      ? await api.linkCardsLesson(ids, id, on)
      : await api.linkCardsStrand(ids, id, on);
    b.disabled = false;
    if(error) return toast(error.message, false);

    toast(`${on ? 'أُضيفت' : 'أُزيلت'} ${N(ids.length,'بطاقة','بطاقتان','بطاقات','بطاقة')} ${
      on ? 'إلى' : 'من'} «${label}»`);

    /* ⚠️ والقراءةُ من القاعدة لا من الذاكرة: الوسمُ يُغيّر رقائقَ الصفوف،
       وتحديثُها محليّاً يفترض نجاحاً لم يُقرأ — ونسختان تفترقان بصمت.
       📌 والوضعُ يبقى مفتوحاً والتحديدُ يُفرَغ: الوسمُ عملٌ متتابع —
          دفعةٌ لدرس، ثمّ دفعةٌ لآخر. وإخراجُ المؤلّف بعد كلّ دفعةٍ
          يجعله يُعيد فتحَ البابِ خمسَ مرّاتٍ ليضع خمسَ وسوم. */
    const r = await api.deckCards(cur.id);
    if(r.error) return toast(r.error.message, false);
    C = r.data || []; SEL.clear(); renderCards();
  });
}


/* ═══════════ ③-ب نطاقُ رابط التدرّب ═══════════

   🔴 ولولا هذا لصار الرابطُ على **المادة كلِّها**: كان يُبنى من
   مجموعة، والمجموعةُ صارت حاويةَ المادة (sql/157). ميزةٌ تُفرَغ
   بصمت — والصمتُ يُصدَّق.

   🔑 والدرسُ أوّلاً لا الفرع: إيقاعُ المعلّم أن يُنهي درساً فيُرسل
      بطاقاته. والفرعُ للمراجعة قبل الامتحان، وهي أندر.

   📌 وما لا بطاقاتِ له لا يُعرض: درسٌ فارغٌ في القائمة يُنتج رابطاً
      يعتذر عند الضغط — ويُعلّم أنّ الأزرار تكذب. */

function linkPicker(){
  keepSpot();
  const byLesson = new Map(), byStrand = new Map();
  C.forEach(c => {
    (c.lessons || []).forEach(l => byLesson.set(l.id, (byLesson.get(l.id) || 0) + 1));
    (c.strands || []).forEach(s => byStrand.set(s.id, (byStrand.get(s.id) || 0) + 1));
  });

  /* 🆕 b172 · و`dir="auto"` على الزرّ: متنُه اسمُ درسٍ أو فرعٍ من القاعدة
     وعدّادُه أرقامٌ هنديّة — فالحَكَمُ الاسمُ وحده، ودروسُ الإنجليزية
     كلُّها لاتينيّةُ العنوان. */
  const opt = (rows, map, label, kind) => rows
    .filter(r => map.get(r.id))
    .map(r => `<button class="it-b wide" dir="auto" data-k="${kind}" data-s="${r.id}"
                 data-t="${esc(r[label])}">${esc(r[label])}
               <span class="chip">${AR(map.get(r.id))}</span></button>`).join('');

  const ls = opt(ctx.lessons, byLesson, 'title', 'lesson_cards');
  const st = opt(ctx.strands, byStrand, 'name',  'strand_cards');

  app.innerHTML = `
    <div class="crumb" id="bk">→ عودة للبطاقات</div>
    <div class="ed-sec">
      <div class="grp">على أيّ شيءٍ يتدرّب الطالب؟</div>

      <div class="ed-hint">🔑 <b>وبطاقاتُ الدرس هي الغالب.</b> واللقطة
        تُجمَّد عند الإنشاء — فما تضيفه بعد الرابط لا يدخله.</div>

      <div class="grp" style="margin-top:14px">درسٌ بعينه</div>
      ${ls || '<div class="ed-empty">لا درسَ له بطاقاتٌ بعد.</div>'}

      <div class="grp" style="margin-top:14px">فرعٌ من المادة</div>
      ${st || '<div class="ed-empty">لا فرعَ له بطاقاتٌ بعد.</div>'}

      <div class="grp" style="margin-top:14px">أو المادة كلُّها</div>
      <button class="it-b wide" dir="auto" data-k="cards" data-s="${cur.id}"
        data-t="${esc(cur.title)}">${esc(cur.title)}
        <span class="chip">${AR(C.length)}</span></button>
    </div>`;

  document.getElementById('bk').onclick = () => backToList();
  app.querySelectorAll('[data-k]').forEach(b => b.onclick = () =>
    practiceLinkBox({ kind: b.dataset.k, source: +b.dataset.s, title: b.dataset.t }));
  toTop();
}


/* ═══════════ ④ اللصق الجماعي ═══════════ */

/* الفاصل: Tab أوّلاً (وهو ما ينتجه النسخُ من جدول)، ثم | ثم —.
   ولا يُقسَم على الشرطة العادية: النصّ العربي يحتملها داخله. */
function parse(text){
  return text.split(/\r?\n/).map(l => l.trim()).filter(Boolean).map(l => {
    let p = l.includes('\t') ? l.split('\t')
          : l.includes('|')  ? l.split('|')
          : l.includes('—')  ? l.split('—')
          : [l];
    p = p.map(x => x.trim());
    return { front: p[0] || '', back: p[1] || '', note: p[2] || '' };
  });
}

function pasteBox(){
  keepSpot();
  app.innerHTML = `
    <div class="crumb" id="bk">→ عودة للبطاقات</div>
    <div class="ed-form">
      <div class="ed-side">
        <div class="ed-hint">📋 <b>سطر لكلّ بطاقة.</b> الوجه ثمّ المعنى،
          والفاصل <b>Tab</b> — وهو ما ينتجه النسخ من جدول Word أو Excel.
          ويقبل <code>|</code> و<code>—</code> أيضاً.</div>
        <div class="ed-hint" style="opacity:.75"><b>عمود ثالث — المثال:</b>
          وتُكتب عدّة أمثلة مفصولة بـ<code>؛</code>، فتختار البطاقة
          واحداً في كلّ لقاء. <b>ومثال ثابت يُحفظ بنصّه</b> فيتعرّف
          الطالب الجملة لا المفهوم.</div>
        <div class="ed-hint" style="opacity:.75">🔑 <b>وأقوى وجه جملة
          بفراغ:</b> يُكتب <code>{{ }}</code> مكان الكلمة — فيُسترجَع
          المصطلح في سياقه لا مجرَّداً.</div>
        <div class="ed-hint" style="opacity:.75">♻️ وإعادة اللصق
          <b>تصحيح لا تكرار</b>: ما تكرّر وجهُه يُحدَّث معناه.</div>
        <div class="ed-hint" style="opacity:.75">🔊 <b>واللغة تفتح النُّطق:</b>
          الإنجليزية يقرؤها جهاز الطالب آلياً حين لا يكون للبطاقة ملفّ
          صوت. <b>والعربية صوتها ملفّ</b> يُولَّد أو يُرفع من نموذج البطاقة —
          فقارئ الجهاز يُسقط الإعراب، ونطقٌ خاطئ يُحفظ أسوأ من لا نطق.</div>
      </div>

      <div class="card" style="flex:1">
        <div class="ed-3">
          <div>
            <label class="fl">لغة هذه الدفعة</label>
            <select id="lg">
              <option value="ar">عربية</option>
              <option value="en">إنجليزية</option>
            </select>
          </div>
          <div>
            <label class="fl">درسُها <span style="opacity:.6">(اختياري)</span></label>
            <select id="ls1">
              <option value="">— بلا درس —</option>
              ${ctx.lessons.map(l => `<option value="${l.id}">${esc(l.title)}</option>`).join("")}
            </select>
          </div>
          <div>
            <label class="fl">فرعُها <span style="opacity:.6">(اختياري)</span></label>
            <select id="st1" ${ctx.strands.length ? '' : 'disabled'}>
              <option value="">${ctx.strands.length ? '— بلا فرع —' : 'لا فروعَ للمادة'}</option>
              ${ctx.strands.map(s => `<option value="${s.id}">${esc(s.name)}</option>`).join("")}
            </select>
          </div>
        </div>

        <label class="fl" style="margin-top:16px">القائمة</label>
        <textarea id="tx" dir="auto" style="min-height:220px;font-family:var(--font-mono,monospace)"
          placeholder="الاستعارة المكنية&#9;تشبيه حُذف فيه المشبَّه به وبقيت قرينة من لوازمه"></textarea>

        <div class="nav" style="margin-top:14px">
          <button class="btn" id="chk">فحص ما سيُحفظ</button>
          <button class="btn primary" id="sv" disabled>حفظ</button>
        </div>

        <div id="out" style="margin-top:14px"></div>
      </div>
    </div>`;

  document.getElementById('bk').onclick = () => backToList();

  let ready = [];

  document.getElementById('chk').onclick = () => {
    const rows = parse(document.getElementById('tx').value);
    ready = rows.filter(r => r.front && r.back);
    const bad = rows.filter(r => !r.front || !r.back);

    /* ⚠️ يُعرض ما سيُحفظ قبل أن يُحفظ — فالتحليل يُرى ولا يُفترض */
    document.getElementById('out').innerHTML = `
      ${bad.length ? `<div class="warnbox">${AR(bad.length)} سطراً بلا معنى
        — يُتجاهَل. تأكّد أن الفاصل Tab لا مسافات.</div>` : ''}
      ${ready.length ? `
        <div class="grp" style="margin-top:12px">سيُحفظ
          <span class="chip g">${AR(ready.length)}</span></div>
        ${/* 🆕 b172 · ومعاينةُ اللصق تُوزَن بميزان `cardRow` نفسِه
              (`dirOf` على الوجه والظهر كلٍّ على حدة) — **ومعاينةٌ تخالف
              ما سيُرسم بعد الحفظ تكذب على صاحبها.** */''}
        ${ready.slice(0, 6).map(r => `<div class="ed-row">
            <div style="flex:0 0 34%"><div class="ed-t"
              dir="${dirOf(r.front)}">${esc(r.front)}</div></div>
            <div style="flex:1;min-width:0"><div class="ed-bk" style="color:var(--text-muted);font-size:var(--fs-meta)"
              dir="${dirOf(r.back)}">${esc(backText(r.back))}</div>${exHtml(r.note)}</div></div>`).join("")}
        ${ready.length > 6 ? `<div class="ed-empty">…و${AR(ready.length-6)} غيرها</div>` : ''}`
      : '<div class="warnbox">لا سطر صالح.</div>'}`;

    document.getElementById('sv').disabled = ready.length === 0;
  };

  document.getElementById('sv').onclick = async () => {
    if(!ready.length) return;
    /* الثلاثةُ تُقرأ لحظةَ الحفظ لا عند بناء الشاشة — فقد تُبدَّل بعد الفحص */
    const lang   = document.getElementById('lg').value || 'ar';
    const lesson = +document.getElementById('ls1').value || null;
    const strand = +document.getElementById('st1').value || null;

    const { data, error } = await api.saveCards(cur.id, ready.map(r => ({
      front: r.front, back: r.back, note: r.note || null, lang })));
    if(error) return toast(error.message, false);

    /* 🔑 و save_cards صارت تُعيد ids لما لمسته (sql/157) — وبها يُربط
       الدرسُ والفرعُ في نداءٍ تالٍ. ولم يُفتح توقيعُها بمعاملٍ ثالث:
       شكلان يقبلان نداءً بمعاملين يُردّان «function is not unique». */
    const ids = data.ids || [];
    let note = '';
    if(ids.length && (lesson || strand)){
      const r1 = lesson ? await api.linkCardsLesson(ids, lesson) : {};
      const r2 = strand ? await api.linkCardsStrand(ids, strand) : {};
      if(r1.error || r2.error)
        note = ' · وتعذّر الوسم: ' + (r1.error || r2.error).message;
    }

    toast(`أُضيفت ${AR(data.added)} · صُحّحت ${AR(data.updated)}${note}`,
          !note);
    /* 🔑 b224 · وحفظُ الدفعة فتحٌ جديد لا عودة (`backToList`): دفعةٌ تُضاف قد تخفيها المِصفاةُ القائمة،
       فيَعِد العددُ في الرسالة بما لا يُرى. */
    openDeck(cur);
  };
  toTop();
}


/* ═══════════ ⑤ بطاقة واحدة ═══════════ */

/* مُنتقٍ متعدّد — مربّعاتٌ لا قائمةُ اختيارٍ متعدّدة:
   القائمةُ المتعدّدة تحتاج Ctrl للنقر، ويفقد المستخدمُ اختيارَه
   بنقرةٍ واحدةٍ خاطئة. والمربّعاتُ تُقرأ بلمحة وتُلمَس بإصبع. */
function picker(id, rows, label, on){
  const set = new Set((on || []).map(String));
  if(!rows.length) return '<div class="ed-empty">لا شيءَ للاختيار.</div>';
  return `<div class="pick" id="${id}">${rows.map(r => `
    <label class="pick-i">
      <input type="checkbox" value="${r.id}" ${set.has(String(r.id)) ? 'checked' : ''}>
      <span>${esc(r[label])}</span>
    </label>`).join('')}</div>`;
}

const picked = id => [...document.querySelectorAll(`#${id} input:checked`)]
                       .map(x => +x.value);

function cardForm(c){
  keepSpot(c?.id ?? null);
  app.innerHTML = `
    <div class="crumb" id="bk">→ عودة للبطاقات</div>
    <div class="ed-form">
      <div class="ed-side">
        <div class="ed-hint">🔑 <b>الوجه هو ما يُسأل عنه.</b> ويُختار بما
          سيُطلب من الطالب في الامتحان لا بما هو أسهل كتابة.</div>
        <div class="ed-hint" style="opacity:.75"><b>النُّطق:</b> زرُّ الرفع
          يملأ الحقل بمفتاحه، والرابطُ الخارجيُّ مقبولٌ أيضاً.
          <b>ويقف زرُّه بجوار الكلمة:</b> على الوجه إن كانت فيه، وعلى الظهر
          إن كانت جوابَه. وفي العربية الملفُّ هو السبيلُ الوحيد، مولَّداً
          أو مرفوعاً — فقارئ الجهاز يُسقط الإعراب، ونطقٌ خاطئ يُحفظ أسوأُ
          من لا نطق.</div>
        <div class="ed-hint" style="opacity:.75"><b>الصورتان:</b> صورةُ
          <b>الوجه</b> تُعرض مع السؤال، وصورةُ <b>المعنى</b> بعد الكشف.
          والسؤال قبل إضافة أيّهما: أتصلح <b>بديلاً عن المعنى</b>؟
          فإن كانت زينة حوله فلا تُضَف.</div>
        <div class="ed-hint" style="opacity:.75"><b>الدرس والفرع:</b> الدرسُ
          يقول أين تظهر — وبه تدخل صندوق الطالب حين يفتحه. والفرعُ يقول
          ما نوعُها، وبه يُبنى رابطُ تدرّبٍ على الفرع كلِّه.
          <b>وبطاقةٌ بلا درس</b> لا تصل أحداً إلا باختياره أو بخطأ مشخَّص.</div>
      </div>

      <div class="card" style="flex:1">
        <label class="fl">الوجه *</label>
        <input type="text" id="fr" value="${esc(c?.front || '')}"
               placeholder="المصطلح · أو جملة فيها {{ }}">

        <label class="fl" style="margin-top:16px">المعنى *</label>
        <textarea id="bk2" style="min-height:90px">${esc(c?.back || '')}</textarea>

        <label class="fl" style="margin-top:16px">أمثلة
          <span style="opacity:.6">(سطر لكلّ مثال)</span></label>
        <textarea id="nt" dir="auto" style="min-height:80px"
          placeholder="مثال في سطر&#10;وآخر في سطر تال">${esc(c?.note || '')}</textarea>

        <div class="ed-3">
          <div>
            <label class="fl">اللغة</label>
            <select id="lg">
              <option value="ar" ${(c?.lang || 'ar') === 'ar' ? 'selected' : ''}>عربية</option>
              <option value="en" ${c?.lang === 'en' ? 'selected' : ''}>إنجليزية</option>
            </select>
          </div>
          <div>
            <label class="fl">مفتاح النُّطق</label>
            <input type="text" id="au" dir="ltr" value="${esc(c?.audio || '')}"
                   placeholder="audio/x.mp3">
          </div>
        </div>
        <div id="cvSlot"></div>

        ${/* 🆕 b135 · الصورتان صفّاً مستقلّاً: لكلٍّ زرُّ رفعٍ تحتها،
              فثلاثةُ حقولٍ بأزرارها في صفٍّ واحد تتزاحم. */''}
        <div class="ed-two" style="margin-top:14px">
          <div>
            <label class="fl">صورةُ الوجه</label>
            <input type="text" id="imf" dir="ltr" value="${esc(c?.front_image || '')}"
                   placeholder="img/… أو https://…">
          </div>
          <div>
            <label class="fl">صورةُ المعنى</label>
            <input type="text" id="im" dir="ltr" value="${esc(c?.image || '')}"
                   placeholder="img/… أو https://…">
          </div>
        </div>

        <label class="fl" style="margin-top:16px">الدروس التي تظهر فيها</label>
        ${picker('ls', ctx.lessons, 'title', (c?.lessons || []).map(x => x.id))}

        <label class="fl" style="margin-top:14px">الفرع</label>
        ${ctx.strands.length
          ? picker('st', ctx.strands, 'name', (c?.strands || []).map(x => x.id))
          : '<div class="ed-empty">لا فروعَ لهذه المادة بعد.</div>'}

        <div class="nav" style="margin-top:20px">
          <button class="btn primary" id="sv">حفظ</button>
        </div>
      </div>
    </div>`;

  document.getElementById('bk').onclick = () => backToList();

  /* 🆕 b135 · أزرارُ الرفع تلتصق بالحقول القائمة ولا تستبدلها — عقدُ
     `upload.js` منذ كُتب. والنطاقُ `c<المجموعة>`: وسمٌ للقراءة البشرية
     لا رابط، فلا يضرُّ أن تُنقل البطاقةُ بعده. */
  attachUpload('au',  'c' + cur.id, 'audio');
  attachUpload('imf', 'c' + cur.id, 'image');
  attachUpload('im',  'c' + cur.id, 'image');

  /* 🆕 b216 · صوتُ الوجه بعد زرّ الرفع: يملأ الحقلَ نفسَه، وما يُسمع قبل الحفظ لا يبلغ الطالب */
  const voice = cardVoice({ fr: document.getElementById('fr'), back: document.getElementById('bk2'), lang: document.getElementById('lg'),
                            key: document.getElementById('au'), deck: cur.id, card: c });
  document.getElementById('cvSlot').replaceWith(voice.el);

  document.getElementById('sv').onclick = async () => {
    const front = document.getElementById('fr').value.trim();
    const back  = document.getElementById('bk2').value.trim();
    if(!front || !back) return toast('الوجه والمعنى لازمان', false);
    /* صوتٌ وُلّد لوجهٍ تغيّر بعده لا يُحفظ معه — ويُقال، فلا يُظنّ أنّ البطاقة نطقت */
    const stale = voice.stale();

    /* save_card بالهُويّة لا بمطابقة front — تعديل الصياغة لا يُنشئ
       صفّاً آخر. أمّا save_cards (اللصق الجماعي) فتبقى لغرضها هي. */
    const { data: id, error } = await api.saveCard({
      id: c?.id ?? null, deck: cur.id, front, back,
      note:  document.getElementById('nt').value.trim() || null,
      audio: stale ? null : document.getElementById('au').value.trim() || null,
      image: document.getElementById('im').value.trim() || null,
      front_image: document.getElementById('imf').value.trim() || null,
      lang:  document.getElementById('lg').value || 'ar' });
    if(error) return toast(error.message, false);

    /* 🔑 والبُعدان بعد الحفظ لا معه: البطاقةُ الجديدة لا هُويّةَ لها
       قبله. ونداءان لا واحد — فدالّتان في القاعدة لا دالّة.
       ⚠️ وخطؤهما يُقال ولا يُبتلَع: البطاقةُ حُفظت والوسمُ لم يُحفظ،
          وصمتٌ هنا يُفهم «تمّ كلُّه». */
    const ls = picked('ls');
    const st = ctx.strands.length ? picked('st') : [];
    const r1 = await api.setCardLessons(id, ls);
    const r2 = ctx.strands.length ? await api.setCardStrands(id, st) : {};
    if(r1.error || r2.error)
      return toast('حُفظت البطاقة، وتعذّر الوسم: '
        + (r1.error || r2.error).message, false);

    await backToList(id);
    /* 🆕 b224 · وبطاقةٌ لا تطابق المِصفاةَ بعد حفظها يُقال ذلك فيها — وإلّا ظُنّت ضاعت، والمِصفاةُ هي التي تخفيها */
    const hid = !visible().some(x => String(x.id) === String(id));
    toast('حُفظت' + (stale ? '، وسقط صوتها لأن الوجه تغيّر' : '') + (hid ? '، والمِصفاة تخفيها' : ''));
  };
  toTop();
}


/* ═══════════ ⑥ معاينة بعين الطالب ═══════════ */
/*
   ④ الارتفاع min(px, dvh) لا رقمٌ ثابت — فبطاقةٌ ٤٠٠px على جوالٍ
      مستلقٍ (ارتفاعُه أحياناً ٣٧٥px فقط) تفيض عن الشاشة كلّها.
      وdvh تقرأ المساحة الرأسية الحقيقية المتاحة فعلاً، لا نافذة
      المتصفّح الكاملة التي قد يحجب شريطُ العنوان جزءاً منها.

   ⑤ وإعادة القياس تلحق تدوير الشاشة: النصّ الذي انكمش عند البناء
      لا يعود ليكبر تلقائياً إن اتّسعت المساحة، ولا يتقلّص أكثر إن
      ضاقت — إلا بإعادة تشغيل shrink() صراحةً. ⇒ سجلٌّ خفيف
      (fitters) يُعاد تطبيقه عند كل resize بتهدئةٍ ١٢٠ مللي ثانية.
*/

function preview(){
  keepSpot();
  let i = 0, fitters = [], resizeT;

  /* 🔊 ولا نسخةَ ثانية من الزرّ: sayGroup و bindSay في ui.js تخدمان
     هذه الشاشة وشاشةَ الطالب معاً (ثابت ⑨). فمعاينةٌ تختلف عن الشاشة
     تُطمئن على غير ما سيقع. */

  /* مفتاحٌ صريح لا يُغني عنه إعدادُ النظام: ذاك يقول ما يريده المستخدم
     دائماً، وهذا ما يريده الآن. ⇒ إعداد النظام قيمةٌ ابتدائية، والاختيار
     اليدويّ يعلوها ويُحفظ — كما تفعل سِمة المنصّة. */
  const sysReduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  let calm;
  try{ calm = localStorage.getItem('bf-calm'); }catch(err){ calm = null; }
  calm = calm === null ? sysReduce : calm === '1';

  app.innerHTML = `
    <div class="crumb" id="bk">→ عودة للبطاقات</div>
    <div class="warnbox" style="margin-bottom:14px">👁 معاينة — لا يُحفظ
      منها تقدير، ولا تدخل جدولة أحد. النصّ الذي تكتبه في حقل
      الاسترجاع لا يُخزَّن هنا أيضاً.</div>

    <div class="bf-wrap">
      <div class="bf-bar">
        <label class="bf-toggle">
          <input type="checkbox" id="bfCalm" ${calm ? 'checked' : ''}>
          <span class="bf-track"><span class="bf-knob"></span></span>
          <span class="bf-toggle-t">حركة أقل</span>
        </label>
      </div>
      <div class="bf-stage" id="bfStage">
        <div class="bf-card" id="bfCard">
          <div class="bf-face bf-front" id="bfFront"></div>
          <div class="bf-face bf-back"  id="bfBack"></div>
        </div>
      </div>
    </div>`;

  const stage = document.getElementById('bfStage');
  const cardEl = document.getElementById('bfCard');
  const front = document.getElementById('bfFront');
  const back  = document.getElementById('bfBack');

  /* صفٌّ واحد على الحاوية يعطّل القلب والانتقال معاً — فمن طلب حركةً
     أقلّ لا يريد انزلاقاً عند كل تقدّم أيضاً */
  const applyCalm = () => document.querySelector('.bf-wrap')
                             .classList.toggle('calm', calm);
  applyCalm();

  document.getElementById('bfCalm').onchange = e => {
    calm = e.target.checked;
    try{ localStorage.setItem('bf-calm', calm ? '1' : '0'); }catch(err){}
    applyCalm();
  };

  function registerFit(face, target, basePx, minPx){
    fitters = fitters.filter(f => f.face !== face);
    shrinkFont(face, target, basePx, minPx);
    fitters.push({ face, target, basePx, minPx });
  }
  function onResize(){
    clearTimeout(resizeT);
    resizeT = setTimeout(() => {
      fitters = fitters.filter(f => document.contains(f.target));
      fitters.forEach(f => shrinkFont(f.face, f.target, f.basePx, f.minPx));
    }, 120);
  }
  window.addEventListener('resize', onResize);

  document.getElementById('bk').onclick = () => {
    window.removeEventListener('resize', onResize);   // لا تتراكم المستمعات عبر فتحاتٍ متكرّرة
    backToList();
  };

  function paint(){
    const c = C[i];
    const gap = /\{\{\s*\}\}/.test(c.front);
    c._ex = pickExample(c.note);      // ثابتٌ ما دامت البطاقة معروضة
    cardEl.classList.remove('flipped');

    /* 🔑 لا عنوان للمصطلح المجرَّد: «ما معناها؟» تتكرّر في كل بطاقة
       فتبلى وتصير مشتّتاً، وتُعلّم العين أن تتجاوز أعلى البطاقة.
       وتبقى لبطاقات الفراغ وحدها — هناك تحمل معلومةً لأن الفراغ وسط
       جملةٍ قد يُقرأ نصّاً ناقصاً لا سؤالاً. وما لا يتكرّر لا يبلى. */
    const say = sayable(c);
    const grp = say && say.side === 'front' ? sayGroup(c) : '';

    front.innerHTML = `
      ${gap ? '<div class="bf-prompt">ما الكلمة الناقصة؟</div>' : ''}
      <div class="bf-qrow ctr" dir="${dirOf(c.front)}">
        <div class="bf-front-q" id="bfQ"
          >${esc(c.front).replace(/\{\{\s*\}\}/g,
          '<span style="opacity:.45">______</span>')}</div>
        ${grp}
      </div>
      ${cardImg(c.front_image, c.front)}
      <div class="bf-recall">
        <textarea id="bfDraft" dir="auto"
                  placeholder="${gap ? 'الكلمة…' : 'ما يحضرك…'}"
                  style="min-height:56px"></textarea>
        <button class="bf-hint" data-flip="1">رؤية الإجابة</button>
      </div>`;
    registerFit(front, document.getElementById('bfQ'), 18.9, 15);
    if(grp) bindSay(front, c, say);

    back.innerHTML = '';
  }

  function buildBack(){
    const c = C[i];
    const draft = document.getElementById('bfDraft').value.trim();

    /* 🔑 المصطلح لا يُكتب مع شرحه: من نسيه يجده أمامه فيقرأ ويمضي،
       فتصير البطاقة قراءةً لا استرجاعاً — وهو وهمُ المعرفة بعينه.
       ومن أراده فالقلب الرجوعيّ يعيده إليه، وتلك محاولةٌ ثانية لا تذكير.
       والاستثناء: من كتب شيئاً يحتاج المقارَن به لحكمه الذاتيّ. */
    /* وزرُّ الظهر لحالةٍ واحدة: المنطوقُ في الظهر (معنًى ← الكلمة). */
    const say = sayable(c);
    const grp = say && say.side === 'back' ? sayGroup(c) : '';
    /* ومعاينةُ المؤلّف ترى ما يراه الطالب حرفاً (ثابت ⑨) — فالشطرُ
       هنا بعينه لا نظيرٌ له. */
    const [bkMain, bkMeta] = backMeta(c.back);
    const bk  = backText(bkMain);
    const ans = `<div class="bf-qrow" dir="${dirOf(bk)}">
        <div class="bf-answer" id="bfAns">${esc(bk)}</div>${grp}</div>${bkMeta
      ? `<div class="bf-meta" dir="${dirOf(bkMeta)}">${esc(bkMeta)}</div>` : ''}`;

    back.innerHTML = `
      ${draft ? `
        <div class="bf-term" dir="${dirOf(c.front)}">${esc(c.front)}</div>
        <div class="bf-label">كتبت</div>
        <div class="bf-mine" dir="auto">${esc(draft)}</div>
        <div class="bf-label">الصواب</div>
        ${ans}`
      : ans}
      ${cardImg(c.image, c.front)}

      ${c._ex ? `<div class="bf-ex" dir="${dirOf(c._ex)}"
          ><span class="sr-only">مثال: </span>${esc(c._ex)}</div>` : ''}

      <button class="bf-hint" data-flip="1">العودة للسؤال</button>
      <div class="bf-btn-row">
        <button class="btn" data-g="1">لم أتذكّرها</button>
        <button class="btn" data-g="2">بصعوبة</button>
        <button class="btn" data-g="3">بسهولة</button>
      </div>`;

    registerFit(back, document.getElementById('bfAns'), 16.8, 13);
    if(grp) bindSay(back, c, say);

    back.querySelector('[data-flip]').onclick = e => { e.stopPropagation(); toggle(); };
    back.querySelectorAll('[data-g]').forEach(b => b.onclick = e => { e.stopPropagation(); next(); });
  }

  function toggle(){
    if(cardEl.classList.contains('flipped')){
      cardEl.classList.remove('flipped');
    } else {
      buildBack();
      cardEl.classList.add('flipped');
    }
  }

  cardEl.addEventListener('click', e => {
    if(e.target.closest('textarea, .bf-btn-row')) return;
    toggle();
  });

  function next(){
    const advance = () => { i = (i + 1) % C.length; paint(); };

    /* 🔴 تُقرأ calm **لحظة الضغط** لا عند فتح الشاشة: المستخدم قد يبدّل
       المفتاح في منتصف الجلسة. ولو التُقطت مرّةً واحدة، لانتظرنا
       transitionend لا يقع أبداً بعد التفعيل — فيتجمّد الانتقال بصمت. */
    if(calm){ advance(); return; }

    /* 🔴 شبكةُ أمان (b63): كان المفتاحُ مطفأً والنظامُ يطلب التخفيف ⇒
       base.css يُلغي الانتقال فلا يقع transitionend أبداً، وتتجمّد المعاينة
       بعد أول تقدير — بلا خطأٍ في الطرفية. screens.css صار يمنع هذا، لكنّ
       الحدث يغيب لأسبابٍ أخرى أيضاً (تبويبٌ مخفيّ · عنصرٌ أُزيل). ⇒ مهلةٌ
       أطولُ قليلاً من الانتقال (١٨٠ مللي ثانية) تتقدّم إن لم يأتِ، ولا
       تتقدّم مرّتين إن أتى. */
    let moved = false;
    const onEnd = e => { if(e.target === stage) go(); };   // لا حدثَ فقاعةٍ من ابن
    const go = () => {
      if(moved) return; moved = true;
      stage.removeEventListener('transitionend', onEnd);
      advance(); stage.classList.remove('bf-out');
    };
    stage.classList.add('bf-out');
    stage.addEventListener('transitionend', onEnd);
    setTimeout(go, 400);
  }

  paint(); toTop();
}
