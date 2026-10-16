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
   ➕ b69/b70 — المزاوجة.
      الدرجةُ للبند لا للسؤال، خلافاً لـmsq — وعلّةُ المنع هناك ثغرةُ
      التوسّع («من يختار الخيارات كلها يأخذ الدرجة كاملة»)، ولا وجود
      لها حين يُسنَد مقابلٌ واحد لكلّ بند. والتصحيحُ كلُّه في القاعدة
      كما كان: الواجهة ترسل النصوص وتستقبل الحكم.
   ══════════════════════════════════════════════════════════ */
import * as api from './api.js';
import { S } from './state.js';
import { app, bar, head, toast, esc, fmt, AR, mmss, media, pgMedia, srcOf,
        optLabel, dirOf, ICONS, nav, scrollTop, skeleton, waiting, G,
        /* `N` محجوزةٌ هنا لخريطة أرقام الأسئلة (السطر ٦٦) — فتُستورد
           دالّةُ العدد والمعدود باسمٍ آخر، ولا يُعاد تسميةُ المحلّية:
           هي في أربعة عشر موضعاً وتلك في موضعٍ واحد. */
        N as عدد } from './ui.js';
import { loadList, loadLessons } from './student.js';
/* `kindLabel` لا `KIND_LABEL`: اسمُ النمط صار يتبع لسانَ الورقة
   (render_q.js · b142)، والخريطةُ الخام لم يبقَ لها قارئٌ هنا. */
import { questionText, questionBody, kindLabel, paperIsEnglish, gapCount,
         bodyRead } from './render_q.js';
import { wireMatching } from './match_dnd.js';

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
  pair: 60,      // ثانيةً لكلّ بندٍ في المزاوجة — البندُ قرارٌ بدرجته
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
     و ?? حارسٌ لازم لا زينة: المخطّط يسمح بأربعة أنماطٍ لا تعرضها
     الواجهة بعد، ونمطٌ مجهول بلا حارسٍ يُنتج undefined فتصير
     الميزانية كلُّها NaN، وNaN <= 0 كاذبة فلا يُسلَّم الاختبار
     أبداً ويبقى العدّاد يعرض NaN:NaN.

     🆕 والمزاوجة وحدها تُحسب بالبند لا بالسؤال: بندٌ ثالثٌ وبندٌ
        ثامن ليسا سؤالاً واحداً في الكلفة كما ليسا واحداً في الدرجة.
        والأدنى ثلاثة — وهو ما تفرضه save_question أصلاً. */
  const perQ = qs.reduce((s, q) =>
        s + (q.kind === 'matching'
               ? COST.pair * Math.max(3, (q.options || []).length)
               : (COST.q[q.kind] ?? COST.q.mcq))
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
  /* 🆕 b139 · الترويسةُ تُمسح مع وضع الهيكل — انظر `waiting` في ui.js. */
  waiting('screen');
  /* 🆕 b142 · حارسٌ لا زينة: اتجاهُ ورقة التسكين سمةٌ على `body`، ومسلكُ
     الخطأ في التسليم يترك الطالبَ في شاشةٍ بلا مخرج. فإن عاد بعدها إلى
     درسٍ بقيت المنصّةُ كلُّها مقلوبة — ويُردّ هنا حيث يبدأ كلُّ اختبارٍ
     عاديّ. (ولا يكفي ردُّه عند «بدء التعلّم»: ذاك مسلكُ النجاح وحده.) */
  paperDir(false);
  const { data, error } = await api.getQuiz(meta.id);
  if(error){ toast(error.message); loadList(); return; }

  S.quiz = data;
  S.passages = {};
  (data.passages||[]).forEach(pg => S.passages[pg.id] = pg);
  S.itemId = meta.item_id || null;
     S.ans = data.questions.map(q=>({ q:q.id, kind:q.kind, o:null, os:[],
                                   txt:Array(gapCount(q.body)||1).fill(""),
                                   pairs:{},                                     // 112 · { مفتاح البند: مفتاح المقابل }
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

/* ═══════════ جلسةُ التسكين ═══════════
   حدُّ المحطّة حقيقةٌ عن الأداة لا عن التجربة: الطالب لا يرى تسليماً
   ولا نتيجةً ولا دخولاً ثانياً — بل قسماً يتلو قسماً.
   ولا عدّادَ بنود: المجموع ٣٤ إلى ٥٢، فإعلانُ رقمٍ كذب. والزمن
   هو الإطار الصادق، والدليل مبنيٌّ عليه.

   🔴 **وعنوانُ المحطّة كان يُفشي ما أخفاه الزرّ (b142).** `head()` تكتب
      `S.quiz.title` فيقرأ الطالب «Routing Station» ثمّ «Panel L» ثمّ
      «فحص الحدّ ١» — فيعلم أنّه يُوجَّه، وأين وُجِّه، وكم بقي. وهو عينُ
      ما مُنع في الزرّ أسفلَ الصفحة بالحجّة المكتوبة تحته.
      ⇒ العنوانُ **اسمُ الاختبار لا اسمُ المحطّة**، ثابتاً في المحطّات
        كلِّها: `IELTS Placement Test`. والقسمُ يتلو القسمَ بلا حدٍّ يُرى.
      ⚠️ فلا يُعاد `S.quiz.title` إلى الترويسة ظنّاً أنّ الشاشة بلا عنوان. */
let PL = null;                      // { session, subject, en }

/* ── لسانُ الورقة ──────────────────────────────────────────────────
   التوجيهاتُ تتبع لسانَ الأسئلة لا لسانَ المنصّة. والحجّةُ مكتوبةٌ في
   ui.js منذ وُلد `L_EN`: «الفجوة بين التدريب والامتحان في مادة لغة
   مسألة تعليمية لا شكلية». ومن يُمتحن في IELTS يقرأ في ورقته
   `Choose the correct answer` و`You will listen to the track ONCE
   only` — فلتقل له الشاشةُ ما تقوله الورقة.

   🔑 والمقياسُ نفسُه في `render_q.js` (`paperIsEnglish`) ليقرأه المؤلّفُ
      كما يقرؤه الطالب — والثابت ⑨ لا يحتمل نسختين.
   📌 **ويُحسب مرّةً للجلسة لا لكلّ محطّة**: الجلسةُ جَلسةٌ واحدة، ولسانٌ
      يتبدّل بين قسمٍ وقسم يُقرأ عطلاً لا دقّة. والأولى هي المقياس.
   🔒 **والتسكينُ وحده** — لا الاختبار العاديّ: ذاك **درسٌ يُقوَّم**، شرحُه
      وتشخيصُه بلسان الطالب لأنّ التشخيص يُقرأ ليُفهَم؛ وهذا **محاكاةُ
      امتحان**، فلسانُه لسانُ الامتحان. ⇒ `PL` هي الحارس.              */

/* ── اتجاه الصفحة ─────────────────────────────────────────────────
   و`dir` سمةٌ على `body` لا صنفٌ ولا نمطٌ في `css/`:
   ① الترويسة (`#head` · `#subhead`) و`#bar` خارج `#app` كلاهما، وهما
      أوّلُ ما تقع عليه العين ⇒ الجذرُ وحده يسعهما.
   ② والسمةُ تجرّ معها عزلَ الاتجاه (`unicode-bidi:isolate`) من نمط
      المتصفّح نفسِه، وهو ما لا يفعله `direction:ltr` وحده.
   ③ ولم يُحتَج `css/` بحرف: أنماطُ شاشة الاختبار كلُّها منطقيّة —
      `border-inline-start` و`text-align:start` و`margin-inline-start`
      و`margin-inline` — فتنقلب وحدها. (قِيس على `.q-sec` و`.psg`
      و`.opt` و`.tick` و`.pair-slot` و`.psg-audio` و`.timerbar`.)
   ⚠️ ويُردّ عند الخروج — وإلّا بقيت المنصّةُ كلُّها مقلوبة. */
const paperDir = on => on ? document.body.setAttribute('dir', 'ltr')
                          : document.body.removeAttribute('dir');

/* نصوصُ الجلسة بلسانَيها. والعربيةُ تبقى كما كانت حرفاً — فالمُضاف
   لسانٌ ثانٍ لا تعديلٌ على الأوّل. */
const PT_AR = {
  tip:     'فكّر جيداً، وأجب بتأنّ',
  tipF:    'فكّري جيداً، وأجيبي بتأنّ',
  once:    'يُشغَّل المقطع مرّة واحدة — والاطّلاع على الأسئلة قبل تشغيله',
  plays:   n => `يُشغَّل المقطع ${AR(n)} مرّات — والاطّلاع على الأسئلة أولاً`,
  free:    'الاطّلاع على الأسئلة أولاً ثمّ تشغيل المقطع',
  passage: 'أسئلة نصّ واحد — يُرجَع إليه عند الحاجة',
  next:    'التالي',
  prev:    'السابق',
  blank:   'متابعة دون إجابة',
  q:       n => `سؤال ${AR(n)}`,
  qShort:  n => 'س' + AR(n),
  noPlays: 'انتهى التشغيل المتاح',
  timeUp:  'انتهى وقت هذا القسم',
  resumed: 'نُستأنف من حيث توقّفت',
  marking: 'جار التصحيح…',
  failed:  'تعذّر المتابعة',
  blanks:  list => `بلا إجابة: ${list} —
    الجواب إن كان لك ترجيح، وتُترك فارغة إن لم يكن.
    التخمين يقع في مشتّت فيُسجَّل لك تشخيص لا يخصّك.`,
  title:   s => `اختبار تحديد المستوى · ${s}`,
  level:   l => `مستواك: ${l}`,
  go:      'بدء التعلّم ←',
  splitAria: 'عرض عمود النصّ — يُسحب، أو يُحرَّك بالأسهم',
  num:     AR
};

/* 🔑 ولا `tipF` هنا — **ونقصٌ مقصودٌ لا سهو**: الأمرُ الإنجليزيُّ لا
   جنسَ له، فصيغتان متطابقتان تُوهمان قارئَهما بعد سنةٍ أنّ ثَمّ فرقاً
   يُحفظ، ومن غيّر إحداهما وحدها لم يُغيّر شيئاً وظنّ أنّه فعل.
   و`renderPage` تستثني الإنجليزية من `G()` صراحةً عند `TIP_M`. */
const PT_EN = {
  tip:     'Think carefully, and answer at your own pace',
  once:    'You will listen to the track ONCE only — read the questions before you play it',
  plays:   n => `You may play the track ${n} times — read the questions first`,
  free:    'Read the questions first, then play the track',
  passage: 'All the questions below refer to one passage — you may look back at it',
  next:    'Next',
  prev:    'Back',
  blank:   'Continue without answering',
  q:       n => `Question ${n}`,
  qShort:  n => 'Q' + n,
  noPlays: 'No plays left',
  timeUp:  'Time is up for this section',
  resumed: 'We will resume where you stopped',
  marking: 'Marking…',
  failed:  'Could not continue',
  blanks:  list => `Unanswered: ${list} —
    answer if you have a reason to prefer one, and leave it blank if you do not.
    A guess lands on a distractor, and you are given a diagnosis that is not yours.`,
  title:   s => `${s} Placement Test`,
  level:   l => `Your level: ${l}`,
  go:      'Start learning →',
  splitAria: 'Passage column width — drag, or use the arrow keys',
  num:     String
};

/* `PL` غائبةٌ في الاختبار العاديّ ⇒ العربية دائماً، فلا يتبدّل فيه شيء. */
const PT = () => PL?.en ? PT_EN : PT_AR;

export function startPlacementQuiz(session, quiz, subject, resumed){
  PL = { session, subject, en: paperIsEnglish(quiz) };
  paperDir(PL.en);
  if(resumed) toast(PT().resumed);
  mountStation(quiz);
}

/* محطّةٌ تُركَّب في مكان سابقتها — بلا مغادرةٍ ولا دخولٍ ثانٍ */
function mountStation(data){
  S.quiz = data;
  S.passages = {};
  (data.passages||[]).forEach(pg => S.passages[pg.id] = pg);
  S.itemId = null;
  S.ans = data.questions.map(q=>({ q:q.id, kind:q.kind, o:null, os:[],
                                   txt:Array(q.gaps||1).fill(""),
                                   pairs:{},                                     // 112 · { مفتاح البند: مفتاح المقابل }
                                   essay:"", sec:0, chg:0 }));
  A = new Map(S.ans.map(a => [a.q, a]));
  N = new Map(data.questions.map((q,i) => [q.id, i+1]));
  pages = paginate(data.questions);
  S.p = 0;
  S.total = budget(data); S.left = S.total;
  S.t0 = Date.now();
  mark = Date.now(); touched = null;

  clearInterval(S.tick);
  S.tick = setInterval(()=>{
    S.left--; paintClock();
    if(S.left<=0){ clearInterval(S.tick); toast(PT().timeUp); finish(true); }
  }, 1000);

  renderPage();
}

/* ═══════════ ③·ب قسمةُ شاشة النصّ المشترك (b143) ═══════════

   عمودان: النصُّ في جَنبة والأسئلة في أخرى، لكلٍّ تمريرُها، وبينهما
   مقبضٌ يُوسّع أيَّهما شاء الطالب. والوسمُ في `renderPage`، والأنماطُ
   في `screens.css`، وهذه آلتُه.

   🔒 **القانون الحاكم — b22: المقبضُ يكتب نمطاً ولا يُعيد رسماً.**
      `renderPage()` عند كلّ حركةِ مؤشّرٍ تهدم `<audio>` (فيعود المقطع
      إلى صفره) وتُحسب حركتُها في `a.sec` — فيُقاس التردّدُ حركةً لا
      فهماً، وذاك أساسُ التشخيص كلِّه. ⇒ لا شيءَ هنا يمسّ `innerHTML`.

   ♿ **والمقبضُ لوحةُ مفاتيحٍ كما هو فأرة** — الأسهمُ تحرّكه، و`Home`
      و`End` طرفاه، والنقرةُ المزدوجة تردّه. وضبطٌ لذي الفأرة وحده
      مرفوضٌ في هذا المشروع صراحةً (match_dnd.js · ③).                */

const SPLIT_MIN = 24, SPLIT_MAX = 72, SPLIT_DEF = 38;
const SPLIT_KEY = 'bayan.split';

/* النسبةُ تُحفَظ للجهاز لا للحساب: ضبطُ نافذةٍ لا صفةُ طالب.
   ⚠️ و`localStorage` يرمي في التصفّح الخاصّ ببعض المتصفّحات، فلولا
      `try` لسقطت الشاشةُ كلُّها لأجل حفظٍ فاشل (نظيرُ `toggleTheme`). */
const splitPct = () => {
  try { const v = +localStorage.getItem(SPLIT_KEY);
        return v >= SPLIT_MIN && v <= SPLIT_MAX ? v : SPLIT_DEF; }
  catch(e){ return SPLIT_DEF; }
};

/* 📐 العلوُّ يُقاس ولا يُقطع: ترويسةُ الشاشة سطرٌ أو سطران بحسب
   التوجيه، فرقمٌ ثابت في `calc()` يترك فرجةً أو يقطع الزرّ. والقياسُ
   هنا نظيرُ `shrinkFont` في ui.js — ومذهبُ الملفّ أصلاً: «الدرجة ②
   تُضاف بالقياس لا بنقطة قطعٍ في @media» (screens.css).
   📌 و`offsetTop` لا `getBoundingClientRect`: الأوّلُ لا يتأثّر بموضع
      تمرير الصفحة، فيصحّ القياسُ قبل أن تستقرّ.

   🔴 **وحشوُ `body` السفليُّ يُطرح ولا يُنسى — قِيس قبل العلاج:**
      `body{padding:0 0 90px}` في base.css، فكان علوُّ المستند ٨٩٦ في
      نافذةٍ ٨٢٠ **فظهر شريطُ تمريرٍ ثالثٌ للصفحة** بجوار شريطَي
      الجَنبتين، وتحت الوعاء تسعون بكسلاً فارغة. ويُقرأ من النمط لا
      يُكتب رقماً: من غيّره في base.css لا يمرّ من هنا.                */
function fitSplit(){
  const sp = document.getElementById('split'); if(!sp) return;
  const pad = parseFloat(getComputedStyle(document.body).paddingBottom) || 0;
  sp.style.setProperty('--h',
    Math.max(340, window.innerHeight - sp.offsetTop - pad - 8) + 'px');
}
/* مستمعٌ واحدٌ لعمر الوحدة — والحارسُ أعلاه يُسقطه في كلّ شاشةٍ
   بلا قسمة. وربطُه عند كلّ رسمٍ يُراكم مستمعاً لكلّ صفحة. */
addEventListener('resize', fitSplit);

function wireSplit(){
  const sp = document.getElementById('split'); if(!sp) return;
  const h  = document.getElementById('splitH'),
        a  = document.getElementById('splitA'),
        b  = document.getElementById('splitB');

  /* ⚠️ الجَنبتان تُصفَّران صراحةً: `scrollTop()` في ذيل `renderPage`
     يحرّك النافذة لا الأوعية — فصفحةٌ جديدة كانت ستُفتح على موضع
     تمرير سابقتها، وهو صمتٌ يراه الطالب ولا يفهمه. */
  a.scrollTop = 0; b.scrollTop = 0;
  fitSplit();

  const set = p => {
    const v = Math.min(SPLIT_MAX, Math.max(SPLIT_MIN, Math.round(p)));
    sp.style.setProperty('--split', v + '%');     // 🔒 نمطٌ لا رسم
    h.setAttribute('aria-valuenow', v);
    try { localStorage.setItem(SPLIT_KEY, v); } catch(e){}
  };

  /* النسبةُ **منطقيّة لا فيزيائية**: جَنبةُ النصّ أولى في الوسم، فهي
     يمينُ الشاشة في الورقة العربية ويسارُها في الإنجليزية. ولولا
     القلبُ هنا لسار المقبضُ عكسَ اليد في إحداهما. */
  const pctAt = x => {
    const r = sp.getBoundingClientRect();
    const d = getComputedStyle(sp).direction === 'rtl' ? r.right - x : x - r.left;
    return d / r.width * 100;
  };

  h.onpointerdown = e => {
    e.preventDefault();                       // لئلّا يُحدَّد النصُّ تحته
    sp.classList.add('sizing');
    /* الالتقاطُ يرمي حين لا يكون المؤشّر حيّاً (يقع في الفحص الآليّ)،
       ويُلتقط الرميُ ولا يُوقف السحب — نظيرُ ما في match_dnd.js. */
    try { h.setPointerCapture(e.pointerId); } catch(e){}
    const move = ev => set(pctAt(ev.clientX));
    const up = () => {
      sp.classList.remove('sizing');
      h.removeEventListener('pointermove', move);
      h.removeEventListener('pointerup', up);
      h.removeEventListener('pointercancel', up);
    };
    h.addEventListener('pointermove', move);
    h.addEventListener('pointerup', up);
    h.addEventListener('pointercancel', up);
  };

  h.onkeydown = e => {
    const k = e.key;
    if(!['ArrowLeft','ArrowRight','Home','End'].includes(k)) return;
    e.preventDefault();
    const rtl = getComputedStyle(sp).direction === 'rtl';
    const cur = +h.getAttribute('aria-valuenow') || SPLIT_DEF;
    set(k === 'Home' ? SPLIT_MIN : k === 'End' ? SPLIT_MAX
        : cur + (k === 'ArrowRight' ? 2 : -2) * (rtl ? -1 : 1));
  };

  h.ondblclick = () => set(SPLIT_DEF);
}

/* ═══════════ ④ عرض الصفحة ═══════════ */

function renderPage(){
  const P = pages[S.p], qs = P.qs, tot = S.quiz.questions.length;
  const many = qs.length > 1;
  const last = S.p === pages.length - 1;
  const pg   = P.pg ? S.passages[P.pg] : null;

  /* نصّا الزرّ في موضعٍ واحد وبحارسٍ واحد: صار النصُّ يتبدّل عند
     التنبيه ويعود بعد الإجابة، فلو كُتب كلٌّ في موضعه لافترقا —
     ولعاد «إنهاء وتسليم» بعد التنبيه «التالي».
     🔒 و`PL` تُستثنى في الاثنين معاً: آخرُ صفحةٍ في محطّة تسكينٍ
     ليست آخرَ الجلسة — المحطّةُ التالية تُركَّب مكانها. فزرٌّ يقول
     «سلّم» يُفشي للطالب حدَّ المحطّة وأصلُه يقول «التالي»، ويُخبره
     أنّ ما مضى قُضي فيه — وهو ما يمنعه التسكين عمداً. */
  const T = PT(), EN = !!PL?.en;
  const LBL_NEXT  = last && !PL ? 'إنهاء وتسليم'   : T.next;
  const LBL_BLANK = last && !PL ? 'تسليم دون إكمال' : T.blank;

  /* pgMedia تعرض الصوت في كل ما ليس صورةً ولا فيديو — فليكن
     التمييز هنا بالقاعدة نفسها، لا بقائمةٍ ثانية تتباعد عنها. */
  const isAudio = !!(pg && pg.media && pg.kind !== 'video' && pg.kind !== 'image');

  /* حدُّ التشغيل خاصّةٌ للاختبار لا مبدأ للمنصّة:
     في الدرس الإعادة مباحة — وإلا قاس الكودُ الذاكرةَ العاملة لا الفهم.
     وفي التسكين مرّةٌ واحدة — والإعادة ترفع التقدير نصف نطاق. */
  const lim = S.quiz.plays || null;

  /* 🔑 **تنبيهُ السؤال الواحد خطابٌ مباشر، فنزل إلى `G()`.** وكان
     «الجواب بتأنّ» محايداً، لكنّه يحمل نصفَ الرسالة: الأناةُ في
     الجواب بلا التفكير قبله. والمحايدُ الكامل مصادرُ متتابعة
     («التفكير جيداً والجواب بتأنّ») تنهى عنها الهويّة اللغوية —
     فكان فصلُ الصيغتين أطبعَ وأسهل، وهو موضعُ `G()` لا ضرورتُها.

     🔴 **وسقط الذيلُ «كلّ خيار خاطئ يمثّل فخاً مقصوداً» — قرار المالك
        ١٥ أكتوبر ٢٠٢٦.** وهو صادقٌ في وصف التأليف، لكنّه يقع في
        **مستهلّ** الاختبار حيث يُقرأ تحذيراً: يُدخل الطالبَ في حذرٍ من
        الورقة بدل إقباله على السؤال. **والتوتيرُ ليس تربية**، ونيّةُ
        المشتّت تُشرح في التشخيص بعد المحاولة لا في ترويستها قبلها.
        ⚠️ فلا يُعَد هذا اختصاراً يُستدرك، ولا يُردّ الذيلُ ظنّاً أنّه سقط سهواً.

     🔴 **والخانة الرابعة مذكّرةٌ بقرار المالك كذلك، لا بنسيانِ
        محايدة.** فمن لم يُسأل عن صيغته يقرأ المذكّر هنا عمداً، وتُكتب
        الخانة صريحةً ولا تُترك فراغاً: الفراغُ يُطلق إنذارَ «نصّ بلا
        صيغة محايدة» في الطرف، وإنذارٌ بلا موضعٍ يُدرِّب الناظر على
        تجاهل أخيه الصادق.

     📌 والمذكّر ثابتٌ واحد يُقرأ في خانتيه، فلا تفترق نسختاه —
        كما فُعل بنصّي الزرّ أعلاه.

     🆕 **b142 · والصيغُ الثلاث للعربية وحدها.** الأمرُ الإنجليزيُّ لا
        جنسَ له، فلو مرّ على `G()` لحملت خاناتُه الثلاث نصّاً واحداً —
        وذاك يُوهم قارئَه بعد سنةٍ أنّ ثَمّ فرقاً يُحفظ، ومن غيّر خانةً
        منها وحدها لم يُغيّر شيئاً وظنّ أنّه فعل. ⇒ تُستثنى صراحةً. */
  const TIP_M = T.tip;

  head(PL ? T.title(PL.subject?.name || '') : S.quiz.title,
    !many     ? (EN ? TIP_M : G(S.prof?.gram_gender, TIP_M, T.tipF, TIP_M))
    : isAudio ? (lim === 1 ? T.once : lim ? T.plays(lim) : T.free)
    :           T.passage);

  const from = T.num(N.get(qs[0].id)), to = T.num(N.get(qs[qs.length-1].id));
  bar.innerHTML = `<div class="timerbar">
    <span class="clock" id="clock">${mmss(S.left)}</span>
    <span class="track"><span class="trackfill" id="tf"></span></span>
    <span class="qcount">${PL
      ? (many ? `<bdi>${from}–${to}</bdi>` : from)          /* بلا مقام في الجلسة */
      : `${many?`<bdi>${from}–${to}</bdi>`:from} / ${AR(tot)}`}</span></div>`;
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

       const body = questionBody(q, { picked, essay:a.essay, values:a.txt,
                                      pairs:a.pairs, en:EN });

    const sec = (q.section && q.section !== seen)
      ? `<div class="q-sec" dir="auto">${esc(q.section)}</div>` : '';
    seen = q.section || seen;

        return `${sec}
      <div class="card qcard" id="q${q.id}" data-q="${q.id}">
        <div class="qnum" dir="auto">${T.q(N.get(q.id))} · ${kindLabel(q.kind, EN)}</div>
        ${media(q)}
        ${qAudio?`<audio controls preload="metadata" src="${esc(qAudio)}"
                   style="width:100%;margin-bottom:12px"></audio>`:''}
        ${questionText(q, q.kind === 'cloze' ? a.pairs : a.txt, false, EN)}
        ${body}
      </div>`;
  }).join("");

  /* الذيلُ في موضعٍ واحد: يسكن داخل جَنبة الأسئلة حين تُقسَم الشاشة،
     وفي ذيل العمود حين لا تُقسَم — ونسختان منه تفترقان يوم يتغيّر زرّ. */
  const tail = `<div id="warn"></div>
    <div class="nav">
      ${S.p>0?`<button class="btn ghost" id="prev">${T.prev}</button>`:''}
      <button class="btn primary" id="next">${LBL_NEXT}</button>
    </div>`;

  /* 🆕 b143 · قسمةُ شاشة النصّ المشترك — عمودان بمقبض.
     الدَّينُ مسجَّلٌ فوق `.psg` في screens.css منذ كُتب: «والحلّ الناضج
     عمودان — ينتظر طالباً يقول إن التمرير أزعجه». وقيل، فبُني.

     🔑 **والبنيةُ واحدةٌ في العرضين**: الوعاءُ يُكتب دائماً، و`@media`
        وحدها تقرّر أعمودان أم عمودٌ واحد. ولو اختُلف الوسمُ بالعرض
        لاحتاج دورانُ الجهاز إعادةَ رسم — **وإعادةُ الرسم تهدم `<audio>`
        وتُلوّث `a.sec`**، وهي علّةُ b22 بعينها.
     🔒 **وللنصّ المقروء وحده**: صفحةُ الصوت ليس فيها نصٌّ يُقسَم،
        وشريطُها الملتصق مبنيٌّ على حشو `.wrap` (`margin-inline:-18px`)
        فيفسد داخل جَنبة. */
  const splitable = !!(pg && pg.body && !isAudio);

  app.innerHTML = !splitable ? `${pgHtml}${cards}${tail}` : `
    <div class="split" id="split" style="--split:${splitPct()}%">
      <div class="split-a" id="splitA">${pgHtml}</div>
      <div class="split-h" id="splitH" role="separator" aria-orientation="vertical"
           tabindex="0" aria-label="${esc(T.splitAria)}"
           aria-valuemin="${SPLIT_MIN}" aria-valuemax="${SPLIT_MAX}"
           aria-valuenow="${splitPct()}"></div>
      <div class="split-b" id="splitB">${cards}${tail}</div>
    </div>`;

  if(splitable) wireSplit();

  /* ── التفويض: مستمعٌ واحد للصفحة كلها ──
     صارت الصفحة تحمل عشرات الأزرار؛ وربطُ مستمعٍ بكلٍّ منها عملٌ
     يتضاعف بلا داعٍ. والحدثُ يصعد من الزرّ إلى ما يحويه، فيكفي أن
     ننصت عند الجذر ونسأل: من أين جئت؟ */
  /* الحدُّ يُطبَّق على المشغّل نفسه — والعدّ لا يُحفظ بين الصفحات
     لأن المقطع يُرسم مع صفحته، ولا رجوع بين الصفحات في التسكين. */
  if(lim) app.querySelectorAll('audio').forEach(a => {
    let n = 0;
    a.onplay = () => { n++; };
    a.onended = () => { if(n >= lim){
      a.insertAdjacentHTML('afterend',
        `<div class="eq-hint" style="display:block;padding:8px 0">${esc(T.noPlays)}</div>`);
      a.remove(); } };
  });
  /* ⚠️ كلُّ تبديلٍ في الإجابات يمرّ من هذه المستمعات الثلاثة، فيُلحق
     بها جميعاً تحديثُ التنبيه في موضعٍ واحد — ولا يُترك تذكّرُه لكلّ
     فرعٍ على حدة، فالفروعُ تنمو والنسيان يقع في أحدثها. */
  const onAns = fn => (...args) => { fn(...args); syncWarn(); };

  /* ── المزاوجة: الإسنادُ بنقرتين أو بسحب ──
     الحالةُ تبقى في a.pairs كما كانت، والعقدُ نفسه: مفتاحُ البند
     ⇐ مفتاحُ المقابل. تغيّرت اليدُ ولم يتغيّر ما تكتبه. */
  wireMatching(app, onAns((ik, bk, slot) => {
    const card = slot.closest('.qcard'); if(!card) return;
    const qid = +card.dataset.q, a = A.get(qid); if(!a) return;
    credit(qid);
    if(a.pairs[ik] && a.pairs[ik] !== bk) a.chg++;   // تبديلٌ بعد إسناد = تغيير
    if(bk) a.pairs[ik] = bk; else delete a.pairs[ik];
  }));

   app.onclick = onAns(e => {
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
  });

    app.oninput = onAns(e => {
    const t = e.target;
    const card = t.closest('.qcard'); if(!card) return;
    const qid = +card.dataset.q, a = A.get(qid);

    /* 🔓 ومزاوجةُ القائمة زالت من هنا: صار الإسنادُ أزراراً لا حقلاً
       يُطلق input، فمستمعُه في match_dnd.js ونداؤه أعلاه.
       ⚠️ و 112 قائمٌ كما هو: المفتاح هُويّةُ البند لا موضعُه، والقيمةُ
          مفتاحُ المقابل — فلا يقطعها تحريرُ نصّه. */
    if(t.classList.contains('gap-in')){ credit(qid);
      const i = +t.dataset.i;
      if(a.txt[i] && a.txt[i] !== t.value) a.chg++;   // تبديلٌ بعد كتابة = تغيير
      a.txt[i] = t.value;
      return;
    }
    if(t.classList.contains('essay')){ credit(qid); a.essay = t.value; }
  });

  /* ── الفراغ: يُنبَّه عليه مرّة، ثم يُحترَم ── */
  let warned = false;
  const blanks = () => qs.filter(q => {
    const a = A.get(q.id);
        return a.kind==='mcq' ? a.o === null
         : a.kind==='msq' ? a.os.length === 0
         : a.kind==='gap' ? a.txt.every(v => !v.trim())
         /* 114 · و«إكمال من قائمة» كالمزاوجة: كائنٌ فارغ ⇒ لم يُسنَد شيء */
         : (a.kind==='matching' || a.kind==='cloze')
             ? Object.values(a.pairs).every(v => !v)
         :                  !a.essay.trim();
  });

  const warnHtml = b => `<div class="q-hint">${
    T.blanks(b.map(q => T.qShort(N.get(q.id))).join(' · '))}</div>`;

  /* والتنبيهُ لا يتجمّد بعد ظهوره: كلُّ إجابةٍ تُعيد حسابه، فيضيق
     بما بقي فارغاً ويزول هو ونصُّ الزرّ معاً إذا لم يبقَ شيء.
     ⚠️ زرٌّ يقول «متابعةٌ دون إجابة» وقد أجاب الطالب يكذّب عليه —
     ووعدُ الشاشة أن تصف الحاضر لا ما مضى. */
  const syncWarn = () => {
    if(!warned) return;
    const b = blanks(),
          w = document.getElementById("warn"),
          n = document.getElementById("next");
    if(w) w.innerHTML   = b.length ? warnHtml(b) : '';
    if(n) n.textContent = b.length ? LBL_BLANK   : LBL_NEXT;
  };

  const p = document.getElementById("prev");
  if(p) p.onclick = ()=>{ leavePage(); S.p--; renderPage(); };

  document.getElementById("next").onclick = ()=>{
    leavePage();
    const b = blanks();
    if(b.length && !warned){
      warned = true;
      document.getElementById("warn").innerHTML = warnHtml(b);
      document.getElementById("next").textContent = LBL_BLANK;
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
  /* ⚠️ نصٌّ لا شبح — والفرقُ مقصود (b68): الشبحُ يقول «المحتوى قادم»،
     وهنا لا يُنتظر محتوى بل **حكم**. والطالبُ الذي سلّم للتوّ يسأل
     «ماذا يجري الآن؟» لا «أين سيقع النصّ؟» — فـ«جارٍ التصحيح» جوابٌ،
     وقضبانٌ رماديةٌ تمحوه. ⇒ الشبح للتحميل، والنصُّ للمعالجة. */
  app.innerHTML = `<div class="status">${esc(PT().marking)}</div>`; bar.innerHTML = "";

    const payload = S.ans.map(a =>
      a.kind==='mcq' ? { q:a.q, o:a.o,   sec:a.sec, chg:a.chg }
    : a.kind==='msq' ? { q:a.q, os:a.os, sec:a.sec, chg:a.chg }
    : a.kind==='gap' ? { q:a.q, txt:a.txt.map(v=>v.trim()), sec:a.sec, chg:a.chg }
    : (a.kind==='matching' || a.kind==='cloze')
                     ? { q:a.q, pairs:a.pairs, sec:a.sec, chg:a.chg }
    :                  { q:a.q, essay:a.essay, sec:a.sec });

  /* 🔒 في الجلسة: لا مراجعة ولا درجة — المحطّة التالية تُركَّب مكانها.
     ومحطّةٌ تعرض «١٤/١٨» تُخبر الطالب أين وُجِّه. */
  if(PL){
    const T = PT(), EN = !!PL.en;
    const { data, error } = await api.placementSubmit(
      PL.session, payload, Math.round((Date.now()-S.t0)/1000));
    if(error || !data?.ok){
      app.innerHTML = `<div class="err"><b>${esc(T.failed)}</b>${
        esc(error?.message || data?.error || '')}</div>`; return; }

    if(!data.done){ mountStation(data.quiz); return; }

    /* ⚠️ `PL` تُصفَّر هنا، فما بعدها يُبنى من `T` و`EN` المحفوظتين أعلاه —
       و`PT()` بعد التصفير تردّ العربية. والاتجاهُ يبقى حتى يُغادر
       الطالبُ الشاشة فعلاً: هذه آخرُ صفحةٍ من الورقة، لا أوّلُ صفحةٍ
       من المنصّة. */
    const n = data.stations || 0;
    PL = null;
    app.innerHTML = `
      <div class="card" style="text-align:center;padding:34px;max-width:520px;margin:0 auto">
        <div class="rev-q">${esc(T.level(data.level || ''))}</div>
        <div class="line" style="margin-top:10px">${EN
          ? `Set after ${n} section${n === 1 ? '' : 's'}. Your lessons now match your level.`
          : `حُدِّد بعد ${عدد(n,'قسم','قسمين','أقسام','قسماً')}. ودروسك صارت على مقاسك.`}</div>
        <div class="nav" style="margin-top:22px">
          <button class="btn primary" id="plgo">${esc(T.go)}</button></div>
      </div>`;
    document.getElementById("plgo").onclick = () => { paperDir(false); loadList(); };
    return;
  }

  const { data, error } = await api.submitAttempt(
    S.quiz.id, payload, Math.round((Date.now()-S.t0)/1000), auto);
  if(error){ app.innerHTML = `<div class="err"><b>تعذّر التسليم</b>${esc(error.message)}</div>`; return; }

  S.result = { ...data, auto, secs: Math.round((Date.now()-S.t0)/1000) };
  renderResult();
}

/* ═══════════ ⑥ النتيجة والتشخيص ═══════════ */

function verdict(p){
  if(p>=90) return "إتقان ممتاز — والدرس التالي في متناولك";
  if(p>=75) return "جيد جداً — ومراجعة الفخاخ أدناه تُتمّ الإتقان";
  if(p>=50) return "المطلوب مراجعة مركّزة — والبداية بالأسئلة الحمراء";
  return "إعادة قراءة الدرس ثمّ إعادة المحاولة";
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

  /* بنودُ المزاوجة — نصُّها عند السؤال المعروض لا في المراجعة:
     المراجعة تحمل ما أسنده الطالب والمفتاح، والنصُّ يُقرأ من S.quiz
     فيرى الطالب البند كما رآه لحظة الإجابة. */
  const prompts = qid =>
    (S.quiz.questions.find(z => z.id === qid)?.options) || [];

  /* حكمٌ على كل خيار — لا على السؤال. فيرى الطالب حدّ المفهوم كاملاً:
     ما أدخله وليس منه، وما أخرجه وهو منه. */
  const jrows = x => {
    const seen = new Set();                                   // 🆕 نصٌّ مرّةً واحدة
    return (x.judgments||[]).map(j=>{
    const o = opt(j.o); if(!o) return '';
    const hit  = (j.key === j.picked);
    const cls  = hit ? (j.key ? 'hit' : 'dim') : 'err';
    const mark = j.key ? (j.picked ? '✔ صحيحة · اخترتها' : '✗ صحيحة · أغفلتها')
                       : (j.picked ? '✗ خاطئة · اخترتها' : '✔ خاطئة · تجنّبتها');
    const txt  = j.note || (j.dx_name ? j.dx_name + (j.remedy?' — '+j.remedy:'') : '');
    const show = !hit && txt && !seen.has(txt);                // 🆕
    if(show) seen.add(txt);                                    // 🆕
    return `<div class="jd ${cls}">
      <span class="key">${esc(o._l)}</span>
      <div style="flex:1">
        <span dir="${dirOf(o.body)}" style="display:block">${fmt(o.body)}</span>
        <span class="jd-m">${mark}</span>
        ${show ? `<span class="jd-dx">${fmt(txt)}</span>` : ''}
      </div></div>`;
  }).join("");
  };

  const countJ = (x, key, picked) =>
    (x.judgments||[]).filter(j => j.key===key && j.picked===picked).length;

  /* تشخيص الإغفال من النمط لا من وسمٍ يكتبه المؤلّف.
     ثلاث حالات تصف ما فعله الطالب — لا ما دار في ذهنه. */
  const patternOf = (wide, narr, keys) =>
      (wide && narr) ? { t:'الحدّ مضطرب من طرفيه',
        s:`أدخلت ${AR(wide)} مما ليس منه، وأغفلت ${AR(narr)} مما هو منه.` }
    : wide           ? { t:'توسيع للمفهوم',
        s:`عرفت المجموعة كلها ثم زدت عليها ${AR(wide)}. والسؤال عن كل خيار وحده: أينتمي حقاً؟` }
    : (narr >= keys) ? { t:'الحدّ لم يتّضح بعد',
        s:'لا صواب من هذه المجموعة — وتُعاد قراءة الشرح قبل الإعادة.' }
    :                  { t:'توقُّف قبل الإكمال',
        s:`لا خطأ في حكم واحد، لكن بقي ${AR(narr)} من المجموعة. والتعليمة تطلب كلّ ما ينطبق — فتُكمَل الخيارات كلها قبل الانتقال.` };

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
      : x.kind==='matching'
      ? `<div class="jds">${prompts(x.q).map((p,j) => {
            const g  = String((x.given  || [])[j] || '').trim();
            const kk = String((x.accept || [])[j] || '').trim();
            const hit = !!g && g === kk;
            return `<div class="jd ${hit?'hit':'err'}">
              <span class="key">${AR(j+1)}</span>
              <div style="flex:1">
                <span dir="${dirOf(p.body)}" style="display:block">${fmt(p.body)}</span>
                <span class="jd-m">${g ? (hit ? '✔ ' + esc(g) : '✗ ' + esc(g))
                                       : '— لم تُزاوِج —'}</span>
                ${hit ? '' : `<span class="jd-dx">الصواب: ${fmt(kk || '—')}</span>`}
              </div></div>`;
          }).join("")}</div>`
      /* 🆕 114 · إكمال من قائمة — صفٌّ لكلّ فراغٍ برقمه، يقابل ترقيمَ
         الفراغات في نصّ السؤال أعلاه. ولا سطرَ بندٍ كالمزاوجة: البندُ
         هنا **موضعٌ في الجملة** والجملةُ مقروءةٌ فوقه، فتكرارُها لكلّ
         فراغٍ يُغرق الصفحة بما قُرئ. */
      : x.kind==='cloze'
      ? `<div class="jds">${(x.accept || []).map((kk, j) => {
            const g  = String((x.given || [])[j] || '').trim();
            const k2 = String(kk || '').trim();
            const hit = !!g && g === k2;
            return `<div class="jd ${hit?'hit':'err'}">
              <span class="key">${AR(j+1)}</span>
              <div style="flex:1">
                <span class="jd-m">${g ? (hit ? '✔ ' + esc(g) : '✗ ' + esc(g))
                                       : '— لم تختر كلمة —'}</span>
                ${hit ? '' : `<span class="jd-dx">الصواب: ${fmt(k2 || '—')}</span>`}
              </div></div>`;
          }).join("")}</div>`
      : x.kind==='gap'
      ? `<div class="line" dir="auto">إجابتك: <b dir="auto">${
             esc((x.given||[]).filter(v=>v.trim()).join('  ·  ')) || '— لم تُجب —'}</b></div>
         ${x.is_correct?'':`<div class="line" dir="auto">المقبول: <b dir="auto">${
             fmt((x.accept||[]).map(s=>s.join(' / ')).join('  ·  ')) || '—'}</b></div>`}`
      : `<div class="line" dir="auto">إجابتك: <b>${c?fmt(c._l+') '+c.body):'— لم تُجب —'}</b></div>
         ${x.is_correct?'':`<div class="line" dir="auto">الصحيحة: <b>${
             k?fmt(k._l+') '+k.body):'—'}</b></div>`}`;
    return `<div class="rev ${x.is_correct?'ok':'no'}">
      <span class="tag ${x.is_correct?'ok':'no'}">${x.is_correct?'صحيحة':'خاطئة'}</span>
      <div class="rev-q" dir="auto">${AR(i+1)}. ${bodyRead(x.body)}</div>
      ${answer}
      ${x.is_correct?'':`
                          <div class="trap"><strong>تشخيص الخطأ:</strong>
          ${fmt(x.explanation||'')}
                      ${!msq && (x.note || x.remedy)?`<div style="margin-top:8px;opacity:.9">${fmt(x.note || x.remedy)}</div>`:''}</div>
        ${x.remedial?`<div class="remedy"><strong>مراجعة قبل الإعادة</strong>
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
                     <div class="rc-note">${fmt(txt)}</div></div>`;
      });

    return rows.length
      ? `<div class="recur"><h3>ما تكرّر معك اليوم</h3>${rows.join("")}</div>`
      : '';
  })();
  const ess = r.review.filter(x=>x.kind==='essay').map(x=>`
    <div class="rev">
      <div class="rev-q" dir="auto">${fmt(x.body)}</div>
      <div class="line" dir="auto">إجابتك: <b>${x.essay?esc(x.essay).replace(/\n/g,"<br>"):'— لم تُكتب —'}</b></div>
      <div class="model"><strong>الإجابة النموذجية — للمقارنة</strong>${fmt(x.model||'')}</div>
    </div>`).join("");

  app.innerHTML = `
    <div class="crumb" id="back">→ ${S.lesson ? esc(S.lesson.title) : 'قائمة المواد'}</div>
    ${r.auto?'<div class="err"><b>سُلّم تلقائياً</b>انتهى الوقت قبل إنهائك للاختبار.</div>':''}
    <div class="score-hero">
      <div class="score-num">${AR(r.score)} / ${AR(r.total)}</div>
      <div class="score-of">الأسئلة المصحَّحة آلياً · زمن الحل ${mmss(r.secs)}</div>
      <div class="verdict">${verdict(r.pct)}</div>
      ${r.lesson_done?'<div class="unlocked">أتممت هذا الدرس</div>':''}
      ${(r.unlocked||[]).length?`<div class="unlocked">فُتح لك الآن: ${esc(r.unlocked.join(' · '))}</div>`:''}
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
