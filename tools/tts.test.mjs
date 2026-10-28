/* ══════════════════════════════════════════════════════════
   قياسُ `supabase/functions/tts/core.js` — منطقُ دالّة التوليد بلا Deno ولا شبكة.
     node tools/tts.test.mjs

   ما يُقاس: الطلبُ وحدودُه · ما يُمسَك بلا صوت · ما شكّله المؤلّف · فحصُ الحروف بثلاثة ما لا يُعدّ تغييراً · الوقفُ والابتداء ·
   العنوانُ بضبطه التامّ · جوابُ التشكيل · طلبُ الصوت — والشخصيّةُ وأصواتُ Cloud ·
   مدّةُ MP3 من إطاراتٍ مصنوعةٍ معلومةِ المدّة · البصمةُ = بصمةُ القاعدة · المفاتيحُ = قيدُ القاعدة (189) · وتوقيعُ JWT يُتحقَّق
   منه بمفتاحٍ عامّ. والطريقُ الحقيقيّ إلى Google في `tools/tts_trial.mjs`.
   🆕 b207 · والآيةُ المقتبسة (⑧): الجزءُ بقوسيه والإمساك · المعرفةُ على عيّنةٍ من المصحف بحرفه (`tools/fixtures/quran_quotes.json`) — آياتُ
   `593` السبعُ وآيتان في اقتباسٍ واحد والبسملة · العتبة · ما يُتلى بحكم المالك · القصُّ بالإطارات · واسمُ الصوت. والمصحفُ كلُّه في
   `tools/quran_quotes.mjs`.
   ══════════════════════════════════════════════════════════ */
import { readFileSync } from 'node:fs';
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
  ok('spokenFor: وما صحّحه المعلّمُ بيده يُقرأ بحرفه — لا وقفَ آليّاً عليه ولا ابتداء', T.spokenFor({ text: 'ب', kind: 'cover', spoken: 'عُنْوَانٌ' }, 'عُنْوَانٌ') === 'عُنْوَانٌ', '');
  /* سؤالُ المالك (٢٨ أكتوبر): «عادةً» بين شرطتين يصحّحها في المربّع فترجع «عاده» — والجملةُ بحرفها من رسالته */
  const fixed = 'وَتَفْضِيلُ إِدَارَتِهْ — عَادَةً — نَمَطَ التَّطَوُّرِ المُتَدَرِّجِ عَلَى النَّمَطِ الثَّوْرِيِّ المُنْدَفِعِ لِمُنَافَسَةِ الصَّغِيرِ السَّرِيعْ.';
  ok('spokenFor: «— عَادَةً —» كما صحّحها المعلّم، وكانت ترجع «عَادَهْ» بوقف الشرطة', T.spokenFor({ text: 'ب', kind: 'p', spoken: fixed }, fixed) === fixed
     && T.spokenFor({ text: 'ب', kind: 'p', spoken: null }, fixed).includes('— عَادَهْ —'), T.spokenFor({ text: 'ب', kind: 'p', spoken: fixed }, fixed));

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
}

/* ⑤-ب الشخصيّةُ النسائيّة ونبرةُ النصّ (حكمُ المالك: «Gacrux والثاني Achernar» · «نعم تلقائياً» · «يحتاج ضبط للنبرة حسب النص») */
{
  /* الجملُ التي قدّمت لسطور الحوار في `603` بحرفها — ثلاثَ عشرةَ لزبيبة وعشرٌ لعنترة (قُرئت من اللوحة الحيّة · ٢٨ أكتوبر) */
  const HER = ['فقالت له زبيبة:', 'فنظر إليها عنترة ولم يجب فاستمرت قائلة:', 'وكانت زبيبة تستمع إليه فى دهشة متعجبة من قوله وصاحت فى ألم:',
    'فقالت زبيبة مسرعة:', 'فقالت زبيبة هادئة:', 'فقالت زبيبة:', 'وما كاد ينطق بالكلمة الأخيرة حتى صاحت به زبيبة فى حنق:',
    'فقالت زبيبة بين شهقاتها:', 'فتخاذلت زبيبة، ومدت يديها فى تضرع وقالت:', 'وسكتت لحظة ثم قالت بصوت متهدج:',
    'ثم وثب واقفًا وقامت أمه تتعلق به قائلة:'];
  const HIS = ['فخضع عنترة وأطرق حينا ثم قال لها:', 'فقال عنترة فى مرارة:', 'فصاح عنترة:',
    'ثم وضعت رأسها بين كفيها وأخذت تبكى وفلان عنترة وقال يستعطفها:', 'فقال عنترة فى شبه صيحة:', 'فقال عنترة:',
    'فنظر عنترة إليها وقد هدأت ثائرته وقال ساخرًا:', 'بت من عينيه دمعه بادر إليها فمسحها، ثم تخلص منها برفق، وقال بصوت خافت:',
    'فقال عنترة فى دفعة:', 'فنظر عنترة إلى وجه أمه وقال:'];
  const wrongHer = HER.filter(l => !T.femaleLead(l)), wrongHis = HIS.filter(l => T.femaleLead(l));
  ok('سطورُ زبيبة في 603 بعد فعل قولٍ مؤنّث — كلُّها', !wrongHer.length, show(wrongHer));
  ok('وسطورُ عنترة لا شيءَ منها — ولو سبق القولَ مؤنّثٌ غيرُ قول («وأخذت تبكى … وقال»)', !wrongHis.length, show(wrongHis));
  const cases = [
    ['فَقَالَتْ زَبِيبَةُ:', true, 'والمشكولُ كغيره'], ['فأجابته:', true, 'وهمزةُ أوّل الفعل وضميرُ المفعول'], ['فاجابت:', true, 'وبلا همزة'],
    ['سألته أمه:', true, '«سألته» قولٌ'], ['قال وقد سالت دموعه:', false, '«سالت» سيلانٌ لا قول'],
    ['فقالت زبيبة: كفى. فقال عنترة:', false, 'وآخرُ القولين هو الحَكَم'], ['وكان الليل حالكاً.', false, 'ولا قولَ ⇒ لا'],
    ['', false, 'ولا جملةَ قبله ⇒ لا'], ['وهي تقول:', false, 'والمضارعُ لا يُعدّ']
  ];
  for(const [lead, want, why] of cases) ok(`femaleLead: ${why}`, T.femaleLead(lead) === want, `${lead} ⇒ ${T.femaleLead(lead)}`);

  const her = { text: '- إنك ابنه.', kind: 'p', lead: 'فقالت زبيبة بين شهقاتها:' };
  ok('المقترحُ لسطرها Gacrux، ولسطره Algenib، وبلا جملةٍ قبله Algenib', T.recommend(her) === 'gacrux' && T.FEMALE === 'gacrux'
     && T.recommend({ ...her, lead: 'فقال عنترة:' }) === 'algenib' && T.recommend({ ...her, lead: null }) === 'algenib', '');
  ok('والسردُ بعد «قالت» سردٌ لا شخصيّة', T.recommend({ text: 'ثم سكتت.', kind: 'p', lead: 'فقالت زبيبة:' }) === 'iapetus', '');
  const v = T.voiceFor(her);
  ok('وصوتُها Gacrux على Gemini بتوجيه الحوار ونبرةِ ما قدّم له النصّ', v.name === 'Gacrux' && v.prompt.startsWith(T.TTS.dialogue)
     && v.prompt.includes('«فقالت زبيبة بين شهقاتها:»'), show(v));
  const mine = T.voiceFor({ ...her, tone: 'منكسرة باكية' });
  ok('ونبرةُ المؤلّف تغلب ما استُنبط', mine.prompt.includes('منكسرة باكية') && !mine.prompt.includes('شهقاتها'), show(mine));
  const alt = T.voiceFor({ ...her, voice: 'achernar' });
  ok('وAchernar بديلٌ في اللوحة بالتوجيه نفسِه', alt.name === 'Achernar' && alt.prompt.includes('شهقاتها'), show(alt));
  const nar = T.voiceFor({ text: 'ثم سكتت.', kind: 'p', voice: 'charon', tone: 'حزينة' });
  ok('ونبرةُ المؤلّف في السرد لصوت Gemini، ولا توجيهَ لصوت Chirp', nar.prompt === T.TTS.prompt + ' وبهذه النبرة: حزينة.'
     && T.voiceFor({ text: 'ثم سكتت.', kind: 'p', tone: 'حزينة' }).prompt === undefined, show(nar));
  const long = T.voiceFor({ ...her, lead: 'س'.repeat(500) + ' فقالت بين شهقاتها:' });
  ok('والجملةُ الطويلة قبله يُعطى آخرُها (فيه فعلُ القول وحالُه)', long.prompt.includes('فقالت بين شهقاتها:') && !long.prompt.includes('س'.repeat(400)), '');
  const req = T.checkRequest({ item: 1, sentences: [{ text: '- إنك ابنه.', lead: '  فقالت زبيبة:  ', tone: '  منكسرة   باكية ' }] });
  ok('والطلبُ يحمل الجملةَ قبله والنبرةَ مشذَّبتين', req.sentences?.[0]?.lead === 'فقالت زبيبة:' && req.sentences[0].tone === 'منكسرة باكية', show(req));
  ok('والنبرةُ فوق ٢٠٠ حرف تُردّ', T.checkRequest({ item: 1, sentences: [{ text: 'ب.', tone: 'ح'.repeat(201) }] }).error === 'النبرة فارغة أو أطول من ٢٠٠ حرف', '');

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

/* ⑧ الآيةُ المقتبسة (b207) — حكمُ المالك: «المعرفة سليمة، لكن ما انتهى وصلاً تُتلى فيه الآية كاملة» */
{
  const fx = JSON.parse(readFileSync(join(ROOT, 'tools/fixtures/quran_quotes.json'), 'utf8'));
  const Q = T.quranIndex(fx.tanzil.join('\n'), fx.timing);
  ok('الفهرس: الآياتُ كلماتٍ وتوقيتُها، والسورُ هياكل', Q.verses.size === fx.tanzil.length && Q.timing.size === fx.timing.length
     && Q.verses.get('3:110').length === 23 && Q.surahs.every(c => c.text.length === c.ayah.length && c.text.length === c.word.length), '');
  const line112 = fx.tanzil.find(l => l.startsWith('112|1|')).split('|')[2].split(' ');
  ok('والبسملةُ تُنزع من رأس الأولى إلا في الفاتحة — فيتّفق عدُّ الكلمات والتوقيت', line112.length === 8
     && Q.verses.get('112:1').join(' ') === line112.slice(4).join(' ')
     && Q.verses.get('1:1').length === 4 && Math.max(...Q.timing.get('112:1').map(x => x[1])) === Q.verses.get('112:1').length, show(Q.verses.get('112:1')));

  ok('الجزءُ بقوسيه وحده آيةٌ مقتبسة، والجملةُ بقوسيها ليست جزءاً', T.isQuote('﴿لَا إِكْرَاهَ فِي الدِّينِ﴾') && T.isQuote(' ﴿ا﴾ ')
     && !T.isQuote('قال ﴿ا﴾') && !T.isQuote('﴿ا﴾ ﴿ب﴾') && !T.isQuote('نثر') && !T.isQuote('﴿﴾'), '');
  ok('والإمساك: الجملةُ كاملةً بقوسيها تُرسل أجزاءً · وقوسان لا يتقابلان · والجزءُ والنثرُ لا يُمسكان',
     T.held({ text: 'قال ﴿ا﴾ هنا.' }) === T.QUOTE_HELD && T.held({ text: 'قال ﴿ا هنا.' }) === T.QUOTE_UNPAIRED
     && T.held({ text: 'قال ا﴾ هنا.' }) === T.QUOTE_UNPAIRED && T.held({ text: '﴿ا ﴿ب﴾﴾' }) === T.QUOTE_UNPAIRED
     && T.held({ text: '﴿لَا إِكْرَاهَ فِي الدِّينِ﴾' }) === null && T.held({ text: 'نثر.' }) === null, '');
  ok('وما بين القوسين نثراً بلا قوسيه', T.quoteInner(' ﴿ نص ﴾ ') === 'نص', '');
  ok('والطلبُ يقبل الجزءَ بقوسيه', !T.checkRequest({ item: 593, sentences: ['﴿لَا إِكْرَاهَ فِي الدِّينِ﴾'] }).error, '');

  /* آياتُ 593 السبعُ كما كتبها المؤلّف — والكلماتُ من الصفر كما عرفتها التجربة (الأنبياء ٩٢ ١–٨ · آل عمران ١١٠ ١–٥ …) */
  const QUOTES = [
    ['إِنَّ هَٰذِهِ أُمَّتُكُمْ أُمَّةً وَاحِدَةً وَأَنَا رَبُّكُمْ فَاعْبُدُونِ', 21, 92, 0, 7],
    ['كُنتُمْ خَيْرَ أُمَّةٍ أُخْرِجَتْ لِلنَّاسِ', 3, 110, 0, 4],
    ['وَلَهُنَّ مِثْلُ الَّذِي عَلَيْهِنَّ بِالْمَعْرُوفِ', 2, 228, 29, 33],
    ['لِّلرِّجَالِ نَصِيبٌ مِّمَّا اكْتَسَبُوا ۖ وَلِلنِّسَاءِ نَصِيبٌ مِّمَّا اكْتَسَبْنَ', 4, 32, 9, 16],
    ['وَمِنْ آيَاتِهِ أَنْ خَلَقَ لَكُم مِّنْ أَنفُسِكُمْ أَزْوَاجًا لِّتَسْكُنُوا إِلَيْهَا وَجَعَلَ بَيْنَكُم مَّوَدَّةً وَرَحْمَةً', 30, 21, 0, 13],
    ['لَا إِكْرَاهَ فِي الدِّينِ', 2, 256, 0, 3],
    ['وَلَوْ شَاءَ رَبُّكَ لَآمَنَ مَن فِي الْأَرْضِ كُلُّهُمْ جَمِيعًا ۚ أَفَأَنتَ تُكْرِهُ النَّاسَ حَتَّىٰ يَكُونُوا مُؤْمِنِينَ', 10, 99, 0, 14]
  ];
  const hits = QUOTES.map(([q]) => T.findQuote(Q, `﴿${q}﴾`));
  const wrong = hits.filter((h, k) => { const [, s, a, f, t] = QUOTES[k], r = h.ranges[0];
    return !(h.score === 1 && h.ranges.length === 1 && r.s === s && r.a === a && r.from === f && r.to === t); });
  ok('آياتُ 593 السبعُ تُعرف بسورتها وآيتها وكلماتها، وتطابقُها ١٠٠٪', !wrong.length, show(wrong));
  ok('وبإملاءٍ بلا حركاتٍ ولا همز، وبخطأ: ٩٠٪ فأكثر', ['كنتم خير امه اخرجت للناس', 'لا اكراه فى الدين', 'ولهن مثل التي عليهن بالمعروف']
     .every(q => T.quoteVerdict(T.findQuote(Q, q).score) === 'quran'), '');
  const prose = ['يقول جل ذكره', 'قال الشاعر في وصف الليل', 'وهي أمة يعلو فيها السلطان الإلهي على السلطان القبلي'];
  ok('والنثرُ دون ٨٠٪ ⇒ يُقرأ نثراً', prose.every(q => T.quoteVerdict(T.findQuote(Q, q).score) === 'prose'),
     show(prose.map(q => T.findQuote(Q, q).score)));
  ok('والعتبة: ٩٠٪ فأكثر آية · دون ٨٠٪ نثر · وما بينهما يُمسَك بسببه وأقربِ آيةٍ له', T.quoteVerdict(1) === 'quran' && T.quoteVerdict(0.9) === 'quran'
     && T.quoteVerdict(0.857) === 'unsure' && T.quoteVerdict(0.8) === 'unsure' && T.quoteVerdict(0.79) === 'prose'
     && T.quoteVerdict(T.findQuote(Q, 'كنتم خير امة خرجت للناس جميعا').score) === 'unsure'
     && /3:110/.test(T.quoteUnsure({ score: 0.857, ranges: [{ s: 3, a: 110 }] })) && /86٪/.test(T.quoteUnsure({ score: 0.857, ranges: [{ s: 3, a: 110 }] })), '');
  ok('وفارغٌ بلا حروف ⇒ صفر', T.findQuote(Q, '﴿ ۖ ﴾').score === 0 && T.findQuote(Q, '').ranges.length === 0, '');

  const span = k => T.quoteSpan(Q, hits[k].ranges[0]);
  ok('حكمُ المالك: ما انتهى وصلاً تُتلى فيه الآيةُ كاملة — آل عمران ١١٠ والبقرة ٢٢٨', span(1).whole && span(1).widened && span(1).from === 0
     && span(1).to === 22 && span(2).whole && span(2).widened && span(1).words === Q.verses.get('3:110').join(' '), show([span(1), span(2)]));
  ok('وما وقف قبله وبعده يُقصّ وحده — النساء ٣٢ والروم ٢١ والبقرة ٢٥٦', [3, 4, 5].every(k => !span(k).whole && !span(k).widened)
     && span(3).from === 9 && span(3).to === 16 && span(5).words === Q.verses.get('2:256').slice(0, 4).join(' '), show([span(3), span(4), span(5)]));
  ok('والهامشُ في الصمت كما سُمع في التجربة: النساء ٣٢ من ٩٨٥٠ إلى ٢٣١٠٠ مللي', span(3).start === 9850 && span(3).end === 23100, show(span(3)));
  ok('والمقتبسةُ كاملةً تُتلى كاملة بلا توسيع — الأنبياء ٩٢ ويونس ٩٩', span(0).whole && !span(0).widened && span(6).whole && !span(6).widened, '');
  ok('وآيةٌ بلا توقيتٍ تُتلى كاملةً من أوّل ملفّها إلى آخره', (() => {
    const x = T.quoteSpan({ verses: Q.verses, timing: new Map() }, { s: 2, a: 256, from: 0, to: 3 });
    return x.whole && x.widened && x.start === 0 && x.end === Infinity; })(), '');
  ok('وآيةٌ لا يتّفق عدُّ كلماتها والتوقيت تُتلى كاملة', (() => {
    const odd = new Map(Q.timing); odd.set('2:256', Q.timing.get('2:256').map(x => [x[0] + 1, x[1] + 1, x[2], x[3]]));
    return T.quoteSpan({ verses: Q.verses, timing: odd }, { s: 2, a: 256, from: 0, to: 3 }).widened; })(), '');

  const two = T.findQuote(Q, 'قُلْ هُوَ اللَّهُ أَحَدٌ اللَّهُ الصَّمَدُ');
  ok('والممتدّةُ على آيتين مداها في كلٍّ — والبسملةُ ليست منها', two.score === 1 && show(two.ranges)
     === show([{ s: 112, a: 1, from: 0, to: 3 }, { s: 112, a: 2, from: 0, to: 1 }]), show(two));
  ok('واسمُ الصوت مرجعُه: كاملة · مدى كلماتٍ من الواحد · كاملة للوصل · وآيتان بـ«+»',
     T.quoteLabel(two.ranges.map(r => T.quoteSpan(Q, r))) === 'الحصري · Husary_64kbps · 112:1 · كاملة + 112:2 · كاملة'
     && T.quoteLabel([span(3)]) === 'الحصري · Husary_64kbps · 4:32 · 10-17' && T.quoteLabel([span(1)]) === 'الحصري · Husary_64kbps · 3:110 · كاملة للوصل'
     && T.quoteLabel([span(1)]).startsWith(T.QUOTE_VOICE), T.quoteLabel([span(1)]));

  /* القصُّ بالإطارات: مئةُ إطارٍ MPEG-2 كلٌّ ٢٤ مللي — كتسجيل الحصري (MPEG-2) */
  const frames = new Uint8Array(9600);
  for(let k = 0; k < 100; k++) frames.set([0xFF, 0xF3, 0x44, 0xC4], k * 96);
  const f = T.mp3Frames(frames);
  ok('الإطاراتُ بمواضعها وأزمنتها', f.length === 100 && f[1].off === 96 && f[1].t === 24 && f[99].t === 2376 && T.mp3Ms(frames) === 2400, '');
  const c = T.mp3Cut(frames, 500, 1000);
  ok('القصُّ: من الإطار الذي يبلغ البدءَ ومعه إطارٌ قبله، إلى آخر إطارٍ يبدأ قبل النهاية — بلا إعادة ترميز', c.ms === 552
     && c.bytes.length === 23 * 96 && c.bytes[0] === 0xFF && c.bytes[96] === 0xFF && T.mp3Ms(c.bytes) === 552, show({ ms: c?.ms, len: c?.bytes.length }));
  ok('وما بعد آخر الملفّ يقف عند آخره، وما بعده كلُّه لا شيء', T.mp3Cut(frames, 2300, Infinity).ms === 144 && T.mp3Cut(frames, 5000, 6000) === null, '');
}

console.log(`\n${n - bad}/${n}${bad ? ' — فشل' : ''}`);
process.exit(bad ? 1 : 0);
