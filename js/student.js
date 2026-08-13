/* ══════════════════════════════════════════════════════════
   بيان — student.js
   المواد ← اختيار المعلم ← الدروس ← مصادر الدرس
   + ملاحظات المعلم ومراسلته

   ⚠️ الدوال المصدَّرة بـ function لا const — لأجل الاستيراد الدائري.
   ══════════════════════════════════════════════════════════ */
import * as api from './api.js';
import { S } from './state.js';
import { app, bar, head, toast, esc, AR, ICONS, KINDS, bubble,
         scrollTop, scrollBottom } from './ui.js';
import { signOut } from './auth.js';
import { startQuiz } from './quiz.js';

/* ═══════════ ① المواد ═══════════ */

export async function loadList(){
  bar.innerHTML = "";
  head("أهلًا "+S.prof.full_name, "اختر المادة التي تريد التعلّم فيها");
  app.innerHTML = `<div class="status">جارٍ التحميل…</div>`;

  const { data, error } = await api.listSubjects();
  if(error){ app.innerHTML = `<div class="err"><b>تعذّر التحميل</b>${esc(error.message)}</div>`; return; }
  S.subjects = data || [];

  const { count } = await api.unreadFeedbackCount(S.user.id);

  const grade  = S.subjects.filter(x=>x.group_key==='1_grade');
  const skills = S.subjects.filter(x=>x.group_key!=='1_grade');

  const card = x => {
    const empty = !x.needs_placement && !x.lessons_total;
    const pct = x.lessons_total ? Math.round(x.lessons_done/x.lessons_total*100) : 0;
    return `<div class="subj ${empty?'soon':''}" data-i="${x.id}">
      <div style="flex:1">
        <div class="subj-t">${esc(x.icon||'')} <bdi>${esc(x.name)}</bdi>
          ${x.my_level?`<span class="lvl-tag">${esc(x.my_level)}</span>`:''}
          ${empty?'<span class="badge lock">قريباً</span>':''}</div>
        ${x.description?`<div class="subj-d">${esc(x.description)}</div>`:''}
        <div class="subj-m">${
            empty ? 'دروس هذه المادة قيد الإعداد'
          : x.needs_placement ? 'ابدأ باختبار «اعرف مستواك»'
          : `${AR(x.lessons_done)} من ${AR(x.lessons_total)} درساً`}${
            empty ? '' :
            x.mentor_name ? ' · مع أ. ' + esc(x.mentor_name)
            : (x.mentor_chosen ? ' · متابعة ذاتية' : '')}</div>
        ${(x.needs_placement||empty)?'':`<div class="pbar"><div class="pfill" style="width:${pct}%"></div></div>`}
      </div>
      <div class="qz-go">${empty?'⏳':(x.needs_placement?'حدّد مستواك ←':'ادخل ←')}</div>
    </div>`;
  };

  app.innerHTML = `
    ${grade.length?`<div class="grp">📚 موادّ صفّي</div>${grade.map(card).join("")}`:''}
    ${skills.length?`<div class="grp">🚀 طوّر مهاراتك</div>${skills.map(card).join("")}`:''}
    ${!S.subjects.length?`<div class="card" style="text-align:center;padding:28px">
        <div style="font-size:2rem;margin-bottom:10px">📚</div>
        <div class="rev-q">لا توجد مواد متاحة بعد</div>
        <div class="line">موادّ صفّك وتدريبات المهارات قيد الإعداد — ستظهر هنا فور جهوزها.</div>
      </div>`:''}
    ${count?`<div class="fbnote" id="fbgo">📩 لديك ${AR(count)} ملاحظة جديدة من معلمك</div>`:''}
    <div class="nav" style="margin-top:18px">
      <button class="btn ghost" id="fball">ملاحظات معلمي</button>
      <button class="btn ghost" id="msgs">مراسلة المعلم</button>
    </div>
    <div class="nav"><button class="btn ghost" id="out">خروج</button></div>`;

  app.querySelectorAll(".subj").forEach(el=>el.onclick=()=>{
    const x = S.subjects.find(v=>String(v.id)===el.dataset.i);
    if(!x.needs_placement && !x.lessons_total){
      toast("دروس هذه المادة قيد الإعداد — ستصلك عند جهوزها"); return; }
    if(x.needs_placement){ toast("اختبار تحديد المستوى قيد الإعداد"); return; }
    if(!x.mentor_chosen) return loadMentors(x);
    loadLessons(x);
  });
  document.getElementById("fball").onclick = loadFeedback;
  document.getElementById("msgs").onclick  = loadChat;
  document.getElementById("out").onclick   = signOut;
  const fg = document.getElementById("fbgo"); if(fg) fg.onclick = loadFeedback;
  scrollTop();
}

/* ═══════════ ② الانضمام إلى معلم ═══════════ */

export async function loadMentors(subj, switching){
  S.subj = subj;
  bar.innerHTML = "";
  head(switching?"الانضمام إلى معلم آخر":"اختر معلمك", subj.name);
  app.innerHTML = `<div class="status">جارٍ التحميل…</div>`;

  const [{ data:list }, { data:st }] = await Promise.all([
    api.listMentors(subj.id),
    api.myMentor(subj.id)
  ]);
  const mentors = list || [], state = st || {};

  if(switching && !state.can_switch){
    app.innerHTML = `
      <div class="crumb" id="bk">← رجوع</div>
      <div class="warnbox" style="font-size:.85rem">
        <b style="font-family:'Almarai';font-weight:800;display:block;margin-bottom:6px">
          فرص الانتقال في هذه المادة استُوفيت</b>
        الاستمرار مع معلم واحد يمنحه صورة أوضح عن تقدّمك، ويجعل متابعته لك أدق.
        اعرض ما يشكل عليك على معلمك الحالي — فهو الأقدر على مساعدتك.</div>
      <div class="nav"><button class="btn primary" id="go">متابعة الدروس</button></div>`;
    document.getElementById("bk").onclick = loadList;
    document.getElementById("go").onclick = ()=>loadLessons(subj);
    return;
  }

  const card = m => `
    <div class="mentor ${m.full?'full':''} ${state.teacher_id===m.id?'cur':''}" data-t="${m.id}">
      <div class="m-n">أ. ${esc(m.name)}
        ${state.teacher_id===m.id?'<span class="badge ok">معلمك الحالي</span>':''}</div>
      <div class="m-m">${esc(m.school||'—')}${m.years?` · ${AR(m.years)} سنوات خبرة`:''}</div>
      ${m.bio?`<div class="m-b">${esc(m.bio)}</div>`:''}
      <span class="m-cap">${m.full?'اكتمل النصاب':`يتابع ${AR(m.students)} من ${AR(m.capacity)} طالباً`}</span>
    </div>`;

  app.innerHTML = `
    <div class="crumb" id="bk">← رجوع للمواد</div>
    <div class="warnbox">
      المعلم الذي تنضم إليه سيتابع تقدّمك في هذه المادة، ويصحّح إجاباتك المقالية،
      ويجيب عن أسئلتك.
    </div>
    ${mentors.length?mentors.map(card).join(""):''}
    <div class="mentor self" data-t="">
      <div class="m-n">📖 المتابعة الذاتية</div>
      <div class="m-m">${mentors.length
        ? 'تدرس بنفسك، ويمكنك الانضمام إلى معلم متى شئت'
        : 'لم ينضم معلمون لهذه المادة بعد — ابدأ بنفسك وسنُعلمك عند توفّرهم'}</div>
    </div>`;

  document.getElementById("bk").onclick = loadList;
  app.querySelectorAll(".mentor").forEach(el=>el.onclick=async()=>{
    if(el.classList.contains('full')){ toast("اكتمل نصاب هذا المعلم — اختر معلماً آخر"); return; }
    const tid = el.dataset.t || null;
    if(tid && tid !== state.teacher_id){
      const name  = (mentors.find(x=>x.id===tid)||{}).name || 'هذا المعلم';
      const tried = state.teachers_tried || 0;

      let msg = `هل ترغب في الانضمام إلى أ. ${name} في مادة «${subj.name}»؟`;
      if(tried === 1) msg += "\n\nبعد هذا الانضمام تبقى لك فرصة واحدة للانضمام إلى معلم آخر.";
      else if(tried >= 2) msg += "\n\nهذه آخر فرصة — لن تتمكن بعدها من الانضمام إلى معلم آخر في هذه المادة.";

      if(!confirm(msg)) return;
    }

    const { data:r, error } = await api.chooseMentor(subj.id, tid);
    if(error){ toast(error.message); return; }
    if(!r.ok){ toast(r.error); return; }

    toast(r.self_study ? "ستتابع دروسك بنفسك" : "انضممتَ إلى أ. "+r.teacher);
    subj.mentor_chosen = true; subj.mentor_name = r.teacher || null;
    loadLessons(subj);
  });
  scrollTop();
}

/* ═══════════ ③ دروس المادة ═══════════ */

export async function loadLessons(subj){
  S.subj = subj;
  bar.innerHTML = "";
  head(subj.name, subj.my_level ? "مستواك: "+subj.my_level : "");
  app.innerHTML = `<div class="status">جارٍ تحميل الدروس…</div>`;

  const { data, error } = await api.listLessons(subj.id);
  if(error){ app.innerHTML = `<div class="err"><b>تعذّر التحميل</b>${esc(error.message)}</div>`; return; }
  S.lessons = data || [];

  // تجميع حسب المستوى
  const groups = {};
  S.lessons.forEach(l=>{ (groups[l.level||'—'] ||= []).push(l); });

  const lcard = l => `
    <div class="lsn ${l.locked?'locked':''} ${l.done?'done':''}" data-i="${l.id}">
      <div class="lsn-t">${esc(l.title)}
        ${l.done?'<span class="badge ok">أُنجز'+(l.best!=null?' '+AR(l.best)+'٪':'')+'</span>':''}
        ${l.locked?'<span class="badge lock">🔒</span>':''}</div>
      ${l.summary?`<div class="lsn-m">${esc(l.summary)}</div>`:''}
      <div class="chips">
        ${(l.items||[]).map(i=>`<span class="chip ${i.is_graded?'g':''}">${ICONS[i.kind]||'•'} ${esc(i.title)}</span>`).join("")}
      </div>
      ${l.locked?`<div class="lockmsg">${esc(l.reason||'')}</div>`:''}
    </div>`;

  app.innerHTML = `
    <div class="crumb" id="bk">← رجوع للمواد</div>
    <div class="nav" style="margin-bottom:14px">
      <button class="btn ghost" id="mnt" style="font-size:.8rem;padding:9px">
        ${subj.mentor_name
            ? '👤 معلمك: أ. '+esc(subj.mentor_name)+' · الانضمام إلى معلم آخر'
            : '👤 الانضمام إلى معلم'}
      </button>
    </div>
    ${Object.keys(groups).map(g=>`
      ${Object.keys(groups).length>1?`<div class="grp">${esc(g)}</div>`:''}
      ${groups[g].map(lcard).join("")}`).join("")}
    ${!S.lessons.length?'<div class="status">لا توجد دروس في هذه المادة بعد</div>':''}`;

  document.getElementById("bk").onclick  = loadList;
  document.getElementById("mnt").onclick = ()=>loadMentors(subj, true);
  app.querySelectorAll(".lsn").forEach(el=>el.onclick=()=>{
    const l = S.lessons.find(v=>String(v.id)===el.dataset.i);
    if(l.locked){ toast(l.reason||"هذا الدرس غير متاح بعد"); return; }
    openLesson(l);
  });
  scrollTop();
}

/* ═══════════ ④ الدرس ومصادره ═══════════ */

export function openLesson(l){
  S.lesson = l;
  bar.innerHTML = "";
  head(l.title, l.unit || S.subj.name);

  const items = (l.items || []);
  const done  = items.filter(i=>i.status==='completed').length;

  app.innerHTML = `
    <div class="crumb" id="bk">← ${esc(S.subj.name)}</div>
    ${l.summary?`<div class="card"><div class="line" style="color:var(--foam)">${esc(l.summary)}</div></div>`:''}
    <div class="grp">📦 مصادر الدرس <span class="chip">${AR(done)} / ${AR(items.length)}</span></div>
    ${items.map(i=>`
      <div class="itm ${i.kind==='quiz'?'quiz':''}" data-i="${i.id}">
        <div class="itm-ic">${ICONS[i.kind]||'•'}</div>
        <div style="flex:1">
          <div class="itm-t">${esc(i.title)}</div>
          <div class="itm-m">${KINDS[i.kind]||i.kind}
            ${i.duration?` · ${AR(i.duration)} دقيقة`:''}
            ${i.is_graded?' · يُحتسب في النتيجة':''}
            ${i.required&&!i.is_graded?' · إلزامي':''}</div>
        </div>
        <div class="itm-s">${i.status==='completed'?'✅':(i.kind==='quiz'?'←':'↗')}</div>
      </div>`).join("")}
    ${!items.length?'<div class="status">لم تُضف مصادر لهذا الدرس بعد</div>':''}
    <p class="hint">تحتاج ${AR(l.pass_mark)}٪ في الاختبار لإتمام الدرس</p>`;

  document.getElementById("bk").onclick = ()=>loadLessons(S.subj);
  app.querySelectorAll(".itm").forEach(el=>el.onclick=()=>{
    const i = items.find(v=>String(v.id)===el.dataset.i);
    openItem(i);
  });
  scrollTop();
}

export async function openItem(i){
  if(i.kind==='quiz' && i.quiz_id){
    api.markItemOpened(i.id);
    return startQuiz({ id:i.quiz_id, item_id:i.id });
  }
  if(i.url){
    window.open(i.url,'_blank','noopener');
    await api.markItemCompleted(i.id);
    i.status = 'completed';
    toast("سُجّل اطّلاعك على المصدر");
    openLesson(S.lesson);
    return;
  }
  toast("هذا المصدر غير متاح بعد");
}

/* ═══════════ ⑤ ملاحظات المعلم ═══════════ */

export async function loadFeedback(){
  bar.innerHTML = ""; head("ملاحظات معلمي", S.prof.full_name);
  app.innerHTML = `<div class="status">جارٍ التحميل…</div>`;
  const { data } = await api.myFeedback(S.user.id);

  const list = data || [];
  app.innerHTML = `
    ${list.length?list.map(f=>`
      <div class="rev ${f.read_by_student?'':'no'}" style="border-right-color:${f.read_by_student?'var(--cyan)':'var(--sand)'}">
        <div class="rev-q">${esc(f.quizzes?.title||'')} ${f.read_by_student?'':'<span class="badge lock">جديد</span>'}</div>
        <div class="line">${new Date(f.submitted_at).toLocaleDateString('ar-EG')} · اختيار ${AR(f.score)}/${AR(f.total)} (${AR(f.pct)}٪)${f.essay_score!=null?` · مقالي: ${AR(f.essay_score)}`:''}</div>
        <div class="model" style="background:rgba(72,207,192,.07)">${esc(f.teacher_comment).replace(/\n/g,"<br>")}</div>
      </div>`).join(""):'<div class="status">لا توجد ملاحظات بعد</div>'}
    <div class="nav" style="margin-top:16px"><button class="btn primary" id="bk">رجوع</button></div>`;
  document.getElementById("bk").onclick = loadList;

  const unread = list.filter(f=>!f.read_by_student).map(f=>f.id);
  if(unread.length) await api.markFeedbackRead(unread);
}

/* ═══════════ ⑥ مراسلة المعلم ═══════════ */

export async function loadChat(){
  bar.innerHTML = ""; head("مراسلة المعلم", S.prof.full_name);
  app.innerHTML = `<div class="status">جارٍ التحميل…</div>`;
  const { data } = await api.studentThread(S.user.id);
  renderChat(data || []);
  await api.studentReadsThread(S.user.id);
}

function renderChat(msgs){
  app.innerHTML = `
    ${msgs.length?`<div class="chat">${msgs.map(m=>bubble(m,m.sender_role==='student')).join("")}</div>`
      :'<div class="status">لا توجد رسائل بعد — اكتب سؤالك أدناه</div>'}
    <div class="card"><label class="fl">رسالتك</label>
      <textarea id="mt" placeholder="اكتب سؤالك العلمي…"></textarea></div>
    <div class="nav">
      <button class="btn primary" id="snd">إرسال</button>
      <button class="btn ghost" id="rf">تحديث</button>
    </div>
    <div class="nav"><button class="btn ghost" id="bk">رجوع</button></div>`;
  document.getElementById("bk").onclick = loadList;
  document.getElementById("rf").onclick = loadChat;
  document.getElementById("snd").onclick = async ()=>{
    const t = (document.getElementById("mt").value||"").trim();
    if(!t){ toast("اكتب رسالتك أولاً"); return; }
    const { error } = await api.sendMessage({
      studentId:S.user.id, senderId:S.user.id, senderRole:'student', body:t });
    toast(error?"تعذّر الإرسال":"أُرسلت رسالتك"); loadChat();
  };
  scrollBottom();
}
