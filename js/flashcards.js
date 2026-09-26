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
import { openMatchGame, eligible } from './card_game_match.js';
import { app, head, toast, esc, AR, errBox, nav, scrollTop,
         dirOf, shrinkFont, examples, pickExample,
         skeleton } from './ui.js';

let subjects = [];   // { id, name, due }


/* ═══════════ ① المواد ═══════════ */

export async function loadFlashcards(){
  nav('cards');
  head("تذكّرها", "ما تراجعه اليوم لا تنساه غداً");
  app.innerHTML = skeleton('rows');

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
        <button class="btn primary" id="go" style="width:100%">بدء</button>
      </div>`
    : `
      <div class="card" style="text-align:center;padding:28px 18px">
        <div style="font-size:1.05rem;margin-bottom:4px">حفظتها كلها. لن تعود قريباً</div>
      </div>`}

    <div class="nav" style="margin:16px 0">
      <button class="btn" id="add">＋ إضافة كلمة</button>
      <button class="btn" id="play" hidden>⚔️ التدرّب على كلماتك</button>
    </div>`;

  document.getElementById('bk').onclick = loadFlashcards;
  const go = document.getElementById('go');
  if(go) go.onclick = () => openSession(subject);
  document.getElementById('add').onclick = () => openAdd(subject);

  /* 🔑 مدخلٌ **دائم** لا محبوسٌ في مسار الجلسة: تقديمُ الجلسة عليها
     ترتيبٌ، وحبسُها فيها حرمانٌ لمن أراد التكرار. والزرّ تحت زرّ
     الجلسة لا فوقه — فالأولوية بالموضع لا بالقفل («منعُ الراغب»
     مرفوضٌ في هذا المشروع).
     ويُخفى حتى تُعرف الأهليّة، فلا يُعرض زرٌّ يعتذر عند الضغط. */
  api.practiceCards(subject.id).then(({ data }) => {
    const pool = eligible(data || []);
    if(pool.length < 4) return;
    const b = document.getElementById('play');
    if(!b) return;
    b.hidden = false;
    b.textContent = `⚔️ تدرّب على كلماتك · ${AR(pool.length)}`;
    b.onclick = () => openMatchGame({
      subject, cards: pool,
      onExit: () => openSubjectCards(subject) });
  }).catch(() => {});
}


/* ═══════════ ③ الجلسة ═══════════ */

/* جلسةٌ واحدة بمصدرين: الطابور المستحقّ (due_cards)، أو قائمةٌ
   جاهزة يُمرّرها الدرس. والمنطق بينهما واحد — القلبُ والتقدير
   و«بعبارتك» والنهاية. ⇒ لا نسختان تتباعدان (ثابت ⑨).

   opts = { fetch, back, label }
     fetch : دالّةٌ تُرجع { cards } — بديلٌ عن due_cards
     back  : ما يُنادى عند الخروج والانتهاء — بديلٌ عن شاشة المادة
     label : عنوانُ مسار العودة */
export function openSession(subject, opts = {}){
  const fetchCards = opts.fetch || (() => api.dueCards(subject.id)
                                          .then(r => r.error ? Promise.reject(r.error)
                                                             : (r.data?.cards || [])));
  const goBack = opts.back || (() => openSubjectCards(subject));

  /* حارسٌ يُطلق مرّةً عند الفتح: نداءٌ ناقصٌ في api.js كان يظهر عطلاً
     غامضاً في منتصف الجلسة — الآن يُسمّى باسمه قبل أن تبدأ. */
  const missing = ['dueCards','reviewCard','saveMyNote']
    .filter(f => typeof api[f] !== 'function');
  if(missing.length){
    app.innerHTML = `<div class="err"><b>ناقصٌ في api.js</b>
      لم تُضَف: ${missing.join(' · ')}</div>`;
    return;
  }

  let queue = [], seen = [], counts = { 1:0, 2:0, 3:0 }, firstTimers = 0, total = 0;

  /* إعدادُ النظام قيمةٌ ابتدائية، والاختيار اليدويّ يعلوها ويُحفظ.
     وlocalStorage يرمي في التصفّح الخاص — فلولا try لسقطت الجلسة
     كلُّها لأجل قراءةٍ فاشلة (الدرس نفسه من toggleTheme). */
  let calm;
  try{
    const saved = localStorage.getItem('bf-calm');
    calm = saved === null
      ? matchMedia('(prefers-reduced-motion: reduce)').matches
      : saved === '1';
  }catch(err){ calm = false; }

  app.innerHTML = skeleton('screen');

  Promise.resolve(fetchCards()).then(list => {
    queue = list || [];
    if(!queue.length){ toast('لا بطاقات', false); goBack(); return; }
    seen = queue.slice();          // queue تُستهلك بالـshift — واللعبة تحتاج الجولة كاملة
    firstTimers = queue.filter(c => (c.reps || 0) === 0).length;
    total = queue.length;
    mount();
  }).catch(e => { app.innerHTML = errBox(e, 'الجلسة'); });

  function mount(){
    app.innerHTML = `
      <div class="crumb" id="bk">← ${esc(opts.label || subject.name)}</div>
      <div class="bf-wrap${calm ? ' calm' : ''}">
        <div class="bf-bar">
          <label class="bf-toggle">
            <input type="checkbox" id="bfCalm" ${calm ? 'checked' : ''}>
            <span class="bf-track"><span class="bf-knob"></span></span>
            <span class="bf-toggle-t">حركة أقل</span>
          </label>
        </div>
        <div class="bf-stage" id="bfStage">
          <div class="bf-card" id="bfCard">
            <div class="bf-face bf-front" id="bfFront"></div>
            <div class="bf-face bf-back"  id="bfBack"></div>
          </div>
        </div>
      </div>`;

    /* 🔑 مفتاحٌ واحد يشترك فيه المحرّر والطالب: من خفّف في المعاينة
       يجده مخفَّفاً في الجلسة. ولا يُعاد سؤاله مرّتين. */
    document.getElementById('bfCalm').onchange = e => {
      calm = e.target.checked;
      try{ localStorage.setItem('bf-calm', calm ? '1' : '0'); }catch(err){}
      app.querySelector('.bf-wrap').classList.toggle('calm', calm);
    };

    document.getElementById('bk').onclick = () => {
      if(confirm('إنهاء الجلسة الآن؟')){ unbindResize(); goBack(); }
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
      const bar  = wrap.querySelector('.bf-bar')?.outerHTML || '';
      wrap.innerHTML = bar + `
        <div class="bf-stage" id="bfStage">
          <div class="bf-card" id="bfCard">
            <div class="bf-face bf-front" id="bfFront"></div>
            <div class="bf-face bf-back"  id="bfBack"></div>
          </div>
        </div>`;
      /* المفتاح عنصرٌ جديد بعد إعادة البناء — يُعاد ربطه وإلا صمت */
      const cb = document.getElementById('bfCalm');
      if(cb) cb.onchange = e => {
        calm = e.target.checked;
        try{ localStorage.setItem('bf-calm', calm ? '1' : '0'); }catch(err){}
        wrap.classList.toggle('calm', calm);
      };
      bind();
    }

    function paint(){
      const c = queue[0];
      const gap = /\{\{\s*\}\}/.test(c.front);
      c._ex = pickExample(c.note);      // ثابتٌ ما دامت البطاقة معروضة
      el("bfCard").classList.remove('flipped');

      el("bfFront").innerHTML = `
        ${c.entry === 'dx' ? '<div class="ed-m"><span class="chip">📍 من إجابةٍ سابقة</span></div>' : ''}
        ${gap ? '<div class="bf-prompt">ما الكلمة الناقصة؟</div>' : ''}
        <div class="bf-front-q" id="bfQ" dir="${dirOf(c.front)}"
          >${esc(c.front).replace(/\{\{\s*\}\}/g, '<span style="opacity:.45">______</span>')}</div>
        <div class="bf-recall">
          <textarea id="bfDraft" dir="auto"
                    placeholder="${gap ? 'الكلمة…' : 'ما يحضرك…'}"
                    style="min-height:56px"></textarea>
          <button class="bf-hint" data-flip="1">رؤية الإجابة</button>
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
          <div class="bf-label">${draft ? 'كتبت' : 'طريقتك في تذكّرها'}</div>
          <div class="bf-mine" dir="auto">${esc(draft || c.my_note)}</div>
          <div class="bf-label">الصواب</div>
          <div class="bf-answer" id="bfAns" dir="${dirOf(c.back)}">${esc(c.back)}</div>`
        : `<div class="bf-answer" id="bfAns" dir="${dirOf(c.back)}">${esc(c.back)}</div>`}

        ${c._ex ? `<div class="bf-divider"></div>
          <div class="bf-label">مثال${examples(c.note).length > 1
            ? ` · ${AR(examples(c.note).length)}` : ''}</div>
          <div class="bf-note" dir="${dirOf(c._ex)}">${esc(c._ex)}</div>` : ''}

        <button class="bf-hint" data-flip="1">العودة للسؤال</button>
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
              <div class="bf-label" style="margin-bottom:4px">طريقتك في تذكّرها</div>
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
        ? { t: 'ما نسيته اليوم يعود غداً — وعندها يثبت', thumb: true }
        : firstTimers === total
        ? { t: 'بدايةٌ جيدة. والعودةُ غداً تُري الفرق', thumb: false }
        : counts[2] >= counts[3]
        ? { t: 'أصعبُ ما راجعته، سيكون الأكثر ثباتاً', thumb: true }
        : { t: 'حفظتها كلها. لن تعود قريباً', thumb: false };

      const reviewed = counts[1] + counts[2] + counts[3];
      /* 🔑 الدعوة **بعد** الجلسة لا بدلها: المطابقة تعرّفٌ لا استرجاع،
         وتُنتج شعوراً بالإتقان أقوى مما تُنتجه البطاقة. فلو سبقت،
         لاستُبدل الأنفع بالأمتع. وتظهر بشرط البيانات لا بشرط المادة. */
      const playable = eligible(seen);

      app.innerHTML = `
        <div class="bf-wrap">
          <div class="card" style="text-align:center;padding:28px 18px">
            <div style="font-size:1.05rem;font-weight:500;margin-bottom:6px">
              ${line.thumb ? '<span style="opacity:.8">👍</span> ' : ''}${esc(line.t)}
            </div>
            <div class="ed-m" style="justify-content:center;margin:14px 0">راجعت ${AR(reviewed)} بطاقة</div>
            <button class="btn primary" id="back" style="width:100%">عودة</button>
            ${playable.length >= 4 ? `
              <button class="btn" id="play" style="width:100%;margin-top:8px"
                >⚔️ لعبةُ التمييز · ${AR(playable.length)} بطاقة</button>` : ''}
          </div>
        </div>`;

      const pb = document.getElementById('play');
      if(pb) pb.onclick = () => openMatchGame({
        subject, cards: seen,          // العنوان واللغة يُشتقّان من البطاقات
        onExit: () => openSubjectCards(subject) });

      document.getElementById('back').onclick = async () => {
        /* تنبيهُ المتبقّي يخصّ الطابور العامّ — وجلسةُ درسٍ لا شأن لها به */
        if(!opts.fetch){
          try{
            const { data } = await api.dueCounts();
            const rest = (data || []).filter(x => x.subject_id !== subject.id)
                                      .reduce((a, x) => a + x.due, 0);
            if(rest > 0) toast(`متبقٍّ اليوم: ${AR(rest)} في موادّ أخرى`);
          }catch(e){}
        }
        goBack();
      };
    }

    paint();
  }
}


/* ═══════════ ④ الإضافة — كتابةً أو اشتراكاً ═══════════ */

function openAdd(subject){
  app.innerHTML = skeleton('screen');

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
          <button class="btn primary" id="sv">إضافة</button>
        </div>
        <div id="out" style="margin-top:10px"></div>
      </div>

      ${decks.length ? `
        <div class="ed-sec">
          <div class="grp">أو من مجموعات ${esc(subject.name)}</div>
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
  if(!front) return toast('الكلمة أولاً', false);

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
  app.innerHTML = skeleton('rows');

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
        <button class="btn primary" id="sub" style="width:100%">اشتراكٌ بالمُختار</button>
      </div>`;

    document.getElementById('bk').onclick = () => openAdd(subject);
    document.getElementById('sub').onclick = async () => {
      const ids = [...app.querySelectorAll('[data-c]:checked:not(:disabled)')]
                    .map(i => +i.dataset.c);
      if(!ids.length) return toast('بطاقةٌ واحدةٌ على الأقل', false);

      const { data, error } = await api.subscribeCards(ids);
      if(error) return toast(error.message, false);
      toast(`أُضيفت ${AR(data.added)}` + (data.already ? ` · وكانت ${AR(data.already)} عندك` : ''));
      openSubjectCards(subject);
    };
    scrollTop();
  });
}


/* ═══════════ ⑥ بطاقات درسٍ بعينه ═══════════
   تُنادى من student.js حين يضغط الطالب مصدرَ البطاقات في الدرس.

   🔑 والاشتراك **ضمنيّ لا زرٌّ منفصل**: فتحُها هو أخذُها. وزرُّ «أضِف»
      كان يعامل البطاقات فعلاً يقع مرّةً، وهي **مصدرٌ ثابت** يُعاد إليه
      كالصوت والاختبار.

   🔑 والجلسة **هذه البطاقات وحدها** لا طابور المادة: فأوّل لقاءٍ يقع
      في سياق درسه — والسياق جزءٌ من الترميز. ثمّ تدخل الطابور العامّ
      فتعود متباعدةً بعد أيام.
*/
export function openLessonDeck(subject, deck, back){
  app.innerHTML = skeleton('screen');

  openSession(subject, {
    label: deck.lesson || deck.title,
    back,
    fetch: async () => {
      const { data, error } = await api.browseDeck(deck.id);
      if(error) throw error;
      const cards = data || [];

      /* ما ليس في صندوقه يُضمّ الآن — فتبدأ جدولتُه من هذه اللحظة.
         والفشل لا يمنع المراجعة: القراءة تعمل بلا اشتراك، وتُعاد
         المحاولة في الفتح التالي. */
      const fresh = cards.filter(c => !c.mine).map(c => c.id);
      if(fresh.length){
        try{ await api.subscribeCards(fresh); }catch(e){}
      }

      /* browse_deck لا تُرجع note ولا reps — والجلسة تحتاجهما.
         ⇒ تُكمَّل من deck_cards، وهي مقروءةٌ لمن يرى المجموعة. */
      let notes = new Map();
      try{
        const { data: full } = await api.deckCards(deck.id);
        (full || []).forEach(c => notes.set(c.id, c));
      }catch(e){}

      return cards.map(c => ({
        ...c,
        note:  notes.get(c.id)?.note ?? null,
        reps:  c.mine ? 1 : 0,          // ما كان عنده ليس أوّل لقاء
        entry: 'lesson',
        my_note: null
      }));
    }
  });
}
