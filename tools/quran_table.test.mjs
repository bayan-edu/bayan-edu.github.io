/* ══════════════════════════════════════════════════════════
   قياسُ js/quran.js (b199) — بلا متصفّح.
     node tools/quran_table.test.mjs

   ① جدولُ السور نسخةُ `quran_ayat` في sql/188_quran_refs.sql — يُقرأ الملفُّ نفسُه فيُقاس عليه الجدولُ سورةً
      سورة: ما يعرضه المحدِّدُ هو ما يقبله حارسُ القاعدة، وكلاهما ما في R2 (188 ④).
   ② والسورةُ المسمّاة في العنوان أو الوصف (`surahsNamed`) — اقتراحٌ يسقط حيث يُلبِس، فلا تُقترح لآيةٍ سورةُ أختها.
   ══════════════════════════════════════════════════════════ */
import { readFile } from 'node:fs/promises';
import { join, dirname } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const { SURAHS, surahName, ayatOf, surahsNamed } = await import(pathToFileURL(join(ROOT, 'js/quran.js')));

let bad = 0, n = 0;
const ok = (name, cond, extra = '') => { n++; if(!cond) bad++; console.log(cond ? '✅' : '❌', name, cond ? '' : extra); };
const show = v => JSON.stringify(v);

/* ① الجدولُ والقاعدة */
{
  const sql = await readFile(join(ROOT, 'sql/188_quran_refs.sql'), 'utf8');
  const m = sql.match(/select \(array\[([\s\S]*?)\]::int\[\]\)/);
  const db = m ? m[1].replace(/--[^\n]*/g, '').split(',').map(s => Number(s.trim())) : [];
  ok('مصفوفةُ quran_ayat تُقرأ من 188: ١١٤ عدداً صحيحاً', db.length === 114 && db.every(Number.isInteger), show(db.length));
  ok('في الجدول ١١٤ سورة', SURAHS.length === 114, show(SURAHS.length));
  ok('ومجموعُ آياتها ٦٢٣٦', SURAHS.reduce((s, [, a]) => s + a, 0) === 6236, show(SURAHS.reduce((s, [, a]) => s + a, 0)));
  const diff = SURAHS.map(([name, a], i) => a === db[i] ? null : `${i + 1} ${name}: ${a} ≠ ${db[i]}`).filter(Boolean);
  ok('وعددُ آيات كلّ سورةٍ عددُها في 188', diff.length === 0, diff.join(' · '));
  ok('والأسماءُ ١١٤ لا يتكرّر منها اسم', new Set(SURAHS.map(([name]) => name)).size === 114
     && SURAHS.every(([name]) => typeof name === 'string' && name.trim() === name && name), '');
  ok('surahName · ayatOf — وما خارج ١–١١٤ فارغ',
     surahName(6) === 'الأنعام' && ayatOf(6) === 165 && surahName(114) === 'الناس'
     && ayatOf(0) === 0 && ayatOf(115) === 0 && surahName(0) === '' && surahName(115) === '',
     show([surahName(6), ayatOf(6), ayatOf(0), ayatOf(115)]));
}

/* ② السورةُ المسمّاة — [النصّ، المتوقَّع، لماذا] */
{
  const cases = [
    ['النصوص: مِنْ أجلِ حياةٍ كريمةٍ (سورة الأنعام ١٥١–١٥٢)', [6], 'عنوانُ النصّ 599'],
    ['نص قرآني كريم من سورة الأنعام يتضمن الوصايا العشر', [6], 'ووصفُه'],
    ['سورةُ آلِ عِمْرَانَ', [3], 'بتشكيلٍ، وباسمٍ من كلمتين'],
    ['سورة الاسراء', [17], 'بلا همزة'],
    ['سورة بني إسرائيل', [17], 'وباسمها الآخر'],
    ['سورة المومنون', [23], 'والهمزةُ على الواو تُكتب واواً'],
    ['سورة الضحى', [93], 'والألفُ المقصورة'],
    ['سورة الرحمٰن', [55], 'والألفُ الخنجريّة'],
    ['سورة ق', [50], 'والاسمُ حرفٌ واحد'],
    ['سورة قريش', [106], '«قريش» لا «ق»'],
    ['سورة حم السجدة', [41], 'والأطولُ يغلب: «حم السجدة» لا «السجدة»'],
    ['سورة السجدة', [32], 'و«السجدة» وحدها'],
    ['في سورة براءة', [9], 'والاسمُ الآخر للتوبة'],
    ['سورة العصر وسورة الإخلاص', [103, 112], 'سورتان مسمّاتان ⇒ اثنتان'],
    ['سورة العصر والإخلاص', [103, 112], 'والواوُ تعطف سورةً ثانية'],
    ['سورة البقرة وهي مدنية', [2], 'وواوٌ لا تعطف سورةً لا تُعدّ'],
    ['سورة الأنعام: الآيتان ١٥١ و١٥٢', [6], 'والرقمُ بعد الواو لا يُقرأ اسماً'],
    ['سورتا الفلق والناس', null, 'والمثنّى ⇒ null: لا يُقترح شيء'],
    ['من سور القرآن الكريم', null, 'والجمعُ ⇒ null'],
    ['السورة الكريمة', [], '«السورة» بلا اسم'],
    ['سورة الكريمة', [], 'و«سورة» بعدها غيرُ اسم'],
    ['نص بلا سورة', [], 'ولا «سورة» في النصّ'],
    ['', [], 'والفارغ'],
    [null, [], 'وnull']
  ];
  for(const [t, want, why] of cases){
    const got = surahsNamed(t);
    ok(`${why} — ${show(t)}`, show(got) === show(want), `⇐ ${show(got)}`);
  }
}

console.log(`\n${n - bad}/${n}${bad ? ' — فشل' : ''}`);
process.exit(bad ? 1 : 0);
