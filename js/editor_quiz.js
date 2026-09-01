/* ══════════════════════════════════════════════════════════
   بيان — editor_quiz.js  ③  الأسئلة والتشخيص

   ثلاثة أعمدة:  شريط الأسئلة │ التحرير-المعاينة │ الجاهزية

   🔑 المبدأ الحاكم: المشتّت وتشخيصه فكرة واحدة ⇒ صفٌّ واحد.
      لا لوحة جانبية ولا نافذة منبثقة للأكواد — تكتب الخيار
      وأنت تفكّر لماذا سيقع فيه الطالب، فتختار الكود في اللحظة
      نفسها. ولو أُخفي في درج لصار واجباً إدارياً يُملأ آخر الوقت.
      ⚠️ ويُستثنى صندوق الاستيراد: من يكتب JSON خارج المنصّة لا يرى
         القائمة المنسدلة، فيخترع كوداً ثم يُفاجأ بالرفض. فالقائمة
         هناك ليست درجاً بل إرشادٌ عند نقطة القرار.

   🎨 والوسط يستعمل فئات شاشة الطالب نفسها (.qtext .opts .opt .key)
      فيرى المؤلّف ما سيراه الطالب — لا محاكاةً له. وأي تغيير في
      تنسيق الاختبار ينعكس هنا تلقائياً: مصدر واحد للشكل.

   🔒 b23 — تسمية المعرّفات بنطاقها.
      كان زرّ النشر id="pb" ومربّع نصّ الفقرة id="pb" أيضاً، وهما
      يسكنان الصفحة معاً (#ready و#main). و getElementById تُرجع
      **الأول في ترتيب المستند** — و#main يسبق #ready في الشبكة —
      فيُركَّب معالج النشر على مربّع النصّ. نائمٌ حتى b21، إذ صارت
      setFilter تنادي readiness. ⇒ بادئة rd* وبحثٌ مقيَّد بالصندوق.

   ⚖️ وحكمُ الخانة صار مصدراً واحداً: verdict() تخدم الشريط
      و variantBar و pairForm و compareVariant. وكانت مكتوبةً
      مرّتين ناقصتين، تمنحان ✅ لكل خانةٍ مقالية — لأن fp() تُرجع []
      فتصير المقارنة '' !== '' ⇒ false. **صدقٌ فارغ.**
   ══════════════════════════════════════════════════════════ */
import * as api from './api.js';
import { S } from './state.js';
import { app, head, toast, esc, fmt, AR, errBox, nav, setWide, scrollTop, L,
                  pgMedia, srcOf, SAFE_HOSTS, optLabel, dirOf } from './ui.js';
import { attachUpload } from './upload.js';
import { openCourse } from './editor.js';
import { questionText, questionBody, KIND_LABEL, gapCount } from './render_q.js';

let Z    = null;   // الاختبار المحمَّل
let cur  = 0;      // فهرس السؤال المعروض
let ctx  = null;   // { course, lesson }
let dirty = false; // تغييرات غير محفوظة في السؤال الحالي


/* ═══════════ الدخول ═══════════ */

export async function openQuiz(course, lesson){
  ctx = { course, lesson };
  nav('editor'); setWide(true);
  head("اختبار الدرس", lesson.title);
  app.innerHTML = `<div class="status">جارٍ التحميل…</div>`;

  if(!lesson.quiz_id) return offerCreate();

  const { data, error } = await api.quizForEdit(lesson.quiz_id);
  if(error){ app.innerHTML = errBox(error, 'تحميل الاختبار'); return; }
  if(!data.ok){ app.innerHTML = errBox({ message: data.error }, 'تحميل الاختبار'); return; }

  Z = data; cur = 0; dirty = false;
  render(true);                 // الدخول من شاشةٍ أخرى ⇒ الوجهة الأعلى
}

/* درس بلا اختبار — لا يكتمل عند الطالب أبداً */
function offerCreate(){
  app.innerHTML = `
    <div class="crumb" id="bk">← دروس المقرَّر</div>
    <div class="card" style="text-align:center;padding:32px">
      <div style="font-size:2.2rem;margin-bottom:12px">📝</div>
      <div class="rev-q">هذا الدرس بلا اختبار</div>
      <div class="line" style="margin-bottom:18px">
        الدرس لا يكتمل عند الطالب إلا باختبار مُدرَج — وبدونه تتوقّف سلسلة الدروس بعده.</div>
      <div class="nav"><button class="btn primary" id="mk">إنشاء اختبار الدرس</button></div>
    </div>`;
  document.getElementById("bk").onclick = () => openCourse(ctx.course);
  document.getElementById("mk").onclick = createQuiz;
}

async function createQuiz(){
  const { course, lesson } = ctx;
  app.innerHTML = `<div class="status">جارٍ الإنشاء…</div>`;

  const q = await api.saveQuiz({ course: course.id, title: lesson.title, official: true });
  if(q.error || !q.data.ok){ toast(q.error?.message || q.data.error); offerCreate(); return; }

  // العنصر المُدرَج هو ما يربط الاختبار بالدرس ويجعله شرط الانتقال
  const it = await api.saveItem({
    lesson: lesson.id, kind: 'quiz', title: 'الاختبار التشخيصي',
    quiz: q.data.id, official: true, isGraded: true, required: true, position: 99 });
  if(it.error || !it.data.ok){ toast(it.error?.message || it.data.error); return; }

  toast("أُنشئ الاختبار");
  ctx.lesson = { ...lesson, quiz_id: q.data.id, has_quiz: true };
  openQuiz(course, ctx.lesson);
}


/* ═══════════ الهيكل ═══════════ */

function render(atTop){
  const qs = Z.questions || [];
  const q  = qs[cur] || null;

  app.innerHTML = `
    <div class="crumb" id="bk">← ${esc(ctx.lesson.title)}</div>
    <div class="eq">
      <aside class="eq-list">${sidebar()}</aside>
      <section class="eq-main" id="main">${q ? qCard(q) : emptyCard()}</section>
      <aside class="eq-side" id="ready"></aside>
    </div>`;

  document.getElementById("bk").onclick = leave;
  wireList();
  if(q) wire(q);
  readiness();
  atTop ? scrollTop() : focusMain();
}

const emptyCard = () => `<div class="card" style="text-align:center;padding:34px">
  <div style="font-size:2rem;margin-bottom:10px">◉</div>
  <div class="rev-q">لا أسئلة بعد</div>
  <div class="line">ابدأ بستّة أسئلة اختيار من متعدد — وهو الحدّ الذي تبقى معه عتبة ٦٥٪ ذات معنى.</div>
  <div class="nav" style="justify-content:center;margin-top:16px">
    <button class="btn primary" id="imp0">⇪ استيراد اختبار</button>
  </div>
  <p class="hint">أو أضِف الأسئلة واحداً واحداً من الجانب</p>
</div>`;

function go(i){
  if(dirty && !confirm("تغييرات غير محفوظة في هذا السؤال — أتتركها؟")) return;
  cur = i; dirty = false; render();
}

function leave(){
  if(dirty && !confirm("تغييرات غير محفوظة — أتتركها؟")) return;
  openCourse(ctx.course);
}


/* ═══════════ بطاقة السؤال — تحرير ومعاينة معاً ═══════════ */

function qCard(q){
  const locked = q.answered > 0;
  const multi  = q.kind === 'msq';
  const dx = (S.tree?.dx) || [];
  const fams = [...new Set(dx.map(d => d.family || 'عام'))];

  const dxSelect = (val, i) => `
    <select class="eq-dx ${val?'':'miss'}" data-o="${i}" ${locked?'disabled':''}>
      <option value="">— اختر التشخيص —</option>
      ${fams.map(f => `<optgroup label="${esc(f)}">
        ${dx.filter(d => (d.family||'عام')===f).map(d =>
          `<option value="${esc(d.code)}" ${d.code===val?'selected':''}>${esc(d.name)}</option>`).join("")}
      </optgroup>`).join("")}
    </select>`;

  const opt = (o, i) => `
    <div class="eq-opt ${o.correct?'ok':''}" dir="${dirOf(o.body)}">
      <span class="key">${esc(optLabel(o,i))}</span>
      <input class="eq-ob" data-o="${i}" dir="auto" value="${esc(o.body||'')}"
             placeholder="نصّ الخيار" ${locked?'disabled':''}>
      <label class="eq-c" title="${multi?'من الإجابات الصحيحة':'الإجابة الصحيحة'}">
        <input type="${multi?'checkbox':'radio'}" name="corr" data-o="${i}"
               ${o.correct?'checked':''} ${locked?'disabled':''}>
        صحيحة
      </label>
      ${o.correct ? '<span class="eq-sp"></span>' : dxSelect(o.dx, i)}
      ${locked ? '' : `<button class="eq-x" data-rm="${i}" title="حذف الخيار">✕</button>`}
    </div>`;

  return `
    ${locked ? `<div class="warnbox">أُجيب عن هذا السؤال ${AR(q.answered)} مرة —
      التعديل يكسر ربط المحاولات. لتغييره: انسخ الاختبار بكود جديد.</div>` : ''}

    ${sectionBar(q, locked)}
    ${passageBar(q, locked)}
    ${variantBar(q, locked)}

    <div class="card">
            <div class="qnum">سؤال ${AR(cur+1)} · ${KIND_LABEL[q.kind]||'سؤال'}
        ${locked ? '<span class="badge lock">مقفل</span>' : ''}</div>

      ${mediaRow(q, locked)}

      <textarea id="qb" class="eq-qt" dir="auto" placeholder="نصّ السؤال…"
        ${locked?'disabled':''}>${esc(q.body||'')}</textarea>

      ${(q.kind === 'mcq' || multi) ? `
        ${multi ? `<div class="eq-hint" style="display:block;margin-bottom:9px;line-height:1.85">
          صحيحان فأكثر · وخاطئ واحد على الأقل · ولا يُعلَن العدد للطالب.
          والكود للمشتّت وحده — والإغفال يُشخَّص من نمط الإجابة لا من وسمٍ تكتبه.</div>` : ''}
        <div class="opts eq-opts">${(q.options||[]).map(opt).join("")}</div>
        ${locked ? '' : '<button class="btn ghost eq-addo" id="addo">＋ خيار</button>'}

        <label class="fl" style="margin-top:20px">شرح الخطأ — يراه الطالب بعد التسليم *</label>
        <textarea id="qe" placeholder="لماذا الإجابة الصحيحة صحيحة، وأين يزلّ الفهم؟"
          ${locked?'disabled':''}>${esc(q.explanation||'')}</textarea>
             ` : q.kind === 'gap' ? `

        <div class="gaprow">
          <div class="gaplive" id="gaplive">${
            gapCount(q.body||'') ? questionText(q, [], true)
                                 : '<span class="eq-hint">…هكذا يراه الطالب</span>'}</div>
        </div>
        <div id="gapbox">${gapFields(q, locked)}</div>

        <label class="fl" style="margin-top:20px">شرح الخطأ — يراه الطالب بعد التسليم *</label>
        <textarea id="qe" placeholder="لماذا الإجابة الصحيحة صحيحة، وأين يزلّ الفهم؟"
          ${locked?'disabled':''}>${esc(q.explanation||'')}</textarea>
      ` : `
        <label class="fl" style="margin-top:16px">الإجابة النموذجية — يقارن بها الطالب نفسه *</label>
        <textarea id="qm" style="min-height:130px"
          ${locked?'disabled':''}>${esc(q.model||'')}</textarea>
      `}
    </div>

    <div class="nav">
      ${locked ? '' : `<button class="btn primary" id="sq">حفظ السؤال</button>`}
      <button class="btn ghost" id="dq">⧉ تكرار</button>
      ${locked ? '' : `<button class="btn ghost eq-del" id="xq">🗑 حذف</button>`}
    </div>`;
}


/* ═══════════ الحاويات: القسم والنصّ المشترك ═══════════
   كلاهما يعلو **مجموعة** أسئلة لا سؤالاً واحداً. فالتحرير يقع
   على مدى: هذا السؤال وما بعده حتى تتغيّر القيمة. */

function range(i, key){
  const v = Z.questions[i]?.[key] ?? null;
  const ids = [], idx = [];
  for(let j = i; j < Z.questions.length; j++){
    if((Z.questions[j][key] ?? null) !== v) break;
    idx.push(j + 1);
    if(Z.questions[j].id) ids.push(Z.questions[j].id);
  }
  return { ids, from: idx[0], to: idx[idx.length - 1], n: idx.length };
}

const span = r => r.n > 1 ? `يشمل الأسئلة ${AR(r.from)}–${AR(r.to)}`
                          : `يشمل السؤال ${AR(r.from)}`;

function sectionBar(q, locked){
  const r = range(cur, 'section');
  if(!q.section) return locked ? '' :
    `<button class="eq-bar add" id="addsec">＋ عنوان قسم يشمل هذا السؤال وما بعده</button>`;
  return `<div class="eq-bar sec">
    <span class="eq-bt" dir="auto">${esc(q.section)}</span>
    <span class="eq-bs">${span(r)}</span>
    ${locked ? '' : `<button class="it-b" id="edsec">✏️</button>
                     <button class="it-b" id="rmsec">✕</button>`}</div>`;
}

function passageBar(q, locked){
  const p = (Z.passages||[]).find(x => String(x.id) === String(q.passage_id));
  const r = range(cur, 'passage_id');
  if(!p) return locked ? '' :
    `<button class="eq-bar add" id="addpg">＋ نصّ مشترك يشمل هذا السؤال وما بعده</button>`;
  return `<div class="eq-bar pg">
    <div class="eq-brow">
      <span class="eq-bt" dir="auto">📖 ${esc(p.title || 'نصّ مشترك')}</span>
      <span class="eq-bs">${span(r)}</span>
      <button class="it-b" id="pairpg">⇄ اقرن الكتلة</button>
      ${locked ? '' : `<button class="it-b" id="edpg">✏️ تحرير</button>
                       <button class="it-b" id="rmpg">✕ فصل</button>`}
    </div>
    ${p.media ? `<div style="margin-top:9px">${pgMedia(p)}</div>` : ''}
    ${p.body ? `<div class="psg" dir="auto" style="max-height:160px;margin-top:9px">
      ${fmt((p.body||'').slice(0,700))}${(p.body||'').length>700?'…':''}</div>` : ''}
  </div>`;
}

/* ═══════════ الخانة — النسخ المكافئة ═══════════
   ⚠️ الخانة ليست مدى كالقسم والنصّ: النسخ قد تتباعد في الترتيب،
      فلا تُستعمل range() هنا بل بحثٌ بالمفتاح في كل الأسئلة.

   والبصمة تُحسب في الواجهة لا في القاعدة: quiz_for_edit تُرجع
   خيارات كل الأسئلة بأكوادها أصلاً — فالمقارنة بلا نداء. */

/* بصمة الفخاخ — نظير array_agg(distinct dx order by dx) في القاعدة.
   والشرط «يحمل كوداً» لا «ليس صحيحاً»: يصف ما نريده بذاته لا بما
   يصادف أن يساويه. النتيجة واحدة اليوم، والصياغة تصمد غداً.

   ⚠️ وتُرجع [] للمقاليّ — فلا تُقارَن بصمتان بلا التحقّق من وجود
      خيارات أصلاً، وإلا صار «لا اختلاف» و«لا شيء يُقارَن» سواءً. */
const fp = q => [...new Set((q.options || [])
    .map(o => o.dx).filter(Boolean))].sort();

const partners = q => !q.variant_key ? []
  : (Z.questions || []).filter(x => x.variant_key === q.variant_key && x.id !== q.id);

const dxName = code => ((S.tree?.dx) || []).find(d => d.code === code)?.name || code;

function variantBar(q, locked){
  /* 🔓 القفل يخصّ المحتوى لا الخانة.
     تعديل نصّ سؤالٍ أُجيب عنه يكسر ربط المحاولات، أما variant_key
     فوسمُ تجميع: لا يمسّ إجابةً سابقة، وأثره في السحب القادم وحده.
     و set_variant نفسها لا تسأل عن الإجابات — فالحظر كان في الواجهة. */
  const note = locked ? `<div class="eq-bs" style="margin-top:8px;line-height:1.7">
      🔓 الخانة تُعدَّل ولو كان السؤال مقفلاً — هي وسمُ تجميعٍ لا محتوى.</div>` : '';

  if(!q.variant_key){
    /* فعلان مختلفان لا صورتان لفعل واحد:
       الأول يبدأ من نسخة ثم يُبدَّل محتواها — للتأليف من الصفر.
       والثاني إعلانُ تكافؤٍ بين مكتوبَين — لمن يؤلّف البنود معاً. */
    return !q.id ? '' : `
      <button class="eq-bar add" id="mkvar">⇄ اصنع بديلاً مكافئاً — يبدأ نسخةً ثم تبدّل محتواها</button>
      <button class="eq-bar add" id="pairvar">⇄ اقرن بسؤالٍ قائم — أعلِن أن مكتوبَين يقيسان الشيء نفسه</button>
      ${note}`;
  }

  /* الحكم من verdict() لا من مقارنةِ بصمتين: هي وحدها التي تميّز
     «لا اختلاف» من «لا مادّة للفحص»، وتنظر إلى النصّ والقسم والنمط. */
  const ps = partners(q);
  const v  = verdict([q, ...ps]);

  const traps = p => (p.options || []).filter(o => o.dx)
    .map(o => `<span class="chip">${esc(dxName(o.dx))}</span>`).join('');

  return `<div class="eq-bar sec">
    <div class="eq-brow">
      <span class="eq-bt">⇄ خانة ${esc(q.variant_key)}</span>
      <span class="eq-bs">${AR(ps.length + 1)} نسخ في الخانة</span>
      <button class="it-b" id="cmpv">⇄ قارِن النسخ</button>
      <button class="it-b" id="addvar">＋ نسخة قائمة</button>
      <button class="it-b" id="rmvar">✕ فكّ</button>
    </div>

    ${ps.map(p => `<div class="eq-brow" style="margin-top:8px">
        <span class="eq-bs">سؤال ${AR(p.position)}</span>
        <span class="eq-bt" dir="auto" style="flex:1;min-width:0">
          ${esc((p.body || '').slice(0, 60))}</span>
        <span style="display:flex;gap:5px;flex-wrap:wrap">${traps(p)}</span>
      </div>`).join('')}

    ${v.cls === 'ok'
      ? `<div class="eq-bs" style="margin-top:8px">✅ متّسقة فيما يُفحص آلياً</div>`
      : `<div class="${v.cls === 'none' ? 'eq-bs' : 'warnbox'}" style="margin-top:10px">
          ${v.icon} ${(v.fails || []).map(f => esc(f)).join('<br>')}
          ${v.cls === 'warn' && !v.manual
            ? '<br>صحّح <b>الخيار</b> لا الكود — الكود يصف المشتّت ولا يصنعه.' : ''}
        </div>`}
    ${note}
  </div>`;
}

/* ═══════════ اقتران كتلتَي نصّ ═══════════
   وحدةُ الاقتران هنا ليست السؤال بل **الكتلة**: الطالب يقرأ الفقرة
   مرّةً ويجيب أسئلتها كلها، وآلة الانتقاء تسحب النصّ كتلةً فتأخذ
   أسئلته معاً. فاقترانُ سؤالٍ بسؤال سبعُ عملياتٍ لعملٍ واحد.

   🔑 والمزاوجة بالترتيب لا بالاختيار: أوّل أسئلة النصّ بأوّل أسئلة
      نظيره — وهو الصحيح في البنود المتوازية البناء. ودورُ المؤلّف
      أن يتحقّق ويوقّع، لا أن يختار سبع مرات.

   ⚠️ ولا يلزم فكٌّ لإضافة نصٍّ ثالث: set_variant تتبنّى المفتاح
      القائم، فيُقرن p3 بـp1 فتتّسع الخانات القائمة إلى ثلاث نسخ. */

const pgQs = pid => (Z.questions || [])
  .filter(x => x.id && String(x.passage_id) === String(pid))
  .sort((a, b) => (a.position || 0) - (b.position || 0));

const pgTitle = pid => {
  const p = (Z.passages || []).find(y => String(y.id) === String(pid));
  return p ? (p.title || 'نصّ مشترك') : '—';
};

const groupOf = x => [x.id, ...partners(x).map(p => p.id)];

function pairPassage(q){
  if(dirty && !confirm("تغييرات غير محفوظة — أتتركها؟")) return;
  const n = pgQs(q.passage_id).length;
  const others = (Z.passages || []).filter(p => String(p.id) !== String(q.passage_id));

  document.getElementById("main").innerHTML = `
    <div class="card">
      <div class="qnum">⇄ اقرن كتلة «${esc(pgTitle(q.passage_id))}» بنصٍّ آخر</div>
      <div class="line" style="margin-bottom:6px">
        تُزاوَج الأسئلة <b>بالترتيب</b>: الأول بالأول والثاني بالثاني — فتُصنع
        ${AR(n)} خانة دفعةً واحدة، ويسحب الاختبار نصّاً واحداً بأسئلته كلها.</div>
      <div class="eq-bs" style="margin-bottom:14px">
        ولإضافة نصٍّ ثالث: اقرنه بأحد المقترنَين — تتّسع الخانات ولا تحتاج فكّاً.</div>

      ${others.length ? others.map(p => {
        const m = pgQs(p.id).length;
        return `<button class="eq-bar ${m === n ? 'pg' : 'sec'}" data-pg="${p.id}"
                  style="cursor:pointer;text-align:start">
          <div class="eq-brow">
            <span class="eq-bt" dir="auto" style="flex:1;min-width:0">📖 ${esc(p.title || 'نصّ مشترك')}</span>
            <span class="eq-bs">${AR(m)} أسئلة</span>
            <span class="eq-bs">${m === n ? '✅ عددٌ مطابق'
              : '❌ العدد مختلف — الكتلتان غير متوازيتين'}</span>
          </div></button>`;
      }).join('') : `<div class="warnbox">لا نصّ مشترك آخر في هذا الاختبار.</div>`}

      <div class="nav" style="margin-top:16px">
        <button class="btn ghost" id="ppc">إلغاء</button>
      </div>
    </div>`;

  document.getElementById("ppc").onclick = () => render();
  document.querySelectorAll("[data-pg]").forEach(el => el.onclick = () => {
    if(pgQs(el.dataset.pg).length !== n){
      toast("الكتلتان مختلفتا العدد — لا تُزاوَجان بالترتيب"); return;
    }
    pairBlock(q, q.passage_id, el.dataset.pg);
  });
  scrollTop();
}

/* المعاينة قبل التوقيع: صفٌّ لكل مزاوجة بحكمٍ عليها */
function pairBlock(back, pidA, pidB){
  const A = pgQs(pidA), B = pgQs(pidB);
  const keyOf = id => ((Z.questions || []).find(x => x.id === id) || {}).variant_key;

  const rows = A.map((a, i) => {
    const b = B[i];
    const ids  = [...new Set([...groupOf(a), ...groupOf(b)])];
    const keys = [...new Set(ids.map(keyOf).filter(Boolean))];
    const noFp = !(a.options || []).length || !(b.options || []).length;
    const v =
        (a.kind !== b.kind)                        ? '❌ نمطان مختلفان'
      : (keys.length > 1)                          ? '❌ خانتان — فُكّ إحداهما'
      : noFp                                       ? '⬜ لا فحص آليّ'
      : (fp(a).join(' · ') !== fp(b).join(' · '))  ? '⚠️ الفخاخ غير متطابقة'
      : (keys.length === 1)                        ? `✅ تتّسع ${keys[0]} إلى ${AR(ids.length)}`
      :                                              '✅ مطابق';
    return { a, b, ids, v, ok: !v.startsWith('❌') };
  });

  const doable = rows.filter(r => r.ok).length;

  document.getElementById("main").innerHTML = `
    <div class="card">
      <div class="qnum">⇄ ${esc(pgTitle(pidA))} ↔ ${esc(pgTitle(pidB))}</div>
      <div class="line" style="margin-bottom:12px">
        ${AR(rows.length)} مزاوجة بالترتيب · <b>${AR(doable)}</b> قابلة للتنفيذ</div>

      ${rows.map((r, i) => `
        <div class="eq-bar ${r.v.startsWith('✅') ? 'pg' : 'sec'}">
          <div class="eq-brow">
            <span class="eq-bs">${AR(i + 1)}</span>
            <span class="eq-bt" dir="auto" style="flex:1;min-width:0">
              ${AR(r.a.position)}. ${esc((r.a.body || '').slice(0, 40))}</span>
            <span class="eq-bt" dir="auto" style="flex:1;min-width:0">
              ${AR(r.b.position)}. ${esc((r.b.body || '').slice(0, 40))}</span>
            <span class="eq-bs">${esc(r.v)}</span>
          </div>
          <div class="eq-brow" style="margin-top:5px">
            <span class="eq-bs">${esc(fp(r.a).join(' · ') || '—')}</span>
            <span class="eq-bs">${esc(fp(r.b).join(' · ') || '—')}</span>
          </div>
        </div>`).join('')}

      <div class="nav" style="margin-top:16px">
        ${doable ? `<button class="btn primary" id="pbgo">اقرن ${AR(doable)} خانة</button>` : ''}
        <button class="btn ghost" id="pbb">رجوع</button>
      </div>
    </div>`;

  document.getElementById("pbb").onclick = () => pairPassage(back);
  const go = document.getElementById("pbgo");
  if(go) go.onclick = async () => {
    const bad  = rows.filter(r => r.ok && r.v.startsWith('⚠️')).length;
    const none = rows.filter(r => r.ok && r.v.startsWith('⬜')).length;
    if(bad && !confirm(`${bad} مزاوجة فخاخُها غير متطابقة.\n\n` +
        "الاقتران ممكن، لكن صحّح الخيارات بعده.\n\nأتقرن؟")) return;
    if(none && !confirm(`${none} مزاوجة مقالية — لا فحص آليّ لها.\n\n` +
        "التكافؤ إعلانٌ منك: أمتقاربة في الجنس والطول والألفة؟\n\nأتقرن؟")) return;

    const box = document.getElementById("main");
    let done = 0, fail = [];
    for(const [i, r] of rows.entries()){
      if(!r.ok) continue;
      box.innerHTML = `<div class="status">جارٍ الاقتران… ${AR(i + 1)} من ${AR(rows.length)}</div>`;
      const v = await api.setVariant(r.ids);
      if(v.error || !v.data?.ok) fail.push(`${AR(i + 1)}: ${v.error?.message || v.data?.error}`);
      else done++;
    }
    toast(`قُرنت ${AR(done)} خانة${fail.length ? ` · وتعذّرت ${AR(fail.length)}` : ''}`);
    if(fail.length) console.warn('تعذّر اقتران:', fail);
    reload(back.id);
  };
  scrollTop();
}


/* ═══════════ اقتران مكتوبَين ═══════════
   المحرّر كان يصنع الخانة بالتكرار وحده. ومن يؤلّف البنود المتكافئة
   معاً (في JSON مثلاً) لا يملك ما ينسخه — فكان يضطرّ إلى SQL لعمليةٍ
   تربوية خالصة: إعلان أن هذين يقيسان الشيء نفسه.

   🔑 والبصمة تُعرض **قبل** الإعلان لا بعده: أن يرى المؤلّف عدم
      التطابق وهو يختار خيرٌ من أن يراه تحذيراً بعد أن أعلن.

   ── حدود set_variant كما هي في نصّها (لا كما خُمّنت):
      • تشترط اختباراً واحداً ونمطاً واحداً وسؤالين فأكثر
      • بين المحدَّدين مفتاحان مختلفان ⇒ رفض «فُكّ إحداهما أولاً»
      • مفتاحٌ واحد ⇒ **يُتبنّى فتتّسع الخانة** — ولا يُعاد توليده
      • لا مفتاح ⇒ يُولَّد من أصغر معرّف
      ⇒ فالمقترن بخانة أخرى مرشَّحٌ صالح ما دام هذا السؤال حرّاً:
        ينضمّ إليها ولا ينشئ خانة جديدة. */

function pairForm(q){
  if(dirty && !confirm("تغييرات غير محفوظة في هذا السؤال — أتتركها؟")) return;

  const mine  = fp(q).join(' · ');
  const group = new Set([q.id, ...partners(q).map(p => p.id)]);

  /* هذا السؤال حرّ ⇒ يجوز أن ينضمّ إلى خانة مرشَّحٍ قائمة.
     وهو مقترنٌ ⇒ لا يُقبل إلا مرشّحٌ حرّ، وإلا كانا خانتين فتُرفض. */
  const free  = !q.variant_key;
  const all   = (Z.questions || []).filter(x => x.id && !group.has(x.id) && x.kind === q.kind);
  /* الترتيب يقرّب النظير: القسم أولاً — فهو أقوى إشارة حين تبلغ
     أسئلة الاختبار العشرات — ثم تطابق الفخاخ، ثم اختلاف النصّ. */
  const rank = x => (((x.section || '') === (q.section || '')) ? 0 : 8)
                  + ((fp(x).join(' · ') === mine) ? 0 : 4)
                  + ((q.passage_id && x.passage_id &&
                      String(q.passage_id) !== String(x.passage_id)) ? 0 : 2);

  const cands = all.filter(x => free || !x.variant_key)
                   .sort((a, b) => rank(a) - rank(b)
                                 || (a.position || 0) - (b.position || 0));
  const taken = all.length - cands.length;

  const pgName = id => {
    const p = (Z.passages || []).find(y => String(y.id) === String(id));
    return p ? (p.title || 'نصّ مشترك') : null;
  };

  /* حكمٌ ثلاثيّ على النصّ المشترك — نظير ما في variant_report:
     نصّان مختلفان هو المقصود، ونصٌّ واحد يجعل الخانة بلا فائدة
     (النسختان تُقرآن من الفقرة نفسها)، وواحدٌ بلا نصّ سياقان مختلفان.
     ⚠️ ولا يُحكم بالنقص هنا: سؤال الكتابة بلا فقرة هو الصواب لا
        خللاً — فالمفحوص **الاتّساق** بين النسخ، لا الحاجة إلى نصّ. */
  const pgVerdict = x =>
      (!q.passage_id && !x.passage_id) ? ''
    : (!q.passage_id || !x.passage_id) ? '⚠️ أحدهما بلا نصّ — سياقان'
    : String(q.passage_id) === String(x.passage_id) ? '⚠️ النصّ نفسه'
    : '✅ نصّ آخر';

  /* بلا خيارات لا بصمة ⇒ لا يُقال «مطابق» ولا «مختلف» بل «لا فحص» */
  const noFpWith = x => !(q.options || []).length || !(x.options || []).length;

  const row = x => {
    const his  = fp(x).join(' · ');
    const noFp = noFpWith(x);
    const same = !noFp && his === mine;
    const pgv  = pgVerdict(x);
    const dif  = [
      (noFp || same) ? '' : 'الفخاخ',
      (x.difficulty || 'medium') === (q.difficulty || 'medium') ? '' : 'الصعوبة',
      (x.section || '') === (q.section || '') ? '' : 'القسم'
    ].filter(Boolean);

    return `<button class="eq-bar ${same ? 'pg' : 'sec'}" data-pair="${x.id}"
              style="cursor:pointer;text-align:start">
      <div class="eq-brow">
        <span class="eq-bt" dir="auto" style="flex:1;min-width:0">
          ${AR(x.position)}. ${esc((x.body || '').slice(0, 55))}</span>
        ${x.variant_key ? `<span class="chip g">⇄ ينضمّ إلى ${esc(x.variant_key)}
          · ${AR(partners(x).length + 2)} نسخ</span>` : ''}
        <span class="eq-bs">${
          noFp ? '⬜ لا فحص آليّ — اقرأ الاثنين'
        : dif.length ? '⚠️ يختلف في: ' + esc(dif.join(' · '))
        : '✅ مطابق'}</span>
      </div>
      <div class="eq-brow" style="margin-top:5px">
        <span class="eq-bs" dir="auto">${esc(x.section || 'بلا قسم')}</span>
        ${pgName(x.passage_id) ? `<span class="eq-bs" dir="auto">📖 ${esc(pgName(x.passage_id))}</span>` : ''}
        ${pgv ? `<span class="eq-bs">${pgv}</span>` : ''}
      </div>
      <div class="eq-brow" style="margin-top:7px">
        ${(x.options || []).filter(o => o.dx)
            .map(o => `<span class="chip">${esc(dxName(o.dx))}</span>`).join('')
          || `<span class="eq-bs">${noFp ? 'مقاليّ — بلا خيارات' : 'بلا أكواد'}</span>`}
      </div>
    </button>`;
  };

  document.getElementById("main").innerHTML = `
    <div class="card">
      <div class="qnum">⇄ اقرن بسؤالٍ قائم</div>
      <div class="line" style="margin-bottom:6px">
        الاقتران <b>إعلانٌ</b> لا نسخ: تقول إن السؤالين يقيسان المهارة نفسها،
        فيسحب البنك واحداً منهما في كل اختبار.</div>
      <div class="line" style="margin-bottom:6px">
        فخاخ هذا السؤال: ${fp(q).map(c => `<span class="chip">${esc(dxName(c))}</span>`).join(' ')
          || ((q.options||[]).length ? '—' : '<b>مقاليّ — لا بصمة تُفحص</b>')}
        ${pgName(q.passage_id) ? ` · 📖 ${esc(pgName(q.passage_id))}` : ''}</div>
      <div class="eq-bs" style="margin-bottom:14px">
        المرشّحون مرتَّبون: قسمُك أولاً · ثم تطابق الفخاخ · ثم من كان تحت نصٍّ آخر —
        فنسختان تحت نصّ واحد لا تُغنيان عن قراءته مرّتين.</div>

      ${cands.length ? cands.map(row).join('') : `
        <div class="warnbox">لا سؤال صالحاً للاقتران في هذا الاختبار.
          الشرط: محفوظٌ · من النمط نفسه · وغير مقترن بخانة أخرى.</div>`}

      ${taken ? `<div class="eq-bs" style="margin-top:10px">
        و${AR(taken)} سؤالاً من النمط نفسه في خانة أخرى — ودمج خانتين ترفضه القاعدة،
        ففُكّ إحداهما أولاً.</div>` : ''}

      <div class="nav" style="margin-top:16px">
        <button class="btn ghost" id="pxc">إلغاء</button>
      </div>
    </div>`;

  document.getElementById("pxc").onclick = () => render();
  document.querySelectorAll("[data-pair]").forEach(el => el.onclick = async () => {
    const x = (Z.questions || []).find(y => y.id === +el.dataset.pair);
    const noFp = noFpWith(x);
    const msg = noFp
      ? "لا فحص آليّ للمقاليّ — التكافؤ إعلانٌ منك.\n\n" +
        "أمتقاربان في الجنس والطول والألفة عند طالب هذا الصف؟\n\nأتقرن؟"
      : "الفخاخ غير متطابقة — النسختان لا تقيسان الشيء نفسه.\n\n" +
        "الاقتران ممكن، لكن صحّح الخيارات بعده.\n\nأتقرن؟";
    if((noFp || fp(x).join(' · ') !== mine) && !confirm(msg)) return;

    /* العضوية كاملة لا الطرفان: set_variant تتبنّى المفتاح القائم
       فلا يلزم ذلك تقنياً — لكنه يجعل النداء وصفاً للحالة النهائية
       لا حركةً عليها، فيصحّ تكراره ولا يعتمد على تفاصيلها. */
    const ids = [...group, x.id];
    const v = await api.setVariant(ids);
    if(v.error){ toast(v.error.message); return; }
    if(!v.data?.ok){ toast(v.data?.error || "تعذّر الاقتران"); return; }
    toast(`خانة ${v.data.key} — ${AR(v.data.size ?? ids.length)} نسخ`);
    reload(q.id);
  });
  scrollTop();
}

/* التكرار حركة · والاقتران إعلان — وهذا الزرّ إعلانُ الكاتب صراحةً */
async function makeVariant(q){
  if(!q.id){ toast("احفظ السؤال أولاً ثم اصنع بديله"); return; }
  if(dirty && !confirm("تغييرات غير محفوظة في هذا السؤال — أتتركها؟")) return;

  const d = await api.duplicateQuestion(q.id);
  if(d.error){ toast(d.error.message); return; }
  if(!d.data.ok){ toast(d.data.error); return; }

  const v = await api.setVariant([q.id, d.data.id]);
  if(v.error || !v.data?.ok) toast(v.error?.message || v.data?.error || "تعذّر الاقتران");
  else toast(`أُنشئ بديل في خانة ${v.data.key} — بدّل المحتوى وأبقِ الفخاخ`);

  reload(d.data.id);              // تُعيد التحميل وتنتقل إلى البديل معاً
}

async function unVariant(q){
  const { data, error } = await api.clearVariant([q.id]);
  if(error){ toast(error.message); return; }
  if(!data.ok){ toast(data.error); return; }
  toast("فُكّت الخانة");
  reload(q.id);
}


/* وسائط السؤال — الأعمدة موجودة في القاعدة ولم يكن لها منفذ */
function mediaRow(q, locked){
  if(locked) return '';
  const f = (id, val, ph) => val !== null
    ? `<input class="eq-md" id="${id}" dir="ltr" value="${esc(val)}" placeholder="${ph}">` : '';
  return `<div class="eq-tools">
      <button class="eq-tb ${q.image?'on':''}" data-m="image">🖼️ صورة</button>
      <button class="eq-tb ${q.audio?'on':''}" data-m="audio">🎧 صوت</button>
      <button class="eq-tb ${q.video?'on':''}" data-m="video">🎬 فيديو</button>
            ${q.kind === 'gap' && !locked
        ? `<button class="eq-tb gapbtn" id="addgap" title="أدرج فراغاً">⌷ فراغ</button>` : ''}
      <span class="eq-sep"></span>
      <button class="eq-tb" data-w="**" title="غامق"><b>B</b></button>
      <button class="eq-tb" data-w="_"  title="مائل"><i>I</i></button>
      <button class="eq-tb" data-w="__" title="مسطَّر"><u>U</u></button>
                  <span class="eq-sep"></span>
      <button class="eq-tb" data-a="\\(" data-b="\\)" title="معادلة — بترميز الكتاب العربيّ">∑</button>
      <button class="eq-tb eq-alt" data-a="\\(\\en{" data-b="}\\)" title="معادلة بالرموز اللاتينية">∑EN</button>
      <button class="eq-tb" data-a="\\frac{" data-b="}{}" title="كسر — داخل المعادلة">½</button>
      <button class="eq-tb" data-a="\\sqrt{" data-b="}"   title="جذر — داخل المعادلة">√</button>
      <button class="eq-tb" data-a="^{" data-b="}"        title="أسّ — داخل المعادلة">x²</button>
      <button class="eq-tb" data-a="_{" data-b="}"        title="سفليّ — داخل المعادلة">xₙ</button>
      <button class="eq-tb" data-a="\\left(" data-b="\\right)" title="قوسان يتمدّدان">( )</button>
    </div>
    ${f('qi', q.image ?? null, 'رابط الصورة')}
    ${f('qa', q.audio ?? null, 'رابط المقطع الصوتي')}
    ${f('qv', q.video ?? null, 'رابط الفيديو')}`;
}

/* إحاطة ما حُدِّد بعلامات التنسيق */
function wrapSel(id, mark){
  const el = document.getElementById(id); if(!el) return;
  const a = el.selectionStart ?? el.value.length, b = el.selectionEnd ?? a;
  const sel = el.value.slice(a, b) || 'نصّ';
  el.value = el.value.slice(0, a) + mark + sel + mark + el.value.slice(b);
  el.focus();
  if(el.setSelectionRange) el.setSelectionRange(a + mark.length, a + mark.length + sel.length);
}

/* إدراج قالب — طرفان مختلفان والمؤشّر بينهما.
   تُكمل wrapSel ولا تحلّ محلّها: تلك للتنسيق المتماثل (**نص**)،
   وهذه للبنى الرياضية (\frac{…}{…}) حيث الطرفان مختلفان. */
function ins(id, before, after = ''){
  const el = document.getElementById(id); if(!el) return;
  const a = el.selectionStart ?? el.value.length, b = el.selectionEnd ?? a;
  const sel = el.value.slice(a, b);
  el.value = el.value.slice(0, a) + before + sel + after + el.value.slice(b);
  el.focus();
  /* بلا تحديد ⇒ المؤشّر بين الطرفين · مع تحديد ⇒ يبقى محدَّداً
     ليُلَفّ بقالبٍ ثانٍ فوراً: \frac ثم \sqrt على البسط نفسه. */
  const p = a + before.length;
  el.setSelectionRange(p, p + sel.length);
}
/* ── المعاينة الحيّة للرياضيات ──────────────────────────────
   لا تظهر إلا حين يحوي الحقل معادلة. ⇒ ١٩٤ سؤالاً قائماً لا
   يتغيّر شكل تحريرها بشيء، ومن لا يكتب رياضيات لا يرى صندوقاً.

   🔑 ولا رسمَ هنا: نضع خرْج fmt في عنصرٍ داخل #app، فيلتقطه
      المراقب المسجَّل في start(). الممرّ الإجباريّ نفسه يخدم
      المؤلّف كما يخدم الطالب — بلا سطرٍ ثانٍ.

   ولماذا للرياضيات وحدها دون **غامق**؟ لأن `**نص**` يُقرأ مفهوماً
   في مصدره، أما \frac{-64}{9} فلا يُعرف أصحيحٌ هو إلا مرسوماً. */
const HAS_TEX = /\\\(|\\\[/;

function livePreview(id){
  const ta = document.getElementById(id);
  if(!ta) return;
  let box = null, timer = null;

  const draw = () => {
    if(!HAS_TEX.test(ta.value)){ box?.remove(); box = null; return; }
    if(!box){
      box = document.createElement('div');
      box.className = 'tex-prev';
      box.dir = 'auto';
      ta.after(box);
    }
    box.innerHTML = fmt(ta.value);
  };

  /* التأخير ٤٠٠ملّي: أثناء كتابة \frac{ يمرّ النصّ بحالاتٍ مكسورة،
     ورسمُها يُري المؤلّف أحمرَ لم يُخطئه بعد. ننتظر توقّف اليد. */
  ta.addEventListener('input', () => {
    clearTimeout(timer);
    timer = setTimeout(draw, 400);
  });
  draw();                       // عند فتح بطاقةٍ فيها معادلة أصلاً
}

/* ═══════════ الربط ═══════════ */

function wire(q){
  const mark = () => { dirty = true; };
  const main = document.getElementById("main");

  /* الحقل المقصود = آخر ما لمسه المؤلّف. وكانت "qb" مثبَّتةً، فزرّ
     التنسيق يكتب في نصّ السؤال ولو كان المؤلّف في «شرح الخطأ». */
  let field = "qb";
  ["qb","qe","qm"].forEach(id =>
    document.getElementById(id)?.addEventListener('focus', () => field = id));
  const target = () => document.getElementById(field) ? field : "qb";
   ["qb","qe","qm"].forEach(id => {
    const el = document.getElementById(id); if(el) el.oninput = mark;
    livePreview(id);                 // ← السطر الجديد الوحيد
  });
  ["qi","qa","qv"].forEach(id => {
    const el = document.getElementById(id);
    if(el) el.oninput = e => {
      q[{qi:'image',qa:'audio',qv:'video'}[id]] = e.target.value || null; mark();
    };
  });
  /* qa قد لا يكون موجوداً (زرّ 🎧 مطفأ) — attachUpload تتجاهل بصمت.
     و wire تُنادى بعد كل رسم، فالزرّ يظهر لحظة فتح الحقل. */
  attachUpload('qa', 'q' + (Z?.id ?? ''));
   
  main.querySelectorAll("[data-m]").forEach(el => el.onclick = () => {
    const k = el.dataset.m;
    q[k] = (q[k] === null || q[k] === undefined) ? '' : null;   // إظهار/إخفاء الحقل
    mark(); repaint(q);
  });
  main.querySelectorAll("[data-w]").forEach(el => el.onclick = () => {
    wrapSel(target(), el.dataset.w); mark();
  });
  main.querySelectorAll("[data-a]").forEach(el => el.onclick = () => {
    ins(target(), el.dataset.a, el.dataset.b || ''); mark();
  });
  const bind = (id, fn) => { const e = main.querySelector('#' + id); if(e) e.onclick = fn; };
  bind("addsec", () => editSection(''));
  bind("edsec",  () => editSection(q.section || ''));
  bind("rmsec",  () => applySection(null));
  bind("addpg",  () => passageForm(null));
  bind("edpg",   () => passageForm((Z.passages||[]).find(x => String(x.id) === String(q.passage_id))));
  bind("rmpg",   () => applyPassage(null));
  bind("mkvar",  () => makeVariant(q));
  bind("pairvar",() => pairForm(q));
  bind("pairpg", () => pairPassage(q));
  bind("cmpv",   () => compareVariant(q.variant_key));
  bind("addvar", () => pairForm(q));
  bind("rmvar",  () => unVariant(q));

  main.querySelectorAll(".eq-ob").forEach(el => el.oninput = e => {
    q.options[+el.dataset.o].body = e.target.value; mark();
  });
  main.querySelectorAll(".eq-dx").forEach(el => el.onchange = e => {
    q.options[+el.dataset.o].dx = e.target.value || null;
    el.classList.toggle('miss', !e.target.value); mark();
  });
  main.querySelectorAll('input[name="corr"]').forEach(el => el.onchange = () => {
    const i = +el.dataset.o;
    /* الاختيار الواحد إسنادٌ يُلغي ما سواه · والمتعدّد تبديلُ خيارٍ وحده.
       ⚠️ والكود يُبطَل مع كل تبديل: هو جوابٌ عن «لماذا يأخذها وهي خاطئة؟»،
       فمتى صار الخيار صحيحاً سقط السؤال وسقط جوابه معه. والإبطال هنا
       لا التبديل — لأن الجواب الجديد لا يُشتقّ من القديم بحال. */
    if(q.kind === 'msq'){
      q.options[i].correct = el.checked;
      q.options[i].dx = null;
    } else {
      q.options.forEach((o, j) => { o.correct = (j === i); if(o.correct) o.dx = null; });
    }
    mark(); repaint(q);
  });
  main.querySelectorAll("[data-rm]").forEach(el => el.onclick = () => {
    const min = q.kind === 'msq' ? 3 : 2;
    if(q.options.length <= min){
      toast(min === 3 ? "الاختيار المتعدّد يحتاج ثلاثة خيارات على الأقل"
                      : "السؤال يحتاج خيارين على الأقل"); return; }
    q.options.splice(+el.dataset.rm, 1); mark(); repaint(q);
  });

  const ao = main.querySelector("#addo");
  if(ao) ao.onclick = () => {
    if(q.options.length >= 6){ toast("ستة خيارات حدّ كافٍ"); return; }
    q.options.push({ label: null, body: '', correct: false, dx: null });
    mark(); repaint(q);
  };

     /* الفراغات تُشتقّ من النصّ ⇒ حقول المقبولات تتبع الكتابة فوراً.
     ولا يُعاد رسم البطاقة كلّها لئلّا يقفز المؤشّر من مربّع النصّ. */
    const qb = main.querySelector("#qb");
  if(qb && q.kind === 'gap'){
    let last = gapCount(q.body || '');

    /* المعاينة الحيّة تستدعي دالّة الطالب نفسها — فما يُرى هو ما سيُرى. */
    const live = () => {
      q.body = qb.value;
      const lv = main.querySelector("#gaplive");
      if(lv) lv.innerHTML = gapCount(qb.value)
        ? questionText(q, [], true)
        : '<span class="eq-hint">…هكذا يراه الطالب</span>';
    };

    qb.oninput = () => {
      const n = gapCount(qb.value);
      if(n !== last){
        /* حذفُ فراغٍ من الوسط يترك فجوة ⇒ يُعاد الترقيم فوراً،
           فلا يرى المؤلّف {{2}} و{{3}} بلا {{1}}. */
        const p = qb.selectionStart ?? qb.value.length;
        let i = 0;
        const v = qb.value.replace(/\{\{\d+\}\}/g, () => `{{${++i}}}`);
        if(v !== qb.value){ qb.value = v; qb.setSelectionRange(p, p); }
        last = n;
        collect(q); q.body = qb.value;
        const box = main.querySelector("#gapbox");
        if(box) box.innerHTML = gapFields(q, false);
      }
      live();
    };

    const ag = main.querySelector("#addgap");
    if(ag) ag.onclick = () => {
      /* الرقم يُحسب فلا يُخطئ المؤلّف في التتابع.
         والإدراج عند المؤشّر لا في الذيل — فالفراغ يقع حيث يريد. */
      const p = qb.selectionStart ?? qb.value.length;
      let v = qb.value.slice(0,p) + '{{§}}' + qb.value.slice(p);
      let i = 0;
      v = v.replace(/\{\{(\d+|§)\}\}/g, () => `{{${++i}}}`);   // ترقيمٌ شامل
      qb.value = v;
      qb.focus();
      const after = v.indexOf('}}', p) + 2;
      qb.setSelectionRange(after, after);
      qb.dispatchEvent(new Event('input'));   // يُشغّل ما سبق ⇒ لا تكرار
      mark();
    };
  }
  const sq = main.querySelector("#sq"); if(sq) sq.onclick = () => saveQ(q);
  const dq = main.querySelector("#dq"); if(dq) dq.onclick = () => dupQ(q);
  const xq = main.querySelector("#xq"); if(xq) xq.onclick = () => delQ(q);
}

/* إعادة رسم الوسط وحده — فلا يفقد الشريط موضعه */
function repaint(q){
  collect(q);
  document.getElementById("main").innerHTML = qCard(q);
  wire(q);
}

/* حقول «إكمال الناقص» — عددُها يُشتقّ من {{n}} في نصّ السؤال،
   فيراها المؤلّف تظهر وتختفي وهو يكتب. لا عمود يتفارق مع النصّ. */
function gapFields(q, locked){
  const n = gapCount(q.body || '');
  if(!n) return `<div class="eq-hint" style="display:block;padding:14px 0">
    لا فراغ بعد — اكتب <code>{{1}}</code> في نصّ السؤال أعلاه.</div>`;

  const slots = q.accept?.slots || [];
  const rows = Array.from({length:n}, (_,i) => `
    <label class="fl">الفراغ ${AR(i+1)} — المقبولات، والبدائل بينها <b>|</b> *</label>
    <input class="gp-acc" data-i="${i}" dir="auto" ${locked?'disabled':''}
           value="${esc((slots[i]||[]).join(' | '))}"
           placeholder="45 | £45 | forty-five">`).join("");

  const ord = n > 1 ? `
    <label class="eq-ck" style="display:flex;gap:9px;margin-top:13px;align-items:center">
      <input type="checkbox" id="gpord" ${locked?'disabled':''}
             ${q.accept?.ordered === false ? '' : 'checked'}>
      <span>الترتيب ملزم — أزل العلامة إن قُبلت الإجابات بأيّ ترتيب</span></label>` : '';

  const w = Object.entries(q.wrong || {}).map(([k,v]) => `${k} = ${v}`).join('\n');

  return `${rows}${ord}
    <label class="fl" style="margin-top:18px">أخطاء متوقّعة وأكوادها — اختياريّ</label>
    <textarea id="gpw" dir="ltr" style="min-height:78px" ${locked?'disabled':''}
      placeholder="1:30 = RTR">${esc(w)}</textarea>
    <div class="eq-hint" style="display:block;margin-top:6px;line-height:1.8">
      سطرٌ لكل خطأ، والرقم قبل النقطتين رقمُ الفراغ.
      واتركه فارغاً إن لم تتوقّع خطأً بعينه — تُقاس الأخطاء الشائعة لاحقاً من إجابات الطلاب.</div>`;
}
/* جمع ما في الحقول إلى الكائن قبل أي إعادة رسم أو حفظ */
function collect(q){
  const main = document.getElementById("main");
  const v = id => main.querySelector('#' + id)?.value ?? null;
  if(v("qb") !== null) q.body = v("qb");
  if(v("qe") !== null) q.explanation = v("qe");
  if(v("qm") !== null) q.model = v("qm");
  if(v("qi") !== null) q.image = v("qi") || null;
  if(v("qa") !== null) q.audio = v("qa") || null;
  if(v("qv") !== null) q.video = v("qv") || null;
   main.querySelectorAll(".eq-ob").forEach(el => {
    const o = q.options?.[+el.dataset.o];      // حقلٌ لخيارٍ حُذف ⇒ يُتجاوز
    if(o) o.body = el.value;
  });
  if(q.kind === 'gap'){
    const slots = [];
    main.querySelectorAll(".gp-acc").forEach(el =>
      slots[+el.dataset.i] = el.value.split('|').map(s=>s.trim()).filter(Boolean));
    const ord = main.querySelector("#gpord");
    q.accept = { ordered: ord ? ord.checked : true, slots };

    // "1:30 = RTR" — الرقم قبل النقطتين رقمُ الفراغ
    const w = {};
    (main.querySelector("#gpw")?.value || '').split('\n').forEach(ln => {
      const m = ln.match(/^\s*(\d+\s*:\s*.+?)\s*=\s*([A-Z_]+)\s*$/);
      if(m) w[m[1].replace(/\s*:\s*/, ':')] = m[2];
    });
    q.wrong = Object.keys(w).length ? w : null;
  }}


/* ═══════════ العمليات ═══════════ */

async function saveQ(q){
  collect(q);
  const { data, error } = await api.saveQuestion({
    id: q.id ?? null, quiz: Z.id, kind: q.kind, body: q.body,
    position: cur + 1,
    options: (q.options || []).map(o => ({
      label: o.label, body: o.body, correct: !!o.correct, dx: o.dx })),
    explanation: q.explanation, model: q.model,
    passage: q.passage_id, objective: q.objective_id, section: q.section,
    points: q.points, lang: q.lang, difficulty: q.difficulty,
    image: q.image, video: q.video, audio: q.audio,
    accept: q.kind==='gap' ? q.accept : null,
    wrong:  q.kind==='gap' ? q.wrong  : null,
    bank:   q.kind==='gap' ? q.bank   : null });

  if(error){ toast(error.message); return; }
  if(!data.ok){ toast(data.error); return; }
  dirty = false;
  toast("حُفظ السؤال");
  reload(data.id);
}

async function addQuestion(kind){
  if(dirty && !confirm("تغييرات غير محفوظة — أتتركها؟")) return;
  const blank = {
    mcq:   { id:null, kind:'mcq',   body:'', answered:0, explanation:'',
             options: [0,1,2,3].map(i => ({ label:null, body:'', correct:i===0, dx:null })) },
    msq:   { id:null, kind:'msq',   body:'', answered:0, explanation:'',
             options: [0,1,2,3].map(i => ({ label:null, body:'', correct:i<2,   dx:null })) },
         gap:   { id:null, kind:'gap',   body:'', answered:0, explanation:'', options:[],
             accept:{ ordered:true, slots:[] }, wrong:{}, bank:null },
    essay: { id:null, kind:'essay', body:'', answered:0, model:'', options:[] }
  };
  Z.questions.push(blank[kind] || blank.mcq);
  cur = Z.questions.length - 1; dirty = true; render();
}

async function dupQ(q){
  if(!q.id){ toast("احفظ السؤال أولاً ثم كرّره"); return; }
  const { data, error } = await api.duplicateQuestion(q.id);
  if(error){ toast(error.message); return; }
  if(!data.ok){ toast(data.error); return; }
  toast("كُرّر السؤال بخياراته وأكواده");
  reload(data.id);
}

async function delQ(q){
  if(!q.id){ Z.questions.splice(cur,1); cur = Math.max(0, cur-1); dirty=false; render(); return; }
  if(!confirm("حذف هذا السؤال؟")) return;
  const { data, error } = await api.deleteQuestion(q.id);
  if(error){ toast(error.message); return; }
  if(!data.ok){ toast(data.error); return; }
  toast("حُذف السؤال");
  cur = Math.max(0, cur - 1);
  reload();
}

/* إعادة التحميل من القاعدة — فتتحدّث الجاهزية وعدّاد الإجابات معاً */
async function reload(focusId){
  const { data } = await api.quizForEdit(Z.id);
  if(data?.ok){
    Z = data;
    if(focusId){
      const i = Z.questions.findIndex(x => x.id === focusId);
      if(i >= 0) cur = i;
    }
    cur = Math.min(cur, Math.max(0, Z.questions.length - 1));
  }
  dirty = false; render();
}


/* ═══════════ المعاينة ═══════════
   بفئات شاشة الطالب نفسها (.psg .qtext .opts .opt .key) — فما
   يراه المؤلّف هو ما سيراه الطالب، لا محاكاةً له.
   ولا تُسجَّل محاولة: النقر يُبرز الخيار ولا يُرسل شيئاً. */

let pv = 0;

function preview(){
  const qs = Z.questions || [];
  if(!qs.length){ toast("لا أسئلة للمعاينة"); return; }
  pv = Math.min(pv, qs.length - 1);
  const q = qs[pv];
  const p = (Z.passages||[]).find(x => String(x.id) === String(q.passage_id));

  app.innerHTML = `
    <div class="crumb" id="pvx">← رجوع إلى التحرير</div>
    <div class="warnbox">👁️ معاينة — هكذا يرى الطالب هذا السؤال.
      لا تُسجَّل محاولة ولا تُعرض الإجابة الصحيحة.</div>

    <div class="timerbar" style="position:static;border-radius:11px;margin-bottom:14px">
      <span class="clock">${mmssPv(Z.minutes*60)}</span>
      <span class="track"><span class="trackfill" style="width:100%"></span></span>
      <span class="qcount">${AR(pv+1)} / ${AR(qs.length)}</span>
    </div>

    ${q.section ? `<div class="q-sec" dir="auto">${esc(q.section)}</div>` : ''}
    ${p ? `<div class="card" style="padding:16px">
        ${p.title?`<div class="psg-t" dir="auto">${esc(p.title)}</div>`:''}
        ${pgMedia(p)}
        ${p.body?`<div class="psg" dir="auto">${fmt(p.body)}</div>`:''}
      </div>` : ''}

    <div class="card" id="qcard">
          <div class="qnum">سؤال ${AR(pv+1)} · ${KIND_LABEL[q.kind]||'سؤال'}</div>
          ${(()=>{ const i=srcOf(q.image), a=srcOf(q.audio), v=srcOf(q.video); return `
        ${i?`<img class="media" src="${esc(i)}" alt="">`:''}
        ${a?`<audio controls preload="metadata" src="${esc(a)}"
                    style="width:100%;margin-bottom:12px"></audio>`:''}
        ${v?`<iframe class="media-v" src="${esc(v)}" allowfullscreen></iframe>`:''}`; })()}
      ${questionText(q)}
      ${questionBody(q, { bank: q.bank })}
    </div>

    <div class="nav">
      ${pv > 0 ? '<button class="btn ghost" id="pvp">السابق</button>' : ''}
      <button class="btn primary" id="pvn">
        ${pv === qs.length-1 ? 'نهاية المعاينة' : 'التالي'}</button>
    </div>`;

  document.getElementById("pvx").onclick = () => render();
  const pp = document.getElementById("pvp"); if(pp) pp.onclick = () => { pv--; preview(); };
  document.getElementById("pvn").onclick = () => {
    if(pv === qs.length-1){ toast("انتهت المعاينة"); pv = 0; render(); return; }
    pv++; preview();
  };
  app.querySelectorAll("[data-pvo]").forEach(el => el.onclick = () => {
    if(q.kind === 'msq'){                       // تبديلٌ في مكانه — لا إلغاء لما سواه
      el.classList.toggle('sel');
      const t = el.querySelector('.tick');
      if(t) t.textContent = el.classList.contains('sel') ? '✔' : '';
      return;
    }
    app.querySelectorAll(".opt").forEach(x => x.classList.remove('sel'));
    el.classList.add('sel');
  });
  scrollTop();
}

const mmssPv = s => { const m = Math.floor(s/60), x = s%60;
                      return m + ":" + (x<10?"0":"") + x; };


/* ═══════════ الاستيراد ═══════════
   يُضيف ولا يستبدل · ويعاين قبل الإدراج · وكل سؤال يمرّ بـ
   save_question — فالحراسة نفسها: كود تشخيص لكل مشتّت وشرحٌ
   للخطأ. الاستيراد باب أوسع لا باب خلفي. */

const SAMPLE = JSON.stringify({
  passages: [{ ref: "p1", title: "Reading Passage", body: "Egypt is a land…", lang: "en" }],
  questions: [
    { section: "A. Vocabulary", body: "\"Crossroads\" here means a ……",
      explanation: "Crossroads = ملتقى طرق، وأقربها junction.",
      options: [ { body: "barrier",  dx: "VOC" },
                 { body: "junction", correct: true },
                 { body: "pathway",  dx: "VOC" },
                 { body: "boundary", dx: "VOC" } ] },
    { section: "B. Reading", passage: "p1", body: "The best title is ……",
      explanation: "العنوان يجمع الماضي والحاضر.",
      options: [ { body: "Trade Routes", dx: "DTL" },
                 { body: "A Nation Proud of Its Past", correct: true } ] },
    { kind: "msq", section: "B. Reading", passage: "p1",
      body: "Which statements does the passage support? (Choose all that apply)",
      explanation: "الأوليان منصوصتان في الفقرة؛ والأخريان إسقاطٌ من خارج النصّ.",
      options: [ { body: "Egypt lies where old trade routes met", correct: true },
                 { body: "Its past still shapes its identity",     correct: true },
                 { body: "Its economy depends mainly on tourism",  dx: "INF" },
                 { body: "It stayed untouched by other cultures",  dx: "INF" } ] }
  ]
}, null, 2);

function parseImport(txt){
  const dxCodes = new Set(((S.tree?.dx) || []).map(d => d.code));
  const out = { passages: [], questions: [], groups: {}, issues: [], warns: [] };
  let j;
  try { j = JSON.parse(txt); }
  catch(e){ out.issues.push('JSON غير صالح: ' + e.message); return out; }

  if(Array.isArray(j)) j = { questions: j };

  /* 🔑 تطبيعٌ عند المدخل: شكلان مقبولان وشكلٌ داخليّ واحد.
     groups تُسطَّح إلى questions بوسمٍ يجمعها، فيسير التحقّق
     والإدراج على مسارٍ واحد ولا تتضاعف الحالات. */
  if(!Array.isArray(j.questions) && Array.isArray(j.groups)){
    j = { ...j, questions: j.groups.flatMap((g, i) =>
      (Array.isArray(g.questions) ? g.questions : [])
        .map(q => ({ ...q, variant: q.variant || g.variant || ('g' + (i + 1)) }))) };
  }

  out.passages  = Array.isArray(j.passages)  ? j.passages  : [];
  out.questions = Array.isArray(j.questions) ? j.questions : [];
  if(!out.questions.length){
    out.issues.push(Array.isArray(j.groups)
      ? 'المجموعات في groups بلا أسئلة'
      : 'لا مصفوفة questions في الجذر — وإن كانت أسئلتك داخل مجموعات متكافئة فسمّها groups');
    return out;
  }

  const refs = new Set(out.passages.map(p => p.ref).filter(Boolean));
  out.questions.forEach((q, i) => {
    const n = i + 1, kind = q.kind || 'mcq';
    if(!String(q.body || '').trim()) out.issues.push(`س${n}: بلا نصّ`);
    if(q.passage && !refs.has(q.passage)) out.issues.push(`س${n}: النصّ "${q.passage}" غير معرَّف`);

    if(kind === 'essay'){
      if(!String(q.model || '').trim()) out.issues.push(`س${n}: مقالي بلا إجابة نموذجية`);
      return;
    }
    if(kind !== 'mcq' && kind !== 'msq'){
      out.issues.push(`س${n}: نمط غير معروف "${kind}"`); return;
    }

    const multi = kind === 'msq';
    const opts  = Array.isArray(q.options) ? q.options : [];
    const nOk   = opts.filter(o => o.correct).length;

    if(opts.length < (multi ? 3 : 2))
      out.issues.push(`س${n}: يحتاج ${multi ? 'ثلاثة خيارات' : 'خيارين'} على الأقل`);

    if(multi){
      /* صحيحٌ واحد = اختيارٌ واحد متنكّر · وكلٌّ صحيح = لا تمييز */
      if(nOk < 2) out.issues.push(`س${n}: الاختيار المتعدّد يلزمه خياران صحيحان على الأقل`);
      if(nOk && nOk >= opts.length) out.issues.push(`س${n}: يلزم خيار خاطئ واحد على الأقل`);
    } else if(nOk !== 1){
      out.issues.push(`س${n}: يلزم خيار صحيح واحد بالضبط`);
    }

    if(!String(q.explanation || '').trim()) out.issues.push(`س${n}: بلا شرح للخطأ`);

    opts.forEach((o, k) => {
      if(!String(o.body || '').trim()) out.issues.push(`س${n}: خيار ${k+1} بلا نصّ`);
      if(o.correct) return;              // الكود للمشتّت وحده — في النمطين
      if(!o.dx) out.issues.push(`س${n}: الخيار "${String(o.body||'').slice(0,18)}" بلا كود تشخيص`);
      else if(!dxCodes.has(o.dx)) out.issues.push(`س${n}: كود غير معروف "${o.dx}"`);
    });
  });

  /* ── الخانات ──────────────────────────────────────────────
     التكافؤ في الملف إعلانٌ صريح من المؤلّف كما هو بالزرّ —
     لا استنتاجاً من التشابه. فالمبدأ محفوظ والكلفة تسقط. */
  out.questions.forEach((q, i) => {
    const v = String(q.variant || '').trim();
    if(v) (out.groups[v] = out.groups[v] || []).push({ q, n: i + 1 });
  });

  Object.entries(out.groups).forEach(([v, arr]) => {
    const at = ' (' + arr.map(a => 'س' + a.n).join(' · ') + ')';

    // شرطان ترفضهما set_variant ⇒ يُحجبان قبل الرفع لا بعده
    if(arr.length < 2)
      out.issues.push(`خانة "${v}": عضوٌ واحد${at} — سؤالٌ وحده ليس نسخةً لشيء`);
    if(new Set(arr.map(a => a.q.kind || 'mcq')).size > 1)
      out.issues.push(`خانة "${v}": أنماط مختلطة${at} — لا تُقرن أسئلة مختلفة النمط`);

    /* والفخاخ تحذيرٌ لا حجب: قد يقرن المؤلّف ثم يصحّح الخيارات.
       ⚠️ والمقاليّ بلا بصمة — فلا يُقال «متطابقة» عمّا لم يُفحص. */
    const essay = arr.every(a => (a.q.kind || 'mcq') === 'essay');
    if(essay){
      out.warns.push(`خانة "${v}": مقالية${at} — لا فحص آليّ، والتكافؤ إعلانٌ منك`);
    } else {
      const fps = arr.map(a => [...new Set((a.q.options || [])
        .map(o => o.dx).filter(Boolean))].sort().join(' · '));
      if(new Set(fps).size > 1)
        out.warns.push(`خانة "${v}": الفخاخ غير متطابقة${at} — ${fps.join('  ≠  ')}`);
    }
  });

  return out;
}

/* الملف يُقرأ في المتصفح — لا رفع إلى خادم ولا Storage.
   ثم يمرّ بـ parseImport كما يمرّ اللصق: لا باب خلفي. */
const MAX_KB = 2048;

function readFile(file){
  if(!file) return;
  if(file.size > MAX_KB * 1024){
    toast(`الملف أكبر من ${AR(MAX_KB/1024)} ميجابايت`); return;
  }
  const r = new FileReader();
  r.onload = () => {
    document.getElementById("ij").value = r.result;
    toast(`قُرئ ${esc(file.name)}`);
    document.getElementById("ian").onclick();      // تحليل فوري
  };
  r.onerror = () => toast("تعذّرت قراءة الملف");
  r.readAsText(file, 'utf-8');
}

/* التصدير: نسخة احتياطية · ونقل بين المقرَّرات · ودورة تحرير خارجية */
function exportQuiz(){
  const pgs = (Z.passages || []);
  const refOf = id => { const i = pgs.findIndex(p => String(p.id) === String(id));
                        return i < 0 ? null : 'p' + (i + 1); };
  const doc = {
    quiz: { title: Z.title, minutes: Z.minutes },
    passages: pgs.map((p, i) => ({ ref: 'p' + (i + 1), title: p.title || null,
      body: p.body || null, media: p.media || null,
      kind: p.kind || 'text', lang: p.lang || 'ar' })),
    questions: (Z.questions || []).map(q => {
      const o = { section: q.section || null, kind: q.kind, body: q.body };
      // بلا هذا السطر تعود النسخة الاحتياطية مفكوكة الخانات كلها
      if(q.variant_key) o.variant = q.variant_key;
      const r = refOf(q.passage_id); if(r) o.passage = r;
      if(q.kind === 'essay'){ o.model = q.model || null; return o; }
      o.explanation = q.explanation || null;
      if(q.difficulty) o.difficulty = q.difficulty;
      o.options = (q.options || []).map(x => x.correct
        ? { body: x.body, correct: true } : { body: x.body, dx: x.dx || null });
      return o;
    })
  };
  const name = (Z.code || 'quiz') + '.json';
  const blob = new Blob([JSON.stringify(doc, null, 2)], { type: 'application/json' });
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob); a.download = name;
  a.click(); URL.revokeObjectURL(a.href);
  toast(`صُدِّر ${AR((Z.questions||[]).length)} سؤالاً`);
}

function importBox(){
  document.getElementById("main").innerHTML = `
    <div class="card">
      <div class="qnum">⇪ استيراد اختبار · يُضاف إلى ${AR((Z.questions||[]).length)} سؤالاً قائماً</div>
      <div class="line" style="margin-bottom:12px">ألصق JSON — أسئلةً ونصوصاً مشتركة وأقساماً.
        كل سؤال يمرّ بنفس التحقّق: كود تشخيص لكل مشتّت، وشرحٌ للخطأ.<br>
        ولإعلان التكافؤ: أضِف <code dir="ltr">"variant": "F1"</code> إلى البندين —
        أو ضعهما داخل <code dir="ltr">groups</code>. ويُقرنان بعد الإدراج تلقائياً.</div>

      <!-- 🔑 القائمة عند نقطة القرار: من يكتب JSON خارج المنصّة لا يرى
           أكواده، فيخترع ما يظنّه معقولاً ثم يُفاجأ بالرفض. وأرخص من
           رسالة خطأ دقيقة أن تُعرض القائمة قبل أن يُكتب الملف. -->
      <details class="eq-dxlist" style="margin-bottom:12px">
        <summary style="cursor:pointer;font-family:'Almarai';font-weight:700;font-size:.82rem">
          أكواد التشخيص المتاحة (${AR(((S.tree?.dx)||[]).length)}) — انسخ الرمز كما هو</summary>
        <div style="display:flex;flex-wrap:wrap;gap:6px;margin-top:9px">
          ${[...new Set(((S.tree?.dx)||[]).map(d => d.family || 'عام'))].map(f => `
            <div style="width:100%;margin-top:4px;font-size:.74rem;opacity:.6">${esc(f)}</div>
            ${((S.tree?.dx)||[]).filter(d => (d.family||'عام') === f).map(d =>
              `<span class="chip" title="${esc(d.name)}" dir="ltr">${esc(d.code)}</span>
               <span style="font-size:.76rem;opacity:.75;margin-inline-end:10px">${esc(d.name)}</span>`
            ).join('')}`).join('')}
        </div>
      </details>
      <div class="drop" id="idz">
        <div class="drop-i">⇪</div>
        <div>اسحب ملف JSON هنا · أو <span class="drop-a" id="ipick">اختر ملفاً</span>
          · أو الصق أدناه</div>
        <div class="drop-s">الملف يُقرأ في متصفحك — لا يُرفع إلى أي خادم · حتى ٢ ميجابايت</div>
        <input type="file" id="ifile" accept=".json,.txt,application/json" hidden>
      </div>
      <textarea id="ij" dir="ltr" style="min-height:220px;font-family:monospace;font-size:.78rem"
        placeholder='{ "questions": [ … ] }'></textarea>
      <div class="nav" style="margin-top:12px">
        <button class="btn primary" id="ian">تحليل</button>
        <button class="btn ghost" id="ism">قالب مثال</button>
        <button class="btn ghost" id="iex">⇩ تصدير الحالي</button>
        <button class="btn ghost" id="ic">إلغاء</button>
      </div>
      <div id="ipv"></div>
    </div>`;
  document.getElementById("ic").onclick  = () => render();
  document.getElementById("ism").onclick = () => { document.getElementById("ij").value = SAMPLE; };
  document.getElementById("iex").onclick = exportQuiz;

  const pick = document.getElementById("ifile");
  document.getElementById("ipick").onclick = () => pick.click();
  pick.onchange = e => readFile(e.target.files?.[0]);

  const dz = document.getElementById("idz");
  ['dragenter','dragover'].forEach(ev => dz.addEventListener(ev, e => {
    e.preventDefault(); dz.classList.add('on');
  }));
  ['dragleave','drop'].forEach(ev => dz.addEventListener(ev, e => {
    e.preventDefault(); dz.classList.remove('on');
  }));
  dz.addEventListener('drop', e => readFile(e.dataTransfer?.files?.[0]));
  document.getElementById("ian").onclick = () => {
    const p = parseImport(document.getElementById("ij").value || '');
    const box = document.getElementById("ipv");
    const okAll = !p.issues.length;
    const nG = Object.keys(p.groups || {}).length;
    box.innerHTML = `
      <div class="eq-ready ${okAll?'ok':''}" style="margin-top:14px">
        <div class="line"><b>${AR(p.questions.length)}</b> سؤالاً ·
          <b>${AR(p.passages.length)}</b> نصاً مشتركاً ·
          <b>${AR(new Set(p.questions.map(q=>q.section).filter(Boolean)).size)}</b> قسماً${
          nG ? ` · <b>${AR(nG)}</b> خانة تُقرن بعد الإدراج` : ''}</div>
        ${okAll ? '<div class="eq-ok">✅ جاهز للاستيراد</div>'
                : p.issues.slice(0,14).map(x => `<div class="eq-iss">⚠️ ${esc(x)}</div>`).join("")
                  + (p.issues.length > 14 ? `<div class="eq-iss">… و${AR(p.issues.length-14)} غيرها</div>` : '')}
      </div>
      ${/* تحذيرٌ لا حجب — يُعرض ولا يمنع الزرّ */''}
      ${p.warns.length ? `<div class="warnbox" style="margin-top:10px">
        ${p.warns.map(x => `<div>⚠️ ${esc(x)}</div>`).join('')}
        <div style="margin-top:7px;opacity:.85">الاستيراد ممكن — لكن صحّح <b>الخيارات</b> بعده،
        فالنسخة التي تخالف فخاخ شريكها لا تقيس ما يقيسه.</div></div>` : ''}
      ${okAll ? `<div class="nav" style="margin-top:12px">
        <button class="btn primary" id="igo">استيراد ${AR(p.questions.length)} سؤالاً</button></div>` : ''}`;
    const go = document.getElementById("igo");
    if(go) go.onclick = () => runImport(p);
  };
}

async function runImport(p){
  const box = document.getElementById("ipv");
  const say = t => { if(box) box.innerHTML = `<div class="status">${esc(t)}</div>`; };

  /* الفشل يُعرض ولا يُخفى: رسالة باقية + زرّ عودة.
     كان التوقّف يترك الشاشة عالقة على «جارٍ…» ورسالةً عابرة. */
  const stop = (where, msg, done) => {
    if(box) box.innerHTML = `
      <div class="err" style="margin-top:14px">
        <b>توقّف الاستيراد عند ${esc(where)}</b>${esc(msg || 'خطأ غير معروف')}
        ${done ? `<div class="line" style="margin-top:7px">استُورد ${AR(done)} قبل التوقّف —
          صحّح الملف واستورد الباقي وحده.</div>` : ''}
      </div>
      <div class="nav" style="margin-top:12px">
        <button class="btn ghost" id="iback">رجوع إلى الأسئلة</button>
      </div>`;
    const b = document.getElementById("iback");
    if(b) b.onclick = () => reload();
  };

  const refMap = {}, byVar = {};
  let done = 0, paired = 0;
  try {
    for(const [k, pg] of p.passages.entries()){
      say(`جارٍ إضافة النصوص المشتركة… ${AR(k+1)} من ${AR(p.passages.length)}`);
      const { data, error } = await api.savePassage({
        quiz: Z.id, title: pg.title || null, body: pg.body || null,
        media: pg.media || null,
        kind: pg.media ? (pg.kind && pg.kind !== 'text' ? pg.kind : 'audio') : 'text',
        lang: pg.lang || 'ar', position: (Z.passages||[]).length + k + 1 });
      if(error || !data?.ok){
        stop(`النصّ المشترك ${AR(k+1)}`, error?.message || data?.error); return;
      }
      if(pg.ref) refMap[pg.ref] = data.id;
    }

    const base = (Z.questions || []).length;
    for(const [i, q] of p.questions.entries()){
      say(`جارٍ الاستيراد… ${AR(i+1)} من ${AR(p.questions.length)}`);
      const { data, error } = await api.saveQuestion({
        quiz: Z.id, kind: q.kind || 'mcq', body: q.body,
        position: base + i + 1,
        section: q.section || null,
        passage: q.passage ? (refMap[q.passage] ?? null) : null,
        explanation: q.explanation || null, model: q.model || null,
        difficulty: q.difficulty || null, lang: q.lang || 'ar',
        options: (q.options || []).map(o => ({
          label: o.label, body: o.body, correct: !!o.correct, dx: o.dx })) });
      if(error || !data?.ok){
        stop(`السؤال ${AR(i+1)}`, error?.message || data?.error, done); return;
      }
      done++;
      const v = String(q.variant || '').trim();
      if(v) (byVar[v] = byVar[v] || []).push(data.id);
    }

    /* الاقتران بعد الإدراج كله: المعرّفات لا تُعرف قبل الحفظ.
       ولو فشل هنا لبقيت الأسئلة مُدرَجة — فالرسالة تقول ذلك صراحةً. */
    for(const [v, ids] of Object.entries(byVar)){
      if(ids.length < 2) continue;
      say(`جارٍ اقتران الخانات… ${v}`);
      const r = await api.setVariant(ids);
      if(r.error || !r.data?.ok){
        stop(`اقتران الخانة "${v}"`, r.error?.message || r.data?.error, done); return;
      }
      paired++;
    }
  } catch(e){
    stop('الاتصال', e?.message, done); return;
  }

  toast(`استُورد ${AR(done)} سؤالاً${paired ? ` · وقُرنت ${AR(paired)} خانة` : ''}`);
  reload();
}


/* ═══════════ تطبيق الحاويات على المدى ═══════════ */

async function applySection(sec){
  const r = range(cur, 'section');
  if(!r.ids.length){                       // سؤال لم يُحفظ بعد
    Z.questions[cur].section = sec; dirty = true; render(); return;
  }
  const { data, error } = await api.setSection(sec, r.ids);
  if(error){ toast(error.message); return; }
  if(!data.ok){ toast(data.error); return; }
  toast(sec ? `طُبّق على ${AR(data.count)} سؤالاً` : "أُزيل العنوان");
  reload();
}

async function applyPassage(pid){
  const r = range(cur, 'passage_id');
  if(!r.ids.length){
    Z.questions[cur].passage_id = pid; dirty = true; render(); return;
  }
  const { data, error } = await api.attachPassage(pid, r.ids);
  if(error){ toast(error.message); return; }
  if(!data.ok){ toast(data.error); return; }
  toast(pid ? `رُبط بـ${AR(data.count)} سؤالاً` : "فُصل النصّ");
  reload();
}

function editSection(cur_val){
  const v = prompt("عنوان القسم — يشمل هذا السؤال وما بعده حتى يتغيّر:\n" +
    ((Z.sections||[]).length ? "المستعملة: " + Z.sections.join(' · ') : ""), cur_val || '');
  if(v === null) return;
  applySection(v.trim() || null);
}


/* ═══════════ النصّ المشترك ═══════════ */

/* صندوق يتمدّد في مكانه — لا صفحة تنفصل عن الأسئلة
   ⚠️ معرّفات الحقول بادئتها pf* لا pb/pl: لوحة الجاهزية تسكن الصفحة
      معها، و getElementById تُرجع الأول في ترتيب المستند — و#main
      يسبق #ready — فكان معالج النشر يُركَّب على مربّع نصّ الفقرة. */
function passageForm(p){
  const isNew = !p;
  const r = range(cur, 'passage_id');
  let pk = p?.kind && p.kind !== 'text' ? p.kind : null;   // نوع الوسيط المختار
  const main = document.getElementById("main");
  main.innerHTML = `
    <div class="card eq-pgbox">
      <div class="qnum">${isNew ? 'نصّ مشترك جديد' : 'تحرير النصّ المشترك'}
        · ${isNew ? span(r) : ''}</div>

      <label class="fl">العنوان <span style="opacity:.6">(اختياري)</span></label>
      <input id="pfTitle" value="${esc(p?.title || '')}" placeholder="Reading Passage 1">

      <div class="eq-tools" style="margin-top:14px">
        <button class="eq-tb" data-pw="**" title="غامق"><b>B</b></button>
        <button class="eq-tb" data-pw="_"  title="مائل"><i>I</i></button>
        <button class="eq-tb" data-pw="__" title="مسطَّر"><u>U</u></button>
        <span class="eq-sep"></span>
        <button class="eq-tb ${pk==='image'?'on':''}" data-pk="image">🖼️ صورة</button>
        <button class="eq-tb ${pk==='audio'?'on':''}" data-pk="audio">🎧 صوت</button>
        <button class="eq-tb ${pk==='video'?'on':''}" data-pk="video">🎬 فيديو</button>
        <span class="eq-hint">${SAFE_HOSTS}</span>
      </div>
      <textarea id="pfBody" style="min-height:240px"
        placeholder="ألصق الفقرة كاملة…">${esc(p?.body || '')}</textarea>

      <input id="pfMedia" dir="ltr" class="eq-md" value="${esc(p?.media || '')}"
             placeholder="${pk==='image'?'رابط الصورة':pk==='video'?'رابط الفيديو':'رابط المقطع الصوتي'}"
             ${pk ? '' : 'hidden'}>

      <label class="fl" style="margin-top:16px">اللغة</label>
      <select id="pfLang">
        <option value="ar" ${p?.lang!=='en'?'selected':''}>العربية</option>
        <option value="en" ${p?.lang==='en'?'selected':''}>English</option>
      </select>

      <div class="nav" style="margin-top:16px">
        <button class="btn primary" id="pfSave">${isNew ? 'إضافة وربط' : 'حفظ'}</button>
        <button class="btn ghost" id="pfCancel">إلغاء</button>
        ${!isNew && !p.used ? '<button class="btn ghost eq-del" id="pfDel">🗑 حذف</button>' : ''}
      </div>
    </div>`;

  main.querySelectorAll("[data-pw]").forEach(el =>
    el.onclick = () => wrapSel("pfBody", el.dataset.pw));
   
    /* pfMedia حقلٌ واحد يقبل صوتاً وصورةً وفيديو، والزرّ يرفع الصوت وحده —
     ولذلك يقول نصّه ذلك. وهو مخفيّ (hidden) حتى يُختار نوع الوسيط،
     فالزرّ يظهر معه. */
  attachUpload('pfMedia', 'q' + (Z?.id ?? ''));
   
  main.querySelectorAll("[data-pk]").forEach(el => el.onclick = () => {
    const keep = { title: main.querySelector("#pfTitle").value,
                   body:  main.querySelector("#pfBody").value,
                   media: main.querySelector("#pfMedia").value,
                   lang:  main.querySelector("#pfLang").value };
    const k = el.dataset.pk;
    passageForm({ ...(p || {}), ...keep, id: p?.id ?? null,
                  used: p?.used, position: p?.position,
                  kind: pk === k ? 'text' : k });
  });
  main.querySelector("#pfCancel").onclick = () => render();
  const pd = main.querySelector("#pfDel");
  if(pd) pd.onclick = () => delPassage(p.id);

  main.querySelector("#pfSave").onclick = async () => {
    const v = id => (main.querySelector('#' + id)?.value || '').trim();
    if(!v("pfBody") && !v("pfMedia")){ toast("النصّ يحتاج نصاً أو مقطعاً صوتياً"); return; }
    const { data, error } = await api.savePassage({
      id: p?.id ?? null, quiz: Z.id, title: v("pfTitle") || null,
      body: v("pfBody") || null, media: v("pfMedia") || null,
      kind: v("pfMedia") ? (pk || 'audio') : 'text',
      lang: v("pfLang") || 'ar',
      position: p?.position ?? ((Z.passages||[]).length + 1) });
    if(error){ toast(error.message); return; }
    if(!data.ok){ toast(data.error); return; }
    if(isNew){ await applyPassage(data.id); toast("أُضيف النصّ ورُبط"); return; }
    toast("حُفظ النصّ"); reload();
  };
}

async function delPassage(id){
  if(!confirm("حذف هذا النصّ المشترك؟")) return;
  const { data, error } = await api.deletePassage(id);
  if(error){ toast(error.message); return; }
  if(!data.ok){ toast(data.error); return; }
  toast("حُذف النصّ"); reload();
}


/* ═══════════ الجاهزية والنشر ═══════════
   🔒 معرّفاتها بادئتها rd* والبحث مقيَّد بـbox — فلا تعتمد على
      ترتيب الأعمدة في الصفحة. */

function readiness(){
  const box = document.getElementById("ready"); if(!box) return;
  const r = Z.readiness || { ok:false, mcq:0, essay:0, issues:[] };

  const rrow = (k, label, req) => {
    const n = k === 'mcq' ? (r.mcq || 0) : k === 'msq' ? (r.msq || 0) : (r.essay || 0);
    if(k === 'msq' && !n) return '';
    const s = kindStat(k);
    return `<div class="eq-rl ${LS.f===k?'on':''}" data-rf="${k}"
              title="اعرض هذا النمط وحده في شريط الأسئلة">
        <b>${AR(n)}</b> ${label}
        ${s.slots !== s.n ? `<span class="eq-rs">· ${AR(s.slots)} خانة</span>` : ''}
        ${req ? `<span class="eq-rq">(٦ مطلوبة)</span>` : ''}
      </div>
      ${req && n >= 6 && s.slots < 6 ? `<div class="eq-iss">⚠️ البوّابة تعدّ البنود
        (${AR(n)}) والطالب يرى ${AR(s.slots)} — وعتبة ٦٥٪ على هذا العدد هشّة.</div>` : ''}`;
  };

  box.innerHTML = `
    <div class="eq-h">الجاهزية</div>
    <div class="eq-ready ${r.ok?'ok':''}">
      ${rrow('mcq','اختيار من متعدد', true)}
      ${rrow('msq','اختيار متعدّد الإجابات', false)}
      ${rrow('essay','مقالي', false)}
      ${(r.issues||[]).length
        ? (r.issues||[]).map(i => `<div class="eq-iss">⚠️ ${esc(i)}</div>`).join("")
        : `<div class="eq-ok">${Z.published
             ? (ctx.lesson?.published ? '✅ منشور ويصل الطلاب' : '✅ منشور — بانتظار نشر الدرس')
             : '✅ جاهز للنشر'}</div>`}
    </div>
    <div class="nav" style="gap:8px;margin-top:12px">
      <button class="btn ${Z.published?'ghost':'primary'}" id="rdPub" ${r.ok?'':'disabled'}>
        ${Z.published ? 'إلغاء النشر' : 'نشر'}</button>
      <button class="btn ghost" id="rdPrev" title="عِش تجربة الطالب">👁️ معاينة</button>
    </div>
    <p class="hint" style="text-align:right;margin-top:10px">
      ${Z.published
        ? (ctx.lesson?.published
            ? 'منشور — يراه طلاب هذا الدرس.'
            : '⚠️ الاختبار منشور لكن <b>الدرس مسودّة</b> — فلا يصل أحداً.')
        : 'غير منشور — لا يظهر لأحد بعد.'}</p>
    ${Z.published && !ctx.lesson?.published
      ? `<div class="nav"><button class="btn primary" id="rdLsn">نشر الدرس أيضاً</button></div>` : ''}`;

  box.querySelector("#rdPrev").onclick = preview;

  const pl = box.querySelector("#rdLsn");
  /* ⚠️ pl.onclick = pubLesson كان يمرّر **حدث النقر** إلى quiet،
     فيصير صادقاً ⇒ لا إعادة تحميل ⇒ الزرّ يبقى بعد النشر. */
  if(pl) pl.onclick = () => pubLesson(false);

  box.querySelectorAll("[data-rf]").forEach(el =>
    el.onclick = () => setFilter(el.dataset.rf));

  box.querySelector("#rdPub").onclick = async () => {
    const { data, error } = await api.publishQuiz(Z.id, !Z.published);
    if(error){ toast(error.message); return; }
    if(!data.ok){ toast(data.error); return; }
    if(Z.published){ toast("أُلغي النشر"); reload(); return; }
    toast("نُشر الاختبار");
    /* اختبارٌ منشور داخل درسٍ مسودّة لا يصل أحداً — نسأل ولا نفترض */
    if(ctx.lesson && !ctx.lesson.published &&
       confirm("نُشر الاختبار.\n\nوالدرس ما زال مسودّة — فلن يظهر لأحد.\nأتنشر الدرس أيضاً؟")){
      await pubLesson(true);
    }
    reload();
  };
}

async function pubLesson(quiet){
  const { data, error } = await api.publishLesson(ctx.lesson.id, true);
  if(error){ toast(error.message); return; }
  if(!data.ok){ toast(data.error); return; }
  ctx.lesson.published = true;
  toast("نُشر الدرس — صار يظهر لطلابه");
  if(!quiet) reload();
}


/* ══════════════════════════════════════════════════════════
   ④ الشريط الهرميّ والمقارنة

   🔑 البنية شبكة لا شجرة: النصّ المشترك **صفّ** (كتلةٌ تُقرأ مرّة)
      والخانة **عمود** (مهارةٌ تُقاس)، والبند نقطة تقاطع. والشجرة
      تختار محوراً واحداً ⇒ العقدة هي الخانة، والنصّ شارة عليها.
      ولماذا لا العكس؟ لأن النصوص تتكرّر بالتصميم (ثلاثة متوازية)
      فتجميعٌ بها يُنتج ثلاث نسخٍ من الشاشة نفسها.

   🔴 والحكم ليس بصمة الفخاخ وحدها: fp() تُرجع [] للمقاليّ، فكانت
      المقارنة '' !== '' ⇒ false ⇒ «✅ متطابقة» لأيّ خانةٍ مقالية
      مهما تباعدت نسخُها. **صدقٌ فارغ** — والعلاج حالةٌ ثالثة:
      لا «متطابق» ولا «مختلف» بل **«لا مادّة للفحص»**.

   🔓 والشريط يُرسَم وحده بـ paintList — نظير repaint(q) في الاتجاه
      المعاكس. فالبحث والطيّ والفلترة لا تمسّ cur ولا dirty ولا
      بطاقة التحرير المفتوحة.
   ══════════════════════════════════════════════════════════ */

let LS = { open: new Set(), q: '', f: 'all', lastCur: -1 };

const members = k => (Z.questions || []).filter(x => x.variant_key === k);
const NOSEC   = '— بلا قسم —';

const F_LABEL = { mcq:'◉ اختيار من متعدد', msq:'☑ اختيار متعدّد الإجابات',
                  essay:'✍️ مقالي' };
const F_JUDGE = new Set(['all','warn','none','free']);   // ما يسكن الشريط نفسه

/* الحكم على الخانة — مصدرٌ واحد يخدم الشريط و variantBar والمقارنة.
   ويُفحص **الاتّساق** لا الحاجة: غياب النصّ المشترك في أسئلة الكتابة
   هو الصواب لا نقص. و❌ تنحصر فيما لا يحتمل تأويلاً. */
function verdict(ms){
  if(ms.length < 2) return { cls:'none', icon:'⬜', fails:['نسخة واحدة'] };
  if(new Set(ms.map(x => x.kind)).size > 1)
    return { cls:'bad', icon:'❌', fails:['نمطان مختلفان — لا يتكافآن'] };
  if(new Set(ms.map(x => x.section || '')).size > 1)
    return { cls:'bad', icon:'❌', fails:['الخانة تعبر قسمين — مهارتان'] };

  const fails = [];
  const withPg = ms.filter(x => x.passage_id).length;
  const pgs    = new Set(ms.filter(x => x.passage_id).map(x => String(x.passage_id)));
  if(withPg && withPg < ms.length)
    fails.push('بعضها بنصّ وبعضها بلا نصّ — سياقان مختلفان');
  else if(withPg === ms.length && pgs.size < ms.length)
    fails.push('نسختان تحت نصّ واحد — لا تُغنيان عن قراءته مرّتين');

  /* ⚠️ الحالة الثالثة: بلا خيارات فلا بصمة — ولا يُمنح ✅ على فحصٍ لم يقع */
  if(!ms.every(x => (x.options || []).length))
    return fails.length
      ? { cls:'warn', icon:'⚠️', fails, manual:true }
      : { cls:'none', icon:'⬜', manual:true,
          fails:['لا فحص آليّ للمقاليّ — التكافؤ حكمُك أنت'] };

  if(new Set(ms.map(x => fp(x).join('·'))).size > 1)
    fails.push('الفخاخ غير متطابقة — صحّح الخيار لا الكود');
  if(new Set(ms.map(x => x.difficulty || 'medium')).size > 1)
    fails.push('الصعوبة مختلفة');

  return fails.length ? { cls:'warn', icon:'⚠️', fails }
                      : { cls:'ok',   icon:'✅', fails:[] };
}

/* ═══════════ بناء الشجرة ═══════════ */

/* Map لا كائن: المفتاح نصٌّ من عند المؤلّف — و«constructor» اسمُ قسمٍ صالح */
function groups(){
  const g = new Map();
  (Z.questions || []).forEach((q, i) => {
    const k = q.section || NOSEC;
    if(!g.has(k)) g.set(k, []);
    g.get(k).push(i);
  });
  return g;
}

/* عُقَدُ القسم: خانةٌ واحدة لكل مفتاح، وسؤالٌ حرٌّ لكل بندٍ بلا مفتاح */
function nodes(idxs){
  const out = [], seen = new Map();
  for(const i of idxs){
    const k = Z.questions[i].variant_key;
    if(!k){ out.push({ t:'q', i }); continue; }
    if(!seen.has(k)){ const n = { t:'v', key:k, idx:[] }; seen.set(k, n); out.push(n); }
    seen.get(k).idx.push(i);
  }
  return out;
}

const kIcon = k => k === 'essay' ? '✍️' : k === 'msq' ? '☑' : '◉';

function stats(){
  const qs = Z.questions || [];
  const keys = [...new Set(qs.map(x => x.variant_key).filter(Boolean))];
  let warn = 0, none = 0;
  keys.forEach(k => { const v = verdict(members(k));
    if(v.cls === 'warn' || v.cls === 'bad') warn++; else if(v.cls === 'none') none++; });
  const free = qs.filter(x => !x.variant_key).length;
  return { n: qs.length, slots: keys.length + free, warn, none, free };
}

/* 🔴 عدّ الخانات — ما يراه الطالب.
   quiz_readiness تعدّ **البنود**، ومجموعها مجموع المؤلَّف كله.
   والفرق بين الرقمين هو ما كان مخفيّاً، وبوّابة «٦ مطلوبة» تقيس الأول. */
function kindStat(k){
  const qs = (Z.questions || []).filter(x => x.kind === k);
  const slots = new Set(qs.map((x, i) => x.variant_key || ('q' + (x.id ?? 'n' + i)))).size;
  return { n: qs.length, slots };
}

function nodePass(n){
  const f = LS.f, s = LS.q.trim().toLowerCase();
  const qs = n.t === 'q' ? [Z.questions[n.i]] : n.idx.map(i => Z.questions[i]);
  if(s && !/^\d+$/.test(s) && !qs.some(x => (x.body || '').toLowerCase().includes(s)))
    return false;
  if(f === 'all')  return true;
  if(f === 'free') return n.t === 'q';
  if(f === 'mcq' || f === 'msq' || f === 'essay') return qs.some(x => x.kind === f);
  if(n.t !== 'v')  return false;
  const v = verdict(members(n.key));
  if(f === 'warn') return v.cls === 'warn' || v.cls === 'bad';
  if(f === 'none') return v.cls === 'none';
  return true;
}

/* ═══════════ الرسم ═══════════ */

function sidebar(){
  const qs = Z.questions || [];
  const st = stats();
  const pg = new Map((Z.passages || []).map((p, i) => [String(p.id), i + 1]));

  /* الانتقال يفتح مظروفَ السؤال — والطيّ اليدويّ يبقى بعده */
  if(LS.lastCur !== cur){
    const q = qs[cur];
    if(q){
      LS.open.add('s:' + (q.section || NOSEC));
      if(q.variant_key) LS.open.add('v:' + q.variant_key);
    }
    LS.lastCur = cur;
  }

  const searching = !!LS.q.trim() || LS.f !== 'all';
  const fb = (k, label, n, cls) => `<button class="eq-fb ${cls || ''} ${LS.f===k?'on':''}"
      data-f="${k}">${label}${n !== undefined ? ' ' + AR(n) : ''}</button>`;

  const qRow = i => {
    const x = qs[i];
    return `<div class="eq-item ${i===cur?'on':''}" data-i="${i}">
      <span class="eq-n">${AR(i+1)}</span>
      <span class="eq-b" dir="auto">${esc((x.body||'').slice(0,38) || '—')}</span>
      <span class="eq-k">${x.passage_id?'📖':''}${kIcon(x.kind)}</span></div>`;
  };

  const vRow = n => {
    const ms    = members(n.key);
    const v     = verdict(ms);
    const open  = LS.open.has('v:' + n.key) || searching;
    const here  = n.idx.includes(cur);
    const first = qs[n.idx[0]];              // لا تسمَّ head: مستوردةٌ من ui.js
    return `<div class="eq-var ${here?'on':''}">
      <div class="eq-vh" data-v="${esc(n.key)}">
        <span class="eq-ar">${open?'▾':'▸'}</span>
        <span class="eq-vk">⇄ ${esc(n.key)} · ${AR(ms.length)}</span>
        <span class="eq-vb" dir="auto">${esc((first.body||'').slice(0,30) || '—')}</span>
        <span class="eq-flag ${v.cls}" data-cmp="${esc(n.key)}"
              title="قارِن نسخ الخانة" style="cursor:pointer">${v.icon}</span>
      </div>
      ${open ? `<div class="eq-subs">
        ${n.idx.map(i => `<span class="eq-sub ${i===cur?'on':''}" data-i="${i}">
            ${AR(i+1)}${qs[i].passage_id ? ' 📖'+AR(pg.get(String(qs[i].passage_id))||0) : ''}
          </span>`).join('')}
        <span class="eq-sub" data-cmp="${esc(n.key)}">⇄ قارِن</span>
      </div>` : ''}</div>`;
  };

  let body = '';
  for(const [sec, idxs] of groups()){
    const ns = nodes(idxs).filter(nodePass);
    if(!ns.length) continue;
    const open = LS.open.has('s:' + sec) || searching;
    const slots = new Set(idxs.map(i => qs[i].variant_key || ('q' + i))).size;
    const pgs = [...new Set(idxs.map(i => qs[i].passage_id).filter(Boolean).map(String))];

    body += `<div class="eq-grp" data-s="${esc(sec)}">
        <span class="eq-ar">${open?'▾':'▸'}</span>
        <span class="eq-gt" dir="auto">${esc(sec)}</span>
        <span class="eq-gc">${AR(idxs.length)} · ${AR(slots)} خانة</span></div>`;
    if(!open) continue;
    if(pgs.length) body += `<div class="eq-pgs">${pgs.map(id =>
        `<span class="eq-pgc" data-pg="${esc(id)}">📖 ${AR(pg.get(id)||0)}
          ${esc(((Z.passages||[]).find(p => String(p.id)===id)?.title) || 'نصّ مشترك')}
        </span>`).join('')}</div>`;
    body += ns.map(n => n.t === 'q' ? qRow(n.i) : vRow(n)).join('');
  }

  return `<div class="eq-top">
      <div class="eq-h">الأسئلة <span class="chip">${AR(st.n)}</span>
        <span class="chip g">${AR(st.slots)} خانة</span></div>
      <input class="eq-sr" id="lsq" value="${esc(LS.q)}"
             placeholder="ابحث في النصّ · أو اكتب رقماً واضغط Enter">
      <div class="eq-f">
        ${fb('all','الكل', st.n)}
        ${fb('warn','⚠️ يحتاج نظرة', st.warn, 'warn')}
        ${fb('none','⬜ بلا فحص', st.none)}
        ${fb('free','بلا خانة', st.free)}
      </div>
      ${F_JUDGE.has(LS.f) ? '' : `<button class="eq-chipf" id="lclr">
        <span>${esc(F_LABEL[LS.f] || LS.f)}</span>
        <span style="margin-inline-start:auto">✕</span></button>`}
      <div class="eq-adds">
               <div class="addwrap">
          <button class="eq-ab" id="addq" title="أضف سؤالاً">＋</button>
          <div class="addmenu" id="addmenu" hidden>
                      <button data-k="mcq"><i>◉</i><div><b>اختيار من متعدد</b><span>إجابةٌ واحدة صحيحة</span></div></button>
            <button data-k="msq"><i>☑</i><div><b>اختيار متعدّد</b><span>أكثر من إجابةٍ صحيحة</span></div></button>
            <button data-k="gap"><i>✎</i><div><b>إكمال الناقص</b><span>يكتب الطالب الإجابة</span></div></button>
            <button disabled><i>⇢</i><div><b>إكمال من قائمة</b><span>قريباً — يختار من كلماتٍ مُعطاة</span></div></button>
            <button disabled><i>⇄</i><div><b>المزاوجة</b><span>قريباً — يربط عنصراً بعنصر</span></div></button>
            <hr>
            <button data-k="essay"><i>¶</i><div><b>مقالي قصير</b><span>يصحّحه المعلّم</span></div></button>
          </div>
        </div>
        <button class="eq-ab" id="imp"   title="استيراد">⇪</button>
      </div>
    </div>
    <div class="eq-body" id="lbody">${body ||
      '<div class="eq-none">لا سؤال يطابق البحث أو الفلتر</div>'}</div>`;
}

/* الشريط وحده — فلا يفقد الوسط ما فيه */
function paintList(){
  const box = app.querySelector('.eq-list');
  if(!box) return;
  box.innerHTML = sidebar();
  wireList();
  box.querySelector('.eq-sub.on, .eq-item.on')?.scrollIntoView({ block:'nearest' });
}

function wireList(){
  const box = app.querySelector('.eq-list');
  if(!box) return;

  const sr = box.querySelector("#lsq");
  if(sr){
    sr.oninput = e => {
      const p = e.target.selectionStart;
      LS.q = e.target.value; paintList();
      const n = app.querySelector('.eq-list #lsq');
      if(n){ n.focus(); n.setSelectionRange(p, p); }
    };
    sr.onkeydown = e => {
      if(e.key !== 'Enter') return;
      const m = /^\d+$/.exec(LS.q.trim());
      if(!m) return;
      const i = +m[0] - 1;
      if(i >= 0 && i < (Z.questions||[]).length){ LS.q = ''; go(i); }
      else toast("لا سؤال بهذا الرقم");
    };
  }

  box.querySelectorAll("[data-f]").forEach(el =>
    el.onclick = () => setFilter(el.dataset.f));
  const cl = box.querySelector("#lclr");
  if(cl) cl.onclick = () => setFilter(LS.f);     // نقضٌ لنفسه ⇒ 'all'

  box.querySelectorAll("[data-s]").forEach(el => el.onclick = () => {
    const k = 's:' + el.dataset.s;
    LS.open.has(k) ? LS.open.delete(k) : LS.open.add(k); paintList(); });
  box.querySelectorAll(".eq-vh").forEach(el => el.onclick = () => {
    const k = 'v:' + el.dataset.v;
    LS.open.has(k) ? LS.open.delete(k) : LS.open.add(k); paintList(); });

  /* ⚠️ الحكم داخل الرأس — فلولا إيقاف الفقاعة لطوى المظروفَ معه */
  box.querySelectorAll("[data-cmp]").forEach(el => el.onclick = e => {
    e.stopPropagation(); compareVariant(el.dataset.cmp); });
  box.querySelectorAll("[data-i]").forEach(el => el.onclick = e => {
    e.stopPropagation(); go(+el.dataset.i); });
  box.querySelectorAll("[data-pg]").forEach(el => el.onclick = () => {
    const i = (Z.questions||[]).findIndex(x => String(x.passage_id) === el.dataset.pg);
    if(i >= 0) go(i);
  });

    const ab = box.querySelector("#addq"), am = box.querySelector("#addmenu");
   ab.onclick = e => {
    e.stopPropagation();
    if(!am.hidden){ am.hidden = true; return; }
    const r = ab.getBoundingClientRect();
    am.style.top  = (r.bottom + 6) + 'px';
    am.style.left = Math.max(8, Math.min(r.left, innerWidth - 300)) + 'px';
    am.hidden = false;
  };
   am.querySelectorAll("[data-k]").forEach(el =>
    el.onclick = () => { am.hidden = true; addQuestion(el.dataset.k); });
  // نقرةٌ خارج القائمة تطويها — وإلا بقيت مفتوحةً تحجب ما تحتها
  document.addEventListener('click', () => { am.hidden = true; }, { capture:true });
  box.querySelector("#imp").onclick   = importBox;
  const i0 = document.getElementById("imp0");      // في البطاقة الفارغة وسط الشاشة
  if(i0) i0.onclick = importBox;
}

/* زنادٌ واحد لمصدرين: صفّ الشريط ولوحة الجاهزية.
   والنقر على الفلتر الفعّال يُلغيه — فلا يحتاج المستخدم زرّ إلغاءٍ ثانياً. */
function setFilter(k){
  LS.f = (LS.f === k) ? 'all' : k;
  paintList(); readiness();
}

/* الوجهة بطاقةُ التحرير لا رأس الصفحة.
   والإزاحة تحت الشريط في CSS (.eq-main{scroll-margin-top}) — فعلوّ الشريط
   شأنُ CSS، ورقمٌ في جافاسكربت يصف مقاساً في CSS ينكسر صامتاً حين يتغيّر. */
function focusMain(){
  document.getElementById("main")?.scrollIntoView({ behavior:'smooth', block:'start' });
}

/* ═══════════ مقارنة نسخ الخانة ═══════════
   الحارس الوحيد للمقاليّ — إذ لا بصمة تُفحص فيه.
   وأقصى ما تفعله الشاشة: تُحضِر المادّة كاملةً في مجالٍ بصريّ واحد.
   والحكم بعد ذلك بشريّ: أيقع الطالب في هذا وذاك **للسبب نفسه**؟ */

function compareVariant(key){
  if(!key){ toast("هذا السؤال بلا خانة"); return; }
  if(dirty && !confirm("تغييرات غير محفوظة في هذا السؤال — أتتركها؟")) return;
  const ms = members(key).sort((a,b) => (a.position||0) - (b.position||0));
  if(ms.length < 2){ toast("الخانة نسخةٌ واحدة"); return; }

  const v   = verdict(ms);
  const pgN = id => (Z.passages||[]).find(p => String(p.id) === String(id));
  /* كودٌ لا يظهر في كل النسخ ⇒ يُعلَّم: هو موضع الاختلاف بعينه */
  const all = ms.map(x => new Set(fp(x)));
  const odd = c => !all.every(s => s.has(c));

  const col = x => `
    <div class="cmp-col ${x.id === (Z.questions[cur]||{}).id ? 'on' : ''}">
      <div class="cmp-h">
        <span class="cmp-p">${AR(x.position)} · ${kIcon(x.kind)}</span>
        ${x.passage_id
          ? `<span class="chip g" dir="auto">📖 ${esc(pgN(x.passage_id)?.title || 'نصّ')}</span>`
          : `<span class="chip">بلا نصّ</span>`}
        <button class="it-b" data-cmed="${x.id}" style="margin-inline-start:auto">✏️ حرّر</button>
      </div>
      <div class="cmp-q" dir="auto">${fmt(x.body || '—')}</div>
      ${(x.options||[]).length ? `
        <div class="cmp-lb">الخيارات وأكوادها</div>
        ${(x.options||[]).map((o,j) => `
          <div class="cmp-o ${o.correct?'ok':''}" dir="${dirOf(o.body)}">
            <span class="key">${esc(optLabel(o,j))}</span>
            <span class="cmp-tx">${fmt(o.body || '—')}</span>
            ${o.dx ? `<span class="cmp-dx ${odd(o.dx)?'cmp-mark':''}">${esc(dxName(o.dx))}</span>`
                   : (o.correct ? '' : '<span class="cmp-dx cmp-mark">بلا كود</span>')}
          </div>`).join('')}
        <div class="cmp-lb">شرح الخطأ</div>
        <div class="cmp-note" dir="auto">${esc(x.explanation || '—')}</div>`
      : `<div class="cmp-lb">الإجابة النموذجية</div>
         <div class="cmp-note" dir="auto">${fmt(x.model || '—')}</div>`}
    </div>`;

  document.getElementById("main").innerHTML = `
    <div class="card">
      <div class="qnum">⇄ خانة ${esc(key)} · ${AR(ms.length)} نسخ</div>
      <div class="eq-bar ${v.cls==='ok'?'pg':'sec'}">
        <div class="eq-brow"><span class="eq-bt">${v.icon} ${
          v.cls==='ok' ? 'متّسقة فيما يُفحص آلياً'
        : v.cls==='none' ? 'لا فحص آليّ' : 'تحتاج نظرة'}</span></div>
        ${(v.fails||[]).map(f => `<div class="eq-bs" style="margin-top:6px">· ${esc(f)}</div>`).join('')}
      </div>
      <div class="cmp-note" style="margin:10px 0 14px">
        الشاشة تُحضِر المادّة ولا تحكم. والسؤال الأخير حكمُك:
        <b>أيقع الطالب في مشتّت هذه وفي مشتّت تلك للسبب نفسه؟</b>
        وبصمةٌ متطابقة قد تُخفي مشتّتاً جذّاباً وآخر ميتاً.</div>
    </div>
    <div class="cmp" style="grid-template-columns:repeat(${ms.length},minmax(0,1fr))">
      ${ms.map(col).join('')}
    </div>
    <div class="nav" style="margin-top:14px">
      <button class="btn ghost" id="cmpb">رجوع إلى التحرير</button>
    </div>`;

  const main = document.getElementById("main");
  main.querySelector("#cmpb").onclick = () => render();
  main.querySelectorAll("[data-cmed]").forEach(el => el.onclick = () => {
    const i = (Z.questions||[]).findIndex(x => x.id === +el.dataset.cmed);
    if(i >= 0) go(i);
  });
  scrollTop();
}
