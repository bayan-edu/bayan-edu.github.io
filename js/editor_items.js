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
import { app, head, toast, esc, AR, N, errBox, nav, setWide, scrollTop, srcOf, SAFE_HOSTS,
         videoOf, VIDEO_HOSTS, ICONS } from './ui.js';
import { attachUpload, insertLine } from './upload.js';
import { openCourse, courseTags } from './editor.js';
import { bookLook, bookEnd } from './student.js';
import { openQuiz, openQuizPreview } from './editor_quiz.js';

let ctx = null;   // { course, lesson }
let D   = null;   // { ok, curate, items }


/* 🆕 b228 · و`open` يفتح نموذجَ مصدرٍ بعينه بعد التحميل — أيقونةُ المقطع الصوتيّ في «دروس المقرَّر» (`editor.js`).
   وبحكم القائمة نفسِه: من يعدّله يحرّره، ومن لا يعدّله يعاينه (`canEdit`) · والرجوعُ منه إلى مصادر الدرس كما لو فُتح
   من قائمتها. ومصدرٌ لم يُوجد (حُذف من نافذةٍ أخرى) ⇒ القائمةُ نفسُها، لا نموذجٌ فارغ */
export async function openItems(course, lesson, { open = null } = {}){
  ctx = { course, lesson };
  nav('editor'); setWide(true);
  head("مصادر الدرس", lesson.title);
  app.innerHTML = `<div class="status">جار التحميل…</div>`;

  const { data, error } = await api.lessonItems(lesson.id);
  if(error){ app.innerHTML = errBox(error, 'مصادر الدرس'); return; }
  if(!data.ok){ app.innerHTML = errBox({ message: data.error }, 'مصادر الدرس'); return; }
  D = data;
  const it = open != null ? (D.items || []).find(x => String(x.id) === String(open)) : null;
  if(it && it.kind !== 'quiz'){ form(it, undefined, !canEdit(it)); scrollTop(); return; }
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
        ${/* 🆕 b172 · وعنوانُ المصدر كعنوان الدرس (`editor.js`). **وقِيس قبل أن
              يُدَّعى: ٢٢٤ مصدراً، منها اثنان يبدآن بلاتينيّ** (٢٣ أكتوبر) —
              فالمؤلّفون يُعنونون بالعربية وإن كان المصدرُ إنجليزيّاً.
              ⇒ **حارسٌ قبل أن يكبر**، ومربّعُ نصِّه يحمل الاتجاه منذ `b170`. */''}
        <div class="ed-t" dir="auto">${esc(i.title)}</div>
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
    <div class="crumb" id="bk">→ دروس المقرَّر</div>

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

/* 🆕 b231 · النموذجُ على هيئة نمطه — طلبُ المالك (٨ نوفمبر ٢٠٢٦، بلقطةٍ من هذا النموذج): «أقترح أولاً فصل جزء نوع المصدر
   في إطار منفصل عن باقي الصفحة. باقي الصفحة يجب أن يتناسب تنسيقه وترتيبه مع نوع المصدر الذي تم اختياره … هذه شاشة المعلم
   وليس الطالب فهناك مرونة في استخدام الألوان بما يخدم أهداف التنسيق».
   ⇒ إطاران: **النمطُ إطارُه وحده** (للمصدر الجديد — والقائمُ نمطُه ثابت فلا منتقي له)، و**النموذجُ بعده برأسٍ بلون النمط**
      وأيقونته يقول كيف يصل الطالبَ، ثمّ «المحتوى» حقلُه باسم النمط ومثالِه، ثمّ «تفاصيل إضافية». والإرشادُ في العمود الجانبيّ
      إرشادُ النمط وحده — وكان سطرين للصوت ولـ«غيره» تحت كلّ نمط.
   🔑 **والأنماطُ تبقى من القاعدة** (`item_kinds` عبر `author_tree`) — فهذا الجدولُ **هيئةٌ لا قائمة**: اسمُ الحقل ومثالُه، وكيف
      يصل الطالبَ إن خالف «رابطٌ يُفتح في تبويب». ونمطٌ جديدٌ في القاعدة بلا سطرٍ هنا يأخذ هيئةَ متطلَّبه (`needs`) ولوناً محايداً
      (screens.css) — يعمل ولا يكسر.
   📌 وكلُّ «كيف يصل» هنا قُرئ من شاشة الطالب لا من الذاكرة (`openItem` في student.js): الصوتُ يُشغَّل في الدرس إن كان مفتاحاً
      في المخزن أو ملفاً صوتياً مباشراً (`canEmbed`) · والمحاكاةُ في إطارٍ داخله (`isSim`) · والنصُّ كتابٌ · وما سواها `window.open`. */
const LOOK = {
  pdf:         { field: 'رابط الملف',        ph: 'https://drive.google.com/file/d/…' },
  video:       { field: 'رابط المقطع',       ph: 'https://youtu.be/…' },
  audio:       { field: 'الملف الصوتي',      ph: 'r2:audio/…  أو  https://…/clip.mp3', say: 'مقطع يسمعه الطالب داخل الدرس' },
  image:       { field: 'رابط الصورة',       ph: 'https://…' },
  link:        { field: 'رابط المرجع',       ph: 'https://…' },
  mindmap:     { field: 'رابط الخريطة',      ph: 'https://…' },
  infographic: { field: 'رابط الإنفوجرافيك', ph: 'https://…' },
  slides:      { field: 'رابط العرض',        ph: 'https://docs.google.com/presentation/d/…' },
  worksheet:   { field: 'رابط الورقة',       ph: 'https://drive.google.com/file/d/…' },
  simulation:  { field: 'مسار المحاكاة',     ph: 'sims/الاسم.html  أو  https://…', say: 'تجربة تفاعلية تُعرض داخل الدرس' }
};
/* ⚠️ ومثالُ المحاكاة بصيغتيه لا بمساره وحده: الفحصُ ③ في tools/build.mjs يقرأ كلَّ مسارٍ محصورٍ بين علامتي تنصيص
   (`'sims/…html'`) طلباً يُحلّ على عنوان الصفحة — فأفشل البناءَ على مثالٍ لا يُطلب. والصيغتان أصدقُ للمعلّم أيضاً:
   الإرشادُ يقبل المسارَ النسبيّ والرابطَ الكامل، و`siteUrl` تُسند الأوّلَ إلى جذر الموقع عند الطالب. */
const lookOf  = k => LOOK[k.code] || {};
const fieldOf = k => lookOf(k).field || 'الرابط';
const sayOf   = (k, off) =>
    k.needs === 'quiz' ? (off ? 'اختبار الدرس، واجتيازه شرط لإتمامه' : 'تدريب لا يُحتسب في البوّابة ولا يحجب الانتقال')
  : k.needs === 'body' ? 'كتاب منسّق يقلّبه الطالب داخل الدرس'
  : lookOf(k).say || 'رابط يفتحه الطالب في تبويب جديد';
/* أيقونةُ النمط المجسَّمة (`ICONS` في ui.js) — وما لا مجسَّمَ له يبقى رمزَه المكتوب في القاعدة */
const kindIcon = k => ICONS[k.code] || `<span class="it-k-em" aria-hidden="true">${esc(k.icon || '•')}</span>`;

/* إرشادُ النمط في العمود الجانبيّ — بلونه (`.rk-guide`). وكان سطرَين ثابتين تحت كلّ رابط: «الصوت: …» و«غيره: …»،
   وزرُّ رفعٍ صوتيّ تحت «ملف للقراءة» و«صورة» معاً — وسطرٌ يقول «تجاهله هنا» تحت المحاكاة. والرفعُ اليوم للصوت وحده.
   🔑 ولا مصدرَ قائماً غيرَ صوتيّ يحمل مفتاحاً في المخزن — قِيس على القاعدة الحيّة قبل أن يسقط الزرّ (٨ نوفمبر: صفر) */
const GUIDE = {
  audio: `<b>الملف:</b> يُرفع بالزر فيُكتب مفتاحه في الحقل (<code dir="ltr">r2:audio/…</code>)، ويُشغَّل داخل الدرس.
    ورابط ملف صوتي مباشر (mp3) يُشغَّل كذلك، وغيره يُفتح في تبويب جديد.`,
  video: `<b>رابط المقطع:</b> من YouTube أو Google Drive، ويُفتح للطالب في تبويب جديد.
    فيلزم أن يكون متاحاً لمن معه الرابط.`,
  simulation: `<b>المسار:</b> ملف مستقل في مستودع الموقع، يُكتب مساره النسبي (مثلاً <code dir="ltr">sims/الاسم.html</code>)
    أو رابطه الكامل. ويُعرض داخل الدرس في إطار مستقل، لا في تبويب.`
};
/* ⚠️ و`dir="ltr"` على المسار والمفتاح لازمة: سطرٌ عربيٌّ يقلب ما فيه — «sims/الاسم.html» كان يُرى «html.الاسم/sims»
   و«r2:audio/…» يُرى «…/r2:audio» (قِيس بلقطةٍ مكبَّرة، وكان كذلك في الإرشاد القديم أيضاً) */
const guideOf = (k, isNew, ro) => {
  if(k.needs === 'body') return ro ? '' : textRules(isNew && matchMedia('(min-width: 901px)').matches)
    + `<div class="rk-guide"><b>الصورة والفيديو في النص:</b> الزرّان يضعان السطر حيث المؤشّر، ويُكتب التعليق قبل «]».
        وأنفع تعليق سؤال يوجّه النظر إلى ما في النص.<br>
        <b>وموضع الفيديو قبل النص أو بعده لا وسطه:</b> مقطع يحكي مضمون النص يُشاهَد بدل أن يُقرأ، فيقيس الاختبار
        الاستماع لا القراءة.</div>`;
  if(k.needs !== 'url') return '';
  return `<div class="rk-guide">${GUIDE[k.code] || `<b>${esc(fieldOf(k))}:</b> يُفتح للطالب في تبويب جديد،
    فيلزم أن يكون متاحاً لمن معه الرابط بلا تسجيل دخول.`}</div>`;
};

function form(item, official, ro){
  const isNew = !item;
  const off   = isNew ? official : item.official;
  let k = kind(item?.kind || 'pdf');
  const dis = ro ? ' disabled' : '';     // الحقول تُقرأ ولا تُكتب
  /* 🆕 b231 · وما كُتب يبقى حين يتبدّل النمط: كان التبديلُ يرسم النموذجَ من جديد فارغاً، فيضيع عنوانٌ كُتب قبل اختيار
     النمط — والإطارُ المنفصل يدعو إلى الاختيار بعد الكتابة كما يدعو إليه قبلها. ويُحفظ كلُّ حقلٍ رُئي ولو غاب عن النمط
     الجديد: نصٌّ كُتب ثمّ جُرّب «ملف للقراءة» يعود بالرجوع إلى «نصّ». */
  let keep = {};
  const grab = () => {
    for(const id of ['ti', 'ur', 'bo', 'de', 'du', 'rq', 'ln']){
      const el = document.getElementById(id);
      if(el) keep[id] = el.value;
    }
  };
  const val = (id, saved) => keep[id] ?? saved;

  const draw = () => {
    const kl = kLabel(k.label, k.needs, off) || k.code;
    /* الاختبارُ المعتمد لا يُنشأ هنا (بابُه زرُّ «الاختبار» في قائمة الدروس) — فلا تفاصيلَ تُكتب ولا زرَّ حفظٍ معطَّلاً يُرى:
       النموذجُ لافتةٌ تدلّ على البابين */
    const gate = k.needs === 'quiz' && off;
    const lang = val('ln', item?.lang === 'en' ? 'en' : 'ar');
    const req  = val('rq', item?.required ? '1' : '0');
    app.innerHTML = `
      <div class="crumb" id="bk">→ مصادر الدرس</div>
      ${isNew ? `<section class="rk-pick" aria-labelledby="rkPickH">
        <div class="rk-pick-top">
          <h2 class="rk-pick-h" id="rkPickH">نوع المصدر</h2>
          <span class="rk-pick-say">يحدّد حقول النموذج، ولا يتغيّر بعد الإضافة</span>
        </div>
        <div class="it-kinds">
          ${kinds().map(x => `<button type="button" class="it-k${x.code === k.code ? ' on' : ''}" data-k="${esc(x.code)}"
              aria-pressed="${x.code === k.code}">${kindIcon(x)}<span>${esc(kLabel(x.label, x.needs, off))}</span></button>`).join("")}
        </div>
      </section>` : ''}

      <div class="ed-form rk" data-kd="${esc(k.code)}">
        <div class="ed-side">
          <div class="ed-hint">${off
            ? '📦 <b>مصدر معتمد</b> — جزء من المنهج، ويمكن أن يكون شرط انتقال.'
            : '➕ <b>مصدر إضافي باسمك</b> — إثراء لا يحجب ولا يدخل البوّابة.'}</div>
          ${ro ? `<div class="warnbox">🔒 <b>معاينة</b> — هذا المصدر ${off
            ? 'يعدّله فريق الإشراف' : 'من تأليف زميلٍ لك'}، فيُقرأ هنا ولا يُحفظ.</div>` : ''}
          ${guideOf(k, isNew, ro)}
        </div>

        <div class="card rk-card">
          <div class="rk-head">
            <span class="rk-ico">${kindIcon(k)}</span>
            <div class="rk-hd">
              <h2 class="rk-name">${esc(kl)}</h2>
              <p class="rk-say">${esc(sayOf(k, off))}</p>
            </div>
            ${isNew ? '' : '<span class="chip rk-fix">النوع ثابت بعد الإضافة</span>'}
          </div>

          <section class="rk-sec" aria-labelledby="rkSec1">
            <h3 class="rk-sec-h" id="rkSec1">المحتوى</h3>
            <label class="fl" for="ti">العنوان *</label>
            <input type="text" id="ti" value="${esc(val('ti', item?.title || ''))}"${dis}
                   placeholder="مثال: ${esc(kl)} — الغلاف المائي">

            ${k.needs === 'url' ? `
              <label class="fl" for="ur">${esc(fieldOf(k))} *</label>
              <input type="text" id="ur" dir="ltr" value="${esc(val('ur', item?.url || ''))}"${dis}
                     placeholder="${esc(lookOf(k).ph || 'https://…')}">` : ''}
            ${k.needs === 'body' ? `
              <label class="fl" for="bo">النصّ *</label>
              <div class="rk-body">
                <textarea id="bo" dir="auto"${dis}>${esc(val('bo', item?.body || ''))}</textarea>
              </div>` : ''}
            ${k.needs === 'quiz' ? (off ? `
              <div class="warnbox">اختبار الدرس يُنشأ من زرّ «الاختبار» في قائمة الدروس — فيُربط ويصير شرط
                الانتقال تلقائياً.</div>` : `
              <div class="warnbox">تدريبٌ باسمك — لا يُحتسب في البوّابة ولا يحجب الانتقال، ونتائجه تُسجَّل في سجلّ
                الطالب.<br>${isNew ? 'يُنشأ بالعنوان أعلاه، ثمّ تُفتح شاشةُ الأسئلة مباشرةً.'
                                   : 'وأسئلته تُحرَّر من زرّ «تحرير الأسئلة» في قائمة المصادر.'}</div>`) : ''}
          </section>

          ${gate ? '' : `<section class="rk-sec" aria-labelledby="rkSec2">
            <h3 class="rk-sec-h" id="rkSec2">تفاصيل إضافية</h3>
            <label class="fl" for="de">وصف موجز <span class="rk-opt">(اختياري)</span></label>
            <input type="text" id="de" value="${esc(val('de', item?.description || ''))}"${dis}>

            <div class="ed-3">
              <div>
                <label class="fl" for="du">المدّة (دقيقة)</label>
                <input type="text" id="du" inputmode="numeric" value="${esc(val('du', item?.duration ?? ''))}"${dis}>
              </div>
              ${off ? `<div>
                <label class="fl" for="rq">إلزامي</label>
                <select id="rq"${dis}>
                  <option value="0" ${req === '1' ? '' : 'selected'}>اختياري</option>
                  <option value="1" ${req === '1' ? 'selected' : ''}>شرط لإتمام الدرس</option>
                </select></div>` : ''}
              <div>
                <label class="fl" for="ln">اللغة</label>
                <select id="ln"${dis}>
                  <option value="ar" ${lang !== 'en' ? 'selected' : ''}>العربية</option>
                  <option value="en" ${lang === 'en' ? 'selected' : ''}>English</option>
                </select>
              </div>
            </div>
          </section>`}
        </div>
      </div>
      ${ro || gate ? '' : `<div class="nav" style="margin-top:16px">
        <button class="btn primary" id="sv">${isNew ? 'إضافة' : 'حفظ'}</button>
      </div>`}`;

    document.getElementById("bk").onclick = () => render();
      // ctx.lesson لا S.lesson
    /* 🆕 b231 · زرُّ الرفع للصوت وحده — كان يُركَّب تحت كلّ رابط («رفع ملفّ صوتيّ» تحت «ملف للقراءة»)، ومفتاحُ صوتٍ في
       مصدرٍ غيرِ صوتيّ يُفتح للطالب تبويباً لا يُحمَّل (`siteUrl` لا تعرف `r2:`) */
    if(!ro && k.code === 'audio') attachUpload('ur', 'l' + (ctx.lesson?.id ?? ''));
    /* 🆕 b165 · صورةٌ داخل نصّ «الكتاب» — تُرفع وتُدرَج سطراً حيث المؤشّر.
       وكلمةُ السطر بلغة النصّ (`image` للإنجليزي): سطرٌ عربيٌّ وسط نصٍّ لاتينيّ
       يقلب اتجاهَ الأسطر في مربّع المعلّم. */
    if(!ro) attachUpload('bo', 'l' + (ctx.lesson?.id ?? ''), 'image', {
      label: '⬆ إدراج صورة',
      insert: (key, f) => `[${kw(f, 'image', 'صورة')}: ${key} | ]`
    });
    if(!ro) attachVideo('bo');
    /* 🆕 b199 · سورُ الآيات تحت الأدوات كلّها — وعدٌ يُنتظر عند الحفظ والمعاينة (`attachAyat`) */
    const ayat = !ro && k.needs === 'body' ? attachAyat('bo', item) : null;
    attachPreview('bo', item, ayat);        // والمعاينةُ تُري ولا تُغيّر — فلمن يقرأ فقط أيضاً
    if(!ro) attachTidy('bo');
    /* 🆕 b203 · صوتُ النصّ تحت محدِّد السور (`attachVoice`) — لمن يحرّر، والحارسُ في الدالّة لا هنا */
    if(!ro && k.needs === 'body') attachVoice('bo', item, ayat);
    /* 🆕 b218 · سطورُ المقطع الصوتيّ تحت حقل رابطه (`attachLines` · 197) — لمن يحرّر، والحارسُ في القاعدة لا هنا */
    if(!ro && k.code === 'audio') attachLines('ur', item);
    app.querySelectorAll("[data-k]").forEach(el => el.onclick = () => {
      if(!isNew || el.dataset.k === k.code) return;    // النمط لا يتغيّر بعد الإنشاء
      grab();
      k = kind(el.dataset.k); draw();
      app.querySelector(`[data-k="${CSS.escape(k.code)}"]`)?.focus();   // ولوحةُ المفاتيح تبقى على الزرّ الذي ضُغط
    });
    const sv = document.getElementById("sv");
    if(sv) sv.onclick = () => save(item, off, k, ayat);
  };
  draw();
}

/* 🆕 b188 · قواعدُ كتابة النصّ — بجوار المربّع لا في دليلٍ يُفتح مرّةً في السنة: الحجّةُ
   تُكتب حيث يقع السؤال. مفتوحةٌ في النصّ الجديد ومطويّةٌ في القائم — **وفي الضيّق مطويّةٌ
   دائماً:** العمودُ يصعد فوق المربّع تحت ٩٠٠px (screens.css)، فبطاقةٌ مفتوحة تدفعه شاشةً كاملة.
   🔴 **وهي صدى `parse()` في book.js — تغيّر أحدهما ⇒ يُغيَّر الآخر.** كلُّ سطرٍ هنا حكمٌ
      من أحكامه: الفقرةُ ما فصله سطرٌ فارغ والسطرُ المفرد كسرٌ مقصود (الشعر والحوار) ·
      السطرُ الواحد القصير (ثماني كلمات فأقلّ) بلا علامة وقف يُقرأ عنواناً · الحروفُ A–H
      و«(١)» تحلّ محلّ الترقيم الآليّ · والعلامةُ لا تعبر السطر (`KEEP`). وكلُّها قِيست على
      المحرّك الحقيقيّ يوم كُتبت.
   🎯 **والتمييزُ قليلٌ ولكلّ علامةٍ معنى:** اللونُ من بطاقات الدرس وحدها (عائلةُ `accent`
      تقول «اضغط»، فلا يُلوَّن ما لا يُنقر) · والغامقُ للمصطلح · والخطُّ لكلمةٍ يُسأل عنها.
      **ولا يُغمَّق ما هو إجابة:** يصير السؤالُ بحثاً عن كلمةٍ لا فهماً، ويُسجَّل للطالب
      تشخيصٌ لا يخصّه أو يُخفى خللُه — وهو ما بُنيت المنصّةُ لتمنعه. */
const textRules = open => `<details class="ed-hint ed-rules"${open ? ' open' : ''}>
    <summary>قواعد كتابة النص</summary>
    <p>يظهر النص للطالب كتاباً منسَّقاً تلقائياً، فيكفي نص عادي بهذه القواعد:</p>
    <ul>
      <li><b>الفقرة</b> فكرة واحدة، وبين كل فقرتين سطر فارغ. والسطر المفرد يبقى سطراً، وهو للشعر والحوار.</li>
      <li><b>المنسوخ من PDF</b> تُدمج أسطره قبل الحفظ، وإلا ظهر للطالب مكسوراً.</li>
      <li><b>العنوان الفرعي</b> سطر قصير بلا علامة وقف، أو بين <code>**</code> و<code>**</code>. فالفقرة القصيرة تُختم بعلامة وقف. وعنوان النص على الغلاف فلا يُكرَّر.</li>
      <li><b>الترقيم</b> آلي في الهامش، ويحلّ محلّه حرف (A · B · C) أو رقم «(١)» في أول كل فقرة.</li>
    </ul>
    <p class="ed-rules-h">التمييز قليل، ولكل علامة معنى</p>
    <ul>
      <li><code>**غامق**</code> للمصطلح الذي يعرّفه النص، من واحد إلى ثلاثة.</li>
      <li><code>__خط تحتها__</code> للكلمة التي يسأل عنها سؤال.</li>
      <li><b>اللون</b> لا يُكتب: مفردات بطاقات الدرس تتلوّن وحدها، وتُفتح بنقرة.</li>
      <li><b>ولا يُغمَّق ما هو إجابة:</b> يصير السؤال بحثاً عن كلمة لا فهماً، ويفسد التشخيص.</li>
    </ul>
    <p>والعلامة تُفتح وتُغلق في السطر نفسه. ويُشكَّل في العربية ما يُلبِس وحده.</p>
  </details>`;

/* كلمةُ سطر الوسيط بلغة النصّ (`image`/`video` للإنجليزي): سطرٌ عربيٌّ وسط نصٍّ
   لاتينيّ يقلب اتجاهَ الأسطر في مربّع المعلّم. */
/* 🆕 b170 · ومربّعُ النصّ نفسُه `dir="auto"`: كان النصُّ الإنجليزيّ يُعرض فيه من اليمين،
   فتقفز علامةُ الوقف إلى أوّل السطر ويبدو سطرُ الوسيط مكسوراً («[?video: …»). */
function kw(f, en, ar){
  const t = f.value, a = (t.match(/[\u0600-\u06FF]/g) || []).length,
        l = (t.match(/[A-Za-z]/g) || []).length;
  return l > a ? en : ar;
}

/* 🆕 b170 · «إدراج فيديو» — لا رفعَ هنا: المقطعُ رابطٌ (YouTube · Drive)، ورفعُ ملفّات
   الفيديو إلى R2 قرارٌ لم يُتّخذ (حجمٌ وكلفةٌ ودالّةٌ طرفيّة لا تعرف الفيديو). ⇒ حقلٌ
   يُلصق فيه الرابط **ويُفحص لحظةَ الإدراج بحارس الطالب نفسِه (videoOf)** — فلا يُكتشف
   رابطٌ معطوبٌ يومَ القراءة. والمؤشّرُ يُحفظ قبل أن ينتقل التركيزُ إلى الحقل، فيُدرَج
   السطرُ حيث كان المعلّم. وزرُّه بجوار زرّ الصورة لا تحته في سطرٍ بعيد. */
function attachVideo(id){
  const inp = document.getElementById(id);
  if(!inp || inp.dataset.vid) return;
  inp.dataset.vid = "1";
  const wrap = document.createElement("div");
  wrap.className = "mf";
  wrap.innerHTML = `<button type="button" class="mf-up">إدراج فيديو</button>
    <span class="mf-row" hidden><input type="url" dir="ltr" class="mf-url" placeholder="https://youtu.be/…"
      aria-label="رابط المقطع"><button type="button" class="mf-up">إدراج</button></span>
    <span class="mf-note"></span>`;
  const near = inp.nextElementSibling?.classList.contains("mf") ? inp.nextElementSibling : inp;
  near.insertAdjacentElement("afterend", wrap);

  const [open, ok] = wrap.querySelectorAll("button");
  const row = wrap.querySelector(".mf-row"), url = wrap.querySelector(".mf-url");
  const note = wrap.querySelector(".mf-note");
  const say = (t, bad) => { note.textContent = t; note.className = "mf-note" + (bad ? " bad" : ""); };
  let sel = null;

  open.onclick = () => {
    sel = [inp.selectionStart, inp.selectionEnd];
    row.hidden = false; url.value = "";
    say("يُلصق رابطُ المقطع من YouTube أو Google Drive");
    url.focus();
  };
  const go = () => {
    const v = url.value.trim();
    /* «|» و«]» يكسران السطر — ولا يحملهما رابطُ مقطعٍ صحيح */
    if(/[|\]\s]/.test(v) || !videoOf(v)) return say(`رابطٌ لا يُشغَّل — المقبول: ${VIDEO_HOSTS}`, true);
    if(sel) inp.setSelectionRange(sel[0], sel[1]);
    insertLine(inp, `[${kw(inp, 'video', 'فيديو')}: ${v} | ]`);
    inp.dispatchEvent(new Event("input",  { bubbles: true }));
    inp.dispatchEvent(new Event("change", { bubbles: true }));
    row.hidden = true;
    say("أُدرج المقطع ✔ — ويُكتب تعليقُه قبل «]»، ثمّ الحفظ");
  };
  ok.onclick = go;
  url.onkeydown = e => {
    if(e.key === "Enter"){ e.preventDefault(); go(); }
    else if(e.key === "Escape"){ row.hidden = true; say(""); inp.focus(); }
  };
}

/* آخرُ صفٍّ من أدوات المربّع (`.mf`) — ليُلحَق الجديدُ بعدها بترتيب إضافته */
const lastTool = inp => {
  let n = inp;
  while(n.nextElementSibling?.classList.contains("mf")) n = n.nextElementSibling;
  return n;
};

/* 🆕 b189 · معاينةُ النصّ كما يراه الطالب — الكتابُ الحقيقيّ بمظهر الطالب نفسِه (`bookLook`
   و`bookEnd` في student.js)، من المربّع كما هو الآن قبل الحفظ: فيرى المعلّمُ التقسيمَ
   والترقيمَ والكلماتِ الملوّنة ويصلح قبل أن يراها طالب.
   📐 **شاشةٌ كاملة لا نافذةٌ صغيرة:** الكتابُ يقيس الشاشةَ ليملأها (`layout` في book.js)،
      ونافذةٌ صغيرة تُريه أصغرَ ممّا يراه الطالب. **ويحسب موضعَه بـ`scrollY`** ⇒ تُرفع الصفحةُ
      إلى أوّلها وتُقفل تحت المعاينة، وتعود عند الإغلاق حيث كانت.
   🔑 والجنسُ محايد (`g = null`): المعلّمُ يرى الخانةَ الرابعة من `G()`، والطالبُ يرى صيغتَه.
   ⚠️ وما يخصّ الطالبَ لا يُعاين: موضعُ القراءة والإتمامُ والقراءةُ الجهريّة وفتحُ الاختبار. */
function attachPreview(id, item, ayat){
  const inp = document.getElementById(id);
  if(!inp || inp.dataset.pv) return;
  inp.dataset.pv = "1";
  const row = document.createElement("div");
  row.className = "mf";
  row.innerHTML = `<button type="button" class="mf-up">معاينة كما يراها الطالب</button>`;
  lastTool(inp).insertAdjacentElement("afterend", row);
  const btn = row.querySelector("button");
  btn.onclick = () => openPreview(inp, btn, item, ayat);
}

async function openPreview(inp, btn, item, ayat){
  const v = id => (document.getElementById(id)?.value || '').trim();
  const body = inp.value.trim();
  if(!body){ toast("لا نص للمعاينة بعد"); return; }
  const ay = ayat && await ayat;
  return previewText({
    course: ctx.course, lesson: ctx.lesson, btn, body,
    title: v("ti") || ctx.lesson.title, subtitle: v("de"), lang: v("ln") || 'ar',
    quiz: (D.items || []).some(x => x.kind === 'quiz' && x.quiz_id),
    /* 🆕 b198 · وسورُ الآيات — فيسمع المعلّمُ التلاوةَ قبل الطالب.
       🆕 b199 · المختارةُ الآن في المحدِّد لا المحفوظة (`result`): ما سيسمعه الطالبُ لو حُفظ النصُّ الآن، فاختيارٌ
       ناقصٌ يُعاين صامتاً كما سيُحفظ. ولمن يقرأ فقط (لا محدِّد) المحفوظةُ، وكتلةٌ لا يطابق مداها ما حُفظ تصمت */
    quranRefs: ay ? ay.result().refs : item?.quran_refs || null,
    /* 🆕 b203 · والصوتُ المولَّد **المعتمدُ وحده** — ما يسمعه الطالب لا أكثر (خطّةُ الخطوة ٦ · أقرّها المالك)، وما لم
       يُعتمد يُسمع في لوحة الصوت. والجملةُ التي عُدّلت في المربّع ولم تُحفظ تصمت: صوتُها لنصّها المحفوظ */
    voices: item?.id ? await api.approvedVoices(item.id).then(r => r.data || null, () => null) : null,
    from: 'من المربّع قبل الحفظ، ولا تحفظ شيئاً'
  });
}

/* 🆕 b199 · سورُ الآيات — محدِّدٌ لا محرِّر (`select_ayat.js`): يسأل عن سورة كلّ كتلة ﴿…﴾ ولا يمسّ النصّ.
   يُحمَّل للنصّ وحده، ومعه book.js (وقد طلبه منظّفُ اللصق قبله)، ويوضع بعد الأدوات كلّها ومنظّفِ اللصق:
   الوعدُ يُحلّ بعد أن رُسمت. **وإن تعذّر تحميلُه فالوعدُ null** — فلا يمسّ الحفظُ السورَ المحفوظة. */
function attachAyat(id, item){
  const inp = document.getElementById(id);
  return import('./select_ayat.js').then(m => {
    const ay = m.selectAyat(inp, { saved: item?.quran_refs || null,
      names: [document.getElementById("ti"), document.getElementById("de")] });
    const near = lastTool(inp), tp = near.nextElementSibling;
    (tp?.classList.contains("tp") ? tp : near).insertAdjacentElement("afterend", ay.el);
    return ay;
  }, e => { console.error(e); return null; });
}

/* 🆕 b203 · صوتُ النصّ (`voice_panel.js` · الخطوة ٦ من ستّ): يولّد صوتَ كلّ جملةٍ ويُسمعه ويعتمده. ويُحمَّل للنصّ وحده
   بعد محدِّد السور — يُنتظر وعدُه ليوضع تحته، وإلّا فبعد الأدوات ومنظّفِ اللصق كما يوضع المحدِّد. **وتعذُّرُ تحميله لا
   يمسّ النصَّ ولا حفظَه:** اللوحةُ لا تكتب في المربّع، والصوتُ في جدوله (189). */
function attachVoice(id, item, ayat){
  const inp = document.getElementById(id);
  Promise.resolve(ayat).then(ay => import('./voice_panel.js').then(m => {
    if(!inp.isConnected) return;                       // غادر المعلّمُ قبل التحميل
    const vp = m.voicePanel(inp, { item, title: document.getElementById("ti"), lang: document.getElementById("ln") });
    let near = ay?.el?.isConnected ? ay.el : lastTool(inp);
    if(near === lastTool(inp) && near.nextElementSibling?.classList.contains("tp")) near = near.nextElementSibling;
    near.insertAdjacentElement("afterend", vp.el);
  })).catch(e => console.error(e));
}

/* 🆕 b218 · سطورُ المقطع الصوتيّ (`lines_panel.js` · مختبر الصوتيّات، الخطوة ١): تحت حقل الرابط وزرِّ رفعه، كما توضع لوحةُ
   صوت النصّ تحت مربّعه. **وتعذُّرُ تحميلها لا يمسّ المقطعَ ولا حفظَه:** اللوحةُ لا تكتب في الحقل، والسطورُ في جدولها (197). */
function attachLines(id, item){
  const inp = document.getElementById(id);
  /* 🆕 b219 · ومعها «حوار يُولَّد» (`dialogue_panel.js` · 199): يُبنى في الدرس ولو لم يُحفظ المصدرُ بعد — والتجميعُ يملأ هذا الحقل */
  Promise.all([import('./lines_panel.js'), import('./dialogue_panel.js')]).then(([m, dm]) => {
    if(!inp?.isConnected) return;                    // غادر المعلّمُ قبل التحميل
    const lp = m.linesPanel({ field: inp, item });
    const dp = dm.dialoguePanel({ field: inp, item, lesson: ctx.lesson?.id });
    const up = inp.nextElementSibling?.classList.contains('mf') ? inp.nextElementSibling : inp;
    up.insertAdjacentElement('afterend', lp.el);
    lp.el.insertAdjacentElement('afterend', dp.el);
  }).catch(e => console.error(e));
}

/* 🆕 b191 · والكتابُ نفسُه يخدم شاشةَ الاستيراد (معاينةُ كلّ نصٍّ في خطّة «نصوص القراءة») —
   فصُدِّر ولم يُنسخ: معاينتان تبني كلٌّ منهما كتابَها بيدها تفترقان يوماً بصمت (حجّةُ `bookLook`).
   والفرقُ بين الموضعين في المُدخَلات وحدها: من أين النصّ (`from`) وأيُّ درس.
   ⚠️ والدرسُ قد يغيب (`lesson = null`): فالمعاينةُ بلا كلماتٍ ملوّنة، ولا تتعطّل. */
export async function previewText({ course, lesson, title, subtitle = '', body, lang = 'ar',
                                    quiz = false, quranRefs = null, voices = null, btn, from }){
  btn.disabled = true;
  const [{ createBook }, cardsRes, tags] = await Promise.all([
    import('./book.js'),
    /* مُنشئُ Supabase يملك `then` وحدها (علّةُ b156) ⇒ `.then(نجاح، فشل)` لا `.catch` */
    lesson?.id ? api.lessonCards(lesson.id).then(r => r, e => ({ error: e })) : { data: [] },
    courseTags(course).catch(() => [])
  ]);
  btn.disabled = false;
  if(!lesson?.id) toast("لم يتحدّد الدرس، فالمعاينة بلا كلمات ملوّنة");
  else if(cardsRes.error) toast("تعذّر جلب بطاقات الدرس، فالمعاينة بلا كلمات ملوّنة");

  const y = scrollY;
  scrollTo(0, 0);
  document.documentElement.classList.add("pv-lock");
  const box = document.createElement("div");
  box.className = "bkpv";
  box.setAttribute("role", "dialog");
  box.setAttribute("aria-modal", "true");
  box.setAttribute("aria-label", "معاينة النص كما يراه الطالب");
  box.innerHTML = `<div class="bkpv-in">
      <div class="bkpv-head">
        <b>معاينة كما يراها الطالب</b>
        <span>${esc(from)}</span>
        <button type="button" class="bkpv-x" aria-label="إغلاق المعاينة">×</button>
      </div>
      <div class="bkpv-book"><div class="status">جار التحميل…</div></div>
    </div>`;
  document.body.append(box);

  let ctl = null;
  /* Escape في طور الالتقاط: نافذةُ الكلمة والصورةُ المكبَّرة يُغلقهما الكتابُ أوّلاً، ولا تُغلَق
     المعاينةُ معهما بالضغطة نفسِها */
  const onEsc = e => {
    if(e.key !== 'Escape' || box.querySelector('.bk-pop, .bk-zoom')) return;
    e.preventDefault(); close();
  };
  const close = () => {
    ctl?.destroy();
    box.remove();
    document.removeEventListener("keydown", onEsc, true);
    document.documentElement.classList.remove("pv-lock");
    scrollTo(0, y);
    btn.focus();
  };
  box.querySelector(".bkpv-x").onclick = close;
  document.addEventListener("keydown", onEsc, true);
  box.querySelector(".bkpv-x").focus();

  try {
    ctl = await createBook(box.querySelector(".bkpv-book"), {
      ...bookLook({ cards: cardsRes.data, g: null, subject: tags[0], lesson, title, quranRefs, voices, preview: true }),
      title, subtitle, body, lang,
      endHtml: () => bookEnd(null, quiz),
      onAction: (act, book) => {
        if(act === 'again') return book.restart();
        if(act === 'back') return close();
        if(act === 'quiz') toast("وهنا يُفتح للطالب اختبار الدرس");
      }
    });
    if(!box.isConnected) ctl.destroy();    // أُغلقت المعاينةُ قبل أن يكتمل الكتاب
  } catch(e){
    console.error(e);
    const h = box.querySelector(".bkpv-book");
    if(h) h.innerHTML = errBox(e, 'المعاينة');
  }
}

/* 🆕 b189 · منظّفُ اللصق — **يقترح ولا يفرض** (الحكمُ وعلّتُه عند `tidyPaste` في book.js).
   يُلصق النصُّ كما هو أوّلاً، ثمّ يُقاس **ما لُصق وحده** لا المربّعُ كلُّه: فلا يمسّ ما كتبه
   المعلّمُ قبله. والدمجُ بـ`insertText` فيبقى «تراجع» المتصفّح (Ctrl+Z) ومعه زرٌّ صريح.
   🎨 والاقتراحُ من عائلة `warn` — «انتبه»: نصٌّ سيظهر للطالب مكسوراً. وبعد الدمج محايد:
      خبرٌ لا تنبيه. */
function attachTidy(id){
  const inp = document.getElementById(id);
  if(!inp || inp.dataset.tidy) return;
  inp.dataset.tidy = "1";
  const bar = document.createElement("div");
  bar.className = "tp";
  bar.hidden = true;
  bar.setAttribute("role", "status");
  lastTool(inp).insertAdjacentElement("afterend", bar);
  const mod = import('./book.js');                   // يُحمَّل قبل أوّل لصق

  const hide = () => { bar.hidden = true; bar.innerHTML = ""; };
  const put = (a, b, text) => {
    inp.focus();
    inp.setSelectionRange(a, b);
    if(!document.execCommand?.("insertText", false, text)){
      inp.setRangeText(text, a, b, "end");
      inp.dispatchEvent(new Event("input", { bubbles: true }));
    }
  };

  inp.addEventListener("paste", e => {
    const t = (e.clipboardData?.getData("text/plain") || "").replace(/\r\n?/g, "\n");
    hide();
    if(!t.includes("\n")) return;
    const s = inp.selectionStart;
    setTimeout(async () => {
      const r = (await mod).tidyPaste(t);
      if(r && inp.value.slice(s, s + t.length) === t) offer(r, s, t);
    });
  });

  function offer(r, s, t){
    const wrap = r.mode === 'wrap';
    bar.className = "tp";
    bar.hidden = false;
    bar.innerHTML = `<span>${wrap
        ? 'يبدو النص منسوخاً من PDF: أسطره مكسورة داخل الفقرات، فيظهر للطالب مكسوراً.'
        : 'الفقرات مفصولة بسطر واحد، فيقرؤها الكتاب فقرة واحدة طويلة.'}</span>
      <button type="button" class="mf-up" data-t="go">${wrap ? 'دمج الأسطر' : 'فصل الفقرات'}</button>
      <button type="button" class="mf-up" data-t="no">إبقاء النص كما هو</button>`;
    bar.querySelector('[data-t="no"]').onclick = hide;
    bar.querySelector('[data-t="go"]').onclick = () => {
      if(inp.value.slice(s, s + t.length) !== t){
        bar.querySelector("span").textContent = "تغيّر النص بعد اللصق، فبقي كما هو.";
        return;
      }
      put(s, s + t.length, r.text);
      bar.className = "tp done";
      bar.innerHTML = `<span>${wrap ? 'دُمجت الأسطر في ' : 'فُصل النص إلى '}${
          N(r.paras, 'فقرة', 'فقرتين', 'فقرات', 'فقرة')}${
          r.dropped ? '، وحُذف ما بدا رقم صفحة' : ''}. والمعاينة تُري النتيجة قبل الحفظ.</span>
        <button type="button" class="mf-up" data-t="undo">تراجع</button>`;
      bar.querySelector('[data-t="undo"]').onclick = () => {
        if(inp.value.slice(s, s + r.text.length) === r.text) put(s, s + r.text.length, t);
        hide();
      };
    };
  }
}

async function save(item, official, k, ayat){
  const v = id => (document.getElementById(id)?.value || '').trim();
  const ti = v("ti");
  if(!ti){ toast("العنوان مطلوب"); return; }
  if(k.needs === 'url'  && !v("ur")){ toast(k.label + " يحتاج رابطاً"); return; }
  if(k.needs === 'body' && !v("bo")){ toast(k.label + " يحتاج نصاً"); return; }
  /* 🆕 b165 · صورةٌ مصدرُها غير مأذون تسقط عند الطالب صامتة (حارسُ srcOf) —
     فالإنذارُ هنا، للمعلّم قبل الحفظ، لا فجوةٌ يكتشفها طالبٌ في قراءته. */
  if(k.needs === 'body'){
    const { mediaLines } = await import('./book.js');
    const bad = mediaLines(v("bo")).find(m => m.kind === 'vid' ? !videoOf(m.src) : !srcOf(m.src));
    if(bad){
      toast(bad.kind === 'vid' ? `رابط فيديو لا يُشغَّل: ${bad.src} — المقبول: ${VIDEO_HOSTS}`
                               : `مصدر صورة غير مسموح: ${bad.src} — المسموح: ${SAFE_HOSTS}`);
      return;
    }
  }

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

  /* 🆕 b199 · وسورُ الآيات بعد النصّ — دالّتُها لا وسيطٌ في `save_item` (188 ②)، والنصُّ محفوظٌ مهما جرى هنا */
  const ay = ayat && await ayat;
  const said = ay ? await saveAyat(item?.id ?? data.id, ay.result(), item?.quran_refs) : null;

  /* وتدريبٌ بلا أسئلة لا معنى له — فشاشةُ الأسئلة تُفتح في الحال،
     ولا يُترك المعلّم يبحث عن بابها في قائمةٍ رجع إليها. */
  if(k.needs === 'quiz' && !item){
    toast("أُضيف التدريب — أضِف أسئلته الآن");
    openQuiz(ctx.course, { ...ctx.lesson, quiz_id: quizId, has_quiz: true });
    return;
  }
  toast(said || (item ? "حُفظ المصدر" : "أُضيف المصدر"));
  openItems(ctx.course, ctx.lesson);
}

/* 🆕 b199 · قواعدُ حفظ السور (خطّةُ الخطوة الثالثة · أقرّها المالك):
     لكلّ كتلةٍ سورةٌ تسعها ⇒ تُحفظ · نصٌّ بلا آيات ⇒ تُمسح القديمة · ناقصةٌ ⇒ تُمسح القديمةُ ويُقال إنّ الآياتِ صامتة.
   🔑 ومسحُ القديمة حين لا تتمّ الجديدة شرطٌ لا تنظيف: سورةٌ قديمةٌ تبقى فتصادف كتلةً جديدةً بأرقامها تُتلى من غير
      سورتها. ولا نداءَ إن لم يتغيّر شيء — والقاعدةُ تحفظ [] null، فهما سواء.
   ⇒ نصُّ الإشعار إن كان ما يُقال غيرَ «حُفظ»، وإلا null */
const refsKey = rs => JSON.stringify((rs || []).map(r => [r.surah, r.from, r.to]));
async function saveAyat(id, { refs, why }, old){
  if(refsKey(refs) !== refsKey(old)){
    const { data, error } = await api.saveItemQuran(id, refs);
    const err = error ? error.message : data?.ok ? null : data?.error;
    if(err) return "حُفظ النص، وتعذّر حفظ سور الآيات: " + err;
  }
  if(why === 'num')  return "حُفظ النص، وتبقى الآيات صامتة حتى تُصحَّح أرقامها";
  if(why === 'pick') return "حُفظ النص، وتبقى الآيات صامتة حتى تُختار سورها";
  return null;
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
