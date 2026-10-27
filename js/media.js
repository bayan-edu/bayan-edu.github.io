/* ══════════════════════════════════════════════════════════
   بيان — media.js
   الوحدة الوحيدة التي تعرف أين تسكن ملفات الوسائط.

   🔒 القاعدة، وهي قابلة للفحص آلياً:
      لا يُبنى رابطُ ملفٍّ في أي موضعٍ آخر. للتحقق:
        grep -rn "storage/v1\|firebasestorage\|r2\.dev\|media\.bayanclass" js/ --exclude=media.js
      لا مخرجات = الطبقة سليمة.

   📐 العقد: القاعدة تخزّن **مفتاحاً** لا عنواناً.
        audio/l12-k3j9fq.mp3      ← بلا وسم: Supabase — البيتُ القديم، يُقرأ منه
        r2:audio/l12-k3j9fq.mp3   ← موسوم: Cloudflare R2 — وإليه كلُّ رفعٍ جديد (b161)
        https://youtube.com/…     ← رابط خارجيّ — يُترك كما هو
      فنقل المستودع لا يمسّ صفاً واحداً في القاعدة، ولا ملفاً
      مُصدَّراً بـJSON. والعنوان يُشتقّ ولا يُخزَّن.

   ℹ️ لا تستورد إلا api.js — وهي ورقةٌ في شجرة الاستيراد، فلا
      دورَ استيراد. وبناءُ رابط Supabase يبقى هناك احتراماً
      لقاعدة «طبقةٌ واحدة تلمس Supabase».
   ══════════════════════════════════════════════════════════ */
import { publicUrl } from './api.js';


/* ═══════════ ① المستودعات ═══════════

   الوسم مفتاحٌ في هذا الكائن. وإضافة مستودعٍ جديد **سطرٌ واحد**
   هنا — لا تُمسّ mediaUrl ولا أي وحدةٍ أخرى.

   وحين يُنقل ملفٌّ إلى مستودعٍ آخر، يُوسَم مفتاحُه **باسمه** لا بشرطٍ عامّ:
     update items set url = 'r2:' || url where url = 'audio/l1-a1.mp3';
   🔴 b159 · ولا «كلَّ ما لا يبدأ بـhttp» — وكان هذا نصَّ المثال هنا:
      `items.url` يحمل أيضاً مساراتِ المحاكيات (`sims/…html`)، وهي ملفّاتٌ
      في مستودع الموقع لا في مخزن ⇒ شرطٌ عامّ يَسِمها فتسقط صامتة (قِيس:
      ثلاثةُ صفوف). والمفتاحُ يسكن أعمدةً عدّة (items.url · passages.media_url
      · questions.audio_url · cards.audio · cards.image …) ⇒ الجردُ قبل الوسم.
   ─────────────────────────────────────────────────────────── */

const HOME = {
  sb: publicUrl,                       // Supabase — بيتُ المفاتيح بلا وسم (القديمة)

  /* 🆕 b159 · Cloudflare R2 — المخزن `bayan-media` على نطاقٍ مخصَّص.
     📐 مسارُ الملفّ في المخزن هو المفتاحُ بلا وسمه:
          r2:audio/l1-a1.mp3  ⇒  https://media.bayanclass.com/audio/l1-a1.mp3
     🔑 🆕 b161 · وإليه يذهب كلُّ رفعٍ من الواجهة: `uploadMedia` في api.js
        تطلب من الدالّة الطرفيّة `r2-sign` رابطاً موقَّعاً لملفٍّ واحد ثمّ
        ترفع إليه مباشرةً — والسرُّ لا يغادر Supabase (والحجّةُ في رأس
        supabase/functions/r2-sign/core.js). وكان قبل b161 «يُقرأ منه ولا
        يُرفع إليه» يوم لم تكن الدالّة.
     ⚠️ ولا r2.dev: عليه حدُّ استعمالٍ متغيّر ولا يصلح للإنتاج — وهو
        معطَّلٌ في المخزن. والنطاقُ يكشف **المخزنَ كلَّه** لا مجلّداً منه
        ⇒ لا يسكنه صوتُ طالبٍ ولا ما يُحرس؛ ذاك مخزنٌ خاصّ تحرسه RLS. */
  r2: k => `https://media.bayanclass.com/${k}`,

  /* مثالٌ جاهز، يُفعَّل يوم الحاجة لا قبلها:
  fb: k => `https://bayan-x.firebasestorage.app/o/${encodeURIComponent(k)}?alt=media`,
     ⚠️ Firebase يشترط ترميز الشرطة (/ → %2F)، وR2 وSupabase لا.
        هذا الاختلاف يُدفن هنا فلا تعرفه بقية المنصة.             */
};

/* بيتُ المفاتيح **بلا وسم** — كلُّ ما رُفع قبل b161. تقرؤه mediaUrl وmediaHome.
   🔴 b161 · ولا يُغيَّر لنقل الرفع: كان هذا الثابتُ نفسُه «مستودعَ الرفع
      الجديد» أيضاً، فلو جُعل 'r2' لانصرف **كلُّ مفتاحٍ قديم بلا وسم** إلى
      R2 حيث لا ملفَّ له — صامتاً. فافترق المعنيان ثابتين: */
const DEFAULT = 'sb';

/* 🆕 b161 · المستودع الذي يستقبل الرفعَ الجديد — ومفتاحُه يُوسَم به
   (`r2:audio/…`) فيبقى يدلّ على بيته مهما تغيّر DEFAULT أو UPLOAD_TO يوماً. */
const UPLOAD_TO = 'r2';

/* الفاصل بين الوسم والمفتاح. صالحٌ لأنه **ممنوعٌ أصلاً** في
   مفاتيح المخزن — ولولا ذلك لالتبس الوسمُ بالمسار. */
const TAG = ':';


/* ═══════════ ② العنوان — يُشتقّ من المفتاح ═══════════ */

/**
 * يحوّل ما هو مخزَّن في القاعدة إلى رابطٍ يعمل.
 * دالةٌ نقيّة: لا حالةَ فيها ولا أثرَ لها خارجها.
 *
 * @param   {string|null} key   المخزَّن في items.url أو passages.media_url
 * @returns {string|null}       رابطٌ صالح · أو null إن تعذّر
 */
export function mediaUrl(key){
  if(!key) return null;

  /* رابطٌ خارجيّ (يوتيوب · Drive · موقع معلّم) — يُمرَّر كما هو.
     نقبل http أيضاً: بياناتٌ قديمة قد تحمله، وردُّها null يُخفي
     المصدر بلا سبب. */
  if(key.startsWith("http")) return key;

  const i = key.indexOf(TAG);

  /* بلا وسم ⇒ المستودع الافتراضي. وهذه حال كل ملفٍّ اليوم. */
  if(i < 1) return HOME[DEFAULT](key);

  const tag  = key.slice(0, i);
  const path = key.slice(i + 1);
  const home = HOME[tag];

  /* وسمٌ لا مستودعَ له: مفتاحٌ نُقل ونُسي تفعيل مستودعه.
     نصيح في السجلّ ولا نكسر الصفحة — درسٌ كاملٌ لا يسقط
     لأجل مصدرٍ واحد، والواجهة تعرض «مصدر غير متاح». */
  if(!home){ console.warn(`[media] مستودع مجهول: "${tag}" في ${key}`); return null; }

  return home(path);
}


/* ═══════════ ③ المفتاح — يُبنى عندنا لا من اسم الملف ═══════════

   اسم الملف على جهاز المعلّم لا يسافر معه. أسبابٌ أربعة:
     ① التصادم — ملفان باسم audio.mp3 يطمس أحدهما الآخر صامتاً
     ② الترميز — الفراغ والعربية تُرمَّز، وكلُّ مستودعٍ يرمّز بطريقة
                  ⇒ اسمٌ يعمل هنا ويكسر بعد النقل
     ③ التخمين — أسماءٌ مرتّبة تُعدّ فيُجمع المحتوى كله
     ④ التسريب — الرابط عام، فـ«تسجيل-مراد-الصف-الثالث.mp3»
                  يُعلن اسم طفلٍ وصفَّه. يظهر أثره مع صوت الطالب.
   ─────────────────────────────────────────────────────────── */

/* قائمةٌ بيضاء: ممنوعٌ ما لم يُجَز — لا العكس.
   فما نسيناه يُرفض برسالةٍ تُقرأ، لا يمرّ بصمت. */
export const AUDIO_EXT = ["mp3", "m4a", "ogg", "wav", "aac"];
export const AUDIO_MAX_MB = 10;

/* 🆕 b135 · والصورة. والقيمتان **مقيستان على المخزن لا مخترعتان**:
   `sql/161` أنشأ `img` بحدٍّ ٢٠٩٧١٥٢ بايتاً وصيغِ `png · jpeg · webp`.
   ⚠️ **ومسطرتان تفترقان**: حدٌّ هنا أوسعُ من حدّ المخزن يُنتج رفعاً
      يُردّ بعد الانتظار، وأضيقُ يمنع ما يقبله. فإن تغيّر المخزنُ
      تغيّرا معاً. */
export const IMG_EXT = ["png", "jpg", "jpeg", "webp"];
export const IMG_MAX_MB = 2;

/**
 * يفحص الملف ويبني مفتاحه. العقد كعقد api.js: { key, error }.
 * الفحص هنا **راحةٌ للمستخدم لا حراسة** — يمنعه من انتظار رفعٍ
 * سيفشل. والحراسة في الخادم (الدالّة الطرفيّة r2-sign تعيد الفحص نفسه
 * وتوقّع النوعَ والحجم)، لأن ما يجري في المتصفح
 * يُتجاوَز بلصق سطر.
 *
 * 🆕 b135 · والنوعان يشتركان في مسطرةٍ واحدة. **ونسختان منها تفترقان**
 *    — فالمخزنُ والصيغُ والحدُّ وسائطُ، والمنطقُ موضعٌ واحد.
 */
function mediaKey(bucket, exts, maxMb, scope, file){
  if(!file) return { key: null, error: "لم يُختر ملف" };

  const ext = (file.name.split(".").pop() || "").toLowerCase().slice(0, 4);
  if(!exts.includes(ext))
    return { key: null, error: `صيغة غير مدعومة — المقبول: ${exts.join(" · ")}` };

  const mb = file.size / 1048576;
  if(mb > maxMb)
    return { key: null,
             /* 🆕 b135 · مصدرٌ لا أمر (هويّةُ اللغة) — وكانت «اضغطه أو
                قصّه» منقولةً من بناء الصوت. والعلاجُ يُسمّى ولا يُؤمَر به.
                ⚠️ والرقمُ لاتينيٌّ بعدُ: media.js وحدةٌ ورقيّةٌ لا تستورد
                   شيئاً، وAR في ui.js التي تستورد منها — فجلبُها دَوْرٌ
                   على ثابتٍ (const) وهو أهشُّ ما في الدوائر. فجوةٌ
                   مكتوبةٌ في STATE، وموضعُها نصٌّ يراه المؤلّف لا الطالب. */
             error: `الملف ${mb.toFixed(1)} م.ب — والحدّ ${maxMb}، `
                  + `والعلاجُ ضغطُه أو قصُّه.` };

  if(!file.size) return { key: null, error: "الملف فارغ" };

  /* ستّ خانات بأساس ٣٦ ⇒ نحو ٢٫٢ مليار احتمال.
     ⚠️ و padEnd لازمة: Math.random قد تُخرج كسراً قصيراً
        (0.5 → "0.i") فتعود الشريحة بحرفين لا ستة.
     ℹ️ عشوائيةٌ تكفي لعدم التكرار، ولا تُقصد لعدم التخمين.
        ويوم يجيء صوت الطالب — حيث الرابط نفسه هو الحارس —
        فالمطلوب crypto.randomUUID() لا هذه. */
  const rand = Math.random().toString(36).slice(2, 8).padEnd(6, "0");

  /* النطاق وسمٌ للقراءة البشرية: l12 درس · q5 اختبار.
     ⚠️ ولا يُعتمد عليه: مصدرٌ يُنقل إلى درسٍ آخر يبقى وسمه قديماً —
        وهذا لا يضرّ، لأنه اسمٌ لا رابط.
     ℹ️ تطهيرٌ لا تحويل: النطاق قد يكون l12 أو q5، فلا يُفترض رقماً.
        وما لا يصلح في رابطٍ يُحذف، فيبقى المفتاح لاتينياً في أي مستودع. */
  const s = String(scope || "x").replace(/[^a-z0-9]/gi, "").slice(0, 8).toLowerCase() || "x";

  /* 🆕 b161 · والوسمُ من UPLOAD_TO — ولا وسمَ إن كان هو البيتَ الافتراضيّ. */
  const tag = UPLOAD_TO === DEFAULT ? '' : UPLOAD_TO + TAG;
  return { key: `${tag}${bucket}/${s}-${rand}.${ext}`, error: null };
}

export const audioKey = (scope, file) =>
  mediaKey("audio", AUDIO_EXT, AUDIO_MAX_MB, scope, file);

export const imageKey = (scope, file) =>
  mediaKey("img",   IMG_EXT,   IMG_MAX_MB,   scope, file);


/* ═══════════ ④ التشغيل والنطق ═══════════

   موضعُهما هنا لا في شاشةٍ بعينها: النطق يُطلب من ثلاث شاشات
   (جلسة الطالب · معاينة المؤلّف · اللعبة)، ومنطقُ «أيّ صوتٍ
   يُسمَع» واحدٌ فيها. ونسختان منه تتفارقان بصمت.

   📐 والعقد المكتوب في 101_card_media_and_note.sql — يُنفَّذ هنا:
        ملفٌّ مرفوع        ⇒ يُسمَع
        لا ملفّ · أجنبية   ⇒ قراءةٌ آليّة من المتصفّح
        لا ملفّ · عربية    ⇒ **لا زرَّ أصلاً**
      والأخير قرارٌ لا اختصار: القراءة الآلية تُسقط الإعراب وتُخطئ
      الحركات، ونطقٌ خاطئ يُحفظ أسوأ من لا نطق.
   ─────────────────────────────────────────────────────────── */

/** يشغّل مفتاحاً مخزَّناً. يعيد false إن تعذّر بناء الرابط. */
export function playAudio(key){
  const url = mediaUrl(key);
  if(!url) return false;
  try{
    /* catch على الوعد لازمة: المتصفّح يرفض التشغيل بلا إيماءةٍ من
       المستخدم، ورفضٌ غيرُ ملتقَط يظهر خطأً أحمر في الطرفية. */
    new Audio(url).play().catch(() => {});
    return true;
  }catch(err){ return false; }
}


/* القائمة تصل **متأخّرةً** في كروم: أوّلُ getVoices() يعود فارغاً،
   ثمّ يُطلق voiceschanged. ⇒ تُقرأ مرّتين: الآن وعند وصولها. */
let VOICES = [];
const loadVoices = () => {
  try{ VOICES = window.speechSynthesis?.getVoices() || []; }
  catch(err){ VOICES = []; }
};
if(typeof window !== 'undefined' && window.speechSynthesis){
  loadVoices();
  window.speechSynthesis.addEventListener
    ? window.speechSynthesis.addEventListener('voiceschanged', loadVoices)
    : (window.speechSynthesis.onvoiceschanged = loadVoices);
}

/* رتبةُ تفضيلٍ بالاسم — فالجهاز يعطي عشرة أصوات وأوّلُها ليس أحسنها.
   ⚠️ وأسماءُ الأصوات ليست معياراً: تتغيّر بتحديث النظام، فالمطابقة
      بجزءٍ من الاسم لا بكامله، والساقطُ يقع على أوّل ما بقي. */
const PREF = [
  /natural/i,                            // Microsoft … (Natural) — أحسنُ ما في ويندوز
  /premium|enhanced/i,                   // 🆕 b155 · أصواتُ آبل المحسَّنة — أعلى من أصلها
  /google (us|uk) english/i,             // كروم وأندرويد
  /samantha|daniel|karen|moira/i,        // أصوات آبل الأصلية
  /microsoft (aria|jenny|guy|ryan)/i
];

/* 🔴 ويُستبعد المعروفُ رداءته: eSpeak على لينكس صوتٌ آليٌّ مشوّه،
      يُعلّم نطقاً خطأً — وهو أسوأ من صمت. */
const BAD = /espeak|pico|compact|eloquence/i;

/* ⚠️ وأندرويد يكتبها `en_US` بشرطةٍ سفلية لا عُليا — ولو لم تُسوَّ
      لسقطت مطابقةُ اللهجة هناك وحدها، صامتةً على كلّ جهازٍ آخر. */
const tagOf = v => String(v?.lang || '').toLowerCase().replace(/_/g, '-');

function bestVoice(lang){
  const pool = VOICES.filter(v => tagOf(v).startsWith(lang) && !BAD.test(v.name || ''));
  for(const re of PREF){ const hit = pool.find(v => re.test(v.name || '')); if(hit) return hit; }
  return pool[0] || null;
}

/**
 * ما اللهجاتُ المتاحةُ فعلاً على هذا الجهاز؟ مصفوفةٌ من { code, label }.
 *
 * 🔑 والعرضُ يتبع المتاح لا المرجوّ:
 *      • اللهجتان ⇒ زرّان موسومان `UK` و`US` — وهو عُرفُ المعاجم
 *        (كامبردج وأكسفورد) فيعرفه متعلّمُ اللغة بلا تعليم.
 *      • واحدةٌ فقط ⇒ **زرٌّ بلا وسم**: وسمٌ لا يقابله اختيار يَعِد
 *        بما ليس هناك، ويُفهم أنّ الأخرى عُطّلت لا أنّها غائبة.
 *      • ولا شيء ⇒ لا زرّ.
 *
 * 🔑 والقائمةُ الفارغة تُقرأ «لم تصل بعد» لا «لا صوت» (كروم يُرسلها
 *    متأخّرةً) ⇒ يُعرض زرٌّ واحدٌ عامّ، فزرٌّ يختفي لأجل تأخّرٍ معروف
 *    أسوأُ من زرٍّ يعتذر مرّةً عند الضغط.
 */
export function accents(lang = 'en'){
  if(typeof window === 'undefined' || !window.speechSynthesis) return [];
  const one = code => [{ code, label: null }];

  if(lang !== 'en') return bestVoice(lang) || !VOICES.length ? one(lang) : [];
  if(!VOICES.length) return one('en');

  const gb = bestVoice('en-gb'), us = bestVoice('en-us');
  if(gb && us) return [{ code: 'en-gb', label: 'UK' }, { code: 'en-us', label: 'US' }];
  if(gb) return one('en-gb');
  if(us) return one('en-us');
  return bestVoice('en') ? one('en') : [];     // en-AU · en-IN · أو عامٌّ بلا بلد
}

/**
 * ينطق نصّاً بلهجةٍ بعينها. يعيد false إن تعذّر — فينادي المنادي رسالته.
 * ويُبطئ قليلاً (0.9): المستمع متعلّمٌ لا ناطق.
 */
export function speak(text, lang = 'en'){
  const t = String(text || '').replace(/\{\{\s*\}\}/g, ' ').trim();
  if(!t || typeof window === 'undefined' || !window.speechSynthesis) return false;
  try{
    window.speechSynthesis.cancel();      // نداءٌ فوق نداءٍ يتداخل صوتُهما
    const u = new SpeechSynthesisUtterance(t);
    const v = bestVoice(lang);
    /* 🔑 وتُضبط u.lang ولو لم يوجد صوتٌ مطابق: المحرّك يختار بها عند
       الغياب، فطلبُ en-GB يُقرَّب إليها بدل أن يقع على الافتراضيّ. */
    if(v) u.voice = v;
    u.lang = v ? v.lang : (lang === 'en' ? 'en-US' : lang);
    u.rate = 0.9;
    window.speechSynthesis.speak(u);
    return true;
  }catch(err){ return false; }
}


/**
 * 🆕 b155 · قراءةُ جملةٍ واحدة بأحسن صوتٍ على الجهاز — للكتاب المقلَّب.
 *
 * 🔑 **جملةً جملة لا النصَّ كلَّه** — وثلاثُ عللٍ مقيسةٍ في المتصفّحات:
 *    ① كروم يقطع النطقَ الطويلَ بعد نحو خمسَ عشرةَ ثانيةً صامتاً.
 *    ② `pause()` و`resume()` لا يُعتمد عليهما على أندرويد وويندوز.
 *    ③ والجملةُ وحدةُ التظليل: الطالبُ يتابع الجملةَ التي تُقرأ بعينه.
 * ⇒ ويعود بـ`false` إن تعذّر، والمنادي يقرّر. ولا يُلغي ما قبله إلا إن كان
 *   يجري فعلاً: الإلغاءُ ثمّ النطقُ فوراً يُسقط الجديدَ على بعض الأنظمة،
 *   فبينهما مهلةٌ قصيرة.
 */
export function narrate(text, { lang = 'en', rate = 0.9, onend, onerror } = {}){
  const t = String(text || '').trim();
  const ss = typeof window !== 'undefined' ? window.speechSynthesis : null;
  if(!t || !ss) return false;
  try{
    const u = new SpeechSynthesisUtterance(t);
    const v = bestVoice(lang);
    if(v) u.voice = v;
    u.lang = v ? v.lang : (lang === 'en' ? 'en-US' : lang);
    u.rate = rate;
    u.onend = () => onend?.();
    u.onerror = e => onerror?.(e?.error || 'error');
    if(ss.speaking || ss.pending){ ss.cancel(); setTimeout(() => ss.speak(u), 60); }
    else ss.speak(u);
    return true;
  }catch(err){ return false; }
}

/** اسمُ الصوت الذي سيُقرأ به — يُعرض تلميحاً ليعرف المعلّمُ ما يسمعه الطالب. */
export const voiceName = (lang = 'en') => bestVoice(lang)?.name || '';

/** إيقافُ كلّ نطقٍ جارٍ — عند المغادرة أو الإيقاف المؤقّت. */
export function hush(){
  try{ window.speechSynthesis?.cancel(); }catch(err){}
}


/* ═══════════ ④-ب الكتابُ المسموع من ملفّات (b198) ═══════════

   العربيّةُ لا تُقرأ بلسان المتصفّح (حكمُ `101` أعلاه)، فصوتُها ملفّات: **تلاوةُ الحصري للآية** اليوم (`quran/husary/`
   في R2 · ٦٢٣٩ ملفّاً طابقت بصماتِ مصدرها · 188)، والصوتُ المولَّدُ المعتمد غداً (⑥-ج في STATE). والكتابُ يسأل عن
   كلّ جملة: ألها صوت؟ ويُشغّله — وهذا الجسرُ يجيب، فلا يعرف الكتابُ مخزناً ولا قارئاً.
   ─────────────────────────────────────────────────────────── */

/* مفتاحُ آيةٍ في التلاوة — «SSSAAA.mp3» كما سمّاه مصدرُها (006151 = الأنعام ١٥١). مفتاحٌ لا رابط: mediaUrl تبنيه */
const husary = f => `r2:quran/husary/${f}`;
export const ayahKey = (surah, ayah) =>
  husary(`${String(surah).padStart(3, '0')}${String(ayah).padStart(3, '0')}.mp3`);
/* والاستعاذةُ والبسملةُ ملفّان في المجلّد نفسِه بأسمائهما في المصدر (قُرئا من قائمة بصماته ونُسخا معه · 188) */
const AUDHU = husary('audhubillah.mp3'), BASMALA = husary('bismillah.mp3');

/**
 * مشغّلُ مقاطع للكتاب: يشغّل واحداً ويُحمّل تاليَه.
 * 🔑 **عنصرٌ واحدٌ يُعاد استعمالُه للتشغيل كلِّه:** iOS يفتح الصوتَ لعنصرٍ لمسه المستخدم، وعنصرٌ جديدٌ لكلّ جملة
 *    يُمنع حين يبدأ من نهاية سابقتها لا من لمسة. والتحميلُ المسبق بعنصرٍ ثانٍ لا يُشغَّل — يملأ ذاكرةَ المتصفّح فحسب.
 * 🔑 و`onstart(ms)` بطول المقطع حين يُعرف (بعد سرعته) — صمّامُ الكتاب يُضبط به لا بعدد الحروف.
 */
export function clipPlayer(){
  let main = null, warm = null, token = 0;
  return {
    prefetch(key){
      const url = mediaUrl(key);
      if(!url) return;
      warm ||= Object.assign(new Audio(), { preload: 'auto' });
      if(warm.src !== url){ warm.src = url; try{ warm.load(); }catch(err){} }
    },
    play(key, { rate = 1, onstart, onend, onerror } = {}){
      const url = mediaUrl(key);
      if(!url) return false;
      main ||= Object.assign(new Audio(), { preload: 'auto' });
      const a = main, my = ++token;
      a.onended = () => { if(my === token) onend?.(); };
      a.onerror = () => { if(my === token) onerror?.('error'); };
      a.onloadedmetadata = () => { if(my === token && isFinite(a.duration)) onstart?.(a.duration * 1000 / rate); };
      a.src = url;
      a.defaultPlaybackRate = a.playbackRate = rate;     // الأولى تبقى بعد تحميل المقطع، والثانيةُ للحال
      /* catch لازمة: رفضٌ غيرُ ملتقَط يظهر خطأً أحمر — و«بلا إيماءة» غيرُ «انقطع بمقطعٍ أحدث» */
      a.play().catch(e => {
        if(my !== token) return;
        onerror?.(e?.name === 'NotAllowedError' ? 'not-allowed' : e?.name === 'AbortError' ? 'interrupted' : 'error');
      });
      return true;
    },
    stop(){ token++; try{ main?.pause(); }catch(err){} }
  };
}

/**
 * صوتُ الكتاب المقلَّب (عقدُه في رأس book.js · `opt.voice`):
 *   الإنجليزيّة ⇒ لسانُ المتصفّح كما كانت (b155) · العربيّة ⇒ ملفّاتٌ لما له ملفٌّ من الجمل، والباقي يُتخطّى.
 * 🔑 **والآيةُ تُتلى إن عُرفت سورةُ كتلتها وطابق مداها ما حُفظ** (`quranRefs` = items.quran_refs · 188 ①): كتلةٌ
 *    تغيّرت آياتُها بعد الحفظ تصمت، ولا تُتلى آيةٌ من غير سورتها — وذاك أسوأُ من الصمت.
 * 🔑 **والتلاوةُ بسرعتها:** مقاديرُ المدّ من الأداء، فلا تسري عليها سرعةُ الكتاب (`rated`).
 * 🔑 **وتُسبق بالاستعاذة، وبالبسملة قبل الآية الأولى من السورة — عدا الفاتحة والتوبة** (قرارُ المالك · ٢٧ أكتوبر):
 *    · الاستعاذةُ لأوّل التلاوة لا لكلّ آية (`run`): تُعاد بعد انقطاعٍ — إيقافٍ أو صوتٍ غيرِ قرآنيّ — ولا تُعاد بين آيتين،
 *      ولا بين كتلتين يصمت ما بينهما (فما قُرئ بينهما شيء).
 *    · والبسملةُ حين تُتلى الآيةُ الأولى نفسُها: من بدأ الاستماعَ من ثالثة الآيات لم يبدأ بأوّل السورة. والفاتحةُ آيتُها
 *      الأولى البسملةُ نفسُها، والتوبةُ بلا بسملة.
 *    · والملفّان نافلةٌ قبل الآية: إن تعذّر أحدُهما مضت الآية، ولا تسقط هي لأجله. والجملةُ المظلَّلةُ أثناءهما الآيةُ نفسُها.
 */
const CLIP_WAIT = 30000;    // مهلةُ تحميل المقطع التالي في سلسلة الجملة الواحدة — ثمّ يحلّ طولُه محلَّها (onstart)
export function bookVoice({ quranRefs = null } = {}){
  const refs = Array.isArray(quranRefs) ? quranRefs : [];
  const clips = clipPlayer();
  let rtl = false, run = false, busy = false, later = null;
  const refOf = s => {
    const q = s?.q, r = q && refs[q.block];
    return r && q.ayah && r.from === q.first && r.to === q.last ? r : null;
  };
  const ayah = s => { const r = refOf(s); return r ? ayahKey(r.surah, s.q.ayah) : null; };

  /* مقاطعُ الجملة الواحدة على التوالي — ويُحمَّل كلٌّ قبل دوره. وما طلب الكتابُ تحميلَه للجملة التالية ينتظر حتى
     يبدأ آخرُ مقاطع هذه (`later`): فالعنصرُ المحمِّلُ واحد، وآيةُ هذه الجملة أولى به من آية التالية. */
  function playSeq(seq, o){
    let k = 0;
    busy = true;
    const step = () => {
      const last = k === seq.length - 1;
      if(last){ busy = false; if(later){ clips.prefetch(later); later = null; } }
      else clips.prefetch(seq[k + 1]);
      return clips.play(seq[k], { rate: 1, onstart: o.onstart,
        onend: () => { if(last) return o.onend?.(); k++; o.onstart?.(CLIP_WAIT); step(); },
        onerror: e => {
          if(last || e === 'not-allowed') return o.onerror?.(e);
          if(e !== 'interrupted'){ k++; step(); }
        } });
    };
    return step();
  }
  const tts = () => typeof window !== 'undefined' && !!window.speechSynthesis;
  return {
    get timed(){ return rtl; },
    available(dir, sents){
      rtl = dir === 'rtl';
      return rtl ? sents.some(s => ayah(s)) : tts();
    },
    has: s => !rtl || !!ayah(s),
    rated: () => !rtl,
    speak(s, o){
      /* والسرعةُ الأساسُ للإنجليزيّة ٠٫٩ كنطق الكلمة: المستمعُ متعلّمٌ لا ناطق (b155) */
      if(!rtl) return narrate(s.text, { lang: 'en', rate: 0.9 * o.rate, onend: o.onend, onerror: o.onerror });
      const r = refOf(s);
      if(!r) return false;
      const seq = run ? [] : [AUDHU];
      if(s.q.ayah === 1 && r.surah !== 1 && r.surah !== 9) seq.push(BASMALA);
      seq.push(ayahKey(r.surah, s.q.ayah));
      run = true;
      return playSeq(seq, o);
    },
    prefetch(s){
      const key = rtl && ayah(s);
      if(!key) return;
      if(busy) later = key; else clips.prefetch(key);
    },
    stop(){ hush(); clips.stop(); run = busy = false; later = null; },
    /* يظهر تلميحاً على الزرّ — ويحمل نسبةَ التلاوة إلى قارئها ومصدرِها */
    name: () => rtl ? 'تلاوة الشيخ محمود خليل الحصري — المصدر: everyayah.com' : voiceName('en')
  };
}

/* ═══════════ ⑤ أدوات صغيرة ═══════════ */

/** أهذا مفتاحٌ نملكه (فيُحذف معه) أم رابطٌ لبيتِ غيرنا؟ */
export const isManaged = v => !!v && !v.startsWith("http");

/** اسم المستودع — للتشخيص ولوحة الصيانة لا للعرض. */
export function mediaHome(key){
  if(!isManaged(key)) return "external";
  const i = key.indexOf(TAG);
  return i < 1 ? DEFAULT : key.slice(0, i);
}
