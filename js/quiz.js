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

   ⏱️ b23 — الوقت يُحسب من المعروض، ولا يُقرأ من عمود.
      كان العدّاد يشتقّ n من qs.length والمؤقّت يقرأ quizzes.minutes.
      نجا العدُّ ولم ينجُ الزمن: البنك ينتقي نسخةً من كل خانة فيتغيّر
      عددُ المعروض من محاولةٍ إلى أخرى، والعمودُ رقمٌ ثابت لا يعلم.
      ⇒ اختبارٌ أُلِّف بأربعةٍ وخمسين سؤالاً ويُقدَّم منه ثمانية عشر
        كان يأخذ ميزانية الأربعة والخمسين.

   📄 b24 — الصفحةُ تتبع الحاويةَ لا العدّ.
      أسئلة النصّ (أو المقطع) الواحد تُعرض معاً في صفحة واحدة:
      ① فلا يُهدَم <audio> بين الأسئلة — علّةُ b22 تُحذَف لا تُرقَّع
      ② والرجوع من س٥ إلى س١ حركةُ عينٍ لا رحلةُ تنقّل
      ③ ويرى الطالب الأسئلة قبل التشغيل، فيستمع بغرض

      🔗 وتصدُق به فرضيّةُ b23: COST.pg تحسب النصَّ مرّةً «مهما كثرت
         أسئلته»، وكان الشكلُ القديم يكذّبها — يُعاد بناء النصّ مع كل
         سؤال فيُقرأ خمساً وقد رُصدت له واحدة. والصفحةُ تجعلها صادقةً
         بالبناء. ⚠️ إلا أن يتشابك نصّان في position، فيظهر النصّ
         بطاقتين ويُدفع مرّتين ويُرصد مرّة.

      🔴 والفراغ صار مسموحاً بتحذير. لأن الإجابة المُجبَرة تخمينٌ
         مُكرَه، والتخمين يقع في مشتّتٍ فيُسجَّل له dx_code كاذب،
         فيُرسَل الطالب إلى علاجٍ لا يخصّه. الفراغ يُفقدنا بياناً،
         والكودُ الكاذب يُفقدنا الطالب.

      ⚠️ دَينٌ موثَّق — كلفةُ قراءة النصّ ما تزال داخل a.sec.
         الفترة السابقة لأول لمسةٍ في الصفحة تُنسَب إلى أول سؤالٍ
         يُلمَس، كما كانت تُنسَب أمسِ إلى أول سؤالٍ يُعرَض. والفصل
         (زمنُ الصفحة / زمنُ السؤال) يمسّ submit_attempt ⇒ خطوةٌ
         مستقلّة. ولاحظ أنه سيصير حينئذٍ **قياساً لما تقدّره COST.pg
         حَدْساً** — أوّلُ بيّنةٍ على أرقام الميزانية.
   ══════════════════════════════════════════════════════════ */
import * as api from './api.js';
import { S } from './state.js';
import { app, bar, head, toast, esc, fmt, AR, mmss, media, pgMedia, srcOf,
        optLabel, dirOf, ICONS, nav, scrollTop } from './ui.js';
import { loadList, loadLessons } from './student.js';
import { questionText, questionBody, KIND_LABEL, gapCount } from './render_q.js';

/* مشتقّاتُ عرضٍ لا حالةَ محاولة — تُبنى كلُّها من S.quiz و S.ans عند
   البدء، ولو ضاعت أُعيد بناؤها بسطر. فمكانها الوحدة لا الحالة:
   ما يُستنتَج لا يُخزَّن مرّتين، لئلا تختلف النسختان.
     A     — معرّف السؤال ← بطاقةُ إجابته
     N     — معرّفه ← رقمُه المعروض
     pages — الصفحات المشتقّة من النصوص
   أما «في أيّ صفحةٍ أنا» فحالةٌ حقيقية ⇒ S.p */
let A = null, N = null, pages = null;

/* ═══════════ ⓪ ميزانية الوقت — سقفٌ لا إيقاع ═══════════

   الأرقام أدناه أحكامٌ لا قياسات: لا بيّنات طلاب بعد، وما سُجّل من
   ثوانٍ قبل النشر نقراتُ فحص. وهي مجموعةٌ هنا في موضعٍ واحد ليُبدَّل
   الرقمُ وحده حين تصل أوّل محاولةٍ حقيقية.

   وهي سقفٌ لا وسيط — والخطآن غير متكافئَين:
     سقفٌ أوسع من اللازم  ⇒  رقمٌ لا يبلغه أحد، ولا ثمن.
     إيقاعٌ أضيق من اللازم ⇒  يقرأ الجميع سطحيّاً تحت الضغط، فيقيس
       كودٌ مثل SU السرعةَ لا المفهوم، ويُرسَل الطالب إلى علاجٍ
       لا يخصّه. والتشخيص هو ميزة المنصّة.
   ⇒ تحت انعدام البيّنة يُختار الطرف الذي خطؤه أرخص.               */

export const COST = {
  q:  { mcq: 75, msq: 150, essay: 300 },                  // ثانيةً لكل سؤال
  pg: { text: 240, image: 120, audio: 300, video: 300 },  // مرّةً لكل نصّ
  media: 90,     // وسيطٌ ملحقٌ بالسؤال نفسه (audio/video في السؤال)
  floor: 300,    // أدنى ميزانية مهما قصُر الاختبار — خمس دقائق
  cap:   5400    // أقصاها — تسعون دقيقة
};

/* تُصدَّر ليستعملها المحرّر أيضاً:
   ساعةُ المعاينة يجب أن تُري ما يراه الطالب لا ما في العمود. */
export function budget(quiz){
  const qs  = quiz?.questions || [];
  const pgs = quiz?.passages  || [];

  /* ① كلفةٌ ثابتة — النصُّ يُقرأ مرّةً مهما كثرت أسئلته.
     و«المستعمَل» يُشتقّ من الأسئلة المعروضة لا من الاختبار:
     get_quiz تُرشّح الأسئلة بالبنك ولا تُرشّح النصوص، فاختبارٌ
     بثلاثة نصوصٍ متوازية يُرسلها كلَّها والطالب يُختبر في واحد.
     ولولا الترشيح هنا لأعطيناه اثنتي عشرة دقيقةَ قراءةٍ لأربع. */
  const used  = new Set(qs.map(q => q.passage_id).filter(Boolean));
  const fixed = pgs.filter(p => used.has(p.id))
                   .reduce((s, p) => s + (COST.pg[p.kind] ?? COST.pg.text), 0);

  /* ② كلفةٌ لكل سؤال بحسب نمطه، وزيادةٌ إن حمل وسيطاً خاصّاً به.
     و ?? حارسٌ لازم لا زينة: المخطّط يسمح بخمسة أنماطٍ لا تعرضها
     الواجهة بعد، ونمطٌ مجهول بلا حارسٍ يُنتج undefined فتصير
     الميزانية كلُّها NaN، وNaN <= 0 كاذبة فلا يُسلَّم الاختبار
     أبداً ويبقى العدّاد يعرض NaN:NaN. */
  const perQ = qs.reduce((s, q) =>
        s + (COST.q[q.kind] ?? COST.q.mcq)
          + ((q.audio || q.video) ? COST.media : 0), 0);

  const sec = Math.min(COST.cap, Math.max(COST.floor, fixed + perQ));
  return Math.ceil(sec / 60) * 60;          // يُجبَر إلى دقيقةٍ كاملة
}

/* ═══════════ ① الصفحات ═══════════ */

/* تُضَمّ الأسئلةُ المتجاورة التي تشترك في نصّ واحد.
   والمفرد يبقى صفحةً وحده ⇒ الاختبارات بلا نصوص تعمل كما كانت
   حرفاً بحرف. ولا يُعاد ترتيب شيء: position على حاله. */
function paginate(qs){
  const pages = [];
  qs.forEach(q => {
    const last = pages[pages.length - 1];
    if (last && q.passage_id && last.pg === q.passage_id) last.qs.push(q);
    else pages.push({ pg: q.passage_id || null, qs: [q] });
  });
  return pages;
}

/* ═══════════ ② الزمن — يُنسَب باللمسة لا بالعرض ═══════════

   كانت الشاشة تحمل سؤالاً واحداً، فكلُّ زمنها له. وصارت تحمل ستّة،
   فلا يصحّ أن يُقسَم الزمن بالتساوي: قسمةُ متوسّطٍ تخترع بياناً لا
   يُميَّز عن المقيس، و answers.seconds هو ما يُفحَص به أثرُ العجلة
   على التشخيص — فلو دخله المخترَع سقطت البيّنة كلّها.

   فالمقياس: كلُّ فترةٍ بين لمستين تُنسَب إلى السؤال المَلموس —
   «الزمن الذي سبق نقرتك على س٥ أنفقتَه في س٥». وما لم يُلمَس
   يبقى صفراً، وهو صدقٌ لا نقص.                                   */

let mark = 0, touched = null;

function credit(qid){
  const now = Date.now(), a = A.get(qid);
  if(a) a.sec += Math.round((now - mark) / 1000);
  mark = now; touched = qid;
}

/* ما بعد آخر لمسةٍ يُنسَب إلى صاحبها. وصفحةٌ لم تُلمَس لا مالك
   لزمنها ⇒ يسقط. والمجموع محفوظ: التسليم يرسل زمنه كاملاً. */
function leavePage(){
  if(touched !== null) credit(touched);
  touched = null; mark = Date.now();
}

/* ═══════════ ③ بدء الاختبار ═══════════ */

export async function startQuiz(meta){
  app.innerHTML = `<div class="status">جارٍ تحميل الأسئلة…</div>`;
  const { data, error } = await api.getQuiz(meta.id);
  if(error){ toast(error.message); loadList(); return; }

  S.quiz = data;
  S.passages = {};
  (data.passages||[]).forEach(pg => S.passages[pg.id] = pg);
  S.itemId = meta.item_id || null;
     S.ans = data.questions.map(q=>({ q:q.id, kind:q.kind, o:null, os:[],
                                   txt:Array(gapCount(q.body)||1).fill(""),
                                   essay:"", sec:0, chg:0 }));

  A = new Map(S.ans.map(a => [a.q, a]));
  N = new Map(data.questions.map((q,i) => [q.id, i+1]));
  pages = paginate(data.questions);
  S.p = 0;

  /* S.total تُحفظ لأن paintClock تحتاج المقام، ولو أعدنا حساب
     budget() في كل ثانية لَحسبناها ستّين مرّة في الدقيقة بلا داعٍ. */
  S.total = budget(data); S.left = S.total;
  S.t0 = Date.now();
  mark = Date.now(); touched = null;

  clearInterval(S.tick);
  S.tick = setInterval(()=>{
    S.left--; paintClock();
    if(S.left<=0){ clearInterval(S.tick); toast("انتهى الوقت — تسليم تلقائي"); finish(true); }
  }, 1000);

  renderPage();
}

function paintClock(){
  const c = document.getElementById("clock"); if(!c) return;
  c.textContent = mmss(Math.max(0,S.left));
  c.className = "clock" + (S.left<=60 ? " crit" : (S.left<=300 ? " warn" : ""));
  const f = document.getElementById("tf");
  if(f) f.style.width = Math.max(0,(S.left/S.total)*100) + "%";
}

/* ═══════════ ④ عرض الصفحة ═══════════ */

function renderPage(){
  const P = pages[S.p], qs = P.qs, tot = S.quiz.questions.length;
  const many = qs.length > 1;
  const last = S.p === pages.length - 1;
  const pg   = P.pg ? S.passages[P.pg] : null;

  /* pgMedia تعرض الصوت في كل ما ليس صورةً ولا فيديو — فليكن
     التمييز هنا بالقاعدة نفسها، لا بقائمةٍ ثانية تتباعد عنها. */
  const isAudio = !!(pg && pg.media && pg.kind !== 'video' && pg.kind !== 'image');

  head(S.quiz.title,
    !many     ? "أجب بتأنٍ — كل خيار خاطئ يمثل فخاً مقصوداً"
    : isAudio ? "اطّلع على الأسئلة أولاً ثم شغّل المقطع — تستمع بغرض، والإعادة مباحة"
    :           "أسئلةُ نصٍّ واحد — ارجع إليه كلما احتجت");

  const from = AR(N.get(qs[0].id)), to = AR(N.get(qs[qs.length-1].id));
  bar.innerHTML = `<div class="timerbar">
    <span class="clock" id="clock">${mmss(S.left)}</span>
    <span class="track"><span class="trackfill" id="tf"></span></span>
    <span class="qcount">${many?`<bdi>${from}–${to}</bdi>`:from} / ${AR(tot)}</span></div>`;
  paintClock();

  /* المقطع الصوتي يخرج من بطاقة النصّ إلى شريطٍ ملتصق: الصفحة صارت
     طويلة، وزرُّ الإعادة يجب أن يبقى في المتناول — فالإعادة غير
     المحدودة هي ما يمنع الكود من قياس الذاكرة العاملة بدل الفهم. */
  const pgHtml = !pg ? '' : `
    ${isAudio ? `<div class="psg-audio">${pgMedia(pg)}</div>` : ''}
    <div class="card" style="padding:16px">
      ${pg.title?`<div class="psg-t" dir="auto">${esc(pg.title)}</div>`:''}
      ${isAudio ? '' : pgMedia(pg)}
      ${pg.body?`<div class="psg" dir="auto">${fmt(pg.body)}</div>`:''}
    </div>`;

  let seen = null;                       // آخرُ عنوان قسمٍ كُتب في هذه الصفحة
  const cards = qs.map(q => {
    const a = A.get(q.id), multi = q.kind === 'msq';
         const qAudio = srcOf(q.audio);
    const picked = o => multi ? a.os.includes(o.id) : a.o === o.id;

       const body = questionBody(q, { picked, essay:a.essay, values:a.txt });

    const sec = (q.section && q.section !== seen)
      ? `<div class="q-sec" dir="auto">${esc(q.section)}</div>` : '';
    seen = q.section || seen;

        return `${sec}
      <div class="card qcard" id="q${q.id}" data-q="${q.id}">
        <div class="qnum">سؤال ${AR(N.get(q.id))} · ${KIND_LABEL[q.kind]||'سؤال'}</div>
        ${media(q)}
        ${qAudio?`<audio controls preload="metadata" src="${esc(qAudio)}"
                   style="width:100%;margin-bottom:12px"></audio>`:''}
        ${questionText(q, a.txt)}
        ${body}
      </div>`;
  }).join("");

  app.innerHTML = `${pgHtml}${cards}
    <div id="warn"></div>
    <div class="nav">
      ${S.p>0?'<button class="btn ghost" id="prev">السابق</button>':''}
      <button class="btn primary" id="next">${last?'إنهاء وتسليم':'التالي'}</button>
    </div>`;

  /* ── التفويض: مستمعٌ واحد للصفحة كلها ──
     صارت الصفحة تحمل عشرات الأزرار؛ وربطُ مستمعٍ بكلٍّ منها عملٌ
     يتضاعف بلا داعٍ. والحدثُ يصعد من الزرّ إلى ما يحويه، فيكفي أن
     ننصت عند الجذر ونسأل: من أين جئت؟ */
  app.onclick = e => {
    const b = e.target.closest('.opt'); if(!b) return;
    const card = b.closest('.qcard'), qid = +card.dataset.q;
    const a = A.get(qid), v = +b.dataset.o;
    credit(qid);

    if(a.kind === 'msq'){
      const j = a.os.indexOf(v);
      if(a.os.length) a.chg++;                 // تبديلٌ بعد أول اختيار = تغيير
      if(j>=0) a.os.splice(j,1); else a.os.push(v);
      const on = a.os.includes(v);
      b.classList.toggle('sel', on);
      const t = b.querySelector('.tick'); if(t) t.textContent = on ? '✔' : '';
      return;
    }
    /* mcq — صِف الحالة النهائية ولا تُعِد بناء الشاشة. و toggle
       بوسيطها الثاني تفرض الحالة ولا تقلبها، فيستحيل أن تبقى
       فئتا sel على زرّين. والنطاق بطاقةُ السؤال لا الصفحة. */
    if(a.o!==null && a.o!==v) a.chg++;
    a.o = v;
    card.querySelectorAll('.opt').forEach(x =>
      x.classList.toggle('sel', +x.dataset.o === v));
  };

    app.oninput = e => {
    const t = e.target;
    const card = t.closest('.qcard'); if(!card) return;
    const qid = +card.dataset.q, a = A.get(qid);

    if(t.classList.contains('gap-in')){ credit(qid);
      const i = +t.dataset.i;
      if(a.txt[i] && a.txt[i] !== t.value) a.chg++;   // تبديلٌ بعد كتابة = تغيير
      a.txt[i] = t.value;
      return;
    }
    if(t.classList.contains('essay')){ credit(qid); a.essay = t.value; }
  };

  /* ── الفراغ: يُنبَّه عليه مرّة، ثم يُحترَم ── */
  let warned = false;
  const blanks = () => qs.filter(q => {
    const a = A.get(q.id);
        return a.kind==='mcq' ? a.o === null
         : a.kind==='msq' ? a.os.length === 0
         : a.kind==='gap' ? a.txt.every(v => !v.trim())
         :                  !a.essay.trim();
  });

  const p = document.getElementById("prev");
  if(p) p.onclick = ()=>{ leavePage(); S.p--; renderPage(); };

  document.getElementById("next").onclick = ()=>{
    leavePage();
    const b = blanks();
    if(b.length && !warned){
      warned = true;
      document.getElementById("warn").innerHTML = `<div class="q-hint">
        بلا إجابة: ${b.map(q=>'س'+AR(N.get(q.id))).join(' · ')} —
        أجب إن كان لك ترجيح، ودعها فارغةً إن لم يكن.
        التخمينُ يقع في مشتّتٍ فيُسجَّل لك تشخيصٌ لا يخصّك.</div>`;
      document.getElementById("next").textContent =
        last ? 'سلّم دون إكمال' : 'تابع دون إجابة';
      document.getElementById('q'+b[0].id)?.scrollIntoView({ behavior:'smooth', block:'start' });
      return;
    }
    if(last) finish(false); else { S.p++; renderPage(); }
  };

  scrollTop();
}

/* ═══════════ ⑤ التسليم ═══════════ */

async function finish(auto){
  clearInterval(S.tick); leavePage();
  app.onclick = null; app.oninput = null;
  app.innerHTML = `<div class="status">جارٍ التصحيح…</div>`; bar.innerHTML = "";

    const payload = S.ans.map(a =>
      a.kind==='mcq' ? { q:a.q, o:a.o,   sec:a.sec, chg:a.chg }
    : a.kind==='msq' ? { q:a.q, os:a.os, sec:a.sec, chg:a.chg }
    : a.kind==='gap' ? { q:a.q, txt:a.txt.map(v=>v.trim()), sec:a.sec, chg:a.chg }
    :                  { q:a.q, essay:a.essay, sec:a.sec });

  const { data, error } = await api.submitAttempt(
    S.quiz.id, payload, Math.round((Date.now()-S.t0)/1000), auto);
  if(error){ app.innerHTML = `<div class="err"><b>تعذّر التسليم</b>${esc(error.message)}</div>`; return; }

  S.result = { ...data, auto, secs: Math.round((Date.now()-S.t0)/1000) };
  renderResult();
}

/* ═══════════ ⑥ النتيجة والتشخيص ═══════════ */

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
  const jrows = x => {
    const seen = new Set();                                   // 🆕 نصٌّ مرّةً واحدة
    return (x.judgments||[]).map(j=>{
    const o = opt(j.o); if(!o) return '';
    const hit  = (j.key === j.picked);
    const cls  = hit ? (j.key ? 'hit' : 'dim') : 'err';
    const mark = j.key ? (j.picked ? '✔ صحيحة · اخترتَها' : '✗ صحيحة · أغفلتَها')
                       : (j.picked ? '✗ خاطئة · اخترتَها' : '✔ خاطئة · تجنّبتَها');
    const txt  = j.note || (j.dx_name ? j.dx_name + (j.remedy?' — '+j.remedy:'') : '');
    const show = !hit && txt && !seen.has(txt);                // 🆕
    if(show) seen.add(txt);                                    // 🆕
    return `<div class="jd ${cls}">
      <span class="key">${esc(o._l)}</span>
      <div style="flex:1">
        <span dir="${dirOf(o.body)}" style="display:block">${fmt(o.body)}</span>
        <span class="jd-m">${mark}</span>
        ${show ? `<span class="jd-dx">${esc(txt)}</span>` : ''}
      </div></div>`;
  }).join("");
  };

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
      : x.kind==='gap'
      ? `<div class="line" dir="auto">إجابتك: <b dir="auto">${
             esc((x.given||[]).filter(v=>v.trim()).join('  ·  ')) || '— لم تُجب —'}</b></div>
         ${x.is_correct?'':`<div class="line" dir="auto">المقبول: <b dir="auto">${
             esc((x.accept||[]).map(s=>s.join(' / ')).join('  ·  ')) || '—'}</b></div>`}`
      : `<div class="line" dir="auto">إجابتك: <b>${c?esc(c._l+') '+c.body):'— لم تُجب —'}</b></div>
         ${x.is_correct?'':`<div class="line" dir="auto">الصحيحة: <b>${
             k?esc(k._l+') '+k.body):'—'}</b></div>`}`;

    return `<div class="rev ${x.is_correct?'ok':'no'}">
      <span class="tag ${x.is_correct?'ok':'no'}">${x.is_correct?'صحيحة':'خاطئة'}</span>
      <div class="rev-q" dir="auto">${AR(i+1)}. ${fmt(x.body)}</div>
      ${answer}
      ${x.is_correct?'':`
                          <div class="trap"><strong>تشخيص الخطأ:</strong>
          ${esc(x.explanation||'').replace(/\n/g,"<br>")}
                      ${!msq && (x.note || x.remedy)?`<div style="margin-top:8px;opacity:.9">🎯 ${esc(x.note || x.remedy)}</div>`:''}</div>
        ${x.remedial?`<div class="remedy"><strong>راجع قبل الإعادة</strong>
          <a href="${esc(x.remedial.url||'#')}" target="_blank" rel="noopener"
             style="color:var(--accent)">${ICONS[x.remedial.kind]||'📎'} ${esc(x.remedial.title)}</a></div>`:''}`}
    </div>`;
  }).join("");

     /* ما تكرّر — يُجمع على النصّ لا على الكود، لأن النصّ هو ما يقرؤه الطالب.
     ويُوصف الوقوع ولا يُضاف إلى الطالب: «تكرّر لديك» لا «نمطك».
     والأرقام تحمل العدد، فلا يُذكر معها. */
  const recur = (() => {
    const map = new Map();                                  // نصّ → مجموعة أرقام
    r.review.filter(x => x.kind !== 'essay').forEach((x, i) => {
      const n = i + 1;
      const add = t => { if(!t) return;
        if(!map.has(t)) map.set(t, new Set());
        map.get(t).add(n); };                               // Set ⇒ رقمٌ مرّةً واحدة
      if(!x.is_correct) add(x.note);                        // البند المفرد
      (x.judgments || []).forEach(j => {                    // وخيارات msq
        if(j.picked && !j.key) add(j.note);
      });
    });

    const rows = [...map.entries()]
      .filter(([, s]) => s.size > 1)
      .sort((a, b) => b[1].size - a[1].size)
      .map(([txt, s]) => {
        const ns = [...s].sort((a,b) => a-b).map(AR);
        const lbl = ns.length === 2
          ? `في السؤالين ${ns[0]} و${ns[1]}`
          : `في الأسئلة ${ns.slice(0,-1).join(' و')} و${ns.at(-1)}`;
        return `<div class="rc-row"><div class="rc-where">تكرّر لديك ${lbl}:</div>
                <div class="rc-note">${esc(txt)}</div></div>`;
      });

    return rows.length
      ? `<div class="recur"><h3>ما تكرّر معك اليوم</h3>${rows.join("")}</div>`
      : '';
  })();
  const ess = r.review.filter(x=>x.kind==='essay').map(x=>`
    <div class="rev">
      <div class="rev-q" dir="auto">${fmt(x.body)}</div>
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
    <h2 class="sec">المراجعة التشخيصية</h2>${objective}${recur}
    <h2 class="sec">الأسئلة المقالية — بانتظار تصحيح معلمك</h2>${ess}`;

  document.getElementById("again").onclick = ()=>startQuiz({ id:S.quiz.id, item_id:S.itemId });
  document.getElementById("back").onclick  = ()=>{
    if(S.subj) loadLessons(S.subj); else loadList();
  };
  scrollTop();
}
