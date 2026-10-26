/* ══════════════════════════════════════════════════════════
   بيان — student.js
   المواد ← اختيار المعلم ← الدروس ← مصادر الدرس
   + ملاحظات المعلم ومراسلته

   ⚠️ الدوال المصدَّرة بـ function لا const — لأجل الاستيراد الدائري.
   ══════════════════════════════════════════════════════════ */
import * as api from './api.js';
import { S } from './state.js';
import { app, head, toast, esc, escA, AR, ICONS, KINDS, bubble, errBox, nav,
         refreshCounts, scrollTop, scrollBottom, shape, icon,
         skeleton, waiting, G, N, NW, fmt,
         sayable, sayGroup, bindSay, backMeta, backText, dirOf, srcOf, videoOf, siteUrl } from './ui.js';
import { startQuiz } from './quiz.js';
import { mediaUrl, isManaged, accents, speak, playAudio, narrate, voiceName, hush } from './media.js';
import { isSim, openSim } from './simulations.js';
import { openLessonDeck, loadFlashcards } from './flashcards.js';
import { canRecord, mountReading } from './recorder.js';

/* ═══════════ ① المواد — الرئيسة ═══════════ */

/* ⚠️ function لا const — كما ينصّ رأس الملفّ: هاتان صارتا في نطاق
   الوحدة لا داخل loadList (b66)، وconst في وحدةٍ داخلةٍ في استيرادٍ
   دائريّ تسقط في TDZ إن سبقها نداء. والتصريحُ يُرفَع فلا يسقط. */

/* ── المادّةُ وجهان: صفُّك · وما سبقه (b173) ──
   🔴 بلاغُ المالك (٢٣ أكتوبر): طالبُ الثاني الثانوي يفتح «English» من
      «موادّ صفّي» فيرى دروسَ الأوّل وحدها. `list_subjects` تضع المادّةَ
      كلَّها في صفّه متى كان لها فيه مقرَّر، و`list_lessons` تُرجع دروسَ
      المقرَّرين معاً — ومقرَّرُ الثاني بلا درسٍ منشور، فلم يبقَ إلا الأوّل،
      **بلا عنوانِ مستوى** (العنوانُ لا يُكتب إلا لمستويين)، والبطاقةُ
      تقول «٠ / ٠ دروس» ثمّ تفتح عشرة.
   ⇒ وجهُ الصفّ دروسُ صفّه وحدها، والوجهُ السابقُ نسخةٌ تحمل `past`
     وتسكن «موادّ صفوف سابقة» المطويّة.
   🔑 **والقسمةُ هنا لا في القاعدة:** `list_subjects` تُرسل العددين منفصلين
      (`lessons_total` · `lessons_review`)، و`list_lessons` تَسِم كلَّ درسٍ
      بـ`own_level` — فالمعرفةُ كانت واصلة، والخلطُ في العرض وحده.
   📌 وللمهارات وجهٌ واحدٌ كما كانت: مستوياتُها الأدنى سُلّمُ تدرّجٍ في
      قائمةٍ واحدة بعناوينها، لا صفٌّ مضى. */
function pastOf(x){ return { ...x, past: true }; }
/* الوجهُ الذي تُفتح به المادّةُ بلا قرينة: مادّةُ صفٍّ مضى كلُّها سابقة */
function viewOf(x){ return x.group_key === '2_past' ? pastOf(x) : x; }
/* والوجهُ المطلوب: «سابقٌ» يصدق على مادّة الصفّ وحدها — والمهاراتُ وجهٌ واحد */
function pickView(x, past){ return past && x.group_key === '1_grade' ? pastOf(x) : viewOf(x); }

/* أيسكن الدرسُ هذا الوجه؟ — بوسم القاعدة (`own_level` ⇐ `my_courses().is_current`).
   ⚠️ ووجهُ الصفّ بـ«ليس سابقاً» لا بـ«حاضرٌ صراحةً»: درسٌ وصل بلا وسمٍ
      يبقى حيث كان قبل b173، ولا يختفي من الوجهين معاً. */
function inView(x){
  if(x.past)                    return l => l.own_level === false;
  if(x.group_key === '1_grade') return l => l.own_level !== false;
  return () => true;
}

/* ما في الوجه من دروس — وفيه يُقاس «الفراغ».
   ⚠️ ووجهُ الصفّ لا يستعير دروسَ ما مضى: كان يجمع العددين فلا يفرغ ما دام
      للمادّة صفٌّ سابق — وهو بعينه ما أظهر دروسَ الأوّل في «صفّي» (b173). */
function bulk(x){
  if(x.past) return x.lessons_review || 0;
  if(x.group_key === '1_grade') return x.lessons_total || 0;
  return (x.lessons_total || 0) + (x.lessons_review || 0);
}

/* ⚠️ lessons_total > 0 شرط لازم: بدونه تُطوى المواد الفارغة
   بوسم «أتممتها» — إذ 0 === 0 صحيح.
   📌 والوجهُ السابقُ لا يُتَمّ: مراجعةٌ لا مسار (b173). */
function isDone(x){ return !x.past && x.lessons_total > 0 && x.lessons_done >= x.lessons_total; }

/* ── أين تركتَ؟ ──
   🔑 محلّيٌّ لا في القاعدة عمداً: هذا **تسهيلٌ لا سجلّ**. لو سكن
      القاعدة لاحتاج جدولاً وسياسةَ RLS ونداءً في كلّ إقلاع — ثمنٌ
      لا يقابله إلا سطرٌ واحد في الشاشة. وثمنُه المقبول أنه يُفقد
      بتبديل الجهاز أو مسح البيانات، والبديلُ حينها هو الرئيسةُ
      نفسها تحته مباشرة. ⇒ غيابُه لا يمنع فعلاً.
   ⚠️ وlocalStorage يرمي في التصفّح الخاصّ ⇒ try في الطرفين. */
const LAST_KEY = 'bayan.last';

/* 🆕 b173 · والوجهُ يُحفظ مع المادّة: «متابعة» تعود إلى ما كان يُدرَس —
   دروسِ صفّه أو مراجعةِ ما سبقه — لا إلى وجهٍ آخر للمادّة نفسِها.
   🆕 b176 · **ومعهما الدرسُ التالي** ({id, title}) — تسمّيه بطاقةُ «متابعة» في الرئيسة
      وتفتحه، بلا نداء شبكة (التعليلُ عند `resumeCard`). ويُكتب حيث تُجلب الدروس
      (`loadLessons` · `openLessonAt`) لا حيث تُرسم: الرسمُ يتبع تصفيةَ الفرع، والمحفوظُ
      تالي المادّة كلِّها.
   ⚠️ **ومن لا يعرفه يُبقيه ولا يمحوه:** `loadLessons` تكتب المادّةَ قبل الجلب، فلو محت
      التاليَ لأفقر فشلُ الشبكة بطاقةَ الرئيسة من اسمٍ صحيح. ⇒ `next` الغائب (undefined)
      يُبقي ما حُفظ للمادّة ووجهها نفسيهما، و`null` يقول «لا تالي» صراحةً. */
function rememberSubject(x, next){
  try{
    let keep = null;
    if(next === undefined){
      const prev = JSON.parse(localStorage.getItem(LAST_KEY) || 'null');
      if(prev && String(prev.id) === String(x.id) && !!prev.past === !!x.past) keep = prev.next || null;
    }
    const nx = next === undefined ? keep : (next && { id:next.id, title:next.title });
    localStorage.setItem(LAST_KEY, JSON.stringify({ id:x.id, past:!!x.past, next:nx }));
  }catch(e){}
}

/* 🆕 b176 · «التالي» في قائمة دروس: أوّلُ ما لم يُنجَز ولم يُقفَل — ولا تاليَ في الوجه
   السابق (مراجعةٌ لا مسار · b173). حكمُ `paint` في قائمة الدروس (b175) بحرفه، استُخرج
   حين صارت الرئيسةُ تحفظه: **وحكمان لسؤالٍ واحد يتفارقان.** */
function nextOf(subj, ls = S.lessons){
  return subj.past ? null : (ls || []).find(l => !l.done && !l.locked) || null;
}

/* تُطابَق بالقائمة الحيّة لا بما حُفظ: المادة قد تُسحب أو يتغيّر
   تسجيلُ الطالب فيها، فمعرّفٌ محفوظٌ يقود إلى بابٍ لا يُفتح.
   ⚠️ ولا تُنادى قبل أن تُملأ S.subjects.
   📌 والمحفوظُ قبل b173 بلا وجه ⇒ وجهُ المادّة بلا قرينة (`viewOf`). */
function lastSubject(){
  let saved = null;
  try{ saved = JSON.parse(localStorage.getItem(LAST_KEY) || 'null'); }catch(e){}
  if(!saved?.id) return null;
  const x = (S.subjects || []).find(v => String(v.id) === String(saved.id));
  if(!x) return null;
  return saved.past ? pastOf(x) : viewOf(x);
}

/* 🆕 b176 · والتالي المحفوظُ معها — `null` لما حُفظ قبل b176 ولمادّةٍ لا تاليَ لها.
   ⚠️ **وقد يتقادم:** يُحسب حين تُجلب الدروس، فمن أتمّ درساً ثمّ بلغ الرئيسة بلا مرورٍ
      بقائمته رأى اسمَه حتى يمرّ بها. ونتيجةُ الاختبار تعود إلى القائمة (quiz.js) فتجدّده،
      والنقرُ عليه يمرّ بحارس `openLessonAt` — فالمتقادمُ يُفتح أو يُردّ، ولا يُضلّ. */
function lastNext(){
  try{ return JSON.parse(localStorage.getItem(LAST_KEY) || 'null')?.next || null; }catch(e){ return null; }
}

/* ── صورُ الموادّ المجسّمة (b157 · b158 · b160) — والوجهُ في loadList ──
   🔑 بالمعرّف لا بالاسم (b160): الاسمُ يُعدَّل من لوحة الإدارة، فلو كان
      مفتاحاً لعادت البطاقةُ إلى الشكل المسطّح **بلا شكوى** — والصامتُ
      يُصدَّق. والمعرّفُ لا يُعدَّل. والاسمُ بجانبه للقارئ لا للشيفرة.
   📌 والمادةُ بلا صورة تلبس شكلَها ورمزَها **في الإطار نفسه وبالسلوك
      نفسه**: الصورةُ تُبدّل الوجهَ وحده.
   📌 والموادُّ العشرون كلُّها بصورة (b160). ومادةٌ جديدة تُضاف بسطر بعد
      توليد صورتها **بالأسلوب نفسه** وقصِّها بـ`tools/icon_cutout.py` —
      والطريقةُ والأوصافُ في STATE (b160).
   🔑 const آمنةٌ هنا كـLAST_KEY فوقها: لا يقرؤها إلا loadList، ولا
      تُنادى loadList وهذه الوحدةُ تُقيَّم. */
const SUBJ_IMG = {
  1: 'science',      // العلوم المتكاملة
  2: 'arabic',       // اللغة العربية       — وُلّدت من جديد b160 (هالةٌ بيضاء)
  3: 'english',      // English
  4: 'math',         // الرياضيات
  5: 'history',      // التاريخ
  6: 'philosophy',   // الفلسفة والمنطق
  7: 'reading',      // Reading Comprehension
  8: 'ielts',        // IELTS
  9: 'study',        // كيف أذاكر؟          — وُلّدت من جديد b160 (هالةٌ بيضاء)
  32: 'physics',     // الفيزياء             — b160 · Figma
  33: 'chemistry',   // الكيمياء             — b160 · Figma
  34: 'biology',     // الأحياء              — b160 · Figma
  35: 'programming', // البرمجة              — b160 · Canva
  36: 'accounting',  // المحاسبة             — b160 · Canva
  37: 'business',    // إدارة الأعمال        — b160 · Canva
  38: 'economics',   // الاقتصاد             — b160 · Canva
  39: 'psychology',  // علم النفس            — b160 · Canva
  40: 'french',      // French               — b160 · Canva
  41: 'statistics',  // الإحصاء              — b160 · Canva
  42: 'geography',   // الجغرافيا            — b160 · Canva
};

/* ── حالةُ المادة صنفاً · والألوان في screens.css عند .st-* ──
   ستٌّ لا اثنتان: «بدأتُ» ليست «أوشكتُ»، والفرقُ بينهما هو ما يجعل
   الشبكة تُقرأ بلمحة. والصفُّ السابق لا تقدُّمَ فيه يُقاس: مادّتُه
   مراجعةٌ لا مسار، فحالتُه «فيها ما يُراجَع» أو «لا». */
function subjectState(x, isPast){
  if(x.needs_stream)                      return 'st-new';   // 🆕 b194 · كتحديد المستوى — والتعليلُ عند askStream
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
      و«أين تركتَ» من الجهاز. ثلاثُ بطاقاتٍ بلا طلبٍ واحد.
   🆕 b176 · والاستئنافُ صار بطاقةً رئيسة (`resumeCard`) والاثنان عمودٌ بجانبها —
      `back` و`face` من loadList: الأوّلُ تقرؤه بطاقةُ المادّة أيضاً، والثاني وجهُها. */
function todayStrip(back, face){
  const c = S.counts || {}, acts = [];

  if((c.due || 0) > 0)
    acts.push(['go-cards',  'cards',    'ta-ok',     'استرجاع', esc(`${N(c.due,'بطاقة','بطاقتان','بطاقات','بطاقة')} استحقّت`)]);
  if((c.feedback || 0) > 0)
    acts.push(['go-fb',     'feedback', 'ta-dx',     'معالجة',  esc(N(c.feedback,'ملاحظة جديدة','ملاحظتان جديدتان','ملاحظات جديدة','ملاحظة جديدة'))]);

  /* 🆕 b194 · ومادّةٌ تنتظر شُعبتَها لا تُستأنف كالتي تنتظر مستواها: «متابعة» تتخطّى البوّابة */
  const hero = back && bulk(back) > 0 && !isDone(back) && !back.needs_placement && !back.needs_stream
             ? resumeCard(back, face) : '';
  if(!hero && !acts.length) return '';

  /* 📌 والقيمةُ تحت اسمها في `.ta-tx`: في العمود الجانبيّ تصطفّ البطاقةُ أفقيّاً،
     فلو بقي الاثنان أخوين للأيقونة لتجاورا سطراً واحداً. */
  const act = ([id, ic, fam, lbl, val]) => `
    <button class="today-act ${fam}" id="${id}">
      <span class="ta-ic">${icon(ic)}</span>
      <span class="ta-tx"><span class="ta-lbl">${lbl}</span>
        <span class="ta-val" dir="auto">${val}</span></span>
    </button>`;
  if(!hero) return `<div class="today">${acts.map(act).join('')}</div>`;
  return `<div class="today${acts.length ? ' has-side' : ''}">${hero}${
    acts.length ? `<div class="today-side">${acts.map(act).join('')}</div>` : ''}</div>`;
}

/* ── 🆕 b184 · حلقةُ الإنجاز — في عنوان «موادّ صفّي» لا في الترحيب ──
   🔑 **مجموعُ البطاقات تحتها لا نداءٌ ثانٍ:** `lessons_done / lessons_total` لموادّ الصفّ — وهو
      بعينه «الإنجاز» في الأداء منذ `179` (بابُه `lesson_progress` قِيس عليها: صفرُ فرق). فالاسمُ
      اسمُه («إنجاز»)، والعدّادُ صيغةُ البطاقات.
   ⚠️ **والنسبةُ المكتوبة عددٌ صحيح، والقوسُ بمنزلته العشريّة:** `AR()` تُبقي النقطةَ اللاتينيّة،
      و«١٣.٢» بأرقامٍ هنديّة تُقرأ «١٣٠٢» — علّةُ «·» بعينها (b179). والأداءُ يكتبها كذلك اليوم:
      بابُها `AR()` نفسُها لا هذه الحلقة.
   🔑 **وموضعُها جوارُ ما تجمعه:** في الترحيب تنافس «متابعة» — الزرَّ الممتلئَ الوحيد — على أوّل
      نظرة، وهنا تُقرأ عنواناً لما تحتها (خطّةُ الحلقة كما اعتمدها المالك).
   📌 ولونُها سُلّمُ حالة المادّة (`subjectState`) على المجموع: الهويةُ لا تتبدّل بالموضع (b160).
   📌 و`role="img"` باسمٍ بـ«من»: «٥ / ٣٨» يقرؤها قارئُ الشاشة بشَرطتها.
   ⚠️ و`--p` المرسومُ هو النهائيّ: الحركةُ (`homeMotion`) تُضاف على صحيحٍ ولا تصنعه. */
function gradeRing(grade){
  const total = grade.reduce((s, x) => s + (x.lessons_total || 0), 0);
  const done  = grade.reduce((s, x) => s + (x.lessons_done  || 0), 0);
  if(!total) return { pct: null, html: `<div class="grp">موادّ صفّي</div>` };
  const p  = Math.round(done / total * 1000) / 10;
  const st = subjectState({ group_key: '1_grade', lessons_total: total, lessons_done: done }, false);
  const n  = NW(total,'درس','درسان','دروس','درساً');
  return { pct: p, html: `
    <div class="grp grp-ring">موادّ صفّي
      <div class="gring ${st}" role="img" style="--p:${p}" ${p ? '' : 'data-zero'}
           aria-label="الإنجاز ${AR(Math.round(p))}٪، ${AR(done)} من ${AR(total)} ${n}">
        <span class="gr-c">${AR(done)} / ${AR(total)} ${n}</span>
        <span class="gr">
          <svg viewBox="0 0 60 60" aria-hidden="true">
            <circle class="gr-bg" cx="30" cy="30" r="26" pathLength="100"/>
            <circle class="gr-fg" cx="30" cy="30" r="26" pathLength="100" transform="rotate(-90 30 30)"/>
          </svg>
          <span class="gr-t"><b class="gr-n">${AR(Math.round(p))}٪</b><span class="gr-l">إنجاز</span></span>
        </span>
      </div>
    </div>` };
}

/* ── 🆕 b184 · حركةُ الرئيسة — حركةٌ تقول شيئاً، لا زينة ──
   ① أوّلُ دخولٍ في الجلسة: البطاقاتُ تصعد متتابعة، والأشرطةُ والحلقةُ تمتلئ من الصفر.
   ② وعودةٌ بعد تقدّم: الحلقةُ من قيمتها السابقة إلى الجديدة — «تقدّمتَ» بلا كلمة.
   ③ وما سواهما بلا حركة: الرئيسةُ يُعاد إليها كثيراً، ودخولٌ يتكرّر يؤخّر ولا يُخبر (سابقةُ مشهد
      الافتتاح: مرّةً في الجلسة · `bayan.splash.seen`). ولا حركةَ دائمة: نبضٌ يشغل العينَ عن الدرس.
   ⚠️ و«تقليلُ الحركة» في الجهاز أو صفحةٌ مخفيّة ⇒ الحالةُ النهائيّة فوراً، وهي المرسومةُ أصلاً.
   ⚠️ وحارسٌ بعد ١٫٤ ثانية يُتمّ ما بقي: إطارٌ متوقّف لا يُبقي بطاقةً شفّافة ولا حلقةً على قديمها. */
function homeMotion(to){
  const calm = document.hidden || matchMedia('(prefers-reduced-motion: reduce)').matches;
  let seen = false, from = null;
  try{
    seen = sessionStorage.getItem('bayan.home.seen') === '1';
    const f = sessionStorage.getItem('bayan.home.ring');
    from = f === null ? null : Number(f);
    sessionStorage.setItem('bayan.home.seen', '1');
    if(to != null) sessionStorage.setItem('bayan.home.ring', String(to));
  }catch(e){}
  if(calm) return;

  const ring  = to != null ? app.querySelector('.gring') : null;
  const start = ring ? (seen ? from : 0) : null;
  const moves = start != null && start !== to;
  const rise  = seen ? [] : [...app.children];
  const fills = seen ? [] : [...app.querySelectorAll('.pfill')];
  if(!rise.length && !moves) return;

  const widths = fills.map(f => f.style.width);
  rise.forEach((el, i) => { el.classList.add('rise'); el.style.setProperty('--i', Math.min(i, 12)); });
  fills.forEach(f => { f.style.width = '0'; });
  if(moves) ring.style.setProperty('--p', start);
  app.getBoundingClientRect();     // البدايةُ تُحسَب قبل النهاية — وإلّا قفز الانتقالُ إليها
  fills.forEach((f, k) => { f.style.width = widths[k]; });
  if(moves){ ring.style.setProperty('--p', to); countUp(ring, start, to); }

  setTimeout(() => {
    rise.forEach(el => el.classList.remove('rise'));
    if(!moves) return;
    ring.getAnimations?.({ subtree: true }).forEach(a => { try{ a.finish(); }catch(e){} });
    const n = ring.querySelector('.gr-n');
    if(n) n.textContent = AR(Math.round(to)) + '٪';
  }, 1400);
}

/* العدُّ مع امتلاء الحلقة — بأعدادٍ صحيحة كالمكتوب (والعلّةُ عند gradeRing). واسمُ الحلقة لقارئ
   الشاشة نهائيٌّ من أوّلها: العدُّ للعين وحدها. */
function countUp(ring, from, to){
  const n = ring.querySelector('.gr-n');
  if(!n) return;
  const t0 = performance.now(), ease = k => 1 - Math.pow(1 - k, 3);
  const step = now => {
    if(!n.isConnected) return;
    const k = Math.min(1, (now - t0) / 900);
    n.textContent = AR(Math.round(from + (to - from) * ease(k))) + '٪';
    if(k < 1) requestAnimationFrame(step);
  };
  requestAnimationFrame(step);
}

/* 🆕 b176 · «متابعة» بطاقةٌ رئيسة لا ثالثةُ ثلاث — والتعليلُ عند `.today-hero` في screens.css.
   🔑 **والعنوانُ أخصُّ ما يُعرف:** الدرسُ التالي إن حُفظ (`lastNext`)، وإلّا المادّة —
      ونزلت المادّةُ حينها إلى سطر السياق فوقه: «الدرس التالي، العلوم المتكاملة».
      و«الدرس التالي» اسمٌ قائم في المنصّة (quiz.js: «والدرس التالي في متناولك»).
   🔑 والوجهُ وجهُ المادّة في الشبكة، وحالتُها صنفُها (`subjectState`) — فقاعدتُه
      البيضاويّةُ وشريطُه بلونها هناك: **الهويةُ لا تتبدّل بالموضع** (b160).
   ⚠️ و`div` بدور زرّ لا `button`: الوجهُ `div` (face)، ولا يسكن الزرَّ إلا نصٌّ مُصاغ.
      وهو نمطُ `.subj` بعينه — role و tabindex ولوحةُ المفاتيح في loadList.
   📌 والاسمُ في `<bdi>` (b173): `dir="auto"` يتخطّى ما فيها، فـ«English» لا تقلب سطرَ
      السياق `ltr`.
   🆕 b178 · **والعنوانُ `<bdi>` في سطرٍ يرث اتجاهَ البطاقة — لا `dir="auto"`.** كان
      `dir="auto"` يُقيم سطرَ «English» (أو عنوانَ درسٍ إنجليزيّاً) `ltr` فينحاز يساراً إلى
      الزرّ، وسطرا السياق والعدّاد فوقه وتحته يميناً — كتلةٌ من ثلاثة أسطر بمحاذاتين
      (لقطةُ المالك من الموقع الحيّ). ⇒ السطرُ يميناً مع أخويه، و`<bdi>` يحفظ للنصّ
      الإنجليزيّ ترتيبَه وعلامةَ استفهامه في آخره.
      ⚠️ **وليس نقضاً لقائمة الدروس:** هناك العنوانُ سطرُ بطاقته الوحيد، فيتبع لسانَه
         (b172 · b175). وهنا وسطَ كتلة، فتحكمها محاذاتُها.
   🆕 b178 · **والوجهُ السابقُ «مراجعة · صفوف سابقة» و«N دروس»** — كان «صفوف سابقة» و«N
      للمراجعة». والعددُ بلا معدودٍ فقد سياقَه هنا: في بطاقة المادّة يقع تحت «موادّ صفوف
      سابقة»، وهنا يجاور «استرجاع · ٤٠ بطاقة استحقّت» فقُرئ «عشرةُ أشياءَ تنتظرك» (سؤالُ
      المالك). وهي دروسٌ منشورة من صفٍّ مضى، خارج حساب التقدّم (`lessons_review` ·
      `list_subjects`). ⇒ الفعلُ في سطر السياق («مراجعة» — المصدرُ اسمُ الفعل · معجمُ
      الفروق: إعادةُ قراءةٍ لا بطاقةٌ استحقّت)، والمعدودُ في العدّاد. وبطاقةُ المادّة تبقى
      «N للمراجعة»: عرضُها ١٥٠px وسياقُها عنوانُ مجموعتها. وتبقى «صفوف سابقة» لئلّا تُظنّ
      مراجعةُ الأوّل رياضياتِ الصفّ الحاضر (b173).
   🆕 b179 · **والفاصلُ «،» لا «·»:** «مراجعة، صفوف سابقة» · «الدرس التالي، العلوم المتكاملة»
      — قرارُ المالك، والتعليلُ عند `joinList` في ui.js. */
function resumeCard(back, face){
  const n     = lastNext();
  const name  = `<bdi>${esc(back.name)}</bdi>`;
  const eye   = n ? `الدرس التالي، ${name}` : (back.past ? 'مراجعة، صفوف سابقة' : '');
  const done  = back.lessons_done || 0, total = back.lessons_total || 0;
  const prog  = back.past
      ? `<span>${N(back.lessons_review || 0,'درس واحد','درسان','دروس','درساً')}</span>`
      : total ? `<div class="pbar"><div class="pfill" style="width:${Math.round(done / total * 100)}%"></div></div>
                 <span>${AR(done)} / ${AR(total)} ${NW(total,'درس','درسان','دروس','درساً')}</span>` : '';
  return `
    <div class="today-hero ${subjectState(back, back.past)}" id="go-resume" role="button" tabindex="0">
      ${face(back)}
      <div class="th-tx">
        ${eye ? `<div class="th-eye">${eye}</div>` : ''}
        <div class="th-t"><bdi>${esc(n ? n.title : back.name)}</bdi></div>
        ${prog ? `<div class="th-prog">${prog}</div>` : ''}
      </div>
      <span class="th-go">متابعة</span>
    </div>`;
}

export async function loadList(){
  /* 🆕 b167 · بيتُ القسم يسمّي عنوانَه: الشاشةُ الساكتة تُبقي عنوانَ قسمها
     (ui.js · PATHS)، فلو سكتت هذه لبقي /subjects/7 فوق الرئيسة. */
  nav('subjects', '/subjects');
  /* 🆕 b139 · والترحيبُ معروفٌ قبل الجلب — فيُكتب الآن لا بعد الشبكة.
     وهو موضعُ البلاغ: كان البرواز يبقى من الشاشة السابقة حتى يصل الردّ. */
  waiting('subjects', null, "أهلاً " + S.prof.full_name, "");

  /* 🆕 b173 · ومساراتُ الصفّ معها لا بعدها — نداءان متوازيان لا متتابعان */
  const [{ data, error }, paths] = await Promise.all([api.listSubjects(), pathChoices()]);
  if(error){
    head("أهلاً "+S.prof.full_name, "");
    app.innerHTML = `<div class="err"><b>تعذّر التحميل</b>${esc(error.message)}</div>`; return; }
  S.subjects = data || [];

  /* العدد من S.counts — يملؤها refreshCounts، وهي نفسها التي يقرؤها
     الجرس. نداءٌ واحد لا نداءان، فلا يفترق الرقمان (الثابت ⑨).
     ⚠️ ولا errBox لفشلها: refreshCounts تُبقي العدد القديم عمداً ولا
        تصفّره (ui.js)، فليس ثمّ خطأٌ يُعرض. وكان هنا صندوقٌ يقرأ
        متغيّراً زال مع نقل الجلب في b65 — صمتٌ في المتصفّح لا في
        الشاشة، وهذا موضعُ زواله لا رقعتُه. */
  await refreshCounts();

  /* 🔓 b139 · وسقط وصفُ هذه الشاشة **بصيغتيه** — قرارُ صاحب المنصّة.
     أُسقطت أولاهما («اختيار المادة التي يبدأ فيها التعلّم») لأنّها تشرح
     ما يُرى، ثمّ أُسقطت الثانية («البداية بما ينتظرك، أو باختيار مادة»):
     **حشوٌ وثقيلُ الصياغة.**

     🔑 وكانت الثانيةُ قد أُبقيت بحجّة أنّها «تقول ما لا يُرى: أنّ ثَمّ
        طريقين». **والحجّةُ سقطت بالنظر لا بالجدل:** الشريطُ بطاقةٌ فيها
        أيقونةُ تشغيلٍ و«متابعة» واسمُ المادة، وتحتها عناوينُ المجموعات
        وبطاقاتُها — فالطريقان مرئيّان، **والسطرُ يصفهما بعبارةٍ أثقل
        ممّا يصف.** وهو نظيرُ أختِه لا استثناءٌ منها.

     ⚠️ وبناءُ الشريط لم يعد يسبق الترويسة لسبب — وكان يسبقها لأنّ
        «وجودَه يغيّر ما تقوله». 🆕 b176 · وانتقل إلى ما بعد `face`: بطاقةُ
        «متابعة» تلبس وجهَ المادّة.
     ⚠️ والفارغُ يُخفى ولا يُفرَّغ: `head()` تُسقط `.sub` حين تغيب
        (`display:none`) فلا تحجز حشوَها — وتعليلُه عندها في ui.js. */
  head("أهلاً " + S.prof.full_name, "");

  /* ثلاث مجموعات: صفّي · صفوف سابقة · مهارات
     🆕 b173 · و«صفوف سابقة» تجمع **الوجهَ السابق** من كلّ مادّةٍ مضت لها
        دروس: مادّةُ صفٍّ مضى كلُّها (`2_past`)، ومادّةُ صفّك التي سبقها صفّ.
        فالمادّةُ الواحدة قد تظهر في المجموعتين — دروسُ صفّها هنا، وما سبقه
        هناك — **ولا يتسلّل أحدُ الوجهين إلى الآخر** (التعليلُ عند `pastOf`).
     📌 وترتيبُها ترتيبُ الموادّ نفسِه (`sort`) لا ترتيبُ مصدرَيها: لولاه
        تقدّمت موادُّ الصفّ على موادّ ما مضى كلِّها، فاضطرب ترتيبٌ يحفظه الطالب. */
  const grade  = S.subjects.filter(x => x.group_key === '1_grade');
  const past   = S.subjects
    .filter(x => x.group_key === '2_past'
              || (x.group_key === '1_grade' && (x.lessons_review || 0) > 0))
    .sort((a, b) => (a.sort ?? 1e9) - (b.sort ?? 1e9))
    .map(pastOf);
  const skills = S.subjects.filter(x => !['1_grade','2_past'].includes(x.group_key));

  /* الشكلُ بموضع المادة في القائمة الكاملة لا في مجموعتها: لو عُدَّ
     داخل كلّ مجموعة لبدأت الثلاثُ بالدائرة نفسها في شاشةٍ واحدة.
     ⚠️ بالمعرّف لا بالمرجع (b173): الوجهُ السابقُ نسخةٌ لا يجدها `indexOf`،
        و`shape(-1)` لا يرمي بل يُعطي آخرَ الأشكال — فتلبس المادّةُ شكلاً
        غيرَ شكلها في المجموعة الأخرى، بلا شكوى. */
  const shapeOf = x => shape(S.subjects.findIndex(v => v.id === x.id));

  /* الوجه: صورةُ المادة المجسّمة إن كانت لها صورة، وإلّا شكلُها برمزه.
     🆕 b160 · والصورةُ في كلّ موضعٍ تظهر فيه المادة — الحيّةُ والمكتملةُ
        وموادُّ الصفوف السابقة. كانت السابقةُ تسقط إلى الشكل، **فالمادةُ
        الواحدة تلبس وجهين بحسب مجموعتها؛ والهويةُ لا تسقط بالإتمام ولا
        بمرور الصفّ** (وهي حجّةُ «المكتملة» تحتها بحرفها).
     🔑 و`alt` فارغ: الصورةُ زخرفة واسمُ المادة مكتوبٌ تحتها — ولو حمل
        الاسمَ لقرأه قارئُ الشاشة مرّتين. والمقاسُ في الوسم نفسِه فلا
        تقفز البطاقةُ حين تصل الصورة. */
  const face = x => {
    const img = SUBJ_IMG[x.id];
    return img
      ? `<div class="sh-wrap is-3d"><img class="sh-img-3d" src="/img/subj_${img}.webp"
           alt="" width="58" height="58" decoding="async"></div>`
      : `<div class="sh-wrap">${shapeOf(x)}<span
           class="sh-icon">${esc(x.icon || '')}</span></div>`;
  };

  /* 🆕 b176 · آخرُ ما فُتح يُقرأ مرّةً — يقرؤه الشريطُ وبطاقةُ مادّته معاً، فلا تقول
     الرئيسةُ «متابعة» فوق «البدء» للمادّة نفسِها (والتعليلُ عند `foot`). */
  const back  = lastSubject();
  const strip = todayStrip(back, face);

  /* 🆕 b173 · والوجهُ يُقرأ من المادّة نفسِها (`past`) لا من وسيطٍ يُمرَّر —
     فلا تُرسم نسخةٌ سابقةٌ بوجه الصفّ لأنّ نداءً نسي وسيطَه. */
  const card = x => {
    const isPast = !!x.past;
    /* 🆕 b194 · والمادّةُ قبل شُعبتها ليست فارغة: مقرَّراتُها محجوبةٌ حتى يختار (183) */
    const empty = !x.needs_placement && !x.needs_stream && bulk(x) === 0;
    const pct   = x.lessons_total ? Math.round(x.lessons_done / x.lessons_total * 100) : 0;
    /* نصٌّ قصير: البطاقة ١٥٠px، وجملةٌ كاملة تلتفّ ثلاثة أسطر فتتفاوت
       ارتفاعاتُ الشبكة. والجملةُ الطويلة باقيةٌ حيث يقع الفعل —
       في toast عند النقر، وفي شاشة المادة. */
    const meta  =
        empty             ? 'قيد الإعداد'
      : x.needs_stream    ? streamAct(x)
      : x.needs_placement ? 'تحديد المستوى'
      : isPast            ? `${AR(x.lessons_review)} للمراجعة`
      : `${AR(x.lessons_done)} / ${AR(x.lessons_total)} ${
            NW(x.lessons_total,'درس','درسان','دروس','درساً')}`;
    /* ⚠️ ولا شارةَ «قريباً»: البطاقةُ الفارغة تحمل أصلاً حدّاً متقطّعاً
       وبهتاناً وشكلاً رمادياً و«قيد الإعداد» — خمسُ إشاراتٍ لمعنىً
       واحد في ١٥٠px. والإفراطُ في الإشارة يُدرِّب على تجاهلها. */
    /* 🆕 b160 · وسمُ المستوى يسقط حيث يكرّر عنوانَ مجموعته وحدَه:
       مستوى موادّ الصفّ هو الصفُّ نفسُه («الصف الأول الثانوي») وفوقها
       «موادّ صفّي» ⇒ حشو. **أمّا المهارات فمستواها نتيجةُ اختبار المستوى**
       («متوسط — B1» · «نطاق 5.5 — متوسط») — أثمنُ ما على بطاقتها.
       ⚠️ وكان b157 يُسقطه بشرط الصورة (`!is3D`) فأسقط الاثنين معاً:
          لم يكن للصورة ذنبٌ، والحشوُ في المجموعة لا في الوجه. */
    /* ⚠️ و«اختيارية» وصفُ مقرَّر الصفّ لا المادّة (b173): الوجهُ السابقُ نسخةٌ
       ترث الحقل، ورياضياتُ الأوّل ليست اختياريّةً لأنّ رياضياتِ المسار كذلك. */
    const tags = [
      x.my_level && !isPast && x.group_key !== '1_grade'
                            ? `<span class="lvl-tag">${esc(x.my_level)}</span>` : '',
      x.elective && !isPast ? '<span class="badge lock">اختيارية</span>'        : ''
    ].filter(Boolean).join('');

    /* 🆕 b158 · مادةٌ لم تُبدأ تدعو إلى البدء، ومادةٌ تنتظر اختبارها تدعو
       إليه — في رقاقةٍ واحدة الصيغة. وما بدأ يبقى على عدّاده وشريطه:
       **الشريطُ هو جوابُ «أين أنا» فلا تُغطّيه دعوة.**
       🔑 b160 · «البدء» مصدرٌ لا أمر. كان b158 كتب «ابدأ الآن» — وهو مذكّرٌ
          صريح يخاطب الطالبةَ بالمذكّر، والزرُّ سيّدُه المصدر (مهارةُ الهوية
          اللغوية §٦، وهذا مثالُها الأوّل بعينه). والحالةُ في سلسلةٍ تتبع
          سلسلتها: «قيد الإعداد» · «٥ / ٣٢ درساً» · «البدء» — أسماءٌ كلُّها.
       📐 وسطرٌ واحد: كانت «… · ابدأ الآن ←» تنكسر عند ١٥٠px فتسقط «الآن»
          وحدها في سطرٍ ثانٍ (قِيس: ٥٧px بدل ٣٨).
       ⚠️ و`lessons_done` لا `pct === 0`: درسٌ من ثلاثمئة يُقرَّب صفراً،
          فتُدعى إلى البدء مادةٌ بُدئت.
       📌 والصورةُ لا تحكم هنا — كانت الرقاقةُ لذوات الصور وحدها (`is3D`)،
          فتلبس المادةُ بلا صورة سلوكاً آخر لا وجهاً آخر فحسب. */
    /* 🆕 b176 · وآخرُ مادّةٍ فُتحت لا تُدعى إلى «البدء»: بطاقةُ «متابعة» فوقها تدعو
       إليها — فعلان لشيءٍ واحد في شاشةٍ واحدة (بلاغُ المالك). **ولم يُتَمّ فيها درسٌ
       بعد**، فالعدّادُ لا يقولها؛ والرقاقةُ تبقى وتتبدّل كلمتُها وحدها، ولا لونَ لها:
       البطاقةُ الرئيسةُ فوقها تُبرزها، وإبرازٌ ثانٍ ينفق التباينَ مرّتين.
       ⚠️ والوجهُ شرطٌ: متابعةُ مراجعة الأوّل لا تجعل رياضياتِ الصفّ «متابعة». */
    const here = back && !isPast && !back.past && String(back.id) === String(x.id);
    const openable = !isPast && !empty;
    const go   = t => `<div class="subj-act-pill">${t}<span class="subj-arrow" aria-hidden="true">←</span></div>`;
    const foot =
        openable && x.needs_stream           ? go(streamAct(x))
      : openable && x.needs_placement        ? go('تحديد المستوى')
      : openable && x.lessons_total && !x.lessons_done
            ? go(`${N(x.lessons_total,'درس واحد','درسان','دروس','درساً')}، ${here ? 'متابعة' : 'البدء'}`)
      : `<div class="subj-m">${meta}</div>
         ${(x.needs_placement || x.needs_stream || empty || isPast) ? '' :
           `<div class="pbar"><div class="pfill" style="width:${pct}%"></div></div>`}`;

    /* 🔑 الوصفُ في title لا على الوجه: سطران فيه يُطيلان البطاقة حتى
       تفقد الشبكةُ انتظامها — وانتظامُها هو ما يجعل الشكل واللون
       يُقرآن بلمحة. ولم يُحذف: يظهر بالمرور ويقرؤه قارئُ الشاشة،
       وموضعُه الطبيعيّ شاشةُ المادة نفسها.
       ⚠️ والفارغة بلا role ولا tabindex: ليست زرّاً فلا تُعلن زرّاً،
          ولا تُلتقط بالتنقّل بلوحة المفاتيح إلى بابٍ لا يُفتح. */
    return `<div class="subj ${subjectState(x, isPast)} ${empty ? 'soon' : ''}"
                 data-i="${x.id}" ${isPast ? 'data-past="1"' : ''} ${empty ? '' : 'role="button" tabindex="0"'}
                 ${x.description ? `title="${esc(x.description)}"` : ''}>
      ${face(x)}
      <div class="subj-t" dir="auto"><bdi>${esc(x.name)}</bdi></div>
      ${tags ? `<div class="subj-b">${tags}</div>` : ''}
      ${foot}
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
  const ring = gradeRing(grade);   // 🆕 b184 · حلقةُ الإنجاز في عنوان المجموعة

  app.innerHTML = `
    ${strip}
    ${paths.length ? pathAsk(paths) : ''}
    ${grade.length?`${ring.html}
      ${live.map(x => card(x)).join("")}
      ${/* 🆕 b179 · «أتممتها: ٣» لا «أتممتها · ٣» — النقطةُ قبل رقمٍ هنديّ تُقرأ صفراً («٠ ٣»).
            والنقطتان لا الفاصلة: عنوانٌ وعددُه علاقةُ «وسمٍ: قيمة»، كـ«مستواك: …» و«بلا إجابة: …». */''}
      ${done.length?`<div class="fold-lbl">أتممتها: ${AR(done.length)}</div>${done.map(mini).join("")}`:''}`:''}

    ${past.length?`<div class="grp fold" id="pastHdr">موادّ صفوف سابقة
        <span class="chip">${AR(past.length)}</span><span class="caret">▾</span></div>
      <div id="pastBox" hidden>${past.map(x => card(x)).join("")}</div>`:''}

    ${skills.length?`<div class="grp">مهاراتي</div>${skills.map(x => card(x)).join("")}`:''}

    ${!S.subjects.length?`<div class="card" style="text-align:center;padding:28px">
        <div style="font-size:2rem;margin-bottom:10px">📚</div>
        <div class="rev-q">لا توجد مواد متاحة بعد</div>
        <div class="line">موادّ صفّك وتدريبات المهارات قيد الإعداد — ستظهر هنا فور جهوزها.</div>
      </div>`:''}`;

  /* البطاقة صارت role=button ⇒ لها لوحةُ المفاتيح كما لها الفأرة.
     ولا div بلا هذا: الطالبُ الذي لا يستعمل فأرةً يقف عند الرئيسة. */
  app.querySelectorAll(".subj").forEach(el => {
    const go = () => {
      const base = S.subjects.find(v => String(v.id) === el.dataset.i);
      if(!base) return;
      /* 🆕 b173 · والوجهُ من البطاقة: المادّةُ الواحدة بطاقتان في مجموعتين */
      const x = el.dataset.past ? pastOf(base) : base;
      enterSubject(x);     // 🆕 b194 · البوّاباتُ بترتيبها — والتعليلُ عندها
    };
    el.onclick   = go;
    el.onkeydown = e => { if(e.key === 'Enter' || e.key === ' '){ e.preventDefault(); go(); } };
  });

  /* ⚠️ زرُّ «متابعة» يُعيد قراءة المادة لا يلتقطها من الإغلاق: بين
     الرسم والنقر قد تُعاد الشبكةُ، فمرجعٌ قديم يفتح دروساً قديمة.
     🆕 b176 · **ويفتح الدرسَ التالي نفسَه** إن حُفظ — بـ`openLessonAt` وحارسِها كالرابط
        والبحث: مقفلٌ ⇒ سببُه وقائمةُ مادّته · غائبٌ ⇒ القائمة. وبلا تالٍ ⇒ القائمة كما كان.
     ⚠️ والبطاقةُ `div` بدور زرّ ⇒ لها لوحةُ المفاتيح كبطاقة المادّة (أعلاه). */
  const on = (id, fn) => { const el = document.getElementById(id); if(el) el.onclick = fn; };
  const resume = () => {
    const x = lastSubject();
    if(!x) return loadList();
    const n = lastNext();
    return n ? openLessonAt(x.id, n.id, x.past) : loadLessons(x);
  };
  on('go-resume', resume);
  const heroEl = document.getElementById('go-resume');
  if(heroEl) heroEl.onkeydown = e => {
    if(e.key === 'Enter' || e.key === ' '){ e.preventDefault(); resume(); } };
  on('go-cards',  loadFlashcards);
  on('go-fb',     loadFeedback);

  const ph = document.getElementById("pastHdr");
  if(ph) ph.onclick = ()=>{
    const box = document.getElementById("pastBox");
    box.hidden = !box.hidden;
    ph.classList.toggle('open', !box.hidden);
  };

  /* 🆕 b173 · المسارُ بنقرة — والتعليلُ عند pathAsk */
  app.querySelectorAll('[data-path]').forEach(b => b.onclick = async () => {
    const all = app.querySelectorAll('[data-path]');
    all.forEach(x => x.disabled = true);
    const p = S.prof, pid = Number(b.dataset.path);
    const { data:r, error } = await api.setMyGrade(p.scale_id, p.level_id, pid);
    if(error || !r?.ok){
      all.forEach(x => x.disabled = false);
      toast('تعذّر حفظ المسار — ' + (error?.message || r?.error || '')); return;
    }
    p.path_id = pid;
    toast('حُفظ مسارك: ' + (r.path || b.textContent.trim()));
    loadList();
  });

  homeMotion(ring.pct);   // 🆕 b184 · والتعليلُ عندها
  scrollTop();
}

/* ═══════════ ①أ «مسارك» — بطاقةٌ أعلى الرئيسة (b173) ═══════════
   🔴 بلاغُ المالك (٢٣ أكتوبر): طالبُ الثاني الثانوي لا يرى إلا الموادَّ
      المشتركة، ولا موضعَ يسجّل فيه مسارَه. **والقاعدةُ كانت جاهزة:**
      `set_my_grade` تقبل المسارَ وتُخبر بـ`needs_path`، والواجهةُ لم ترسله
      قطّ — و`my_courses()` تحجب كلَّ مقرَّرٍ ذي مسارٍ عمّن لا مسارَ له.
   🔑 **طلبٌ لا شرط** — حكمُ الدالّة نفسِها («المسار يُطلب ولا يُشترط»):
      بطاقةٌ فوق الموادّ لا شاشةٌ تحجبها. فالمشتركةُ تُدرَس قبل الاختيار،
      ومن تردّد لم يُحبَس عن صفّه.
   📌 ونقرةٌ واحدةٌ تحفظ بلا تأكيد: المسارُ يُغيَّر من «ملفّي» متى شاء،
      والسطرُ يقول ذلك قبل النقر لا بعده.
   📌 و«المسار» اسمُه في البكالوريا المصرية وفي لوحة الإدارة (`paths`).
      ⚠️ وهو في معجم الفروق (مهارةُ الهوية اللغوية §١٠) «طريقُ التسكين»
         — وذاك اسمٌ لا يراه الطالبُ في شاشةٍ من شاشاته، والتقاؤهما مكتوبٌ
         في STATE ليُحسم هناك لا هنا. */
function pathAsk(paths){
  return `
    <div class="card path-ask">
      <div class="rev-q">مسارك</div>
      <div class="line">موادّ مسارك تظهر هنا بعد اختياره، ويمكنك تغييره لاحقاً من ملفّك.</div>
      <div class="path-opts">${paths.map(x => `
        <button type="button" class="btn ghost" data-path="${x.id}">${esc(x.name)}</button>`).join('')}
      </div>
    </div>`;
}

/* مساراتُ صفّ الطالب إن لم يختر — وإلّا فلا شيء.
   🔑 **والحكمُ حكمُ `set_my_grade` بحرفه:** مسارٌ نشطٌ في سلّمه بلغ صفُّه
      رتبتَه (`from_rank <= rank`) — و`from_rank` الفارغُ لا يبلغه صفّ.
   📌 ويُحفظ لكلّ (سلّم · صفّ) في الجلسة: طالبُ الأوّل لا مسارَ له، ولولا
      الحفظُ لدفع نداءً في كلّ عودةٍ إلى الرئيسة ليسمع «لا شيء» نفسَها.
      والمساراتُ للسلّم لا للطالب، فما حُفظ يصدق لكلّ من شاركه صفَّه.
   ⚠️ ولا تقرأ `S.scales`: تملؤها البوّابةُ قبل الدخول، والمساراتُ فيها
      فارغةٌ بحكم RLS **بلا خطأ** — فتُقرأ «لا مسارَ لهذا الصفّ» كذباً.
   ⚠️ وفشلُ الجلب لا يحجب الرئيسة ولا يُحفظ: تُرسم الموادّ بلا بطاقة،
      ويُعاد السؤال في العودة التالية.
   🔑 و`let` آمنةٌ هنا كـLAST_KEY: لا يقرؤها إلا pathChoices، ولا تُنادى
      إلا من loadList — ولا تُنادى loadList وهذه الوحدةُ تُقيَّم. */
let pathMemo = null;   // { key, list }
async function pathChoices(){
  const p = S.prof || {};
  if(!p.scale_id || !p.level_id || p.path_id) return [];
  const key = p.scale_id + '|' + p.level_id;
  if(pathMemo?.key === key) return pathMemo.list;

  const { data, error } = await api.academicScales();
  if(error){ console.warn('[بيان · b173] تعذّر جلبُ المسارات:', error.message); return []; }
  const sc = (data || []).find(s => s.id === p.scale_id);
  const lv = (sc?.levels || []).find(l => l.id === p.level_id);
  const list = !lv ? [] : (sc.paths || [])
    .filter(x => x.active && x.from_rank != null && x.from_rank <= lv.rank)
    .sort((a, b) => a.sort_order - b.sort_order);
  pathMemo = { key, list };
  return list;
}

/* ═══════════ ①ج الشُّعبة — سؤالٌ واحدٌ قبل المادّة (183 · b194) ═══════════
   للمادّة شُعبٌ (علميّ · نظريّ — Academic · General Training) والطالبُ لم يختر بعد
   ⇒ `needs_stream` من `list_subjects`، ومقرَّراتُ الشُّعب محجوبةٌ عنه حتى يختار (`courses_of`).
   🔴 **ولهذا هي أولى البوّابات، قبل فحص الفراغ:** قبل الاختيار `lessons_total = 0`، فكان فحصُ
      الفراغ يردّه «قيد الإعداد» قبل أن يُسأل (§٢ في `spec-content-layers.md`). ولـIELTS: يختار
      نوعَه ثمّ يُقاس مستواه — الإعلانُ قبل القياس.
   🔑 **والكلمةُ كلمةُ المادّة لا كلمةٌ عامّة** (`stream_label` · ق٢): «اختيار التخصص» · «اختيار
      نوع الاختبار» — فلا اسمَ يزاحم «المسار» (طريقُ التسكين، ومسارُ البكالوريا في الملفّ) ولا «الصف».
   🔑 **ولا سؤالَ مكتوبٌ فوق الخيارين:** «أيّ الاختبارين ستؤدّي؟» في التصميم مذكّرٌ صريح (مهارةُ الهوية
      §٤)، ويفترض شُعبتين كلتاهما اختبار — وتلك بياناتُ مادّةٍ لا شيفرة (§٩-١). فالعنوانُ يسأل باسمه،
      والخياران يجيبان، وسطرُ العون تحت كلٍّ من `streams.hint` (وفيه سطرُ ق١ مع صفوف الخطوة ٤).
   📌 **وصندوقُ الخيار `.mentor` مستعار** — كاستعارة «موادّي» له (screens.css): الخياران بطاقتان
      بالاسم وسطرِ العون، والاختيارُ الحاليّ `cur` بشارة «اختيارك الحالي» نفسِها. و`div` بدور زرّ
      كبطاقة المادّة (`.subj`): role و tabindex ولوحةُ المفاتيح. */

/* اسمُ الفعل — على بطاقة المادّة وفي عنوان شاشتها */
function streamAct(x){ return x.stream_label ? 'اختيار ' + x.stream_label : 'اختيار'; }

/* بوّاباتُ المادّة بترتيبها: الشُّعبة ⇐ المستوى ⇐ الفراغ ⇐ المعلّم ⇐ الدروس.
   🔑 **ترتيبٌ واحدٌ في موضعٍ واحد:** كان متنَ نقرة البطاقة، وشاشةُ الشُّعبة تمضي بالطالب في
      البوّابات الباقية بعد اختياره — وترتيبان لسؤالٍ واحد يتفارقان.
   ⚠️ و`fromAsk`: مادّةٌ بلا دروسٍ بعد الاختيار تُقال بالإشعار ثمّ الرئيسة — فلا يبقى الطالبُ على
      شاشة سؤالٍ أجاب عنه. */
function enterSubject(x, fromAsk){
  if(x.needs_stream) return askStream(x);
  if(!x.needs_placement && bulk(x) === 0){
    toast("دروس هذه المادة قيد الإعداد — ستصلك عند جهوزها");
    return fromAsk ? loadList() : undefined;
  }
  if(x.needs_placement) return startPlacement(x);
  if(!x.mentor_chosen)  return loadMentors(x);
  loadLessons(x);
}

/* الشاشةُ نفسُها للاختيار الأوّل وللتغيير — والتغييرُ من رأس دروس المادّة («التخصص: علمي، تغيير»).
   📌 والعنوانُ عنوانُ المادّة (/subjects/47): من حدّث الصفحةَ هنا عاد إلى البوّابة نفسِها
      (`openLessonAt`)، لا إلى رئيسةٍ تُنسيه أين كان. */
function askStream(subj){
  S.subj = subj;
  nav('subjects', `/subjects/${subj.id}`);
  head(streamAct(subj), "");
  const opts = subj.streams || [];
  app.innerHTML = `
    <div class="crumb-row">
      <div class="crumb" id="bk">→ رجوع للمواد</div>
      <span class="crumb-at">${esc(subj.name)}</span>
    </div>
    ${opts.map(st => {
      const cur = st.id === subj.my_stream;
      return `<div class="mentor${cur ? ' cur' : ''}" data-st="${st.id}" role="button" tabindex="0">
        <div class="m-n" dir="auto"><bdi>${esc(st.name)}</bdi>${cur
          ? ' <span class="badge on">اختيارك الحالي</span>' : ''}</div>
        ${st.hint ? `<div class="m-m" dir="auto">${esc(st.hint)}</div>` : ''}
      </div>`;
    }).join('')}
    <div class="line">يمكنك تغيير اختيارك لاحقاً، ولا يضيع ما أنجزته.</div>`;

  document.getElementById('bk').onclick = loadList;

  /* ⚠️ نقرةٌ واحدةٌ تحفظ، والثانيةُ قبل الردّ لا تُرسل نداءً آخر (`busy`) */
  let busy = false;
  const all = () => app.querySelectorAll('[data-st]');
  all().forEach(el => {
    const choose = async () => {
      const sid = Number(el.dataset.st);
      if(sid === subj.my_stream) return loadLessons(subj);     // الاختيارُ نفسُه ⇒ لا نداء
      if(busy) return;
      busy = true;
      all().forEach(o => o.setAttribute('aria-disabled', 'true'));
      const { data:r, error } = await api.setMyStream(subj.id, sid);
      if(error || !r?.ok){
        busy = false;
        all().forEach(o => o.removeAttribute('aria-disabled'));
        toast('تعذّر حفظ الاختيار — ' + (error?.message || r?.error || '')); return;
      }
      toast('حُفظ اختيارك: ' + (r.name || el.querySelector('bdi')?.textContent || ''));
      /* الشُّعبةُ تغيّر مقرَّراتِ المادّة وأعدادَها ⇒ القائمةُ تُقرأ من جديد، ثمّ البوّاباتُ الباقية */
      const { data, error: e2 } = await api.listSubjects();
      if(e2) return loadList();
      S.subjects = data || [];
      const x = S.subjects.find(v => String(v.id) === String(subj.id));
      return x ? enterSubject(x, true) : loadList();
    };
    el.onclick   = choose;
    el.onkeydown = e => { if(e.key === 'Enter' || e.key === ' '){ e.preventDefault(); choose(); } };
  });
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

  if(!hit.lesson_id) return loadList();
  return openLessonAt(hit.subject_id, hit.lesson_id);
}

/* 🆕 b167 · درسٌ أو مادّةٌ بمعرّفيهما — من نتيجة بحث ومن رابط
   (/subjects/7 · /subjects/7/lessons/42 — ui.js · PATHS). كانت متنَ
   openSearchHit فاستُخرجت: **البابان سواءٌ في الحاجة، وحارسٌ واحد للقفل**
   خيرٌ من اثنين يفترقان. ⇒ lessonId فارغٌ ⇒ قائمةُ دروس المادّة.
   ⚠️ ومادّةٌ لا تبلغها قائمتُك (صفٌّ آخر · رابطٌ قديم) ⇒ الرئيسة، بلا خطأ.
   🆕 b173 · و`past` من العنوان (/subjects/7/past) — الوجهُ السابقُ للمادّة. */
export async function openLessonAt(subjectId, lessonId, past){
  /* الشبكةُ قد تكون فارغةً إن دخل الطالب من رابطٍ مباشر ولم يمرّ بالرئيسة */
  if(!(S.subjects || []).length){
    const { data } = await api.listSubjects();
    S.subjects = data || [];
  }
  const base = (S.subjects || []).find(v => String(v.id) === String(subjectId));
  if(!base) return loadList();
  /* 🆕 b194 · والرابطُ والبحثُ كالبطاقة: الشُّعبةُ أوّلاً — ودرسُها محجوبٌ قبلها أصلاً (183) */
  if(base.needs_stream) return askStream(base);
  if(lessonId == null) return loadLessons(pickView(base, past));

  const { data, error } = await api.listLessons(base.id);
  if(error){ toast('تعذّر فتح الدرس'); return loadLessons(pickView(base, past)); }

  /* 🆕 b173 · والدرسُ يُفتح في وجهه هو، والقرينةُ وسمُ القاعدة لا العنوان:
     رابطُ الدرس واحدٌ للوجهين (/subjects/7/lessons/42)، ودرسُ صفٍّ مضى
     يُفتح في وجهه السابق — فـ«عودة» منه تبلغ قائمتَه، لا قائمةَ صفٍّ لا
     يسكنها فيبدو أنّه اختفى. */
  const l    = (data || []).find(v => String(v.id) === String(lessonId));
  const subj = pickView(base, l ? l.own_level === false : past);

  /* الترتيبُ لازم: openLesson تقرأ S.subj و S.lessons ولا تجلبهما */
  S.subj = subj; S.lessons = (data || []).filter(inView(subj));
  rememberSubject(subj, nextOf(subj));            // 🆕 b176 · والتالي معها — التعليلُ عند rememberSubject

  /* 🔒 ولا يُلتَفّ على القفل: البحث يكشف ما يراه الطالب، والرؤيةُ
     ليست الإتاحة. درسٌ مقفل يُقال سببُه وتُعرض قائمتُه.
     🆕 b167 · **والرابطُ كالبحث:** من أرسل /subjects/7/lessons/42 لطالبٍ لم
        يبلغه لم يفتحه له — والعنوانُ يُستبدل بالمادّة (ui.js · openAddress). */
  if(!l)        return loadLessons(subj);
  if(l.locked){ toast(l.reason || 'هذا الدرس غير متاح بعد'); return loadLessons(subj); }
  openLesson(l);
}

/* ═══════════ ② الانضمام إلى معلم ═══════════ */

export async function loadMentors(subj, switching){
  S.subj = subj;
  nav('subjects');
  /* 🆕 b139 · والوصفُ خلا من اسم المادة — نزل إلى صفّ الفتات تحته.
     كانت الشاشة ثلاثةَ أسطرٍ فوق ملاحظةٍ واحدة: العنوان ثمّ المادة ثمّ
     «رجوع للمواد» (قِيس: ١٥ · ٦٠ · ٩٧، والملاحظة عند ١٤٥). **وثلاثةُ
     أسطرٍ لثلاث كلماتٍ ترويسةٌ تُزاحم ما جاء الطالب من أجله.** */
  head(switching?"الانضمام إلى معلم آخر":"اختيار معلمك", "");

  /* صفُّ الفتات: **من أين جئت · وأين أنت** في سطر.
     📌 ونصُّه واحدٌ في المسلكين. وكان أحدُهما «← رجوع» مجرّداً — واسمان
        لطريقٍ واحد يجعلان الطالبَ يسأل: أراجعٌ إلى المواد أم إلى غيرها؟ */
  const where = `
    <div class="crumb-row">
      <div class="crumb" id="bk">→ رجوع للمواد</div>
      <span class="crumb-at">${esc(subj.name)}</span>
    </div>`;
  app.innerHTML = skeleton('mentors');

  const [mRes, sRes] = await Promise.all([
    api.listMentors(subj.id),
    api.myMentor(subj.id)
  ]);
  const mentors = mRes.data || [], state = sRes.data || {};
  const eMentor = mRes.error || sRes.error;

  if(switching && !state.can_switch){
    app.innerHTML = `
      ${where}
      <div class="warnbox" style="font-size:.85rem">
        <b style="font-family:'Almarai';font-weight:800;display:block;margin-bottom:6px">
          فرص الانتقال في هذه المادة استُوفيت</b>
        ${/* 🆕 124 · جملةٌ كاملةٌ بصيغتين لا خمسةُ نداءاتٍ متشابكة: الضميرُ
              والصفةُ والمضافُ إليه تتبع صيغةً واحدة، وتقطيعُها يُنتج
              نصّاً يُقرأ استمارة. و`teacher_g` تصل من `my_mentor`.
              ومحايدُها يتجنّب الضمير الغائب أصلاً — إذ لا ضميرَ محايدَ
              في العربية، فالمخرجُ أن يُصاغ النصّ بلا ضمير. */''}
        ${G(state.teacher_g,
          'الاستمرار مع معلّم واحد يمنحه صورة أوضح عن تقدّمك، ويجعل متابعته لك أدقّ. وما يشكل عليك يُعرَض على معلّمك الحالي — فهو الأقدر على مساعدتك.',
          'الاستمرار مع معلّمة واحدة يمنحها صورة أوضح عن تقدّمك، ويجعل متابعتها لك أدقّ. وما يشكل عليك يُعرَض على معلّمتك الحالية — فهي الأقدر على مساعدتك.',
          'الاستمرار في إرشاد واحد يعطي صورة أوضح عن تقدّمك، ويجعل المتابعة أدقّ. وما يشكل عليك يُعرَض في المراسلة — فهي أقرب من الانتقال.')}</div>
      <div class="nav"><button class="btn primary" id="go">متابعة الدروس</button></div>`;
    document.getElementById("bk").onclick = loadList;
    document.getElementById("go").onclick = ()=>loadLessons(subj);
    return;
  }

  const card = m => {
    /* المعدودُ يتبع السعةَ لا عددَ المتابَعين: «٣ من ٢٠ طالباً» */
    const cap = NW(m.capacity,'طالب','طالبان','طلاب','طالباً');
    return `
    <div class="mentor ${m.full?'full':''} ${state.teacher_id===m.id?'cur':''}" data-t="${m.id}">
      <div class="m-n">أ. ${esc(m.name)}
        ${/* 🆕 124 · الشارةُ بصيغة المعلّم لا بصيغة الطالب — و`m.g` تصل
              من `list_mentors`. ومحايدُها «اختيارك الحالي»: اسمٌ عن
              الطالب لا عن معلّمه، فيصحّ قبل أن يُسأل أحدهما. */''}
        ${state.teacher_id===m.id
          ? `<span class="badge on">${G(m.g,'معلمك الحالي','معلمتك الحالية','اختيارك الحالي')}</span>`
          : ''}</div>
      <div class="m-m">${esc(m.school||'—')}${m.years?`، ${
        N(m.years,'سنة خبرة','سنتا خبرة','سنوات خبرة','سنة خبرة')}`:''}</div>
      ${m.bio?`<div class="m-b">${esc(m.bio)}</div>`:''}
      ${/* 🆕 124 · ومحايدُ السعة **بلا فعل**: الرقمان يقولان ما يقوله
            «يتابع/تتابع» بلا صيغة. وهو نموذجُ القاعدة — حيث تُمكن
            المحايدةُ تُكتب محايدةً، ولا تُستدعى الدالّةُ أصلاً. */''}
      <span class="m-cap">${m.full ? 'اكتمل النصاب' : G(m.g,
        `يتابع ${AR(m.students)} من ${AR(m.capacity)} ${cap}`,
        `تتابع ${AR(m.students)} من ${AR(m.capacity)} ${cap}`,
        `${AR(m.students)} من ${AR(m.capacity)} ${cap}`)}</span>
    </div>`;
  };

  app.innerHTML = `
    ${where}
    ${errBox(eMentor,'قائمة المعلمين')}
    <div class="warnbox">
      الانضمام إلى معلم يعني أنه سيتابع تقدّمك في هذه المادة، ويصحّح إجاباتك
      المقالية، ويجيب عن أسئلتك.
    </div>
    ${mentors.length?mentors.map(card).join(""):''}
    <div class="mentor self" data-t="">
      <div class="m-n">المتابعة الذاتية</div>
      <div class="m-m">${mentors.length
        ? 'الدراسة بنفسك، ويمكنك الانضمام إلى معلم متى شئت'
        : 'لم ينضم معلمون لهذه المادة بعد — والبداية بنفسك، ونُعلمك عند توفّرهم'}</div>
    </div>`;

  document.getElementById("bk").onclick = loadList;
  app.querySelectorAll(".mentor").forEach(el=>el.onclick=async()=>{
    const mo = mentors.find(x => x.id === el.dataset.t) || {};
    if(el.classList.contains('full')){
      toast(G(mo.g, 'اكتمل نصاب هذا المعلم — فيُختار غيره',
                    'اكتمل نصاب هذه المعلمة — فيُختار غيرها',
                    'اكتمل النصاب هنا — ويُختار من بقي')); return; }
    const tid = el.dataset.t || null;
    if(tid && tid !== state.teacher_id){
      const name  = mo.name || G(mo.g, 'هذا المعلم', 'هذه المعلمة', 'هذا الحساب');
      const tried = state.teachers_tried || 0;

      /* 🆕 124 · «معلم آخر» هنا **مستقبلٌ لم يُختَر بعد** — لا صيغةَ له
         أصلاً، فالمحايدةُ هي الصواب لا البديل. ⇒ «انتقال». */
      let msg = `الانضمام إلى أ. ${name} في مادة «${subj.name}»؟`;
      if(tried === 1) msg += "\n\nبعد هذا الانضمام تبقى لك فرصة انتقال واحدة.";
      else if(tried >= 2) msg += "\n\nهذه آخر فرصة — ولا انتقال بعدها في هذه المادة.";

      if(!confirm(msg)) return;
    }

    const { data:r, error } = await api.chooseMentor(subj.id, tid);
    if(error){ toast(error.message); return; }
    if(!r.ok){ toast(r.error); return; }

    toast(r.self_study ? "متابعة دروسك بنفسك" : "انضممت إلى أ. "+r.teacher);
    subj.mentor_chosen = true; subj.mentor_name = r.teacher || null;
    loadLessons(subj);
  });
  scrollTop();
}

/* ═══════════ ③ دروس المادة ═══════════ */

export async function loadLessons(subj){
  S.subj = subj;
  /* الأثرُ يُكتب هنا لا في openLesson: المادةُ هي وحدةُ الاستئناف،
     ودرسٌ بعينه قد يُتمّ فيصير «متابعة» يفتح ما فُرغ منه. */
  rememberSubject(subj);
  /* 🆕 b167 · عنوانُ المادّة — ui.js · PATHS
     🆕 b173 · وللوجه السابق عنوانُه: من حدّث الصفحةَ على مراجعة الأوّل
        لا يُعاد إلى وجه صفّه — وهو «قيد الإعداد» فيبدو أنّ الدروس ضاعت. */
  nav('subjects', `/subjects/${subj.id}${subj.past ? '/past' : ''}`);
  /* 🆕 b139 · برواز السياق هنا كما في شاشة البطاقات — طلبُ صاحب المنصّة.
     كانت: «العلوم المتكاملة» عنواناً · «مستواك: الصف الأول الثانوي» وصفاً ·
     ثمّ الفتات — ثلاثةُ أسطر. ⇒ **المادةُ إلى البرواز، والمستوى يرتفع
     عنواناً بلا لقبه.** و«مستواك:» سقطت: البروازُ يقول أيَّ مادة، والسطرُ
     يقول أيَّ مستوى — **ولقبٌ يسبق الخبرَ في سطرٍ لا يحتمل غيرَه حشو.**

     🔑 **b139-ثانيةً · والمستوى نزل إلى بروازٍ ثانٍ، والعنوانُ «الدروس».**
        رُفع المستوى أوّلاً عنواناً فورث حجمَ `h1` ‏(`clamp` حتى ١٫٧٢rem)
        وهو أكبرُ من المستهدَف — **قرارُ صاحب المنصّة.** وبروازان في طرفٍ
        واحد يحفظان السطرَ الواحد ويردّان المستوى إلى `--fs-ui`، وهو
        حجمُه الأوّل. ⇒ **المادةُ ثمّ المستوى: الأعمُّ قبل الأخصّ.**
     📌 و«الدروس» اسمٌ قائمٌ في المنصّة لا مخترَع (`دروس المقرَّر` في
        المحرّر · `٥ / ٧ دروس` في بطاقة المادة · ورأسُ القسم ③ هنا).
     🆕 b173 · **والوجهُ السابقُ لا يحمل مستوى الطالب:** `my_level` صفُّه
        الحاضر، ودروسُ هذا الوجه من صفٍّ مضى — فبروازُه اسمُ مجموعته في
        الرئيسة، ومستوى كلِّ درسٍ عنوانٌ فوق دروسه (`paint` أدناه). */
  head("الدروس", "", false, [subj.name, subj.past ? 'صفوف سابقة' : subj.my_level]);
  app.innerHTML = skeleton('rows');

  const { data, error } = await api.listLessons(subj.id);
  if(error){ app.innerHTML = `<div class="err"><b>تعذّر التحميل</b>${esc(error.message)}</div>`; return; }
  /* 🆕 b173 · دروسُ الوجه وحده — التعليلُ عند `pastOf` في رأس الملفّ */
  S.lessons = (data || []).filter(inView(subj));
  rememberSubject(subj, nextOf(subj));            // 🆕 b176 · والتالي معها — التعليلُ عند rememberSubject

  /* ══ شريط تصفية الفروع · b122 ═════════════════════════
     🔑 ثابتُ ⑤ — الشريط يُبنى ممّا ظهر في دروس الطالب لا من
        جدول الفروع: مادّةٌ فيها سبعةُ فروعٍ ودروسُها المنشورةُ
        في اثنين لا تُعرَض فيها خمسةُ خياراتٍ تُفضي كلُّها إلى فراغ.
     🔑 وثابتُ ① — الفرعُ يُوسَم على أصغرِ ما لا ينقسم: العربيةُ على
        الدرس والإنجليزيةُ على المكوّن. والقاعدةُ ترسل في كلّ بندٍ
        `strand_json(coalesce(i.strand_id, l.strand_id))` ⇒ الإرثُ
        محسوبٌ هناك، وهذا يجمع ما وصل ولا يستنتجه ثانيةً.
     ⚠️ وثابتُ ④ — الحجبُ على البطاقة لا داخلها: الدرسُ متى ظهر
        ظهرت بنودُه كلُّها — وتصفيةُ جوفه تُنتج ورقةً من ثلث،
        و`pass_mark` لم يُعايَر على ثلث. */
  const strandsOf = l => {
    const m = new Map();
    if(l.strand) m.set(l.strand.id, l.strand);
    (l.items||[]).forEach(i=>{ if(i.strand) m.set(i.strand.id, i.strand); });
    return m;
  };

  /* ولا تُرتَّب أبجدياً: `list_lessons` تردّ مرتّبةً بالمستوى ثمّ
     الوحدة ثمّ الموضع، فترتيبُ أوّلِ ظهورٍ هو ترتيبُ المنهج —
     والمنسدلةُ تُقرأ بالترتيب نفسِه الّذي تُقرأ به القائمةُ تحتها. */
  const strands = [...new Map(S.lessons.flatMap(l=>[...strandsOf(l)])).values()];

  /* الفرعُ المختار — محلّيٌّ في النداء: تغييرُ المادّة يُنادي
     `loadLessons` من جديد فيُنسى، كما تُصفّر شاشةُ الأداء فرعَها
     عند تغيير مادّتها — وفرعٌ يبقى من مادّةٍ إلى مادّةٍ لا معنى له،
     فالفرعُ يتبع المادّة (ثابتُ ③). */
  let pick = null;

  /* 🆕 b175 · `next` يمرّره `paint` — والتعليلُ عنده. و`aria-current="step"` يقول لقارئ
     الشاشة ما يقوله الوسمُ للعين: هذه خطوتُك في السلسلة. */
  /* 🆕 b194 · شُعبتُك في رأس المادّة بجوار معلّمك وعلى نسقه: «التخصص: علمي، تغيير» —
     والتغييرُ الشاشةُ نفسُها (`askStream`). و«،» لا «·» قبل الفعل كـ«معلّمك: أ. …، انتقال»
     (قرارُ المالك · التعليلُ عند `joinList` في ui.js).
     ⚠️ وبلا كلمةٍ للمادّة لا سطر: «: علمي» بلا اسمٍ قبلها تُقرأ عطلاً، والقاعدةُ تمنعه أصلاً (183). */
  const strm = subj.stream_label && (subj.streams || []).find(st => st.id === subj.my_stream);

  const lcard = (l, next) => `
    <div class="lsn ${l.locked?'locked':''} ${l.done?'done':''} ${next?'next':''}" data-i="${l.id}"
         ${next?'aria-current="step"':''}>
      <div class="lsn-t" dir="auto">${esc(l.title)}
        ${l.done?'<span class="badge ok">أُنجز'+(l.best!=null?' '+AR(l.best)+'٪':'')+'</span>':''}
        ${next?'<span class="badge next">التالي</span>':''}
        ${l.locked?'<span class="badge lock">🔒</span>':''}</div>
      ${/* 🆕 b123 · `dir="auto"` كالعنوان فوقه: الصفحةُ `rtl`، فملخّصٌ
            إنجليزيٌّ داخلها فقرةٌ عربيّةُ الاتجاه — ونقطتُه محايدةٌ
            فتتبع الفقرةَ لا النصّ، فتُرحَّل إلى يساره: `.vocabulary`.
            و`auto` لا `ltr`: الاتجاهُ يُقرأ من أوّل حرفٍ قويّ، فيصحّ
            للعربيّ والإنجليزيّ بسطرٍ واحد. */''}
      ${/* 🔓 b139 · وسقط الملخّصُ من بطاقة الدرس — **قرارُ صاحب المنصّة.**
            سطرٌ تحت كلّ عنوانٍ في قائمةٍ يُطيلها ولا يُقرأ، والطالبُ
            يدخل الدرسَ ليرى لا ليقرأ عنه. **ويبقى للمؤلّف** في المحرّر
            حيث يُكتب ويُراجَع. */''}
      ${/* 🆕 b146 · مصادرُ الدرس أيقوناتٌ لا شاراتٍ بأسماء — طلبُ صاحب المنصّة.
            والعلّة أنّ البطاقة كانت تُطيلها أسماءُ خمسةِ مصادرَ في أسطر،
            والطالبُ يمسح القائمة ليختار درساً لا ليقرأ فهرسه. والاسمُ
            لا يسقط بل ينتظر: يظهر عند التمرير وعند التركيز بلوحة المفاتيح.
         ♿ و`tabindex` و`aria-label` لازمان: تلميحٌ يراه الفأرُ وحده
            يحجب المعلومةَ عمّن لا فأرَ له — وهو مرفوضٌ صراحةً في هذا
            المشروع (`match_dnd.js` ③). */''}
      ${/* 🆕 b148 · والبطاقاتُ آخرَ الصفّ. ولا تنقض «نوعٌ بصريٌّ آخر لا صفٌّ
            مثلها» (التعليل عند `loadLessonDeck`): الصفُّ **على البطاقة**
            يقول «ماذا في هذا الدرس»، والبطاقاتُ منه — والطالبُ يستحقّ أن
            يعرف قبل أن يدخل. والتمييزُ الذي حُفظ يبقى **داخل** الدرس:
            صفٌّ للمصادر، وبطاقةٌ مستقلّةٌ أسفله.
         🔑 وعدُّها يصل مع الدرس من `list_lessons` (أضافه `165`) — فلا
            نداءَ شبكةٍ ثانٍ لرسم أيقونة. */''}
      ${/* 🆕 b149 · والأيقونةُ صارت **تفتح مصدرَها** — طلبُ صاحب المنصّة.
            ⇒ `<button>` لا `<span tabindex>`: الزرُّ يعمل بـEnter وSpace
            بحكم نوعه، ويُعلن نفسَه زرّاً للقارئ الشاشيّ. وما كان وسماً
            يُقرأ صار فعلاً يقع، والوسمُ لا يُنقَر.
         🔑 **والاختبارُ مفصولٌ عن المصادر** (قرارُ صاحب المنصّة): يُدفَع
            إلى طرف السطر بفاصلٍ رفيع. والقسمةُ ليست شكلاً — هي قسمةُ
            المنصّة نفسِها: ما يُدرَس، وما يَحكم. و`.q` تحمل حلقةً لطيفة
            فيبقى مميَّزاً ولو التفّ السطرُ فسقط ترتيبُه. */''}
      <div class="kico">
        ${(l.items||[]).filter(i=>i.kind!=='quiz').map(i=>`<button type="button"
          class="kic" data-it="${i.id}"
          data-tip="${escA(i.title)}" aria-label="${escA((KINDS[i.kind]||i.kind)+'، '+i.title)}"
          >${ICONS[i.kind]||'•'}</button>`).join("")}
        ${Number(l.cards||0) ? `<button type="button" class="kic" data-deck="1"
          data-tip="${escA(N(l.cards,'بطاقة','بطاقتان','بطاقات','بطاقة')+' للاسترجاع')}"
          aria-label="${escA('بطاقات استرجاع، '+N(l.cards,'بطاقة','بطاقتان','بطاقات','بطاقة'))}"
          >${DECK_IMG}</button>` : ''}
        ${(l.items||[]).filter(i=>i.kind==='quiz').map(i=>`<i class="kico-sep"></i>
          <button type="button" class="kic q" data-it="${i.id}"
          data-tip="${escA(i.title)}" aria-label="${escA('اختبار تشخيصي، '+i.title)}"
          >${ICONS[i.kind]||'•'}</button>`).join("")}
      </div>
      ${l.locked?`<div class="lockmsg">${esc(l.reason||'')}</div>`:''}
    </div>`;

  app.innerHTML = `
    <div class="crumb" id="bk">→ رجوع للمواد</div>
    <div class="nav" style="margin-bottom:14px">
      <button class="btn ghost" id="mnt" style="font-size:.8rem;padding:9px">
        ${/* 🆕 124 · `mentor_g` تصل من `list_subjects`. و«الانتقال» بلا
              مفعولٍ عمداً: الوجهةُ لم تُختَر بعد فلا صيغةَ لها. */''}
        ${subj.mentor_name
            ? G(subj.mentor_g, 'معلمك: أ. ', 'معلمتك: أ. ', 'مع أ. ')
              + esc(subj.mentor_name) + '، انتقال'
            : 'الانضمام إلى معلم'}
      </button>
      ${strm ? `<button class="btn ghost" id="strm" style="font-size:.8rem;padding:9px">${
        esc(subj.stream_label)}: <bdi>${esc(strm.name)}</bdi>، تغيير</button>` : ''}
    </div>
    ${/* خيارٌ واحد لا يُصفّي شيئاً ⇒ لا شريط. والفئتان هما فئتا
          شاشة الأداء نفسُهما — ونسختان تتفارقان دائماً. */''}
    ${strands.length>1?`<div class="an-bar">
      <select id="lsnStrand" class="an-sel" aria-label="الفرع">
        <option value="">كلّ الفروع</option>
        ${strands.map(s=>`<option value="${s.id}">${esc(s.name)}</option>`).join("")}
      </select>
    </div>`:''}
    <div id="lsnlist"></div>`;

  const list = document.getElementById("lsnlist");

  /* تُعاد القائمةُ وحدها لا الشاشة: فالفتاتُ والمعلّمُ والشريطُ
     تبقى موصولةً، والمنسدلةُ تحفظ قيمتَها وموضعَ تركيزها. ولا نداءَ
     شبكةٍ في التصفية أصلاً — ما وصل كافٍ. */
  function paint(){
    const ls = pick==null ? S.lessons
                          : S.lessons.filter(l=>strandsOf(l).has(pick));

    const groups = {};
    ls.forEach(l=>{ (groups[l.level||'—'] ||= []).push(l); });
    /* وعنوانُ المستوى يُحسب بعد التصفية لا قبلها، فلا يبقى
       عنوانٌ فوق فراغ، ولا يُكتب عنوانٌ واحدٌ لما لا يحتمل قسيماً.
       🆕 b173 · **إلّا في الوجه السابق:** هناك يُكتب ولو كان واحداً —
          فهو وحده ما يقول «هذه دروسُ الصفّ الأوّل»، إذ البروازُ يقول
          «صفوف سابقة» ولا يسمّي أيَّها. وغيابُه هو ما جعل دروسَ الأوّل
          تُقرأ دروسَ الثاني قبل هذا البناء. */
    const many = subj.past || Object.keys(groups).length>1;

    /* 🆕 b175 · «التالي» — أوّلُ درسٍ في المعروض لم يُنجَز ولم يُقفَل.
       🔑 **من المعروض لا من الكلّ:** من صفّى بفرعٍ يسأل «من أين في هذا الفرع؟»،
          والتالي من الكلّ قد يقع خارج التصفية فيُميَّز ولا يُرى.
       🔑 **وأوّلُ فجوةٍ لا ما بعد آخرِ مُنجَز:** الترتيبُ ترتيبُ المنهج (`list_lessons`)،
          فدرسٌ تُرك قبل مُنجَزٍ هو موضعُ المتابعة — والسلسلةُ يُتبَع أوّلُها.
       📌 **ولا «تالي» في الوجه السابق:** مراجعةٌ لا مسار (`isDone` · b173).
       🆕 b176 · والحكمُ في `nextOf` — تقرؤه الرئيسةُ أيضاً. */
    const nx = nextOf(subj, ls);

    list.innerHTML =
      !S.lessons.length ? '<div class="status">لا توجد دروس في هذه المادة بعد</div>'
      /* ولا يقع ما دامت الخياراتُ من الموجود — ولافتةٌ تُقال
         خيرٌ من شاشةٍ فارغةٍ تُقرأ «لا مادّةَ هنا». */
      : !ls.length      ? '<div class="status">لا دروس في هذا الفرع</div>'
      : Object.keys(groups).map(g=>`
          ${/* 🆕 b172 · `dir="auto"` كأخواتها في شاشة المؤلّف. و`g` اسمُ
                المستوى من القاعدة (`list_lessons` ⇐ `levels.name`).
             📌 **وحارسٌ لا إصلاح — قِيس ٢٢ أكتوبر:** ١٨ مستوًى، **صفرٌ
                يبدأ بلاتينيّ**، فالشاشةُ اليوم لا تتبدّل بها حرفاً. ومستوًى
                لاتينيٌّ يُكتب غداً (`Band 5.0`) يجد الحكمَ مكتوباً. */''}
          ${many?`<div class="grp" dir="auto">${esc(g)}</div>`:''}
          ${groups[g].map(l => lcard(l, l === nx)).join("")}`).join("");

    list.querySelectorAll(".lsn").forEach(el=>el.onclick=()=>{
      const l = S.lessons.find(v=>String(v.id)===el.dataset.i);
      if(l.locked){ toast(l.reason||"هذا الدرس غير متاح بعد"); return; }
      openLesson(l);
    });

    /* 🆕 b149 · أيقونةُ المصدر تفتح مصدرَها من البطاقة — بثلاثة طرقٍ لا طريق،
       لأنّ الأنماط ثلاثةُ أصناف لا صنفٌ واحد (قُرئ `openItem` قبل البناء):
         ① ما يُفتح في تبويب ⇒ **هنا مباشرةً**، ولا يُنادى `openItem`:
            ذيلُها `openLesson(S.lesson)` و`S.lesson` فارغةٌ على هذه الشاشة
            ⇒ شاشةٌ مكسورة. والنقرةُ من قائمةٍ لا تُغيّر مكانَ قارئها، فتُعلَّم
            الأيقونةُ منجَزةً في موضعها ويبقى الطالبُ حيث كان.
         ② صوتٌ · تسجيلٌ · محاكاة ⇒ تُحقَن في `#slot-<id>` **ولا يُرسم إلا
            في شاشة الدرس** ⇒ تُفتح الشاشةُ ثمّ يُشغَّل المصدرُ فيها ويُمرَّر
            إليه. والوعدُ محفوظ: الأيقونةُ تُوصل إلى المصدر دائماً.
         ③ الاختبارُ ⇒ يبدأ مباشرةً (قرارُ صاحب المنصّة)، و`S.lesson` تُضبط
            قبله فترجع «عودة» إلى درسه لا إلى فراغ.
       ⛔ و`stopPropagation` في الثلاثة: البطاقةُ نفسُها تفتح الدرس. */
    list.querySelectorAll(".kic").forEach(btn => btn.onclick = async e => {
      e.stopPropagation();
      const card = btn.closest(".lsn");
      const l = S.lessons.find(v => String(v.id) === card.dataset.i);
      if(!l) return;
      if(l.locked){ toast(l.reason || "هذا الدرس غير متاح بعد"); return; }

      if(btn.dataset.deck){
        S.lesson = l;
        return openLessonDeck({ id: S.subj.id, name: S.subj.name }, l,
                              () => loadLessons(S.subj));
      }

      const i = (l.items || []).find(x => String(x.id) === btn.dataset.it);
      if(!i) return;

      if(i.kind === 'quiz'){ S.lesson = l; return openItem(i); }

      /* 🆕 b152 · ④ النصُّ ⇒ كتابُه مباشرةً، و`S.lesson` تُضبط قبله
         فترجع «عودة» إلى درسه ويجد زرُّ الاختبار في ختامه اختبارَه. */
      if(i.kind === 'text'){ S.lesson = l; return openText(i); }

      if(canEmbed(i) || isSim(i)){
        openLesson(l);
        openItem(i);
        document.querySelector(`.itm[data-i="${i.id}"]`)
                ?.scrollIntoView({ behavior:'smooth', block:'center' });
        return;
      }

      if(!i.url){ toast("هذا المصدر غير متاح بعد"); return; }
      window.open(siteUrl(i.url), '_blank', 'noopener');   // 🆕 b167 · انظر siteUrl
      await api.markItemCompleted(i.id);
      i.status = 'completed';
      toast("سُجّل اطّلاعك على المصدر");
    });
  }

  document.getElementById("bk").onclick  = loadList;
  document.getElementById("mnt").onclick = ()=>loadMentors(subj, true);
  const sb = document.getElementById("strm");             // 🆕 b194
  if(sb) sb.onclick = () => askStream(subj);

  const sel = document.getElementById("lsnStrand");
  if(sel) sel.onchange = e => {
    pick = e.target.value==='' ? null : Number(e.target.value);
    paint();
  };

  paint();
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
  : `، أ. ${esc(i.author)}`
  /* 🆕 124 · والصيغةُ تُقرأ من المادة الحاضرة لا من المصدر: `list_items`
     لا تحمل صيغةَ المؤلّف، و`S.subj.mentor_g` هي نفسُها — إذ الشارةُ
     لا تُرفع إلا لمن يتابع الطالبَ في هذه المادة بعينها. */
  + (i.from_my_mentor ? G(S.subj?.mentor_g, '، معلّمك', '، معلّمتك', '، مَن يتابعك') : '')
  + (i.reviewed       ? '، اعتمدته بيان' : '')
  + (i.draft          ? '، مسودّة'       : '');

/* صفٌّ واحد للرسميّ وللإضافة — ونسختان تتفارقان دائماً. */
const itmRow = i => `
      <div class="itm ${i.kind==='quiz'?'quiz':''}" data-i="${i.id}">
        <div class="itm-ic">${ICONS[i.kind]||'•'}</div>
        <div style="flex:1">
          <div class="itm-t" dir="auto">${esc(i.title)}</div>
          ${/* 🆕 b179 · والفاصلُ «،» (التعليلُ عند `joinList` في ui.js) — والأجزاءُ مصفوفةٌ
                تُجمع لا أسطرٌ تتجاور: الفاصلةُ تلتصق بما قبلها، ومسافةُ السطر بين قطعتين
                كانت تقع قبلها («شرح مرئي ، ٨ دقائق»). والنقطةُ كانت تحتملها فلم تُرَ. */''}
          <div class="itm-m">${[KINDS[i.kind]||i.kind,
            i.duration ? N(i.duration,'دقيقة','دقيقتان','دقائق','دقيقة') : '',
            i.is_graded ? 'يُحتسب في النتيجة' : '',
            i.required && !i.is_graded ? 'إلزامي' : ''].filter(Boolean).join('، ')}${credit(i)}</div>
        </div>
        <div class="itm-s" data-s="${i.id}">${i.status==='completed'?'✔'
          :((canEmbed(i)||isSim(i))?'▶':((i.kind==='quiz'||i.kind==='text')?'←':'↗'))}</div>
      </div>
      ${(canEmbed(i)||isSim(i))?`<div class="embed-slot" id="slot-${i.id}"></div>`:''}`;

export function openLesson(l){
  S.lesson = l;
  nav('subjects', `/subjects/${S.subj.id}/lessons/${l.id}`);   // 🆕 b167 · الدرسُ داخل مادّته
  /* 🆕 b139 · المادةُ إلى البرواز كأخواتها، والوحدةُ تبقى وصفاً —
     فهي سياقُ الدرس داخل المادة لا اسمَ مكانٍ آخر. ولمّا صارت المادةُ
     في البرواز لم يبقَ للوصف بديلٌ عنها حين تغيب الوحدة. */
  head(l.title, l.unit || "", false, S.subj.name);

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
    ${/* 🆕 b139 · والفتاتُ يقول فعلَه لا وِجهتَه — فالمادةُ في البرواز
          فوقه، **واسمٌ يُكتب مرّتين في شاشةٍ واحدة يُقرأ سهواً.** */''}
    <div class="crumb" id="bk">→ عودة</div>
    ${/* 🆕 b123 · `dir="auto"` — وعلّتُها في بطاقة الدرس (`lcard`). */''}
    ${/* 🔓 b139 · وسقط هنا أيضاً — قرارُ صاحب المنصّة. ومن بلغ الدرسَ
          فقد اختاره، فبطاقةٌ تصفه فوق مصادره تؤخّر ما جاء له. */''}
    <div class="grp">مصادر الدرس <span class="chip">${AR(done)} / ${AR(items.length)}</span></div>
      ${items.map(itmRow).join("")}
    ${!items.length?'<div class="status">لم تُضف مصادر لهذا الدرس بعد</div>':''}
    ${extras.length?`<div class="grp" style="margin-top:22px">إضافات المعلمين
        <span class="chip">${AR(extras.length)}</span></div>
      ${extras.map(itmRow).join("")}`:''}
    <p class="hint">المطلوب ${AR(l.pass_mark)}٪ في الاختبار لإتمام الدرس</p>`;

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

  /* 🆕 b152 · نصٌّ ⇒ كتابٌ يُقلَّب. وكان يقع في «غير متاح بعد» أدناه:
     النمطُ `text` قائمٌ في `item_kinds` والمحرّرُ يكتب `body` منذ زمن،
     **والطالبُ وحده لم يكن له ما يقرؤه به.** */
  if(i.kind === 'text') return openText(i);

  if(i.url){
    window.open(siteUrl(i.url),'_blank','noopener');
    await api.markItemCompleted(i.id);
    i.status = 'completed';
    toast("سُجّل اطّلاعك على المصدر");
    openLesson(S.lesson);
    return;
  }
  toast("هذا المصدر غير متاح بعد");
}

/* ── الكتاب المقلَّب — مصدرُ «نصّ» (b152) ──
   المحرّكُ في `book.js` لا يعرف المنصّة؛ وهذا الجسرُ يعطيه ما يخصّها:
   النصَّ من القاعدة، و`fmt` و`AR` و`G()`، وما يقع عند الختام.

   🔑 **والختامُ يصل القراءةَ بالاختبار، وبينهما وقفةُ استرجاع:** الفكرةُ
      في جملةٍ والكتابُ مغلق، ثمّ المقارنة. وهي أرخصُ ما يُثبّت الفهم —
      واختبارٌ يتلو قراءةً بلا استرجاعٍ يقيس الذاكرةَ القريبة لا الفهم.
   🔑 **والإتمامُ عند الختام لا عند الفتح** — مذهبُ مشغّل الصوت أدناه.
      ومن قلّب إلى الآخر أسرعَ ممّا يُقرأ لا يُنادي المحرّكُ `onEnd` أصلاً،
      فلا يُسجَّل له شيءٌ ولا يُقال له شيء: صمتٌ صادقٌ خيرٌ من «أحسنت»
      كاذبة. والحدُّ (٤٥٠ كلمة في الدقيقة) وتعليلُه في `book.js`.
   ⚠️ **وفجوةٌ معلنة:** الرياضيات (`\(…\)`) تُعرض في الكتاب مصدراً خاماً
      لا مرسومة — `mathBoot` يغيّر ارتفاعَ السطر بعد القياس فتفيض الصفحة.
      ونصوصُ القراءة اليوم بلا رياضيات؛ ويُعالَج حين يُكتب أوّلُها. */
async function openText(i){
  const l = S.lesson;
  nav('subjects');
  /* بلا عنوان: الغلافُ يحمله، واسمٌ يُكتب مرّتين في شاشةٍ واحدة يُقرأ
     سهواً (b139). */
  head('', '');
  app.innerHTML = `
    <div class="crumb" id="bk">→ عودة</div>
    <div id="book">${skeleton('rows', 3)}</div>
    <div id="ra" hidden></div>`;
  const back = () => l ? openLesson(l) : loadLessons(S.subj);
  document.getElementById("bk").onclick = back;

  /* 🆕 b156 · **شبكةُ أمان:** أيُّ خطأٍ بعد الهيكل يُعرض رسالةً بنسخة
     الواجهة — لا هيكلاً رمادياً يدور إلى الأبد. وهو عَرَضُ b155 بعينه:
     خطأٌ واحدٌ صامت، والطالبُ ينتظر ما لا يأتي ولا يعرف ما يقول لمعلّمه. */
  try { await textBook(i, l, back); }
  catch(e){
    console.error(e);
    const host = document.getElementById("book");
    if(host) host.innerHTML = errBox(e, 'فتح الكتاب');
  }
}

async function textBook(i, l, back){
  /* 🆕 b153 · ومفرداتُ الدرس معه — بنداءٍ موازٍ لا تالٍ. وفشلُها لا يحجب
     الكتاب: نصٌّ بلا كلماتٍ ملوّنة خيرٌ من نصٍّ لا يُفتح.
     ⚠️ b156 · **`.then(نجاح، فشل)` لا `.catch`:** مُنشئُ طلبات Supabase
     يملك `then` وحدها — `.catch` عليه «ليس دالّة»، فيسقط `openText` كلُّه
     قبل الكتاب (عطلُ b155). والبديلُ في الفحص كان يُرجع Promise حقيقياً
     فأخفاه؛ وصار الآن يحاكي المُنشئ تماماً. */
  /* 🆕 b164 · والقراءةُ الجهريّة معهما — أيُطلب في هذا النصّ؟ وفشلُها لا يحجب
     الكتاب: نصٌّ بلا زرّ تسجيلٍ خيرٌ من نصٍّ لا يُفتح. */
  const [{ data, error }, cardsRes, raRes] = await Promise.all([
    api.itemText(i.id),
    l ? api.lessonCards(l.id).then(r => r, e => ({ error: e })) : Promise.resolve({ data: [] }),
    api.myReading(i.id).then(r => r, e => ({ error: e }))
  ]);
  const host = document.getElementById("book");
  if(!host) return;                                  // غادر قبل وصول النصّ
  if(error){ host.innerHTML = errBox(error, 'النص'); return; }
  if(!data?.body?.trim()){ toast("هذا المصدر غير متاح بعد"); back(); return; }
  api.markItemOpened(i.id);

  const { createBook } = await import('./book.js');
  if(!host.isConnected) return;

  const title = data.title || i.title;
  const quiz  = (l?.items || []).find(x => x.kind === 'quiz' && x.quiz_id);
  const g     = S.prof?.gram_gender;
  /* القراءةُ الجهريّة تظهر حيث تطلبها القاعدة **ويقدر عليها المتصفّح** — فلا
     زرٌّ يَعِد بما لا يكون (متصفّحٌ قديم أو صفحةٌ بلا HTTPS). */
  const raOn = !!raRes?.data?.enabled && canRecord();

  /* 🆕 b189 · المظهرُ والختامُ من `bookLook` و`bookEnd` أدناه — ومعاينةُ المحرّر تقرأ منهما،
     وما هنا سلوكُ الطالب وحده: الموضعُ والتسجيلُ والاختبارُ والإتمام. */
  const ctl = await createBook(host, {
    ...bookLook({ cards: cardsRes?.data, g, subject: S.subj?.name, lesson: l, title }),
    slot: raOn,
    title, subtitle: data.description, body: data.body, lang: data.lang || i.lang,
    storeKey: 'bayan.book.' + i.id,
    endHtml: () => bookEnd(g, !!quiz),
    onAction: (act, book) => {
      if(act === 'quiz' && quiz) return openItem(quiz);
      if(act === 'again') return book.restart();
      if(act === 'back') return back();
    },
    onResume: () => toast("فُتح الكتاب على صفحتك الأخيرة"),
    onEnd: async () => {
      if(i.status === 'completed') return;
      const { error: e } = await api.markItemCompleted(i.id);
      if(e){ toast("لم تُسجَّل قراءتك — ربما تكون المشكلة في الاتصال"); return; }
      i.status = 'completed';
      toast("سُجّلت قراءتك ✔");
    }
  });

  const sheet = document.getElementById("ra");
  if(raOn && ctl?.slot && sheet){
    const en = ctl.dir === 'ltr';
    mountReading(ctl.slot, sheet, {
      itemId: i.id, info: raRes.data, dir: en ? 'ltr' : 'rtl',
      t: en ? READ_EN : readAr(g), num: en ? String : AR,
      privacyUrl: '/privacy.html', toast,
      api: { start: api.startReading, upload: api.uploadRecording },
      busy: on => ctl.voiceLock(on)
    });
  }
}

/* ── مظهرُ الكتاب (b189) ──
   ما يراه الطالب من النصّ — **مصدرٌ واحدٌ لشاشتين:** قراءتُه أعلاه، ومعاينةُ المعلّم في محرّر
   المصدر (`editor_items.js`). ومعاينةٌ تبني مظهرَها بنفسها تفترق عن الحقيقة يوماً بصمت،
   فتُري المعلّمَ كتاباً غيرَ الذي يقرؤه طالبُه.
   `preview` ⇒ نافذةُ الكلمة بلا «إضافة إلى تذكّرها»: المعلّمُ يرى ولا يشترك. */
export function bookLook({ cards, g, subject, lesson: l, title, preview = false }){
  /* عنوانُ الدرس يسقط من الغلاف إن احتوى عنوانَ النصّ («Reading: X» و«X»)
     وتحلّ الوحدةُ محلَّه — السياقُ نفسُه بلا تكرار. */
  const lessonLine = l?.title && !l.title.includes(title) ? l.title : (l?.unit || '');
  /* المفردةُ عبارةٌ حتى ثلاث كلمات؛ وما زاد فبطاقةُ استراتيجيةٍ تُشرح ولا
     تُبحث في النصّ («main idea vs. supporting detail»). */
  const glossary = (cards || []).filter(c =>
    String(c.front || '').replace(/\s*\([^)]*\)\s*$/, '').trim().split(/\s+/).length <= 3);
  const word = wordPanel(g, preview);
  return {
    kicker: [subject, lessonLine],
    format: fmt, num: AR,
    glossary,
    /* 🆕 b165 · الصورُ داخل النصّ تمرّ بالحارس الواحد للوسائط: مفتاحُ مخزننا أو مضيفٌ
       مأذون، وما سواه يسقط صامتاً — الإنذارُ للمعلّم في محرّره لا للطالب في قراءته. */
    media: srcOf,
    /* 🆕 b170 · والفيديو بحارسه: يوتيوب أو Drive، ويُبنى رابطُ التشغيل من معرّف المقطع وحده. */
    video: videoOf,
    onNotice: m => toast(m),
    /* النطقُ الآليّ للإنجليزية وحدها — وهو حكمُ الملفّ `101` في media.js:
       القراءةُ الآليّة للعربية تُسقط الإعرابَ وتُخطئ الحركات. */
    tapAny: dir => dir === 'ltr',
    wordHtml: word.html,
    onWord: word.bind,
    /* 🆕 b155 · استمع وتابع — بأحسن صوتٍ على جهاز الطالب، **والإنجليزيةُ وحدها**
       (قرارُ المالك: العربيةُ مؤجَّلة، وحكمُ `101` قائم). والسرعةُ الأساسُ ٠٫٩
       كنطق الكلمة: المستمعُ متعلّمٌ لا ناطق. */
    voice: {
      available: dir => dir === 'ltr' && typeof window !== 'undefined' && !!window.speechSynthesis,
      speak: (text, o) => narrate(text, { lang: 'en', rate: 0.9 * o.rate, onend: o.onend, onerror: o.onerror }),
      stop: hush,
      name: () => voiceName('en')
    },
    onVoiceFail: () => toast("تعذّر النطق على هذا الجهاز"),
    /* 🆕 b193 · كلٌّ باسمه: القصيدةُ «١٠ أبيات» لا «١٠ فقرات»، والآيتان «آيتان» — وما كان صفراً يغيب */
    coverMeta: ({ paragraphs, verses = 0, ayat = 0, words, minutes }) => [
      paragraphs ? N(paragraphs, 'فقرة', 'فقرتان', 'فقرات', 'فقرة') : '',
      verses ? N(verses, 'بيت', 'بيتان', 'أبيات', 'بيتاً') : '',
      ayat ? N(ayat, 'آية', 'آيتان', 'آيات', 'آية') : '',
      N(words, 'كلمة', 'كلمتان', 'كلمات', 'كلمة'),
      'نحو ' + N(minutes, 'دقيقة', 'دقيقتين', 'دقائق', 'دقيقة')
    ].filter(Boolean).join('، ')                   // 🆕 b179 · «،» — joinList في ui.js
  };
}

/* وصفحةُ الختام — مشتركةٌ كذلك، والأفعالُ ([data-act]) يُجيبها صاحبُ الشاشة. */
export const bookEnd = (g, quiz) => `
      <div class="bk-end-orn" aria-hidden="true"><i></i><i></i><i></i></div>
      <div class="bk-end-t">نهاية النص</div>
      <div class="bk-ask"><b>${quiz ? 'قبل الاختبار' : 'استرجاع'}</b><span>${G(g,
        'أغلق الكتاب، وقل فكرة النص في جملة واحدة، ثم افتحه وقارن.',
        'أغلقي الكتاب، وقولي فكرة النص في جملة واحدة، ثم افتحيه وقارني.',
        'تُقال فكرة النص في جملة واحدة والكتاب مغلق، ثم يُفتح للمقارنة.')}</span></div>
      <div class="bk-end-btns">
        ${quiz ? `<button type="button" class="btn primary" data-act="quiz">الاختبار</button>` : ''}
        <button type="button" class="btn ghost" data-act="again">قراءة من البداية</button>
        ${quiz ? '' : `<button type="button" class="btn ghost" data-act="back">العودة إلى الدرس</button>`}
      </div>`;

/* ── نصوصُ القراءة الجهريّة (b164) ──
   🔑 **لغةُ اللوحة لغةُ النصّ:** نصٌّ إنجليزيٌّ يُقرأ جهراً تحت «Reading aloud»،
      وعربيٌّ تحت «القراءة الجهرية» (الاسمان من المالك · ٢١ أكتوبر).
   🔑 والخطابُ بـ`G()` بثلاث صيغ حيث كان أمراً، والزرُّ مصدر — §٤ من الهويّة اللغويّة.
   🔑 وسطرُ الخصوصية هو وعدُ §٢ بحرفه: لا يبدأ إلا بضغطك، ويُحذف خلال ٧ أيام. */
function readAr(g){
  return {
    name: 'القراءة الجهرية',
    intro: G(g, 'اقرأ النص بصوتك وأنت تقلّب الصفحات، ثم استمع إلى قراءتك وأرسلها.',
                'اقرئي النص بصوتك وأنت تقلّبين الصفحات، ثم استمعي إلى قراءتك وأرسليها.',
                'يُقرأ النص بصوت مسموع مع تقليب الصفحات، ثم تُسمع القراءة وتُرسل.'),
    privacy: 'لا يبدأ التسجيل إلا بضغطك، ويُحذف خلال ٧ أيام.',
    privacyLink: 'سياسة الخصوصية',
    start: 'بدء التسجيل',
    recording: 'التسجيل يعمل',
    turnPages: G(g, 'قلّب الصفحات كعادتك، والتسجيل مستمر.', 'قلّبي الصفحات كعادتك، والتسجيل مستمر.',
                    'تقليب الصفحات لا يوقف التسجيل.'),
    stop: 'إيقاف',
    review: G(g, 'استمع إلى قراءتك قبل إرسالها.', 'استمعي إلى قراءتك قبل إرسالها.',
                 'قراءتك جاهزة للاستماع قبل الإرسال.'),
    send: 'إرسال', retry: 'إعادة الإرسال', again: 'إعادة التسجيل', close: 'إغلاق',
    sent: 'وصلت قراءتك، وتُحذف خلال ٧ أيام.',
    teacherNote: 'ملاحظة معلّمك',
    last: d => 'آخر قراءة أرسلتها: ' + (d === 0 ? 'اليوم' : d === 1 ? 'أمس'
             : d === 2 ? 'قبل يومين' : 'قبل ' + AR(d) + (d <= 10 ? ' أيام' : ' يوماً')),
    denied: 'لم يُسمح باستعمال الميكروفون. يمكنك السماح به من إعدادات المتصفح.',
    nomic: 'لا يوجد ميكروفون في هذا الجهاز.',
    micfail: 'تعذّر تشغيل الميكروفون.',
    short: 'التسجيل قصير جداً.',
    max: 'بلغ التسجيل خمس دقائق، فتوقّف.',
    tooBig: 'الملف أكبر من المسموح.',
    badType: 'صيغة التسجيل غير مقبولة في هذا المتصفح.',
    fail: 'تعذّر الإرسال'
  };
}
const READ_EN = {
  name: 'Reading aloud',
  intro: 'Read the text aloud as you turn the pages, then listen to your reading and send it.',
  privacy: 'Recording starts only when you press the button, and is deleted within 7 days.',
  privacyLink: 'Privacy policy',
  start: 'Start recording',
  recording: 'Recording',
  turnPages: 'Turn the pages as usual. Recording continues.',
  stop: 'Stop',
  review: 'Listen to your reading before you send it.',
  send: 'Send', retry: 'Send again', again: 'Record again', close: 'Close',
  sent: 'Your reading was sent. It will be deleted within 7 days.',
  teacherNote: "Your teacher's note",
  last: d => 'Last reading you sent: ' + (d === 0 ? 'today' : d === 1 ? 'yesterday' : d + ' days ago'),
  denied: 'Microphone access is blocked. You can allow it in your browser settings.',
  nomic: 'No microphone was found on this device.',
  micfail: 'The microphone could not start.',
  short: 'The recording is too short.',
  max: 'The recording reached five minutes and stopped.',
  tooBig: 'The file is larger than allowed.',
  badType: 'This browser records in a format we cannot accept.',
  fail: 'Sending failed'
};

/* ── نافذةُ الكلمة في الكتاب (b153) ──
   🔑 **التخمينُ قبل الكشف (`GUESS_FIRST`) — والحجّةُ هدفٌ يُقاس لا ذوق:**
      «inferring word meaning from context» هدفٌ في دروس القراءة، والكلماتُ
      المسطَّرةُ في النصوص هي بعينها كلماتُ أسئلته. فنافذةٌ تُعطي المعنى
      لأوّل لمسة **تقرأ عن الطالب ما جاء الدرسُ ليعلّمه إيّاه**. ⇒ تُسمِعه
      الكلمةَ وتدعوه إلى التخمين، ولمسةٌ ثانية تكشف — فيقارن تخمينَه
      بالجواب، وتلك المقارنةُ هي التعلّم. **وما كُشف مرّةً يُعرض فوراً
      بعدها** في الجلسة نفسها: التخمينُ لقاءٌ أوّل لا عقوبةٌ متكرّرة.
   🔑 **والنطقُ لا يُفشي المعنى** — مذهبُ `sayable` في ui.js: سماعُ الكلمة
      صفتُها، فيُسمَع عند الفتح بلا انتظار.
   🔑 **و«إضافة إلى تذكّرها» تصل القراءةَ بالمراجعة المتباعدة:** الكلمةُ
      التي توقّف عندها تعود إليه بعد أيّام. والنداءُ قائمٌ (`subscribe_cards`)
      وهو نفسُه الذي تضمّ به «بطاقاتُ الدرس» بطاقاتِها. */
const GUESS_FIRST = true;

function wordPanel(g, preview = false){
  const revealed = new Set();
  const pseudo = (card, w) => card || { front: w, lang: 'en' };
  const head = front => {
    const m = String(front || '').match(/^(.*?)\s*\(([^)]*)\)\s*$/);
    return m ? [m[1], m[2]] : [String(front || ''), ''];
  };

  const meaning = card => {
    const [main, meta] = backMeta(card.back);
    const [tr, def] = backText(main).split('\n');
    return `<div class="bk-mean">
      <div class="bk-tr" dir="auto">${fmt(tr)}</div>
      ${def ? `<div class="bk-def" dir="auto">${fmt(def)}</div>` : ''}
      ${meta ? `<div class="bk-meta" dir="auto">${esc(meta)}</div>` : ''}
      ${preview ? '' : `<div class="bk-pfoot">${card.mine
        ? '<span class="bk-in">في «تذكّرها» ✔</span>'
        : '<button type="button" class="bk-pbtn" data-pk="add">إضافة إلى «تذكّرها»</button>'}</div>`}
    </div>`;
  };

  const html = (card, w) => {
    const c = pseudo(card, w);
    const [t, pos] = card ? head(card.front) : [w, ''];
    /* السطرُ يأخذ اتجاهَ الكلمة لا اتجاهَ النافذة: زرُّ النطق **بعد** الكلمة
       في ترتيب قراءتها — حكمُ `sayGroup` في ui.js. */
    let h = `<div class="bk-pw" dir="${dirOf(t)}"><span class="bk-pw-t">${esc(t)}</span>
      ${pos ? `<span class="bk-pos" dir="ltr">${esc(pos)}</span>` : ''}
      ${sayable(c) ? sayGroup(c) : ''}</div>`;
    if(card){
      h += (!GUESS_FIRST || revealed.has(card.id)) ? meaning(card)
        : `<p class="bk-hint">${G(g,
            'خمّن معناها من الجملة، ثم اكشفه.',
            'خمّني معناها من الجملة، ثم اكشفيه.',
            'معناها من الجملة أولاً، ثم الكشف.')}</p>
           <button type="button" class="bk-pbtn wide" data-pk="reveal">المعنى</button>`;
    }
    return h;
  };

  const bindAdd = (el, card, reflow) => {
    const b = el.querySelector('[data-pk="add"]');
    if(!b) return;
    b.onclick = async () => {
      b.disabled = true;
      const { error } = await api.subscribeCards([card.id]);
      if(error){ b.disabled = false; toast("لم تُضَف — ربما تكون المشكلة في الاتصال"); return; }
      card.mine = true;
      b.outerHTML = '<span class="bk-in">في «تذكّرها» ✔</span>';
      reflow();
    };
  };

  const bind = ({ entry: card, word: w, el, reflow }) => {
    const c = pseudo(card, w);
    const say = sayable(c);
    if(say){
      bindSay(el, c, say);
      const acc = accents(c.lang || 'en');
      if(c.audio) playAudio(c.audio);
      else if(acc.length) speak(say.text, acc[0].code);
    }
    if(!card) return;
    const r = el.querySelector('[data-pk="reveal"]');
    if(r) r.onclick = () => {
      revealed.add(card.id);
      el.querySelector('.bk-hint')?.remove();
      r.outerHTML = meaning(card);
      bindAdd(el, card, reflow);
      reflow();
    };
    bindAdd(el, card, reflow);
  };

  return { html, bind };
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
        <button class="aud-b" data-a="back">⟲ ١٠ ثوان</button>
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
    note.textContent = "تعذّر تشغيل الملف — يمكنك إبلاغ معلّمك";
    console.warn("[media] فشل التشغيل:", i.url, "→", src);
  };

  /* التسجيل عند الانتهاء لا عند الفتح:
     «فتحَ» ليست «سمعَ»، وإشارةٌ كاذبة أسوأ من إشارةٍ ناقصة. */
  au.onended = async () => {
    note.textContent = "سُجّل استماعك ✔";
    if(i.status === 'completed') return;
    const { error } = await api.markItemCompleted(i.id);
    if(error){ note.textContent = "لم يُسجَّل — ربما تكون المشكلة في الاتصال"; return; }
    i.status = 'completed';
    const s = document.querySelector(`[data-s="${i.id}"]`);
    if(s) s.textContent = '✔';
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
  /* 🆕 124 · «ملاحظات معلمي» ⇐ «ملاحظاتٌ على إجاباتي»: الشاشةُ تجمع
     ملاحظاتِ المواد كلّها، ولكلّ مادةٍ معلّمُها. فالمفردُ خبرٌ غيرُ
     صادق — والصيغةُ فرعٌ عن ذلك لا أصلُ المسألة. */
  nav('feedback'); head("ملاحظات على إجاباتي", S.prof.full_name);
  app.innerHTML = skeleton('rows');
  const { data, error } = await api.myFeedback(S.user.id);

  const list = data || [];
  app.innerHTML = `
    ${errBox(error,'ملاحظات المعلم')}
    ${list.length?list.map(f=>`
      <div class="rev ${f.read_by_student?'':'new'}">
        <div class="rev-q">${esc(f.quizzes?.title||'')} ${f.read_by_student?'':'<span class="badge lock">جديد</span>'}</div>
        <div class="line">${new Date(f.submitted_at).toLocaleDateString('ar-EG')}، اختيار ${AR(f.score)}/${AR(f.total)} (${AR(f.pct)}٪)${f.essay_score!=null?`، مقالي: ${AR(f.essay_score)}`:''}</div>
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
    ${/* 🔓 b139 · وسقط «— وسؤالك يُكتب أدناه» من نصّ الفراغ، وصار
          «لا توجد رسائل جديدة» — **قرارُ صاحب المنصّة.** والشطرُ الساقط
          يدلّ على حقلٍ **تحته مباشرةً** عنوانُه «رسالتك» ومعه زرُّ
          «إرسال»، فهو يصف ما تراه العينُ في السطر الذي يليه.

       ⚠️ **وفرقٌ مكتوبٌ ليُرى:** `msgs` هي الخيطُ كلُّه
          (`api.studentThread`) لا الجديدُ منه، فالحالةُ الفارغة تعني
          **لا رسالةَ قطّ** لا «لا رسالةَ جديدة». وقد عُرض الفرقُ على
          صاحب المنصّة فاختار هذا النصّ. ⇒ يُكتب هنا لا ليُنقَض، بل
          **لئلّا يُقرأ يوماً خطأً مطبعيّاً فيُعاد إلى «بعد» بحسن نيّة.**

       ✅ **ونصُّ المعلّم وُحِّد معه** في `js/teacher.js` — كان «لا توجد
          رسائل بعد». وهو الخيطُ نفسُه بعينين، **واسمان لحالةٍ واحدة**
          يمنعهما §١٠ من `bayan-language-identity`. ⇒ **غُيّرا معاً، ومن
          غيّر أحدَهما يوماً فليغيّر أخاه.** */''}
    ${msgs.length?`<div class="chat">${msgs.map(m=>bubble(m,m.sender_role==='student')).join("")}</div>`
      :'<div class="status">لا توجد رسائل جديدة</div>'}
    <div class="card"><label class="fl">رسالتك</label>
      <textarea id="mt" placeholder="سؤالك العلميّ…"></textarea></div>
    <div class="nav"><button class="btn primary" id="snd">إرسال</button></div>`;
  document.getElementById("snd").onclick = async ()=>{
    const t = (document.getElementById("mt").value||"").trim();
    if(!t){ toast("رسالتك أولاً"); return; }
    const { error } = await api.sendMessage({
      studentId:S.user.id, senderId:S.user.id, senderRole:'student', body:t });
    toast(error?"تعذّر الإرسال":"أُرسلت رسالتك"); loadChat();
  };
  scrollBottom();
}

/* اختبار تحديد المستوى — أداةٌ قائمة بذاتها، لا درسَ لها ولا مقرَّر */
async function startPlacement(x){
  if(!x.tool){ toast("اختبار تحديد المستوى قيد الإعداد"); return; }
  /* 🆕 b139 · الترويسةُ تُمسح مع وضع الهيكل — انظر `waiting` في ui.js. */
  waiting('screen');
  const { data, error } = await api.placementStart(x.tool);
  if(error){ app.innerHTML = errBox(error.message, 'تحديد المستوى'); return; }
  if(!data.ok){ toast(data.error); loadList(); return; }
  const { startPlacementQuiz } = await import('./quiz.js');
  startPlacementQuiz(data.session, data.quiz, x, data.resumed);
}

/* ═══════════ بطاقات الدرس — مصدرٌ ثابت لا فعلٌ يقع مرّة ═══════════ */

/* 🆕 b147 · صارت مجسَّمةً كأخواتها. وكانت خطّيّةً بـ`currentColor`، فلمّا
   صارت المصادرُ الثلاثةَ عشرَ مجسَّمةً في `b146` بقيت وحدها خطّيّةً بينها —
   تنافرٌ أحدثَته تلك الدفعةُ ولم يكن قبلها.
   🔑 وكحليّةٌ لا ذهبيّة: الذهبيُّ يزاحم «الاختبار» الكهرمانيَّ وهما يقعان
      في شاشةٍ واحدة. والنسخةُ الذهبية محفوظةٌ في `img/kind/_raw/`.
   ⚠️ وليست في `ICONS`: البطاقاتُ **ليست `item_kind`** (جدول `item_kinds`
      فيه ثلاثةَ عشرَ كوداً وليس فيها `deck`)، فلو دخلت الخريطةَ لأوهمت
      قارئَ الشيفرة أنّها نمطُ مصدرٍ يُؤلَّف — وهي نظامٌ آخر (`decks`). */
const DECK_IMG = `<img src="/img/kind/deck.webp" class="ic-3d" alt=""
  width="40" height="40" loading="lazy">`;

/* 🔴 b148 · كانت تبحث عن **مجموعةٍ** لها `lesson_id`، فلم تُرسَم قطّ:
      `subject_decks` لا تُرجع `lesson_id` أصلاً (⇒ `undefined`)، و
      `decks.lesson_id` فارغٌ في الستّ كلِّها. عطلٌ مزدوجٌ صامت حجب بطاقات
      **٢١٣ درساً** عن الطلاب منذ كُتب.
   🔑 والعلّةُ الجذرية نموذجٌ خاطئ: المؤلّفون يسمون **البطاقةَ** بدروسها
      (`card_lessons`) لا المجموعةَ بدرسٍ واحد — وهو الأصحّ، فبطاقةٌ قد
      تخدم درسين. ⇒ `165` أنشأ `lesson_cards(lesson_id)`، والعدُّ يصل
      مع الدرس نفسِه في `list_lessons` فسقط نداءُ الشبكة من هنا كلُّه. */
function loadLessonDeck(l){
  const n = Number(l.cards || 0);
  if(!n) return;

  const host = document.createElement('div');
  host.className = 'deck-card';
  host.setAttribute('role', 'button');
  host.tabIndex = 0;
  host.innerHTML = `
    <div class="deck-ic">${DECK_IMG}</div>
    <div class="deck-txt">
      <div class="deck-t">بطاقات ${esc(l.title)}</div>
      <div class="deck-m">${N(n,'بطاقة','بطاقتان','بطاقات','بطاقة')}، تعود إليك بالتباعد</div>
    </div>
    <div class="deck-go">←</div>`;

  const anchor = app.querySelector('.hint');
  anchor ? anchor.before(host) : app.append(host);

  const open = () => openLessonDeck(
    { id: S.subj.id, name: S.subj.name },
    l,
    () => openLesson(l));                       // العودة إلى الدرس لا إلى «تذكّرها»

  host.onclick = open;
  host.onkeydown = e => { if(e.key === 'Enter' || e.key === ' '){ e.preventDefault(); open(); } };
}
