/* ══════════════════════════════════════════════════════════
   بيان — profile.js  ·  الملفّ الشخصيّ — للطالب وللمعلّم

   ثلاثةُ أقسام: **البيانات الشخصية** · القسمُ الخاصُّ بالدور · **الحساب**.
     الطالب:  الاسم · الصفّ والمسار · الصورة   ‖  تعلّمي
     المعلّم: الاسم · المدرسة · الخبرة · النبذة · الصورة  ‖  تدريسي

   🔑 **وشاشةٌ واحدةٌ تتفرّع لا شاشتان — وهذا قرارُ الملفّ الأوّل.**
      قسمُ «الحساب» واحدٌ حرفاً للدورين (بريدٌ وكلمةُ مرورٍ وسياسةٌ
      وحذف)، ونسختان منه **تتفارقان عند أوّل إضافةِ حقل**. وهو داءٌ وقع
      في هذا المشروع ثلاث مرّات (KEYED · F_KIND · L_MATCH/L_CLOZE)
      ولأجله كُتب `role_form.js` مكوّناً واحداً — **فلا يُعاد رابعةً.**

   🔑 **وهذه الشاشةُ تُوفي وعداً مكتوباً لا تضيف ميزة:** سياسةُ الخصوصية
      (§٩ · «حقوقك») تقول للطالب صراحةً: «**تصحّح بيانات حسابك من صفحة
      ملفّك مباشرةً**». فغيابُها كان نقضاً لالتزامٍ منشور.

   🔑 **وما لا يقع لا يُعرَض زرّاً.** حذفُ الحساب يقع **بالمراسلة** في
      السياسة نفسِها (§٩ + §١٣)، ولا دالّةَ حذفٍ في القاعدة، ومصيرُ
      المحاولات والرسائل قرارُ احتفاظٍ لم يُتَّخذ. ⇒ يُعرَض **الطريقُ
      الذي وعدت به السياسة** بنصّه ومدّته، لا زرٌّ يوهم بما لا يقع.

   ⚠️ **والبريدُ يُعرَض ولا يُغيَّر:** تغييرُه يُرسل تأكيداً إلى العنوان
      الجديد ولا يقع حتى يُضغط، ومسارُ العودة غيرُ مبنيّ — فشاشةٌ تقول
      «حُفظ» تكذب. تفصيلُه في رأس `api.updatePassword`.

   🔒 وتلمس القاعدة (كـ`student.js`) — بخلاف `ui.js`.
   ══════════════════════════════════════════════════════════ */
import * as api from './api.js';
import { S } from './state.js';
import { app, head, toast, esc, AR, errBox, nav, scrollTop, G, goRoute, icon } from './ui.js';
import { renderMark } from './avatar.js';
import { POLICY_URL } from './policy.js';
import { openAvatarEdit } from './avatar_edit.js';
import { loadMyPerformance } from './analytics.js';

const MAIL = 'info@bayanclass.com';
const fmtDate = d => d ? new Date(d).toLocaleDateString('ar-EG',
  { year:'numeric', month:'long', day:'numeric' }) : '—';

/* حالةُ الشاشة — تُجلب مرّةً ولا تُعاد مع كلّ رسم */
let Z = null;

const isTeacher = () => ['teacher','admin'].includes(S.roleInfo?.role || S.prof?.role);

export async function loadProfile(){
  /* 🆕 b166 · قسمُها لا قسمُ «المواد»: nav() تكتب العنوانَ من القسم
     (ui.js · PATHS)، فلو بقيت 'subjects' لصار عنوانُ ملفّي /subjects. */
  nav('profile');
  /* 🔓 b107 · بلا وصفٍ تحت العنوان: كان الاسمَ، **والاسمُ حقلٌ في هذه
     الشاشة لا ترويسةٌ لها.** وشاشةُ تعديلٍ تعرض القيمةَ في خانتها. */
  head('ملفّي');
  app.innerHTML = `<div class="status">جار التحميل…</div>`;

  /* 🔑 كلُّ دورٍ يجلب ما يعرضه وحدَه — ولا يُجلب للطالب جدولُ موادّ
     التدريس ولا للمعلّم سلالمُ الصفوف. نداءٌ لا يُعرض ناتجُه ثمنٌ بلا
     مقابل، وشاشةُ الملفّ تُفتح كثيراً. */
  if(isTeacher()){
    const { data, error } = await api.listTeachableSubjects();
    Z = { teach: data || [], err: error };
  } else {
    const [scRes, sbRes] = await Promise.all([ api.academicScales(), api.listSubjects() ]);
    Z = { scales: scRes.data || [], subjects: sbRes.data || [],
          err: scRes.error || sbRes.error };
  }
  render();
  scrollTop();
}

/* ═══ ترويسةُ البطاقة — واحدةٌ للدورين، وسطرُها يتبع الدور ═══

   🔓 **b107 · والاسمُ سقط من هنا.** كان يُعرَض **ثلاثَ مرّات في شاشةٍ
      واحدة**: وصفاً تحت العنوان · في هذه الترويسة · وفي خانة «اسمك كما
      يظهر». **وشاشةُ تعديلٍ تعرض القيمةَ في حقلها** — وما عداه تكرارٌ
      يُشغل الصدر ولا يُضيف خبراً. وبقي سطرُ الدور لأنّه ليس حقلاً هنا.

   🔓 **و«تغيير صورتي» صار قلماً على العلامة** — نظيرُ ما في قائمة
      الحساب، **والفعلُ يسكن الشيءَ الذي يغيّره**. والصنفان `.av-edit`
      و`.av-pen` في `base.css` يخدمان الموضعين، فلا يفترق قلمان. */
function idHead(p){
  const sub = isTeacher()
    ? [G(p.gram_gender,'معلّم','معلّمة',''), p.school].filter(Boolean).join(' · ')
    : [G(p.gram_gender,'طالب','طالبة',''), p.klass].filter(Boolean).join(' · ');
  return `
    <div class="pf-id">
      <button class="av-edit pf-mark" id="pfAv" aria-label="تغيير صورتي">
        ${renderMark(p, 64)}
        <span class="av-pen">${icon('pen')}</span>
      </button>
      ${sub ? `<div class="pf-id-t"><span class="line">${esc(sub)}</span></div>` : ''}
    </div>`;
}

/* ═══ حقولُ البيانات — لكلّ دورٍ ما يخصّه ═══ */
function studentFields(p){
  /* الصفّ: القيمةُ «سلّم|صفّ» كما في البوابة — صيغةٌ واحدة في الموضعين،
     فلا تتفارق قراءتان لشيءٍ واحد. */
  const opts = Z.scales.map(sc => `
    <optgroup label="${esc(sc.name)}">
      ${(sc.levels || []).slice().sort((a,b)=>a.rank-b.rank).map(l => `
        <option value="${sc.id}|${l.id}" ${
          String(p.scale_id)===String(sc.id) && String(p.level_id)===String(l.id)
            ? 'selected' : ''}>${esc(l.name)}</option>`).join('')}
    </optgroup>`).join('');
  return `
    <label class="fl" style="margin-top:18px">اسمك كما يظهر في التقارير</label>
    <input type="text" id="pfName" dir="auto" value="${esc(p.full_name || '')}">

    <label class="fl" style="margin-top:16px">صفّك الدراسيّ</label>
    <select id="pfGrade"><option value="">— الصفّ —</option>${opts}</select>

    ${/* 🆕 b173 · والمسارُ تحت الصفّ — ويظهر حين يكون لصفٍّ مختارٍ مسارات.
          🔴 كان هنا سطرٌ في «تعلّمي» يقول «الشعبة: محفوظة» بلا اسم، **ولا
             حقلَ يُختار فيه** — فطالبُ الثاني بلا مسارٍ لا يرى إلا الموادَّ
             المشتركة، ولا بابَ له إلى غيرها. وخياراتُه تُبنى من الصفّ
             المختار في القائمة فوقه لا المحفوظ (`fillPaths`). */''}
    <div id="pfPathWrap" hidden>
      <label class="fl" style="margin-top:16px">مسارك</label>
      <select id="pfPath"></select>
    </div>
    ${/* 🔑 والتنبيهُ يُقال قبل الحفظ لا بعده: تغييرُ الصفّ يُبدّل
          الموادَّ المعروضة، وهو أثرٌ يُفاجئ من ظنّه تصحيحَ بيان. */''}
    <p class="small">تغيير الصفّ أو المسار يُبدّل الموادّ التي تظهر لك.</p>`;
}

/* 🆕 b173 · مساراتُ الصفّ المختار — بحكم `set_my_grade` بحرفه: مسارٌ نشطٌ في
   سلّمه بلغ الصفُّ رتبتَه (`from_rank <= rank`)، و`from_rank` الفارغُ لا يبلغه صفّ.
   والقيمةُ «سلّم|صفّ» كما في قائمة الصفّ. */
function pathsFor(value){
  const [sc, lv] = String(value || '').split('|');
  const scale = Z.scales.find(s => String(s.id) === sc);
  const level = (scale?.levels || []).find(l => String(l.id) === lv);
  if(!level) return [];
  return (scale.paths || [])
    .filter(x => x.active && x.from_rank != null && x.from_rank <= level.rank)
    .sort((a, b) => a.sort_order - b.sort_order);
}

/* اسمُ المسار المحفوظ — من السلّم نفسِه، فلا نداءَ له */
function pathName(p){
  const scale = Z.scales.find(s => String(s.id) === String(p.scale_id));
  return (scale?.paths || []).find(x => String(x.id) === String(p.path_id))?.name || '';
}

/* يملأ حقلَ المسار بحسب الصفّ المختار، ويُبقي المحفوظَ مختاراً ما دام صالحاً.
   ⚠️ وصفٌّ بلا مسارات يُخفي الحقلَ **ويُفرغه**: الحفظُ يقرأ القيمة، ومسارٌ
      قديمٌ باقٍ في حقلٍ مخفيٍّ يُرسَل مع صفٍّ لا يقبله فيُردّ الحفظُ كلُّه. */
function fillPaths(value){
  const wrap = document.getElementById('pfPathWrap'), sel = document.getElementById('pfPath');
  if(!wrap || !sel) return;
  const list = pathsFor(value);
  wrap.hidden = !list.length;
  sel.innerHTML = list.length
    ? `<option value="">— المسار —</option>` + list.map(x => `
        <option value="${x.id}" ${String(x.id) === String(S.prof?.path_id) ? 'selected' : ''}>${esc(x.name)}</option>`).join('')
    : '';
}

function teacherFields(p){
  /* ⚠️ وهذه الحقولُ **يراها الطلاب** في بطاقة «اختيار معلمك» — فيُقال
     ذلك هنا، وإلا ظنّها صاحبُها بياناتٍ إدارية لا يقرؤها أحد. */
  return `
    <label class="fl" style="margin-top:18px">اسمك كما يظهر لطلابك</label>
    <input type="text" id="pfName" dir="auto" value="${esc(p.full_name || '')}">

    <label class="fl" style="margin-top:16px">المدرسة أو الجهة</label>
    <input type="text" id="pfSchool" dir="auto" value="${esc(p.school || '')}">

    <label class="fl" style="margin-top:16px">سنوات الخبرة</label>
    <input type="text" id="pfYears" inputmode="numeric" value="${esc(p.years_exp ?? '')}">

    <label class="fl" style="margin-top:16px">تعريف موجز بك</label>
    <textarea id="pfBio" dir="auto">${esc(p.bio || '')}</textarea>
    <p class="small">الاسم والمدرسة والخبرة والتعريف تظهر لطلابك في شاشة «اختيار معلمك».</p>`;
}

/* ═══ القسمُ الخاصُّ بالدور ═══ */
function learnCard(p){
  const subs    = Z.subjects.filter(x => x.group_key === '1_grade');
  const mentors = Z.subjects.filter(x => x.mentor_name);
  return `
    <h2 class="sec">تعلّمي</h2>
    <div class="card">
      <div class="pf-row"><span>الصفّ الحاليّ</span>
        <b>${esc(subs[0]?.my_level || p.klass || '—')}</b></div>
      ${/* 🆕 b173 · المسارُ باسمه — وكان «الشعبة: محفوظة»: خبرٌ لا يقول شيئاً.
            وصفٌّ له مساراتٌ ولم يُختر فيه ⇒ يُقال ذلك، فالحقلُ فوقه ينتظر. */''}
      ${p.path_id ? `<div class="pf-row"><span>المسار</span><b>${esc(pathName(p) || '—')}</b></div>`
        : pathsFor(p.scale_id + '|' + p.level_id).length
          ? `<div class="pf-row"><span>المسار</span><b>لم يُختر بعد</b></div>` : ''}
      <div class="pf-row"><span>موادّ صفّك</span><b>${AR(subs.length)}</b></div>

      <div class="grp" style="margin-top:18px">من يتابعني</div>
      ${mentors.length ? mentors.map(m => `
        <div class="pf-row"><span>${esc(m.name)}</span>
          <b>${G(m.mentor_g, 'أ. ', 'أ. ', 'مع ')}${esc(m.mentor_name)}</b></div>`).join('')
        : `<div class="pf-row"><span class="line">لم تنضمّ إلى معلّم بعد — يُختار من شاشة المادة.</span></div>`}

      <div class="nav" style="margin-top:16px">
        <button class="btn ghost" id="pfPerf">تقدّمي بالتفصيل ←</button>
      </div>
    </div>`;
}

function teachCard(){
  const mine = (Z.teach || []).filter(x => x.chosen);
  const load = mine.reduce((s,x) => s + (x.students || 0), 0);
  const cap  = mine.reduce((s,x) => s + (x.capacity || 0), 0);
  return `
    <h2 class="sec">تدريسي</h2>
    <div class="card">
      <div class="pf-row"><span>الموادّ المختارة</span><b>${AR(mine.length)}</b></div>
      <div class="pf-row"><span>الطلاب الآن</span>
        <b>${AR(load)}${cap ? ' من ' + AR(cap) : ''}</b></div>

      <div class="grp" style="margin-top:18px">موادّي وسعتُها</div>
      ${mine.length ? mine.map(x => `
        <div class="pf-row"><span>${esc(x.name)}</span>
          <b>${AR(x.students || 0)} / ${AR(x.capacity || 0)}</b></div>`).join('')
        : `<div class="pf-row"><span class="line">لم تُختَر موادّ بعد — تُختار من شاشة «موادّي».</span></div>`}

      ${/* 🔑 والسعةُ تُعرَض هنا ولا تُحرَّر: موضعُها الوحيد شاشةُ «موادّي»
            (b88 · «ورقمان لشيءٍ واحد يتفارقان»). وحقلان لقيمةٍ واحدة في
            شاشتين يُنتجان حفظَين يتسابقان. */''}
      <div class="nav" style="margin-top:16px">
        <button class="btn ghost" data-go="mySubjects">موادّي وسعتُها ←</button>
        <button class="btn ghost" data-go="students">لوحة التحليلات ←</button>
      </div>
    </div>`;
}

function render(){
  const p = S.prof || {};

  app.innerHTML = `
    ${Z.err ? errBox(Z.err, 'ملفّك') : ''}
    <h2 class="sec">البيانات الشخصية</h2>
    <div class="card">
      ${idHead(p)}
      ${isTeacher() ? teacherFields(p) : studentFields(p)}
      <div class="nav" style="margin-top:14px">
        <button class="btn primary" id="pfSave">حفظ</button>
      </div>
    </div>
    ${isTeacher() ? teachCard() : learnCard(p)}

    <h2 class="sec">الحساب</h2>
    <div class="card">
      <div class="pf-row"><span>البريد</span><b dir="ltr">${esc(S.user?.email || '—')}</b></div>
      <p class="small">البريد لا يُغيَّر من هنا — راسلنا إن لزم.</p>

      <label class="fl" style="margin-top:16px">كلمة مرور جديدة</label>
      <input type="password" id="pfPw" placeholder="٦ أحرف على الأقل" autocomplete="new-password">
      <div class="nav" style="margin-top:12px">
        <button class="btn ghost" id="pfPwGo">تغيير كلمة المرور</button>
      </div>

      <div class="pf-row" style="margin-top:18px"><span>سياسة الخصوصية</span>
        ${/* ⚠️ «وافقت» بلا شكلة — صالحةٌ للصيغتين (المهمّة ١). وكانت
              مشكولةً في أوّل كتابةٍ لهذا الملفّ فأُصلحت: **القاعدةُ تُخرق
              في النصّ الجديد أسرعَ ممّا تُخرق في القديم.** */''}
        <b>${p.policy_accepted_at
              ? 'وافقت في ' + esc(fmtDate(p.policy_accepted_at))
              : 'لم تُسجَّل موافقة'}</b></div>
      ${p.policy_version ? `<div class="pf-row"><span>النسخة</span>
        <b dir="ltr">${esc(p.policy_version)}</b></div>` : ''}
      <p class="small"><a href="${POLICY_URL}" target="_blank" rel="noopener">قراءة السياسة</a></p>

      ${/* 🔑 الحذفُ كما وعدت به السياسة — نصّاً ومدّةً، لا زرّاً يوهم */''}
      <div class="grp" style="margin-top:20px">حذف الحساب</div>
      <p class="small">
        لك أن تطلب حذف حسابك وبياناتك الشخصية. يُطلب بالمراسلة على
        <a href="mailto:${MAIL}" dir="ltr">${MAIL}</a>،
        والاستجابة خلال ثلاثين يوماً على الأكثر — كما في
        <a href="${POLICY_URL}" target="_blank" rel="noopener">§٩ من السياسة</a>.
      </p>
    </div>`;

  wire();
}

function wire(){
  document.getElementById('pfAv').onclick = openAvatarEdit;

  const perf = document.getElementById('pfPerf');
  if(perf) perf.onclick = loadMyPerformance;

  /* وجهاتُ المعلّم تمرّ بالمُوجِّه نفسِه الذي يخدم الدرج — لا نسخةَ ثانية */
  app.querySelectorAll('[data-go]').forEach(b => b.onclick = () => goRoute(b.dataset.go));

  /* 🆕 b173 · حقلُ المسار يتبع الصفَّ المختار لحظةَ اختياره، لا بعد الحفظ */
  const grade = document.getElementById('pfGrade');
  if(grade){ fillPaths(grade.value); grade.onchange = () => fillPaths(grade.value); }

  document.getElementById('pfSave').onclick = async e => {
    const b = e.currentTarget;
    const name = document.getElementById('pfName').value.trim();
    if(!name){ toast('الاسم الكامل مطلوب'); return; }

    b.disabled = true; b.textContent = '…';
    let changed = 0;

    /* ① الاسم — عمودٌ ممنوحٌ (٥٠). و«صفر صفوف» ليس نجاحاً (نظير ١٠٦) */
    if(name !== (S.prof.full_name || '')){
      const { data, error } = await api.setMyName(S.user.id, name);
      if(error || !data?.length){
        b.disabled = false; b.textContent = 'حفظ';
        toast('تعذّر حفظ الاسم — ' + (error?.message || 'لم يمسّ صفَّك شيء')); return;
      }
      S.prof.full_name = name; changed++;
    }

    /* ①ب حقولُ المعلّم — **كتابةٌ واحدة لا ثلاث.** ثلاثةُ نداءاتٍ
       متتابعة تُنتج نجاحاً جزئياً عند انقطاعٍ في الوسط: يُحفظ الاسمُ
       وتسقط النبذة، ولا يعرف صاحبُها أيُّهما وقع. */
    if(isTeacher()){
      const school = document.getElementById('pfSchool').value.trim() || null;
      const bio    = document.getElementById('pfBio').value.trim() || null;
      const yrRaw  = document.getElementById('pfYears').value.replace(/[^\d]/g, '');
      const years  = yrRaw === '' ? null : Number(yrRaw);
      const same = school === (S.prof.school ?? null)
                && bio    === (S.prof.bio ?? null)
                && years  === (S.prof.years_exp ?? null);
      if(!same){
        const { data, error } = await api.setMyTeacherInfo(S.user.id, { school, bio, years });
        if(error || !data?.length){
          b.disabled = false; b.textContent = 'حفظ';
          toast('تعذّر الحفظ — ' + (error?.message || 'لم يمسّ صفَّك شيء')); return;
        }
        S.prof.school = school; S.prof.bio = bio; S.prof.years_exp = years; changed++;
      }
    }

    /* ② الصفّ — دالّةٌ لا UPDATE: تتحقّق أنّ الصفّ ينتمي للسلّم.
       وللطالب وحده: المعلّمُ لا صفَّ له، والحقلُ غيرُ مرسومٍ عنده.
       🆕 b173 · **والمسارُ معه في نداءٍ واحد** — والدالّةُ تكتبهما معاً:
          حفظُ الصفّ بلا مسارٍ يمحو المسارَ المحفوظ (api.setMyGrade). فيُرسَل
          ما في الحقل، والحقلُ يحمل المحفوظَ ما دام صالحاً للصفّ (`fillPaths`). */
    const g = document.getElementById('pfGrade')?.value || '';
    if(g){
      const [sc, lv] = g.split('|');
      const pv  = document.getElementById('pfPathWrap')?.hidden ? ''
                : (document.getElementById('pfPath')?.value || '');
      const pth = pv ? Number(pv) : null;
      if(String(sc) !== String(S.prof.scale_id) || String(lv) !== String(S.prof.level_id)
         || pth !== (S.prof.path_id ?? null)){
        const { data:r, error } = await api.setMyGrade(Number(sc), Number(lv), pth);
        if(error || !r?.ok){
          b.disabled = false; b.textContent = 'حفظ';
          toast('تعذّر حفظ الصفّ — ' + (error?.message || r?.error || '')); return;
        }
        S.prof.scale_id = Number(sc); S.prof.level_id = Number(lv); S.prof.path_id = pth; changed++;
      }
    }

    b.disabled = false; b.textContent = 'حفظ';
    if(!changed){ toast('لا جديد يُحفظ'); return; }
    toast('حُفظت بياناتك');
    /* 🔑 والشاشةُ تُعاد بناءً على الجديد: الصفُّ يُبدّل الموادَّ والمستوى،
       فعرضٌ قديمٌ بعد حفظٍ ناجح يُقرأ فشلاً. */
    loadProfile();
  };

  document.getElementById('pfPwGo').onclick = async e => {
    const inp = document.getElementById('pfPw');
    const pw = inp.value.trim();
    if(pw.length < 6){ toast('كلمة المرور ٦ أحرف على الأقل'); return; }
    const b = e.currentTarget; b.disabled = true; b.textContent = '…';
    const { error } = await api.updatePassword(pw);
    b.disabled = false; b.textContent = 'تغيير كلمة المرور';
    if(error){ toast('تعذّر التغيير — ' + error.message); return; }
    inp.value = '';
    toast('تغيّرت كلمة المرور');
  };
}
