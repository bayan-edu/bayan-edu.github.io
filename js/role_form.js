/* ══════════════════════════════════════════════════════════
   بيان — role_form.js  ·  اختيارُ الدور وحقولُ المعلّم

   مكوّنٌ **واحد** يُستدعى من موضعين:
     ① تبويب «حساب جديد» في البوابة (تسجيلٌ ببريدٍ وكلمة مرور)
     ② شاشةُ إكمال الملفّ بعد أوّل دخولٍ عبر Google

   🔑 ولذلك كُتب هنا لا في أحدهما: السؤالُ واحدٌ والخياران واحدان
      والحقولُ واحدة — **ونسختان تتفارقان عند أوّل إضافةِ حقل**.
      وهو داءٌ وقع في هذا المشروع ثلاث مرّات (KEYED · F_KIND ·
      L_MATCH/L_CLOZE)، فلا يُعاد رابعةً.

   🔒 ولا تحرس هذه الوحدةُ شيئاً: الحراسةُ في `register_teacher`
      (120) — الاسمُ والمادّةُ وصيغةُ الهاتف تُفحص هناك أيضاً.
      وما هنا **راحةٌ للمستخدم لا حاجزٌ يُعتمد عليه**.
   ══════════════════════════════════════════════════════════ */
import * as api from './api.js';
import { esc, toast } from './ui.js';

/* مفاتيح الدول — الافتراضيُّ مصر، إذ المنهج المُعدّ في القاعدة مصريّ.
   ⚠️ والرقمُ يُخزَّن E.164 كاملاً، ودالّةُ القاعدة تفحص شكله. */
const DIAL = [
  ['+20','مصر'], ['+966','السعودية'], ['+971','الإمارات'], ['+965','الكويت'],
  ['+974','قطر'], ['+973','البحرين'], ['+968','عُمان'], ['+962','الأردن'],
  ['+970','فلسطين'], ['+961','لبنان'], ['+963','سوريا'], ['+964','العراق'],
  ['+967','اليمن'], ['+249','السودان'], ['+218','ليبيا'], ['+216','تونس'],
  ['+213','الجزائر'], ['+212','المغرب'], ['+222','موريتانيا'], ['+252','الصومال'],
  ['+253','جيبوتي'], ['+269','جزر القمر']
];


/* ═══════════ ① اختيار الدور ═══════════
   زرّان أصيلان بـ aria-pressed — لا صندوقٌ منسدل: الخياران اثنان
   ويُقرآن معاً، والمنسدلةُ تُخفي أحدهما خلف نقرة. */
export const roleTabs = (role = 'student') => `
  <div class="nav" id="rf_tabs" style="margin-bottom:16px">
    <button type="button" class="btn ${role==='student'?'primary':'ghost'}"
            data-role="student" aria-pressed="${role==='student'}">أنا طالب</button>
    <button type="button" class="btn ${role==='teacher'?'primary':'ghost'}"
            data-role="teacher" aria-pressed="${role==='teacher'}">أنا معلّم</button>
  </div>`;

/* يُركَّب مرّةً على الحاوية، ويُنادي onPick عند التبديل */
export function wireRoleTabs(root, onPick){
  const box = root.querySelector('#rf_tabs'); if(!box) return;
  box.querySelectorAll('[data-role]').forEach(b => b.onclick = () => {
    if(b.getAttribute('aria-pressed') === 'true') return;   // لا رسمَ بلا تغيير
    onPick(b.dataset.role);
  });
}


/* ═══════════ ② حقول المعلّم ═══════════
   opts.name = false حين يكون الاسم معروفاً سلفاً (مسار Google) */
export function teacherFields(v = {}, opts = {}){
  const withName = opts.name !== false;
  return `
    ${withName ? `
      <label class="fl" style="margin-top:16px">اسمك كما يظهر في التقارير</label>
      <input type="text" id="rf_nm" value="${esc(v.fullName||'')}" placeholder="الاسم الثلاثي">` : ''}

    <label class="fl" style="margin-top:16px">المدرسة أو الجهة</label>
    <input type="text" id="rf_sc" value="${esc(v.school||'')}" placeholder="مثال: مدرسة النيل الثانوية">

    ${/* 🔑 منتقٍ لا نصٌّ حرّ: register_teacher تُنشئ صفَّ teacher_subjects
          وهو يحتاج subject_id — ونصٌّ حرّ لا يُنتجه. شرطُ تنفيذٍ لا زينة. */''}
    <label class="fl" style="margin-top:16px">المادة التي تدرّسها</label>
    <select id="rf_sb"><option value="">— جارٍ التحميل… —</option></select>
    <p class="small">تُضاف موادُّ أخرى لاحقاً من شاشة «موادّي».</p>

    <label class="fl" style="margin-top:14px">سنوات الخبرة</label>
    <input type="text" id="rf_yr" inputmode="numeric" value="${esc(v.years??'')}" placeholder="مثال: 8">

    ${/* 🔑 ويبقى الحقل: list_mentors ترسله إلى شاشة «اختر معلمك»،
          فحذفُه يُولد كلَّ معلّمٍ ببطاقةٍ فارغة أمام طلابه. */''}
    <label class="fl" style="margin-top:14px">تعريف موجز بك</label>
    <textarea id="rf_nt" placeholder="يقرؤه الطالب في بطاقتك عند اختيار معلّمه">${esc(v.note||'')}</textarea>

    <label class="fl" style="margin-top:14px">رقم الهاتف <span style="opacity:.6">(اختياري)</span></label>
    <div style="display:flex;gap:8px">
      <select id="rf_cc" style="max-width:150px">${DIAL.map(([c,n]) =>
        `<option value="${c}" ${c==='+20'?'selected':''} dir="ltr">${esc(n)} ${c}</option>`).join("")}</select>
      <input type="tel" id="rf_ph" dir="ltr" inputmode="tel" placeholder="1012345678">
    </div>
    <p class="small">يُحفَظ ولا يُرسَل إليه رمزٌ الآن — ولا يظهر لأحد.</p>`;
}

/* يُملأ المنتقي بعد الرسم — والفشلُ يُقال ولا يُترك صندوقاً فارغاً
   يظنّه المسجِّل عطلاً في اختياره. */
export async function fillSubjects(root, selected){
  const sel = root.querySelector('#rf_sb'); if(!sel) return;
  /* 🆕 b93 · دالّةٌ لا قراءةُ جدول (122) — وتعمل قبل الجلسة وبعدها،
     فالمنتقي يظهر في البوابة كما يظهر في شاشة التفاصيل. */
  const { data, error } = await api.signupSubjects();
  if(error || !data?.length){
    sel.innerHTML = '<option value="">— تعذّر تحميل المواد —</option>';
    toast(error ? 'تعذّر تحميل المواد' : 'لا توجد مواد مُعدّة بعد');
    return;
  }
  sel.innerHTML = '<option value="">— المادة —</option>' +
    data.map(s => `<option value="${s.id}" ${String(s.id)===String(selected)?'selected':''}>${
      esc(s.name)}</option>`).join("");
}


/* ═══════════ ③ القراءة ═══════════
   تُعيد { ok, msg } أو { ok:true, v:{…} } — والرسائلُ هنا راحةٌ،
   والقاعدةُ تُعيد مثلَها لمن نادى الدالّة مباشرةً. */
export function readTeacher(root, opts = {}){
  const g = id => (root.querySelector('#' + id)?.value || '').trim();
  const withName = opts.name !== false;

  const fullName = withName ? g('rf_nm') : (opts.fullName || '');
  if(!fullName) return { ok:false, msg:'الاسم الكامل مطلوب' };
  if(!g('rf_sb')) return { ok:false, msg:'مادّتك مطلوبة' };

  /* الهاتفُ يُركَّب من المفتاح والرقم، ويُنظَّف من الفراغات والشرطات.
     والصفرُ الأوّل يسقط: «+20» و«01012…» يُنتجان رقماً بصفرٍ زائد. */
  const num = g('rf_ph').replace(/[\s\-()]/g, '').replace(/^0+/, '');
  const phone = num ? (g('rf_cc') + num) : null;

  const yr = g('rf_yr').replace(/[^\d]/g, '');

  return { ok:true, v:{
    fullName, school: g('rf_sc') || null,
    subject: Number(g('rf_sb')),
    years: yr ? Number(yr) : null,
    note: g('rf_nt') || null,
    phone } };
}
