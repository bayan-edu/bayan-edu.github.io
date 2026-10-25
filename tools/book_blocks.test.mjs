/* ══════════════════════════════════════════════════════════
   قياسُ `textBlocks` و`textDir` في js/book.js (b190) — بلا متصفّح.
     node tools/book_blocks.test.mjs

   وهما ما يقرؤه «إدراجٌ من نصّ الكتاب» في محرّر النصّ المشترك: الفقراتُ
   كما يقسمها الكتاب وبترقيم هامشه، وكلُّ فقرةٍ كما كُتبت فتُدرج حرفاً.
   والواجهةُ (اللوحةُ والإدراجُ والتراجع) قِيست في المتصفّح. انظر STATE عند b190.
   ══════════════════════════════════════════════════════════ */
import { join, dirname } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const { textBlocks, textDir } = await import(pathToFileURL(join(ROOT, 'js/book.js')));

let bad = 0, n = 0;
const ok = (name, cond, extra = '') => { n++; if(!cond) bad++; console.log(cond ? '✅' : '❌', name, cond ? '' : extra); };
const show = v => JSON.stringify(v);

/* ① ترقيمٌ آليّ · عنوانٌ فرعيّ · سطرُ صورة يُستبعد · وعنوانُ النصّ المكرَّر يسقط */
{
  const body = [
    'Taking Pride in Egypt',
    'The Nile',
    'Egypt is one of the oldest civilizations in the world.',
    '[image: r2:img/nile.jpg | Where do the boats go?]',
    'The pyramids still stand **today** as a symbol of human skill.\nAnd patience.',
    'Merchants traveled along the Nile, carrying goods.'
  ].join('\n\n');
  const b = textBlocks(body, 'Taking Pride in Egypt');
  ok('العنوانُ المكرَّر في أوّل النصّ يسقط كما في الكتاب', !b.some(x => x.raw === 'Taking Pride in Egypt'), show(b));
  ok('العنوانُ الفرعيّ كتلةٌ من نوع h بلا رقم', b[0]?.type === 'h' && b[0].n === null && b[0].raw === 'The Nile', show(b[0]));
  ok('سطرُ الصورة لا يُعاد', !b.some(x => x.raw.startsWith('[image')), show(b));
  ok('الترقيمُ ترقيمُ الهامش: ١ · ٢ · ٣', b.filter(x => x.type === 'p').map(x => x.n).join() === '1,2,3', show(b));
  ok('الفقرةُ كما كُتبت: التنسيقُ والسطرُ المفرد باقيان',
     b[2]?.raw === 'The pyramids still stand **today** as a symbol of human skill.\nAnd patience.', show(b[2]));
}

/* ② رقمُ المؤلّف «(١)» يبقى في النصّ كما كتبه، والرقمُ رقمُه */
{
  const b = textBlocks('(١) مصر بلد قديم.\n\n(٢) والنيل نهر طويل.', 'نص');
  ok('رقمُ المؤلّف هو الرقم', b.map(x => x.n).join() === '١,٢', show(b));
  ok('ويبقى في الفقرة كما كتبه', b[0]?.raw === '(١) مصر بلد قديم.', show(b[0]));
}

/* ③ فقراتٌ بحروف (A · B · C) ⇒ بلا ترقيم، والحرفُ في النصّ */
{
  const b = textBlocks('A Egypt is old.\n\nB The Nile is long.\n\nC Trade was rich.', 'T');
  ok('الحروفُ تُلغي الترقيم', b.every(x => x.n === null) && b.length === 3, show(b));
  ok('والحرفُ باقٍ في الفقرة', b[1]?.raw === 'B The Nile is long.', show(b[1]));
}

/* ④ الاتجاهُ من النصّ لا من وسمه */
ok('نصٌّ إنجليزيّ ⇒ ltr', textDir('Egypt is one of the oldest civilizations.') === 'ltr');
ok('نصٌّ عربيّ ⇒ rtl', textDir('مصر من أقدم الحضارات في العالم.') === 'rtl');
ok('إنجليزيٌّ يبدأ باسمٍ عربيّ يبقى ltr', textDir('بيان is a platform for learning English well.') === 'ltr');

/* ⑤ الفارغ */
ok('نصٌّ فارغ ⇒ لا كتل', textBlocks('', 'T').length === 0 && textBlocks(null, null).length === 0);

/* ⑥ b193 · البيت — كتلةٌ برقمه، وسطرُه كما كُتب «صدر ۞ عجز» */
{
  const b = textBlocks('(١) أَمْسَتْ سُعَادُ بِأَرْضٍ لَا يُبَلِّغُهَا ۞ إِلَّا العِتَاقُ النَّجِيبَاتُ المَرَاسِيلُ.\n\n'
    + '(٢) وَلَنْ يُبَلِّغَهَا إِلَّا عُذَافِرَةٌ ۞ فِيهَا عَلَى الأَيْنِ إِرْقَالٌ وَتَبْغِيلُ.', 'نص');
  ok('بيتان كتبهما المؤلّفُ فقرتين ⇒ كتلتان برقميه', b.length === 2 && b.map(x => x.n).join() === '١,٢', show(b));
  ok('والسطرُ كما كُتب برقمه وفاصله', b[0]?.raw.startsWith('(١) أَمْسَتْ') && b[0].raw.includes('۞'), show(b[0]));
}
{
  const b = textBlocks('صدرُ البيتِ الأوّل ۞ عجزُ البيتِ الأوّل\nصدرُ البيتِ الثاني ۞ عجزُ البيتِ الثاني\nصدرٌ ثالث ۞ عجزٌ ثالث', 'قصيدة');
  ok('قصيدةٌ خالصةٌ في فقرةٍ واحدة ⇒ كلُّ بيتٍ كتلةٌ برقمه', b.length === 3 && b.map(x => x.n).join() === '1,2,3', show(b));
}
ok('بيتٌ قصيرٌ بلا وقف ليس عنواناً', textBlocks('قِفا نبكِ ۞ من ذِكرى\n\nفقرةٌ بعده.', 'T')[0]?.type === 'p');
{
  /* سطرٌ قصيرٌ بلا وقف يُقرأ عنواناً — فلو صار بيتاً لسقط عنه ذلك وظهر فقرة */
  const body = 'Note: * marks the optional words\n\nكان الجوّ باردًا ... ثم خرجنا\n\nآخرُ فقرةٍ في النصّ.';
  const b = textBlocks(body, 'T');
  ok('«*» و«...» بين مسافتين ليستا فاصلَ شطرين', b[0]?.type === 'h' && b[1]?.type === 'h' && b[2]?.n === '1', show(b));
}
{
  const body = 'قال الشاعرُ في الكرم كلاماً حسناً.\n\nأَوْقِدْ فَإِنَّ اللَّيْلَ لَيْلٌ قَرُّ ۞ وَالرِّيحَ يَا مُوقِدُ رِيحُ صِرُّ\n'
    + 'عَسَى يَرَى نَارَكَ مَنْ يَمُرُّ ۞ إِنْ جَلَبْتَ ضَيْفًا فَأَنْتَ حُرُّ\n\nثمّ مضى في حديثه.';
  const b = textBlocks(body, 'T');
  ok('في النثر: الشاهدُ كتلةٌ واحدةٌ برقم فقرته، والترقيمُ يمضي ١ · ٢ · ٣',
     b.length === 3 && b.map(x => x.n).join() === '1,2,3' && b[1].raw.split('\n').length === 2, show(b));
}

/* ⑦ b193 · القرآن — بلا رقم، والمتتالي فقرةٌ واحدة */
{
  const body = '﴿قُلْ تَعَالَوْا أَتْلُ مَا حَرَّمَ رَبُّكُمْ عَلَيْكُمْ ۖ ذَٰلِكُمْ وَصَّاكُم بِهِ لَعَلَّكُمْ تَعْقِلُونَ ۝١٥١﴾\n\n'
    + '[image: r2:img/q.webp | مصحف]\n\n'
    + '﴿وَلَا تَقْرَبُوا مَالَ الْيَتِيمِ ۚ ذَٰلِكُمْ وَصَّاكُم بِهِ لَعَلَّكُمْ تَذَكَّرُونَ ۝١٥٢﴾';
  const b = textBlocks(body, 'T');
  ok('آيتان متتاليتان (والصورةُ بينهما) ⇒ فقرةٌ واحدة', b.length === 1, show(b));
  ok('والآيةُ بلا رقم', b[0]?.n === null, show(b[0]));
}
{
  const b = textBlocks('﴿وَالْعَصْرِ ۝١﴾\n\n﴿إِنَّ الْإِنسَانَ لَفِي خُسْرٍ ۝٢﴾\n\n﴿قُلْ هُوَ اللَّهُ أَحَدٌ ۝١﴾', 'T');
  ok('رقمٌ لا يتّصل (۝٢ ثمّ ۝١) ⇒ فقرةٌ جديدة', b.length === 2 && b.every(x => x.n === null && x.type === 'p'), show(b));
}
{
  const b = textBlocks('مقدّمةٌ قصيرةٌ عن النصّ الكريم.\n\n﴿وَالْعَصْرِ ۝١﴾\n\nوفي السورة دعوةٌ إلى ﴿وَتَوَاصَوْا بِالصَّبْرِ﴾ في كلّ حال.', 'T');
  ok('الآيةُ لا تُعدّ: النثرُ حولها ١ · ٢، وآيةٌ داخل فقرة نثرٍ لا تُسقط رقمَها',
     b.map(x => x.n ?? '-').join() === '1,-,2', show(b));
}

console.log(`\n${n - bad} / ${n}`);
if(bad) process.exit(1);
