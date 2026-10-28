/* ══════════════════════════════════════════════════════════
   بيان — tools/tts_audition.mjs · سماعُ أصواتٍ على جملٍ بعينها قبل اعتماد أحدها (أداةٌ لا تُنشر)

   المسارُ مسارُ الدالّة نفسُه (`supabase/functions/tts/core.js`): تشكيلُ Gemini 3.8 Flash بسياق الجملة وفحصِ حروفها ⇒
   الوقفُ والابتداء (`spokenFor`) ⇒ الصوتُ بتوجيه الكلام المباشر — **بلا R2 ولا قاعدة**، فلا يُحفظ شيءٌ ولا يبلغ طالباً.
      node --env-file=.env.local tools/tts_audition.mjs
   ⇒ `.tts-compare/trial/female.html` و`female/` (والمجلّدُ في `.gitignore`)
   🎧 **جولتُه الأولى (٢٨ أكتوبر) — صوتٌ للشخصيّات النسائيّة:** سأل المالك «هل يمكن إضافة صوت يُستخدم للشخصيات النسائية؟».
      والجملتان من `603` بحرفهما، لزبيبة أمّ عنترة بانفعالين: ألمٌ («صاحت في ألم») وهدوءٌ («فقالت زبيبة هادئة») — والسياقُ الجملةُ
      قبلها كما ترسله اللوحة. والأصواتُ خمسةٌ من أصوات Gemini النسائيّة بتوجيه الكلام المباشر، فبه تفوّق Algenib على نظيره في
      Chirp (حكمُ المالك في الرابعة) — والصفاتُ صفاتُ Google لها.
   ══════════════════════════════════════════════════════════ */
import { writeFileSync, mkdirSync, existsSync, readFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { post, parse, okStatus } from './google.mjs';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const DIR = join(ROOT, '.tts-compare', 'trial'), OUT = join(DIR, 'female');
const T = await import(pathToFileURL(join(ROOT, 'supabase/functions/tts/core.js')));
mkdirSync(OUT, { recursive: true });

const LINES = [
  { id: 'pain', mood: 'ألم', context: 'وكانت زبيبة تستمع إليه فى دهشة متعجبة من قوله وصاحت فى ألم:',
    text: '- إنك تقطع نياط قلبى يا عنترة.' },
  { id: 'calm', mood: 'هدوء', context: 'فقالت زبيبة هادئة:',
    text: '- لقد عرفت يا عنتر أنى لا أكذب، ولو أردت أن أكذب على الناس جميعًا ما كذبت على ولدى.' }
];
const VOICES = [
  { name: 'Sulafat', trait: 'دافئ' }, { name: 'Gacrux', trait: 'ناضج' }, { name: 'Vindemiatrix', trait: 'رقيق' },
  { name: 'Achernar', trait: 'ليّن' }, { name: 'Kore', trait: 'حازم' }
];

/* الدخولُ بحساب الخدمة، والعابرُ يُعاد — كما في `tts_trial.mjs` */
const sleep = ms => new Promise(r => setTimeout(r, ms));
const send = async (url, headers, body, timeout) => {
  for(let attempt = 0; ; attempt++){
    try { return await post(url, headers, body, timeout); }
    catch(e){ if(attempt === 2) throw e; console.log(`  ↻ ${e.code || e.message} — retry in 3 s`); await sleep(3000); }
  }
};
const saFile = process.env.GOOGLE_SA_FILE || '';
if(!saFile || !existsSync(saFile)){ console.error('⛔ GOOGLE_SA_FILE is missing — node --env-file=.env.local tools/tts_audition.mjs'); process.exit(2); }
const sa = T.readServiceAccount(readFileSync(saFile, 'utf8'));
if(!sa){ console.error('⛔ GOOGLE_SA_FILE is not a service-account JSON key'); process.exit(2); }
const tok = await send(T.TOKEN_URL, { 'content-type': 'application/x-www-form-urlencoded' }, T.tokenBody(await T.signJwt(sa)), 60000);
const token = parse(tok.text).access_token;
if(!okStatus(tok.status) || !token){ console.error(`⛔ token: ${T.googleError(tok.status, parse(tok.text), tok.text)}`); process.exit(2); }
const auth = { 'content-type': 'application/json', authorization: `Bearer ${token}` };
const call = async (url, body, timeout) => {
  for(let attempt = 0; ; attempt++){
    const res = await send(url, auth, body, timeout);
    if(!T.retryable(res.status) || attempt === 3) return res;
    const wait = T.backoffMs(attempt);
    console.log(`  ↻ ${res.status} — retry in ${wait / 1000} s`);
    await sleep(wait);
  }
};

/* ① التشكيلُ بسياق كلّ جملة، وفحصُ حروفها ⇒ المنطوق */
for(const l of LINES){
  const s = { text: l.text, kind: 'p', spoken: null };
  const res = await call(T.tashkeelUrl(sa.project_id), JSON.stringify(T.tashkeelRequest([s], l.context)), 180000);
  const r = okStatus(res.status) ? T.readTashkeel(parse(res.text), 1) : { error: T.googleError(res.status, parse(res.text), res.text) };
  if(r.error || !T.sameLetters(l.text, r.list[0])){ console.error(`✗ tashkeel ${l.id}: ${r.error || 'letters changed'}`); process.exit(1); }
  l.spoken = T.spokenFor(s, r.list[0]);
  console.log(`✔ tashkeel ${l.id} · ${l.spoken}`);
}

/* ② الصوتُ بكلّ صوتٍ وتوجيهِ الكلام المباشر — اثنان معاً (حصّةُ Gemini) */
const jobs = LINES.flatMap(l => VOICES.map(v => ({ l, v })));
const clips = {};
const voice = async ({ l, v }) => {
  const res = await call(T.TTS.endpoint, JSON.stringify(T.ttsRequest(l.spoken, { name: v.name, prompt: T.TTS.dialogue })), 120000);
  const j = parse(res.text);
  const r = okStatus(res.status) ? T.readTts(j) : { error: T.googleError(res.status, j, res.text) };
  clips[`${l.id}-${v.name}`] = r.error ? { error: r.error } : { ms: r.ms, audio: Buffer.from(r.bytes).toString('base64') };
  if(!r.error) writeFileSync(join(OUT, `${l.id}-${v.name}.mp3`), r.bytes);
  console.log(`${r.error ? '✗' : '✔'} ${l.id} · ${v.name}${r.ms ? ` → ${(r.ms / 1000).toFixed(1)} s` : ''}${r.error ? ' · ' + r.error : ''}`);
};
for(let k = 0; k < jobs.length; k += 2) await Promise.all(jobs.slice(k, k + 2).map(voice));

/* ③ الصفحة */
const esc = x => String(x).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/"/g, '&quot;');
const sec = ms => (ms / 1000).toLocaleString('ar-EG', { maximumFractionDigits: 1 });
const player = (l, v) => {
  const c = clips[`${l.id}-${v.name}`];
  return c.error ? `<p class="err">${v.name}: ${esc(c.error)}</p>`
    : `<div class="v"><b>${v.name}</b> <span>${v.trait} · ${sec(c.ms)} ث</span><audio controls preload="none" src="data:audio/mpeg;base64,${c.audio}"></audio></div>`;
};
const html = `<!doctype html>
<html lang="ar" dir="rtl"><head><meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>صوت الشخصيات النسائية</title>
<style>
  :root { --bg:#f7f6f2; --card:#fff; --ink:#1f2328; --mute:#5f6368; --line:#e3e1da; --err:#b3261e; }
  @media (prefers-color-scheme: dark) { :root { --bg:#16181c; --card:#1f2228; --ink:#e8e6e1; --mute:#a3a7ad; --line:#30343b; --err:#f2b8b5; } }
  body { margin:0; padding:24px 16px 48px; background:var(--bg); color:var(--ink); font:16px/1.7 "Segoe UI", Tahoma, sans-serif; }
  main { max-width:960px; margin:0 auto; } h1 { font-size:1.4rem; margin:0 0 4px; } .lead { color:var(--mute); margin:0 0 16px; }
  section { background:var(--card); border:1px solid var(--line); border-radius:16px; padding:16px 18px; margin:0 0 14px; }
  h3 { font-size:.95rem; margin:0 0 8px; color:var(--mute); } .ctx { color:var(--mute); margin:0 0 4px; }
  .shown { font-size:1.12rem; line-height:2; margin:0 0 6px; }
  .spoken { font-size:1.12rem; line-height:2.1; margin:0 0 10px; padding:8px 12px; border-radius:10px; background:var(--bg); }
  .grid { display:grid; grid-template-columns:repeat(auto-fill, minmax(240px, 1fr)); gap:10px; }
  .v { border:1px solid var(--line); border-radius:12px; padding:8px 10px; } .v b { font-size:.9rem; } .v span { color:var(--mute); font-size:.85rem; }
  .err { color:var(--err); } audio { width:100%; margin-top:4px; }
</style></head><body><main>
<h1>صوت الشخصيات النسائية</h1>
<p class="lead">جملتان لزبيبة أمّ عنترة من النص 603 بانفعالين، بخمسة أصوات نسائية من Gemini بتوجيه الكلام المباشر — وهو التوجيه
الذي تفوّق به Algenib. والسطر المظلَّل هو ما أُرسل إلى الصوت بعينه.</p>
${LINES.map(l => `<section><h3>${l.mood}</h3>
  <p class="ctx">${esc(l.context)}</p>
  <p class="shown">${esc(l.text)}</p>
  <p class="spoken" title="ما أُرسل إلى الصوت">${esc(l.spoken)}</p>
  <div class="grid">${VOICES.map(v => player(l, v)).join('')}</div></section>`).join('\n')}
</main></body></html>
`;
writeFileSync(join(DIR, 'female.html'), html);
const bad = Object.values(clips).filter(c => c.error).length;
console.log(`\n${Object.keys(clips).length - bad}/${Object.keys(clips).length} clips · ${join(DIR, 'female.html')}`);
process.exit(bad ? 1 : 0);
