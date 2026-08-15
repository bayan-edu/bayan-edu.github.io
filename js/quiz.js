/* ══════════════════════════════════════════════════════════
   بيان — quiz.js
   الاختبار · العدّاد · التسليم · المراجعة التشخيصية

   🔒 التصحيح كله في submit_attempt داخل قاعدة البيانات.
      لا يصل المتصفح مفتاح إجابة واحد.
   ══════════════════════════════════════════════════════════ */
import * as api from './api.js';
import { S } from './state.js';
import { app, bar, head, toast, esc, fmt, AR, mmss, media, pgMedia, L, ICONS, nav, scrollTop } from './ui.js';
import { loadList, loadLessons } from './student.js';

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
  S.ans = data.questions.map(q=>({ q:q.id, kind:q.kind, o:null, essay:"", sec:0, chg:0 }));
  S.left = data.minutes*60; S.t0 = Date.now(); S.qenter = Date.now();

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

  const body = q.kind==='mcq'
    ? `<div class="opts">${q.options.map((o,j)=>`
         <button class="opt ${a.o===o.id?'sel':''}" data-o="${o.id}"
                 dir="${q.lang==='ar'?'rtl':'ltr'}" style="text-align:${q.lang==='ar'?'right':'left'}">
           <span class="key">${esc(o.label||L[j])}</span><span>${esc(o.body)}</span></button>`).join("")}</div>`
    : `<textarea id="ta" placeholder="اكتب السلسلة السببية كاملة…">${esc(a.essay)}</textarea>`;

  const pg = q.passage_id ? S.passages[q.passage_id] : null;
  const pgHtml = pg ? `
    <div class="card" style="padding:16px">
      ${pg.title?`<div class="psg-t">${esc(pg.title)}</div>`:''}
      ${pgMedia(pg)}
      ${pg.body?`<div class="psg" dir="${pg.lang==='ar'?'rtl':'ltr'}">${fmt(pg.body)}</div>`:''}
    </div>` : '';

  app.innerHTML = `
    ${q.section?`<div class="q-sec">${esc(q.section)}</div>`:''}
    ${pgHtml}
    <div class="card">
      <div class="qnum">سؤال ${AR(S.i+1)} · ${q.kind==='mcq'?'اختيار من متعدد':'مقالي قصير'}</div>
      ${media(q)}
      ${q.audio?`<audio controls src="${esc(q.audio)}" style="width:100%;margin-bottom:12px"></audio>`:''}
      <div class="qtext" dir="${q.lang==='ar'?'rtl':'ltr'}">${fmt(q.body)}</div>
      ${body}
    </div>
    <div class="nav">
      ${S.i>0?'<button class="btn ghost" id="prev">السابق</button>':''}
      <button class="btn primary" id="next" ${q.kind==='mcq'&&a.o===null?'disabled':''}>
        ${S.i===n-1?'إنهاء وتسليم':'التالي'}</button>
    </div>`;

  app.querySelectorAll(".opt").forEach(b=>b.onclick=()=>{
    const v = +b.dataset.o;
    if(a.o!==null && a.o!==v) a.chg++;
    a.o = v; renderQ();
  });
  const ta = document.getElementById("ta"); if(ta) ta.oninput = e => a.essay = e.target.value;
  const p  = document.getElementById("prev"); if(p) p.onclick = ()=>{ bankTime(); S.i--; renderQ(); };
  document.getElementById("next").onclick = ()=>{
    bankTime();
    if(S.i===n-1) finish(false); else { S.i++; renderQ(); }
  };
  scrollTop();
}

/* ═══════════ ③ التسليم ═══════════ */

async function finish(auto){
  clearInterval(S.tick); bankTime();
  app.innerHTML = `<div class="status">جارٍ التصحيح…</div>`; bar.innerHTML = "";

  const payload = S.ans.map(a => a.kind==='mcq'
    ? { q:a.q, o:a.o, sec:a.sec, chg:a.chg }
    : { q:a.q, essay:a.essay, sec:a.sec });

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

  const opt = id => {
    for(const q of S.quiz.questions) for(const o of (q.options||[])) if(o.id===id) return o;
    return null;
  };

  const mcq = r.review.filter(x=>x.kind==='mcq').map((x,i)=>{
    const c = opt(x.chosen), k = opt(x.correct);
    return `<div class="rev ${x.is_correct?'ok':'no'}">
      <span class="tag ${x.is_correct?'ok':'no'}">${x.is_correct?'صحيحة':'خاطئة'}</span>
      <div class="rev-q">${AR(i+1)}. ${esc(x.body)}</div>
      <div class="line">إجابتك: <b>${c?esc(c.label+') '+c.body):'— لم تُجب —'}</b></div>
      ${x.is_correct?'':`<div class="line">الصحيحة: <b>${k?esc(k.label+') '+k.body):'—'}</b></div>
        <div class="trap"><strong>تشخيص الخطأ${x.dx_name?' — '+esc(x.dx_name):''}:</strong>
          ${esc(x.explanation||'').replace(/\n/g,"<br>")}
          ${x.remedy?`<div style="margin-top:8px;opacity:.9">🎯 ${esc(x.remedy)}</div>`:''}</div>
        ${x.remedial?`<div class="remedy"><strong>راجع قبل الإعادة</strong>
          <a href="${esc(x.remedial.url||'#')}" target="_blank" rel="noopener"
             style="color:var(--cyan)">${ICONS[x.remedial.kind]||'📎'} ${esc(x.remedial.title)}</a></div>`:''}`}
    </div>`;
  }).join("");

  const ess = r.review.filter(x=>x.kind==='essay').map(x=>`
    <div class="rev">
      <div class="rev-q">${esc(x.body)}</div>
      <div class="line">إجابتك: <b>${x.essay?esc(x.essay).replace(/\n/g,"<br>"):'— لم تُكتب —'}</b></div>
      <div class="model"><strong>الإجابة النموذجية — قارن بنفسك</strong>${esc(x.model||'').replace(/\n/g,"<br>")}</div>
    </div>`).join("");

  app.innerHTML = `
    <div class="crumb" id="back">← ${S.lesson ? esc(S.lesson.title) : 'قائمة المواد'}</div>
    ${r.auto?'<div class="err"><b>سُلّم تلقائياً</b>انتهى الوقت قبل إنهائك للاختبار.</div>':''}
    <div class="score-hero">
      <div class="score-num">${AR(r.score)} / ${AR(r.total)}</div>
      <div class="score-of">أسئلة الاختيار من متعدد · زمن الحل ${mmss(r.secs)}</div>
      <div class="verdict">${verdict(r.pct)}</div>
      ${r.lesson_done?'<div class="unlocked">🎉 أتممتَ هذا الدرس بنجاح</div>':''}
      ${(r.unlocked||[]).length?`<div class="unlocked">🔓 فُتح لك الآن: ${esc(r.unlocked.join(' · '))}</div>`:''}
    </div>
    <div class="nav"><button class="btn primary" id="again">إعادة الاختبار</button></div>
    <h2 class="sec">المراجعة التشخيصية</h2>${mcq}
    <h2 class="sec">الأسئلة المقالية — بانتظار تصحيح معلمك</h2>${ess}`;

  document.getElementById("again").onclick = ()=>startQuiz({ id:S.quiz.id, item_id:S.itemId });
  document.getElementById("back").onclick  = ()=>{
    if(S.subj) loadLessons(S.subj); else loadList();
  };
  scrollTop();
}
