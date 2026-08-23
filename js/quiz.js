/* ══════════════════════════════════════════════════════════
   بيان — quiz.js
   الاختبار · العدّاد · التسليم · المراجعة التشخيصية

   🔒 التصحيح كله في submit_attempt داخل قاعدة البيانات.
      لا يصل المتصفح مفتاح إجابة واحد.

   🔓 b22 — الاختيار تبديلُ فئة لا إعادةَ رسم.
      كانت renderQ() تُستدعى عند كل اختيار في mcq، فتهدم <audio>
      (يعود التسجيل إلى صفر)، وتُعيد بناء النصّ المشترك، ثم تقفز
      بالطالب إلى أعلى الصفحة وزرُّ «التالي» في أسفلها.
      وأثرُه أبعد من الراحة: وقتُ التمرير يُحسب في a.sec، فيُقاس
      التردّدُ حركةً لا فهماً — وذاك أساس التشخيص كله.
   ══════════════════════════════════════════════════════════ */
import * as api from './api.js';
import { S } from './state.js';
import { app, bar, head, toast, esc, fmt, AR, mmss, media, pgMedia,
         optLabel, dirOf, ICONS, nav, scrollTop } from './ui.js';
import { loadList, loadLessons } from './student.js';

/* ذاكرةُ عرضٍ لا حالةُ محاولة: أيُّ نصٍّ مشترك كان معروضاً قبل هذا
   السؤال. تسكن الوحدة ولا تُرسَل في التسليم ولا يعرفها غيرها. */
let lastPg = null;

/* ═══════════ ① بدء الاختبار ═══════════ */

export async function startQuiz(meta){
  app.innerHTML = `<div class="status">جارٍ تحميل الأسئلة…</div>`;
  const { data, error } = await api.getQuiz(meta.id);
  if(error){ toast(error.message); loadList(); return; }

  S.quiz = data;
  S.passages = {};
  (data.passages||[]).forEach(pg => S.passages[pg.id] = pg);
  S.itemId = meta.item_id || null;
  S.i = 0;
  S.ans = data.questions.map(q=>({ q:q.id, kind:q.kind, o:null, os:[], essay:"", sec:0, chg:0 }));
  S.left = data.minutes*60; S.t0 = Date.now(); S.qenter = Date.now();
  lastPg = null;

  clearInterval(S.tick);
  S.tick = setInterval(()=>{
    S.left--; paintClock();
    if(S.left<=0){ clearInterval(S.tick); toast("انتهى الوقت — تسليم تلقائي"); finish(true); }
  }, 1000);

  renderQ();
}

function bankTime(){
  S.ans[S.i].sec += Math.round((Date.now()-S.qenter)/1000);
  S.qenter = Date.now();
}

function paintClock(){
  const c = document.getElementById("clock"); if(!c) return;
  c.textContent = mmss(Math.max(0,S.left));
  c.className = "clock" + (S.left<=60 ? " crit" : (S.left<=300 ? " warn" : ""));
  const f = document.getElementById("tf");
  if(f) f.style.width = Math.max(0,(S.left/(S.quiz.minutes*60))*100) + "%";
}

/* ═══════════ ② عرض السؤال ═══════════ */

function renderQ(){
  const qs = S.quiz.questions, q = qs[S.i], a = S.ans[S.i], n = qs.length;
  head(S.quiz.title, "أجب بتأنٍ — كل خيار خاطئ يمثل فخاً مقصوداً");
  bar.innerHTML = `<div class="timerbar">
    <span class="clock" id="clock">${mmss(S.left)}</span>
    <span class="track"><span class="trackfill" id="tf"></span></span>
    <span class="qcount">${AR(S.i+1)} / ${AR(n)}</span></div>`;
  paintClock();

  const multi = q.kind==='msq';
  const picked = o => multi ? a.os.includes(o.id) : a.o===o.id;

  const body = (q.kind==='mcq' || multi)
    ? `${multi?`<div class="q-hint">اختر كل ما ينطبق — وقد ينطبق أكثر من خيار</div>`:''}
       <div class="opts${multi?' multi':''}">${q.options.map((o,j)=>`
         <button class="opt ${picked(o)?'sel':''}" data-o="${o.id}"
                 dir="${dirOf(o.body)}" style="text-align:start">
           <span class="key">${esc(optLabel(o,j))}</span><span style="flex:1">${esc(o.body)}</span>
           ${multi?`<span class="tick">${picked(o)?'✔':''}</span>`:''}</button>`).join("")}</div>`
    : `<textarea id="ta" placeholder="اكتب السلسلة السببية كاملة…">${esc(a.essay)}</textarea>`;

  const pg = q.passage_id ? S.passages[q.passage_id] : null;
  const pgHtml = pg ? `
    <div class="card" style="padding:16px">
      ${pg.title?`<div class="psg-t" dir="auto">${esc(pg.title)}</div>`:''}
      ${pgMedia(pg)}
      ${pg.body?`<div class="psg" dir="auto">${fmt(pg.body)}</div>`:''}
    </div>` : '';

  app.innerHTML = `
    ${q.section?`<div class="q-sec" dir="auto">${esc(q.section)}</div>`:''}
    ${pgHtml}
    <div class="card" id="qcard">
      <div class="qnum">سؤال ${AR(S.i+1)} · ${
        q.kind==='mcq'?'اختيار من متعدد':multi?'اختيار متعدّد الإجابات':'مقالي قصير'}</div>
      ${media(q)}
      ${q.audio?`<audio controls src="${esc(q.audio)}" style="width:100%;margin-bottom:12px"></audio>`:''}
      <div class="qtext" dir="auto">${fmt(q.body)}</div>
      ${body}
    </div>
    <div class="nav">
      ${S.i>0?'<button class="btn ghost" id="prev">السابق</button>':''}
      <button class="btn primary" id="next" ${
        (q.kind==='mcq'&&a.o===null)||(multi&&a.os.length===0)?'disabled':''}>
        ${S.i===n-1?'إنهاء وتسليم':'التالي'}</button>
    </div>`;

  app.querySelectorAll(".opt").forEach(b=>b.onclick=()=>{
    const v = +b.dataset.o;
    if(multi){
      const j = a.os.indexOf(v);
      if(a.os.length) a.chg++;                 // تبديلٌ بعد أول اختيار = تغيير
      if(j>=0) a.os.splice(j,1); else a.os.push(v);
      const on = a.os.includes(v);
      b.classList.toggle('sel', on);
      const t = b.querySelector('.tick'); if(t) t.textContent = on ? '✔' : '';
      document.getElementById("next").disabled = a.os.length===0;
      return;                                  // بلا renderQ: الصفحة لا تقفز
    }
    /* mcq — الأثر نفسه: صِف الحالة النهائية ولا تُعِد بناء الشاشة.
       toggle بوسيطها الثاني تفرض الحالة ولا تقلبها، فيستحيل أن
       تبقى فئتا sel على زرّين. */
    if(a.o!==null && a.o!==v) a.chg++;
    a.o = v;
    app.querySelectorAll(".opt").forEach(x =>
      x.classList.toggle('sel', +x.dataset.o === v));
    document.getElementById("next").disabled = false;
  });
  const ta = document.getElementById("ta"); if(ta) ta.oninput = e => a.essay = e.target.value;
  const p  = document.getElementById("prev"); if(p) p.onclick = ()=>{ bankTime(); S.i--; renderQ(); };
  document.getElementById("next").onclick = ()=>{
    bankTime();
    if(S.i===n-1) finish(false); else { S.i++; renderQ(); }
  };

  /* الوجهة تتبع النصّ لا الصفحة:
     نصٌّ جديد (أو بلا نصّ) ⇒ الأعلى، ليُقرأ من أوّله.
     النصّ نفسه ⇒ بطاقة السؤال، فقد قرأه ولا يُطالَب بتخطّيه ثانيةً.
     والإزاحة تحت شريط العدّاد في CSS: #qcard{scroll-margin-top} */
  const pgKey = q.passage_id || null;
  if(pgKey && pgKey === lastPg)
    document.getElementById("qcard")?.scrollIntoView({ behavior:'smooth', block:'start' });
  else scrollTop();
  lastPg = pgKey;
}

/* ═══════════ ③ التسليم ═══════════ */

async function finish(auto){
  clearInterval(S.tick); bankTime();
  app.innerHTML = `<div class="status">جارٍ التصحيح…</div>`; bar.innerHTML = "";

  const payload = S.ans.map(a =>
      a.kind==='mcq' ? { q:a.q, o:a.o,   sec:a.sec, chg:a.chg }
    : a.kind==='msq' ? { q:a.q, os:a.os, sec:a.sec, chg:a.chg }
    :                  { q:a.q, essay:a.essay, sec:a.sec });

  const { data, error } = await api.submitAttempt(
    S.quiz.id, payload, Math.round((Date.now()-S.t0)/1000), auto);
  if(error){ app.innerHTML = `<div class="err"><b>تعذّر التسليم</b>${esc(error.message)}</div>`; return; }

  S.result = { ...data, auto, secs: Math.round((Date.now()-S.t0)/1000) };
  renderResult();
}

/* ═══════════ ④ النتيجة والتشخيص ═══════════ */

function verdict(p){
  if(p>=90) return "إتقان ممتاز — أنت جاهز للدرس التالي";
  if(p>=75) return "جيد جداً — راجع الفخاخ أدناه للإتقان التام";
  if(p>=50) return "تحتاج مراجعة مركّزة — ابدأ بالأسئلة الحمراء";
  return "أعد قراءة الدرس ثم أعد المحاولة";
}

function renderResult(){
  const r = S.result;
  nav('subjects');
  head("نتيجتك", S.quiz.title);

  /* الحرف يُشتقّ هنا أيضاً — فما يقرؤه الطالب في المراجعة
     هو ما رآه في السؤال بالضبط */
  const opt = id => {
    for(const q of S.quiz.questions){
      const j = (q.options||[]).findIndex(o => o.id === id);
      if(j >= 0) return { ...q.options[j], _l: optLabel(q.options[j], j) };
    }
    return null;
  };

  /* حكمٌ على كل خيار — لا على السؤال. فيرى الطالب حدّ المفهوم كاملاً:
     ما أدخله وليس منه، وما أخرجه وهو منه. */
  const jrows = x => (x.judgments||[]).map(j=>{
    const o = opt(j.o); if(!o) return '';
    const hit  = (j.key === j.picked);
    const cls  = hit ? (j.key ? 'hit' : 'dim') : 'err';
    const mark = j.key ? (j.picked ? '✔ صحيحة · اخترتَها' : '✗ صحيحة · أغفلتَها')
                       : (j.picked ? '✗ خاطئة · اخترتَها' : '✔ خاطئة · تجنّبتَها');
    return `<div class="jd ${cls}">
      <span class="key">${esc(o._l)}</span>
      <div style="flex:1">
        <span dir="${dirOf(o.body)}" style="display:block">${esc(o.body)}</span>
        <span class="jd-m">${mark}</span>
        ${!hit && j.dx_name ? `<span class="jd-dx">${esc(j.dx_name)}${
            j.remedy?' — '+esc(j.remedy):''}</span>` : ''}
      </div></div>`;
  }).join("");

  const countJ = (x, key, picked) =>
    (x.judgments||[]).filter(j => j.key===key && j.picked===picked).length;

  /* تشخيص الإغفال من النمط لا من وسمٍ يكتبه المؤلّف.
     ثلاث حالات تصف ما فعله الطالب — لا ما دار في ذهنه. */
  const patternOf = (wide, narr, keys) =>
      (wide && narr) ? { t:'الحدّ مضطرب من طرفيه',
        s:`أدخلتَ ${AR(wide)} مما ليس منه، وأغفلتَ ${AR(narr)} مما هو منه.` }
    : wide           ? { t:'توسيعٌ للمفهوم',
        s:`عرفتَ المجموعة كلها ثم زدتَ عليها ${AR(wide)}. اسأل عن كل خيار وحده: أينتمي حقاً؟` }
    : (narr >= keys) ? { t:'الحدّ لم يتّضح بعد',
        s:'لم تُصب من المجموعة شيئاً — أعد قراءة الشرح قبل الإعادة.' }
    :                  { t:'توقّفتَ قبل أن تُكمل',
        s:`لم تخطئ في حكمٍ واحد، لكنك تركتَ ${AR(narr)} من المجموعة. التعليمة تطلب كل ما ينطبق — فأكمل الخيارات كلها قبل أن تنتقل.` };

  const objective = r.review.filter(x=>x.kind!=='essay').map((x,i)=>{
    const c = opt(x.chosen), k = opt(x.correct);
    const msq = x.kind==='msq';
    const wide = msq ? countJ(x,false,true) : 0;                    // أدخل ما ليس منه
    const narr = msq ? countJ(x,true,false) : 0;                    // أخرج ما هو منه
    const keys = msq ? narr + countJ(x,true,true) : 0;              // حجم المجموعة
    const pat  = (msq && !x.is_correct) ? patternOf(wide, narr, keys) : null;

    const answer = msq
      ? `<div class="jds">${jrows(x)}</div>
         ${pat?`<div class="line"><b>${pat.t}</b> — ${pat.s}</div>`:''}`
      : `<div class="line" dir="auto">إجابتك: <b>${c?esc(c._l+') '+c.body):'— لم تُجب —'}</b></div>
         ${x.is_correct?'':`<div class="line" dir="auto">الصحيحة: <b>${
             k?esc(k._l+') '+k.body):'—'}</b></div>`}`;

    return `<div class="rev ${x.is_correct?'ok':'no'}">
      <span class="tag ${x.is_correct?'ok':'no'}">${x.is_correct?'صحيحة':'خاطئة'}</span>
      <div class="rev-q" dir="auto">${AR(i+1)}. ${esc(x.body)}</div>
      ${answer}
      ${x.is_correct?'':`
        <div class="trap"><strong>تشخيص الخطأ${
            !msq && x.dx_name?' — '+esc(x.dx_name):''}:</strong>
          ${esc(x.explanation||'').replace(/\n/g,"<br>")}
          ${!msq && x.remedy?`<div style="margin-top:8px;opacity:.9">🎯 ${esc(x.remedy)}</div>`:''}</div>
        ${x.remedial?`<div class="remedy"><strong>راجع قبل الإعادة</strong>
          <a href="${esc(x.remedial.url||'#')}" target="_blank" rel="noopener"
             style="color:var(--cyan)">${ICONS[x.remedial.kind]||'📎'} ${esc(x.remedial.title)}</a></div>`:''}`}
    </div>`;
  }).join("");

  const ess = r.review.filter(x=>x.kind==='essay').map(x=>`
    <div class="rev">
      <div class="rev-q" dir="auto">${esc(x.body)}</div>
      <div class="line" dir="auto">إجابتك: <b>${x.essay?esc(x.essay).replace(/\n/g,"<br>"):'— لم تُكتب —'}</b></div>
      <div class="model"><strong>الإجابة النموذجية — قارن بنفسك</strong>${esc(x.model||'').replace(/\n/g,"<br>")}</div>
    </div>`).join("");

  app.innerHTML = `
    <div class="crumb" id="back">← ${S.lesson ? esc(S.lesson.title) : 'قائمة المواد'}</div>
    ${r.auto?'<div class="err"><b>سُلّم تلقائياً</b>انتهى الوقت قبل إنهائك للاختبار.</div>':''}
    <div class="score-hero">
      <div class="score-num">${AR(r.score)} / ${AR(r.total)}</div>
      <div class="score-of">الأسئلة المصحَّحة آلياً · زمن الحل ${mmss(r.secs)}</div>
      <div class="verdict">${verdict(r.pct)}</div>
      ${r.lesson_done?'<div class="unlocked">🎉 أتممتَ هذا الدرس بنجاح</div>':''}
      ${(r.unlocked||[]).length?`<div class="unlocked">🔓 فُتح لك الآن: ${esc(r.unlocked.join(' · '))}</div>`:''}
    </div>
    <div class="nav"><button class="btn primary" id="again">إعادة الاختبار</button></div>
    <h2 class="sec">المراجعة التشخيصية</h2>${objective}
    <h2 class="sec">الأسئلة المقالية — بانتظار تصحيح معلمك</h2>${ess}`;

  document.getElementById("again").onclick = ()=>startQuiz({ id:S.quiz.id, item_id:S.itemId });
  document.getElementById("back").onclick  = ()=>{
    if(S.subj) loadLessons(S.subj); else loadList();
  };
  scrollTop();
}
