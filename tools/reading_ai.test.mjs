/* ══════════════════════════════════════════════════════════
   قياسُ `js/reading_ai.js` (b174) — بلا متصفّحٍ ولا شبكة.
     node tools/reading_ai.test.mjs
   الفقراتُ بلا سطر الوسيط · صفوفُ اللوحة · مسودةُ الملاحظة وحدُّها · الإدراجُ لا يمحو.
   ══════════════════════════════════════════════════════════ */
import { join, dirname } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const M = await import(pathToFileURL(join(ROOT, 'js/reading_ai.js')));
let bad = 0, n = 0; const ok = (name, c, x = '') => { n++; if(!c) bad++; console.log(c ? '✅' : '❌', name, c ? '' : x); };

/* paragraphs — نصّ ٤٣١ بعينه: سطرُ صورةٍ داخل الفقرة الأولى */
const b431 = 'Egypt is a land.\n[image: r2:img/l9-8s9ega.webp | Where do the past and the present meet?]\nEgypt has always played a role.\n\nEgypt was also a crossroads.';
const ps = M.paragraphs(b431);
ok('paragraphs: سطرُ الصورة لا يظهر', ps.length === 2 && !ps.join(' ').includes('image') && !ps.join(' ').includes('r2:'), JSON.stringify(ps));
ok('paragraphs: [صورة: …] و[فيديو: …] أيضاً', M.paragraphs('أ\n[صورة: r2:x.webp]\n[فيديو: https://y | ت]\nب').join('|') === 'أ\nب');
ok('paragraphs: نصٌّ فارغ', M.paragraphs(null).length === 0);

/* issueRows — مسائلُ التسجيل ١٤ كما خزّنتها الدالّة (v7: ومعها next) */
const issues14 = [
  { op: 'del', ref: 'is', at: 1, next: 'a' }, { op: 'ins', hyp: 'is', at: 4, next: 'with' },
  { op: 'sub', ref: 'ancestors', hyp: 'predecessors', at: 47 }, { op: 'sub', ref: 'hieroglyphs', hyp: 'higher', at: 67 },
  { op: 'ins', hyp: 'a', at: 75, next: 'beautiful' }, { op: 'sub', ref: 'learning.', hyp: 'learn.', at: 101 },
  { op: 'sub', ref: 'was', hyp: 'is', at: 103 }, { op: 'sub', ref: 'deserts,', hyp: 'desert', at: 117 },
  { op: 'sub', ref: 'goods.', hyp: 'things.', at: 119 }];
const rows = M.issueRows(issues14);
ok('issueRows: تسعةُ صفوف', rows.length === 9);
ok('issueRows: علامةُ الوقف تسقط من الطرف', rows.some(r => r.kind === 'sub' && r.expected === 'learning' && r.heard === 'learn')
   && rows.some(r => r.expected === 'deserts' && r.heard === 'desert'), JSON.stringify(rows));
ok('issueRows: الزيادةُ بموضعها', rows.some(r => r.kind === 'ins' && r.heard === 'a' && r.next === 'beautiful'));
ok('issueRows: تحليلٌ قديمٌ بلا next لا ينكسر', M.issueRows([{ op: 'ins', hyp: 'a', at: 3 }])[0].next === '');
ok('issueRows: صفٌّ مجهولٌ أو فارغ يسقط', M.issueRows([{ op: 'ok', ref: 'x', hyp: 'x' }, { op: 'sub', ref: '.', hyp: ',' }, null]).length === 0);

/* noteDraft */
const a14 = { ref_words: 120, correct: 113, issues: issues14, more: 0 };
const d = M.noteDraft(a14);
ok('noteDraft: يبدأ بما قُرئ صحيحاً بأرقامٍ هنديّة', d.startsWith('قرأت ١١٣ كلمة من ١٢٠ كما هي في النص.'), d.split('\n')[0]);
ok('noteDraft: الإبدالُ «قرأت X بدل Y»', d.includes('- قرأت learn بدل learning'));
ok('noteDraft: الحذفُ والزيادةُ بموضعهما', d.includes('- سقطت كلمة is قبل a') && d.includes('- أضفت a قبل beautiful'), d);
ok('noteDraft: ثمانيةٌ تُسمّى والتاسعُ «وموضع آخر»', d.includes('- وموضع آخر') && (d.match(/^- /gm) || []).length === 9, d);
ok('noteDraft: ويختم بالتدريب', d.trim().endsWith('والتدريب: إعادة قراءة الجمل التي فيها هذه الكلمات.'));
ok('noteDraft: لا «أخطأت» ولا أمرٌ مذكّر', !/أخطأ|اقرأ |راجع |انتبه /.test(d));
const big = { ref_words: 600, correct: 500, issues: Array.from({ length: 60 }, (_, k) => ({ op: 'sub', ref: 'w' + k, hyp: 'v' + k })), more: 40 };
const dBig = M.noteDraft(big);
ok('noteDraft: الباقي يُعدّ — ٥٢ من القائمة و٤٠ خارجها', dBig.includes('ومواضع أخرى عددها ٩٢'), dBig);
ok('noteDraft: لا يتجاوز ١٠٠٠ حرف', M.noteDraft(big, 200).length <= 1000);
ok('noteDraft: قراءةٌ بلا مسائل', M.noteDraft({ ref_words: 120, correct: 120, issues: [] }) === 'قرأت ١٢٠ كلمة من ١٢٠ كما هي في النص.\nلم تسقط كلمة ولم تتبدل.');

/* mergeNote */
ok('mergeNote: الفارغةُ تُملأ', M.mergeNote('  ', 'X') === 'X');
ok('mergeNote: ما كتبه المعلّم يبقى أوّلاً', M.mergeNote('قراءة واضحة.', 'X') === 'قراءة واضحة.\n\nX');
ok('mergeNote: والحدُّ ١٠٠٠', M.mergeNote('ا'.repeat(990), 'ب'.repeat(50)).length === 1000);

console.log(`${n - bad}/${n}`); process.exit(bad ? 1 : 0);
