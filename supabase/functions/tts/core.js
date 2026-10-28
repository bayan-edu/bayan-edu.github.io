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
     ① الحارس `voice_problem` بهويّة المستدعي ② الآيةُ المقتبسة بقوسيها تُعرف بنصّ المصحف وتُقصّ من تلاوة الحصري بلا Google
     (🆕 b207 · `findQuote` · `quoteSpan`)، والجملةُ المرسلة كاملةً بقوسيها تُمسَك (`held`) ③ التشكيل — إلا ما شكّله المؤلّفُ
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

/* ما بين «﴿» و«﴾» لا يقرؤه الصوتُ المولَّد: سمع المالكُ الآيتين في الجولتين «قراءة عادية لا تخلو من خطأ» — والآيةُ تُتلى ولا
   تُقرأ. 🆕 b207 · **والجملةُ المقتبِسة تُرسل أجزاءً** (`quoteParts` في اللوحة والكتاب): النثرُ وحده بصوته، والآيةُ بقوسيها وحدها
   تُعرف بنصّ المصحف وتُقصّ من تلاوة الحصري (`findQuote` · `quoteSpan` أدناه) — خطّةٌ أقرّها المالك (٢٨ أكتوبر: «نعم نفذ الخطة»).
   ⇒ جملةٌ أُرسلت كاملةً وفيها قوسان تُمسَك بسببها (لوحةٌ قبل b207)، وقوسان لا يتقابلان يُمسكانها حتى يُصلَح النصّ.
   (وكانت كلُّ جملةٍ فيها «﴿» تُمسَك بلا صوت حتى تُبنى تلاوةُ المقتبَس.) */
export const QUOTE_HELD = 'فيها آية مقتبسة، فتُرسل أجزاءً: النثر وحده، والآية بقوسيها وحدها';
export const QUOTE_UNPAIRED = 'قوسا الآية «﴿ ﴾» غير متقابلين، فتبقى بلا صوت حتى يُصلَح النص';
export const isQuote = text => /^﴿[^﴿﴾]+﴾$/.test(String(text ?? '').trim());
const paired = text => /^[^﴿﴾]*(?:﴿[^﴿﴾]+﴾[^﴿﴾]*)*$/.test(text);
export const held = s => isQuote(s.text) || !/[﴿﴾]/.test(s.text) ? null : paired(s.text) ? QUOTE_HELD : QUOTE_UNPAIRED;

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
/* 🆕 b207 · إطاراتُ الصوت بمواضعها وأزمنتها ⇒ [{ off, len, t, dur, spf, sr }] — منها الطولُ (`mp3Ms`) والقصُّ (`mp3Cut`) */
export function mp3Frames(b){
  let i = 0, t = 0, first = true;
  if(tagAt(b, 0, 'ID3') && b.length > 10)
    i = 10 + ((b[6] & 0x7f) << 21 | (b[7] & 0x7f) << 14 | (b[8] & 0x7f) << 7 | (b[9] & 0x7f));
  const out = [];
  while(i + 4 <= b.length){
    if(b[i] !== 0xFF || (b[i + 1] & 0xE0) !== 0xE0){ i++; continue; }
    const ver = (b[i + 1] >> 3) & 3, layer = (b[i + 1] >> 1) & 3;
    const bri = b[i + 2] >> 4, sri = (b[i + 2] >> 2) & 3, pad = (b[i + 2] >> 1) & 1;
    if(ver === 1 || layer !== 1 || bri === 0 || bri === 15 || sri === 3){ i++; continue; }
    const sr = RATES[ver][sri], spf = ver === 3 ? 1152 : 576;
    const len = Math.floor(spf / 8 * KBPS[ver === 3 ? 1 : 2][bri] * 1000 / sr) + pad;
    const info = first && [13, 21, 36].some(o => tagAt(b, i + o, 'Xing') || tagAt(b, i + o, 'Info'));
    if(!info){ const dur = spf * 1000 / sr; out.push({ off: i, len, t, dur, spf, sr }); t += dur; }
    first = false;
    i += len;
  }
  return out;
}
export function mp3Ms(b){
  const f = mp3Frames(b);
  return f.length ? Math.round(f.reduce((n, x) => n + x.spf, 0) * 1000 / f[f.length - 1].sr) : 0;
}
/* ما بين زمنين من الصوت بإطاراته كما هي — بلا إعادة ترميز — ومعه إطارٌ قبله: قد تسكن بتّاتُ أوّل إطارٍ فيما قبله (خزّانُ MP3).
   ⇒ { bytes, ms } أو null إن لم يقع في الملفّ شيءٌ بينهما */
export function mp3Cut(b, start, end){
  const f = mp3Frames(b);
  let k0 = f.findIndex(x => x.t + x.dur > start);
  const k1 = f.findLastIndex(x => x.t < end);
  if(k0 < 0 || k1 < k0) return null;
  k0 = Math.max(0, k0 - 1);
  const use = f.slice(k0, k1 + 1), bytes = new Uint8Array(use.reduce((n, x) => n + Math.min(x.len, b.length - x.off), 0));
  let at = 0;
  for(const x of use){ const part = b.subarray(x.off, x.off + x.len); bytes.set(part, at); at += part.length; }
  return { bytes, ms: Math.round(use.reduce((n, x) => n + x.dur, 0)) };
}

/* ── الآيةُ المقتبسة في النثر (🆕 b207) ─────────────────────
   جزءُ الجملة بقوسيها («﴿…﴾») يُعرف بنصّ المصحف ويُقصّ من تلاوة الحصري — بلا Google، فلا كلفة. وما قِيس قبل البناء في
   `tools/quran_quotes.mjs` (٢٨ أكتوبر): آياتُ `593` السبعُ عُرفت كلُّها بتطابق ١٠٠٪، وحكم المالكُ بأذنه: «المعرفة سليمة، لكن ما انتهى وصلاً تُتلى
   فيه الآية كاملة».
   والبياناتُ ملفّان في R2 بحرفهما (`QURAN` · ترفعهما يدُ المالك كالتلاوة)، تحملهما الدالّةُ مرّةً ما بقيت دافئة:
   · نصُّ المصحف العثمانيّ من Tanzil («سورة|آية|نصّ») — CC BY 3.0: يُنقل بحرفه مع نسبته
   · توقيتُ كلمات الحصري من quran-align (إصدار 2016-11-24 · `Husary_64kbps` — التسجيلُ الذي في R2 بعينه) — CC BY 4.0:
     [{ surah, ayah, segments: [[أوّلُ كلمة، الكلمةُ بعد آخره، بدء، نهاية], …] }] بالمللي ثانية، والكلماتُ من الصفر كما فصلتها المسافةُ في نصّ
     Tanzil (قِيس: آخرُ مقطعٍ يطابق عددَها في ٦١٢١ من ٦٢٣٦ آية — والباقي كلماتٌ في أواخرها لم توقَّت) */
export const MEDIA = 'https://media.bayanclass.com/';
export const QURAN = Object.freeze({
  text: 'quran/tanzil/quran-uthmani.txt',
  timing: 'quran/align/Husary_64kbps.json',
  ayah: (s, a) => `quran/husary/${String(s).padStart(3, '0')}${String(a).padStart(3, '0')}.mp3`
});

/* هيكلُ المطابقة: هيكلُ فحص الحروف (`skeleton`) بلا همزٍ ولا ألف، والتاءُ المربوطةُ هاءٌ، والهمزةُ على كرسيّها حرفُه — فالعثمانيُّ يرسم ألفاتٍ
   لا يرسمها الإملائيّ وبالعكس («ٱلْكِتَٰبُ» · «الكتاب»)، والكلمةُ هي هي */
export const quoteSkeleton = w => skeleton(w).replace(/ة/g, 'ه').replace(/ؤ/g, 'و').replace(/ئ/g, 'ي').replace(/[اء]/g, '');
export const quoteInner = text => String(text ?? '').trim().replace(/^﴿/, '').replace(/﴾$/, '').trim();

/* فهرسُ المصحف: الآياتُ كلماتٍ، وتوقيتُها، ولكلّ سورةٍ هيكلُها حرفاً حرفاً مع آيةِ كلّ حرفٍ وكلمته.
   🔴 **والبسملةُ في رأس الآية الأولى تُنزع** — إلّا في الفاتحة، فهي آيتُها: Tanzil يكتبها هناك في ١١١ سورة، وملفُّ الآية في everyayah بلاها
   (البسملةُ ملفٌّ وحدها)، وتوقيتُ quran-align يعدّ الكلماتِ بعدها (قِيس: الإخلاص ١ أربعةُ مقاطع لـ«قُلْ هُوَ ٱللَّهُ أَحَدٌ») — فبقاؤها يُزيح كلَّ
   كلمةٍ في أولى السور أربعاً. ويُعرف رأسُها بهيكله، فرسمُها يختلف («بِّسْمِ»). */
const BASMALA = 'بسم الله الرحمن الرحيم'.split(' ').map(w => skeleton(w).replace(/[اء]/g, '').replace(/ة/g, 'ه')).join('');
export function quranIndex(text, align){
  const verses = new Map();
  for(const line of String(text ?? '').split(/\r?\n/)){
    const m = line.match(/^\s*(\d+)\|(\d+)\|(.+)$/);
    if(!m) continue;
    let words = m[3].trim().split(/ +/);
    if(+m[2] === 1 && +m[1] !== 1 && words.length > 4 && words.slice(0, 4).map(quoteSkeleton).join('') === BASMALA) words = words.slice(4);
    verses.set(`${+m[1]}:${+m[2]}`, words);
  }
  const timing = new Map((Array.isArray(align) ? align : []).map(r => [`${r.surah}:${r.ayah}`, Array.isArray(r.segments) ? r.segments : []]));
  const by = new Map();
  for(const [key, words] of verses){
    const [s, a] = key.split(':').map(Number);
    let c = by.get(s);
    if(!c) by.set(s, c = { s, chars: [], ayah: [], word: [] });
    words.forEach((w, k) => { for(const ch of quoteSkeleton(w)){ c.chars.push(ch); c.ayah.push(a); c.word.push(k); } });
  }
  const surahs = [...by.values()].map(c => ({ s: c.s, text: c.chars.join(''), ayah: Int16Array.from(c.ayah), word: Int16Array.from(c.word) }));
  return { verses, timing, surahs };
}

/* أين الآيةُ المقتبسة: مسافةُ تحريرٍ طرفاها حرّان (Sellers) بين هيكلها وهيكل كلّ سورة ⇒ أقربُ حروفٍ متتالية ⇒
   { score: ١ − المسافةُ ÷ طولِ الهيكل, ranges: [{ s, a, from, to }] } — والممتدّةُ على آيتين مداها في كلٍّ، ومن تساوت مواضعُه فالأوّلُ في المصحف.
   قِيس على المصحف كلّه: ٢٠–١٠٧ مللي ثانيةٍ للآية المقتبسة */
export function findQuote(index, text){
  const q = String(text ?? '').replace(/[﴿﴾]/g, ' ').split(/\s+/).map(quoteSkeleton).join('');
  const m = q.length;
  if(!m) return { score: 0, ranges: [] };
  let best = null, prev = new Uint16Array(m + 1), cur = new Uint16Array(m + 1), pst = new Int32Array(m + 1), cst = new Int32Array(m + 1);
  for(const c of index.surahs){
    for(let i = 0; i <= m; i++){ prev[i] = i; pst[i] = 0; }
    for(let j = 1; j <= c.text.length; j++){
      const tj = c.text.charCodeAt(j - 1);
      cur[0] = 0; cst[0] = j;
      for(let i = 1; i <= m; i++){
        const sub = prev[i - 1] + (q.charCodeAt(i - 1) === tj ? 0 : 1), del = prev[i] + 1, ins = cur[i - 1] + 1;
        if(sub <= del && sub <= ins){ cur[i] = sub; cst[i] = pst[i - 1]; }
        else if(del <= ins){ cur[i] = del; cst[i] = pst[i]; }
        else { cur[i] = ins; cst[i] = cst[i - 1]; }
      }
      if(!best || cur[m] < best.d) best = { d: cur[m], c, from: cst[m], to: j };
      [prev, cur] = [cur, prev];
      [pst, cst] = [cst, pst];
    }
  }
  if(!best || best.to <= best.from) return { score: 0, ranges: [] };
  const c = best.c, a1 = c.ayah[best.from], a2 = c.ayah[best.to - 1], ranges = [];
  for(let a = a1; a <= a2; a++)
    ranges.push({ s: c.s, a, from: a === a1 ? c.word[best.from] : 0,
                  to: a === a2 ? c.word[best.to - 1] : (index.verses.get(`${c.s}:${a}`) || []).length - 1 });
  return { score: 1 - best.d / m, ranges };
}

/* أآيةٌ هي؟ — قِيس قبل البناء (٢٨ أكتوبر): الآياتُ المقتبسة ٩٢–١٠٠٪ ولو كُتبت بإملاءٍ آخر أو بلا حركاتٍ أو بخطأ، والنثرُ ٣٨–٧٥٪ ⇒
   ٩٠٪ فأكثر آيةٌ تُتلى · ودون ٨٠٪ ليست آيةً فتُقرأ كالنثر (حكمُ المالك · ٢٨ أكتوبر: القوسان لغير الآيات أيضاً، ومنعُهما «يعطّل العمل») ·
   وما بينهما يُمسَك بسببه حتى يُصحَّح نصُّه */
export const QUOTE_SURE = 0.9, QUOTE_NOT = 0.8;
export const quoteVerdict = score => score >= QUOTE_SURE ? 'quran' : score < QUOTE_NOT ? 'prose' : 'unsure';
export const quoteUnsure = hit => `تشبه آية ولا تطابقها (أقربها ${hit.ranges[0] ? `${hit.ranges[0].s}:${hit.ranges[0].a}` : '؟'} بتطابق ${
  Math.round(hit.score * 100)}٪)، فتبقى بلا صوت حتى يُصحَّح نصها`;

/* ما يُتلى من آيةٍ اقتُبس منها — حكمُ المالك بأذنه: **«ما انتهى وصلاً تُتلى فيه الآية كاملة»**، وما بدأ وصلاً كذلك (أقرّه بالخطّة) ⇒ القصُّ
   حيث يقف الحصري قبل المقتبَس وبعده وحده، وإلّا الآيةُ كاملة — وكذلك ما لا توقيتَ لحدّيه، أو حدُّه في مقطعٍ يضمّ كلمةً خارجه، **أو آيةٌ لا يتّفق
   عددُ كلماتها والتوقيت** (خمسٌ في المصحف — قِيس بعد نزع البسملة: ٦٢٣١ من ٦٢٣٦ تتّفق): قصٌّ بعدٍّ مُزاحٍ يقطع عند غير كلمته. والوصلُ ما دون
   `QUOTE_JOIN` بين نهاية كلمةٍ وبدء التالية، والهامشُ في الصمت وحده (`QUOTE_PAD` قبلُ · `QUOTE_TAIL` بعدُ).
   ⇒ { s, a, from, to, whole, widened, start, end (مللي ثانية — يُحدّان بطول الملفّ عند القصّ), words (ما يُتلى بحرفه من المصحف) } */
export const QUOTE_JOIN = 40, QUOTE_PAD = 150, QUOTE_TAIL = 250;
export function quoteSpan(index, r){
  const key = `${r.s}:${r.a}`, words = index.verses.get(key) || [], segs = index.timing.get(key) || [];
  const lettered = words.flatMap((w, k) => /\p{L}/u.test(w) ? [k] : []);
  const covers = r.from <= (lettered[0] ?? 0) && r.to >= (lettered[lettered.length - 1] ?? words.length - 1);
  const seg = w => segs.find(x => x[0] <= w && w < x[1]);
  const a = seg(r.from), b = seg(r.to);
  const prev = a && segs.filter(x => x[1] <= r.from).sort((x, y) => y[3] - x[3])[0];
  const next = b && segs.filter(x => x[0] > r.to).sort((x, y) => x[2] - y[2])[0];
  const merged = !!a && !!b && (a[0] < r.from || b[1] > r.to + 1);
  const wasl = (!!prev && a[2] - prev[3] <= QUOTE_JOIN) || (!!next && next[2] - b[3] <= QUOTE_JOIN);
  const sound = segs.length > 0 && Math.max(...segs.map(x => x[1])) === words.length;
  if(covers || !sound || !a || !b || merged || wasl)
    return { s: r.s, a: r.a, from: 0, to: words.length - 1, whole: true, widened: !covers,
             start: segs.length ? Math.max(0, Math.min(...segs.map(x => x[2])) - QUOTE_PAD) : 0,
             end: segs.length ? Math.max(...segs.map(x => x[3])) + QUOTE_TAIL : Infinity, words: words.join(' ') };
  return { s: r.s, a: r.a, from: r.from, to: r.to, whole: false, widened: false,
           start: prev ? Math.max(prev[3] + 20, a[2] - QUOTE_PAD) : Math.max(0, a[2] - QUOTE_PAD),
           end: next ? Math.min(next[2] - 20, b[3] + QUOTE_TAIL) : b[3] + QUOTE_TAIL,
           words: words.slice(r.from, r.to + 1).join(' ') };
}

/* واسمُ الصوت في القاعدة (`voice_clips.voice` · ١٢٠ حرفاً): «الحصري · Husary_64kbps · 3:110 · كاملة» — والمدى كلماتٌ من الواحد («4:32 · 10-17»)،
   و«كاملة للوصل» لما اقتُبس بعضُه وتُلي كلُّه، والممتدّةُ على آيتين يفصلها « + ». تقرؤه اللوحةُ مرجعاً (`quoteRef` في voice_rows.js) */
export const QUOTE_VOICE = 'الحصري · Husary_64kbps';
export const quoteLabel = spans => `${QUOTE_VOICE} · ${spans.map(x =>
  `${x.s}:${x.a} · ${x.whole ? (x.widened ? 'كاملة للوصل' : 'كاملة') : `${x.from + 1}-${x.to + 1}`}`).join(' + ')}`.slice(0, 120);

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
