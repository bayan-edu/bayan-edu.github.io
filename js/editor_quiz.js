/* ══════════════════════════════════════════════════════════
   بيان — editor_quiz.js  ③  الأسئلة والتشخيص

   ثلاثة أعمدة:  شريط الأسئلة │ التحرير-المعاينة │ الجاهزية

   🔑 المبدأ الحاكم: المشتّت وتشخيصه فكرة واحدة ⇒ صفٌّ واحد.
      لا لوحة جانبية ولا نافذة منبثقة للأكواد — تكتب الخيار
      وأنت تفكّر لماذا سيقع فيه الطالب، فتختار الكود في اللحظة
      نفسها. ولو أُخفي في درج لصار واجباً إدارياً يُملأ آخر الوقت.

   🎨 والوسط يستعمل فئات شاشة الطالب نفسها (.qtext .opts .opt .key)
      فيرى المؤلّف ما سيراه الطالب — لا محاكاةً له. وأي تغيير في
      تنسيق الاختبار ينعكس هنا تلقائياً: مصدر واحد للشكل.
   ══════════════════════════════════════════════════════════ */
import * as api from './api.js';
import { S } from './state.js';
import { app, head, toast, esc, fmt, AR, errBox, nav, setWide, scrollTop, L } from './ui.js';
import { openCourse } from './editor.js';

let Z    = null;   // الاختبار المحمَّل
let cur  = 0;      // فهرس السؤال المعروض
let ctx  = null;   // { course, lesson }
let dirty = false; // تغييرات غير محفوظة في السؤال الحالي


/* ═══════════ الدخول ═══════════ */

export async function openQuiz(course, lesson){
  ctx = { course, lesson };
  nav('editor'); setWide(true);
  head("اختبار الدرس", lesson.title);
  app.innerHTML = `<div class="status">جارٍ التحميل…</div>`;

  if(!lesson.quiz_id) return offerCreate();

  const { data, error } = await api.quizForEdit(lesson.quiz_id);
  if(error){ app.innerHTML = errBox(error, 'تحميل الاختبار'); return; }
  if(!data.ok){ app.innerHTML = errBox({ message: data.error }, 'تحميل الاختبار'); return; }

  Z = data; cur = 0; dirty = false;
  render();
}

/* درس بلا اختبار — لا يكتمل عند الطالب أبداً */
function offerCreate(){
  app.innerHTML = `
    <div class="crumb" id="bk">← دروس المقرَّر</div>
    <div class="card" style="text-align:center;padding:32px">
      <div style="font-size:2.2rem;margin-bottom:12px">📝</div>
      <div class="rev-q">هذا الدرس بلا اختبار</div>
      <div class="line" style="margin-bottom:18px">
        الدرس لا يكتمل عند الطالب إلا باختبار مُدرَج — وبدونه تتوقّف سلسلة الدروس بعده.</div>
      <div class="nav"><button class="btn primary" id="mk">إنشاء اختبار الدرس</button></div>
    </div>`;
  document.getElementById("bk").onclick = () => openCourse(ctx.course);
  document.getElementById("mk").onclick = createQuiz;
}

async function createQuiz(){
  const { course, lesson } = ctx;
  app.innerHTML = `<div class="status">جارٍ الإنشاء…</div>`;

  const q = await api.saveQuiz({ course: course.id, title: lesson.title, official: true });
  if(q.error || !q.data.ok){ toast(q.error?.message || q.data.error); offerCreate(); return; }

  // العنصر المُدرَج هو ما يربط الاختبار بالدرس ويجعله شرط الانتقال
  const it = await api.saveItem({
    lesson: lesson.id, kind: 'quiz', title: 'الاختبار التشخيصي',
    quiz: q.data.id, official: true, isGraded: true, required: true, position: 99 });
  if(it.error || !it.data.ok){ toast(it.error?.message || it.data.error); return; }

  toast("أُنشئ الاختبار");
  ctx.lesson = { ...lesson, quiz_id: q.data.id, has_quiz: true };
  openQuiz(course, ctx.lesson);
}


/* ═══════════ الهيكل ═══════════ */

function render(){
  const qs = Z.questions || [];
  const q  = qs[cur] || null;

  app.innerHTML = `
    <div class="crumb" id="bk">← ${esc(ctx.lesson.title)}</div>
    <div class="eq">
      <aside class="eq-list">
        <div class="eq-h">الأسئلة <span class="chip">${AR(qs.length)}</span></div>
        ${qs.map((x,i) => `
          <div class="eq-item ${i===cur?'on':''}" data-i="${i}">
            <span class="eq-n">${AR(i+1)}</span>
            <span class="eq-b">${esc((x.body||'').slice(0,40) || '—')}</span>
            <span class="eq-k">${x.kind==='essay'?'✍️':'◉'}</span>
          </div>`).join("")}
        <div class="nav" style="margin-top:12px;flex-direction:column;gap:7px">
          <button class="btn ghost eq-add" id="addm">＋ اختيار من متعدد</button>
          <button class="btn ghost eq-add" id="adde">＋ سؤال مقالي</button>
        </div>

      </aside>

      <section class="eq-main" id="main">${q ? qCard(q) : emptyCard()}</section>

      <aside class="eq-side" id="ready"></aside>
    </div>`;

  document.getElementById("bk").onclick = leave;
  app.querySelectorAll(".eq-item").forEach(el => el.onclick = () => go(+el.dataset.i));
  document.getElementById("addm").onclick = () => addQuestion('mcq');
  document.getElementById("adde").onclick = () => addQuestion('essay');

  if(q) wire(q);
  readiness();
  scrollTop();
}

const emptyCard = () => `<div class="card" style="text-align:center;padding:34px">
  <div style="font-size:2rem;margin-bottom:10px">◉</div>
  <div class="rev-q">لا أسئلة بعد</div>
  <div class="line">ابدأ بستّة أسئلة اختيار من متعدد — وهو الحدّ الذي تبقى معه عتبة ٦٥٪ ذات معنى.</div>
</div>`;

function go(i){
  if(dirty && !confirm("تغييرات غير محفوظة في هذا السؤال — أتتركها؟")) return;
  cur = i; dirty = false; render();
}

function leave(){
  if(dirty && !confirm("تغييرات غير محفوظة — أتتركها؟")) return;
  openCourse(ctx.course);
}


/* ═══════════ بطاقة السؤال — تحرير ومعاينة معاً ═══════════ */

function qCard(q){
  const locked = q.answered > 0;
  const dx = (S.tree?.dx) || [];
  const fams = [...new Set(dx.map(d => d.family || 'عام'))];

  const dxSelect = (val, i) => `
    <select class="eq-dx ${val?'':'miss'}" data-o="${i}" ${locked?'disabled':''}>
      <option value="">— اختر التشخيص —</option>
      ${fams.map(f => `<optgroup label="${esc(f)}">
        ${dx.filter(d => (d.family||'عام')===f).map(d =>
          `<option value="${esc(d.code)}" ${d.code===val?'selected':''}>${esc(d.name)}</option>`).join("")}
      </optgroup>`).join("")}
    </select>`;

  const opt = (o, i) => `
    <div class="eq-opt ${o.correct?'ok':''}">
      <span class="key">${esc(o.label || L[i] || '?')}</span>
      <input class="eq-ob" data-o="${i}" value="${esc(o.body||'')}"
             placeholder="نصّ الخيار" ${locked?'disabled':''}>
      <label class="eq-c" title="الإجابة الصحيحة">
        <input type="radio" name="corr" data-o="${i}" ${o.correct?'checked':''} ${locked?'disabled':''}>
        صحيحة
      </label>
      ${o.correct ? '<span class="eq-sp"></span>' : dxSelect(o.dx, i)}
      ${locked ? '' : `<button class="eq-x" data-rm="${i}" title="حذف الخيار">✕</button>`}
    </div>`;

  return `
    ${locked ? `<div class="warnbox">أُجيب عن هذا السؤال ${AR(q.answered)} مرة —
      التعديل يكسر ربط المحاولات. لتغييره: انسخ الاختبار بكود جديد.</div>` : ''}

    ${sectionBar(q, locked)}
    ${passageBar(q, locked)}

    <div class="card">
      <div class="qnum">سؤال ${AR(cur+1)} · ${q.kind==='mcq'?'اختيار من متعدد':'مقالي قصير'}
        ${locked ? '<span class="badge lock">مقفل</span>' : ''}</div>

      ${mediaRow(q, locked)}

      <textarea id="qb" class="eq-qt" placeholder="نصّ السؤال…"
        ${locked?'disabled':''}>${esc(q.body||'')}</textarea>

      ${q.kind === 'mcq' ? `
        <div class="opts eq-opts">${(q.options||[]).map(opt).join("")}</div>
        ${locked ? '' : '<button class="btn ghost eq-addo" id="addo">＋ خيار</button>'}

        <label class="fl" style="margin-top:20px">شرح الخطأ — يراه الطالب بعد التسليم *</label>
        <textarea id="qe" placeholder="لماذا الإجابة الصحيحة صحيحة، وأين يزلّ الفهم؟"
          ${locked?'disabled':''}>${esc(q.explanation||'')}</textarea>
      ` : `
        <label class="fl" style="margin-top:16px">الإجابة النموذجية — يقارن بها الطالب نفسه *</label>
        <textarea id="qm" style="min-height:130px"
          ${locked?'disabled':''}>${esc(q.model||'')}</textarea>
      `}
    </div>

    <div class="nav">
      ${locked ? '' : `<button class="btn primary" id="sq">حفظ السؤال</button>`}
      <button class="btn ghost" id="dq">⧉ تكرار</button>
      ${locked ? '' : `<button class="btn ghost eq-del" id="xq">🗑 حذف</button>`}
    </div>`;
}


/* ═══════════ الحاويات: القسم والنصّ المشترك ═══════════
   كلاهما يعلو **مجموعة** أسئلة لا سؤالاً واحداً. فالتحرير يقع
   على مدى: هذا السؤال وما بعده حتى تتغيّر القيمة. */

function range(i, key){
  const v = Z.questions[i]?.[key] ?? null;
  const ids = [], idx = [];
  for(let j = i; j < Z.questions.length; j++){
    if((Z.questions[j][key] ?? null) !== v) break;
    idx.push(j + 1);
    if(Z.questions[j].id) ids.push(Z.questions[j].id);
  }
  return { ids, from: idx[0], to: idx[idx.length - 1], n: idx.length };
}

const span = r => r.n > 1 ? `يشمل الأسئلة ${AR(r.from)}–${AR(r.to)}`
                          : `يشمل السؤال ${AR(r.from)}`;

function sectionBar(q, locked){
  const r = range(cur, 'section');
  if(!q.section) return locked ? '' :
    `<button class="eq-bar add" id="addsec">＋ عنوان قسم يشمل هذا السؤال وما بعده</button>`;
  return `<div class="eq-bar sec">
    <span class="eq-bt">${esc(q.section)}</span>
    <span class="eq-bs">${span(r)}</span>
    ${locked ? '' : `<button class="it-b" id="edsec">✏️</button>
                     <button class="it-b" id="rmsec">✕</button>`}</div>`;
}

function passageBar(q, locked){
  const p = (Z.passages||[]).find(x => String(x.id) === String(q.passage_id));
  const r = range(cur, 'passage_id');
  if(!p) return locked ? '' :
    `<button class="eq-bar add" id="addpg">＋ نصّ مشترك يشمل هذا السؤال وما بعده</button>`;
  return `<div class="eq-bar pg">
    <div class="eq-brow">
      <span class="eq-bt">📖 ${esc(p.title || 'نصّ مشترك')}</span>
      <span class="eq-bs">${span(r)}</span>
      ${locked ? '' : `<button class="it-b" id="edpg">✏️ تحرير</button>
                       <button class="it-b" id="rmpg">✕ فصل</button>`}
    </div>
    ${p.media ? `<audio controls src="${esc(p.media)}" style="width:100%;margin-top:9px"></audio>` : ''}
    ${p.body ? `<div class="psg" dir="${p.lang==='ar'?'rtl':'ltr'}" style="max-height:160px;margin-top:9px">
      ${fmt((p.body||'').slice(0,700))}${(p.body||'').length>700?'…':''}</div>` : ''}
  </div>`;
}

/* وسائط السؤال — الأعمدة موجودة في القاعدة ولم يكن لها منفذ */
function mediaRow(q, locked){
  if(locked) return '';
  const f = (id, val, ph) => val !== null
    ? `<input class="eq-md" id="${id}" dir="ltr" value="${esc(val)}" placeholder="${ph}">` : '';
  return `<div class="eq-tools">
      <button class="eq-tb ${q.image?'on':''}" data-m="image">🖼️ صورة</button>
      <button class="eq-tb ${q.audio?'on':''}" data-m="audio">🎧 صوت</button>
      <button class="eq-tb ${q.video?'on':''}" data-m="video">🎬 فيديو</button>
      <span class="eq-sep"></span>
      <button class="eq-tb" data-w="**" title="غامق"><b>B</b></button>
      <button class="eq-tb" data-w="_"  title="مائل"><i>I</i></button>
      <button class="eq-tb" data-w="__" title="مسطَّر"><u>U</u></button>
    </div>
    ${f('qi', q.image ?? null, 'رابط الصورة')}
    ${f('qa', q.audio ?? null, 'رابط المقطع الصوتي')}
    ${f('qv', q.video ?? null, 'رابط الفيديو')}`;
}

/* إحاطة ما حُدِّد بعلامات التنسيق */
function wrapSel(id, mark){
  const el = document.getElementById(id); if(!el) return;
  const a = el.selectionStart ?? el.value.length, b = el.selectionEnd ?? a;
  const sel = el.value.slice(a, b) || 'نصّ';
  el.value = el.value.slice(0, a) + mark + sel + mark + el.value.slice(b);
  el.focus();
  if(el.setSelectionRange) el.setSelectionRange(a + mark.length, a + mark.length + sel.length);
}


/* ═══════════ الربط ═══════════ */

function wire(q){
  const mark = () => { dirty = true; };
  const main = document.getElementById("main");

  ["qb","qe","qm","qs"].forEach(id => {
    const el = document.getElementById(id); if(el) el.oninput = mark;
  });
  ["qi","qa","qv"].forEach(id => {
    const el = document.getElementById(id);
    if(el) el.oninput = e => {
      q[{qi:'image',qa:'audio',qv:'video'}[id]] = e.target.value || null; mark();
    };
  });
  main.querySelectorAll("[data-m]").forEach(el => el.onclick = () => {
    const k = el.dataset.m;
    q[k] = (q[k] === null || q[k] === undefined) ? '' : null;   // إظهار/إخفاء الحقل
    mark(); repaint(q);
  });
  main.querySelectorAll("[data-w]").forEach(el => el.onclick = () => {
    wrapSel("qb", el.dataset.w); mark();
  });

  const bind = (id, fn) => { const e = document.getElementById(id); if(e) e.onclick = fn; };
  bind("addsec", () => editSection(''));
  bind("edsec",  () => editSection(q.section || ''));
  bind("rmsec",  () => applySection(null));
  bind("addpg",  () => passageForm(null));
  bind("edpg",   () => passageForm((Z.passages||[]).find(x => String(x.id) === String(q.passage_id))));
  bind("rmpg",   () => applyPassage(null));

  main.querySelectorAll(".eq-ob").forEach(el => el.oninput = e => {
    q.options[+el.dataset.o].body = e.target.value; mark();
  });
  main.querySelectorAll(".eq-dx").forEach(el => el.onchange = e => {
    q.options[+el.dataset.o].dx = e.target.value || null;
    el.classList.toggle('miss', !e.target.value); mark();
  });
  main.querySelectorAll('input[name="corr"]').forEach(el => el.onchange = () => {
    q.options.forEach((o,i) => o.correct = (i === +el.dataset.o));
    mark(); repaint(q);
  });
  main.querySelectorAll("[data-rm]").forEach(el => el.onclick = () => {
    if(q.options.length <= 2){ toast("السؤال يحتاج خيارين على الأقل"); return; }
    q.options.splice(+el.dataset.rm, 1); mark(); repaint(q);
  });

  const ao = document.getElementById("addo");
  if(ao) ao.onclick = () => {
    if(q.options.length >= 6){ toast("ستة خيارات حدّ كافٍ"); return; }
    q.options.push({ label: L[q.options.length] || '', body: '', correct: false, dx: null });
    mark(); repaint(q);
  };

  const sq = document.getElementById("sq"); if(sq) sq.onclick = () => saveQ(q);
  const dq = document.getElementById("dq"); if(dq) dq.onclick = () => dupQ(q);
  const xq = document.getElementById("xq"); if(xq) xq.onclick = () => delQ(q);
}

/* إعادة رسم الوسط وحده — فلا يفقد الشريط موضعه */
function repaint(q){
  collect(q);
  document.getElementById("main").innerHTML = qCard(q);
  wire(q);
}

/* جمع ما في الحقول إلى الكائن قبل أي إعادة رسم أو حفظ */
function collect(q){
  const v = id => document.getElementById(id)?.value ?? null;
  if(v("qb") !== null) q.body = v("qb");
  if(v("qe") !== null) q.explanation = v("qe");
  if(v("qm") !== null) q.model = v("qm");
  if(v("qi") !== null) q.image = v("qi") || null;
  if(v("qa") !== null) q.audio = v("qa") || null;
  if(v("qv") !== null) q.video = v("qv") || null;
  document.querySelectorAll(".eq-ob").forEach(el =>
    q.options[+el.dataset.o].body = el.value);
}


/* ═══════════ العمليات ═══════════ */

async function saveQ(q){
  collect(q);
  const { data, error } = await api.saveQuestion({
    id: q.id ?? null, quiz: Z.id, kind: q.kind, body: q.body,
    position: cur + 1,
    options: (q.options || []).map(o => ({
      label: o.label, body: o.body, correct: !!o.correct, dx: o.dx })),
    explanation: q.explanation, model: q.model,
    passage: q.passage_id, objective: q.objective_id, section: q.section,
    points: q.points, lang: q.lang, difficulty: q.difficulty,
    image: q.image, video: q.video, audio: q.audio });

  if(error){ toast(error.message); return; }
  if(!data.ok){ toast(data.error); return; }
  dirty = false;
  toast("حُفظ السؤال");
  reload(data.id);
}

async function addQuestion(kind){
  if(dirty && !confirm("تغييرات غير محفوظة — أتتركها؟")) return;
  Z.questions.push(kind === 'mcq'
    ? { id:null, kind:'mcq', body:'', answered:0, explanation:'',
        options: L.slice(0,4).map((l,i) => ({ label:l, body:'', correct:i===0, dx:null })) }
    : { id:null, kind:'essay', body:'', answered:0, model:'', options:[] });
  cur = Z.questions.length - 1; dirty = true; render();
}

async function dupQ(q){
  if(!q.id){ toast("احفظ السؤال أولاً ثم كرّره"); return; }
  const { data, error } = await api.duplicateQuestion(q.id);
  if(error){ toast(error.message); return; }
  if(!data.ok){ toast(data.error); return; }
  toast("كُرّر السؤال بخياراته وأكواده");
  reload(data.id);
}

async function delQ(q){
  if(!q.id){ Z.questions.splice(cur,1); cur = Math.max(0, cur-1); dirty=false; render(); return; }
  if(!confirm("حذف هذا السؤال؟")) return;
  const { data, error } = await api.deleteQuestion(q.id);
  if(error){ toast(error.message); return; }
  if(!data.ok){ toast(data.error); return; }
  toast("حُذف السؤال");
  cur = Math.max(0, cur - 1);
  reload();
}

/* إعادة التحميل من القاعدة — فتتحدّث الجاهزية وعدّاد الإجابات معاً */
async function reload(focusId){
  const { data } = await api.quizForEdit(Z.id);
  if(data?.ok){
    Z = data;
    if(focusId){
      const i = Z.questions.findIndex(x => x.id === focusId);
      if(i >= 0) cur = i;
    }
    cur = Math.min(cur, Math.max(0, Z.questions.length - 1));
  }
  dirty = false; render();
}


/* ═══════════ تطبيق الحاويات على المدى ═══════════ */

async function applySection(sec){
  const r = range(cur, 'section');
  if(!r.ids.length){                       // سؤال لم يُحفظ بعد
    Z.questions[cur].section = sec; dirty = true; render(); return;
  }
  const { data, error } = await api.setSection(sec, r.ids);
  if(error){ toast(error.message); return; }
  if(!data.ok){ toast(data.error); return; }
  toast(sec ? `طُبّق على ${AR(data.count)} سؤالاً` : "أُزيل العنوان");
  reload();
}

async function applyPassage(pid){
  const r = range(cur, 'passage_id');
  if(!r.ids.length){
    Z.questions[cur].passage_id = pid; dirty = true; render(); return;
  }
  const { data, error } = await api.attachPassage(pid, r.ids);
  if(error){ toast(error.message); return; }
  if(!data.ok){ toast(data.error); return; }
  toast(pid ? `رُبط بـ${AR(data.count)} سؤالاً` : "فُصل النصّ");
  reload();
}

function editSection(cur_val){
  const v = prompt("عنوان القسم — يشمل هذا السؤال وما بعده حتى يتغيّر:\n" +
    ((Z.sections||[]).length ? "المستعملة: " + Z.sections.join(' · ') : ""), cur_val || '');
  if(v === null) return;
  applySection(v.trim() || null);
}


/* ═══════════ النصّ المشترك ═══════════ */

/* صندوق يتمدّد في مكانه — لا صفحة تنفصل عن الأسئلة */
function passageForm(p){
  const isNew = !p;
  const r = range(cur, 'passage_id');
  document.getElementById("main").innerHTML = `
    <div class="card eq-pgbox">
      <div class="qnum">${isNew ? 'نصّ مشترك جديد' : 'تحرير النصّ المشترك'}
        · ${isNew ? span(r) : ''}</div>

      <label class="fl">العنوان <span style="opacity:.6">(اختياري)</span></label>
      <input id="pt" value="${esc(p?.title || '')}" placeholder="Reading Passage 1">

      <div class="eq-tools" style="margin-top:14px">
        <button class="eq-tb" data-pw="**" title="غامق"><b>B</b></button>
        <button class="eq-tb" data-pw="_"  title="مائل"><i>I</i></button>
        <button class="eq-tb" data-pw="__" title="مسطَّر"><u>U</u></button>
        <span class="eq-sep"></span>
        <button class="eq-tb" id="pmed">🎧 مقطع صوتي</button>
        <span class="eq-hint">اتجاه النصّ يتبع اللغة</span>
      </div>
      <textarea id="pb" style="min-height:240px"
        placeholder="ألصق الفقرة كاملة…">${esc(p?.body || '')}</textarea>

      <input id="pm" dir="ltr" class="eq-md" value="${esc(p?.media || '')}"
             placeholder="رابط المقطع الصوتي" ${p?.media ? '' : 'hidden'}>

      <label class="fl" style="margin-top:16px">اللغة</label>
      <select id="pl">
        <option value="ar" ${p?.lang!=='en'?'selected':''}>العربية</option>
        <option value="en" ${p?.lang==='en'?'selected':''}>English</option>
      </select>

      <div class="nav" style="margin-top:16px">
        <button class="btn primary" id="ps">${isNew ? 'إضافة وربط' : 'حفظ'}</button>
        <button class="btn ghost" id="pc">إلغاء</button>
        ${!isNew && !p.used ? '<button class="btn ghost eq-del" id="pd">🗑 حذف</button>' : ''}
      </div>
    </div>`;

  document.querySelectorAll("[data-pw]").forEach(el =>
    el.onclick = () => wrapSel("pb", el.dataset.pw));
  document.getElementById("pmed").onclick = () => {
    const m = document.getElementById("pm"); m.hidden = !m.hidden; if(!m.hidden) m.focus();
  };
  document.getElementById("pc").onclick = () => render();
  const pd = document.getElementById("pd");
  if(pd) pd.onclick = () => delPassage(p.id);

  document.getElementById("ps").onclick = async () => {
    const v = id => (document.getElementById(id)?.value || '').trim();
    if(!v("pb") && !v("pm")){ toast("النصّ يحتاج نصاً أو مقطعاً صوتياً"); return; }
    const { data, error } = await api.savePassage({
      id: p?.id ?? null, quiz: Z.id, title: v("pt") || null,
      body: v("pb") || null, media: v("pm") || null, lang: v("pl") || 'ar',
      position: p?.position ?? ((Z.passages||[]).length + 1) });
    if(error){ toast(error.message); return; }
    if(!data.ok){ toast(data.error); return; }
    if(isNew){ await applyPassage(data.id); toast("أُضيف النصّ ورُبط"); return; }
    toast("حُفظ النصّ"); reload();
  };
}

async function delPassage(id){
  if(!confirm("حذف هذا النصّ المشترك؟")) return;
  const { data, error } = await api.deletePassage(id);
  if(error){ toast(error.message); return; }
  if(!data.ok){ toast(data.error); return; }
  toast("حُذف النصّ"); reload();
}


/* ═══════════ الجاهزية والنشر ═══════════ */

function readiness(){
  const box = document.getElementById("ready"); if(!box) return;
  const r = Z.readiness || { ok:false, mcq:0, essay:0, issues:[] };

  box.innerHTML = `
    <div class="eq-h">الجاهزية</div>
    <div class="eq-ready ${r.ok?'ok':''}">
      <div class="line"><b>${AR(r.mcq||0)}</b> اختيار من متعدد
        <span style="opacity:.6">(٦ مطلوبة)</span></div>
      <div class="line"><b>${AR(r.essay||0)}</b> مقالي</div>
      ${(r.issues||[]).length
        ? (r.issues||[]).map(i => `<div class="eq-iss">⚠️ ${esc(i)}</div>`).join("")
        : '<div class="eq-ok">✅ جاهز للنشر</div>'}
    </div>
    <div class="nav" style="flex-direction:column;gap:8px;margin-top:12px">
      <button class="btn ${Z.published?'ghost':'primary'}" id="pb" ${r.ok?'':'disabled'}>
        ${Z.published ? 'إلغاء النشر' : 'نشر الاختبار'}</button>
    </div>
    <p class="hint" style="text-align:right;margin-top:10px">
      ${Z.published ? 'منشور — يراه طلاب هذا الدرس.'
                    : 'غير منشور — لا يظهر لأحد بعد.'}</p>`;

  document.getElementById("pb").onclick = async () => {
    const { data, error } = await api.publishQuiz(Z.id, !Z.published);
    if(error){ toast(error.message); return; }
    if(!data.ok){ toast(data.error); return; }
    toast(Z.published ? "أُلغي النشر" : "نُشر الاختبار");
    reload();
  };
}
