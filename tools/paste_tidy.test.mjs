/* ══════════════════════════════════════════════════════════
   قياسُ منظّف اللصق `tidyPaste` في js/book.js (b189) — بلا متصفّح.
     node tools/paste_tidy.test.mjs

   والنصوصُ هنا تُكسَر كما يكسرها PDF (سطرٌ بعرض العمود، والفقرةُ بلا سطرٍ
   فارغ) ثمّ يُطلب من المنظّف أن يعيدها فقراتٍ كما كُتبت — حرفاً بحرف.
   والواجهةُ (الإشعارُ والدمجُ والتراجع) قِيست في المتصفّح. انظر STATE عند b189.
   ══════════════════════════════════════════════════════════ */
import { join, dirname } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const { tidyPaste } = await import(pathToFileURL(join(ROOT, 'js/book.js')));

let bad = 0, n = 0;
const ok = (name, cond, extra = '') => { n++; if(!cond) bad++; console.log(cond ? '✅' : '❌', name, cond ? '' : extra); };

/* يكسر الفقرةَ أسطراً بعرض `w` كما يفعل عمودُ PDF */
const wrap = (p, w) => {
  const out = []; let cur = '';
  for(const t of p.split(' ')){
    if(cur && (cur + ' ' + t).length > w){ out.push(cur); cur = t; }
    else cur = cur ? cur + ' ' + t : t;
  }
  if(cur) out.push(cur);
  return out.join('\n');
};

const EN = [
  'Egypt is one of the oldest civilizations in the world. For thousands of years, people have lived along the banks of the Nile, farming the rich soil.',
  'The pyramids of Giza still stand today as a symbol of human skill and patience. Thousands of workers cut and moved huge blocks of stone without machines.',
  'Egypt was also a crossroads for trade. Merchants traveled along the Nile and across the deserts, carrying goods from Africa, Asia and Europe to the busy markets.'
];
/* والضابطُ: الفقراتُ نفسُها بخواتيمَ تبلغ عرضَ العمود (٥٨ و٥١ من ٥٨) — هي الفجوةُ المعلنة */
const EN_FULL = [
  'Egypt is one of the oldest civilizations in the world. For thousands of years, people have lived along the banks of the Nile, farming the rich soil and building great cities.',
  'The pyramids of Giza still stand today as a symbol of human skill and patience. Thousands of workers cut and moved huge blocks of stone without modern machines.',
  EN[2]
];
const AR = [
  'مصر من أقدم الحضارات في العالم. عاش الناس آلاف السنين على ضفتي النيل، يزرعون الأرض الخصبة ويبنون المدن العظيمة.',
  'وما زالت أهرامات الجيزة قائمة إلى اليوم شاهداً على مهارة الإنسان وصبره. قطع آلاف العمال الحجارة الضخمة ونقلوها بلا آلات حديثة.',
  'وكانت مصر كذلك ملتقى للتجارة، سار التجار على النيل وعبر الصحارى يحملون البضائع من أفريقيا وآسيا وأوروبا إلى الأسواق.'
];

/* ① PDF إنجليزيّ — فقراتٌ بلا سطرٍ فارغ ⇒ تعود كما كُتبت */
{
  const pdf = EN.map(p => wrap(p, 58)).join('\n');
  const r = tidyPaste(pdf);
  ok('PDF إنجليزيّ ⇒ wrap', r?.mode === 'wrap', JSON.stringify(r));
  ok('PDF إنجليزيّ ⇒ الفقراتُ كما كُتبت حرفاً', r?.text === EN.join('\n\n'), '\n' + r?.text);
  ok('PDF إنجليزيّ ⇒ ثلاثُ فقرات', r?.paras === 3, r?.paras);
  ok('ولا يُقترح شيءٌ على ما نُظِّف (ثابتٌ عند التكرار)', tidyPaste(r?.text) === null, JSON.stringify(tidyPaste(r?.text)));
}

/* ①ب الفجوةُ المعلنة: خاتمةٌ بعرض العمود تُلصق فقرتَها بالتالية — ثمّ المسافةُ البادئة تفصلها */
{
  const r = tidyPaste(EN_FULL.map(p => wrap(p, 58)).join('\n'));
  ok('فجوةٌ معلنة: الخاتمةُ الكاملة تُدمج بالتالية (فقرةٌ واحدة من ثلاث)', r?.mode === 'wrap' && r.paras === 1, JSON.stringify(r));
  const ind = EN_FULL.map(p => wrap(p, 58).split('\n').map((l, j) => (j ? '' : '    ') + l).join('\n')).join('\n');
  const ri = tidyPaste(ind);
  ok('والمسافةُ البادئة إن وصلت تفصلها كما كُتبت', ri?.text === EN_FULL.join('\n\n'), '\n' + ri?.text);
}

/* ② PDF عربيّ */
{
  const pdf = AR.map(p => wrap(p, 50)).join('\n');
  const r = tidyPaste(pdf);
  ok('PDF عربيّ ⇒ wrap والفقراتُ كما كُتبت', r?.mode === 'wrap' && r.text === AR.join('\n\n'), '\n' + r?.text);
}

/* ③ كلمةٌ مقسومةٌ بشَرطة في آخر السطر · ورقمُ صفحةٍ وحده · وسطرُ صورة */
{
  const pdf = [
    'Egypt was also a crossroads for trade. Merchants trav-',
    'eled along the Nile and across the deserts, carrying',
    'goods from Africa, Asia and Europe to the markets.',
    '12',
    '[image: r2:img/nile.jpg | Where do the boats go?]',
    'The pyramids of Giza still stand today as a symbol of',
    'human skill and patience. Thousands of workers cut and',
    'moved huge blocks of stone without modern machines.'
  ].join('\n');
  const r = tidyPaste(pdf);
  const ps = (r?.text || '').split('\n\n');
  ok('الشَرطةُ في آخر السطر تُوصل (traveled)', ps[0]?.includes('Merchants traveled along'), ps[0]);
  ok('رقمُ الصفحة يسقط', !/(^|\n)12(\n|$)/.test(r?.text || '') && r?.dropped === 1, r?.text);
  ok('سطرُ الصورة يبقى فقرةً وحده', ps[1] === '[image: r2:img/nile.jpg | Where do the boats go?]', JSON.stringify(ps));
  ok('والفقرةُ بعدها تُدمج', ps[2] === 'The pyramids of Giza still stand today as a symbol of human skill and patience. Thousands of workers cut and moved huge blocks of stone without modern machines.', ps[2]);
}

/* ④ عنوانٌ فرعيٌّ قصير في PDF يبقى سطراً وحده */
{
  const pdf = ['Trade and Travel', ...EN.map(p => wrap(p, 58))].join('\n');
  const r = tidyPaste(pdf);
  ok('العنوانُ القصير يبقى وحده', r?.text.split('\n\n')[0] === 'Trade and Travel', r?.text.split('\n\n')[0]);
}

/* ⑤ Word — كلُّ فقرةٍ سطرٌ واحد، ويفصلها سطرٌ واحد ⇒ paras */
{
  const r = tidyPaste(EN.join('\n'));
  ok('Word ⇒ paras والفقراتُ مفصولةٌ بسطرٍ فارغ', r?.mode === 'paras' && r.text === EN.join('\n\n'), JSON.stringify(r));
  const ra = tidyPaste(AR.join('\n'));
  ok('Word عربيّ ⇒ paras', ra?.mode === 'paras' && ra.text === AR.join('\n\n'), JSON.stringify(ra));
}

/* ⑥ وما لا يُمسّ */
ok('نصٌّ سليم (فقراتٌ بأسطرٍ فارغة) ⇒ null', tidyPaste(EN.join('\n\n')) === null);
ok('شعرٌ قصيرُ الأسطر ⇒ null', tidyPaste([
  'I wandered lonely as a cloud', 'That floats on high over vales and hills',
  'When all at once I saw a crowd', 'A host of golden daffodils'
].join('\n')) === null);
ok('حوارٌ قصير ⇒ null', tidyPaste(['— Hello.', '— Hi, how are you today?', '— Fine, thank you.', '— Good.'].join('\n')) === null);
ok('سطران فقط ⇒ null (لا يُحكم على القليل)', tidyPaste('One line here\nand another line.') === null);
ok('فارغ ⇒ null', tidyPaste('') === null && tidyPaste(null) === null);
ok('نهايةُ السطر بـ\\r\\n كـ\\n', tidyPaste(EN.map(p => wrap(p, 58)).join('\r\n'))?.text === EN.join('\n\n'));

console.log(`\n${n - bad} / ${n}`);
if(bad) process.exit(1);
