/* ══════════════════════════════════════════════════════════
   قياسُ منطق تحليل القراءة الجهريّة (176) — بلا شبكةٍ ولا Gemini.
     node tools/reading_analyze.test.mjs
   المقارنةُ بين ما سُمع ونصّ الدرس: حذفٌ وإبدالٌ وزيادة · الإعرابُ حيث شُكل الطرفان
   · و`readable`: وسومُ القارئ (سطرُ الصورة والفيديو · رقمُ الفقرة · التنسيق) لا تُقارَن.
   ══════════════════════════════════════════════════════════ */
import { join, dirname } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const C = await import(pathToFileURL(join(ROOT, 'supabase/functions/reading-analyze/core.js')));
let bad=0,n=0; const ok=(name,c,x='')=>{n++; if(!c) bad++; console.log(c?'✅':'❌',name,c?'':x);};
const ref='Egypt is a land with a heart that has been beating for thousands of years. We are proud to call it our home.';
const hyp='Egypt is land with a hard that has been beating for for thousands of years we are proud to call it home';
const a=C.align(ref,hyp,'en');
ok('en: حذف a و our', a.omitted===2, JSON.stringify(a.issues));
ok('en: إبدال heart→hard', a.issues.some(o=>o.op==='sub'&&o.ref==='heart'&&o.hyp==='hard'));
ok('en: زيادة for', a.issues.some(o=>o.op==='ins'&&o.hyp==='for'));
ok('en: الدقّة', a.accuracy===Math.round(a.correct/a.ref_words*1000)/10, String(a.accuracy));
ok('en: الترقيم لا يُعدّ خطأ', !a.issues.some(o=>/years|home/.test(o.ref||'')&&o.op==='sub'));
const ra='ذَهَبَ الطَّالِبُ إِلَى المَدْرَسَةِ مُبَكِّرًا';
const ha='ذَهَبَ الطَّالِبَ إلى المدرسةِ مُبَكِّرًا';
const b=C.align(ra,ha,'ar');
ok('ar: لا خطأ كلمات (الحركات لا تُفرّق الكلمة)', b.substituted===0&&b.omitted===0&&b.inserted===0, JSON.stringify(b.issues));
ok('ar: خطأ إعراب في الطالب (ضمّ ⇒ فتح)', b.ending_mismatch.length===1 && b.ending_mismatch[0].ref.includes('الطَّالِبُ'), JSON.stringify(b.ending_mismatch));
ok('ar: الإعرابُ لا يُحكم حيث لم يُشكل الطرفان (إلى بلا حركة)', b.ending_checked===4, String(b.ending_checked));
ok('ar: الهمزات تُطبَّع', C.base('إِلَى','ar')===C.base('الى','ar'));
ok('ending: الشدّة ليست إعراباً', C.ending('مُبَكِّرًا')==='ً' && C.ending('الحقّ')==='');
ok('parseGemini: سياج json', C.parseGemini({candidates:[{content:{parts:[{text:'```json\n{"transcript":"x"}\n```'}]}}]}).data.transcript==='x');
ok('parseGemini: فارغ', !!C.parseGemini({}).error);
ok('mimeOf', C.mimeOf('a/i1-x.webm')==='audio/webm' && C.mimeOf('x.m4a')==='audio/mp4' && C.mimeOf('x.exe')===null);
ok('brief', /omitted: «a»/.test(C.alignmentBrief(a)));
const big='w '.repeat(600), bigH='w '.repeat(590);
const t0=Date.now(); const g=C.align(big,bigH,'en'); ok('٦٠٠ كلمة في أقلّ من ثانية', Date.now()-t0<1000 && g.omitted===10, String(Date.now()-t0));
/* readable — نصُّ البند ٤٣١ بعينه: سطرُ صورةٍ بين فقرتين */
const b431 = 'Egypt is a land with a heart.\n[image: r2:img/l9-8s9ega.webp | Where do the past and the present meet in this picture? Find the sentence in paragraph 1 that says so.]\nEgypt has always played an important role.';
const r431 = C.readable(b431);
ok('readable: سطرُ الصورة يسقط', !/image|picture|r2:/.test(r431), r431);
ok('readable: النصُّ حوله يبقى', /heart\./.test(r431) && /important role\./.test(r431), r431);
ok('readable: والمقارنةُ بعده نظيفة', C.align(b431, 'Egypt is a land with a heart Egypt has always played an important role', 'en').omitted > 10
   && C.align(r431, 'Egypt is a land with a heart Egypt has always played an important role', 'en').omitted === 0);
ok('readable: [صورة: …] والفيديو', C.readable('أ ب\n[صورة: r2:x.webp]\n[فيديو: https://y | تعليق]\nج') === 'أ ب\nج', JSON.stringify(C.readable('أ ب\n[صورة: r2:x.webp]\n[فيديو: https://y | تعليق]\nج')));
ok('readable: رقمُ الفقرة والتنسيق', C.readable('(١) **مصرُ** بلدٌ __عريق__ و_جميل_.\n\n(2) Second \\(x\\) line.') === 'مصرُ بلدٌ عريق وجميل.\n\nSecond x line.', JSON.stringify(C.readable('(١) **مصرُ** بلدٌ __عريق__ و_جميل_.\n\n(2) Second \\(x\\) line.')));
ok('readable: الحركاتُ لا تُمسّ', C.readable('ذَهَبَ الطالبُ') === 'ذَهَبَ الطالبُ');
console.log(`${n-bad}/${n}`); process.exit(bad?1:0);
