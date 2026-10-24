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

console.log(`\n${n - bad} / ${n}`);
if(bad) process.exit(1);
