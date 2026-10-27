/* ══════════════════════════════════════════════════════════
   قياسُ `textSentences` في js/book.js (b198) — بلا متصفّح.
     node tools/book_sentences.test.mjs

   وهي الجُمَلُ التي يقرؤها «استماع» جملةً جملة، ويسأل الجسرُ عن صوت كلٍّ منها (`bookVoice` في media.js):
   الآيةُ تُتلى بكتلتها ورقمها، وما سواها مولَّدٌ أو صامت. والكتابُ يبنيها بالدالّة نفسِها (`buildSents`)،
   فما يُقاس هنا هو ما يقرؤه الكتاب. والتشغيلُ نفسُه قِيس في المتصفّح — انظر STATE عند b198.
   ══════════════════════════════════════════════════════════ */
import { join, dirname } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const { textSentences } = await import(pathToFileURL(join(ROOT, 'js/book.js')));

let bad = 0, n = 0;
const ok = (name, cond, extra = '') => { n++; if(!cond) bad++; console.log(cond ? '✅' : '❌', name, cond ? '' : extra); };
const show = v => JSON.stringify(v);

/* ① النثر: العنوانُ جملةٌ أولى · العنوانُ الفرعيّ جملة · النقطةُ بعد اختصارٍ لا تقطع · والتنسيقُ يسقط من النصّ المنطوق */
{
  const s = textSentences('Science\n\nDr. Ali met **Mr.** Omar. They talked!\n\nThe end came quickly.', 'My Text');
  ok('الغلافُ جملةٌ أولى بنوعها', s[0]?.cover === true && s[0].kind === 'cover' && s[0].text === 'My Text', show(s[0]));
  ok('العنوانُ الفرعيّ جملةٌ من نوع h', s[1]?.kind === 'h' && s[1].text === 'Science', show(s[1]));
  ok('«Dr.» و«Mr.» لا تقطعان الجملة، والنجمتان تسقطان', s[2]?.text === 'Dr. Ali met Mr. Omar.', show(s[2]));
  ok('«!» تقطع', s[3]?.text === 'They talked!' && s[3].kind === 'p', show(s[3]));
  ok('وبلا عنوانٍ لا جملةَ غلاف', textSentences('One. Two.', '')[0]?.text === 'One.', show(textSentences('One. Two.', '')));
}

/* ② البيتُ جملةٌ واحدة بشطريه — والقصيدةُ بيتٌ في كلّ جملة */
{
  const s = textSentences('أَوْقِدْ فَإِنَّ اللَّيْلَ لَيْلٌ قَرُّ ۞ وَالرِّيحَ يَا مُوقِدُ رِيحُ صِرُّ.\n\nعَسَى يَرَى نَارَكَ مَنْ يَمُرُّ ۞ إِنْ جَلَبْتَ ضَيْفًا فَأَنْتَ حُرُّ.', '');
  ok('بيتان ⇒ جملتان من نوع v', s.length === 2 && s.every(x => x.kind === 'v'), show(s));
  ok('الشطران في جملةٍ واحدة بلا «۞»', s[0]?.text.includes('قَرُّ وَالرِّيحَ') && !s[0].text.includes('۞'), show(s[0]));
}

/* ③ الآية: كتلتُها ورقمُها، والمتّصلةُ كتلةٌ واحدة، والكتلةُ تُقسَم عند «۝» وحده */
{
  const body = [
    'مقدّمةٌ قصيرة. وفيها جملتان.',
    '﴿قُلْ تَعَالَوْا أَتْلُ مَا حَرَّمَ رَبُّكُمْ عَلَيْكُمْ ۖ ذَٰلِكُمْ وَصَّاكُم بِهِ لَعَلَّكُمْ تَعْقِلُونَ ۝١٥١﴾',
    '﴿وَلَا تَقْرَبُوا مَالَ الْيَتِيمِ أَيَحْسَبُ؟ ذَٰلِكُمْ وَصَّاكُم بِهِ لَعَلَّكُمْ تَذَكَّرُونَ ۝١٥٢﴾',
    'وبين الكتلتين نثر.',
    '﴿وَالْعَصْرِ ۝١﴾'
  ].join('\n\n');
  const s = textSentences(body, '');
  const q = s.filter(x => x.kind === 'q');
  ok('النثرُ جملتان من نوع p', s.slice(0, 2).every(x => x.kind === 'p') && s[1]?.text === 'وفيها جملتان.', show(s.slice(0, 2)));
  ok('ثلاثُ آياتٍ ⇒ ثلاثُ جملٍ من نوع q', q.length === 3, show(q));
  ok('المتّصلتان (١٥١ ثمّ ١٥٢) كتلةٌ واحدة: block 0 ومداها ١٥١–١٥٢',
     q[0]?.q?.block === 0 && q[1]?.q?.block === 0 && q[0].q.first === 151 && q[0].q.last === 152, show(q.slice(0, 2)));
  ok('لكلّ آيةٍ رقمُها: ١٥١ ثمّ ١٥٢', q[0]?.q?.ayah === 151 && q[1]?.q?.ayah === 152, show(q.map(x => x.q)));
  ok('«؟» داخل الآية لا تقطعها: الآيةُ ملفُّ تلاوةٍ واحد', q[1]?.text.includes('أَيَحْسَبُ؟ ذَٰلِكُمْ'), show(q[1]));
  ok('والكتلةُ بعد النثر block 1 بمداها ١–١', q[2]?.q?.block === 1 && q[2].q.first === 1 && q[2].q.last === 1 && q[2].q.ayah === 1, show(q[2]));
  ok('والجملةُ غيرُ القرآنيّة بلا q', s.filter(x => x.kind !== 'q').every(x => !x.q), show(s));
}

/* ④ آيةٌ بلا «۝» (أو رقمٍ لا يُعرف) ⇒ جملةٌ رقمُها null — فلا تُتلى (الجسرُ لا يخمّن) */
{
  const s = textSentences('﴿وَلَا تَقْرَبُوا الزِّنَىٰ﴾', '').filter(x => x.kind === 'q');
  ok('آيةٌ بلا رقم ⇒ ayah null', s.length === 1 && s[0].q.ayah === null, show(s));
}

console.log(`\n${n - bad}/${n}${bad ? ' — فشل' : ''}`);
process.exit(bad ? 1 : 0);
