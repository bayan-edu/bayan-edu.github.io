/* ══════════════════════════════════════════════════════════
   بيان — auth.js
   البوابة · التسجيل · تسجيل المعلم · الإقلاع · لوحة المدير

   ⚠️ كل دالة تُستدعى من وحدة أخرى تُعرَّف بـ function لا بـ const،
      لأن الاستيراد الدائري يعتمد على الرفع (hoisting).
   ══════════════════════════════════════════════════════════ */
import * as api from './api.js';
import { S } from './state.js';
import { app, bar, head, toast, esc, AR, errBox, nav, registerRoutes,
         registerCounts, registerSearch, refreshCounts, mathBoot, scrollTop } from './ui.js';
import { loadList, loadFeedback, loadChat, openSearchHit } from './student.js';
import { loadTeacher, loadInbox, loadMySubjects } from './teacher.js';
import { openEditor } from './editor.js';
import { loadStudents, loadMyPerformance } from './analytics.js';
import { loadFlashcards } from './flashcards.js';
import { openPractice } from './practice.js';
import { roleTabs, wireRoleTabs, teacherFields, fillSubjects, readTeacher } from './role_form.js';
import { POLICY_VERSION, policyCheck, policyOk, POLICY_MSG } from './policy.js';

/* ═══════════ ① البوابة ═══════════ */

export function renderGate(msg){
  S.role ||= 'student';
  bar.innerHTML = "";
  head("", "", true);
  /* الترويسة تُخفى وتُنقَل هويتها إلى العمود — ونستنسخ #brand كما هو
     ليتبعنا الشعارُ إن وُجد والوردمارك إن لم يوجد، بلا افتراض. */
  document.body.classList.add("gate");
  const bEl = document.getElementById("brand");
  const reg = S.gate==="register";
  app.innerHTML = `
   <div class="gatex">
    <div class="gate-say">
      <div class="${bEl.className} hero">${bEl.innerHTML}</div>
    </div>

    <div class="gate-form">
    ${msg?`<div class="err"><b>تنبيه</b>${esc(msg)}</div>`:''}
    ${/* 🆕 b90 · بوابةٌ واحدة: مسارُ «انضم كمعلم» المنفصل أُدمج هنا.
          والاختيارُ أوّلُ ما يُرى — فالحقول تتبعه، ولا يُملأ نموذجٌ
          ثمّ يُقال للمسجِّل إنّه ملأ نموذجَ غيره. */''}
    ${reg ? roleTabs(S.role) : ''}

    ${/* 🆕 b92 · وطريقُ المزوّد يتصدّر ولا يُذيَّل — وكان تحت النموذج
          كلِّه: **من قصده لم يكن ليقرأ حقلاً واحداً**، فكان يُمرِّر
          نموذجاً لن يملأه ليبلغ زرّاً يُغنيه عنه. وهو ترتيبُ أكثر
          المنصّات: الطريقُ الأسرع أولاً، ثمّ «أو» ثمّ البريد. */''}
    ${GOOGLE_BTN}
    <div class="gate-or">أو ${reg ? 'بالبريد الإلكتروني' : 'سجّل الدخول بالبريد'}</div>

    <div class="card">
      <label class="fl">البريد الإلكتروني</label>
      <input type="email" id="em" value="${esc(draft.em||'')}"
             placeholder="name@example.com" autocomplete="email">
      <label class="fl" style="margin-top:16px">كلمة المرور</label>
      <input type="password" id="pw" placeholder="٦ أحرف على الأقل" autocomplete="${reg?'new-password':'current-password'}">
      ${/* 🆕 b93 · وعاد نموذجُ المعلّم خطوةً واحدة. كان منقسماً لأنّ
            `p_subjects_read` تشترط حساباً فلا تُقرأ قائمةُ المواد قبله
            — **والعلاجُ بابٌ ضيّق لا سياسةٌ تُرخى** (122): دالّةٌ
            تُعيد الاسمَ والمعرّفَ فقط، ممنوحةٌ لـ`anon`.
            ⚠️ و`renderTeacherDetails` تبقى: هي مسلكُ من سجّل ولم تُفتح
               له جلسةٌ (تأكيدُ البريد مفعَّل)، أو تَرَك قبل أن يُتمّ. */''}
      ${reg && S.role === 'teacher' ? teacherFields(draft.t) : ''}
      ${reg && S.role !== 'teacher' ? `
      <label class="fl" style="margin-top:16px">اسمك كما يظهر في التقارير</label>
      <input type="text" id="nm" value="${esc(draft.nm||'')}" placeholder="الاسم الثلاثي">
      <label class="fl" style="margin-top:16px">المنهج الدراسي</label>
      <select id="cur"><option value="">— اختر المنهج —</option></select>
      <div id="grwrap">
        <label class="fl" style="margin-top:14px">صفّك</label>
        <select id="gr" disabled><option value="">— اختر المنهج أولاً —</option></select>
      </div>
      <p class="small" id="grnote">يحدّدان المواد التي تظهر لك · يمكنك تغييرهما لاحقاً</p>
      <label class="fl" style="margin-top:16px">مدرستك <span style="opacity:.6">(اختياري)</span></label>
      <input type="text" id="kl" value="${esc(draft.kl||'')}" placeholder="مثال: مدرسة النيل الثانوية">`:''}
    </div>
    ${/* 🆕 b91 · الموافقة شرطُ تسجيلٍ لا شرطُ دخول: من دخل فقد وافق
          يوم سجّل. وعرضُها عند كلّ دخولٍ يُعلّم النقرَ بلا قراءة. */''}
    ${reg ? policyCheck() : ''}
    <div class="nav"><button class="btn primary" id="go">${reg?'إنشاء الحساب':'دخول'}</button></div>
    ${reg?'':'<p class="hint" id="fp" style="cursor:pointer;text-decoration:underline">نسيت كلمة المرور؟</p>'}
    <div class="gate-sep"></div>
    <button class="gate-alt" id="alt">${reg?'لديك حساب؟ سجّل الدخول':'إنشاء حساب جديد'}</button>
    ${/* 🔓 وسقط رابط «انضم كمعلم ←»: صار الدورُ خياراً في التسجيل
          نفسِه، ورابطٌ ثانٍ إلى الشيء نفسِه يُنتج نموذجين يتفارقان. */''}
    </div>
   </div>`;

  /* مشهد الافتتاح — يُكتب الشعارُ بجانب النموذج لا فوقه.
     ⚠️ مرّةً واحدة في الجلسة: renderGate تُعاد عند كل تبديلٍ بين دخولٍ
        وتسجيل، والمشهد المتكرّر يصير عائقاً لا ترحيباً.
     ⚠️ ولا شيء يتوقّف عليه: النموذج صالحٌ للكتابة من اللحظة الأولى،
        وبلا is-playing يظهر الشعار تامّاً (base.css · مشهد الافتتاح). */
  const heroEl = app.querySelector(".brand.hero");
  if(heroEl){
    let seen = false;
    try{ seen = sessionStorage.getItem("bayan.splash.seen") === "1"; }catch(e){}
    if(!seen){
      try{ sessionStorage.setItem("bayan.splash.seen","1"); }catch(e){}
      if(matchMedia("(prefers-reduced-motion: reduce)").matches) heroEl.classList.add("is-soft");
      heroEl.classList.add("is-playing");
    }
  }

  document.getElementById("alt").onclick = ()=>{ S.gate = reg ? "login" : "register"; renderGate(); };
  document.getElementById("go").onclick = submitGate;
  ["em","pw","nm","kl"].forEach(id=>{
    const el = document.getElementById(id);
    if(el) el.onkeydown = e => { if(e.key==="Enter") submitGate(); };
  });

  const fp = document.getElementById("fp");
  if(fp) fp.onclick = async ()=>{
    const em = (document.getElementById("em").value||"").trim();
    if(!em){ toast("اكتب بريدك أولاً"); return; }
    const { error } = await api.sendResetLink(em);
    toast(error ? "تعذّر الإرسال" : "أُرسل رابط الاستعادة لبريدك");
  };

  /* 🆕 b90 · تبديلُ الدور يُعيد الرسم — **وما كُتب يُحفظ قبله**.
     ولولا ذلك لفقد المسجِّلُ بريدَه واسمَه لأنّه صحّح دورَه، فتعلّم
     ألّا يصحّحه. ⚠️ وكلمةُ المرور لا تُحفَظ عمداً: قيمتُها لا تُكتب
     في HTML، ولا تُترك في كائنٍ يعيش في الذاكرة بلا داعٍ. */
  wireRoleTabs(app, r => { keepDraft(); S.role = r; renderGate(msg); });

  /* 🆕 b91 · والموافقةُ شرطٌ قبل الانطلاق إلى Google أيضاً — التسجيلُ
     بمزوّدٍ تسجيلٌ. أمّا في الدخول فلا مربّعَ ولا شرط. */
  document.getElementById("goog").onclick = async e => {
    if(reg && !policyOk(app)){ askPolicy(); return; }
    const b = e.currentTarget; b.disabled = true;
    const { error } = await api.signInWithGoogle();
    if(error){ b.disabled = false; toast(translate(error.message)); }
    /* ولا شيء بعدها: الصفحة تغادر إلى Google وتعود بجلسةٍ إلى boot. */
  };

  if(reg && S.role === 'teacher') fillSubjects(app, draft.t?.subject);
  else if(reg)                    fillGrades();

  document.getElementById("em").focus();
}

/* 🆕 b92 · نداءٌ على مربّع الموافقة حين يُردّ فعلٌ لأجله.
   🔴 وسببُه أنّ زرّ Google صار يتصدّر الصفحة والمربّعُ تحت النموذج ⇒
      **رسالةٌ عابرة تُشير إلى ما لا يراه المستخدم**، فيقرأ «وافق» ولا
      يجد على ماذا. ⇒ يُمرَّر إليه ويُومَض ويأخذ التركيز.
   ⚠️ والإيماضُ يُعاد تشغيله: إزالةُ الصنف وحدها لا تُعيد الحركة —
      المتصفّح لا يُعيد تشغيل animation إلا بعد إعادة حساب التخطيط. */
function askPolicy(){
  toast(POLICY_MSG);
  const box = app.querySelector('.pol-ck'); if(!box) return;
  box.scrollIntoView({ behavior:'smooth', block:'center' });
  box.classList.remove('ask'); void box.offsetWidth; box.classList.add('ask');
  app.querySelector('#pol_ok')?.focus({ preventScroll:true });
}

/* مسوّدةُ البوابة — تعيش بين رسمةٍ وأخرى لا أكثر */
let draft = {};
function keepDraft(){
  const g = id => document.getElementById(id)?.value ?? undefined;
  draft = { em: g('em'), nm: g('nm'), kl: g('kl'),
            t: { fullName: g('rf_nm'), school: g('rf_sc'),
                 subject: g('rf_sb'), years: g('rf_yr'), note: g('rf_nt') } };
}

/* قوائم المناهج والصفوف */
async function fillGrades(){
  const cs = document.getElementById("cur"), gs = document.getElementById("gr");
  if(!cs || !gs) return;

  if(!S.scales.length){
    const { data, error } = await api.academicScales();
    if(error){ toast("تعذّر تحميل المناهج"); return; }
    S.scales = data || [];
  }
  if(!S.scales.length){ toast("لا توجد مناهج مُعدّة بعد"); return; }

  // تجميع حسب البلد حين تتعدد
  const byCountry = {};
  S.scales.forEach(sc => (byCountry[sc.country||'مناهج'] ||= []).push(sc));
  const many = Object.keys(byCountry).length > 1;

  Object.keys(byCountry).forEach(c=>{
    const target = many ? document.createElement('optgroup') : cs;
    if(many) target.label = c;
    byCountry[c].forEach(sc=>{
      const o = document.createElement('option');
      o.value = sc.id; o.textContent = sc.name;
      target.appendChild(o);
    });
    if(many) cs.appendChild(target);
  });

  // منهج واحد فقط؟ اختره تلقائياً
  if(S.scales.length===1){ cs.value = S.scales[0].id; fillLevels(); }

  cs.onchange = fillLevels;

  function fillLevels(){
    const sc   = S.scales.find(x=>String(x.id)===cs.value);
    const wrap = document.getElementById("grwrap"), note = document.getElementById("grnote");
    gs.innerHTML = '<option value="">— اختر صفّك —</option>';
    gs.disabled  = !sc;

    const lv = (sc && sc.levels) || [];
    // مناهج بلا صفوف (جامعي · أخرى) → مسار المهارات مباشرة
    if(sc && !lv.length){
      wrap.style.display = 'none';
      note.textContent = 'ستظهر لك موادّ المهارات — بلا ارتباط بصف دراسي';
      gs.value = sc.id + '|';
      return;
    }
    wrap.style.display = '';
    note.textContent = 'يحدّدان المواد التي تظهر لك · يمكنك تغييرهما لاحقاً';
    if(!sc) return;
    lv.sort((a,b)=>a.rank-b.rank).forEach(l=>{
      const o = document.createElement('option');
      o.value = `${sc.id}|${l.id}`; o.textContent = l.name;
      gs.appendChild(o);
    });
  }
}

async function submitGate(){
  const reg = S.gate==="register";
  const em  = (document.getElementById("em").value||"").trim();
  const pw  = (document.getElementById("pw").value||"").trim();
  if(!em || !pw){ toast("أكمل البريد وكلمة المرور"); return; }
  if(pw.length < 6){ toast("كلمة المرور ٦ أحرف على الأقل"); return; }
  if(reg && !policyOk(app)){ askPolicy(); return; }

  /* 🆕 b90 · مسارُ المعلّم يتفرّع هنا وحده — والدخولُ واحدٌ للدورين
     ولا يُسأل فيه عن دور: الدورُ صفةٌ في profiles تُقرأ **بعد**
     المصادقة، ولو سُئل عنه عند الدخول لصار سؤالاً يُجاب عنه ولا أثرَ
     لجوابه — يختار «معلم» فيدخل طالباً، فيظنّ العطلَ في حسابه. */
  if(reg && S.role === 'teacher') return submitTeacherGate(em, pw);

  const nm = (document.getElementById("nm")||{}).value || "";
  const kl = (document.getElementById("kl")||{}).value || "";
  const g  = (document.getElementById("gr")||{}).value || "";
  if(reg && !nm.trim()){ toast("اكتب اسمك كما يظهر في التقارير"); return; }
  if(reg && !g){ toast("اختر صفّك الدراسي"); return; }

  const [gsc, glv] = g ? g.split('|') : [null, null];
  const scaleId = gsc ? Number(gsc) : null;
  const levelId = glv ? Number(glv) : null;

  app.innerHTML = `<div class="status">جارٍ التحقق…</div>`;
  const r = reg
    ? await api.signUp(em, pw, nm.trim(), kl.trim(), scaleId, levelId, POLICY_VERSION)
    : await api.signIn(em, pw);

  if(r.error){ renderGate(translate(r.error.message)); return; }

  /* 🆕 b91 · الختمُ يقع ساعةَ توجد الجلسة — وقبل أيّ شاشةٍ تالية.
     وبلا جلسةٍ يُؤجَّل إلى أوّل دخول: `boot` تختمه لمن لم يُختم له. */
  if(reg && r.data.session) await api.acceptPolicy(POLICY_VERSION);

  // جلسة فورية (تأكيد البريد معطّل) → احفظ الصف الآن
  if(reg && r.data.session && scaleId){
    const { data:g1, error:e1 } = await api.setMyGrade(scaleId, levelId);
    if(e1 || !g1?.ok) toast(e1?.message || g1?.error || "تعذّر حفظ الصف");
  }
  if(reg && !r.data.session){
    S.gate = "login";
    renderGate("تم إنشاء حسابك ✅ افتح بريدك واضغط رابط التفعيل ثم سجّل الدخول.");
    return;
  }
  await boot();
}

/* 🆕 b90 · تسجيل المعلّم من البوابة الموحّدة
   🔓 وحلّ محلّ renderTeacherSignup/submitTeacher: لا `pending_teacher`
      ولا «⏳ طلبك قيد المراجعة» — الدورُ يُمنح فوراً، **والتأليفُ لا
      يُمنح إلا بشهادةٍ** (120). واللوحةُ القديمة تبقى في القاعدة. */
async function submitTeacherGate(em, pw){
  if(!policyOk(app)){ askPolicy(); return; }
  const f = readTeacher(app);
  if(!f.ok){ toast(f.msg); return; }

  keepDraft();
  app.innerHTML = `<div class="status">جارٍ إنشاء الحساب…</div>`;

  /* بريدٌ مسجَّلٌ سلفاً: يُدخَل به بدل أن يُردّ — فمن سجّل طالباً ثمّ
     عاد معلّماً لا يُطلب منه بريدٌ ثانٍ. وخطأُ كلمة المرور يُقال. */
  let r = await api.signUpTeacher(em, pw, f.v.fullName, POLICY_VERSION);
  if(r.error && /already registered/i.test(r.error.message)){
    r = await api.signIn(em, pw);
    if(r.error){ renderGate("هذا البريد مسجّل — وكلمة المرور غير صحيحة"); return; }
  } else if(r.error){ renderGate(translate(r.error.message)); return; }

  /* ⚠️ بلا جلسةٍ لا تُنادى `register_teacher` — وما كُتب في النموذج
     يضيع. ⇒ `wants_teacher` تحفظ النيّة، و`renderTeacherDetails`
     تستأنف عند أوّل دخول. وهي الحالةُ الوحيدة التي بقي الانقسامُ لها. */
  if(!r.data.session){
    S.gate = "login";
    renderGate("أُنشئ حسابك ✅ فعّل بريدك ثمّ سجّل الدخول لإكمال بيانات المعلّم.");
    return;
  }

  await api.acceptPolicy(POLICY_VERSION);

  const { data, error } = await api.registerTeacher(f.v);
  if(error || !data?.ok){
    /* الحسابُ أُنشئ والجلسةُ قائمة — فلا يُعاد إلى البوابة، بل إلى
       شاشة التفاصيل برسالتها. وإعادتُه إلى البوابة تُوهمه أنّ حسابه
       لم يُنشأ فيُعيد التسجيل بالبريد نفسه. */
    return renderTeacherDetails(error?.message || data?.error);
  }

  draft = {};
  await boot();
}


/* ═══════════ ②-أ إكمالُ الملفّ بعد الدخول بمزوّد ═══════════

   🔑 شاشةُ اختيارٍ لا نموذج: الدورُ يُسأل عنه هنا كما يُسأل في البوابة
      — **بالمكوّن نفسِه** (`roleTabs`) — ثمّ يُساق صاحبُه إلى الشاشة
      التي تخصّه. ولا تُنسخ حقولُ الطالب ولا المعلّم هنا: لكلٍّ شاشتُه
      القائمة، وهذه تختار بينهما.
   ⚠️ والموافقةُ تُعرض **إن لم تكن قد خُتمت** — فمن نقرها في البوابة ثمّ
      انطلق إلى Google لا يُسأل مرّتين، ومن دخل من زرّ «الدخول» بلا
      مربّعٍ يُسأل هنا. */

export function renderCompleteProfile(msg){
  S.role ||= 'student';
  nav('subjects');
  head("أهلاً بك في بيان", S.prof?.full_name || '');
  const need = !S.prof?.policy_accepted_at;

  app.innerHTML = `
    ${msg ? `<div class="err"><b>تنبيه</b>${esc(msg)}</div>` : ''}
    <div class="card">
      <div class="line" style="color:var(--text);font-size:var(--fs-read)">
        قبل أن نبدأ — من أنت في بيان؟</div>
      <div style="margin-top:14px">${roleTabs(S.role)}</div>
      <div class="line">${S.role === 'teacher'
        ? 'نسألك بعدها عن مادّتك ومدرستك، وتظهر لطلابك في «اختر معلمك».'
        : 'نسألك بعدها عن منهجك وصفّك، وهما يحدّدان الموادَّ التي تظهر لك.'}</div>
      ${need ? policyCheck() : ''}
    </div>
    <div class="nav" style="margin-top:16px">
      <button class="btn primary" id="cp_go">تابِع ←</button>
    </div>`;

  wireRoleTabs(app, r => { S.role = r; renderCompleteProfile(msg); });

  document.getElementById("cp_go").onclick = async e => {
    if(need && !policyOk(app)){ toast(POLICY_MSG); return; }
    const b = e.currentTarget; b.disabled = true; b.textContent = '…';

    if(need){
      const { data, error } = await api.acceptPolicy(POLICY_VERSION);
      if(error || !data?.ok){
        b.disabled = false; b.textContent = 'تابِع ←';
        toast(error?.message || data?.error || 'تعذّر تسجيل الموافقة'); return;
      }
      S.prof.policy_accepted_at = data.at;
    }
    if(S.role === 'teacher') return renderTeacherDetails();
    renderGradePicker();
  };
  scrollTop();
}


/* ═══════════ ②-ب تفاصيل المعلّم — بعد الجلسة لا قبلها ═══════════
   🔑 وهي الشاشةُ نفسُها التي يصلها داخلُ Google: الدورُ يُختار في
      البوابة أو بعد OAuth، **والحقولُ واحدة** — مكوّنٌ واحد في
      `role_form.js` لا نسختان. */

export function renderTeacherDetails(msg){
  nav('subjects');
  head("أكمل بيانات المعلّم", S.prof?.full_name || '');
  app.innerHTML = `
    ${msg ? `<div class="err"><b>تنبيه</b>${esc(msg)}</div>` : ''}
    <div class="card">
      <div class="line">تظهر هذه البيانات لطلابك في شاشة «اختر معلمك».</div>
      ${teacherFields({ fullName: S.prof?.full_name }, { name:false })}
    </div>
    <div class="nav" style="margin-top:16px">
      <button class="btn primary" id="td_ok">تابِع</button>
    </div>`;

  fillSubjects(app);
  document.getElementById("td_ok").onclick = async e => {
    const f = readTeacher(app, { name:false, fullName: S.prof?.full_name });
    if(!f.ok){ toast(f.msg); return; }

    const b = e.currentTarget; b.disabled = true; b.textContent = '…';
    const { data, error } = await api.registerTeacher(f.v);
    b.disabled = false; b.textContent = 'تابِع';

    if(error){ toast(error.message); return; }
    if(!data?.ok){ renderTeacherDetails(data.error); return; }
    await boot();
  };
  scrollTop();
}


/* ═══════════ ②-ب شهادةُ التأليف — خطوةُ بريدٍ خاصّة بالمعلّم ═══════════

   🔑 ولماذا خطوةٌ مستقلّة لا `email_confirmed_at`: ذاك تابعٌ لإعداد
      `Confirm email` العامّ — لا يميّز الأدوار، وإن عُطّل صار كلُّ بريدٍ
      «مؤكَّداً» لحظةَ التسجيل فيسقط الحارسُ. (120)
   🔒 والواجهةُ **تطلب** الشهادة ولا تمنحها: `mark_author_verified`
      تقرأ طريقةَ الجلسة من `auth.mfa_amr_claims` — جدولُ المصادِق. */

export function renderVerifyAuthor(msg){
  nav('subjects');
  head("تحقّق من بريدك", S.prof?.full_name || '');
  app.innerHTML = `
    ${msg ? `<div class="err"><b>تنبيه</b>${esc(msg)}</div>` : ''}
    <div class="card">
      <div class="line" style="color:var(--text);font-size:var(--fs-read)">
        حسابك مفعّل كمعلّم — ويبقى **التأليف** معلّقاً على خطوةٍ واحدة.</div>
      <div class="line" style="margin-top:8px">
        نرسل رمزاً إلى <b dir="ltr">${esc(S.user?.email || '')}</b>.
        وهي الخطوة التي تُثبت أنّ البريد بريدُك — ولا علاقة لها بتفعيل
        الحساب عند التسجيل.</div>

      <div class="nav" style="margin-top:16px">
        <button class="btn primary" id="va_send">أرسل الرمز</button>
      </div>

      <div id="va_step" hidden>
        <label class="fl" style="margin-top:16px">الرمز الذي وصلك</label>
        <input type="text" id="va_code" dir="ltr" inputmode="numeric"
               autocomplete="one-time-code" placeholder="٦ أرقام">
        <div class="nav" style="margin-top:12px">
          <button class="btn primary" id="va_ok">تحقّق</button>
          <button class="btn ghost" id="va_again">أعد الإرسال</button>
        </div>
      </div>

      <p class="small">ويمكنك تصفّح المنصّة الآن — التأليفُ وحده ينتظر.</p>
    </div>
    <div class="nav" style="margin-top:14px">
      <button class="btn ghost" id="va_skip">لاحقاً</button>
    </div>`;

  const $ = id => document.getElementById(id);
  const send = async b => {
    b.disabled = true;
    const { error } = await api.sendEmailOtp(S.user.email);
    b.disabled = false;
    if(error){ toast(translate(error.message)); return; }
    $('va_step').hidden = false; $('va_code').focus();
    toast("أُرسل الرمز إلى بريدك");
  };

  $('va_send').onclick    = e => send(e.currentTarget);
  $('va_again').onclick   = e => send(e.currentTarget);
  $('va_skip').onclick    = () => loadTeacher();
  $('va_code').onkeydown  = e => { if(e.key === 'Enter') $('va_ok').click(); };

  $('va_ok').onclick = async e => {
    const code = ($('va_code').value || '').replace(/\s/g, '');
    if(!code){ toast("اكتب الرمز"); return; }
    const b = e.currentTarget; b.disabled = true; b.textContent = '…';

    const { error } = await api.verifyEmailOtp(S.user.email, code);
    if(error){ b.disabled = false; b.textContent = 'تحقّق';
               toast(translate(error.message)); return; }

    /* 🔑 والشهادة تُطلب من القاعدة بعد أن صارت الجلسةُ جلسةَ رمز —
       فهي التي تقرأ الطريقة، لا هذه الشاشة. */
    const { data, error: e2 } = await api.markAuthorVerified();
    b.disabled = false; b.textContent = 'تحقّق';

    if(e2){ toast(e2.message); return; }
    if(!data?.ok){
      /* 🔴 ويُقال السببُ بنصّه لا «تعذّر»: الرسالةُ الغامضة تُبقي
         المعلّم يعيد المحاولة على ما لا يُصلحه. */
      renderVerifyAuthor(data?.error || 'تعذّر إتمام التحقّق'); return;
    }
    toast("اكتمل التحقّق — صار لك التأليف");
    await boot();
  };
}

export function translate(m){
  if(/Invalid login/i.test(m))       return "البريد أو كلمة المرور غير صحيحة";
  if(/Token has expired|expired/i.test(m)) return "انتهت صلاحية الرمز — اطلب رمزاً جديداً";
  if(/Invalid token|otp/i.test(m))   return "الرمز غير صحيح — تأكّد منه أو اطلب غيره";
  if(/rate limit|too many/i.test(m)) return "أكثرتَ من الطلب — انتظر قليلاً ثمّ أعد المحاولة";
  if(/already registered/i.test(m))  return "هذا البريد مسجّل بالفعل — سجّل الدخول";
  if(/Email not confirmed/i.test(m)) return "فعّل بريدك أولاً من رابط التفعيل";
  return m;
}

/* ═══════════ ② الإقلاع ═══════════ */

export async function boot(){
  const { data:{ user } } = await api.currentUser();
  if(!user){ renderGate(); return; }
  S.user = user;

  const { data:p, error:eProf } = await api.myProfile(user.id);
  S.prof = p || { full_name:'طالب', role:'student' };

  const { data:ri, error:eRole } = await api.myRole();
  if(eProf || eRole){
    app.innerHTML = errBox(eProf || eRole, 'تحميل حسابك')
      + `<div class="nav"><button class="btn ghost" id="out">خروج</button></div>`;
    document.getElementById("out").onclick = signOut; return;
  }
  S.roleInfo = ri || { role: S.prof.role };
  const role = S.roleInfo.role;
  const meta = user.user_metadata || {};

  /* 🆕 b91 · موافقةٌ وقعت ولم تُختَم: حين يكون «تأكيد البريد» مفعَّلاً
     لا توجد جلسةٌ لحظةَ التسجيل. فالنيّةُ عبرت في البيانات الوصفية،
     وتُختَم هنا عند أوّل جلسة. **وإلا ضاعت موافقةٌ وقعت فعلاً.** */
  if(!S.prof.policy_accepted_at && meta.policy_version){
    await api.acceptPolicy(meta.policy_version);
    S.prof.policy_accepted_at = new Date().toISOString();
  }

  /* الأعداد تُجلب مرّةً هنا لا في كل شاشة — والشارات تُدهَن حين تصل.
     وبلا await عمداً: الشاشة لا تنتظر رقماً، و paintCounts تلحق بها. */
  refreshCounts();

  /* 🔓 b90 · pending_teacher لم يعد يُنتَج: register_teacher تمنح الدور
     فوراً. وتبقى الشاشة لحسابٍ قديمٍ إن وُجد — ولا يوجد اليوم. */
  if(role === 'pending_teacher') return renderPending();
  if(role === 'admin')           return loadStudents();
  /* 🆕 b90 · والمعلّمُ بلا شهادةٍ يُساق إلى خطوتها — **ولا يُحجب عن
     المنصّة**: التأليفُ وحده ينتظر، ومن حُجب كلُّه ظنّ حسابَه معطّلاً. */
  if(role === 'teacher'){
    /* 🆕 b91 · محاولةٌ صامتةٌ واحدة قبل عرض شاشة الرمز: جلسةٌ نشأت
       بمزوّدٍ (Google) أو برمزِ بريدٍ تُمنح الشهادةَ من نفسها.
       🔑 **ولا استثناءَ في الواجهة لـGoogle:** الدالّة تقرأ طريقةَ
          الجلسة من `auth.mfa_amr_claims` فتقرّر — والعميلُ لا يقول
          «أنا Google»، وقولُه لا يُصدَّق أصلاً. وجلسةُ كلمةِ المرور
          تُردّ فتظهر الشاشة كما ينبغي. */
    if(!S.prof.author_verified_at){
      const { data: mv } = await api.markAuthorVerified();
      if(mv?.ok) S.prof.author_verified_at = mv.at;
    }
    return S.prof.author_verified_at ? loadTeacher() : renderVerifyAuthor();
  }

  /* 🆕 b90 · نيّةُ التعليم تعبر الفجوة: من أنشأ حسابه معلّماً ثمّ ترك
     شاشةَ التفاصيل يعود إليها هنا. **ولولاها لبقي طالباً بلا بابٍ
     يعود منه** — إذ سقط رابط «انضم كمعلم» حين دُمج في البوابة. */
  if(meta.wants_teacher) return renderTeacherDetails();

  /* 🆕 b91 · داخلٌ بمزوّدٍ لم يختر دوره بعد ⇒ شاشةُ الاختيار.
     🔑 والشرطُ بالمزوّد لا بنقص الصفّ: مسجِّلُ البريد اختار دورَه في
        البوابة، فسؤالُه ثانيةً يُقرأ شكّاً فيما قاله. */
  if((user.app_metadata || {}).provider !== 'email' && !S.prof.scale_id)
    return renderCompleteProfile();

  // طالب بلا منهج: طبّق ما اختاره عند التسجيل، وإلا اسأله.
  if(!S.prof.scale_id){
    if(meta.scale_id){
      const { data:g } = await api.setMyGrade(
        Number(meta.scale_id), meta.level_id ? Number(meta.level_id) : null);
      if(g?.ok){
        S.prof.scale_id = Number(meta.scale_id);
        S.prof.level_id = meta.level_id ? Number(meta.level_id) : null;
      }
    }
    if(!S.prof.scale_id) return renderGradePicker();
  }

  loadList();
}

/* ═══════════ شاشة «حدّد صفّك» ═══════════
   شبكة الأمان: تصلح الحسابات القائمة والقادمة معاً — بموافقة
   الطالب لا بإسناد صفٍّ عنه. */

export function renderGradePicker(msg){
  bar.innerHTML = "";
  head("حدّد صفّك الدراسي", S.prof.full_name);
  app.innerHTML = `
    ${msg?`<div class="err"><b>تنبيه</b>${esc(msg)}</div>`:''}
    <div class="card">
      <div class="line" style="color:var(--text);margin-bottom:15px">
        لم يُحفظ منهجك بعد — اختره الآن لتظهر لك موادّ صفّك.
      </div>
      <label class="fl">المنهج الدراسي</label>
      <select id="cur"><option value="">— اختر المنهج —</option></select>
      <div id="grwrap">
        <label class="fl" style="margin-top:14px">صفّك</label>
        <select id="gr" disabled><option value="">— اختر المنهج أولاً —</option></select>
      </div>
      <p class="small" id="grnote">يمكنك تغييرهما لاحقاً</p>
    </div>
    <div class="nav"><button class="btn primary" id="go">حفظ ومتابعة</button></div>
    <div class="nav"><button class="btn ghost" id="out">خروج</button></div>`;

  fillGrades();
  document.getElementById("out").onclick = signOut;
  document.getElementById("go").onclick  = async ()=>{
    const g = (document.getElementById("gr")||{}).value || "";
    if(!g){ toast("اختر صفّك الدراسي"); return; }
    const [sc, lv] = g.split('|');
    const { data:r, error } = await api.setMyGrade(Number(sc), lv ? Number(lv) : null);
    if(error){ renderGradePicker(error.message); return; }
    if(!r.ok){ renderGradePicker(r.error); return; }
    toast("حُفظ صفّك: " + (r.level || r.scale));
    boot();
  };
}

export async function signOut(){
  await api.signOutSession();
  S.user = null;
  S.counts = {};        // وإلا ورث الداخلُ التالي أرقام من خرج
  S.gate = "login";
  renderGate();
}

/* ═══════════ ③ تسجيل المعلم — ⛔ متقاعد (b90) ═══════════

   🔓 لا يناديه شيء: الدورُ صار خياراً في البوابة الموحّدة، والتسجيلُ
      يمرّ بـ`submitTeacherGate` ثمّ `register_teacher` (120).
   ⚠️ **ويبقى ولا يُحذف** — تقاعدٌ رخيصٌ قابلٌ للتراجع. لكنّه **لا
      يُعاد وصلُه**: مسارُه يُنتج `pending_teacher` ولوحةُ البتّ فيه
      تقاعدت من شريط المدير، فمن وصله سقط في حالةٍ لا مخرجَ منها. */

export function renderTeacherSignup(msg){
  bar.innerHTML = "";
  head("الانضمام كمعلم","يُفعَّل الحساب بعد مراجعة إدارية");
  app.innerHTML = `
    ${msg?`<div class="err"><b>تنبيه</b>${esc(msg)}</div>`:''}
    <div class="card">
      <label class="fl">البريد الإلكتروني</label>
      <input type="email" id="em" placeholder="name@school.com" autocomplete="email">
      <label class="fl" style="margin-top:16px">كلمة المرور</label>
      <input type="password" id="pw" placeholder="٦ أحرف على الأقل" autocomplete="new-password">
      <label class="fl" style="margin-top:16px">الاسم الكامل</label>
      <input type="text" id="nm" placeholder="الاسم الثلاثي">
      <label class="fl" style="margin-top:16px">المدرسة أو الجهة</label>
      <input type="text" id="sc" placeholder="مثال: مدرسة النيل الثانوية">
      <label class="fl" style="margin-top:16px">المواد التي تدرّسها</label>
      <input type="text" id="sb" placeholder="مثال: الأحياء والكيمياء">
      <label class="fl" style="margin-top:16px">سنوات الخبرة</label>
      <input type="text" id="yr" inputmode="numeric" placeholder="مثال: 8">
      <label class="fl" style="margin-top:16px">تعريف موجز بك</label>
      <textarea id="nt" placeholder="اذكر ما يساعد المدير على مراجعة طلبك…"></textarea>
      <p class="small">تُراجَع الطلبات يدوياً. ستصلك النتيجة عند دخولك التالي.</p>
    </div>
    <div class="nav">
      <button class="btn primary" id="go">إرسال الطلب</button>
      <button class="btn ghost" id="bk">رجوع</button>
    </div>`;

  document.getElementById("bk").onclick = ()=>{ S.gate="login"; renderGate(); };
  document.getElementById("go").onclick = submitTeacher;
  document.getElementById("em").focus();
}

async function submitTeacher(){
  const v = id => (document.getElementById(id)?.value||"").trim();
  const em=v("em"), pw=v("pw"), nm=v("nm"), sc=v("sc"), sb=v("sb"), yr=v("yr"), nt=v("nt");

  if(!em || !pw){ toast("أكمل البريد وكلمة المرور"); return; }
  if(pw.length < 6){ toast("كلمة المرور ٦ أحرف على الأقل"); return; }
  if(!nm){ toast("اكتب اسمك الكامل"); return; }
  if(!sc){ toast("اكتب المدرسة أو الجهة"); return; }

  app.innerHTML = `<div class="status">جارٍ إنشاء الحساب…</div>`;

  let r = await api.signUp(em, pw, nm, sc);

  if(r.error && /already registered/i.test(r.error.message)){
    r = await api.signIn(em, pw);
    if(r.error){ renderTeacherSignup("هذا البريد مسجّل — كلمة المرور غير صحيحة"); return; }
  } else if(r.error){
    renderTeacherSignup(translate(r.error.message)); return;
  }

  if(!r.data.session){
    S.gate = "login";
    renderTeacherSignup("أنشئ الحساب ✅ فعّل بريدك ثم عد وسجّل الدخول لإكمال الطلب.");
    return;
  }

  const { data:res, error } = await api.requestTeacherAccess({
    school:sc, subject:sb, years: yr?Number(yr):null, note:nt });

  if(error){ renderTeacherSignup(error.message); return; }
  if(!res.ok){ renderTeacherSignup(res.error); return; }
  await boot();
}

/* ═══════════ ④ شاشة الانتظار ═══════════ */

export function renderPending(){
  nav('subjects');
  const rq = S.roleInfo?.request || {};
  head("طلبك قيد المراجعة", S.prof.full_name);
  app.innerHTML = `
    <div class="pend-hero">
      <div class="pend-ic">⏳</div>
      <div class="pend-t">طلب الانضمام كمعلم قيد المراجعة</div>
      <div class="pend-s">
        قُدّم الطلب ${rq.created_at?new Date(rq.created_at).toLocaleDateString('ar-EG'):''}<br>
        ستُفتح لوحة المعلم تلقائياً فور الموافقة.
      </div>
    </div>
    <div class="card">
      <div class="rev-q">في انتظار المراجعة، يمكنك:</div>
      <div class="line">• تصفّح الاختبارات المتاحة كطالب</div>
      <div class="line">• الاطلاع على أسلوب الأسئلة وتشخيص الفخاخ</div>
      <div class="line">• تجهيز أسئلتك استعداداً لإضافتها</div>
    </div>
    <div class="nav">
      <button class="btn primary" id="brw">تصفّح كطالب</button>
      <button class="btn ghost" id="rf">تحديث الحالة</button>
    </div>`;

  document.getElementById("brw").onclick = loadList;
  document.getElementById("rf").onclick  = boot;
}

/* ═══════════ ⑤ لوحة المدير ═══════════ */

export async function loadAdmin(status){
  const st = status || 'pending';
  nav('requests');
  head("لوحة المدير", "طلبات الانضمام كمعلم");
  app.innerHTML = `<div class="status">جارٍ التحميل…</div>`;

  const { data, error:eReq } = await api.adminRequests(st);
  if(eReq){ app.innerHTML = errBox(eReq,'طلبات المعلمين'); return; }

  const list = data || [];
  app.innerHTML = `
    <div class="subtabs">
      <div class="tab ${st==='pending'?'on':''}"  data-s="pending">قيد المراجعة</div>
      <div class="tab ${st==='approved'?'on':''}" data-s="approved">مقبولة</div>
      <div class="tab ${st==='rejected'?'on':''}" data-s="rejected">مرفوضة</div>
    </div>
    ${list.length?list.map(r=>`
      <div class="req" data-id="${r.id}">
        <div class="req-h">${esc(r.full_name)}</div>
        <div class="req-m">
          ${esc(r.email)}<br>
          ${esc(r.school||'—')} · ${esc(r.subject_area||'—')}
          ${r.years_exp?` · ${AR(r.years_exp)} سنوات خبرة`:''}<br>
          ${new Date(r.created_at).toLocaleString('ar-EG')}
        </div>
        ${r.note?`<div class="req-note">${esc(r.note).replace(/\n/g,"<br>")}</div>`:''}
        ${r.decision_note?`<div class="req-note">📝 ${esc(r.decision_note)}</div>`:''}
        ${st==='pending'?`<div class="rowbtn">
          <button class="ok-b" data-a="ok"  data-id="${r.id}">✅ قبول</button>
          <button class="no-b" data-a="no" data-id="${r.id}">✕ رفض</button>
        </div>`:''}
      </div>`).join(""):'<div class="status">لا توجد طلبات في هذه الحالة</div>'}`;

  app.querySelectorAll(".tab").forEach(t=>t.onclick=()=>loadAdmin(t.dataset.s));
  app.querySelectorAll("[data-a]").forEach(b=>b.onclick=async()=>{
    const ok = b.dataset.a === 'ok';
    const note = prompt(ok?"ملاحظة ترحيب (اختياري):":"سبب الرفض:", ok?"":"");
    if(!ok && note===null) return;
    const { data:res, error } = await api.adminDecide(Number(b.dataset.id), ok, note||null);
    if(error){ toast(error.message); return; }
    toast(res.result || "تم");
    refreshCounts();        // بُتَّ في طلب ⇒ ينقص عدّاد الطلبات
    loadAdmin(st);
  });
}

/* ═══════════ ⑥ التشغيل ═══════════ */

/* 🆕 b91 · شعارُ Google مضمَّنٌ لا مرتبط — ملفٌّ خارجيّ طلبٌ ثانٍ
   يتأخّر أو يسقط، فيظهر زرٌّ بلا علامةٍ تُعرف بها الطريقة.
   ⚠️ وألوانُه ألوانُ المزوّد لا ألوانَ الهوية: لا تُبدَّل — هي علامةٌ
      مسجَّلة، وتغييرُها يخالف إرشادات Google ويُربك من يعرفها. */
const GOOGLE_SVG = `<svg viewBox="0 0 48 48" aria-hidden="true" focusable="false">
  <path fill="#EA4335" d="M24 9.5c3.5 0 6.6 1.2 9.1 3.6l6.8-6.8C35.9 2.4 30.400 0 24 0 14.6 0 6.5 5.4 2.6 13.2l7.9 6.2C12.4 13.7 17.7 9.5 24 9.5z"/>
  <path fill="#4285F4" d="M46.1 24.6c0-1.6-.1-3.1-.4-4.6H24v9.1h12.4c-.5 2.9-2.2 5.3-4.7 6.9l7.2 5.6c4.2-3.9 6.6-9.6 6.6-16.3z"/>
  <path fill="#FBBC05" d="M10.5 28.6c-.5-1.4-.8-2.9-.8-4.6s.3-3.2.8-4.6l-7.9-6.2C1 16.3 0 20 0 24s1 7.7 2.6 10.8l7.9-6.2z"/>
  <path fill="#34A853" d="M24 48c6.5 0 11.9-2.1 15.9-5.8l-7.2-5.6c-2 1.4-4.6 2.2-8.7 2.2-6.3 0-11.6-4.2-13.5-10l-7.9 6.2C6.5 42.6 14.6 48 24 48z"/>
</svg>`;

const GOOGLE_BTN = `<button type="button" class="gate-oauth" id="goog">
  ${GOOGLE_SVG}<span>المتابعة بحساب Google</span></button>`;

/* 🆕 b89 · توكنُ جلسة التدرّب في العنوان: ‎#/t/‹توكن›‎
   والنمطُ يُحكَم هنا لا في الدالّة: ما لا يشبه توكناً لا يُرسَل أصلاً. */
const practiceToken = () => {
  const m = /^#\/t\/([A-Za-z0-9]{16,64})$/.exec(location.hash || '');
  return m ? m[1] : null;
};

export function start(){
  /* 🆕 b89 · وجلسةُ التدرّب تسبق كلَّ شيء — وقبل `boot` عمداً:
     ① زائرٌ بلا حساب، فلا بوابةَ ولا أدوارَ ولا جرس. و`boot` تُظهر
        البوابة لمن لا حساب له — أي للزائر دائماً.
     ② ولا مستمعَ لتغيّر الجلسة: `SIGNED_OUT` يصل كلَّ تبويبةٍ مفتوحة،
        فيقذف الزائرَ إلى البوابة وهو لا حسابَ له يخرج منه.
     ③ و`mathBoot` وحدها تبقى — أسئلةُ الجلسة قد تحمل معادلات. */
  const tok = practiceToken();

  /* 🆕 b89 · وتبديلُ الـhash وحده لا يُعيد تحميل الوحدات، فلصقُ رابط
     تدرّبٍ في شريط العنوان **لا يفعل شيئاً وبصمت** (قيس). والمنصّة لا
     تستعمل الـhash في موضعٍ آخر إطلاقاً، فالتحميلُ هنا لا يقطع مساراً. */
  addEventListener('hashchange', () => {
    if(practiceToken() !== tok) location.reload();
  });

  if(tok){ mathBoot(app); openPractice(tok); return; }

  // خريطة الوجهات — الموضع الوحيد الذي يربط الشريط بالشاشات
  /* ui.js لا تلمس القاعدة (الثابت ①) — فتُسلَّم الجالب ولا تعرف مصدره */
  registerCounts(async () => (await api.myCounts()).data || {});

  /* والبحثُ مثلُه: النداءُ من api والوجهةُ من student — وui.js تجهل
     مصدرَ الأول ومحتوى الثاني، فتبقى ورقةً بلا دورةِ استيراد. */
  registerSearch(api.searchAll, openSearchHit);

  registerRoutes({
    subjects:   loadList,
    cards:      loadFlashcards,
    perf:       loadMyPerformance,
    feedback:   loadFeedback,
    chat:       loadChat,
    grade:      loadTeacher,
    students:   loadStudents,
    inbox:      loadInbox,
    mySubjects: loadMySubjects,
    editor:     openEditor,
    requests:   loadAdmin,
    out:        signOut
  });

   /* الرياضيات: مراقبٌ واحد على #app يلتقط أي معادلة تُرسم — هنا
     لا في كل شاشة، فأوّلُ شاشة تُكتب بعد شهر لن تنساه. */
  mathBoot(app);
   
  api.onAuthChange((e)=>{
    if(e === 'SIGNED_OUT'){ S.gate = "login"; renderGate(); }
  });
  boot();
}
