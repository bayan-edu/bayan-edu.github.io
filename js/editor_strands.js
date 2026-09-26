/* ══════════════════════════════════════════════════════════
   بيان — editor_strands.js  ③  فروع المادة

   الفرع يجيب عن سؤالٍ لا تجيب عنه الدرجة: **أين يسكن الضعف؟**
   «٦٢٪ في العربية» لا تُترجَم إلى فعل غداً. و«نحو ٨٨٪ · بلاغة ٤١٪»
   تُترجَم في دقيقة. والتشخيص يقول نوعَ الخطأ، والفرع يقول موضعه.

   ثلاثة ثوابت مقروءة من `sql/79` لا مستنتَجة — والواجهة تتبعها:
     ① الشجرة طبقتان: فرعٌ وفرعُه. والحاوية («بحتة») لا تُوسَم.
     ② الفرع يتبع المادة لا المقرَّر — وبه يصحّ «ضعفُه في الجبر
        ممتدٌّ منذ سنتين».
     ③ ولا «غير مصنَّف»: الفراغ ثقبٌ في التأليف لا فرعٌ سادس.
        ومتى سُمّي صار فئةً، ومتى صار فئةً سكنه المحتوى وبقي.
   ══════════════════════════════════════════════════════════ */
import * as api from './api.js';
import { app, head, toast, esc, AR, errBox, nav, setWide, scrollTop } from './ui.js';
import { openCourse } from './editor.js';

/* ── ذاكرةٌ لكل مادة ──────────────────────────────────────────
   ولا تسكن `S`: الفروع عقدٌ تملكه هذه الوحدة وحدها، ونسختان
   لقائمةٍ واحدة تتباعدان يوماً. تُبطَل عند كل تعديل.          */
const CACHE = new Map();

export function clearStrands(subjectId){
  if(subjectId == null) CACHE.clear();
  else CACHE.delete(String(subjectId));
}

export async function strandsOf(subjectId){
  if(subjectId == null) return [];
  const k = String(subjectId);
  if(CACHE.has(k)) return CACHE.get(k);
  const { data, error } = await api.listStrands(subjectId);
  if(error) return [];
  CACHE.set(k, data || []);
  return data || [];
}


/* ═══════════ ① حقل الاختيار — موضعٌ واحد يبنيه ═══════════
   يقرأ منه الدرس اليوم، والمكوّن غداً. ونسخُه مرّتين يجعله يتباعد.

   🔒 والخيار الفارغ يُحذف متى كان للحقل قيمة — لا تجميلاً:
      `save_lesson` تحفظ `coalesce(p_strand, المحفوظ)`، فإرسال
      الفراغ **لا ينزع الوسم**. وعرضُ خيارٍ يُظهر «حُفظ» ولا يفعل
      شيئاً أسوأ من منعه: كذبةٌ صامتة يصدّقها المعلّم.            */
export function strandSelect(list, current, id = 'st'){
  const sel = (list || []).filter(x => x.selectable);
  if(!sel.length) return '';

  const opt = x => `<option value="${x.id}"${
    String(current) === String(x.id) ? ' selected' : ''
  }>${esc(x.name)} · ${esc(x.code)}</option>`;

  const tops = sel.filter(x => !x.parent_name);
  const fams = [...new Set(sel.filter(x => x.parent_name).map(x => x.parent_name))];

  return `<select id="${id}">
    ${current ? '' : '<option value="">— الفرع —</option>'}
    ${tops.map(opt).join('')}
    ${fams.map(f => `<optgroup label="${esc(f)}">${
        sel.filter(x => x.parent_name === f).map(opt).join('')
      }</optgroup>`).join('')}
  </select>`;
}


/* ═══════════ ② الشاشة ═══════════ */

let ctx = null;         // { course, subject }
let editing = null;     // الفرع المحرَّر — null: جديد

export async function openStrands(course, subject){
  ctx = { course, subject };
  editing = null;
  nav('editor'); setWide(true);
  head("فروع المادة", subject?.name || course.title);
  app.innerHTML = `<div class="status">جارٍ التحميل…</div>`;
  clearStrands(subject.id);
  render(await strandsOf(subject.id));
}

function render(list){
  const first = !list.length;

  const row = x => `<div class="ed-row">
      <div style="flex:1;min-width:0">
        <div class="ed-t">${
          x.parent_name ? `<span style="opacity:.65">${esc(x.parent_name)} › </span>` : ''
        }${esc(x.name)}</div>
        <div class="ed-m">
          <span class="chip">${esc(x.code)}</span>
          ${x.selectable
            ? `<span class="chip${(x.lessons + x.items) ? ' g' : ''}">${
                 AR(x.lessons)} درساً · ${AR(x.items)} مكوّناً</span>`
            : `<span class="chip">حاوية — يُوسَم ورقُها لا هي</span>`}
        </div>
      </div>
      <button class="btn ghost" data-ed="${x.id}">تحرير</button>
      <button class="btn ghost" data-del="${x.id}">حذف</button>
    </div>`;

  app.innerHTML = `
    <div class="crumb" id="bk">← دروس المقرَّر</div>

    <div class="ed-hint">🌿 الفرع يجيب عمّا لا تجيب عنه الدرجة: <b>أين يسكن الضعف؟</b>
      و«٦٢٪ في المادة» لا تُترجَم إلى فعلٍ غداً، أمّا «نحو ٨٨٪ · بلاغة ٤١٪» فتُترجَم.</div>

    <div class="ed-hint" style="opacity:.85">
      <b>أربعةٌ إلى ستّة لكلّ مادة.</b> فالتقرير لا يتكلّم عن فرعٍ قبل عشر إجاباتٍ
      فيه — وثمانيةُ فروعٍ تعني ثمانين إجابةً قبل أن يقول شيئاً.
      والفرع يُشقّ لاحقاً حين يمتلئ، أمّا جمعُ فرعين افترقا فيُعيد تصنيف تاريخٍ مضى.
      <br>🔑 والاختبار قبل كلّ اسم: <b>لو قال التقرير إن الطالب ضعيفٌ هنا، فما الذي
      يُعطى له غداً؟</b> فإن لم يكن ثمَّ جواب، فالفرع اسمٌ لا تشخيص.</div>

    ${first ? `<div class="warnbox">أوّل فرعٍ تُنشئه <b>يُفعّل حارس النشر في هذه المادة</b>:
      لن يُنشر بعده درسٌ حتى يُوسَم هو أو أحد مكوّناته. والمنشور اليوم لا يُمسّ.</div>` : ''}

    <div class="grp">الفروع <span class="chip">${AR(list.length)}</span></div>
    ${list.length ? list.map(row).join('') : '<div class="ed-empty">لا فروع بعد</div>'}

    <div class="card" style="margin-top:18px">
      <div class="grp" style="margin-top:0">${editing ? 'تحرير فرع' : 'فرعٌ جديد'}</div>

      <label class="fl">الاسم *</label>
      <input type="text" id="nm" value="${esc(editing?.name || '')}"
             placeholder="مثال: بلاغة">

      <label class="fl" style="margin-top:14px">الكود *</label>
      <input type="text" id="cd" value="${esc(editing?.code || '')}"
             placeholder="BL" style="max-width:180px">
      <p class="small">حروفٌ لاتينية كبيرة: <code>NH · BL · ALG</code> — تُعرض للمؤلّف
        لا للطالب، وتبقى ثابتةً وإن تغيّر الاسم.</p>

      <div class="ed-3" style="margin-top:14px">
        <div>
          <label class="fl">يتبع</label>
          ${editing && !editing.selectable
            ? `<div class="chip">لهذا الفرع أبناء — فلا يصير فرعاً لغيره</div>`
            : `<select id="pa">
                 <option value="">— فرعٌ رئيس —</option>
                 ${list.filter(x => !x.parent_id && String(x.id) !== String(editing?.id))
                       .map(x => `<option value="${x.id}"${
                         String(editing?.parent_id) === String(x.id) ? ' selected' : ''
                       }>${esc(x.name)}</option>`).join('')}
               </select>`}
        </div>
        <div>
          <label class="fl">الترتيب</label>
          <input type="text" id="so" inputmode="numeric"
                 value="${editing?.sort_order ?? list.length + 1}">
        </div>
        <div></div>
      </div>
      <p class="small">الشجرة طبقتان: فرعٌ وفرعُه. و«بحتة» حاويةٌ لا تُوسَم —
        يُوسَم ورقُها («جبر»).</p>

      <div class="nav" style="margin-top:14px">
        <button class="btn primary" id="sv">${editing ? 'حفظ' : '＋ إضافة الفرع'}</button>
        ${editing ? '<button class="btn ghost" id="ca">إلغاء</button>' : ''}
      </div>
    </div>`;

  document.getElementById("bk").onclick = () => openCourse(ctx.course);
  document.getElementById("sv").onclick = save;
  const ca = document.getElementById("ca");
  if(ca) ca.onclick = () => { editing = null; reload(); };

  app.querySelectorAll("[data-ed]").forEach(el => el.onclick = async () => {
    editing = (await strandsOf(ctx.subject.id))
                .find(x => String(x.id) === el.dataset.ed) || null;
    reload(); scrollTop();
  });
  app.querySelectorAll("[data-del]").forEach(el => el.onclick = () => del(el.dataset.del));
}

async function reload(){
  clearStrands(ctx.subject.id);
  render(await strandsOf(ctx.subject.id));
}

async function save(){
  const v = id => (document.getElementById(id)?.value || '').trim();
  const name = v("nm"), code = v("cd");
  if(!name || !code){ toast("الاسم والكود مطلوبان"); return; }

  const { data, error } = await api.saveStrand({
    id:      editing?.id ?? null,
    subject: ctx.subject.id,
    parent:  v("pa") ? Number(v("pa")) : null,
    code, name,
    sort:    Number(v("so")) || 0
  });
  if(error){ toast(error.message); return; }
  if(!data.ok){ toast(data.error); return; }

  toast(editing ? "حُفظ الفرع" : "أُضيف الفرع");
  editing = null;
  reload();
}

async function del(id){
  if(!confirm("حذف هذا الفرع؟")) return;
  const { data, error } = await api.deleteStrand(Number(id));
  if(error){ toast(error.message); return; }
  /* والامتناع يقول العدد: «موسومٌ به ٣ دروس — أعد وسمها أولاً» */
  if(!data.ok){ toast(data.error); return; }
  toast("حُذف الفرع");
  if(String(editing?.id) === String(id)) editing = null;
  reload();
}
