/* ══════════════════════════════════════════════════════════
   بيان — editor.js  ①  الوجهة والدرس

   المسار:  المقرّرات ← دروس المقرَّر ← نموذج الدرس
   والأسئلة في editor_quiz.js — فلا يتضخّم هذا الملف.

   ⚠️ هذا الملف مصمَّم للحاسوب أولاً، بخلاف بقية المنصة.
      التأليف عمل مكتب: قوائم متجاورة ومعاينة وترتيب.
      استثناء واعٍ لا سهو.
   ══════════════════════════════════════════════════════════ */
import * as api from './api.js';
import { S } from './state.js';
import { app, head, toast, esc, AR, errBox, nav, setWide, scrollTop } from './ui.js';
import { openQuiz } from './editor_quiz.js';
import { openItems } from './editor_items.js';

/* شجرة التأليف تُحمَّل مرة وتُخزَّن — لا تتغيّر أثناء الجلسة */
async function tree(){
  if(S.tree) return S.tree;
  const { data, error } = await api.authorTree();
  if(error){ return { _error: error }; }
  S.tree = data || {};
  return S.tree;
}

const byId  = (arr, id) => (arr || []).find(x => String(x.id) === String(id));
const isNarrow = () => window.innerWidth < 900;

const narrowNote = () => isNarrow()
  ? `<div class="warnbox">المحرّر مصمَّم للحاسوب — الشاشة الضيّقة تعمل، لكن الترتيب
       والمعاينة أوضح على شاشة أوسع.</div>` : '';


/* ═══════════ ① المقرّرات ═══════════ */

export async function openEditor(scaleId, levelId){
  nav('editor'); setWide(true);
  head("التأليف", "اختر المقرَّر الذي تكتب فيه");
  app.innerHTML = `<div class="status">جارٍ التحميل…</div>`;

  const t = await tree();
  if(t._error){ app.innerHTML = errBox(t._error, 'شجرة التأليف'); return; }

  /* 🏠 بيتُ المقرَّر سُلّمُ مادته لا مستواه.
     ومادةٌ بلا سُلّم («كيف أذاكر؟») تسكن سلّماً اصطلاحياً id='free'. */
  const FREE    = { id:'free', name:'🚀 مهارات عامة', kind:'proficiency' };
  const scaleOf = c => (byId(t.subjects, c.subject_id) || {}).scale_id ?? 'free';
  const owned   = new Set((t.courses || []).map(scaleOf));
  const scales  = [...(t.scales || []), FREE].filter(s => owned.has(s.id));

  if(!scales.length){
    app.innerHTML = `<div class="card" style="text-align:center;padding:30px">
      <div style="font-size:2rem;margin-bottom:10px">🗂️</div>
      <div class="rev-q">لا مقرّرات متاحة لك للتأليف</div>
      <div class="line">صلاحية التأليف تُمنح من المدير.</div></div>`;
    return;
  }

  /* || لا ? : — فمعرّفٌ قديمٌ من زرّ رجوع يرتدّ للأول بدل أن يُنتج undefined */
  const sc     = (scaleId ? byId(scales, scaleId) : null) || scales[0];
  const levels = (t.levels || []).filter(l => l.scale_id === sc.id)
                                 .sort((a,b) => a.rank - b.rank);

  const mine = (t.courses || []).filter(c => scaleOf(c) === sc.id);
  const free = mine.some(c => c.level_id === null);
  const lv   = (levelId ? byId(levels, levelId) : null) || (free ? null : levels[0] || null);
  const courses = mine.filter(c => lv ? c.level_id === lv.id : c.level_id === null);

  /* نكرةٌ تُبنى منها المعرفة: ال+نطاق · بلا+نطاق */
  const rung = sc.kind === 'proficiency' ? 'مستوى' : 'صف';

  const subj = id => byId(t.subjects, id) || {};
  const path = id => byId(t.paths, id);

  const card = c => {
    const s = subj(c.subject_id), p = path(c.path_id);
    return `<div class="ed-card ${c.curate?'':'ro'}" data-c="${c.id}">
      <div class="ed-ic">${esc(s.icon || '📘')}</div>
      <div style="flex:1;min-width:0">
        <div class="ed-t">${esc(s.name || c.title)}</div>
        <div class="ed-m">
          ${p ? `<span class="chip g">${esc(p.name)}</span>` : ''}
          ${c.elective_group ? '<span class="chip">اختيارية</span>' : ''}
          <span class="chip">👥 ${AR(c.students)} طالباً</span>
          <span class="chip ${c.lessons ? 'g' : ''}">${AR(c.lessons)} درساً</span>
          ${c.curate ? '' : '<span class="chip">مصادر فقط</span>'}
        </div>
      </div>
      <div class="qz-go">←</div>
    </div>`;
  };

  app.innerHTML = `
    ${narrowNote()}
    <div class="ed-bar">
      <label class="fl" style="margin:0">المنهج</label>
      <select id="sc">${scales.map(x =>
        `<option value="${x.id}" ${x.id===sc.id?'selected':''}>${esc(x.name)}</option>`).join("")}</select>
           ${levels.length ? `
        <label class="fl" style="margin:0">ال${rung}</label>
        <select id="lv">
          ${free ? `<option value="" ${lv?'':'selected'}>— بلا ${rung} —</option>` : ''}
          ${levels.map(x => `<option value="${x.id}"
            ${lv && x.id===lv.id?'selected':''}>${esc(x.name)}</option>`).join("")}
        </select>` : ''}
      ${S.roleInfo?.role === 'admin' ? `<button class="btn ghost" id="tools"
         style="margin-inline-start:auto">🎯 أدوات القياس</button>` : ''}
    </div>
    <div class="ed-grid">${courses.map(card).join("")}</div>
    ${!courses.length ? `<div class="status">لا مقرّرات في هذا ال${rung}</div>` : ''}`;

  document.getElementById("sc").onchange = e => openEditor(e.target.value, null);
    const lvEl = document.getElementById("lv");        // ⚠️ قد لا يوجد — سُلّم بلا مستويات
  if(lvEl) lvEl.onchange = e => openEditor(sc.id, e.target.value);
   const tb = document.getElementById("tools");
  if(tb) tb.onclick = () => openTools();
  app.querySelectorAll(".ed-card").forEach(el =>
    el.onclick = () => openCourse(byId(t.courses, el.dataset.c)));
  scrollTop();
}

/* ═══════════ ①ب أدوات القياس ═══════════
   أداةٌ قائمة بذاتها: لا درسَ لها ولا مقرَّر — لأن التسكين يسبق التسكين.
   والمحطّة اختبارٌ كامل في quizzes، والذي يربطها جدولُ التوجيه. */

export async function openTools(){
  nav('editor'); setWide(true);
  head("أدوات القياس", "اختبارات قائمة بذاتها — لا تتبع درساً ولا مقرَّراً");
  app.innerHTML = `<div class="ed-bar">
    <button class="btn ghost" id="bk2">← رجوع إلى التأليف</button></div>
    <div class="status">جارٍ التحميل…</div>`;
  const { data, error } = await api.listTools();
  if(error){ app.innerHTML = errBox(error.message, 'أدوات القياس'); return; }
  const tools = data || [];

  const stationRow = st => `
    <div class="ed-card" data-q="${st.id}">
      <div class="ed-ic">${st.published ? '🟢' : '⚪'}</div>
      <div style="flex:1;min-width:0">
        <div class="ed-t">${esc(st.title || st.code)}</div>
        <div class="ed-m">
          ${st.station != null ? `<span class="chip g">محطّة ${AR(st.station)}</span>` : ''}
          <span class="chip ${st.n ? 'g' : ''}">${AR(st.n || 0)} بنداً</span>
          ${st.published ? '' : '<span class="chip">غير منشورة</span>'}
        </div>
      </div>
      <div class="qz-go">←</div>
    </div>`;

  app.innerHTML = `
    ${narrowNote()}
    <div class="ed-bar">
      <button class="btn ghost" id="bk2">← رجوع إلى التأليف</button>
      <button class="btn primary" id="newst" style="margin-inline-start:auto">＋ محطّة جديدة</button>
    </div>
    ${tools.map(t => `
      <div class="ed-sec">
        <div class="ed-sec-h">
          <span class="ed-t">${esc(t.tool)}</span>
          <span class="chip">${esc(t.subject)}</span>
          <span class="chip g">${AR((t.stations||[]).length)} محطّة</span>
        </div>
        <div class="ed-grid">${(t.stations||[]).map(stationRow).join("")}</div>
      </div>`).join("")}
    ${!tools.length ? `<div class="card" style="text-align:center;padding:30px">
      <div style="font-size:2rem;margin-bottom:10px">🎯</div>
      <div class="rev-q">لا أدوات قياس بعد</div>
      <div class="line">أداةٌ تُنشأ بأن يُعطى اختبارٌ اسمَ أداةٍ ورقمَ محطّة.</div></div>` : ''}`;

  document.getElementById("bk2").onclick = () => openEditor();
     document.getElementById("newst").onclick = () => newStation(tools);
  app.querySelectorAll(".ed-card").forEach(el =>
    el.onclick = () => openQuiz({ id: +el.dataset.q }));
  scrollTop();
}

/* محطّةٌ جديدة — تُنشأ باسم أداةٍ ومادّة، لا بمقرَّر.
   والأداة تُخلق بأوّل محطّةٍ تحمل اسمها: لا جدولَ لها. */
async function newStation(tools){
  const t = await tree();
  const subs = (t.subjects || []).filter(s => s.curate);
  if(!subs.length){ toast("لا مواد تملك الإشراف عليها"); return; }

  const names = [...new Set((tools||[]).map(x => x.tool))];

  app.innerHTML = `
    <div class="card" style="max-width:560px;margin:0 auto">
      <div class="ed-t" style="margin-bottom:16px">محطّة جديدة</div>

      <label class="fl">المادة</label>
      <select id="ns_sub">${subs.map(s =>
        `<option value="${s.id}">${esc(s.name)}</option>`).join("")}</select>

      <label class="fl" style="margin-top:14px">اسم الأداة</label>
      <input id="ns_tool" list="ns_tools" dir="auto"
             placeholder="ielts_placement" value="${esc(names[0] || '')}">
      <datalist id="ns_tools">${names.map(n =>
        `<option value="${esc(n)}">`).join("")}</datalist>
      <div class="eq-hint">اكتب اسماً قائماً لتُضاف المحطّة إليه، أو اسماً جديداً لأداةٍ جديدة.</div>

      <label class="fl" style="margin-top:14px">عنوان المحطّة</label>
      <input id="ns_title" dir="auto" placeholder="التوجيه · اللوحة L · فحص الحدّ ١">

      <div style="display:flex;gap:12px;margin-top:14px">
        <div style="flex:1"><label class="fl">رقم المحطّة</label>
          <input id="ns_no" type="number" min="1" value="1"></div>
        <div style="flex:1"><label class="fl">الدقائق</label>
          <input id="ns_min" type="number" min="1" value="12"></div>
      </div>

      <div class="nav" style="margin-top:20px">
        <button class="btn primary" id="ns_ok">إنشاء</button>
        <button class="btn ghost" id="ns_no2">إلغاء</button>
      </div>
    </div>`;

  document.getElementById("ns_no2").onclick = () => openTools();
  document.getElementById("ns_ok").onclick = async () => {
    const g = id => document.getElementById(id).value.trim();
    if(!g("ns_tool") || !g("ns_title")){ toast("اسم الأداة وعنوان المحطّة مطلوبان"); return; }

    const { data, error } = await api.saveQuiz({
      subject: +g("ns_sub"), tool: g("ns_tool"), title: g("ns_title"),
      station: +g("ns_no") || null, minutes: +g("ns_min") || 25, official: true });

    if(error){ toast(error.message); return; }
    if(!data.ok){ toast(data.error); return; }
    toast("أُنشئت المحطّة");
    openQuiz({ id: data.id });
  };
  scrollTop();
}

/* ═══════════ ② دروس المقرَّر ═══════════ */

export async function openCourse(course){
  nav('editor'); setWide(true);
  const t = await tree();
  const s = byId(t.subjects, course.subject_id) || {};
  const p = byId(t.paths, course.path_id);

  head(esc(s.name || course.title),
       `${AR(course.students)} طالباً${p ? ' · ' + p.name : ''}`);
  app.innerHTML = `<div class="status">جارٍ تحميل الدروس…</div>`;

  const { data, error } = await api.authorLessons(course.id);
  const lessons = data || [];

  /* التجميع بالوحدة — والوحدات من الشجرة لا من الدروس،
     فتظهر الوحدة الفارغة أيضاً */
  const units = (course.units || []).slice().sort((a,b) => a.position - b.position);
  const group = uid => lessons.filter(l =>
    String(l.unit_id ?? '') === String(uid ?? ''));

  const row = l => `<div class="ed-row" data-l="${l.id}">
      <div style="flex:1;min-width:0">
        <div class="ed-t">${esc(l.title)}</div>
        <div class="ed-m">
          <span class="chip ${l.published ? 'g' : ''}">${l.published ? '✅ منشور' : '✏️ مسودّة'}</span>
          <span class="chip">${AR(l.official_items)} مصدراً</span>
          ${l.extras ? `<span class="chip">+${AR(l.extras)} إضافي</span>` : ''}
          <span class="chip ${l.has_quiz ? 'g' : ''}">${l.has_quiz ? '📝 اختبار' : '⚠️ بلا اختبار'}</span>
        </div>
      </div>
      <button class="it-b wide" data-it="${l.id}">📦 المصادر (${AR(l.official_items)})</button>
      <button class="eq-go ${l.has_quiz?'':'warn'}" data-q="${l.id}">
        ${l.has_quiz ? '📝 الاختبار' : '⚠️ أضِف اختباراً'}</button>
      <div class="qz-go">تحرير ←</div>
    </div>`;

  const block = (title, uid) => {
    const ls = group(uid);
    return `<div class="grp">${esc(title)} <span class="chip">${AR(ls.length)}</span></div>
      ${ls.length ? ls.map(row).join("") : '<div class="ed-empty">لا دروس بعد</div>'}`;
  };

  app.innerHTML = `
    <div class="crumb" id="bk">← المقرّرات</div>
    ${errBox(error, 'دروس المقرَّر')}
    ${course.curate ? `<div class="nav" style="margin-bottom:16px">
        <button class="btn primary" id="new">＋ درس جديد</button>
        <button class="btn ghost"   id="nu">＋ وحدة</button>
      </div>` : `<div class="warnbox">لديك صلاحية إضافة مصادر إلى الدروس القائمة —
        وإنشاء الدروس لفريق الإشراف.</div>`}

    ${units.map(u => block(u.title, u.id)).join("")}
    ${group(null).length || !units.length ? block('دروس بلا وحدة', null) : ''}

    ${!lessons.length && course.curate
      ? `<p class="hint">ابدأ بوحدة ثم درس — أو درساً مباشرة.</p>` : ''}`;

   document.getElementById("bk").onclick = () => openEditor(
    (byId(t.subjects, course.subject_id) || {}).scale_id ?? 'free', course.level_id);
  const nb = document.getElementById("new");
  if(nb) nb.onclick = () => editLesson(course, null);
  const nu = document.getElementById("nu");
  if(nu) nu.onclick = () => newUnit(course);
  app.querySelectorAll(".ed-row").forEach(el =>
    el.onclick = () => editLesson(course, lessons.find(x => String(x.id) === el.dataset.l)));
  app.querySelectorAll("[data-q]").forEach(el => el.onclick = e => {
    e.stopPropagation();                       // لا يفتح تحرير الدرس معه
    openQuiz(course, lessons.find(x => String(x.id) === el.dataset.q));
  });
  app.querySelectorAll("[data-it]").forEach(el => el.onclick = e => {
    e.stopPropagation();
    openItems(course, lessons.find(x => String(x.id) === el.dataset.it));
  });
  scrollTop();
}


/* ═══════════ ③ وحدة جديدة ═══════════ */

async function newUnit(course){
  const title = prompt("عنوان الوحدة:");
  if(!title) return;
  const { data, error } = await api.saveUnit({ course: course.id, title,
                            position: (course.units || []).length + 1 });
  if(error){ toast(error.message); return; }
  if(!data.ok){ toast(data.error); return; }
  toast("أُضيفت الوحدة");
  S.tree = null;                       // الشجرة تغيّرت
  const t = await tree();
  openCourse(byId(t.courses, course.id));
}


/* ═══════════ ④ نموذج الدرس ═══════════ */

export async function editLesson(course, lesson){
  nav('editor'); setWide(true);
  const t = await tree();
  const isNew = !lesson;
  head(isNew ? "درس جديد" : "تحرير الدرس", course.title);

  const { data: all } = await api.authorLessons(course.id);
  const others = (all || []).filter(l => !lesson || l.id !== lesson.id);
  const units  = (course.units || []).slice().sort((a,b) => a.position - b.position);

  app.innerHTML = `
    <div class="crumb" id="bk">← دروس المقرَّر</div>
    <div class="ed-form">
      <div class="ed-side">
        <div class="ed-hint">👥 سيصل هذا الدرس إلى
          <b>${AR(course.students)} طالباً</b> في ${esc(course.title)}</div>
        ${isNew ? '' : `<div class="ed-hint">
          ${AR(lesson.official_items)} مصدراً · ${lesson.has_quiz ? 'له اختبار' : 'بلا اختبار'}</div>`}
        <div class="ed-hint" style="opacity:.7">
          الدرس لا يكتمل عند الطالب إلا باختبار مُدرَج — أضِفه بعد الحفظ.</div>
      </div>

      <div class="card" style="flex:1">
        <label class="fl">عنوان الدرس *</label>
        <input type="text" id="ti" value="${esc(lesson?.title || '')}"
               placeholder="مثال: الغلاف المائي على كوكب الأرض">
        <p class="small">العنوان فريد داخل المقرَّر — والتشابه يُكشف بعد التطبيع
          (الهضمي = الهضمى)</p>

        <label class="fl" style="margin-top:16px">الوحدة</label>
        <select id="un">
          <option value="">— بلا وحدة —</option>
          ${units.map(u => `<option value="${u.id}"
            ${String(lesson?.unit_id) === String(u.id) ? 'selected' : ''}>${esc(u.title)}</option>`).join("")}
        </select>

        <label class="fl" style="margin-top:16px">ملخّص <span style="opacity:.6">(اختياري)</span></label>
        <textarea id="su" style="min-height:80px"
          placeholder="سطر أو سطران يظهران للطالب قبل دخول الدرس">${esc(lesson?.summary || '')}</textarea>

        <div class="ed-3">
          <div>
            <label class="fl">الترتيب</label>
            <input type="text" id="po" inputmode="numeric"
                   value="${lesson?.position ?? (all?.length || 0) + 1}">
          </div>
          <div>
            <label class="fl">عتبة النجاح</label>
            <input type="text" id="pm" inputmode="numeric" value="${lesson?.pass_mark ?? 65}">
          </div>
          <div>
            <label class="fl">يشترط إتمام</label>
            <select id="rq">
              <option value="">— لا شيء —</option>
              ${others.map(l => `<option value="${l.id}"
                ${String(lesson?.requires_id) === String(l.id) ? 'selected' : ''}>${esc(l.title)}</option>`).join("")}
            </select>
          </div>
        </div>

        <label class="fl" style="margin-top:18px;display:flex;align-items:center;gap:9px">
          <input type="checkbox" id="pu" style="width:auto" ${lesson?.published ? 'checked' : ''}>
          منشور — يظهر للطلاب
        </label>
        <p class="small">لا تنشره قبل أن تكتمل مصادره واختباره.</p>
      </div>
    </div>

    <div class="nav" style="margin-top:16px">
      <button class="btn primary" id="sv">${isNew ? 'إنشاء الدرس' : 'حفظ'}</button>
    </div>`;

  document.getElementById("bk").onclick = () => openCourse(course);
  document.getElementById("ti").focus();
  document.getElementById("sv").onclick = async () => {
    const v  = id => (document.getElementById(id)?.value || '').trim();
    const ti = v("ti");
    if(!ti){ toast("عنوان الدرس مطلوب"); return; }

    const { data, error } = await api.saveLesson({
      id:       lesson?.id ?? null,
      course:   course.id,
      title:    ti,
      unitId:   v("un") ? Number(v("un")) : null,
      summary:  v("su") || null,
      position: Number(v("po")) || 0,
      requires: v("rq") ? Number(v("rq")) : null,
      passMark: Number(v("pm")) || 65,
      published: document.getElementById("pu").checked
    });

    if(error){ toast(error.message); return; }
    if(!data.ok){ toast(data.error); return; }

    toast(isNew ? "أُنشئ الدرس" : "حُفظ");
    S.tree = null;                      // عدّاد الدروس تغيّر
    const t2 = await tree();
    openCourse(byId(t2.courses, course.id));
  };
  scrollTop();
}
