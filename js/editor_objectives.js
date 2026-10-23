/* ══════════════════════════════════════════════════════════
   بيان — editor_objectives.js  ④  أهداف المادة

   الهدف يقول **في ماذا** يعمل الطالب. وكيف أخطأ يقوله كود التشخيص.
   وبينهما سلسلةٌ واحدةٌ هي كلُّ قيمة المنصّة:

       سؤال ← هدفُه ← علاجُه ← الطالب

   🔑 **وهذه الشاشة ليست قائمةَ أسماء.** فالأسماء تبدو حسنةً كلُّها،
   وإنّما تُراجَع الأهداف بأربعة عيوبٍ لا تُرى إلا بالأرقام بجوار كلّ بند:
     ① بندٌ لا سؤالَ يقيسه    ⇒ التشخيص لا ينطق عنه أبداً
     ② بندٌ بلا علاجٍ موصول   ⇒ يقول «أين أخطأ» ولا يقول «إلى أين»
     ③ بندان علاجُهما واحد    ⇒ أثر الطالب ينشقّ وعلاجه يتكرّر
     ④ عنوانٌ تحته بندٌ واحد   ⇒ تقسيمٌ لا يصف مهارة
   ولذلك يُفتح كلُّ بندٍ على دليله وعلاجه الموصوف: الثالثُ لا يُكشف إلا
   بوضع العلاجَين متجاورَين.

   وثلاثةُ ثوابت من `sql/138` و`141` — تتبعها الواجهة ولا تجتهد:
     ① طبقتان: عنوانٌ عريضٌ وبنودٌ تحته. لا ثالثة.
     ② الفرعُ للعنوان وحدَه، وورقةٌ لا حاوية. والبندُ يرثه.
     ③ الهدفُ يسكن **المادة** لا المقرَّر، فيعبر الصفوف — والكود هويّةٌ
        لا تتغيّر، وتغييرُه يقطع أثرَ طالبٍ ممتدّاً.

   🆕 b180 · **والتصفيةُ بالصفّ والدرس** (`sql/178`): ولأنّ الهدف يعبر
      الصفوف (③)، كان من يراجع صفَّه يقرأ فهرسَ الصفّين معاً — في English
      يستهدف الأوّلُ ٦٩ بنداً من ١٢٦ والثاني ٩٨.
      🔑 **والأعدادُ تتبع النطاق لا الفهرس:** بندٌ يستهدفه الأوّلُ ولا يقيسه
      إلا سؤالٌ في الثاني يُعدّ في الأوّل «لا سؤالَ يقيسه» — فطالبُ الأوّل
      لا ينطق عنه التشخيصُ أبداً، والعددُ الكلّيُّ «٥ أسئلة» يُطمئن كاذباً.
      وفي الدرس الواحد يُقرأ العيبُ ① هكذا: أيُّ أهدافه لا يقيسه اختبارُه.
      📌 والنطاقُ **الدروسُ التي تستهدف البند** (`lesson_objectives`)، لا
      الأسئلةُ التي تقيسه — فالدرسُ هو الذي يقول «هذا هدفي».

   ⚠️ ولا حذفَ هنا، وليس نقصاً: `delete_objective` غير مبنيّة، وحذفُ هدفٍ
      تستهدفه دروسٌ أو تقيسه أسئلةٌ يُيتّم تشخيصاً قائماً. وما يُستغنى عنه
      يُترك بلا درسٍ يستهدفه، فيظهر هنا «لا يستهدفه درس».
   ══════════════════════════════════════════════════════════ */
import * as api from './api.js';
import { S } from './state.js';
import { app, head, toast, esc, escA, AR, errBox, nav, setWide, N, NW, joinList } from './ui.js';
import { openCourse } from './editor.js';

let ctx  = null;    // { course, subject }
let T    = null;    // الشجرة المحمَّلة
let edit = null;    // { kind:'head'|'item', row } — null: لا تحرير
let add  = 'item';  // نوع المضاف الجديد

/* 🆕 b180 · التصفيةُ والبحثُ حالةٌ تبقى إذا أُعيد البناء — بعد الحفظ وبعد
   «تحرير البند» — فلا يرجع المؤلّفُ إلى الفهرس كلِّه كلّما نقر.
   وتبقى للمادة نفسِها إذا عاد إليها من شاشة المقرّر: من صفّى بدرسٍ ثمّ
   خرج يصل علاجاً عاد إلى درسه. ومادةٌ أخرى ⇒ تبدأ من الكلّ. */
let flt  = { g: '', l: '' };   // g: مفتاحُ الصفّ · l: معرّفُ الدرس — '' للكلّ
let qs   = '';                 // نصُّ البحث
let fltOf = null;              // المادةُ التي تخصّها flt وqs

export async function openObjectives(course, subject){
  if(fltOf !== subject.id){ flt = { g: '', l: '' }; qs = ''; fltOf = subject.id; }
  ctx = { course, subject };
  edit = null; add = 'item';
  nav('editor'); setWide(true);
  head("أهداف المادة", subject?.name || course.title);
  app.innerHTML = `<div class="status">جار التحميل…</div>`;
  await reload();
}

async function reload(){
  const { data, error } = await api.objectivesTree(ctx.subject.id);
  if(error){ app.innerHTML = errBox(error, 'أهداف المادة'); return; }
  if(!data.ok){ app.innerHTML = errBox({ message: data.error }, 'أهداف المادة'); return; }
  T = data;
  render();
}

/* ── النطاق: الصفوفُ والدروسُ من `178` ───────────────────── */

/* «صف» أم «مستوى» — كما يسمّيها اختيارُ المقرّرات في `editor.js`. */
const rung = () => {
  const sc = (S.tree?.scales || []).find(x => String(x.id) === String(T.scale));
  return sc?.kind === 'proficiency' ? 'مستوى' : 'صف';
};

const lessonOf = id => (T.lessons || []).find(l => String(l.id) === String(id));
const courseOf = id => (T.courses || []).find(c => String(c.id) === String(id));

/* مفتاحُ الصفّ مستواه: مقرّران في صفٍّ واحد (مساران) صفٌّ واحد،
   ومقرّرٌ بلا مستوى مفتاحُه 'x'. */
const gKey = c => c ? (c.level_id == null ? 'x' : String(c.level_id)) : '';
const gOf  = lessonId => gKey(courseOf(lessonOf(lessonId)?.course_id));

function grades(){
  const out = [];
  for(const c of T.courses || []){
    const k = gKey(c);
    if(!out.some(g => g.k === k)) out.push({ k, name: c.level || `بلا ${rung()}` });
  }
  return out;
}

/* الدروسُ التي تُحسب فيها الأعداد — null: بلا تصفية، فالأعدادُ أعدادُ الفهرس */
function scope(){
  if(flt.l) return new Set([String(flt.l)]);
  if(flt.g) return new Set((T.lessons || [])
    .filter(l => gKey(courseOf(l.course_id)) === flt.g).map(l => String(l.id)));
  return null;
}

/* ⚠️ وبلا تصفيةٍ يبقى العددان القديمان بحرفهما (`lessons` · `questions`) —
   فالشاشةُ بلا اختيارٍ هي ما كانت. والفرقُ بينهما وبين المجموع في النطاق
   روابطُ دروسٍ مؤرشفة، **وصفرٌ منها اليوم** (قِيس عند `178`). */
const lesN = (o, F) => F ? (o.lesson_ids || []).filter(id => F.has(String(id))).length
                         : o.lessons;
const qN   = (o, F) => F ? Object.entries(o.q_by_lesson || {})
                             .reduce((s, [l, n]) => s + (F.has(l) ? n : 0), 0)
                         : o.questions;
const inScope = (o, F) => !F || lesN(o, F) > 0;

/* 🆕 b180 · العددُ بأرقامه دائماً، والمعدودُ من `NW()`: «٤ دروس» لا «٤ درس»
   (عطلُ العدد والمعدود · مهارة الهوية اللغوية §١١)، والتصفيةُ تجعل الأعدادَ
   الصغيرة هي الغالبة. ولا `N()` هنا: تُسقط الرقمَ في الواحد والاثنين، فعدّادٌ
   يُمسح بالعين يصير «درس، ٠ سؤال» — تُقرأ «درس» وسماً لا عدداً. */
const cnt = (n, ...forms) => `${AR(n)} ${NW(n, ...forms)}`;

/* ── العدّ: ما يُراجَع به الفهرس ───────────────────────────── */
function tally(F){
  const hs = T.headings || [];
  const items = hs.flatMap(h => (h.items || []).filter(o => inScope(o, F)));
  return {
    heads:   F ? hs.filter(h => (h.items || []).some(o => inScope(o, F))).length : hs.length,
    items:   items.length,
    noQ:     items.filter(o => !qN(o, F)).length,
    noFix:   items.filter(o => !o.remedy_item_id).length,
    noLes:   items.filter(o => !lesN(o, F)).length,
    thin:    hs.filter(h => (h.items || []).length < 2).length,
    noStr:   hs.filter(h => !h.strand_id).length
  };
}

function itemCard(o, F){
  const nl = lesN(o, F), nq = qN(o, F);
  const flags = [];
  if(!nq) flags.push('لا سؤالَ يقيسه');
  if(!nl) flags.push('لا يستهدفه درس');
  /* 🆕 b180 · وفي الدرس الواحد يسقط عددُ الدروس — واحدٌ دائماً. */
  const nums = flt.l ? cnt(nq,'سؤال','سؤالان','أسئلة','سؤالاً')
    : joinList([cnt(nl,'درس','درسان','دروس','درساً'), cnt(nq,'سؤال','سؤالان','أسئلة','سؤالاً')]);
  return `<details class="ob-i" data-q="${esc((o.code + ' ' + o.name).toLowerCase())}">
    <summary>
      <span class="ob-code">${esc(o.code)}</span>
      <span class="ob-nm" dir="auto">${esc(o.name)}</span>
      <span class="ob-n">${nums}</span>
      ${o.remedy_item_id ? '<span class="ob-ok">علاجٌ موصول</span>'
                         : '<span class="ob-wn">بلا علاجٍ موصول</span>'}
      ${flags.length ? `<span class="ob-wn">${joinList(flags)}</span>` : ''}
    </summary>
    <div class="ob-b">
      <div class="ob-f"><span class="k">دليلُ القياس</span>
        <div class="v" dir="auto">${o.evidence ? esc(o.evidence)
          : '<i style="opacity:.6">لم يُكتب — وبندٌ لا يُوصَف له سؤالٌ بندٌ فضفاض</i>'}</div></div>
      <div class="ob-f rx"><span class="k">العلاجُ الموصوف</span>
        <div class="v" dir="auto">${o.remedy_note ? esc(o.remedy_note)
          : '<i style="opacity:.6">لم يُكتب</i>'}</div></div>
      ${o.remedy_item_id ? `<div class="ob-f"><span class="k">العنصرُ الموصول</span>
        <div class="v" dir="auto">${esc(o.remedy_item_title || ('#' + o.remedy_item_id))}</div></div>` : ''}
      <div class="nav" style="margin-top:12px">
        <button class="btn ghost" data-ei="${o.id}">تحرير البند</button>
      </div>
    </div>
  </details>`;
}

/* 🔴 النموذجُ أسفل الصفحة، والصفحةُ هنا ستّةُ آلاف بكسل. و`scrollTop()`
   المنسوخةُ من شاشة الفروع (سبعةُ صفوف) تُمرّر إلى **أعلى** الصفحة — فيمتلئ
   النموذجُ بالبيانات ولا يراه أحد، ويبدو الزرُّ معطَّلاً وهو يعمل.
   ⇒ يُمرَّر إلى النموذج لا إلى الأعلى، و`auto` لا `smooth`: قفزةُ ستّة آلاف
     بكسلٍ بالانزلاق السلس تُضيّع الموضع بدل أن تدلّ عليه. */
function focusForm(){
  const card = document.getElementById('sv')?.closest('.card');
  if(card) card.scrollIntoView({ behavior: 'auto', block: 'center' });
  const nm = document.getElementById('nm');
  if(nm) nm.focus({ preventScroll: true });
}

function headBlock(h, F){
  const all = h.items || [];
  const its = all.filter(o => inScope(o, F));
  const n = all.length;
  /* 🆕 b180 · وفي النطاق «٢ / ٥ بنود»: العيبُ ④ (عنوانٌ تحته بندٌ واحد) صفةُ
     الفهرس لا النطاق، فالعددُ الكلّيُّ يبقى بجوار الظاهر ولا يُستبدل به. */
  return `<div class="ob-g" data-q="${esc((h.code + ' ' + h.name).toLowerCase())}">
    <div class="ob-h">
      <div style="flex:1;min-width:0">
        <div class="ed-t" dir="auto">${esc(h.name)}</div>
        <div class="ed-m">
          <span class="chip">${esc(h.code)}</span>
          <span class="chip${n < 2 ? ' g' : ''}">${F
            ? `${AR(its.length)} / ${cnt(n,'بند','بندان','بنود','بنداً')}`
            : N(n,'بند','بندان','بنود','بنداً')}</span>
          ${h.strand_code ? `<span class="chip">🌿 ${esc(h.strand_name)}</span>`
                          : '<span class="chip g">بلا فرع</span>'}
        </div>
      </div>
      <button class="btn ghost" data-eh="${h.id}">تحرير</button>
      <button class="btn ghost" data-ni="${h.id}">＋ بند</button>
    </div>
    ${its.length ? its.map(o => itemCard(o, F)).join('')
        : '<div class="ed-empty">لا بنودَ تحته — وعنوانٌ بلا بندٍ لا يُقاس</div>'}
  </div>`;
}

/* 🆕 b180 · عنوانُ الدرس في `<option>` معزولٌ بـFSI…PDI. فالقائمةُ `rtl`،
   وعنوانٌ إنجليزيٌّ ينتهي بمحايدٍ («…Is It?») تُرحَّل علامتُه إلى صدره —
   العطلُ الذي سدّه `dir="auto"` في قائمة الدروس (b172). و`dir` على `<option>`
   لا تحكم القائمةَ المنسدلة في كلّ متصفّح، والعازلُ محرفٌ يحمله النصُّ نفسُه. */
const iso = s => '⁨' + String(s ?? '') + '⁩';

function filterBar(F){
  const ls = T.lessons || [];
  if(!ls.length) return '';
  const gs = grades(), r = rung();
  const inG = flt.g ? ls.filter(l => gKey(courseOf(l.course_id)) === flt.g) : ls;

  /* التجميعُ بالوحدة — والدروسُ مرتّبةٌ في القاعدة بترتيب شاشة المقرّر (178)،
     فالمجموعةُ دروسٌ متتالية. ودروسٌ من أكثرَ من مقرّرٍ ⇒ صفُّها في رأسها. */
  const many = new Set(inG.map(l => l.course_id)).size > 1;
  const groups = [];
  for(const l of inG){
    const key = l.course_id + '|' + (l.unit || '');
    let g = groups[groups.length - 1];
    if(!g || g.key !== key){
      const c = courseOf(l.course_id);
      const unit = l.unit || 'دروس بلا وحدة';
      groups.push(g = { key, ls: [], label: many
        ? joinList([joinList([c?.level || `بلا ${r}`, c?.path].filter(Boolean)), unit]) : unit });
    }
    g.ls.push(l);
  }

  /* 🎓 والدرسُ الذي لا يستهدف هدفاً يُعلَّم في القائمة نفسِها — كـ«⚠︎ بلا علاج»
     في منتقي هدف السؤال (`editor_quiz.js`): يُرى قبل أن يُختار فيُفتح فارغاً. */
  const used = new Set((T.headings || []).flatMap(h =>
    (h.items || []).flatMap(o => (o.lesson_ids || []).map(String))));

  /* كلُّ تسميةٍ وقائمتُها في وعاءٍ واحد (`ob-fp`): على الشاشة الضيّقة ينكسر
     الوعاءُ كلُّه إلى السطر التالي — وبلاه بقيت «الدرس» آخرَ السطر الأوّل
     ونزلت قائمتُها وحدَها (قِيس على ٣٧٥px). */
  return `<div class="ed-bar ob-flt">
    ${gs.length > 1 ? `<span class="ob-fp">
      <label class="fl" style="margin:0" for="fg">ال${r}</label>
      <select id="fg">
        <option value="">${r === 'صف' ? 'كلّ الصفوف' : 'كلّ المستويات'}</option>
        ${gs.map(g => `<option value="${escA(g.k)}"${g.k === flt.g ? ' selected' : ''}>${
          esc(g.name)}</option>`).join('')}
      </select></span>` : ''}
    <span class="ob-fp wide">
      <label class="fl" style="margin:0" for="fl">الدرس</label>
      <select id="fl">
        <option value="">كلّ الدروس</option>
        ${groups.map(g => `<optgroup label="${escA(iso(g.label))}">${g.ls.map(l =>
          `<option value="${l.id}"${String(l.id) === String(flt.l) ? ' selected' : ''}>${
            esc(iso(l.title))}${used.has(String(l.id)) ? '' : ' ⚠︎ بلا أهداف'}</option>`).join('')}
        </optgroup>`).join('')}
      </select></span>
    ${F ? `<span class="small">${flt.l ? 'الأعداد أدناه لهذا الدرس وحده'
                                       : `الأعداد أدناه لهذا ال${r} وحده`}</span>` : ''}
  </div>`;
}

function render(){
  const hs = T.headings || [];
  const leaves = (T.strands || []).filter(s => s.leaf);

  app.innerHTML = `
    <div class="crumb" id="bk">→ دروس المقرَّر</div>

    <div class="ed-hint">🎯 الهدف يقول <b>في ماذا</b> يعمل الطالب، وكود التشخيص يقول
      <b>كيف</b> أخطأ. وبينهما السلسلة: <b>سؤال ← هدفُه ← علاجُه ← الطالب</b>.</div>

    <div id="obl"></div>

    ${formCard(leaves, hs)}`;

  document.getElementById("bk").onclick = () => openCourse(ctx.course);
  wire(leaves, hs);
  list();
}

/* 🆕 b180 · القائمةُ وحدها: شريطُ التصفية والبطاقاتُ والبنود. وتغييرُ
   التصفية يعيد بناءها هي — **والنموذجُ أسفلَ الصفحة لا يُمَسّ**: فيه ما
   كتبه المؤلّفُ ولم يحفظه، وإعادةُ بنائه تمحوه بلا شكوى. */
function list(){
  /* اختيارٌ سقط من القاعدة بعد الحفظ (درسٌ أُرشف) ⇒ يُرفع ولا يبقى خفيّاً:
     قائمةٌ تقول «كلّ الدروس» وتصفيةٌ تعمل تحتها كذبٌ صامت. */
  if(flt.l && !lessonOf(flt.l)) flt.l = '';
  if(flt.g && !grades().some(g => g.k === flt.g)) flt.g = '';

  const F = scope();
  const t = tally(F);
  const hs = T.headings || [];
  const shown = hs.filter(h => !F || (h.items || []).some(o => inScope(o, F)));
  const r = rung();

  /* التجميعُ بالفرع: المراجعةُ تمشي على محاور المادة لا على ترتيب الأكواد */
  const byStrand = [];
  for(const h of shown){
    const k = h.strand_code || '—';
    let g = byStrand.find(x => x.k === k);
    if(!g){ byStrand.push(g = { k, name: h.strand_name || 'بلا فرع', hs: [] }); }
    g.hs.push(h);
  }

  document.getElementById("obl").innerHTML = `
    ${filterBar(F)}

    <div class="ob-tiles">
      <div class="ob-t"><div class="n">${AR(t.heads)}</div>
        <div class="l">${NW(t.heads,'عنوان عريض','عنوانان عريضان','عناوين عريضة','عنواناً عريضاً')}</div></div>
      <div class="ob-t"><div class="n">${AR(t.items)}</div>
        <div class="l">${NW(t.items,'بند','بندان','بنود','بنداً')}</div></div>
      <div class="ob-t${t.noQ ? ' flag' : ''}"><div class="n">${AR(t.noQ)}</div>
        <div class="l">بلا سؤالٍ يقيسه</div></div>
      <div class="ob-t${t.noFix ? ' flag' : ''}"><div class="n">${AR(t.noFix)}</div>
        <div class="l">بلا علاجٍ موصول</div></div>
      ${/* وفي النطاق تسقط: بنودُه هي التي تستهدفها دروسُه، فعدُّها صفرٌ دائماً
            — وبطاقةٌ لا تقول إلا صفراً ضجيج. */''}
      ${F ? '' : `<div class="ob-t${t.noLes ? ' flag' : ''}"><div class="n">${AR(t.noLes)}</div>
        <div class="l">لا يستهدفه درس</div></div>`}
    </div>

    ${t.noFix ? `<div class="ed-hint" style="opacity:.85">
      <b>العلاجُ الموصوف غيرُ العلاج الموصول.</b> الأوّل وصفُ المؤلّف لما ينبغي أن
      يكون، والثاني عنصرُ تعليمٍ قائمٌ يُفتح للطالب — ويُوصَل من شاشة المكوّنات.
      وحتى يُوصَل، يقول التشخيصُ أين أخطأ ولا يقول إلى أين يذهب.</div>` : ''}

    ${(T.orphans || []).length ? `<div class="warnbox">
      ${N(T.orphans.length,'بندٌ','بندان','بنود','بنداً')} بلا عنوانٍ عريض:
      ${T.orphans.map(o => esc(o.code)).join('، ')} — يُحرَّر فيُنسَب إلى عنوان.</div>` : ''}

    ${shown.length ? `<div class="ob-find">
      <input type="search" id="q" placeholder="ابحث في الأكواد والأسماء…">
      <span class="small" id="qn"></span>
    </div>` : ''}

    ${shown.length ? byStrand.map(g => `
      <section class="ob-s">
      ${/* 🆕 b172 · وترويسةُ الفرع كترويسة الوحدة في `editor.js`: الحَكَمُ
            أوّلُ حرفٍ من الاسم، والكودُ بعده شارةٌ لا تَحكم. وثمانيةُ فروعٍ
            من أربعةٍ وثلاثين لاتينيّةُ الاسم (٢٢ أكتوبر). */''}
      <div class="grp" dir="auto">${esc(g.name)} ${g.k !== '—'
        ? `<span class="chip">${esc(g.k)}</span>` : ''}
        <span class="chip">${N(g.hs.length,'عنوان','عنوانان','عناوين','عنواناً')}</span></div>
      ${g.hs.map(h => headBlock(h, F)).join('')}</section>`).join('')
      : hs.length
      ? `<div class="ed-empty">${flt.l ? 'لا أهداف لهذا الدرس بعد'
                                       : `لا أهداف لدروس هذا ال${r} بعد`}،
          وتُوزَّع على الدروس من «استيراد فهرس الأهداف».</div>`
      : `<div class="ed-empty">لا أهدافَ بعد — تُستورد من فهرس المادة أو تُضاف هنا</div>`}`;

  wireList(hs);
}

function formCard(leaves, hs){
  const k    = edit ? edit.kind : add;
  const r    = edit ? edit.row : null;
  const isH  = k === 'head';

  return `<div class="card" style="margin-top:18px">
    <div class="grp" style="margin-top:0">${
      edit ? (isH ? 'تحرير عنوانٍ عريض' : 'تحرير بند')
           : (isH ? 'عنوانٌ عريضٌ جديد' : 'بندٌ جديد')}</div>

    ${edit ? '' : `<div class="nav" style="margin-bottom:14px">
      <button class="btn ${add==='item'?'primary':'ghost'}" id="kItem">بند</button>
      <button class="btn ${add==='head'?'primary':'ghost'}" id="kHead">عنوان عريض</button>
    </div>`}

    <label class="fl">الاسم *</label>
    <input type="text" id="nm" value="${esc(r?.name || '')}" dir="auto"
           placeholder="${isH ? 'Reading comprehension strategies'
                              : 'يستخرج الفكرة الرئيسة من فقرةٍ وصفية'}">
    <p class="small">${isH
      ? 'العنوانُ فهرسٌ لا يُقاس: لا سؤالَ له ولا علاج.'
      : 'جملةٌ تقول ماذا يستطيع الطالب أن يفعل، بفعلٍ يُقاس: يستخرج · يصوغ · يميّز · يستنتج. ولا «يفهم» و«يعرف» — لا تُقاسان ولا تُعالَجان.'}</p>

    <label class="fl" style="margin-top:14px">الكود *</label>
    <input type="text" id="cd" value="${esc(r?.code || '')}" dir="ltr"
           placeholder="${isH ? 'READ.STRAT' : 'R.MAIN'}" style="max-width:240px">
    <p class="small">لاتينيّةٌ وأرقام و <code>_ . -</code> — والكودُ هويّةٌ تثبت وإن تغيّر
      الاسم${r ? '، <b>ولا تُغيَّره لهدفٍ قائم</b>: تغييرُه يقطع أثرَ طالبٍ ممتدّاً' : ''}.
      ولا صفَّ دراسيّاً فيه: الهدفُ يعبر الصفوف.</p>

    ${isH ? `
      <label class="fl" style="margin-top:14px">الفرع</label>
      ${leaves.length ? `<select id="st">
          <option value="">— بلا فرع —</option>
          ${leaves.map(s => `<option value="${s.id}"${
            String(r?.strand_id) === String(s.id) ? ' selected' : ''
          }>${esc(s.name)} · ${esc(s.code)}</option>`).join('')}
        </select>`
        : '<div class="chip">لا فروعَ لهذه المادة — ولا تُلزَم</div>'}
      <p class="small">منه يُشتقّ محورُ أسئلة بنوده حين لا يُوسَم المكوّنُ ولا الدرس —
        وهو الحال في دروس اللغات التي تجمع مهاراتٍ قصداً. ويُنسَب إلى ورقةٍ لا حاوية.</p>
    ` : `
      <label class="fl" style="margin-top:14px">تحت أيّ عنوان *</label>
      <select id="pa">
        <option value="">— اختر العنوان —</option>
        ${hs.map(h => `<option value="${h.id}"${
          String(r?.parent_id) === String(h.id) ? ' selected' : ''
        }>${esc(h.code)} · ${esc(h.name)}</option>`).join('')}
      </select>

      <label class="fl" style="margin-top:14px">دليلُ القياس</label>
      <textarea id="ev" rows="3" dir="auto"
        placeholder="صِف السؤال الذي يقيس هذا البند">${esc(r?.evidence || '')}</textarea>
      <p class="small">حارسُ الدقّة: بندٌ لا تستطيع أن تصف سؤالاً يقيسه — فضفاضٌ فاقسمه.</p>

      <label class="fl" style="margin-top:14px">العلاجُ الموصوف</label>
      <textarea id="rx" rows="3" dir="auto"
        placeholder="ما الذي يُعطى للطالب إذا أخطأ هنا؟">${esc(r?.remedy_note || '')}</textarea>
      <p class="small">وصفٌ يقرؤه من يبني عنصرَ العلاج. ولا يُفتح للطالب — المفتوحُ له
        هو العنصرُ الموصول من شاشة المكوّنات.</p>
    `}

    <div class="nav" style="margin-top:14px">
      <button class="btn primary" id="sv">${edit ? 'حفظ' : '＋ إضافة'}</button>
      ${edit ? '<button class="btn ghost" id="ca">إلغاء</button>' : ''}
    </div>
  </div>`;
}

function wire(leaves, hs){
  const $ = id => document.getElementById(id);
  $("sv").onclick = save;
  if($("ca")) $("ca").onclick = () => { edit = null; render(); };
  if($("kItem")) $("kItem").onclick = () => { add = 'item'; render(); focusForm(); };
  if($("kHead")) $("kHead").onclick = () => { add = 'head'; render(); focusForm(); };
}

function wireList(hs){
  const $ = id => document.getElementById(id);

  app.querySelectorAll("[data-eh]").forEach(el => el.onclick = () => {
    const h = hs.find(x => String(x.id) === el.dataset.eh);
    if(h){ edit = { kind: 'head', row: h }; render(); focusForm(); }
  });
  app.querySelectorAll("[data-ei]").forEach(el => el.onclick = () => {
    for(const h of hs){
      const o = (h.items || []).find(x => String(x.id) === el.dataset.ei);
      if(o){ edit = { kind: 'item', row: { ...o, parent_id: h.id } }; render(); focusForm(); return; }
    }
  });
  app.querySelectorAll("[data-ni]").forEach(el => el.onclick = () => {
    edit = null; add = 'item'; render();
    const pa = document.getElementById("pa");
    if(pa) pa.value = el.dataset.ni;
    focusForm();
  });

  /* 🆕 b180 · وتغييرُ الصفّ يُسقط الدرس: من وسّع إلى الصفوف كلّها أو انتقل
     إلى صفٍّ آخر لا يريد درساً من الأوّل يحكم ما يراه. واختيارُ درسٍ يضبط
     صفَّه — فالقائمتان تقولان الشيءَ نفسَه، وقائمةُ الدروس تضيق إلى صفّه.
     والتركيزُ يعود إلى القائمة نفسِها بعد البناء: من يتنقّل بلوحة المفاتيح
     لا يُرمى إلى أوّل الصفحة. */
  const relist = id => { list(); document.getElementById(id)?.focus(); };
  const fg = $("fg"), fl = $("fl");
  if(fg) fg.onchange = () => { flt.g = fg.value; flt.l = ''; relist("fg"); };
  if(fl) fl.onchange = () => {
    flt.l = fl.value;
    if(flt.l && fg) flt.g = gOf(flt.l);
    relist("fl");
  };

  /* البحثُ يُخفي ولا يُعيد البناء: الطيُّ المفتوحُ يبقى مفتوحاً، والنموذجُ
     أسفلَ الصفحة لا يُمَسّ. ومطابقةُ العنوان تُظهر بنودَه كلَّها — فالعنوانُ
     يُراجَع بما تحته لا وحدَه. 🆕 b180 · ويعمل داخل التصفية، ونصُّه يبقى. */
  const q = $("q");
  if(q){ q.value = qs; q.oninput = () => { qs = q.value; findIn(); }; }
  findIn();
}

function findIn(){
  const s = qs.trim().toLowerCase();
  let shown = 0;
  app.querySelectorAll(".ob-g").forEach(g => {
    const hit = !s || (g.dataset.q || '').includes(s);
    let any = hit;
    g.querySelectorAll(".ob-i").forEach(i => {
      const ok = hit || (i.dataset.q || '').includes(s);
      i.hidden = !ok;
      if(ok && !hit) any = true;
      if(ok) shown++;
    });
    g.hidden = !any;
  });
  app.querySelectorAll(".ob-s").forEach(sec =>
    sec.hidden = ![...sec.querySelectorAll(".ob-g")].some(g => !g.hidden));
  const qn = document.getElementById("qn");
  if(qn) qn.textContent = s ? cnt(shown,'بند','بندان','بنود','بنداً') : '';
}

async function save(){
  const v = id => (document.getElementById(id)?.value || '').trim();
  const isH = edit ? edit.kind === 'head' : add === 'head';
  const name = v("nm"), code = v("cd");

  if(!name || !code){ toast("الاسم والكود مطلوبان"); return; }
  if(!isH && !v("pa")){ toast("البند يُنسَب إلى عنوانٍ عريض"); return; }

  const { data, error } = await api.saveObjective({
    id:      edit?.row?.id ?? null,
    subject: ctx.subject.id,
    code, name,
    parent:  isH ? null : Number(v("pa")),
    /* 🔴 وصلُ عنصر العلاج يُعاد كما هو: `save_objective` تكتبه صريحاً،
       فإسقاطُه يمحو ما ربطه إنسانٌ في شاشة المكوّنات. */
    remedial: edit?.row?.remedy_item_id ?? null,
    scale:   T.scale ?? null,
    strand:  isH ? (v("st") ? Number(v("st")) : null) : null,
    evidence:    isH ? null : (v("ev") || null),
    remedy_note: isH ? null : (v("rx") || null)
  });
  if(error){ toast(error.message); return; }
  if(!data.ok){ toast(data.error); return; }

  toast(edit ? "حُفظ" : "أُضيف");
  if(data.warn) toast(data.warn);
  edit = null;
  await reload();
}
