/* ══════════════════════════════════════════════════════════
   بيان — tools/quran_quotes.mjs · الآيةُ المقتبسة في النثر: تُعرف بنصّ المصحف وتُقصّ من تلاوة الحصري (أداةٌ لا تُنشر)

   الخطوةُ الأخيرة من صوت النصّ العربيّ: جملةُ نثرٍ تقتبس آيةً بين «﴿ ﴾» تُقرأ أجزاءً — النثرُ بصوته المولَّد، والآيةُ بتلاوة الحصري من
   نسختنا في R2، **بلا استعاذة** (استشهادٌ يسبقه «قال تعالى»). لا تمسّ الموقع ولا القاعدة، ولا نداءَ لـGoogle:
      node tools/quran_quotes.mjs
   ① **المرحلةُ الأولى — تجربةٌ قبل البناء** (أقرّها المالك ٢٨ أكتوبر: «خطة جيدة»): كانت الأداةُ تعرف وتقصّ بنسختها، فعُرفت آياتُ `593`
      السبعُ بتطابق ١٠٠٪ وسُمعت — وحكم المالك: «المعرفة سليمة، لكن ما انتهى وصلاً تُتلى فيه الآية كاملة».
   ② **والمرحلةُ الثانية — الطريقُ الحقيقيّ قبل النشر:** الأداةُ اليوم تنادي دوالَّ الدالّة نفسَها (`core.js`: `quranIndex` · `findQuote` ·
      `quoteVerdict` · `quoteSpan` · `mp3Cut` · `quoteLabel`) على المصحف كلّه وملفّاتنا في R2 — فما تسمعه الصفحةُ ما ستحفظه الدالّة.
   البيانات — تُنزَّل مرّةً إلى `.tts-compare/quran/` (خارج Git)، وهي التي تُرفع إلى R2 بحرفها (`core.js` · `QURAN`):
      · نصُّ المصحف العثمانيّ من Tanzil («سورة|آية|نصّ») — CC BY 3.0: يُنقل بحرفه مع نسبته ورابطه (tanzil.net).
      · توقيتُ كلمات الحصري من quran-align (إصدار 2016-11-24 · `Husary_64kbps`) — التسجيلُ الذي في R2 بعينه (everyayah · `188`) — CC BY 4.0.
   والنصّ — فقراتُ `593` التي فيها «﴿» مصدَّرةً من القاعدة ببصمتها (md5): لا يُجرَّب على نسخةٍ غيّرها النقل.
   والصفحة — `.tts-compare/trial/quotes.html`: لكلّ جملةٍ أجزاؤها، ولكلّ آيةٍ ما عُرفت به وما يُتلى منها والآيةُ كاملة.
   ══════════════════════════════════════════════════════════ */
import { readFileSync, writeFileSync, existsSync, mkdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { createHash } from 'node:crypto';
import { inflateRawSync } from 'node:zlib';
import https from 'node:https';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const DATA = join(ROOT, '.tts-compare', 'quran'), DIR = join(ROOT, '.tts-compare', 'trial'), OUT = join(DIR, 'quotes');
mkdirSync(DATA, { recursive: true });
mkdirSync(OUT, { recursive: true });
const T = await import(pathToFileURL(join(ROOT, 'supabase/functions/tts/core.js')));
const { textSentences } = await import(pathToFileURL(join(ROOT, 'js/book.js')));
const { surahName } = await import(pathToFileURL(join(ROOT, 'js/quran.js')));

const TANZIL = 'https://tanzil.net/pub/download/index.php?quranType=uthmani&outType=txt-2&agree=true';
const ALIGN = 'https://github.com/cpfair/quran-align/releases/download/release-2016-11-24/quran-align-data-2016-11-24.zip';

/* ── الشبكة: GET بتحويلاته، والعابرُ يُعاد (شبكةُ المالك تقطع أحياناً: ECONNRESET) ── */
const sleep = ms => new Promise(r => setTimeout(r, ms));
function get(url, hops = 5){
  return new Promise((ok, no) => {
    const req = https.get(url, { autoSelectFamily: true, timeout: 90000, headers: { 'user-agent': 'bayan-tools/1.0' } }, res => {
      if(res.statusCode >= 300 && res.statusCode < 400 && res.headers.location && hops > 0){
        res.resume();
        ok(get(new URL(res.headers.location, url).href, hops - 1));
        return;
      }
      const parts = [];
      res.on('data', d => parts.push(d));
      res.on('error', no);
      res.on('end', () => res.statusCode === 200 ? ok(Buffer.concat(parts)) : no(new Error(`HTTP ${res.statusCode} · ${url}`)));
    });
    req.on('timeout', () => req.destroy(new Error('timeout')));
    req.on('error', no);
  });
}
async function fetchBytes(url){
  for(let n = 0; ; n++){
    try { return await get(url); }
    catch(e){ if(n === 4) throw e; console.log(`  ↻ ${e.code || e.message}`); await sleep(2500); }
  }
}
async function cached(name, url){
  const f = join(DATA, name);
  if(!existsSync(f)){ console.log(`⇣ ${name}`); mkdirSync(dirname(f), { recursive: true }); writeFileSync(f, await fetchBytes(url)); }
  return readFileSync(f);
}

/* ── zip: الفهرسُ المركزيّ في آخره، والملفُّ مضغوطٌ بـdeflate أو مخزون ── */
function unzip(buf){
  let e = buf.length - 22;
  while(e >= 0 && buf.readUInt32LE(e) !== 0x06054b50) e--;
  if(e < 0) throw new Error('not a zip');
  const count = buf.readUInt16LE(e + 10), files = new Map();
  let p = buf.readUInt32LE(e + 16);
  for(let k = 0; k < count; k++){
    if(buf.readUInt32LE(p) !== 0x02014b50) throw new Error('bad central directory');
    const method = buf.readUInt16LE(p + 10), size = buf.readUInt32LE(p + 20);
    const nlen = buf.readUInt16LE(p + 28), xlen = buf.readUInt16LE(p + 30), clen = buf.readUInt16LE(p + 32), off = buf.readUInt32LE(p + 42);
    files.set(buf.toString('utf8', p + 46, p + 46 + nlen), () => {
      const at = off + 30 + buf.readUInt16LE(off + 26) + buf.readUInt16LE(off + 28), data = buf.subarray(at, at + size);
      if(method === 8) return inflateRawSync(data);
      if(method === 0) return data;
      throw new Error(`zip method ${method}`);
    });
    p += 46 + nlen + xlen + clen;
  }
  return files;
}

/* ── البيانات بحرفها — ونسختُها للرفع إلى R2 بمساراتها (`upload/`): ما يقرؤه هذا هو ما ستقرؤه الدالّة ── */
const tanzil = await cached('quran-uthmani.txt', TANZIL);
const zip = unzip(await cached('quran-align-data-2016-11-24.zip', ALIGN));
const entry = [...zip.keys()].find(n => /Husary_64kbps/i.test(n) && /\.json$/i.test(n));
if(!entry){ console.error('⛔ لا Husary_64kbps في الحزمة:', [...zip.keys()].join(' · ')); process.exit(1); }
const timing = zip.get(entry)();
for(const [path, bytes] of [[T.QURAN.text, tanzil], [T.QURAN.timing, timing]]){
  const f = join(DATA, 'upload', path);
  mkdirSync(dirname(f), { recursive: true });
  writeFileSync(f, bytes);
}
const Q = T.quranIndex(tanzil.toString('utf8'), JSON.parse(timing.toString('utf8')));
let agree = 0;
for(const [key, segs] of Q.timing) if(segs.length && Math.max(...segs.map(x => x[1])) === (Q.verses.get(key) || []).length) agree++;
console.log(`✔ المصحف ${Q.verses.size} آية · التوقيت ${Q.timing.size} · يتّفق عدُّ الكلمات في ${agree} · ونسخةُ الرفع في ${join(DATA, 'upload')}`);

/* ── النصّ: الفقراتُ ببصمتها، ثمّ جملُها كما يقسمها الكتاب، ثمّ أجزاءُ كلّ جملةٍ فيها «﴿» ── */
const src = JSON.parse(readFileSync(join(DATA, '593.json'), 'utf8'));
for(const p of src.paras){
  const md5 = createHash('md5').update(p.text, 'utf8').digest('hex');
  if(md5 !== p.md5){ console.error(`⛔ الفقرة ${p.n}: البصمة ${md5} لا ${p.md5}`); process.exit(1); }
}
const sents = textSentences(src.paras.map(p => p.text).join('\n\n'), '').filter(s => s.text.includes('﴿'));
const partsOf = text => text.split(/(﴿[^﴾]*﴾)/).map(x => x.trim()).filter(Boolean)
  .map(x => x.startsWith('﴿') ? { quote: x } : { prose: x });

const files = new Map();
async function ayahFile(s, a){
  const path = T.QURAN.ayah(s, a);
  if(!files.has(path)) files.set(path, new Uint8Array(await cached(join('husary', path.split('/').pop()), T.MEDIA + path)));
  return files.get(path);
}

const report = [];
let n = 0;
for(const s of sents){
  const parts = partsOf(s.text);
  for(const p of parts){
    if(!p.quote) continue;
    p.n = ++n;
    const t0 = performance.now();
    const hit = T.findQuote(Q, p.quote);
    p.ms = Math.round(performance.now() - t0);
    p.score = hit.score;
    p.verdict = T.quoteVerdict(hit.score);
    if(p.verdict !== 'quran'){ console.log(`✗ ${p.n} · ${p.verdict} · ${(hit.score * 100).toFixed(0)}٪`); continue; }
    p.spans = hit.ranges.map(r => T.quoteSpan(Q, r));
    const cuts = [];
    for(const x of p.spans){
      const bytes = await ayahFile(x.s, x.a);
      cuts.push({ x, full: bytes, fileMs: T.mp3Ms(bytes), cut: T.mp3Cut(bytes, x.start, x.end) });
    }
    p.cuts = cuts;
    p.label = T.quoteLabel(p.spans);
    p.clip = Buffer.concat(cuts.map(c => Buffer.from(c.cut.bytes)));
    p.clipMs = cuts.reduce((t, c) => t + c.cut.ms, 0);
    writeFileSync(join(OUT, `${String(p.n).padStart(2, '0')}.mp3`), p.clip);
    console.log(`✔ ${p.n} · ${p.label} · ${(hit.score * 100).toFixed(0)}٪ في ${p.ms} مللي · يُتلى ${Math.round(p.clipMs)} مللي`
      + p.spans.map(x => ` · ${x.whole ? (x.widened ? 'الآيةُ كاملةً للوصل' : 'الآيةُ كاملة') : `${Math.round(x.start)}–${Math.round(x.end)}`}`).join(''));
  }
  report.push({ text: s.text, parts });
}

/* ── الصفحة ── */
const esc = x => String(x).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/"/g, '&quot;');
const AR = x => Number(x).toLocaleString('ar-EG', { maximumFractionDigits: 1 });
const sec = ms => AR(Math.round(ms / 100) / 10);
const uri = b => `data:audio/mpeg;base64,${Buffer.from(b).toString('base64')}`;
const card = p => {
  if(p.verdict !== 'quran') return `<div class="q"><h3>${AR(p.n)} · ليست آية (${AR(Math.round(p.score * 100))}٪)</h3><p class="said">${esc(p.quote)}</p></div>`;
  const head = p.spans.map(x => `${esc(surahName(x.s))} ${AR(x.a)}`).join(' و');
  const what = p.spans.map(x => x.whole ? (x.widened ? 'الآيةُ كاملة — اقتُبس بعضُها وانتهى وصلاً، فتُتلى كلُّها' : 'الآيةُ كاملة')
    : `الكلماتُ ${AR(x.from + 1)}–${AR(x.to + 1)} وحدها`).join(' · ');
  return `<div class="q"><h3>${AR(p.n)} · ${head} <small>تطابقُ الحروف ${AR(Math.round(p.score * 100))}٪</small></h3>
    <p class="said">${esc(p.quote)}</p>
    <p class="ref">${what}</p>
    <p class="note">ما يُتلى بحرفه: <span>${esc(p.spans.map(x => x.words).join(' '))}</span> · واسمُ الصوت: <code>${esc(p.label)}</code></p>
    <div class="pair">
      <div><b>ما يُتلى في الجملة</b> <span>${sec(p.clipMs)} ث</span><audio controls preload="none" src="${uri(p.clip)}"></audio></div>
      ${p.cuts.map(c => `<div><b>الآيةُ كاملة</b> <span>${sec(c.fileMs)} ث</span><audio controls preload="none" src="${uri(c.full)}"></audio></div>`).join('')}
    </div></div>`;
};
const html = `<!doctype html>
<html lang="ar" dir="rtl"><head><meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>الآيات المقتبسة</title>
<style>
  :root { --bg:#f7f6f2; --card:#fff; --ink:#1f2328; --mute:#5f6368; --line:#e3e1da; --err:#b3261e; --soft:#efede6; }
  @media (prefers-color-scheme: dark) { :root { --bg:#16181c; --card:#1f2228; --ink:#e8e6e1; --mute:#a3a7ad; --line:#30343b; --err:#f2b8b5; --soft:#262a31; } }
  body { margin:0; padding:24px 16px 48px; background:var(--bg); color:var(--ink); font:16px/1.7 "Segoe UI", Tahoma, sans-serif; }
  main { max-width:1000px; margin:0 auto; } h1 { font-size:1.4rem; margin:0 0 4px; } .lead { color:var(--mute); margin:0 0 16px; }
  section { background:var(--card); border:1px solid var(--line); border-radius:16px; padding:16px 18px; margin:0 0 14px; }
  .sent { font-size:1.08rem; line-height:2.1; margin:0 0 10px; }
  .parts { display:flex; flex-wrap:wrap; gap:6px; margin:0 0 12px; padding:0; list-style:none; }
  .parts li { border:1px solid var(--line); border-radius:999px; padding:2px 12px; font-size:.85rem; color:var(--mute); }
  .parts li.v { background:var(--soft); color:var(--ink); }
  .q { border-top:1px solid var(--line); padding-top:10px; margin-top:10px; }
  h3 { font-size:1rem; margin:0 0 6px; } h3 small { color:var(--mute); font-weight:400; }
  .said { font-size:1.15rem; line-height:2.1; margin:0 0 6px; } .ref { margin:0; }
  .note { margin:2px 0 8px; color:var(--mute); font-size:.88rem; } .note span { color:var(--ink); } code { font-size:.82rem; }
  .pair { display:grid; grid-template-columns:repeat(auto-fill, minmax(260px, 1fr)); gap:10px; }
  .pair > div { border:1px solid var(--line); border-radius:12px; padding:8px 10px; } .pair b { font-size:.88rem; } .pair span { color:var(--mute); font-size:.85rem; }
  audio { width:100%; margin-top:4px; } footer { color:var(--mute); font-size:.85rem; }
</style></head><body><main>
<h1>الآيات المقتبسة</h1>
<p class="lead">جمل النص 593 التي تقتبس آية بين «﴿ ﴾»، كما ستقرؤها الدالة: النثر بصوته المولّد، والآية بتلاوة الحصري. وما انتهى وصلاً
تُتلى فيه الآية كاملة، بحكم المالك بعد سماع التجربة الأولى.</p>
${report.map(r => `<section>
  <p class="sent">${esc(r.text)}</p>
  <ul class="parts">${r.parts.map(p => p.quote ? `<li class="v">آية ${AR(p.n)} · الحصري</li>` : `<li>نثر · صوت مولّد</li>`).join('')}</ul>
  ${r.parts.filter(p => p.quote).map(card).join('')}
</section>`).join('\n')}
<footer>نص المصحف: Tanzil Project (tanzil.net) · CC BY 3.0 — توقيت الكلمات: quran-align (cpfair · Husary_64kbps) · CC BY 4.0 —
التلاوة: الشيخ محمود خليل الحصري من everyayah.com، ونسختها في مخزن المنصة.</footer>
</main></body></html>
`;
writeFileSync(join(DIR, 'quotes.html'), html);
const bad = report.flatMap(r => r.parts).filter(p => p.quote && p.verdict !== 'quran').length;
console.log(`\n${n - bad}/${n} آيات · ${join(DIR, 'quotes.html')}`);
process.exit(bad ? 1 : 0);
