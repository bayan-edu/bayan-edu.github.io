/* ═══════════════════════════════════════════════════════════════════
   استيراد اختبار إلى درس — فمُ العقد الواحد (147 · 148)

   🔑 **لا تحقُّقَ هنا.** العقدُ كلُّه في `import_quiz` بالقاعدة: الدرسُ
   يُعرف بمفتاح مؤلّفه، والهدفُ بكوده، وكلُّ مشتّتٍ خاطئ بكود تشخيصه،
   والدفعةُ تمرّ كلُّها أو لا يبقى منها شيء. وهذه الشاشةُ تُلصق وتعرض
   وتعتمد — **ولا تعرف من القانون حرفاً.**

   وذاك مقصود: صندوقُ الاستيراد القديم (داخل الاختبار) حمل نسخةً من
   الحراسة في `parseImport`، فسقط منها ثلاثَ مرّاتٍ حقلٌ صامتاً
   (`objective` ثمّ `matching` ثمّ `cloze`). **ونسختان من مسطرةٍ واحدة
   تفترقان.**

   🧪 **والجافّةُ هي الشاشة لا زينتُها:** تُجري المسارَ كلَّه بحرّاسه
   الأحياء ثمّ تُنقضه، فما قالت «يمرّ» مرّ عند الاعتماد. ولا يُكتب حرفٌ
   قبل أن تُقرأ الخطّة.

   📐 **وحدُّه: يُنشئ ولا يُعدّل.** للدرس اختبارٌ قائم ⇒ تُردّ الدفعة
   ناطقةً. والملفُّ نفسُه يُعاد فيُقال «لا جديد» بلا كتابة.

   ⚠️ وهذا الصندوق **لا يُغني عن القديم**: ذاك يُضيف أسئلةً إلى اختبارٍ
   قائم، وهذا يُنشئ الاختبارَ وبندَه من الصفر.
   ═══════════════════════════════════════════════════════════════════ */

import * as api from './api.js';
import { app, head, toast, esc, AR, errBox, nav, setWide, scrollTop, N } from './ui.js';
import { openCourse } from './editor.js';

const MAX = 2 * 1024 * 1024;          // حدُّ الملفّ — كما في صندوق الاختبار

/* نموذجٌ يُلصق فيُفهم الشكل بلا قراءة وثيقة */
const SAMPLE = JSON.stringify({
  lesson_key: "U1L2.DISC",
  quiz: { title: "اختبار: عنوان الدرس", minutes: 20, pass_mark: 60 },
  passages: [{ ref: "p1", title: "نصّ للقراءة", body: "متن النصّ…", lang: "ar" }],
  questions: [{
    objective: "QD.DISCVAL", variant: "B1", section: "القسم الأول",
    kind: "mcq", difficulty: "easy", passage: "p1",
    body: "نصّ السؤال…", explanation: "شرح الخطأ — يقرؤه الطالب بعد محاولته.",
    options: [{ body: "الصواب", correct: true },
              { body: "مشتّت", dx: "SGN" }]
  }]
}, null, 2);

/* ── عرضُ الخطّة كما تردُّها الدالّة — بلا إعادة حساب ──
   🔑 كلُّ رقمٍ هنا من القاعدة، فلا ينحرف عن الذي سيُكتب. */
function planBox(pl){
  if(!pl) return '';
  const chip = (k, v) => `<span class="chip">${esc(k)} ${esc(String(v))}</span>`;
  const bag  = o => Object.entries(o || {}).map(([k, v]) =>
    `<span class="chip">${esc(k)} <b>${AR(v)}</b></span>`).join(' ');
  const q = pl['الاختبار'] || {}, l = pl['الدرس'] || {};
  const vars = pl['خاناتٌ ستُقرن'] || {};
  return `
    <div class="line" style="margin-bottom:8px"><b>${esc(l['العنوان'] || '—')}</b></div>
    <div class="ed-m" style="margin-bottom:10px">
      ${chip('الكود', q['الكود'] || '—')}
      ${chip('الزمن', AR(q['الزمن'] ?? 0) + ' دقيقة')}
      ${chip('عتبة النجاح', AR(q['عتبة النجاح'] ?? 0) + '٪')}
      <span class="chip${q['منسوبٌ إلى بيان'] ? ' g' : ''}">${
        q['منسوبٌ إلى بيان'] ? 'معتمد في المنهج' : 'تدريب إضافي'}</span>
    </div>
    <div class="line" style="margin-bottom:8px">${
      N(pl['أسئلة'] || 0, 'سؤال', 'سؤالان', 'أسئلة', 'سؤالاً')}${
      pl['نصوصٌ مشتركة'] ? ' · ' + N(pl['نصوصٌ مشتركة'],
        'نصّ مشترك', 'نصّان مشتركان', 'نصوص مشتركة', 'نصّاً مشتركاً') : ''}${
      Object.keys(vars).length ? ' · ' + N(Object.keys(vars).length,
        'خانة تُقرن', 'خانتان تُقرنان', 'خانات تُقرن', 'خانة تُقرن') : ''}</div>
    <div class="ed-m" style="margin-bottom:6px">${bag(pl['بأنماطها'])}</div>
    <div class="ed-m" style="margin-bottom:6px">${bag(pl['بأهدافها'])}</div>
    <div class="ed-m">${bag(pl['بأقسامها'])}</div>`;
}

export async function openQuizImport(course){
  nav('editor'); setWide(true);
  head('استيراد اختبار', 'ملفّ واحد لدرس واحد');

  let parsed = null;                 // الحمولةُ بعد التحليل المحليّ
  let plan   = null;                 // خطّةُ الجافّة كما ردّتها القاعدة

  const draw = () => {
    app.innerHTML = `
      <div class="crumb" id="bk">← دروس المقرّر</div>
      <div class="card">
        <div class="qnum">⇪ استيراد اختبار إلى درس</div>
        <div class="line" style="margin-bottom:12px">
          يُلصق ملفّ الاختبار كما سُلّم. والدرس يُعرف بمفتاح مؤلّفه
          (<code dir="ltr">lesson_key</code>) لا برقمه، والهدف بكوده،
          وكلّ مشتّت خاطئ بكود تشخيصه.<br>
          وتُجرى <b>تجربة جافّة</b> أوّلاً: تمرّ بالحرّاس كلّهم ثمّ تُنقَض،
          فلا يُكتب شيء قبل أن تُقرأ الخطّة.<br>
          ويُنشئ الاختبار وبنده في الدرس. ولإضافة أسئلة إلى اختبار قائم
          فبابها شاشة الاختبار نفسها.</div>

        <div class="drop" id="dz">
          <div class="drop-i">⇪</div>
          <div>بسحب ملف JSON هنا · أو <span class="drop-a" id="pick">باختيار ملفّ</span>
            · أو بلصقه أدناه</div>
          <div class="drop-s">الملف يُقرأ في متصفحك — ولا يُرفع إلى أيّ خادم
            · حتى ٢ ميجابايت</div>
          <input type="file" id="file" accept=".json,.txt,application/json" hidden>
        </div>
        <textarea id="js" class="eq-wide" dir="ltr"
          style="min-height:220px;font-family:monospace;font-size:.78rem"
          placeholder='{ "lesson_key": "U1L2.DISC", "quiz": { … }, "questions": [ … ] }'
          >${esc(parsed ? JSON.stringify(parsed, null, 2) : '')}</textarea>
        <div class="nav" style="margin-top:12px">
          <button class="btn primary" id="dry">تجربة جافّة</button>
          <button class="btn ghost" id="sm">قالب مثال</button>
          <button class="btn ghost" id="x">إلغاء</button>
        </div>
        <div id="out"></div>
      </div>`;

    document.getElementById("bk").onclick = () => openCourse(course);
    document.getElementById("x").onclick  = () => openCourse(course);
    document.getElementById("sm").onclick = () => {
      document.getElementById("js").value = SAMPLE; };

    const ta  = document.getElementById("js");
    const pk  = document.getElementById("file");
    const dz  = document.getElementById("dz");
    document.getElementById("pick").onclick = () => pk.click();

    const readFile = f => {
      if(!f) return;
      if(f.size > MAX){ toast('الملفّ أكبر من ٢ ميجابايت'); return; }
      const r = new FileReader();
      r.onload = () => { ta.value = String(r.result || ''); };
      r.readAsText(f);
    };
    pk.onchange = e => readFile(e.target.files?.[0]);
    ['dragenter','dragover'].forEach(ev => dz.addEventListener(ev, e => {
      e.preventDefault(); dz.classList.add('on'); }));
    ['dragleave','drop'].forEach(ev => dz.addEventListener(ev, e => {
      e.preventDefault(); dz.classList.remove('on'); }));
    dz.addEventListener('drop', e => readFile(e.dataTransfer?.files?.[0]));

    document.getElementById("dry").onclick = () => run(ta.value || '', true);
  };

  /* ── الجافّة والاعتماد: نداءٌ واحد بفارقٍ واحد ──
     🔑 وعلى مسارٍ واحد: ما يُفحص هو ما يُعتمد. */
  async function run(txt, dry){
    const out = document.getElementById("out");
    out.innerHTML = `<div class="status" style="margin-top:14px">${
      dry ? 'جار الفحص…' : 'جار الاعتماد…'}</div>`;

    if(dry){
      try { parsed = JSON.parse(txt); }
      catch(e){
        out.innerHTML = `<div class="eq-ready" style="margin-top:14px">
          <div class="eq-iss">⚠️ الملفّ ليس JSON صالحاً — ${esc(e.message)}</div></div>`;
        return;
      }
    }

    const { data, error } = await api.importQuiz(course.id, parsed, dry);
    if(error){ out.innerHTML = errBox(error, 'الاستيراد'); return; }

    plan = data?.['الخطّة'] || null;
    const warns = data?.['تحذيرات'] || [];
    const errs  = data?.['أخطاء']   || [];

    /* ملفٌّ استُورد بعينه ⇒ لا كتابةَ ولا شكوى */
    if(data?.['لا جديد']){
      out.innerHTML = `<div class="eq-ready ok" style="margin-top:14px">
        <div class="eq-ok">لا جديد — هذه الدفعة بعينها مستوردة من قبل</div>
        <div class="line">الاختبار <b dir="ltr">${esc(data.quiz_code || '')}</b> ·
          ${N(data.questions || 0, 'سؤال', 'سؤالان', 'أسئلة', 'سؤالاً')}</div></div>
        <div class="nav" style="margin-top:12px">
          <button class="btn ghost" id="bk2">← دروس المقرّر</button></div>`;
      document.getElementById("bk2").onclick = () => openCourse(course);
      return;
    }

    if(!data?.ok){
      out.innerHTML = `
        <div class="eq-ready" style="margin-top:14px">
          ${errs.length ? errs.slice(0, 20).map(x =>
              `<div class="eq-iss">⚠️ ${esc(x)}</div>`).join('')
            : `<div class="eq-iss">⚠️ ${esc(data?.error || data?.['السبب']
                || 'تعثّر بلا سبب معلوم')}</div>`}
          ${errs.length > 20 ? `<div class="eq-iss">… و${
            AR(errs.length - 20)} غيرها</div>` : ''}
          ${data?.['توقّف عند'] ? `<div class="line" style="margin-top:8px">
            توقّف عند: ${esc(data['توقّف عند'])} — ولم يبق من الدفعة شيء</div>` : ''}
        </div>
        ${plan ? `<div class="eq-ready" style="margin-top:10px">${planBox(plan)}</div>` : ''}`;
      return;
    }

    /* ── مرّت ── */
    if(!dry){
      toast(`اعتُمد ${N(data.questions || 0, 'سؤال', 'سؤالان', 'أسئلة', 'سؤالاً')}`);
      out.innerHTML = `
        <div class="eq-ready ok" style="margin-top:14px">
          <div class="eq-ok">اعتُمد — والاختبار غير منشور، فلا يراه الطالب بعد</div>
          ${planBox(plan)}
        </div>
        ${warns.length ? `<div class="warnbox" style="margin-top:10px">
          ${warns.map(x => `<div>⚠️ ${esc(x)}</div>`).join('')}</div>` : ''}
        <div class="nav" style="margin-top:12px">
          <button class="btn primary" id="bk3">← دروس المقرّر</button></div>`;
      document.getElementById("bk3").onclick = () => openCourse(course);
      return;
    }

    out.innerHTML = `
      <div class="eq-ready ok" style="margin-top:14px">
        <div class="eq-ok">الجافّة مرّت — ولم يُكتب شيء</div>
        ${planBox(plan)}
      </div>
      ${warns.length ? `<div class="warnbox" style="margin-top:10px">
        ${warns.map(x => `<div>⚠️ ${esc(x)}</div>`).join('')}
        <div style="margin-top:7px;opacity:.85">تحذير يُرى ولا يمنع — والاعتماد ممكن.</div>
        </div>` : ''}
      <div class="nav" style="margin-top:12px">
        <button class="btn primary" id="go">اعتماد ${
          N(plan?.['أسئلة'] || 0, 'سؤال', 'سؤالين', 'أسئلة', 'سؤالاً')}</button>
        <button class="btn ghost" id="again">ملفّ آخر</button>
      </div>`;
    document.getElementById("go").onclick    = () => run('', false);
    document.getElementById("again").onclick = () => { parsed = null; plan = null; draw(); };
  }

  draw();
  scrollTop();
}
