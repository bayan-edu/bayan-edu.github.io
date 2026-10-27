/* ══════════════════════════════════════════════════════════
   بيان — tools/tashkeel_eval.mjs · دقّةُ التشكيل الآليّ على نصوصٍ مشكولةٍ أصلاً (أداةٌ لا تُنشر)

   حكمُ المالك (٢٧ أكتوبر): «لا قراءةَ سليمةً للعربية بدون تشكيل في كلّ الأصوات» ⇒ النصوصُ غيرُ المشكولة (٨٥٪ من
   حروف العربيّة في المنصّة) لا صوتَ لها قبل تشكيلها. وقبل أن يُقرَّر مَن يشكّلها — المعلّمُ أم نموذجٌ يراجعه المعلّم —
   تُقاس دقّةُ النموذج على ما نعرف جوابَه: نصوصُ المنصّة المشكولة أصلاً يُنزع تشكيلُها، ويعيده Gemini، ويُقارَن بتشكيل
   الكتاب كلمةً كلمة.

   📐 المقياس:
      · الكلمةُ صحيحةٌ إن طابق تشكيلُها تشكيلَ الكتاب في كلّ حرفٍ شكّله الكتاب. وما لم يشكّله الكتاب لا يُحكم فيه (حرفُ
        المدّ · همزةُ الوصل). **وما تركه النموذجُ ممّا لا يغيّر النطقَ لا يُعدّ خطأً:** السكونُ، والحركةُ قبل حرف مدٍّ
        يجانسها — الفتحةُ قبل الألف، والكسرةُ قبل الياء، والضمّةُ قبل الواو، إذا خلا حرفُ المدّ من الحركة («حاتِمٌ» =
        «حَاتِمٌ»). 🔴 وهذا قِيس قبل أن يُكتب: Gemini 3.1 Pro يترك هذه الحركات اطّراداً، فنزل في نصّ حاتم إلى ٤٧٫٦٪ وما
        أخطأ نطقاً.
      · و«آخرُ الكلمة» آخرُ حرفٍ شكّله الكتابُ فيها — وفيه الإعرابُ غالباً، أو حركةُ الضمير إن اتّصل («عِرْضُهُ»).
      · وكلمةٌ غيّر النموذجُ حروفَها أو أسقطها «مغيَّرة» وحدها: لا خطأَ تشكيلٍ ولا صواب.
      · والتنوينُ قبل الألف وبعدها سواء («كتابًا» = «كتاباً»)، وترتيبُ الشدّة والحركة لا يُحسب، والألفُ الخنجريّة لا تُقاس.
   📐 ويُستثنى ما بين «﴿» و«﴾»: القرآنُ يُتلى بصوت الحصري ولا يُشكَّل آليّاً (⑥-ج) — ومعه سطرُ الصورة ورقمُ البيت «(١)».

   🔑 النصوصُ في `.tts-compare/tashkeel/<id>.txt` (يتجاهله `.gitignore` · طابقت القاعدةَ ببصمتها يومَ نُسخت)، والناتجُ
      `report.html` بجانبها، وخرجُ كلّ نموذجٍ في `out/<model>/<id>.txt` — فيُعاد التقريرُ بـ`--cached` بلا كلفة.
   🔑 الدخولُ بحساب الخدمة (`GOOGLE_SA_FILE` في `.env.local`)، والطلبُ إلى Vertex AI:
         node --env-file=.env.local tools/tashkeel_eval.mjs [--models=a,b] [--cached]
   ══════════════════════════════════════════════════════════ */
import { readFileSync, writeFileSync, mkdirSync, existsSync, readdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { post, parse, okStatus, saToken } from './google.mjs';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const DIR = join(ROOT, '.tts-compare', 'tashkeel');
const CACHED = process.argv.includes('--cached');
const arg = n => (process.argv.find(a => a.startsWith(`--${n}=`)) || '').slice(n.length + 3);

/* النموذجان — من قائمة Google الحيّة (قُرئت ٢٧ أكتوبر): أحدثُ Flash متاحٍ رسمياً، وأحدثُ Pro (معاينةٌ عامّة).
   وبلا `temperature`: توثيقُ Gemini 3 يوصي بإبقائها على أصلها. */
const MODELS = (arg('models') || 'gemini-3.8-flash,gemini-3.1-pro-preview').split(',').filter(Boolean);

const PROMPT = `شكّل النصّ العربيّ التالي تشكيلاً تامّاً كما تُشكَّل نصوص الكتب المدرسيّة المشكولة: ضع الحركة على كلّ حرفٍ متحرّك، والسكون على كلّ حرفٍ ساكن، والشدّة والتنوين حيث يجبان، واضبط أواخر الكلمات بحسب موقعها من الإعراب.
والأسطرُ التي فيها «۞» أبياتُ شعرٍ عموديّ، و«۞» يفصل بين شطري البيت.
لا تغيّر أيّ حرف، ولا علامة ترقيم، ولا ترتيب الكلمات، ولا تحذف شيئاً ولا تضف شيئاً، واحفظ الأسطر كما هي.
أعِد النصّ المشكول وحده، بلا مقدّمة ولا شرح ولا علامات تنسيق.`;

/* ═══════════ النصّ ═══════════ */

const MARK    = /[ً-ْٰ]/;           // التنوين والحركات والشدّة والسكون والألفُ الخنجريّة
const MARKS_G = /[ً-ْٰ]/g;
const LETTER  = /[ء-غف-يٱ-ۓ]/;
const SUKUN   = 'ْ';
const FIG     = /^\s*\[\s*(صورة|image|فيديو|video)\s*[:：][^\]\n]*\]\s*$/gim;
const OWN_NUM = /^\s*[(（]\s*[0-9٠-٩]+\s*[)）]\s*/gm;
const QURAN   = /﴿[^﴾]*﴾/g;

const prep = raw => raw.normalize('NFC').replace(/\r\n?/g, '\n').replace(FIG, '').replace(OWN_NUM, '')
                       .replace(QURAN, '…').replace(/\n{3,}/g, '\n\n').trim();
const strip = s => s.replace(MARKS_G, '');
const skel = t => [...t.normalize('NFC')].filter(c => LETTER.test(c)).join('');

/* الكلماتُ وفقراتُها — والفقرةُ ما فصله سطرٌ فارغ، كما في الكتاب */
function words(text){
  const out = [];
  text.split(/\n\s*\n/).forEach((para, p) =>
    para.split(/\s+/).filter(Boolean).forEach(t => out.push({ t, p, s: skel(t) })));
  return out;
}

/* حروفُ الكلمة وعلاماتُ كلٍّ منها [{ c, m }] — والتنوينُ بعد الألف يُردّ إلى ما قبلها («كتاباً» = «كتابًا») */
function letters(t){
  const s = t.normalize('NFC').replace(/([اى])ً/g, 'ً$1');
  const out = [];
  for(const c of s){
    if(LETTER.test(c)) out.push({ c, m: new Set() });
    else if(MARK.test(c) && c !== 'ٰ' && out.length) out[out.length - 1].m.add(c);
  }
  return out;
}

/* الحركةُ التي يدلّ عليها حرفُ المدّ بعدها — إذا خلا هو من الحركة في الكتاب (وإلّا فهو حرفٌ متحرّك لا مدّ) */
const MADD = { 'ا': 'َ', 'ى': 'َ', 'ي': 'ِ', 'و': 'ُ' };
function implied(next){
  if(!next || !MADD[next.c]) return null;
  return [...next.m].every(x => x === SUKUN) ? MADD[next.c] : null;
}

const eq = (a, b) => a.size === b.size && [...a].every(x => b.has(x));
function same(g, m, imp){
  if(eq(g, m)) return true;
  if(g.size === 1 && g.has(SUKUN) && m.size === 0) return true;          // سكونٌ تُرك — النطقُ واحد
  if(imp && g.has(imp) && !m.has(imp)){                                   // حركةٌ قبل مدٍّ يجانسها تُركت
    const rest = new Set([...g].filter(x => x !== imp));
    return eq(rest, m);
  }
  return false;
}

/* كلمتان هيكلُهما واحد ⇒ { scored, wrong, endOk } — endOk null: الكتابُ لم يشكّل منها حرفاً */
function judge(gt, md){
  const G = letters(gt), M = letters(md);
  let last = -1;
  G.forEach((x, i) => { if(x.m.size) last = i; });
  let scored = 0, wrong = 0, endOk = null;
  G.forEach((x, i) => {
    if(!x.m.size) return;
    scored++;
    const ok = same(x.m, M[i]?.m || new Set(), implied(G[i + 1]));
    if(!ok) wrong++;
    if(i === last) endOk = ok;
  });
  return { scored, wrong, endOk };
}

/* المحاذاة بالهيكل (أطولُ متتاليةٍ مشتركة) ⇒ ['=', i, j] · ['-', i] (أسقطها النموذج أو غيّر حروفها) · ['+', j] (زادها) */
function align(A, B){
  const n = A.length, m = B.length;
  const L = Array.from({ length: n + 1 }, () => new Uint16Array(m + 1));
  for(let i = n - 1; i >= 0; i--)
    for(let j = m - 1; j >= 0; j--)
      L[i][j] = A[i].s === B[j].s ? L[i + 1][j + 1] + 1 : Math.max(L[i + 1][j], L[i][j + 1]);
  const ops = [];
  let i = 0, j = 0;
  while(i < n && j < m){
    if(A[i].s === B[j].s){ ops.push(['=', i, j]); i++; j++; }
    else if(L[i + 1][j] >= L[i][j + 1]) ops.push(['-', i++]);
    else ops.push(['+', j++]);
  }
  while(i < n) ops.push(['-', i++]);
  while(j < m) ops.push(['+', j++]);
  return ops;
}

/* نصٌّ ونموذج ⇒ كلُّ كلمةٍ بحكمها، والأعدادُ */
function score(gtText, mdText){
  const G = words(gtText), M = words(mdText);
  const gi = G.map((w, k) => w.s ? k : -1).filter(k => k >= 0);
  const mi = M.map((w, k) => w.s ? k : -1).filter(k => k >= 0);
  const ops = align(gi.map(k => G[k]), mi.map(k => M[k]));
  const res = new Array(G.length).fill(null), ins = new Array(G.length + 1).fill(null).map(() => []);
  let next = 0;
  for(const op of ops){
    if(op[0] === '+'){ ins[gi[next] ?? G.length].push(M[mi[op[1]]].t); continue; }
    const k = gi[op[1]];
    next = op[1] + 1;
    if(op[0] === '-'){ res[k] = { v: 'chg' }; continue; }
    const md = M[mi[op[2]]].t;
    const j = judge(G[k].t, md);
    const v = !j.scored ? 'nj' : !j.wrong ? 'ok' : (j.wrong === 1 && j.endOk === false) ? 'end' : 'mid';
    res[k] = { v, md, ...j };
  }
  const n = { words: gi.length, scored: 0, ok: 0, endScored: 0, endOk: 0, chg: 0, ins: 0, letters: 0, wrongLetters: 0 };
  for(const k of gi){
    const r = res[k];
    if(r.v === 'chg'){ n.chg++; continue; }
    if(r.scored){ n.scored++; if(!r.wrong) n.ok++; n.letters += r.scored; n.wrongLetters += r.wrong; }
    if(r.endOk !== null){ n.endScored++; if(r.endOk) n.endOk++; }
  }
  n.ins = ins.reduce((s, a) => s + a.length, 0);
  return { G, res, ins, n };
}

/* ═══════════ النموذج ═══════════ */

async function diacritize(auth, model, text){
  const url = `https://aiplatform.googleapis.com/v1/projects/${auth.project}/locations/global/publishers/google/models/${model}:generateContent`;
  const body = { contents: [{ role: 'user', parts: [{ text: `${PROMPT}\n\n${text}` }] }] };
  const res = await post(url, { 'content-type': 'application/json', authorization: `Bearer ${auth.token}` },
                         JSON.stringify(body), 900000);
  const j = parse(res.text);
  if(!okStatus(res.status))
    throw new Error(`${res.status} ${j.error?.status || ''} ${j.error?.message || res.text.slice(0, 200)}`.replace(/\s+/g, ' ').trim());
  const c = j.candidates?.[0];
  const out = (c?.content?.parts || []).filter(p => !p.thought && typeof p.text === 'string').map(p => p.text).join('');
  if(!out.trim()) throw new Error(`empty answer (finishReason ${c?.finishReason || '?'})`);
  return { text: out.replace(/^\s*```[a-z]*\n?/i, '').replace(/\n?```\s*$/, '').trim(),
           finish: c?.finishReason || '', usage: j.usageMetadata || {} };
}

/* ═══════════ التقرير ═══════════ */

const esc = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/"/g, '&quot;');
const ar  = (x, d = 1) => Number(x).toLocaleString('ar-EG', { maximumFractionDigits: d });
const pct = (a, b) => b ? ar(100 * a / b) + '٪' : '—';
const add = (a, b) => { for(const k in b) a[k] = (a[k] || 0) + b[k]; return a; };

function textHtml(sc){
  const { G, res, ins } = sc;
  const paras = [];
  let cur = [], p = 0;
  const flush = () => { if(cur.length) paras.push(`<p>${cur.join(' ')}</p>`); cur = []; };
  G.forEach((w, k) => {
    if(w.p !== p){ flush(); p = w.p; }
    for(const t of ins[k]) cur.push(`<span class="w ins" title="زادها النموذج">+${esc(t)}</span>`);
    const r = res[k];
    if(!w.s){ cur.push(esc(w.t)); return; }
    if(r.v === 'ok') cur.push(`<span class="w">${esc(w.t)}</span>`);
    else if(r.v === 'nj') cur.push(`<span class="w nj">${esc(w.t)}</span>`);
    else if(r.v === 'chg') cur.push(`<span class="w chg" title="غيّر النموذج حروفها أو أسقطها"><b>${esc(w.t)}</b><i>—</i></span>`);
    else cur.push(`<span class="w ${r.v}"><b>${esc(w.t)}</b><i>${esc(r.md)}</i></span>`);
  });
  for(const t of ins[G.length]) cur.push(`<span class="w ins">+${esc(t)}</span>`);
  flush();
  return paras.join('\n');
}

function report(texts, runs){
  const rows = MODELS.map(m => {
    const n = runs[m].total, u = runs[m].usage;
    return `<tr><th>${esc(m)}</th><td>${ar(n.scored, 0)}</td><td><b>${pct(n.ok, n.scored)}</b></td>
      <td><b>${pct(n.endOk, n.endScored)}</b></td><td>${pct(n.wrongLetters, n.letters)}</td>
      <td>${ar(n.chg, 0)}</td><td>${ar(n.ins, 0)}</td>
      <td class="ltr">${ar(u.promptTokenCount || 0, 0)} · ${ar(u.candidatesTokenCount || 0, 0)} · ${ar(u.thoughtsTokenCount || 0, 0)}</td></tr>`;
  }).join('');
  const radios = MODELS.map((m, k) => `<input type="radio" name="m" id="m${k}"${k ? '' : ' checked'}>`).join('');
  const labels = MODELS.map((m, k) => `<label for="m${k}">${esc(m)}</label>`).join('');
  const tabs = MODELS.map((m, k) => `<section class="tab" id="t${k}">${texts.map(t => {
    const r = runs[m].texts[t.id];
    if(r.error) return `<h3>${esc(t.title)}</h3><p class="err">${esc(r.error)}</p>`;
    const n = r.sc.n;
    return `<h3>${esc(t.title)}</h3>
      <p class="meta">الكلمة كاملةً ${pct(n.ok, n.scored)} · آخر الكلمة ${pct(n.endOk, n.endScored)} · مغيَّرة ${ar(n.chg, 0)}
      · زائدة ${ar(n.ins, 0)}${r.finish && r.finish !== 'STOP' ? ` · <span class="err">انتهى بـ${esc(r.finish)}</span>` : ''}</p>
      <div class="txt">${textHtml(r.sc)}</div>`;
  }).join('\n')}</section>`).join('\n');
  const css = MODELS.map((m, k) => `#m${k}:checked ~ #t${k}{display:block}#m${k}:checked ~ .labels label[for=m${k}]{background:var(--ink);color:var(--bg)}`).join('');
  return `<!doctype html>
<html lang="ar" dir="rtl"><head><meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>دقّة التشكيل الآليّ</title>
<style>
  :root { --bg:#f7f6f2; --card:#fff; --ink:#1f2328; --mute:#5f6368; --line:#e3e1da;
          --mid:#fbd5d2; --end:#fdebb8; --chg:#e4e2dc; --ins:#d8e6f5; --err:#b3261e; }
  @media (prefers-color-scheme: dark) { :root { --bg:#16181c; --card:#1f2228; --ink:#e8e6e1; --mute:#a3a7ad; --line:#30343b;
          --mid:#5a2622; --end:#54431a; --chg:#3a3d44; --ins:#22374d; --err:#f2b8b5; } }
  body { margin:0; padding:24px 16px 56px; background:var(--bg); color:var(--ink); font:16px/1.7 "Segoe UI", Tahoma, sans-serif; }
  main { max-width:1100px; margin:0 auto; }
  h1 { font-size:1.4rem; margin:0 0 6px; } .lead, .meta { color:var(--mute); } .lead { margin:0 0 18px; }
  table { width:100%; border-collapse:collapse; background:var(--card); border:1px solid var(--line); border-radius:12px; overflow:hidden; margin:0 0 20px; }
  th, td { padding:8px 10px; border-bottom:1px solid var(--line); text-align:center; font-size:.92rem; }
  thead th { color:var(--mute); font-weight:600; } tbody th { direction:ltr; }
  .ltr { direction:ltr; } .key span { display:inline-block; padding:0 8px; border-radius:6px; margin-inline-end:8px; }
  input[name=m] { display:none; } .labels { display:flex; gap:8px; margin:8px 0 16px; flex-wrap:wrap; }
  .labels label { border:1px solid var(--line); border-radius:999px; padding:4px 14px; cursor:pointer; direction:ltr; }
  .tab { display:none; } ${css}
  h3 { margin:26px 0 2px; font-size:1.08rem; } .meta { margin:0 0 8px; font-size:.9rem; }
  .txt { background:var(--card); border:1px solid var(--line); border-radius:16px; padding:16px 18px; font-size:1.22rem; line-height:2.9; }
  .txt p { margin:0 0 12px; }
  .w.nj { color:var(--mute); }
  .w.mid, .w.end, .w.chg { display:inline-flex; flex-direction:column; align-items:center; vertical-align:top; line-height:1.55;
                           border-radius:6px; padding:0 4px; }
  .w.mid { background:var(--mid); } .w.end { background:var(--end); } .w.chg { background:var(--chg); outline:1px dashed var(--mute); }
  .w i { font-style:normal; font-size:.82em; } .w.ins { background:var(--ins); border-radius:6px; padding:0 4px; font-size:.85em; }
  .err { color:var(--err); }
</style></head><body><main>
<h1>دقّة التشكيل الآليّ</h1>
<p class="lead">نُزع تشكيلُ النصوص المشكولة، وأعاده النموذج، ثمّ قورن بتشكيل الكتاب كلمةً كلمة. الكلمةُ «كاملةً» إذا طابق تشكيلُها تشكيلَ
الكتاب في كلّ حرفٍ شكّله الكتاب. و«آخر الكلمة» آخرُ حرفٍ مشكولٍ فيها، وفيه الإعرابُ غالباً. والقرآنُ مستثنى.</p>
<p class="key"><span style="background:var(--mid)">خطأٌ داخل الكلمة</span><span style="background:var(--end)">خطأٌ في آخرها وحده</span><span style="background:var(--chg)">غيّر النموذج حروفها</span><span style="background:var(--ins)">زادها النموذج</span>
— وفي الكلمة الملوّنة: تشكيلُ الكتاب فوق، وتشكيلُ النموذج تحت.</p>
<table><thead><tr><th>النموذج</th><th>كلماتٌ حُكم فيها</th><th>الكلمة كاملةً</th><th>آخر الكلمة</th><th>خطأ الحروف</th><th>مغيَّرة</th><th>زائدة</th><th>الرموز: داخل · خارج · تفكير</th></tr></thead>
<tbody>${rows}</tbody></table>
${radios}<div class="labels">${labels}</div>
${tabs}
</main></body></html>
`;
}

/* ═══════════ التشغيل ═══════════ */

const ids = existsSync(DIR) ? readdirSync(DIR).filter(f => /^\d+\.txt$/.test(f)).map(f => f.replace('.txt', '')).sort() : [];
if(!ids.length){ console.error(`⛔ no texts in ${DIR}`); process.exit(2); }
const titles = existsSync(join(DIR, 'titles.json')) ? JSON.parse(readFileSync(join(DIR, 'titles.json'), 'utf8')) : {};
const texts = ids.map(id => {
  const gt = prep(readFileSync(join(DIR, `${id}.txt`), 'utf8'));
  return { id, title: titles[id] || id, gt, bare: strip(gt) };
});
console.log(`texts: ${texts.map(t => `${t.id}=${words(t.gt).filter(w => w.s).length}w`).join(' · ')} · models: ${MODELS.join(' · ')}`);

let auth = null;
const need = !CACHED || MODELS.some(m => texts.some(t => !existsSync(join(DIR, 'out', m, `${t.id}.txt`))));
if(need){
  if(!process.env.GOOGLE_SA_FILE){ console.error('⛔ GOOGLE_SA_FILE is missing — add it to .env.local, then: node --env-file=.env.local tools/tashkeel_eval.mjs'); process.exit(2); }
  try{ auth = await saToken(process.env.GOOGLE_SA_FILE); console.log('service account: token ok'); }
  catch(e){ console.error(`⛔ GOOGLE_SA_FILE: ${e.message}`); process.exit(2); }
}

const runs = Object.fromEntries(MODELS.map(m => [m, { texts: {}, total: {}, usage: {} }]));
const jobs = MODELS.flatMap(m => texts.map(t => ({ m, t })));
let failed = 0;
async function work(){
  for(let job; (job = jobs.shift());){
    const { m, t } = job, dir = join(DIR, 'out', m), file = join(dir, `${t.id}.txt`), meta = join(dir, `${t.id}.json`);
    const t0 = Date.now();
    try{
      let r;
      if(CACHED && existsSync(file)) r = { text: readFileSync(file, 'utf8'), ...(existsSync(meta) ? parse(readFileSync(meta, 'utf8')) : {}) };
      else {
        r = await diacritize(auth, m, t.bare);
        mkdirSync(dir, { recursive: true });
        writeFileSync(file, r.text);
        writeFileSync(meta, JSON.stringify({ finish: r.finish, usage: r.usage }));
      }
      const sc = score(t.gt, prep(r.text));
      runs[m].texts[t.id] = { sc, finish: r.finish || '' };
      add(runs[m].total, sc.n); add(runs[m].usage, r.usage || {});
      console.log(`✔ ${m} · ${t.id} · word ${pct(sc.n.ok, sc.n.scored)} · end ${pct(sc.n.endOk, sc.n.endScored)} · changed ${sc.n.chg}`
                  + ` · ${CACHED && existsSync(file) ? 'cached' : ((Date.now() - t0) / 1000).toFixed(0) + ' s'}`);
    }catch(e){
      failed++;
      runs[m].texts[t.id] = { error: e.message };
      console.log(`✗ ${m} · ${t.id} · ${e.message}`);
    }
  }
}
await Promise.all(Array.from({ length: 3 }, work));

for(const m of MODELS){
  const n = runs[m].total;
  console.log(`\n${m}: words ${n.scored || 0} · full-word ${pct(n.ok || 0, n.scored || 0)} · ending ${pct(n.endOk || 0, n.endScored || 0)}`
              + ` · letters wrong ${pct(n.wrongLetters || 0, n.letters || 0)} · changed ${n.chg || 0} · inserted ${n.ins || 0}`);
}
const html = join(DIR, 'report.html');
writeFileSync(html, report(texts, runs));
writeFileSync(join(DIR, 'results.json'), JSON.stringify(Object.fromEntries(MODELS.map(m => [m, { total: runs[m].total, usage: runs[m].usage }])), null, 2));
console.log(`\n${html}`);
process.exit(failed ? 1 : 0);
