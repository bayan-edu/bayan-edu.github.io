/* ══════════════════════════════════════════════════════════
   بيان — practice.js  ·  جلسةُ تدرّبٍ بلا حساب

   شاشةُ من يملك الرابط: لا تسجيلَ دخول، ولا تقييمَ، ولا سجلَّ
   تعلّمٍ يترتّب. والتشخيصُ كاملُ الجودة — وهو سببُ وجودها.

   🔑 ولا راسمَ ثانٍ: السؤالُ يُرسم بـ render_q.js عينِها، والمزاوجةُ
      تُسنَد بـ match_dnd.js عينِها. فما يراه الزائر هو ما يراه
      الطالب — **لأنها الشيفرة نفسها**، لا محاكاةً لها.
      ولذلك رُدَّت حمولةُ القاعدة إلى عقد get_quiz في SQL 119، ولم
      يُعدَّل الراسمُ ليقبل شكلاً ثانياً.

   🔑 **وسؤالٌ واحدٌ في الشاشة، بخلاف شاشة الاختبار.** ثَمَّ يُجاب
      الكلُّ ثمّ يُصحَّح، وهنا التشخيصُ يقع **حيث يقع الخطأ** — وتأخيرُه
      إلى الآخر يجعله مراجعةً، والمراجعةُ ليست تدرّباً.

   ⚠️ **ولا درجةَ في الختام ولا نسبة.** «لا تقييم ولا قياس» حكمٌ لا
      زينة: رقمٌ في الآخر يحوّل التدرّبَ امتحاناً في ذهن من جلس له.
      فالخاتمةُ ما تكرّر من التشخيص — وهو ما يُفيد فعلاً.
   ══════════════════════════════════════════════════════════ */
import * as api from './api.js';
import { app, bar, head, toast, esc, fmt, AR, media, pgMedia, srcOf,
         scrollTop } from './ui.js';
import { questionText, questionBody, KIND_LABEL } from './render_q.js';
import { wireMatching } from './match_dnd.js';

/* حالةُ الجلسة — تعيش هنا لا في S: زائرٌ بلا حساب لا حالةَ تطبيقٍ له،
   ووضعُها في S يوهم بقيّةَ الوحدات أنّ ثَمَّ مستخدماً. */
let P = null;

const PLEDGE = 'جلسة تدرّب — لا تُقيَّم ولا تُسجَّل في أيّ سجلّ';


/* ═══════════ ① الدخول ═══════════ */

export async function openPractice(token){
  bar.innerHTML = "";
  head("جلسة تدرّب", "جارٍ فتح الرابط…");
  app.innerHTML = `<div class="status">جارٍ فتح الرابط…</div>`;

  const { data, error } = await api.openPractice(token);
  if(error){ return fail(error.message); }
  if(!data?.ok){ return fail(data?.error || 'تعذّر فتح الرابط'); }

  P = { token, name:null, kind:data.kind, title:data.title,
        expires: data.expires_at,
        items: data.kind === 'cards' ? (data.cards||[]) : (data.questions||[]),
        passages: data.passages || [],
        i: 0, a: null, shown:false, notes: new Map() };

  intro();
}

function fail(msg){
  head("جلسة تدرّب", "");
  app.innerHTML = `
    <div class="err"><b>تعذّر فتح الجلسة</b>${esc(msg)}</div>
    <p class="hint">إن كنتَ تظنّ الرابط صحيحاً فاطلب من معلّمك رابطاً جديداً —
      روابطُ التدرّب لها مدّةٌ تنتهي.</p>`;
}


/* ═══════════ ② التنويه قبل البدء ═══════════
   ⚠️ صريحٌ قبل أن يبدأ لا بعد أن ينتهي: من ظنّ أنّه يُمتحَن يقيس
      نفسه بما لا يُقاس. وهو التزامُ المنصّة بعدم التضليل الصامت. */

function intro(){
  head(P.title || 'جلسة تدرّب', PLEDGE);
  const n = P.items.length;
  app.innerHTML = `
    <div class="card">
      <div class="line" style="color:var(--text)">
        ${P.kind === 'cards'
          ? `${AR(n)} بطاقة — تقلبها وتحكم على نفسك.`
          : `${AR(n)} سؤالاً — تُجيب، فيُقال لك <b>أيُّ خطأٍ وقعتَ فيه وما علاجه</b>،
             لا «أخطأتَ» وحدها.`}
      </div>
      <div class="line" style="margin-top:10px">
        ولا حدَّ للمحاولات: أعِد السؤال حتى تفهمه.
        ${P.expires ? `· والرابط صالحٌ حتى ${esc(new Date(P.expires)
            .toLocaleDateString('ar-EG', { year:'numeric', month:'long', day:'numeric' }))}` : ''}
      </div>
      <label class="fl" style="margin-top:16px">اسمك <span style="opacity:.6">(اختياري)</span></label>
      <input type="text" id="pnm" maxlength="40" placeholder="يظهر لمعلّمك، ولا يُتحقَّق منه">
    </div>
    <div class="nav" style="margin-top:16px">
      <button class="btn primary" id="pgo">ابدأ ←</button>
    </div>`;

  document.getElementById("pgo").onclick = () => {
    P.name = document.getElementById("pnm").value.trim() || null;
    P.i = 0; draw();
  };
  scrollTop();
}


/* ═══════════ ③ الرسم ═══════════ */

const cur = () => P.items[P.i];

/* إجابةٌ فارغة بحسب النمط — كأختها في quiz.js، والأسماءُ عينُها
   لأنّ الحمولة التي تصل القاعدة عينُها. */
function blank(q){
  return { o:null, os:[], txt:[], pairs:{} , kind:q.kind };
}

function draw(){
  if(P.i >= P.items.length) return done();
  const it = cur();
  P.a = blank(it);
  P.shown = false;

  head(P.title || 'جلسة تدرّب', PLEDGE);
  app.innerHTML = P.kind === 'cards' ? cardHtml(it) : quizHtml(it);
  wire();
  scrollTop();
}

const counter = () =>
  `<div class="qnum">${AR(P.i + 1)} من ${AR(P.items.length)}</div>`;

function quizHtml(q){
  const pg = P.passages.find(p => String(p.id) === String(q.passage_id));
  const qAudio = srcOf(q.audio);
  return `
    ${pg ? `<div class="card"><div class="line" style="color:var(--text)"
              dir="auto">${pg.title ? `<b>${esc(pg.title)}</b><br>` : ''}${fmt(pg.body||'')}</div>
            ${pgMedia(pg)}</div>` : ''}
    <div class="qcard" data-q="${q.id}">
      ${counter()}
      <div class="qnum" style="color:var(--text-muted)">${esc(KIND_LABEL[q.kind] || 'سؤال')}</div>
      ${media(q)}
      ${qAudio ? `<audio controls preload="metadata" src="${esc(qAudio)}"
                   style="width:100%;margin-bottom:12px"></audio>` : ''}
      ${questionText(q, q.kind === 'cloze' ? P.a.pairs : P.a.txt)}
      ${questionBody(q, { picked: o => false, values: P.a.txt, pairs: P.a.pairs })}
    </div>
    <div id="fb"></div>
    <div class="nav" style="margin-top:16px">
      <button class="btn primary" id="psend">تحقّق</button>
    </div>`;
}

/* البطاقة: وجهٌ ثمّ ظهرٌ ثمّ حكمٌ على النفس. ولا «صحيح/خطأ» —
   التقديرُ أربعُ درجاتٍ كما في محرّك المنصّة، ولا يُترجَم حكماً. */
function cardHtml(c){
  return `
    <div class="qcard" data-q="${c.id}">
      ${counter()}
      <div class="line" dir="auto"
           style="color:var(--text);font-size:var(--fs-read)">${fmt(c.front || '')}</div>
      <div id="back" hidden>
        <div class="line" dir="auto" style="margin-top:14px"><b>${fmt(c.back || '')}</b></div>
        ${c.note ? `<div class="line" dir="auto" style="margin-top:8px;opacity:.85">${fmt(c.note)}</div>` : ''}
      </div>
    </div>
    <div class="nav" style="margin-top:16px">
      <button class="btn primary" id="pflip">اقلب البطاقة</button>
    </div>
    <div id="rate" hidden>
      <p class="hint">كيف كانت؟</p>
      <div class="nav">
        <button class="btn ghost" data-r="1">صعبة</button>
        <button class="btn ghost" data-r="2">بجهد</button>
        <button class="btn ghost" data-r="3">جيدة</button>
        <button class="btn ghost" data-r="4">سهلة</button>
      </div>
    </div>`;
}


/* ═══════════ ④ الأسلاك — بعقد quiz.js عينِه ═══════════ */

function wire(){
  if(P.kind === 'cards'){
    document.getElementById("pflip").onclick = () => {
      document.getElementById("back").hidden = false;
      document.getElementById("pflip").hidden = true;
      document.getElementById("rate").hidden = false;
    };
    document.querySelectorAll('#rate [data-r]').forEach(b => b.onclick = async () => {
      const { data, error } = await api.answerPractice(
        P.token, P.name, cur().id, { rating: +b.dataset.r });
      if(error){ toast(error.message); return; }
      if(!data?.ok){ toast(data?.error || 'تعذّر التسجيل'); return; }
      P.i++; draw();
    });
    return;
  }

  const a = P.a;

  wireMatching(app, (ik, bk) => {
    if(bk) a.pairs[ik] = bk; else delete a.pairs[ik];
  });

  app.onclick = e => {
    const b = e.target.closest('.opt'); if(!b) return;
    if(P.shown) return;                       // بعد الكشف لا يُبدَّل
    const v = +b.dataset.o;
    if(a.kind === 'msq'){
      const j = a.os.indexOf(v);
      if(j >= 0) a.os.splice(j,1); else a.os.push(v);
      const on = a.os.includes(v);
      b.classList.toggle('sel', on);
      const t = b.querySelector('.tick'); if(t) t.textContent = on ? '✔' : '';
      return;
    }
    a.o = v;
    app.querySelectorAll('.opt').forEach(x =>
      x.classList.toggle('sel', +x.dataset.o === v));
  };

  app.oninput = e => {
    const t = e.target;
    if(t.classList.contains('gap-in')) a.txt[+t.dataset.i] = t.value;
  };

  document.getElementById("psend").onclick = send;
}

/* الحمولةُ بأسماء submit_attempt عينِها — فالعقدُ واحدٌ في المسارين */
function payload(q, a){
  if(q.kind === 'mcq') return { o: a.o == null ? '' : String(a.o) };
  if(q.kind === 'msq') return { os: a.os };
  if(q.kind === 'gap') return { txt: a.txt };
  return { pairs: a.pairs };
}


/* ═══════════ ⑤ التحقّق والتشخيص ═══════════ */

async function send(){
  const q = cur(), btn = document.getElementById("psend");

  if(P.shown){ P.i++; draw(); return; }        // الزرُّ نفسُه يصير «التالي»

  btn.disabled = true; btn.textContent = 'جارٍ التحقّق…';
  const { data, error } = await api.answerPractice(P.token, P.name, q.id, payload(q, P.a));
  btn.disabled = false;

  if(error){ btn.textContent = 'تحقّق'; toast(error.message); return; }
  if(!data?.ok){ btn.textContent = 'تحقّق'; toast(data.error || 'تعذّر التحقّق'); return; }

  P.shown = true;
  /* ما تكرّر يُجمع على **نصّ التشخيص** لا على كوده — لأنّ النصّ هو ما
     يقرؤه المتدرّب، والكودُ لغةُ مؤلّف (62 · 95). */
  if(data.dx?.note) P.notes.set(data.dx.note, (P.notes.get(data.dx.note) || 0) + 1);

  document.getElementById("fb").innerHTML = feedback(data);
  app.querySelectorAll('.opt, .gap-in, .pair-slot, .bank-w, .slot-x')
     .forEach(el => { el.disabled = true; });
  btn.textContent = P.i + 1 < P.items.length ? 'التالي ←' : 'أنهِ الجلسة';
  document.getElementById("fb").scrollIntoView({ behavior:'smooth', block:'nearest' });
}

function feedback(r){
  const ok = r.is_correct;
  const part = (r.hits != null && r.of)
    ? `<div class="line">أصبتَ ${AR(r.hits)} من ${AR(r.of)}</div>` : '';
  return `
    <div class="rev ${ok ? 'ok' : 'no'}" style="margin-top:14px">
      <span class="tag ${ok ? 'ok' : 'no'}">${ok ? 'أصبتَ' : 'أخطأتَ'}</span>
      ${part}
      ${!ok && r.correct != null
        ? `<div class="line" dir="auto">الصواب: <b>${esc(showCorrect(r))}</b></div>` : ''}
      ${r.dx?.note
        ? `<div class="trap"><strong>لماذا وقع الخطأ</strong>${fmt(r.dx.note)}</div>` : ''}
      ${r.explanation ? `<div class="line" dir="auto"
            style="margin-top:10px">${fmt(r.explanation)}</div>` : ''}
    </div>`;
}

/* الصوابُ يصل من القاعدة بأشكالٍ بحسب النمط — ويُقرأ سطراً واحداً.
   والقيمةُ تصل **نصّاً لا رمزاً** (119)، فلا فكَّ مفاتيحَ لها هنا.

   🔴 **وأمّا المفتاح فيُفَكّ — وقيس أنّه كان يُعرض خاماً:** مفاتيحُ
      المزاوجة رموزُ تأليفٍ (`i1` · `i2`)، فكان السطر يقرأ
      «i١: طويل» — رمزٌ لا يعنيه، ورقمٌ عربيٌّ داخل حرفٍ لاتينيّ.
      ⇒ المفتاحُ يُترجَم إلى **نصّ البند** من `options` (وهي في الحمولة
      أصلاً بمفاتيحها منذ 119). وفي «إكمال من قائمة» لا خيارات، والمفتاحُ
      **رقمُ الفراغ** نفسُه — فيُعرَّب رقماً كما يُرقَّم في نصّ السؤال. */
function showCorrect(r){
  const c = r.correct;
  if(c == null) return '—';

  // gap: مصفوفةُ خاناتٍ، ولكلّ خانةٍ بدائلُها
  if(Array.isArray(c))
    return c.map(v => Array.isArray(v) ? v.join(' / ') : String(v)).join('  ·  ');

  // matching · cloze: { مفتاحُ البند → نصُّ الصواب }
  if(typeof c === 'object'){
    const opts = cur().options || [];
    const at   = k => opts.findIndex(o => String(o.k) === String(k));
    const name = k => { const i = at(k);
      return i >= 0 ? String(opts[i].body) : (isFinite(+k) ? AR(+k) : String(k)); };
    return Object.keys(c)
      .sort((x, y) => {
        const ax = at(x), ay = at(y);
        if(ax >= 0 || ay >= 0) return (ax < 0 ? 1e9 : ax) - (ay < 0 ? 1e9 : ay);
        return (+x || 0) - (+y || 0);
      })
      .map(k => `${name(k)} ← ${c[k]}`).join('  ·  ');
  }

  // mcq: معرّفُ خيار
  const o = (cur().options || []).find(x => String(x.id) === String(c));
  return o ? String(o.body) : String(c);
}


/* ═══════════ ⑥ الخاتمة — تشخيصٌ لا درجة ═══════════ */

function done(){
  head(P.title || 'جلسة تدرّب', 'انتهت الجلسة');
  const rows = [...P.notes.entries()].sort((a,b) => b[1] - a[1]);
  app.innerHTML = `
    <div class="card">
      <div class="line" style="color:var(--text);font-size:var(--fs-read)">
        انتهت الجلسة${P.name ? ` يا ${esc(P.name)}` : ''}.</div>
      <div class="line" style="margin-top:8px">${PLEDGE}.
        ومن أراد قياساً حقيقياً ومتابعةَ معلّمٍ فليسجّل في بيان.</div>
    </div>

    ${rows.length ? `
      <h2 class="sec">ما تكرّر معك</h2>
      <p class="hint">يوصف الوقوعُ ولا يُضاف إليك — والمرّةُ الواحدة صدفةٌ لا نمط.</p>
      ${rows.map(([note, n]) => `
        <div class="rev no"><span class="tag no">${AR(n)}</span>
          <div class="line" dir="auto" style="color:var(--text)">${fmt(note)}</div>
        </div>`).join("")}`
    : `<p class="hint">لم يُسجَّل نمطُ خطأٍ متكرّر في هذه الجلسة.</p>`}

    <div class="nav" style="margin-top:20px">
      <button class="btn primary" id="pagain">أعِد الجلسة</button>
      <a class="btn ghost" href="./" style="text-decoration:none">بيان</a>
    </div>`;

  document.getElementById("pagain").onclick = () => {
    P.i = 0; P.notes.clear(); draw();
  };
  app.onclick = null; app.oninput = null;
  scrollTop();
}
