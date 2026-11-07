/* ═══════════════════════════════════════════════════════════════════
   شاشةُ الاستيراد — صيغتان على مسارٍ واحد (147 · 148 · 159)

   🆕 b133 · وصارت تخدم بوّابتين: **الاختبار** و**البطاقات**. ومواصفةُ
      هذه الشاشة قالت منذ يومها «المرحلةُ الثانية ستحتاج شاشةً مثلها،
      **فابنِ هذه بحيث تُعاد**» — فأُعيدت ولم تُستنسخ. والفرقُ بين
      الصيغتين **بياناتٌ في جدول** (`K`): نداءٌ وعنوانٌ ونموذجٌ وقارئُ
      خطّة. أمّا التدفّق — اللصقُ والجافّةُ والفرقُ والاعتماد — فواحد.

   🆕 b177 · **وبوّابةٌ رابعة: فهرسُ الأهداف** (المرحلة ② · `import_objectives`
      · 138 · 142). كان يُعتمد بملفّ SQL يُلصق في محرّر القاعدة — والخريطةُ
      قبله لها شاشة. فصار سطراً في الجدول كما أوصى هذا الرأس.
      🔑 **ومعه صارت الأذونُ بياناتٍ لا شيفرة** (`perms`): كان للخريطة إذنٌ
      واحدٌ مكتوبٌ في التدفّق (`retitle`)، وللفهرس إذنان — **ويأتيان من
      القاعدة أخطاءً تردّ الدفعة لا تحذيراتٍ تسمح بها.** فالإذنُ يقول من أين
      يُقرأ (`from`) وبأيّ عبارة (`match`)، والتدفّقُ يرسمه ويُعيد الجافّة.
      وسلوكُ الخريطة لم يتغيّر حرفاً: إذنُها من التحذيرات وبعبارتها نفسِها.

   📖 b191 · **وبوّابةٌ خامسة: نصوصُ القراءة** (`import_texts` · 180) — سطرٌ في الجدول كذلك.
      وجاءت بحقلٍ واحدٍ جديد (`onOut`): زرُّ «معاينة» لكلّ نصٍّ في الخطّة يفتح الكتابَ الحقيقيّ
      بمظهر الطالب (`previewText` في editor_items.js — الذي يخدم المحرّرَ نفسَه).

   🆕 b208 · **وبوّابةٌ سادسة: بنكُ الأسئلة** (`import_bank` · 192) — سطرٌ في الجدول، ومعه حقلان اختياريّان:
      `same` (سطرُ «لا جديد» بعنوان البنك لا بكود اختبار) · و`back` معاملاً لا حقلاً: البوّابةُ تُفتح من
      «بنوك المادة» أيضاً، **فتعود إلى حيث فُتحت** — والأخواتُ إلى دروس المقرّر كما كانت.

   🔴 **ولو نُسخ الملفّ لصارا اثنين يفترقان.** وتلك سابقةُ هذا الملفّ
      نفسِه: صندوقُ الاستيراد القديم حمل نسخةً من الحراسة فسقط منها
      ثلاثةُ حقولٍ صامتةً. **ونسختان من مسطرةٍ واحدة تفترقان** — في
      الحراسة كما في الشاشة.

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

   🎧 b221 · **وفي بوّابتَي الاختبار والبنك: الصوتُ يُسحب مع الملفّ** (مختبر الصوتيّات، الخطوة ٤ · `audio_import.js`):
      `"media": "dialogue1.mp3"` اسمُ ملفٍّ يُسحب معه، و`"transcript"` نصُّه سطراً سطراً. **والحرفُ الأوّل للقاعدة كما كان:**
      الجافّةُ تمرّ بالمفاتيح التي سيُرفع إليها الصوت (من بصمة كلّ ملفّ — فلا تتغيّر بين الجافّة والاعتماد) ولا يُرفع شيء،
      **والاعتمادُ يرفع أوّلاً** فلا يُكتب في القاعدة مفتاحٌ بلا ملفّ، **ثمّ الدفعةُ، ثمّ السطورُ بنداءٍ ثانٍ** (`save_passage_lines`
      · 200) — مواضعُها من وقفات الصوت حين لا يحملها الملفّ، ويراجعها المعلّم في «سطور المقطع». ولا تُطمس سطورُ ملفٍّ قائمة.
   ═══════════════════════════════════════════════════════════════════ */

import * as api from './api.js';
import { app, head, toast, esc, escA, AR, errBox, nav, setWide, scrollTop, N } from './ui.js';
import { openCourse } from './editor.js';
import { previewText } from './editor_items.js';
import { AUDIO_EXT, AUDIO_MAX_MB, audioKey } from './media.js';
import * as LN from './audio_lines.js';
import { planAudio, withKeys, hashName, envelope, findPauses, timedLines } from './audio_import.js';
import { clock } from './recorder.js';

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

const SAMPLE_CARDS = JSON.stringify({
  cards: [{
    front: "النتح",
    back: "تخلّصُ النبات من الماء الزائد بخاراً عبر الأوراق",
    examples: ["ويفترق عن التبخّر: التبخّرُ من سطحٍ غير حيّ، والنتحُ من نباتٍ يتحكّم فيه",
               "كيسٌ شفّافٌ على غصنٍ تتجمّع فيه قطراتُ ماء — ذاك نتحُه",
               "وهو الحلقةُ الحيّةُ في دورة الماء"],
    lang: "ar",
    lessons: ["U1.HYDRO"],
    strands: ["علوم الأرض والبيئة"]
  }]
}, null, 2);

const SAMPLE_MAP = JSON.stringify({
  subject: "English",
  level: "الصف الثاني الثانوي",
  term: "الفصل الدراسي الأول",
  source: "اسم الكتاب وطبعته وأرقام صفحاته",
  strands: [{ code: "GRAM", name: "Grammar" }, { code: "WRITE", name: "Writing" }],
  lessons: [{
    order: 1,
    key: "U1.SELFIMAGE",
    unit: "UNIT 1 · Living Well in a Complex World",
    title: "Listening: Social Media and Self-Image",
    strand: "LIST",
    summary: "ما يقدر عليه الطالب بعد الدرس — جملةٌ واحدة.",
    note: "ما يحتاجه المؤلّف بعدك — ولا يراه الطالب."
  }]
}, null, 2);

/* 🎯 b177 · قالبُ الفهرس — والدرسُ بمفتاحه، والبندُ بعنوانه، ولكلّ بندٍ
   دليلُ قياسه وعلاجُه (والقاعدةُ تردّ البندَ بلا أحدهما). */
const SAMPLE_INDEX = JSON.stringify({
  subject: "English",
  level: "الصف الثاني الثانوي",
  source: "الكتاب أو الوثيقة التي بُني عليها الفهرس",
  headings: [{ code: "READ.STRAT", name: "Reading comprehension strategies", strand: "READ" }],
  objectives: [{
    code: "R.TFNG",
    parent: "READ.STRAT",
    name: "Decides whether a statement is true, false or not given in a text and justifies the decision",
    evidence: "سؤالٌ يقيسه — ماذا يعرض وماذا يطلب.",
    remedy: "علاجٌ محدَّد إن أخطأ فيه الطالب — لا «راجع الدرس»."
  }],
  lessons: [{ key: "U1.LIFESTYLES", objectives: ["R.MAIN", "R.TFNG"] }]
}, null, 2);

/* 📖 b191 · قالبُ النصوص (180) — الدرسُ بمفتاحه والنصُّ بعنوانه في درسه. واللغةُ والوصفُ
   والفرعُ والمدّةُ اختياريّة: اللغةُ تُحسب من الحروف إن غابت، وما غاب في التحديث يبقى قائماً. */
const SAMPLE_TEXTS = JSON.stringify({
  texts: [{
    lesson: "U1.LIFESTYLES",
    title: "Reading: Healthy Lifestyles",
    lang: "en",
    description: "A short text about daily habits",
    strand: "Reading",
    minutes: 10,
    body: "First paragraph…\n\nSecond paragraph…\n\n[image: r2:english/u1/healthy.webp | Caption]"
  }]
}, null, 2);

/* 🆕 b208 · قالبُ البنك (192) — أسئلةُ ملفّ الاختبار حرفاً، والرأسُ عنوانُ البنك. ونصّان في مجموعةٍ واحدة
   (`group`) بديلان لنصٍّ واحد، وسؤالاهما صيغتا خانةٍ واحدة (`variant`): تُختار حارةٌ لكلّ محاولة. */
const SAMPLE_BANK = JSON.stringify({
  bank: "بنك الاستيعاب المقروء",
  passages: [
    { ref: "p1", title: "نصّ للقراءة", body: "متن النصّ…", group: "RC-1" },
    { ref: "p2", title: "نصّ بديل", body: "متن نصٍّ بديل يقيس الشيء نفسه…", group: "RC-1" }
  ],
  questions: [{
    objective: "RC.MAIN", variant: "s1", section: "القسم اللفظي",
    kind: "mcq", difficulty: "medium", passage: "p1",
    body: "ما الفكرة الرئيسة في النصّ؟", explanation: "شرح الخطأ — يقرؤه الطالب بعد محاولته.",
    options: [{ body: "الصواب", correct: true }, { body: "مشتّت", dx: "SKIM" }]
  }, {
    objective: "RC.MAIN", variant: "s1", section: "القسم اللفظي",
    kind: "mcq", difficulty: "medium", passage: "p2",
    body: "ما الفكرة الرئيسة في النصّ؟", explanation: "شرح الخطأ — يقرؤه الطالب بعد محاولته.",
    options: [{ body: "الصواب", correct: true }, { body: "مشتّت", dx: "SKIM" }]
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

/* 🆕 b208 · خطّةُ البنك (192) — البنكُ أوّلاً: أيُنشأ أم تُضاف إليه، وما فيه قبلها. ثمّ الدفعةُ بأرقامها،
   ثمّ توزيعُها. 🔑 **والفروعُ قبل الأهداف:** الفرعُ هو ما يزنه النموذج (191)، فهو ما يُقرأ أوّلاً. */
function planBank(pl){
  if(!pl) return '';
  const bag = o => Object.entries(o || {}).map(([k, v]) =>
    `<span class="chip">${esc(k)} <b>${AR(v)}</b></span>`).join(' ');
  const b = pl['البنك'] || {}, was = b['فيه قبلها'];
  const vars = Object.keys(pl['خاناتٌ ستُقرن'] || {}).length;
  const grps = Object.keys(pl['مجموعاتُ نصوص'] || {}).length;
  return `
    <div class="line" style="margin-bottom:8px"><b><bdi>${esc(b['العنوان'] || '—')}</bdi></b>
      <span class="chip${b['جديد'] ? ' g' : ''}">${b['جديد'] ? 'بنك جديد' : 'بنك قائم'}</span></div>
    ${was ? `<div class="ed-m" style="margin-bottom:10px">
      <span class="chip">فيه قبلها: ${N(was['أسئلة'] || 0, 'سؤال', 'سؤالان', 'أسئلة', 'سؤالاً')}</span>
      <span class="chip">${N(was['خانات'] || 0, 'خانة', 'خانتان', 'خانات', 'خانة')}</span>
      <span class="chip">${N(was['نصوص'] || 0, 'نصّ', 'نصّان', 'نصوص', 'نصّاً')}</span></div>` : ''}
    <div class="line" style="margin-bottom:8px">${
      N(pl['أسئلة'] || 0, 'سؤال', 'سؤالان', 'أسئلة', 'سؤالاً')}${
      pl['نصوصٌ مشتركة'] ? ' · ' + N(pl['نصوصٌ مشتركة'],
        'نصّ مشترك', 'نصّان مشتركان', 'نصوص مشتركة', 'نصّاً مشتركاً') : ''}${
      vars ? ' · ' + N(vars, 'خانة تُقرن', 'خانتان تُقرنان', 'خانات تُقرن', 'خانة تُقرن') : ''}${
      grps ? ' · ' + N(grps, 'مجموعة نصوص', 'مجموعتا نصوص', 'مجموعات نصوص', 'مجموعة نصوص') : ''}</div>
    <div class="ed-m" style="margin-bottom:6px">${bag(pl['بفروعها'])}</div>
    <div class="ed-m" style="margin-bottom:6px">${bag(pl['بأنماطها'])} ${bag(pl['بصعوباتها'])}</div>
    <div class="ed-m" style="margin-bottom:6px">${bag(pl['بأهدافها'])}</div>
    <div class="ed-m">${bag(pl['بأقسامها'])}</div>`;
}

/* خطّةُ البطاقات — أربعةُ أرقامٍ تُقرأ بلمحة، والمجموعةُ تقول أتُنشأ أم قائمة.
   🔑 **والصفرُ يُعرض ولا يُخفى:** «سيُنشأ ٠» تقول «لا جديد في هذه الدفعة،
   كلُّها تصحيح» — وهي معلومةٌ يحتاجها المعتمِد. ورقمٌ غائبٌ يُقرأ سهواً. */
function planCards(pl){
  if(!pl) return '';
  const n = k => `<span class="chip${pl[k] ? ' g' : ''}">${esc(k)} <b>${
    AR(pl[k] ?? 0)}</b></span>`;
  return `
    <div class="line" style="margin-bottom:8px">المجموعة:
      <b>${esc(String(pl['المجموعة'] ?? '—'))}</b></div>
    <div class="ed-m">
      ${n('سيُنشأ')}${n('سيُحدَّث')}${n('وصلاتُ دروس')}${n('وصلاتُ فروع')}
    </div>`;
}

/* خطّةُ الخريطة — ثلاثُ مجموعاتٍ تردُّها الدالّةُ بمفاتيحَ عربية.
   🔑 **والصفرُ يُعرض ولا يُخفى:** «سيُنشأ ٠» عند إعادة الملفّ نفسِه هي
   أهمُّ سطرٍ في الشاشة — تقول إنّ الخريطةَ مستقرّةٌ ولا تكرار.
   🔴 و«خارج الخريطة» بلون تنبيهٍ ومعه عددُ أسئلة كلّ درس: لأنّ المشرفَ
   يحتاج أن يعرف ما وزنُ ما سيبقى خارجاً قبل أن يعتمد. */
function planMap(pl){
  if(!pl) return '';
  const mk = pl['سيُنشأ'], up = pl['سيُحدَّث'], out = pl['خارج الخريطة'];
  if(!mk && !up && !out) return '';
  const rows = (list, q) => (list || []).map(r => `
    <div class="line" style="display:flex;gap:10px;align-items:baseline;
         flex-wrap:wrap;padding:4px 0">
      ${r.order != null ? `<span class="chip">${AR(r.order)}</span>` : ''}
      <code dir="ltr" style="font-size:.76rem">${esc(r.key || '')}</code>
      <span>${esc(r.title || '')}</span>
      ${r.id != null ? `<span class="ed-m">#${AR(r.id)}</span>` : ''}
      ${q && r['أسئلة'] != null ? `<span class="chip${
        r['أسئلة'] ? ' g' : ''}">${N(r['أسئلة'], 'سؤال', 'سؤالان',
        'أسئلة', 'سؤالاً')}</span>` : ''}
    </div>`).join('') || '<div class="ed-m" style="padding:4px 0">—</div>';
  const grp = (t, list, q) => `
    <div class="grp" style="margin-top:12px">${t}
      <span class="chip${(list || []).length ? ' g' : ''}">${
        AR((list || []).length)}</span></div>
    ${rows(list, q)}`;
  /* 🔴 الفروعُ تُعرض لأنّ الملفّ يحملها والدالّةَ تُنشئها وتُحدّثها.
     والمواصفةُ لم تذكرها — فكشفها فحصُ الرادّ الحقيقيّ. ولو خُفيت
     لاعتمد المشرفُ تغييراً في فروع المادة لم يره، وذاك نقضُ الشاشة. */
  const strands = o => {
    const sn = o['فروعٌ ستُنشأ'] || [], su = o['فروعٌ ستُحدَّث'] || [];
    const ren = su.filter(r => r['الاسم السابق'] && r['الاسم السابق'] !== r.name);
    if(!sn.length && !ren.length) return '';
    const line = r => `
      <div class="line" style="display:flex;gap:10px;align-items:baseline;
           flex-wrap:wrap;padding:4px 0">
        <code dir="ltr" style="font-size:.76rem">${esc(r.code || '')}</code>
        <span>${esc(r.name || '')}</span>
        ${r['الاسم السابق'] && r['الاسم السابق'] !== r.name
          ? `<span class="ed-m">كان: ${esc(r['الاسم السابق'])}</span>` : ''}
      </div>`;
    return `
      <div class="grp" style="margin-top:12px">فروعُ المادة
        <span class="chip${sn.length + ren.length ? ' g' : ''}">${
          AR(sn.length + ren.length)}</span></div>
      ${sn.map(line).join('')}${ren.map(line).join('')}`;
  };

  return `
    ${grp('سيُنشأ', mk)}
    ${grp('سيُحدَّث', up)}
    ${strands(pl)}
    ${(out || []).length ? `<div class="warnbox" style="margin-top:12px">
        <div class="grp" style="margin:0">خارج الخريطة
          <span class="chip">${AR(out.length)}</span></div>
        ${rows(out, true)}
        <div style="margin-top:7px">هذه الدروسُ لن تُمَسّ.
          الحذفُ لا يقع من هنا أبداً.</div>
      </div>` : grp('خارج الخريطة', [])}`;
}

/* 🎯 b177 · خطّةُ الفهرس — ستُّ مجموعاتٍ تردُّها `import_objectives` بمفاتيحَ عربية.
   🔑 **والأسماءُ المتغيّرة تُعرض قبل الجديد وبلون تنبيه:** الهدفُ يسكن المادةَ
   لا المقرَّر، فاسمٌ يتغيّر هنا يتغيّر في كلّ صفوفها — وذاك أثقلُ ما في الدفعة.
   🔴 **والمقارنةُ حرفيّة لا مُطبَّعة:** القاعدةُ تُطبّع لتقرّر الرفض، لكنّها عند
   الاعتماد تكتب الاسمَ الوارد كما هو. فكلُّ فرقٍ — ولو همزةً — سيُكتب، فيُرى.
   والذي أُعيد إرساله بلا فرقٍ يُعدّ ولا يُسرد: إعادةُ الملفّ نفسِه تُرسل
   كلَّ البنود القائمة، وسردُها يدفن الجديد تحتها. */
function planIndex(pl){
  const dist = pl?.['توزيعٌ سيُكتب'];
  if(!dist) return '';                 // دفعةٌ مرفوضة ⇒ لا خطّة
  const hn = pl['عناوينُ ستُنشأ'] || [], hu = pl['عناوينُ ستُحدَّث'] || [];
  const on = pl['بنودٌ ستُنشأ']   || [], ou = pl['بنودٌ ستُحدَّث']   || [];
  const out = pl['خارج الفهرس'] || [];
  const was = r => r['الاسم السابق'];
  const ren = [...hu, ...ou].filter(r => was(r) != null && String(was(r)).trim() !== String(r.name || '').trim());
  const same = hu.length + ou.length - ren.length;
  const links = dist.reduce((s, r) => s + (+r['عددها'] || 0), 0);
  const repl = dist.filter(r => +r['قائمةٌ قبله'] > 0);

  const chip = (t, v, warn) => `<span class="chip${v ? (warn ? ' warn' : ' g') : ''}">${
    esc(t)} <b>${AR(v)}</b></span>`;
  const row = inner => `<div class="line" style="display:flex;gap:10px;align-items:baseline;
         flex-wrap:wrap;padding:4px 0">${inner}</div>`;
  const code = c => `<code dir="ltr" style="font-size:.76rem">${esc(c || '')}</code>`;
  const grp = (t, n) => `<div class="grp" style="margin-top:12px">${t}
      <span class="chip${n ? ' g' : ''}">${AR(n)}</span></div>`;
  const none = '<div class="line" style="padding:4px 0">—</div>';

  /* البنودُ الجديدة تحت عناوينها — فيُقرأ البندُ في سياق محوره */
  const names = {};
  [...hn, ...hu].forEach(h => { names[h.code] = h.name; });
  const byParent = [];
  on.forEach(o => {
    const k = o.parent || '';
    let g = byParent.find(x => x.k === k);
    if(!g){ g = { k, list: [] }; byParent.push(g); }
    g.list.push(o);
  });

  return `
    <div class="ed-m" style="margin:0 0 4px">
      ${chip('عناوين جديدة', hn.length)}${chip('بنود جديدة', on.length)}
      ${chip('دروس', dist.length)}${chip('روابط', links)}
      ${ren.length ? chip('أسماء تتغيّر', ren.length, true) : ''}
      ${repl.length ? chip('قوائم تُستبدل', repl.length, true) : ''}
      ${chip('خارج الفهرس', out.length, true)}
    </div>

    ${ren.length ? `<div class="warnbox" style="margin-top:12px">
        <div class="grp" style="margin:0">أسماءٌ ستتغيّر
          <span class="chip warn">${AR(ren.length)}</span></div>
        ${ren.map(r => row(`${code(r.code)}<span>${esc(r.name || '')}</span>
          <span>كان: ${esc(String(was(r)))}</span>`)).join('')}
        <div style="margin-top:7px">الهدفُ يسكن المادة لا المقرَّر —
          فالاسمُ الجديد يظهر في كلّ صفوفها.</div>
      </div>` : ''}

    ${grp('عناوين ستُنشأ', hn.length)}
    ${hn.map(h => row(`${code(h.code)}<span>${esc(h.name || '')}</span>
      ${h.strand ? `<span class="chip">${esc(h.strand)}</span>` : ''}`)).join('') || none}

    ${grp('بنود ستُنشأ', on.length)}
    ${byParent.map(g => `
      <div class="line" style="display:flex;gap:10px;align-items:baseline;flex-wrap:wrap;
           margin:14px 0 2px;font-weight:700;color:var(--text)">${
        g.k ? `${code(g.k)}<span dir="auto">${esc(names[g.k] || '')}</span>` : 'بلا عنوان'}</div>
      ${g.list.map(o => row(`${code(o.code)}<span dir="auto">${esc(o.name || '')}</span>`)).join('')}`
    ).join('') || none}

    ${same ? `<div class="line" style="margin-top:10px">وأُعيد إرسالُ ${N(same,
      'كودٍ قائم', 'كودين قائمين', 'أكواد قائمة', 'كوداً قائماً')} بلا تغيير — فلا يُمسّ.</div>` : ''}

    ${grp('توزيع البنود على الدروس', dist.length)}
    ${dist.map(r => row(`${code(r.key)}<span>${esc(r.title || '')}</span>
      <span class="chip g">${AR(+r['عددها'] || 0)}</span>
      ${+r['قائمةٌ قبله'] > 0 ? `<span class="chip warn">تُستبدل قائمةٌ من ${AR(r['قائمةٌ قبله'])}</span>` : ''}
      <span dir="ltr" style="font-size:.74rem">${esc((r['أهداف'] || []).join(' · '))}</span>`
    )).join('') || none}

    ${out.length ? `<div class="warnbox" style="margin-top:12px">
        <div class="grp" style="margin:0">خارج الفهرس
          <span class="chip">${AR(out.length)}</span></div>
        ${out.map(r => row(`<span>${esc(r.title || '')}</span>
          <span>#${AR(r.id)}</span>
          <span class="chip">${+r['أهدافُه الآن'] ? N(+r['أهدافُه الآن'],
            'هدفٌ واحد', 'هدفان', 'أهداف', 'هدفاً') : 'بلا أهداف'}</span>`)).join('')}
        <div style="margin-top:7px">هذه الدروسُ لن تُمَسّ — أهدافُها تبقى كما هي.</div>
      </div>` : grp('خارج الفهرس', 0)}`;
}

/* 📖 b191 · خطّةُ النصوص — ثلاثُ مجموعاتٍ تردّها `import_texts` (180) بمفاتيحَ عربيّة.
   🔑 **والصفرُ يُعرض ولا يُخفى** (حكمُ planCards): «سيُنشأ ٠» عند إعادة الملفّ تقول «تصحيحٌ لا تكرار».
   🔑 **وما لم يتغيّر يُطوى ولا يُحذف** (حكمُ planIndex): إعادةُ ملفّ المقرَّر بعد تصحيح نصٍّ واحد
      تُرسل النصوصَ كلَّها، وسردُها يدفن المتغيّرَ تحتها. فإن لم يتغيّر شيءٌ فُتح.
   👁 **ولكلّ نصٍّ زرُّ معاينة** (القرار ⑤ في 180) — والنصُّ يظهر للطالب بعد الاعتماد بلا نشرٍ آخر
      (`save_item` رسميٌّ للصفّ)، فالمعاينةُ قبله هي الفرصةُ الوحيدة. والزرُّ يحمل ما يُعرف به النصّ
      في الملفّ (مفتاحُ درسه وعنوانُه) لا موضعَه في الخطّة — فلا يُعاين نصٌّ غيرُه. */
function planTexts(pl){
  if(!pl?.['سيُنشأ']) return '';                 // دفعةٌ مرفوضة ⇒ لا خطّة
  const mk = pl['سيُنشأ'] || [], up = pl['سيُحدَّث'] || [], same = pl['بلا تغيير'] || [];
  const chip = (t, v) => `<span class="chip${v ? ' g' : ''}">${esc(t)} <b>${AR(v)}</b></span>`;
  const row = r => `
    <div class="line" style="display:flex;gap:10px;align-items:baseline;flex-wrap:wrap;padding:6px 0">
      <code dir="ltr" style="font-size:.76rem">${esc(r['الدرس'] || '')}</code>
      <b dir="auto" style="color:var(--text)">${esc(r['النصّ'] || '')}</b>
      <span dir="auto">${esc(r['عنوانُ الدرس'] || '')}</span>
      <span class="chip">${r['اللغة'] === 'en' ? 'English' : 'العربية'}</span>
      <span class="chip">${N(r['فقرات'] || 0, 'فقرة', 'فقرتان', 'فقرات', 'فقرة')}</span>
      <span class="chip">${N(r['كلمات'] || 0, 'كلمة', 'كلمتان', 'كلمات', 'كلمة')}</span>
      ${r['الموضع'] && r['الموضع'] !== 'موضعُه القائم' ? `<span class="chip">${esc(r['الموضع'])}</span>` : ''}
      <button type="button" class="mf-up" data-pv data-k="${escA(r['الدرس'] || '')}"
        data-t="${escA(r['النصّ'] || '')}" data-l="${escA(r['عنوانُ الدرس'] || '')}"
        data-lang="${escA(r['اللغة'] || '')}" data-pos="${escA(r['الموضع'] || '')}">معاينة</button>
    </div>`;
  const grp = (t, list) => `
    <div class="grp" style="margin-top:12px">${t}
      <span class="chip${list.length ? ' g' : ''}">${AR(list.length)}</span></div>
    ${list.map(row).join('') || '<div class="line" style="padding:4px 0">—</div>'}`;
  return `
    <div class="ed-m" style="margin:0 0 4px">
      ${chip('سيُنشأ', mk.length)}${chip('سيُحدَّث', up.length)}${chip('بلا تغيير', same.length)}
    </div>
    ${grp('سيُنشأ', mk)}
    ${grp('سيُحدَّث', up)}
    ${same.length ? `<details style="margin-top:12px"${mk.length + up.length ? '' : ' open'}>
        <summary class="line" style="cursor:pointer">بلا تغيير: ${N(same.length, 'نصّ واحد',
          'نصّان', 'نصوص', 'نصّاً')} كما في القاعدة، فلا كتابة</summary>
        ${same.map(row).join('')}
      </details>` : ''}`;
}

/* 📖 b191 · زرُّ المعاينة في خطّة النصوص — يُفوَّض من `#out` (الخطّةُ تُعاد كتابتُها مع كلّ جافّة).
   🔑 **والمتنُ من الملفّ لا من الخطّة:** القاعدةُ تردّ أرقامَه لا نصَّه. فيُطبَّع كما تطبّعه
      (`\r\n` ⇐ `\n` · تقليمُ الطرفين) ليُرى ما سيُكتب لا ما لُصق. وهذا عرضٌ لا حراسة.
   🔑 **والدرسُ بعنوانه:** `author_lessons` لا تردّ مفتاحَ المؤلّف، والخطّةُ تردّ عنوانَ الدرس.
      وقِيس: لا عنوانان متطابقان في مقرَّرٍ واحد (٥١١ درساً · ٢٤ أكتوبر) — ولا قيدَ يضمنه،
      فإن تعدّد التطابقُ عُوين بلا كلماتٍ ملوّنة ولم يُخمَّن.
   ⚠️ وفي التحديث بلا `description` في الملفّ يبقى الوصفُ القائم — والمعاينةُ لا تعرفه فتُريه فارغاً. */
async function previewFromPlan(e, course, parsed){
  const b = e.target.closest('[data-pv]');
  if(!b || !parsed) return;
  const cut = s => String(s ?? '').replace(/^[ \t\r\n]+|[ \t\r\n]+$/g, '');
  const { k, t, l, lang, pos } = b.dataset;
  const src = (parsed.texts || []).find(x =>
    cut(x?.lesson) === k && cut(x?.title).toLowerCase() === t.toLowerCase());
  if(!src){ toast('لم يوجد هذا النص في الملف'); return; }
  b.disabled = true;
  const { data } = await api.authorLessons(course.id).then(r => r, () => ({}));
  b.disabled = false;
  const hit = (data || []).filter(x => x.title === l);
  const lesson = hit.length === 1 ? hit[0] : null;
  previewText({
    course, lesson, btn: b, title: t, lang: lang || 'ar',
    subtitle: cut(src.description),
    body: String(src.body ?? '').replace(/\r\n?/g, '\n').replace(/^[ \t\n]+|[ \t\n]+$/g, ''),
    quiz: lesson ? (lesson.items || []).some(x => x.kind === 'quiz' && x.quiz_id)
                 : pos === 'قبل اختبار الدرس',
    from: 'من الملف قبل الاعتماد، ولا تحفظ شيئاً'
  });
}

/* ═══════════ 🎧 b221 · الصوتُ المسحوب مع الملفّ ═══════════ */
/* والمثالُ قطعٌ قصيرةٌ لا تنكسر (`.imp-help code`): قطعةٌ طويلةٌ تنكسر وسطَ السطر العربيّ فيتبعثر ترتيبُها — كشفته لقطة */
const AUDIO_HELP = `<span class="imp-help"><b>وللاستماع:</b> اسم الملف الصوتي في <code dir="ltr">"media": "dialogue1.mp3"</code>،
      ويُسحب الملف مع ملف JSON. ونص المقطع في <code dir="ltr">"transcript"</code> سطراً سطراً:
      <code dir="ltr">["Tom: Hi!", "Sara: Hello."]</code> — تُقترح مواضع سطوره من وقفات الصوت، وتُراجع في «سطور المقطع».</span>`;
/* الحجمُ بوحدته: ملفٌّ دون الميجابايت بالكيلوبايت — فلا يُقرأ «٠٫٠ م.ب» لملفٍّ فيه صوت */
const SZ = n => n < 1048576 ? `${AR(Math.max(1, Math.round(n / 1024)))} ك.ب`
                            : `${AR((n / 1048576).toFixed(1)).replace('.', '٫')} م.ب`;
/* المدّةُ دون الدقيقة بالكلمة: «٠:١٠ · ٣٠٦» تُقرأ رقماً واحداً — الصفرُ الهنديّ والفاصلُ نقطتان متشابهتان (كشفته لقطة) */
const dur = ms => ms < 60000 ? N(Math.max(1, Math.round(ms / 1000)), 'ثانية', 'ثانيتان', 'ثوان', 'ثانية') : clock(ms / 1000, AR);
const isJson  = f => /\.(json|txt)$/i.test(f.name) || /json|text\/plain/.test(f.type || '');
const isAudio = f => AUDIO_EXT.includes((f.name.split('.').pop() || '').toLowerCase());

/* المفتاحُ من بصمة الملفّ (`hashName`) في صيغة `audioKey` نفسِها — وبها يُفحص الامتدادُ والحجمُ كما في زرّ الرفع */
async function contentKey(file){
  const base = audioKey('i', file);
  if(base.error) return base;
  const sha = new Uint8Array(await crypto.subtle.digest('SHA-256', await file.arrayBuffer()));
  const hex = [...sha].map(b => b.toString(16).padStart(2, '0')).join('');
  return { key: base.key.replace(/[a-z0-9]+-[a-z0-9]{6}(\.[a-z0-9]{2,4})$/, hashName(hex) + '$1'), error: null };
}

/* الصوتُ يُفكّ في المتصفّح بثمانية آلاف عيّنةٍ في الثانية: تكفي للطاقة، وملفٌّ من عشر دقائق نحو ٢٠ م.ب في الذاكرة.
   وتعذُّرُ الفكّ لا يردّ شيئاً: تُكتب السطورُ بلا مواضع، وتُضبط بالنقر في «سطور المقطع» */
async function pausesOf(file){
  try{
    const ctx = new OfflineAudioContext(1, 1, 8000);
    const ab = await ctx.decodeAudioData(await file.arrayBuffer());
    const len = ab.length, ch = ab.numberOfChannels, mono = new Float32Array(len);
    for(let c = 0; c < ch; c++){ const d = ab.getChannelData(c); for(let i = 0; i < len; i++) mono[i] += d[i] / ch; }
    return { ms: Math.round(ab.duration * 1000), found: findPauses(envelope(mono, ab.sampleRate)) };
  }catch(e){
    console.warn('[import] تعذّر فكّ الصوت:', file.name, e);
    return { ms: null, found: null };
  }
}

/* الرفعُ عند الاعتماد وقبل الدفعة: فلا يُكتب في القاعدة مفتاحٌ بلا ملفّ. و`412` على مفتاحٍ من البصمة هو الملفُّ نفسُه
   رُفع من قبل — فيُعدّ مرفوعاً، والاعتمادُ المعادُ بعد تعثّرٍ لا يرفع شيئاً مرّتين */
async function uploadAll(A, aud, say){
  for(const [i, k] of A.files.entries()){
    const v = aud.get(k);
    say(`جار رفع الصوت… ${AR(i + 1)} من ${AR(A.files.length)}: ${v.file.name}`);
    const { error } = await api.uploadMedia(v.key, v.file);
    if(error && error.status !== 412)
      return { error: { name: v.file.name, why: error.status === 403 ? 'لا صلاحية رفع لهذا الحساب' : error.message || 'سبب غير معروف' } };
  }
  return { error: null };
}

/* السطورُ بنداءٍ ثانٍ بعد الاعتماد: النصُّ يُعرف بمفتاح ملفّه في الاختبار (أو البنك) الذي كُتب للتوّ. ولا تُطمس سطورٌ
   قائمة — السطورُ تتبع الملفّ أينما استُعمل (197 ①)، فملفٌّ له سطورٌ من قبل يبقى عليها */
async function writeLines(qid, A, aud, say){
  const res = { written: [], kept: [], failed: [] };
  const q = await api.quizForEdit(qid).then(x => x, e => ({ error: e }));
  const byKey = new Map(((q.data?.ok && q.data.passages) || []).map(p => [p.media, p]));
  for(const [i, u] of A.uses.entries()){
    say(`جار كتابة سطور المقاطع… ${AR(i + 1)} من ${AR(A.uses.length)}`);
    const key = u.key ?? aud.get(u.name)?.key, name = useName(u, aud), p = byKey.get(key);
    if(!p){ res.failed.push({ name, why: 'لم يُعرف نصّه المشترك بعد الاعتماد' }); continue; }
    const cur = await api.passageLines(p.id);
    if(cur.error || !cur.data?.ok){ res.failed.push({ name, why: cur.error?.message || cur.data?.error || '' }); continue; }
    if(cur.data.lines?.length){ res.kept.push(name); continue; }
    const w = await api.savePassageLines(p.id, LN.payload(u.lines));
    if(w.error || !w.data?.ok){ res.failed.push({ name, why: w.error?.message || w.data?.error || '' }); continue; }
    res.written.push(name);
  }
  return res;
}
const useName = (u, aud) => u.name ? aud.get(u.name)?.file.name ?? u.name : u.key;

/* ما بقي من السطور وما تعذّر — والاسمُ لاتينيٌّ في جملةٍ عربيّة فيُعزل (`bdi`)، وإلا انقلب ما حوله */
const linesWarn = lw => [
  ...(lw?.kept || []).map(n => `سطور <bdi dir="ltr">${esc(n)}</bdi> قائمة من قبل، فبقيت ولم تُكتب من الملف`),
  ...(lw?.failed || []).map(f => `تعذّرت كتابة سطور <bdi dir="ltr">${esc(f.name)}</bdi>${f.why ? ` (${esc(f.why)})` : ''}
      — وتُكتب من «سطور المقطع» في النص المشترك`)];

/* قسمُ الصوت في الخطّة: ما يُرفع، ولأيّ نصّ، وسطورُه ومواضعُها — والجافّةُ لم ترفع شيئاً. و`head` بعد الاعتماد ما وقع */
function audioBox(A, aud, head){
  if(!A || (!A.files.length && !A.uses.length)) return '';
  const byName = new Map(A.uses.filter(u => u.name).map(u => [u.name, u]));
  const row = (title, sub) => `<div class="imp-au"><b dir="ltr"><bdi>${esc(title)}</bdi></b><span>${sub}</span></div>`;
  const linesOf = u => {
    const n = u.lines.length, t = u.lines.filter(l => l.start != null).length, all = N(n, 'سطر', 'سطران', 'سطور', 'سطراً');
    if(u.timed) return `${all} ${n === 1 ? 'بموضعه' : 'بمواضعها'} من الملف`;
    if(t === n) return `${all} ${n === 1 ? 'بموضعه' : 'بمواضعها'} من وقفات الصوت`;
    if(t) return `${all}، وُقّت منها ${AR(t)} من وقفات الصوت`;
    return `${all} ${n === 1 ? 'بلا موضع' : 'بلا مواضع'}`;
  };
  /* أين يُستعمل الملفّ: الحمولةُ قبل البصمة تحمل اسمَه بحروفٍ صغيرة (`planAudio`) — فيُسمّى النصُّ والسؤالُ بعينهما */
  const ps = Array.isArray(A.payload?.passages) ? A.payload.passages : [];
  const qs = Array.isArray(A.payload?.questions) ? A.payload.questions : [];
  const where = k => [
    ...ps.map((p, i) => p?.media === k ? `النص ${esc(p.ref ?? p.id ?? '#' + AR(i + 1))}` : null),
    ...qs.map((q, i) => q?.audio === k ? `صوت السؤال ${AR(i + 1)}` : null)].filter(Boolean);
  const files = A.files.map(k => {
    const v = aud.get(k), u = byName.get(k), w = where(k);
    const bare = !u && w.some(x => x.startsWith('النص'));
    return row(v.file.name, [v.ms ? dur(v.ms) : null, SZ(v.file.size), ...w,
                             u ? linesOf(u) : bare ? 'بلا نص مقطع' : null].filter(Boolean).join(' · '));
  });
  const keys = A.uses.filter(u => u.key).map(u => row(u.key, `النص ${esc(u.ref)} · ${linesOf(u)} — تُكتب إن لم تكن له سطور`));
  const nf = A.files.length, nu = A.uses.length;
  const lead = nf ? `يُرفع ${N(nf, 'ملف', 'ملفان', 'ملفات', 'ملفاً')} عند الاعتماد` +
                    (nu ? `، وتُكتب بعده سطور ${N(nu, 'مقطع', 'مقطعين', 'مقاطع', 'مقطعاً')}` : '')
                  : `تُكتب سطور ${N(nu, 'مقطع', 'مقطعين', 'مقاطع', 'مقطعاً')} بعد الاعتماد`;
  return `<div class="line" style="margin:12px 0 6px"><b>الصوت</b> · ${head || lead}</div>
    ${files.join('')}${keys.join('')}`;
}

/* ═══════════ جدولُ البوّابات — وهو كلُّ الفرق بينها ═══════════
   🔑 ما اختلف بُيّن هنا، وما اتّفق بقي أسفلُ مرّةً واحدة. وزيادةُ
   بوّابةٍ ثالثةٍ يوماً سطرٌ في هذا الجدول، لا ملفٌّ ثالث. */
const K = {
  quiz: {
    head: ['استيراد اختبار', 'ملفّ واحد لدرس واحد'],
    card: '⇪ استيراد اختبار إلى درس',
    intro: `يُلصق ملفّ الاختبار كما سُلّم. والدرس يُعرف بمفتاح مؤلّفه
      (<code dir="ltr">lesson_key</code>) لا برقمه، والهدف بكوده،
      وكلّ مشتّت خاطئ بكود تشخيصه.<br>
      ويُنشئ الاختبار وبنده في الدرس. ولإضافة أسئلة إلى اختبار قائم
      فبابها شاشة الاختبار نفسها.<br>
      ${AUDIO_HELP}`,
    ph: '{ "lesson_key": "U1L2.DISC", "quiz": { … }, "questions": [ … ] }',
    sample: SAMPLE,
    audio: true,
    call: (course, payload, dry) => api.importQuiz(course.id, payload, dry),
    plan: planBox,
    count: pl => N(pl?.['أسئلة'] || 0, 'سؤال', 'سؤالين', 'أسئلة', 'سؤالاً'),
    done: d => `اعتُمد ${N(d.questions || 0, 'سؤال', 'سؤالان', 'أسئلة', 'سؤالاً')}`,
    okline: 'اعتُمد — والاختبار غير منشور، فلا يراه الطالب بعد'
  },
  map: {
    head: ['استيراد خريطة الدروس', 'ملفّ واحد لمقرّر واحد'],
    card: '⇪ استيراد خريطة دروس المقرّر',
    intro: `يُلصق ملفّ الخريطة كما سلّمه معلّم المادة. والدرس يُعرف
      <b>بمفتاح مؤلّفه</b> (<code dir="ltr">key</code>) لا برقمه، فإعادةُ
      الملفّ تصحيحٌ لا تكرار.<br>
      <b>ويُنشئ ويُحدّث ولا يحذف:</b> درسٌ في القاعدة ليس في الخريطة
      يُعرض في «خارج الخريطة» ويبقى كما هو بأسئلته.<br>
      وعنوانُ درسٍ قائمٍ لا يُغيَّر إلا بإذنك الصريح.`,
    ph: '{ "subject": "…", "strands": [ … ], "lessons": [ { "key": "U1.X", "order": 1, "title": "…" } ] }',
    sample: SAMPLE_MAP,
    call: (course, payload, dry, o) =>
      api.importLessonMap(course.id, payload, dry, !!o.retitle),
    plan: planMap,
    /* 🔑 الخريطةُ تردُّ مجموعاتِها في جسم الرادّ لا تحت «الخطّة» */
    pickPlan: d => d,
    /* إذنُها تحذيرٌ يسمح لا خطأٌ يردّ — فيُرسم بعد جافّةٍ مرّت وحدها */
    perms: [{ id: 'retitle', from: 'warn', match: 'العنوان',
              label: 'اسمح بتغيير عناوين الدروس القائمة' }],
    count: pl => N((pl?.['سيُنشأ'] || []).length + (pl?.['سيُحدَّث'] || []).length,
                   'درس', 'درسين', 'دروس', 'درساً'),
    done: d => `حُفظت الخريطة — ${N((d['سيُنشأ'] || []).length,
                 'درس', 'درسان', 'دروس', 'درساً')} أُنشئ` +
               ((d['سيُحدَّث'] || []).length
                 ? ` · و${AR(d['سيُحدَّث'].length)} حُدّث` : ''),
    okline: 'حُفظت الخريطة. أعِد الإرسالَ بعد أيّ تصحيح — المفتاحُ يمنع التكرار.'
  },
  /* 🎯 b177 · المرحلة ② — بعد الخريطة لا قبلها: التوزيعُ يُسمّي الدروسَ بمفاتيحها */
  objectives: {
    head: ['استيراد فهرس الأهداف', 'ملفّ واحد لمقرّر واحد'],
    card: '⇪ استيراد فهرس أهداف المقرّر',
    intro: `يُلصق ملفّ الفهرس كما سلّمه معلّم المادة: <b>عناوينُ</b> عريضة،
      وتحتها <b>بنودٌ</b> لكلٍّ منها دليلُ قياسه وعلاجُه، ثمّ <b>توزيعُها</b>
      على الدروس بمفاتيحها (<code dir="ltr">key</code>) — فتُستورد الخريطةُ قبله.<br>
      <b>والهدفُ يسكن المادة لا المقرَّر:</b> كودٌ قائمٌ يُعاد استعمالُه باسمه
      ولا يُكرَّر، فإعادةُ الملفّ تصحيحٌ لا تكرار.<br>
      <b>ولا يحذف شيئاً:</b> درسٌ ليس في الملفّ يبقى بأهدافه.
      وتغييرُ اسم هدفٍ قائم، أو استبدالُ أهداف درسٍ له أهداف،
      <b>تُردّ بهما الدفعة</b> حتى تأذن صراحةً.`,
    ph: '{ "headings": [ … ], "objectives": [ { "code": "R.X", "parent": "READ", "name": "…", "evidence": "…", "remedy": "…" } ], "lessons": [ { "key": "U1.X", "objectives": [ … ] } ] }',
    sample: SAMPLE_INDEX,
    call: (course, payload, dry, o) =>
      api.importObjectives(course.id, payload, dry, !!o.rename, !!o.replace),
    plan: planIndex,
    pickPlan: d => d,
    /* 🔴 إذناه يأتيان أخطاءً لا تحذيرات — فيُرسمان تحت الرفض. و«لاصقان»:
       بعد الإذن يصير الخطأُ تحذيراً بعبارةٍ أخرى، فيبقى المربّعُ ظاهراً
       ليُطفأ كما أُشعل. */
    perms: [
      { id: 'rename', from: 'err', match: 'p_allow_rename', sticky: true,
        label: 'اسمح بتغيير أسماء الأهداف القائمة — في كلّ صفوف المادة' },
      { id: 'replace', from: 'err', match: 'p_allow_replace', sticky: true,
        label: 'اسمح باستبدال أهداف الدروس التي لها أهدافٌ قائمة' }
    ],
    count: pl => {
      const n = (pl?.['بنودٌ ستُنشأ'] || []).length;
      return (n ? N(n, 'بند جديد', 'بندين جديدين', 'بنود جديدة', 'بنداً جديداً') + ' · و' : '') +
             'توزيع ' + N((pl?.['توزيعٌ سيُكتب'] || []).length, 'درسٍ واحد', 'درسين', 'دروس', 'درساً');
    },
    done: d => `حُفظ الفهرس — ${N((d['بنودٌ ستُنشأ'] || []).length,
                 'بندٌ جديد', 'بندان جديدان', 'بنود جديدة', 'بنداً جديداً')} · ` +
               `وتوزيعُ ${N((d['توزيعٌ سيُكتب'] || []).length, 'درس', 'درسين', 'دروس', 'درساً')}`,
    okline: 'حُفظ الفهرس. أعِد الإرسالَ بعد أيّ تصحيح — الكودُ يمنع التكرار.'
  },
  cards: {
    head: ['استيراد بطاقات', 'دفعة واحدة إلى مجموعة المادة'],
    card: '⇪ استيراد بطاقات إلى المادة',
    intro: `يُلصق ملفّ البطاقات كما سُلّم. والدرس يُعرف بمفتاح مؤلّفه
      (<code dir="ltr">lessons</code>) والفرع باسمه، <b>ولكلّ بطاقة
      دروسها وفروعها</b> — لا واحدٌ للدفعة كلّها كما في شاشة اللصق.<br>
      <b>والوسم يُضاف ولا يُستبدل:</b> ما وسمته بيدك يبقى، وإزالته من
      شاشة البطاقات لا من هنا.<br>
      وإعادة الملفّ <b>تصحيح لا تكرار</b> — ما تكرّر وجهه حُدّث معناه.`,
    ph: '{ "cards": [ { "front": "…", "back": "…", "examples": [ … ] } ] }',
    sample: SAMPLE_CARDS,
    call: (course, payload, dry) => api.importCards(course.id, payload, dry),
    plan: planCards,
    count: pl => N((pl?.['سيُنشأ'] || 0) + (pl?.['سيُحدَّث'] || 0),
                   'بطاقة', 'بطاقتين', 'بطاقات', 'بطاقة'),
    done: d => `اعتُمدت ${N(d['أُنشئت'] || 0, 'بطاقة', 'بطاقتان', 'بطاقات', 'بطاقة')}` +
               (d['حُدِّثت'] ? ` · وحُدّثت ${AR(d['حُدِّثت'])}` : ''),
    okline: 'اعتُمدت — والوسم أُضيف ولم يُزل شيء'
  },
  /* 📖 b191 · البوّابةُ الخامسة (180). و`onOut` جديد: نقرةٌ في منطقة النتيجة تُفوَّض إليه —
     زرُّ المعاينة في الخطّة يعيش ما عاشت، وتُعاد كتابتُها مع كلّ جافّة. */
  texts: {
    head: ['استيراد نصوص القراءة', 'ملفّ واحد لمقرّر واحد'],
    card: '⇪ استيراد نصوص القراءة إلى دروس المقرّر',
    intro: `يُلصق ملفّ النصوص كما سلّمه معلّم المادة. والدرس يُعرف <b>بمفتاح مؤلّفه</b>
      (<code dir="ltr">lesson</code>) لا برقمه.<br>
      والنصّ يُعرف <b>بعنوانه في درسه</b>: العنوان القائم يُحدَّث متنه، والجديد يُنشأ
      <b>قبل اختبار الدرس</b>.<br>
      <b>ولا يحذف شيئاً:</b> نصّ في الدرس ليس في الملفّ يبقى كما هو.<br>
      والنصّ يظهر للطالب بعد الاعتماد مباشرة — <b>فلكلّ نصّ في الخطّة معاينة</b>
      تُريه كما يراه الطالب.`,
    ph: '{ "texts": [ { "lesson": "U1.X", "title": "…", "body": "…" } ] }',
    sample: SAMPLE_TEXTS,
    call: (course, payload, dry) => api.importTexts(course.id, payload, dry),
    plan: planTexts,
    onOut: previewFromPlan,
    /* والصفرُ لا يُعدّ في الزرّ: «اعتماد ٠ نصّ» تُقرأ خطأً، والشاراتُ فوقه قالت «بلا تغيير» */
    count: pl => {
      const n = (pl?.['سيُنشأ'] || []).length + (pl?.['سيُحدَّث'] || []).length;
      return n ? N(n, 'نصّ', 'نصّين', 'نصوص', 'نصّاً') : '';
    },
    done: d => 'حُفظت النصوص — ' + ([
                 d['أُنشئ'] ? N(d['أُنشئ'], 'نصّ جديد', 'نصّان جديدان', 'نصوص جديدة', 'نصّاً جديداً') : '',
                 d['حُدِّث'] ? N(d['حُدِّث'], 'نصّ محدَّث', 'نصّان محدَّثان', 'نصوص محدَّثة', 'نصّاً محدَّثاً') : ''
               ].filter(Boolean).join(' · ') || 'بلا تغيير'),
    okline: 'حُفظت النصوص، ولم يُحذف شيء. أعِد الإرسال بعد أيّ تصحيح — العنوان يمنع التكرار.'
  },
  /* 🆕 b208 · البوّابةُ السادسة (192): بنكُ الأسئلة — والفرقُ عن «اختبار» في الرأس وحده */
  bank: {
    head: ['استيراد بنك أسئلة', 'دفعة إلى بنك من بنوك المادة'],
    card: '⇪ استيراد أسئلة إلى بنك المادة',
    intro: `يُلصق ملفّ الأسئلة كما سُلّم. والبنك يُعرف <b>بعنوانه</b> في المادة
      (<code dir="ltr">bank</code>): القائم تُضاف إليه الدفعة، والغائب يُنشأ.<br>
      والأسئلة بصيغة ملفّ الاختبار نفسها: الهدف بكوده — <b>وهو إلزامي هنا</b>، فبه يأخذ
      السؤال فرعه ويزنه النموذج — وكلّ مشتّت خاطئ بكود تشخيصه.<br>
      والصيغ تُقرن داخل الملفّ (<code dir="ltr">variant</code>)، والنصوص البديلة لنصّ واحد
      مجموعة (<code dir="ltr">group</code>).<br>
      <b>ويُضيف ولا يستبدل:</b> والملفّ نفسه يُعاد فيُقال «لا جديد».<br>
      ${AUDIO_HELP}`,
    ph: '{ "bank": "بنك الاستيعاب المقروء", "passages": [ … ], "questions": [ … ] }',
    sample: SAMPLE_BANK,
    audio: true,
    call: (course, payload, dry) => api.importBank(course.id, payload, dry),
    plan: planBank,
    same: d => `البنك «<bdi>${esc(d.bank || '')}</bdi>»`,
    count: pl => N(pl?.['أسئلة'] || 0, 'سؤال', 'سؤالين', 'أسئلة', 'سؤالاً'),
    done: d => `اعتُمد ${N(d.questions || 0, 'سؤال', 'سؤالان', 'أسئلة', 'سؤالاً')}`,
    okline: 'اعتُمدت الدفعة — ولا يرى الطالب أسئلة البنك إلا داخل نموذج'
  }
};

export const openQuizImport  = course => openImport(course, 'quiz');
export const openMapImport   = course => openImport(course, 'map');
export const openCardsImport = course => openImport(course, 'cards');
export const openIndexImport = course => openImport(course, 'objectives');
export const openTextsImport = course => openImport(course, 'texts');
/* 🆕 b208 · و`back` من «بنوك المادة»: { label, go } — وبلاها فدروسُ المقرّر كأخواتها */
export const openBankImport  = (course, back) => openImport(course, 'bank', back);

async function openImport(course, kind, back){
  const C = K[kind];
  const B = back || { label: 'دروس المقرّر', go: () => openCourse(course) };
  nav('editor'); setWide(true);
  head(C.head[0], C.head[1]);

  let parsed = null;                 // الحمولةُ بعد التحليل المحليّ
  let plan   = null;                 // خطّةُ الجافّة كما ردّتها القاعدة
  let perm   = {};                   // الأذونُ المشتعلة — بأسمائها في `C.perms`
  /* 🎧 b221 · ما سُحب من صوت: الاسمُ بحروفٍ صغيرة ⇒ { file, key, ms, found } — والمفتاحُ والوقفاتُ تُحسب مرّةً لكلّ ملفّ */
  const aud = new Map();
  let A = null;                      // مطابقةُ الصوت للدفعة (`planAudio`) — تُعاد مع كلّ جافّة

  /* 🔑 المربّعُ يُرسم حين تطلبه القاعدة (عبارتُه في المصدر الذي يُقرأ منه)
     أو حين يكون مشتعلاً وهو لاصق — ولا يُرسم لبوّابةٍ لا أذونَ لها.
     🔴 و`width:auto` على المربّع: `input{width:100%}` العامّةُ في base.css
     كانت تمطّه في سطر الخريطة منذ وُلد، فيقف وسطَ البطاقة ونصُّه منكسرٌ
     في طرفها — كشفته لقطةُ b177 لا قارئ. */
  const permBox = (src, list) => (C.perms || [])
    .filter(p => (p.from === src && list.some(x => String(x).includes(p.match)))
              || (p.sticky && perm[p.id]))
    .map(p => `
      <label class="line" style="display:flex;gap:8px;align-items:center;
             margin-top:12px;cursor:pointer">
        <input type="checkbox" data-perm="${p.id}" style="width:auto;flex:none;margin:0"${
          perm[p.id] ? ' checked' : ''}>
        <span>${esc(p.label)}</span>
      </label>`).join('');
  /* 🔑 والإذنُ يُعيد الجافّةَ لا يُمرَّر وحده: الخطّةُ المعروضةُ حُسبت
     بالأذون كما كانت، فلو اعتُمدت بغيرها لخالف الأثرُ ما قُرئ. */
  const bindPerms = () => document.querySelectorAll('#out [data-perm]').forEach(cb => {
    cb.onchange = () => { perm = { ...perm, [cb.dataset.perm]: cb.checked }; run('', true); };
  });

  /* خطّةٌ عُرضت ثمّ تغيّر ما فُحص ⇒ تبطل ويغيب زرُّ الاعتماد (`why` ما تغيّر) */
  const stale = why => {
    if(!plan) return;
    plan = null; parsed = null;
    const out = document.getElementById("out");
    if(out) out.innerHTML = `<div class="warnbox" style="margin-top:14px">${esc(why)} — أعِد التجربة الجافّة قبل الاعتماد.</div>`;
  };
  /* 🎧 قائمةُ الصوت المسحوب بحجم كلّ ملفّ، ولكلٍّ زرُّ إزالة */
  const drawAud = () => {
    const box = document.getElementById("aud");
    if(!box) return;
    box.innerHTML = [...aud.entries()].map(([k, v]) => `<span class="chip imp-f"><bdi dir="ltr">${esc(v.file.name)}</bdi>
      <span>${SZ(v.file.size)}</span>
      <button type="button" class="imp-x" data-rm="${escA(k)}" aria-label="إزالة ${escA(v.file.name)}">✕</button></span>`).join('');
    box.querySelectorAll('[data-rm]').forEach(b => b.onclick = () => {
      aud.delete(b.dataset.rm); drawAud(); stale('تغيّر الصوت المسحوب'); });
  };

  const draw = () => {
    app.innerHTML = `
      <div class="crumb" id="bk">→ ${esc(B.label)}</div>
      <div class="card">
        <div class="qnum">${C.card}</div>
        <div class="line" style="margin-bottom:12px">
          ${C.intro}<br>
          وتُجرى <b>تجربة جافّة</b> أوّلاً: تمرّ بالحرّاس كلّهم ثمّ تُنقَض،
          فلا يُكتب شيء قبل أن تُقرأ الخطّة.</div>

        <div class="drop" id="dz">
          <div class="drop-i">⇪</div>
          ${C.audio ? `<div>بسحب ملف JSON هنا ومعه ملفات الصوت · أو <span class="drop-a" id="pick">باختيار الملفات</span>
            · أو بلصقه أدناه</div>
          <div class="drop-s">الملف يُقرأ في متصفحك، والصوت لا يُرفع إلا عند الاعتماد
            · JSON حتى ٢ ميجابايت · والصوت حتى ${AR(AUDIO_MAX_MB)} ميجابايت للملف</div>
          <input type="file" id="file" accept=".json,.txt,application/json,audio/*" multiple hidden>`
          : `<div>بسحب ملف JSON هنا · أو <span class="drop-a" id="pick">باختيار ملفّ</span>
            · أو بلصقه أدناه</div>
          <div class="drop-s">الملف يُقرأ في متصفحك — ولا يُرفع إلى أيّ خادم
            · حتى ٢ ميجابايت</div>
          <input type="file" id="file" accept=".json,.txt,application/json" hidden>`}
        </div>
        ${C.audio ? '<div class="imp-files" id="aud" aria-live="polite"></div>' : ''}
        <textarea id="js" class="eq-wide" dir="ltr"
          style="min-height:220px;font-family:monospace;font-size:.78rem"
          placeholder='${C.ph}'
          >${esc(parsed ? JSON.stringify(parsed, null, 2) : '')}</textarea>
        <div class="nav" style="margin-top:12px">
          <button class="btn primary" id="dry">تجربة جافّة</button>
          <button class="btn ghost" id="sm">قالب مثال</button>
          <button class="btn ghost" id="x">إلغاء</button>
        </div>
        <div id="out"></div>
      </div>`;

    document.getElementById("bk").onclick = B.go;
    document.getElementById("x").onclick  = B.go;
    document.getElementById("sm").onclick = () => {
      document.getElementById("js").value = C.sample; };

    const ta  = document.getElementById("js");
    const pk  = document.getElementById("file");
    const dz  = document.getElementById("dz");
    document.getElementById("pick").onclick = () => pk.click();

    const readFile = f => {
      if(!f) return;
      if(f.size > MAX){ toast('الملفّ أكبر من ٢ ميجابايت'); return; }
      const r = new FileReader();
      r.onload = () => { ta.value = String(r.result || ''); stale('تغيّر النصّ'); };
      r.readAsText(f);
    };
    /* 🎧 b221 · وفي بوّابتَي الصوت تُسحب الملفّاتُ معاً: JSON إلى المربّع، والصوتُ إلى قائمته — ويُقال ما ليس هذا ولا ذاك */
    const readFiles = list => {
      const fs = [...(list || [])];
      if(!C.audio) return readFile(fs[0]);
      fs.filter(f => !isJson(f) && !isAudio(f)).forEach(f => toast(`«${f.name}» ليس JSON ولا ملفاً صوتياً`));
      const js = fs.find(isJson), au = fs.filter(isAudio);
      if(js) readFile(js);
      au.forEach(f => aud.set(f.name.toLowerCase(), { file: f }));
      if(au.length){ drawAud(); stale('تغيّر الصوت المسحوب'); }
    };
    pk.onchange = e => { readFiles(e.target.files); pk.value = ''; };
    ['dragenter','dragover'].forEach(ev => dz.addEventListener(ev, e => {
      e.preventDefault(); dz.classList.add('on'); }));
    ['dragleave','drop'].forEach(ev => dz.addEventListener(ev, e => {
      e.preventDefault(); dz.classList.remove('on'); }));
    dz.addEventListener('drop', e => readFiles(e.dataTransfer?.files));

    /* 🔒 الحارس: «الاعتمادُ يشترط فرقاً مرئيّاً **لنفس النصّ**».
       فتعديلُ حرفٍ بعد عرض الفرق يُبطل الخطّةَ ويُخفي زرَّ الاعتماد —
       فلا يُعتمد نصٌّ لم تمرّ عليه الجافّة. 🎧 والصوتُ المسحوب كذلك: ملفٌّ يُضاف أو يُزال بعد الجافّة يُبطلها */
    ta.oninput = () => stale('تغيّر النصّ');
    drawAud();

    document.getElementById("dry").onclick = () => run(ta.value || '', true);
    /* 📖 b191 · `#out` يبقى والخطّةُ تُكتب فيه مرّةً بعد مرّة ⇒ مستمعٌ واحدٌ هنا يخدم كلَّ رسم.
       و`parsed` تُقرأ ساعةَ النقر لا ساعةَ الربط. */
    if(C.onOut) document.getElementById("out").onclick = e => C.onOut(e, course, parsed);
  };

  /* ── الجافّة والاعتماد: نداءٌ واحد بفارقٍ واحد ──
     🔑 وعلى مسارٍ واحد: ما يُفحص هو ما يُعتمد. */
  async function run(txt, dry){
    const out = document.getElementById("out");
    out.innerHTML = `<div class="status" style="margin-top:14px">${
      dry ? 'جار الفحص…' : 'جار الاعتماد…'}</div>`;

    /* نصٌّ مُرسَلٌ ⇒ يُحلَّل. وفراغٌ مع حمولةٍ محلولةٍ ⇒ إعادةُ الجافّة
       على الحمولة نفسِها (تغيّرَ إذنٌ لا النصّ). */
    if(dry && (txt || !parsed)){
      try { parsed = JSON.parse(txt); }
      catch(e){
        out.innerHTML = `<div class="eq-ready" style="margin-top:14px">
          <div class="eq-iss">⚠️ الملفّ ليس JSON صالحاً — ${esc(e.message)}</div></div>`;
        return;
      }
    }

    /* 🎧 b221 · الصوتُ المسحوب قبل أيّ نداء: يُطابَق ويُبصم ويُفكّ — وما لم يُطابَق يُقال ولا يُرسل شيء.
       والحمولةُ بمفاتيح البصمة نفسِها في الجافّة والاعتماد، فما فُحص هو ما يُعتمد */
    let payload = parsed;
    if(C.audio){
      const say = t => { out.innerHTML = `<div class="status" style="margin-top:14px">${esc(t)}</div>`; };
      A = planAudio(parsed, [...aud.values()].map(v => v.file.name), AUDIO_EXT);
      const bad = [...A.errors];
      for(const k of A.files){
        const v = aud.get(k);
        if(!v.key){
          say(`جار تحليل الصوت… ${v.file.name}`);
          const r = await contentKey(v.file);
          if(r.error){ bad.push(`«${v.file.name}»: ${r.error}`); continue; }
          v.key = r.key;
        }
        if(v.found === undefined && A.uses.some(u => u.name === k && !u.timed)){
          say(`جار تحليل الصوت… ${v.file.name}`);
          Object.assign(v, await pausesOf(v.file));
        }
      }
      if(bad.length){
        out.innerHTML = `<div class="eq-ready" style="margin-top:14px">
          ${bad.slice(0, 20).map(x => `<div class="eq-iss">⚠️ ${esc(x)}</div>`).join('')}
          ${bad.length > 20 ? `<div class="eq-iss">… و${AR(bad.length - 20)} غيرها</div>` : ''}
          <div class="line" style="margin-top:8px">ولم يُرسل شيء إلى القاعدة.</div></div>`;
        return;
      }
      for(const u of A.uses) if(u.name && !u.timed) u.lines = timedLines(u.lines, aud.get(u.name).found);
      payload = withKeys(A.payload, Object.fromEntries(A.files.map(k => [k, aud.get(k).key])));
      /* والاعتمادُ يرفع أوّلاً: تعثّرُ الرفع يوقفه قبل أن يُكتب في القاعدة حرف */
      if(!dry && A.files.length){
        const up = await uploadAll(A, aud, say);
        if(up.error){
          /* والخطّةُ باقيةٌ لم يتغيّر ما فُحص — فالإعادةُ زرٌّ هنا، لا جافّةٌ من جديد */
          /* والاسمُ والسببُ معزولان (`bdi`): «name»: R2 500 بلا عزلٍ صار تتابعاً لاتينيّاً واحداً انقلبت فيه العلامتان (كشفته لقطة) */
          out.innerHTML = `<div class="err" style="margin-top:14px"><b>توقّف الاعتماد</b>تعذّر رفع
            <bdi dir="ltr">${esc(up.error.name)}</bdi> (<bdi>${esc(up.error.why)}</bdi>)
            — ولم يُكتب في القاعدة شيء، وما رُفع قبله لا يُرفع ثانيةً عند الإعادة.</div>
            <div class="nav" style="margin-top:12px"><button class="btn primary" id="go">إعادة الاعتماد</button></div>`;
          document.getElementById("go").onclick = () => run('', false);
          return;
        }
        say('جار الاعتماد…');
      }
    }

    const { data, error } = await C.call(course, payload, dry, perm);
    if(error){ out.innerHTML = errBox(error, 'الاستيراد'); return; }

    plan = C.pickPlan ? C.pickPlan(data) : (data?.['الخطّة'] || null);
    const warns = data?.['تحذيرات'] || [];
    const errs  = data?.['أخطاء']   || [];

    /* ملفٌّ استُورد بعينه ⇒ لا كتابةَ ولا شكوى */
    if(data?.['لا جديد']){
      out.innerHTML = `<div class="eq-ready ok" style="margin-top:14px">
        <div class="eq-ok">لا جديد — هذه الدفعة بعينها مستوردة من قبل</div>
        <div class="line">${C.same ? C.same(data) : `الاختبار <b dir="ltr">${esc(data.quiz_code || '')}</b> ·
          ${N(data.questions || 0, 'سؤال', 'سؤالان', 'أسئلة', 'سؤالاً')}`}</div>
        ${A?.uses.length ? `<div class="line" style="margin-top:6px">وسطور المقاطع لا تُكتب بإعادة الملف، وتُعدَّل من
          «سطور المقطع» في النص المشترك.</div>` : ''}</div>
        <div class="nav" style="margin-top:12px">
          <button class="btn ghost" id="bk2">→ ${esc(B.label)}</button></div>`;
      document.getElementById("bk2").onclick = B.go;
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
        ${plan && C.plan(plan) ? `<div class="eq-ready" style="margin-top:10px">${C.plan(plan)}</div>` : ''}`;
      /* 🎯 b177 · إذنٌ تطلبه القاعدةُ رفضاً ⇒ يُرسم تحت الرفض نفسِه */
      const pb = permBox('err', errs);
      if(pb){
        out.insertAdjacentHTML('beforeend', `${pb}
          <div class="line" style="margin-top:6px">الإذنُ يُعيد التجربة الجافّة —
            ولا يُكتب شيءٌ قبل «اعتماد».</div>`);
        bindPerms();
      }
      return;
    }

    /* ── مرّت ── */
    if(!dry){
      /* 🎧 والسطورُ بنداءٍ ثانٍ بعد الدفعة — وتعذُّرُها لا يردّ ما اعتُمد: يُقال، وتُكتب من «سطور المقطع» */
      let lw = null, head = '';
      if(A?.uses.length){
        const qid = data.quiz_id ?? data.bank_id;
        lw = qid ? await writeLines(qid, A, aud, t => { out.innerHTML = `<div class="status" style="margin-top:14px">${esc(t)}</div>`; })
                 : { written: [], kept: [], failed: A.uses.map(u => ({ name: useName(u, aud), why: 'لم يُعرف الاختبار بعد الاعتماد' })) };
      }
      if(A && (A.files.length || A.uses.length))
        head = [A.files.length ? `رُفع ${N(A.files.length, 'ملف', 'ملفان', 'ملفات', 'ملفاً')}` : '',
                lw?.written.length ? `${A.files.length ? 'و' : ''}كُتبت سطور ${N(lw.written.length, 'مقطع', 'مقطعين', 'مقاطع', 'مقطعاً')}` : '']
               .filter(Boolean).join('، ') || 'لم تُكتب سطور';
      const lwarn = linesWarn(lw);
      toast(C.done(data));
      out.innerHTML = `
        <div class="eq-ready ok" style="margin-top:14px">
          <div class="eq-ok">${esc(C.okline)}</div>
          ${C.plan(plan)}
          ${audioBox(A, aud, head)}
        </div>
        ${warns.length || lwarn.length ? `<div class="warnbox" style="margin-top:10px">
          ${[...warns.map(esc), ...lwarn].map(x => `<div>⚠️ ${x}</div>`).join('')}</div>` : ''}
        <div class="nav" style="margin-top:12px">
          <button class="btn primary" id="bk3">→ ${esc(B.label)}</button></div>`;
      document.getElementById("bk3").onclick = B.go;
      return;
    }

    out.innerHTML = `
      <div class="eq-ready ok" style="margin-top:14px">
        <div class="eq-ok">الجافّة مرّت — ولم يُكتب شيء${A?.files.length ? ' ولم يُرفع شيء' : ''}</div>
        ${C.plan(plan)}
        ${audioBox(A, aud)}
      </div>
      ${A?.warns.length ? `<div class="warnbox" style="margin-top:10px">
        ${A.warns.map(x => `<div>⚠️ ${esc(x)}</div>`).join('')}</div>` : ''}
      ${warns.length ? `<div class="warnbox" style="margin-top:10px">
        ${warns.map(x => `<div>⚠️ ${esc(x)}</div>`).join('')}
        <div style="margin-top:7px;opacity:.85">تحذير يُرى ولا يمنع — والاعتماد ممكن.</div>
        </div>` : ''}
      ${permBox('warn', warns)}
      <div class="nav" style="margin-top:12px">
        <button class="btn primary" id="go">اعتماد ${C.count(plan)}</button>
        <button class="btn ghost" id="again">ملفّ آخر</button>
      </div>`;
    bindPerms();
    document.getElementById("go").onclick    = () => run('', false);
    document.getElementById("again").onclick = () => {
      parsed = null; plan = null; perm = {}; A = null; aud.clear(); draw(); };
  }

  draw();
  scrollTop();
}
