/* ══════════════════════════════════════════════════════════
   بيان — audio_import.js  ملفُّ الصوت يُستورد مع نصّه وأسئلته: المنطقُ النقيّ (b221 · مختبر الصوتيّات، الخطوة ٤)

   الخطّةُ (٦ نوفمبر): «الاستيراد مع الملفّ الصوتيّ: سحبٌ ومطابقةٌ ورفعٌ عند الاعتماد، والنصُّ بنداءٍ ثانٍ، والحدودُ من
   الوقفات». وسؤالُ المالك قبلها: «وضع مثلا الملف الصوتي بجانب الملف الذي يحوي النص والاسئلة ورابط الملف الصوتي بحيث يتم
   رفع الملف الصوتي الى r2 ثم ضبط النص على الصوت». فهنا نصيبُ الحساب، نقيٌّ يُقاس في node (`tools/audio_import.test.mjs`)،
   والمتصفّحُ يبصم الملفَّ ويفكّه ويرفعه في `editor_import.js`.

   ① **المطابقة** (`planAudio`): `"media": "dialogue1.mp3"` في نصٍّ مشترك — أو `"audio"` في سؤال — اسمُ ملفٍّ لا رابطٌ ولا
      مفتاح ⇒ يُطابَق بملفٍّ سُحب مع ملفّ JSON باسمه (بلا فرقٍ بين الحروف الكبيرة والصغيرة). وما لم يُسحب يُقال قبل أيّ نداء،
      وما سُحب ولم يُشِر إليه شيءٌ تحذير. و`"transcript"` نصُّ المقطع سطراً سطراً («Tom: Hello») أو قائمةُ سطوره —
      **ولا يصل القاعدةَ مع الدفعة:** `import_quiz` لا تعرفه، فيُكتب بعد الاعتماد بنداءٍ ثانٍ (`save_passage_lines` · 200).
   ② **المفتاحُ من بصمة الملفّ لا من المصادفة** (`hashName`): الملفُّ نفسُه يعود بالمفتاح نفسِه ⇒ الدفعةُ المعادة «لا جديد»
      كما كانت، والرفعُ المعاد `412` على ملفٍّ هو هو. وفي شكل المفتاح الذي يقبله `r2-sign` (`KEY_RX`): «i» وسبعٌ في موضع
      النطاق، وستٌّ في موضع المصادفة — ثلاثَ عشرةَ خانةً بأساس ٣٦ (نحو ٦٧ بتّاً).
   ③ **والحدودُ من الوقفات اقتراحٌ يراجعه المعلّم** (`envelope` · `findPauses` · `alignStarts`): غلافُ الطاقة إطاراً إطاراً،
      والصمتُ بعتبةٍ من الملفّ نفسِه (بين ضجيجه وذروته)، ثمّ تُطابَق حدودُ السطور بالوقفات بالبرمجة الديناميكيّة: موضعُ كلّ
      حدٍّ المتوقَّعُ من طول ما قبله من النصّ، والوقفةُ الأطولُ أولى — فوقفةٌ قصيرةٌ داخل جملةٍ لا يُقطع بها، وسطرٌ لم تُوجد
      له وقفةٌ يبقى بلا موضع يُضبط بالنقر في «سطور المقطع». والسطرُ يبدأ قبيل كلامه (`LEAD_MS`) فلا يُقطع أوّلُ حرف.
   ══════════════════════════════════════════════════════════ */
import * as L from './audio_lines.js';

export const FRAME_MS = 20, MIN_PAUSE_MS = 200, LEAD_MS = 80;

/* ═══════════ ① المطابقة ═══════════ */

/* ما في الحقل: رابطٌ خارجيّ · مفتاحٌ في مخزن المنصّة · اسمُ ملفٍّ يُسحب · أو ما لا يُفهم. والمفتاحُ فيه «/» (`audio/…`)
   أو وسمُ مخزن (`r2:`)، واسمُ الملفّ بلا «/» وبامتدادٍ صوتيّ — والامتداداتُ تُمرَّر من media.js ولا تُنسخ هنا */
export function mediaRef(v, exts){
  const s = String(v ?? '').trim();
  if(!s) return { type: 'none' };
  if(/^https?:\/\//i.test(s)) return { type: 'url', value: s };
  if(s.includes('/') || /^[a-z]+:/.test(s)) return { type: 'key', value: s };
  const ext = s.includes('.') ? s.split('.').pop().toLowerCase() : '';
  return (exts || []).includes(ext) ? { type: 'file', name: s } : { type: 'bad', value: s };
}

/* نصُّ المقطع بأشكاله الثلاثة: نصٌّ بأسطره · قائمةُ أسطر · قائمةُ سطورٍ بمواضعها ({ speaker, text, start_ms, end_ms }) —
   والثالثُ ما يُكتب لو صُدِّر يوماً، فيعود بمواضعه. ⇒ { lines, error } بصيغة audio_lines (`start` · `end`) */
export function transcriptLines(t){
  if(t == null || t === '') return { lines: [], error: null };
  if(typeof t === 'string') return { lines: L.parseScript(t), error: null };
  if(Array.isArray(t) && t.every(x => typeof x === 'string')) return { lines: L.parseScript(t.join('\n')), error: null };
  if(Array.isArray(t) && t.every(x => x && typeof x === 'object' && !Array.isArray(x))){
    const ms = v => v == null || v === '' ? null : Number(v);
    return { lines: t.map(x => ({ speaker: String(x.speaker ?? '').replace(/\s+/g, ' ').trim() || null,
                                  text: String(x.text ?? '').replace(/\s+/g, ' ').trim(),
                                  start: ms(x.start_ms ?? x.start), end: ms(x.end_ms ?? x.end) })), error: null };
  }
  return { lines: [], error: 'نص المقطع (transcript) نصٌّ بأسطره أو قائمة سطور' };
}

/* الدفعةُ وما سُحب معها ⇒ { payload, uses, errors, warns }
   · `payload` نسخةٌ تُرسل إلى القاعدة: بلا `transcript`، واسمُ الملفّ يبقى مكانَه حتى يُبدَّل بمفتاحه (`withKeys`)
   · `uses` كلُّ ملفٍّ أو مفتاحٍ له سطور: { ref, name?, key?, lines, timed } — وما سُحب بلا سطورٍ يُرفع وحده
   · `names` أسماءُ ما سُحب، و`exts` امتداداتُ الصوت المقبولة */
export function planAudio(parsed, names, exts){
  const out = { payload: null, uses: [], files: [], errors: [], warns: [] };
  if(!parsed || typeof parsed !== 'object' || Array.isArray(parsed)){ out.payload = parsed; return out; }
  const have = new Map([...(names || [])].map(n => [String(n).toLowerCase(), n]));
  const used = new Set();
  const payload = out.payload = JSON.parse(JSON.stringify(parsed));
  const seen = new Map();                                   // اسمُ الملفّ ⇒ سطورُه — نصّان لملفٍّ واحد بسطرين مختلفين يُردّان

  const take = (where, v) => {
    const r = mediaRef(v, exts);
    if(r.type === 'bad')
      out.errors.push(`${where}: «${r.value}» ليس رابطاً ولا مفتاحاً ولا اسم ملفٍّ صوتيّ (${(exts || []).join(' · ')})`);
    if(r.type !== 'file') return r;
    const k = r.name.toLowerCase();
    if(!have.has(k)){ out.errors.push(`${where}: الملف «${r.name}» لم يُسحب مع ملف JSON`); return { ...r, missing: true }; }
    used.add(k);
    if(!out.files.includes(k)) out.files.push(k);
    return { ...r, name: k };
  };

  (Array.isArray(payload.passages) ? payload.passages : []).forEach((p, i) => {
    if(!p || typeof p !== 'object') return;
    const ref = p.ref ?? p.id ?? `#${L.ARD(i + 1)}`, where = `النصّ ${ref}`;
    const r = take(where, p.media);
    const t = transcriptLines(p.transcript);
    delete p.transcript;
    if(r.type === 'file' && !r.missing){ p.media = r.name; p.kind = 'audio'; }
    if(t.error){ out.errors.push(`${where}: ${t.error}`); return; }
    if(!t.lines.length) return;
    const why = L.problem(t.lines);
    if(why){ out.errors.push(`${where}: ${why}`); return; }
    if(r.type === 'url'){ out.errors.push(`${where}: نص المقطع لملفٍّ في المنصة أو ملفٍّ يُسحب، وهذا رابطٌ خارجي`); return; }
    if(r.type === 'none'){ out.errors.push(`${where}: نص المقطع بلا مقطع — والمقطع في media`); return; }
    if(r.type !== 'file' && r.type !== 'key') return;
    /* مفتاحٌ قائمٌ بنوعٍ صريحٍ غيرِ الصوت: `save_passage` تحفظه كما كُتب، ثمّ تردّ `passage_lines_problem` سطورَه بعد
       الاعتماد — فيُقال هنا قبل أيّ نداء، وبعبارتها نفسِها (والملفُّ المسحوب صوتٌ بامتداده، فنوعُه «audio» أعلاه) */
    if(r.type === 'key' && ['video', 'image'].includes(String(p.kind ?? '').trim().toLowerCase())){
      out.errors.push(`${where}: هذا النص ليس مقطعاً صوتياً، والسطور تُكتب للمقاطع وحدها`); return; }
    if(r.missing) return;
    const id = r.type === 'file' ? 'f:' + r.name : 'k:' + r.value;
    const sig = JSON.stringify(L.payload(t.lines));
    if(seen.has(id) && seen.get(id) !== sig){ out.errors.push(`${where}: الملف نفسه لنصّين بسطورٍ مختلفة`); return; }
    if(seen.has(id)) return;
    seen.set(id, sig);
    out.uses.push({ ref, ...(r.type === 'file' ? { name: r.name } : { key: r.value }), lines: t.lines,
                    timed: t.lines.some(l => l.start != null) });
  });

  (Array.isArray(payload.questions) ? payload.questions : []).forEach((q, i) => {
    if(!q || typeof q !== 'object' || q.audio == null || q.audio === '') return;
    const r = take(`صوت السؤال ${L.ARD(i + 1)}`, q.audio);
    if(r.type === 'file' && !r.missing) q.audio = r.name;
  });

  for(const [k, n] of have) if(!used.has(k)) out.warns.push(`سُحب «${n}» ولا يشير إليه نصٌّ ولا سؤال، فلا يُرفع`);
  return out;
}

/* الأسماءُ بمفاتيحها بعد البصمة — في نسخةٍ جديدة، فالجافّةُ والاعتمادُ يرسلان الحمولةَ نفسَها */
export function withKeys(payload, keys){
  const p = JSON.parse(JSON.stringify(payload));
  const swap = v => keys[String(v ?? '').toLowerCase()] ?? v;
  for(const x of Array.isArray(p.passages) ? p.passages : []) if(x && x.media != null) x.media = swap(x.media);
  for(const x of Array.isArray(p.questions) ? p.questions : []) if(x && x.audio != null) x.audio = swap(x.audio);
  return p;
}

/* ═══════════ ② المفتاحُ من البصمة ═══════════
   ٧٢ بتّاً من SHA-256 (١٨ خانةً ستّ عشريّة) بأساس ٣٦ ⇒ «i» وسبع · «-» · ستّ — في موضعَي `KEY_RX` بحرفهما */
export function hashName(hex){
  const h = String(hex || '').replace(/[^0-9a-f]/gi, '').slice(0, 18).padEnd(18, '0');
  const s = BigInt('0x' + h).toString(36).padStart(13, '0').slice(-13);
  return `i${s.slice(0, 7)}-${s.slice(7)}`;
}

/* ═══════════ ③ الحدودُ من الوقفات ═══════════ */

/* غلافُ الطاقة: جذرُ متوسّط المربّعات لكلّ إطار */
export function envelope(samples, sampleRate, frameMs = FRAME_MS){
  const n = Math.max(1, Math.round(sampleRate * frameMs / 1000));
  const frames = Math.floor((samples?.length || 0) / n);
  const env = new Float32Array(frames);
  for(let f = 0; f < frames; f++){
    let s = 0;
    for(let i = f * n, e = i + n; i < e; i++){ const v = samples[i]; s += v * v; }
    env[f] = Math.sqrt(s / n);
  }
  return env;
}

/* الكلامُ والوقفاتُ داخله ⇒ { speech: [بدء، نهاية] · pauses: [{ start, end }] · threshold } بالمللي ثانية.
   والعتبةُ من الملفّ: بين الضجيج (العُشر الأدنى) والذروة (٩٨٪) — لا رقمٌ ثابت يصلح لتسجيلٍ ويخطئ آخر.
   🔴 ولها قاعٌ مطلق (−٨٠ د.ب): كان الملفُّ الصامتُ كلُّه يُقرأ كلاماً كلَّه — عتبتُه تحت صمته الرقميّ (قيس) —
      وذروةٌ تحت −٧٠ لا كلامَ فيها */
export function findPauses(env, frameMs = FRAME_MS, { minMs = MIN_PAUSE_MS } = {}){
  const n = env?.length || 0;
  if(!n) return { speech: null, pauses: [], threshold: null };
  const db = new Float32Array(n);
  for(let i = 0; i < n; i++) db[i] = 20 * Math.log10(env[i] + 1e-9);
  const sorted = Float32Array.from(db).sort();
  const at = p => sorted[Math.min(n - 1, Math.max(0, Math.round(p * (n - 1))))];
  const peak = at(0.98), floor = at(0.1);
  const threshold = Math.max(-80, Math.min(peak - 15, Math.max(peak - 40, floor + 8)));
  if(peak <= -70) return { speech: null, pauses: [], threshold };
  const loud = i => db[i] > threshold;
  let first = -1, last = -1;
  for(let i = 0; i < n; i++) if(loud(i)){ first = i; break; }
  if(first < 0) return { speech: null, pauses: [], threshold };
  for(let i = n - 1; i >= 0; i--) if(loud(i)){ last = i; break; }
  const pauses = [];
  let run = -1;
  for(let i = first; i <= last; i++){
    if(!loud(i)){ if(run < 0) run = i; continue; }
    if(run >= 0 && (i - run) * frameMs >= minMs) pauses.push({ start: run * frameMs, end: i * frameMs });
    run = -1;
  }
  return { speech: [first * frameMs, (last + 1) * frameMs], pauses, threshold };
}

/* بدايةُ كلّ سطر — أو null لسطرٍ لم تُوجد له وقفة. الأوّلُ قبيل أوّل الكلام، وكلُّ حدٍّ بعده وقفةٌ تُختار بالبرمجة
   الديناميكيّة: كلفةُ الوقفة بُعدُها عن الموضع المتوقَّع من طول النصّ (بمقياس متوسّط السطر) وقِصَرُها، وحدٌّ بلا وقفةٍ
   كلفتُه ثابتة (`unmatched`)، والوقفةُ تُتخطّى بلا كلفة — والحدودُ تتصاعد بالبناء، فما يُكتب يقبله حارسُ القاعدة */
export function alignStarts(lines, found, { lead = LEAD_MS, unmatched = 1.5, beta = 0.3 } = {}){
  const n = lines?.length || 0;
  const out = new Array(n).fill(null);
  if(!n || !found?.speech) return out;
  const [s0, s1] = found.speech;
  out[0] = Math.max(0, Math.round(s0 - lead));
  if(n === 1) return out;
  const span = Math.max(1, s1 - s0), avg = span / n;
  const w = lines.map(l => [...String(l.text ?? '')].length + 8);
  const W = w.reduce((a, b) => a + b, 0);
  const exp = [];
  for(let i = 0, acc = 0; i < n - 1; i++){ acc += w[i]; exp.push(s0 + span * acc / W); }
  const P = (found.pauses || []).filter(p => p.start > s0 && p.end < s1);
  const m = P.length, B = n - 1, M = m + 1;
  const cost = (i, j) => Math.abs(P[j].end - exp[i]) / avg + beta / ((P[j].end - P[j].start) / 1000 + 0.1);
  const dp = new Float64Array((B + 1) * M), how = new Uint8Array((B + 1) * M);   // ١ تخطّي وقفة · ٢ حدٌّ بوقفة · ٣ حدٌّ بلا وقفة
  for(let i = 1; i <= B; i++){
    dp[i * M] = i * unmatched; how[i * M] = 3;
    for(let j = 1; j <= m; j++){
      let best = dp[i * M + j - 1], h = 1;
      const a = dp[(i - 1) * M + j - 1] + cost(i - 1, j - 1);
      if(a < best){ best = a; h = 2; }
      const b = dp[(i - 1) * M + j] + unmatched;
      if(b < best){ best = b; h = 3; }
      dp[i * M + j] = best; how[i * M + j] = h;
    }
  }
  for(let i = B, j = m; i > 0;){
    const h = how[i * M + j];
    if(h === 1){ j--; continue; }
    if(h === 2){ const p = P[j - 1]; out[i] = Math.round(Math.max(p.start, p.end - lead)); j--; }
    i--;
  }
  return out;
}

/* السطورُ بمواضعها المقترحة — وما حمل مواضعَه من الملفّ لا يُمسّ (مَن كتبها أعلمُ من الوقفات) */
export function timedLines(lines, found){
  if(!lines?.length || lines.some(l => l.start != null)) return lines || [];
  const st = alignStarts(lines, found);
  return lines.map((l, k) => ({ ...l, start: st[k], end: null }));
}
