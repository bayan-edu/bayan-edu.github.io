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

  const scales = t.scales || [];
  if(!scales.length || !(t.courses || []).length){
    app.innerHTML = `<div class="card" style="text-align:center;padding:30px">
      <div style="font-size:2rem;margin-bottom:10px">🗂️</div>
      <div class="rev-q">لا مقرّرات متاحة لك للتأليف</div>
      <div class="line">صلاحية التأليف تُمنح من المدير.</div></div>`;
    return;
  }

  const sc = scaleId ? byId(scales, scaleId) : scales[0];
  const levels = (t.levels || []).filter(l => l.scale_id === sc.id)
                                 .sort((a,b) => a.rank - b.rank);
  const lv = levelId ? byId(levels, levelId) : (levels[0] || null);

  const courses = (t.courses || []).filter(c =>
    lv ? c.level_id === lv.id : c.level_id === null);

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
      <label class="fl" style="margin:0">الصف</label>
      <select id="lv">${levels.map(x =>
        `<option value="${x.id}" ${lv && x.id===lv.id?'selected':''}>${esc(x.name)}</option>`).join("")}
      </select>
    </div>
    <div class="ed-grid">${courses.map(card).join("")}</div>
    ${!courses.length ? '<div class="status">لا مقرّرات في هذا الصف</div>' : ''}`;

  document.getElementById("sc").onchange = e => openEditor(e.target.value, null);
  document.getElementById("lv").onchange = e => openEditor(sc.id, e.target.value);
  app.querySelectorAll(".ed-card").forEach(el =>
    el.onclick = () => openCourse(byId(t.courses, el.dataset.c)));
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

  document.getElementById("bk").onclick = () => openEditor(null, course.level_id);
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
