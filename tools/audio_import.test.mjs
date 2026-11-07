/* ══════════════════════════════════════════════════════════
   قياسُ js/audio_import.js (b221 · مختبر الصوتيّات، الخطوة ٤) — بلا متصفّح.
     node tools/audio_import.test.mjs

   المطابقةُ والحمولةُ ورسائلُها · والمفتاحُ من البصمة بشكل `KEY_RX` في r2-sign بحرفه (يُقرأ من ملفّها) ·
   والحدودُ من الوقفات على إشاراتٍ مصنوعة: نغماتٌ بينها صمتٌ بأطوالٍ معلومة، وفوقه ضجيجٌ خفيف.
   ══════════════════════════════════════════════════════════ */
import { readFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const A = await import(pathToFileURL(join(ROOT, 'js/audio_import.js')));
const L = await import(pathToFileURL(join(ROOT, 'js/audio_lines.js')));

let bad = 0, n = 0;
const ok = (name, cond, extra = '') => { n++; if(!cond) bad++; console.log(cond ? '✅' : '❌', name, cond ? '' : extra); };
const eq = (a, b) => JSON.stringify(a) === JSON.stringify(b);
const near = (a, b, tol = 25) => a != null && Math.abs(a - b) <= tol;
const EXTS = ['mp3', 'm4a', 'ogg', 'wav', 'aac'];

/* ① ما في الحقل */
ok('رابطٌ خارجيّ', A.mediaRef('https://drive.google.com/x', EXTS).type === 'url');
ok('مفتاحٌ موسوم', A.mediaRef('r2:audio/q12-abcdef.mp3', EXTS).type === 'key');
ok('مفتاحٌ بلا وسم', A.mediaRef('audio/q12-abcdef.mp3', EXTS).type === 'key');
ok('اسمُ ملفّ — والامتدادُ بلا فرقٍ في الحروف', eq(A.mediaRef('Dialogue 1.MP3', EXTS), { type: 'file', name: 'Dialogue 1.MP3' }));
ok('ما لا يُفهم', A.mediaRef('notes.txt', EXTS).type === 'bad' && A.mediaRef('dialogue', EXTS).type === 'bad');
ok('فارغ', A.mediaRef('  ', EXTS).type === 'none' && A.mediaRef(null, EXTS).type === 'none');

/* ② نصُّ المقطع بأشكاله */
const t1 = A.transcriptLines('Tom: Hello.\nSara: Hi Tom.');
ok('نصٌّ بأسطره', !t1.error && eq(t1.lines.map(l => [l.speaker, l.text, l.start]), [['Tom', 'Hello.', null], ['Sara', 'Hi Tom.', null]]));
ok('قائمةُ أسطر', eq(A.transcriptLines(['Tom: Hello.', 'Bye.']).lines.map(l => l.speaker), ['Tom', null]));
const t3 = A.transcriptLines([{ speaker: 'Tom', text: ' Hello ', start_ms: 0, end_ms: 900 }, { text: 'Bye', start_ms: 1200 }]);
ok('قائمةُ سطورٍ بمواضعها', eq(t3.lines, [{ speaker: 'Tom', text: 'Hello', start: 0, end: 900 }, { speaker: null, text: 'Bye', start: 1200, end: null }]));
ok('شكلٌ آخر يُردّ برسالته', A.transcriptLines(42).error === 'نص المقطع (transcript) نصٌّ بأسطره أو قائمة سطور');
ok('بلا نصّ ⇒ لا سطور', A.transcriptLines(undefined).lines.length === 0 && A.transcriptLines('').lines.length === 0);

/* ③ المطابقة */
const doc = {
  lesson_key: 'U1.LISTEN',
  passages: [
    { ref: 'p1', title: 'Listening 1', media: 'Dialogue1.mp3', lang: 'en', transcript: ['Tom: Hi Sara!', 'Sara: Hello Tom.'] },
    { ref: 'p2', title: 'Reading', body: 'Egypt is…' },
    { ref: 'p3', title: 'Old clip', media: 'r2:audio/l1-a1.mp3', transcript: 'Narrator: Welcome.' }
  ],
  questions: [{ body: 'Q1', passage: 'p1' }, { body: 'Q2', audio: 'q2.MP3' }]
};
const pl = A.planAudio(doc, ['dialogue1.MP3', 'Q2.mp3', 'extra.wav'], EXTS);
ok('لا أخطاء في دفعةٍ سليمة', pl.errors.length === 0, JSON.stringify(pl.errors));
ok('الحمولةُ بلا transcript', pl.payload.passages.every(p => !('transcript' in p)));
ok('…والأصلُ لم يُمسّ', 'transcript' in doc.passages[0] && doc.passages[0].media === 'Dialogue1.mp3');
ok('اسمُ الملفّ بحروفٍ صغيرة ونوعُه صوت', pl.payload.passages[0].media === 'dialogue1.mp3' && pl.payload.passages[0].kind === 'audio');
ok('النصُّ المقروء لم يتغيّر', eq(pl.payload.passages[1], doc.passages[1]));
ok('صوتُ السؤال اسمُ ملفّ', pl.payload.questions[1].audio === 'q2.mp3');
ok('الملفّاتُ المرفوعة: ما أُشير إليه وحده', eq(pl.files, ['dialogue1.mp3', 'q2.mp3']));
ok('ما سُحب ولم يُشَر إليه تحذير', eq(pl.warns, ['سُحب «extra.wav» ولا يشير إليه نصٌّ ولا سؤال، فلا يُرفع']));
ok('سطورُ الملفّ المسحوب', pl.uses[0].ref === 'p1' && pl.uses[0].name === 'dialogue1.mp3' && pl.uses[0].lines.length === 2 && !pl.uses[0].timed);
ok('…وسطورُ مفتاحٍ قائم', pl.uses[1].ref === 'p3' && pl.uses[1].key === 'r2:audio/l1-a1.mp3' && pl.uses[1].lines.length === 1);

const errs = (d, names = []) => A.planAudio(d, names, EXTS).errors;
ok('ملفٌّ لم يُسحب', eq(errs({ passages: [{ ref: 'p1', media: 'gone.mp3' }] }), ['النصّ p1: الملف «gone.mp3» لم يُسحب مع ملف JSON']));
ok('ما ليس رابطاً ولا مفتاحاً ولا ملفّاً', errs({ passages: [{ ref: 'p1', media: 'notes.txt' }] })[0]
   === 'النصّ p1: «notes.txt» ليس رابطاً ولا مفتاحاً ولا اسم ملفٍّ صوتيّ (mp3 · m4a · ogg · wav · aac)');
ok('سطورٌ لرابطٍ خارجيّ', errs({ passages: [{ ref: 'p1', media: 'https://x.y/a.mp3', transcript: 'A: b' }] })[0]
   === 'النصّ p1: نص المقطع لملفٍّ في المنصة أو ملفٍّ يُسحب، وهذا رابطٌ خارجي');
ok('سطورٌ بلا مقطع', errs({ passages: [{ ref: 'p1', body: 'x', transcript: 'A: b' }] })[0] === 'النصّ p1: نص المقطع بلا مقطع — والمقطع في media');
ok('سطورٌ لمفتاحٍ بنوعٍ غيرِ الصوت — بعبارة passage_lines_problem', errs({ passages: [{ ref: 'p1', media: 'r2:audio/l1-a1.mp3', kind: 'Video', transcript: 'A: b' }] })[0]
   === 'النصّ p1: هذا النص ليس مقطعاً صوتياً، والسطور تُكتب للمقاطع وحدها');
ok('…والمفتاحُ بلا نوع يُقبل (save_passage تجعله صوتاً)', errs({ passages: [{ ref: 'p1', media: 'r2:audio/l1-a1.mp3', transcript: 'A: b' }] }).length === 0);
const vid = A.planAudio({ passages: [{ ref: 'p1', media: 'a.mp3', kind: 'video', transcript: 'A: b' }] }, ['a.mp3'], EXTS);
ok('…والملفُّ المسحوب صوتٌ بامتداده مهما كُتب نوعُه', vid.errors.length === 0 && vid.payload.passages[0].kind === 'audio' && vid.uses.length === 1);
ok('سطرٌ أطولُ من حدّه — برسالة 197', errs({ passages: [{ ref: 'p1', media: 'a.mp3', transcript: 'x'.repeat(1001) }] }, ['a.mp3'])[0]
   === 'النصّ p1: السطر ١ بلا نص، أو أطول من ١٠٠٠ حرف');
ok('صوتُ سؤالٍ لم يُسحب — ورقمُه هنديّ', eq(errs({ questions: [{ body: 'Q', audio: 'q9.mp3' }] }), ['صوت السؤال ١: الملف «q9.mp3» لم يُسحب مع ملف JSON']));
ok('ونصٌّ بلا ref ولا id يُسمّى برقمه الهنديّ', errs({ passages: [{}, { media: 'gone.mp3' }] })[0] === 'النصّ #٢: الملف «gone.mp3» لم يُسحب مع ملف JSON');
ok('الملفُّ نفسُه لنصّين بسطرين مختلفين', errs({ passages: [{ ref: 'p1', media: 'a.mp3', transcript: 'A: one' },
   { ref: 'p2', media: 'A.mp3', transcript: 'A: two' }] }, ['a.mp3']).includes('النصّ p2: الملف نفسه لنصّين بسطورٍ مختلفة'));
const twin = A.planAudio({ passages: [{ ref: 'p1', media: 'a.mp3', transcript: 'A: one' }, { ref: 'p2', media: 'a.mp3', transcript: 'A: one' }] }, ['a.mp3'], EXTS);
ok('…وبالسطور نفسها مرّةً واحدة', twin.errors.length === 0 && twin.uses.length === 1 && eq(twin.files, ['a.mp3']));
ok('بلا نصوصٍ مشتركة لا شيء', A.planAudio({ questions: [{ body: 'Q' }] }, [], EXTS).errors.length === 0);
ok('حمولةٌ ليست كائناً تمرّ كما هي', A.planAudio([1, 2], [], EXTS).payload.length === 2);

/* ④ المفاتيح */
const kp = A.withKeys(pl.payload, { 'dialogue1.mp3': 'r2:audio/iabc1234-def567.mp3', 'q2.mp3': 'r2:audio/i0000000-000001.mp3' });
ok('الأسماءُ بمفاتيحها', kp.passages[0].media === 'r2:audio/iabc1234-def567.mp3' && kp.questions[1].audio === 'r2:audio/i0000000-000001.mp3');
ok('…والمفتاحُ القائمُ كما هو، والأصلُ لم يُمسّ', kp.passages[2].media === 'r2:audio/l1-a1.mp3' && pl.payload.passages[0].media === 'dialogue1.mp3');
const r2 = readFileSync(join(ROOT, 'supabase/functions/r2-sign/core.js'), 'utf8');
const KEY_RX = new RegExp(r2.match(/export const KEY_RX = \/(.+)\/;/)[1]);
const hexA = 'ffffffffffffffffff' + '0'.repeat(46), hexB = '000000000000000001' + 'a'.repeat(46);
const nameA = A.hashName(hexA), nameB = A.hashName(hexB);
ok('المفتاحُ من البصمة يقبله r2-sign بحرفه', KEY_RX.test(`r2:audio/${nameA}.mp3`) && KEY_RX.test(`r2:audio/${nameB}.wav`), nameA + ' ' + nameB);
ok('«i» وسبع ثمّ ستّ', /^i[a-z0-9]{7}-[a-z0-9]{6}$/.test(nameA) && /^i[a-z0-9]{7}-[a-z0-9]{6}$/.test(nameB));
ok('البصمةُ نفسُها ⇒ المفتاحُ نفسُه، وغيرُها ⇒ غيرُه', A.hashName(hexA) === nameA && nameA !== nameB && A.hashName(hexA.toUpperCase()) === nameA);

/* ⑤ الإشارة: نغماتٌ وصمتٌ بأطوالٍ معلومة (٨٠٠٠ ه.ز)، وفوق الصمت ضجيجٌ خفيف ثابتُ البذرة */
const RATE = 8000;
let seed = 7;
const rnd = () => (seed = (seed * 1103515245 + 12345) % 2147483648) / 2147483648 - 0.5;
function signal(parts){                                     // [['s'|'t', ms], …]
  const out = [];
  for(const [k, ms] of parts){
    const len = Math.round(RATE * ms / 1000);
    for(let i = 0; i < len; i++) out.push(k === 't' ? 0.3 * Math.sin(2 * Math.PI * 220 * i / RATE) + 0.002 * rnd() : 0.002 * rnd());
  }
  return Float32Array.from(out);
}
const env1 = A.envelope(Float32Array.from({ length: 1600 }, () => 0.5), RATE);
ok('الغلاف: إطاراتُ ٢٠ م.ث بقيمتها', env1.length === 10 && Math.abs(env1[0] - 0.5) < 1e-6);

const S1 = signal([['s', 300], ['t', 1000], ['s', 500], ['t', 800], ['s', 150], ['t', 600], ['s', 700], ['t', 1200], ['s', 400]]);
const f1 = A.findPauses(A.envelope(S1, RATE));
ok('الكلامُ من أوّل نغمةٍ إلى آخرها', near(f1.speech[0], 300) && near(f1.speech[1], 5250), JSON.stringify(f1.speech));
ok('وقفتان فوق ٢٠٠ م.ث، والقصيرةُ لا تُعدّ', f1.pauses.length === 2 && near(f1.pauses[0].start, 1300) && near(f1.pauses[0].end, 1800)
   && near(f1.pauses[1].start, 3350) && near(f1.pauses[1].end, 4050), JSON.stringify(f1.pauses));
ok('العتبةُ بين الضجيج والذروة', f1.threshold < -20 && f1.threshold > -70, String(f1.threshold));

/* أربعةُ سطورٍ بأطوالٍ تقارب أزمنتها: الحدُّ الذي وقفتُه قصيرةٌ يبقى بلا موضع */
const lines4 = L.parseScript(['A: ' + 'a'.repeat(40), 'B: ' + 'b'.repeat(30), 'C: ' + 'c'.repeat(22), 'D: ' + 'd'.repeat(48)].join('\n'));
const st1 = A.alignStarts(lines4, f1);
ok('الأوّلُ قبيل الكلام', st1[0] === 220, JSON.stringify(st1));
ok('الثاني بعد الوقفة الأولى', near(st1[1], 1720), JSON.stringify(st1));
ok('الثالثُ بلا وقفة ⇒ بلا موضع', st1[2] === null, JSON.stringify(st1));
ok('الرابعُ بعد الوقفة الثانية', near(st1[3], 3970), JSON.stringify(st1));

/* وقفةٌ قصيرةٌ في وسط سطرٍ طويل (٢٥٠ م.ث) والحدودُ الحقيقيّة طويلة ⇒ لا يُقطع بها */
const S2 = signal([['s', 200], ['t', 1500], ['s', 250], ['t', 1500], ['s', 900], ['t', 1000], ['s', 900], ['t', 1200], ['s', 200]]);
const f2 = A.findPauses(A.envelope(S2, RATE));
const lines3 = L.parseScript(['A: ' + 'a'.repeat(60), 'B: ' + 'b'.repeat(20), 'C: ' + 'c'.repeat(24)].join('\n'));
const st2 = A.alignStarts(lines3, f2);
ok('ثلاثُ وقفات، والقصيرةُ بينها', f2.pauses.length === 3, JSON.stringify(f2.pauses));
ok('الحدودُ عند الطويلتين لا القصيرة', st2[0] === 120 && near(st2[1], 4270) && near(st2[2], 6170), JSON.stringify(st2));

/* سطران وثلاثُ وقفات ⇒ الأقربُ إلى الموضع المتوقَّع من طول النصّ */
const lines2 = L.parseScript(['A: ' + 'a'.repeat(30), 'B: ' + 'b'.repeat(90)].join('\n'));
const st3 = A.alignStarts(lines2, f1);
ok('الحدُّ الواحد عند الوقفة الأقرب لموضعه', near(st3[1], 1720), JSON.stringify(st3));

ok('سطرٌ واحد ⇒ موضعُ أوّل الكلام', eq(A.alignStarts(L.parseScript('A: x'), f1), [220]));
ok('صمتٌ تامّ ⇒ لا مواضع', eq(A.alignStarts(lines2, A.findPauses(A.envelope(new Float32Array(8000), RATE))), [null, null]));
ok('بلا غلاف ⇒ لا مواضع', eq(A.alignStarts(lines2, A.findPauses(new Float32Array(0))), [null, null]));

/* ⑥ ما يُكتب يقبله حارسُ القاعدة: مواضعُ صحيحةٌ متصاعدة */
const tl = A.timedLines(lines4, f1);
ok('timedLines: المواضعُ والنهاياتُ فارغة', eq(tl.map(l => l.end), [null, null, null, null]) && tl[0].start === 220);
ok('…ومانعُ الحفظ لا يردّها (197)', L.problem(tl) === null, L.problem(tl));
ok('…والمواضعُ أعدادٌ صحيحة', tl.every(l => l.start == null || Number.isInteger(l.start)));
const given = A.transcriptLines([{ text: 'one', start_ms: 0 }, { text: 'two' }]).lines;
ok('سطورٌ حملت مواضعها لا تُمسّ', A.timedLines(given, f1) === given);

/* وكثرةُ السطور والوقفات لا تُبطئ: ٤٠٠ سطر و٢٠٠٠ وقفة */
const many = { speech: [0, 600000], pauses: Array.from({ length: 2000 }, (_, k) => ({ start: k * 300 + 100, end: k * 300 + 260 })) };
const t0 = Date.now(), stm = A.alignStarts(Array.from({ length: 400 }, (_, k) => ({ text: 'line ' + k })), many);
const tm = Date.now() - t0;
ok('٤٠٠ سطر × ٢٠٠٠ وقفة في أقلّ من ثانيتين، والمواضعُ متصاعدة', tm < 2000 && L.problem(stm.map((s, k) => ({ text: 'x' + k, start: s, end: null }))) === null, tm + ' م.ث');

console.log(`\n${bad ? '❌' : '✅'} ${n - bad} / ${n}`);
process.exit(bad ? 1 : 0);
