/* ══════════════════════════════════════════════════════════
   بيان — avatar.js  ·  مُصيِّرُ علامة الحساب

   وحدةٌ نقيّة: **لا تلمس القاعدة ولا تقرأ `S`.** تأخذ ملفّاً شخصياً
   وتُعيد SVG. (الثابت ① — كما `ui.js`.)

   🔑 **والأعمدة تُخزّن الاختيار، وهذه تُشتقّ ما لم يُختَر** (١٢٥):
      اللونُ من `id` · الحرفُ من `full_name` · والإطارُ والشكلُ ثوابتُ بيت.
      **والاشتقاقُ هنا وحده** — نسختان لقاعدةِ اشتقاقٍ واحدة تتفارقان،
      فيرى الطالبُ لونَه يتغيّر بين شاشتين.

   🔴 **والمِدادُ يُقاس ولا يُنقل — وهذا خلافُ ما نصّت عليه الخطّة.**
      طلبت جدولاً مبيَّتاً بثمانٍ وعشرين قيمة مقيسةً من **Cairo**،
      و`index.html` لا يحمّل Cairo أصلاً. وجدولٌ مبيَّتٌ **رقمٌ منقول
      ينحرف** يوم يتغيّر الخطّ أو تُضاف حروفٌ لاتينية. ⇒ يُقاس من الخطّ
      الحيّ بـ`measureText` مرّةً لكلّ حرفٍ في الجلسة، ويُخزَّن في ذاكرةٍ.
      ⚠️ **والخطّ يُنتظَر:** قياسٌ قبل تحميل Almarai يقيس خطَّ الاحتياط
         فيُبيّت خطأً. ⇒ `whenReady()` تُبطل الذاكرةَ مرّةً عند الجاهزية.
      📌 و`dumpMetrics()` تُخرج الجدولَ لمن أراد تبييتَه يوماً.
   ══════════════════════════════════════════════════════════ */

/* ═══════════ ثوابت الرسم ═══════════ */
const FONT_STACK = "'Almarai', sans-serif";
const WEIGHT = 800;
const REF    = 100;          // حجمُ القياس المرجعيّ — الإزاحاتُ تُنسَب إليه
const BOX    = 100;          // صندوقُ viewBox
const SIZE   = 46;           // حجمُ الحرف داخل الصندوق
const SAFE   = 25;           // نصفُ قطرٍ لا يخرج عنه المِداد

/* 🔑 الحضورُ البصريُّ يُقرَّب من هدفٍ واحد **بمعامِلٍ محبوس**: حجمُ خطٍّ
   ثابتٌ يحفظ الثِقَل ويُفرّق الحضور («ا» عمودٌ نحيف و«ش» عريضة —
   مدًى ٣٫٥ أضعافٍ مقيس)، وملءُ صندوقٍ واحدٍ بكلّ حرفٍ يعكس العيب
   فيجعل «ا» عموداً عملاقاً. **والحبسُ هو الحكم لا التقريب.** */
const FIT_LO = 0.86, FIT_HI = 1.22;

export const FRAMES = ['star', 'oct', 'ring', 'none'];
export const SHAPES = ['circle', 'squircle'];
export const AV_N   = 8;


/* ═══════════ ① اشتقاقُ الحرف ═══════════
   قاعدةٌ يملكها المشروع — ولا تُستورد: مكتبةُ `initials` في DiceBear
   أخفقت في ثلاثة مواضع مُختبَرة («الهنوف» ← ا · «عبدالله» ← عا ·
   «إبراهيم» ← إ)، وهي عللٌ في القاعدة لا في التنفيذ. */

/* تشكيلٌ وتطويلٌ ومحارفُ اتّجاه — تُسقَط قبل أيّ حكم */
const NOISE = /[ؐ-ًؚ-ٰٟۖ-ۭـ​-‏‪-‮﻿]/g;

/* تطبيعُ ما يبدأ به الاسمُ فعلاً. والهمزاتُ أصلُها ألف، فـ«إبراهيم»
   و«أحمد» و«آدم» تجتمع على «ا» — وإلا صار للاسم الواحد علامتان
   بحسب كتابة كاتبه. و«ٱ» ألفُ وصلٍ تُكتب في المصاحف. */
const NORM = { 'أ':'ا', 'إ':'ا', 'آ':'ا', 'ٱ':'ا', 'ى':'ي', 'ؤ':'و', 'ئ':'ي', 'ة':'ه' };

const isArabic = c => c >= 'ء' && c <= 'ي';
const isLatin  = c => /[A-Za-z]/.test(c);
const isLetter = c => isArabic(c) || isLatin(c);

/** حرفُ العلامة من الاسم — عربياً كان أو لاتينياً.
 *  ⚠️ **واللاتينيُّ مقصودٌ لا محتمَل:** طلّابٌ يكتبون أسماءهم
 *     `Mahmoud`، فلو رُدَّ «؟» لحملوا علامةَ عطل. */
export function avatarLetter(fullName){
  const s = String(fullName ?? '').replace(NOISE, '').trim();
  if(!s) return '؟';

  for(const word of s.split(/\s+/)){
    /* 🔑 «ال» التعريف تُتجاوز — وإلا حمل كلُّ من عُرّف اسمُه «ا».
       ⚠️ **وثمنٌ معروفٌ يُكتب:** «الياس» تُقرأ «ال + ياس» فتُعطي «ي»،
          وهي ألفُ الاسم لا ألفُ التعريف. ولا تُميَّز بقاعدةٍ آلية —
          **ولهذا وُجد `avatar_letter` تجاوزاً صريحاً** (١٢٥). */
    let w = word;
    if(w.startsWith('ال') && w.length >= 4) w = w.slice(2);

    for(const ch of w){
      if(!isLetter(ch)) continue;              // رقمٌ أو رمزٌ أو علامةُ ترقيم
      if(isLatin(ch))  return ch.toUpperCase();
      return NORM[ch] || ch;
    }
  }
  return '؟';
}


/* ═══════════ ② اشتقاقُ اللون من المعرّف ═══════════
   🔑 **ثابتٌ ومتنوّع.** لونٌ افتراضيٌّ واحد يُخرج كلَّ حسابٍ جديدٍ
      بالعلامة نفسِها، فينقض وظيفةَ الأفاتار في أوّل يوم (رأس `125`).
   ⚠️ **ولا تُبدَّل هذه الدالّةُ بعد أن يراها أحد** — تبديلُها يُغيّر
      لونَ كلِّ من لم يختر، وهو تغييرٌ يقع بلا فعلٍ منه. */
function fnv1a(str){
  let h = 0x811c9dc5;
  for(let i = 0; i < str.length; i++){
    h ^= str.charCodeAt(i);
    h = Math.imul(h, 0x01000193);
  }
  return h >>> 0;
}
export const avatarColor = id => 'av-' + (fnv1a(String(id ?? '')) % AV_N + 1);


/* ═══════════ ③ مِدادُ الحرف — يُقاس ═══════════ */
let _ctx = null, _cache = new Map(), _fontReady = false;

function ctx(){
  if(!_ctx) _ctx = document.createElement('canvas').getContext('2d');
  return _ctx;
}

/** حدودُ الحبر الفعليّ عند الحجم المرجعيّ.
 *  🔑 **لا صندوقُ الـem:** هو واحدٌ لكلّ الحروف، ومِدادُ «ا» عمودٌ
 *     و«ر» يهبط و«د» صغيرة — فالتوسيطُ بالصندوق يضع كلَّ حرفٍ في
 *     موضعٍ مختلفٍ من القرص. والمدى مقيس: «غ» ١٠٦ و«د» ٤٧. */
function ink(ch){
  const hit = _cache.get(ch);
  if(hit) return hit;
  const c = ctx();
  c.font = `${WEIGHT} ${REF}px ${FONT_STACK}`;
  c.textAlign = 'left'; c.textBaseline = 'alphabetic';
  const m = c.measureText(ch);
  const x0 = -m.actualBoundingBoxLeft,   x1 = m.actualBoundingBoxRight;
  const y0 = -m.actualBoundingBoxAscent, y1 = m.actualBoundingBoxDescent;
  const box = { w:x1-x0, h:y1-y0, cx:(x0+x1)/2, cy:(y0+y1)/2 };
  if(_fontReady) _cache.set(ch, box);   // لا يُبيَّت قياسُ خطّ الاحتياط
  return box;
}

const presence = b => Math.sqrt(Math.max(b.w, 0.001) * Math.max(b.h, 0.001));

/* هدفُ الحضور: وسيطُ الهجاء — فلا يُشدّ نصفُه لأعلى ولا نصفُه لأسفل */
const ALPHA = [...'ابتثجحخدذرزسشصضطظعغفقكلمنهوي'];
let _target = 0;
function target(){
  if(!_target || !_fontReady){
    const v = ALPHA.map(ch => presence(ink(ch))).sort((a,b) => a-b);
    _target = v[Math.floor(v.length/2)] || 1;
  }
  return _target;
}

/** يُنتظَر الخطُّ مرّةً، وتُبطَل الذاكرةُ حتى لا يبقى قياسُ الاحتياط. */
export function whenReady(){
  if(_fontReady) return Promise.resolve();
  const fonts = document.fonts;
  if(!fonts) { _fontReady = true; return Promise.resolve(); }
  return fonts.ready.then(() => {
    _fontReady = true; _cache.clear(); _target = 0;
  });
}

/** جدولُ المِداد — لمن أراد تبييتَه أو فحصَه. */
export function dumpMetrics(letters = ALPHA){
  return letters.map(ch => {
    const b = ink(ch);
    return { ch, dx:+(-b.cx).toFixed(2), dy:+(-b.cy).toFixed(2),
             w:+b.w.toFixed(2), h:+b.h.toFixed(2) };
  });
}


/* ═══════════ ④ أطرُ الزخرفة — تُعرَّف مرّةً ═══════════
   تُحقَن في `index.html` وتُستدعى بـ`<use>` من كلّ علامة: قائمةُ
   معلّمين فيها عشرُ علامات تحمل نسخةً واحدة من كلِّ مسار.
   ⚠️ والحدُّ `vector-effect` غيرُ مستعمَل عمداً: الإطارُ يصغر مع
      العلامة فتصغر سماكتُه معها — وإلا صار خيطاً غليظاً عند ٣٢px. */
const pts = (n, R, rot) => Array.from({length:n}, (_, i) => {
  const a = rot + i * 2*Math.PI/n;
  return `${(50 + R*Math.cos(a)).toFixed(2)},${(50 + R*Math.sin(a)).toFixed(2)}`;
}).join(' ');

export function avatarDefs(){
  const R = 38;
  const ring = Array.from({length:8}, (_, i) => {
    const a = i * Math.PI/4;
    return `<circle cx="${(50+R*Math.cos(a)).toFixed(2)}" cy="${(50+R*Math.sin(a)).toFixed(2)}" r="6.2"/>`;
  }).join('');
  return `<defs>
    <g id="avf-star"><polygon points="${pts(4,R,Math.PI/4)}"/><polygon points="${pts(4,R,0)}"/></g>
    <g id="avf-oct"><polygon points="${pts(8,R,Math.PI/8)}"/></g>
    <g id="avf-ring">${ring}</g>
  </defs>`;
  /* 📌 ولا `avf-none`: `renderMark` لا تُصدر `<use>` حين لا إطار، فعنصرٌ
     له هنا **ميتٌ يوهم القارئَ أنّ للـ«بلا إطار» رسماً**. والمولَّدُ
     يطابق الساكنَ في `index.html` بالضبط — وقد فُحص التطابق. */
}


/* ═══════════ ⑤ العلامة ═══════════ */
const esc = s => String(s).replace(/[&<>"]/g, c =>
  ({ '&':'&amp;', '<':'&lt;', '>':'&gt;', '"':'&quot;' }[c]));

/**
 * @param {object} p  ملفٌّ شخصيّ: id · full_name · avatar_* (أيُّها فارغٌ يُشتقّ)
 * @param {number} size  بالبكسل
 */
export function renderMark(p = {}, size = 32){
  const color = p.avatar_color || avatarColor(p.id);
  const frame = FRAMES.includes(p.avatar_frame) ? p.avatar_frame : 'star';
  const shape = SHAPES.includes(p.avatar_shape) ? p.avatar_shape : 'circle';
  const letter = p.avatar_letter || avatarLetter(p.full_name);

  const disc = shape === 'circle'
    ? `<circle cx="50" cy="50" r="50" fill="var(--${color})"/>`
    : `<rect x="0" y="0" width="100" height="100" rx="30" fill="var(--${color})"/>`;

  const b = ink(letter), k = SIZE / REF;
  let sc = Math.min(FIT_HI, Math.max(FIT_LO, target() / presence(b)));
  const need = Math.hypot(b.w * k * sc / 2, b.h * k * sc / 2);
  if(need > SAFE) sc *= SAFE / need;          // حدٌّ صلب: لا يخرج عن الإطار

  const fs = (SIZE * sc).toFixed(2);
  const tx = (50 - b.cx * k * sc).toFixed(2);
  const ty = (50 - b.cy * k * sc).toFixed(2);

  /* 🔴 **و`direction:ltr` لازمةٌ لا زينة:** الصفحةُ كلُّها `rtl`، و
     `text-anchor="start"` فيها يعني **الحافّة اليمنى** — فينزاح الحرفُ
     بعرض مِداده. والقياسُ وقع على قماشٍ يساريّ، فيُثبَّت الاتجاهُ هنا
     ليتطابق المقيسُ والمرسوم. */
  const text = `<text x="${tx}" y="${ty}" font-family="${FONT_STACK}"
      font-weight="${WEIGHT}" font-size="${fs}" text-anchor="start"
      style="direction:ltr" fill="var(--${color}-ink)">${esc(letter)}</text>`;

  const ring = frame === 'none' ? '' :
    `<use href="#avf-${frame}" fill="none" stroke="var(--${color}-ink)"
       stroke-opacity=".45" stroke-width="3.2" stroke-linejoin="round"/>`;

  return `<svg class="av-mark" viewBox="0 0 ${BOX} ${BOX}" width="${size}" height="${size}"
     role="img" aria-label="علامة ${esc(p.full_name || 'الحساب')}" focusable="false"
     >${disc}${ring}${text}</svg>`;
}
