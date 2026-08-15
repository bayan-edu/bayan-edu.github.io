/* ══════════════════════════════════════════════════════════
   بيان — editor_items.js  ②  مصادر الدرس

   قسمان لا يختلطان:
     📦 المصادر المعتمدة  — تُحسب في البوّابة وشرط الانتقال
     ➕ إضافات المعلمين   — إثراء لا يحجب · باسم مؤلّفه

   الأنماط تُقرأ من item_kinds عبر author_tree — فإضافة نمط
   جديد سطرٌ في القاعدة، لا نشرٌ للواجهة.
   ══════════════════════════════════════════════════════════ */
import * as api from './api.js';
import { S } from './state.js';
import { app, head, toast, esc, AR, errBox, nav, setWide, scrollTop } from './ui.js';
import { openCourse } from './editor.js';
import { openQuiz } from './editor_quiz.js';

let ctx = null;   // { course, lesson }
let D   = null;   // { ok, curate, items }


export async function openItems(course, lesson){
  ctx = { course, lesson };
  nav('editor'); setWide(true);
  head("مصادر الدرس", lesson.title);
  app.innerHTML = `<div class="status">جارٍ التحميل…</div>`;

  const { data, error } = await api.lessonItems(lesson.id);
  if(error){ app.innerHTML = errBox(error, 'مصادر الدرس'); return; }
  if(!data.ok){ app.innerHTML = errBox({ message: data.error }, 'مصادر الدرس'); return; }
  D = data;
  render();
}

const kinds = () => (S.tree?.kinds) || [];
const kind  = c => kinds().find(k => k.code === c) || { icon:'•', label:c, needs:'url' };


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
          <span class="chip">${esc(i.label || i.kind)}</span>
          ${i.is_graded ? '<span class="chip g">⭐ يُحتسب في البوّابة</span>' : ''}
          ${i.required && !i.is_graded ? '<span class="chip">إلزامي</span>' : ''}
          ${i.duration ? `<span class="chip">${AR(i.duration)} د</span>` : ''}
          ${i.author ? `<span class="chip">أ. ${esc(i.author)}</span>` : ''}
          ${i.touched ? `<span class="chip">تفاعل ${AR(i.touched)}</span>` : ''}
        </div>
      </div>
      ${i.official && D.curate ? `<span class="it-ord">
        <button class="it-b" data-up="${i.id}" ${idx===0?'disabled':''}>▲</button>
        <button class="it-b" data-dn="${i.id}" ${idx===n-1?'disabled':''}>▼</button></span>` : ''}
      ${i.kind === 'quiz'
        ? `<button class="eq-go" data-quiz="${i.quiz_id}">📝 تحرير الأسئلة</button>`
        : `<button class="it-b wide" data-ed="${i.id}">✏️ تحرير</button>`}
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
        <button class="btn primary" id="addx">＋ أضِف مصدراً باسمي</button>
      </div>` : ''}`;

  document.getElementById("bk").onclick = () => openCourse(ctx.course);
  const a1 = document.getElementById("add");  if(a1) a1.onclick = () => form(null, true);
  const a2 = document.getElementById("addx"); if(a2) a2.onclick = () => form(null, false);

  app.querySelectorAll("[data-ed]").forEach(el => el.onclick = () =>
    form(D.items.find(x => String(x.id) === el.dataset.ed)));
  app.querySelectorAll("[data-quiz]").forEach(el => el.onclick = () =>
    openQuiz(ctx.course, { ...ctx.lesson, quiz_id: +el.dataset.quiz, has_quiz:true }));
  app.querySelectorAll("[data-rm]").forEach(el => el.onclick = () => remove(+el.dataset.rm));
  app.querySelectorAll("[data-up]").forEach(el => el.onclick = () => move(+el.dataset.up, -1));
  app.querySelectorAll("[data-dn]").forEach(el => el.onclick = () => move(+el.dataset.dn, +1));
  scrollTop();
}


/* ═══════════ النموذج ═══════════ */

function form(item, official){
  const isNew = !item;
  const off   = isNew ? official : item.official;
  let k = kind(item?.kind || 'pdf');

  const draw = () => {
    app.innerHTML = `
      <div class="crumb" id="bk">← مصادر الدرس</div>
      <div class="ed-form">
        <div class="ed-side">
          <div class="ed-hint">${off
            ? '📦 <b>مصدر معتمد</b> — جزء من المنهج، ويمكن أن يكون شرط انتقال.'
            : '➕ <b>مصدر إضافي باسمك</b> — إثراء لا يحجب ولا يدخل البوّابة.'}</div>
          ${k.needs === 'url' ? `<div class="ed-hint" style="opacity:.75">
            الرابط يُفتح في تبويب جديد. تأكّد أنه متاح للطلاب —
            روابط Drive تحتاج «أي شخص لديه الرابط».</div>` : ''}
        </div>

        <div class="card" style="flex:1">
          <label class="fl">نوع المصدر</label>
          <div class="it-kinds">
            ${kinds().map(x => `<button class="it-k ${x.code===k.code?'on':''}"
                data-k="${x.code}">${x.icon}<span>${esc(x.label)}</span></button>`).join("")}
          </div>

          <label class="fl" style="margin-top:18px">العنوان *</label>
          <input type="text" id="ti" value="${esc(item?.title || '')}"
                 placeholder="مثال: ${esc(k.label)} — الغلاف المائي">

          ${k.needs === 'url' ? `
            <label class="fl" style="margin-top:16px">الرابط *</label>
            <input type="text" id="ur" dir="ltr" value="${esc(item?.url || '')}"
                   placeholder="https://…">` : ''}
          ${k.needs === 'body' ? `
            <label class="fl" style="margin-top:16px">النصّ *</label>
            <textarea id="bo" style="min-height:150px">${esc(item?.body || '')}</textarea>` : ''}
          ${k.needs === 'quiz' ? `
            <div class="warnbox" style="margin-top:16px">اختبار الدرس يُنشأ من زرّ
              «الاختبار» في قائمة الدروس — فيُربط ويصير شرط الانتقال تلقائياً.</div>` : ''}

          <label class="fl" style="margin-top:16px">وصف موجز <span style="opacity:.6">(اختياري)</span></label>
          <input type="text" id="de" value="${esc(item?.description || '')}">

          <div class="ed-3">
            <div>
              <label class="fl">المدّة (دقيقة)</label>
              <input type="text" id="du" inputmode="numeric" value="${item?.duration ?? ''}">
            </div>
            ${off ? `<div>
              <label class="fl">إلزامي</label>
              <select id="rq">
                <option value="0" ${item?.required?'':'selected'}>اختياري</option>
                <option value="1" ${item?.required?'selected':''}>شرط لإتمام الدرس</option>
              </select></div>` : ''}
            <div>
              <label class="fl">اللغة</label>
              <select id="ln">
                <option value="ar" ${item?.lang!=='en'?'selected':''}>العربية</option>
                <option value="en" ${item?.lang==='en'?'selected':''}>English</option>
              </select>
            </div>
          </div>
        </div>
      </div>
      <div class="nav" style="margin-top:16px">
        <button class="btn primary" id="sv" ${k.needs==='quiz'?'disabled':''}>
          ${isNew ? 'إضافة' : 'حفظ'}</button>
      </div>`;

    document.getElementById("bk").onclick = () => render();
    app.querySelectorAll("[data-k]").forEach(el => el.onclick = () => {
      if(!isNew) return;                    // النمط لا يتغيّر بعد الإنشاء
      k = kind(el.dataset.k); draw();
    });
    document.getElementById("sv").onclick = () => save(item, off, k);
  };
  draw();
}

async function save(item, official, k){
  const v = id => (document.getElementById(id)?.value || '').trim();
  const ti = v("ti");
  if(!ti){ toast("العنوان مطلوب"); return; }
  if(k.needs === 'url'  && !v("ur")){ toast(k.label + " يحتاج رابطاً"); return; }
  if(k.needs === 'body' && !v("bo")){ toast(k.label + " يحتاج نصاً"); return; }

  const req = official && document.getElementById("rq")?.value === '1';
  const { data, error } = await api.saveItem({
    id: item?.id ?? null, lesson: ctx.lesson.id, kind: k.code, title: ti,
    description: v("de") || null,
    url: k.needs === 'url' ? v("ur") : null,
    body: k.needs === 'body' ? v("bo") : null,
    position: item?.position ?? ((D.items || []).length + 1),
    duration: v("du") ? Number(v("du")) : null,
    lang: v("ln") || 'ar',
    official, isGraded: false, required: req,
    visibility: official ? 'class' : 'class' });

  if(error){ toast(error.message); return; }
  if(!data.ok){ toast(data.error); return; }
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
