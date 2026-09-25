/* ══════════════════════════════════════════════════════════
   بيان — student.js
   المواد ← اختيار المعلم ← الدروس ← مصادر الدرس
   + ملاحظات المعلم ومراسلته

   ⚠️ الدوال المصدَّرة بـ function لا const — لأجل الاستيراد الدائري.
   ══════════════════════════════════════════════════════════ */
import * as api from './api.js';
import { S } from './state.js';
import { app, head, toast, esc, AR, ICONS, KINDS, bubble, errBox, nav,
         refreshCounts, scrollTop, scrollBottom, shape, icon,
         skeleton } from './ui.js';
import { startQuiz } from './quiz.js';
import { mediaUrl, isManaged } from './media.js';
import { isSim, openSim } from './simulations.js';
import { openLessonDeck, loadFlashcards } from './flashcards.js';

/* ═══════════ ① المواد — الرئيسة ═══════════ */

/* ⚠️ function لا const — كما ينصّ رأس الملفّ: هاتان صارتا في نطاق
   الوحدة لا داخل loadList (b66)، وconst في وحدةٍ داخلةٍ في استيرادٍ
   دائريّ تسقط في TDZ إن سبقها نداء. والتصريحُ يُرفَع فلا يسقط. */

/* مادة صفّ سابق دروسها في lessons_review لا lessons_total —
   فلا يصحّ قياس «الفراغ» على lessons_total وحده. */
function bulk(x){ return (x.lessons_total || 0) + (x.lessons_review || 0); }

/* ⚠️ lessons_total > 0 شرط لازم: بدونه تُطوى المواد الفارغة
   بوسم «أتممتها» — إذ 0 === 0 صحيح. */
function isDone(x){ return x.lessons_total > 0 && x.lessons_done >= x.lessons_total; }

/* ── أين تركتَ؟ ──
   🔑 محلّيٌّ لا في القاعدة عمداً: هذا **تسهيلٌ لا سجلّ**. لو سكن
      القاعدة لاحتاج جدولاً وسياسةَ RLS ونداءً في كلّ إقلاع — ثمنٌ
      لا يقابله إلا سطرٌ واحد في الشاشة. وثمنُه المقبول أنه يُفقد
      بتبديل الجهاز أو مسح البيانات، والبديلُ حينها هو الرئيسةُ
      نفسها تحته مباشرة. ⇒ غيابُه لا يمنع فعلاً.
   ⚠️ وlocalStorage يرمي في التصفّح الخاصّ ⇒ try في الطرفين. */
const LAST_KEY = 'bayan.last';

function rememberSubject(x){
  try{ localStorage.setItem(LAST_KEY, JSON.stringify({ id:x.id })); }catch(e){}
}

/* تُطابَق بالقائمة الحيّة لا بما حُفظ: المادة قد تُسحب أو يتغيّر
   تسجيلُ الطالب فيها، فمعرّفٌ محفوظٌ يقود إلى بابٍ لا يُفتح.
   ⚠️ ولا تُنادى قبل أن تُملأ S.subjects. */
function lastSubject(){
  let saved = null;
  try{ saved = JSON.parse(localStorage.getItem(LAST_KEY) || 'null'); }catch(e){}
  if(!saved?.id) return null;
  return (S.subjects || []).find(v => String(v.id) === String(saved.id)) || null;
}

/* ── حالةُ المادة صنفاً · والألوان في screens.css عند .st-* ──
   ستٌّ لا اثنتان: «بدأتُ» ليست «أوشكتُ»، والفرقُ بينهما هو ما يجعل
   الشبكة تُقرأ بلمحة. والصفُّ السابق لا تقدُّمَ فيه يُقاس: مادّتُه
   مراجعةٌ لا مسار، فحالتُه «فيها ما يُراجَع» أو «لا». */
function subjectState(x, isPast){
  if(!x.needs_placement && bulk(x) === 0) return 'st-empty';
  if(x.needs_placement)                   return 'st-new';
  if(isPast) return (x.lessons_review || 0) > 0 ? 'st-new' : 'st-empty';
  const t = x.lessons_total || 0;
  if(!t) return 'st-new';
  const p = (x.lessons_done || 0) / t;
  if(p <= 0)   return 'st-new';
  if(p >= 1)   return 'st-done';
  if(p < 0.34) return 'st-active';
  if(p < 0.67) return 'st-mid';
  return 'st-near';
}

/* ── شريط «اليوم» · والشرح كاملاً في screens.css عند .today ──
   يُعيد '' حين لا ينتظر شيء: الغيابُ يقول «لا جديد» أصدقَ من ثلاثة
   أصفارٍ تُعرض كلَّ يوم حتى يُكفَّ عن النظر إلى الشريط أصلاً.
   🔒 ولا نداءَ شبكةٍ هنا: الأعداد من S.counts التي ملأها refreshCounts،
      و«أين تركتَ» من الجهاز. ثلاثُ بطاقاتٍ بلا طلبٍ واحد. */
function todayStrip(){
  const c = S.counts || {}, acts = [];
  const back = lastSubject();

  if(back && bulk(back) > 0 && !isDone(back) && !back.needs_placement)
    acts.push(['go-resume', 'resume',   'ta-accent', 'تابِع',   back.name]);
  if((c.due || 0) > 0)
    acts.push(['go-cards',  'cards',    'ta-ok',     'استرجِع', `${AR(c.due)} بطاقة استحقّت`]);
  if((c.feedback || 0) > 0)
    acts.push(['go-fb',     'feedback', 'ta-dx',     'عالِج',   `${AR(c.feedback)} ملاحظة جديدة`]);

  if(!acts.length) return '';
  return `<div class="today">${acts.map(([id, ic, fam, lbl, val]) => `
    <button class="today-act ${fam}" id="${id}">
      <span class="ta-ic">${icon(ic)}</span>
      <span class="ta-lbl">${lbl}</span>
      <span class="ta-val" dir="auto">${esc(val)}</span>
    </button>`).join('')}</div>`;
}

export async function loadList(){
  nav('subjects');
  app.innerHTML = skeleton('subjects');

  const { data, error } = await api.listSubjects();
  if(error){
    head("أهلًا "+S.prof.full_name, "");
    app.innerHTML = `<div class="err"><b>تعذّر التحميل</b>${esc(error.message)}</div>`; return; }
  S.subjects = data || [];

  /* العدد من S.counts — يملؤها refreshCounts، وهي نفسها التي يقرؤها
     الجرس. نداءٌ واحد لا نداءان، فلا يفترق الرقمان (الثابت ⑨).
     ⚠️ ولا errBox لفشلها: refreshCounts تُبقي العدد القديم عمداً ولا
        تصفّره (ui.js)، فليس ثمّ خطأٌ يُعرض. وكان هنا صندوقٌ يقرأ
        متغيّراً زال مع نقل الجلب في b65 — صمتٌ في المتصفّح لا في
        الشاشة، وهذا موضعُ زواله لا رقعتُه. */
  await refreshCounts();

  /* الشريط يُبنى قبل الترويسة: وجودُه يغيّر ما تقوله. */
  const strip = todayStrip();
  head("أهلًا " + S.prof.full_name,
       strip ? "ابدأ بما ينتظرك، أو اختر مادة" : "اختر المادة التي تريد التعلّم فيها");

  /* ثلاث مجموعات: صفّي · صفوف سابقة · مهارات */
  const grade  = S.subjects.filter(x => x.group_key === '1_grade');
  const past   = S.subjects.filter(x => x.group_key === '2_past');
  const skills = S.subjects.filter(x => !['1_grade','2_past'].includes(x.group_key));

  /* الشكلُ بموضع المادة في القائمة الكاملة لا في مجموعتها: لو عُدَّ
     داخل كلّ مجموعة لبدأت الثلاثُ بالدائرة نفسها في شاشةٍ واحدة. */
  const shapeOf = x => shape(S.subjects.indexOf(x));

  const face = x => `<div class="sh-wrap">${shapeOf(x)}<span
      class="sh-icon">${esc(x.icon || '')}</span></div>`;

  const card = (x, isPast) => {
    const empty = !x.needs_placement && bulk(x) === 0;
    const pct   = x.lessons_total ? Math.round(x.lessons_done / x.lessons_total * 100) : 0;
    /* نصٌّ قصير: البطاقة ١٥٠px، وجملةٌ كاملة تلتفّ ثلاثة أسطر فتتفاوت
       ارتفاعاتُ الشبكة. والجملةُ الطويلة باقيةٌ حيث يقع الفعل —
       في toast عند النقر، وفي شاشة المادة. */
    const meta  =
        empty             ? 'قيد الإعداد'
      : x.needs_placement ? 'اعرف مستواك'
      : isPast            ? `${AR(x.lessons_review)} للمراجعة`
      : `${AR(x.lessons_done)} / ${AR(x.lessons_total)} درساً`;
    /* ⚠️ ولا شارةَ «قريباً»: البطاقةُ الفارغة تحمل أصلاً حدّاً متقطّعاً
       وبهتاناً وشكلاً رمادياً و«قيد الإعداد» — خمسُ إشاراتٍ لمعنىً
       واحد في ١٥٠px. والإفراطُ في الإشارة يُدرِّب على تجاهلها. */
    const tags = [
      x.my_level && !isPast ? `<span class="lvl-tag">${esc(x.my_level)}</span>` : '',
      x.elective            ? '<span class="badge lock">اختيارية</span>'        : ''
    ].filter(Boolean).join('');

    /* 🔑 الوصفُ في title لا على الوجه: سطران فيه يُطيلان البطاقة حتى
       تفقد الشبكةُ انتظامها — وانتظامُها هو ما يجعل الشكل واللون
       يُقرآن بلمحة. ولم يُحذف: يظهر بالمرور ويقرؤه قارئُ الشاشة،
       وموضعُه الطبيعيّ شاشةُ المادة نفسها.
       ⚠️ والفارغة بلا role ولا tabindex: ليست زرّاً فلا تُعلن زرّاً،
          ولا تُلتقط بالتنقّل بلوحة المفاتيح إلى بابٍ لا يُفتح. */
    return `<div class="subj ${subjectState(x, isPast)} ${empty ? 'soon' : ''}"
                 data-i="${x.id}" ${empty ? '' : 'role="button" tabindex="0"'}
                 ${x.description ? `title="${esc(x.description)}"` : ''}>
      ${face(x)}
      <div class="subj-t" dir="auto"><bdi>${esc(x.name)}</bdi></div>
      ${tags ? `<div class="subj-b">${tags}</div>` : ''}
      <div class="subj-m">${meta}</div>
      ${(x.needs_placement || empty || isPast) ? '' :
        `<div class="pbar"><div class="pfill" style="width:${pct}%"></div></div>`}
    </div>`;
  };

  /* المكتملة تنكمش إلى سطر يحمل نتيجتها — لا تختفي.
     وتحتفظ بشكلها مصغَّراً: الهويةُ لا تسقط بالإتمام. */
  const mini = x => `<div class="subj mini st-done" data-i="${x.id}"
                          role="button" tabindex="0">
      ${face(x)}
      <div style="flex:1;min-width:0"><div class="subj-t" dir="auto"><bdi>${esc(x.name)}</bdi></div></div>
      <div class="qz-go">${AR(x.lessons_done)} / ${AR(x.lessons_total)}</div>
    </div>`;

  const live = grade.filter(x => !isDone(x));
  const done = grade.filter(isDone);

  app.innerHTML = `
    ${strip}
    ${grade.length?`<div class="grp">📚 موادّ صفّي</div>
      ${live.map(x => card(x,false)).join("")}
      ${done.length?`<div class="fold-lbl">أتممتها · ${AR(done.length)}</div>${done.map(mini).join("")}`:''}`:''}

    ${past.length?`<div class="grp fold" id="pastHdr">🔄 موادّ صفوف سابقة
        <span class="chip">${AR(past.length)}</span><span class="caret">▾</span></div>
      <div id="pastBox" hidden>${past.map(x => card(x,true)).join("")}</div>`:''}

    ${skills.length?`<div class="grp">🚀 طوّر مهاراتك</div>${skills.map(x => card(x,false)).join("")}`:''}

    ${!S.subjects.length?`<div class="card" style="text-align:center;padding:28px">
        <div style="font-size:2rem;margin-bottom:10px">📚</div>
        <div class="rev-q">لا توجد مواد متاحة بعد</div>
        <div class="line">موادّ صفّك وتدريبات المهارات قيد الإعداد — ستظهر هنا فور جهوزها.</div>
      </div>`:''}`;

  /* البطاقة صارت role=button ⇒ لها لوحةُ المفاتيح كما لها الفأرة.
     ولا div بلا هذا: الطالبُ الذي لا يستعمل فأرةً يقف عند الرئيسة. */
  app.querySelectorAll(".subj").forEach(el => {
    const go = () => {
      const x = S.subjects.find(v => String(v.id) === el.dataset.i);
      if(!x) return;
      if(!x.needs_placement && bulk(x) === 0){
        toast("دروس هذه المادة قيد الإعداد — ستصلك عند جهوزها"); return; }
      if(x.needs_placement) return startPlacement(x);
      if(!x.mentor_chosen)  return loadMentors(x);
      loadLessons(x);
    };
    el.onclick   = go;
    el.onkeydown = e => { if(e.key === 'Enter' || e.key === ' '){ e.preventDefault(); go(); } };
  });

  /* ⚠️ زرُّ «تابِع» يُعيد قراءة المادة لا يلتقطها من الإغلاق: بين
     الرسم والنقر قد تُعاد الشبكةُ، فمرجعٌ قديم يفتح دروساً قديمة. */
  const on = (id, fn) => { const el = document.getElementById(id); if(el) el.onclick = fn; };
  on('go-resume', () => { const x = lastSubject(); if(x) loadLessons(x); else loadList(); });
  on('go-cards',  loadFlashcards);
  on('go-fb',     loadFeedback);

  const ph = document.getElementById("pastHdr");
  if(ph) ph.onclick = ()=>{
    const box = document.getElementById("pastBox");
    box.hidden = !box.hidden;
    ph.classList.toggle('open', !box.hidden);
  };

  scrollTop();
}

/* ═══════════ ①ب وجهةُ نتيجة البحث ═══════════
   تُسجَّل في auth.js عند ui.registerSearch — فتبقى ui.js ورقةً لا تعرف
   الشاشات، وتبقى المعرفةُ بالتنقّل حيث تسكن الشاشات.

   🔓 ودَينٌ معلَن — المهبط دقيقٌ في اثنين وخشنٌ في اثنين:
     درسٌ ومصدر ⇒ **الدرس نفسه** يُفتح (المصدر يسكن فيه فيُرى بفتحه).
     بطاقةٌ وإجابة ⇒ الشاشةُ العامّة، لا الصفُّ بعينه — لأنّ الهبوطَ
       الدقيق يقتضي تصديرَ openSubjectCards من flashcards.js وفتحَ
       محاولةٍ بعينها في analytics.js، وليس أيٌّ منهما مصدَّراً اليوم.
       والصفُّ نفسه يحمل ما يحتاجه الطالب (وجهُ البطاقة ومعناها ·
       السؤال وتشخيصه)، فالنقرةُ استزادةٌ لا كشف. ⇒ يُحسَّن حين
       يُصدَّر البابان، ولا يُكتب لهما بابٌ ثانٍ هنا. */
export async function openSearchHit(hit){
  if(!hit) return;

  if(hit.kind === 'card') return loadFlashcards();
  if(hit.kind === 'answer'){
    /* استيرادٌ كسول كما في startPlacement — analytics.js وحدةٌ ثقيلة
       (Chart.js) ولا يدفع ثمنَها من لم يفتحها. */
    const { loadMyPerformance } = await import('./analytics.js');
    return loadMyPerformance();
  }

  /* الشبكةُ قد تكون فارغةً إن دخل الطالب من رابطٍ مباشر ولم يمرّ بالرئيسة */
  if(!(S.subjects || []).length){
    const { data } = await api.listSubjects();
    S.subjects = data || [];
  }
  const subj = (S.subjects || []).find(v => String(v.id) === String(hit.subject_id));
  if(!subj || !hit.lesson_id) return loadList();

  const { data, error } = await api.listLessons(subj.id);
  if(error){ toast('تعذّر فتح الدرس'); return loadLessons(subj); }

  /* الترتيبُ لازم: openLesson تقرأ S.subj و S.lessons ولا تجلبهما */
  S.subj = subj; S.lessons = data || [];
  rememberSubject(subj);
  const l = S.lessons.find(v => String(v.id) === String(hit.lesson_id));

  /* 🔒 ولا يُلتَفّ على القفل: البحث يكشف ما يراه الطالب، والرؤيةُ
     ليست الإتاحة. درسٌ مقفل يُقال سببُه وتُعرض قائمتُه. */
  if(!l)        return loadLessons(subj);
  if(l.locked){ toast(l.reason || 'هذا الدرس غير متاح بعد'); return loadLessons(subj); }
  openLesson(l);
}

/* ═══════════ ② الانضمام إلى معلم ═══════════ */

export async function loadMentors(subj, switching){
  S.subj = subj;
  nav('subjects');
  head(switching?"الانضمام إلى معلم آخر":"اختر معلمك", subj.name);
  app.innerHTML = skeleton('mentors');

  const [mRes, sRes] = await Promise.all([
    api.listMentors(subj.id),
    api.myMentor(subj.id)
  ]);
  const mentors = mRes.data || [], state = sRes.data || {};
  const eMentor = mRes.error || sRes.error;

  if(switching && !state.can_switch){
    app.innerHTML = `
      <div class="crumb" id="bk">← رجوع</div>
      <div class="warnbox" style="font-size:.85rem">
        <b style="font-family:'Almarai';font-weight:800;display:block;margin-bottom:6px">
          فرص الانتقال في هذه المادة استُوفيت</b>
        الاستمرار مع معلم واحد يمنحه صورة أوضح عن تقدّمك، ويجعل متابعته لك أدق.
        اعرض ما يشكل عليك على معلمك الحالي — فهو الأقدر على مساعدتك.</div>
      <div class="nav"><button class="btn primary" id="go">متابعة الدروس</button></div>`;
    document.getElementById("bk").onclick = loadList;
    document.getElementById("go").onclick = ()=>loadLessons(subj);
    return;
  }

  const card = m => `
    <div class="mentor ${m.full?'full':''} ${state.teacher_id===m.id?'cur':''}" data-t="${m.id}">
      <div class="m-n">أ. ${esc(m.name)}
        ${state.teacher_id===m.id?'<span class="badge on">معلمك الحالي</span>':''}</div>
      <div class="m-m">${esc(m.school||'—')}${m.years?` · ${AR(m.years)} سنوات خبرة`:''}</div>
      ${m.bio?`<div class="m-b">${esc(m.bio)}</div>`:''}
      <span class="m-cap">${m.full?'اكتمل النصاب':`يتابع ${AR(m.students)} من ${AR(m.capacity)} طالباً`}</span>
    </div>`;

  app.innerHTML = `
    <div class="crumb" id="bk">← رجوع للمواد</div>
    ${errBox(eMentor,'قائمة المعلمين')}
    <div class="warnbox">
      المعلم الذي تنضم إليه سيتابع تقدّمك في هذه المادة، ويصحّح إجاباتك المقالية،
      ويجيب عن أسئلتك.
    </div>
    ${mentors.length?mentors.map(card).join(""):''}
    <div class="mentor self" data-t="">
      <div class="m-n">📖 المتابعة الذاتية</div>
      <div class="m-m">${mentors.length
        ? 'تدرس بنفسك، ويمكنك الانضمام إلى معلم متى شئت'
        : 'لم ينضم معلمون لهذه المادة بعد — ابدأ بنفسك وسنُعلمك عند توفّرهم'}</div>
    </div>`;

  document.getElementById("bk").onclick = loadList;
  app.querySelectorAll(".mentor").forEach(el=>el.onclick=async()=>{
    if(el.classList.contains('full')){ toast("اكتمل نصاب هذا المعلم — اختر معلماً آخر"); return; }
    const tid = el.dataset.t || null;
    if(tid && tid !== state.teacher_id){
      const name  = (mentors.find(x=>x.id===tid)||{}).name || 'هذا المعلم';
      const tried = state.teachers_tried || 0;

      let msg = `هل ترغب في الانضمام إلى أ. ${name} في مادة «${subj.name}»؟`;
      if(tried === 1) msg += "\n\nبعد هذا الانضمام تبقى لك فرصة واحدة للانضمام إلى معلم آخر.";
      else if(tried >= 2) msg += "\n\nهذه آخر فرصة — لن تتمكن بعدها من الانضمام إلى معلم آخر في هذه المادة.";

      if(!confirm(msg)) return;
    }

    const { data:r, error } = await api.chooseMentor(subj.id, tid);
    if(error){ toast(error.message); return; }
    if(!r.ok){ toast(r.error); return; }

    toast(r.self_study ? "ستتابع دروسك بنفسك" : "انضممتَ إلى أ. "+r.teacher);
    subj.mentor_chosen = true; subj.mentor_name = r.teacher || null;
    loadLessons(subj);
  });
  scrollTop();
}

/* ═══════════ ③ دروس المادة ═══════════ */

export async function loadLessons(subj){
  S.subj = subj;
  /* الأثرُ يُكتب هنا لا في openLesson: المادةُ هي وحدةُ الاستئناف،
     ودرسٌ بعينه قد يُتمّ فيصير «تابِع» يفتح ما فُرغ منه. */
  rememberSubject(subj);
  nav('subjects');
  head(subj.name, subj.my_level ? "مستواك: "+subj.my_level : "");
  app.innerHTML = skeleton('rows');

  const { data, error } = await api.listLessons(subj.id);
  if(error){ app.innerHTML = `<div class="err"><b>تعذّر التحميل</b>${esc(error.message)}</div>`; return; }
  S.lessons = data || [];

  // تجميع حسب المستوى
  const groups = {};
  S.lessons.forEach(l=>{ (groups[l.level||'—'] ||= []).push(l); });

  const lcard = l => `
    <div class="lsn ${l.locked?'locked':''} ${l.done?'done':''}" data-i="${l.id}">
      <div class="lsn-t" dir="auto">${esc(l.title)}
        ${l.done?'<span class="badge ok">أُنجز'+(l.best!=null?' '+AR(l.best)+'٪':'')+'</span>':''}
        ${l.locked?'<span class="badge lock">🔒</span>':''}</div>
      ${l.summary?`<div class="lsn-m">${esc(l.summary)}</div>`:''}
      <div class="chips">
        ${(l.items||[]).map(i=>`<span class="chip ${i.is_graded?'g':''}">${ICONS[i.kind]||'•'} ${esc(i.title)}</span>`).join("")}
      </div>
      ${l.locked?`<div class="lockmsg">${esc(l.reason||'')}</div>`:''}
    </div>`;

  app.innerHTML = `
    <div class="crumb" id="bk">← رجوع للمواد</div>
    <div class="nav" style="margin-bottom:14px">
      <button class="btn ghost" id="mnt" style="font-size:.8rem;padding:9px">
        ${subj.mentor_name
            ? '👤 معلمك: أ. '+esc(subj.mentor_name)+' · الانضمام إلى معلم آخر'
            : '👤 الانضمام إلى معلم'}
      </button>
    </div>
    ${Object.keys(groups).map(g=>`
      ${Object.keys(groups).length>1?`<div class="grp">${esc(g)}</div>`:''}
      ${groups[g].map(lcard).join("")}`).join("")}
    ${!S.lessons.length?'<div class="status">لا توجد دروس في هذه المادة بعد</div>':''}`;

  document.getElementById("bk").onclick  = loadList;
  document.getElementById("mnt").onclick = ()=>loadMentors(subj, true);
  app.querySelectorAll(".lsn").forEach(el=>el.onclick=()=>{
    const l = S.lessons.find(v=>String(v.id)===el.dataset.i);
    if(l.locked){ toast(l.reason||"هذا الدرس غير متاح بعد"); return; }
    openLesson(l);
  });
  scrollTop();
}

/* ═══════════ ④ الدرس ومصادره ═══════════ */

/* صيغ الصوت التي يشغّلها عنصر audio مباشرة.
   ⚠️ الرابط الخارجي (يوتيوب · Drive) لا يُشغَّل داخلياً — صفحةٌ لا ملف.
      فيبقى له السلوك القديم: يُفتح في تبويب. وهذا انحدارٌ لطيف
      لا كسر: المحتوى القديم يعمل كما كان، والجديد يكسب المشغّل. */
const AUD_RX = /\.(mp3|m4a|ogg|wav|aac)(\?|#|$)/i;

function canEmbed(i){
  if(!i.url || !['audio','recording'].includes(i.kind)) return false;
  return isManaged(i.url) || AUD_RX.test(i.url);
}

/* 🆕 b87 · نسبةُ المصدر — مَن كتبه، وهل اعتمدته بيان.
   🔑 والشارة تُضاف ولا تُبدِّل: «بيان» بجانب اسم المؤلّف لا مكانه.
      فالاعتمادُ حكمٌ على المادّة، ولا يمحو مَن ألّفها — ولو حلَّ
      محلَّه لَما عرف الطالبُ لمن يعود بالسؤال.
   ⚠️ ولا لونَ لها: الاعتماد ليس «أصبتَ» ولا «اضغط هنا»، فليس له
      عائلةُ معنًى — ومحايدٌ بنصّه أصدق من أخضرَ يُضعف الأخضر حيث
      يُحكَم به فعلاً (طبقة الأدوار في base.css).
   ومصادرُ المنصّة لا author لها أصلاً، فتمرّ بلا سطر. */
const credit = i => !i.author ? ''
  : ` · أ. ${esc(i.author)}`
  + (i.from_my_mentor ? ' · معلّمك'       : '')
  + (i.reviewed       ? ' · اعتمدته بيان' : '')
  + (i.draft          ? ' · مسودّة'       : '');

/* صفٌّ واحد للرسميّ وللإضافة — ونسختان تتفارقان دائماً. */
const itmRow = i => `
      <div class="itm ${i.kind==='quiz'?'quiz':''}" data-i="${i.id}">
        <div class="itm-ic">${ICONS[i.kind]||'•'}</div>
        <div style="flex:1">
          <div class="itm-t" dir="auto">${esc(i.title)}</div>
          <div class="itm-m">${KINDS[i.kind]||i.kind}
            ${i.duration?` · ${AR(i.duration)} دقيقة`:''}
            ${i.is_graded?' · يُحتسب في النتيجة':''}
            ${i.required&&!i.is_graded?' · إلزامي':''}${credit(i)}</div>
        </div>
        <div class="itm-s" data-s="${i.id}">${i.status==='completed'?'✅'
          :((canEmbed(i)||isSim(i))?'▶':(i.kind==='quiz'?'←':'↗'))}</div>
      </div>
      ${(canEmbed(i)||isSim(i))?`<div class="embed-slot" id="slot-${i.id}"></div>`:''}`;

export function openLesson(l){
  S.lesson = l;
  nav('subjects');
  head(l.title, l.unit || S.subj.name);

  /* 🆕 b87 · extras كانت تصل من list_lessons منذ زمنٍ ولا تُرسم —
     فما يؤلّفه المعلّم لا يبلغ طالبه. عطلٌ صامت لم يظهر لأنّ
     التأليف كان مقفلاً على المدير (SQL 115). */
  const items  = (l.items  || []);
  const extras = (l.extras || []);
  /* والعدّاد للرسميّ وحده: الإضافة «إثراء لا يحجب» — لا تدخل
     البوّابة، فلا تُحسب في مقامها وإلا نقصت نسبةُ طالبٍ لأنّ
     معلّمه أضاف مصدراً. */
  const done   = items.filter(i=>i.status==='completed').length;

  app.innerHTML = `
    <div class="crumb" id="bk">← ${esc(S.subj.name)}</div>
    ${l.summary?`<div class="card"><div class="line" style="color:var(--text)">${esc(l.summary)}</div></div>`:''}
    <div class="grp">📦 مصادر الدرس <span class="chip">${AR(done)} / ${AR(items.length)}</span></div>
      ${items.map(itmRow).join("")}
    ${!items.length?'<div class="status">لم تُضف مصادر لهذا الدرس بعد</div>':''}
    ${extras.length?`<div class="grp" style="margin-top:22px">➕ إضافات المعلمين
        <span class="chip">${AR(extras.length)}</span></div>
      ${extras.map(itmRow).join("")}`:''}
    <p class="hint">تحتاج ${AR(l.pass_mark)}٪ في الاختبار لإتمام الدرس</p>`;

  document.getElementById("bk").onclick = ()=>loadLessons(S.subj);
  /* البحثُ في الاثنين معاً — وقصرُه على items كان يُسقط كلَّ نقرةٍ
     على إضافةٍ في undefined بلا رسالة. */
  const all = items.concat(extras);
  app.querySelectorAll(".itm").forEach(el=>el.onclick=()=>{
    const i = all.find(v=>String(v.id)===el.dataset.i);
    openItem(i);
  });
     /* بطاقاتُ الدرس — تُلحَق بعد الرسم فلا تؤخّر ظهورَه.
     🔑 وليست «مصدراً» يُستهلك: مصادرُ الدرس تُفتح وتُقرأ، والبطاقةُ
     تُؤخَذ فتلازم الطالب أسابيع. ⇒ نوعٌ بصريٌّ آخر، لا صفٌّ مثلها. */
  loadLessonDeck(l);
  scrollTop();
}

export async function openItem(i){
  if(i.kind==='quiz' && i.quiz_id){
    api.markItemOpened(i.id);
    return startQuiz({ id:i.quiz_id, item_id:i.id });
  }

  /* صوتٌ نملك ملفه ⇒ يُسمع في مكانه. الطالب لا يغادر الدرس. */
  if(canEmbed(i)) return toggleAudio(i);

  /* محاكاةٌ ⇒ تُفتح في مكانها بإطارٍ معزول، لا في تبويب. */
  if(isSim(i)) return openSim(i);

  if(i.url){
    window.open(i.url,'_blank','noopener');
    await api.markItemCompleted(i.id);
    i.status = 'completed';
    toast("سُجّل اطّلاعك على المصدر");
    openLesson(S.lesson);
    return;
  }
  toast("هذا المصدر غير متاح بعد");
}

/* ── مشغّل الصوت ──
   ثلاث حاجات تعليمية تُملي التصميم:
     ① الإعادة المضبوطة — جوهر تمرين الاستماع: أعد المقطع، لا الدرس
     ② خفض السرعة — يمنح الأذن زمناً لتفكيك الكلام
     ③ ألّا يغادر الطالب الصفحة — فالسياق جزءٌ من الفهم
   ولا تشغيل تلقائيّ: الصوت المباغت يُخرج المتعلّم من قصده. */
function toggleAudio(i){
  const slot = document.getElementById("slot-"+i.id);
  if(!slot) return;

  /* نقرةٌ ثانية تطوي — والطيّ يوقف الصوت لأن العنصر يُزال */
  if(slot.firstChild){ slot.innerHTML = ""; return; }

  const src = mediaUrl(i.url);
  if(!src){ toast("تعذّر الوصول إلى الملف"); return; }

  api.markItemOpened(i.id);

  slot.innerHTML = `
    <div class="aud">
      <audio class="aud-p" controls preload="metadata"></audio>
      <div class="aud-row">
        <button class="aud-b" data-a="back">⟲ ١٠ ثوانٍ</button>
        <button class="aud-b" data-a="rate">السرعة ١٫٠×</button>
        <span class="aud-note"></span>
      </div>
    </div>`;

  const au   = slot.querySelector("audio");
  const note = slot.querySelector(".aud-note");

  /* ⚠️ الرابط يُسنَد خاصيةً لا يُدرَج في HTML.
     esc() تهرّب & و< فقط، وعلامة اقتباسٍ في رابطٍ قديم تكسر
     الوسم وتفتح باب حقنٍ. الإسناد لا يمرّ بمحلّل HTML أصلاً. */
  au.src = src;

  /* مشغّلٌ واحد يعمل في الصفحة — صوتان معاً لا يُفهم منهما شيء */
  au.onplay = () => document.querySelectorAll("audio").forEach(o=>{ if(o!==au) o.pause(); });

  au.onerror = () => {
    note.className = "aud-err";
    note.textContent = "تعذّر تشغيل الملف — أبلغ معلّمك";
    console.warn("[media] فشل التشغيل:", i.url, "→", src);
  };

  /* التسجيل عند الانتهاء لا عند الفتح:
     «فتحَ» ليست «سمعَ»، وإشارةٌ كاذبة أسوأ من إشارةٍ ناقصة. */
  au.onended = async () => {
    note.textContent = "سُجّل استماعك ✅";
    if(i.status === 'completed') return;
    const { error } = await api.markItemCompleted(i.id);
    if(error){ note.textContent = "لم يُسجَّل — تحقّق من الاتصال"; return; }
    i.status = 'completed';
    const s = document.querySelector(`[data-s="${i.id}"]`);
    if(s) s.textContent = '✅';
  };

  const RATES = [1, 0.75, 1.25];
  let r = 0;

  slot.querySelector('[data-a="back"]').onclick = () => {
    au.currentTime = Math.max(0, au.currentTime - 10);
    au.play();
  };

  slot.querySelector('[data-a="rate"]').onclick = e => {
    r = (r + 1) % RATES.length;
    au.playbackRate = RATES[r];
    e.target.textContent = "السرعة " + AR(String(RATES[r].toFixed(2))).replace(".","٫") + "×";
  };
}

/* ═══════════ ⑤ ملاحظات المعلم ═══════════ */

export async function loadFeedback(){
  nav('feedback'); head("ملاحظات معلمي", S.prof.full_name);
  app.innerHTML = skeleton('rows');
  const { data, error } = await api.myFeedback(S.user.id);

  const list = data || [];
  app.innerHTML = `
    ${errBox(error,'ملاحظات المعلم')}
    ${list.length?list.map(f=>`
      <div class="rev ${f.read_by_student?'':'new'}">
        <div class="rev-q">${esc(f.quizzes?.title||'')} ${f.read_by_student?'':'<span class="badge lock">جديد</span>'}</div>
        <div class="line">${new Date(f.submitted_at).toLocaleDateString('ar-EG')} · اختيار ${AR(f.score)}/${AR(f.total)} (${AR(f.pct)}٪)${f.essay_score!=null?` · مقالي: ${AR(f.essay_score)}`:''}</div>
        <div class="model">${esc(f.teacher_comment).replace(/\n/g,"<br>")}</div>
      </div>`).join(""):'<div class="status">لا توجد ملاحظات بعد</div>'}`;

  /* 🔴 الصمتُ كان العطل: update بلا صفوف ولا خطأ، فبقي الرقم لا يسكت (106).
     الآن: الفشل يُقال للطالب، والفرقُ في العدد يُسجَّل للمطوّر وحده —
     فقد يسبق تبويبٌ آخر إلى بعضها، وإنذارٌ كاذبٌ للطالب أسوأ من لا إنذار. */
  const unread = list.filter(f=>!f.read_by_student).map(f=>f.id);
  if(unread.length){
    const { data:n, error:eMark } = await api.markFeedbackRead(unread);
    if(eMark) toast("تعذّر تسجيل قراءتك — ستبقى الملاحظات «جديدة» حتى تنجح");
    else if(n !== unread.length)
      console.warn("[feedback] عُلِّم", n, "من", unread.length);
    refreshCounts();          // الشارة تنطفئ في الشريط لا في هذه الشاشة وحدها
  }
}

/* ═══════════ ⑥ مراسلة المعلم ═══════════ */

export async function loadChat(){
  nav('chat'); head("مراسلة المعلم", S.prof.full_name);
  app.innerHTML = skeleton('rows');
  const { data, error } = await api.studentThread(S.user.id);
  renderChat(data || [], error);
  await api.studentReadsThread(S.user.id);
  refreshCounts();
}

function renderChat(msgs, error){
  app.innerHTML = `
    ${errBox(error,'المحادثة')}
    ${msgs.length?`<div class="chat">${msgs.map(m=>bubble(m,m.sender_role==='student')).join("")}</div>`
      :'<div class="status">لا توجد رسائل بعد — اكتب سؤالك أدناه</div>'}
    <div class="card"><label class="fl">رسالتك</label>
      <textarea id="mt" placeholder="اكتب سؤالك العلمي…"></textarea></div>
    <div class="nav"><button class="btn primary" id="snd">إرسال</button></div>`;
  document.getElementById("snd").onclick = async ()=>{
    const t = (document.getElementById("mt").value||"").trim();
    if(!t){ toast("اكتب رسالتك أولاً"); return; }
    const { error } = await api.sendMessage({
      studentId:S.user.id, senderId:S.user.id, senderRole:'student', body:t });
    toast(error?"تعذّر الإرسال":"أُرسلت رسالتك"); loadChat();
  };
  scrollBottom();
}

/* اختبار تحديد المستوى — أداةٌ قائمة بذاتها، لا درسَ لها ولا مقرَّر */
async function startPlacement(x){
  if(!x.tool){ toast("اختبار تحديد المستوى قيد الإعداد"); return; }
  app.innerHTML = skeleton('screen');
  const { data, error } = await api.placementStart(x.tool);
  if(error){ app.innerHTML = errBox(error.message, 'تحديد المستوى'); return; }
  if(!data.ok){ toast(data.error); loadList(); return; }
  const { startPlacementQuiz } = await import('./quiz.js');
  startPlacementQuiz(data.session, data.quiz, x, data.resumed);
}

/* ═══════════ بطاقات الدرس — مصدرٌ ثابت لا فعلٌ يقع مرّة ═══════════ */

const DECK_SVG = `<svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
  <rect x="3"  y="7"  width="12" height="14" rx="2.5" stroke="currentColor"
        stroke-width="1.6" opacity=".35"/>
  <rect x="6.5" y="4.5" width="12" height="14" rx="2.5" stroke="currentColor"
        stroke-width="1.6" opacity=".6"/>
  <rect x="10" y="2"  width="12" height="14" rx="2.5" fill="currentColor"
        fill-opacity=".1" stroke="currentColor" stroke-width="1.6"/>
</svg>`;

async function loadLessonDeck(l){
  let deck;
  try{
    const { data } = await api.subjectDecks(S.subj.id);
    deck = (data || []).find(d => !d.mine &&
             String(d.lesson_id) === String(l.id) && d.cards > 0);
  }catch(e){ return; }
  if(!deck || S.lesson?.id !== l.id) return;   // غادر الدرس قبل أن يصل الردّ

  const host = document.createElement('div');
  host.className = 'deck-card';
  host.setAttribute('role', 'button');
  host.tabIndex = 0;
  host.innerHTML = `
    <div class="deck-ic">${DECK_SVG}</div>
    <div class="deck-txt">
      <div class="deck-t">${esc(deck.title)}</div>
      <div class="deck-m">${AR(deck.cards)} بطاقة · تعود إليك بالتباعد</div>
    </div>
    <div class="deck-go">←</div>`;

  const anchor = app.querySelector('.hint');
  anchor ? anchor.before(host) : app.append(host);

  const open = () => openLessonDeck(
    { id: S.subj.id, name: S.subj.name },
    { ...deck, lesson: l.title },
    () => openLesson(l));                       // العودة إلى الدرس لا إلى «تذكّرها»

  host.onclick = open;
  host.onkeydown = e => { if(e.key === 'Enter' || e.key === ' '){ e.preventDefault(); open(); } };
}
