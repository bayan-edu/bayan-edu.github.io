/* ══════════════════════════════════════════════════════════
   بيان — tools/tts_voices.mjs · مقارنةُ الأصوات على منطوقٍ ثابت (أداةٌ لا تُنشر)

   تقرأ منطوقَ الجولة الثالثة بعينه (`out3/*.txt` من `tts_trial.mjs`) وتُسمعه بأصواتٍ أخرى — فالفرقُ في الصوت وحده، ولا تشكيلَ
   ولا حصّةَ Gemini: الأصواتُ الجديدة كلُّها Chirp 3 HD، وما سُمع من الثالثة لا يُعاد بل يُضمّ كما هو.
      node --env-file=.env.local tools/tts_voices.mjs      ← يولّد ما ينقص ثمّ يبني الصفحة
      node tools/tts_voices.mjs --page                      ← الصفحةُ وحدها من الملفّات، بلا شبكة
   🎧 **الجولةُ الرابعة** (`round4.html` · `out4/`) — وحكمُ المالك على الثالثة (٢٨ أكتوبر): «أفضل الأصوات الحالية: Gemini · Charon —
      المعتمد · Chirp 3 HD · ar-XA · Iapetus»، و«في العنوان: Gemini · Charon — ضبطٌ تامّ»:
      أ · العناوينُ بضبطها التامّ: Charon · Iapetus
      ب · النصُّ كلُّه بالصوتين — والكلامُ المباشر: Algenib على Gemini (المعتمد) وAlgenib على Chirp
      ج · الجملةُ الطويلة بخمسةِ أصواتٍ أخرى من Chirp 3 HD: Orus · Schedar · Sadaltager · Rasalgethi · Algieba
   ══════════════════════════════════════════════════════════ */
import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { post, parse, okStatus } from './google.mjs';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const DIR = join(ROOT, '.tts-compare', 'trial');
const FROM = join(DIR, 'out3'), OUT = join(DIR, 'out4'), META = join(DIR, 'out4', 'meta.json');
const PAGE_ONLY = process.argv.includes('--page');
const T = await import(pathToFileURL(join(ROOT, 'supabase/functions/tts/core.js')));
const { textSentences } = await import(pathToFileURL(join(ROOT, 'js/book.js')));
const pad = k => String(k).padStart(2, '0');
mkdirSync(OUT, { recursive: true });

/* ── الجملُ بترقيم الجولة الثالثة نفسِه (`tts_trial.mjs`): العنوانُ مرّةً لكلّ نصّ، ثمّ جملُ فقراته ── */
const src = JSON.parse(readFileSync(join(DIR, 'source.json'), 'utf8'));
const rows = [], titled = new Set();
for(const p of src.paras){
  if(!titled.has(p.item)){
    titled.add(p.item);
    rows.push(...textSentences('', p.title).map(s => ({ text: s.text, kind: 'cover', group: `${p.item} · العنوان` })));
  }
  rows.push(...textSentences(p.text, '').filter(s => s.kind !== 'q' && !s.text.includes('۝'))
    .map(s => ({ text: s.text, kind: s.kind, group: `${p.item} · الفقرة ${p.n}` })));
}
rows.forEach((s, k) => Object.assign(s, { k: k + 1, held: T.held(s) }));
const nine = rows.find(s => s.held);
const probe = { k: '9a', text: nine.text.split('،')[0] + '.', kind: 'p', group: `${nine.group} · ما قبل الآيتين من الجملة ٩`, held: null };
rows.splice(rows.indexOf(nine) + 1, 0, probe);

/* المنطوقُ ومرجعُه من الثالثة: العنوانُ بضبطه التامّ (`-full`) وما سواه كما أُرسل (`main`: Charon، وAlgenib للحوار) */
const txt = (dir, name) => existsSync(join(dir, name)) ? readFileSync(join(dir, name), 'utf8') : null;
for(const s of rows){
  const tag = T.isTitle(s) ? '-full' : '';
  s.spoken = s.held ? null : txt(FROM, `${pad(s.k)}${tag}.txt`);
  s.ref = `${pad(s.k)}-${T.isTitle(s) ? 'full' : 'main'}.mp3`;
  s.dialogue = !T.isTitle(s) && T.isDialogue(s.text);
}

const IAPETUS = { id: 'chirp-iapetus', label: 'Chirp 3 HD · Iapetus', name: 'ar-XA-Chirp3-HD-Iapetus' };
const ALGENIB = { id: 'chirp-algenib', label: 'Chirp 3 HD · Algenib — الشخصيّة', name: 'ar-XA-Chirp3-HD-Algenib' };
const MORE = ['Orus', 'Schedar', 'Sadaltager', 'Rasalgethi', 'Algieba']
  .map(n => ({ id: `chirp-${n.toLowerCase()}`, label: `Chirp 3 HD · ${n}`, name: `ar-XA-Chirp3-HD-${n}` }));
const LONG = rows.find(s => s.k === 8);
const chirpOf = s => s.dialogue ? ALGENIB : IAPETUS;
const refLabel = s => s.dialogue ? 'Gemini · Algenib — الشخصيّة (المعتمد)' : `Gemini · Charon${T.isTitle(s) ? ' — ضبطٌ تامّ' : ''} (المعتمد)`;

if(!PAGE_ONLY){
  /* الشبكةُ على جهاز المالك تقطع الاتّصالَ أحياناً (`ECONNRESET`) ⇒ يُعاد مرّتين، كما في `tts_trial.mjs` */
  const sleep = ms => new Promise(r => setTimeout(r, ms));
  const send = async (url, headers, body, timeout) => {
    for(let attempt = 0; ; attempt++){
      try { return await post(url, headers, body, timeout); }
      catch(e){ if(attempt === 2) throw e; console.log(`  ↻ ${e.code || e.message} — retry in 3 s`); await sleep(3000); }
    }
  };
  const saFile = process.env.GOOGLE_SA_FILE || '';
  if(!saFile || !existsSync(saFile)){ console.error('⛔ GOOGLE_SA_FILE is missing — node --env-file=.env.local tools/tts_voices.mjs'); process.exit(2); }
  const sa = T.readServiceAccount(readFileSync(saFile, 'utf8'));
  if(!sa){ console.error('⛔ GOOGLE_SA_FILE is not a service-account JSON key'); process.exit(2); }
  const tok = await send(T.TOKEN_URL, { 'content-type': 'application/x-www-form-urlencoded' }, T.tokenBody(await T.signJwt(sa)), 60000);
  const token = parse(tok.text).access_token;
  if(!okStatus(tok.status) || !token){ console.error(`⛔ token: ${T.googleError(tok.status, parse(tok.text), tok.text)}`); process.exit(2); }
  const auth = { 'content-type': 'application/json', authorization: `Bearer ${token}` };

  /* ما سُمع من Chirp في الثالثة (الجملُ ٥ و٨ و«ما قبل الآيتين») يُضمّ كما هو ولا يُعاد */
  const jobs = [];
  for(const s of rows) if(s.spoken && !existsSync(join(FROM, `${pad(s.k)}-${chirpOf(s).id}.mp3`))) jobs.push({ s, v: chirpOf(s) });
  for(const v of MORE) jobs.push({ s: LONG, v });

  const meta = { at: new Date().toISOString(), clips: {} };
  const voice = async ({ s, v }) => {
    const t0 = Date.now();
    let res;
    for(let attempt = 0; ; attempt++){
      res = await send(T.TTS.endpoint, auth, JSON.stringify(T.ttsRequest(s.spoken, { name: v.name })), 120000);
      if(!T.retryable(res.status) || attempt === 3) break;
      await sleep(T.backoffMs(attempt));
    }
    const j = parse(res.text), clip = { secs: +((Date.now() - t0) / 1000).toFixed(1), error: null };
    if(!okStatus(res.status)) clip.error = T.googleError(res.status, j, res.text);
    else {
      const r = T.readTts(j);
      if(r.error) clip.error = r.error;
      else { clip.ms = r.ms; writeFileSync(join(OUT, `${pad(s.k)}-${v.id}.mp3`), r.bytes); }
    }
    meta.clips[`${s.k}-${v.id}`] = clip;
    console.log(`${clip.error ? '✗' : '✔'} ${s.k} · ${v.id} · ${clip.secs} s${clip.ms ? ` → ${(clip.ms / 1000).toFixed(1)} s audio` : ''}${clip.error ? ' · ' + clip.error : ''}`);
  };
  for(let k = 0; k < jobs.length; k += 4) await Promise.all(jobs.slice(k, k + 4).map(voice));
  writeFileSync(META, JSON.stringify(meta, null, 1));
}

/* ── الصفحة: كلُّ مقطعٍ من ملفّه — الجديدُ من `out4/` بسجلّه، والمرجعُ وما سُمع من `out3/` ── */
const meta = existsSync(META) ? JSON.parse(readFileSync(META, 'utf8')) : null;
function load(dir, file, label){
  if(!existsSync(join(dir, file))) return null;
  const bytes = readFileSync(join(dir, file));
  return { label, ms: T.mp3Ms(new Uint8Array(bytes)), audio: bytes.toString('base64') };
}
function clip(s, v){
  const file = `${pad(s.k)}-${v.id}.mp3`, m = meta?.clips?.[`${s.k}-${v.id}`];
  if(m?.error) return { label: v.label, error: m.error };
  return load(OUT, file, v.label) || load(FROM, file, `${v.label} (من الثالثة)`);
}
const ref = s => load(FROM, s.ref, refLabel(s));

const esc = x => String(x).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/"/g, '&quot;');
const sec = ms => (ms / 1000).toLocaleString('ar-EG', { maximumFractionDigits: 1 });
const shown = [];
const player = c => { if(!c) return ''; shown.push(c);
  return c.error ? `<p class="err">${esc(c.label)}: ${esc(c.error)}</p>`
    : `<div class="v"><b>${esc(c.label)}</b> <span>${sec(c.ms)} ث</span><audio controls preload="none" src="data:audio/mpeg;base64,${c.audio}"></audio></div>`; };
const kindOf = s => s.kind === 'v' ? ' · بيت' : s.kind === 'cover' ? ' · العنوان' : s.dialogue ? ' · كلامٌ مباشر' : '';
const head = s => `<h3><span>${s.k}</span> ${esc(s.group)}${kindOf(s)}</h3>
  <p class="shown">${esc(s.text)}</p>
  ${s.spoken ? `<p class="spoken" title="ما أُرسل إلى الصوت">${esc(s.spoken)}</p>` : ''}
  ${s.held ? `<p class="meta"><span class="held">ممسَكة: ${esc(s.held)}</span></p>` : ''}`;
const pair = s => `<div class="grid">${player(ref(s))}${player(clip(s, chirpOf(s)))}</div>`;

const A = rows.filter(s => T.isTitle(s) && s.spoken).map(s => `<section>${head(s)}${pair(s)}</section>`).join('\n');
const B = rows.filter(s => !T.isTitle(s)).map(s => `<section${s.held ? ' class="off"' : ''}>${head(s)}${s.spoken ? pair(s) : ''}</section>`).join('\n');
const C = `<section>${head(LONG)}<div class="grid">${player(ref(LONG))}${player(clip(LONG, IAPETUS))}${MORE.map(v => player(clip(LONG, v))).join('')}</div></section>`;

const html = `<!doctype html>
<html lang="ar" dir="rtl"><head><meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>تجربة الصوت — الجولة الرابعة</title>
<style>
  :root { --bg:#f7f6f2; --card:#fff; --ink:#1f2328; --mute:#5f6368; --line:#e3e1da; --err:#b3261e; --warn:#7a4a00; }
  @media (prefers-color-scheme: dark) { :root { --bg:#16181c; --card:#1f2228; --ink:#e8e6e1; --mute:#a3a7ad; --line:#30343b; --err:#f2b8b5; --warn:#f0c27a; } }
  body { margin:0; padding:24px 16px 48px; background:var(--bg); color:var(--ink); font:16px/1.7 "Segoe UI", Tahoma, sans-serif; }
  main { max-width:960px; margin:0 auto; } h1 { font-size:1.4rem; margin:0 0 4px; } h2 { font-size:1.15rem; margin:28px 0 8px; }
  .lead { color:var(--mute); margin:0 0 16px; } .lead li { margin:2px 0; } .lead b { color:var(--ink); }
  section { background:var(--card); border:1px solid var(--line); border-radius:16px; padding:16px 18px; margin:0 0 14px; }
  section.off { opacity:.75; }
  h3 { font-size:.95rem; margin:0 0 8px; color:var(--mute); } h3 span { color:var(--ink); font-weight:700; }
  .shown { font-size:1.12rem; line-height:2; margin:0 0 6px; }
  .spoken { font-size:1.12rem; line-height:2.1; margin:0 0 8px; padding:8px 12px; border-radius:10px; background:var(--bg); }
  .meta { font-size:.88rem; color:var(--mute); margin:8px 0 0; } .err { color:var(--err); } .held { color:var(--warn); }
  .grid { display:grid; grid-template-columns:repeat(auto-fill, minmax(260px, 1fr)); gap:10px; }
  .v { border:1px solid var(--line); border-radius:12px; padding:8px 10px; } .v b { font-size:.88rem; } .v span { color:var(--mute); font-size:.85rem; }
  audio { width:100%; margin-top:4px; }
</style></head><body><main>
<h1>تجربة الصوت — الجولة الرابعة</h1>
<div class="lead"><p>بعد حكمك على الثالثة: الصوتان الأفضل Charon على Gemini وIapetus على Chirp 3 HD، والعنوانُ بضبطه التامّ.</p><ul>
  <li>المنطوقُ هو منطوقُ الجولة الثالثة بعينه، فالفرقُ في الصوت وحده. ومقاطعُ Charon هي التي سمعتَها هناك.</li>
  <li>العنوانُ صار في الدالّة بضبطه التامّ ووقفه، والخفيفُ أُزيل.</li>
  <li>الكلامُ المباشر: Algenib على Gemini (المعتمد) وAlgenib على Chirp — فـChirp لا يأخذ توجيهاً بانفعال الشخصيّة.</li>
  <li>والجملةُ ذاتُ الآيتين ما زالت ممسَكة، وبعدها ما قبل الآيتين منها («جاء»).</li>
</ul></div>
<h2>أ · العنوان بضبطه التامّ — الصوتان</h2>
${A}
<h2>ب · النصّ كلّه — الصوتان</h2>
${B}
<h2>ج · الجملة الطويلة بخمسة أصواتٍ أخرى من Chirp 3 HD</h2>
<p class="lead">لعلّ بينها ما هو أحسنُ من Iapetus. والمنطوقُ نفسُه.</p>
${C}
</main></body></html>
`;
writeFileSync(join(DIR, 'round4.html'), html);
const bad = shown.filter(c => c.error).length;
console.log(`\n${shown.length - bad} players · ${bad} errors · ${join(DIR, 'round4.html')}`);
process.exit(bad ? 1 : 0);
