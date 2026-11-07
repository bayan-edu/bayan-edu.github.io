/* ══════════════════════════════════════════════════════════
   بيان — audio_practice.js  تدرّبُ الطالب بصوته: المنطقُ النقيّ (b222 · مختبر الصوتيّات، الخطوة ٥)

   الخطّة (٦ نوفمبر): «يسمع الأصل، ثمّ يسجّل صوته، ثمّ يسمع الأصل ثانيةً، ويحاكي فور السماع. وتبادل الأدوار: يختار الطالب
   شخصيّة، فتُشغَّل أدوار الآخرين ويُترك له دوره، ثمّ يسمع الحوار كاملاً بصوته فيه». وهنا نصيبُ الحساب، نقيٌّ يُقاس في node
   (`tools/audio_practice.test.mjs`)، والتسجيلُ والتشغيلُ في `lines_practice.js`.

   ① **الأدوارُ لحوارٍ موقَّتٍ كلُّه** (`roles`): سطرٌ بلا موضع لا يُعرف أين ينتهي ما قبله، فيُقطع كلامُ غيره أو يُسمع
      دورُ الطالب نفسُه بصوت الأصل. ومتحدّثٌ واحدٌ لا تبادلَ فيه. والسطرُ بلا قائلٍ (راوٍ) يُسمع دائماً.
   ② **خطّةُ التشغيل خطواتٌ** (`steps`): مقطعٌ من الأصل أو دورٌ للطالب. وأدوارُ الآخرين المتجاورةُ مقطعٌ واحدٌ متّصل —
      فلا قفزةَ في الملفّ بين سطرين يتلو أحدُهما الآخر (والقفزةُ على الهاتف تأخيرٌ مسموع). ونهايةٌ ضبطها المعلّمُ تقطع الاتّصال.
   ③ **مدّةُ الدور من طول السطر** (`turnMs`): مرّةٌ ونصفٌ وزيادةٌ ثابتة، وبسرعة التشغيل — والطالبُ يُنهي دوره قبلها متى شاء.
   ══════════════════════════════════════════════════════════ */
import * as L from './audio_lines.js';

/* الدورُ: ١٫٦ من زمن السطر وثانيةٌ ونصف، بين ثانيتين ونصف ونصفِ دقيقة */
export const TURN = Object.freeze({ k: 1.6, extra: 1500, min: 2500, max: 30000 });

/* زمنُ دور الطالب بالمللي ثانية لسطرٍ زمنُه spanMs في الأصل، و`rate` سرعةُ التشغيل (الأبطأُ يطيل الدور) */
export function turnMs(spanMs, rate = 1){
  const r = Number.isFinite(rate) && rate > 0 ? rate : 1;
  const s = Number.isFinite(spanMs) && spanMs > 0 ? spanMs / r : 0;
  return Math.round(Math.min(TURN.max, Math.max(TURN.min, s * TURN.k + TURN.extra)));
}

/* القائلون الذين يُتبادل معهم الدور بترتيب ظهورهم — أو [] حيث لا تبادل: سطرٌ بلا موضع، أو أقلُّ من قائلَين */
export function roles(lines){
  const ls = lines || [];
  if(!ls.length || ls.some(l => l.start == null)) return [];
  const who = L.tally(ls).speakers;
  return who.length >= 2 ? who : [];
}

/* السطورُ التي يُتدرَّب عليها سطراً سطراً: كلُّ سطرٍ موقَّت ⇒ أرقامُها */
export const echoable = lines => (lines || []).map((l, k) => l.start != null ? k : -1).filter(k => k >= 0);

/* خطّةُ التشغيل: `mine(k)` يقول أيُّ السطور للطالب ⇒ خطوات:
   { who: 'me', k, ms }              — دورُه: زمنُ السطر في الأصل (أو null إن لم يُعرف آخرُ الملفّ)
   { who: 'them', ks, start, end }   — مقطعٌ من الأصل يضمّ السطورَ ks، و`end` null حتى آخر الملفّ
   والسطرُ بلا موضعٍ لا خطوةَ له (و`roles` لا تُتيح التبادلَ حيث وُجد) */
export function steps(lines, mine, durMs = Infinity){
  const out = [];
  (lines || []).forEach((l, k) => {
    const sp = L.span(lines, k, durMs);
    if(!sp) return;
    if(mine(k, l)){ out.push({ who: 'me', k, ms: sp.end != null ? sp.end - sp.start : null }); return; }
    const prev = out[out.length - 1];
    if(prev && prev.who === 'them' && prev.end != null && prev.end === sp.start){ prev.end = sp.end; prev.ks.push(k); return; }
    out.push({ who: 'them', ks: [k], start: sp.start, end: sp.end });
  });
  return out;
}

/* التبادلُ بدور `role`: سطورُه للطالب، وما سواها من الأصل */
export const rolePlan = (lines, role, durMs) => steps(lines, (k, l) => !!l.speaker && l.speaker === role, durMs);

/* الحوارُ بصوت الطالب بعد التبادل: سطرُه الذي سجّله بصوته (`has(k)`)، وسطرُه الذي فاته بصوت الأصل فلا ينقطع الحوار */
export const mixPlan = (lines, role, has, durMs) =>
  steps(lines, (k, l) => !!l.speaker && l.speaker === role && has(k), durMs);
