/* ══════════════════════════════════════════════════════════
   بيان — card_game_match.js  ·  تحدّي المطابقة

   🔑 **مفصولةٌ بالآليّة لا بالمادة.** «مصطلح ← مثاله» تعمل في
      الكيمياء والنحو والإنجليزية كما تعمل في البلاغة. ولو بُنيت
      للعربية وحدها لكُتبت مرّةً لكلّ مادة — وهو داء التكرار نفسه.
      ⇒ العنوان والألقاب تُمرَّر، والشيفرة واحدة.

   وما يحسم أيّ مادةٍ تراها **البيانات لا الشيفرة**: البطاقة تدخل
   إن كان لها note (مثال). فيوم تُكتب أمثلةٌ لمصطلحات الكيمياء،
   تظهر اللعبة هناك بلا سطرٍ جديد.

   ┌──────────── ثوابتُها ────────────┐
   │ ① تمرينٌ لا مقياس: لا review_card ولا تشخيص ولا جدولة.        │
   │    المطابقة **تعرّفٌ لا استرجاع** — الجواب بين عشرة.           │
   │ ② ⛔ **لا عدّ تنازليّ.** الدرع يعاقب التخمين، والعدّاد يعاقب    │
   │    التفكير. وبيتٌ مثل «مَنْ يَهُنْ يَسْهُلِ الهَوانُ» يحتاج     │
   │    خمس عشرة ثانية ليُحلَّل — وتسعُ ثوانٍ تُجبر على مطابقةٍ      │
   │    سطحية بعلامات ظاهرة، وهو كود SU بعينه.                     │
   │    ⇒ الزمن يُعرض تصاعدياً بلا عقوبة، وهو فاصلُ تعادلٍ فقط.     │
   │ ③ الدقّة أولاً ثمّ السرعة — كما ترتّب اللوحة في 104.           │
   │ ④ لا Tone.js: نغماتٌ من Web Audio في ٢٠ سطراً. والمنصّة        │
   │    تُوطّن MathJax ولا تعتمد CDN — فلا تُستقدم مكتبةٌ لصفّارة.   │
   └────────────────────────────────────────────────────────────────┘
   ══════════════════════════════════════════════════════════ */
import * as api from './api.js';
import { app, esc, AR, toast, scrollTop } from './ui.js';

const SHIELDS   = 3;
const PER_ROUND = 5;   // أزواجٌ في الجولة

const TITLES = [
  { t: 'أمير البيان',  i: '👑' },   // بلا خدش · ودون وسيط الجولة
  { t: 'فارس الكلمة',  i: '🛡️' },   // بلا خدش
  { t: 'بليغ العصر',   i: '⚔️' },   // خدش أو خدشان
  { t: 'فارس متدرّب',  i: '🏹' }    // ما دون — ولا أحد خارج الفرسان
];


/* ═══════════ الصوت — بلا مكتبة ولا ملفّات ═══════════ */

let AC = null, muted = (() => {
  try { return localStorage.getItem('mg-mute') === '1'; } catch(e){ return false; }
})();

function beep(freq, ms = 90, type = 'sine', gain = 0.06){
  if(muted) return;
  try{
    AC = AC || new (window.AudioContext || window.webkitAudioContext)();
    const o = AC.createOscillator(), g = AC.createGain();
    o.type = type; o.frequency.value = freq;
    g.gain.setValueAtTime(gain, AC.currentTime);
    g.gain.exponentialRampToValueAtTime(0.0001, AC.currentTime + ms/1000);
    o.connect(g); g.connect(AC.destination);
    o.start(); o.stop(AC.currentTime + ms/1000);
  }catch(e){}   // متصفّحٌ يمنع الصوت قبل تفاعل — لا يُسقط اللعبة
}
const sfx = {
  pick : () => beep(520, 60),
  hit  : n => beep(560 + Math.min(n,5)*80, 120, 'triangle'),
  miss : () => { beep(180, 160, 'sawtooth', 0.05); },
  over : () => { beep(240, 200, 'sawtooth', 0.05); setTimeout(()=>beep(160,300,'sawtooth',0.05),160); },
  win  : () => [0,120,240,400].forEach((d,i) => setTimeout(() => beep([523,659,784,1047][i], 220, 'triangle'), d))
};


/* ═══════════ تجهيز البنود ═══════════ */

/* 🔑 يُحذف المصطلح من مثاله إن ورد فيه — وإلّا صار المثال يكشف
   الجواب لمن يلمح الكلمة. والتطبيع يوازي card_key في القاعدة
   (تشكيلٌ وصور ألف)، ولا يُغني أحدهما عن الآخر: ذاك للمطابقة
   في التخزين، وهذا للعرض. */
const norm = s => String(s || '')
  .replace(/[\u064B-\u0652\u0670\u0640]/g, '')
  .replace(/[أإآٱ]/g, 'ا').replace(/ى/g, 'ي')
  .toLowerCase();

function blankTerm(example, term){
  const words = norm(term).split(/\s+/).filter(w => w.length > 2);
  if(!words.length) return esc(example);

  return esc(example).split(/(\s+)/).map(tok => {
    const n = norm(tok).replace(/^[«»"'(),.:؛،]+|[«»"'(),.:؛،]+$/g, '');
    return words.some(w => n === w || (n.length > 3 && n.includes(w)))
      ? '<span class="mg-blank">______</span>' : tok;
  }).join('');
}

/* البطاقة تدخل إن كان لها مثال، ولم يكن وجهُها جملةً بفراغٍ أصلاً */
export function eligible(cards){
  return (cards || []).filter(c =>
    c.note && String(c.note).trim() && !/\{\{\s*\}\}/.test(c.front || ''));
}


/* ═══════════ اللعبة ═══════════ */

export function openMatchGame({ subject, cards, title, onExit }){
  const pool = eligible(cards);
  if(pool.length < 4){ toast('تحتاج ٤ بطاقاتٍ لها أمثلة', false); onExit?.(); return; }

  const rounds = [];
  for(let i = 0; i < pool.length; i += PER_ROUND){
    const chunk = pool.slice(i, i + PER_ROUND);
    if(chunk.length >= 2) rounds.push(chunk);
  }

  const G = { r: 0, shields: SHIELDS, combo: 0, best: 0,
              mistakes: 0, matched: 0, sel: [], lock: false,
              t0: Date.now(), pairs: pool.length,
              confused: [] };   // ما التبس عليه — أنفعُ ما تُنتجه اللعبة

  shell();
  startRound();

  /* ── الهيكل يُبنى مرّةً، والشبكة وحدها تُعاد ── */
  function shell(){
    app.innerHTML = `
      <div class="mg-wrap">
        <div class="mg-head">
          <div class="mg-title">${esc(title || 'تحدّي المطابقة')}</div>
          <button class="mg-mute" id="mgMute" aria-label="كتم الصوت"
            >${muted ? '🔇' : '🔊'}</button>
        </div>

        <div class="mg-bar">
          <div class="mg-shields" id="mgSh"></div>
          <div class="mg-combo" id="mgCb"></div>
          <div class="mg-time" id="mgTm">٠:٠٠</div>
        </div>

        <div class="mg-grid" id="mgGrid"></div>
      </div>`;

    document.getElementById('mgMute').onclick = e => {
      muted = !muted;
      try{ localStorage.setItem('mg-mute', muted ? '1' : '0'); }catch(err){}
      e.currentTarget.textContent = muted ? '🔇' : '🔊';
    };

    /* زمنٌ تصاعديّ يُعرض ولا يعاقب — ولا شيء يقع عند بلوغه رقماً */
    G.tick = setInterval(() => {
      const s = Math.floor((Date.now() - G.t0) / 1000);
      document.getElementById('mgTm').textContent =
        AR(Math.floor(s/60)) + ':' + AR(String(s % 60).padStart(2,'0'));
    }, 500);
  }

  function paintBar(){
    document.getElementById('mgSh').innerHTML =
      Array.from({length: SHIELDS}, (_, i) =>
        `<span class="mg-shield${i < G.shields ? '' : ' broken'}">🛡️</span>`).join('');
    const cb = document.getElementById('mgCb');
    cb.textContent = G.combo > 1 ? `🔥 ×${AR(G.combo)}` : '';
    cb.className = 'mg-combo' + (G.combo >= 3 ? ' hot' : '');
  }

  function startRound(){
    const set = rounds[G.r];
    G.sel = []; G.matched = 0; G.lock = false;

    const deck = [];
    set.forEach(c => {
      deck.push({ id: c.id, kind: 'term', html: esc(c.front), card: c });
      deck.push({ id: c.id, kind: 'ex',   html: blankTerm(c.note, c.front), card: c });
    });
    shuffle(deck);

    document.getElementById('mgGrid').innerHTML = deck.map((d, i) =>
      `<button class="mg-card ${d.kind}" data-i="${i}">${d.html}</button>`).join('');

    document.getElementById('mgGrid').querySelectorAll('[data-i]').forEach(el =>
      el.onclick = () => pick(deck[+el.dataset.i], el));

    paintBar(); scrollTop();
  }

  function pick(d, el){
    if(G.lock || el.classList.contains('done') || el.classList.contains('on')) return;
    sfx.pick();
    el.classList.add('on');
    G.sel.push({ d, el });
    if(G.sel.length === 2){ G.lock = true; judge(); }
  }

  function judge(){
    const [a, b] = G.sel;
    const ok = a.d.id === b.d.id && a.d.kind !== b.d.kind;

    if(ok){
      G.combo++; G.best = Math.max(G.best, G.combo);
      sfx.hit(G.combo);
      setTimeout(() => {
        [a, b].forEach(x => { x.el.classList.remove('on'); x.el.classList.add('done'); });
        G.matched++; G.sel = []; G.lock = false; paintBar();
        if(G.matched === rounds[G.r].length) nextRound();
      }, 320);
      return;
    }

    /* الخطأ يكسر السلسلة ويكسر درعاً — والتخمين يقتل الجولة في ثلاث */
    G.mistakes++; G.combo = 0; G.shields--;
    sfx.miss();
    /* أنفعُ ما تُنتجه اللعبة: أيُّ مفهومين يختلطان عنده.
       والبطاقة لا تكشف هذا أبداً — تقيس الاستحضار لا التمييز. */
    if(a.d.kind !== b.d.kind)
      G.confused.push([a.d.card.front, b.d.card.front].sort().join(' ↔ '));

    setTimeout(() => {
      [a, b].forEach(x => { x.el.classList.remove('on'); x.el.classList.add('bad'); });
      setTimeout(() => {
        [a, b].forEach(x => x.el.classList.remove('bad'));
        G.sel = []; G.lock = false; paintBar();
        if(G.shields <= 0){ sfx.over(); finish(false); }
      }, 420);
    }, 380);
  }

  function nextRound(){
    if(G.r + 1 < rounds.length){ G.r++; setTimeout(startRound, 500); }
    else { sfx.win(); setTimeout(() => finish(true), 500); }
  }

  async function finish(won){
    clearInterval(G.tick);
    const secs = Math.max(1, Math.round((Date.now() - G.t0) / 1000));

    /* 🔒 لا تُحفَظ جولةٌ لم تكتمل: نتيجةٌ نصفُها غير ملعوب لا تُقارَن */
    let board = null;
    if(won){
      await api.saveGameScore(subject.id, G.pairs, G.mistakes, secs).catch(()=>{});
      const { data } = await api.gameBoard(subject.id, G.pairs).catch(()=>({data:null}));
      board = data;
    }

    const med = board?.median ?? null;
    const rank = !won ? TITLES[3]
      : G.mistakes === 0 && (med === null || secs < med) ? TITLES[0]
      : G.mistakes === 0 ? TITLES[1]
      : G.mistakes <= 2  ? TITLES[2] : TITLES[3];

    const next = G.mistakes === 0 && med !== null && secs >= med
      ? 'أسرعُ قليلاً وتبلغ الإمارة'
      : G.mistakes > 0 ? 'بلا خدشٍ وتبلغ الفروسية' : '';

    const pairsTxt = G.confused.length
      ? [...new Set(G.confused)].slice(0, 3)
      : [];

    app.innerHTML = `
      <div class="mg-wrap">
        <div class="mg-end${won ? ' win' : ''}">
          <div class="mg-rank">${rank.i}</div>
          <div class="mg-rank-t">${esc(rank.t)}</div>
          ${won ? `<div class="mg-line">${scratch(G.mistakes)} · ${AR(secs)} ث</div>`
                : `<div class="mg-line">انكسرت الدروع الثلاثة</div>`}
          ${next ? `<div class="mg-next">${esc(next)}</div>` : ''}
          ${G.best > 2 ? `<div class="mg-next">🔥 أطول سلسلة: ${AR(G.best)}</div>` : ''}
        </div>

        ${pairsTxt.length ? `
          <div class="mg-sec">
            <div class="mg-sec-t">التبس عليك</div>
            ${pairsTxt.map(p => `<div class="mg-conf">${esc(p)}</div>`).join('')}
          </div>` : ''}

        ${board ? boardHtml(board) : ''}

        <div class="nav" style="margin-top:16px">
          <button class="btn primary" id="again" style="width:100%">مرّةً أخرى</button>
          <button class="btn" id="out" style="width:100%">عودة</button>
        </div>
      </div>`;

    document.getElementById('again').onclick = () =>
      openMatchGame({ subject, cards, title, onExit });
    document.getElementById('out').onclick = () => onExit?.();
    scrollTop();
  }

  function boardHtml(b){
    const top = b.top || [];
    const meIn = top.some(r => r.me);
    const row = r => `
      <div class="mg-row${r.me ? ' me' : ''}">
        <span class="mg-rk">${r.rank <= 3 ? ['🥇','🥈','🥉'][r.rank-1] : AR(r.rank)}</span>
        <span class="mg-nm">${esc(r.name || '—')}</span>
        <span class="mg-sc">${scratch(r.mistakes)} · ${AR(r.seconds)} ث</span>
      </div>`;

    return `
      <div class="mg-sec">
        <div class="mg-sec-t">لوحة الأسبوع · ${AR(b.players || 0)} لاعب</div>
        ${top.length ? top.map(row).join('') : '<div class="mg-conf">كن أوّل من يسجّل</div>'}
        ${!meIn && b.me ? `<div class="mg-gap">⋯</div>${row(b.me)}` : ''}
      </div>`;
  }
}


/* ═══════════ أدوات ═══════════ */

/* لغةٌ واحدة للوحة: «بلا خدش» تمتدّ إلى ما بعدها، بخلاف «بلا خطأ»
   التي تترك المتصدّر في عالمٍ والباقي في آخر */
function scratch(n){
  return n === 0 ? 'بلا خدش'
       : n === 1 ? 'خدشٌ واحد'
       : n === 2 ? 'خدشان'
       : `${AR(n)} خدوش`;
}

function shuffle(a){
  for(let i = a.length - 1; i > 0; i--){
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}
