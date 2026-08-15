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
import { app, head, toast, esc, AR, errBox, nav, setWide, scrollTop, L } from './ui.js';
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

    <div class="card">
      <div class="qnum">سؤال ${AR(cur+1)} · ${q.kind==='mcq'?'اختيار من متعدد':'مقالي قصير'}
        ${locked ? '<span class="badge lock">مقفل</span>' : ''}</div>

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


/* ═══════════ الربط ═══════════ */

function wire(q){
  const mark = () => { dirty = true; };
  const main = document.getElementById("main");

  ["qb","qe","qm"].forEach(id => {
    const el = document.getElementById(id); if(el) el.oninput = mark;
  });

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
    passage: q.passage_id, objective: q.objective_id,
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
