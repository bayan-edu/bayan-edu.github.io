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

   ⚠️ ولا محرّر وسائط اليوم: image بلا جرّة في المنصّة، وaudio
      يُلصق بمفتاحه كما في بقية الشاشات (ثابت ②).
   ══════════════════════════════════════════════════════════ */
import * as api from './api.js';
import { app, head, toast, esc, AR, errBox, nav, setWide, scrollTop, dirOf, shrinkFont, examples, pickExample, sayable, sayGroup, bindSay, N } from './ui.js';

import { openCourse } from './editor.js';
import { practiceLinkBox } from './practice_links.js';

let ctx = null;   // { course, lessons }
let D   = [];     // المجموعات
let cur = null;   // المجموعة المفتوحة
let C   = [];     // بطاقاتها


/* ═══════════ الدخول ═══════════ */

export async function openCards(course){
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
  renderDecks();
}


/* ═══════════ ① المجموعات ═══════════ */

function renderDecks(){
  /* الشخصية تُعرض ولا تُحرَّر — ملكُ الطالب. وهي هنا لتُعرف لا لتُمسّ */
  const off = D.filter(d => !d.mine);
  const own = D.filter(d =>  d.mine);

  const row = d => `
    <div class="ed-row" data-d="${d.id}">
      <div style="flex:1;min-width:0">
        <div class="ed-t">${esc(d.title)}</div>
        <div class="ed-m">
          <span class="chip ${d.cards ? 'g' : ''}">${
            N(d.cards,'بطاقة','بطاقتان','بطاقات','بطاقة')}</span>
          ${d.lessons ? `<span class="chip">${
            N(d.lessons,'درس','درسان','دروس','درساً')}</span>` : ''}
        </div>
      </div>
      <button class="it-b wide" data-open="${d.id}">✏️ تحرير</button>
      ${d.cards === 0 ? `<button class="it-b" data-rm="${d.id}">🗑</button>` : ''}
    </div>`;

  app.innerHTML = `
    <div class="crumb" id="bk">← دروس المقرَّر</div>

    ${/* 🔑 والمجموعةُ الرسميّة واحدةٌ لكلّ (مادة · صفّ) — قيدٌ في
          القاعدة (sql/157). فزرُّ «جديدة» يُخفى حين توجد، لأنّ زرّاً
          لا يُنتج إلا رسالةَ رفضٍ يُعلّم أنّ الأزرار تكذب. */''}
    ${off.length ? '' : `<div class="nav" style="margin-bottom:16px">
      <button class="btn primary" id="new">＋ إنشاء مجموعة المادة</button>
    </div>`}

    <div class="ed-sec">
      <div class="grp">مجموعة المقرَّر <span class="chip">${AR(off.length)}</span></div>
      ${off.length ? off.map(row).join("")
                   : `<div class="ed-empty">لا مجموعة بعد. وهي حاويةٌ واحدةٌ
                      لبطاقات المادة كلِّها — والتصنيفُ بالدرس والفرع على
                      البطاقة نفسِها.</div>`}
    </div>

    ${own.length ? `<div class="ed-sec">
      <div class="grp">مجموعات الطلاب <span class="chip">${AR(own.length)}</span></div>
      <div class="ed-empty">${AR(own.length)} مجموعة شخصية — تُعرض عدداً ولا تُفتح.
        محتواها ملك صاحبه.</div>
    </div>` : ''}`;

  document.getElementById('bk').onclick = () => openCourse(ctx.course);
  const nw = document.getElementById('new');
  if(nw) nw.onclick = () => deckForm(null);
  app.querySelectorAll('[data-open]').forEach(b => b.onclick = e => {
    e.stopPropagation();
    openDeck(D.find(x => String(x.id) === b.dataset.open));
  });
  app.querySelectorAll('[data-rm]').forEach(b => b.onclick = async e => {
    e.stopPropagation();
    if(!confirm('حذف المجموعة الفارغة؟')) return;
    const { error } = await api.deleteDeck(+b.dataset.rm);
    if(error) return toast(error.message, false);
    toast('حُذفت'); openCards(ctx.course);
  });
  scrollTop();
}


/* ═══════════ ② نموذج المجموعة ═══════════ */

function deckForm(d){
  app.innerHTML = `
    <div class="crumb" id="bk">← البطاقات</div>
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

  document.getElementById('bk').onclick = renderDecks;
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

async function openDeck(d){
  cur = d;
  head("البطاقات", d.title);
  app.innerHTML = `<div class="status">جار التحميل…</div>`;
  const { data, error } = await api.deckCards(d.id);
  if(error){ app.innerHTML = errBox(error, 'بطاقات المجموعة'); return; }
  C = data || [];
  renderCards();
}

function renderCards(){
  /* 🔑 والدرسُ والفرعُ يُعرضان على كلّ صفّ: بطاقةٌ بلا تصنيف لا تصل
     طالباً إلا باختياره، **وهذا صمتٌ يجب أن يُرى** — فالفراغ هنا
     معلومةٌ لا نقصُ زينة. */
  const tags = c => {
    const ls = c.lessons || [], ss = c.strands || [];
    if(!ls.length && !ss.length)
      return '<span class="chip warn">بلا درس ولا فرع</span>';
    return ls.map(l => `<span class="chip">${esc(l.title)}</span>`).join('')
         + ss.map(s => `<span class="chip g">${esc(s.name)}</span>`).join('');
  };

  const row = c => `
    <div class="ed-row" data-c="${c.id}">
      <div style="flex:0 0 34%;min-width:0">
        <div class="ed-t" dir="${dirOf(c.front)}">${esc(c.front)}</div>
        <div class="ed-m">
          ${(c.lang || 'ar') !== 'ar'
            ? `<span class="chip g">${esc(String(c.lang).toUpperCase())}</span>` : ''}
          ${c.audio ? '<span class="chip">🔊 نُطق</span>' : ''}
          ${examples(c.note).length > 1
            ? `<span class="chip">${AR(examples(c.note).length)} أمثلة</span>` : ''}
        </div>
        <div class="ed-m" style="margin-top:4px">${tags(c)}</div>
      </div>
      <div style="flex:1;min-width:0;color:var(--text-muted);
                  font-size:var(--fs-meta);line-height:1.6"
           dir="${dirOf(c.back)}">${esc(c.back)}</div>
      <button class="it-b wide" data-ed="${c.id}">✏️</button>
      <button class="it-b" data-rm="${c.id}">🗑</button>
    </div>`;

  app.innerHTML = `
    <div class="crumb" id="bk">← المجموعات</div>

    <div class="nav" style="margin-bottom:16px">
      <button class="btn primary" id="paste">📋 لصق قائمة</button>
      <button class="btn" id="one">＋ بطاقة واحدة</button>
      ${C.length ? '<button class="btn" id="pv">👁 معاينة بعين الطالب</button>' : ''}
      ${/* 🆕 b89 · ولا يظهر لرزمةٍ فارغة: create_practice_session تردّها
            («لا بطاقة في هذه الرزمة»)، وزرٌّ لا يُنتج إلا رسالةَ رفضٍ
            يُعلّم أنّ الأزرار تكذب. */''}
      ${C.length ? '<button class="btn" id="plink">🔗 رابط تدرّب</button>' : ''}
      <button class="btn" id="edeck">⚙️ اسم المجموعة</button>
    </div>

    <div class="ed-sec">
      <div class="grp">${esc(cur.title)} <span class="chip">${AR(C.length)}</span></div>
      ${C.length ? C.map(row).join("")
                 : `<div class="ed-empty">لا بطاقة بعد.
                    الصق عمودين: الوجه ثم المعنى، والفاصل بينهما Tab.</div>`}
    </div>`;

  document.getElementById('bk').onclick = renderDecks;
  document.getElementById('paste').onclick = pasteBox;
  document.getElementById('one').onclick   = () => cardForm(null);
  document.getElementById('edeck').onclick = () => deckForm(cur);
  const pv = document.getElementById('pv'); if(pv) pv.onclick = preview;

  const pl = document.getElementById('plink');
  if(pl) pl.onclick = linkPicker;

  app.querySelectorAll('[data-ed]').forEach(b => b.onclick = () =>
    cardForm(C.find(x => String(x.id) === b.dataset.ed)));
  app.querySelectorAll('[data-rm]').forEach(b => b.onclick = async () => {
    if(!confirm('حذف البطاقة؟')) return;
    const { error } = await api.deleteCard(+b.dataset.rm);
    if(error) return toast(error.message, false);   // 🔒 تُرفض إن كان يراجعها طلاب
    toast('حُذفت'); openDeck(cur);
  });
  scrollTop();
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
    <div class="crumb" id="bk">← ${esc(cur.title)}</div>
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
    <div class="crumb" id="bk">← ${esc(cur.title)}</div>
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
            <div style="flex:1;color:var(--text-muted);font-size:var(--fs-meta)"
              >${esc(r.back)}</div></div>`).join("")}
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
    <div class="crumb" id="bk">← ${esc(cur.title)}</div>
    <div class="ed-form">
      <div class="ed-side">
        <div class="ed-hint">🔑 <b>الوجه هو ما يُسأل عنه.</b> ويُختار بما
          سيُطلب من الطالب في الامتحان لا بما هو أسهل كتابة.</div>
        <div class="ed-hint" style="opacity:.75"><b>النُّطق:</b> يُرفع الملفّ
          إلى المخزن ثمّ يُلصق مفتاحه — <code>audio/x.mp3</code>.
          ويُسمَع بعد الكشف لا قبله.</div>
        <div class="ed-hint" style="opacity:.75"><b>الصورة:</b> رابط خارجيّ
          اليوم. والسؤال قبل إضافتها: أتصلح <b>بديلاً عن المعنى</b>؟
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
          <div>
            <label class="fl">رابط الصورة</label>
            <input type="text" id="im" dir="ltr" value="${esc(c?.image || '')}"
                   placeholder="https://…">
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
    <div class="crumb" id="bk">← ${esc(cur.title)}</div>
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
    const ans = `<div class="bf-qrow" dir="${dirOf(c.back)}">
        <div class="bf-answer" id="bfAns">${esc(c.back)}</div>${grp}</div>`;

    back.innerHTML = `
      ${draft ? `
        <div class="bf-term" dir="${dirOf(c.front)}">${esc(c.front)}</div>
        <div class="bf-label">كتبت</div>
        <div class="bf-mine" dir="auto">${esc(draft)}</div>
        <div class="bf-label">الصواب</div>
        ${ans}`
      : ans}

      ${c._ex ? `<div class="bf-divider"></div>
        <div class="bf-label">مثال${examples(c.note).length > 1
          ? ` · ${AR(examples(c.note).length)}` : ''}</div>
        <div class="bf-note" dir="${dirOf(c._ex)}">${esc(c._ex)}</div>` : ''}

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
