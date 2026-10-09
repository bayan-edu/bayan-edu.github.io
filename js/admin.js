/* ══════════════════════════════════════════════════════════
   بيان — admin.js
   لوحة الإدارة: الأعضاء وصلاحياتهم · سجلّ التدقيق · المستجدات

   🔑 **ولماذا وُجدت:** المدير كان بلا شاشةِ إدارةٍ واحدة — وجهاتُه
      الخمس في `DEST` كلُّها وجهاتُ معلّم، وشاشةُ الطلبات تقاعدت في
      `b90`. **فالسلطةُ قائمةٌ ولا مقعدَ لها.**

   🔒 **والحراسة في القاعدة لا هنا.** كلُّ دالّة في `152` تفتح بـ
      `is_admin()`، ومنحُها لـ`authenticated` وحدها. والفحصُ في أوّل
      `loadConsole` **مجاملةٌ للعين لا حاجز**: يُتخطّى بفتح الطرفية،
      ولا يُعتمد عليه أمناً أبداً.

   📐 **وطبقاتُ الصلاحية أربعٌ تُعرض معاً** — وهذا جوهرُ الشاشة:
        ① الدور   profiles.role                ② التنسيق curators
        ③ المادّة teacher_subjects             ④ التحقّق author_verified_at
      و`can_author` تُحسب **في القاعدة** وتُقرأ هنا جاهزة. ولم تُحسب في
      JS عمداً: نسخةٌ ثانيةٌ من القانون تنحرف عن أصلها بلا أن يُنبّه أحد.

   🔴 **والسطرُ الذي من أجله بُنيت:** معلّمان بلا مادّةٍ معلنة لا يملكان
      التأليف، **والشاشةُ القديمة تقول لهما «لا تملك التأليف في هذه
      المادة» فيُقرأ منعاً مقصوداً لا قفلاً** (`115`). فهنا يُقال **أيُّ
      طبقةٍ سقطت بعينها**، ويُفتح البابُ من فوق حين يسهو صاحبُه.
   ══════════════════════════════════════════════════════════ */
import * as api from './api.js';
import { S } from './state.js';
import { app, head, nav, toast, esc, AR, N, G, errBox, BUILD,
         refreshCounts, goRoute } from './ui.js';
import { paintContent, resetContent } from './admin_content.js';

/* ── حالة الشاشة — تبقى بين الرسمات فلا يفقد الناظر موضعه ── */
let tab    = 'people';
let query  = '';
let roleF  = '';
let subs   = null;      // قائمة المواد — تُجلب مرّةً في عمر الصفحة
let openId = null;      // الحساب الذي فُتحت لوحةُ أفعاله
let users  = [];        // آخرُ قائمةٍ رُسمت — لوحةُ الأفعال تقرأ صاحبَها منها

/* ══════════ أسماء الأدوار ══════════

   🔑 **الصيغةُ تتبع صاحبَها لا كاتبَ الشيفرة.** `admin_users` تحمل
      `gram_gender` لكلّ حساب، فتُقرأ منها — وهو عينُ ما تفعله
      `roleWord` في `ui.js` منذ `123`.

   🔑 **والخانة الرابعة ليست مذكَّراً.** تسعةَ عشرَ حساباً قائماً لم
      يُسأل عن صيغته، فلو رُدَّ «معلّم» لخاطبهم بصيغةٍ لم يختاروها —
      وهو بعينه ما بُني العمودُ كلُّه لمنعه. و`roleWord` تردّ **فراغاً**
      لأنّ الدرجَ يعرض تحته الصفَّ، والفراغُ هنا لا يصلح: المدير يسأل
      عن الدور وهو سؤالُه الأوّل. ⇒ **ظرفٌ محايدٌ لا يتبع الجنس**،
      وهو في العربية أخفُّ من «معلّم/ة» وأصدقُ من المذكَّر. */
const ROLE_W = {
  student:         g => G(g, 'طالب', 'طالبة', 'في الدراسة'),
  teacher:         g => G(g, 'معلّم', 'معلّمة', 'في التعليم'),
  admin:           g => G(g, 'مدير',  'مديرة',  'في الإدارة'),
  pending_teacher: _ => 'طلب قيد المراجعة'
};
const roleWord = u => (ROLE_W[u.role] || (() => u.role))(u.gram);

/* أسماء الأدوار في أزرار التغيير — **أزرارٌ فمحايدةٌ دائماً** (§٤):
   لا تخاطب أحداً، بل تسمّي الحالَ المقصود. */
const ROLE_TARGET = [
  ['student',         'الدراسة'],
  ['teacher',         'التعليم'],
  ['admin',           'الإدارة'],
  ['pending_teacher', 'قيد المراجعة']
];

const BADGE = { admin:'on', teacher:'ok', student:'lock', pending_teacher:'lock' };

/* 🔴 واسمُ الدور في السجلّ لا يُكتب مفتاحَ قاعدة. كان يعرض
   `student ← teacher` — **مفاتيحَ إنجليزيةً في وجه قارئ عربيّ**،
   وصيدُها فحصُ متصفّحٍ لا قراءةُ شيفرة. والمحايدُ هو المقصود هنا:
   السجلُّ يحكي فعلاً وقع، ولا يخاطب صاحبَه. */
const ROLE_AR = Object.fromEntries(ROLE_TARGET);
const roleAr  = k => ROLE_AR[k] || k || '—';

/* ── الخطأ الذي يستحقّ ترجمةً: الملفّ 152 لم يُطبَّق كاملاً ──
   🔴 و«الخطأ الصاخب يُصلَح والصامت يُصدَّق»: رسالةُ PostgREST
      إنجليزيةٌ تقول «Could not find the function» — يقرؤها المدير
      فيحسبها عطلاً في حسابه. ⇒ تُسمّى بسببها. */
const MISSING = /PGRST202|could not find the function|does not exist/i;
const errOf = (e, where) => {
  if(!e) return '';
  if(MISSING.test(`${e.code || ''} ${e.message || ''}`))
    return `<div class="warnbox"><b>هذا الفعل ينتظر تطبيق <code>sql/152</code></b>
      دوال التغيير الأربع لم تُنشأ في القاعدة بعد، والقراءة تعمل.
      ويُكمله تشغيل الملفّ مرّة في محرّر Supabase.</div>`;
  return errBox(e, where);
};

/* ══════════ ① الإطار ══════════ */

export async function loadConsole(which){
  if(which) tab = which;
  nav('console');
  /* 🆕 b120 · بلا وصفٍ تحت العنوان — والألسنةُ الثلاثة تقوله أوجزَ منه.
     و`head(t)` تُخفي السطرَ ولا تُفرّغه، فلا يحجز حشوَه. */
  head('لوحة الإدارة');

  /* مجاملةٌ للعين لا حاجز — الحارسُ في القاعدة (رأس الملفّ) */
  if(S.roleInfo?.role !== 'admin'){
    app.innerHTML = `<div class="status">هذه الشاشة للإدارة.</div>`;
    return;
  }

  app.innerHTML = `
    <div class="tabs" id="adTabs">
      <div class="tab ${tab==='people' ?'on':''}" data-t="people">الأعضاء</div>
      <div class="tab ${tab==='content'?'on':''}" data-t="content">إدارة المحتوى</div>
      <div class="tab ${tab==='audit'  ?'on':''}" data-t="audit">السجلّ</div>
      <div class="tab ${tab==='pulse'  ?'on':''}" data-t="pulse">المستجدات</div>
    </div>
    <div id="adBody"><div class="status">جار التحميل…</div></div>`;

  app.querySelectorAll('#adTabs .tab').forEach(t =>
    t.onclick = () => {
      openId = null;
      /* الشجرةُ تُنسى عند المغادرة — فالعائدُ يراها كما هي لا كما كانت */
      if(tab === 'content' && t.dataset.t !== 'content') resetContent();
      loadConsole(t.dataset.t);
    });

  if(tab === 'people')  return paintPeople();
  /* 🆕 b121 · إدارةُ المحتوى (155) — الهيكلُ فوق الدرس. ووحدةٌ خاصّةٌ بها
     لأنّ فيها ستّةَ كيانات، و`admin.js` لا تحتمل نموذجاً سادساً. */
  if(tab === 'content') return paintContent(body());
  if(tab === 'audit')   return paintAudit();
  return paintPulse();
}

const body = () => document.getElementById('adBody');

/* ══════════ ② الناس ══════════ */

async function paintPeople(){
  /* المواد تُجلب مرّةً — تُستعمل في نطاق التنسيق وفي موادّ المعلّم */
  if(!subs){
    const { data } = await api.listTeachableSubjects();
    subs = (data || []).map(s => ({ id:s.id, name:s.name, level:s.level }));
  }

  const [{ data:ov, error:eo }, { data:us, error:eu }] =
    await Promise.all([api.adminOverview(), api.adminUsers(query, roleF)]);

  users = us || [];
  const list = users;
  const o    = ov || {};

  body().innerHTML = `
    ${errOf(eo,'أعداد المنصّة')}${errOf(eu,'قائمة الحسابات')}
    ${ov ? tiles(o) : ''}
    <div class="ad-filt">
      <input type="search" id="adQ" class="ad-q" value="${esc(query)}"
             placeholder="اسم أو بريد" aria-label="بحث في الحسابات">
      <select id="adR" aria-label="تصفية بالدور">
        <option value=""                ${roleF===''               ?'selected':''}>كل الأدوار</option>
        <option value="student"         ${roleF==='student'        ?'selected':''}>الدراسة</option>
        <option value="teacher"         ${roleF==='teacher'        ?'selected':''}>التعليم</option>
        <option value="admin"           ${roleF==='admin'          ?'selected':''}>الإدارة</option>
        <option value="pending_teacher" ${roleF==='pending_teacher'?'selected':''}>قيد المراجعة</option>
      </select>
    </div>
    ${list.length ? list.map(card).join('')
                  : '<div class="status">لا حساب يطابق هذا البحث.</div>'}
    <p class="hint">${N(list.length,'حساب','حسابان','حسابات','حساباً')} · نسخة الواجهة ${BUILD}</p>`;

  const qi = document.getElementById('adQ');
  if(qi){
    /* ⚠️ على `change` لا `input`: نداءُ قاعدةٍ مع كلّ حرفٍ يُثقل بلا فائدة */
    qi.onchange = () => { query = qi.value.trim(); openId = null; paintPeople(); };
    qi.onkeydown = e => { if(e.key === 'Enter') qi.blur(); };
  }
  const ri = document.getElementById('adR');
  if(ri) ri.onchange = () => { roleF = ri.value; openId = null; paintPeople(); };

  wirePeople();
}

function tiles(o){
  const t = (n, label) => `<div class="ad-tile"><div class="ad-tn">${AR(n ?? 0)}</div>
    <div class="ad-tl">${label}</div></div>`;
  return `<div class="ad-sum">
    ${t(o.students,'في الدراسة')}${t(o.teachers,'في التعليم')}
    ${t(o.curators,'تنسيق')}${t(o.requests,'طلبات')}
    ${t(o.quizzes,'اختبار منشور')}${t(o.questions,'سؤال حيّ')}</div>`;
}

/* ── بطاقة الحساب: الطبقاتُ الأربع ثمّ خلاصتُها الصادقة ── */
function card(u){
  const mine = u.id === S.user?.id;
  const cur  = u.curator || [], sj = u.subjects || [];
  const teach = u.role === 'teacher' || u.role === 'admin';

  /* 🔑 والسببُ يُسمّى ولا يُترك للظنّ — أيُّ طبقةٍ سقطت بعينها.
       والترتيب ترتيبُ العلاج: التحقّقُ أوّلاً ثمّ المادّة.
     🔑 **ولا يُسأل عن التأليف إلا من يُنتظر منه.** رأيتُ في أوّل رسمةٍ
        «التأليف يبدأ من دور التعليم» تحت بطاقةِ طالبة — جوابٌ عن سؤالٍ
        لا يُسأل، **وضجيجٌ يُعلّم العينَ تخطّي ما تحته.** فالطالبُ تُقرأ
        منه صفُّه ومحاولاتُه، والمعلّمُ تُقرأ منه طبقاتُه. */
  const why = (!teach || u.can_author) ? ''
    : !u.verified ? 'ينتظر التحقّق من البريد — ويُمنح من المصادِق لا من هنا (120).'
    : !sj.length  ? 'لا مادّة معلنة — وهي الطبقة الناقصة وحدها.'
    :               '';

  return `<div class="ad-u ${openId===u.id?'open':''}" data-u="${u.id}">
    <div class="ad-uh">
      <span class="ad-un" dir="auto">${esc(u.name || '—')}</span>
      <span class="badge ${BADGE[u.role] || 'lock'}">${esc(roleWord(u))}</span>
      ${mine ? '<span class="chip g">حسابك</span>' : ''}
    </div>
    <div class="ad-um" dir="auto">${esc(u.email || '—')}${
      u.klass ? ' · ' + esc(u.klass) : ''}${u.school ? ' · ' + esc(u.school) : ''}</div>

    <div class="ad-lay">
      ${cur.length ? cur.map(c =>
          `<span class="chip ad-cu">تنسيق · ${esc(c.name)}</span>`).join('') : ''}
      ${sj.length ? sj.map(s =>
          `<span class="chip">${esc(s.name)}</span>`).join('')
        : u.role === 'teacher' ? '<span class="chip ad-no">بلا مادّة</span>' : ''}
      ${/* المادّةُ والتحقّقُ طبقتا المعلّم وحده — والمديرُ يؤلّف بـis_admin،
            فشارةُ «بلا مادّة» عليه تقول نقصاً لا وجود له. */''}
      ${u.role === 'teacher' ? `<span class="chip ${u.verified?'ad-ok':'ad-no'}">${
          u.verified ? 'التحقّق ✔' : 'بلا تحقّق'}</span>` : ''}
      ${teach ? `<span class="chip ${u.can_author?'ad-ok':'ad-no'}">${
        u.can_author ? 'يؤلّف ✔' : 'لا يؤلّف ✗'}</span>` : ''}
      ${u.attempts ? `<span class="chip">${N(u.attempts,'محاولة','محاولتان','محاولات','محاولة')}</span>` : ''}
    </div>
    ${why ? `<div class="ad-why">${esc(why)}</div>` : ''}

    <div class="ad-acts">
      <button class="ad-b" data-a="role"    data-u="${u.id}">الدور</button>
      <button class="ad-b" data-a="curator" data-u="${u.id}">التنسيق</button>
      ${teach ? `<button class="ad-b" data-a="subs" data-u="${u.id}">الموادّ</button>` : ''}
    </div>
    <div class="ad-pick" id="pick-${u.id}" hidden></div>
  </div>`;
}

function wirePeople(){
  body().querySelectorAll('.ad-b').forEach(b => b.onclick = () => {
    const id = b.dataset.u, host = document.getElementById('pick-' + id);
    if(!host) return;
    /* نقرةٌ ثانيةٌ على الزرّ نفسه تطوي — ولا لوحتان مفتوحتان */
    if(!host.hidden && host.dataset.a === b.dataset.a){ host.hidden = true; return; }
    body().querySelectorAll('.ad-pick').forEach(p => p.hidden = true);
    host.dataset.a = b.dataset.a;
    host.hidden = false;
    host.innerHTML = pickHtml(b.dataset.a, id);
    wirePick(b.dataset.a, id, host);
  });
}

function userOf(id){ return users.find(x => x.id === id) || {}; }

function pickHtml(action, id){
  const u = userOf(id);
  if(action === 'role')
    return `<div class="ad-pt">الدور المقصود</div>
      <div class="ad-opts">${ROLE_TARGET
        .filter(([r]) => r !== u.role)
        .map(([r, w]) => `<button class="ad-opt" data-r="${r}">${w}</button>`).join('')}</div>
      <div class="ad-pn">وخفض دون التعليم يسحب التنسيق معه — ويُعلَن ولا يُخفى.</div>`;

  if(action === 'curator'){
    const on = new Set((u.curator || []).map(c => c.subject_id ?? 0));
    return `<div class="ad-pt">نطاق التنسيق</div>
      <div class="ad-opts">
        <button class="ad-opt ${on.has(0)?'on':''}" data-s="">كل المواد</button>
        ${subs.map(s => `<button class="ad-opt ${on.has(s.id)?'on':''}"
           data-s="${s.id}">${esc(s.name)}</button>`).join('')}
      </div>
      <div class="ad-pn">التنسيق يُنشئ الدروس وينشرها. والنقرة تمنح وتسحب.</div>`;
  }

  const on = new Set((u.subjects || []).map(s => s.id));
  return `<div class="ad-pt">موادّ التعليم</div>
    <div class="ad-opts">${subs.map(s => `<button class="ad-opt ${on.has(s.id)?'on':''}"
       data-s="${s.id}">${esc(s.name)}</button>`).join('')}</div>
    <div class="ad-pn">السعة والقبول يبقيان لما بقي. والمادّة تفتح التأليف فيها وحدها.</div>
    <div class="nav" style="margin-top:12px">
      <button class="btn primary" id="sjSave">حفظ</button></div>`;
}

function wirePick(action, id, host){
  const u = userOf(id);

  if(action === 'role')
    host.querySelectorAll('.ad-opt').forEach(b => b.onclick = async () => {
      const r = b.dataset.r, w = (ROLE_TARGET.find(x => x[0] === r) || [])[1];
      if(!confirm(`نقل ${u.name} إلى ${w}؟`)) return;
      const note = prompt('سبب التغيير — يُحفظ في السجلّ (اختياري):', '') ?? null;
      const { data:res, error } = await api.adminSetRole(id, r, note);
      done(res, error, 'تغيير الدور', res?.curator_dropped?.length
        ? `وسُحب التنسيق: ${res.curator_dropped.join(' · ')}` : '');
    });

  if(action === 'curator')
    host.querySelectorAll('.ad-opt').forEach(b => b.onclick = async () => {
      const sid = b.dataset.s === '' ? null : Number(b.dataset.s);
      const on  = b.classList.contains('on');
      const w   = b.textContent;
      if(on && !confirm(`سحب تنسيق «${w}» من ${u.name}؟`)) return;
      const note = prompt('سبب التغيير — يُحفظ في السجلّ (اختياري):', '') ?? null;
      const { data:res, error } = await api.adminSetCurator(id, sid, !on, note);
      done(res, error, 'صلاحية التنسيق');
    });

  if(action === 'subs'){
    host.querySelectorAll('.ad-opt').forEach(b =>
      b.onclick = () => b.classList.toggle('on'));
    const sv = host.querySelector('#sjSave');
    if(sv) sv.onclick = async () => {
      const ids = [...host.querySelectorAll('.ad-opt.on')].map(b => Number(b.dataset.s));
      const note = prompt('سبب التغيير — يُحفظ في السجلّ (اختياري):', '') ?? null;
      const { data:res, error } = await api.adminSetTeacherSubjects(id, ids, note);
      done(res, error, 'موادّ المعلّم',
        res?.changed === false ? 'ولا جديد — القائمة كما كانت.' : '');
    };
  }

  openId = id;
}

/* 📐 والكاتبةُ تُقرأ قراءتين: `error` من الناقل، و`data.ok` من الدالّة.
   فرسالةُ الحارس تأتي في `data` لا في `error` — ومن قرأ واحدةً
   أرى المستخدمَ نجاحاً وهو رفض. */
function done(res, error, where, extra){
  if(error){ body().insertAdjacentHTML('afterbegin', errOf(error, where)); return; }
  if(res && res.ok === false){ toast(res.error || 'تعذّر الفعل'); return; }
  toast(['تمّ', extra].filter(Boolean).join(' — '));
  refreshCounts();
  paintPeople();
}

/* ══════════ ③ السجلّ ══════════ */

const ACT = { role:'الدور', curator:'التنسيق', subjects:'الموادّ', request:'طلب' };

async function paintAudit(){
  const { data, error } = await api.adminAudit(80);
  const rows = data || [];

  body().innerHTML = `
    ${errOf(error,'سجلّ التدقيق')}
    ${rows.length ? rows.map(logRow).join('')
      : `<div class="status">لا سطر بعد — ولم يُغيَّر شيء منذ بُني السجلّ.</div>`}
    <p class="hint">${N(rows.length,'سطر','سطران','أسطر','سطراً')}</p>`;
}

function logRow(r){
  const b = r.before_state || {}, a = r.after_state || {};
  let what = '';
  if(r.action === 'role')
    what = `${esc(roleAr(b.role))} ← ${esc(roleAr(a.role))}`
         + (b.curator?.length ? ` · وسُحب التنسيق: ${esc(b.curator.join(' · '))}` : '');
  else if(r.action === 'curator')
    what = a.granted ? `مُنح · ${esc(a.granted)}` : `سُحب · ${esc(b.revoked || '—')}`;
  else if(r.action === 'subjects')
    what = `${esc((b.subjects || []).join(' · ') || 'بلا مادّة')} ← ${
             esc((a.subjects || []).join(' · ') || 'بلا مادّة')}`;

  return `<div class="ad-lg">
    <div class="ad-lgh">
      <span class="badge on">${esc(ACT[r.action] || r.action)}</span>
      <span class="ad-un" dir="auto">${esc(r.target_name || '—')}</span>
    </div>
    <div class="ad-lgw">${what}</div>
    <div class="ad-um">${esc(r.actor_name || '—')} · ${
      new Date(r.at).toLocaleString('ar-EG')}</div>
    ${r.note ? `<div class="ad-why">${esc(r.note)}</div>` : ''}
  </div>`;
}

/* ══════════ ④ المستجدات ══════════ */

async function paintPulse(){
  const { data, error } = await api.adminHealth();
  const rows = data || [];
  const bad  = rows.filter(r => r.status !== 'ok');

  body().innerHTML = `
    ${errOf(error,'المستجدات')}
    ${rows.length ? rows.map(hRow).join('')
      : '<div class="status">لا فحص — ولعلّ الملفّ 152 لم يُطبَّق.</div>'}
    <p class="hint">${bad.length
      ? `${N(bad.length,'فحص','فحصان','فحوص','فحصاً')} يحتاج نظراً من ${AR(rows.length)}`
      : 'الفحوص كلها سليمة'}</p>`;
}

function hRow(r){
  return `<div class="ad-h s-${esc(r.status)}">
    <div class="ad-hn">${AR(r.n)}</div>
    <div class="ad-hb">
      <div class="ad-hl">${esc(r.label)}</div>
      <div class="ad-hw">${esc(r.why)}</div>
      ${r.detail ? `<div class="ad-hd" dir="auto">${esc(r.detail)}</div>` : ''}
      ${r.key === 'requests_pending' && r.n
        ? `<button class="ad-b" data-go="requests">الطلبات</button>` : ''}
    </div>
  </div>`;
}
