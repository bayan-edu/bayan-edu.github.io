/* فحصُ «التعليق المتسرّب» — تعليقٌ وقع داخل نصّ قالبٍ فصار يُطبع للمستخدم.
   يمشي على المحارف بحالاتٍ صريحة بدل grep، لأنّ **الموضع هو الحكم لا شكلُ
   السطر**: نفسُ التعليق صحيحٌ في الشيفرة ومعروضٌ داخل القالب.

   ثلاثةٌ تُضبط وإلا كذب الفحص:
   ① إغلاقُ القالب يعود إلى **الشيفرة** دائماً — لا إلى قالبٍ أعلى.
   ② `}` كتلةٍ داخل `${…}` ليست خاتمةَ التعويض ⇒ عمقُ أقواسٍ لكلّ تعويض.
   ③ الشرطةُ المائلة قد تبدأ **تعبيراً نمطياً** فيه اقتباسٌ أو علامة
      قالب — فيُبتلع نصفُ الملفّ لو حُسبت قسمة. */
import { readFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';

const dir = process.argv[2];
const hits = [];

/* الشرطةُ تبدأ نمطاً إن سبقها ما لا يصحّ أن يكون مقسوماً */
const REGEX_OK = /[([{;,:=!&|?+\-*%~^<>\n]/;

for (const f of readdirSync(dir).filter(x => x.endsWith('.js'))) {
  const src = readFileSync(join(dir, f), 'utf8');
  const stack = [];                 // {t:'tpl'} | {t:'subst', d:عمقُ الأقواس}
  let st = 'code', line = 1, prev = '';

  for (let i = 0; i < src.length; i++) {
    const c = src[i], n = src[i + 1];
    if (c === '\n') line++;

    if (st === 'line')  { if (c === '\n') st = 'code'; continue; }
    if (st === 'block') { if (c === '*' && n === '/') { st = 'code'; i++; } continue; }
    if (st === 'sq' || st === 'dq') {
      if (c === '\\') { i++; continue; }
      if ((st === 'sq' && c === "'") || (st === 'dq' && c === '"')) st = 'code';
      continue;
    }
    if (st === 'rx') {                       // تعبيرٌ نمطيّ
      if (c === '\\') { i++; continue; }
      if (c === '[') { st = 'rxc'; continue; }
      if (c === '/') st = 'code';
      continue;
    }
    if (st === 'rxc') {                      // صنفٌ داخل النمط: /‎ فيه حرفٌ لا خاتمة
      if (c === '\\') { i++; continue; }
      if (c === ']') st = 'rx';
      continue;
    }

    if (st === 'tpl') {
      if (c === '\\') { i++; continue; }
      if (c === '`')  { stack.pop(); st = 'code'; continue; }   // ①
      if (c === '$' && n === '{') { stack.push({ t:'subst', d:0 }); st = 'code'; i++; continue; }
      if (c === '/' && n === '*') {
        /* ⚠️ و`accept="audio/*"` ليست تعليقاً: شرطةُ نوعٍ في سمةٍ تُغلق
           باقتباس. والتعليقُ الحقيقيّ يتلوه فراغٌ أو نصّ. */
        if (src[i + 2] === '"' || src[i + 2] === "'") { i++; continue; }
        const nl = src.indexOf('\n', i);
        hits.push(`${f}:${line}  ${src.slice(i, nl < 0 ? undefined : nl).trim().slice(0, 76)}`);
        i++;
      }
      continue;
    }

    /* st === 'code' */
    if (c === '/' && n === '/') { st = 'line';  i++; prev = c; continue; }
    if (c === '/' && n === '*') { st = 'block'; i++; prev = c; continue; }
    if (c === '/' && REGEX_OK.test(prev || '\n')) { st = 'rx'; prev = c; continue; }  // ③
    if (c === "'") { st = 'sq'; prev = c; continue; }
    if (c === '"') { st = 'dq'; prev = c; continue; }
    if (c === '`') { stack.push({ t:'tpl' }); st = 'tpl'; prev = c; continue; }
    const top = stack[stack.length - 1];
    if (top?.t === 'subst') {                                    // ②
      if (c === '{') top.d++;
      else if (c === '}') { if (top.d > 0) top.d--; else { stack.pop(); st = 'tpl'; } }
    }
    if (!/\s/.test(c)) prev = c;
  }
}

console.log(hits.length ? hits.join('\n') : '✅ نظيف — لا تعليق داخل نصّ قالب');
console.log('— المجموع: ' + hits.length);
