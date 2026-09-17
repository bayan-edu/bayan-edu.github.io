/* ══════════════════════════════════════════════════════════
   بيان — flashcards.js  ④  تذكّرها

   المسار: المواد ← الجلسة ← «بعبارتك» عند الإخفاق ← النهاية
   والإضافة: كتابةً أو اشتراكاً في مجموعات المادة الرسمية.

   🔑 والبطاقة نفسها — الوجهان والقلبُ باللمس والتكيّف مع الشاشة —
      منقولةٌ من معاينة المعلّم في editor_cards.js حرفياً. الأصناف
      .bf-* مصدرٌ واحد للشكل بين المحرّر والطالب (ثابت ⑨)، وما يفترق
      بينهما هنا هو الأثر: نداءاتٌ حقيقية إلى review_card لا عرضٌ
      بلا حفظ.

   ⚠️ الدوال المصدَّرة بـfunction لا const — لأجل الاستيراد الدائري.
   ══════════════════════════════════════════════════════════ */
import * as api from './api.js';
import { S } from './state.js';
import { app, head, toast, esc, AR, errBox, nav, scrollTop,
         dirOf, shrinkFont } from './ui.js';

let subjects = [];   // { id, name, due }


/* ═══════════ ① المواد ═══════════ */

export async function loadFlashcards(){
  nav('cards');
  head("تذكّرها", "ما تراجعه اليوم لا تنساه غداً");
  app.innerHTML = `<div class="status">جارٍ التحميل…</div>`;

  const [subj, counts] = await Promise.all([api.listSubjects(), api.dueCounts()]);
  if(subj.error){ app.innerHTML = errBox(subj.error, 'تذكّرها'); return; }

  const dueMap = new Map((counts.data || []).map(x => [x.subject_id, x.due]));
  subjects = (subj.data || []).map(s => ({ id: s.id, name: s.name, due: dueMap.get(s.id) || 0 }));

  const row = s => `
    <div class="ed-row" data-s="${s.id}">
      <div style="flex:1;min-width:0"><div class="ed-t">${esc(s.name)}</div></div>
      ${s.due > 0
        ? `<span class="chip g">${AR(s.due)}</span>`
        : `<span class="ed-empty" style="padding:0">لا شيء اليوم</span>`}
    </div>`;

  app.innerHTML = subjects.length
    ? subjects.map(row).join("")
    : `<div class="ed-empty">لا مواد بعد.</div>`;

  app.querySelectorAll('[data-s]').forEach(el => el.onclick = () =>
    openSubjectCards(subjects.find(s => String(s.id) === el.dataset.s)));
  scrollTop();
}


/* ═══════════ ② مركز المادة ═══════════ */

function openSubjectCards(subject){
  head("تذكّرها", subject.name);
  app.innerHTML = `
    <div class="crumb" id="bk">← تذكّرها</div>

    ${subject.due > 0 ? `
      <div class="card" style="text-align:center;padding:28px 18px">
        <div style="font-size:var(--fs-h);font-weight:700;margin-bottom:6px">${AR(subject.due)}</div>
        <div class="ed-m" style="justify-content:center;margin-bottom:16px">مستحقّة اليوم</div>
        <button class="btn primary" id="go" style="width:100%">ابدأ</button>
      </div>`
    : `
      <div class="card" style="text-align:center;padding:28px 18px">
        <div style="font-size:1.05rem;margin-bottom:4px">حفظتَها كلها. لن تعود قريباً</div>
      </div>`}

    <div class="nav" style="margin:16px 0">
      <button class="btn" id="add">＋ أضِف كلمة</button>
    </div>`;

  document.getElementById('bk').onclick = loadFlashcards;
  const go = document.getElementById('go');
  if(go) go.onclick = () => openSession(subject);
  document.getElementById('add').onclick = () => openAdd(subject);
}


/* ═══════════ ③ الجلسة ═══════════ */

function openSession(subject){
  /* حارسٌ يُطلق مرّةً عند الفتح: نداءٌ ناقصٌ في api.js كان يظهر عطلاً
     غامضاً في منتصف الجلسة — الآن يُسمّى باسمه قبل أن تبدأ. */
  const missing = ['dueCards','reviewCard','saveMyNote']
    .filter(f => typeof api[f] !== 'function');
  if(missing.length){
    app.innerHTML = `<div class="err"><b>ناقصٌ في api.js</b>
      لم تُضَف: ${missing.join(' · ')}</div>`;
    return;
  }

  let queue = [], counts = { 1:0, 2:0, 3:0 }, firstTimers = 0, total = 0;

  app.innerHTML = `<div class="status">جارٍ التحميل…</div>`;

  api.dueCards(subject.id).then(({ data, error }) => {
    if(error){ app.innerHTML = errBox(error, 'الجلسة'); return; }
    queue = data?.cards || [];
    if(!queue.length){ openSubjectCards(subject); return; }
    firstTimers = queue.filter(c => c.reps === 0).length;
    total = queue.length;
    mount();
  });

  function mount(){
    app.innerHTML = `
      <div class="crumb" id="bk">← ${esc(subject.name)}</div>
      <div class="bf-wrap">
        <div class="bf-stage" id="bfStage">
          <div class="bf-card" id="bfCard">
            <div class="bf-face bf-front" id="bfFront"></div>
            <div class="bf-face bf-back"  id="bfBack"></div>
          </div>
        </div>
      </div>`;

    document.getElementById('bk').onclick = () => {
      if(confirm('إنهاء الجلسة الآن؟')){ unbindResize(); loadFlashcards(); }
    };

    /* 🔑 تُقرأ لحظة الاستعمال لا مرّةً عند mount: restoreCard تُنشئ
       عناصر جديدة، ومرجعٌ ملتقَطٌ سلفاً يبقى مشيراً إلى المحذوف. */
    const el = id => document.getElementById(id);
    let fitters = [];

    function registerFit(face, target, basePx, minPx){
      fitters = fitters.filter(f => f.face !== face);
      shrinkFont(face, target, basePx, minPx);
      fitters.push({ face, target, basePx, minPx });
    }
    let resizeT;
    const onResize = () => {
      clearTimeout(resizeT);
      resizeT = setTimeout(() => fitters.forEach(f =>
        document.contains(f.target) && shrinkFont(f.face, f.target, f.basePx, f.minPx)), 120);
    };
    window.addEventListener('resize', onResize);
    const unbindResize = () => window.removeEventListener('resize', onResize);

    /* هيكل البطاقة يُكتب في موضعٍ واحد: mount أوّلَ مرّة، وهنا بعد
       شاشة «بعبارتك». وإعادةُ ربط النقر لازمة لأن bfCard عنصرٌ جديد. */
    function restoreCard(){
      const wrap = app.querySelector('.bf-wrap');
      wrap.innerHTML = `
        <div class="bf-stage" id="bfStage">
          <div class="bf-card" id="bfCard">
            <div class="bf-face bf-front" id="bfFront"></div>
            <div class="bf-face bf-back"  id="bfBack"></div>
          </div>
        </div>`;
      bind();
    }

    function paint(){
      const c = queue[0];
      const gap = /\{\{\s*\}\}/.test(c.front);
      el("bfCard").classList.remove('flipped');

      el("bfFront").innerHTML = `
        ${c.entry === 'dx' ? '<div class="ed-m"><span class="chip">📍 من إجابةٍ سابقة</span></div>' : ''}
        ${gap ? '<div class="bf-prompt">ما الكلمة الناقصة؟</div>' : ''}
        <div class="bf-front-q" id="bfQ" dir="${dirOf(c.front)}"
          >${esc(c.front).replace(/\{\{\s*\}\}/g, '<span style="opacity:.45">______</span>')}</div>
        <div class="bf-recall">
          <textarea id="bfDraft" dir="auto"
                    placeholder="${gap ? 'اكتب الكلمة…' : 'اكتب ما تعرفه…'}"
                    style="min-height:56px"></textarea>
          <button class="bf-hint" data-flip="1">اضغط لرؤية الإجابة</button>
        </div>`;
      registerFit(el("bfFront"), document.getElementById('bfQ'), 18.9, 15);

      el("bfBack").innerHTML = '';
    }

    function buildBack(){
      const c = queue[0];
      const draft = document.getElementById('bfDraft').value.trim();
      const compare = draft || c.my_note;   // ما يُقارَن به إن وُجد — فرصٌ لا مصدر واحد

      el("bfBack").innerHTML = `
        ${c.audio ? `<div style="display:flex;justify-content:flex-end;margin-bottom:6px">
            <span class="chip">🔊 نُطق</span></div>` : ''}

        ${c.entry === 'dx' && c.dx_note ? `
          <div class="bf-label">🎯 سبب المراجعة</div>
          <div class="bf-note" style="margin-bottom:12px">${esc(c.dx_note)}</div>` : ''}

        ${compare ? `
          <div class="bf-term" dir="${dirOf(c.front)}">${esc(c.front)}</div>
          <div class="bf-label">${draft ? 'كتبتَ' : 'طريقتك في تذكّرها'}</div>
          <div class="bf-mine" dir="auto">${esc(draft || c.my_note)}</div>
          <div class="bf-label">الصواب</div>
          <div class="bf-answer" id="bfAns" dir="${dirOf(c.back)}">${esc(c.back)}</div>`
        : `<div class="bf-answer" id="bfAns" dir="${dirOf(c.back)}">${esc(c.back)}</div>`}

        ${c.note ? `<div class="bf-divider"></div>
          <div class="bf-label">مثال</div>
          <div class="bf-note" dir="${dirOf(c.note)}">${esc(c.note)}</div>` : ''}

        <button class="bf-hint" data-flip="1">اضغط للعودة للسؤال</button>
        <div class="bf-btn-row">
          <button class="btn" data-g="1">لم أتذكّرها</button>
          <button class="btn" data-g="2">بصعوبة</button>
          <button class="btn" data-g="3">بسهولة</button>
        </div>`;

      registerFit(el("bfBack"), document.getElementById('bfAns'), 16.8, 13);

      el("bfBack").querySelector('[data-flip]').onclick = e => { e.stopPropagation(); toggle(); };
      el("bfBack").querySelectorAll('[data-g]').forEach(b => b.onclick = e => {
        e.stopPropagation(); rate(+b.dataset.g, draft);
      });
    }

    function toggle(){
      if(el("bfCard").classList.contains('flipped')) el("bfCard").classList.remove('flipped');
      else { buildBack(); el("bfCard").classList.add('flipped'); }
    }
    function bind(){
      el('bfCard').addEventListener('click', e => {
        if(e.target.closest('textarea, .bf-btn-row')) return;
        toggle();
      });
    }
    bind();

    let busy = false;

    async function rate(g, draft){
      if(busy) return;                    // نقرتان سريعتان لا تُقدّران مرّتين
      busy = true;
      const c = queue[0];                 // 🔴 لا shift قبل أن تنجح الكتابة

      let res;
      try {
        res = await api.reviewCard(c.id, g);
      } catch(err){
        /* 🔴 استثناءٌ مرميّ (دالّةٌ غير معرَّفة · انقطاعُ شبكة) يتخطّى فرع
           error تماماً. وكان يقع بعد shift — فتتقدّم الحالة بلا حفظ:
           الوجه الأول يبقى للبطاقة القديمة والمعنى يصير للتالية.
           عطلٌ صامتٌ لا يظهر في الطرفية لأن الوعد يُرفَض بلا مُلتقِط. */
        busy = false;
        toast('تعذّر حفظ المراجعة: ' + (err?.message || err), false);
        return;
      }
      if(res?.error){ busy = false; toast(res.error.message, false); return; }

      queue.shift();                      // الآن فقط — بعد أن ثبتت الكتابة
      counts[g] = (counts[g] || 0) + 1;
      busy = false;

      if(g === 1){
        queue.push(c);          // 🔑 لا تخرج قبل أن تصحّ — تعود إلى الذيل
        await afterMiss(c, draft);
        return;
      }
      advance();
    }

    /* «بعبارتك» — بعد الإخفاق وحده، وتحتلّ الشاشة لحظتها */
    function afterMiss(c, draft){
      return new Promise(resolve => {
        /* 🔴 لا تُنادى mount() هنا: كانت تُعيد كتابة app وتُنشئ نسخةً
           ثانية من paint/advance، ثمّ يُنادى advance القديم المشير إلى
           عناصرَ حُذفت من DOM — فتُرسم البطاقة في عناصر يتيمة لا تظهر.
           ⇒ يُستبدل محتوى bf-wrap وحده، ويُعاد بناؤه بعد الانتهاء. */
        const wrap = app.querySelector('.bf-wrap');
        wrap.innerHTML = `
            <div class="card" style="padding:20px 18px">
              <div class="bf-label" style="margin-bottom:4px">تعود اليوم</div>
              <div style="font-weight:700;margin-bottom:14px" dir="${dirOf(c.front)}"
                >${esc(c.front)}</div>
              <div class="bf-label" style="margin-bottom:4px">كيف تتذكّرها؟ اكتب بطريقتك</div>
              <textarea id="mn" dir="auto" style="min-height:64px"
                >${esc(draft && draft !== c.my_note ? '' : (c.my_note || ''))}</textarea>
              <div class="nav" style="margin-top:14px">
                <button class="btn primary" id="ok" style="width:100%">التالية</button>
              </div>
            </div>`;
        document.getElementById('ok').onclick = async () => {
          const note = document.getElementById('mn').value.trim();
          if(note){
            const { error } = await api.saveMyNote(c.id, note);
            if(!error) c.my_note = note;      // يظهر في عَودها داخل الجلسة نفسها
          }
          restoreCard();
          resolve();
          advance();
        };
      });
    }

    function advance(){
      if(!queue.length){ finish(); return; }
      paint();
    }

    function finish(){
      unbindResize();                     // وإلا تراكمت مستمعاتٌ على نافذةٍ واحدة
      const failed = counts[1] > 0;
      const line = failed
        ? { t: 'ما نسيته اليوم، ستتذكره غداً', thumb: true }
        : firstTimers === total
        ? { t: 'بدايةٌ جيدة. عُد غداً وسترى الفرق', thumb: false }
        : counts[2] >= counts[3]
        ? { t: 'أصعبُ ما راجعته، سيكون الأكثر ثباتاً', thumb: true }
        : { t: 'حفظتَها كلها. لن تعود قريباً', thumb: false };

      const reviewed = counts[1] + counts[2] + counts[3];

      app.innerHTML = `
        <div class="bf-wrap">
          <div class="card" style="text-align:center;padding:28px 18px">
            <div style="font-size:1.05rem;font-weight:500;margin-bottom:6px">
              ${line.thumb ? '<span style="opacity:.8">👍</span> ' : ''}${esc(line.t)}
            </div>
            <div class="ed-m" style="justify-content:center;margin:14px 0">راجعتَ ${AR(reviewed)} بطاقة</div>
            <button class="btn primary" id="back" style="width:100%">عودة</button>
          </div>
        </div>`;

      document.getElementById('back').onclick = async () => {
        const { data } = await api.dueCounts();
        const rest = (data || []).filter(x => x.subject_id !== subject.id)
                                  .reduce((a,x) => a + x.due, 0);
        if(rest > 0) toast(`متبقٍّ اليوم: ${AR(rest)} في موادّ أخرى`);
        loadFlashcards();
      };
    }

    paint();
  }
}


/* ═══════════ ④ الإضافة — كتابةً أو اشتراكاً ═══════════ */

function openAdd(subject){
  app.innerHTML = `<div class="status">جارٍ التحميل…</div>`;

  api.subjectDecks(subject.id).then(({ data, error }) => {
    if(error){ app.innerHTML = errBox(error, 'الإضافة'); return; }
    const decks = (data || []).filter(d => !d.mine && d.cards > 0);

    app.innerHTML = `
      <div class="crumb" id="bk">← ${esc(subject.name)}</div>

      <div class="card">
        <label class="fl">الكلمة أو المصطلح</label>
        <input type="text" id="fr" dir="auto">
        <label class="fl" style="margin-top:14px">معناها
          <span style="opacity:.6">(إن كانت جديدة)</span></label>
        <textarea id="bk2" dir="auto" style="min-height:70px"></textarea>
        <div class="nav" style="margin-top:14px">
          <button class="btn primary" id="sv">أضِف</button>
        </div>
        <div id="out" style="margin-top:10px"></div>
      </div>

      ${decks.length ? `
        <div class="ed-sec">
          <div class="grp">أو اختر من مجموعات ${esc(subject.name)}</div>
          ${decks.map(d => `
            <div class="ed-row" data-deck="${d.id}">
              <div style="flex:1"><div class="ed-t">${esc(d.title)}</div></div>
              <span class="chip">${AR(d.cards)}</span>
            </div>`).join("")}
        </div>` : ''}`;

    document.getElementById('bk').onclick = () => openSubjectCards(subject);
    document.getElementById('sv').onclick = () => addByWriting(subject);
    app.querySelectorAll('[data-deck]').forEach(el => el.onclick = () =>
      openBrowseDeck(subject, decks.find(d => String(d.id) === el.dataset.deck)));
    scrollTop();
  });
}

async function addByWriting(subject){
  const front = document.getElementById('fr').value.trim();
  const back  = document.getElementById('bk2').value.trim() || null;
  if(!front) return toast('اكتب الكلمة أولاً', false);

  const { data, error } = await api.addMyCard({ subject: subject.id, front, back });
  if(error) return toast(error.message, false);

  const out = document.getElementById('out');
  if(data.action === 'already')
    out.innerHTML = `<div class="ed-empty">✅ هذه عندك منذ فترة — تعود بعد ${AR(data.due_in_days)} يوماً</div>`;
  else if(data.action === 'attached')
    out.innerHTML = `<div class="ed-empty">✅ موجودةٌ في «${esc(data.deck)}» — أُضيفت إلى مراجعتك</div>`;
  else
    out.innerHTML = `<div class="ed-empty">✅ أُضيفت إلى «${esc(data.deck)}»</div>`;

  document.getElementById('fr').value = '';
  document.getElementById('bk2').value = '';
}


/* ═══════════ ⑤ تصفّح مجموعةٍ رسمية والاشتراك ═══════════ */

function openBrowseDeck(subject, deck){
  app.innerHTML = `<div class="status">جارٍ التحميل…</div>`;

  api.browseDeck(deck.id).then(({ data, error }) => {
    if(error){ app.innerHTML = errBox(error, 'المجموعة'); return; }
    const cards = data || [];

    /* 🔴 لا يُستعار .ed-row هنا: label عنصرٌ سطريّ لا يُنشئ سياق flex،
       فـflex:1 على الابن بلا أثر — يأخذ المربّع عرضه الطبيعيّ ويُحشر
       النصّ فيما بقي فينكسر حرفاً حرفاً. ⇒ يُصرَّح بالتخطيط هنا. */
    const row = c => `
      <label class="pick-row">
        <input type="checkbox" data-c="${c.id}" ${c.mine ? 'checked disabled' : ''}>
        <span class="pick-txt">
          <span class="pick-f" dir="${dirOf(c.front)}">${esc(c.front)}</span>
          <span class="pick-b" dir="${dirOf(c.back)}">${esc(c.back)}</span>
        </span>
        ${c.mine ? '<span class="chip g">عندك</span>' : ''}
      </label>`;

    app.innerHTML = `
      <div class="crumb" id="bk">← ${esc(subject.name)}</div>
      <div class="ed-sec">
        <div class="grp">${esc(deck.title)}</div>
        ${cards.map(row).join("")}
      </div>
      <div class="nav" style="margin-top:16px;position:sticky;bottom:12px">
        <button class="btn primary" id="sub" style="width:100%">اشترك بالمُختار</button>
      </div>`;

    document.getElementById('bk').onclick = () => openAdd(subject);
    document.getElementById('sub').onclick = async () => {
      const ids = [...app.querySelectorAll('[data-c]:checked:not(:disabled)')]
                    .map(i => +i.dataset.c);
      if(!ids.length) return toast('اختر بطاقةً واحدةً على الأقل', false);

      const { data, error } = await api.subscribeCards(ids);
      if(error) return toast(error.message, false);
      toast(`أُضيفت ${AR(data.added)}` + (data.already ? ` · وكانت ${AR(data.already)} عندك` : ''));
      openSubjectCards(subject);
    };
    scrollTop();
  });
}
