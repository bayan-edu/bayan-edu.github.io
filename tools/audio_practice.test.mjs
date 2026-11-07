// قياسُ audio_practice.js (b222 · مختبر الصوتيّات ٥) — الأدوارُ وخطّةُ التشغيل وزمنُ الدور.
// ومعه أنّ رسائلَ الميكروفون في lines_practice.js هي رسائلُ القراءة الجهريّة بحرفها (student.js) — فلا تفترق نسختان.
// node tools/audio_practice.test.mjs
import { readFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const P = await import(pathToFileURL(join(ROOT, 'js/audio_practice.js')));

let bad = 0, n = 0;
const ok = (name, cond, extra = '') => { n++; if(!cond) bad++; console.log(cond ? '✅' : '❌', name, cond ? '' : extra); };
const eq = (a, b) => JSON.stringify(a) === JSON.stringify(b);
const S = (speaker, start, end = null) => ({ speaker, text: 'x', start, end });

/* ① الأدوار */
const dlg = [S('Tom', 200), S('Sara', 2800), S('Tom', 4600), S('Ali', 6700), S('Sara', 9000)];
ok('القائلون بترتيب ظهورهم', eq(P.roles(dlg), ['Tom', 'Sara', 'Ali']));
ok('سطرٌ بلا موضع ⇒ لا تبادل', eq(P.roles([S('Tom', 200), S('Sara', null)]), []));
ok('قائلٌ واحد ⇒ لا تبادل', eq(P.roles([S('Tom', 0), S('Tom', 900)]), []));
ok('الراوي بلا اسمٍ لا يُعدّ دوراً', eq(P.roles([S(null, 0), S('Tom', 900), S('Sara', 1800)]), ['Tom', 'Sara']));
ok('بلا سطور ⇒ لا شيء', eq(P.roles([]), []) && eq(P.roles(null), []));
ok('السطورُ الموقَّتة سطراً سطراً', eq(P.echoable([S('Tom', 0), S('Sara', null), S('Tom', 900)]), [0, 2]));

/* ② زمنُ الدور */
ok('سطرٌ من ثانيتين ⇒ ٤٫٧ ث', P.turnMs(2000) === 4700);
ok('وبنصف السرعة ⇒ ٧٫٩ ث', P.turnMs(2000, 0.5) === 7900);
ok('لا أقلَّ من ثانيتين ونصف', P.turnMs(300) === 2500 && P.turnMs(null) === 2500 && P.turnMs(NaN) === 2500);
ok('ولا أكثرَ من نصف دقيقة', P.turnMs(60000) === 30000);
ok('سرعةٌ غيرُ صالحة تُعدّ ١', P.turnMs(2000, 0) === 4700 && P.turnMs(2000, -1) === 4700);

/* ③ خطّةُ التبادل */
const r1 = P.rolePlan(dlg, 'Sara', 11000);
ok('دورُ Sara: الأصلُ ثمّ دورُها ثمّ مقطعٌ يضمّ سطرَي Tom وAli', eq(r1, [
  { who: 'them', ks: [0], start: 200, end: 2800 },
  { who: 'me', k: 1, ms: 1800 },
  { who: 'them', ks: [2, 3], start: 4600, end: 9000 },
  { who: 'me', k: 4, ms: 2000 }]), JSON.stringify(r1));
const r2 = P.rolePlan(dlg, 'Tom', 11000);
ok('دورُ Tom أوّلاً: يبدأ الطالب', r2[0].who === 'me' && r2[0].k === 0 && r2[0].ms === 2600);
ok('…والسطورُ الثلاثةُ الأخيرة بعد دوره الثاني مقطعٌ واحدٌ حتى آخر الملفّ',
   eq(r2[r2.length - 1], { who: 'them', ks: [3, 4], start: 6700, end: 11000 }), JSON.stringify(r2));
const r3 = P.rolePlan(dlg, 'Sara');
ok('آخرُ الملفّ مجهولٌ ⇒ دورُ السطر الأخير بلا زمن', r3[r3.length - 1].who === 'me' && r3[r3.length - 1].ms === null);
const ends = [S('Tom', 0, 1500), S('Ali', 2000), S('Sara', 3000)];
ok('نهايةٌ ضبطها المعلّم تقطع الاتّصال (قفزةٌ فوق الصمت بعدها)', eq(P.rolePlan(ends, 'Sara', 5000).slice(0, 2), [
  { who: 'them', ks: [0], start: 0, end: 1500 }, { who: 'them', ks: [1], start: 2000, end: 3000 }]));
const narr = [S(null, 0), S('Tom', 1000), S('Sara', 2000)];
ok('الراوي يُسمع دائماً', eq(P.rolePlan(narr, 'Tom', 3000).map(s => s.who), ['them', 'me', 'them']));
ok('دورٌ لا وجودَ له ⇒ الأصلُ كلُّه مقطعٌ واحد', eq(P.rolePlan(dlg, 'Nobody', 11000), [{ who: 'them', ks: [0, 1, 2, 3, 4], start: 200, end: 11000 }]));

/* ④ الحوارُ بصوت الطالب */
const m1 = P.mixPlan(dlg, 'Sara', k => k === 1, 11000);
ok('سطرٌ سجّله يُسمع بصوته، وسطرٌ فاته بصوت الأصل متّصلاً بما قبله', eq(m1, [
  { who: 'them', ks: [0], start: 200, end: 2800 },
  { who: 'me', k: 1, ms: 1800 },
  { who: 'them', ks: [2, 3, 4], start: 4600, end: 11000 }]), JSON.stringify(m1));
ok('بلا تسجيلٍ ⇒ الأصلُ كما هو', eq(P.mixPlan(dlg, 'Sara', () => false, 11000), P.rolePlan(dlg, 'Nobody', 11000)));

/* ⑤ نسخةٌ واحدة لرسائل الميكروفون: lines_practice.js ⇐ readAr في student.js */
const st = readFileSync(join(ROOT, 'js/student.js'), 'utf8');
const lp = readFileSync(join(ROOT, 'js/lines_practice.js'), 'utf8');
for(const k of ['denied', 'nomic', 'micfail']){
  const a = st.match(new RegExp(`\\n\\s*${k}: '([^']+)'`))?.[1];
  const b = lp.match(new RegExp(`\\b${k}: '([^']+)'`))?.[1];
  ok(`رسالةُ ${k} بحرفها في الموضعين`, !!a && a === b, `${a} ≠ ${b}`);
}
/* والوعد: لا رفعَ ولا تخزين — فلا نداءَ للقاعدة ولا للمخزن في وحدة التدرّب */
ok('lines_practice.js لا يستورد api.js ولا يرفع ولا يخزّن',
   !/from '\.\/api\.js'|uploadMedia|uploadRecording|localStorage|indexedDB|sessionStorage/.test(lp));
ok('والميكروفونُ يُغلق: track.stop في وحدة التدرّب', /getTracks\(\)\.forEach\(\s*\w+\s*=>\s*\{?\s*try\s*\{\s*\w+\.stop\(\)/.test(lp));
/* 🆕 b223 · والنداءُ الوحيدُ إلى الشبكة قراءةُ الأصل لخطّ التنغيم: GET بلا اعتماد — لا method ولا body */
ok('fetch واحد، قراءةٌ لا كتابة', (lp.match(/fetch\(/g) || []).length === 1 && !/method\s*:|body\s*:/.test(lp) && /credentials:\s*'omit'/.test(lp));

console.log(`\n${bad ? '❌' : '✅'} ${n - bad} / ${n}`);
process.exit(bad ? 1 : 0);
