/* ══════════════════════════════════════════════════════════
   قياسُ js/audio_lines.js (197 · مختبر الصوتيّات، الخطوة ١) — بلا متصفّح.
     node tools/audio_lines.test.mjs

   ومنه أنّ رسائلَ المانع هنا رسائلُ `save_item_lines` في sql/197 بحرفها — فالراحةُ في اللوحة لا تفترق عن الحارس.
   ══════════════════════════════════════════════════════════ */
import { readFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const L = await import(pathToFileURL(join(ROOT, 'js/audio_lines.js')));

let bad = 0, n = 0;
const ok = (name, cond, extra = '') => { n++; if(!cond) bad++; console.log(cond ? '✅' : '❌', name, cond ? '' : extra); };
const eq = (a, b) => JSON.stringify(a) === JSON.stringify(b);
const AR = s => String(s).replace(/[0-9]/g, d => '٠١٢٣٤٥٦٧٨٩'[+d]);

/* ① من النصّ إلى السطور */
const s1 = L.parseScript('Tom: Hello there.\r\n\r\n  Mrs. Brown:   Good   morning.  \nThe train leaves at 10:30 sharp.\nhttps://example.com/a\nسارة: مرحباً\nNote:no space after colon');
ok('القائلُ قبل النقطتين', s1[0].speaker === 'Tom' && s1[0].text === 'Hello there.');
ok('الأسطرُ الفارغة تسقط و«\\r\\n» يُوحَّد', s1.length === 6);
ok('اسمٌ بنقطةٍ ومسافة، والمسافاتُ داخل النصّ تُضمّ', s1[1].speaker === 'Mrs. Brown' && s1[1].text === 'Good morning.');
ok('«10:30» ليس قائلاً', s1[2].speaker === null && s1[2].text === 'The train leaves at 10:30 sharp.');
ok('«https://» ليس قائلاً', s1[3].speaker === null);
ok('القائلُ بالعربيّة', s1[4].speaker === 'سارة' && s1[4].text === 'مرحباً');
ok('بلا مسافةٍ بعد النقطتين ليس قائلاً', s1[5].speaker === null);
ok('اسمٌ أطولُ من ٤٠ ليس قائلاً', L.parseScript('x'.repeat(41) + ': hi')[0].speaker === null);
ok('اسمٌ من ٤٠ قائل', L.parseScript('x'.repeat(40) + ': hi')[0].speaker === 'x'.repeat(40));
ok('السطورُ الجديدة بلا مواضع', s1.every(l => l.start === null && l.end === null));
ok('scriptText يعكس parseScript', L.scriptText(L.parseScript('A: one\nplain\nB: two')) === 'A: one\nplain\nB: two');

/* ② إعادةُ التقسيم تحفظ مواضعَ ما لم يتغيّر */
const old = [{ speaker: 'A', text: 'one', start: 0, end: null }, { speaker: 'B', text: 'two', start: 900, end: 1500 },
             { speaker: 'A', text: 'three', start: 2000, end: null }];
const re = L.relink(old, L.parseScript('A: one\nB: inserted\nB: two\nA: three, changed'));
ok('سطرٌ أُدرج لا يُسقط مواضعَ ما بعده', re[0].start === 0 && re[1].start === null && re[2].start === 900 && re[2].end === 1500);
ok('ما تغيّر نصُّه يُوقَّت من جديد', re[3].start === null);
ok('تغيّرُ القائل يُسقط الموضع', L.relink(old, L.parseScript('B: one'))[0].start === null);
ok('والمحمولُ يتصاعد: لا مطابقةَ إلى الوراء', eq(L.relink(old, L.parseScript('A: three\nA: one')).map(l => l.start), [2000, null]));

/* ③ بين القاعدة واللوحة */
const rows = [{ n: 2, speaker: 'B', text: 'two', start_ms: 900, end_ms: null }, { n: 1, speaker: null, text: 'one', start_ms: null, end_ms: null }];
ok('fromRows بترتيب n', eq(L.fromRows(rows), [{ speaker: null, text: 'one', start: null, end: null }, { speaker: 'B', text: 'two', start: 900, end: null }]));
ok('fromRows: سطرٌ حُجب نصُّه عن الطالب ⇒ text null (198 ②)', eq(L.fromRows([{ n: 1, speaker: 'A', start_ms: 0 }]), [{ speaker: 'A', text: null, start: 0, end: null }]));
const sql198 = readFileSync(join(ROOT, 'sql/198_audio_reveal.sql'), 'utf8');
ok('REVEAL مفاتيحُ قيد 198 بحرفها، والأوّلُ افتراضُه', eq(Object.keys(L.REVEAL), ['never', 'after', 'open'])
   && sql198.includes("check (reveal in ('never', 'after', 'open'))") && sql198.includes("reveal text not null default 'never'"));
/* 🆕 b220 · ونصُّ الاستماع في الاختبار خيارُ الاختبار (200 ①)، والفحصُ نسخةٌ واحدة صارت في `write_track_lines` (200 ③) */
const sql200 = readFileSync(join(ROOT, 'sql/200_quiz_transcript.sql'), 'utf8');
ok('TRANSCRIPT مفاتيحُ قيد 200 بحرفها، والأوّلُ افتراضُه', eq(Object.keys(L.TRANSCRIPT), ['never', 'after'])
   && sql200.includes("check (transcript in ('never', 'after'))") && sql200.includes("transcript text not null default 'never'"));
ok('200: save_item_lines تنادي الكتابة الواحدة، وsave_passage_lines كذلك',
   (sql200.match(/return write_track_lines\(v_key, v_subject, v_lang, p_lines\);/g) || []).length === 2);
ok('payload بأسماء القاعدة', eq(L.payload([{ speaker: ' A ', text: ' hi ', start: 5, end: null }]), [{ speaker: 'A', text: 'hi', start_ms: 5, end_ms: null }]));
ok('payload: بلا قائل ⇒ null', L.payload([{ speaker: '', text: 'x' }])[0].speaker === null);

/* ④ المانع — ورسائلُه رسائلُ القاعدة بحرفها */
const sql = readFileSync(join(ROOT, 'sql/197_audio_lines.sql'), 'utf8');
const cases = [
  ['سطرٌ فارغ',          [{ text: 'A' }, { text: '  ' }],                         'السطر %s بلا نص، أو أطول من ١٠٠٠ حرف', 2],
  ['سطرٌ أطولُ من ١٠٠٠', [{ text: 'x'.repeat(1001) }],                            'السطر %s بلا نص، أو أطول من ١٠٠٠ حرف', 1],
  ['قائلٌ طويل',         [{ speaker: 'y'.repeat(41), text: 'A' }],                'اسم المتحدث في السطر %s أطول من ٤٠ حرفاً', 1],
  ['زمنٌ كسريّ',          [{ text: 'A', start: 1.5 }],                             'زمن السطر %s غير صالح', 1],
  ['زمنٌ فوق الساعة',    [{ text: 'A', start: 3600001 }],                         'زمن السطر %s غير صالح', 1],
  ['نهايةٌ بلا بداية',   [{ text: 'A', end: 10 }],                                'للسطر %s نهايةٌ بلا بداية', 1],
  ['نهايةٌ = بداية',     [{ text: 'A', start: 1000, end: 1000 }],                 'نهاية السطر %s قبل بدايته', 1],
  ['بدايةٌ تتراجع',      [{ text: 'A', start: 1000 }, { text: 'B' }, { text: 'C', start: 500 }], 'بداية السطر %s ليست بعد بداية ما قبله', 3],
];
for(const [name, lines, tpl, at] of cases){
  const want = tpl.replace('%s', AR(at));
  ok(`المانع: ${name}`, L.problem(lines) === want, L.problem(lines));
  ok(`…ورسالتُه في 197 بحرفها: ${name}`, sql.includes(`'${tpl}'`));
  ok(`…وفي write_track_lines (200) بحرفها: ${name}`, sql200.includes(`'${tpl}'`));
}
ok('المانع: ٤٠١ سطر', L.problem(Array.from({ length: 401 }, (_, k) => ({ text: 'L' + k }))) === 'السطور أكثر من ٤٠٠ سطر');
ok('…ورسالتُه في 197', sql.includes(`'السطور أكثر من ٤٠٠ سطر'`));
ok('…وفي 200', sql200.includes(`'السطور أكثر من ٤٠٠ سطر'`) && sql200.includes('v_n > 400')
   && sql200.includes('between 1 and 1000') && sql200.includes('> 40') && sql200.includes('3600000'));
ok('المانع: سطورٌ سليمة ⇒ null — ومنها ما لم يُوقَّت', L.problem([{ text: 'A', start: 0 }, { text: 'B' }, { text: 'C', start: 900, end: 1200 }]) === null);
ok('المانع: المحرفُ بالمحارف لا بوحدات UTF-16', L.problem([{ text: '😀'.repeat(1000) }]) === null);
ok('الحدودُ حدودُ 197', sql.includes('n between 1 and 400') && sql.includes('between 1 and 1000') && sql.includes('between 1 and 40')
   && sql.includes('3600000') && L.LIMITS.lines === 400 && L.LIMITS.text === 1000 && L.LIMITS.speaker === 40 && L.LIMITS.ms === 3600000);

/* ⑤ النقرة */
const three = L.parseScript('A: one\nB: two\nA: three');
let t = L.mark(three, 0, 100);
ok('النقرةُ الأولى قبل ١٥٠ م.ث ⇒ صفر لا سالب', t[0].start === 0);
t = L.mark(t, 1, 2400);
ok('ردُّ الفعل يُقدَّم: ٢٤٠٠ ⇒ ٢٢٥٠', t[1].start === 2250);
ok('firstUntimed يتقدّم', L.firstUntimed(t) === 2);
t = L.mark(t, 2, 4000);
ok('وُقّتت كلُّها ⇒ -1', L.firstUntimed(t) === -1);
const back = L.mark(t, 1, 4100);
ok('نقرةٌ تتخطّى ما بعدها تُفرّغه ليُعاد', back[1].start === 3950 && back[2].start === null);
ok('النقرةُ لا تسبق ما قبلها', L.mark([{ text: 'a', start: 1000 }, { text: 'b', start: null }], 1, 1050)[1].start === 1001);
ok('النقرةُ تُسقط نهايةً صارت قبلها', L.mark([{ text: 'a', start: 0, end: 500 }], 0, 900)[0].end === null);
ok('النقرةُ على سطرٍ غائب لا تغيّر شيئاً', L.mark(three, 9, 100) === three);
ok('«هنا» بلا ردّ فعل: الموضعُ الحاضرُ بعينه', L.mark(three, 0, 2400, 0)[0].start === 2400);

/* ⑥ التقديم والتأخير */
const nd = [{ text: 'a', start: 0 }, { text: 'b', start: 1000 }, { text: 'c', start: 2000 }];
ok('nudge +100', L.nudge(nd, 1, 100)[1].start === 1100);
ok('nudge لا يتخطّى ما بعده', L.nudge(nd, 1, 5000)[1].start === 1999);
ok('nudge لا يتخطّى ما قبله', L.nudge(nd, 1, -5000)[1].start === 1);
ok('nudge لا ينزل تحت الصفر', L.nudge(nd, 0, -100)[0].start === 0);
ok('nudge على سطرٍ بلا موضع لا يغيّر شيئاً', L.nudge(three, 0, 100) === three);
ok('unmark يُفرّغ السطرَ وحده', eq(L.unmark(nd, 1).map(l => l.start), [0, null, 2000]));

/* ⑦ الحدّان والسطرُ الجاري */
const sp = [{ text: 'a', start: 0 }, { text: 'b', start: 1000, end: 1500 }, { text: 'c' }, { text: 'd', start: 3000 }];
ok('span: إلى بداية ما يُوقَّت بعده', eq(L.span(sp, 0), { start: 0, end: 1000 }));
ok('span: النهايةُ المضبوطة أولى', eq(L.span(sp, 1), { start: 1000, end: 1500 }));
ok('span: سطرٌ بلا موضع ⇒ null', L.span(sp, 2) === null);
ok('span: الأخيرُ إلى آخر الملفّ', eq(L.span(sp, 3), { start: 3000, end: null }) && eq(L.span(sp, 3, 4200), { start: 3000, end: 4200 }));
ok('lineAt قبل الأوّل ⇒ -1', L.lineAt([{ text: 'a', start: 500 }], 100) === -1);
ok('lineAt: آخرُ ما بدأ', L.lineAt(sp, 1200) === 1 && L.lineAt(sp, 2999) === 1 && L.lineAt(sp, 3000) === 3);
ok('lineAt بلا توقيت ⇒ -1', L.lineAt(three, 5000) === -1);

/* ⑧ العرض */
ok('clockMs ٢٦٠٠ ⇒ 0:02.6', L.clockMs(2600) === '0:02.6');
ok('clockMs بالهنديّة و«٫»', L.clockMs(61234, AR, '٫') === '١:٠١٫٢');
ok('clockMs بلا موضع ⇒ —', L.clockMs(null) === '—' && L.clockMs(undefined) === '—');
ok('tally', eq(L.tally(sp.concat([{ speaker: 'A', text: 'x' }, { speaker: 'B', text: 'y' }, { speaker: 'A', text: 'z', start: 9000 }])),
   { lines: 7, timed: 4, speakers: ['A', 'B'] }));

console.log(`\n${bad ? '❌' : '✅'} ${n - bad} / ${n}`);
process.exit(bad ? 1 : 0);
