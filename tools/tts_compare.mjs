/* ══════════════════════════════════════════════════════════
   بيان — tools/tts_compare.mjs · أصواتُ Google بالأذن قبل الاعتماد (أداةٌ لا تُنشر)

   قرارُ المالك (٢٧ أكتوبر): الصوتُ المولَّد لغير الآيات من Google Cloud. والصوتُ يُختار بالأذن لا
   بالسعر — صحّةُ النطق والإعراب هي الحكم (⑥-ج في STATE · حكمُ `101`). فالأداةُ تولّد المقاطعَ نفسَها
   بأصواتٍ عدّة، وتجمعها في صفحةٍ واحدةٍ تُسمع فيها جنباً إلى جنب.

   🔑 المفتاحُ لا يسكن الأداةَ ولا المستودع: يُقرأ من `GOOGLE_TTS_KEY`، وأيسرُه سطرٌ في `.env.local`
      (يتجاهله `.gitignore`) ثمّ:
         node --env-file=.env.local tools/tts_compare.mjs
      ويُرسَل في ترويسة `x-goog-api-key` لا في الرابط، فلا يبقى في سجلٍّ يحفظ الروابط.
   🔑 والنصوصُ لا تسكنها كذلك: `.tts-compare/samples.json` (يتجاهله `.gitignore`) — مقاطعُ من نصوص
      المنصّة لا تُرفع إلى مستودعٍ عامّ. والناتجُ في المجلّد نفسِه: مقطعٌ لكلّ نصٍّ وصوت، و`index.html`
      قائمةٌ بنفسها (الصوتُ فيها base64) تُفتح بلا خادم.
   📐 `--dry` يطبع ما سيُطلب (الأصواتُ × المقاطع وحروفُها) ولا ينادي شيئاً ولا يطلب مفتاحاً.
      `--voices=chirp-m,gem-eg` يقصر التوليدَ على أصواتٍ بعينها.
      `--cached` يعيد استعمالَ المقطع المحفوظ في المجلّد بدل طلبه ثانيةً — فتُعاد الصفحةُ بلا كلفة. ولا يُفترض:
      مقاطعُ غُيّر نصُّها تُطلب بلا `--cached`، وإلّا سُمع صوتٌ قديمٌ تحت نصٍّ جديد.
   🔴 Gemini-TTS لا يكفيه مفتاحُ API — قِيس ٢٧ أكتوبر: `403 PERMISSION_DENIED` على `aiplatform.endpoints.predict`.
      يمرّ عبر Vertex AI ويطلب هويّةً لها الدورُ `roles/aiplatform.user` (توثيقُ Gemini-TTS)، والمفتاحُ المجرّد لا هويّةَ له.
      ⇒ **حسابُ خدمة:** `GOOGLE_SA_FILE` مسارُ ملفّه (JSON) — خارج المستودع، والأداةُ تقرؤه ولا تطبعه — فتوقّع به
      الأداةُ طلبَ رمزِ دخولٍ لساعة (JWT · RS256 من `node:crypto` بلا مكتبة)، وبه تنادي أصواتَ Gemini. والطريقُ نفسُه
      ما ستسلكه الدالّةُ الطرفيّة إن اختير Gemini. وChirp 3 HD وWaveNet يكفيهما المفتاح.
   ══════════════════════════════════════════════════════════ */
import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
/* الطلبُ ورمزُ حساب الخدمة في `google.mjs` — وحدةٌ تشترك فيها أداتا الصوت والتشكيل، وفيها علّةُ `https.request` */
import { post, parse, okStatus, saToken } from './google.mjs';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const OUT = join(ROOT, '.tts-compare');
const ENDPOINT = 'https://texttospeech.googleapis.com/v1/text:synthesize';
const DRY = process.argv.includes('--dry');
const CACHED = process.argv.includes('--cached');

/* الأصواتُ المرشَّحة — من قائمة Google الحيّة للعربيّة (قِيست ٢٧ أكتوبر): Chirp 3 HD وWaveNet بـ`ar-XA`،
   وGemini-TTS بـ`ar-EG` (متاحة) و`ar-001` (تجريبيّة). **صوتٌ ذكرٌ واحدٌ في كلّ نوع** (Charon · WaveNet-B)
   فيُقارَن النوعُ بالنوع لا الحنجرةُ بالحنجرة، وأنثى من Chirp وحده لأنّه الأحدث.
   و`prompt` لـGemini وحده: يقبل توجيهاً بالكلام، وهو ما قد يضبط الإعرابَ حيث لا تضبطه الأصواتُ الأخرى. */
const PROMPT = 'اقرأ النصّ التالي بالعربية الفصحى، بنطقٍ واضح وإيقاعٍ هادئٍ متأنٍّ يناسب طلاب المدارس، مع ضبط أواخر الكلمات ضبطاً صحيحاً.';
const VOICES = [
  { id: 'chirp-m', label: 'Chirp 3 HD · Charon (ذكر)', voice: { languageCode: 'ar-XA', name: 'ar-XA-Chirp3-HD-Charon' } },
  { id: 'chirp-f', label: 'Chirp 3 HD · Kore (أنثى)',  voice: { languageCode: 'ar-XA', name: 'ar-XA-Chirp3-HD-Kore' } },
  { id: 'gem-eg',  label: 'Gemini 2.5 Flash · ar-EG · Charon',  prompt: true, iam: true,
    voice: { languageCode: 'ar-EG', name: 'Charon', model_name: 'gemini-2.5-flash-tts' } },
  { id: 'gem-001', label: 'Gemini 2.5 Flash · ar-001 · Charon', prompt: true, iam: true,
    voice: { languageCode: 'ar-001', name: 'Charon', model_name: 'gemini-2.5-flash-tts' } },
  { id: 'gem-pro', label: 'Gemini 2.5 Pro · ar-EG · Charon',    prompt: true, iam: true,
    voice: { languageCode: 'ar-EG', name: 'Charon', model_name: 'gemini-2.5-pro-tts' } },
  { id: 'wavenet', label: 'WaveNet · B (ذكر)', voice: { languageCode: 'ar-XA', name: 'ar-XA-Wavenet-B' } },
];

/* ── المقاطع ──
   البيتُ يُقرأ كما يقسمه الكتاب (b193): رقمُ المؤلّف «(١)» يسقط، والبيتُ جملةٌ واحدة بشطريه — وبينهما «،»
   وقفةٌ قصيرة بدل «۞» الذي لا يُنطق. والمشكولُ يُضاف بلا تشكيلٍ نُزع آليّاً، فلا يدخله خطأُ يد: أيحتاج
   المعلّمُ أن يشكّل النصَّ ليصحّ النطق؟ */
const HARAKAT = /[ً-ْٰ]/g;
const HEMI    = /[  ]+۞[  ]+/g;
const OWN_NUM = /^\s*[(（]\s*[0-9٠-٩]+\s*[)）]\s*/gm;

function expand(samples){
  const out = [];
  for(const s of samples){
    let text = String(s.text || '').trim();
    if(s.verse) text = text.replace(OWN_NUM, '').replace(HEMI, '، ')
                           .split(/\n+/).map(l => l.trim()).filter(Boolean).join(' ');
    out.push({ id: s.id, label: s.label, text });
    if(s.bare) out.push({ id: s.id + '-bare', label: s.label + ' — بلا تشكيل (نُزع آليّاً)',
                          text: text.replace(HARAKAT, '') });
  }
  return out;
}

/* المفتاحُ لما يكفيه، والرمزُ لما لا يكفيه غيرُه (Gemini) — أو لكلّ صوتٍ إن غاب المفتاح */
async function synth(auth, v, text){
  const body = { input: v.prompt ? { prompt: PROMPT, text } : { text },
                 voice: v.voice, audioConfig: { audioEncoding: 'MP3' } };
  const cred = (v.iam || !auth.key) ? { authorization: `Bearer ${auth.token}` } : { 'x-goog-api-key': auth.key };
  const res = await post(ENDPOINT, { 'content-type': 'application/json', ...cred }, JSON.stringify(body));
  const j = parse(res.text);
  if(!okStatus(res.status) || !j.audioContent)
    throw new Error(`${res.status} ${j.error?.status || ''} ${j.error?.message || res.text.slice(0, 200)}`.replace(/\s+/g, ' ').trim());
  return Buffer.from(j.audioContent, 'base64');
}

const esc = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/"/g, '&quot;');
/* خطأُ Google يحمل رابطَ «Troubleshooter» برقم المشروع — الطرفيّةُ تراه كاملاً، والصفحةُ سببَه وحده */
const short = m => String(m).replace(/https?:\/\/\S+/g, '').replace(/Remediate access with this Troubleshooter URL[^.]*\.?/i, '')
                            .replace(/\s+/g, ' ').trim().slice(0, 220);

function page(samples, voices, clips){
  const cell = (s, v) => {
    const c = clips.get(`${s.id}|${v.id}`);
    const body = !c ? '<p class="na">لم يُطلب</p>'
      : c.error ? `<p class="err">${esc(short(c.error))}</p>`
      : `<audio controls preload="none" src="data:audio/mpeg;base64,${c.audio.toString('base64')}"></audio>`;
    return `<div class="v"><b>${esc(v.label)}</b>${body}</div>`;
  };
  return `<!doctype html>
<html lang="ar" dir="rtl"><head><meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>مقارنة الأصوات</title>
<style>
  :root { --bg:#f7f6f2; --card:#fff; --ink:#1f2328; --mute:#5f6368; --line:#e3e1da; --err:#b3261e; }
  @media (prefers-color-scheme: dark) { :root { --bg:#16181c; --card:#1f2228; --ink:#e8e6e1; --mute:#a3a7ad; --line:#30343b; --err:#f2b8b5; } }
  body { margin:0; padding:24px 16px 48px; background:var(--bg); color:var(--ink);
         font: 16px/1.7 "Segoe UI", Tahoma, sans-serif; }
  main { max-width:1100px; margin:0 auto; }
  h1 { font-size:1.4rem; margin:0 0 4px; } .lead { color:var(--mute); margin:0 0 24px; }
  section { background:var(--card); border:1px solid var(--line); border-radius:16px; padding:20px; margin:0 0 20px; }
  h2 { font-size:1.05rem; margin:0 0 10px; }
  .t { font-size:1.2rem; line-height:2.1; margin:0 0 16px; }
  .grid { display:grid; grid-template-columns:repeat(auto-fill, minmax(250px, 1fr)); gap:12px; }
  .v { border:1px solid var(--line); border-radius:12px; padding:10px 12px; }
  .v b { display:block; font-size:.88rem; margin-bottom:6px; direction:ltr; text-align:right; }
  audio { width:100%; } .err { color:var(--err); font-size:.85rem; direction:ltr; text-align:left; margin:0; overflow-wrap:anywhere; }
  .na { color:var(--mute); margin:0; }
</style></head><body><main>
<h1>مقارنة الأصوات</h1>
<p class="lead">المقطعُ نفسُه بكلّ صوت. ويُسمع لكلّ صوتٍ: الإعرابُ وأواخرُ الكلمات · «ى» مكان «ي» في القصّة ·
الوقفةُ بين الشطرين · والمشكولُ مقابلَ ما نُزع تشكيلُه.</p>
${samples.map(s => `<section><h2>${esc(s.label)}</h2><p class="t">${esc(s.text)}</p>
<div class="grid">${voices.map(v => cell(s, v)).join('')}</div></section>`).join('\n')}
</main></body></html>
`;
}

/* ═══════════ التشغيل ═══════════ */

const want = (process.argv.find(a => a.startsWith('--voices=')) || '').slice('--voices='.length).split(',').filter(Boolean);
const voices = want.length ? VOICES.filter(v => want.includes(v.id)) : VOICES;
if(want.length !== 0 && voices.length !== want.length){
  console.error(`⛔ unknown voice id — valid: ${VOICES.map(v => v.id).join(', ')}`);
  process.exit(2);
}

const file = join(OUT, 'samples.json');
if(!existsSync(file)){ console.error(`⛔ no samples: ${file}`); process.exit(2); }
const samples = expand(JSON.parse(readFileSync(file, 'utf8')).samples || []);
if(!samples.length){ console.error(`⛔ samples.json has no samples`); process.exit(2); }

const chars = samples.reduce((n, s) => n + [...s.text].length, 0);
console.log(`samples: ${samples.length} (${samples.map(s => `${s.id}=${[...s.text].length}`).join(' · ')}) · ${chars} chars per voice`);
console.log(`voices:  ${voices.map(v => v.id).join(' · ')} ⇒ ${samples.length * voices.length} requests, ${chars * voices.length} chars`);

if(DRY){
  for(const s of samples) console.log(`\n[${s.id}] ${s.text}`);
  console.log('\n--dry: nothing sent.');
  process.exit(0);
}

const auth = { key: process.env.GOOGLE_TTS_KEY || '', token: null };
const saFile = process.env.GOOGLE_SA_FILE || '';
if(saFile){
  try{
    const t = await saToken(saFile);
    auth.token = t.token;
    console.log(`service account: ${t.email} · token ok`);
  }catch(e){
    console.error(`⛔ GOOGLE_SA_FILE: ${e.message}`);
    process.exit(2);
  }
}
if(!auth.key && !auth.token){
  console.error('⛔ GOOGLE_TTS_KEY is missing — put it in .env.local, then: node --env-file=.env.local tools/tts_compare.mjs');
  process.exit(2);
}
/* أصواتُ Gemini بلا رمز تُعلَّم ولا تُطلب — فلا تُملأ الطرفيّةُ بـ403 يُعرف سببُه */
const NO_IAM = 'needs a service account (GOOGLE_SA_FILE) — an API key alone is refused for Gemini (403)';

mkdirSync(OUT, { recursive: true });
const clips = new Map();
let ok = 0;
for(const v of voices){
  for(const s of samples){
    const t0 = Date.now();
    const mp3 = join(OUT, `${s.id}__${v.id}.mp3`);
    try{
      const cached = CACHED && existsSync(mp3);
      if(!cached && v.iam && !auth.token) throw new Error(NO_IAM);
      const audio = cached ? readFileSync(mp3) : await synth(auth, v, s.text);
      if(!cached) writeFileSync(mp3, audio);
      clips.set(`${s.id}|${v.id}`, { audio });
      ok++;
      console.log(`✔ ${v.id} · ${s.id} · ${(audio.length / 1024).toFixed(0)} KB · `
                  + (cached ? 'cached' : `${((Date.now() - t0) / 1000).toFixed(1)} s`));
    }catch(e){
      clips.set(`${s.id}|${v.id}`, { error: e.message });
      console.log(`✗ ${v.id} · ${s.id} · ${e.message}`);
    }
  }
}

const html = join(OUT, 'index.html');
writeFileSync(html, page(samples, voices, clips));
console.log(`\n${ok}/${samples.length * voices.length} clips · ${html}`);
process.exit(ok === samples.length * voices.length ? 0 : 1);
