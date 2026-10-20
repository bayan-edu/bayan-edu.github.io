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
   ══════════════════════════════════════════════════════════ */
import * as api from './api.js';
import { app, head, toast, esc, AR, errBox, nav, setWide, scrollTop, dirOf, backText, backMeta, shrinkFont, examples, pickExample, sayable, sayGroup, bindSay, cardImg, N } from './ui.js';

import { openCourse } from './editor.js';
import { practiceLinkBox } from './practice_links.js';
import { attachUpload } from './upload.js';

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
  head("البطاقات", course.title || '');
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
  const off = D.find(d => !d.mine);
  off ? openDeck(off, lessonId) : renderNoDeck();
}


/* ═══════════ ① لا مجموعةَ بعد — حالةُ فراغٍ لا قائمةُ صفر ═══════════ */

function renderNoDeck(){
  app.innerHTML = `
    <div class="crumb" id="bk">→ دروس المقرَّر</div>
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
    <div class="crumb" id="bk">→ بطاقات المادة</div>
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
  cur = d; TAG = false; SEL.clear();
  /* والدرسُ نصٌّ لا رقم: المقارنةُ في `pass()` و`sel()` كلتاهما
     `String(id) === F.lesson` — فرقمٌ هنا يُسقط المصفاة صامتاً. */
  F = { q: '', lesson: lessonId ? String(lessonId) : '',
        strand: '', flag: '', sort: 'pos' };
  head("البطاقات", d.title);
  app.innerHTML = `<div class="status">جار التحميل…</div>`;
  const { data, error } = await api.deckCards(d.id);
  if(error){ app.innerHTML = errBox(error, 'بطاقات المجموعة'); return; }
  C = data || [];
  renderCards();
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
  const rows = visible();
  box.innerHTML = rows.length ? rows.map(cardRow).join('') : emptyNote();
  const st = document.getElementById('cdStat');
  if(st) st.textContent = statText(rows.length);
  app.querySelectorAll('[data-fl]').forEach(b =>
    b.classList.toggle('on', b.dataset.fl === F.flag));
  const clr = document.getElementById('f_clr');
  if(clr) clr.disabled = !sifted();
  wireRows();
}

function wireFilterBar(){
  const $ = id => document.getElementById(id);
  const q = $('f_q');
  if(q) q.oninput = () => { F.q = q.value; redrawList(); };

  app.querySelectorAll('[data-fk]').forEach(s =>
    s.onchange = () => { F[s.dataset.fk] = s.value; redrawList(); });

  const so = $('f_sort');
  if(so) so.onchange = () => { F.sort = so.value; redrawList(); };

  /* الرقيقةُ تُبدّل حالها: نقرةٌ تُظهرها وحدها، ونقرةٌ تُعيد الكلّ */
  app.querySelectorAll('[data-fl]').forEach(b => b.onclick = () => {
    F.flag = F.flag === b.dataset.fl ? '' : b.dataset.fl;
    redrawList();
  });

  const clr = $('f_clr');
  if(clr){
    clr.disabled = !sifted();
    clr.onclick  = () => {
      F.q = F.lesson = F.strand = F.flag = '';
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
  return ls.map(l => `<span class="chip">${esc(l.title)}</span>`).join('')
       + ss.map(s => `<span class="chip g">${esc(s.name)}</span>`).join('');
}

/* 🆕 b134 · والصفُّ خرج من جوف الرسم لأنّ `redrawList` تُنادِيه وحدَها */
const cardRow = c => `
    <div class="ed-row${SEL.has(c.id) ? ' on' : ''}" data-c="${c.id}">
      ${TAG ? `<label class="pick-c" title="حدّد">
        <input type="checkbox" data-sel="${c.id}" ${SEL.has(c.id) ? 'checked' : ''}>
      </label>` : ''}
      <div style="flex:0 0 34%;min-width:0">
        <div class="ed-t" dir="${dirOf(c.front)}">${esc(c.front)}</div>
        <div class="ed-m">
          ${(c.lang || 'ar') !== 'ar'
            ? `<span class="chip g">${esc(String(c.lang).toUpperCase())}</span>` : ''}
          ${c.audio ? '<span class="chip">🔊 نُطق</span>' : ''}
          ${/* 🆕 b135 · وشارةٌ تقول أيَّ صورةٍ تحمل، لا أنّها تحمل صورة:
                «وجه» و«معنى» موضعان مختلفان في عين الطالب. */''}
          ${c.front_image ? '<span class="chip">🖼 وجه</span>' : ''}
          ${c.image ? '<span class="chip">🖼 معنى</span>' : ''}
          ${examples(c.note).length > 1
            ? `<span class="chip">${AR(examples(c.note).length)} أمثلة</span>` : ''}
        </div>
        <div class="ed-m" style="margin-top:4px">${tags(c)}</div>
      </div>
      <div class="ed-bk" style="flex:1;min-width:0;color:var(--text-muted);
                  font-size:var(--fs-meta);line-height:1.6"
           dir="${dirOf(c.back)}">${esc(backText(c.back))}</div>
      <button class="it-b wide" data-ed="${c.id}">✏️</button>
      <button class="it-b" data-rm="${c.id}">🗑</button>
    </div>`;


function renderCards(){
  const rows = visible();

  app.innerHTML = `
    <div class="crumb" id="bk">→ دروس المقرَّر</div>

    <div class="nav" style="margin-bottom:16px">
      <button class="btn primary" id="paste">📋 لصق قائمة</button>
      <button class="btn" id="one">＋ بطاقة واحدة</button>
      ${C.length ? '<button class="btn" id="pv">👁 معاينة بعين الطالب</button>' : ''}
      ${/* 🆕 b89 · ولا يظهر لرزمةٍ فارغة: create_practice_session تردّها
            («لا بطاقة في هذه الرزمة»)، وزرٌّ لا يُنتج إلا رسالةَ رفضٍ
            يُعلّم أنّ الأزرار تكذب. */''}
      ${C.length ? '<button class="btn" id="plink">🔗 رابط تدرّب</button>' : ''}
      ${/* 🔴 b131 · ورُفع «⚙️ اسم المجموعة». المجموعةُ بعد `157` حاويةٌ
            واحدةٌ لكلّ (مادة · صفّ)، واسمُها مشتقٌّ من اسم المادة —
            فزرُّ إعادة التسمية **يدعو المؤلّف أن يكسر اسماً مشتقّاً**،
            ويعد بتصنيفٍ لا تفعله الحاويةُ أصلاً. والتصنيفُ على
            البطاقة: الدرسُ والفرع. ⇒ زرٌّ غامضُ الغرضِ ضرره أكبر. */''}
      ${C.length ? `<button class="btn${TAG ? ' primary' : ''}" id="tag">🏷 ${
        TAG ? 'إنهاء الوسم' : 'أضف بطاقاتٍ إلى درس'}</button>` : ''}
    </div>

    ${TAG ? tagBar() : ''}

    ${/* الشريطُ لا يُعرض لمجموعةٍ فارغة: مِصفاةٌ على صفرٍ أثاثٌ لا أداة */''}
    ${C.length ? filterBar() : ''}

    <div class="ed-sec">
      <div class="grp">${esc(cur.title)} <span class="chip">${AR(C.length)}</span></div>
      <div id="cdList">${rows.length ? rows.map(cardRow).join("") : emptyNote()}</div>
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
  scrollTop();
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
    const { error } = await api.deleteCard(+b.dataset.rm);
    if(error) return toast(error.message, false);   // 🔒 تُرفض إن كان يراجعها طلاب
    toast('حُذفت'); openDeck(cur);
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
      <button class="it-b" id="selall">تحديدُ الظاهر (${AR(visible().length)})</button>
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
  const all = $('selall'), none = $('selnone');
  if(all)  all.onclick  = () => { visible().forEach(c => SEL.add(c.id)); renderCards(); };
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
  const byLesson = new Map(), byStrand = new Map();
  C.forEach(c => {
    (c.lessons || []).forEach(l => byLesson.set(l.id, (byLesson.get(l.id) || 0) + 1));
    (c.strands || []).forEach(s => byStrand.set(s.id, (byStrand.get(s.id) || 0) + 1));
  });

  const opt = (rows, map, label, kind) => rows
    .filter(r => map.get(r.id))
    .map(r => `<button class="it-b wide" data-k="${kind}" data-s="${r.id}"
                 data-t="${esc(r[label])}">${esc(r[label])}
               <span class="chip">${AR(map.get(r.id))}</span></button>`).join('');

  const ls = opt(ctx.lessons, byLesson, 'title', 'lesson_cards');
  const st = opt(ctx.strands, byStrand, 'name',  'strand_cards');

  app.innerHTML = `
    <div class="crumb" id="bk">→ ${esc(cur.title)}</div>
    <div class="ed-sec">
      <div class="grp">على أيّ شيءٍ يتدرّب الطالب؟</div>

      <div class="ed-hint">🔑 <b>وبطاقاتُ الدرس هي الغالب.</b> واللقطة
        تُجمَّد عند الإنشاء — فما تضيفه بعد الرابط لا يدخله.</div>

      <div class="grp" style="margin-top:14px">درسٌ بعينه</div>
      ${ls || '<div class="ed-empty">لا درسَ له بطاقاتٌ بعد.</div>'}

      <div class="grp" style="margin-top:14px">فرعٌ من المادة</div>
      ${st || '<div class="ed-empty">لا فرعَ له بطاقاتٌ بعد.</div>'}

      <div class="grp" style="margin-top:14px">أو المادة كلُّها</div>
      <button class="it-b wide" data-k="cards" data-s="${cur.id}"
        data-t="${esc(cur.title)}">${esc(cur.title)}
        <span class="chip">${AR(C.length)}</span></button>
    </div>`;

  document.getElementById('bk').onclick = () => openDeck(cur);
  app.querySelectorAll('[data-k]').forEach(b => b.onclick = () =>
    practiceLinkBox({ kind: b.dataset.k, source: +b.dataset.s, title: b.dataset.t }));
  scrollTop();
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
  app.innerHTML = `
    <div class="crumb" id="bk">→ ${esc(cur.title)}</div>
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
          صوت. <b>والعربية لا زرَّ لها</b> — القراءة الآلية تُسقط الإعراب،
          ونطقٌ خاطئ يُحفظ أسوأ من لا نطق.</div>
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

  document.getElementById('bk').onclick = () => openDeck(cur);

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
        ${ready.slice(0, 6).map(r => `<div class="ed-row">
            <div style="flex:0 0 34%"><div class="ed-t">${esc(r.front)}</div></div>
            <div class="ed-bk" style="flex:1;color:var(--text-muted);font-size:var(--fs-meta)"
              >${esc(backText(r.back))}</div></div>`).join("")}
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
    openDeck(cur);
  };
  scrollTop();
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
  app.innerHTML = `
    <div class="crumb" id="bk">→ ${esc(cur.title)}</div>
    <div class="ed-form">
      <div class="ed-side">
        <div class="ed-hint">🔑 <b>الوجه هو ما يُسأل عنه.</b> ويُختار بما
          سيُطلب من الطالب في الامتحان لا بما هو أسهل كتابة.</div>
        <div class="ed-hint" style="opacity:.75"><b>النُّطق:</b> زرُّ الرفع
          يملأ الحقل بمفتاحه، والرابطُ الخارجيُّ مقبولٌ أيضاً.
          <b>ويُسمَع بعد الكشف لا قبله.</b> وفي العربية هو السبيلُ الوحيد —
          فالقراءةُ الآلية تُسقط الإعراب، ونطقٌ خاطئ يُحفظ أسوأُ من لا نطق.</div>
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

  document.getElementById('bk').onclick = () => openDeck(cur);

  /* 🆕 b135 · أزرارُ الرفع تلتصق بالحقول القائمة ولا تستبدلها — عقدُ
     `upload.js` منذ كُتب. والنطاقُ `c<المجموعة>`: وسمٌ للقراءة البشرية
     لا رابط، فلا يضرُّ أن تُنقل البطاقةُ بعده. */
  attachUpload('au',  'c' + cur.id, 'audio');
  attachUpload('imf', 'c' + cur.id, 'image');
  attachUpload('im',  'c' + cur.id, 'image');

  document.getElementById('sv').onclick = async () => {
    const front = document.getElementById('fr').value.trim();
    const back  = document.getElementById('bk2').value.trim();
    if(!front || !back) return toast('الوجه والمعنى لازمان', false);

    /* save_card بالهُويّة لا بمطابقة front — تعديل الصياغة لا يُنشئ
       صفّاً آخر. أمّا save_cards (اللصق الجماعي) فتبقى لغرضها هي. */
    const { data: id, error } = await api.saveCard({
      id: c?.id ?? null, deck: cur.id, front, back,
      note:  document.getElementById('nt').value.trim() || null,
      audio: document.getElementById('au').value.trim() || null,
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

    toast('حُفظت'); openDeck(cur);
  };
  scrollTop();
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
    <div class="crumb" id="bk">→ ${esc(cur.title)}</div>
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
    openDeck(cur);
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

  paint(); scrollTop();
}
