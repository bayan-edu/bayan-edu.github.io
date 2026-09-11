/* ══════════════════════════════════════════════════════════
   بيان — analytics.js
   تحليل الأداء: قائمة الطلاب · بطاقة الطالب · اللوحة

   📐 يقرأ ثلاث دوالّ (85 · 86 · 87) عبر api.js وحدها.

   🔒 لا شرطَ صلاحيةٍ في هذه الوحدة — ولا يُضاف.
      الدوالّ الثلاث `security invoker`، وRLS هي التي تفصل:
        المعلّم ⇒ طلابه · المدير ⇒ الجميع · الطالب ⇒ نفسه.
      ⚠️ وتصفيةٌ تُكتب هنا ستبدو أماناً وليست به.

   🎓 ترتيب الشاشة قرارٌ تربويّ لا ذوق:
      · الأضعف أوّلاً في كل قائمة — الترتيبُ نفسه توجيه.
      · أثرُ الإعادة متنٌ لا حاشية — هو الرقم الوحيد الذي
        يصف التعليمَ لا الطالب.
      · الحلقةُ كبيرةٌ في اللوحة (الرقمُ هو موضوع الشاشة)،
        وصغيرةٌ في بطاقة الطالب (الرقمُ سياقٌ وأثرُ الإعادة متن).

   ⚠️ الفاصل «،» لا «·» — عمداً وفي كلّ سطر.
      الصفر العربيّ «٠» نقطةٌ مرفوعة، والفاصل «·» نقطةٌ مرفوعة.
      فـ«٩ · محاولة» تُقرأ «٩٠ محاولة». حرفان بشكلٍ واحد،
      والخطأ صامتٌ لأن النصّ سليمٌ في المصدر ومقلوبٌ في العين.

   ⚠️ الألوان حكمٌ على العمل لا على الطالب. تُعرض للمعلّم؛
      وحين تُبنى شاشةُ الطالب تُراجَع قبل نقلها إليها.

   ⚠️ ولا يُعرض مفتاحُ قاعدةٍ للإنسان أبداً. «اختبار ٢٣» لغةُ
      جدولٍ لا لغةُ معلّم: تقول أين الصفّ ولا تقول في ماذا تحسّن
      الطالب. العنوان يأتي من 88، والرقم يبقى للتشخيص لا للعرض.
   ══════════════════════════════════════════════════════════ */
import * as api from './api.js';
import { app, head, esc, AR, errBox, nav, BUILD, scrollTop } from './ui.js';

/* حالةٌ محلّية — لا تسكن S لأنها مشتقّة من الشاشة لا من الجلسة */
const F = { level:null, subject:null, view:'list', search:'', opts:null };

/* ═══════════ أدوات العرض ═══════════ */

const pct = v => v==null ? '—' : AR(v)+'٪';

/* حدود اللون في موضعٍ واحد — تُراجَع مرّةً لا في عشرة أماكن */
function band(m){ return m==null ? 'na' : m<60 ? 'low' : m<80 ? 'mid' : 'high'; }

/* ── الحلقة ──
   SVG خالصٌ بلا مكتبة. والنصُّ خارجها لا داخلها، لأن الحلقة تُعكس
   أفقياً لتسير من الأعلى **يساراً** — اتجاه التقدّم في صفحةٍ عربية —
   والنصُّ لو كان داخلها لانعكس معها. */
function gauge(m, thin, sub, small){
  const R = 52, C = 2 * Math.PI * R;
  const v = Math.max(0, Math.min(100, Number(m) || 0));
  const on = (v / 100) * C;
  return `<div class="an-gauge${small?' sm':''}">
    <svg viewBox="0 0 120 120" aria-hidden="true">
      <circle class="an-gbg" cx="60" cy="60" r="${R}"/>
      <circle class="an-gfg ${band(m)}${thin?' thin':''}" cx="60" cy="60" r="${R}"
              stroke-dasharray="${on.toFixed(1)} ${(C-on).toFixed(1)}"
              transform="rotate(-90 60 60)"/>
    </svg>
    <div class="an-gt">
      <div class="an-gn ${band(m)}">${pct(m)}</div>
      ${sub ? `<div class="an-gs">${esc(sub)}</div>` : ''}
    </div>
  </div>`;
}

function bar(m, thin){
  const w = Math.max(0, Math.min(100, Number(m)||0));
  return `<div class="an-track"><div class="an-fill ${band(m)}${thin?' thin':''}"
            style="width:${w}%"></div></div>`;
}

/* عيّنةٌ صغيرة: تُعلَن ولا تُخفى — والقيمة تبقى ظاهرة */
const thinTag = t => t ? `<span class="an-thin">عيّنة صغيرة</span>` : '';

const empty = t => `<div class="status">${esc(t)}</div>`;


/* ═══════════ ① القائمة واللوحة ═══════════ */

export async function loadStudents(){
  nav('students');
  head("تحليل الأداء", "الأضعف أوّلاً — الترتيب توجيه");
  app.innerHTML = `<div class="status">جارٍ التحميل…</div>`;

  /* الفلاتر تُبنى من الموجود لا من الجداول: استدعاءٌ واحد بلا فلتر
     يُعيد by_subject وby_level، فلا يظهر خيارٌ بلا بيانات خلفه. */
  if(!F.opts){
    const { data, error } = await api.cohortPerformance(null, null);
    if(error){ app.innerHTML = errBox(error,'لوحة الأداء'); return; }
    F.opts = {
      subjects: (data?.by_subject||[]).map(x=>[x.subject_id, x.name]),
      levels:   (data?.by_level  ||[]).map(x=>[x.level_id,   x.name])
    };
  }

  const sel = (id, cur, list, all) => `
    <select id="${id}" class="an-sel">
      <option value="">${esc(all)}</option>
      ${list.map(([v,n])=>`<option value="${v}" ${String(cur)===String(v)?'selected':''}>${esc(n)}</option>`).join("")}
    </select>`;

  app.innerHTML = `
    <div class="an-bar">
      ${sel('flLevel',   F.level,   F.opts.levels,   'كل الصفوف')}
      ${sel('flSubject', F.subject, F.opts.subjects, 'كل المواد')}
      <input id="flSearch" class="an-sel" type="search" placeholder="بحث بالاسم"
             value="${esc(F.search)}">
    </div>
    <div class="an-tabs">
      <button class="an-tab ${F.view==='list' ?'on':''}" data-v="list">القائمة</button>
      <button class="an-tab ${F.view==='board'?'on':''}" data-v="board">اللوحة</button>
    </div>
    <div id="anBody"><div class="status">جارٍ التحميل…</div></div>
    <p class="hint">نسخة الواجهة ${BUILD}</p>`;

  const num = v => v==='' ? null : Number(v);
  document.getElementById('flLevel').onchange   = e => { F.level   = num(e.target.value); F.opts=null; loadStudents(); };
  document.getElementById('flSubject').onchange = e => { F.subject = num(e.target.value); render(); };
  document.getElementById('flSearch').oninput   = e => { F.search  = e.target.value; if(F.view==='list') render(); };
  app.querySelectorAll('.an-tab').forEach(b => b.onclick = () => {
    F.view = b.dataset.v;
    app.querySelectorAll('.an-tab').forEach(x=>x.classList.toggle('on', x===b));
    render();
  });

  render();
  scrollTop();
}

async function render(){
  const box = document.getElementById('anBody');
  if(!box) return;
  box.innerHTML = `<div class="status">جارٍ التحميل…</div>`;
  if(F.view === 'list') await renderList(box);
  else                  await renderBoard(box);
}


/* ── القائمة ── */

async function renderList(box){
  const { data, error } = await api.studentsOverview(F.level, F.subject, F.search);
  if(error){ box.innerHTML = errBox(error,'قائمة الطلاب'); return; }
  const rows = data || [];

  if(!rows.length){
    /* تمييزٌ مقصود: لا نقول «لا يوجد طلاب» — قد يكون الحاجز صلاحيةً
       أو فلتراً أو غياب محاولات، والثلاثة تُعالَج بثلاثة أشياء. */
    box.innerHTML = empty(F.search ? "لا اسم يطابق البحث"
                                   : "لا محاولات بعد ضمن هذا الفلتر");
    return;
  }

  box.innerHTML = rows.map(r => `
    <div class="an-row" data-u="${esc(r.user_id)}">
      <div class="an-h">
        <span class="qz-t">${esc(r.name||'طالب')}</span>
        <span class="an-n ${band(r.mastery)}">${pct(r.mastery)}</span>
      </div>
      ${bar(r.mastery, r.thin)}
      <div class="qz-m">
        ${r.level?esc(r.level)+'، ':''}${AR(r.subjects)} مادة، ${AR(r.attempts)} محاولة${
          r.days_silent!=null && r.days_silent>0 ? `، بلا نشاط ${AR(r.days_silent)} يوماً` : ''}
      </div>
      ${r.dx_top ? `<div class="an-dx">أكثر أخطائه: ${esc(r.dx_top.name||r.dx_top.code)}
                     <span class="an-c">${AR(r.dx_top.n)}</span></div>` : ''}
      ${thinTag(r.thin)}
    </div>`).join("");

  box.querySelectorAll('.an-row').forEach(el =>
    el.onclick = () => openStudentCard(el.dataset.u));
}


/* ── اللوحة ── */

async function renderBoard(box){
  const { data, error } = await api.cohortPerformance(F.level, F.subject);
  if(error){ box.innerHTML = errBox(error,'لوحة الأداء'); return; }
  const d = data || {};
  const o = d.overall || {};

  if(!o.students){ box.innerHTML = empty("لا محاولات بعد ضمن هذا الفلتر"); return; }

  const subjName = {};
  (d.by_subject||[]).forEach(x => subjName[x.subject_id] = x.name);

  const line = (name, x) => `
    <div class="an-row static">
      <div class="an-h">
        <span class="qz-t">${esc(name)}</span>
        <span class="an-n ${band(x.mastery)}">${pct(x.mastery)}</span>
      </div>
      ${bar(x.mastery, x.thin)}
      <div class="qz-m">${AR(x.students)} طالباً، ${AR(x.attempts)} محاولة</div>
      ${thinTag(x.thin)}
    </div>`;

  const group = (title, arr, nameOf) => !arr?.length ? '' : `
    <h2 class="sec">${esc(title)}</h2>
    ${arr.map(x => line(nameOf(x), x)).join("")}`;

  box.innerHTML = `
    <div class="card an-sum">
      ${gauge(o.mastery, o.thin, 'إتقان')}
      <div class="qz-m an-cen">${AR(o.students)} طالباً، ${AR(o.attempts)} محاولة</div>
      ${o.thin ? `<div class="warnbox">العيّنة أصغر من أن يُبنى عليها حكم.
         الرقم صحيحُ الحساب، والخريطةُ هنا تكشف <b>أين ينقصنا المحتوى</b>
         أكثر مما تقيس أداءً.</div>` : ''}
    </div>
    ${group('المواد',  d.by_subject, x => x.name)}
    ${group('الصفوف',  d.by_level,   x => x.name)}
    ${(() => {
      /* غير المصنَّف يكرّر by_subject حرفاً بحرف ⇒ يُستبعد.
         ويُقال سببُه: الفراغ يُرى، والصمتُ لا يُرى. */
      const tagged = (d.by_strand||[]).filter(x => x.strand_id != null);
      if(tagged.length) return group('الفروع', tagged, x =>
        (subjName[x.subject_id] ? subjName[x.subject_id]+' — ' : '') + x.name);
      return `<h2 class="sec">الفروع</h2>
        <div class="status">لم تُصنَّف الدروس بفروع بعد — التصنيف يفتح هذا التقسيم.</div>`;
    })()}`;
}


/* ═══════════ ② بطاقة الطالب ═══════════ */

export async function openStudentCard(uid){
  app.innerHTML = `<div class="status">جارٍ الفتح…</div>`;
  const { data, error } = await api.studentPerformance(uid || null);

  if(error){
    app.innerHTML = `<div class="crumb" id="bk">← تحليل الأداء</div>${errBox(error,'بطاقة الطالب')}`;
    document.getElementById('bk').onclick = loadStudents; return;
  }

  const d = data || {}, st = d.student, o = d.overall || {};
  head("بطاقة الطالب", st?.name || '');

  if(!st){
    app.innerHTML = `<div class="crumb" id="bk">← تحليل الأداء</div>
      ${empty("لا بيانات لهذا الطالب — أو ليس ضمن طلابك")}`;
    document.getElementById('bk').onclick = loadStudents; return;
  }

  const g = d.growth || [];

  /* 🎓 فرعٌ واحد غير مصنَّف يكرّر رقمَ المادة حرفاً بحرف.
     وتقسيمٌ لا يقسّم شيئاً ضجيجٌ يُعلّم القارئَ تجاهلَ التفاصيل. */
  const strandsHtml = ss => {
    if(!ss?.length) return '';
    if(ss.length === 1 && ss[0].strand_id == null) return '';
    return `
    <div class="an-strands"><div class="an-srh">الفروع داخل المادة</div>
    ${ss.map(x => `
      <div class="an-sr">
        <div class="an-h">
          <span>${esc(x.name)}</span>
          <span class="an-n ${band(x.mastery)}">${pct(x.mastery)}</span>
        </div>
        ${bar(x.mastery, x.thin)}
        <div class="qz-m">${AR(x.quizzes)} اختباراً، ${AR(x.answered)} إجابة ${thinTag(x.thin)}</div>
      </div>`).join("")}</div>`;
  };

  /* 🎓 الحلقة صغيرةٌ هنا عمداً: في البطاقة الرقمُ سياقٌ وأثرُ
     الإعادة متن. وفي اللوحة ينعكس الأمر فتكبر. */
  app.innerHTML = `
    <div class="crumb" id="bk">← تحليل الأداء</div>

    <div class="card an-sum an-side">
      ${gauge(o.mastery, false, 'إتقان', true)}
      <div>
        <div class="qz-t">${esc(st.name||'')}</div>
        <div class="qz-m">${st.level?esc(st.level)+'، ':''}${AR(o.subjects||0)} مادة،
          ${AR(o.answered||0)} إجابة</div>
      </div>
    </div>

    ${g.length ? `
      <h2 class="sec">أثر الإعادة</h2>
      <div class="warnbox">هذا وحده يقيس <b>ما فعله التعليم</b> لا ما يعرفه الطالب:
        الفرق بين محاولته الأولى وأحدثها بعد العلاج.</div>
      ${g.map(x => `
        <div class="an-row static">
          <div class="an-h">
            <span class="qz-t">${esc(x.title || ('اختبار '+x.quiz_id))}</span>
            <span class="an-n ${x.gain>0?'high':x.gain<0?'low':'mid'}">
              ${x.gain>0?'▲':x.gain<0?'▼':'='} ${AR(Math.abs(x.gain))}</span>
          </div>
          <div class="qz-m">${x.lesson?esc(x.lesson)+'، ':''}${AR(x.attempts)} محاولات،
            من ${pct(x.first)} إلى ${pct(x.last)}</div>
        </div>`).join("")}` : ''}

    <h2 class="sec">المواد — الأضعف أوّلاً</h2>
    ${(d.subjects||[]).length ? (d.subjects||[]).map(s => `
      <div class="an-row static">
        <div class="an-h">
          <span class="qz-t">${esc(s.name)}</span>
          <span class="an-n ${band(s.mastery)}">${pct(s.mastery)}</span>
        </div>
        ${bar(s.mastery, s.thin)}
        <div class="qz-m">${AR(s.quizzes)} اختباراً، ${AR(s.answered)} إجابة ${thinTag(s.thin)}</div>
        ${strandsHtml(s.strands)}
      </div>`).join("") : empty("لا محاولات مصحَّحة بعد")}

    <p class="hint">الإتقان = إجاباتٌ صحيحة ÷ إجابات مُصحَّحة، من أحدث محاولةٍ
      لكلّ اختبار · نسخة الواجهة ${BUILD}</p>`;

  document.getElementById('bk').onclick = loadStudents;
  scrollTop();
}
