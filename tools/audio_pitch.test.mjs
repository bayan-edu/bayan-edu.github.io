// قياسُ audio_pitch.js (b223 · مختبر الصوتيّات ٦) — بإشاراتٍ مصنوعة معروفةِ النتيجة، كما تشترط الخطّة:
// نغمةٌ صافية · نغمةٌ بتوافقيّات (لا خطأ ديوان) · صاعدٌ كالسؤال وهابطٌ كالخبر · صمتٌ وضجيج · وقفةٌ تقطع الخطّ ·
// والصوتُ نفسُه بحدّتين يعطي الشكلَ نفسَه · وقفزةُ ديوانٍ تُطوى · والسرعة.   node tools/audio_pitch.test.mjs
import { join, dirname } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const P = await import(pathToFileURL(join(ROOT, 'js/audio_pitch.js')));

let bad = 0, n = 0;
const ok = (name, cond, extra = '') => { n++; if(!cond) bad++; console.log(cond ? '✅' : '❌', name, cond ? '' : extra); };
const R = P.PITCH.rate;

/* الإشارة: قطعٌ متتالية [نوع، م.ث، تردّدٌ أوّل، تردّدٌ آخر] — والطورُ متّصلٌ فلا طقّة عند تغيّر التردّد */
let seed = 11;
const rnd = () => (seed = (seed * 1103515245 + 12345) % 2147483648) / 2147483648 - 0.5;
function signal(parts, harm = [1]){
  const out = []; let ph = 0;
  for(const [k, ms, f0, f1 = f0] of parts){
    const m = Math.round(R * ms / 1000);
    for(let i = 0; i < m; i++){
      if(k === 's'){ out.push(0); continue; }
      if(k === 'n'){ out.push(0.5 * rnd()); continue; }
      const f = f0 * Math.pow(f1 / f0, i / m);           // انزلاقٌ أُسّيّ: خطٌّ مستقيم بأنصاف النغمات
      ph += 2 * Math.PI * f / R;
      let v = 0; harm.forEach((a, j) => { v += a * Math.sin((j + 1) * ph); });
      out.push(0.3 * v / harm.reduce((s, a) => s + a, 0));
    }
  }
  return Float32Array.from(out);
}
const voicedHz = pts => pts.filter(p => p.hz != null).map(p => p.hz);
const within = (v, x, rel) => Math.abs(v - x) <= x * rel;

/* ① نغمةٌ صافية */
const t200 = P.track(signal([['t', 500, 200]]));
const v200 = voicedHz(t200);
ok('نغمةٌ صافية ٢٠٠ هـ: كلُّ إطارٍ مجهور', v200.length === t200.length && t200.length > 40, `${v200.length}/${t200.length}`);
ok('…وتردّدُه ٢٠٠ ± ١٪', v200.every(h => within(h, 200, 0.01)), JSON.stringify(v200.slice(0, 5)));

/* ② بتوافقيّات خمس — والأساسُ أضعفُ من الثاني: موضعُ خطأ الديوان */
const h150 = P.contour(signal([['t', 600, 150]], [0.6, 1, 0.7, 0.5, 0.3]));
ok('بتوافقيّات والأساسُ أضعف ⇒ ١٥٠ لا ٣٠٠', within(h150.med, 150, 0.02), String(h150.med));
ok('…وكلُّ إطارٍ على نصف نغمةٍ من الوسيط', h150.points.filter(p => p.st != null).every(p => Math.abs(p.st) < 0.5));

/* ③ صاعدٌ كالسؤال · هابطٌ كالخبر · مستوٍ */
const up = P.contour(signal([['s', 100], ['t', 1000, 150, 250], ['s', 100]], [1, 0.5, 0.25]));
const dn = P.contour(signal([['s', 100], ['t', 1000, 250, 150], ['s', 100]], [1, 0.5, 0.25]));
const lv = P.contour(signal([['s', 100], ['t', 1000, 180], ['s', 100]], [1, 0.5, 0.25]));
ok('الصاعد ⇒ rise', P.ending(up) === 'rise', P.ending(up));
ok('الهابط ⇒ fall', P.ending(dn) === 'fall', P.ending(dn));
ok('المستوي ⇒ level', P.ending(lv) === 'level', P.ending(lv));
const firstLast = c => { const v = c.points.filter(p => p.st != null); return [v[0].st, v[v.length - 1].st]; };
const [u0, u1] = firstLast(up);
ok('الصاعد يبدأ تحت الوسيط وينتهي فوقه بنحو ثماني نغمات و٨٤٪', u0 < -3.5 && u1 > 3.5 && within(u1 - u0, 12 * Math.log2(250 / 150), 0.12), `${u0} ${u1}`);
ok('الكلامُ بين الصمتين: البدءُ بعد ٩٠ م.ث والنهايةُ قبل ١١١٠', up.span[0] >= 90 && up.span[0] <= 140 && up.span[1] >= 1040 && up.span[1] <= 1110, JSON.stringify(up.span));

/* ④ الصمتُ والضجيج */
const sil = P.contour(signal([['s', 600]]));
ok('الصمتُ لا منحنى له', sil.span === null && sil.med === null && P.path(sil) === '');
const noi = P.track(signal([['n', 800]]));
ok('الضجيجُ لا دورَ فيه: أقلُّ من عُشر الإطارات مجهور', voicedHz(noi).length < noi.length * 0.1, `${voicedHz(noi).length}/${noi.length}`);

/* ⑤ الوقفةُ فجوةٌ في الخطّ */
const gap = P.contour(signal([['t', 400, 160], ['s', 300], ['t', 400, 220]], [1, 0.5]));
const d = P.path(gap, { w: 300, h: 90 });
ok('نغمتان بينهما وقفة ⇒ خطّان (M مرّتين)', (d.match(/M/g) || []).length === 2, d.slice(0, 60));
ok('…والثانيةُ أعلى (y أصغر) بنحو ستّ نغمات', (() => {
  const segs = d.split('M').filter(Boolean).map(s => s.trim().split(/\s*L\s*/).map(p => +p.split(' ')[1]));
  return segs[1][2] < segs[0][2] - 15;
})());

/* ⑥ الصوتُ نفسُه بحدّتين — صوتُ طالبٍ وصوتُ الأصل — يعطي الشكلَ نفسَه بأنصاف النغمات */
const lo = P.contour(signal([['t', 900, 120, 200]], [1, 0.6, 0.3]));
const hi = P.contour(signal([['t', 900, 240, 400]], [1, 0.6, 0.3]));
const at = (c, r) => { const v = c.points.filter(p => p.st != null); return v[Math.min(v.length - 1, Math.round(r * (v.length - 1)))].st; };
const diff = [0.1, 0.3, 0.5, 0.7, 0.9].map(r => Math.abs(at(lo, r) - at(hi, r)));
ok('الحدّتان ⇒ الشكلُ نفسُه (فرقٌ أقلُّ من نصف نغمة)', diff.every(x => x < 0.5), JSON.stringify(diff.map(x => x.toFixed(2))));
ok('…ووسيطاهما على نسبة الديوان', within(hi.med / lo.med, 2, 0.03), `${lo.med} ${hi.med}`);

/* ⑦ التنظيف: قفزةُ ديوانٍ تُطوى، ومقطعٌ أقصرُ من ثلاثين م.ث يسقط */
const pts = Array.from({ length: 30 }, (_, i) => ({ t: i * 10, hz: 200 }));
pts[12].hz = 400; pts[20].hz = 100; pts[27] = { t: 270, hz: null }; pts[29] = { t: 290, hz: null };
const cl = P.clean(pts);
ok('قفزتا ديوانٍ تُطويان إلى ٢٠٠', cl[12].hz === 200 && cl[20].hz === 200, `${cl[12].hz} ${cl[20].hz}`);
ok('إطارٌ مجهورٌ وحده بين فجوتين يسقط', cl[28].hz === null);
const blip = P.clean([{ t: 0, hz: null }, { t: 10, hz: 180 }, { t: 20, hz: 182 }, { t: 30, hz: null }]);
ok('مقطعٌ من إطارين (٢٠ م.ث) يسقط', blip.every(p => p.hz === null));
/* ما قيس على ملفٍّ حقيقيّ: قائلةٌ بنحو ٢٠٠–٢٣٠ هـ، ومقاطعُ كاملةٌ بين الوقفات على نصف التردّد (٨٤ · ١١٠ · ١٠٥) — لا يكشفها الجوار */
const real = [];
const add = (n, hz) => { for(let i = 0; i < n; i++) real.push({ t: real.length * 10, hz }); };
add(13, 188); add(8, null); add(17, 84); add(30, null); add(20, 205); add(8, null); add(12, 110); add(10, null); add(24, 217); add(8, null); add(10, 105); add(30, null); add(26, 228);
const rc = P.clean(real), rv = rc.filter(p => p.hz != null).map(p => p.hz);
ok('مقاطعُ كاملةٌ على نصف التردّد تُطوى إلى ديوان السطر (١٦٨ · ٢٢٠ · ٢١٠)', rv.every(h => h > 150 && h < 240)
   && rc[13 + 8 + 5].hz === 168 && Math.round(rc.find(p => p.t === (13 + 8 + 17 + 30 + 20 + 8 + 3) * 10).hz) === 220, JSON.stringify([...new Set(rv.map(Math.round))]));
const glide = Array.from({ length: 60 }, (_, i) => ({ t: i * 10, hz: 150 * Math.pow(250 / 150, i / 59) }));
ok('…وانزلاقٌ حقيقيٌّ بنحو تسع نغمات لا يُمسّ', P.clean(glide).every((p, i) => Math.abs(p.hz - glide[i].hz) < glide[i].hz * 0.02));

/* ⑧ الرسم */
const pu = P.path(up, { w: 300, h: 90, pad: 4 });
const xs = pu.split(/[ML]/).filter(Boolean).map(s => s.trim().split(' ').map(Number));
ok('المسارُ من الحافّة إلى الحافّة (٤ ⇐ ٢٩٦)', xs[0][0] === 4 && xs[xs.length - 1][0] === 296, `${xs[0][0]} … ${xs[xs.length - 1][0]}`);
ok('…والصاعدُ ينزل في إحداثيّ y (أعلى الشاشة)', xs[xs.length - 1][1] < xs[0][1]);
const pr = P.path(up, { w: 300, h: 90, pad: 4, rtl: true }).split(/[ML]/).filter(Boolean).map(s => s.trim().split(' ').map(Number));
ok('وفي العربيّ يبدأ الزمنُ من اليمين', pr[0][0] === 296 && pr[pr.length - 1][0] === 4);
const big = P.path({ span: [0, 100], points: [{ t: 0, st: 30 }, { t: 10, st: -30 }] }, { w: 300, h: 90, pad: 4, range: 10 });
ok('ما جاوز المدى يُقصّ عند الحافّة', big === 'M4 4 L33.2 86', big);

/* ⑧ب 🆕 b230 · النافذةُ والتنعيمُ والرسمُ الجديد */
/* والصعودُ الأخير ٨٫٤ نغمات في ثانيةٍ ونصف — فوق حدّ `ending` (أربعٌ في الثانية). وكان أوّلاً ١٧٠⇐٢٤٠ في ثانيتين ونصف (٢٫٤ في
   الثانية) فقِيس «مستوياً» قبل القصّ وبعده: خطأ الاختبار لا الدالّة */
const longC = P.contour(signal([['t', 3000, 150, 150], ['s', 300], ['t', 4000, 260, 160], ['s', 300], ['t', 1500, 160, 260]], [1, 0.5, 0.25]));
const tl = P.tail(longC, 6000);
ok('سطرٌ من عشر ثوانٍ ⇒ آخرُ ستّ وحدها', tl.trimmed === true && tl.span[1] === longC.span[1] && tl.span[1] - tl.span[0] <= 6000
   && tl.span[1] - tl.span[0] > 5500, JSON.stringify([longC.span, tl.span]));
const tv = tl.points.filter(p => p.st != null).map(p => p.st).sort((a, b) => a - b);
ok('…ومعادٌ توسيطُه على وسيط نافذته', Math.abs(tv[tv.length >> 1]) < 0.01, String(tv[tv.length >> 1]));
ok('…والصاعدُ في آخره صاعدٌ بعد القصّ', P.ending(tl) === 'rise');
ok('سطرٌ قصير ⇒ كما هو بلا قصّ', P.tail(up, 6000).trimmed === false && P.tail(up, 6000).points === up.points);
ok('ولا منحنى ⇒ لا شيء', P.tail(sil, 6000) === sil);
const jag = Array.from({ length: 40 }, (_, i) => ({ t: i * 10, st: i === 20 ? null : (i % 2 ? 1 : -1) }));
const sm = P.smooth(jag);
const varOf = a => { const v = a.filter(p => p.st != null).map(p => p.st); const m = v.reduce((x, y) => x + y, 0) / v.length; return v.reduce((x, y) => x + (y - m) ** 2, 0) / v.length; };
ok('التنعيمُ يُسكّن الرجفة', varOf(sm) < varOf(jag) / 4, `${varOf(jag)} ⇒ ${varOf(sm)}`);
ok('…ولا يعبر الوقفة', sm[20].st === null && sm.filter(p => p.st != null).length === 39);
const gm = P.geometry({ span: [0, 1000], points: [
  ...Array.from({ length: 30 }, (_, i) => ({ t: i * 10, st: i / 10 })),           // ٣٠٠ م.ث صاعدة
  ...Array.from({ length: 10 }, (_, i) => ({ t: 300 + i * 10, st: null })),
  ...Array.from({ length: 4 }, (_, i) => ({ t: 400 + i * 10, st: 5 })),           // ٣٠ م.ث — تسقط
  ...Array.from({ length: 10 }, (_, i) => ({ t: 440 + i * 10, st: null })),
  ...Array.from({ length: 51 }, (_, i) => ({ t: 540 + i * 10, st: -i / 10 }))]},    // ٥٠٠ م.ث هابطة إلى آخر المخطّط
  { w: 600, h: 120, pad: 6 });
ok('الرسمُ منحنياتٌ لا خطوط (C)', /C/.test(gm.d) && !/L/.test(gm.d));
ok('…ومقطعُ ثلاثين م.ث يسقط: مقطعان لا ثلاثة', gm.segs === 2 && (gm.d.match(/M/g) || []).length === 2, String(gm.segs));
ok('…وآخرُ نقطةٍ علامةُ آخر الجملة (الحافّة اليمنى، أخفض الوسط)', gm.end[0] === 594 && gm.end[1] > 60, JSON.stringify(gm.end));
ok('…وفي العربيّ آخرُ الجملة في الحافّة اليسرى', P.geometry({ span: [0, 1000], points: Array.from({ length: 101 }, (_, i) => ({ t: i * 10, st: 0 })) },
   { w: 600, h: 120, pad: 6, rtl: true }).end[0] === 6);
ok('…ونقاطُ التحكّم لا تخرج عن المخطّط', (gm.d.match(/-?[\d.]+/g) || []).map(Number).filter((_, i) => i % 2 === 1).every(y => y >= 0 && y <= 120));
ok('…ولا منحنى ⇒ لا رسم', P.geometry(sil).d === '' && P.geometry(sil).end === null);
const gy = P.geometry({ span: [0, 100], points: Array.from({ length: 11 }, (_, i) => ({ t: i * 10, st: 9 })) }, { w: 600, h: 120, pad: 6, padY: 18 });
ok('…و`padY` حاشيةُ الأعلى وحدها: أعلى المدى عند ١٨ والعرضُ بحاشية ٦', gy.end[1] === 18 && gy.end[0] === 594, JSON.stringify(gy.end));

/* ⑧ج 🆕 b230 · نافذةُ الخطّين معاً — والأصلُ مرجعُها */
const meLong = P.contour(signal([['t', 2500, 120], ['s', 300], ['t', 4000, 200, 130], ['s', 300], ['t', 1800, 130, 210]], [1, 0.5, 0.25]));
const pw = P.pair(longC, meLong);
const spanOf = c => c.span[1] - c.span[0];
ok('أصلٌ طويل ⇒ يُقصّ الخطّان', pw.trimmed && pw.og.trimmed && pw.me.trimmed);
ok('…وصوتُ الطالب بالنسبة نفسِها من آخره', within(spanOf(pw.me) / spanOf(meLong), 6000 / spanOf(longC), 0.06),
   `${(spanOf(pw.me) / spanOf(meLong)).toFixed(3)} ≈ ${(6000 / spanOf(longC)).toFixed(3)}`);
const ps = P.pair(up, meLong);
ok('أصلٌ قصير وطالبٌ أطال ⇒ الخطّان كاملان', !ps.trimmed && ps.me.trimmed === false && ps.me.points === meLong.points && ps.og.points === up.points);
const pn = P.pair(null, meLong);
ok('بلا أصل ⇒ صوتُ الطالب بالنافذة نفسِها', pn.trimmed && pn.og === null && spanOf(pn.me) <= 6000 && spanOf(pn.me) > 5500, String(spanOf(pn.me)));
ok('ولا صوتَ ولا أصل ⇒ لا شيء', P.pair(null, sil).trimmed === false && P.pair(null, sil).me === sil);

/* ⑨ وبثمانية آلاف عيّنة — ما يفكّ به المتصفّحُ الأصلَ كلَّه (نصفُ الذاكرة) */
function signalAt(rate, ms, f0, f1 = f0, harm = [1, 0.5, 0.25]){
  const out = [], m = Math.round(rate * ms / 1000); let ph = 0;
  for(let i = 0; i < m; i++){
    ph += 2 * Math.PI * f0 * Math.pow(f1 / f0, i / m) / rate;
    let v = 0; harm.forEach((a, j) => { v += a * Math.sin((j + 1) * ph); });
    out.push(0.3 * v / harm.reduce((s, a) => s + a, 0));
  }
  return Float32Array.from(out);
}
const v8 = voicedHz(P.track(signalAt(8000, 500, 300), 8000));
ok('٨ ك.هـ: نغمةُ ٣٠٠ هـ ± ١٪ (صوتُ طفلٍ أو امرأة)', v8.length > 40 && v8.every(h => within(h, 300, 0.01)), JSON.stringify(v8.slice(0, 4)));
const v8lo = voicedHz(P.track(signalAt(8000, 500, 90), 8000));
ok('٨ ك.هـ: نغمةُ ٩٠ هـ ± ١٪ (صوتُ رجل)', v8lo.length > 30 && v8lo.every(h => within(h, 90, 0.01)), JSON.stringify(v8lo.slice(0, 4)));
ok('٨ ك.هـ: الصاعدُ صاعدٌ والهابطُ هابط', P.ending(P.contour(signalAt(8000, 1000, 160, 260), 8000)) === 'rise'
   && P.ending(P.contour(signalAt(8000, 1000, 260, 160), 8000)) === 'fall');

/* ⑩ السرعة: خمسُ ثوانٍ في أقلَّ من ثانية ونصف */
const long = signal([['t', 5000, 140, 210]], [1, 0.6, 0.4, 0.2]);
const t0 = Date.now(); P.contour(long); const tm = Date.now() - t0;
ok('خمسُ ثوانٍ من الكلام في أقلَّ من ١٥٠٠ م.ث', tm < 1500, tm + ' م.ث');

console.log(`\n${bad ? '❌' : '✅'} ${n - bad} / ${n}`);
process.exit(bad ? 1 : 0);
