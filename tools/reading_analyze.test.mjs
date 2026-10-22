/* ══════════════════════════════════════════════════════════
   قياسُ منطق تحليل القراءة الجهريّة (176) — بلا شبكةٍ ولا نموذج.
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
/* الذيلُ المخترَع — نصّ ٤٣١ وما كتبه Whisper حيّاً للتسجيلين ١٣ و١٤ (٢٢ أكتوبر) */
const REF431 = "Egypt is a land with a heart that has been beating for thousands of years. We are proud to call it our home. It is a place where the past and the present meet in harmony.\nEgypt has always played an important role in the world. Our ancestors built one of the greatest civilizations in history. They gave the world knowledge in writing, mathematics, and medicine. The hieroglyphs carved into temple walls were not just beautiful art; they were a way to record history. The Library of Alexandria once gathered knowledge from all over the world, making Egypt a center of learning.\n\nEgypt was also a crossroads for trade. Merchants traveled along the Nile and across the deserts, carrying goods.";
const a14 = C.align(REF431, "Egypt, a land, is with a heart that has been beating for thousands of years. We are proud to call it our home. It is a place where the past and the present meet in harmony. Egypt has always played an important role in the world. Our predecessors built one of the greatest civilizations in history. They gave the world knowledge in writing, mathematics, and medicine. The higher carved into temple walls were not just a beautiful art. They were a way to record history. The library of Alexandria once gathered knowledge from all over the world, making Egypt a center of learn. Egypt is also a crossroads for trade. Merchants traveled along the Nile and across the desert carrying things. Thanks. Thanks. Thanks. Thanks for listening.", 'en');
ok('ذيل ١٤: «Thanks…» بعد النصّ ولا يُعدّ', a14.after_text.length === 6 && a14.inserted === 2, JSON.stringify({after:a14.after_text, ins:a14.inserted}));
ok('ذيل ١٤: «goods» ⇐ «things» لا «Thanks»', a14.issues.some(o => o.op === 'sub' && o.ref === 'goods.' && o.hyp === 'things.'), JSON.stringify(a14.issues.slice(-3)));
ok('ذيل ١٤: الأخطاءُ المتعمَّدة كلُّها في القائمة', ['predecessors','higher','learn.'].every(h => a14.issues.some(o => o.op === 'sub' && o.hyp === h))
   && a14.issues.some(o => o.op === 'sub' && o.ref === 'was' && o.hyp === 'is') && a14.issues.some(o => o.op === 'ins' && o.hyp === 'a'), JSON.stringify(a14.issues));
const a13 = C.align(REF431, "Egypt is a land with a heart that has been beating for thousands of years. We are proud to call it our home. It is a place where the past and the present meet in harmony. Egypt has always played an important role in the world. Our ancestors built one of the greatest civilizations in history. They gave the world knowledge in writing, mathematics, and medicine. The hieroglyphs carved into temple walls were not just beautiful art. They were a way to record history. The Library of Alexandria once gathered knowledge from all over the world, making Egypt a center of learning. Egypt was also a crossroads for trade. Merchants traveled along the Nile and across the desert carrying goods. Merchants get an embrace. Even change in the world.", 'en');
ok('ذيل ١٣: جملةٌ مخترَعةٌ كاملة بعد النصّ ولا تُعدّ', a13.after_text.length === 9 && a13.inserted === 0 && a13.substituted === 1, JSON.stringify({after:a13.after_text, sub:a13.substituted, ins:a13.inserted}));
ok('بلا ذيل: لا شيء بعد النصّ', C.align('one two three', 'one two three', 'en').after_text.length === 0);
ok('عنوانٌ قُرئ قبل النصّ ⇒ before_text لا زيادة', (r => r.before_text.length === 2 && r.inserted === 0)(C.align('one two three', 'Reading time one two three', 'en')));
ok('زيادةٌ داخل النصّ تبقى زيادة', C.align('one two three', 'one two two three', 'en').inserted === 1);

/* asrInfo — السرعةُ على كلمات القراءة وحدها */
const seg = [{ start: 0, end: 6, words: [{word:'x',start:0.5,end:0.8},{word:'one',start:1,end:1.3},{word:'two',start:1.4,end:1.6},{word:'three',start:2.9,end:3.0},{word:'Thanks',start:5,end:5.2}] }];
const f1 = C.asrInfo({ segments: seg, transcription_info: { duration: 6 } }, 'en', { start: 1, end: 1 });
ok('asrInfo: الطرفان يسقطان والمدّةُ من أوّل كلمةٍ مقروءة إلى آخرها', f1.words === 3 && f1.duration_s === 2 && f1.wpm === 90 && f1.long_pauses === 1, JSON.stringify(f1));
const f2 = C.asrInfo({ text: 'a b c', segments: [{ start: 0, end: 6 }] });
ok('asrInfo: بلا توقيتٍ للكلمات ⇒ مدّةُ آخر مقطع والوقفاتُ null', f2.duration_s === 6 && f2.wpm === 30 && f2.long_pauses === null, JSON.stringify(f2));
ok('asrInfo: ردٌّ فارغ لا ينكسر', C.asrInfo({}).wpm === null && C.asrInfo(null).words === 0);
console.log(`${n-bad}/${n}`); process.exit(bad?1:0);
