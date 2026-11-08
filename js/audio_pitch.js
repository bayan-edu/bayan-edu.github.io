/* ══════════════════════════════════════════════════════════
   بيان — audio_pitch.js  خطُّ التنغيم: المنطقُ النقيّ (b223 · مختبر الصوتيّات، الخطوة ٦)

   الخطّة (٦ نوفمبر): «وحدةٌ نقيّة لتتبّع ارتفاع الصوت وانخفاضه، تُختبر في node بإشاراتٍ صوتيّة مصنوعة معروفة النتيجة · يُرسم
   المنحنى بالنسبة إلى مدى صوت صاحبه، ويُعرض منحنى الطالب فوق منحنى الأصل للسطر الواحد، وتظهر عليهما مواضع الوقفات». وفي النقاش:
   «وضعُ موجة الصوت بجوار موجة الأصل يبدو مقارنةً ولا يقيس شيئاً … أمّا خطّ التنغيم فيُرسم بالنسبة إلى مدى صوت صاحبه، فيُقارَن
   شكل اللحن لا حدّة الصوت، وهو ما تسمعه الأذن فعلاً». والقياسُ في `tools/audio_pitch.test.mjs`، والرسمُ في `lines_practice.js`.

   ① **الارتفاعُ بـYIN** (de Cheveigné · Kawahara 2002): دالّةُ الفرق، فمتوسّطُها التراكميّ المعيَّر، فأوّلُ انخفاضٍ تحت العتبة
      ثمّ قاعُه، فاستيفاءٌ بقطعٍ مكافئ. وإطارٌ أخفضُ من الأعلى بعشرين ديسيبل لا يُسأل (صمتٌ أو نَفَس) — فالوقفةُ فجوةٌ في الخطّ.
   ② **ثمّ التنظيف** (`clean`): المقطعُ المجهورُ أقصرُ من ثلاثين م.ث يسقط، والقفزةُ بديوانٍ (ضعفٌ أو نصف) تُطوى إلى وسيط
      جوارها — وهو أشهرُ أخطاء التتبّع — ثمّ وسيطُ خمسة إطاراتٍ داخل كلّ مقطع لا عبر الفجوة.
   ③ **والمنحنى بأنصاف النغمات حول وسيط صاحبه** (`semis`): صوتُ الطالب وصوتُ الأصل يختلفان حدّةً، ويُقارَن الشكلُ وحده —
      الصاعدُ صاعدٌ في الصوتين.
   ══════════════════════════════════════════════════════════ */

/* `range` مدى الرسم بأنصاف النغمات حول الوسيط: ±٦ — صعودُ السؤال وهبوطُ الخبر في الإنجليزيّة بين ثلاثٍ وثماني نغمات،
   فيملآن أكثرَ المخطّط، ورجفةُ نغمةٍ أو اثنتين تبقى صغيرة. ⚠️ لا مدى يُحسب من الخطّين: يُكبّر رجفةَ الصوت الرتيب فيبدو صعوداً
   (وكان ±١٠ أوّلاً: هبوطُ ٥٫٨ نغمات ملأ ربعَ الارتفاع — رُئي في لقطة) */
/* 🆕 b230 · و`tailMs` نافذةُ الرسم: السطرُ الأطولُ من ستّ ثوانٍ يُرسم آخرُه وحده — قرارُ المالك (٨ نوفمبر): «عرض آخر 8 ثوان أو
   الطول الموصى به». والموصى به ستّ: الجملةُ في الحوار بين ثانيتين وأربع، وصعودُ السؤال وهبوطُ الخبر في آخر ثانيةٍ منها — وثماني
   ثوانٍ في عرض الهاتف (نحو ثلاثمئة نقطة) ثلاثُ قراءاتٍ للنقطة، فيعود الخطُّ شرائط (رُئي في لقطة المالك لسطرٍ من عشرين ثانية) */
export const PITCH = Object.freeze({ rate: 16000, winMs: 25, hopMs: 10, fmin: 70, fmax: 450, thresh: 0.15, gateDb: -20, minRunMs: 30, range: 6,
                                     tailMs: 6000 });

/* إطارٌ واحد: الترددُ بالهرتز أو null بلا دورٍ واضح. d · dp مخزنان يُعاد استعمالُهما */
function yin(x, off, W, tauMin, tauMax, rate, thresh, dp){
  let run = 0;
  dp[0] = 1;
  for(let tau = 1; tau <= tauMax; tau++){
    let s = 0;
    for(let i = 0; i < W; i++){ const v = x[off + i] - x[off + i + tau]; s += v * v; }
    run += s;
    dp[tau] = run > 0 ? s * tau / run : 1;
  }
  let tau = -1;
  for(let t = tauMin; t <= tauMax; t++){
    if(dp[t] < thresh){ while(t + 1 <= tauMax && dp[t + 1] < dp[t]) t++; tau = t; break; }
  }
  if(tau < 1) return null;
  const a = dp[tau - 1], b = dp[tau], c = tau < tauMax ? dp[tau + 1] : b;
  const den = a + c - 2 * b;
  const sh = den > 0 ? Math.max(-0.5, Math.min(0.5, (a - c) / (2 * den))) : 0;
  return rate / (tau + sh);
}

/* عيّناتٌ أحاديّة ⇒ [{ t, hz }] — t منتصفُ الإطار بالمللي ثانية، وhz null حيث لا صوتَ مجهور */
export function track(samples, rate = PITCH.rate, o = {}){
  const { winMs, hopMs, fmin, fmax, thresh, gateDb } = { ...PITCH, ...o };
  const W = Math.max(8, Math.round(rate * winMs / 1000)), hop = Math.max(1, Math.round(rate * hopMs / 1000));
  const tauMin = Math.max(2, Math.floor(rate / fmax)), tauMax = Math.ceil(rate / fmin);
  const n = samples?.length || 0;
  const frames = n - W - tauMax >= 0 ? Math.floor((n - W - tauMax) / hop) + 1 : 0;
  const rms = new Float32Array(frames);
  let peak = 0;
  for(let f = 0; f < frames; f++){
    let s = 0;
    for(let i = f * hop, e = i + W; i < e; i++){ const v = samples[i]; s += v * v; }
    rms[f] = Math.sqrt(s / W);
    if(rms[f] > peak) peak = rms[f];
  }
  const gate = Math.max(peak * Math.pow(10, gateDb / 20), 1e-3);
  const dp = new Float64Array(tauMax + 1);
  const out = new Array(frames);
  for(let f = 0; f < frames; f++){
    const t = Math.round((f * hop + W / 2) / rate * 1000);
    out[f] = { t, hz: rms[f] >= gate ? yin(samples, f * hop, W, tauMin, tauMax, rate, thresh, dp) : null };
  }
  return out;
}

const median = a => { const s = [...a].sort((x, y) => x - y); return s.length ? s[s.length >> 1] : null; };
/* المقاطعُ المجهورة المتّصلة ⇒ [[i0, i1)] */
function runs(pts){
  const out = [];
  for(let i = 0; i < pts.length;){
    if(pts[i].hz == null){ i++; continue; }
    let j = i;
    while(j < pts.length && pts[j].hz != null) j++;
    out.push([i, j]); i = j;
  }
  return out;
}

/* ② التنظيف ⇒ نقاطٌ جديدة */
export function clean(points, { hopMs = PITCH.hopMs, minRunMs = PITCH.minRunMs } = {}){
  const pts = (points || []).map(p => ({ t: p.t, hz: p.hz ?? null }));
  const minRun = Math.max(1, Math.round(minRunMs / hopMs));
  for(const [a, b] of runs(pts)) if(b - a < minRun) for(let i = a; i < b; i++) pts[i].hz = null;
  /* الديوان: كلُّ إطارٍ يُقابَل بوسيط تسعة حوله (من المجهور)، وما بعُد عنه ضعفاً أو نصفاً يُطوى إليه */
  const raw = pts.map(p => p.hz);
  for(let i = 0; i < pts.length; i++){
    if(raw[i] == null) continue;
    const near = [];
    for(let j = Math.max(0, i - 4); j <= Math.min(pts.length - 1, i + 4); j++) if(raw[j] != null) near.push(raw[j]);
    const m = median(near);
    let h = raw[i];
    if(h > m * 1.7) h /= 2;
    else if(h < m / 1.7) h *= 2;
    pts[i].hz = h;
  }
  /* 🔴 والديوانُ على السطر كلِّه: مقطعٌ مجهورٌ بتمامه على نصف التردّد لا يكشفه الجوار — فجوارُه من المقطع نفسِه. قِيس على
     ملفٍّ حقيقيّ (`l1-a1.mp3` من صفحة bayanclass.com): مقاطعُ من عشرة إطاراتٍ إلى سبعة عشر بـ٨٤ و١١٠ و١٠٥ هـ بين مقاطعَ لقائلةٍ
     واحدة بـ١٨٨–٢٢٨ — وأكثرُها أواخرُ عبارات. والسطرُ لقائلٍ واحد ⇒ يُطوى كلُّ إطارٍ بعُد عن وسيط السطر أكثرَ من ١٫٧٥ (نحو عشر
     نغمات) إليه بالدواوين — وحركةُ الصوت الحقيقيّة في سطرٍ واحد قلّما تبلغ ذلك */
  const gm = median(pts.filter(p => p.hz != null).map(p => p.hz));
  if(gm) for(const p of pts){
    if(p.hz == null) continue;
    while(p.hz > gm * 1.75) p.hz /= 2;
    while(p.hz < gm / 1.75) p.hz *= 2;
  }
  for(const [a, b] of runs(pts)){
    const v = pts.slice(a, b).map(p => p.hz);
    for(let i = a; i < b; i++){
      const w = v.slice(Math.max(0, i - a - 2), Math.min(v.length, i - a + 3));
      pts[i].hz = median(w);
    }
  }
  return pts;
}

/* ③ أنصافُ النغمات حول الوسيط ⇒ { points: [{ t, st }], med, span: [t0, t1] | null } */
export function semis(points){
  const v = (points || []).filter(p => p.hz != null).map(p => p.hz);
  if(v.length < 3) return { points: (points || []).map(p => ({ t: p.t, st: null })), med: null, span: null };
  const med = median(v);
  const pts = points.map(p => ({ t: p.t, st: p.hz != null ? 12 * Math.log2(p.hz / med) : null }));
  const voiced = pts.filter(p => p.st != null);
  return { points: pts, med, span: [voiced[0].t, voiced[voiced.length - 1].t] };
}

/* كلُّه معاً: عيّناتُ السطر ⇒ منحناه */
export const contour = (samples, rate = PITCH.rate, o = {}) => semis(clean(track(samples, rate, o), o));

/* اتّجاهُ آخر السطر: ميلُ الثلث الأخير من المجهور (نصف نغمة في الثانية) ⇒ 'rise' · 'fall' · 'level' · null.
   للقياس — والرسمُ لا يقول للطالب «صاعد» ولا «هابط»: يرى الخطّين ويسمع */
export function ending(c, { part = 0.35, slope = 4 } = {}){
  if(!c?.span) return null;
  const [t0, t1] = c.span, from = t1 - (t1 - t0) * part;
  const pts = c.points.filter(p => p.st != null && p.t >= from);
  if(pts.length < 4) return null;
  const n = pts.length, mx = pts.reduce((a, p) => a + p.t, 0) / n, my = pts.reduce((a, p) => a + p.st, 0) / n;
  let num = 0, den = 0;
  for(const p of pts){ num += (p.t - mx) * (p.st - my); den += (p.t - mx) ** 2; }
  const k = den > 0 ? num / den * 1000 : 0;
  return k > slope ? 'rise' : k < -slope ? 'fall' : 'level';
}

/* 🆕 b230 · آخرُ `ms` من المجهور ⇒ منحنًى بالشكل نفسِه ومعه `trimmed`، **ويُعاد توسيطُه على وسيط النافذة**: وسيطُ السطر كلِّه
   يُزيح آخرَه عن الوسط إن كان أعلى أوّلِه أو أخفض. وما لم يطُل عن النافذة يعود كما هو (`trimmed: false`) */
export function tail(c, ms = PITCH.tailMs){
  if(!c?.span || !(ms > 0) || c.span[1] - c.span[0] <= ms) return c?.span ? { ...c, trimmed: false } : c;
  const from = c.span[1] - ms;
  const pts = c.points.filter(p => p.t >= from);
  const v = pts.filter(p => p.st != null).map(p => p.st);
  if(v.length < 3) return { ...c, trimmed: false };
  const m = median(v);
  const out = pts.map(p => ({ t: p.t, st: p.st != null ? p.st - m : null }));
  const voiced = out.filter(p => p.st != null);
  return { points: out, med: c.med != null ? c.med * Math.pow(2, m / 12) : null,
           span: [voiced[0].t, voiced[voiced.length - 1].t], trimmed: true };
}

/* 🆕 b230 · ونافذةُ الخطّين معاً، **والأصلُ مرجعُها**: إن طال عن `ms` قُصّ إلى آخره، وقُصّ صوتُ الطالب **بالنسبة نفسِها** من
   آخره — فيُقابَل آخرُ الجملة بآخرها ولو اختلف الإيقاع · وما لم يطُل الأصلُ يُرسم الخطّان كاملين: قصُّ أحدهما وحده يُقابل آخرَ
   جملةٍ بجملةٍ كاملة (أصلٌ من خمس ثوانٍ وطالبٌ تمهّل فبلغ سبعاً) · وبلا أصلٍ يُقصّ صوتُ الطالب بالنافذة نفسِها */
export function pair(og, me, ms = PITCH.tailMs){
  if(og?.span){
    const o = tail(og, ms);
    if(!o.trimmed) return { og: o, me: me?.span ? { ...me, trimmed: false } : me, trimmed: false };
    const m = me?.span ? tail(me, (me.span[1] - me.span[0]) * ms / (og.span[1] - og.span[0])) : me;
    return { og: o, me: m, trimmed: true };
  }
  const m = tail(me, ms);
  return { og, me: m, trimmed: !!m?.trimmed };
}

/* 🆕 b230 · تنعيمٌ للرسم وحده: متوسّطٌ متحرّكٌ (±k إطاراً) داخل كلّ مقطعٍ مجهور، ولا يعبر الوقفة — فرجفةُ الإطار لا تُرسم سنّاً */
export function smooth(points, k = 2){
  const pts = points || [];
  const out = pts.map(p => ({ t: p.t, st: p.st }));
  for(let i = 0; i < pts.length;){
    if(pts[i].st == null){ i++; continue; }
    let j = i;
    while(j < pts.length && pts[j].st != null) j++;
    for(let a = i; a < j; a++){
      let s = 0, n = 0;
      for(let b = Math.max(i, a - k); b <= Math.min(j - 1, a + k); b++){ s += pts[b].st; n++; }
      out[a].st = s / n;
    }
    i = j;
  }
  return out;
}

/* 🆕 b230 · هندسةُ الرسم الجديد ⇒ { d, end, segs }: كلُّ مقطعٍ مجهورٍ منحنًى ناعم (Catmull-Rom ⇐ Bézier) لا خطوطٌ مكسورة، وما
   قصُر عن `minMs` يسقط (نُقطٌ تشوّش ولا تحمل لحناً)، و`end` آخرُ نقطةٍ مرسومة — علامةُ آخر الجملة حيث يُقرأ التنغيم.
   والإحداثيّاتُ كـ`path` (الزمنُ عرضاً، وأنصافُ النغمات ارتفاعاً، والعربيُّ من اليمين)، ونقطةُ التحكّم لا تخرج عن المخطّط.
   و`padY` حاشيةُ الأعلى والأسفل وحدهما (فيهما «أعلى» و«أخفض» في المخطّط) — وبلا ذكرٍ هي `pad` */
export function geometry(c, { w = 300, h = 90, pad = 6, padY = pad, range = PITCH.range, hopMs = PITCH.hopMs, rtl = false, minMs = 60, step = 2 } = {}){
  if(!c?.span) return { d: '', end: null, segs: 0 };
  const [t0, t1] = c.span, dt = Math.max(1, t1 - t0);
  const X = t => { const x = pad + (t - t0) / dt * (w - 2 * pad); return rtl ? w - x : x; };
  const Y = st => h / 2 - Math.max(-range, Math.min(range, st)) / range * (h / 2 - padY);
  const f = v => Math.round(v * 10) / 10;
  const cy = v => Math.max(0, Math.min(h, v));
  const runs = [];
  let cur = null, prev = null;
  for(const p of c.points || []){
    if(p.st == null || p.t < t0 || p.t > t1){ cur = null; prev = null; continue; }
    if(!cur || p.t - prev > hopMs * 3){ cur = []; runs.push(cur); }
    cur.push(p); prev = p.t;
  }
  const kept = runs.filter(r => r[r.length - 1].t - r[0].t >= minMs);
  let d = '', end = null;
  for(const r of kept){
    const s = r.filter((_, i) => i % step === 0 || i === r.length - 1).map(p => [X(p.t), Y(p.st)]);
    let seg = `M${f(s[0][0])} ${f(s[0][1])}`;
    for(let i = 0; i < s.length - 1; i++){
      const p0 = s[i - 1] || s[i], p1 = s[i], p2 = s[i + 1], p3 = s[i + 2] || p2;
      seg += ` C${f(p1[0] + (p2[0] - p0[0]) / 6)} ${f(cy(p1[1] + (p2[1] - p0[1]) / 6))} ${f(p2[0] - (p3[0] - p1[0]) / 6)} ${
        f(cy(p2[1] - (p3[1] - p1[1]) / 6))} ${f(p2[0])} ${f(p2[1])}`;
    }
    d += (d ? ' ' : '') + seg;
    end = s[s.length - 1];
  }
  return { d, end: end ? [f(end[0]), f(end[1])] : null, segs: kept.length };
}

/* مسارُ SVG: الزمنُ من أوّل المجهور إلى آخره عرضاً، وأنصافُ النغمات ارتفاعاً (±range حول الوسط) — والفجوةُ تقطع الخطّ
   (إطارٌ غيرُ مجهور، أو بُعدٌ بين نقطتين فوق ثلاثة إطارات). و`rtl` يعكس الزمن لنصٍّ عربيّ.
   📌 b230 · الرسمُ صار بـ`geometry`، وهذا خطٌّ بكلّ إطار بلا تنعيم — يبقى للقياس: نقاطُه الإطاراتُ نفسُها فتُقرأ في الاختبار */
export function path(c, { w = 300, h = 90, pad = 4, range = PITCH.range, hopMs = PITCH.hopMs, rtl = false } = {}){
  if(!c?.span) return '';
  const [t0, t1] = c.span, dt = Math.max(1, t1 - t0);
  const X = t => { const x = pad + (t - t0) / dt * (w - 2 * pad); return rtl ? w - x : x; };
  const Y = st => h / 2 - Math.max(-range, Math.min(range, st)) / range * (h / 2 - pad);
  const f = v => Math.round(v * 10) / 10;
  let d = '', prev = null;
  for(const p of c.points){
    if(p.st == null || p.t < t0 || p.t > t1){ prev = null; continue; }
    d += (prev == null || p.t - prev > hopMs * 3 ? 'M' : 'L') + f(X(p.t)) + ' ' + f(Y(p.st)) + ' ';
    prev = p.t;
  }
  return d.trim();
}
