/* ══════════════════════════════════════════════════════════
   بيان — audio_lines.js  سطورُ المقطع الصوتيّ: المنطقُ النقيّ (197 · مختبر الصوتيّات، الخطوة ١)

   الحوارُ مقطعٌ صوتيٌّ له سطور — لا نوعَ مصدرٍ جديد (حكمُ المالك · ٦ نوفمبر). والسطرُ نصٌّ وقائلٌ وموضعٌ في الملفّ،
   وبيتُه في القاعدة `audio_lines` بمفتاح الملفّ (197 ①). وهذا الملفُّ ما تشترك فيه لوحةُ المعلّم (`lines_panel.js`)
   ومشغّلُ الطالب (`student.js`): من النصّ إلى السطور، ومن النقرة إلى الموضع، ومن الزمن إلى السطر. لا DOM فيه ولا
   شبكة، فيُقاس في node كما يُشحن (`node tools/audio_lines.test.mjs`).

   🔑 **والمسطرةُ مسطرةُ القاعدة حرفاً** (`save_item_lines` · 197 ⑤): الحدودُ ورسائلُها هنا نسخةٌ للراحة — يُقال
      للمعلّم ما سيُردّ قبل أن يُرسل — والحارسُ هناك. والقياسُ يقرأ ملفّ 197 فيفحص أنّ الرسائل لم تفترق.
   ══════════════════════════════════════════════════════════ */

export const LIMITS = Object.freeze({ lines: 400, text: 1000, speaker: 40, ms: 3600000 });

/* ردُّ فعل اليد: النقرةُ عند سماع أوّل السطر تتأخّر عنه نحو عُشرَي ثانية، فيُقدَّم الموضعُ بقدرها — وإلّا بدأ
   السطرُ المُعاد من وسط كلمته الأولى. والتقديمُ والتأخيرُ بعدها بيد المعلّم (`nudge`). */
export const LEAD_MS = 150;

const ARD = s => String(s).replace(/[0-9]/g, d => '٠١٢٣٤٥٦٧٨٩'[+d]);
const len = s => [...String(s ?? '')].length;            // بالمحارف لا بوحدات UTF-16 — كـ char_length في القاعدة

/* ═══════════ من النصّ إلى السطور ═══════════ */

/* «Tom: Hello» ⇒ قائلٌ ونصّ. والاسمُ يبدأ بحرف، ويقبل النقطة والفاصلة العليا والشَّرطة («Mrs. Brown» · «O'Neil»)،
   حتى ٤٠ محرفاً، وبعد النقطتين مسافة: فلا يُقرأ «10:30» ولا «https://…» قائلاً. وما لا يطابق سطرٌ بلا قائل. */
const SPEAKER = /^([\p{L}][\p{L}\p{M} .'’-]{0,39}?)\s*:\s+(\S.*)$/u;

export function parseScript(text){
  return String(text || '').replace(/\r\n?/g, '\n').split('\n')
    .map(l => l.replace(/\s+/g, ' ').trim()).filter(Boolean)
    .map(l => {
      const m = l.match(SPEAKER);
      return m ? { speaker: m[1].trim(), text: m[2].trim(), start: null, end: null }
               : { speaker: null, text: l, start: null, end: null };
    });
}

/* والعكس — لمربّع النصّ في اللوحة */
export const scriptText = lines => (lines || []).map(l => (l.speaker ? `${l.speaker}: ` : '') + l.text).join('\n');

/* نصٌّ أُعيد تقسيمُه بعد التوقيت: كلُّ سطرٍ لم يتغيّر يحمل موضعَه، يُبحث عنه إلى الأمام من آخر ما طابق — فإضافةُ سطرٍ
   أو حذفُه لا تُسقط مواضعَ ما بعده، والمواضعُ المحمولةُ تتصاعد كما كانت. وما تغيّر نصُّه يُوقَّت من جديد. */
export function relink(old, fresh){
  let at = 0;
  return (fresh || []).map(l => {
    for(let j = at; j < (old || []).length; j++){
      const o = old[j];
      if(o.text === l.text && (o.speaker || null) === (l.speaker || null)){
        at = j + 1;
        return { ...l, start: o.start ?? null, end: o.end ?? null };
      }
    }
    return { ...l, start: null, end: null };
  });
}

/* ═══════════ بين القاعدة واللوحة ═══════════ */

/* سطورُ `item_lines` (198) ⇒ سطورُ اللوحة والمشغّل. و`text` يغيب عن الطالب ما لم يأذن خيارُ المعلّم ⇒ `null` */
export const fromRows = rows => [...(rows || [])].sort((a, b) => a.n - b.n)
  .map(r => ({ speaker: r.speaker || null, text: r.text ?? null, start: r.start_ms ?? null, end: r.end_ms ?? null }));

/* كشفُ النصّ للطالب — خيارُ المعلّم، والأوّلُ الافتراض (198 ① · حكمُ المالك: «خيار يحدده المعلم … وليس افتراضيا») */
export const REVEAL = Object.freeze({ never: 'لا يُكشف', after: 'بعد الاستماع كاملاً', open: 'متاح للطالب' });
/* 🆕 b220 · ونصُّ الاستماع في الاختبار خيارُ الاختبار لا الملفّ (200 ①): لا يُكشف (الافتراض) · بعد التسليم مع المراجعة */
export const TRANSCRIPT = Object.freeze({ never: 'لا يُكشف', after: 'بعد التسليم، مع المراجعة' });

/* ═══════════ الحوار المولَّد (🆕 b219 · 199 · مختبر الصوتيّات، الخطوة ٢) ═══════════
   أصواتُ Gemini الجاهزة للحوار الإنجليزيّ — نسخةُ العرض من `EN.voices` في الدالّة tts (core.js)، والقياسُ يفحص أنّهما واحد.
   ووصفُ كلّ صوتٍ وصفُ Google له بالعربيّة، وجنسُه للاختيار لا للحكم. والمعلّمُ يختار بأذنه: «توليد» ثمّ «استماع». */
export const DIALOGUE_VOICES = Object.freeze({
  kore:    Object.freeze({ name: 'Kore',    g: 'f', say: 'حازم' }),
  leda:    Object.freeze({ name: 'Leda',    g: 'f', say: 'شابّ' }),
  aoede:   Object.freeze({ name: 'Aoede',   g: 'f', say: 'منساب' }),
  sulafat: Object.freeze({ name: 'Sulafat', g: 'f', say: 'دافئ' }),
  puck:    Object.freeze({ name: 'Puck',    g: 'm', say: 'مرِح' }),
  charon:  Object.freeze({ name: 'Charon',  g: 'm', say: 'رصين' }),
  fenrir:  Object.freeze({ name: 'Fenrir',  g: 'm', say: 'متحمّس' }),
  achird:  Object.freeze({ name: 'Achird',  g: 'm', say: 'ودود' })
});
/* اللهجاتُ الأربع — والبريطانيّةُ والأستراليّةُ «معاينة» عند Google (قُرئت صفحتُه ٦ نوفمبر): قد يتغيّر سلوكُهما */
export const ACCENTS = Object.freeze({ 'en-US': 'أمريكية', 'en-GB': 'بريطانية (تجريبية)', 'en-IN': 'هندية', 'en-AU': 'أسترالية (تجريبية)' });
/* نبراتٌ جاهزة تُرسل بالإنجليزيّة كما تُكتب في التوجيه — والكتابةُ باقيةٌ لما سواها */
export const TONES_EN = Object.freeze(['cheerful', 'hesitant', 'surprised', 'annoyed', 'sarcastic', 'tired', 'excited', 'worried', 'apologetic', 'whispering']);
/* الوقفةُ قبل السطر — بين متحدّثَين أطولُ منها بين سطرين لمتحدّثٍ واحد */
export const GAPS = Object.freeze([200, 400, 700, 1200]);
export const gapFor = (prev, cur) => !prev ? 0 : (prev.speaker && prev.speaker === cur.speaker ? 200 : 400);

/* بصمةُ ما يغيّر صوتَ السطر (نصُّه وقائلُه وصوتُه ولهجتُه ونبرتُه والسطرُ قبله والمشهد) — بها يُعرف أنّ السطرَ تغيّر بعد توليده.
   والدمجُ نصٌّ لا بصمةُ تشفير: يُقارَن بالمحفوظ في المسوّدة (`sig`)، فيكفي أن يختلف باختلافها */
export function lineSig(l, cast, scene, prev){
  const c = (cast || []).find(x => x.name === l.speaker) || {};
  return JSON.stringify([l.text, l.speaker || '', c.voice || '', c.accent || '', l.tone || '', prev?.text || '', scene || '']);
}

export const payload = lines => (lines || []).map(l => ({
  speaker: l.speaker ? String(l.speaker).trim() : null,
  text: String(l.text ?? '').trim(),
  start_ms: l.start ?? null,
  end_ms: l.end ?? null
}));

/* مانعُ الحفظ قبل أن يُرسل — رسائلُ `save_item_lines` بحرفها (والرقمُ هنديّ) — أو null */
export function problem(lines){
  if((lines || []).length > LIMITS.lines) return 'السطور أكثر من ٤٠٠ سطر';
  let prev = -1;
  for(let k = 0; k < lines.length; k++){
    const l = lines[k], no = ARD(k + 1), t = String(l.text ?? '').trim();
    if(!t || len(t) > LIMITS.text) return `السطر ${no} بلا نص، أو أطول من ١٠٠٠ حرف`;
    if(l.speaker && len(String(l.speaker).trim()) > LIMITS.speaker) return `اسم المتحدث في السطر ${no} أطول من ٤٠ حرفاً`;
    const s = l.start ?? null, e = l.end ?? null;
    const bad = v => v !== null && !(Number.isInteger(v) && v >= 0 && v <= LIMITS.ms);
    if(bad(s) || bad(e)) return `زمن السطر ${no} غير صالح`;
    if(e !== null && s === null) return `للسطر ${no} نهايةٌ بلا بداية`;
    if(e !== null && e <= s) return `نهاية السطر ${no} قبل بدايته`;
    if(s !== null){
      if(s <= prev) return `بداية السطر ${no} ليست بعد بداية ما قبله`;
      prev = s;
    }
  }
  return null;
}

/* ═══════════ التوقيت ═══════════ */

const startBefore = (lines, k) => { for(let j = k - 1; j >= 0; j--) if(lines[j].start != null) return lines[j].start; return -1; };
const startAfter  = (lines, k) => { for(let j = k + 1; j < lines.length; j++) if(lines[j].start != null) return lines[j].start; return Infinity; };

/* أوّلُ سطرٍ لم يُوقَّت — وعليه تقع النقرةُ التالية ⇒ رقمُه، أو -1 إن وُقّتت كلُّها */
export const firstUntimed = lines => (lines || []).findIndex(l => l.start == null);

/* النقرةُ عند بداية السطر k وهو يُسمع: الموضعُ قبلها بردّ الفعل (`LEAD_MS`)، ولا يسبق بدايةَ ما قبله. وما بعده ممّا
   لم يعد يأتي بعده يُفرَّغ ليُوقَّت ثانيةً — فلا تتراجع البداياتُ أبداً (حكمُ القاعدة · 197 ⑤). و`lead = 0` لموضعٍ
   اختاره المعلّمُ والمقطعُ واقف («هنا» في اللوحة): لا يدَ تتأخّر عنه. ⇒ سطورٌ جديدة */
export function mark(lines, k, ms, lead = LEAD_MS){
  if(!lines?.[k] || !Number.isFinite(ms)) return lines;
  const s = Math.min(Math.round(Math.max(ms - lead, startBefore(lines, k) + 1, 0)), LIMITS.ms);
  return lines.map((l, j) => j === k ? { ...l, start: s, end: l.end != null && l.end > s ? l.end : null }
    : j > k && l.start != null && l.start <= s ? { ...l, start: null, end: null } : l);
}

/* تقديمٌ أو تأخيرٌ بقدر delta، بين بدايتَي جاريه — لا يتخطّاهما ⇒ سطورٌ جديدة */
export function nudge(lines, k, delta){
  const l = lines?.[k];
  if(!l || l.start == null || !Number.isFinite(delta)) return lines;
  const lo = Math.max(startBefore(lines, k) + 1, 0), hi = Math.min(startAfter(lines, k) - 1, LIMITS.ms);
  const s = Math.min(Math.max(l.start + Math.round(delta), lo), hi);
  return lines.map((x, j) => j === k ? { ...x, start: s, end: x.end != null && x.end > s ? x.end : null } : x);
}

/* يُفرَّغ موضعُ السطر وحده */
export const unmark = (lines, k) => lines.map((l, j) => j === k ? { ...l, start: null, end: null } : l);

/* حدّا السطر k حين يُعاد وحده: من بدايته إلى نهايته إن ضُبطت، وإلّا إلى بداية ما يُوقَّت بعده، وإلّا إلى آخر الملفّ
   (`end: null`) ⇒ { start, end } أو null لسطرٍ لم يُوقَّت */
export function span(lines, k, durMs = Infinity){
  const l = lines?.[k];
  if(!l || l.start == null) return null;
  const end = l.end ?? Math.min(startAfter(lines, k), durMs);
  return { start: l.start, end: Number.isFinite(end) ? end : null };
}

/* السطرُ الجاري عند الزمن ms: آخرُ ما بدأ قبله ⇒ رقمُه، أو -1 قبل أوّلها أو بلا توقيت */
export function lineAt(lines, ms){
  let at = -1;
  for(let k = 0; k < (lines || []).length; k++){
    const s = lines[k].start;
    if(s != null && s <= ms) at = k;
  }
  return at;
}

/* ═══════════ العرض ═══════════ */

/* ٢٦٠٠ ⇒ «0:02.6» — والأرقامُ والفاصلةُ العشريّة تُمرَّران (هنديّةٌ و«٫» في العربيّة) */
export function clockMs(ms, num = String, dot = '.'){
  if(ms == null || !Number.isFinite(ms)) return '—';
  const t = Math.max(0, Math.round(ms / 100)), s = Math.floor(t / 10);
  return num(Math.floor(s / 60)) + ':' + num(String(s % 60).padStart(2, '0')) + dot + num(t % 10);
}

/* العدّ للوحة: السطورُ · الموقَّتُ منها · القائلون بترتيب ظهورهم */
export function tally(lines){
  const who = [];
  for(const l of lines || []) if(l.speaker && !who.includes(l.speaker)) who.push(l.speaker);
  return { lines: (lines || []).length, timed: (lines || []).filter(l => l.start != null).length, speakers: who };
}
