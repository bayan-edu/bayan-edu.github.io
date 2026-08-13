/* ══════════════════════════════════════════════════════════
   بيان — teacher.js
   لوحة المعلم: التصحيح المقالي · رسائل الطلاب · اختيار الموادّ

   ⚠️ عزل بيانات المعلمين مضمون في RLS عبر teaches()،
      لا في هذه الواجهة. لا تعتمد على تصفية الواجهة أماناً.
   ══════════════════════════════════════════════════════════ */
import { db } from './api.js';
import { S } from './state.js';
import { app, bar, head, toast, esc, AR, bubble, scrollTop, scrollBottom } from './ui.js';
import { signOut, loadAdmin } from './auth.js';

/* ═══════════ ① التصحيح ═══════════ */

export async function loadTeacher(){
  bar.innerHTML = ""; head("لوحة المعلم — "+S.prof.full_name, "الإجابات المقالية بانتظار تصحيحك");
  app.innerHTML = `<div class="status">جارٍ التحميل…</div>`;
  const { data } = await db.from('attempts')
    .select('id,submitted_at,score,total,pct,essay_score,teacher_comment,profiles(full_name,klass),quizzes(title)')
    .order('submitted_at',{ascending:false}).limit(200);

  const all  = data || [];
  const wait = all.filter(a=>!a.teacher_comment), done = all.filter(a=>a.teacher_comment);
  const card = (a,d)=>`<div class="pend ${d?'done':''}" data-a="${a.id}">
      <div class="qz-t">${esc(a.profiles?.full_name||'')}</div>
      <div class="qz-m">${esc(a.quizzes?.title||'')} · ${AR(a.score)}/${AR(a.total)} (${AR(a.pct)}٪) · ${new Date(a.submitted_at).toLocaleDateString('ar-EG')}</div>
    </div>`;

  app.innerHTML = `
    <div class="subtabs">
      <div class="tab on" id="t1">التصحيح</div>
      <div class="tab" id="t2">الرسائل</div>
      <div class="tab" id="t3">موادّي</div>
    </div>
    <h2 class="sec">بانتظار التصحيح (${AR(wait.length)})</h2>
    ${wait.length?wait.map(a=>card(a,false)).join(""):'<div class="status">لا توجد محاولات معلّقة 🎉</div>'}
    ${done.length?`<h2 class="sec">مُصحَّحة</h2>${done.slice(0,20).map(a=>card(a,true)).join("")}`:''}
    <div class="nav" style="margin-top:18px">
      <button class="btn ghost" id="rf">تحديث</button>
      <button class="btn ghost" id="out">خروج</button>
    </div>`;

  app.querySelectorAll(".pend").forEach(el=>el.onclick=()=>openGrade(+el.dataset.a));
  document.getElementById("t2").onclick = loadInbox;
  document.getElementById("t3").onclick = loadMySubjects;
  document.getElementById("rf").onclick = loadTeacher;
  document.getElementById("out").onclick = ()=>{
    if(S.roleInfo?.role==='admin') loadAdmin(); else signOut();
  };
  if(S.roleInfo?.role==='admin')
    document.getElementById("out").textContent = 'لوحة المدير';
}

export async function openGrade(id){
  app.innerHTML = `<div class="status">جارٍ الفتح…</div>`;
  const { data:a } = await db.from('attempts')
    .select('*,profiles(full_name),quizzes(title)').eq('id',id).single();
  const { data:ans } = await db.from('answers')
    .select('essay_text,questions(body,kind,position)').eq('attempt_id',id);

  const essays = (ans||[]).filter(x=>x.questions?.kind==='essay')
    .sort((x,y)=>x.questions.position-y.questions.position);

  head("تصحيح مقالي", a.profiles?.full_name);
  app.innerHTML = `
    <div class="card">
      <div class="qnum">${esc(a.quizzes?.title||'')} · ${new Date(a.submitted_at).toLocaleString('ar-EG')}</div>
      <div class="line">اختيار من متعدد: ${AR(a.score)}/${AR(a.total)} (${AR(a.pct)}٪)</div>
      ${essays.map(e=>`
        <div style="margin-top:14px">
          <div class="rev-q">${esc(e.questions.body)}</div>
          <div class="essaybox">${esc(e.essay_text||'— لم تُكتب —')}</div>
        </div>`).join("")}
      <label class="fl">درجة الأسئلة المقالية</label>
      <input type="text" id="es" inputmode="decimal" value="${a.essay_score??''}" placeholder="مثال: 4.5">
      <label class="fl" style="margin-top:16px">ملاحظاتك للطالب</label>
      <textarea id="fb" placeholder="اكتب التشخيص والخطة العلاجية…">${esc(a.teacher_comment||'')}</textarea>
    </div>
    <div class="nav">
      <button class="btn primary" id="sv">حفظ وإرسال</button>
      <button class="btn ghost" id="bk">رجوع</button>
    </div>`;

  document.getElementById("bk").onclick = loadTeacher;
  document.getElementById("sv").onclick = async ()=>{
    const es = (document.getElementById("es").value||"").trim();
    const fb = (document.getElementById("fb").value||"").trim();
    if(!fb){ toast("اكتب ملاحظاتك أولاً"); return; }
    const { error } = await db.from('attempts').update({
      essay_score: es===''?null:Number(es), teacher_comment: fb,
      graded_at: new Date().toISOString(), graded_by: S.user.id, read_by_student: false
    }).eq('id',id);
    toast(error?"تعذّر الحفظ":"أُرسلت الملاحظات"); loadTeacher();
  };
  scrollTop();
}

/* ═══════════ ② رسائل الطلاب ═══════════ */

export async function loadInbox(){
  bar.innerHTML = ""; head("رسائل الطلاب", S.prof.full_name);
  app.innerHTML = `<div class="status">جارٍ التحميل…</div>`;
  const { data } = await db.from('messages')
    .select('*, student:profiles!messages_student_id_fkey(full_name)')
    .order('created_at',{ascending:false}).limit(500);

  const map = {};
  (data||[]).forEach(m=>{
    if(!map[m.student_id]) map[m.student_id] = { id:m.student_id,
      name:m.student?.full_name||'طالب', last:m.body.slice(0,70), at:m.created_at, unread:0 };
    if(m.sender_role==='student' && !m.read_by_teacher) map[m.student_id].unread++;
  });
  const thr = Object.values(map).sort((a,b)=>b.unread-a.unread);

  app.innerHTML = `
    <div class="subtabs">
      <div class="tab" id="t1">التصحيح</div>
      <div class="tab on" id="t2">الرسائل</div>
      <div class="tab" id="t3">موادّي</div>
    </div>
    ${thr.length?thr.map(t=>`
      <div class="thr" data-i="${t.id}">
        <div><div class="qz-t">${esc(t.name)}</div>
          <div class="qz-m">${esc(t.last)}… · ${new Date(t.at).toLocaleDateString('ar-EG')}</div></div>
        ${t.unread?`<span class="dot">${AR(t.unread)} جديد</span>`:''}
      </div>`).join(""):'<div class="status">لا توجد رسائل بعد</div>'}
    <div class="nav" style="margin-top:16px">
      <button class="btn ghost" id="rf">تحديث</button>
      <button class="btn ghost" id="out">خروج</button>
    </div>`;

  document.getElementById("t1").onclick = loadTeacher;
  document.getElementById("t3").onclick = loadMySubjects;
  document.getElementById("rf").onclick = loadInbox;
  document.getElementById("out").onclick = signOut;
  app.querySelectorAll(".thr").forEach(el=>el.onclick=()=>openThread(el.dataset.i));
}

export async function openThread(sid){
  app.innerHTML = `<div class="status">جارٍ الفتح…</div>`;
  const { data } = await db.from('messages')
    .select('*, profiles!messages_sender_id_fkey(full_name)')
    .eq('student_id',sid).order('created_at');

  head("محادثة", data?.[0]?.profiles?.full_name || '');
  app.innerHTML = `
    <div class="chat">${(data||[]).map(m=>bubble(m,m.sender_role==='teacher')).join("")}</div>
    <div class="card"><label class="fl">ردّك</label>
      <textarea id="rt" placeholder="اكتب ردّك العلمي…"></textarea></div>
    <div class="nav">
      <button class="btn primary" id="sr">إرسال الرد</button>
      <button class="btn ghost" id="bk">رجوع</button>
    </div>`;
  document.getElementById("bk").onclick = loadInbox;
  document.getElementById("sr").onclick = async ()=>{
    const t = (document.getElementById("rt").value||"").trim();
    if(!t){ toast("اكتب ردّك أولاً"); return; }
    const { error } = await db.from('messages').insert({
      student_id:sid, sender_id:S.user.id, sender_role:'teacher',
      body:t, read_by_teacher:true });
    toast(error?"تعذّر الإرسال":"أُرسل الرد"); openThread(sid);
  };
  await db.from('messages').update({read_by_teacher:true})
    .eq('student_id',sid).eq('sender_role','student').eq('read_by_teacher',false);
  scrollBottom();
}

/* ═══════════ ③ موادّ المعلم ═══════════ */

export async function loadMySubjects(){
  bar.innerHTML = "";
  head("موادّي", "اختر المواد التي تتابع فيها الطلاب");
  app.innerHTML = `<div class="status">جارٍ التحميل…</div>`;

  const { data, error } = await db.rpc('list_teachable_subjects');
  if(error){ app.innerHTML = `<div class="err"><b>تعذّر التحميل</b>${esc(error.message)}</div>`; return; }
  const subs = data || [];
  const picked = new Set(subs.filter(x=>x.chosen).map(x=>x.id));

  app.innerHTML = `
    <div class="subtabs">
      <div class="tab" id="t1">التصحيح</div>
      <div class="tab" id="t2">الرسائل</div>
      <div class="tab on" id="t3">موادّي</div>
    </div>
    <div class="warnbox">
      تختار حتى ٣ مواد. والمادة الواحدة عبر صفوف مختلفة تُحسب مادة واحدة.
      ستظهر للطلاب في قائمة معلمي المواد التي تختارها.
    </div>
    ${subs.map(x=>`
      <div class="mentor ${picked.has(x.id)?'cur':''}" data-i="${x.id}">
        <div class="m-n">${esc(x.name)} ${picked.has(x.id)?'<span class="badge ok">مختارة</span>':''}</div>
        <div class="m-m">${x.family?esc(x.family)+' · ':''}${AR(x.students)} طالباً · السعة ${AR(x.capacity)}</div>
      </div>`).join("")}
    ${!subs.length?'<div class="status">لا توجد مواد بعد</div>':''}
    <div class="nav" style="margin-top:16px">
      <button class="btn primary" id="save">حفظ</button>
      <button class="btn ghost" id="bk">رجوع</button>
    </div>`;

  document.getElementById("t1").onclick = loadTeacher;
  document.getElementById("t2").onclick = loadInbox;
  document.getElementById("bk").onclick = loadTeacher;

  app.querySelectorAll(".mentor").forEach(el=>el.onclick=()=>{
    const id = Number(el.dataset.i);
    if(picked.has(id)) picked.delete(id); else picked.add(id);
    el.classList.toggle('cur');
    const b = el.querySelector('.badge');
    if(picked.has(id) && !b) el.querySelector('.m-n').insertAdjacentHTML('beforeend',' <span class="badge ok">مختارة</span>');
    if(!picked.has(id) && b) b.remove();
  });

  document.getElementById("save").onclick = async ()=>{
    const { data:r, error } = await db.rpc('set_my_subjects', { p_ids: [...picked] });
    if(error){ toast(error.message); return; }
    if(!r.ok){ toast(r.error); return; }
    toast("حُفظت موادّك"); loadMySubjects();
  };
  scrollTop();
}
