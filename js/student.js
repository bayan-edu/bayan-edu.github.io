/* ══════════════════════════════════════════════════════════
   بيان — student.js
   المواد ← اختيار المعلم ← الدروس ← مصادر الدرس
   + ملاحظات المعلم ومراسلته

   ⚠️ الدوال المصدَّرة بـ function لا const — لأجل الاستيراد الدائري.
   ══════════════════════════════════════════════════════════ */
import * as api from './api.js';
import { S } from './state.js';
import { app, head, toast, esc, AR, ICONS, KINDS, bubble, errBox, nav,
         scrollTop, scrollBottom } from './ui.js';
import { startQuiz } from './quiz.js';
import { mediaUrl, isManaged } from './media.js';

/* ═══════════ ① المواد ═══════════ */

export async function loadList(){
  nav('subjects');
  head("أهلًا "+S.prof.full_name, "اختر المادة التي تريد التعلّم فيها");
  app.innerHTML = `<div class="status">جارٍ التحميل…</div>`;

  const { data, error } = await api.listSubjects();
  if(error){ app.innerHTML = `<div class="err"><b>تعذّر التحميل</b>${esc(error.message)}</div>`; return; }
  S.subjects = data || [];

  const { count, error:eCount } = await api.unreadFeedbackCount(S.user.id);

  /* ثلاث مجموعات: صفّي · صفوف سابقة · مهارات */
  const grade  = S.subjects.filter(x => x.group_key === '1_grade');
  const past   = S.subjects.filter(x => x.group_key === '2_past');
  const skills = S.subjects.filter(x => !['1_grade','2_past'].includes(x.group_key));

  /* مادة صفّ سابق دروسها في lessons_review لا lessons_total —
     فلا يصحّ قياس «الفراغ» على lessons_total وحده. */
  const bulk = x => (x.lessons_total || 0) + (x.lessons_review || 0);

  /* ⚠️ lessons_total > 0 شرط لازم: بدونه تُطوى المواد الفارغة
     بوسم «أتممتها» — إذ 0 === 0 صحيح. */
  const isDone = x => x.lessons_total > 0 && x.lessons_done >= x.lessons_total;

  const card = (x, isPast) => {
    const empty = !x.needs_placement && bulk(x) === 0;
    const pct   = x.lessons_total ? Math.round(x.lessons_done / x.lessons_total * 100) : 0;
    const meta  =
        empty            ? 'دروس هذه المادة قيد الإعداد'
      : x.needs_placement ? 'ابدأ باختبار «اعرف مستواك»'
      : isPast           ? `${AR(x.lessons_review)} درساً للمراجعة`
      : `${AR(x.lessons_done)} من ${AR(x.lessons_total)} درساً`;
    return `<div class="subj ${empty?'soon':''}" data-i="${x.id}">
      <div style="flex:1">
        <div class="subj-t" dir="auto">${esc(x.icon||'')} <bdi>${esc(x.name)}</bdi>
          ${x.my_level && !isPast?`<span class="lvl-tag">${esc(x.my_level)}</span>`:''}
          ${x.elective?'<span class="badge lock">اختيارية</span>':''}
          ${empty?'<span class="badge lock">قريباً</span>':''}</div>
        ${x.description?`<div class="subj-d">${esc(x.description)}</div>`:''}
        <div class="subj-m">${meta}${
            empty ? '' :
            x.mentor_name ? ' · مع أ. ' + esc(x.mentor_name)
            : (x.mentor_chosen ? ' · متابعة ذاتية' : '')}</div>
        ${(x.needs_placement || empty || isPast)?'':
          `<div class="pbar"><div class="pfill" style="width:${pct}%"></div></div>`}
      </div>
      <div class="qz-go">${empty?'⏳':(x.needs_placement?'حدّد مستواك ←':'ادخل ←')}</div>
    </div>`;
  };

  /* المكتملة تنكمش إلى سطر يحمل نتيجتها — لا تختفي */
  const mini = x => `<div class="subj mini" data-i="${x.id}">
      <div style="flex:1"><div class="subj-t">✅ ${esc(x.icon||'')} <bdi>${esc(x.name)}</bdi></div></div>
      <div class="qz-go">${AR(x.lessons_done)} / ${AR(x.lessons_total)}</div>
    </div>`;

  const live = grade.filter(x => !isDone(x));
  const done = grade.filter(isDone);

  app.innerHTML = `
    ${errBox(eCount,'عدّاد الملاحظات')}
    ${grade.length?`<div class="grp">📚 موادّ صفّي</div>
      ${live.map(x => card(x,false)).join("")}
      ${done.length?`<div class="fold-lbl">أتممتها · ${AR(done.length)}</div>${done.map(mini).join("")}`:''}`:''}

    ${past.length?`<div class="grp fold" id="pastHdr">🔄 موادّ صفوف سابقة
        <span class="chip">${AR(past.length)}</span><span class="caret">▾</span></div>
      <div id="pastBox" hidden>${past.map(x => card(x,true)).join("")}</div>`:''}

    ${skills.length?`<div class="grp">🚀 طوّر مهاراتك</div>${skills.map(x => card(x,false)).join("")}`:''}

    ${!S.subjects.length?`<div class="card" style="text-align:center;padding:28px">
        <div style="font-size:2rem;margin-bottom:10px">📚</div>
        <div class="rev-q">لا توجد مواد متاحة بعد</div>
        <div class="line">موادّ صفّك وتدريبات المهارات قيد الإعداد — ستظهر هنا فور جهوزها.</div>
      </div>`:''}
    ${count?`<div class="fbnote" id="fbgo">📩 لديك ${AR(count)} ملاحظة جديدة من معلمك</div>`:''}`;

  app.querySelectorAll(".subj").forEach(el=>el.onclick=()=>{
    const x = S.subjects.find(v=>String(v.id)===el.dataset.i);
    if(!x.needs_placement && bulk(x) === 0){
      toast("دروس هذه المادة قيد الإعداد — ستصلك عند جهوزها"); return; }
    if(x.needs_placement) return startPlacement(x);
    if(!x.mentor_chosen) return loadMentors(x);
    loadLessons(x);
  });

  const ph = document.getElementById("pastHdr");
  if(ph) ph.onclick = ()=>{
    const box = document.getElementById("pastBox");
    box.hidden = !box.hidden;
    ph.classList.toggle('open', !box.hidden);
  };

  const fg = document.getElementById("fbgo"); if(fg) fg.onclick = loadFeedback;
  scrollTop();
}

/* ═══════════ ② الانضمام إلى معلم ═══════════ */

export async function loadMentors(subj, switching){
  S.subj = subj;
  nav('subjects');
  head(switching?"الانضمام إلى معلم آخر":"اختر معلمك", subj.name);
  app.innerHTML = `<div class="status">جارٍ التحميل…</div>`;

  const [mRes, sRes] = await Promise.all([
    api.listMentors(subj.id),
    api.myMentor(subj.id)
  ]);
  const mentors = mRes.data || [], state = sRes.data || {};
  const eMentor = mRes.error || sRes.error;

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
    ${errBox(eMentor,'قائمة المعلمين')}
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
  nav('subjects');
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
      <div class="lsn-t" dir="auto">${esc(l.title)}
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

/* صيغ الصوت التي يشغّلها عنصر audio مباشرة.
   ⚠️ الرابط الخارجي (يوتيوب · Drive) لا يُشغَّل داخلياً — صفحةٌ لا ملف.
      فيبقى له السلوك القديم: يُفتح في تبويب. وهذا انحدارٌ لطيف
      لا كسر: المحتوى القديم يعمل كما كان، والجديد يكسب المشغّل. */
const AUD_RX = /\.(mp3|m4a|ogg|wav|aac)(\?|#|$)/i;

function canEmbed(i){
  if(!i.url || !['audio','recording'].includes(i.kind)) return false;
  return isManaged(i.url) || AUD_RX.test(i.url);
}

export function openLesson(l){
  S.lesson = l;
  nav('subjects');
  head(l.title, l.unit || S.subj.name);

  const items = (l.items || []);
  const done  = items.filter(i=>i.status==='completed').length;

  app.innerHTML = `
    <div class="crumb" id="bk">← ${esc(S.subj.name)}</div>
    ${l.summary?`<div class="card"><div class="line" style="color:var(--text)">${esc(l.summary)}</div></div>`:''}
    <div class="grp">📦 مصادر الدرس <span class="chip">${AR(done)} / ${AR(items.length)}</span></div>
      ${items.map(i=>`
      <div class="itm ${i.kind==='quiz'?'quiz':''}" data-i="${i.id}">
        <div class="itm-ic">${ICONS[i.kind]||'•'}</div>
        <div style="flex:1">
          <div class="itm-t" dir="auto">${esc(i.title)}</div>
          <div class="itm-m">${KINDS[i.kind]||i.kind}
            ${i.duration?` · ${AR(i.duration)} دقيقة`:''}
            ${i.is_graded?' · يُحتسب في النتيجة':''}
            ${i.required&&!i.is_graded?' · إلزامي':''}</div>
        </div>
        <div class="itm-s" data-s="${i.id}">${i.status==='completed'?'✅'
          :(canEmbed(i)?'▶':(i.kind==='quiz'?'←':'↗'))}</div>
      </div>
      ${canEmbed(i)?`<div class="aud-slot" id="aud-${i.id}"></div>`:''}`).join("")}
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

  /* صوتٌ نملك ملفه ⇒ يُسمع في مكانه. الطالب لا يغادر الدرس. */
  if(canEmbed(i)) return toggleAudio(i);

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

/* ── مشغّل الصوت ──
   ثلاث حاجات تعليمية تُملي التصميم:
     ① الإعادة المضبوطة — جوهر تمرين الاستماع: أعد المقطع، لا الدرس
     ② خفض السرعة — يمنح الأذن زمناً لتفكيك الكلام
     ③ ألّا يغادر الطالب الصفحة — فالسياق جزءٌ من الفهم
   ولا تشغيل تلقائيّ: الصوت المباغت يُخرج المتعلّم من قصده. */
function toggleAudio(i){
  const slot = document.getElementById("aud-"+i.id);
  if(!slot) return;

  /* نقرةٌ ثانية تطوي — والطيّ يوقف الصوت لأن العنصر يُزال */
  if(slot.firstChild){ slot.innerHTML = ""; return; }

  const src = mediaUrl(i.url);
  if(!src){ toast("تعذّر الوصول إلى الملف"); return; }

  api.markItemOpened(i.id);

  slot.innerHTML = `
    <div class="aud">
      <audio class="aud-p" controls preload="metadata"></audio>
      <div class="aud-row">
        <button class="aud-b" data-a="back">⟲ ١٠ ثوانٍ</button>
        <button class="aud-b" data-a="rate">السرعة ١٫٠×</button>
        <span class="aud-note"></span>
      </div>
    </div>`;

  const au   = slot.querySelector("audio");
  const note = slot.querySelector(".aud-note");

  /* ⚠️ الرابط يُسنَد خاصيةً لا يُدرَج في HTML.
     esc() تهرّب & و< فقط، وعلامة اقتباسٍ في رابطٍ قديم تكسر
     الوسم وتفتح باب حقنٍ. الإسناد لا يمرّ بمحلّل HTML أصلاً. */
  au.src = src;

  /* مشغّلٌ واحد يعمل في الصفحة — صوتان معاً لا يُفهم منهما شيء */
  au.onplay = () => document.querySelectorAll("audio").forEach(o=>{ if(o!==au) o.pause(); });

  au.onerror = () => {
    note.className = "aud-err";
    note.textContent = "تعذّر تشغيل الملف — أبلغ معلّمك";
    console.warn("[media] فشل التشغيل:", i.url, "→", src);
  };

  /* التسجيل عند الانتهاء لا عند الفتح:
     «فتحَ» ليست «سمعَ»، وإشارةٌ كاذبة أسوأ من إشارةٍ ناقصة. */
  au.onended = async () => {
    note.textContent = "سُجّل استماعك ✅";
    if(i.status === 'completed') return;
    const { error } = await api.markItemCompleted(i.id);
    if(error){ note.textContent = "لم يُسجَّل — تحقّق من الاتصال"; return; }
    i.status = 'completed';
    const s = document.querySelector(`[data-s="${i.id}"]`);
    if(s) s.textContent = '✅';
  };

  const RATES = [1, 0.75, 1.25];
  let r = 0;

  slot.querySelector('[data-a="back"]').onclick = () => {
    au.currentTime = Math.max(0, au.currentTime - 10);
    au.play();
  };

  slot.querySelector('[data-a="rate"]').onclick = e => {
    r = (r + 1) % RATES.length;
    au.playbackRate = RATES[r];
    e.target.textContent = "السرعة " + AR(String(RATES[r].toFixed(2))).replace(".","٫") + "×";
  };
}

/* ═══════════ ⑤ ملاحظات المعلم ═══════════ */

export async function loadFeedback(){
  nav('feedback'); head("ملاحظات معلمي", S.prof.full_name);
  app.innerHTML = `<div class="status">جارٍ التحميل…</div>`;
  const { data, error } = await api.myFeedback(S.user.id);

  const list = data || [];
  app.innerHTML = `
    ${errBox(error,'ملاحظات المعلم')}
    ${list.length?list.map(f=>`
      <div class="rev ${f.read_by_student?'ok':'new'}">
        <div class="rev-q">${esc(f.quizzes?.title||'')} ${f.read_by_student?'':'<span class="badge lock">جديد</span>'}</div>
        <div class="line">${new Date(f.submitted_at).toLocaleDateString('ar-EG')} · اختيار ${AR(f.score)}/${AR(f.total)} (${AR(f.pct)}٪)${f.essay_score!=null?` · مقالي: ${AR(f.essay_score)}`:''}</div>
        <div class="model" style="background:rgba(72,207,192,.07)">${esc(f.teacher_comment).replace(/\n/g,"<br>")}</div>
      </div>`).join(""):'<div class="status">لا توجد ملاحظات بعد</div>'}`;

  const unread = list.filter(f=>!f.read_by_student).map(f=>f.id);
  if(unread.length) await api.markFeedbackRead(unread);
}

/* ═══════════ ⑥ مراسلة المعلم ═══════════ */

export async function loadChat(){
  nav('chat'); head("مراسلة المعلم", S.prof.full_name);
  app.innerHTML = `<div class="status">جارٍ التحميل…</div>`;
  const { data, error } = await api.studentThread(S.user.id);
  renderChat(data || [], error);
  await api.studentReadsThread(S.user.id);
}

function renderChat(msgs, error){
  app.innerHTML = `
    ${errBox(error,'المحادثة')}
    ${msgs.length?`<div class="chat">${msgs.map(m=>bubble(m,m.sender_role==='student')).join("")}</div>`
      :'<div class="status">لا توجد رسائل بعد — اكتب سؤالك أدناه</div>'}
    <div class="card"><label class="fl">رسالتك</label>
      <textarea id="mt" placeholder="اكتب سؤالك العلمي…"></textarea></div>
    <div class="nav"><button class="btn primary" id="snd">إرسال</button></div>`;
  document.getElementById("snd").onclick = async ()=>{
    const t = (document.getElementById("mt").value||"").trim();
    if(!t){ toast("اكتب رسالتك أولاً"); return; }
    const { error } = await api.sendMessage({
      studentId:S.user.id, senderId:S.user.id, senderRole:'student', body:t });
    toast(error?"تعذّر الإرسال":"أُرسلت رسالتك"); loadChat();
  };
  scrollBottom();
}

/* اختبار تحديد المستوى — أداةٌ قائمة بذاتها، لا درسَ لها ولا مقرَّر */
async function startPlacement(x){
  if(!x.tool){ toast("اختبار تحديد المستوى قيد الإعداد"); return; }
  app.innerHTML = `<div class="status">جارٍ فتح الاختبار…</div>`;
  const { data, error } = await api.placementStart(x.tool);
  if(error){ app.innerHTML = errBox(error.message, 'تحديد المستوى'); return; }
  if(!data.ok){ toast(data.error); loadList(); return; }
  const { startPlacementQuiz } = await import('./quiz.js');
  startPlacementQuiz(data.session, data.quiz, x, data.resumed);
}
