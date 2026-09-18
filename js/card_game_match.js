/* ══════════════════════════════════════════════════════════
   بيان — card_game_match.js  ·  تحدّي المطابقة

   🔑 **مفصولةٌ بالآليّة لا بالمادة.** «مصطلح ← مثاله» تعمل في
      الكيمياء والنحو والإنجليزية كما تعمل في البلاغة.

   🌐 **ولغةُ الواجهة تتبع البطاقات لا اسم المادة.** بطاقاتٌ
      إنجليزية ⇒ اللعبة إنجليزيةٌ كلُّها: العنوان والألقاب والأرقام
      واتجاه الصفحة. ⇒ **انغماسٌ كامل** — والطالب لا يخرج من اللغة
      التي يتعلّمها ليقرأ زرّاً.
      والقرار من `lang` في البطاقة، فإن غابت فمن أوّل حرفٍ قويّ
      (dirOf). ⇒ مقرَّرٌ إنجليزيّ يُدرَّس في مدرسةٍ عربية تراه
      إنجليزياً بلا إعدادٍ يُضبط — البيانات تقرّر لا الشيفرة.

   ┌──────── التصميم: نوعان لا شبكةٌ موحَّدة ────────┐
   │ المصطلح كلمتان، والمثال جملةٌ كاملة. وحشرُهما في مربّعاتٍ    │
   │ متساوية يُنتج مثالاً لا يُقرأ ومصطلحاً يسبح في فراغ.         │
   │ ⇒ **المصطلح خَتمٌ** مضغوط في صفّ، **والمثال سطرٌ** عريض     │
   │   يُقرأ. والبنية تقول القاعدة بلا تعليمات.                   │
   │ ولحظةُ المطابقة هي الجرأة الوحيدة: الختم يُغرَس في الفراغ    │
   │ فتكتمل الجملة — **يُرى الاقتران**، لا يختفي الطرفان.         │
   └─────────────────────────────────────────────────────────────┘

   ثوابتُها:
   ① تمرينٌ لا مقياس: لا review_card ولا تشخيص ولا جدولة.
   ② ⛔ لا عدّ تنازليّ — الدرع يعاقب التخمين، والعدّاد يعاقب التفكير.
   ③ الدقّة أولاً ثمّ السرعة، كما ترتّب اللوحة في 104.
   ④ لا مكتبة صوت: نغماتٌ من Web Audio.
   ══════════════════════════════════════════════════════════ */
import * as api from './api.js';
import { app, esc, AR, toast, scrollTop, dirOf, examples, pickExample } from './ui.js';

const SHIELDS   = 3;
const PER_ROUND = 5;


/* ═══════════ اللغتان ═══════════ */

/* سلّمٌ واحد بأربع مراتب — والأسماء تنتمي إلى عالمِ لغتها لا تُترجَم
   حرفياً: «أمير البيان» صورةٌ عربية، و«Word Master» صورةٌ إنجليزية. */
const L = {
  ar: {
    dir: 'rtl',
    title:  s => 'فرسان ' + s,
    sound:  'الصوت',
    need:   'تحتاج أربع بطاقاتٍ لها أمثلة',
    broke:  'انكسرت الدروع الثلاثة',
    confused: 'التبس عليك',
    board:  n => `لوحة الأسبوع · ${AR(n)} لاعب`,
    first:  'كن أوّل من يسجّل',
    streak: n => `أطول سلسلة ${AR(n)}`,
    again:  'مرّةً أخرى',
    out:    'عودة',
    failed: m => `تعذّر حفظ النتيجة: ${m}`,
    sec:    n => `${AR(n)} ث`,
    num:    AR,
    toPrince: 'أسرعُ قليلاً وتبلغ الإمارة',
    toKnight: 'بلا خدشٍ وتبلغ الفروسية',
    scratch: n => n === 0 ? 'بلا خدش' : n === 1 ? 'خدشٌ واحد'
                : n === 2 ? 'خدشان'   : `${AR(n)} خدوش`,
    ranks: [
      { t: 'أمير البيان', i: '👑' },
      { t: 'فارس الكلمة', i: '🛡️' },
      { t: 'بليغ العصر',  i: '⚔️' },
      { t: 'فارس متدرّب', i: '🏹' }
    ]
  },
  en: {
    dir: 'ltr',
    title:  s => s + ' Duel',
    sound:  'Sound',
    need:   'You need four cards with examples',
    broke:  'All three shields broken',
    confused: 'You mixed these up',
    board:  n => `This week · ${n} players`,
    first:  'Be the first on the board',
    streak: n => `Longest streak ${n}`,
    again:  'Play again',
    out:    'Back',
    failed: m => `Could not save your score: ${m}`,
    sec:    n => `${n}s`,
    num:    n => String(n),
    toPrince: 'A little faster and the crown is yours',
    toKnight: 'Finish unscratched to earn your shield',
    scratch: n => n === 0 ? 'Unscratched' : n === 1 ? '1 scratch' : `${n} scratches`,
    ranks: [
      { t: 'Word Master',  i: '👑' },
      { t: 'Wordsmith',    i: '🛡️' },
      { t: 'Rising Reader',i: '⚔️' },
      { t: 'Apprentice',   i: '🏹' }
    ]
  }
};

/* اللغةُ من البطاقات: عمود lang أولاً، فإن غاب فأوّل حرفٍ قويّ.
   والأغلبيةُ تحسم — فبطاقةٌ عربيةٌ شاردة في مجموعةٍ إنجليزية لا تقلبها. */
function localeOf(cards){
  const en = cards.filter(c =>
    (c.lang && c.lang !== 'ar') || dirOf(c.front) === 'ltr').length;
  return en > cards.length / 2 ? 'en' : 'ar';
}


/* ═══════════ الصوت — بلا مكتبة ولا ملفّات ═══════════ */

let AC = null;
let muted = (() => { try { return localStorage.getItem('mg-mute') === '1'; } catch(e){ return false; } })();

function beep(freq, ms = 90, type = 'sine', gain = 0.06){
  if(muted) return;
  try{
    AC = AC || new (window.AudioContext || window.webkitAudioContext)();
    if(AC.state === 'suspended') AC.resume();
    const o = AC.createOscillator(), g = AC.createGain();
    o.type = type; o.frequency.value = freq;
    g.gain.setValueAtTime(gain, AC.currentTime);
    g.gain.exponentialRampToValueAtTime(0.0001, AC.currentTime + ms/1000);
    o.connect(g); g.connect(AC.destination);
    o.start(); o.stop(AC.currentTime + ms/1000);
  }catch(e){}
}
const sfx = {
  pick: () => beep(520, 55),
  seal: n => { beep(523 + Math.min(n,5)*70, 90, 'triangle');
               setTimeout(() => beep(784 + Math.min(n,5)*70, 130, 'triangle'), 70); },
  miss: () => beep(170, 180, 'sawtooth', 0.05),
  over: () => { beep(230, 220, 'sawtooth', .05); setTimeout(()=>beep(150,340,'sawtooth',.05),180); },
  win : () => [0,110,220,380].forEach((d,i) =>
              setTimeout(() => beep([523,659,784,1047][i], 230, 'triangle'), d))
};


/* ═══════════ تجهيز البنود ═══════════ */

/* يوازي card_key في القاعدة (تشكيلٌ وصور ألف) — ذاك للتخزين وهذا للعرض.
   وtoLowerCase تخدم الإنجليزية: "Civilization" في المثال تُطابق "civilization". */
const norm = s => String(s || '')
  .replace(/[\u064B-\u0652\u0670\u0640]/g, '')
  .replace(/[أإآٱ]/g, 'ا').replace(/ى/g, 'ي')
  .toLowerCase();

const STRIP = /^[«»"'(),.:؛،؟!?\u2018\u2019\u201C\u201D]+|[«»"'(),.:؛،؟!?\u2018\u2019\u201C\u201D]+$/g;

/* يُحذف المصطلح من مثاله إن ورد فيه — وإلّا كشف المثال جوابَه.
   ويُترك موضعُه فراغاً يُغرَس فيه الختم عند المطابقة. */
function slotted(example, term){
  const keys = norm(term).split(/\s+/).filter(w => w.length > 2);
  let hit = false;

  const html = String(example).split(/(\s+)/).map(tok => {
    if(/^\s+$/.test(tok)) return tok;
    const n = norm(tok).replace(STRIP, '');
    const match = keys.some(w => n === w || (n.length > 3 && n.includes(w)));
    if(match && !hit){ hit = true; return '<i class="mg-slot"></i>'; }
    if(match) return '';
    return esc(tok);
  }).join('');

  return hit ? html : esc(example) + ' <i class="mg-slot"></i>';
}

export function eligible(cards){
  return (cards || []).filter(c =>
    examples(c.note).length > 0 && !/\{\{\s*\}\}/.test(c.front || ''));
}


/* ═══════════ اللعبة ═══════════ */

export function openMatchGame({ subject, cards, title, onExit }){
  const pool = eligible(cards);
  const t = L[localeOf(pool.length ? pool : (cards || []))];

  if(pool.length < 4){ toast(t.need, false); onExit?.(); return; }

  const rounds = [];
  for(let i = 0; i < pool.length; i += PER_ROUND){
    const chunk = pool.slice(i, i + PER_ROUND);
    if(chunk.length >= 2) rounds.push(chunk);
  }
  const played = rounds.reduce((a, r) => a + r.length, 0);   // لا pool.length: بعضُه يسقط

  const G = { r: 0, shields: SHIELDS, combo: 0, best: 0, mistakes: 0,
              matched: 0, term: null, row: null, lock: false,
              t0: Date.now(), pairs: played, confused: [], tick: null };

  const el = id => document.getElementById(id);

  shell();
  startRound();

  function shell(){
    app.innerHTML = `
      <div class="mg-wrap" dir="${t.dir}">
        <header class="mg-head">
          <h2 class="mg-title">${esc(title || t.title(subject.name || ''))}</h2>
          <button class="mg-mute" id="mgMute" aria-label="${t.sound}"
            >${muted ? '🔇' : '🔊'}</button>
        </header>

        <div class="mg-hud">
          <div class="mg-shields" id="mgSh"></div>
          <div class="mg-combo" id="mgCb"></div>
          <div class="mg-time" id="mgTm">${t.num(0)}:${t.num('00')}</div>
        </div>

        <div class="mg-terms" id="mgTerms"></div>
        <div class="mg-rows"  id="mgRows"></div>
      </div>`;

    el('mgMute').onclick = e => {
      muted = !muted;
      try{ localStorage.setItem('mg-mute', muted ? '1' : '0'); }catch(err){}
      e.currentTarget.textContent = muted ? '🔇' : '🔊';
    };

    /* زمنٌ تصاعديّ يُعرض ولا يعاقب — ولا شيء يقع عند بلوغه رقماً */
    G.tick = setInterval(() => {
      const tm = el('mgTm'); if(!tm) return;
      const s = Math.floor((Date.now() - G.t0) / 1000);
      tm.textContent = t.num(Math.floor(s/60)) + ':' + t.num(String(s % 60).padStart(2,'0'));
    }, 500);
  }

  function paintHud(){
    const sh = el('mgSh'); if(!sh) return;
    sh.innerHTML = Array.from({length: SHIELDS}, (_, i) =>
      `<span class="mg-sh${i < G.shields ? '' : ' out'}"></span>`).join('');
    const cb = el('mgCb');
    cb.textContent = G.combo > 1 ? `×${t.num(G.combo)}` : '';
    cb.className = 'mg-combo' + (G.combo >= 3 ? ' hot' : '');
  }

  function startRound(){
    const set = rounds[G.r];
    G.term = null; G.row = null; G.matched = 0; G.lock = false;

    el('mgTerms').innerHTML = shuffle(set.slice()).map(c =>
      `<button class="mg-term" data-t="${c.id}" dir="${dirOf(c.front)}"
        >${esc(c.front)}</button>`).join('');

    el('mgRows').innerHTML = shuffle(set.slice()).map(c => {
      const ex = pickExample(c.note);     // مثالٌ آخر في كلّ جولة
      return `<button class="mg-row" data-e="${c.id}" dir="${dirOf(ex)}"
        ><span class="mg-ex">${slotted(ex, c.front)}</span></button>`;
    }).join('');

    el('mgTerms').querySelectorAll('[data-t]').forEach(b => b.onclick = () => pickTerm(b));
    el('mgRows').querySelectorAll('[data-e]').forEach(b => b.onclick  = () => pickRow(b));

    paintHud(); scrollTop();
  }

  /* 🔑 لا خطأ إجرائيّ: اختيارُ ختمٍ ثانٍ يُبدّل ولا يُحتسب. فكلُّ خدشٍ
     خطأٌ في المعنى — وهو وحده ما يستحقّ أن يُسجَّل في «التبس عليك». */
  function pickTerm(b){
    if(G.lock || b.classList.contains('used')) return;
    sfx.pick();
    el('mgTerms').querySelectorAll('.on').forEach(x => x.classList.remove('on'));
    b.classList.add('on'); G.term = b;
    if(G.row) judge();
  }

  function pickRow(b){
    if(G.lock || b.classList.contains('sealed')) return;
    sfx.pick();
    el('mgRows').querySelectorAll('.on').forEach(x => x.classList.remove('on'));
    b.classList.add('on'); G.row = b;
    if(G.term) judge();
  }

  function judge(){
    G.lock = true;
    const tb = G.term, rb = G.row;

    if(tb.dataset.t === rb.dataset.e){
      G.combo++; G.best = Math.max(G.best, G.combo);
      sfx.seal(G.combo);

      /* الختم يُغرَس في الفراغ — فتكتمل الجملة ويُرى الاقتران */
      const slot = rb.querySelector('.mg-slot');
      if(slot){ slot.textContent = tb.textContent; slot.className = 'mg-slot filled'; }
      tb.classList.remove('on'); tb.classList.add('used');
      rb.classList.remove('on'); rb.classList.add('sealed');

      G.matched++; G.term = null; G.row = null; G.lock = false;
      paintHud();
      if(G.matched === rounds[G.r].length) nextRound();
      return;
    }

    G.mistakes++; G.combo = 0; G.shields--;
    sfx.miss();
    /* أنفعُ ما تُنتجه اللعبة: أيُّ مفهومين يختلطان عنده — والبطاقة
       لا تكشف هذا أبداً، فهي تقيس الاستحضار لا التمييز. */
    const right = rounds[G.r].find(c => String(c.id) === rb.dataset.e);
    if(right) G.confused.push([tb.textContent, right.front].sort().join(' ↔ '));

    tb.classList.add('bad'); rb.classList.add('bad');
    setTimeout(() => {
      [tb, rb].forEach(x => x.classList.remove('bad', 'on'));
      G.term = null; G.row = null; G.lock = false;
      paintHud();
      if(G.shields <= 0){ sfx.over(); finish(false); }
    }, 480);
  }

  function nextRound(){
    if(G.r + 1 < rounds.length){ G.r++; setTimeout(startRound, 620); }
    else { sfx.win(); setTimeout(() => finish(true), 620); }
  }

  async function finish(won){
    clearInterval(G.tick);
    const secs = Math.max(1, Math.round((Date.now() - G.t0) / 1000));

    /* 🔴 لا .catch() على نداء Supabase: PostgrestBuilder كائنٌ قابلٌ
       للانتظار (then) وليس Promise كاملاً — فـ.catch غير معرَّفة،
       وتُرمى TypeError فيُرفَض الوعد بلا مُلتقِط. وذاك كان التجمّد:
       كلُّ البطاقات مطابَقة ولا شيء يحدث. ⇒ try/catch. */
    let board = null, saveErr = null;
    if(won){
      try{
        const s = await api.saveGameScore(subject.id, G.pairs, G.mistakes, secs);
        if(s?.error) saveErr = s.error.message;
        const res = await api.gameBoard(subject.id, G.pairs);
        if(res?.error) saveErr = saveErr || res.error.message;
        board = res?.data ?? null;
      }catch(e){ saveErr = e?.message || String(e); }
    }

    const med  = board?.median ?? null;
    const rank = !won ? t.ranks[3]
      : G.mistakes === 0 && (med === null || secs < med) ? t.ranks[0]
      : G.mistakes === 0 ? t.ranks[1]
      : G.mistakes <= 2  ? t.ranks[2] : t.ranks[3];

    const next = !won ? ''
      : G.mistakes === 0 && med !== null && secs >= med ? t.toPrince
      : G.mistakes > 0 ? t.toKnight : '';

    const conf = [...new Set(G.confused)].slice(0, 3);

    app.innerHTML = `
      <div class="mg-wrap" dir="${t.dir}">
        <div class="mg-end${won ? ' win' : ''}">
          <div class="mg-rank">${rank.i}</div>
          <div class="mg-rank-t">${esc(rank.t)}</div>
          <div class="mg-line">${won
            ? `${t.scratch(G.mistakes)} · ${t.sec(t.num(secs))}`
            : esc(t.broke)}</div>
          ${next ? `<div class="mg-next">${esc(next)}</div>` : ''}
          ${G.best > 2 ? `<div class="mg-next">${esc(t.streak(G.best))}</div>` : ''}
        </div>

        ${conf.length ? `
          <section class="mg-sec">
            <h3 class="mg-sec-t">${esc(t.confused)}</h3>
            ${conf.map(p => `<div class="mg-conf">${esc(p)}</div>`).join('')}
          </section>` : ''}

        ${board ? boardHtml(board) : ''}
        ${saveErr ? `<section class="mg-sec"><div class="mg-conf"
           >${esc(t.failed(saveErr))}</div></section>` : ''}

        <div class="mg-acts">
          <button class="btn primary" id="again">${esc(t.again)}</button>
          <button class="btn" id="out">${esc(t.out)}</button>
        </div>
      </div>`;

    el('again').onclick = () => openMatchGame({ subject, cards, title, onExit });
    el('out').onclick   = () => onExit?.();
    scrollTop();
  }

  function boardHtml(b){
    const top = b.top || [];
    const meIn = top.some(r => r.me);
    const row = r => `
      <div class="mg-lb${r.me ? ' me' : ''}">
        <span class="mg-rk">${r.rank <= 3 ? ['🥇','🥈','🥉'][r.rank-1] : t.num(r.rank)}</span>
        <span class="mg-nm">${esc(r.name || '—')}</span>
        <span class="mg-sc">${t.scratch(r.mistakes)} · ${t.sec(t.num(r.seconds))}</span>
      </div>`;

    return `
      <section class="mg-sec">
        <h3 class="mg-sec-t">${esc(t.board(b.players || 0))}</h3>
        ${top.length ? top.map(row).join('') : `<div class="mg-conf">${esc(t.first)}</div>`}
        ${!meIn && b.me ? `<div class="mg-gap">⋯</div>${row(b.me)}` : ''}
      </section>`;
  }
}


/* ═══════════ أدوات ═══════════ */

function shuffle(a){
  for(let i = a.length - 1; i > 0; i--){
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}
