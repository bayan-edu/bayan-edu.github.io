/* ══════════════════════════════════════════════════════════
   بيان — profile.js  ·  الملفّ الشخصيّ للطالب

   ثلاثةُ أقسام: **الهوية** · **الحساب** · **تعلّمي**.

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
import { app, head, toast, esc, AR, errBox, nav, scrollTop, G } from './ui.js';
import { renderMark } from './avatar.js';
import { POLICY_URL } from './policy.js';
import { openAvatarEdit } from './avatar_edit.js';
import { loadMyPerformance } from './analytics.js';

const MAIL = 'english.zone1978@gmail.com';
const fmtDate = d => d ? new Date(d).toLocaleDateString('ar-EG',
  { year:'numeric', month:'long', day:'numeric' }) : '—';

/* حالةُ الشاشة — تُجلب مرّةً ولا تُعاد مع كلّ رسم */
let Z = null;

export async function loadProfile(){
  nav('subjects');
  head('ملفّي', S.prof?.full_name || '');
  app.innerHTML = `<div class="status">جارٍ التحميل…</div>`;

  /* السلالمُ للصفّ، والموادُّ للمعلّمين والمستوى — نداءان لا أكثر */
  const [scRes, sbRes] = await Promise.all([ api.academicScales(), api.listSubjects() ]);
  Z = { scales: scRes.data || [], subjects: sbRes.data || [],
        err: scRes.error || sbRes.error };
  render();
  scrollTop();
}

function render(){
  const p = S.prof || {};
  const subs = Z.subjects.filter(x => x.group_key === '1_grade');
  const mentors = Z.subjects.filter(x => x.mentor_name);

  /* الصفّ: القيمةُ المختارة «سلّم|صفّ» كما في البوابة — صيغةٌ واحدة
     في الموضعين، فلا تتفارق قراءتان لشيءٍ واحد. */
  const gradeOpts = Z.scales.map(sc => `
    <optgroup label="${esc(sc.name)}">
      ${(sc.levels || []).sort((a,b)=>a.rank-b.rank).map(l => `
        <option value="${sc.id}|${l.id}" ${
          String(p.scale_id)===String(sc.id) && String(p.level_id)===String(l.id)
            ? 'selected' : ''}>${esc(l.name)}</option>`).join('')}
    </optgroup>`).join('');

  app.innerHTML = `
    ${Z.err ? errBox(Z.err, 'ملفّك') : ''}

    ${/* ═══ ① الهوية ═══ */''}
    <h2 class="sec">الهوية</h2>
    <div class="card">
      <div class="pf-id">
        <span class="pf-mark">${renderMark(p, 64)}</span>
        <div class="pf-id-t">
          <b dir="auto">${esc(p.full_name || '')}</b>
          <span class="line">${esc(
            [G(p.gram_gender,'طالب','طالبة',''), p.klass].filter(Boolean).join(' · '))}</span>
        </div>
        <button class="btn ghost" id="pfAv">تغيير صورتي</button>
      </div>

      <label class="fl" style="margin-top:18px">اسمك كما يظهر في التقارير</label>
      <input type="text" id="pfName" dir="auto" value="${esc(p.full_name || '')}">

      <label class="fl" style="margin-top:16px">صفّك الدراسيّ</label>
      <select id="pfGrade"><option value="">— الصفّ —</option>${gradeOpts}</select>
      ${/* 🔑 والتنبيهُ يُقال قبل الحفظ لا بعده: تغييرُ الصفّ يُبدّل
            الموادَّ المعروضة، وهو أثرٌ يُفاجئ من ظنّه تصحيحَ بيان. */''}
      <p class="small">تغييرُ الصفّ يُبدّل الموادَّ التي تظهر لك.</p>

      <div class="nav" style="margin-top:14px">
        <button class="btn primary" id="pfSave">حفظ الهوية</button>
      </div>
    </div>

    ${/* ═══ ② تعلّمي ═══ */''}
    <h2 class="sec">تعلّمي</h2>
    <div class="card">
      <div class="pf-row"><span>الصفّ الحاليّ</span>
        <b>${esc(subs[0]?.my_level || p.klass || '—')}</b></div>
      ${p.path_id ? `<div class="pf-row"><span>الشعبة</span><b>محفوظة</b></div>` : ''}
      <div class="pf-row"><span>موادُّ صفّك</span><b>${AR(subs.length)}</b></div>

      <div class="grp" style="margin-top:18px">من يتابعني</div>
      ${mentors.length ? mentors.map(m => `
        <div class="pf-row"><span>${esc(m.name)}</span>
          <b>${G(m.mentor_g, 'أ. ', 'أ. ', 'مع ')}${esc(m.mentor_name)}</b></div>`).join('')
        : `<div class="pf-row"><span class="line">لم تنضمّ إلى معلّمٍ بعد — يُختار من شاشة المادة.</span></div>`}

      <div class="nav" style="margin-top:16px">
        <button class="btn ghost" id="pfPerf">تقدّمي بالتفصيل ←</button>
      </div>
    </div>

    ${/* ═══ ③ الحساب ═══ */''}
    <h2 class="sec">الحساب</h2>
    <div class="card">
      <div class="pf-row"><span>البريد</span><b dir="ltr">${esc(S.user?.email || '—')}</b></div>
      <p class="small">البريدُ لا يُغيَّر من هنا — راسلنا إن لزم.</p>

      <label class="fl" style="margin-top:16px">كلمة مرورٍ جديدة</label>
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
        والاستجابةُ خلال ثلاثين يوماً على الأكثر — كما في
        <a href="${POLICY_URL}" target="_blank" rel="noopener">§٩ من السياسة</a>.
      </p>
    </div>`;

  wire();
}

function wire(){
  document.getElementById('pfAv').onclick = openAvatarEdit;

  document.getElementById('pfPerf').onclick = loadMyPerformance;

  document.getElementById('pfSave').onclick = async e => {
    const b = e.currentTarget;
    const name = document.getElementById('pfName').value.trim();
    const g    = document.getElementById('pfGrade').value;
    if(!name){ toast('الاسم الكامل مطلوب'); return; }

    b.disabled = true; b.textContent = '…';
    let changed = 0;

    /* ① الاسم — عمودٌ ممنوحٌ (٥٠). و«صفر صفوف» ليس نجاحاً (نظير ١٠٦) */
    if(name !== (S.prof.full_name || '')){
      const { data, error } = await api.setMyName(S.user.id, name);
      if(error || !data?.length){
        b.disabled = false; b.textContent = 'حفظ الهوية';
        toast('تعذّر حفظ الاسم — ' + (error?.message || 'لم يمسَّ صفَّك شيء')); return;
      }
      S.prof.full_name = name; changed++;
    }

    /* ② الصفّ — دالّةٌ لا UPDATE: تتحقّق أنّ الصفّ ينتمي للسلّم */
    if(g){
      const [sc, lv] = g.split('|');
      if(String(sc) !== String(S.prof.scale_id) || String(lv) !== String(S.prof.level_id)){
        const { data:r, error } = await api.setMyGrade(Number(sc), Number(lv));
        if(error || !r?.ok){
          b.disabled = false; b.textContent = 'حفظ الهوية';
          toast('تعذّر حفظ الصفّ — ' + (error?.message || r?.error || '')); return;
        }
        S.prof.scale_id = Number(sc); S.prof.level_id = Number(lv); changed++;
      }
    }

    b.disabled = false; b.textContent = 'حفظ الهوية';
    if(!changed){ toast('لا جديد يُحفظ'); return; }
    toast('حُفظت هويتك');
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
