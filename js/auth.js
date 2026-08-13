/* ══════════════════════════════════════════════════════════
   بيان — auth.js
   البوابة · التسجيل · تسجيل المعلم · الإقلاع · لوحة المدير

   ⚠️ كل دالة تُستدعى من وحدة أخرى تُعرَّف بـ function لا بـ const،
      لأن الاستيراد الدائري يعتمد على الرفع (hoisting).
   ══════════════════════════════════════════════════════════ */
import { db } from './api.js';
import { S } from './state.js';
import { app, bar, head, toast, esc, AR } from './ui.js';
import { loadList } from './student.js';
import { loadTeacher } from './teacher.js';

/* ═══════════ ① البوابة ═══════════ */

export function renderGate(msg){
  bar.innerHTML = "";
  head("", S.gate==="login" ? "سجّل الدخول لمتابعة تقدّمك"
                            : "أنشئ حسابك في نصف دقيقة", true);
  const reg = S.gate==="register";
  app.innerHTML = `
    <div class="tabs">
      <div class="tab ${reg?'':'on'}" data-g="login">تسجيل الدخول</div>
      <div class="tab ${reg?'on':''}" data-g="register">حساب جديد</div>
    </div>
    ${msg?`<div class="err"><b>تنبيه</b>${esc(msg)}</div>`:''}
    <div class="card">
      <label class="fl">البريد الإلكتروني</label>
      <input type="email" id="em" placeholder="name@example.com" autocomplete="email">
      <label class="fl" style="margin-top:16px">كلمة المرور</label>
      <input type="password" id="pw" placeholder="٦ أحرف على الأقل" autocomplete="${reg?'new-password':'current-password'}">
      ${reg?`
      <label class="fl" style="margin-top:16px">اسمك كما يظهر في التقارير</label>
      <input type="text" id="nm" placeholder="الاسم الثلاثي">
      <label class="fl" style="margin-top:16px">المنهج الدراسي</label>
      <select id="cur"><option value="">— اختر المنهج —</option></select>
      <div id="grwrap">
        <label class="fl" style="margin-top:14px">صفّك</label>
        <select id="gr" disabled><option value="">— اختر المنهج أولاً —</option></select>
      </div>
      <p class="small" id="grnote">يحدّدان المواد التي تظهر لك · يمكنك تغييرهما لاحقاً</p>
      <label class="fl" style="margin-top:16px">مدرستك <span style="opacity:.6">(اختياري)</span></label>
      <input type="text" id="kl" placeholder="مثال: مدرسة النيل الثانوية">`:''}
    </div>
    <div class="nav"><button class="btn primary" id="go">${reg?'إنشاء الحساب':'دخول'}</button></div>
    ${reg?'':'<p class="hint" id="fp" style="cursor:pointer;text-decoration:underline">نسيت كلمة المرور؟</p>'}
    <div class="teachlink"><a id="tlink">انضم كمعلم ←</a></div>`;

  app.querySelectorAll(".tab").forEach(t=>t.onclick=()=>{ S.gate=t.dataset.g; renderGate(); });
  document.getElementById("go").onclick = submitGate;
  ["em","pw","nm","kl"].forEach(id=>{
    const el = document.getElementById(id);
    if(el) el.onkeydown = e => { if(e.key==="Enter") submitGate(); };
  });

  const fp = document.getElementById("fp");
  if(fp) fp.onclick = async ()=>{
    const em = (document.getElementById("em").value||"").trim();
    if(!em){ toast("اكتب بريدك أولاً"); return; }
    const { error } = await db.auth.resetPasswordForEmail(em);
    toast(error ? "تعذّر الإرسال" : "أُرسل رابط الاستعادة لبريدك");
  };

  const tl = document.getElementById("tlink");
  if(tl) tl.onclick = ()=>{ S.gate="teacher"; renderTeacherSignup(); };

  if(reg) fillGrades();
  document.getElementById("em").focus();
}

/* قوائم المناهج والصفوف */
async function fillGrades(){
  const cs = document.getElementById("cur"), gs = document.getElementById("gr");
  if(!cs || !gs) return;

  if(!S.scales.length){
    const { data, error } = await db.from('scales')
      .select('id,name,country,sort_order,levels(id,name,rank)')
      .eq('kind','academic').order('sort_order');
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

  const nm = (document.getElementById("nm")||{}).value || "";
  const kl = (document.getElementById("kl")||{}).value || "";
  if(reg && !nm.trim()){ toast("اكتب اسمك كما يظهر في التقارير"); return; }
  if(reg && !(document.getElementById("gr")||{}).value){ toast("اختر صفّك الدراسي"); return; }

  app.innerHTML = `<div class="status">جارٍ التحقق…</div>`;
  const r = reg
    ? await db.auth.signUp({ email:em, password:pw,
        options:{ data:{ full_name:nm.trim(), klass:kl.trim() } } })
    : await db.auth.signInWithPassword({ email:em, password:pw });

  if(r.error){ renderGate(translate(r.error.message)); return; }

  if(reg && r.data.session){
    const g = (document.getElementById("gr")||{}).value || "";
    if(g){
      const [sc, lv] = g.split('|');
      await db.from('profiles').update({
        scale_id: Number(sc),
        level_id: lv ? Number(lv) : null
      }).eq('id', r.data.user.id);
    }
  }
  if(reg && !r.data.session){
    S.gate = "login";
    renderGate("تم إنشاء حسابك ✅ افتح بريدك واضغط رابط التفعيل ثم سجّل الدخول.");
    return;
  }
  await boot();
}

export function translate(m){
  if(/Invalid login/i.test(m))       return "البريد أو كلمة المرور غير صحيحة";
  if(/already registered/i.test(m))  return "هذا البريد مسجّل بالفعل — سجّل الدخول";
  if(/Email not confirmed/i.test(m)) return "فعّل بريدك أولاً من رابط التفعيل";
  return m;
}

/* ═══════════ ② الإقلاع ═══════════ */

export async function boot(){
  const { data:{ user } } = await db.auth.getUser();
  if(!user){ renderGate(); return; }
  S.user = user;

  const { data:p } = await db.from('profiles').select('*').eq('id', user.id).single();
  S.prof = p || { full_name:'طالب', role:'student' };

  const { data:ri } = await db.rpc('my_role');
  S.roleInfo = ri || { role: S.prof.role };
  const role = S.roleInfo.role;

  if(role === 'pending_teacher') return renderPending();
  if(role === 'admin')           return loadAdmin();
  if(role === 'teacher')         return loadTeacher();
  loadList();
}

export async function signOut(){
  await db.auth.signOut();
  S.user = null;
  S.gate = "login";
  renderGate();
}

/* ═══════════ ③ تسجيل المعلم ═══════════ */

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

  let r = await db.auth.signUp({ email:em, password:pw,
            options:{ data:{ full_name:nm, klass:sc } } });

  if(r.error && /already registered/i.test(r.error.message)){
    r = await db.auth.signInWithPassword({ email:em, password:pw });
    if(r.error){ renderTeacherSignup("هذا البريد مسجّل — كلمة المرور غير صحيحة"); return; }
  } else if(r.error){
    renderTeacherSignup(translate(r.error.message)); return;
  }

  if(!r.data.session){
    S.gate = "login";
    renderTeacherSignup("أنشئ الحساب ✅ فعّل بريدك ثم عد وسجّل الدخول لإكمال الطلب.");
    return;
  }

  const { data:res, error } = await db.rpc('request_teacher_access', {
    p_school:sc, p_subject:sb, p_years: yr?Number(yr):null, p_note:nt });

  if(error){ renderTeacherSignup(error.message); return; }
  if(!res.ok){ renderTeacherSignup(res.error); return; }
  await boot();
}

/* ═══════════ ④ شاشة الانتظار ═══════════ */

export function renderPending(){
  bar.innerHTML = "";
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
    </div>
    <div class="nav"><button class="btn ghost" id="out">خروج</button></div>`;

  document.getElementById("brw").onclick = loadList;
  document.getElementById("rf").onclick  = boot;
  document.getElementById("out").onclick = signOut;
}

/* ═══════════ ⑤ لوحة المدير ═══════════ */

export async function loadAdmin(status){
  const st = status || 'pending';
  bar.innerHTML = "";
  head("لوحة المدير", S.prof.full_name);
  app.innerHTML = `<div class="status">جارٍ التحميل…</div>`;

  const { data, error } = await db.rpc('admin_requests', { p_status: st });
  if(error){ app.innerHTML = `<div class="err"><b>تعذّر التحميل</b>${esc(error.message)}</div>`; return; }

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
      </div>`).join(""):'<div class="status">لا توجد طلبات في هذه الحالة</div>'}
    <div class="nav" style="margin-top:16px">
      <button class="btn ghost" id="tp">لوحة المعلم</button>
      <button class="btn ghost" id="out">خروج</button>
    </div>`;

  app.querySelectorAll(".tab").forEach(t=>t.onclick=()=>loadAdmin(t.dataset.s));
  app.querySelectorAll("[data-a]").forEach(b=>b.onclick=async()=>{
    const ok = b.dataset.a === 'ok';
    const note = prompt(ok?"ملاحظة ترحيب (اختياري):":"سبب الرفض:", ok?"":"");
    if(!ok && note===null) return;
    const { data:res, error } = await db.rpc('admin_decide',
      { p_request: Number(b.dataset.id), p_approve: ok, p_note: note||null });
    if(error){ toast(error.message); return; }
    toast(res.result || "تم"); loadAdmin(st);
  });
  document.getElementById("tp").onclick  = loadTeacher;
  document.getElementById("out").onclick = signOut;
}

/* ═══════════ ⑥ التشغيل ═══════════ */

export function start(){
  db.auth.onAuthStateChange((e)=>{
    if(e === 'SIGNED_OUT'){ S.gate = "login"; renderGate(); }
  });
  boot();
}
