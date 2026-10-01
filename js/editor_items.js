/* ══════════════════════════════════════════════════════════
   بيان — editor_items.js  ②  مصادر الدرس

   قسمان لا يختلطان:
     📦 المصادر المعتمدة  — تُحسب في البوّابة وشرط الانتقال
      إضافات المعلمين   — إثراء لا يحجب · باسم مؤلّفه

   الأنماط تُقرأ من item_kinds عبر author_tree — فإضافة نمط
   جديد سطرٌ في القاعدة، لا نشرٌ للواجهة.
   ══════════════════════════════════════════════════════════ */
import * as api from './api.js';
import { S } from './state.js';
import { app, head, toast, esc, AR, errBox, nav, setWide, scrollTop } from './ui.js';
import { attachUpload } from './upload.js';
import { openCourse } from './editor.js';
import { openQuiz, openQuizPreview } from './editor_quiz.js';

let ctx = null;   // { course, lesson }
let D   = null;   // { ok, curate, items }


export async function openItems(course, lesson){
  ctx = { course, lesson };
  nav('editor'); setWide(true);
  head("مصادر الدرس", lesson.title);
  app.innerHTML = `<div class="status">جار التحميل…</div>`;

  const { data, error } = await api.lessonItems(lesson.id);
  if(error){ app.innerHTML = errBox(error, 'مصادر الدرس'); return; }
  if(!data.ok){ app.innerHTML = errBox({ message: data.error }, 'مصادر الدرس'); return; }
  D = data;
  render();
}

const kinds = () => (S.tree?.kinds) || [];
const kind  = c => kinds().find(k => k.code === c) || { icon:'•', label:c, needs:'url' };

/* 🔑 القفل يُرسم بحارس القاعدة لا بظنّ الواجهة — قُرئ الحيُّ في ١ أكتوبر ٢٠٢٦،
   وهو **حارسان لا حارسٌ واحد**، فلا يُجمعان في شرطٍ واحد:
     · save_item     : المعتمد ⇐ is_admin()    · الإضافي ⇐ صاحبه
     · can_edit_quiz : المعتمد ⇐ can_curate    · الإضافي ⇐ صاحبه أو مدير
       (وإليها ترجع retire_question — وهي بابُ تحرير الأسئلة فعلاً)
     · delete_item   : المعتمد ⇐ can_curate    · الإضافي ⇐ صاحبه
   ⚠️ ومن ثَمّ: مشرفٌ غيرُ مدير **يحذف المصدر المعتمد ولا يُعدِّله**، ويحرّر
      أسئلته. فجوةٌ في القاعدة لا في الشاشة — تُرى هنا ولا تُخفى، وعلاجها
      قرارٌ يُناقَش لا يُفترَض.
   ومن لا يملك التعديل لا يُفتح له بابٌ ثمّ يُردّ خلفه — بل يُقفل البابُ
   أمامه ويُفتح له شبّاك: معاينةٌ تُري ولا تُغيِّر. */
const isAdmin  = () => S.roleInfo?.role === 'admin';
const canEdit  = i => i.official ? isAdmin()  : !!i.mine;   // مصدرٌ عاديّ
const canEditQ = i => i.official ? !!D.curate : !!i.mine;   // أسئلةُ اختبار

/* 🏷️ ولفظٌ واحد لا يسع المعنيين: المعتمد **اختبارٌ تشخيصي** يُحتسب في
   البوّابة ويحجب الانتقال، والإضافي **تدريبٌ** لا يُحتسب ولا يحجب —
   وتسميتُه اختباراً تَعِد الطالبَ بما لا يقع وتُفزعه بما ليس بفَزَع.
   ⚠️ والنمط في القاعدة يبقى `quiz` — شاشةُ الطالب تتفرّع على كوده
      (`student.js` · `i.kind==='quiz'`) — فالفرقُ في اللفظ لا في الكود،
      وسطرٌ جديد في `item_kinds` كان يكسر الطالبَ صامتاً. */
const kLabel = (label, needs, official) =>
  (needs === 'quiz' && !official) ? 'تدريب' : (label || '');

/* ومن يملكه يُسمَّى باسمه: «فريق الإشراف» على المعتمد كذبٌ لو كان
   المصدر من تأليف زميل — وتنويهٌ يكذب أسوأ من تنويهٍ لا يكون.
   ⚠️ ويُكتب داخل `title="…"` و`esc` لا تمسّ علامة التنصيص — فتُبدَّل هنا. */
const owner = i => i.official ? 'فريق الإشراف'
                 : (i.author ? 'أ. ' + esc(i.author).replace(/"/g, '&quot;') : 'مؤلّفه');


/* ═══════════ القائمة ═══════════ */

function render(){
  const off = (D.items || []).filter(i => i.official);
  const ext = (D.items || []).filter(i => !i.official);

  const row = (i, idx, n) => `
    <div class="it-row" data-i="${i.id}">
      <div class="itm-ic">${esc(i.icon || '•')}</div>
      <div style="flex:1;min-width:0">
        <div class="ed-t">${esc(i.title)}</div>
        <div class="ed-m">
          <span class="chip">${esc(kLabel(i.label, i.needs, i.official) || i.kind)}</span>
          ${i.is_graded ? '<span class="chip g">⭐ يُحتسب في البوّابة</span>' : ''}
          ${i.required && !i.is_graded ? '<span class="chip">إلزامي</span>' : ''}
          ${i.duration ? `<span class="chip">${AR(i.duration)} د</span>` : ''}
          ${i.author ? `<span class="chip">أ. ${esc(i.author)}</span>` : ''}
          ${/* 🆕 b87 · reviewed كانت تصل من lesson_items ولا تُقرأ.
                والشارة تُضاف ولا تُبدِّل — بجانب اسم المؤلّف لا مكانه.
                وبعبارة شاشة الطالب نفسِها: لفظٌ واحد لمعنًى واحد. */''}
          ${i.reviewed ? '<span class="chip">اعتمدته بيان</span>' : ''}
          ${/* 🔴 ١٣٣ · اختبارٌ غير منشور لا يبلغ الطالبَ أبداً (can_access
                تردّ كلَّ `published is not true`) — والمعلّم يضيف ويطمئنّ.
                `quiz_published` يصل `null` لمن لا اختبار له، و`false` قبل
                النشر ⇒ المقارنة صريحة لا منفيّة، فلا تُشعل الشارةَ غيابُ
                الحقل قبل تطبيق الهجرة. */''}
          ${i.quiz_published === false
            ? '<span class="chip w">⚠️ لم يُنشر — لا يراه الطالب</span>' : ''}
          ${i.touched ? `<span class="chip">تفاعل ${AR(i.touched)}</span>` : ''}
        </div>
      </div>
      ${i.official && D.curate ? `<span class="it-ord">
        <button class="it-b" data-up="${i.id}" ${idx===0?'disabled':''}>▲</button>
        <button class="it-b" data-dn="${i.id}" ${idx===n-1?'disabled':''}>▼</button></span>` : ''}
      ${i.kind === 'quiz'
        ? (canEditQ(i)
          ? `<button class="eq-go" data-quiz="${i.quiz_id}">📝 تحرير الأسئلة</button>`
          : `<button class="eq-go lk" data-pvq="${i.quiz_id}"
               title="الأسئلة يحرّرها ${owner(i)} — وهذه معاينة بعين الطالب"
               >🔒 معاينة الأسئلة</button>`)
        : (canEdit(i)
          ? `<button class="it-b wide" data-ed="${i.id}">✏️ تحرير</button>`
          : `<button class="it-b wide lk" data-pv="${i.id}"
               title="هذا المصدر يعدّله ${owner(i)} — وهذه معاينة"
               >🔒 معاينة</button>`)}
      ${(i.official ? D.curate : i.mine) && !i.touched
        ? `<button class="it-b" data-rm="${i.id}">🗑</button>` : ''}
    </div>`;

  app.innerHTML = `
    <div class="crumb" id="bk">← دروس المقرَّر</div>

    <div class="grp">📦 المصادر المعتمدة <span class="chip">${AR(off.length)}</span></div>
    ${off.length ? off.map((i,x) => row(i,x,off.length)).join("")
                 : '<div class="ed-empty">لا مصادر معتمدة بعد</div>'}
    ${D.curate ? `<div class="nav" style="margin-top:12px">
        <button class="btn primary" id="add">＋ إضافة مصدر</button>
      </div>` : ''}

    ${ext.length ? `<div class="grp" style="margin-top:26px">➕ إضافات المعلمين
        <span class="chip">${AR(ext.length)}</span></div>
      ${ext.map((i,x) => row(i,x,ext.length)).join("")}
      <p class="hint" style="text-align:right">لا تُحتسب في البوّابة ولا تحجب الانتقال —
        ونتائجها تُسجَّل في سجلّ الطالب.</p>` : ''}

    ${!D.curate ? `<div class="nav" style="margin-top:16px">
        <button class="btn primary" id="addx">＋ إضافة مصدر باسمي</button>
      </div>` : ''}`;

  document.getElementById("bk").onclick = () => openCourse(ctx.course);
  const a1 = document.getElementById("add");  if(a1) a1.onclick = () => form(null, true);
  const a2 = document.getElementById("addx"); if(a2) a2.onclick = () => form(null, false);

  app.querySelectorAll("[data-ed]").forEach(el => el.onclick = () =>
    form(D.items.find(x => String(x.id) === el.dataset.ed)));
  app.querySelectorAll("[data-pv]").forEach(el => el.onclick = () =>
    form(D.items.find(x => String(x.id) === el.dataset.pv), undefined, true));
  app.querySelectorAll("[data-quiz]").forEach(el => el.onclick = () =>
    openQuiz(ctx.course, { ...ctx.lesson, quiz_id: +el.dataset.quiz, has_quiz:true }));
  app.querySelectorAll("[data-pvq]").forEach(el => el.onclick = () =>
    openQuizPreview(ctx.course, { ...ctx.lesson, quiz_id: +el.dataset.pvq, has_quiz:true }));
  app.querySelectorAll("[data-rm]").forEach(el => el.onclick = () => remove(+el.dataset.rm));
  app.querySelectorAll("[data-up]").forEach(el => el.onclick = () => move(+el.dataset.up, -1));
  app.querySelectorAll("[data-dn]").forEach(el => el.onclick = () => move(+el.dataset.dn, +1));
  scrollTop();
}


/* ═══════════ النموذج ═══════════ */

function form(item, official, ro){
  const isNew = !item;
  const off   = isNew ? official : item.official;
  let k = kind(item?.kind || 'pdf');
  const dis = ro ? ' disabled' : '';     // الحقول تُقرأ ولا تُكتب

  const draw = () => {
    app.innerHTML = `
      <div class="crumb" id="bk">← مصادر الدرس</div>
      <div class="ed-form">
        <div class="ed-side">
          <div class="ed-hint">${off
            ? '📦 <b>مصدر معتمد</b> — جزء من المنهج، ويمكن أن يكون شرط انتقال.'
            : '➕ <b>مصدر إضافي باسمك</b> — إثراء لا يحجب ولا يدخل البوّابة.'}</div>
          ${ro ? `<div class="warnbox">🔒 <b>معاينة</b> — هذا المصدر ${off
            ? 'يعدّله فريق الإشراف' : 'من تأليف زميلٍ لك'}، فيُقرأ هنا ولا يُحفظ.</div>` : ''}
          ${k.needs === 'url' ? `<div class="ed-hint" style="opacity:.75">
            <b>الصوت:</b> يُرفع إلى المخزن ثمّ يُلصق مفتاحه — <code>audio/l1-a1.mp3</code>
            — فيُشغَّل داخل الدرس.<br>
            ${k.code === 'simulation'
              ? '<b>المحاكاة:</b> ملفّ مستقلّ في مستودع الموقع نفسه — الصق مساره النسبي (مثلاً <code>sims/الاسم.html</code>) أو رابطه الكامل. يُضمَّن داخل الدرس، لا يُفتح في تبويب. زرّ الرفع أعلاه للصوت وحده — تجاهله هنا.'
              : '<b>غيره:</b> رابط يُفتح في تبويب جديد. تأكّد أنه متاح للطلاب.'}</div>` : ''}
        </div>

        <div class="card" style="flex:1">
          <label class="fl">نوع المصدر</label>
          <div class="it-kinds">
            ${kinds().map(x => `<button class="it-k ${x.code===k.code?'on':''}"
                data-k="${x.code}"${dis}>${x.icon}<span>${esc(
                  kLabel(x.label, x.needs, off))}</span></button>`).join("")}
          </div>

          <label class="fl" style="margin-top:18px">العنوان *</label>
          <input type="text" id="ti" value="${esc(item?.title || '')}"${dis}
                 placeholder="مثال: ${esc(kLabel(k.label, k.needs, off))} — الغلاف المائي">

          ${k.needs === 'url' ? `
            <label class="fl" style="margin-top:16px">الرابط *</label>
            <input type="text" id="ur" dir="ltr" value="${esc(item?.url || '')}"${dis}
                     placeholder="audio/l1-a1.mp3  أو  https://…">` : ''}
          ${k.needs === 'body' ? `
            <label class="fl" style="margin-top:16px">النصّ *</label>
            <textarea id="bo" style="min-height:150px"${dis}>${esc(item?.body || '')}</textarea>` : ''}
          ${k.needs === 'quiz' ? (off ? `
            <div class="warnbox" style="margin-top:16px">اختبار الدرس يُنشأ من زرّ
              «الاختبار» في قائمة الدروس — فيُربط ويصير شرط الانتقال تلقائياً.</div>` : `
            <div class="warnbox" style="margin-top:16px">تدريبٌ باسمك — لا يُحتسب في
              البوّابة ولا يحجب الانتقال، ونتائجه تُسجَّل في سجلّ الطالب.<br>
              ${isNew ? 'يُنشأ بالعنوان أعلاه، ثمّ تُفتح شاشةُ الأسئلة مباشرةً.'
                      : 'وأسئلته تُحرَّر من زرّ «تحرير الأسئلة» في قائمة المصادر.'}</div>`) : ''}

          <label class="fl" style="margin-top:16px">وصف موجز <span style="opacity:.6">(اختياري)</span></label>
          <input type="text" id="de" value="${esc(item?.description || '')}"${dis}>

          <div class="ed-3">
            <div>
              <label class="fl">المدّة (دقيقة)</label>
              <input type="text" id="du" inputmode="numeric" value="${item?.duration ?? ''}"${dis}>
            </div>
            ${off ? `<div>
              <label class="fl">إلزامي</label>
              <select id="rq"${dis}>
                <option value="0" ${item?.required?'':'selected'}>اختياري</option>
                <option value="1" ${item?.required?'selected':''}>شرط لإتمام الدرس</option>
              </select></div>` : ''}
            <div>
              <label class="fl">اللغة</label>
              <select id="ln"${dis}>
                <option value="ar" ${item?.lang!=='en'?'selected':''}>العربية</option>
                <option value="en" ${item?.lang==='en'?'selected':''}>English</option>
              </select>
            </div>
          </div>
        </div>
      </div>
      ${ro ? '' : `<div class="nav" style="margin-top:16px">
        <button class="btn primary" id="sv" ${k.needs==='quiz' && off ?'disabled':''}>
          ${isNew ? 'إضافة' : 'حفظ'}</button>
      </div>`}`;

    document.getElementById("bk").onclick = () => render();
      // ctx.lesson لا S.lesson
    if(!ro) attachUpload('ur', 'l' + (ctx.lesson?.id ?? ''));
    app.querySelectorAll("[data-k]").forEach(el => el.onclick = () => {
      if(!isNew) return;                    // النمط لا يتغيّر بعد الإنشاء
      k = kind(el.dataset.k); draw();
    });
    const sv = document.getElementById("sv");
    if(sv) sv.onclick = () => save(item, off, k);
  };
  draw();
}

async function save(item, official, k){
  const v = id => (document.getElementById(id)?.value || '').trim();
  const ti = v("ti");
  if(!ti){ toast("العنوان مطلوب"); return; }
  if(k.needs === 'url'  && !v("ur")){ toast(k.label + " يحتاج رابطاً"); return; }
  if(k.needs === 'body' && !v("bo")){ toast(k.label + " يحتاج نصاً"); return; }

  /* 🆕 تدريبٌ باسم المعلّم — خطوتان لا خطوة: الاختبار يُخلق أوّلاً
     (`save_quiz` · official=false ⇒ created_by = صاحبُه ⇒ يملك تحريره)،
     ثمّ يُدرَج مصدراً إضافياً يحمل مفتاحه. والمعتمد يبقى على بابه الأوّل:
     زرّ «الاختبار» في قائمة الدروس، فهو شرط انتقالٍ لا إثراء.
     🔴 ولو أُدرج البندُ قبل أن يُخلق الاختبار لصار مصدراً بلا وجهة —
        فالترتيب شرطٌ لا تفصيل. */
  let quizId = item?.quiz_id ?? null;
  if(k.needs === 'quiz'){
    if(official){ toast("الاختبار المعتمد يُنشأ من زرّ «الاختبار» في قائمة الدروس"); return; }
    if(!quizId){
      const q = await api.saveQuiz({ course: ctx.course.id, title: ti, official: false });
      if(q.error){ toast(q.error.message); return; }
      if(!q.data.ok){ toast(q.data.error); return; }
      quizId = q.data.id;
    }
  }

  const req = official && document.getElementById("rq")?.value === '1';
  const { data, error } = await api.saveItem({
    id: item?.id ?? null, lesson: ctx.lesson.id, kind: k.code, title: ti,
    description: v("de") || null,
    url: k.needs === 'url' ? v("ur") : null,
    body: k.needs === 'body' ? v("bo") : null,
    quiz: quizId,
    position: item?.position ?? ((D.items || []).length + 1),
    duration: v("du") ? Number(v("du")) : null,
    lang: v("ln") || 'ar',
    official, isGraded: false, required: req,
    visibility: official ? 'class' : 'class' });

  if(error){ toast(error.message); return; }
  if(!data.ok){ toast(data.error); return; }

  /* وتدريبٌ بلا أسئلة لا معنى له — فشاشةُ الأسئلة تُفتح في الحال،
     ولا يُترك المعلّم يبحث عن بابها في قائمةٍ رجع إليها. */
  if(k.needs === 'quiz' && !item){
    toast("أُضيف التدريب — أضِف أسئلته الآن");
    openQuiz(ctx.course, { ...ctx.lesson, quiz_id: quizId, has_quiz: true });
    return;
  }
  toast(item ? "حُفظ المصدر" : "أُضيف المصدر");
  openItems(ctx.course, ctx.lesson);
}

async function remove(id){
  if(!confirm("حذف هذا المصدر؟")) return;
  const { data, error } = await api.deleteItem(id);
  if(error){ toast(error.message); return; }
  if(!data.ok){ toast(data.error); return; }
  toast("حُذف المصدر");
  openItems(ctx.course, ctx.lesson);
}

/* الترتيب بسهمين — أبسط من السحب والإفلات وبلا مكتبة */
async function move(id, dir){
  const off = D.items.filter(i => i.official);
  const at  = off.findIndex(i => i.id === id);
  const to  = at + dir;
  if(at < 0 || to < 0 || to >= off.length) return;
  [off[at], off[to]] = [off[to], off[at]];

  const { data, error } = await api.reorderItems(ctx.lesson.id, off.map(i => i.id));
  if(error){ toast(error.message); return; }
  if(!data.ok){ toast(data.error); return; }
  openItems(ctx.course, ctx.lesson);
}
