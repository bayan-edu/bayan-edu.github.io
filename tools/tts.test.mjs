/* ══════════════════════════════════════════════════════════
   قياسُ `supabase/functions/tts/core.js` — منطقُ دالّة التوليد بلا Deno ولا شبكة.
     node tools/tts.test.mjs

   ما يُقاس: الطلبُ وحدودُه · ما يُمسَك بلا صوت · ما شكّله المؤلّف · فحصُ الحروف بثلاثة ما لا يُعدّ تغييراً · الوقفُ والابتداء ·
   العنوانُ بضبطه التامّ · جوابُ التشكيل · طلبُ الصوت — والشخصيّةُ وأصواتُ Cloud ·
   مدّةُ MP3 من إطاراتٍ مصنوعةٍ معلومةِ المدّة · البصمةُ = بصمةُ القاعدة · المفاتيحُ = قيدُ القاعدة (189) · وتوقيعُ JWT يُتحقَّق
   منه بمفتاحٍ عامّ. والطريقُ الحقيقيّ إلى Google في `tools/tts_trial.mjs`.
   ══════════════════════════════════════════════════════════ */
import { join, dirname } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { generateKeyPairSync, createVerify } from 'node:crypto';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const T = await import(pathToFileURL(join(ROOT, 'supabase/functions/tts/core.js')));

let bad = 0, n = 0;
const ok = (name, cond, extra = '') => { n++; if(!cond) bad++; console.log(cond ? '✅' : '❌', name, cond ? '' : extra); };
const show = v => JSON.stringify(v);

/* ① الطلب */
{
  const good = T.checkRequest({ item: 603, sentences: [{ text: 'فقال عنترة فى شبه صيحة:' }, { text: 'بيت.', kind: 'v' }], context: 'قبلها.' });
  ok('طلبٌ صحيح ⇒ الجملُ بأنواعها، والنثرُ هو الأصل', good.item === 603 && good.sentences.length === 2 && good.sentences[1].kind === 'v'
     && good.sentences[0].kind === 'p' && good.sentences[0].spoken === null && good.sentences[0].voice === null && good.context === 'قبلها.', show(good));
  ok('وصوتٌ من اللوحة يُقبل باسمه فيها', T.checkRequest({ item: 5, sentences: [{ text: 'جملة.', voice: 'charon' }] }).sentences?.[0]?.voice === 'charon', '');
  ok('ونوعٌ غيرُ معروف يُردّ', T.checkRequest({ item: 1, sentences: [{ text: 'ا.', kind: 'q' }] }).error === 'نوع الجملة غير معروف', '');
  ok('الجملةُ نصّاً مجرّداً تُقبل', T.checkRequest({ item: 1, sentences: ['جملة.'] }).sentences?.[0]?.text === 'جملة.', '');
  const errs = [
    [{ item: 0, sentences: ['ا.'] }, 'رقم النص غير صالح'],
    [{ item: 'x', sentences: ['ا.'] }, 'رقم النص غير صالح'],
    [{ item: 5, sentences: [] }, 'لا جمل في الطلب'],
    [{ item: 5, sentences: ['١', '٢', '٣', '٤', '٥', '٦'] }, 'الدفعة خمس جمل على الأكثر'],
    [{ item: 5, sentences: [' جملة.'] }, 'الجملة غير صالحة: فارغة، أو أطول من ٢٠٠٠ حرف، أو في طرفيها مسافة'],
    [{ item: 5, sentences: ['ب'.repeat(2001)] }, 'الجملة غير صالحة: فارغة، أو أطول من ٢٠٠٠ حرف، أو في طرفيها مسافة'],
    [{ item: 5, sentences: ['إِنَّ الْإِنسَانَ لَفِي خُسْرٍ ۝٢'] }, 'الآيات لا يُولَّد لها صوت: تُتلى بصوت الحصري'],
    [{ item: 5, sentences: [{ text: 'جملة.', spoken: '   ' }] }, 'النص المنطوق فارغ أو أطول من حدّه'],
    [{ item: 5, sentences: [{ text: 'جملة.', voice: 'Charon' }] }, 'الصوت غير معروف'],
    [{ item: 5, sentences: [{ text: 'جملة.', voice: 'toString' }] }, 'الصوت غير معروف']
  ];
  for(const [body, want] of errs){
    const r = T.checkRequest(body);
    ok(`يُردّ: ${want}`, r.error === want && r.status === 400, show(r));
  }
  ok('وجملةٌ فيها «﴿…﴾» تُقبل (حكمُ المالك · 189)', !T.checkRequest({ item: 5, sentences: ['قال تعالى ﴿وَالْعَصْرِ﴾ في سورته.'] }).error, '');
  ok('ثمّ تُمسَك بلا صوت — والنثرُ بلا قوسين لا يُمسَك', T.held({ text: 'قال تعالى ﴿وَالْعَصْرِ﴾ في سورته.' }) === T.QUOTE_HELD
     && T.held({ text: 'نثر بلا قوسين.' }) === null, '');
  ok('وعددُ الحروف بالمحرف لا بالبايت: ٢٠٠٠ حرفٍ عربيّ تُقبل', !T.checkRequest({ item: 5, sentences: ['ب'.repeat(2000)] }).error, '');
}

/* ② ما شكّله المؤلّف — ومن أين التشكيل */
{
  const author = 'كَانَ العَرَبُ يَعِيشُونَ فِي الجَاهِلِيَّةِ قَبَائِلَ مُتَنَابِذَةً.';
  const story = 'وكان عنترة يسمع قولها مطرقا، ويزأر زئيرًا مكتومًا؛';
  ok('النصُّ المشكول (٥٩٣) مشكولٌ', T.voweled(author) === true, '');
  ok('ونصُّ القصّة بتنوينين (٦٠٣) غيرُ مشكول', T.voweled(story) === false, '');
  ok('وما لا حرفَ عربيّاً فيه لا يُشكَّل', T.voweled('2026 — 15') === true, '');
  ok('المصدر: المعلّم · المؤلّف · النموذج', T.tashkeelSource({ text: story, kind: 'p', spoken: 'مُصحَّح' }) === 'المعلّم'
     && T.tashkeelSource({ text: author, kind: 'p', spoken: null }) === 'المؤلّف'
     && T.tashkeelSource({ text: story, kind: 'p', spoken: null }) === T.TASHKEEL_MODEL, '');
  ok('والعنوانُ يُشكَّل كالنثر — به تُعرف همزةُ الوصل — ثمّ يُخفَّف ضبطُه', T.tashkeelSource({ text: author, kind: 'cover', spoken: null }) === 'المؤلّف'
     && T.tashkeelSource({ text: story, kind: 'h', spoken: null }) === T.TASHKEEL_MODEL, '');
  const label = T.voiceLabel(T.TASHKEEL_MODEL);
  ok('واسمُ الصوت في القاعدة دون ١٢٠ حرفاً ويذكر مصدرَ التشكيل', [...label].length <= 120 && label.includes(T.TTS.label) && label.includes('تشكيل'), label);
}

/* ③ فحصُ الحروف */
{
  const shown = 'فقال عنترة فى شبه صيحة:';
  ok('التشكيلُ وحده يمرّ', T.sameLetters(shown, 'فَقَالَ عَنْتَرَةُ فِى شِبْهِ صَيْحَةٍ:'), '');
  ok('و«ى» ← «ي» يمرّ (حكمُ المالك)', T.sameLetters(shown, 'فَقَالَ عَنْتَرَةُ فِي شِبْهِ صَيْحَةٍ:'), '');
  ok('وهمزةٌ على الألف تمرّ', T.sameLetters('انت اسرع من الامس', 'أَنْتَ أَسْرَعُ مِنَ الأَمْسِ'), '');
  ok('وتطويلٌ وترقيمٌ يمرّان', T.sameLetters('قال: نعم', 'قَـالَ، نَعَمْ!'), '');
  ok('والأرقامُ الهنديّة والعربيّة سواء', T.sameLetters('سنة ١٥٠', 'سَنَةَ 150'), '');
  ok('وكلمةٌ زِيدت تُردّ', !T.sameLetters(shown, 'فَقَالَ لَهُ عَنْتَرَةُ فِي شِبْهِ صَيْحَةٍ:'), '');
  ok('وحرفٌ غُيِّر تُردّ (ت ← ط)', !T.sameLetters('تاب', 'طَابَ'), '');
  ok('وكلمةٌ حُذفت تُردّ', !T.sameLetters(shown, 'فَقَالَ عَنْتَرَةُ فِي صَيْحَةٍ:'), '');
  ok('والتاءُ المربوطة هاءً تُردّ', !T.sameLetters('مدرسة', 'مَدْرَسَه'), '');
}

/* ③-ب الوقفُ والابتداء · والعنوانُ خفيفُ الضبط · والكلامُ المباشر */
{
  const cases = [
    ['عَادَتْ إِلَى الْبُكَاءِ.', 'عَادَتْ إِلَى الْبُكَاءْ.', 'الكسرةُ في آخر الجملة تُسكَّن'],
    ['لَا يَعْرِفُونَ فِكْرَةَ الأُمَّةِ، إِنَّمَا', 'لَا يَعْرِفُونَ فِكْرَةَ الأُمَّهْ، إِنَّمَا', 'والتاءُ المربوطة قبل الفاصلة هاءٌ ساكنة تُكتب هاءً — وما بعدها لا يُمسّ'],
    ['فَقَالَ عَنْتَرَةْ فِي شِبْهِ صَيْحَةٍ:', 'فَقَالَ عَنْتَرَهْ فِي شِبْهِ صَيْحَهْ:', '«صيحة» هاءً عند الوقف (سمعها المالكُ تاءً)، والعلمُ الساكنُ هاءً حيث وقع'],
    ['هَبَّتْ هَبَّةً وَاحِدَةً.', 'هَبَّتْ هَبَّةً وَاحِدَهْ.', 'وتنوينُ الفتح على التاء المربوطة هاءٌ لا ألف، وما قبل الوقف بحركته'],
    ['تَنْفُضُهُ نَفْضًا.', 'تَنْفُضُهُ نَفْضَا.', 'وتنوينُ الفتح قبل الألف ألفٌ تُمدّ'],
    ['يُعْطِيهِ هُدًى.', 'يُعْطِيهِ هُدَى.', 'وقبل الألف المقصورة كذلك'],
    ['رَأَيْتُ سَمَاءً.', 'رَأَيْتُ سَمَاءَا.', 'و«سماءً» يُمدّ بألفٍ في المنطوق'],
    ['هَزَّةٌ تَنْفُضُهُ', 'هَزَّةٌ تَنْفُضُهْ', 'وآخرُ كلمةٍ في الجملة بلا ترقيمٍ يُوقَف عليها، والتاءُ المتحرّكة قبلها تاء'],
    ['قَالَ الحَقِّ؛', 'قَالَ الحَقّْ؛', 'والشدّةُ تبقى وتسقط الحركة'],
    ['ذَهَبَ فِي', 'ذَهَبَ فِي', 'وحرفُ المدّ بلا حركةٍ كما هو'],
    ['قِيَمٌ اجْتِمَاعِيَّةٌ — لِشَوْقِي ضَيْفٍ', 'قِيَمٌ اجْتِمَاعِيَّهْ — لِشَوْقِي ضَيْفْ', 'والشرطةُ وقفٌ كالترقيم (سُمع التنوينُ قبلها)'],
    ['القِصَّةُ : الفَصْلُ', 'القِصَّهْ : الفَصْلْ', 'والترقيمُ بعد مسافةٍ وقفٌ كالملتصق'],
    ['يَقُولُ جَلَّ ذِكْرُهُ: ﴿إِنَّ هَٰذِهِ أُمَّتُكُمْ أُمَّةً وَاحِدَةً﴾، وَيَقُولُ', 'يَقُولُ جَلَّ ذِكْرُهْ: ﴿إِنَّ هَٰذِهِ أُمَّتُكُمْ أُمَّةً وَاحِدَةً﴾، وَيَقُولْ', 'وما بين «﴿» و«﴾» لا يُمسّ ولو قبل فاصلة — وآخرُ الجملة بعده يُوقَف عليه'],
    ['قَالَ «نَعَمْ».', 'قَالَ «نَعَمْ».', 'والساكنُ ساكنٌ، وعلامةُ التنصيص بعده لا تمنع الوقف'],
    ['النُّصُوصُ: ابْدَأْ بِنَفْسِكَ', 'النُّصُوصْ: اِبْدَأْ بِنَفْسِكْ', 'والابتداءُ بعد الوقف: همزةُ الوصل مكسورة («ابدأ» سُمعت «أَبدأ»)'],
    ['ابْدَأْ بِنَفْسِكَ.', 'اِبْدَأْ بِنَفْسِكْ.', 'وفي أوّل الجملة كذلك'],
    ['اكْتُبِ الدَّرْسَ.', 'اُكْتُبِ الدَّرْسْ.', 'ومضمومةٌ إن ضُمّ الثالث في وسط الكلمة'],
    ['اسْمُهُ عَلِيٌّ.', 'اِسْمُهُ عَلِيّْ.', 'والاسمُ مكسورٌ أبداً ولو ضُمّ ثالثُه'],
    ['الْقِصَّةُ قَصِيرَةٌ.', 'الْقِصَّةُ قَصِيرَهْ.', 'ولامُ التعريف لا تُمسّ'],
    ['فَلَمَّا اِنْتَهَتْ أُمُّهُ.', 'فَلَمَّا انْتَهَتْ أُمُّهْ.', 'وهمزةُ الوصل في وسط الكلام تسقط حركتُها'],
    ['اِبْدَأْ.', 'اِبْدَأْ.', 'وما ضبطه التشكيلُ في الابتداء يبقى']
  ];
  for(const [inp, want, why] of cases) ok(`الوقف: ${why}`, T.pausal(inp) === want, `${inp} ⇒ ${T.pausal(inp)}`);
  ok('والوقفُ لا يغيّر حروفَ الجملة إلا في المنطوق: الهاءُ مكانَ التاء', T.sameLetters('عادت إلى البكاء. وتنفضه نفضا', T.pausal('عَادَتْ إِلَى الْبُكَاءِ. وَتَنْفُضُهُ نَفْضًا'))
     && T.skeleton(T.pausal('صَيْحَةٍ.')) === 'صيحه', '');
  ok('والوقفُ مرّتين كمرّة (ما كتبه المعلّمُ بيده يمرّ به ثانية)', ['النُّصُوصُ: ابْدَأْ بِنَفْسِكَ', 'فَقَالَ عَنْتَرَةْ فِي شِبْهِ صَيْحَةٍ:', 'رَأَيْتُ سَمَاءً.']
     .every(x => T.pausal(T.pausal(x)) === T.pausal(x)), '');

  const title = { text: 'القراءة: قيم اجتماعية — لشوقي ضيف', kind: 'cover', spoken: null };
  const heard = T.spokenFor(title, 'القِرَاءَةُ: قِيَمٌ اجْتِمَاعِيَّةٌ — لِشَوْقِي ضَيْفْ');
  ok('spokenFor: العنوانُ بضبطه التامّ ووقفه (حكمُ المالك في الثالثة) — فلا تنوينَ قبل الشرطة', heard === 'القِرَاءَهْ: قِيَمٌ اجْتِمَاعِيَّهْ — لِشَوْقِي ضَيْفْ', heard);
  const opened = T.spokenFor({ text: 'ب', kind: 'cover', spoken: null }, 'النُّصُوصُ: ابْدَأْ بِنَفْسِكَ — لِأَبِي الأَسْوَدِ الدُّؤَلِيِّ');
  ok('spokenFor: وفي العنوان بعد الوقف همزةُ وصلٍ محرّكة', opened === 'النُّصُوصْ: اِبْدَأْ بِنَفْسِكْ — لِأَبِي الأَسْوَدِ الدُّؤَلِيّْ', opened);
  ok('والخفيفُ لم يبقَ (جُرّب في الثالثة وفضّل المالكُ التامّ)', T.lightText === undefined, '');
  ok('spokenFor: البيتُ كما شُكّل (للقافية حكمُها)', T.spokenFor({ text: 'ب', kind: 'v', spoken: null }, 'وَخُصُومُ') === 'وَخُصُومُ', '');
  ok('spokenFor: والنثرُ بوقفه', T.spokenFor({ text: 'ب', kind: 'p', spoken: null }, 'إِلَى الْبُكَاءِ.') === 'إِلَى الْبُكَاءْ.', '');
  ok('spokenFor: وعنوانٌ صحّحه المعلّمُ بيده يُقرأ بتشكيله', T.spokenFor({ text: 'ب', kind: 'cover', spoken: 'عُنْوَانٌ' }, 'عُنْوَانٌ') === 'عُنْوَانْ', '');

  ok('الكلامُ المباشر يُعرف بشرطة الحوار', T.isDialogue('- لست أحتمل أن أعيش') && T.isDialogue('— قال') && T.isDialogue('«لا»'), '');
  ok('والنثرُ والسردُ ليسا كلاماً مباشراً', !T.isDialogue('وكان عنترة يسمع قولها') && !T.isDialogue('فقال عنترة فى شبه صيحة:'), '');
}

/* ④ التشكيل: الطلبُ والجواب */
{
  const req = T.tashkeelRequest([{ text: 'أ.', kind: 'p' }, { text: 'ب.', kind: 'v' }], 'سياق.');
  const payload = JSON.parse(req.contents[0].parts[0].text.split('\n\n').pop());
  ok('الطلبُ JSON بمصفوفة نصوص، والسياقُ وعلَمُ البيت فيه', req.generationConfig.responseMimeType === 'application/json'
     && req.generationConfig.responseSchema.type === 'ARRAY' && payload.context === 'سياق.' && payload.sentences[1].verse === true
     && payload.sentences[0].verse === undefined, show(payload));
  ok('والتوجيهُ يذكر «ى» التي تُنطق ياءً ويُبقي التي تُنطق ألفاً', req.contents[0].parts[0].text.includes('فى ← في')
     && req.contents[0].parts[0].text.includes('على · إلى'), '');
  ok('ويُسكّن أواخرَ الأعلام (حكمُ المالك)', req.contents[0].parts[0].text.includes('وسكّن آخرَ كلِّ اسمِ علمٍ')
     && req.contents[0].parts[0].text.includes('شَوْقِي ضَيْفْ'), '');
  const answer = (parts, finishReason = 'STOP') => ({ candidates: [{ content: { parts }, finishReason }] });
  ok('جوابٌ صحيح ⇒ القائمة', show(T.readTashkeel(answer([{ text: '["أَ.", "بَ."]' }]), 2)) === show({ list: ['أَ.', 'بَ.'] }), '');
  ok('وأجزاءُ التفكير لا تُقرأ', T.readTashkeel(answer([{ text: 'تفكير…', thought: true }, { text: '["أَ."]' }]), 1).list?.[0] === 'أَ.', '');
  ok('وسياجُ ```json يُنزع', T.readTashkeel(answer([{ text: '```json\n["أَ."]\n```' }]), 1).list?.[0] === 'أَ.', '');
  ok('وعددٌ غيرُ عدد الجمل يُردّ', /جملة لا 2/.test(T.readTashkeel(answer([{ text: '["أَ."]' }]), 2).error || ''), '');
  ok('وما ليس JSON يُردّ', T.readTashkeel(answer([{ text: 'أَ.' }]), 1).error === 'جواب التشكيل ليس JSON', '');
  ok('والفارغُ يُردّ بسببه', /MAX_TOKENS/.test(T.readTashkeel(answer([], 'MAX_TOKENS'), 1).error || ''), '');
}

/* ⑤ الصوت: الطلبُ والمدّة */
{
  const r = T.ttsRequest('نَصٌّ.');
  ok('طلبُ الصوت: Gemini 2.5 Flash · ar-001 · Charon · MP3 · التوجيه', r.voice.model_name === 'gemini-2.5-flash-tts'
     && r.voice.languageCode === 'ar-001' && r.voice.name === 'Charon' && r.audioConfig.audioEncoding === 'MP3'
     && r.input.text === 'نَصٌّ.' && r.input.prompt === T.TTS.prompt, show(r));
  ok('والتوجيهُ يُلزم بالمكتوب وبسرعة القراءة الطبيعية، ولا يطلب «ضبط الأواخر» برأيه', T.TTS.prompt.includes('والتزم بالحركات المكتوبة')
     && T.TTS.prompt.includes('بسرعة القراءة الطبيعية') && !T.TTS.prompt.includes('متأنٍّ') && !T.TTS.prompt.includes('ضبطاً صحيحاً'), T.TTS.prompt);
  const v = T.ttsRequest('نَصٌّ.', { name: 'Algenib', model: 'gemini-2.5-pro-tts', language: 'ar-EG', prompt: T.TTS.dialogue });
  ok('والصوتُ والنموذجُ واللهجةُ والتوجيهُ تُجرَّب', v.voice.name === 'Algenib' && v.voice.model_name === 'gemini-2.5-pro-tts'
     && v.voice.languageCode === 'ar-EG' && v.input.prompt === T.TTS.dialogue, show(v));
  const d = T.voiceFor({ text: '- لست أحتمل', kind: 'p' }), nar = T.voiceFor({ text: 'وكان عنترة يسمع', kind: 'p' });
  ok('المقترح: الكلامُ المباشر بـAlgenib على Gemini وتوجيهِ الحوار، والسردُ بـIapetus على Chirp بلا توجيه (حكمُ المالك في الرابعة)',
     d.id === 'algenib' && d.name === 'Algenib' && d.prompt === T.TTS.dialogue && d.label.includes('Algenib')
     && nar.id === 'iapetus' && nar.name === 'ar-XA-Chirp3-HD-Iapetus' && nar.prompt === undefined && nar.label === T.VOICES.iapetus.label, show({ d, nar }));
  ok('والعنوانُ والبيتُ بصوت الراوي — والعنوانُ لا يكون حواراً ولو بدأ بعلامة تنصيص', T.recommend({ text: '«عنوان»', kind: 'cover' }) === T.NARRATOR
     && T.recommend({ text: 'حسدوا الفتى', kind: 'v' }) === T.NARRATOR, '');
  const picked = T.voiceFor({ text: 'وكان عنترة يسمع', kind: 'p', voice: 'charon' }), pickedLine = T.voiceFor({ text: '- لست أحتمل', kind: 'p', voice: 'charon' });
  ok('وما اختاره المؤلّفُ يغلب المقترح: Charon بتوجيه القراءة، وبتوجيه الحوار في سطر الحوار', picked.name === 'Charon' && picked.prompt === T.TTS.prompt
     && picked.label === T.TTS.label && pickedLine.name === 'Charon' && pickedLine.prompt === T.TTS.dialogue, show({ picked, pickedLine }));
  const viaChirp = T.ttsRequest('نَصٌّ.', nar);
  ok('وطلبُ الراوي المقترح طلبُ Chirp: ar-XA بلا توجيهٍ ولا نموذج', viaChirp.voice.languageCode === 'ar-XA' && viaChirp.input.prompt === undefined
     && viaChirp.voice.model_name === undefined && viaChirp.voice.name === 'ar-XA-Chirp3-HD-Iapetus', show(viaChirp));
  ok('واسمُ كلّ صوتٍ في القاعدة دون ١٢٠ حرفاً ومعه مصدرُ التشكيل', Object.values(T.VOICES)
     .every(v => [...T.voiceLabel(T.TASHKEEL_MODEL, v.label)].length <= 120), '');
  const rq = T.ttsRequest('نَصٌّ.', d);
  ok('وطلبُ الشخصيّة: Algenib بتوجيه الحوار على Flash · ar-001', rq.voice.name === 'Algenib' && rq.input.prompt === T.TTS.dialogue
     && rq.voice.model_name === 'gemini-2.5-flash-tts' && rq.voice.languageCode === 'ar-001', show(rq));
  const cl = T.ttsRequest('نَصٌّ.', { name: 'ar-XA-Chirp3-HD-Charon', rate: 1.1 });
  ok('وصوتُ Cloud باسمه التامّ: لغتُه منه، بلا توجيهٍ ولا نموذج، وسرعتُه رقم', cl.voice.languageCode === 'ar-XA'
     && cl.voice.name === 'ar-XA-Chirp3-HD-Charon' && cl.voice.model_name === undefined && cl.input.prompt === undefined
     && cl.input.text === 'نَصٌّ.' && cl.audioConfig.speakingRate === 1.1, show(cl));
  const wn = T.ttsRequest('نص', { name: 'ar-XA-Wavenet-B' });
  ok('وWaveNet كذلك، وبلا سرعةٍ لا رقمَ لها', wn.voice.languageCode === 'ar-XA' && !('speakingRate' in wn.audioConfig), show(wn));

  /* إطاراتٌ مصنوعة: MPEG-2 · الطبقة ٣ · ٢٤ كيلوهرتز · ٣٢ ك.ب/ث ⇒ ٩٦ بايتاً و٢٤ م.ث لكلّ إطار */
  const mpeg2 = (count, { xing = false, id3 = 0 } = {}) => {
    const frames = [];
    if(id3){ frames.push(Uint8Array.from([0x49, 0x44, 0x33, 3, 0, 0, 0, 0, 0, id3]), new Uint8Array(id3)); }
    for(let k = 0; k < count; k++){
      const f = new Uint8Array(96);
      f.set([0xFF, 0xF3, 0x44, 0xC4]);
      if(xing && k === 0) f.set([...'Info'].map(c => c.charCodeAt(0)), 13);
      frames.push(f);
    }
    const out = new Uint8Array(frames.reduce((s, f) => s + f.length, 0));
    let at = 0; for(const f of frames){ out.set(f, at); at += f.length; }
    return out;
  };
  ok('MPEG-2: مئةُ إطار ⇒ ٢٤٠٠ م.ث', T.mp3Ms(mpeg2(100)) === 2400, String(T.mp3Ms(mpeg2(100))));
  ok('وإطارُ Info الأوّلُ رأسٌ لا صوت ⇒ ٢٣٧٦ م.ث', T.mp3Ms(mpeg2(100, { xing: true })) === 2376, String(T.mp3Ms(mpeg2(100, { xing: true }))));
  ok('ووسمُ ID3v2 قبلها يُتخطّى', T.mp3Ms(mpeg2(100, { id3: 20 })) === 2400, String(T.mp3Ms(mpeg2(100, { id3: 20 }))));
  /* MPEG-1 · ٤٤٫١ كيلوهرتز · ١٢٨ ك.ب/ث، والحشوُ في كلّ إطارٍ ثانٍ ⇒ ٤١٧ أو ٤١٨ بايتاً، و١١٥٢ عيّنةً لكلّ إطار */
  const mpeg1 = count => {
    const parts = [];
    for(let k = 0; k < count; k++){
      const pad = k % 2, f = new Uint8Array(417 + pad);
      f.set([0xFF, 0xFB, 0x90 | (pad << 1), 0x64]);
      parts.push(f);
    }
    const out = new Uint8Array(parts.reduce((s, f) => s + f.length, 0));
    let at = 0; for(const f of parts){ out.set(f, at); at += f.length; }
    return out;
  };
  const want1 = Math.round(50 * 1152 * 1000 / 44100);
  ok(`MPEG-1 بحشو: خمسون إطاراً ⇒ ${want1} م.ث`, T.mp3Ms(mpeg1(50)) === want1, String(T.mp3Ms(mpeg1(50))));
  ok('وما ليس MP3 ⇒ صفر', T.mp3Ms(new Uint8Array(500)) === 0, '');

  const b64 = Buffer.from(mpeg2(100)).toString('base64');
  const read = T.readTts({ audioContent: b64 });
  ok('جوابُ الصوت ⇒ البايتات والمدّة', read.ms === 2400 && read.bytes.length === 9600, show({ ms: read.ms, len: read.bytes?.length }));
  ok('وجوابٌ بلا صوت يُردّ', T.readTts({}).error === 'جواب الصوت بلا صوت', '');
  ok('وصوتٌ أقصرُ من ١٠٠ م.ث يُردّ', T.readTts({ audioContent: Buffer.from(mpeg2(3)).toString('base64') }).error === 'الصوت المولَّد قصيرٌ أو تالف', '');
}

/* ⑥ البصمةُ والمفاتيح — والقاعدةُ هي الميزان (189) */
{
  ok('البصمةُ = بصمةُ القاعدة: جملةٌ عربيّةٌ بتشكيلها', await T.sentenceSha('مقدّمةٌ قصيرة: «قالَ» — وفيها جملتان.') === 'db210e64ce0707c5', '');
  ok('البصمةُ = بصمةُ القاعدة: جملةٌ إنجليزيّة', await T.sentenceSha('Dr. Ali met Mr. Omar.') === 'e3e6ce529abc9ec6', '');
  const rev = T.revision(Date.UTC(2026, 9, 28));
  ok('الإصدارُ بأساس ٣٦ ودون ١٦ خانة', /^[a-z0-9]{1,16}$/.test(rev), rev);
  const k = T.clipKeys(603, 'db210e64ce0707c5', rev);
  const AUDIO = new RegExp('^r2:voice/603/db210e64ce0707c5\\.[a-z0-9]{1,16}\\.mp3$');      // قيدُ voice_clips_audio بحرفه
  ok('مفتاحُ الصوت يطابق قيدَ القاعدة، والمنطوقُ بجواره', AUDIO.test(k.audio) && k.spoken === k.audio.slice(0, -4) + '.txt'
     && k.audioPath === k.audio.slice(3) && k.spokenPath === k.spoken.slice(3), show(k));
  ok('ورابطُ R2 للرفع من الدالّة', T.r2Url({ accountId: 'acc', bucket: 'bayan-media' }, k.audioPath)
     === `https://acc.r2.cloudflarestorage.com/bayan-media/${k.audioPath}`, '');
}

/* ⑦ رمزُ Google: JWT يُتحقَّق من توقيعه بالمفتاح العامّ */
{
  const { privateKey, publicKey } = generateKeyPairSync('rsa', { modulusLength: 2048,
    privateKeyEncoding: { type: 'pkcs8', format: 'pem' }, publicKeyEncoding: { type: 'spki', format: 'pem' } });
  const sa = T.readServiceAccount(JSON.stringify({ client_email: 'tts@proj.iam.gserviceaccount.com', private_key: privateKey, project_id: 'proj' }));
  ok('حسابُ الخدمة يُقرأ من JSON', sa?.project_id === 'proj', '');
  ok('وناقصُ الحقول لا يُقرأ', T.readServiceAccount('{"client_email":"x"}') === null && T.readServiceAccount('not json') === null, '');
  const jwt = await T.signJwt(sa, 1_800_000_000);
  const [h, c, s] = jwt.split('.');
  const dec = x => JSON.parse(Buffer.from(x.replace(/-/g, '+').replace(/_/g, '/'), 'base64').toString('utf8'));
  const claim = dec(c);
  ok('رأسُه RS256 ومطالبتُه للحساب والنطاق وساعةٍ واحدة', dec(h).alg === 'RS256' && claim.iss === sa.client_email
     && claim.aud === T.TOKEN_URL && claim.scope === T.SCOPE && claim.exp - claim.iat === 3600, show(claim));
  const verified = createVerify('RSA-SHA256').update(`${h}.${c}`)
    .verify(publicKey, Buffer.from(s.replace(/-/g, '+').replace(/_/g, '/'), 'base64'));
  ok('وتوقيعُه صحيحٌ بالمفتاح العامّ', verified, '');
  ok('وجسمُ طلب الرمز', T.tokenBody('a.b.c') === 'grant_type=urn%3Aietf%3Aparams%3Aoauth%3Agrant-type%3Ajwt-bearer&assertion=a.b.c', T.tokenBody('a.b.c'));
  ok('العابرُ يُعاد: 429 و503 لا 400 ولا 403', T.retryable(429) && T.retryable(503) && !T.retryable(400) && !T.retryable(403), '');
  ok('والانتظارُ ٥ ثمّ ١٠ ثمّ ٢٠ ثانية، أو ما تقوله Google بسقف ٣٠', T.backoffMs(0) === 5000 && T.backoffMs(1) === 10000
     && T.backoffMs(2) === 20000 && T.backoffMs(0, '7') === 7000 && T.backoffMs(0, '120') === 30000, '');
  ok('وخطأُ Google بلا رابطٍ يحمل رقمَ المشروع', T.googleError(403, { error: { status: 'PERMISSION_DENIED', message: 'denied https://x.y/z?project=123' } })
     === '403 PERMISSION_DENIED denied', T.googleError(403, { error: { status: 'PERMISSION_DENIED', message: 'denied https://x.y/z?project=123' } }));
}

console.log(`\n${n - bad}/${n}${bad ? ' — فشل' : ''}`);
process.exit(bad ? 1 : 0);
