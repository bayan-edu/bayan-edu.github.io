/* ══════════════════════════════════════════════════════════
   قياسُ `js/voice_rows.js` — منطقُ لوحة الصوت بلا واجهة (b203 · الخطوة ٦ من ستّ).
     node tools/voice_panel.test.mjs

   ما يُقاس: **نسختا القاعدة** — اللوحةُ تُري المقترحَ والإمساكَ قبل التوليد، والدالّةُ تحكم بهما عنده، فتُقاس الأولى على
   `supabase/functions/tts/core.js` ولا تُصدَّق · السطورُ من جمل الكتاب وأصوات القاعدة (الحالاتُ · الآياتُ خارجها ·
   المكرَّرة · الممسَكة · صوتُ الصفّ · صوتُ جملةٍ خرجت من النصّ) · الدفعاتُ (خمسٌ · المكرَّرةُ مرّة · السياق · الصوتُ حين
   يخالف المقترح وحده · النطق) · والعدّ · والنبراتُ الجاهزة (ما سمّاه المالك · صفةُ النبرة · تقبلها الدالّةُ كما هي).
   ══════════════════════════════════════════════════════════ */
import { join, dirname } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const V = await import(pathToFileURL(join(ROOT, 'js/voice_rows.js')));
const T = await import(pathToFileURL(join(ROOT, 'supabase/functions/tts/core.js')));
const { textSentences } = await import(pathToFileURL(join(ROOT, 'js/book.js')));

let bad = 0, n = 0;
const ok = (name, cond, extra = '') => { n++; if(!cond) bad++; console.log(cond ? '✅' : '❌', name, cond ? '' : extra); };
const show = v => JSON.stringify(v);

/* ① نسختا القاعدة: اللوحةُ والدالّة */
{
  ok('مفاتيحُ اللوحة مفاتيحُ الدالّة بترتيبها', show(Object.keys(V.VOICES)) === show(Object.keys(T.VOICES)),
     show([Object.keys(V.VOICES), Object.keys(T.VOICES)]));
  ok('واسمُ كلّ صوتٍ في القاعدة اسمُه في الدالّة', Object.keys(V.VOICES).every(id => V.VOICES[id].label === T.VOICES[id]?.label), '');
  ok('والمقترحان مقترحا الدالّة', V.NARRATOR === T.NARRATOR && V.CHARACTER === T.CHARACTER, '');
  const samples = [
    { text: 'وكان عنترة يسمع قولها.', kind: 'p' }, { text: '- لست أحتمل أن أعيش', kind: 'p' },
    { text: '— قال', kind: 'p' }, { text: '– قالت', kind: 'p' }, { text: '«لا»', kind: 'p' }, { text: '"نعم"', kind: 'p' },
    { text: '“هكذا”', kind: 'p' }, { text: '  - مسافةٌ قبل الشرطة', kind: 'p' }, { text: '-لا مسافة', kind: 'p' },
    { text: '- ', kind: 'p' }, { text: '«عنوان»', kind: 'cover' }, { text: '- عنوانٌ فرعيّ', kind: 'h' },
    { text: 'حسدوا الفتى إذ لم ينالوا سعيه', kind: 'v' }, { text: '«بيتٌ يبدأ بتنصيص»', kind: 'v' },
    { text: 'قال تعالى ﴿وَالْعَصْرِ﴾ في سورته.', kind: 'p' }, { text: '﴿ وحدها', kind: 'cover' }, { text: 'نثرٌ بلا قوسين.', kind: 'p' }
  ];
  const diff = samples.filter(s => V.recommend(s) !== T.recommend(s) || V.isDialogue(s.text) !== T.isDialogue(s.text)
                                || V.held(s) !== !!T.held(s));
  ok(`والمقترحُ والحوارُ والإمساكُ كالدالّة على ${samples.length} جملة`, !diff.length, show(diff));
  ok('وسببُ الإمساك بحرف الدالّة', V.HELD === T.QUOTE_HELD, show([V.HELD, T.QUOTE_HELD]));
  ok('وحدُّ الدفعة حدُّ الدالّة', V.BATCH === T.LIMITS.sentences, '');
  ok('voiceOf: اسمُ الصفّ ومعه مصدرُ تشكيله ⇒ مفتاحُ صوته',
     V.voiceOf(T.voiceLabel(T.TASHKEEL_MODEL, T.VOICES.iapetus.label)) === 'iapetus'
     && V.voiceOf(T.voiceLabel('المؤلّف', T.VOICES.algenib.label)) === 'algenib'
     && V.voiceOf(T.voiceLabel('المعلّم', T.VOICES.charon.label)) === 'charon', '');
  ok('وصوتٌ ليس في اللوحة ⇒ null', V.voiceOf('chirp-3-hd · ar-XA · Orus · تشكيل x') === null && V.voiceOf(null) === null, '');
}

/* ② السطور: جملُ الكتاب وأصواتُ القاعدة */
const TITLE = 'القصة: الفصل الثالث';
const BODY = [
  'المشهد الأول',
  'فقال عنترة فى شبه صيحة: لست أحتمل.',
  '- لست أحتمل أن أعيش بعد اليوم.',
  'حَسَدُوا الفَتَى إِذْ لَمْ يَنَالُوا سَعْيَهُ ۞ فَالقَوْمُ أَعْدَاءٌ لَهُ وَخُصُومُ',
  '﴿وَالْعَصْرِ ۝١﴾',
  'قال تعالى ﴿إِنَّ الْإِنسَانَ لَفِي خُسْرٍ﴾ في سورته.',
  'جملة مكررة.',
  'جملة مكررة.'
].join('\n\n');
const sents = textSentences(BODY, TITLE);
const label = id => T.voiceLabel(T.TASHKEEL_MODEL, T.VOICES[id].label);
const clips = [
  { sha: 'a1', sentence: 'فقال عنترة فى شبه صيحة: لست أحتمل.', audio: 'r2:voice/9/a1.x.mp3', voice: label('iapetus'), approved_at: '2026-10-28' },
  { sha: 'b2', sentence: '- لست أحتمل أن أعيش بعد اليوم.', audio: 'r2:voice/9/b2.x.mp3', voice: label('algenib'), approved_at: null },
  { sha: 'c3', sentence: 'جملة مكررة.', audio: 'r2:voice/9/c3.x.mp3', voice: label('charon'), approved_at: null },
  { sha: 'd4', sentence: 'جملة قديمة لم تعد في النص.', audio: 'r2:voice/9/d4.x.mp3', voice: label('iapetus'), approved_at: '2026-10-28' }
];
const rows = V.voiceRows(sents, clips);
{
  ok('الجملُ كما يقسمها الكتاب: غلاف · عنوان · نثر · حوار · بيت · آية · ممسَكة · مكرَّرتان',
     show(sents.map(s => s.kind)) === show(['cover', 'h', 'p', 'p', 'v', 'q', 'p', 'p', 'p']), show(sents.map(s => [s.kind, s.text])));
  ok('والآيةُ المرقَّمة خارج اللوحة (تُتلى بصوت الحصري)', rows.length === 8 && rows.every(r => r.kind !== 'q'), show(rows.map(r => r.text)));
  ok('و`i` موضعُ الجملة في جمل النصّ لا في السطور', rows[5].i === 6 && sents[rows[5].i].text === rows[5].text, show(rows[5]));
  const st = show(rows.map(r => r.state));
  ok('الحالات: بلا صوت · بلا صوت · معتمد · لم يُعتمد · بلا صوت · ممسَكة · لم يُعتمد · لم يُعتمد',
     st === show(['none', 'none', 'ok', 'made', 'none', 'held', 'made', 'made']), st);
  ok('وصوتُ الصفّ من اسمه في القاعدة، والمقترحُ حيث لا صفّ', rows[2].voice === 'iapetus' && rows[3].voice === 'algenib'
     && rows[6].voice === 'charon' && rows[0].voice === 'iapetus' && rows[4].voice === 'iapetus', show(rows.map(r => r.voice)));
  ok('والمقترح: Algenib للحوار وحده، وIapetus للغلاف والعنوان والبيت والنثر',
     show(rows.map(r => r.recommended)) === show(['iapetus', 'iapetus', 'iapetus', 'algenib', 'iapetus', 'iapetus', 'iapetus', 'iapetus']), '');
  ok('والمكرَّرتان سطران بصوتٍ واحد (البصمةُ من النصّ)', rows[6].clip === rows[7].clip && rows[6].clip.sha === 'c3', '');
  ok('وصوتُ جملةٍ خرجت من النصّ لا يُعرض', !rows.some(r => r.clip?.sha === 'd4'), '');
  ok('والعدّ', show(V.tally(rows)) === show({ none: 3, made: 3, ok: 1, held: 1 }), show(V.tally(rows)));
  ok('وبلا أصواتٍ: كلُّها بلا صوت إلا الممسَكة', show(V.tally(V.voiceRows(sents, []))) === show({ none: 7, made: 0, ok: 0, held: 1 }), '');
}

/* ③ الدفعات */
{
  const miss = V.voiceBatches(sents, rows.filter(r => r.state === 'none'));
  ok('ما لا صوت له: دفعةٌ واحدة بالغلاف والعنوان والبيت، وأنواعُها أنواعُ الدالّة',
     miss.length === 1 && show(miss[0].sentences.map(s => s.kind)) === show(['cover', 'h', 'v']), show(miss));
  ok('وسياقُ أوّل النصّ فارغ', miss[0].context === '', show(miss[0].context));
  ok('ولا صوتَ ولا نطقَ في الطلب ما لم يُختارا', miss[0].sentences.every(s => !('voice' in s) && !('spoken' in s)), '');

  const all = V.voiceBatches(sents, rows);
  ok('والممسَكةُ لا تُرسل، والمكرَّرةُ مرّة', all.flatMap(b => b.sentences).length === 6
     && !all.flatMap(b => b.sentences).some(s => s.text.includes('﴿'))
     && all.flatMap(b => b.sentences).filter(s => s.text === 'جملة مكررة.').length === 1, show(all));

  const pick = V.voiceBatches(sents, [rows[0], rows[3]], {
    voice: { [rows[0].text]: 'iapetus', [rows[3].text]: 'charon' }, spoken: { [rows[3].text]: '- لَسْتُ أَحْتَمِلُ.' } });
  const [c, d] = pick[0].sentences;
  ok('الصوتُ يُرسل حين يخالف المقترحَ وحده، والنطقُ كما كُتب', !('voice' in c) && d.voice === 'charon' && d.spoken === '- لَسْتُ أَحْتَمِلُ.', show(pick));

  const many = Array.from({ length: 12 }, (_, k) => `جملةٌ رقم ${k + 1}.`);
  const ms = textSentences(many.join(' '), '');
  const mb = V.voiceBatches(ms, V.voiceRows(ms, []));
  ok('اثنتا عشرة جملة ⇒ ٥ و٥ و٢', show(mb.map(b => b.sentences.length)) === show([5, 5, 2]), show(mb.map(b => b.sentences.length)));
  ok('وسياقُ الدفعة الثانية الجملتان قبلها', mb[1].context === `${many[3]} ${many[4]}`, show(mb[1].context));
  ok('ولا دفعةَ تجاوز حدَّ الدالّة', mb.every(b => b.sentences.length <= T.LIMITS.sentences), '');
  const shape = T.checkRequest({ item: 1, sentences: mb[0].sentences, context: mb[0].context });
  ok('ودفعةُ اللوحة طلبٌ تقبله الدالّة كما هو', !shape.error && shape.sentences.length === 5, show(shape));
  const asked = T.checkRequest({ item: 1, sentences: pick[0].sentences, context: pick[0].context });
  ok('ومعها الصوتُ المختار والنطقُ المصحَّح', !asked.error && asked.sentences[1].voice === 'charon' && asked.sentences[1].spoken === '- لَسْتُ أَحْتَمِلُ.', show(asked));
}

/* ④ الشخصيّةُ النسائيّة والنبرة (حكمُ المالك: «Gacrux والثاني Achernar» · «نعم تلقائياً» · «يحتاج ضبط للنبرة حسب النص») */
{
  /* الجملُ التي قدّمت لسطور الحوار في `603` بحرفها — وهي فيصلُ النسختين */
  const LEADS = ['فقالت له زبيبة:', 'فنظر إليها عنترة ولم يجب فاستمرت قائلة:', 'وكانت زبيبة تستمع إليه فى دهشة متعجبة من قوله وصاحت فى ألم:',
    'فقالت زبيبة مسرعة:', 'فقالت زبيبة هادئة:', 'وما كاد ينطق بالكلمة الأخيرة حتى صاحت به زبيبة فى حنق:', 'فقالت زبيبة بين شهقاتها:',
    'فتخاذلت زبيبة، ومدت يديها فى تضرع وقالت:', 'وسكتت لحظة ثم قالت بصوت متهدج:', 'ثم وثب واقفًا وقامت أمه تتعلق به قائلة:',
    'فخضع عنترة وأطرق حينا ثم قال لها:', 'فقال عنترة فى مرارة:', 'فصاح عنترة:', 'ثم وضعت رأسها بين كفيها وأخذت تبكى وفلان عنترة وقال يستعطفها:',
    'فنظر عنترة إليها وقد هدأت ثائرته وقال ساخرًا:', 'فنظر عنترة إلى وجه أمه وقال:', 'فَقَالَتْ زَبِيبَةُ:', 'فأجابته:', 'سألته أمه:',
    'قال وقد سالت دموعه:', 'فقالت زبيبة: كفى. فقال عنترة:', 'وكان الليل حالكاً.', '', 'وهي تقول:'];
  const diff = LEADS.filter(l => V.femaleLead(l) !== T.femaleLead(l));
  ok(`femaleLead كالدالّة على ${LEADS.length} جملة (منها ستَّ عشرةَ من 603)`, !diff.length, show(diff));
  ok('والصوتُ النسائيّ المقترح مقترحُ الدالّة، وAchernar في اللوحة', V.FEMALE === T.FEMALE && 'achernar' in V.VOICES && V.VOICES.gacrux.tone === true, '');
  ok('وChirp وحده لا يأخذ نبرة', Object.entries(V.VOICES).every(([id, v]) => v.tone === !id.startsWith('iapetus')), show(V.VOICES));

  const body = ['وكانت ليلةً حزينة.', 'فقالت زبيبة بين شهقاتها:', '- إنك ابنه.', 'فقال عنترة:', '- إذن فهو أبي؟'].join('\n\n');
  const ss = textSentences(body, '');
  const rs = V.voiceRows(ss, []);
  ok('سطرُها بـGacrux وسطرُه بـAlgenib، والسردُ بالراوي', show(rs.map(r => r.recommended)) === show(['iapetus', 'iapetus', 'gacrux', 'iapetus', 'algenib']),
     show(rs.map(r => [r.text, r.recommended])));
  ok('وكلُّ سطرٍ يعرف الجملةَ قبله، وسطرُ الحوار معلَّم', rs[2].lead === 'فقالت زبيبة بين شهقاتها:' && rs[2].talk && !rs[1].talk && rs[0].lead === null, show(rs[2]));
  const [bb] = V.voiceBatches(ss, rs, { tone: { '- إذن فهو أبي؟': 'ساخرة' } });
  ok('والدفعةُ: الجملةُ قبل سطر الحوار وحده، والنبرةُ المكتوبة', bb.sentences[2].lead === 'فقالت زبيبة بين شهقاتها:' && !('lead' in bb.sentences[1])
     && bb.sentences[4].tone === 'ساخرة' && !('tone' in bb.sentences[2]), show(bb));
  const checked = T.checkRequest({ item: 1, sentences: bb.sentences, context: bb.context });
  ok('وما تراه اللوحةُ مقترحاً تقترحه الدالّةُ للطلب نفسِه (فلا يُرسل الصوتُ إلا مخالفاً)', !checked.error
     && checked.sentences.every((s, k) => T.recommend(s) === rs[k].recommended), show(checked));
  ok('والدالّةُ تعطي سطرَها Gacrux بنبرة «بين شهقاتها»، وسطرَه بالنبرة المكتوبة', T.voiceFor(checked.sentences[2]).name === 'Gacrux'
     && T.voiceFor(checked.sentences[2]).prompt.includes('بين شهقاتها') && T.voiceFor(checked.sentences[4]).prompt.includes('ساخرة'), '');
}

/* ⑤ النبراتُ الجاهزة (حكمُ المالك: «يمكن إضافة أكثر من نبرة، سعيدة، مثيرة، ضاحكة… إلخ») */
{
  const OWNER = ['سعيدة', 'مثيرة', 'ضاحكة', 'منكسرة باكية', 'حزينة'];
  ok('فيها ما سمّاه المالك', OWNER.every(t => V.TONES.includes(t)), show(OWNER.filter(t => !V.TONES.includes(t))));
  ok('بلا تكرارٍ ولا فراغٍ على طرفيها', new Set(V.TONES).size === V.TONES.length && V.TONES.every(t => t && t === t.trim()), show(V.TONES));
  ok('وكلُّ كلمةٍ صفةُ النبرة (مؤنّثةٌ بالتاء) فتصلح للرجل والمرأة', V.TONES.every(t => t.split(' ').every(w => w.endsWith('ة'))), show(V.TONES));
  const asked = V.TONES.map(tone => T.checkRequest({ item: 1, sentences: [{ text: '- لقد عاد أبي.', kind: 'p', voice: 'gacrux', tone }], context: '' }));
  ok(`والدالّةُ تقبل النبراتِ الـ${V.TONES.length} كما هي، وتبلغ كلٌّ منها الصوت`, asked.every((a, k) => !a.error
     && T.voiceFor(a.sentences[0]).prompt.includes(`بهذه النبرة: ${V.TONES[k]}.`)), show(asked.filter(a => a.error)));
}

console.log(`\n${n - bad}/${n}${bad ? ' — فشل' : ''}`);
process.exit(bad ? 1 : 0);
