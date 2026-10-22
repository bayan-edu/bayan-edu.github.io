/* ══════════════════════════════════════════════════════════
   بيان — teacher.js
   لوحة المعلم: التصحيح المقالي · القراءات الجهرية · رسائل الطلاب · اختيار الموادّ

   ⚠️ عزل بيانات المعلمين مضمون في RLS عبر teaches()،
      لا في هذه الواجهة. لا تعتمد على تصفية الواجهة أماناً.
   ══════════════════════════════════════════════════════════ */
import * as api from './api.js';
import { S } from './state.js';
import { app, head, toast, esc, fmt, AR, bubble, errBox, nav, BUILD,
         refreshCounts, scrollTop, scrollBottom, N } from './ui.js';

/* ═══════════ ① التصحيح ═══════════ */

export async function loadTeacher(){
  nav('grade'); head("لوحة المعلم — "+S.prof.full_name, "الإجابات المقالية بانتظار تصحيحك");
  app.innerHTML = `<div class="status">جار التحميل…</div>`;
  /* 🆕 b169 · والقراءاتُ الجهريّة معها بنداءٍ موازٍ — وفشلُها لا يحجب التصحيح */
  const [{ data, error }, rd] = await Promise.all([
    api.attemptsToGrade(),
    api.teacherReadings().then(r => r, e => ({ error: e }))
  ]);

  const all  = data || [];
  const wait = all.filter(a=>!a.teacher_comment), done = all.filter(a=>a.teacher_comment);
  const card = (a,d)=>`<div class="pend ${d?'done':''}" data-a="${a.id}">
      <div class="qz-t">${esc(a.profiles?.full_name||'')}</div>
      <div class="qz-m">${esc(a.quizzes?.title||'')} · ${AR(a.score)}/${AR(a.total)} (${AR(a.pct)}٪) · ${new Date(a.submitted_at).toLocaleDateString('ar-EG')}</div>
    </div>`;

  app.innerHTML = `
    ${errBox(error,'قائمة التصحيح')}
    <h2 class="sec">بانتظار التصحيح (${AR(wait.length)})</h2>
    ${wait.length?wait.map(a=>card(a,false)).join(""):'<div class="status">لا توجد محاولات معلّقة 🎉</div>'}
    ${done.length?`<h2 class="sec">مُصحَّحة</h2>${done.slice(0,20).map(a=>card(a,true)).join("")}`:''}
    ${readingsHtml(rd)}
    <p class="hint">استُلم ${N(all.length,'صف','صفان','صفوف','صفاً')} من قاعدة البيانات · نسخة الواجهة ${BUILD}</p>`;

  app.querySelectorAll(".pend[data-a]").forEach(el=>el.onclick=()=>openGrade(+el.dataset.a));
  app.querySelectorAll(".pend[data-r]").forEach(el=>el.onclick=()=>openReading(+el.dataset.r));
}

/* ═══════════ ①ب القراءات الجهرية (b169 · sql/175) ═══════════
   الطالبُ قرأ نصَّ الدرس بصوته (b164)، والمعلّمُ هنا يسمع ويكتب ملاحظته.
   🔑 **في شاشة التصحيح لا في قسمٍ جديد:** عملُ طالبٍ ينتظر المعلّم — كالمقاليّ.
      فلا رابطَ جديدَ ولا بندَ في القائمة، والمعلّمُ يجدها حيث يبحث عمّا ينتظره.
   🔑 **والوقتُ يحكم:** الصوتُ يُحذف بعد خمسة أيام (`173`)، والملاحظةُ تبقى.
      فالقائمةُ تقول كم بقي لكلّ قراءة — وما حُذف صوتُه يبقى في القائمة بلا مشغّل.
   📐 والملاحظةُ نصٌّ وحده — كودُ التشخيص للنطق ينتظر قراراً تربويّاً (رأس `175`). */
const READ_KEEP_DAYS = 5;            // حدُّ الكنّاس في `173` — غيّرتَه هناك؟ غيّره هنا

function readingsHtml(rd){
  if(rd?.error) return errBox(rd.error, 'القراءات الجهرية');
  const list = Array.isArray(rd?.data) ? rd.data : [];
  if(!list.length) return '';
  const wait = list.filter(r => !r.noted && !r.deleted);
  /* <bdi>: عنوانُ نصٍّ إنجليزيّ في سطرٍ عربيّ يقلب ترتيبَ الفواصل حوله (قِيس) — فيُعزل */
  const card = r => `<div class="pend ${(r.noted || r.deleted) ? 'done' : ''}" data-r="${r.id}">
      <div class="qz-t">${esc(r.student || '')}</div>
      <div class="qz-m"><bdi>${esc(r.text || '')}</bdi> · <bdi>${esc(r.subject || '')}</bdi> · ${new Date(r.at).toLocaleDateString('ar-EG')}
        · ${r.noted ? 'كُتبت ملاحظتك' : r.deleted ? 'حُذف الصوت' : leftLabel(r.at)}</div>
    </div>`;
  return `<h2 class="sec">القراءات الجهرية — ${wait.length ? 'تنتظر الاستماع (' + AR(wait.length) + ')' : 'لا شيء ينتظر'}</h2>
    ${list.map(card).join('')}`;
}

/* كم يوماً بقي قبل حذف الصوت — بالساعات لا بالتقويم: الكنّاسُ يقيس العمرَ هكذا */
function leftLabel(at){
  const left = READ_KEEP_DAYS - (Date.now() - new Date(at).getTime()) / 864e5;
  if(left <= 1) return 'يُحذف الصوت خلال يوم';
  return 'يُحذف الصوت بعد ' + N(Math.floor(left), 'يوم', 'يومين', 'أيام', 'يوماً');
}

export async function openReading(id){
  app.innerHTML = `<div class="status">جار الفتح…</div>`;
  const { data: r, error } = await api.teacherReading(id);
  if(error || !r){
    app.innerHTML = `<div class="crumb" id="bk">→ قائمة التصحيح</div>`
      + errBox(error || { message: 'لم تُوجد القراءة' }, 'فتح القراءة');
    document.getElementById("bk").onclick = loadTeacher; return;
  }
  /* الرابطُ الموقَّع بعد التحقّق — ولا يُطلب لصوتٍ حُذف */
  let src = null, urlErr = null;
  if(r.path){
    const { data: u, error: e2 } = await api.recordingUrl(r.path);
    src = u?.signedUrl || null; urlErr = e2;
  }

  head("القراءة الجهرية", r.student);
  const paras = String(r.body || '').split(/\n\s*\n/).map(p => p.trim()).filter(Boolean);
  app.innerHTML = `
    <div class="crumb" id="bk">→ قائمة التصحيح</div>
    <div class="card">
      <div class="qnum"><bdi>${esc(r.text || '')}</bdi> · <bdi>${esc(r.subject || '')}</bdi> · ${new Date(r.at).toLocaleString('ar-EG')}</div>
      ${src ? `<audio controls preload="metadata" src="${src}" style="width:100%;margin:12px 0 4px"></audio>
               <div class="line">${leftLabel(r.at)}</div>`
            : `<div class="line">${r.deleted ? 'حُذف الصوت بعد خمسة أيام، وتبقى ملاحظتك عند الطالب.'
                                             : 'تعذّر تحميل الصوت' + (urlErr ? ' — ' + esc(urlErr.message) : '')}</div>`}
      <label class="fl" style="margin-top:16px">النص الذي قرأه</label>
      <div class="essaybox" dir="auto" style="max-height:340px;overflow:auto">${
        paras.map(p => `<p style="margin:0 0 .8em">${esc(p)}</p>`).join('')}</div>
      <label class="fl" style="margin-top:16px">ملاحظتك للطالب</label>
      <textarea id="fb" maxlength="1000" placeholder="ما أحسنه في القراءة، وما يحتاج تدريباً…">${esc(r.note || '')}</textarea>
      ${r.noted_at ? `<div class="hint">آخر حفظ: ${new Date(r.noted_at).toLocaleString('ar-EG')}</div>` : ''}
    </div>
    <div class="nav"><button class="btn primary" id="sv">حفظ وإرسال</button></div>`;

  document.getElementById("bk").onclick = loadTeacher;
  document.getElementById("sv").onclick = async e => {
    const fb = (document.getElementById("fb").value || "").trim();
    if(!fb){ toast("ملاحظتك أولاً"); return; }
    const b = e.currentTarget; b.disabled = true;
    const { data, error: e3 } = await api.reviewReading(id, fb);
    if(e3 || !data?.ok){ b.disabled = false; toast(e3?.message || data?.error || "تعذّر الحفظ"); return; }
    toast("أُرسلت الملاحظة");
    loadTeacher();
  };
  scrollTop();
}

export async function openGrade(id){
  app.innerHTML = `<div class="status">جار الفتح…</div>`;
  const { data:a,   error:e1 } = await api.attempt(id);
  const { data:ans, error:e2 } = await api.attemptAnswers(id);
  if(e1 || !a){ app.innerHTML = `<div class="crumb" id="bk">→ قائمة التصحيح</div>`
    + errBox(e1 || {message:'لم تُوجد المحاولة'}, 'فتح المحاولة');
    document.getElementById("bk").onclick = loadTeacher; return; }

  const essays = (ans||[]).filter(x=>x.questions?.kind==='essay')
    .sort((x,y)=>x.questions.position-y.questions.position);

  head("تصحيح مقالي", a.profiles?.full_name);
  app.innerHTML = `
    <div class="crumb" id="bk">→ قائمة التصحيح</div>
    ${errBox(e2,'الإجابات المقالية')}
    <div class="card">
      <div class="qnum">${esc(a.quizzes?.title||'')} · ${new Date(a.submitted_at).toLocaleString('ar-EG')}</div>
      <div class="line">اختيار من متعدد: ${AR(a.score)}/${AR(a.total)} (${AR(a.pct)}٪)</div>
      ${essays.map(e=>`
        <div style="margin-top:14px">
          <div class="rev-q">${fmt(e.questions.body)}</div>
          <div class="essaybox">${esc(e.essay_text||'— لم تُكتب —')}</div>
        </div>`).join("")}
      <label class="fl">درجة الأسئلة المقالية</label>
      <input type="text" id="es" inputmode="decimal" value="${a.essay_score??''}" placeholder="مثال: 4.5">
      <label class="fl" style="margin-top:16px">ملاحظاتك للطالب</label>
      <textarea id="fb" placeholder="التشخيص والخطة العلاجية…">${esc(a.teacher_comment||'')}</textarea>
    </div>
    <div class="nav"><button class="btn primary" id="sv">حفظ وإرسال</button></div>`;

  document.getElementById("bk").onclick = loadTeacher;
  document.getElementById("sv").onclick = async ()=>{
    const es = (document.getElementById("es").value||"").trim();
    const fb = (document.getElementById("fb").value||"").trim();
    if(!fb){ toast("ملاحظاتك أولاً"); return; }
    const { error } = await api.saveGrade(id, es===''?null:Number(es), fb, S.user.id);
    toast(error?"تعذّر الحفظ":"أُرسلت الملاحظات");
    if(!error) refreshCounts();    // نقص المنتظِر ⇒ ينقص الجرس
    loadTeacher();
  };
  scrollTop();
}

/* ═══════════ ② رسائل الطلاب ═══════════ */

export async function loadInbox(){
  nav('inbox'); head("رسائل الطلاب", S.prof.full_name);
  app.innerHTML = `<div class="status">جار التحميل…</div>`;
  const { data, error } = await api.teacherInbox();

  const map = {};
  (data||[]).forEach(m=>{
    if(!map[m.student_id]) map[m.student_id] = { id:m.student_id,
      name:m.student?.full_name||'طالب', last:m.body.slice(0,70), at:m.created_at, unread:0 };
    if(m.sender_role==='student' && !m.read_by_teacher) map[m.student_id].unread++;
  });
  const thr = Object.values(map).sort((a,b)=>b.unread-a.unread);

  app.innerHTML = `
    ${errBox(error,'رسائل الطلاب')}
    ${thr.length?thr.map(t=>`
      <div class="thr" data-i="${t.id}">
        <div><div class="qz-t">${esc(t.name)}</div>
          <div class="qz-m">${esc(t.last)}… · ${new Date(t.at).toLocaleDateString('ar-EG')}</div></div>
        ${t.unread?`<span class="dot">${AR(t.unread)} جديد</span>`:''}
      </div>`).join(""):'<div class="status">لا توجد رسائل جديدة</div>'}`;

  app.querySelectorAll(".thr").forEach(el=>el.onclick=()=>openThread(el.dataset.i));
}

export async function openThread(sid){
  app.innerHTML = `<div class="status">جار الفتح…</div>`;
  const { data, error } = await api.studentThread(sid);

  head("محادثة", data?.[0]?.profiles?.full_name || '');
  app.innerHTML = `
    <div class="crumb" id="bk">→ رسائل الطلاب</div>
    ${errBox(error,'المحادثة')}
    <div class="chat">${(data||[]).map(m=>bubble(m,m.sender_role==='teacher')).join("")}</div>
    <div class="card"><label class="fl">ردّك</label>
      <textarea id="rt" placeholder="ردُّك العلميّ…"></textarea></div>
    <div class="nav"><button class="btn primary" id="sr">إرسال الرد</button></div>`;
  document.getElementById("bk").onclick = loadInbox;
  document.getElementById("sr").onclick = async ()=>{
    const t = (document.getElementById("rt").value||"").trim();
    if(!t){ toast("ردُّك أولاً"); return; }
    const { error } = await api.sendMessage({
      studentId:sid, senderId:S.user.id, senderRole:'teacher', body:t });
    toast(error?"تعذّر الإرسال":"أُرسل الرد"); openThread(sid);
  };
  await api.teacherReadsThread(sid);
  refreshCounts();          // قُرئت رسائلُ هذا الطالب ⇒ ينقص الجرس
  scrollBottom();
}

/* ═══════════ ③ موادّ المعلم ═══════════ */

/* 🆕 b88 · السعة — تحكّمٌ ذاتيّ فوق `set_subject_capacity` (SQL 116).
   ⚠️ ولا تظهر إلا لمادّةٍ مختارةٍ **في القاعدة** لا في الشاشة: الحقل
      يُحدِّث صفَّ `teacher_subjects`، والصفَّ يُنشئه زرُّ «حفظ». فمادّةٌ
      نُقرت الآن لا صفَّ لها، ولا يُعرض حقلٌ لا يحفظ ما يُكتب فيه.
   🔒 و«أستقبل طلاباً» (`accepting`) خارجها عمداً: `list_mentors` تكتبه
      للطالب «اكتمل النصاب» — وهو خبرٌ كاذب لمعلّمٍ أغلق بابه وعنده
      متّسع. القرارُ مؤجَّلٌ في STATE ⑨، ولا يُفتح مفتاحٌ يُنتج كذبة. */
const capBox = x => !x.chosen ? '' : `
      <div class="m-cap-set">
        <label class="fl">السعة — كم طالباً في هذه المادة</label>
        <input type="number" min="1" max="500" value="${x.capacity}" data-cap="${x.id}">
      </div>`;

export async function loadMySubjects(){
  nav('mySubjects');
  /* 🔓 b139 · وسقط الوصف — **قرارُ صاحب المنصّة: حشوٌ وثقيلُ الصياغة.**
     وهو واحدٌ من ثلاثةٍ سقطت معاً، ومِعيارُها واحد: **وصفٌ يقول ما يقوله
     العنوانُ فوقه أو ما تراه العينُ تحته يُرفع، ووصفٌ يقول ما لا يُعرف
     من مكانٍ آخر يبقى** (كـ«الأضعف أوّلاً — الترتيب توجيه» في الأداء،
     و«اختبارات قائمة بذاتها — لا تتبع درساً ولا مقرَّراً» في أدوات القياس).
     📌 و«الموادّ التي فيها متابعتك للطلاب» شرحٌ لـ«موادّي» — ومصدران
        متتابعان يسمّيهما §٣ ركاكة. والمعلّمُ يعرف ما موادُّه.
     ⚠️ والفارغُ يُخفى ولا يُفرَّغ: `head()` تُسقط `.sub` حين تغيب. */
  head("موادّي", "");
  app.innerHTML = `<div class="status">جار التحميل…</div>`;

  const { data, error } = await api.listTeachableSubjects();
  if(error){ app.innerHTML = `<div class="err"><b>تعذّر التحميل</b>${esc(error.message)}</div>`; return; }
  const subs = data || [];
  const picked = new Set(subs.filter(x=>x.chosen).map(x=>x.id));

  app.innerHTML = `
    <div class="warnbox">
      حتى ٣ مواد تُختار. والمادة الواحدة عبر صفوف مختلفة تُحسب مادة واحدة.
      ستظهر للطلاب في قائمة معلمي المواد المختارة.
    </div>
    ${subs.map(x=>`
      <div class="mentor ${picked.has(x.id)?'cur':''}" data-i="${x.id}">
        <div class="m-n">${esc(x.name)} ${picked.has(x.id)?'<span class="badge on">مختارة</span>':''}</div>
        ${/* 🆕 b88 · «السعة ٤٠» خرجت من هذا السطر: لمادّةٍ غير مختارة
              لا صفَّ لها أصلاً، فالأربعون افتراضٌ في الدالّة لا رقمٌ
              محفوظ — ورقمان لشيءٍ واحد يتفارقان. والسعةُ الآن في
              حقلها، وهو موضعها الوحيد. */''}
        <div class="m-m">${x.family?esc(x.family)+' · ':''}${
          N(x.students,'طالب','طالبان','طلاب','طالباً')}</div>
        ${capBox(x)}
      </div>`).join("")}
    ${!subs.length?'<div class="status">لا توجد مواد بعد</div>':''}
    <div class="nav" style="margin-top:16px">
      <button class="btn primary" id="save">حفظ</button>
    </div>`;

  app.querySelectorAll(".mentor").forEach(el=>el.onclick=()=>{
    const id = Number(el.dataset.i);
    if(picked.has(id)) picked.delete(id); else picked.add(id);
    el.classList.toggle('cur');
    const b = el.querySelector('.badge');
    if(picked.has(id) && !b) el.querySelector('.m-n').insertAdjacentHTML('beforeend',' <span class="badge on">مختارة</span>');
    if(!picked.has(id) && b) b.remove();
    /* 🆕 b88 · مادّةٌ رُفع اختيارُها سيحذف «حفظ» صفَّها — فضبطُ سعتها
       بعد ذلك كتابةٌ على ما سيُمحى. يُعطَّل الحقل ولا يُخفى: الاختفاء
       يُقرأ عطلاً، والتعطيلُ يُقرأ نتيجةً لما فعله المعلّم للتوّ. */
    el.querySelectorAll('input[data-cap]').forEach(i=>{ i.disabled = !picked.has(id); });
  });

  /* النقر داخل صندوق السعة ضبطٌ لا اختيار — ولولا هذا لألغت البطاقةُ
     اختيارَها تحت إصبع المعلّم وهو يكتب رقماً فيها. */
  app.querySelectorAll(".m-cap-set").forEach(box=>{
    box.addEventListener('click', e => e.stopPropagation());
  });

  app.querySelectorAll("input[data-cap]").forEach(inp=>{
    inp.onchange = async ()=>{
      /* الحدّان يُقرآن من الحقل نفسه لا من رقمين مكتوبين هنا.
         والقاعدة تقصّ ثانيةً على كلّ حال (116) — فهذه راحةٌ لا حراسة. */
      const lo = Number(inp.min), hi = Number(inp.max);
      const v  = Math.min(hi, Math.max(lo, Math.round(Number(inp.value) || lo)));
      inp.value = v;
      const { data, error } = await api.setSubjectCapacity(Number(inp.dataset.cap), v, null);
      if(error){ toast(error.message); return; }
      /* 🔑 و116 تُرجع «هل مسّ التحديثُ صفّاً» — فالصمت لا يُصدَّق */
      if(!data){ toast("لم تُحفظ — ويُحفظ اختيار موادّك أولاً"); return; }
      toast(`السعة الآن ${AR(v)}`);
    };
  });

  document.getElementById("save").onclick = async ()=>{
    const { data:r, error } = await api.setMySubjects([...picked]);
    if(error){ toast(error.message); return; }
    if(!r.ok){ toast(r.error); return; }
    toast("حُفظت موادّك"); loadMySubjects();
  };
  scrollTop();
}
