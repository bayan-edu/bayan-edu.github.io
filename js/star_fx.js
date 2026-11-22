/* ══════════════════════════════════════════════════════════
   بيان — star_fx.js · لحظةُ النجوم (المرحلة ② من `spec-reading-motivation.md` §٧ · b257)

   🎬 **إعادةُ رسمٍ لفيديو المالك «STAR AWARDING» بالشيفرة — لا تضمينُه** (ق٦):
      الولادةُ في الوسط بارتدادٍ وشرر ⇐ وقفةٌ تعبرها لمعة ⇐ طيرانٌ في منحنًى وخلفه شريطٌ ذهبيّ ⇐ ومضةٌ وحلقةٌ عند الوصول.
      **وسقط من الفيديو أوّلُه الفارغ وآخرُه (دورانُ النجمة واختفاؤها):** النجمةُ هنا تسكن خانتها ولا تزول.
      فعشرُ ثوانٍ صارت نحو ثانيتين ونصف — لحظةٌ تُرى بعد كلّ كتاب، والطويلةُ تُملّ في الثالثة.

   🔑 **الذهبُ استثناءٌ من الهويّة البصريّة** — نصُّ المالك (٢٢ نوفمبر): «احتفظ بنفس ألوان النجمة في الفيديو بغضّ النظر عن
      الهوية البصرية فهي استثناء». فلا يُشتقّ من `:root` ولا يمرّ بعائلات المعنى الخمس، **ولا يُستعار لغير النجمة.**
      والطبقاتُ الخمس مقيسةٌ من إطار ٢٫٠ ث بحجمه الكامل (١٣٬٧٣١ بكسلاً من جسمها، مرتّبةً بالإضاءة).

   🔊 **صوتان، كلٌّ لمرحلته** (قِيسا من أصلهما `sfx/*.wav`):
      `star_award_sfx` — ضربةٌ عند ٠٫٠٥ ث ثمّ بريقٌ يخفت ⇐ مع الولادة.
      `star_swoosh_sfx` — اندفاعٌ ذروتُه عند ١٫١٠ ث ⇐ يبدأ قبل الإقلاع بحيث **تقع ذروتُه لحظةَ الوصول**.
      ولنجومٍ عدّة: ضربةٌ واحدة واندفاعٌ واحد (ذروتُه عند وصول أوسطها) — لا ضرباتٌ تتزاحم.
      ويُحمَّلان عند الحاجة لا مع المنصّة، ويُشغَّلان بـ Web Audio لدقّة التوقيت. والكتمُ اختيارُ المتصفّح (`bayan.stars.mute`).

   ♿ «تقليلُ الحركة» ⇒ لا مسرحَ ولا طيران: الخاناتُ تمتلئ واحدةً بعد أخرى، والصوتُ ضربةٌ واحدة.
   ══════════════════════════════════════════════════════════ */

import { AR, N } from './ui.js';

const CSS_HREF = new URL('../css/star_fx.css', import.meta.url).href;
/* مطلقان من جذر الموقع (b167) — فيراهما فحصُ البناء ② ويصيح إن غاب ملفٌّ في dist/ */
const SND_URL = {
  award:  '/sfx/star_award_sfx.mp3',
  swoosh: '/sfx/star_swoosh_sfx.mp3',
};
const SWOOSH_PEAK = 1.10;     // ث — ذروةُ الاندفاع في ملفّه (مقيسة)

/* الذهب — استثناءٌ مكتوبٌ سببُه في رأس الملفّ */
export const GOLD = { shadow: '#6b451c', deep: '#916833', mid: '#bb924e', light: '#deb867', hi: '#f6df98' };

/* الأزمنة (مللي ثانية) — من الفيديو مضغوطةً */
const T = { birth: 350, hold: 600, glintAt: 120, glint: 380, fly: 800, stagger: 160, ring: 460, tail: 650 };

/* ── النمط ── */
let cssReady = null;
export function loadCss(){
  if(cssReady) return cssReady;
  if(document.querySelector('[data-sfx-css]')) return (cssReady = Promise.resolve());
  cssReady = new Promise(done => {
    const l = document.createElement('link');
    l.rel = 'stylesheet'; l.href = CSS_HREF; l.dataset.sfxCss = '1';
    l.onload = done; l.onerror = done;          // فشلُ النمط لا يحجب النتيجة
    document.head.append(l);
  });
  return cssReady;
}

/* ── النجمة ── خمسةُ رؤوسٍ مستديرة (حدٌّ دائريّ الوصل بلون الجسم نفسِه) ووجهٌ داخليٌّ أفتح يوحي بالشطف، ولمعةٌ أعلاها */
const STAR = (() => {
  const cx = 50, cy = 53, R = 42, r = 19, p = [];
  for(let k = 0; k < 10; k++){
    const a = (-90 + k * 36) * Math.PI / 180, d = k % 2 ? r : R;
    p.push(`${(cx + d * Math.cos(a)).toFixed(2)} ${(cy + d * Math.sin(a)).toFixed(2)}`);
  }
  return 'M' + p.join('L') + 'Z';
})();
let uid = 0;
export function starSVG(cls = ''){
  const id = 'sfx' + (++uid);
  return `<svg class="sfx-star ${cls}" viewBox="0 0 100 100" aria-hidden="true" focusable="false">
    <defs>
      <linearGradient id="${id}b" x1="0.2" y1="0" x2="0.8" y2="1">
        <stop offset="0" stop-color="${GOLD.light}"/><stop offset=".55" stop-color="${GOLD.mid}"/><stop offset="1" stop-color="${GOLD.deep}"/>
      </linearGradient>
      <radialGradient id="${id}f" cx=".42" cy=".34" r=".7">
        <stop offset="0" stop-color="${GOLD.hi}"/><stop offset=".55" stop-color="${GOLD.light}"/><stop offset="1" stop-color="${GOLD.mid}"/>
      </radialGradient>
      <linearGradient id="${id}g" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0" stop-color="#fff" stop-opacity="0"/><stop offset=".5" stop-color="#fff8e0" stop-opacity=".85"/><stop offset="1" stop-color="#fff" stop-opacity="0"/>
      </linearGradient>
      <clipPath id="${id}c"><path d="${STAR}"/></clipPath>
    </defs>
    <path d="${STAR}" fill="${GOLD.shadow}" stroke="${GOLD.shadow}" stroke-width="12" stroke-linejoin="round" transform="translate(0 1.6)"/>
    <path d="${STAR}" fill="url(#${id}b)" stroke="url(#${id}b)" stroke-width="9" stroke-linejoin="round"/>
    <path d="${STAR}" fill="url(#${id}f)" transform="translate(50 53) scale(.62) translate(-50 -53)"/>
    <ellipse cx="40" cy="34" rx="11" ry="6" fill="#fff" opacity=".28" transform="rotate(-28 40 34)"/>
    <g clip-path="url(#${id}c)"><rect class="sfx-gl" x="-60" y="-10" width="34" height="120" fill="url(#${id}g)" transform="rotate(22 50 50)"/></g>
  </svg>`;
}

/* ── الكتم ── */
const MUTE_KEY = 'bayan.stars.mute';
export function starsMuted(){ try { return localStorage.getItem(MUTE_KEY) === '1'; } catch(e){ return false; } }
export function setStarsMuted(on){ try { localStorage.setItem(MUTE_KEY, on ? '1' : '0'); } catch(e){} }

/* ── الصوت ── يُحمَّل مرّةً، وتعذُّرُه صامت: اللحظةُ تُرى بلا صوت */
let AC = null, BUF = null, loading = null;
function ctx(){
  if(!AC){ const C = window.AudioContext || window.webkitAudioContext; if(C) AC = new C(); }
  return AC;
}
export function preloadStarSounds(){
  if(loading) return loading;
  const ac = ctx(); if(!ac) return (loading = Promise.resolve(null));
  loading = Promise.all(Object.entries(SND_URL).map(async ([k, u]) => {
    const r = await fetch(u); if(!r.ok) throw new Error(u);
    return [k, await ac.decodeAudioData(await r.arrayBuffer())];
  })).then(e => (BUF = Object.fromEntries(e)), () => (BUF = null));
  return loading;
}
function play(name, atSec, gain){
  if(!AC || !BUF?.[name]) return;
  const s = AC.createBufferSource(), g = AC.createGain();
  s.buffer = BUF[name]; g.gain.value = gain;
  s.connect(g); g.connect(AC.destination);
  s.start(Math.max(AC.currentTime, atSec));
}

/* ── أدوات ── */
const clamp = (x, a = 0, b = 1) => Math.min(b, Math.max(a, x));
const easeOutBack = t => { const c = 1.9; return 1 + (c + 1) * Math.pow(t - 1, 3) + c * Math.pow(t - 1, 2); };
const easeInOut = t => t < .5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
const easeOut = t => 1 - Math.pow(1 - t, 3);
const bez = (p0, p1, p2, p3, t) => {
  const u = 1 - t;
  return u*u*u*p0 + 3*u*u*t*p1 + 3*u*t*t*p2 + t*t*t*p3;
};
const rnd = (a, b) => a + Math.random() * (b - a);
const SPARK = [GOLD.hi, GOLD.light, '#fff1c4', GOLD.mid];

/* ═══════════ اللحظة ═══════════
   targets — عناصرُ الخانات التي تسكنها النجوم، بترتيب وصولها.
   onLand(i) — يُنادى لحظةَ وصول النجمة i (فتمتلئ خانتُها ويرتفع العدّاد).
   تعود بوعدٍ يتمّ حين ينتهي كلُّ شيء — أو فوراً إن لم يكن هدف. */
export async function starMoment({ targets = [], onLand = () => {} } = {}){
  const n = targets.length;
  if(!n) return;
  await loadCss();
  const muted = starsMuted();
  /* 🆕 b258 · والصوتُ يُنتظر قليلاً إن لم يصل (٦٠٠ مللي ثانية حدّاً): قِيس أنّ لحظةَ ختام الكتاب الأولى كانت تمضي صامتة —
     التحميلُ يبدأ معها فلا يبلغ الضربة. وبعد الحدّ تمضي اللحظةُ بلا صوت: صمتٌ خيرٌ من نجمةٍ تنتظر ملفّاً. */
  if(!muted){
    await Promise.race([preloadStarSounds(), new Promise(r => setTimeout(r, 600))]);
    try { if(ctx()?.state === 'suspended') await AC.resume(); } catch(e){}
  }

  /* ♿ تقليلُ الحركة */
  if(matchMedia('(prefers-reduced-motion: reduce)').matches){
    if(!muted && BUF) play('award', AC.currentTime, .8);
    for(let i = 0; i < n; i++){ await new Promise(r => setTimeout(r, 140)); onLand(i); }
    return;
  }

  const W = innerWidth, H = innerHeight, dpr = Math.min(2, devicePixelRatio || 1);
  const stage = document.createElement('div');
  stage.className = 'sfx-stage'; stage.setAttribute('aria-hidden', 'true');
  stage.innerHTML = '<div class="sfx-veil"></div><canvas class="sfx-cv"></canvas>';
  const cv = stage.querySelector('canvas'), g2 = cv.getContext('2d');
  cv.width = W * dpr; cv.height = H * dpr; g2.scale(dpr, dpr);
  document.body.append(stage);

  /* الحجمُ والمواضع: مولدُ النجوم صفٌّ في وسط الشاشة، مرتّبٌ بمواضع أهدافها فلا تتقاطع مساراتُها */
  const size = Math.round(Math.min(n === 1 ? 150 : 112, (n === 1 ? .32 : .8 / n) * Math.min(W, H * 1.3)));
  const gap = size * 1.18, cx = W / 2, cy = H * .44;
  const tx = targets.map(el => { const b = el.getBoundingClientRect(); return b.left + b.width / 2; });
  const order = [...tx.keys()].sort((a, b) => tx[a] - tx[b]);
  const born = []; order.forEach((ti, k) => { born[ti] = { x: cx + (k - (n - 1) / 2) * gap, y: cy }; });

  const stars = targets.map((el, i) => {
    const w = document.createElement('div');
    w.className = 'sfx-fly'; w.style.width = w.style.height = size + 'px';
    w.innerHTML = starSVG();
    stage.append(w);
    return { el, w, gl: w.querySelector('.sfx-gl'), x: born[i].x, y: born[i].y, trail: [], landed: false,
             flyAt: T.birth + T.hold + i * T.stagger };
  });
  const lastLand = stars[n - 1].flyAt + T.fly;

  /* الصوت — مجدولٌ على ساعة الصوت لا على المؤقّت */
  if(!muted && AC && BUF){
    const t0 = AC.currentTime + .02;
    play('award', t0, .85);
    const mid = stars[Math.floor((n - 1) / 2)].flyAt + T.fly;
    play('swoosh', t0 + mid / 1000 - SWOOSH_PEAK, .7);
  }

  /* الذرّات */
  const P = [], RINGS = [];
  const emit = (x, y, k, o = {}) => {
    for(let j = 0; j < k; j++){
      const a = rnd(0, Math.PI * 2), sp = rnd(o.v0 ?? 30, o.v1 ?? 160), life = rnd(o.l0 ?? 700, o.l1 ?? 1400);
      P.push({ x, y, vx: Math.cos(a) * sp, vy: Math.sin(a) * sp, life, age: 0, ray: !!o.ray,
               r: rnd(o.r0 ?? .8, o.r1 ?? 2.2), c: SPARK[(Math.random() * SPARK.length) | 0], tw: rnd(0, 6.28) });
    }
  };
  stars.forEach(s => {
    emit(s.x, s.y, n === 1 ? 26 : 14, { ray: true, v0: size * 2.2, v1: size * 3.4, l0: 260, l1: 420, r0: 1, r1: 1.6 });
    emit(s.x, s.y, n === 1 ? 90 : 46, { v0: 20, v1: size * 1.25, l0: 900, l1: 1700 });
  });
  veilOn(stage);

  const t0 = performance.now();
  let prev = t0;
  return new Promise(done => {
    const frame = now => {
      const t = now - t0, dt = Math.min(50, now - prev) / 1000; prev = now;

      /* النجوم */
      stars.forEach((s, i) => {
        if(s.landed) return;
        let sc, op = 1, x = s.x, y = s.y, rot = 0;
        if(t < T.birth){
          const k = clamp(t / T.birth);
          sc = .12 + .88 * easeOutBack(k); op = clamp(t / 110);
        } else if(t < s.flyAt){
          const h = t - T.birth;
          sc = 1; y = s.y + Math.sin(h / 260) * size * .025;        // طفوٌ خفيف في الوقفة
          const gk = (h - T.glintAt) / T.glint;                       // اللمعةُ تعبر الوجه
          if(s.gl) s.gl.setAttribute('x', gk > 0 && gk < 1 ? String(-60 + gk * 170) : '-60');
        } else {
          const k = clamp((t - s.flyAt) / T.fly), e = easeInOut(k);
          const b = s.el.getBoundingClientRect();
          const X = b.left + b.width / 2, Y = b.top + b.height / 2, D = Math.hypot(X - s.x, Y - s.y), dx = X - s.x;
          /* منحنًى يهبط أوّلاً ثمّ يصعد إلى الهدف — كمسار الفيديو */
          x = bez(s.x, s.x - dx * .25, X - dx * .35, X, e);
          y = bez(s.y, s.y + D * .32, Y + D * .22, Y, e);
          sc = 1 + (Math.max(.12, b.width / size) - 1) * easeOut(k);
          rot = Math.sin(k * Math.PI) * 14 * Math.sign(dx || 1);
          s.trail.push({ x, y, at: t });
          if(Math.random() < .9) emit(x, y, 2, { v0: 8, v1: 50, l0: 380, l1: 760, r0: .7, r1: 1.7 });
          if(k >= 1){
            s.landed = true; s.w.remove();
            RINGS.push({ x: X, y: Y, at: t, r: b.width * .55 });
            emit(X, Y, 22, { v0: 40, v1: 170, l0: 320, l1: 700 });
            try { onLand(i); } catch(e){}
            if(i === n - 1) veilOff(stage);
            return;
          }
        }
        s.w.style.opacity = op;
        s.w.style.transform = `translate(${x - size / 2}px, ${y - size / 2}px) rotate(${rot}deg) scale(${sc})`;
      });

      /* اللوح */
      g2.clearRect(0, 0, W, H);
      g2.globalCompositeOperation = 'lighter';
      stars.forEach(s => drawTrail(g2, s.trail, t, size));
      for(let j = P.length - 1; j >= 0; j--){
        const p = P[j]; p.age += dt * 1000;
        if(p.age >= p.life){ P.splice(j, 1); continue; }
        p.vx *= (1 - 1.6 * dt); p.vy = p.vy * (1 - 1.6 * dt) + 22 * dt;     // احتكاكٌ وجاذبيّةٌ خفيفة
        p.x += p.vx * dt; p.y += p.vy * dt;
        const a = (1 - p.age / p.life) * (.65 + .35 * Math.sin(p.tw + p.age / 70));
        if(p.ray){
          g2.strokeStyle = p.c; g2.globalAlpha = a; g2.lineWidth = p.r;
          g2.beginPath(); g2.moveTo(p.x, p.y); g2.lineTo(p.x - p.vx * .05, p.y - p.vy * .05); g2.stroke();
        } else {
          g2.globalAlpha = a * .25; g2.fillStyle = p.c;
          g2.beginPath(); g2.arc(p.x, p.y, p.r * 3, 0, 6.283); g2.fill();
          g2.globalAlpha = a; g2.beginPath(); g2.arc(p.x, p.y, p.r, 0, 6.283); g2.fill();
        }
      }
      RINGS.forEach(R => {
        const k = (t - R.at) / T.ring; if(k < 0 || k > 1) return;
        const e = easeOut(k);
        const fl = g2.createRadialGradient(R.x, R.y, 0, R.x, R.y, R.r * 3);
        fl.addColorStop(0, GOLD.hi); fl.addColorStop(1, 'rgba(246,223,152,0)');
        g2.globalAlpha = (1 - k) * .55; g2.fillStyle = fl;
        g2.beginPath(); g2.arc(R.x, R.y, R.r * 3, 0, 6.283); g2.fill();
        g2.globalAlpha = 1 - k; g2.strokeStyle = GOLD.hi; g2.lineWidth = 2.4 * (1 - k) + .6;
        g2.beginPath(); g2.arc(R.x, R.y, R.r * (1 + 2.2 * e), 0, 6.283); g2.stroke();
      });
      g2.globalAlpha = 1; g2.globalCompositeOperation = 'source-over';

      if(t < lastLand + T.tail || P.length) requestAnimationFrame(frame);
      else { stage.remove(); done(); }
    };
    requestAnimationFrame(frame);
  });
}

/* ═══════════ نجومُ الكتاب — الكتلةُ المشتركة (b258) ═══════════
   تُرسم في موضعين: بطلُ نتيجة الاختبار (`quiz.js` · الأنواعُ الثلاثة) وصفحةُ ختام الكتاب (`student.js` · القراءةُ وحدها،
   `sm` سطراً واحداً — صفحةُ الكتاب قصيرةٌ في نافذةٍ ‎574px).
   🔑 **«الجديد» فرقُ صورتين** (`k0` قبل · `k1` بعد): ما زاد يطير إلى خانته ويرتفع به المجموع، وما كان قبلُ ساكن.
      وبلا «قبل» (`k0` عدم) لا لحظة — تُرسم الخاناتُ بما هي عليه، لا تطير نجومٌ قديمة كأنّها جديدة.
   host     — العنصرُ الفارغ الذي تُرسم فيه (يُظهَر هنا).
   after    — جوابُ `my_stars` بعد الواقعة (المجموعُ والقاعدة).
   groups   — الأنواعُ المرسومة بترتيبها (['read','quiz','cards'] أو ['read']).
   تعود بعدد النجوم الجديدة (صفرٌ إن لم يكن جديد). */
const GROUP_NAME = { read: 'القراءة', quiz: 'الفهم', cards: 'الكلمات' };
/* 🆕 b260 · وبالإنجليزيّة في المكتبة الإنجليزيّة (`en` · رأسُ library.js) */
const GROUP_EN = { read: 'Reading', quiz: 'Comprehension', cards: 'Words' };   // اسمُ الخطوة في بطاقة الكتاب نفسُه
const ICO_SND = {
  on:  '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 9.5h3.5L12 5.5v13l-4.5-4H4z"/><path d="M15.5 9a4.2 4.2 0 010 6M18 6.5a7.6 7.6 0 010 11"/></svg>',
  off: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 9.5h3.5L12 5.5v13l-4.5-4H4z"/><path d="M16 9.5l5 5M21 9.5l-5 5"/></svg>',
};

/* 🆕 b259 · `num` — أرقامُ المكتبة: الإنجليزيّةُ 0-9 والعربيّةُ ٠-٩ (`libNum` · library.js · قرارُ المالك). */
export async function bookStars(host, { after, k0 = null, k1 = {}, groups, small = false, num = AR, en = false } = {}){
  if(!host || !after?.rule) return 0;
  await loadCss();
  if(!host.isConnected) return 0;
  const rule = after.rule;
  const gs = groups.filter(k => (rule[k] || 0) > 0);
  const was = k0 || k1;                                         // بلا «قبل» ⇒ الحالُ كما هي
  const fresh = k0 ? gs.filter(k => k1[k] && !k0[k]) : [];
  const gain = fresh.reduce((s, k) => s + (rule[k] || 0), 0);
  let total = Number(after.total || 0) - gain;

  return paintBox(host, { small, num, en, total, gain,
    rows: gs.map(k => ({ k, n: rule[k], on: !!was[k], name: (en ? GROUP_EN : GROUP_NAME)[k] })),
    fresh: k => fresh.includes(k) });
}

/* 🆕 b261 · **نجمةُ الكلمات في ختام جلسة المراجعة** («تذكّرها» · flashcards.js) — آخرُ لحظات المرحلة ② (`spec-reading-motivation.md` §٧).
   🔑 **والجلسةُ تمسّ كتباً عدّة:** بطاقاتُ «تذكّرها» من كتبٍ شتّى، فقد تكتمل نجمةُ كلماتِ كتابين في جلسةٍ واحدة ⇒ خانةٌ لكلّ كتابٍ اكتملت
      كلماتُه الآن (الفرقُ بين صورتَي `my_stars` قبل الجلسة وبعدها) — لا خاناتُ كتابٍ بعينه.
   📌 **وبالعربيّة دائماً:** «تذكّرها» قسمٌ في المنصّة لا في المكتبة، وإطارُ المنصّة عربيٌّ بقرار المالك — ولو كانت الكلماتُ إنجليزيّة.
   تعود بعدد النجوم الجديدة (صفرٌ ⇒ لا شيءَ يُرسم). */
export async function wordStars(host, { before, after } = {}){
  const per = Number(after?.rule?.cards || 0);
  if(!host || !before || !per) return 0;
  const fresh = Object.entries(after.lessons || {}).filter(([id, k]) => k.cards && !before.lessons?.[id]?.cards);
  if(!fresh.length) return 0;
  await loadCss();
  if(!host.isConnected) return 0;
  const gain = fresh.length * per;
  return paintBox(host, { num: AR, en: false, total: Number(after.total || 0) - gain, gain,
    rows: [{ k: 'cards', n: gain, on: false,
             name: GROUP_NAME.cards + (fresh.length > 1 ? ' · ' + N(fresh.length, 'كتاب', 'كتابان', 'كتب', 'كتاباً') : '') }],
    fresh: () => true });
}

/* الكتلةُ نفسُها لموضعيها — المجموعُ والكتمُ وخاناتُ الصفوف، ثمّ اللحظةُ إلى الخانات الجديدة (`fresh(k)`) */
async function paintBox(host, { small = false, num, en, total, gain, rows, fresh }){
  host.classList.add('nj-box'); host.classList.toggle('sm', small);
  host.innerHTML = `
    <div class="nj-top">
      <span class="nj-tl">${en ? 'Your stars' : 'مجموع نجومك'}</span>
      <span class="nj-total">${starSVG()}<b>${num(total)}</b></span>
      ${/* «+3» بأرقامٍ إنجليزيّة يقلبها السطرُ العربيّ «3+» ⇒ تُعزل يساراً · و«+٣» بالهنديّة تُقرأ صحيحةً في مكانها (قِيس b257) */
        num(1) === '1' ? `<bdi class="nj-plus" dir="ltr">+${num(gain)}</bdi>` : `<span class="nj-plus">+${num(gain)}</span>`}
      <button class="nj-mute" type="button"></button>
    </div>
    <div class="nj-groups">${rows.map(r => `
      <div class="nj-g"><div class="nj-row">${Array.from({ length: r.n }, () =>
        `<i class="nj-s${r.on ? ' on' : ''}" data-k="${r.k}">${starSVG()}</i>`).join('')}</div><span>${r.name}</span></div>`).join('')}
    </div>
    <span class="nj-sr" aria-live="polite"></span>`;
  host.hidden = false;

  const mute = host.querySelector('.nj-mute');
  const paintMute = () => {
    const m = starsMuted();
    mute.innerHTML = m ? ICO_SND.off : ICO_SND.on;
    mute.setAttribute('aria-label', en ? (m ? 'Turn star sounds on' : 'Mute star sounds')
                                       : (m ? 'تشغيل صوت النجوم' : 'كتم صوت النجوم'));
    mute.title = mute.getAttribute('aria-label');
  };
  paintMute();
  mute.onclick = () => { setStarsMuted(!starsMuted()); paintMute(); };

  if(!gain) return 0;
  const tot = host.querySelector('.nj-total b');
  const targets = [...host.querySelectorAll('.nj-s')].filter(s => !s.classList.contains('on') && fresh(s.dataset.k));
  await starMoment({ targets, onLand: i => {
    const s = targets[i];
    s.classList.add('on', 'pop'); setTimeout(() => s.classList.remove('pop'), 260);
    tot.textContent = num(++total);
    tot.classList.add('bump'); setTimeout(() => tot.classList.remove('bump'), 180);
  }});
  if(host.isConnected){
    host.querySelector('.nj-plus').classList.add('on');
    host.querySelector('.nj-sr').textContent = en ? `${gain} new ${gain === 1 ? 'star' : 'stars'} added`
                                                  : 'أضيفت إلى مجموعك ' + N(gain, 'نجمة', 'نجمتان', 'نجوم', 'نجمة');
  }
  return gain;
}

/* الشريط: خطٌّ يتلاشى من الذيل، وعرضُه يتبع عمرَه — ورقيقٌ مضيءٌ فوق عريضٍ خافت */
function drawTrail(g2, tr, t, size){
  const LIFE = 460;
  while(tr.length && t - tr[0].at > LIFE) tr.shift();
  if(tr.length < 2) return;
  g2.lineCap = 'round';
  for(let j = 1; j < tr.length; j++){
    const a = 1 - (t - tr[j].at) / LIFE;
    g2.strokeStyle = GOLD.light; g2.globalAlpha = a * .35; g2.lineWidth = size * .14 * a;
    g2.beginPath(); g2.moveTo(tr[j - 1].x, tr[j - 1].y); g2.lineTo(tr[j].x, tr[j].y); g2.stroke();
    g2.strokeStyle = GOLD.hi; g2.globalAlpha = a * .9; g2.lineWidth = Math.max(1, size * .035 * a);
    g2.beginPath(); g2.moveTo(tr[j - 1].x, tr[j - 1].y); g2.lineTo(tr[j].x, tr[j].y); g2.stroke();
  }
}

function veilOn(stage){ requestAnimationFrame(() => stage.classList.add('on')); }
function veilOff(stage){ stage.classList.remove('on'); }
