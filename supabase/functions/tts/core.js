/* ══════════════════════════════════════════════════════════
   بيان — tts · core.js
   المنطقُ النقيّ لدالّة التوليد: لا Deno ولا شبكة ولا سرّ — فيُقاس في node كما يُشحن
   (`node tools/tts.test.mjs`)، وتمرّ به التجربةُ الحقيقيّةُ قبل النشر (`tools/tts_trial.mjs`).

   لماذا دالّةٌ طرفيّة رابعة (قرارُ المالك · ٢٨ أكتوبر — STATE ⑥-ج · AGENTS §٠): صوتُ الجملة يولّده Gemini
   بعد تشكيلها، والطلبُ إليه بحساب خدمةٍ لا يسكن المتصفّح.
   🔒 **والخدمةُ للمؤلّفين البالغين وحدهم** — حكمُ المالك على شرط العمر في شروط Google (§20(d)): «التوليد يقوم
      به بالغون، والخدمة لا تصل إطلاقاً لمستخدمي الموقع من الطلاب». ⇒ الحارسُ قبل أيّ نداءٍ لـGoogle (`index.ts`)،
      ولا يبلغ الطالبَ إلا ملفٌّ ثابتٌ في R2 اعتمده معلّم.

   المسارُ لكلّ دفعة (خمسُ جملٍ على الأكثر — والطلبُ يُردّ عليه قبل ١٥٠ ثانية، حدُّ Supabase):
     ① الحارس `voice_problem` بهويّة المستدعي ② ما فيه «﴿ ﴾» يُمسَك بلا صوت (`held`) ③ التشكيل — إلا ما شكّله المؤلّفُ
     أو صحّحه المعلّم ④ فحصُ الحروف ⑤ الوقفُ والابتداء ⑥ الصوت — المقترحُ لكلّ جملة أو ما اختاره المؤلّفُ من اللوحة
     ⑦ الملفّان إلى R2 ⑧ `save_voice` بهويّة المستدعي (189)
   🎧 **وما سمعه المالكُ في الجولتين صاغ ②–⑥** (٢٨ أكتوبر · STATE):
      الأولى — العنوانُ مشكولاً يُقرأ كلمةً كلمة · «ضيفٍ» منوَّناً ⇒ أواخرُ الأعلام ساكنة · الصوتُ يقرأ الكسرةَ في آخر الكلمة
        فتحةً («البكاءِ» · «الأمّةِ») ⇒ الوقفُ بالسكون، والتوجيهُ يُلزمه بالمكتوب · والبطء ⇒ سرعةُ القراءة الطبيعية.
      الثانية — «صيحةْ» سُمعت تاءً ⇒ الموقوفُ عليه هاءٌ في المنطوق · العنوانُ بلا ضبطٍ نُوِّن قبل الشرطة وقُرئ «ابدأ» بالفتح
        ⇒ العنوانُ يُشكَّل، وهمزةُ الوصل بحركتها · والآياتُ بين القوسين «قراءة عادية لا تخلو من خطأ» ⇒ تُمسَك جملتُها ·
        و«صوت Algenib هو الأفضل للشخصية».
      الثالثة — العنوانُ بضبطه التامّ ووقفه، لا خفيفاً («في العنوان: Gemini · Charon — ضبطٌ تامّ») · و«أفضل الأصوات الحالية»
        Charon على Gemini، وIapetus على Chirp 3 HD.
      الرابعة — «لا فروق جوهرية إلا في الشخصية يتفوّق Gemini · Algenib»، وكلٌّ من الراويين أصاب حيث أخطأ الآخر ⇒ «اعتمد خيارات
        المرونة عند التوليد مع التوصية بالصوت المناسب لكلّ» (`VOICES` · `recommend`) — «ولا داعي لتجربة أخرى».
   ══════════════════════════════════════════════════════════ */

export const LIMITS = Object.freeze({ sentences: 5, chars: 2000, spoken: 4000, tone: 200 });

/* الصوتُ الذي اختاره المالكُ بأذنه (٢٧ أكتوبر · `tools/tts_compare.mjs`): Gemini 2.5 Flash بالعربيّة العامّة `ar-001`
   وصوت Charon. و`ar-001` «Preview» عند Google، والبديلُ القريب `ar-EG` بالصوت نفسِه.
   🔴 **والتوجيهُ الأوّل كان يقول «مع ضبط أواخر الكلمات ضبطاً صحيحاً»** — أي بما يراه النموذج، فقرأ «البكاءِ» و«الأمّةِ»
      بالفتح وقد كُتبتا بالكسر. ⇒ الثاني يُلزمه بالمكتوب، ويطلب سرعةَ القراءة الطبيعية لا «الهادئة المتأنّية» (حكمُ المالك:
      «بطء القراءة»). وللكلام المباشر توجيهٌ بصوت قائله وانفعاله (`dialogue`) وصوتُه Algenib (`character`) — اختاره المالكُ
      من ثلاثةٍ في الجولة الثانية.
   ⚠️ **وأصواتُ Gemini الثلاثون واحدةٌ في اللغات كلّها، لا صوتَ عربيّاً فيها** — قائمةُ Google (٢٨ أكتوبر): `ar-001` و`ar-EG`
      بلا أصواتٍ خاصّة. والعربيّةُ عندها في `ar-XA`: Chirp 3 HD بأسماء Gemini نفسِها على نموذجٍ للعربيّة، وWaveNet أربعةٌ
      صُنعت لها من جيلٍ أقدم — جُرّبت في الجولة الثالثة جواباً عن سؤال المالك: «قد تتحسّن القراءة باختيار الصوت العربي الأصلي»،
      فكان Iapetus على Chirp 3 HD (`ar-XA-Chirp3-HD-Iapetus`) مع Charon «أفضلَ الأصوات الحالية» — ويُقارَنان في الرابعة. */
export const TTS = Object.freeze({
  endpoint: 'https://texttospeech.googleapis.com/v1/text:synthesize',
  voice: Object.freeze({ languageCode: 'ar-001', name: 'Charon', model_name: 'gemini-2.5-flash-tts' }),
  prompt: 'اقرأ النصّ التالي بالعربية الفصحى، بنطقٍ واضحٍ وبسرعة القراءة الطبيعية، والتزم بالحركات المكتوبة على كلّ حرفٍ كما هي، ولا سيّما أواخر الكلمات.',
  dialogue: 'اقرأ هذا الكلام المباشر بالعربية الفصحى بصوت قائله وانفعاله كما يدلّ عليه المعنى، وبسرعة الكلام الطبيعية، والتزم بالحركات المكتوبة على كلّ حرفٍ كما هي.',
  label: 'gemini-2.5-flash-tts · ar-001 · Charon',
  character: Object.freeze({ name: 'Algenib', label: 'gemini-2.5-flash-tts · ar-001 · Algenib' })
});

/* والتشكيلُ Gemini 3.8 Flash (قرارُ المالك · ٢٧ أكتوبر — بعد قياسه: ٩٨٫٢٪ من الكلمات · ٩٩٫٢٪ من أواخرها)، والتوجيهُ
   توجيهُ القياس (`tools/tashkeel_eval.mjs`) بزيادات: الجملُ دفعةٌ في JSON بعددها، والسياقُ قبلها للفهم وحده،
   **و«ى» التي تُنطق ياءً تُكتب ياءً في المنطوق وحده** (حكمُ المالك · ٢٨ أكتوبر)، **وأواخرُ الأعلام ساكنة** (حكمُه بعد السماع:
   «الأفضل تسكين نهايات جميع أسماء العلم») — والنصُّ الذي يراه الطالبُ كما كتبه المؤلّف. */
export const TASHKEEL_MODEL = 'gemini-3.8-flash';
export const tashkeelUrl = project =>
  `https://aiplatform.googleapis.com/v1/projects/${project}/locations/global/publishers/google/models/${TASHKEEL_MODEL}:generateContent`;

const TASHKEEL_PROMPT = `شكّل الجمل العربيّة في «sentences» تشكيلاً تامّاً كما تُشكَّل نصوص الكتب المدرسيّة المشكولة: ضع الحركة على كلّ حرفٍ متحرّك، والسكون على كلّ حرفٍ ساكن، والشدّة والتنوين حيث يجبان، واضبط أواخر الكلمات بحسب موقعها من الإعراب.
والجملُ متتاليةٌ من نصٍّ واحد، و«context» ما قبلها: يُقرأ للفهم وحده، فلا يُشكَّل ولا يُعاد. والجملةُ التي معها "verse": true بيتُ شعرٍ عموديٍّ بشطريه، فاضبطه ضبطَ الشعر.
وما شكّله النصُّ من الكلمات فأبقِ تشكيله كما هو.
وسكّن آخرَ كلِّ اسمِ علمٍ — للأشخاص والقبائل والأماكن — ولا تنوّنه، أيّاً كان موقعُه من الإعراب: عَنْتَرَةْ · عَبْسْ · شَوْقِي ضَيْفْ.
لا تغيّر أيّ حرف، ولا ترتيب الكلمات، ولا علامات الترقيم، ولا تحذف شيئاً ولا تضف شيئاً — إلا الألف المقصورة «ى» التي تُنطق ياءً: اكتبها ياءً «ي» (فى ← في · الذى ← الذي · بى ← بي)، وأبقِ «ى» حيث تُنطق ألفاً (على · إلى · الفتى · مستشفى).
أعِد مصفوفةَ JSON بالجمل المشكولة وحدها، بعددها وترتيبها.`;

/* ── الطلب ─────────────────────────────────────────────────
   { item, sentences: [{ text, kind?, spoken?, voice?, lead?, tone? }], context? }
   `text` الجملةُ كما يقسمها الكتاب (`textSentences` · book.js) — وبصمتُها مفتاحُ صوتها (189 ①) · `kind` نوعُها عند الكتاب:
   cover (عنوانُ النصّ) · h (عنوانٌ فرعيّ) · p (نثر — وهو الأصل) · v (بيت) · `spoken` نصٌّ منطوقٌ صحّحه المعلّم فيُتخطّى به
   التشكيل · `voice` صوتٌ من اللوحة (`VOICES`) اختاره المؤلّف، وإلّا فالمقترح (`recommend`) · `lead` الجملةُ قبلها في النصّ — بها يُعرف
   قائلُ الحوار ونبرتُه (`femaleLead` · `voiceFor`) · `tone` نبرةٌ كتبها المؤلّف تغلب ما استُنبط · `context` ما قبل الدفعة من النصّ.
   والحدودُ حدودُ القاعدة: الجملةُ ١–٢٠٠٠ بلا مسافةٍ في طرفيها، ولا «۝» (189 ④) — يُردّ الطلبُ هنا قبل أن يُدفع فيه شيء. */
const KINDS = new Set(['cover', 'h', 'p', 'v']);
const fail = (error, status = 400) => ({ error, status });
export function checkRequest(body){
  const item = Number(body?.item);
  if(!Number.isSafeInteger(item) || item < 1) return fail('رقم النص غير صالح');
  const list = body?.sentences;
  if(!Array.isArray(list) || !list.length) return fail('لا جمل في الطلب');
  if(list.length > LIMITS.sentences) return fail('الدفعة خمس جمل على الأكثر');
  const sentences = [];
  for(const s of list){
    const text = typeof s === 'string' ? s : s?.text;
    if(typeof text !== 'string' || !text || text !== text.trim() || [...text].length > LIMITS.chars)
      return fail('الجملة غير صالحة: فارغة، أو أطول من ٢٠٠٠ حرف، أو في طرفيها مسافة');
    if(text.includes('۝')) return fail('الآيات لا يُولَّد لها صوت: تُتلى بصوت الحصري');
    const kind = s?.kind == null ? 'p' : s.kind;
    if(!KINDS.has(kind)) return fail('نوع الجملة غير معروف');
    let spoken = null;
    if(s?.spoken != null){
      spoken = String(s.spoken).trim();
      if(!spoken || [...spoken].length > LIMITS.spoken) return fail('النص المنطوق فارغ أو أطول من حدّه');
    }
    const voice = s?.voice == null ? null : String(s.voice);
    if(voice !== null && !Object.hasOwn(VOICES, voice)) return fail('الصوت غير معروف');
    const lead = s?.lead == null ? null : String(s.lead).trim().slice(0, LIMITS.chars) || null;
    const tone = s?.tone == null ? null : String(s.tone).replace(/\s+/g, ' ').trim();
    if(tone !== null && (!tone || [...tone].length > LIMITS.tone)) return fail('النبرة فارغة أو أطول من ٢٠٠ حرف');
    sentences.push({ text, kind, spoken, voice, lead, tone });
  }
  const context = typeof body?.context === 'string' ? body.context.slice(0, LIMITS.chars) : '';
  return { item, sentences, context };
}
export const isTitle = s => s.kind === 'cover' || s.kind === 'h';

/* ما بين «﴿» و«﴾» لا يقرؤه الصوت: سمع المالكُ الآيتين في الجولتين «قراءة عادية لا تخلو من خطأ» — والآيةُ تُتلى ولا
   تُقرأ، والقرآنُ «يحتاج إلى وسيلة للتعرّف عليه وتلاوته تلاوة صحيحة». والقوسان لغير القرآن أيضاً (حكمُه · 189)، فلا
   يُعرف القرآنُ بهما وحدهما ⇒ **تُمسَك الجملةُ كلُّها بلا صوت** — لا يُردّ الطلبُ، ولا يُدفع فيها شيء — حتى يُبنى التعرّفُ
   على الآيات بنصّ المصحف وتلاوتُها بصوت الحصري. (اقتراحٌ يُعرض على المالك: جملةٌ بلا صوتٍ خيرٌ من آيةٍ تُقرأ بخطأ.) */
export const QUOTE_HELD = 'فيها نص بين «﴿ ﴾»، فتبقى بلا صوت حتى تُبنى تلاوة الآيات المقتبسة';
export const held = s => s.text.includes('﴿') ? QUOTE_HELD : null;

/* ── ما شكّله المؤلّف ─────────────────────────────────────
   النصوصُ المشكولة أصلاً لا تُرسل إلى التشكيل: تشكيلُ الكتاب هو الحكم — والنموذجُ أخطأ في قياسه ما أصاب فيه الكتاب
   (قوافي أبي الأسود بالتنوين). والفيصلُ كثافةُ الحركات: قِيست ٦٩–٧٩ لكلّ مئة حرفٍ في المشكولة، و١–١٥ في غيرها
   (STATE · ٢٧ أكتوبر) ⇒ النصفُ حدٌّ بينهما بعيدٌ عن الطرفين.  (الحركاتُ: U+064B–U+0652) */
const HARAKA = /[ً-ْ]/g;
const AR_LETTER = /[ء-غف-يٱ-ۓ]/g;
export function voweled(s){
  const letters = (String(s).match(AR_LETTER) || []).length;
  if(!letters) return true;                       // لا حرفَ عربيّاً يُشكَّل
  return (String(s).match(HARAKA) || []).length / letters >= 0.5;
}

/* ومن أين تشكيلُ الجملة — ويُكتب مع الصوت في القاعدة (`voice`). والعنوانُ يُشكَّل كالنثر: بلا تشكيلٍ (الجولة الثانية) نُوِّن
   عند الوقف وقُرئ «ابدأ» «أَبدأ» — والتشكيلُ هو الذي يعرف همزةَ الوصل من القطع. */
export function tashkeelSource(s){
  if(s.spoken !== null) return 'المعلّم';
  return voweled(s.text) ? 'المؤلّف' : TASHKEEL_MODEL;
}
export const voiceLabel = (source, label = TTS.label) => `${label} · تشكيل ${source}`;

/* ── التشكيل ── */
export function tashkeelRequest(sentences, context = ''){
  const payload = { context, sentences: sentences.map(s => s.kind === 'v' ? { text: s.text, verse: true } : { text: s.text }) };
  return {
    contents: [{ role: 'user', parts: [{ text: `${TASHKEEL_PROMPT}\n\n${JSON.stringify(payload)}` }] }],
    generationConfig: { responseMimeType: 'application/json', responseSchema: { type: 'ARRAY', items: { type: 'STRING' } } }
  };
}

/* جوابُ Gemini ⇒ { list } بعدد الجمل، أو { error }. وأجزاءُ التفكير (`thought`) لا تُقرأ */
export function readTashkeel(json, n){
  const c = json?.candidates?.[0];
  const text = (c?.content?.parts || []).filter(p => !p.thought && typeof p.text === 'string').map(p => p.text).join('').trim();
  if(!text) return { error: `جواب التشكيل فارغ (${c?.finishReason || '؟'})` };
  let list;
  try { list = JSON.parse(text.replace(/^```[a-z]*\s*/i, '').replace(/\s*```$/, '')); }
  catch { return { error: 'جواب التشكيل ليس JSON' }; }
  if(!Array.isArray(list) || list.length !== n || !list.every(x => typeof x === 'string' && x.trim()))
    return { error: `جواب التشكيل ${Array.isArray(list) ? list.length : '؟'} جملة لا ${n}` };
  return { list: list.map(x => x.trim()) };
}

/* ── فحصُ الحروف ───────────────────────────────────────────
   المنطوقُ هو المعروضُ بحركاته لا غير: لو غيّر النموذجُ حرفاً لقال الصوتُ كلمةً لا يراها الطالب. فيُقارَن الهيكلان — الحروفُ
   والأرقامُ بلا حركاتٍ ولا تطويلٍ ولا ترقيم — **وثلاثةٌ لا تُعدّ تغييراً:** «ى» و«ي» (حكمُ المالك في المنطوق) · صورُ الألف
   والهمزة عليها (أ إ آ ٱ = ا: الكلمةُ هي هي، والهمزةُ عونٌ على النطق) · والأرقامُ الهنديّة والعربيّة.
   ⚠️ فـ«على» ← «علي» يمرّ هنا ويُسمع خطأً: ذاك خطأُ تشكيلٍ يصحّحه المعلّمُ بالأذن، وهذا الفحصُ عن الكلمات لا عن النطق.
   (العلاماتُ المنزوعة: الحركاتُ U+064B–U+065F · الألفُ الخنجريّة U+0670 · علاماتُ المصحف U+06D6–U+06ED · التطويل U+0640) */
const MARKS = /[ً-ٰٟۖ-ۭـ]/g;
export const skeleton = s => String(s).normalize('NFC').replace(MARKS, '')
  .replace(/[أإآٱ]/g, 'ا').replace(/ى/g, 'ي')
  .replace(/[٠-٩]/g, d => String(d.charCodeAt(0) - 0x660)).replace(/[۰-۹]/g, d => String(d.charCodeAt(0) - 0x6F0))
  .replace(/[^\p{L}\p{N}]+/gu, '');
export const sameLetters = (shown, spoken) => skeleton(shown) === skeleton(spoken);

/* ── الوقفُ والابتداء ──────────────────────────────────────
   سمع المالكُ «عَادَتْ إِلَى الْبُكَاءِ.» بالفتح، و«فِكْرَةَ الأُمَّةِ،» بالفتح — والكسرةُ مكتوبة: الصوتُ لا يلتزم حركةَ آخر الكلمة.
   والقراءةُ الجهريّة تقف عند الترقيم بالسكون، فلا حركةَ هناك تُخطَأ: الكلمةُ قبل «، ؛ : . ! ؟ … —» — ملتصقةً بها أو بينهما
   مسافة — وآخرُ كلمةٍ في الجملة:
     · تنوينُ الفتح ألفٌ تُمدّ: «نَفْضًا» ← «نَفْضَا» · «هُدًى» ← «هُدَى» · «سَمَاءً» ← «سَمَاءَا»
     · والتاءُ المربوطة هاءٌ ساكنة **تُكتب هاءً**: «صَيْحَةٍ» ← «صَيْحَهْ» — كُتبت «صَيْحَةْ» في الجولة الثانية فسمعها المالكُ تاءً
       موصولة، فالسكونُ على التاء لا يكفي الصوت. وكذلك التاءُ الساكنة حيث وقعت: «عَنْتَرَةْ» علماً ساكناً ← «عَنْتَرَهْ»
     · وما سواهما تسقط حركتُه وتنوينُه وتبقى شدّتُه، ويُسكَّن: «الْبُكَاءِ» ← «الْبُكَاءْ» · «الحَقِّ» ← «الحَقّْ» — وحرفُ المدّ كما هو («فِي»).
   والشرطةُ وقفٌ كالترقيم: سُمع «قيمٌ اجتماعيّةٌ — لشوقي ضيف» منوَّناً قبلها (الجولة الثانية). والابتداءُ — أوّلَ الجملة وبعد كلّ
   وقف — همزةُ وصله تُنطق فتُكتب حركتُها (`wasl`)، وفي وسط الكلام تسقط فلا حركةَ عليها.
   ⚠️ ولا يُمسّ ما بين «﴿» و«﴾»، ولا البيتُ (للقافية حكمُها). وفحصُ الحروف قبله، والحروفُ لا تتغيّر إلا في المنطوق وحده:
      الهاءُ مكانَ التاء، وألفُ «سماءا». والوقفُ داخلَ الجملة (حيث لا ترقيم) لا يصلحه هذا: ذاك للتوجيه وللمعلّم. */
const PAUSE = /[،؛:.!؟…\-–—]/;
const TAIL = /^(.*?)([«»"'”“’)\]\-–—،؛:.!؟…]*)$/u;
const HEAD = /^([«"“(\[]*)(.*)$/u;
const lettered = t => /\p{L}/u.test(t);
function waqf(w){
  if(/ً[اى]$/.test(w)) return w.replace(/ً([اى])$/, 'َ$1');
  if(/[اى]ً$/.test(w)) return w.replace(/ً$/, '');
  if(/ءً$/.test(w)) return w.replace(/ً$/, 'َا');
  if(/ة[ً-ْ]*$/.test(w)) return w.replace(/ة[ً-ْ]*$/, 'هْ');
  const m = w.match(/^(.*?)([ً-ْ]+)$/);
  if(!m) return w;
  return m[1] + (m[2].includes('ّ') ? 'ّ' : '') + 'ْ';
}

/* همزةُ الوصل في الابتداء: كسرةٌ، أو ضمّةٌ إن ضُمّ الثالثُ في وسط الكلمة («اُكْتُبْ» · «اُسْتُخْرِجَ») — والأسماءُ («ابن · اسم ·
   اثنان · امرؤ») مكسورةٌ أبداً، ولامُ التعريف يعرفها الصوتُ فلا تُمسّ. ويُعرف الوصلُ بالسكون على الحرف بعد الألف، فلا يكون
   إلا في مشكول. سمع المالكُ «ابدأ» عنواناً بلا ضبطٍ «أَبدأ» (الجولة الثانية) ⇒ «اِبْدَأْ». وما ضبطه التشكيلُ أصلاً يبقى. */
const WASL_NOUN = /^ا(?:بن|سم|ثن|مر)/;
function wasl(w){
  const [, head, body] = w.match(HEAD);
  const m = body.match(/^[اٱ](\p{L})([ً-ْ]*)(?:(\p{L})([ً-ْ]*))?/u);
  if(!m || m[1] === 'ل' || !m[2].includes('ْ')) return w;
  const damma = !WASL_NOUN.test(skeleton(body)) && m[3] && m[4].includes('ُ') && lettered(body.slice(m[0].length));
  return head + 'ا' + (damma ? 'ُ' : 'ِ') + body.slice(1);
}
const unwasl = w => w.replace(/^([«"“(\[]*)ا[َُِ]/u, '$1ا');

export function pausal(text){
  const parts = String(text).split(/(\s+)/);
  const at = parts.flatMap((t, i) => t.trim() ? [i] : []);
  let quran = false, start = true;
  at.forEach((i, k) => {
    const t = parts[i], next = parts[at[k + 1]];
    const opens = t.includes('﴿'), closes = t.includes('﴾');
    const inside = quran || opens;
    if(opens) quran = true;
    if(closes) quran = false;
    const [, word, tail] = t.match(TAIL);
    const stop = PAUSE.test(tail) || k === at.length - 1 || (next !== undefined && !lettered(next) && PAUSE.test(next));
    if(!lettered(word)){ if(PAUSE.test(t)) start = true; return; }
    if(!inside){
      const w = start ? wasl(word) : unwasl(word);
      parts[i] = (stop ? waqf(w) : w.replace(/ةْ$/, 'هْ')) + tail;
    }
    start = stop;
  });
  return parts.join('');
}

/* ما يُرسل إلى الصوت: البيتُ كما شُكّل (للقافية حكمُها) · وما سواه بوقفه وابتدائه، من تشكيل المعلّم أو المؤلّف أو النموذج.
   والعنوانُ كالنثر: سُمع مشكولاً بلا وقفٍ كلمةً كلمة (الأولى)، وبلا ضبطٍ (الثانية)، وخفيفَ الضبط (الثالثة) — واختار المالكُ
   بأذنه ضبطَه التامّ بالوقف: «في العنوان: Gemini · Charon — ضبطٌ تامّ». */
export function spokenFor(s, voweledText){
  return s.kind === 'v' ? voweledText : pausal(voweledText);
}

/* الكلامُ المباشر: سطرٌ يبدأ بشرطة الحوار أو بعلامة تنصيص */
export const isDialogue = text => /^\s*[-–—]\s*\S/.test(text) || /^\s*[«"“]/.test(text);

/* ── لوحةُ الأصوات ──────────────────────────────────────────
   حكمُ المالك بعد الجولة الرابعة (٢٨ أكتوبر): «لا فروق جوهرية إلا في الشخصية يتفوّق Gemini · Algenib»، وكلٌّ من الراويين أصاب
   حيث أخطأ الآخر (الجملةُ الطويلة: Iapetus سليمٌ وCharon أخطأ · وما قبل الآيتين: Charon سليم) ⇒ «اعتمد خيارات المرونة عند
   التوليد مع التوصية بالصوت المناسب لكلّ»: لكلّ جملةٍ صوتٌ مقترح، وللمؤلّف أن يختار غيرَه من اللوحة فيعيد توليدَها إن سمع خطأً.
   · الراوي — **Iapetus على Chirp 3 HD مقترحاً:** لا فرقَ جوهريّاً بالأذن، ثمّ يُولَّد في ثانيةٍ إلى ثلاث بلا حدّ الدقيقة (Gemini
     نحو عشرة طلباتٍ للمشروع كلّه — قِيس)، ولغتُه `ar-XA` لا `ar-001` الذي هو «Preview»، ويقبل إملاءَ النطق. وبديلُه Charon على
     Gemini بتوجيه القراءة
   · الشخصيّة — **Algenib على Gemini** بتوجيه الكلام المباشر
   · **والشخصيّةُ النسائيّة — Gacrux، وAchernar بديلُه** على Gemini بالتوجيه نفسِه: سأل المالكُ «هل يمكن إضافة صوت يستخدم للشخصيات
     النسائية؟» وسمع خمسةً على جملتين لزبيبة (`tools/tts_audition.mjs`) فحكم: «Gacrux والثاني Achernar»، و«نعم تلقائياً» (`femaleLead`).
   والعنوانُ والبيتُ بصوت الراوي، فالنصُّ بصوتٍ واحدٍ إلا حوارَه. */
export const VOICES = Object.freeze({
  iapetus:  Object.freeze({ name: 'ar-XA-Chirp3-HD-Iapetus', label: 'chirp-3-hd · ar-XA · Iapetus' }),
  charon:   Object.freeze({ name: TTS.voice.name, label: TTS.label }),
  algenib:  Object.freeze({ name: TTS.character.name, label: TTS.character.label }),
  gacrux:   Object.freeze({ name: 'Gacrux', label: 'gemini-2.5-flash-tts · ar-001 · Gacrux' }),
  achernar: Object.freeze({ name: 'Achernar', label: 'gemini-2.5-flash-tts · ar-001 · Achernar' })
});
export const NARRATOR = 'iapetus', CHARACTER = 'algenib', FEMALE = 'gacrux';

/* مَن قال سطرَ الحوار: **آخرُ فعلِ قولٍ في الجملة قبله** — «فقالت» · «صاحت» · «قائلة» مؤنّثة، و«فقال» · «صاح» · «قائلاً» مذكّرة. قِيس على `603`
   (٢٨ أكتوبر): ثلاثةَ عشرَ سطراً لزبيبة كلُّها بعد مؤنّث، ولا شيءَ من العشرة التي لعنترة — **فالقولُ هو الحَكَم لا التاء:** «وأخذت تبكي … وقال
   يستعطفها» مذكّر. والمضارعُ لا يُعدّ («تقول» للمخاطَب وللغائبة معاً)، ولا «ردّ» و«سال» (اسمٌ وفعلُ سيلان). والحركاتُ تُنزع، وهمزةُ أوّل الفعل
   تُوحَّد («اجابت» = «أجابت») — وهمزةُ وسطه لا: «سألت» قولٌ و«سالت دموعها» لا. وضميرُ المفعول المتّصل لا يحجبه: «فأجابته» · «سألها». */
const SAY_F = ['قالت', 'صاحت', 'صرخت', 'هتفت', 'همست', 'اجابت', 'ردت', 'سألت', 'نادت', 'تمتمت', 'تابعت', 'اضافت', 'استطردت', 'قائلة'];
const SAY_M = ['قال', 'صاح', 'صرخ', 'هتف', 'همس', 'اجاب', 'سأل', 'نادى', 'تمتم', 'تابع', 'اضاف', 'استطرد', 'قائلا'];
const SAY = new RegExp(`(?<!\\p{L})[فو]?(${[...SAY_F, ...SAY_M].join('|')})(?:ه|ها|هما|هم|هن|ني|نا|ك|كما|كم)?(?!\\p{L})`, 'gu');
const SAID_F = new Set(SAY_F);
export function femaleLead(lead){
  const bare = String(lead || '').replace(/[ً-ٰٟـ]/g, '').replace(/(?<!\p{L})([فو]?)[أإآ]/gu, '$1ا');
  let last = null;
  for(const m of bare.matchAll(SAY)) last = m[1];
  return last !== null && SAID_F.has(last);
}
export const recommend = s => !isTitle(s) && isDialogue(s.text) ? (femaleLead(s.lead) ? FEMALE : CHARACTER) : NARRATOR;

/* صوتُ Cloud اسمُه تامٌّ بلغته («ar-XA-Chirp3-HD-Iapetus» · «ar-XA-Wavenet-B»): لا توجيهَ له ولا نموذج، وسرعتُه رقمٌ (`rate`) */
const cloudVoice = name => /^[a-z]{2,3}-[A-Z]{2}-/.test(name || '');

/* والنبرةُ من النصّ نفسِه: ما قدّم به النصُّ لسطر الحوار («فقالت زبيبة بين شهقاتها:» · «قالت بصوت متهدج:») يُعطى للصوت فيؤدّيه بانفعاله —
   حكمُ المالك بعد سماع الأصوات النسائيّة: «يحتاج ضبط للنبرة حسب النص، فالنص هنا حزين مثلاً فنبرة الأم منكسرة وباكية». وكان الصوتُ لا يرى
   إلا السطرَ وحده. **وما كتبه المؤلّفُ (`tone`) يغلب ما استُنبط**، ويسري على صوت Gemini في السرد أيضاً. وآخرُ الجملة قبله أولى بها: فعلُ القول
   وحالُه في آخرها (`LEAD_MAX`). */
const LEAD_MAX = 300;
const toneOf = s => s.tone ? ` وأدِّه بهذه النبرة: ${s.tone}.`
  : s.lead ? ` وقد قدّم له النصّ بقوله: «${String(s.lead).slice(-LEAD_MAX)}» — فأدِّه بالانفعال الذي يصفه.` : '';

/* وصوتُ الجملة: ما اختاره المؤلّف من اللوحة (`voice` — فُحص في `checkRequest`) وإلّا المقترح. والتوجيهُ لصوت Gemini وحده:
   توجيهُ الكلام المباشر ونبرتُه لسطر الحوار أيّاً كان صوتُه، وتوجيهُ القراءة لما سواه — ونبرةُ المؤلّف إن كتبها */
export function voiceFor(s){
  const id = s.voice ?? recommend(s), v = VOICES[id];
  if(cloudVoice(v.name)) return { id, name: v.name, label: v.label };
  const talk = !isTitle(s) && isDialogue(s.text);
  return { id, name: v.name, label: v.label,
           prompt: talk ? TTS.dialogue + toneOf(s) : TTS.prompt + (s.tone ? ` وبهذه النبرة: ${s.tone}.` : '') };
}

/* ── الصوت ── والصوتُ والنموذجُ واللهجةُ والتوجيهُ قابلةٌ للتجربة (`tools/tts_trial.mjs`)، والأصلُ ما اختاره المالك */
export function ttsRequest(spoken, { name, model, language, prompt, rate } = {}){
  if(cloudVoice(name))
    return { input: { text: spoken }, voice: { languageCode: name.split('-').slice(0, 2).join('-'), name },
             audioConfig: rate ? { audioEncoding: 'MP3', speakingRate: rate } : { audioEncoding: 'MP3' } };
  return { input: { prompt: prompt ?? TTS.prompt, text: spoken },
           voice: { languageCode: language ?? TTS.voice.languageCode, name: name ?? TTS.voice.name,
                    model_name: model ?? TTS.voice.model_name },
           audioConfig: { audioEncoding: 'MP3' } };
}

/* جوابُ الصوت ⇒ { bytes, ms } أو { error } — والمدّةُ من إطارات MP3 نفسِها (`mp3Ms`) لا من ظنّ */
export function readTts(json){
  const b64 = json?.audioContent;
  if(typeof b64 !== 'string' || !b64) return { error: 'جواب الصوت بلا صوت' };
  const bin = atob(b64), bytes = new Uint8Array(bin.length);
  for(let i = 0; i < bin.length; i++) bytes[i] = bin.charCodeAt(i);
  const ms = mp3Ms(bytes);
  if(ms < 100) return { error: 'الصوت المولَّد قصيرٌ أو تالف' };
  return { bytes, ms };
}

/* مدّةُ MP3 بالمللي ثانية: مجموعُ عيّنات إطاراته على معدّلها. يتخطّى وسمَ ID3v2، وإطارَ Xing/Info الصامتَ في أوّله
   (رأسٌ لا صوت)، ويقفز إطاراً إطاراً بطوله — MPEG-1 و2 و2.5، الطبقة الثالثة وحدها. */
const KBPS = { 1: [0, 32, 40, 48, 56, 64, 80, 96, 112, 128, 160, 192, 224, 256, 320],
               2: [0, 8, 16, 24, 32, 40, 48, 56, 64, 80, 96, 112, 128, 144, 160] };
const RATES = { 3: [44100, 48000, 32000], 2: [22050, 24000, 16000], 0: [11025, 12000, 8000] };
const tagAt = (b, i, tag) => [...tag].every((c, k) => b[i + k] === c.charCodeAt(0));
export function mp3Ms(b){
  let i = 0;
  if(tagAt(b, 0, 'ID3') && b.length > 10)
    i = 10 + ((b[6] & 0x7f) << 21 | (b[7] & 0x7f) << 14 | (b[8] & 0x7f) << 7 | (b[9] & 0x7f));
  let samples = 0, rate = 0, first = true;
  while(i + 4 <= b.length){
    if(b[i] !== 0xFF || (b[i + 1] & 0xE0) !== 0xE0){ i++; continue; }
    const ver = (b[i + 1] >> 3) & 3, layer = (b[i + 1] >> 1) & 3;
    const bri = b[i + 2] >> 4, sri = (b[i + 2] >> 2) & 3, pad = (b[i + 2] >> 1) & 1;
    if(ver === 1 || layer !== 1 || bri === 0 || bri === 15 || sri === 3){ i++; continue; }
    const sr = RATES[ver][sri], spf = ver === 3 ? 1152 : 576;
    const len = Math.floor(spf / 8 * KBPS[ver === 3 ? 1 : 2][bri] * 1000 / sr) + pad;
    const info = first && [13, 21, 36].some(o => tagAt(b, i + o, 'Xing') || tagAt(b, i + o, 'Info'));
    if(!info){ samples += spf; rate = sr; }
    first = false;
    i += len;
  }
  return rate ? Math.round(samples * 1000 / rate) : 0;
}

/* ── البصمة والمفاتيح ───────────────────────────────────────
   البصمةُ بصمةُ القاعدة (`sentence_sha` · 189): أوّلُ ١٦ خانةً من SHA-256 للجملة بـUTF-8 — قِيستا متطابقتين.
   والملفّان في مجلّد النصّ باسم البصمة والإصدار — والقاعدةُ تردّ غيرَ ذلك (189 ③). والإصدارُ وقتُ التوليد بأساس ٣٦:
   الصوتُ المعاد توليدُه ملفٌّ جديد، فيُخزَّن كلٌّ في الذاكرة أبداً (`immutable` في `index.ts`) ولا يُسمع قديم. */
export async function sentenceSha(text, subtle = globalThis.crypto.subtle){
  const h = new Uint8Array(await subtle.digest('SHA-256', new TextEncoder().encode(text)));
  return [...h.slice(0, 8)].map(x => x.toString(16).padStart(2, '0')).join('');
}
export const revision = (now = Date.now()) => now.toString(36);
export function clipKeys(item, sha, rev){
  const base = `voice/${item}/${sha}.${rev}`;
  return { audioPath: `${base}.mp3`, spokenPath: `${base}.txt`, audio: `r2:${base}.mp3`, spoken: `r2:${base}.txt` };
}
export const r2Url = (env, path) => `https://${env.accountId}.r2.cloudflarestorage.com/${env.bucket}/${path}`;

/* ── رمزُ Google بحساب الخدمة ──────────────────────────────
   JWT موقَّعٌ بـRS256 من WebCrypto (يعمل في Deno وnode بلا مكتبة) يُبادَل برمزٍ لساعة. ومفتاحُ الحساب سرٌّ في أسرار الدالّة
   (`GOOGLE_SA_JSON`) لا يُطبع منه شيء. ⚠️ ولا `x-goog-user-project` مع رمز الحساب: الترويسةُ تطلب صلاحيةً أخرى فتردّ طلباً
   صحيحاً (قِيس · `tools/google.mjs`). */
export const SCOPE = 'https://www.googleapis.com/auth/cloud-platform';
export const TOKEN_URL = 'https://oauth2.googleapis.com/token';
const utf8 = s => new TextEncoder().encode(s);
const b64url = bytes => btoa(String.fromCharCode(...bytes)).replace(/=+$/, '').replace(/\+/g, '-').replace(/\//g, '_');
export function readServiceAccount(raw){
  let sa;
  try { sa = typeof raw === 'string' ? JSON.parse(raw) : raw; } catch { return null; }
  return sa?.client_email && sa?.private_key && sa?.project_id ? sa : null;
}
export async function signJwt(sa, now = Math.floor(Date.now() / 1000), subtle = globalThis.crypto.subtle){
  const head = b64url(utf8(JSON.stringify({ alg: 'RS256', typ: 'JWT' })));
  const claim = b64url(utf8(JSON.stringify({ iss: sa.client_email, aud: sa.token_uri || TOKEN_URL,
                                             iat: now, exp: now + 3600, scope: SCOPE })));
  const der = Uint8Array.from(atob(sa.private_key.replace(/-----[^-]+-----/g, '').replace(/\s+/g, '')), c => c.charCodeAt(0));
  const key = await subtle.importKey('pkcs8', der, { name: 'RSASSA-PKCS1-v1_5', hash: 'SHA-256' }, false, ['sign']);
  const sig = new Uint8Array(await subtle.sign('RSASSA-PKCS1-v1_5', key, utf8(`${head}.${claim}`)));
  return `${head}.${claim}.${b64url(sig)}`;
}
export const tokenBody = assertion =>
  new URLSearchParams({ grant_type: 'urn:ietf:params:oauth:grant-type:jwt-bearer', assertion }).toString();

/* ── العابرُ يُعاد ──
   429 و503 عابران: حصّةُ `gemini-2.5-flash-tts` في المشروع نحو عشرة طلباتٍ في الدقيقة — قِيس في التجربة (٢٨ أكتوبر):
   الحادي عشرُ في دقيقةٍ رُدّ بـ`429 RESOURCE_EXHAUSTED`. ⇒ انتظارٌ ثمّ إعادة: ما تقوله Google (`Retry-After`) إن قالت، وإلّا
   ٥ ثمّ ١٠ ثمّ ٢٠ ثانية — وما بقي من مهلة الطلب يحدّه في الدالّة (١٥٠ ثانية). */
export const retryable = status => status === 429 || status === 503;
export function backoffMs(attempt, retryAfter){
  const s = Number(retryAfter);
  return Number.isFinite(s) && s > 0 ? Math.min(s, 30) * 1000 : 5000 * 2 ** attempt;
}

/* خطأُ Google بسببه وحده، بلا رابطٍ يحمل رقمَ المشروع */
export const googleError = (status, json, text = '') =>
  `${status} ${json?.error?.status || ''} ${json?.error?.message || String(text).slice(0, 200)}`
    .replace(/https?:\/\/\S+/g, '').replace(/\s+/g, ' ').trim();
