/* ══════════════════════════════════════════════════════════
   بيان — admin_content.js
   لسانُ «إدارة المحتوى» في لوحة الإدارة (155)

   🔑 **الحدُّ الفاصل، وهو سببُ وجود هذه الوحدة:**
        المحرّر  ⇐ الدرس · الوحدة · البند · السؤال · الاختبار
        الإدارة  ⇐ المقياس · المستوى · المسار · المادّة · المقرَّر · الكود
      **فلا تلمس هذه الشاشةُ درساً ولا وحدةً ولا سؤالاً.** وفمان لقاعدةٍ
      واحدة ينحرف أحدُهما عن الآخر — وتلك علّةُ `147` بعينها.

   🔑 **ونموذجٌ واحدٌ يخدم الستّة.** لكلّ كيانٍ **وصفُ حقول** لا دالّةُ
      رسمٍ خاصّة، و`formHtml`/`readForm` تبنيان وتقرآن. ⇒ حقلٌ يُضاف
      سطرٌ في الوصف، **ولا تُنسخ شاشةٌ سادسةً فتفترق عن أخواتها.**

   ⛔ **ولا حذفَ في هذه الشاشة ولا زرَّ له.** حذفُ مادّةٍ يجرّ
      `courses → units → lessons → items → quizzes → questions → answers`
      بـ`cascade`: **محاولةُ طالبٍ تُمحى بنقرة.** والإخفاءُ بـ`active`
      حيث وُجد، والحذفُ يبقى فعلاً متعمَّداً في محرّر القاعدة.

   🔒 والحراسةُ في القاعدة: `is_admin()` في كلّ دالّة (155).
   ══════════════════════════════════════════════════════════ */
import * as api from './api.js';
import { esc, AR, N, toast, errBox } from './ui.js';

/* ── حالةُ اللسان — تبقى بين الرسمات فلا يفقد الناظر موضعه ── */
let sec  = 'scales';     // القسم المعروض
let tree = null;         // آخرُ شجرةٍ قُرئت
let open = null;         // { kind, id } — النموذجُ المفتوح
let host = null;         // العنصرُ الذي نرسم فيه

const SECS = [['scales','المناهج'], ['subjects','المواد'],
              ['courses','المقرّرات'], ['dx','أكواد التشخيص']];

/* 🔴 **الفاصلُ يُباعَد ويُخفَّف — وإلا قُرئ رقماً.** الفاصل `·` والصفرُ
   العربيّ `٠` **رسمٌ واحدٌ تقريباً**: نقطةٌ صغيرةٌ في وسط السطر. فسطرٌ
   يقول «مسار · ١٧ مادّة» يُقرأ على الشاشة **«مسار ١٧٠ مادّة»**، ويُصدَّق.
   وقيس بالتكبير أربعةَ أضعاف، ولم يكن انزياحَ اتّجاه: `bdi` و`RLM`
   أخرجا الرسمَ نفسَه. ⇒ **العلاجُ بصريٌّ لا بِنيويّ**: مسافةٌ تفصل،
   ولونٌ يقول «علامةُ ترقيم لا رقم».
   ⚠️ **والعلّةُ أوسعُ من هذه الشاشة** — كلُّ `·` يجاور `AR()` في المنصّة
      يحمل الالتباسَ نفسَه. مُثبتةٌ في `STATE` دَيناً يُرى. */
const S_ = ' <span class="ad-s">·</span> ';

/* ══════════ ① وصفُ الحقول — مصدرُ الحقيقة للنموذج والقراءة ══════════
   [مفتاح · عنوان · نوع · لازم؟ · خيارات]
   والأنواع: text · num · bool · select · area
   🔑 والعناوينُ أسماء لا أوامر (§٦ من هوية اللغة): «الكود» لا «اكتب الكود». */

const KIND  = [['academic','دراسيّ'], ['proficiency','إتقان']];
const PLACE = [['profile','من الملفّ'], ['test','باختبار'], ['open','مفتوح']];
const PROG  = [['chain','متسلسل'], ['level','بالمستوى'], ['free','حرّ']];

const FORMS = {
  scale: { name:'منهج', fields:[
    ['code','الكود','text',1], ['name','الاسم','text',1],
    ['kind','النوع','select',1,KIND],
    ['country','البلد','text'], ['track','الشعبة','text'],
    ['sort','الترتيب','num']]},

  level: { name:'مستوى', fields:[
    ['code','الكود','text',1], ['name','الاسم','text',1],
    ['rank','الرتبة','num',1],
    ['min','أدنى درجة','num'], ['max','أعلى درجة','num']]},

  path: { name:'مسار', fields:[
    ['code','الكود','text',1], ['name','الاسم','text',1],
    ['fromRank','يبدأ من الرتبة','num'], ['sort','الترتيب','num'],
    ['active','مفتوح','bool']]},

  subject: { name:'مادّة', fields:[
    ['code','الكود','text',1], ['name','الاسم','text',1],
    ['scale','المنهج','select',0,'scales'],
    ['family','العائلة','text',0,'families'],
    ['placement','التسكين','select',1,PLACE],
    ['progression','التدرّج','select',1,PROG],
    ['sort','الترتيب','num'], ['active','مفتوحة','bool'],
    ['description','الوصف','area']]},

  course: { name:'مقرَّر', fields:[
    ['title','العنوان','text',1],
    ['subject','المادّة','select',1,'subjects'],
    ['level','المستوى','select',0,'levels'],
    ['path','المسار','select',0,'paths'],
    ['electiveGroup','مجموعة الاختيار','num'],
    ['position','الترتيب','num'], ['active','مفتوح','bool']]},

  dx: { name:'كود تشخيص', fields:[
    ['code','الكود','text',1], ['name','الاسم','text',1],
    ['family','العائلة','text',0,'dxFamilies'],
    ['remedy','العلاج','area'],
    ['studentNote','ملاحظة للطالب','area']]}
};

/* القوائمُ المشتقّة من الشجرة — تُبنى عند الرسم لا تُخزَّن */
function options(src){
  if(!tree) return [];
  if(src === 'scales')   return tree.scales.map(s => [s.id, s.name]);
  if(src === 'subjects') return tree.subjects.map(s => [s.id, s.name]);
  if(src === 'levels')   return tree.scales.flatMap(s =>
      (s.levels||[]).map(l => [l.id, s.name + ' · ' + l.name]));
  if(src === 'paths')    return tree.scales.flatMap(s =>
      (s.paths||[]).map(p => [p.id, s.name + ' · ' + p.name]));
  if(src === 'families')   return (tree.families?.subject || []).map(f => [f, f]);
  if(src === 'dxFamilies') return (tree.families?.dx || []).map(f => [f, f]);
  return [];
}

/* ══════════ ② النموذج — بناءً وقراءة ══════════ */

function formHtml(kind, row, extra){
  const f = FORMS[kind];
  const val = k => row && row[k] != null ? row[k] : '';
  const one = ([k, label, type, need, src]) => {
    const id = `cf-${k}`;
    if(type === 'bool')
      return `<label class="ad-cb"><input type="checkbox" id="${id}"
                ${row == null || row[k] ? 'checked' : ''}><span>${label}</span></label>`;
    if(type === 'area')
      return `<label class="fl">${label}</label>
              <textarea id="${id}" class="ad-ta">${esc(val(k))}</textarea>`;
    if(type === 'select'){
      const opts = Array.isArray(src) ? src : options(src);
      return `<label class="fl">${label}${need ? '' : ' <span class="ad-opt-n">— اختياريّ</span>'}</label>
        <select id="${id}">
          ${need ? '' : '<option value="">—</option>'}
          ${opts.map(([v, t]) => `<option value="${esc(v)}"
             ${String(val(k)) === String(v) ? 'selected' : ''}>${esc(t)}</option>`).join('')}
        </select>`;
    }
    /* والعائلةُ حقلٌ حرٌّ بقائمةِ اقتراحٍ — لا `select` (155 · الحكم ②):
       القاعدةُ لا تقيّدها، ودالّةٌ تردّ ما تقبله القاعدةُ تكذب. */
    const list = src && !Array.isArray(src) ? ` list="dl-${k}"` : '';
    const dl   = list ? `<datalist id="dl-${k}">${
      options(src).map(([v]) => `<option value="${esc(v)}">`).join('')}</datalist>` : '';
    return `<label class="fl">${label}${need ? '' : ' <span class="ad-opt-n">— اختياريّ</span>'}</label>
            <input type="${type === 'num' ? 'number' : 'text'}" id="${id}"
                   value="${esc(val(k))}"${list}>${dl}`;
  };

  return `<div class="ad-form">
    <div class="ad-pt">${row ? 'تعديل ' + f.name : f.name + ' جديد'}</div>
    ${extra || ''}
    ${f.fields.map(one).join('')}
    <label class="fl" style="margin-top:12px">سبب التغيير — يُحفظ في السجلّ</label>
    <input type="text" id="cf-note" placeholder="اختياريّ">
    <div class="nav" style="margin-top:12px">
      <button class="btn primary" id="cfSave">حفظ</button>
      <button class="btn ghost"   id="cfBack">إلغاء</button>
    </div>
  </div>`;
}

function readForm(kind){
  const o = {};
  for(const [k, , type] of FORMS[kind].fields){
    const el = document.getElementById(`cf-${k}`);
    if(!el) continue;
    o[k] = type === 'bool' ? el.checked
         : type === 'num'  ? (el.value === '' ? null : Number(el.value))
         :                   (el.value === '' ? null : el.value);
  }
  o.note = document.getElementById('cf-note')?.value || null;
  return o;
}

/* 📐 والكاتبةُ تُقرأ قراءتين: `error` من الناقل و`data.ok` من الدالّة —
   ومن قرأ واحدةً أرى المستخدمَ نجاحاً وهو رفض. */
async function run(fn, payload, where){
  const { data, error } = await fn(payload);
  if(error){ host.insertAdjacentHTML('afterbegin', errBox(error, where)); return false; }
  if(data && data.ok === false){ toast(data.error || 'تعذّر الحفظ'); return false; }
  toast('تمّ');
  open = null; tree = null;          // الشجرةُ تُعاد قراءتُها بعد كلّ كتابة
  await paintContent(host);
  return true;
}

/* ══════════ ③ الرسم ══════════ */

export async function paintContent(el){
  host = el;
  if(!tree){
    const { data, error } = await api.contentTree();
    if(error){ host.innerHTML = errBox(error, 'شجرة المحتوى'); return; }
    tree = data || {};
  }

  host.innerHTML = `
    <div class="subtabs" id="cSecs">
      ${SECS.map(([k, t]) =>
        `<div class="tab ${sec === k ? 'on' : ''}" data-s="${k}">${t}</div>`).join('')}
    </div>
    <div id="cBody"></div>`;

  host.querySelectorAll('#cSecs .tab').forEach(t => t.onclick = () => {
    sec = t.dataset.s; open = null; paintContent(host);
  });

  const body = document.getElementById('cBody');
  body.innerHTML = sec === 'scales'   ? scalesHtml()
                 : sec === 'subjects' ? subjectsHtml()
                 : sec === 'courses'  ? coursesHtml()
                 :                      dxHtml();
  wire(body);
}

/* ── المناهج: منهجٌ يُفتح على مستوياته ومساراته ── */
function scalesHtml(){
  const s = tree.scales || [];
  return `<div class="ad-acts"><button class="ad-b" data-new="scale">منهج جديد</button></div>
    ${open?.kind === 'scale' && open.id == null ? formHtml('scale', null) : ''}
    ${s.length ? s.map(x => `
      <div class="ad-u">
        <div class="ad-uh">
          <span class="ad-un">${esc(x.name)}</span>
          <span class="chip">${esc(x.code)}</span>
          <span class="chip">${esc((KIND.find(k => k[0] === x.kind) || [,x.kind])[1])}</span>
          ${x.country ? `<span class="chip">${esc(x.country)}</span>` : ''}
        </div>
        <div class="ad-um">${[
          N(x.levels.length,'مستوى','مستويان','مستويات','مستوًى'),
          N(x.paths.length,'مسار','مساران','مسارات','مساراً'),
          N(Number(x.subjects),'مادّة','مادّتان','مواد','مادّة')].join(S_)}</div>
        <div class="ad-acts">
          <button class="ad-b" data-edit="scale" data-i="${x.id}">تعديل</button>
          <button class="ad-b" data-new="level" data-i="${x.id}">مستوى جديد</button>
          <button class="ad-b" data-new="path"  data-i="${x.id}">مسار جديد</button>
        </div>
        ${open?.kind === 'scale' && open.id === x.id ? formHtml('scale', x) : ''}
        ${open?.scale === x.id && open.id == null && (open.kind === 'level' || open.kind === 'path')
          ? formHtml(open.kind, null) : ''}
        ${x.levels.length ? `<div class="ad-sub"><div class="ad-sh">المستويات</div>
          ${x.levels.map(l => rowHtml('level', l, x.id, [
             `رتبة ${AR(l.rank)}`,
             l.min_score != null ? `الدرجة ${AR(l.min_score)}–${AR(l.max_score)}` : '',
             N(Number(l.courses),'مقرَّر','مقرَّران','مقرّرات','مقرَّراً')
           ].filter(Boolean).join(S_))).join('')}</div>` : ''}
        ${x.paths.length ? `<div class="ad-sub"><div class="ad-sh">المسارات</div>
          ${x.paths.map(p => rowHtml('path', p, x.id, [
             esc(p.code),
             p.from_rank != null ? `من رتبة ${AR(p.from_rank)}` : '',
             p.active ? '' : 'مغلق'
           ].filter(Boolean).join(S_))).join('')}</div>` : ''}
      </div>`).join('') : '<div class="status">لا منهج بعد.</div>'}`;
}

function rowHtml(kind, r, scale, meta){
  return `<div class="ad-r">
    <div class="ad-rt">${esc(r.name)}</div>
    <div class="ad-rm">${meta}</div>
    <button class="ad-b" data-edit="${kind}" data-i="${r.id}" data-sc="${scale}">تعديل</button>
    ${open?.kind === kind && open.id === r.id ? formHtml(kind, r) : ''}
  </div>`;
}

/* ── المواد ── */
function subjectsHtml(){
  const s = tree.subjects || [];
  return `<div class="ad-acts"><button class="ad-b" data-new="subject">مادّة جديدة</button></div>
    ${open?.kind === 'subject' && open.id == null ? formHtml('subject', null) : ''}
    ${s.length ? s.map(x => `
      <div class="ad-u">
        <div class="ad-uh">
          <span class="ad-un">${esc(x.name)}</span>
          <span class="chip">${esc(x.code)}</span>
          ${x.active ? '' : '<span class="chip ad-no">مغلقة</span>'}
        </div>
        <div class="ad-um">${[
          esc(x.scale || '— بلا منهج'),
          x.family ? esc(x.family) : '',
          esc((PLACE.find(p => p[0] === x.placement) || [,x.placement])[1]),
          esc((PROG.find(p => p[0] === x.progression) || [,x.progression])[1])
         ].filter(Boolean).join(S_)}</div>
        <div class="ad-lay">
          <span class="chip">${N(Number(x.courses),'مقرَّر','مقرَّران','مقرّرات','مقرَّراً')}</span>
          <span class="chip">${N(Number(x.teachers),'معلّم','معلّمان','معلّمون','معلّماً')}</span>
        </div>
        <div class="ad-acts"><button class="ad-b" data-edit="subject" data-i="${x.id}">تعديل</button></div>
        ${open?.kind === 'subject' && open.id === x.id ? formHtml('subject', {
           ...x, scale: x.scale_id }) : ''}
      </div>`).join('') : '<div class="status">لا مادّة بعد.</div>'}`;
}

/* ── المقرّرات — مجموعةً بموادّها، فالأربعون صفّاً متساوياً لا تُقرأ ── */
function coursesHtml(){
  const c = tree.courses || [];
  const by = {};
  c.forEach(x => (by[x.subject || '—'] ||= []).push(x));
  return `<div class="ad-acts"><button class="ad-b" data-new="course">مقرَّر جديد</button></div>
    ${open?.kind === 'course' && open.id == null ? formHtml('course', null) : ''}
    ${c.length ? Object.entries(by).map(([sub, list]) => `
      <div class="ad-u">
        <div class="ad-uh"><span class="ad-un">${esc(sub)}</span>
          <span class="chip">${N(list.length,'مقرَّر','مقرَّران','مقرّرات','مقرَّراً')}</span></div>
        ${list.map(x => `<div class="ad-r">
          <div class="ad-rt">${esc(x.title)}${x.active ? '' : ' <span class="chip ad-no">مغلق</span>'}</div>
          <div class="ad-rm">${[
            esc(x.level || '— بلا مستوى'),
            x.path ? esc(x.path) : '',
            N(Number(x.units),'وحدة','وحدتان','وحدات','وحدة'),
            N(Number(x.lessons),'درس','درسان','دروس','درساً')
           ].filter(Boolean).join(S_)}</div>
          <button class="ad-b" data-edit="course" data-i="${x.id}">تعديل</button>
          ${open?.kind === 'course' && open.id === x.id ? formHtml('course', {
             ...x, subject: x.subject_id, level: x.level_id, path: x.path_id,
             electiveGroup: x.elective_group }) : ''}
        </div>`).join('')}
      </div>`).join('') : '<div class="status">لا مقرَّر بعد.</div>'}`;
}

/* ── أكواد التشخيص — ميزةُ المنصّة، مجموعةً بعائلاتها ── */
function dxHtml(){
  const d = tree.dx || [];
  const by = {};
  d.forEach(x => (by[x.family || '— بلا عائلة'] ||= []).push(x));
  return `<div class="ad-acts"><button class="ad-b" data-new="dx">كود جديد</button></div>
    ${open?.kind === 'dx' && open.id == null ? formHtml('dx', null) : ''}
    ${d.length ? Object.entries(by).map(([fam, list]) => `
      <div class="ad-u">
        <div class="ad-uh"><span class="ad-un">${esc(fam)}</span>
          <span class="chip">${N(list.length,'كود','كودان','أكواد','كوداً')}</span></div>
        ${list.map(x => `<div class="ad-r">
          <div class="ad-rt"><span class="ad-code">${esc(x.code)}</span> ${esc(x.name)}</div>
          <div class="ad-rm">${x.remedy ? esc(x.remedy) : '— بلا علاج'}</div>
          <div class="ad-rm">${Number(x.uses)
            ? N(Number(x.uses),'موضع','موضعان','مواضع','موضعاً')
            : '<span class="ad-dim">لم يُستعمل بعد</span>'}</div>
          <button class="ad-b" data-edit="dx" data-i="${esc(x.code)}">تعديل</button>
          ${open?.kind === 'dx' && open.id === x.code ? formHtml('dx', {
             ...x, studentNote: x.student_note }, '<div class="ad-pn">والكود لا يُعاد تسميتُه — '
             + '<code>answers.dx_code</code> يحمله، وتغييرُه يقطع تشخيصَ محاولاتٍ وقعت.</div>') : ''}
        </div>`).join('')}
      </div>`).join('') : '<div class="status">لا كود بعد.</div>'}`;
}

/* ══════════ ④ التوصيل ══════════ */

function wire(body){
  body.querySelectorAll('[data-new]').forEach(b => b.onclick = () => {
    open = { kind: b.dataset.new, id: null, scale: b.dataset.i ? Number(b.dataset.i) : null };
    paintContent(host);
  });
  body.querySelectorAll('[data-edit]').forEach(b => b.onclick = () => {
    const k = b.dataset.edit;
    open = { kind: k, id: k === 'dx' ? b.dataset.i : Number(b.dataset.i),
             scale: b.dataset.sc ? Number(b.dataset.sc) : null };
    paintContent(host);
  });

  const back = document.getElementById('cfBack');
  if(back) back.onclick = () => { open = null; paintContent(host); };

  const save = document.getElementById('cfSave');
  if(save) save.onclick = async () => {
    const o = readForm(open.kind);
    o.id = open.id;
    if(open.kind === 'scale')   return run(api.saveScale,   o, 'حفظ المنهج');
    if(open.kind === 'level')   return run(api.saveLevel,   { ...o, scale: open.scale }, 'حفظ المستوى');
    if(open.kind === 'path')    return run(api.savePath,    { ...o, scale: open.scale }, 'حفظ المسار');
    if(open.kind === 'subject') return run(api.saveSubject, o, 'حفظ المادّة');
    if(open.kind === 'course')  return run(api.saveCourse,  o, 'حفظ المقرَّر');
    /* والكودُ مفتاحُه نصُّه: `id` لا معنى له، والقاعدةُ تُدرج أو تُحدّث */
    if(open.kind === 'dx')      return run(api.saveDxCode,  o, 'حفظ الكود');
  };
}

/* تُنادى من `admin.js` حين يُغادَر اللسان — فالشجرةُ لا تبقى بين الجلسات */
export function resetContent(){ tree = null; open = null; }
