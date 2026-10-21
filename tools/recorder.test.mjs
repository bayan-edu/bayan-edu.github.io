/* ══════════════════════════════════════════════════════════
   قياسُ الأدوات النقيّة في js/recorder.js (b164) — بلا متصفّح.
     node tools/recorder.test.mjs

   والواجهةُ نفسُها قِيست في Chromium بميكروفونٍ مصطنع
   (`--use-fake-device-for-media-stream`) — تسجيلٌ حقيقيّ ثلاث ثوانٍ،
   مراجعةٌ، فشلُ رفعٍ ثمّ إعادةٌ على المسار نفسه. انظر STATE عند b164.
   ══════════════════════════════════════════════════════════ */
import { readFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const R = await import(pathToFileURL(join(ROOT, 'js/recorder.js')));

let bad = 0, n = 0;
const ok = (name, cond, extra = '') => { n++; if(!cond) bad++; console.log(cond ? '✅' : '❌', name, cond ? '' : extra); };

/* ① الأنواع — ومسطرةُ المخزن (sql/171) هي مسطرةُ هذا الملفّ */
ok('baseMime ينزع المعاملات', R.baseMime('audio/webm;codecs=opus') === 'audio/webm' && R.baseMime(' Audio/MP4 ') === 'audio/mp4');
const sql = readFileSync(join(ROOT, 'sql/171_recordings.sql'), 'utf8');
const bucket = (sql.match(/array\['audio\/webm', 'audio\/ogg', 'audio\/mp4'\]/) || [])[0];
ok('ACCEPT = أنواعُ المخزن في 171 بحرفها', !!bucket && R.ACCEPT.join() === 'audio/webm,audio/ogg,audio/mp4');
ok('pickMime: كروم ⇒ webm بـopus', R.pickMime(m => m.startsWith('audio/webm')) === 'audio/webm;codecs=opus');
ok('pickMime: سفاري ⇒ mp4', R.pickMime(m => m === 'audio/mp4') === 'audio/mp4');
ok('pickMime: فايرفوكس ⇒ ogg', R.pickMime(m => m.startsWith('audio/ogg')) === 'audio/ogg;codecs=opus');
ok('pickMime: لا شيء ⇒ null · واستثناءٌ لا يُسقطه', R.pickMime(() => false) === null && R.pickMime(() => { throw 1; }) === null);
ok('كلُّ ما قد يختاره pickMime يقبله المخزن بعد baseMime',
   ['audio/webm;codecs=opus', 'audio/webm', 'audio/ogg;codecs=opus', 'audio/ogg', 'audio/mp4']
     .every(m => R.ACCEPT.includes(R.baseMime(m))));

/* ② القدرة */
ok('canRecord: بلا mediaDevices ⇒ false', R.canRecord({ navigator: {}, MediaRecorder: { isTypeSupported: () => true } }) === false);
ok('canRecord: بلا MediaRecorder ⇒ false', R.canRecord({ navigator: { mediaDevices: { getUserMedia(){} } } }) === false);
ok('canRecord: كامل ⇒ true', R.canRecord({ navigator: { mediaDevices: { getUserMedia(){} } },
                                          MediaRecorder: { isTypeSupported: m => m === 'audio/mp4' } }) === true);

/* ③ الساعة والأيام */
const AR = s => String(s).replace(/[0-9]/g, d => '٠١٢٣٤٥٦٧٨٩'[+d]);
ok('clock 75 ⇒ 1:15', R.clock(75) === '1:15');
ok('clock 3.9 ⇒ 0:03 (لا تقريب لأعلى)', R.clock(3.9) === '0:03');
ok('clock بالهنديّة', R.clock(305, AR) === '٥:٠٥');
const now = new Date(2026, 9, 21, 0, 30);
ok('daysAgo: أمس ولو قبل ساعة (بالتقويم)', R.daysAgo(new Date(2026, 9, 20, 23, 50).toISOString(), now) === 1);
ok('daysAgo: اليوم', R.daysAgo(new Date(2026, 9, 21, 0, 5).toISOString(), now) === 0);
ok('daysAgo: تاريخٌ فاسد ⇒ null', R.daysAgo('x', now) === null);

/* ④ أخطاءُ الميكروفون */
ok('NotAllowedError ⇒ denied', R.micError({ name: 'NotAllowedError' }) === 'denied');
ok('NotFoundError ⇒ nomic', R.micError({ name: 'NotFoundError' }) === 'nomic');
ok('غيرُهما ⇒ micfail', R.micError({ name: 'AbortError' }) === 'micfail' && R.micError(null) === 'micfail');

/* ⑤ الوحدةُ بلا نصٍّ عربيٍّ معروض — النصوصُ من الجسر (student.js) بـG() */
const src = readFileSync(join(ROOT, 'js/recorder.js'), 'utf8')
  .replace(/\/\*[\s\S]*?\*\//g, '').replace(/\/\/.*$/gm, '');
ok('لا حرفَ عربيّاً في شيفرة recorder.js خارج التعليقات', !/[؀-ۿ]/.test(src));

console.log(`\n${n - bad}/${n}${bad ? ' — ❌ سقط ' + bad : ' — ✅'}`);
process.exit(bad ? 1 : 0);
