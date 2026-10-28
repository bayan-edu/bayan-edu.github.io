/* ══════════════════════════════════════════════════════════
   قياسُ `supabase/functions/tts/index.ts` — غلافُ الدالّة بلا Deno ولا شبكة.
     node tools/tts_index.test.mjs

   لا Deno على جهاز المالك، والدالّةُ ذاهبةٌ إلى المشروع الحيّ ⇒ يُشغَّل الغلافُ نفسُه في node (يُنزع منه TypeScript — node 24)
   ويُستبدل ما حوله: `Deno.serve` · `Deno.env` · `fetch` إلى Google · `AwsClient` إلى R2 · `createClient` إلى القاعدة — كلُّها
   تُسجّل ما طُلب منها. فيُقاس الترتيبُ (الحارسُ قبل الكلفة) والمسارُ والملفّاتُ والصفوف، لا Google ولا R2.
   🆕 b207 · و`fetch` إلى المخزن بعنوانه العامّ (`media.bayanclass.com`) يقدّم المصحفَ من عيّنة القياس (`tools/fixtures/quran_quotes.json`)
   وتلاوةً مصنوعةً بإطاراتٍ معلومة المدّة (⑥).
   ══════════════════════════════════════════════════════════ */
import { readFileSync, writeFileSync, mkdtempSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { tmpdir } from 'node:os';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { generateKeyPairSync } from 'node:crypto';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const SRC = join(ROOT, 'supabase/functions/tts');

/* نسخةٌ من الدالّة بجوار core.js، واستيرادا npm إلى البدائل */
const tmp = mkdtempSync(join(tmpdir(), 'bayan-tts-'));
writeFileSync(join(tmp, 'core.js'), readFileSync(join(SRC, 'core.js')));
writeFileSync(join(tmp, 'mocks.mjs'), `export class AwsClient { constructor(o){ this.o = o; } fetch(url, init){ return globalThis.__r2(url, init, this.o); } }
export const createClient = (url, key, opts) => globalThis.__db(url, key, opts);`);
const code = readFileSync(join(SRC, 'index.ts'), 'utf8')
  .replace("from 'npm:aws4fetch@1.0.20'", "from './mocks.mjs'")
  .replace("from 'npm:@supabase/supabase-js@2'", "from './mocks.mjs'");
if(!code.includes("./mocks.mjs'") || code.split("./mocks.mjs'").length !== 3) { console.error('⛔ imports changed — update the harness'); process.exit(2); }
writeFileSync(join(tmp, 'index.mts'), code);

let bad = 0, n = 0;
const ok = (name, cond, extra = '') => { n++; if(!cond) bad++; console.log(cond ? '✅' : '❌', name, cond ? '' : extra); };
const show = v => JSON.stringify(v);

/* ── البيئة ── */
const { privateKey } = generateKeyPairSync('rsa', { modulusLength: 2048, privateKeyEncoding: { type: 'pkcs8', format: 'pem' },
                                                    publicKeyEncoding: { type: 'spki', format: 'pem' } });
const SA = JSON.stringify({ client_email: 'tts@proj.iam.gserviceaccount.com', private_key: privateKey, project_id: 'proj' });
const BASE_ENV = { SUPABASE_URL: 'https://x.supabase.co', SUPABASE_ANON_KEY: 'anon', GOOGLE_SA_JSON: SA,
                   R2_ACCOUNT_ID: 'acc', R2_ACCESS_KEY_ID: 'kid', R2_SECRET_ACCESS_KEY: 'secret' };
let ENV = { ...BASE_ENV };
let handler;
globalThis.Deno = { serve: h => { handler = h; }, env: { get: k => ENV[k] } };
globalThis.setTimeout = f => { f(); return 0; };                 // الانتظارُ بين الإعادات لا يُنتظر في القياس

/* MP3 مصنوع: مئةُ إطارٍ MPEG-2 ⇒ ٢٤٠٠ م.ث */
const mp3 = (() => { const out = new Uint8Array(9600); for(let k = 0; k < 100; k++) out.set([0xFF, 0xF3, 0x44, 0xC4], k * 96); return out; })();
const MP3_B64 = Buffer.from(mp3).toString('base64');
const json = (body, status = 200, headers = {}) => new Response(JSON.stringify(body), { status, headers: { 'content-type': 'application/json', ...headers } });

/* المصحفُ من عيّنة القياس بحرفها، وتلاوةٌ مصنوعة: ألفا إطارٍ MPEG-2 كلٌّ ٢٤ مللي ⇒ ٤٨ ثانية — تسع أطول آيات العيّنة */
const FX = JSON.parse(readFileSync(join(ROOT, 'tools/fixtures/quran_quotes.json'), 'utf8'));
const MEDIA = 'https://media.bayanclass.com/';
const ayahMp3 = (() => { const out = new Uint8Array(2000 * 96); for(let k = 0; k < 2000; k++) out.set([0xFF, 0xF3, 0x44, 0xC4], k * 96); return out; })();
const FX_WORDS = (key, f, t) => { const w = FX.tanzil.find(l => l.startsWith(key.replace(':', '|') + '|')).split('|')[2].split(' ');
  return (f === undefined ? w : w.slice(f, t + 1)).join(' '); };

let log, plan;
function reset(p = {}){
  log = { google: [], r2: [], db: [], dbAuth: [], media: [] };
  plan = { problem: null, denied: null, change: new Set(), tts429: 0, save: null, noData: false, ...p };
}
globalThis.fetch = async (url, init) => {
  url = String(url);
  if(url.startsWith(MEDIA)){
    const path = url.slice(MEDIA.length);
    log.media.push(path);
    if(plan.noData && path.startsWith('quran/tanzil/')) return new Response('missing', { status: 404 });
    if(path === 'quran/tanzil/quran-uthmani.txt') return new Response(FX.tanzil.join('\n'), { status: 200 });
    if(path === 'quran/align/Husary_64kbps.json') return json(FX.timing);
    if(/^quran\/husary\/\d{6}\.mp3$/.test(path)) return new Response(ayahMp3, { status: 200 });
    return new Response('nope', { status: 404 });
  }
  const body = init?.body ? (typeof init.body === 'string' ? init.body : '') : '';
  log.google.push({ url, body });
  if(url.startsWith('https://oauth2.googleapis.com/token')) return json({ access_token: 'tok', expires_in: 3600 });
  if(url.includes('aiplatform.googleapis.com')){
    const payload = JSON.parse(JSON.parse(body).contents[0].parts[0].text.split('\n\n').pop());
    const list = payload.sentences.map(s => plan.change.has(s.text) ? s.text + ' زيادة' : s.text);
    return json({ candidates: [{ content: { parts: [{ text: JSON.stringify(list) }] }, finishReason: 'STOP' }] });
  }
  if(url.includes('texttospeech.googleapis.com')){
    if(plan.tts429 > 0){ plan.tts429--; return json({ error: { status: 'RESOURCE_EXHAUSTED', message: 'quota' } }, 429); }
    return json({ audioContent: MP3_B64 });
  }
  return json({ error: { message: 'unexpected ' + url } }, 404);
};
globalThis.__r2 = async (url, init, creds) => { log.r2.push({ url: String(url), init, creds }); return new Response(null, { status: 200 }); };
globalThis.__db = (url, key, opts) => ({
  rpc: async (fn, args) => {
    log.db.push({ fn, args }); log.dbAuth.push(opts?.global?.headers?.Authorization);
    if(fn === 'voice_problem') return plan.denied ? { data: null, error: plan.denied } : { data: plan.problem, error: null };
    if(fn === 'save_voice') return { data: plan.save ?? { ok: true, sha: 'x' }, error: null };
    return { data: null, error: { message: 'unexpected rpc ' + fn } };
  }
});

await import(pathToFileURL(join(tmp, 'index.mts')));
const T = await import(pathToFileURL(join(tmp, 'core.js')));
const call = (body, { method = 'POST', origin = 'https://bayanclass.com', raw } = {}) =>
  handler(new Request('https://fn/tts', { method, headers: { Origin: origin, Authorization: 'Bearer user-jwt', 'content-type': 'application/json' },
                                         body: method === 'POST' ? (raw ?? JSON.stringify(body)) : undefined }));
const ttsCalls = () => log.google.filter(c => c.url.includes('texttospeech')).map(c => JSON.parse(c.body));

/* ① الغلاف: CORS · الطريقة · الجسم · الشكل */
{
  reset();
  const pre = await call(null, { method: 'OPTIONS', origin: 'https://bayan-edu.github.io' });
  ok('OPTIONS ⇒ 204 بأصل الواجهة', pre.status === 204 && pre.headers.get('Access-Control-Allow-Origin') === 'https://bayan-edu.github.io', '');
  const stranger = await call(null, { method: 'OPTIONS', origin: 'https://evil.example' });
  ok('وأصلٌ غريب ⇒ الأصلُ الرسميّ لا أصلُه', stranger.headers.get('Access-Control-Allow-Origin') === 'https://bayanclass.com', '');
  ok('GET ⇒ 405', (await call(null, { method: 'GET' })).status === 405, '');
  const raw = await call(null, { raw: '{not json' });
  ok('جسمٌ ليس JSON ⇒ 400', raw.status === 400 && (await raw.json()).error === 'جسمُ الطلب ليس JSON', '');
  const empty = await call({ item: 603, sentences: [] });
  ok('شكلٌ مردود ⇒ 400 بسببه، ولا يُسأل الحارسُ ولا Google', empty.status === 400 && (await empty.json()).error === 'لا جمل في الطلب'
     && log.db.length === 0 && log.google.length === 0, show(log));
}

/* ② الحارسُ قبل الكلفة */
{
  reset({ problem: 'لا صلاحية لك على هذه المادة' });
  const r = await call({ item: 603, sentences: [{ text: 'وكان عنترة يسمع قولها.' }] });
  ok('حارسٌ يردّ ⇒ 403 برسالته، ولا نداءَ لـGoogle ولا R2', r.status === 403 && (await r.json()).error === 'لا صلاحية لك على هذه المادة'
     && log.google.length === 0 && log.r2.length === 0, show(log.google));
  ok('والحارسُ سُئل بهويّة المستدعي وبالنصّ بعينه', log.db[0]?.fn === 'voice_problem' && log.db[0]?.args?.p_item === 603 && log.dbAuth[0] === 'Bearer user-jwt', show(log.db));
  reset({ denied: { code: '42501', message: 'permission denied' } });
  const d = await call({ item: 603, sentences: [{ text: 'جملة.' }] });
  const dj = await d.json();
  ok('وتعذّرُ سؤاله (الزائرُ بلا منح) ⇒ 403 بلا كلفة', d.status === 403 && dj.error === 'تعذّر التحقّق من الصلاحية' && dj.code === '42501' && log.google.length === 0, show(dj));
}

/* ③ الأسرارُ صاخبة — للمأذون وحده */
{
  reset(); ENV = { ...BASE_ENV, GOOGLE_SA_JSON: undefined };
  const r = await call({ item: 603, sentences: [{ text: 'جملة.' }] });
  ok('بلا مفتاح Google ⇒ 500 باسمه', r.status === 500 && /GOOGLE_SA_JSON/.test((await r.json()).error), '');
  reset(); ENV = { ...BASE_ENV, R2_SECRET_ACCESS_KEY: undefined };
  const r2 = await call({ item: 603, sentences: [{ text: 'جملة.' }] });
  ok('وبلا أسرار R2 ⇒ 500 باسمها', r2.status === 500 && /R2/.test((await r2.json()).error), '');
  reset(); ENV = { ...BASE_ENV, GOOGLE_SA_JSON: undefined };
  const h = await call({ item: 593, sentences: [{ text: 'قال تعالى ﴿وَالْعَصْرِ﴾ في سورته.' }] });
  const hj = await h.json();
  ok('ودفعةٌ كلُّها ممسَكة لا تحتاج سرّاً ولا Google', h.status === 200 && hj.results[0].state === 'held' && hj.results[0].reason === T.QUOTE_HELD
     && log.google.length === 0, show(hj));
  ENV = { ...BASE_ENV };
}

/* ④ الدفعةُ كاملة: عنوانٌ ونثرٌ وحوارٌ وممسَكةٌ ومكرَّرة */
{
  reset();
  const S = { title: 'القصة: الفصل الثالث', prose: 'فقال عنترة فى شبه صيحة:', line: '- لست أحتمل أن أعيش', quote: 'قال تعالى ﴿وَالْعَصْرِ﴾ في سورته.' };
  const r = await call({ item: 603, context: 'قبلها.', sentences: [
    { text: S.title, kind: 'cover' }, { text: S.prose }, { text: S.line }, { text: S.quote }, { text: S.prose } ] });
  const j = await r.json();
  const st = j.results?.map(x => x.state).join(' ');
  ok('٢٠٠ والحالاتُ بترتيب الجمل: ok ok ok held ok', r.status === 200 && st === 'ok ok ok held ok', show(j));
  const tash = log.google.filter(c => c.url.includes('aiplatform'));
  const sent = tash[0] && JSON.parse(JSON.parse(tash[0].body).contents[0].parts[0].text.split('\n\n').pop());
  ok('تشكيلٌ واحدٌ للثلاث، بالسياق، ولا يُرسل الممسَكُ ولا المكرَّر', tash.length === 1 && sent.sentences.length === 3 && sent.context === 'قبلها.'
     && tash[0].url.includes('/projects/proj/'), show(sent));
  const tts = ttsCalls();
  const byText = t => tts.find(x => x.input.text === t);
  const titleReq = tts.find(x => x.input.text.startsWith('القصهْ') || x.input.text.includes('القصة') || x.input.text.includes('القصه'));
  ok('ثلاثةُ أصواتٍ لا خمسة (الممسَكُ لا يُولَّد، والمكرَّرُ يأخذ نتيجةَ أخته)', tts.length === 3, show(tts.map(x => x.input.text)));
  const line = tts.find(x => x.voice.name === 'Algenib');
  ok('الحوارُ بـAlgenib على Gemini بتوجيه الكلام المباشر', line && line.input.prompt === T.TTS.dialogue && line.voice.model_name === 'gemini-2.5-flash-tts', show(line));
  const narr = tts.filter(x => x.voice.name === 'ar-XA-Chirp3-HD-Iapetus');
  ok('والعنوانُ والنثرُ بـIapetus على Chirp بلا توجيه (المقترح)', narr.length === 2 && narr.every(x => x.voice.languageCode === 'ar-XA' && x.input.prompt === undefined), show(narr));
  ok('والمنطوقُ موقوفٌ عليه والتاءُ هاءٌ («صيحهْ:»)', tts.some(x => x.input.text === 'فقال عنترة في شبه صيحهْ:' || x.input.text.endsWith('صيحهْ:')), show(tts.map(x => x.input.text)));
  ok('والعنوانُ بوقفه («القصهْ:»)', !!titleReq && titleReq.input.text.includes('القصهْ:'), show(titleReq));

  ok('ستّةُ ملفّاتٍ إلى R2 — صوتٌ ومنطوقٌ لكلّ جملةٍ وُلّدت', log.r2.length === 6, show(log.r2.map(x => x.url)));
  const audio = log.r2.filter(x => x.url.endsWith('.mp3')), text = log.r2.filter(x => x.url.endsWith('.txt'));
  const KEY = /^https:\/\/acc\.r2\.cloudflarestorage\.com\/bayan-media\/voice\/603\/[0-9a-f]{16}\.[a-z0-9]{1,16}\.(mp3|txt)$/;
  ok('في مجلّد النصّ باسم البصمة والإصدار، وبمخزن bayan-media افتراضاً', log.r2.every(x => KEY.test(x.url)), show(log.r2.map(x => x.url)));
  ok('PUT · لا يُطمَس قائم · يُخزَّن أبداً · ونوعُه', log.r2.every(x => x.init.method === 'PUT' && x.init.headers['If-None-Match'] === '*'
     && x.init.headers['Cache-Control'] === 'public, max-age=31536000, immutable')
     && audio.every(x => x.init.headers['Content-Type'] === 'audio/mpeg') && text.every(x => x.init.headers['Content-Type'] === 'text/plain; charset=utf-8'), '');
  ok('وبمفتاح R2 لا بغيره', log.r2.every(x => x.creds.accessKeyId === 'kid' && x.creds.secretAccessKey === 'secret' && x.creds.region === 'auto'), '');
  const spokenFiles = text.map(x => new TextDecoder().decode(x.init.body));
  ok('وملفُّ المنطوق هو ما أُرسل إلى الصوت بعينه', spokenFiles.every(s => tts.some(x => x.input.text === s)), show(spokenFiles));

  const saves = log.db.filter(x => x.fn === 'save_voice');
  ok('ثلاثةُ صفوفٍ بـsave_voice بهويّة المستدعي', saves.length === 3 && log.dbAuth.every(a => a === 'Bearer user-jwt'), show(saves));
  const proseSha = await T.sentenceSha(S.prose);
  const proseSave = saves.find(x => x.args.p_sentence === S.prose);
  ok('والصفُّ: الجملةُ كما يراها الطالب · مفتاحُ صوتها ببصمتها · مدّتُه · واسمُ الصوت ومصدرُ التشكيل', proseSave
     && new RegExp(`^r2:voice/603/${proseSha}\\.[a-z0-9]{1,16}\\.mp3$`).test(proseSave.args.p_audio) && proseSave.args.p_ms === 2400
     && proseSave.args.p_voice === `${T.VOICES.iapetus.label} · تشكيل ${T.TASHKEEL_MODEL}`, show(proseSave));
  const p = j.results[1], twin = j.results[4];
  ok('والنتيجة: المفتاحان والمنطوقُ والمدّةُ والصوتُ والمصدر', p.sha === proseSha && p.audio === proseSave.args.p_audio && p.spoken === p.audio.slice(0, -4) + '.txt'
     && p.text.endsWith('صيحهْ:') && p.ms === 2400 && p.voice === 'iapetus' && p.source === T.TASHKEEL_MODEL, show(p));
  ok('والمكرَّرةُ بنتيجة أختها', twin.state === 'ok' && twin.audio === p.audio && twin.sha === p.sha, show(twin));
  ok('والممسَكةُ بسببها', j.results[3].reason === T.QUOTE_HELD && j.results[3].sha === await T.sentenceSha(S.quote), show(j.results[3]));
}

/* ⑤ ما اختاره المؤلّف · تشكيلُ المؤلّف والمعلّم · حرفٌ تغيّر · حصّةٌ ردّت · حفظٌ ردّ */
{
  reset();
  const author = 'كَانَ العَرَبُ يَعِيشُونَ فِي الجَاهِلِيَّةِ قَبَائِلَ مُتَنَابِذَةً.';
  const r = await call({ item: 593, sentences: [{ text: author, voice: 'charon' }, { text: 'جملة.', spoken: 'جُمْلَةٌ.' }] });
  const j = await r.json(), tts = ttsCalls();
  ok('صوتٌ اختاره المؤلّف (Charon) يغلب المقترح، بتوجيه القراءة', tts.some(x => x.voice.name === 'Charon' && x.input.prompt === T.TTS.prompt
     && x.input.text.endsWith('مُتَنَابِذَهْ.')), show(tts));
  ok('والمشكولُ والمصحَّحُ لا يُرسلان إلى التشكيل', log.google.every(c => !c.url.includes('aiplatform')) && j.results.every(x => x.state === 'ok')
     && j.results[0].source === 'المؤلّف' && j.results[1].source === 'المعلّم' && j.results[1].text === 'جُمْلَةٌ.', show(j));
  ok('وما صحّحه المعلّمُ يبلغ الصوتَ بحرفه، بلا وقفٍ آليّ', tts.some(x => x.input.text === 'جُمْلَةٌ.')
     && log.r2.some(x => x.url.endsWith('.txt') && new TextDecoder().decode(x.init.body) === 'جُمْلَةٌ.'), show(tts.map(x => x.input.text)));

  reset({ change: new Set(['وكان عنترة يسمع.']) });
  const c = await (await call({ item: 603, sentences: [{ text: 'وكان عنترة يسمع.' }, { text: 'ويزأر زئيرا.' }] })).json();
  ok('تشكيلٌ غيّر حروفَ جملةٍ مرّتين ⇒ خطأٌ لها وحدها، وأختُها تمضي', c.results[0].state === 'error' && /غيّر التشكيلُ حروفَ الجملة/.test(c.results[0].error)
     && c.results[1].state === 'ok' && log.google.filter(x => x.url.includes('aiplatform')).length === 2 && ttsCalls().length === 1, show(c));

  reset({ tts429: 1 });
  const q = await (await call({ item: 603, sentences: [{ text: '- لست أحتمل' }] })).json();
  ok('429 ثمّ صوت ⇒ أُعيد فتمّ', q.results[0].state === 'ok' && ttsCalls().length === 2, show(q));

  reset({ save: { ok: false, error: 'مدة الصوت غير صالحة' } });
  const s = await (await call({ item: 603, sentences: [{ text: 'جملة.' }] })).json();
  ok('وحفظٌ ردّته القاعدة ⇒ خطأٌ برسالتها', s.results[0].state === 'error' && s.results[0].error === 'مدة الصوت غير صالحة', show(s));
}

/* ⑥ الآيةُ المقتبسة (b207): بلا Google ولا سرّه · بياناتُ المصحف صاخبةٌ إن غابت · حكمُ المالك في الوصل · وما ليس آيةً نثرٌ · وما بينهما يُمسَك
   (وفهرسُ المصحف يبقى ما بقيت الدالّةُ دافئة ⇒ الغيابُ يُقاس أوّلاً) */
{
  const Q1 = '﴿كُنتُمْ خَيْرَ أُمَّةٍ أُخْرِجَتْ لِلنَّاسِ﴾', Q2 = '﴿لِّلرِّجَالِ نَصِيبٌ مِّمَّا اكْتَسَبُوا ۖ وَلِلنِّسَاءِ نَصِيبٌ مِّمَّا اكْتَسَبْنَ﴾';
  reset({ noData: true });
  const miss = await (await call({ item: 593, sentences: [{ text: Q1 }] })).json();
  ok('بياناتُ المصحف غائبةٌ عن المخزن ⇒ خطأٌ باسمها، ولا Google ولا R2', miss.results[0].state === 'error'
     && /^بيانات المصحف لم تُقرأ من المخزن \(404 · quran\/tanzil\/quran-uthmani\.txt\)$/.test(miss.results[0].error)
     && log.google.length === 0 && log.r2.length === 0, show(miss));

  reset(); ENV = { ...BASE_ENV, GOOGLE_SA_JSON: undefined };
  const r = await call({ item: 593, sentences: [{ text: Q1 }, { text: Q2 }, { text: Q1 }] });
  const j = await r.json();
  ok('آيتان مقتبستان بلا مفتاح Google ولا نداءٍ له ⇒ ٢٠٠ والثلاثُ ok', r.status === 200 && j.results?.every(x => x.state === 'ok')
     && log.google.length === 0, show(j));
  const [a, b, twin] = j.results;
  ok('آل عمران ١١٠ تنتهي وصلاً ⇒ الآيةُ كاملة (حكمُ المالك)', a.voice === 'husary' && a.source === 'المصحف'
     && show(a.ref) === show([{ s: 3, a: 110, from: 0, to: 22, whole: true, widened: true }]), show(a));
  ok('والنساء ٣٢ يقف الحصري قبلها وبعدها ⇒ كلماتُها وحدها', show(b.ref) === show([{ s: 4, a: 32, from: 9, to: 16, whole: false, widened: false }]), show(b));
  ok('والمكرَّرةُ بنتيجة أختها', twin.audio === a.audio && twin.sha === a.sha, show(twin));
  ok('والملفّاتُ من المخزن بعنوانه العامّ: النصُّ والتوقيتُ مرّةً، وتلاوتا الآيتين', log.media.filter(p => p === 'quran/tanzil/quran-uthmani.txt').length === 1
     && log.media.filter(p => p === 'quran/align/Husary_64kbps.json').length === 1
     && log.media.includes('quran/husary/003110.mp3') && log.media.includes('quran/husary/004032.mp3'), show(log.media));
  const saves = log.db.filter(x => x.fn === 'save_voice');
  const s1 = saves.find(x => x.args.p_sentence === Q1), s2 = saves.find(x => x.args.p_sentence === Q2);
  ok('والصفُّ: الجزءُ بقوسيه · واسمُ الصوت مرجعُه', saves.length === 2 && s1?.args.p_voice === 'الحصري · Husary_64kbps · 3:110 · كاملة للوصل'
     && s2?.args.p_voice === 'الحصري · Husary_64kbps · 4:32 · 10-17', show(saves));
  ok('والمقصوصُ بطول ما بين حدّيه بالإطارات (١٣٢٩٦ مللي)، ومدّةُ الصفّ مدّتُه', b.ms === 13296 && s2?.args.p_ms === 13296, show([b.ms, s2?.args.p_ms]));
  const spoken = log.r2.filter(x => x.url.endsWith('.txt')).map(x => new TextDecoder().decode(x.init.body));
  ok('وملفُّ المنطوق ما تُلي بحرفه من المصحف', spoken.includes(FX_WORDS('3:110')) && spoken.includes(FX_WORDS('4:32', 9, 16)), show(spoken));
  ok('وفي مجلّد النصّ باسم بصمة الجزء', log.r2.every(x => /\/voice\/593\/[0-9a-f]{16}\.[a-z0-9]{1,16}\.(mp3|txt)$/.test(x.url)) && log.r2.length === 4, '');
  ENV = { ...BASE_ENV };

  reset();
  const p = await (await call({ item: 593, sentences: [{ text: '﴿قال الشاعر في وصف الليل﴾' }] })).json();
  const tash = log.google.filter(c => c.url.includes('aiplatform'));
  const sent = tash[0] && JSON.parse(JSON.parse(tash[0].body).contents[0].parts[0].text.split('\n\n').pop());
  const tts = ttsCalls();
  ok('وما ليس آيةً يُقرأ نثراً بلا قوسيه، ويُحفظ باسم جزئه', p.results[0].state === 'ok' && p.results[0].voice === 'iapetus'
     && sent?.sentences[0].text === 'قال الشاعر في وصف الليل' && tts.length === 1 && !tts[0].input.text.includes('﴿')
     && log.db.find(x => x.fn === 'save_voice')?.args.p_sentence === '﴿قال الشاعر في وصف الليل﴾', show(p));

  reset();
  const u = await (await call({ item: 593, sentences: [{ text: '﴿كنتم خير امة خرجت للناس جميعا﴾' }] })).json();
  ok('وما يشبه آيةً ولا يطابقها يُمسَك بسببه وأقربِ آيةٍ له، بلا كلفة', u.results[0].state === 'held'
     && /^تشبه آية ولا تطابقها \(أقربها 3:110 بتطابق 86٪\)/.test(u.results[0].reason) && log.google.length === 0 && log.r2.length === 0, show(u));

  reset();
  const mix = await (await call({ item: 593, sentences: [{ text: 'يَقُولُ جَلَّ ذِكْرُهُ:' }, { text: Q1 }] })).json();
  ok('ونثرٌ وآيةٌ في دفعة: النثرُ وحده إلى Google، والآيةُ من المصحف', mix.results.every(x => x.state === 'ok') && ttsCalls().length === 1
     && mix.results[0].voice === 'iapetus' && mix.results[1].voice === 'husary', show(mix));
}

console.log(`\n${n - bad}/${n}${bad ? ' — فشل' : ''}`);
process.exit(bad ? 1 : 0);
