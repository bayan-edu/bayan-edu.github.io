/* ══════════════════════════════════════════════════════════
   قياسُ الحوار الإنجليزيّ في `supabase/functions/tts/core.js` (🆕 b219 · 199 · مختبر الصوتيّات، الخطوة ٢) — بلا Deno ولا شبكة.
     node tools/tts_dialogue.test.mjs

   ما يُقاس: الطلبان (التوليد · الوصل) وحدودُهما · التوجيهُ لا يحمل النصّ · طلبُ الصوت · المفاتيحُ = قيدُ القاعدة (199) ·
   إطارُ الصمت بترويسة المرجع · والوصلُ بإطاراتٍ مصنوعةٍ معلومةِ المدّة · ولوحةُ الأصوات في الواجهة = أصواتُ الدالّة.
   📌 والوصلُ على مقاطع Gemini وChirp الحقيقيّة من R2 فكّه المتصفّحُ (٦ نوفمبر): ٦٫١٤٤ ث والصمتُ أصفارٌ تامّة — STATE عند b219.
   ══════════════════════════════════════════════════════════ */
import { readFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const T = await import(pathToFileURL(join(ROOT, 'supabase/functions/tts/core.js')));
const A = await import(pathToFileURL(join(ROOT, 'js/audio_lines.js')));

let bad = 0, n = 0;
const ok = (name, cond, extra = '') => { n++; if(!cond) bad++; console.log(cond ? '✅' : '❌', name, cond ? '' : extra); };
const show = v => JSON.stringify(v);
const err = r => r?.error;

/* ① طلبُ التوليد */
const line = (o = {}) => ({ key: 'r1', speaker: 'Sara', text: 'Hi Tom!', voice: 'leda', accent: 'en-GB', tone: 'cheerful', prev: null, ...o });
const g = T.checkDialogue({ dialogue: 10, scene: '  Two friends  at a café ', lines: [line(), line({ key: 'r2', speaker: 'Tom', text: 'Hey!', voice: 'puck', accent: 'en-US', tone: '', prev: 'Hi Tom!' })] });
ok('توليدٌ سليم: الدرسُ والمشهدُ مضمومُ المسافات', g.dialogue === 10 && g.scene === 'Two friends at a café' && g.lines.length === 2, show(g));
ok('نبرةٌ فارغة ⇒ null · والسابقُ يُحمل', g.lines[1].tone === null && g.lines[1].prev === 'Hi Tom!');
ok('درسٌ غير صالح', err(T.checkDialogue({ dialogue: 'x', lines: [line()] })) === 'رقم الدرس غير صالح');
ok('ستّةُ سطور ⇒ تُردّ', err(T.checkDialogue({ dialogue: 10, lines: Array.from({ length: 6 }, (_, k) => line({ key: 'r' + k })) })) === 'الدفعة خمسة سطور على الأكثر');
ok('صوتٌ مجهول', err(T.checkDialogue({ dialogue: 10, lines: [line({ voice: 'iapetus' })] })) === 'الصوت غير معروف');
ok('ولا مفاتيحُ النموذج الأوّليّ صوتاً', err(T.checkDialogue({ dialogue: 10, lines: [line({ voice: 'toString' })] })) === 'الصوت غير معروف');
ok('لهجةٌ مجهولة', err(T.checkDialogue({ dialogue: 10, lines: [line({ accent: 'ar-XA' })] })) === 'اللهجة غير معروفة');
ok('مشهدٌ فوق ٦٠٠', err(T.checkDialogue({ dialogue: 10, scene: 'x'.repeat(601), lines: [line()] })) === 'المشهد أطول من ٦٠٠ حرف');
ok('نبرةٌ فوق ٢٠٠', err(T.checkDialogue({ dialogue: 10, lines: [line({ tone: 'y'.repeat(201) })] })) === 'النبرة أطول من ٢٠٠ حرف');
ok('سطرٌ بلا نص', err(T.checkDialogue({ dialogue: 10, lines: [line({ text: '   ' })] })) === 'سطرٌ بلا نص، أو أطول من ١٠٠٠ حرف');
ok('بلا مفتاح سطر', err(T.checkDialogue({ dialogue: 10, lines: [line({ key: '' })] })) === 'مفتاح السطر غائب');
ok('والسابقُ يُقصّ إلى آخر ٣٠٠', T.checkDialogue({ dialogue: 10, lines: [line({ prev: 'p'.repeat(500) })] }).lines[0].prev.length === 300);

/* ② طلبُ الوصل */
const clip = (l = 10, h = '0123456789abcdef') => `r2:voice/dialogues/l${l}/${h}.mvt8orph.mp3`;
const a = T.checkDialogue({ dialogue: 10, assemble: { lines: [{ clip: clip(), text: 'Hi Tom!', speaker: 'Sara' }, { clip: clip(10, 'fedcba9876543210'), gap: 400, text: 'Hey!', speaker: 'Tom' }], draft: { scene: 'x' } } });
ok('وصلٌ سليم: الوقفةُ الأولى صفر والوصفةُ تُحمل', a.assemble.lines.length === 2 && a.assemble.lines[0].gap === 0 && a.assemble.lines[1].gap === 400 && a.assemble.draft.scene === 'x', show(a));
ok('ملفُّ درسٍ آخر يُردّ', err(T.checkDialogue({ dialogue: 10, assemble: { lines: [{ clip: clip(11), text: 'A' }] } })) === 'ملف سطرٍ ليس في مجلد هذا الدرس، أو لم يُولَّد بعد');
ok('ملفٌّ مرفوعٌ لا مولَّد يُردّ', err(T.checkDialogue({ dialogue: 10, assemble: { lines: [{ clip: 'r2:audio/l10-x.mp3', text: 'A' }] } })) === 'ملف سطرٍ ليس في مجلد هذا الدرس، أو لم يُولَّد بعد');
ok('وقفةٌ ستّ ثوانٍ', err(T.checkDialogue({ dialogue: 10, assemble: { lines: [{ clip: clip(), gap: 6000, text: 'A' }] } })) === 'الوقفة قبل السطر غير صالحة');
ok('٦١ سطراً', err(T.checkDialogue({ dialogue: 10, assemble: { lines: Array.from({ length: 61 }, () => ({ clip: clip(), text: 'A' })) } })) === 'الحوار ستون سطراً على الأكثر');

/* ③ التوجيهُ وطلبُ الصوت */
const p = T.dialoguePrompt(g.lines[1], g.scene);
ok('التوجيهُ يحمل المشهدَ والقائلَ والسابقَ والإيقاع', p.includes('Scene: Two friends at a café') && p.includes('You are Tom.') && p.includes('"Hi Tom!"') && p.includes('natural conversational pace'));
ok('والنصُّ نفسُه ليس في التوجيه (يُقرأ وحده)', !T.dialoguePrompt(line({ text: 'UNIQUE_TEXT' })).includes('UNIQUE_TEXT'));
const rq = T.dialogueRequest(g.lines[0], g.scene);
ok('طلبُ الصوت: اللهجةُ والاسمُ والنموذجُ و٢٤ ك.هرتز MP3', rq.voice.languageCode === 'en-GB' && rq.voice.name === 'Leda' && rq.voice.model_name === T.EN.model
   && rq.audioConfig.audioEncoding === 'MP3' && rq.audioConfig.sampleRateHertz === 24000 && rq.input.text === 'Hi Tom!' && rq.input.prompt.includes('Delivery: cheerful.'));
ok('اسمُ الصوت للعرض', T.dialogueLabel(g.lines[0]) === 'gemini-2.5-flash-tts · en-GB · Leda');

/* ④ المفاتيحُ = قيدُ القاعدة (199) */
const sql = readFileSync(join(ROOT, 'sql/199_dialogue_lines.sql'), 'utf8');
const sha = await T.lineSha(g.lines[0], g.scene), ck = T.dialogueKeys(10, sha, T.revision(0)), tk = T.trackKeys(10, T.revision(0));
const clipRx = new RegExp('^r2:voice/dialogues/l' + 10 + '/[0-9a-f]{16}\\.[a-z0-9]{1,16}\\.mp3$');
const trackRx = new RegExp('^r2:voice/dialogues/l' + 10 + '/track\\.[a-z0-9]{1,16}\\.mp3$');
ok('بصمةُ السطر ١٦ خانة', /^[0-9a-f]{16}$/.test(sha));
ok('مفتاحُ السطر يطابق نمطَ 199', clipRx.test(ck.key) && ck.path === ck.key.slice(3), ck.key);
ok('ومفتاحُ الملفّ الموصول', trackRx.test(tk.key), tk.key);
ok('والنمطان في 199 بحرفهما', sql.includes("'/[0-9a-f]{16}\\.[a-z0-9]{1,16}\\.mp3$'") && sql.includes("'/track\\.[a-z0-9]{1,16}\\.mp3$'"));
ok('وما يقبله checkDialogue يقبله 199', T.checkDialogue({ dialogue: 10, assemble: { lines: [{ clip: ck.key, text: 'A' }] } }).assemble.lines[0].clip === ck.key);
ok('السطرُ نفسُه بنبرةٍ أخرى بصمةٌ أخرى', sha !== await T.lineSha({ ...g.lines[0], tone: 'tired' }, g.scene));

/* ⑤ إطارُ الصمت والوصل — إطاراتٌ مصنوعةٌ بصيغة Gemini (MPEG-2 · ٢٤ ك.هرتز · قناةٌ واحدة · ٣٢ ك.ب/ث) */
const REF = Uint8Array.from([0xFF, 0xF3, 0x44, 0xC4]);              // كترويسة Google (الأخيرُ يحمل بتّاتٍ لا تُنسخ)
const sil = T.silentFrame(REF);
ok('إطارُ الصمت ٩٦ بايتاً و٢٤ م.ث', sil.bytes.length === 96 && sil.dur === 24);
ok('ترويستُه: بلا CRC · ٣٢ ك.ب/ث · ٢٤ ك.هرتز · قناةٌ واحدة · والباقي أصفار',
   show([...sil.bytes.slice(0, 4)]) === show([0xFF, 0xF3, 0x44, 0xC0]) && sil.bytes.slice(4).every(x => x === 0));
const frames = k => { const b = new Uint8Array(96 * k); for(let i = 0; i < k; i++) b.set(sil.bytes, 96 * i); return b; };
ok('mp3Frames يقرأ إطاراتِ الصمت', T.mp3Ms(frames(10)) === 240);
const j = T.joinClips([{ bytes: frames(10) }, { bytes: frames(5), gap: 500 }, { bytes: frames(3), gap: 0 }]);
ok('الوصل: الوقفةُ إطاراتٌ تامّة (٥٠٠ ⇐ ٢١ إطاراً)', show(j.spans) === show([{ start: 0, end: 240 }, { start: 744, end: 864 }, { start: 864, end: 936 }]) && j.ms === 936, show(j));
ok('والملفُّ الموصول طولُه مجموعُه', T.mp3Ms(j.bytes) === 936 && j.bytes.length === 96 * 39);
const mono44 = Uint8Array.from([0xFF, 0xFB, 0x90, 0xC0]);           // MPEG-1 · ٤٤٫١ ك.هرتز — صيغةٌ أخرى
const other = new Uint8Array(T.silentFrame(mono44).bytes);
ok('صيغةٌ تخالف الأولى لا تُوصل', T.joinClips([{ bytes: frames(2) }, { bytes: other }]).error === 'السطور بصيغ صوتٍ مختلفة فلا تُوصل');
ok('ملفٌّ بلا إطارات', T.joinClips([{ bytes: new Uint8Array(50) }]).error === 'ملف سطرٍ بلا إطارات صوت');

/* ⑥ لوحةُ الواجهة = أصواتُ الدالّة · واللهجات */
ok('DIALOGUE_VOICES مفاتيحُها وأسماؤها = EN.voices', show(Object.keys(A.DIALOGUE_VOICES)) === show(Object.keys(T.EN.voices))
   && Object.entries(A.DIALOGUE_VOICES).every(([k, v]) => v.name === T.EN.voices[k]));
ok('ACCENTS = EN.accents = لهجاتُ 199', show(Object.keys(A.ACCENTS)) === show(T.EN.accents) && sql.includes("('en-US', 'en-GB', 'en-IN', 'en-AU')"));
ok('والوقفاتُ الجاهزة في حدّ الدالّة', A.GAPS.every(x => x <= T.EN.limits.gap) && A.gapFor(null, {}) === 0
   && A.gapFor({ speaker: 'A' }, { speaker: 'A' }) === 200 && A.gapFor({ speaker: 'A' }, { speaker: 'B' }) === 400);

console.log(`\n${bad ? '❌' : '✅'} ${n - bad} / ${n}`);
process.exit(bad ? 1 : 0);
