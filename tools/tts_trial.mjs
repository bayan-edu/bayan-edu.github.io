/* ══════════════════════════════════════════════════════════
   بيان — tools/tts_trial.mjs · التجربةُ الحقيقيّة لدالّة `tts` قبل نشرها (أداةٌ لا تُنشر)

   أمرُ المالك (٢٨ أكتوبر): «ابدأ بالتجربة الحقيقيّة قبل النشر». فتمرّ جملٌ حقيقيّةٌ بمنطق الدالّة نفسِه
   (`supabase/functions/tts/core.js`) إلى Google الحقيقيّ — التشكيلُ ففحصُ الحروف فالوقفُ فالصوت — **بلا R2 ولا قاعدة**،
   ويُسمع الناتجُ قبل أن تُنشر الدالّة.
   🔑 الدخولُ بحساب الخدمة على جهاز المالك (`GOOGLE_SA_FILE` في `.env.local` — يُقرأ ولا يُطبع منه شيء)، والتوقيعُ
      توقيعُ الدالّة نفسُه (WebCrypto · `signJwt`) لا توقيعُ `google.mjs` — فيُقاس طريقُ الدالّة لا طريقٌ يشبهه:
         node --env-file=.env.local tools/tts_trial.mjs            ← يولّد الأصوات ثمّ يبني الصفحة
         node tools/tts_trial.mjs --page                            ← الصفحةُ وحدها من ملفّات `out3/`، بلا شبكة
   🔑 المقاطعُ في `.tts-compare/trial/source.json` (فقراتٌ بحرفها، طابقت القاعدةَ ببصمتها — والمجلّدُ في `.gitignore`)،
      وتُقسَم بـ`textSentences` كما يقسمها الكتاب.
   🎧 الجولاتُ كلٌّ في صفحته ومجلّده، والسابقةُ باقية: الأولى `index.html` و`out/` · الثانية `round2.html` و`out2/` ·
      **والثالثة** (بعد ملاحظات المالك على الثانية · ٢٨ أكتوبر) `round3.html` و`out3/`:
      أ · ما طلب تصحيحه قبلُ (من `out2/`) وبعدُ — «صيحة» · «اجتماعية» قبل الشرطة · «جاء» · «ابدأ»
      ب · صوتُ الراوي على ثلاث جمل: Charon وخمسةٌ معه — Gemini Iapetus، وChirp 3 HD بالعربيّة (Charon · Iapetus)، وWaveNet
          العربيّ (B · C). سأل المالك: «قد تتحسّن القراءة باختيار الصوت العربي الأصلي»
      ج · العنوانُ خفيفَ الضبط (المقترح) وتامَّه
      د · النصُّ كلُّه بالمعتمد: Charon للسرد · Algenib للكلام المباشر · والجملةُ ذاتُ الآيتين ممسَكةٌ بلا صوت
   🔴 **والصفحةُ تُبنى من الملفّات لا من الذاكرة** — انكسر بناؤها في التشغيل الأوّل بعد ٢٩ صوتاً سليماً، فأُعيد بناؤها وحدها.
   ⚠️ **وهذه الأداةُ على الجولة الثالثة:** بعدها صار العنوانُ في `core.js` تامَّ الضبط (حكمُ المالك)، فإعادةُ تشغيلها لا تُعيد قسمَ ج
      كما سُمع وتكتب فوق `out3/`. والجولةُ الرابعة في `tts_voices.mjs`، وتشغيلُ هذه التالي مجلّدٌ جديد.
   ══════════════════════════════════════════════════════════ */
import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { post, parse, okStatus } from './google.mjs';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const DIR = join(ROOT, '.tts-compare', 'trial');
const OUT = join(DIR, 'out3'), PREV = join(DIR, 'out2'), META = join(DIR, 'out3', 'meta.json');
const PAGE_ONLY = process.argv.includes('--page');
const T = await import(pathToFileURL(join(ROOT, 'supabase/functions/tts/core.js')));
const { textSentences } = await import(pathToFileURL(join(ROOT, 'js/book.js')));
const pad = k => String(k).padStart(2, '0');
mkdirSync(OUT, { recursive: true });

/* ── الجمل ── عنوانُ كلّ نصٍّ مرّةً (جملةُ الغلاف في الكتاب)، ثمّ جملُ فقراته — والآيةُ المرقَّمة لا تُرسل (189 ④).
   والممسَكةُ (`held`) لا تُشكَّل ولا تُرسل إلى الصوت، كما في الدالّة */
const src = JSON.parse(readFileSync(join(DIR, 'source.json'), 'utf8'));
const groups = [];
const titled = new Set();
for(const p of src.paras){
  if(!titled.has(p.item)){
    titled.add(p.item);
    groups.push({ label: `${p.item} · العنوان`, list: textSentences('', p.title).map(s => ({ text: s.text, kind: 'cover' })) });
  }
  groups.push({ label: `${p.item} · الفقرة ${p.n}`,
                list: textSentences(p.text, '').filter(s => s.kind !== 'q' && !s.text.includes('۝')).map(s => ({ text: s.text, kind: s.kind })) });
}
const rows = groups.flatMap(g => g.list.map(s => Object.assign(s, { group: g.label, held: T.held(s),
  source: T.tashkeelSource({ ...s, spoken: null }), voweled: null, spoken: null, full: null, tries: 0 })));
rows.forEach((s, k) => { s.k = k + 1; });

/* «جاء» سُمعت «جاع» في الجملة ٩، وهي ممسَكةٌ الآن بآيتيها ⇒ يُسمع ما قبل الآيتين وحده — مِسبارٌ لا جملةٌ من الكتاب
   (والجملةُ مشكولةٌ بيد مؤلّفها، فلا تشكيلَ ولا شبكة) */
const nine = rows.find(s => s.held);
const clause = nine.text.split('،')[0] + '.';
const probe = { k: '9a', text: clause, kind: 'p', group: `${nine.group} · ما قبل الآيتين من الجملة ٩`, source: nine.source,
                voweled: clause, spoken: null, full: null, tries: 1, held: null };
const all = [...rows, probe];

/* ── الأصوات ── */
const NARRATORS = [
  { id: 'iapetus', label: 'Gemini · ar-001 · Iapetus', opt: { name: 'Iapetus' }, lane: 'gemini' },
  { id: 'chirp-charon', label: 'Chirp 3 HD · ar-XA · Charon', opt: { name: 'ar-XA-Chirp3-HD-Charon' }, lane: 'cloud' },
  { id: 'chirp-iapetus', label: 'Chirp 3 HD · ar-XA · Iapetus', opt: { name: 'ar-XA-Chirp3-HD-Iapetus' }, lane: 'cloud' },
  { id: 'wavenet-b', label: 'WaveNet · ar-XA · B', opt: { name: 'ar-XA-Wavenet-B' }, lane: 'cloud' },
  { id: 'wavenet-c', label: 'WaveNet · ar-XA · C', opt: { name: 'ar-XA-Wavenet-C' }, lane: 'cloud' }
];
const COMPARE = [rows.find(s => /صيحة/.test(s.text)), probe, rows.find(s => s.source === 'المؤلّف' && s.kind === 'p' && !s.held)];
const mainLabel = s => T.voiceFor(s).name ? 'Gemini · Algenib — صوتُ الشخصيّة' : 'Gemini · Charon — المعتمد';
const FULL_LABEL = 'Gemini · Charon — ضبطٌ تامّ';

if(!PAGE_ONLY){
  /* والشبكةُ على جهاز المالك تقطع الاتّصالَ أحياناً (`ECONNRESET` — قِيس ٢٨ أكتوبر: أوّلُ طلبٍ قُطع، وأُعيد فبلغ) ⇒ يُعاد مرّتين */
  const sleep = ms => new Promise(r => setTimeout(r, ms));
  const send = async (url, headers, body, timeout) => {
    for(let attempt = 0; ; attempt++){
      try { return await post(url, headers, body, timeout); }
      catch(e){ if(attempt === 2) throw e; console.log(`  ↻ ${e.code || e.message} — retry in 3 s`); await sleep(3000); }
    }
  };

  /* ── الدخول ── */
  const saFile = process.env.GOOGLE_SA_FILE || '';
  if(!saFile || !existsSync(saFile)){ console.error('⛔ GOOGLE_SA_FILE is missing — node --env-file=.env.local tools/tts_trial.mjs'); process.exit(2); }
  const sa = T.readServiceAccount(readFileSync(saFile, 'utf8'));
  if(!sa){ console.error('⛔ GOOGLE_SA_FILE is not a service-account JSON key'); process.exit(2); }
  const tok = await send(T.TOKEN_URL, { 'content-type': 'application/x-www-form-urlencoded' }, T.tokenBody(await T.signJwt(sa)), 60000);
  const token = parse(tok.text).access_token;
  if(!okStatus(tok.status) || !token){ console.error(`⛔ token: ${T.googleError(tok.status, parse(tok.text), tok.text)}`); process.exit(2); }
  console.log(`service account ${sa.client_email} · token ok (WebCrypto RS256)`);
  const auth = { 'content-type': 'application/json', authorization: `Bearer ${token}` };

  /* ── العابرُ يُعاد كما تعيده الدالّة (`retryable` · `backoffMs`) ── */
  const call = async (url, body, timeout) => {
    for(let attempt = 0; ; attempt++){
      const res = await send(url, auth, body, timeout);
      if(!T.retryable(res.status) || attempt === 3) return { ...res, retries: attempt };
      const wait = T.backoffMs(attempt);
      console.log(`  ↻ ${res.status} — retry in ${wait / 1000} s`);
      await sleep(wait);
    }
  };

  /* ── التشكيل: دفعةٌ لكلّ فقرة — والعنوانُ يُشكَّل الآن ثمّ يُخفَّف — ومحاولةٌ ثانيةٌ إن غيّر النموذجُ حروفَ جملة ── */
  for(const g of groups){
    const need = g.list.filter(s => !s.held && s.source === T.TASHKEEL_MODEL);
    for(const s of g.list) if(s.source !== T.TASHKEEL_MODEL) s.voweled = s.text;
    for(let attempt = 1; attempt <= 2 && need.some(s => s.voweled === null && !s.error); attempt++){
      const pending = need.filter(s => s.voweled === null);
      const t0 = Date.now();
      const res = await call(T.tashkeelUrl(sa.project_id), JSON.stringify(T.tashkeelRequest(pending, '')), 180000);
      const j = parse(res.text);
      const r = okStatus(res.status) ? T.readTashkeel(j, pending.length) : { error: T.googleError(res.status, j, res.text) };
      console.log(`${r.error ? '✗' : '✔'} tashkeel ${g.label} · ${pending.length} · ${((Date.now() - t0) / 1000).toFixed(1)} s${r.error ? ' · ' + r.error : ''}`);
      if(r.error){ if(attempt === 2) pending.forEach(s => { s.error = r.error; }); continue; }
      pending.forEach((s, k) => {
        s.tries = attempt;
        if(T.sameLetters(s.text, r.list[k])) s.voweled = r.list[k];
        else if(attempt === 2) s.error = `التشكيل غيّر حروف الجملة: ${r.list[k]}`;
      });
    }
  }
  for(const s of all) if(s.voweled !== null && !s.held){
    s.spoken = T.spokenFor(s, s.voweled);
    if(T.isTitle(s)) s.full = T.pausal(s.voweled);
  }

  const jobs = [];
  for(const s of all){
    if(s.spoken === null) continue;
    jobs.push({ s, id: 'main', opt: T.voiceFor(s), text: s.spoken, lane: 'gemini' });
    if(s.full) jobs.push({ s, id: 'full', opt: {}, text: s.full, lane: 'gemini' });
  }
  for(const s of COMPARE) for(const n of NARRATORS) jobs.push({ s, id: n.id, opt: n.opt, text: s.spoken, lane: n.lane });

  const meta = { at: new Date().toISOString(), rows: {}, clips: {} };
  const voice = async ({ s, id, opt, text }) => {
    const t0 = Date.now();
    const res = await call(T.TTS.endpoint, JSON.stringify(T.ttsRequest(text, opt)), 120000);
    const j = parse(res.text);
    const clip = { secs: +((Date.now() - t0) / 1000).toFixed(1), retries: res.retries, error: null };
    if(!okStatus(res.status)) clip.error = T.googleError(res.status, j, res.text);
    else {
      const r = T.readTts(j);
      if(r.error) clip.error = r.error;
      else { clip.ms = r.ms; writeFileSync(join(OUT, `${pad(s.k)}-${id}.mp3`), r.bytes); }
    }
    if(id === 'main' || id === 'full') writeFileSync(join(OUT, `${pad(s.k)}${id === 'full' ? '-full' : ''}.txt`), text);
    meta.clips[`${s.k}-${id}`] = clip;
    console.log(`${clip.error ? '✗' : '✔'} tts ${s.k} · ${id} · ${clip.secs} s${clip.ms ? ` → ${(clip.ms / 1000).toFixed(1)} s audio` : ''}`
                + (clip.retries ? ` · ${clip.retries} retr${clip.retries > 1 ? 'ies' : 'y'}` : '') + (clip.error ? ' · ' + clip.error : ''));
  };
  /* حصّةُ Gemini نحو عشرة طلباتٍ في الدقيقة، وأصواتُ Cloud حصّتُها غيرُها ⇒ مساران معاً */
  const lane = async (list, width) => { for(let k = 0; k < list.length; k += width) await Promise.all(list.slice(k, k + width).map(voice)); };
  await Promise.all([lane(jobs.filter(j => j.lane === 'gemini'), 2), lane(jobs.filter(j => j.lane === 'cloud'), 3)]);
  for(const s of all) meta.rows[s.k] = { tries: s.tries, error: s.error || null, spoken: s.spoken !== null };
  writeFileSync(META, JSON.stringify(meta, null, 1));
}

/* ── ما يُبنى منه: ملفّاتُ `out3/` — والسجلُّ (`meta.json`) يقول أيُّها من التوليد الأخير وأيُّها أخطأ ── */
const meta = existsSync(META) ? JSON.parse(readFileSync(META, 'utf8')) : null;
const txt = name => existsSync(join(OUT, name)) ? readFileSync(join(OUT, name), 'utf8') : null;
for(const s of all){
  const m = meta?.rows?.[s.k];
  if(m){ s.tries = m.tries; s.error = m.error; }
  s.spoken = s.held || m?.spoken === false ? null : txt(`${pad(s.k)}.txt`);
  s.full = T.isTitle(s) ? txt(`${pad(s.k)}-full.txt`) : null;
}
function clipOf(s, id, label){
  const m = meta?.clips?.[`${s.k}-${id}`], f = join(OUT, `${pad(s.k)}-${id}.mp3`);
  if(m?.error) return { id, label, error: m.error };
  if(!existsSync(f) || (meta && !m)) return null;
  const bytes = readFileSync(f);
  return { id, label, ms: T.mp3Ms(new Uint8Array(bytes)), audio: bytes.toString('base64') };
}
function before(k){
  const f = join(PREV, `${pad(k)}-main.mp3`);
  if(!existsSync(f)) return null;
  const bytes = readFileSync(f);
  return { id: 'before', label: 'الجولة الثانية', ms: T.mp3Ms(new Uint8Array(bytes)), audio: bytes.toString('base64'),
           spoken: existsSync(join(PREV, `${pad(k)}.txt`)) ? readFileSync(join(PREV, `${pad(k)}.txt`), 'utf8') : '' };
}
/* والعنوانُ يُعرف بهيكل حروفه: مكتوبٌ «اجتماعيّة» بشدّةٍ لا «اجتماعية» — وبه انكسر بناءُ الصفحة أوّلَ مرّة */
const titleOf = word => rows.find(s => s.kind === 'cover' && T.skeleton(s.text).includes(T.skeleton(word)));
const FIXES = [
  { what: '«صيحة» عند الوقف — سُمعت تاءً موصولة', prev: 5, s: COMPARE[0], note: 'الهاءُ مكتوبةٌ في المنطوق مكانَ التاء الموقوف عليها، والعلمُ الساكن كذلك («عَنْتَرَهْ»).' },
  { what: '«اجتماعية» قبل الشرطة — سُمعت منوّنة', prev: 7, s: titleOf('اجتماعية'), note: 'الشرطةُ وقفٌ كالترقيم، والعنوانُ خفيفُ الضبط.' },
  { what: '«جاء» — سُمعت «جاع»', prev: 9, s: probe, note: 'المنطوقُ لم يتغيّر: «جَاءَ» مكتوبةٌ صحيحة، والخطأُ في نطق الصوت. والجملةُ نفسُها بخمسة أصواتٍ أخرى في ب.' },
  { what: '«ابدأ» — سُمعت بفتح الألف', prev: 10, s: titleOf('ابدأ'), note: 'همزةُ الوصل مكتوبةٌ بكسرتها في الابتداء: «اِبدأْ».' }
];

/* ── الصفحة ── */
const esc = x => String(x).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/"/g, '&quot;');
const sec = ms => (ms / 1000).toLocaleString('ar-EG', { maximumFractionDigits: 1 });
const player = c => !c ? '' : c.error ? `<p class="err">${esc(c.label)}: ${esc(c.error)}</p>`
  : `<div class="v"><b>${esc(c.label)}</b> <span>${sec(c.ms)} ث</span><audio controls preload="none" src="data:audio/mpeg;base64,${c.audio}"></audio></div>`;
const kindOf = s => s.kind === 'v' ? ' · بيت' : s.kind === 'cover' ? ' · العنوان' : T.isDialogue(s.text) ? ' · كلامٌ مباشر' : '';
const head = (s, spoken = s.spoken) => `<h3><span>${s.k}</span> ${esc(s.group)}${kindOf(s)}</h3>
  <p class="shown">${esc(s.text)}</p>
  ${spoken ? `<p class="spoken" title="ما أُرسل إلى الصوت">${esc(spoken)}</p>` : ''}
  <p class="meta">${s.held ? `<span class="held">ممسَكة: ${esc(s.held)}</span>` : `التشكيل: <b>${esc(s.source)}</b>${s.tries > 1 ? ' · بعد محاولةٍ ثانية' : ''}`}${s.error ? ` · <span class="err">${esc(s.error)}</span>` : ''}</p>`;

const shown = [];
const use = c => { if(c) shown.push(c); return c; };
const A = FIXES.map(f => {
  const b = before(f.prev), a = use(f.s && clipOf(f.s, 'main', 'الجولة الثالثة'));
  return `<section><h3>${esc(f.what)}</h3>
  <div class="pair"><div><p class="tag">قبل — الجولة الثانية</p>${b ? `<p class="spoken">${esc(b.spoken)}</p>` : ''}${player(b)}</div>
  <div><p class="tag">بعد — الجولة الثالثة</p>${f.s?.spoken ? `<p class="spoken">${esc(f.s.spoken)}</p>` : ''}${player(a)}</div></div>
  <p class="meta">${esc(f.note)}</p></section>`;
}).join('\n');
const B = COMPARE.map(s => `<section>${head(s)}
  <div class="grid">${[clipOf(s, 'main', mainLabel(s)), ...NARRATORS.map(n => clipOf(s, n.id, n.label))].map(c => player(use(c))).join('')}</div></section>`).join('\n');
const C = rows.filter(s => T.isTitle(s) && s.spoken).map(s => `<section>${head(s, null)}
  <div class="pair"><div><p class="tag">خفيفُ الضبط — المقترح</p><p class="spoken">${esc(s.spoken)}</p>${player(use(clipOf(s, 'main', mainLabel(s))))}</div>
  <div><p class="tag">ضبطٌ تامّ بالوقف</p>${s.full ? `<p class="spoken">${esc(s.full)}</p>` : ''}${player(use(clipOf(s, 'full', FULL_LABEL)))}</div></div></section>`).join('\n');
const D = rows.map(s => `<section${s.held ? ' class="off"' : ''}>${head(s)}${player(use(clipOf(s, 'main', mainLabel(s))))}</section>`).join('\n');

const html = `<!doctype html>
<html lang="ar" dir="rtl"><head><meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>تجربة الصوت — الجولة الثالثة</title>
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
  .tag { font-size:.85rem; color:var(--mute); margin:0 0 4px; font-weight:600; }
  .grid { display:grid; grid-template-columns:repeat(auto-fill, minmax(260px, 1fr)); gap:10px; }
  .pair { display:grid; grid-template-columns:repeat(auto-fit, minmax(280px, 1fr)); gap:14px; }
  .v { border:1px solid var(--line); border-radius:12px; padding:8px 10px; } .v b { font-size:.88rem; } .v span { color:var(--mute); font-size:.85rem; }
  audio { width:100%; margin-top:4px; }
</style></head><body><main>
<h1>تجربة الصوت — الجولة الثالثة</h1>
<div class="lead"><p>ما تغيّر بعد ملاحظاتك على الجولة الثانية:</p><ul>
  <li>التاءُ المربوطة عند الوقف تُكتب هاءً في المنطوق وحده: «صَيْحَهْ». والنصُّ الذي يراه الطالب كما هو.</li>
  <li>الشرطةُ «—» وقفٌ كعلامات الترقيم، فلا تنوينَ قبلها.</li>
  <li>همزةُ الوصل في أوّل الكلام وبعد الوقف تُكتب بحركتها: «اِبدأْ».</li>
  <li>العنوانُ يُشكَّل ثمّ يُخفَّف ضبطُه: تبقى الشدّةُ وسكونُ أواخر الكلمات وحركةُ همزة الوصل وحدها (ج يقارنه بالضبط التامّ).</li>
  <li>الكلامُ المباشر بصوت Algenib كما اخترت.</li>
  <li><b>والجملةُ التي فيها آيتان بين «﴿ ﴾» ممسَكةٌ بلا صوت</b> حتى تُبنى تلاوةُ الآيات المقتبسة بصوت الحصري.</li>
</ul>
<p><b>وعن سؤالك عن الصوت العربيّ الأصيل:</b> أصواتُ Gemini الثلاثون، ومنها Charon، صوتٌ واحدٌ لكلّ اللغات، ولا صوتَ عربيّاً بينها.
والأصواتُ العربيّة عند Google صنفان: <b>Chirp 3 HD</b> بالأسماء نفسِها على نموذجٍ خاصٍّ بالعربيّة (وفيه ضبطُ السرعة وإملاءُ نطق الكلمة)،
و<b>WaveNet</b> أربعةُ أصواتٍ صُنعت للعربيّة وحدها، وهي أقدمُ جيلاً. وفي ب تسمعها مع Charon على الجمل نفسِها والمنطوقِ نفسِه.</p></div>
<h2>أ · ما طلبتَ تصحيحه — قبلُ وبعدُ</h2>
${A}
<h2>ب · صوتُ الراوي — ستّةُ أصواتٍ على ثلاث جمل</h2>
<p class="lead">الجملةُ نفسُها والمنطوقُ نفسُه، والفرقُ في الصوت وحده. وGemini وحده يأخذ التوجيه (سرعةُ القراءة والتزامُ الحركات).</p>
${B}
<h2>ج · العنوان — ضبطٌ خفيف أم تامّ</h2>
${C}
<h2>د · النصُّ كلُّه بالمعتمد</h2>
<p class="lead">Charon للسرد، وAlgenib للكلام المباشر، والجملةُ ذاتُ الآيتين ممسَكة.</p>
${D}
</main></body></html>
`;
writeFileSync(join(DIR, 'round3.html'), html);
const files = new Set(shown.filter(c => !c.error).map(c => c.audio)).size, bad = shown.filter(c => c.error).length;
console.log(`\n${files} distinct clips on the page · ${bad} errors · held ${rows.filter(s => s.held).length} · ${join(DIR, 'round3.html')}`);
process.exit(bad ? 1 : 0);
