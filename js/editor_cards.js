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
import { app, head, toast, esc, AR, errBox, nav, setWide, scrollTop, dirOf, shrinkFont, examples, pickExample } from './ui.js';
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
  app.innerHTML = `<div class="status">جارٍ التحميل…</div>`;

  const [decks, lessons] = await Promise.all([
    api.subjectDecks(course.subject_id),
    api.authorLessons(course.id)
  ]);
  if(decks.error){ app.innerHTML = errBox(decks.error, 'البطاقات'); return; }

  D = decks.data || [];
  ctx.lessons = lessons.data || [];
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
          <span class="chip ${d.cards ? 'g' : ''}">${AR(d.cards)} بطاقة</span>
          ${d.lesson ? `<span class="chip">${esc(d.lesson)}</span>` : ''}
        </div>
      </div>
      <button class="it-b wide" data-open="${d.id}">✏️ تحرير</button>
      ${d.cards === 0 ? `<button class="it-b" data-rm="${d.id}">🗑</button>` : ''}
    </div>`;

  app.innerHTML = `
    <div class="crumb" id="bk">← دروس المقرَّر</div>

    <div class="nav" style="margin-bottom:16px">
      <button class="btn primary" id="new">＋ مجموعة جديدة</button>
    </div>

    <div class="ed-sec">
      <div class="grp">مجموعات المقرَّر <span class="chip">${AR(off.length)}</span></div>
      ${off.length ? off.map(row).join("")
                   : '<div class="ed-empty">لا مجموعة بعد. ابدأ بواحدة وألصق فيها قائمتك.</div>'}
    </div>

    ${own.length ? `<div class="ed-sec">
      <div class="grp">مجموعات الطلاب <span class="chip">${AR(own.length)}</span></div>
      <div class="ed-empty">${AR(own.length)} مجموعةً شخصية — تُعرض عدداً ولا تُفتح.
        محتواها ملكُ صاحبه.</div>
    </div>` : ''}`;

  document.getElementById('bk').onclick = () => openCourse(ctx.course);
  document.getElementById('new').onclick = () => deckForm(null);
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
        <div class="ed-hint">💡 <b>المجموعة</b> تتبع المادة والصفّ.
          وربطُها بدرسٍ اختياريّ — فإن رُبطت دخلت بطاقاتُها صندوقَ
          الطالب حين يفتح ذلك الدرس.</div>
        <div class="ed-hint" style="opacity:.75">وبلا درس: تبقى مجموعةَ
          المقرَّر كلِّه، ولا تدخل إلا بإضافة الطالب أو بخطأٍ مشخَّص.</div>
      </div>

      <div class="card" style="flex:1">
        <label class="fl">عنوان المجموعة *</label>
        <input type="text" id="ti" value="${esc(d?.title || '')}"
               placeholder="مثال: مصطلحات البلاغة">

        <label class="fl" style="margin-top:16px">الدرس
          <span style="opacity:.6">(اختياري)</span></label>
        <select id="ls">
          <option value="">— بلا درس —</option>
          ${ctx.lessons.map(l => `<option value="${l.id}"
             ${String(d?.lesson_id ?? '') === String(l.id) ? 'selected' : ''}
             >${esc(l.title)}</option>`).join("")}
        </select>

        <div class="nav" style="margin-top:20px">
          <button class="btn primary" id="sv">حفظ</button>
        </div>
      </div>
    </div>`;

  document.getElementById('bk').onclick = renderDecks;
  document.getElementById('sv').onclick = async () => {
    const title = document.getElementById('ti').value.trim();
    if(!title) return toast('اكتب عنواناً', false);
    const lesson = document.getElementById('ls').value || null;

    const { error } = await api.saveDeck({
      id: d?.id ?? null, title, lesson: lesson ? +lesson : null,
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
  app.innerHTML = `<div class="status">جارٍ التحميل…</div>`;
  const { data, error } = await api.deckCards(d.id);
  if(error){ app.innerHTML = errBox(error, 'بطاقات المجموعة'); return; }
  C = data || [];
  renderCards();
}

function renderCards(){
  const row = c => `
    <div class="ed-row" data-c="${c.id}">
      <div style="flex:0 0 34%;min-width:0">
        <div class="ed-t" dir="${dirOf(c.front)}">${esc(c.front)}</div>
        <div class="ed-m">
          ${c.audio ? '<span class="chip">🔊 نُطق</span>' : ''}
          ${examples(c.note).length > 1
            ? `<span class="chip">${AR(examples(c.note).length)} أمثلة</span>` : ''}
        </div>
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
      <button class="btn" id="edeck">⚙️ إعدادات المجموعة</button>
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
  if(pl) pl.onclick = () => practiceLinkBox({
    kind: 'cards', source: cur.id, title: cur.title });

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
        <div class="ed-hint">📋 <b>سطرٌ لكلّ بطاقة.</b> الوجه ثمّ المعنى،
          والفاصل <b>Tab</b> — وهو ما ينتجه النسخُ من جدول Word أو Excel.
          ويقبل <code>|</code> و<code>—</code> أيضاً.</div>
        <div class="ed-hint" style="opacity:.75"><b>عمودٌ ثالث — المثال:</b>
          وتُكتب عدّةُ أمثلةٍ مفصولةً بـ<code>؛</code>، فتختار البطاقة
          واحداً في كلّ لقاء. <b>ومثالٌ ثابت يُحفظ بنصّه</b> فيتعرّف
          الطالبُ الجملةَ لا المفهوم.</div>
        <div class="ed-hint" style="opacity:.75">🔑 <b>وأقوى وجهٍ جملةٌ
          بفراغ:</b> اكتب <code>{{ }}</code> مكان الكلمة — فيُسترجَع
          المصطلح في سياقه لا مجرَّداً.</div>
        <div class="ed-hint" style="opacity:.75">♻️ وإعادة اللصق
          <b>تصحيحٌ لا تكرار</b>: ما تكرّر وجهُه يُحدَّث معناه.</div>
      </div>

      <div class="card" style="flex:1">
        <label class="fl">القائمة</label>
        <textarea id="tx" dir="auto" style="min-height:220px;font-family:var(--font-mono,monospace)"
          placeholder="الاستعارة المكنية&#9;تشبيهٌ حُذف فيه المشبَّه به وبقيت قرينةٌ من لوازمه"></textarea>

        <div class="nav" style="margin-top:14px">
          <button class="btn" id="chk">فحصُ ما سيُحفظ</button>
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
    const { data, error } = await api.saveCards(cur.id, ready.map(r => ({
      front: r.front, back: r.back, note: r.note || null, lang: 'ar' })));
    if(error) return toast(error.message, false);
    toast(`أُضيفت ${AR(data.added)} · صُحّحت ${AR(data.updated)}`);
    openDeck(cur);
  };
  scrollTop();
}


/* ═══════════ ⑤ بطاقة واحدة ═══════════ */

function cardForm(c){
  app.innerHTML = `
    <div class="crumb" id="bk">← ${esc(cur.title)}</div>
    <div class="ed-form">
      <div class="ed-side">
        <div class="ed-hint">🔑 <b>الوجه هو ما يُسأل عنه.</b> اختره بما
          سيُطلب من الطالب في الامتحان لا بما هو أسهل كتابةً.</div>
        <div class="ed-hint" style="opacity:.75"><b>النُّطق:</b> ارفع الملفّ
          إلى المخزن ثمّ ألصق مفتاحه — <code>audio/x.mp3</code>.
          ويُسمَع بعد الكشف لا قبله.</div>
        <div class="ed-hint" style="opacity:.75"><b>الصورة:</b> رابطٌ خارجيّ
          اليوم. والسؤال قبل إضافتها: أتصلح <b>بديلاً عن المعنى</b>؟
          فإن كانت زينةً حوله فلا تُضَف.</div>
      </div>

      <div class="card" style="flex:1">
        <label class="fl">الوجه *</label>
        <input type="text" id="fr" value="${esc(c?.front || '')}"
               placeholder="المصطلح · أو جملةٌ فيها {{ }}">

        <label class="fl" style="margin-top:16px">المعنى *</label>
        <textarea id="bk2" style="min-height:90px">${esc(c?.back || '')}</textarea>

        <label class="fl" style="margin-top:16px">أمثلة
          <span style="opacity:.6">(سطرٌ لكلّ مثال)</span></label>
        <textarea id="nt" dir="auto" style="min-height:80px"
          placeholder="مثالٌ في سطر&#10;وآخرُ في سطرٍ تالٍ">${esc(c?.note || '')}</textarea>

        <div class="ed-3">
          <div>
            <label class="fl">مفتاح النُّطق</label>
            <input type="text" id="au" dir="ltr" value="${esc(c?.audio || '')}"
                   placeholder="audio/x.mp3">
          </div>
          <div style="grid-column:span 2">
            <label class="fl">رابط الصورة</label>
            <input type="text" id="im" dir="ltr" value="${esc(c?.image || '')}"
                   placeholder="https://…">
          </div>
        </div>

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
    const { error } = await api.saveCard({
      id: c?.id ?? null, deck: cur.id, front, back,
      note:  document.getElementById('nt').value.trim() || null,
      audio: document.getElementById('au').value.trim() || null,
      image: document.getElementById('im').value.trim() || null,
      lang: 'ar' });
    if(error) return toast(error.message, false);
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
    front.innerHTML = `
      ${gap ? '<div class="bf-prompt">ما الكلمة الناقصة؟</div>' : ''}
      <div class="bf-front-q" id="bfQ" dir="${dirOf(c.front)}"
        >${esc(c.front).replace(/\{\{\s*\}\}/g,
        '<span style="opacity:.45">______</span>')}</div>
      <div class="bf-recall">
        <textarea id="bfDraft" dir="auto"
                  placeholder="${gap ? 'اكتب الكلمة…' : 'اكتب ما تعرفه…'}"
                  style="min-height:56px"></textarea>
        <button class="bf-hint" data-flip="1">اضغط لرؤية الإجابة</button>
      </div>`;
    registerFit(front, document.getElementById('bfQ'), 18.9, 15);

    back.innerHTML = '';
  }

  function buildBack(){
    const c = C[i];
    const draft = document.getElementById('bfDraft').value.trim();

    /* 🔑 المصطلح لا يُكتب مع شرحه: من نسيه يجده أمامه فيقرأ ويمضي،
       فتصير البطاقة قراءةً لا استرجاعاً — وهو وهمُ المعرفة بعينه.
       ومن أراده فالقلب الرجوعيّ يعيده إليه، وتلك محاولةٌ ثانية لا تذكير.
       والاستثناء: من كتب شيئاً يحتاج المقارَن به لحكمه الذاتيّ. */
    back.innerHTML = `
      ${c.audio ? `<div style="display:flex;justify-content:flex-end;margin-bottom:6px">
          <span class="chip">🔊 نُطق</span></div>` : ''}

      ${draft ? `
        <div class="bf-term" dir="${dirOf(c.front)}">${esc(c.front)}</div>
        <div class="bf-label">كتبتَ</div>
        <div class="bf-mine" dir="auto">${esc(draft)}</div>
        <div class="bf-label">الصواب</div>
        <div class="bf-answer" id="bfAns" dir="${dirOf(c.back)}">${esc(c.back)}</div>`
      : `<div class="bf-answer" id="bfAns" dir="${dirOf(c.back)}">${esc(c.back)}</div>`}

      ${c._ex ? `<div class="bf-divider"></div>
        <div class="bf-label">مثال${examples(c.note).length > 1
          ? ` · ${AR(examples(c.note).length)}` : ''}</div>
        <div class="bf-note" dir="${dirOf(c._ex)}">${esc(c._ex)}</div>` : ''}

      <button class="bf-hint" data-flip="1">اضغط للعودة للسؤال</button>
      <div class="bf-btn-row">
        <button class="btn" data-g="1">لم أتذكّرها</button>
        <button class="btn" data-g="2">بصعوبة</button>
        <button class="btn" data-g="3">بسهولة</button>
      </div>`;

    registerFit(back, document.getElementById('bfAns'), 16.8, 13);

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
