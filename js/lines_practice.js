/* ══════════════════════════════════════════════════════════
   بيان — lines_practice.js  التدرّبُ بصوت الطالب في مشغّل المقطع (b222 · مختبر الصوتيّات، الخطوة ٥)

   الخطّة (٦ نوفمبر): «يسمع الأصل، ثمّ يسجّل صوته، ثمّ يسمع الأصل ثانيةً، ويحاكي فور السماع. وتبادل الأدوار: يختار الطالب
   شخصيّة، فتُشغَّل أدوار الآخرين ويُترك له دوره، ثمّ يسمع الحوار كاملاً بصوته فيه». ويُحمَّل هذا الملفُّ عند أوّل ضغطةٍ على
   «التدرّب بصوتك» في `lines_player.js`، فلا يثقل المشغّلَ على من لا يتدرّب. والحسابُ في `audio_practice.js`.

   🔒 **التسجيلُ يبقى على الجهاز** (حكمُ ٢٨ أكتوبر · الخطّة ③): لا نداءَ للقاعدة ولا للمخزن من هذا الملفّ، والتسجيلُ في الذاكرة
      ما دام المشغّلُ مفتوحاً ثمّ يُترك. **والميكروفونُ لكلّ دورٍ وحده:** يُطلب حين يبدأ الدور ويُغلق حين ينتهي (`track.stop`) —
      فبين الأدوار لا ميكروفون، وهو وعدُ صفحة الخصوصيّة §٢ بحرفه: «ولا تستمع إلى شيء خارج تلك اللحظة المحددة». ومشغّلٌ يُغلق
      والدورُ قائمٌ يُغلق الميكروفونَ معه (يُفحص كلَّ ربع ثانية).
   🎯 **ولا يُسجَّل استماعٌ بتدرّب:** المقطعُ من الأصل يقف قبيل آخر الملفّ كما يقف «⟲ السطر»، فلا يطلق `ended`.
   📱 **وiOS لا يشغّل عنصرَ صوتٍ من الشيفرة قبل أن يُشغَّل بنقرة:** فأوّلُ نقرةٍ في كلّ تدرّبٍ تفتح العنصرين (`prime`) —
      الأصلَ بصوتٍ مكتوم، وصوتَ الطالب بصمتٍ قصير — ثمّ يتتابعان بلا نقر. ⚠️ **ولم يُجرَّب على iPhone حقيقيّ بعد.**
   ══════════════════════════════════════════════════════════ */
import { esc, AR, N } from './ui.js';
import * as L from './audio_lines.js';
import * as P from './audio_practice.js';
import * as PI from './audio_pitch.js';
import { pickMime, baseMime, micError } from './recorder.js';

const T = Object.freeze({
  name: 'التدرّب بصوتك',
  /* 🆕 b233 · سطرٌ واحدٌ بنصّ المالك: «بعد الضغط على التدرب بصوتك يكفي عبارة "اسمع... سجل... قارن"» — وسقط معه سطرا
     «التسجيل يبقى على جهازك…» و«لكل سطر زر تسجيل…».
     🆕 b234 · وبصيغة الطالبة — قرارُ المالك: «نعم أضف للطالبة "اسمعي… سجّلي… قارني"». فهو خطابٌ يُفصل بـ`G()` (bayan-language-identity
     §٤)، والخانةُ الرابعة لمن لم يُسأل عن صيغته مصادرُ محايدة لا أمرٌ مذكّر.
     🆕 b235 · **وانتقل السطرُ إلى شريط «التدرّب بصوتك»** (`GO.steps` في lines_player.js) ليُقرأ قبل الضغط لا بعده —
     فاللوحةُ تبدأ بأنماطها، والشريطُ فوقها رأسُها */
  echo: 'سطراً سطراً',
  role: 'تبادل الأدوار',
  roleHint: 'تُسمع أدوار الآخرين، ويُسجَّل صوتك في دورك، ثم يُسمع الحوار بصوتك.',
  noText: 'والنص غير متاح، فيُقال السطر كما سُمع.',
  pick: 'دورك في الحوار:',
  go: 'البدء',
  next: 'التالي',
  endRec: 'إنهاء التسجيل',
  stop: 'إيقاف',
  turn: 'دورك',
  yours: 'صوتك',
  orig: 'الأصل',
  ended: 'انتهى الحوار.',
  mix: 'سماع الحوار بصوتك',
  mixing: 'يُسمع الحوار بصوتك',
  again: 'إعادة الدور',
  other: 'دور آخر',
  stopped: 'توقّف التدرّب.',
  silent: 'لم يُلتقط صوت.',
  fail: 'تعذّر تشغيل الملف.',
  their: s => s ? `دور <bdi>${esc(s)}</bdi>` : 'يُسمع الأصل',
  lineMic: k => `التدرّب على السطر ${AR(k + 1)}`,
  lineMine: k => `سماع صوتك في السطر ${AR(k + 1)}`,
  /* 🆕 b223 · خطُّ التنغيم (مختبر الصوتيّات ٦) */
  pitchOf: k => `نبرة السطر ${AR(k + 1)}`,
  pitchHint: 'ارتفاع الخط ارتفاع الصوت، وكل خط بمدى صوت صاحبه.',
  pitchNoOrig: 'تعذّرت قراءة الأصل، فيظهر خط صوتك وحده.',
  pitchShort: 'لا يكفي الصوت المسجّل لرسم الخط.',
  /* 🆕 b230 · نافذةُ السطر الطويل ومحورُ الارتفاع */
  pitchTail: 'والسطر طويل، فيُرسم آخره، وفيه تظهر نبرة الجملة.',
  last: s => `آخر ${N(s, 'ثانية', 'ثانيتين', 'ثوان', 'ثانية')}`,
  hi: 'أعلى',
  lo: 'أخفض'
});
/* رسائلُ الميكروفون رسائلُ القراءة الجهريّة بحرفها (`readAr` في student.js) — والقياسُ يفحص أنّهما واحد */
const MIC = Object.freeze({
  denied: 'لم يُسمح باستعمال الميكروفون. يمكنك السماح به من إعدادات المتصفح.',
  nomic: 'لا يوجد ميكروفون في هذا الجهاز.',
  micfail: 'تعذّر تشغيل الميكروفون.'
});

const ICO_MIC = `<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2"
  stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="9" y="3" width="6" height="11" rx="3"/><path d="M5 11a7 7 0 0014 0M12 18v3"/></svg>`;
const BITRATE = 48000;                  // كما في القراءة الجهريّة: كلامٌ لا موسيقى
const ABORT = Symbol('abort');

/* عُشرُ ثانيةٍ من الصمت (WAV) — به يُفتح عنصرُ صوت الطالب بنقرة */
function silence(){
  const n = 800, b = new ArrayBuffer(44 + n * 2), v = new DataView(b);
  const W = (o, s) => [...s].forEach((c, i) => v.setUint8(o + i, c.charCodeAt(0)));
  W(0, 'RIFF'); v.setUint32(4, 36 + n * 2, true); W(8, 'WAVE'); W(12, 'fmt '); v.setUint32(16, 16, true);
  v.setUint16(20, 1, true); v.setUint16(22, 1, true); v.setUint32(24, 8000, true); v.setUint32(28, 16000, true);
  v.setUint16(32, 2, true); v.setUint16(34, 16, true); W(36, 'data'); v.setUint32(40, n * 2, true);
  return URL.createObjectURL(new Blob([b], { type: 'audio/wav' }));
}

/* 🆕 b223 · الصوتُ أرقاماً لخطّ التنغيم: يُفكّ بثمانية آلاف عيّنةٍ وقناةٍ واحدة — تكفي من ٩٠ إلى ٣٠٠ هـ بدقّة ١٪ (قيس في
   `audio_pitch.test.mjs`)، وملفٌّ من عشر دقائق نحو ١٩ م.ب في الذاكرة لا ٣٨ */
const PITCH_RATE = 8000;
async function pcm(buf){
  const ctx = new OfflineAudioContext(1, 1, PITCH_RATE);
  const ab = await ctx.decodeAudioData(buf);
  const n = ab.length, ch = ab.numberOfChannels, mono = new Float32Array(n);
  for(let c = 0; c < ch; c++){ const d = ab.getChannelData(c); for(let i = 0; i < n; i++) mono[i] += d[i] / ch; }
  return { data: mono, rate: ab.sampleRate };
}

/* host لوحةُ التدرّب (`.al-pr`) · ctx من المشغّل: { el, au, lines(), text(), halt() } ⇒ { show, hide, redraw } */
export function mountPractice(host, ctx){
  const { el, au } = ctx;
  const S = { mode: 'echo', role: null, phase: 'idle', msg: '', err: '', chart: null, fresh: null };   // phase: idle · wait · turn · play · back · mix · done
  const echoT = new Map(), roleT = new Map();                               // رقمُ السطر ⇒ { url, ms, blob } — في الذاكرة وحدها
  const pitch = new Map();                                                  // رقمُ السطر ⇒ { me, og } منحنيا التنغيم
  const me = new Audio();
  me.preload = 'auto';
  let run = null, stopTurn = null, hush = null, meOpen = false, orig = null;

  const lines = () => ctx.lines();
  const durMs = () => Number.isFinite(au.duration) ? au.duration * 1000 : Infinity;

  /* ═══════════ الرسم ═══════════ */
  const btn = (p, label, cls = '') => `<button type="button" class="aud-b${cls}" data-p="${p}">${label}</button>`;
  const tab = (m, label) => `<button type="button" class="aud-b" data-p="mode" data-m="${m}" aria-pressed="${S.mode === m}">${label}</button>`;

  function status(){
    switch(S.phase){
      case 'wait': return `<span class="al-pr-msg">…</span>${btn('stop', T.stop)}`;
      case 'turn': return `<span class="al-pr-dot" aria-hidden="true"></span><b class="al-pr-msg">${T.turn}</b>
        <span class="al-pr-bar" aria-hidden="true"><i></i></span>${btn('next', S.mode === 'role' ? T.next : T.endRec, ' primary')}${btn('stop', T.stop)}`;
      case 'play': case 'back': case 'mix': return `<span class="al-pr-msg">${S.msg}</span>${btn('stop', T.stop)}`;
      case 'done': return `<span class="al-pr-msg">${T.ended}</span>${roleT.size ? btn('mix', T.mix, ' primary') : ''}${btn('go', T.again)}${btn('other', T.other)}`;
      default: return S.err ? `<span class="al-pr-err">${esc(S.err)}</span>` : S.msg ? `<span class="al-pr-msg">${S.msg}</span>` : '';
    }
  }

  function draw(){
    if(!host.isConnected || host.hidden) return decorate();
    const rs = P.roles(lines());
    if(S.mode === 'role' && !rs.length) S.mode = 'echo';
    if(S.role != null && !rs.includes(S.role)) S.role = null;
    let body = '';
    if(S.mode === 'echo') body = '';
    else if(!run && S.phase !== 'done') body = `<p class="al-pr-hint">${T.roleHint}${ctx.text() ? '' : ' ' + T.noText}</p>
      <div class="al-pr-who"><span>${T.pick}</span>${rs.map((r, i) =>
        `<button type="button" class="aud-b" data-p="role" data-r="${i}" aria-pressed="${S.role === r}"><bdi>${esc(r)}</bdi></button>`).join('')}
        <button type="button" class="aud-b primary" data-p="go"${S.role == null ? ' disabled' : ''}>${T.go}</button></div>`;
    host.innerHTML = `${rs.length ? `<div class="al-pr-tabs" role="group" aria-label="${T.name}">${tab('echo', T.echo)}${tab('role', T.role)}</div>` : ''}
      ${body}<div class="al-pr-st" aria-live="polite">${status()}</div>${chart()}`;
    decorate();
  }

  /* 🆕 b223 · خطُّ التنغيم للسطر الأخير سطراً سطراً: الأصلُ عريضٌ محايد، وصوتُ الطالب رفيعٌ بلون التفاعل فوقه — فيُفرَّق
     بينهما باللون والعرض معاً (عمى الألوان · الرماديّ). ولا لونَ حكم: الخطّان لا يقولان «أصبت» ولا «أخطأت».
     🆕 b230 · ورسمٌ جديد بطلب المالك (٨ نوفمبر): «أوضح وأكثر تقدّماً»:
     ① **منحنياتٌ ناعمة** (`PI.smooth` ثمّ `PI.geometry`) لا خطوطٌ مكسورة، ونُتَفُ الصوت دون ٦٠ م.ث لا تُرسم.
     ② **بعرض اللوحة الحقيقيّ** لا مخطّطٌ من ثلاثمئة نقطةٍ يُمطّ — فلا يتشوّه المنحنى وتبقى النقطةُ مستديرة.
     ③ **وحول خطّ الطالب حاشيةٌ بلون اللوحة** أضيقُ من شريط الأصل: إن طابقه ظهر الخطُّ داخل الشريط لا فوقه يحجبه.
        ولكلٍّ نقطةٌ في آخره: هناك صعودُ السؤال وهبوطُ الخبر.
     ④ **خطُّ الوسط** (مدى صاحبه) وخطّان متقطّعان على ثلاث نغماتٍ فوقه وتحته، و«أعلى» و«أخفض» في جانب البدء.
     ⑤ **يظهر الخطّان مسحاً مع الزمن** في أوّل رسمٍ بعد التسجيل وحده (`S.fresh`) لا عند كلّ إعادة رسم — ولا حركةَ لمن طلب
        تقليلها (CSS).
     ⑥ **والسطرُ الأطولُ من ستّ ثوانٍ يُرسم آخرُه** (`PI.pair` — والأصلُ مرجعُ النافذة)، ويُقال ذلك في العنوان والملاحظة */
  const CH = Object.freeze({ h: 136, padX: 10, padY: 20, k: 3 });
  function chart(){
    const k = S.chart, p = k != null && S.mode === 'echo' ? pitch.get(k) : null;
    if(!p) return '';
    const fresh = S.fresh === k;
    S.fresh = null;
    const rtl = el.querySelector('.al-pls')?.dir === 'rtl';
    const cs = getComputedStyle(host);
    /* داخلُ الإطار بلا حدَّيه (١ + ١) — والارتفاعُ في الأسفل `H + 2` لأنّ الصناديق `border-box`: فالرسمُ نقطةً بنقطة */
    const W = Math.max(240, Math.round((host.clientWidth || 626) - (parseFloat(cs.paddingLeft) || 0) - (parseFloat(cs.paddingRight) || 0) - 2));
    const H = CH.h, f = v => Math.round(v * 10) / 10;
    const win = PI.pair(p.og, p.me);
    /* نقطةٌ لكلّ نقطتين من العرض تقريباً — وما زاد لا يُرى ويُثقل */
    const geo = c => c?.span ? PI.geometry({ ...c, points: PI.smooth(c.points, CH.k) }, { w: W, h: H, pad: CH.padX, padY: CH.padY, rtl,
      step: Math.max(1, Math.round((c.span[1] - c.span[0]) / PI.PITCH.hopMs / (W / 2))) }) : { d: '', end: null };
    const og = geo(win.og), mine = geo(win.me);
    const note = !mine.d ? T.pitchShort : (p.og == null ? T.pitchNoOrig : T.pitchHint) + (win.trimmed ? ' ' + T.pitchTail : '');
    const span = win.trimmed ? T.last(PI.PITCH.tailMs / 1000) : '';
    const yAt = st => f(H / 2 - st / PI.PITCH.range * (H / 2 - CH.padY));
    const hl = (st, cls) => `<line class="${cls}" x1="0" y1="${yAt(st)}" x2="${W}" y2="${yAt(st)}"/>`;
    const dot = (e, cls) => e ? `<i class="al-pc-e ${cls}" style="left:${f(e[0] / W * 100)}%;top:${f(e[1] / H * 100)}%"></i>` : '';
    return `<figure class="al-pc"><figcaption><b>${T.pitchOf(k)}</b>${span ? `<span class="al-pc-t">${span}</span>` : ''}<span class="al-pc-lg">${
        og.d ? `<span class="al-pc-k o">${T.orig}</span>` : ''}${mine.d ? `<span class="al-pc-k m">${T.yours}</span>` : ''}</span></figcaption>
      <div class="al-pc-g${rtl ? ' rtl' : ''}${fresh ? ' in' : ''}" style="height:${H + 2}px">
        <svg class="al-pc-s" viewBox="0 0 ${W} ${H}" preserveAspectRatio="none" aria-hidden="true">${hl(3, 'al-pc-q')}${hl(-3, 'al-pc-q')}${hl(0, 'al-pc-mid')}</svg>
        <span class="al-pc-y hi" aria-hidden="true">${T.hi}</span><span class="al-pc-y lo" aria-hidden="true">${T.lo}</span>
        <div class="al-pc-w"><svg class="al-pc-s" viewBox="0 0 ${W} ${H}" preserveAspectRatio="none" role="img" aria-label="${T.pitchOf(k)}${
          span ? ' · ' + span : ''}">${og.d ? `<path class="al-pc-o" d="${og.d}"/>` : ''}${
          mine.d ? `<path class="al-pc-mh" d="${mine.d}"/><path class="al-pc-m" d="${mine.d}"/>` : ''}</svg>${dot(og.end, 'o')}${dot(mine.end, 'm')}</div>
      </div>
      <p class="al-pc-n">${note}</p></figure>`;
  }

  /* الأصلُ يُقرأ مرّةً لكلّ مشغّل — ويقتضي أن يأذن المخزنُ للموقع بالقراءة (CORS · ق٢). وتعذُّرُه يُقال، وخطُّ الطالب يبقى.
     🔴 **وبسؤالٍ يتخطّى الذاكرة المؤقّتة** (`?cors=…`): Cloudflare يحفظ ردَّ الرابط المجرّد ولا يفرّق بالأصل (`Vary: Origin`
        لا يُعمل به) — ويملؤها المشغّلُ نفسُه وهو لا يرسل أصلاً، فيعود الردُّ المحفوظ بلا الترويسة لكلّ صفحة (قِيس بعد حفظ القاعدة:
        `HIT` بلا `Access-Control-Allow-Origin`، والرابطُ بسؤالٍ فريدٍ يبلغ R2 فيردّ بأصل السائل). ومسحُ الذاكرة لا يدوم: يملؤها
        التشغيلُ التالي كما ملأها. والثمنُ تنزيلٌ ثانٍ للملفّ في كلّ تدرّب، وR2 لا يتقاضى على التنزيل */
  function original(){
    if(!orig) orig = (async () => {
      try {
        const src = au.currentSrc || au.src;
        const url = /^https?:/.test(src) ? src + (src.includes('?') ? '&' : '?') + 'cors=' + Date.now().toString(36) : src;
        const r = await fetch(url, { mode: 'cors', credentials: 'omit' });
        if(!r.ok) throw new Error('HTTP ' + r.status);
        return await pcm(await r.arrayBuffer());
      } catch(e){ console.warn('[pitch] تعذّرت قراءة الأصل:', e); return null; }
    })();
    return orig;
  }

  /* منحنيا السطر k: صوتُ الطالب من تسجيله، والأصلُ من حدَّي السطر في الملفّ — ويُرسمان إن بقي السطرُ هو المعروض */
  async function analyze(k){
    const t = echoT.get(k), sp = L.span(lines(), k, durMs());
    if(!t || !sp) return;
    S.chart = k;
    try {
      const mine = await pcm(await t.blob.arrayBuffer());
      const meC = PI.contour(mine.data, mine.rate);
      const o = await original();
      let ogC = null;
      if(o){
        const a = Math.max(0, Math.floor(sp.start / 1000 * o.rate));
        const b = Math.min(o.data.length, Math.ceil((sp.end ?? durMs()) / 1000 * o.rate));
        if(b > a) ogC = PI.contour(o.data.subarray(a, b), o.rate);
      }
      if(echoT.get(k) !== t) return;                         // سُجّل السطرُ ثانيةً أثناء الحساب
      pitch.set(k, { me: meC, og: ogC });
      if(S.chart === k){ S.fresh = k; draw(); }
    } catch(e){ console.warn('[pitch]', e); }
  }

  /* السطور: زرُّ التسجيل لكلّ سطرٍ موقَّتٍ سطراً سطراً، و«صوتك» لما سُجّل منها · وسطورُ الدور المختار مُعلَّمة */
  function decorate(){
    const on = host.isConnected && !host.hidden;
    el.querySelectorAll('.al-pli').forEach(r => {
      const k = +r.dataset.k, l = lines()[k];
      r.querySelector('.al-mic')?.remove();
      r.querySelector('.al-mine')?.remove();
      r.classList.toggle('mine', on && S.mode === 'role' && S.role != null && l?.speaker === S.role);
      if(!on || S.mode !== 'echo' || l?.start == null) return;
      r.querySelector('.al-plb')?.insertAdjacentHTML('afterend',
        `<button type="button" class="al-plb al-mic" data-p="echo" aria-label="${T.lineMic(k)}">${ICO_MIC}</button>`);
      if(echoT.has(k)) r.insertAdjacentHTML('beforeend',
        `<button type="button" class="aud-b al-mine" data-p="mine" aria-label="${T.lineMine(k)}">${T.yours}</button>`);
    });
  }

  const set = (phase, msg = '') => { S.phase = phase; S.msg = msg; draw(); };
  /* السطرُ الجاري في التدرّب — والمشغّلُ لا يرسمه ما دام التدرّبُ قائماً (`data-busy`) */
  function mark(k){
    el.querySelectorAll('.al-pli').forEach(r => r.classList.toggle('on', +r.dataset.k === k));
    if(k >= 0) try { el.querySelector(`.al-pli[data-k="${k}"]`)?.scrollIntoView({ block: 'nearest' }); } catch(e){}
  }
  const say = k => { const m = host.querySelector('.al-pr-msg'); if(m) m.innerHTML = T.their(lines()[k]?.speaker); };
  function live(ms){
    S.phase = 'turn'; draw();
    const i = host.querySelector('.al-pr-bar i');
    if(i){ i.style.transition = 'none'; i.style.width = '0'; void i.offsetWidth; i.style.transition = `width ${ms}ms linear`; i.style.width = '100%'; }
    host.querySelector('[data-p="next"]')?.focus({ preventScroll: true });
  }

  /* ═══════════ الجلسة ═══════════ */
  function begin(){
    abort();
    const ac = new AbortController();
    run = ac; S.err = ''; S.msg = '';
    ctx.halt?.();
    /* والمقطعُ يُسمع والطالبُ يبدأ تدرّباً ⇒ يقف أوّلاً: دورٌ في أوّل الحوار لا يُسجَّل والأصلُ يجري تحته */
    if(!au.paused) au.pause();
    el.setAttribute('data-busy', '');
    return { sig: ac.signal, primed: prime() };
  }
  const settle = () => { run = null; stopTurn = null; el.removeAttribute('data-busy'); mark(-1); };
  function finish(msg = ''){ settle(); if(S.phase !== 'done') S.phase = 'idle'; S.msg = msg; draw(); }
  function abort(msg){
    if(!run) return;
    const r = run;
    settle(); r.abort();
    S.phase = 'idle'; S.msg = msg || ''; draw();
  }
  function fail(e){
    if(e === ABORT) return;                    // أوقفه `abort` وقد رسم
    settle();
    S.phase = 'idle'; S.err = e?.mic ? MIC[e.mic] : T.fail;
    if(!e?.mic) console.warn('[practice]', e);
    draw();
  }

  /* iOS: يُفتح العنصران بنقرة الطالب نفسِها — وتنتظرهما الجلسةُ قبل أوّل خطوة، فلا يُوقف الفتحُ ما بعده */
  function prime(){
    const ps = [];
    if(!meOpen){
      meOpen = true; hush = hush || silence();
      me.src = hush;
      ps.push(me.play().then(() => me.pause(), () => {}));
    }
    if(!au.played?.length && au.paused){
      const m = au.muted;
      au.muted = true;
      ps.push(au.play().then(() => { au.pause(); au.muted = m; }, () => { au.muted = m; }));
    }
    return Promise.all(ps);
  }

  async function ready(sig){
    if(au.readyState < 1 || !Number.isFinite(au.duration)) await new Promise((res, rej) => {
      const t = setTimeout(() => rej(new Error('metadata')), 8000);
      au.addEventListener('loadedmetadata', () => { clearTimeout(t); res(); }, { once: true });
    });
    if(sig.aborted) throw ABORT;
    if(!Number.isFinite(au.duration)) throw new Error('duration');
  }

  /* مقطعٌ من الأصل [start, end) — ويقف قبيل آخر الملفّ. وإيقافُ الطالب للمشغّل يوقف التدرّبَ كلَّه */
  function playSeg(start, end, sig, onLine){
    return new Promise((res, rej) => {
      if(sig.aborted) return rej(ABORT);
      const d = durMs(), stopAt = Math.min(end ?? d, d - 60);
      let raf = 0, to = 0, near = 0, done = false, cur = -2;
      const fin = ok => {
        if(done) return;
        done = true;
        cancelAnimationFrame(raf); clearTimeout(to); clearTimeout(near);
        au.removeEventListener('timeupdate', check); au.removeEventListener('pause', onPause);
        sig.removeEventListener('abort', onAbort);
        if(!au.paused) au.pause();
        ok ? res() : rej(ABORT);
      };
      /* 🔴 والوقوفُ بمؤقّتٍ عند الحدّ لا بإطار الرسم وحده: صفحةٌ بلا إطاراتٍ (مخفيّة، أو Edge بلا واجهة) لا يبلغها إلا
         `timeupdate` كلَّ ربع ثانية — فسُمع أوّلُ دور الطالب بصوت الأصل (قِيس: ٦٦١١ مكانَ ٦٤٢٠). فإذا اقترب الحدُّ
         ضُبط مؤقّتٌ على موعده بسرعة التشغيل، ويُعاد الفحصُ عنده */
      const check = () => {
        const ms = au.currentTime * 1000;
        if(ms >= stopAt - 30) return fin(true);
        const k = L.lineAt(lines(), ms);
        if(k !== cur){ cur = k; onLine?.(k); }
        const left = stopAt - 30 - ms;
        if(left < 400 && !near) near = setTimeout(() => { near = 0; if(!done) check(); }, Math.max(0, left / (au.playbackRate || 1)));
      };
      const loop = () => { if(done) return; check(); raf = requestAnimationFrame(loop); };
      const onAbort = () => fin(false);
      const onPause = () => { if(!done) abort(T.stopped); };
      sig.addEventListener('abort', onAbort);
      au.currentTime = start / 1000;
      au.play().then(() => {
        if(done) return;
        au.addEventListener('timeupdate', check);
        au.addEventListener('pause', onPause);
        raf = requestAnimationFrame(loop);
        /* واللوحةُ المخفيّة بلا إطاراتِ رسم: `timeupdate` يكفي، وهذا حارسٌ أخير */
        to = setTimeout(() => fin(true), Math.max(0, stopAt - start) / (au.playbackRate || 1) + 2000);
      }, () => fin(false));
    });
  }

  /* تسجيلُ الطالب — وتعذُّرُ تشغيله لا يوقف الحوار */
  function playTake(url, sig){
    return new Promise((res, rej) => {
      if(sig.aborted) return rej(ABORT);
      let done = false;
      const fin = ok => {
        if(done) return;
        done = true;
        me.onended = me.onerror = null;
        sig.removeEventListener('abort', onAbort);
        try { me.pause(); } catch(e){}
        ok ? res() : rej(ABORT);
      };
      const onAbort = () => fin(false);
      sig.addEventListener('abort', onAbort);
      me.onended = () => fin(true);
      me.onerror = () => fin(true);
      me.src = url;
      me.play().catch(() => fin(true));
    });
  }

  /* دورٌ واحد: الميكروفونُ يُطلب الآن ويُغلق عند نهايته ⇒ { blob, ms } أو null بلا صوت */
  async function record(maxMs, sig){
    if(sig.aborted) throw ABORT;
    let stream;
    try {
      stream = await navigator.mediaDevices.getUserMedia({
        audio: { echoCancellation: true, noiseSuppression: true, autoGainControl: true } });
    } catch(e){ throw { mic: micError(e) }; }
    const release = () => stream.getTracks().forEach(tr => { try { tr.stop(); } catch(e){} });
    if(sig.aborted || !el.isConnected){ release(); throw ABORT; }
    const want = pickMime(m => MediaRecorder.isTypeSupported(m));
    let rec;
    try { rec = new MediaRecorder(stream, { mimeType: want, audioBitsPerSecond: BITRATE }); }
    catch(e){ try { rec = new MediaRecorder(stream); } catch(e2){ release(); throw { mic: 'micfail' }; } }
    const chunks = [];
    rec.ondataavailable = e => { if(e.data?.size) chunks.push(e.data); };
    return new Promise((res, rej) => {
      let t0 = 0, cut = 0, aborted = false, closed = false;
      const guard = setInterval(() => { if(!el.isConnected) onAbort(); }, 250);   // أُغلق المشغّلُ والدورُ قائم
      const end = () => {
        clearTimeout(cut);
        if(rec.state !== 'inactive') try { rec.stop(); return; } catch(e){}
        close();
      };
      const onAbort = () => { aborted = true; end(); };
      const close = () => {
        if(closed) return;
        closed = true;
        clearInterval(guard); clearTimeout(cut);
        release();
        sig.removeEventListener('abort', onAbort);
        stopTurn = null;
        if(aborted) return rej(ABORT);
        const type = baseMime(rec.mimeType || want) || 'audio/webm';
        res(chunks.length ? { blob: new Blob(chunks, { type }), ms: Math.round(performance.now() - t0) } : null);
      };
      rec.onstop = close;
      rec.onerror = () => close();
      rec.onstart = () => { t0 = performance.now(); cut = setTimeout(end, maxMs); live(maxMs); };
      sig.addEventListener('abort', onAbort);
      stopTurn = end;
      try { rec.start(); }
      catch(e){ clearInterval(guard); release(); sig.removeEventListener('abort', onAbort); stopTurn = null; rej({ mic: 'micfail' }); }
    });
  }

  const keep = (map, k, take) => {
    if(map.has(k)) URL.revokeObjectURL(map.get(k).url);
    map.set(k, { url: URL.createObjectURL(take.blob), ms: take.ms, blob: take.blob });
    if(map === echoT) pitch.delete(k);
  };
  const clear = map => { map.forEach(t => URL.revokeObjectURL(t.url)); map.clear(); };

  /* ① سطراً سطراً: صوتُ الطالب ⇐ صوتُه ثمّ الأصلُ للمقارنة.
     🆕 b229 · **والتسجيلُ يبدأ بالضغطة** — طلبُ المالك (٧ نوفمبر): «عند الضغط على ايقونة الميكروفون ان يبدأ التسجيل مباشرة،
     والزر الاخر مخصص لتشغيل الصوت الاصلي فما الداعي لاعادته قبل التسجيل». فلكلّ زرٍّ فعلُه: ▶ يُسمع الأصل متى شاء الطالب،
     والميكروفونُ يسجّل. وكان الأصلُ يُعاد قبل التسجيل (بحرف الخطّة: «يسمع الأصل، ثمّ يسجّل»)، فيُعاد سطرٌ طويلٌ سمعه للتوّ */
  async function echo(k){
    const { sig, primed } = begin();
    try {
      await primed; await ready(sig);
      const sp = L.span(lines(), k, durMs());
      if(!sp) return finish();
      mark(k);
      set('wait');
      const take = await record(P.turnMs((sp.end ?? durMs()) - sp.start, au.playbackRate), sig);
      if(!take) return finish(T.silent);
      keep(echoT, k, take);
      set('back', T.yours);
      await playTake(echoT.get(k).url, sig);
      set('back', T.orig);
      await playSeg(sp.start, sp.end, sig);
      finish();
      analyze(k);                                            // 🆕 b223 · ثمّ خطّا التنغيم بعد المقارنة: يسمع ثمّ يرى
    } catch(e){ fail(e); }
  }

  /* صوتُ الطالب في سطرٍ سجّله — وحده، وخطُّه يعود معه */
  async function solo(k){
    const t = echoT.get(k);
    if(!t) return;
    S.chart = k;
    if(!pitch.has(k)) analyze(k);
    const { sig, primed } = begin();
    try { await primed; mark(k); set('back', T.yours); await playTake(t.url, sig); finish(); }
    catch(e){ fail(e); }
  }

  /* ② تبادلُ الأدوار: أدوارُ الآخرين من الأصل، ودورُه بصوته */
  async function rolePlay(){
    const { sig, primed } = begin();
    clear(roleT);
    try {
      await primed; await ready(sig);
      for(const st of P.rolePlan(lines(), S.role, durMs())){
        if(st.who === 'them'){
          set('play', T.their(lines()[st.ks[0]]?.speaker));
          await playSeg(st.start, st.end, sig, k => { mark(k); say(k); });
          continue;
        }
        mark(st.k);
        set('wait');
        const take = await record(P.turnMs(st.ms ?? 3000, au.playbackRate), sig);
        if(take) keep(roleT, st.k, take);
      }
      S.phase = 'done';
      finish();
    } catch(e){ fail(e); }
  }

  /* ③ الحوارُ بصوته: سطورُه التي سجّلها مكانَ الأصل */
  async function mix(){
    const { sig, primed } = begin();
    try {
      await primed; await ready(sig);
      set('mix', T.mixing);
      for(const st of P.mixPlan(lines(), S.role, k => roleT.has(k), durMs())){
        if(st.who === 'them'){ await playSeg(st.start, st.end, sig, k => mark(k)); continue; }
        mark(st.k);
        await playTake(roleT.get(st.k).url, sig);
      }
      S.phase = 'done';
      finish();
    } catch(e){ fail(e); }
  }

  /* ═══════════ النقر ═══════════ */
  function onClick(e){
    const b = e.target.closest('button[data-p]');
    if(!b || !el.contains(b) || b.disabled) return;
    const p = b.dataset.p, row = b.closest('.al-pli');
    if(p === 'mode'){
      if(S.mode === b.dataset.m) return;
      abort();
      S.mode = b.dataset.m; S.phase = 'idle'; S.msg = S.err = '';
      return draw();
    }
    if(p === 'role'){ S.role = P.roles(lines())[+b.dataset.r] ?? null; S.err = ''; return draw(); }
    if(p === 'go') return S.role != null && rolePlay();
    if(p === 'other'){ S.role = null; S.phase = 'idle'; clear(roleT); return draw(); }
    if(p === 'mix') return mix();
    if(p === 'next') return stopTurn?.();
    if(p === 'stop') return abort(T.stopped);
    if(p === 'echo' && row) return echo(+row.dataset.k);
    if(p === 'mine' && row) return solo(+row.dataset.k);
  }
  el.addEventListener('click', onClick);

  /* مشغّلٌ أُغلق ⇒ لا جلسةَ ولا ميكروفون، وتُترك التسجيلات */
  const dog = setInterval(() => { if(!el.isConnected) destroy(); }, 1000);
  function destroy(){
    clearInterval(dog);
    if(run){ const r = run; run = null; r.abort(); }
    stopTurn = null;
    clear(echoT); clear(roleT); pitch.clear(); orig = null;
    el.removeEventListener('click', onClick);
    try { me.pause(); me.removeAttribute('src'); me.load(); } catch(e){}
    if(hush){ URL.revokeObjectURL(hush); hush = null; }
  }

  return {
    show(){ host.hidden = false; draw(); },
    hide(){ abort(); host.hidden = true; decorate(); },
    redraw: draw
  };
}
