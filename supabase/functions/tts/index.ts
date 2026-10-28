/* ══════════════════════════════════════════════════════════
   بيان — الدالّة الطرفيّة tts
   صوتُ جمل النصّ: تشكيلٌ فوقفٌ فصوتٌ إلى R2، ثمّ `save_voice`. والحجّةُ كاملةً في رأس core.js، وهنا الغلافُ وحده:
   CORS · الحارس · الأسرار · Google · R2 · القاعدة.

   📞 النداء (من لوحة الصوت · الخطوة ٦):
        db.functions.invoke('tts', { body: { item, sentences: [{ text, kind?, spoken?, voice?, lead?, tone? }], context? } })
      ⇒ { results: [{ sha, state: 'ok', audio, spoken, text, ms, voice, source, ref? }
                  | { sha, state: 'held', reason } | { sha, state: 'error', error }] }   — بترتيب الجمل
      🆕 b207 · والجزءُ «﴿…﴾» وحده آيةٌ مقتبسة: تُعرف بنصّ المصحف وتُقصّ من تلاوة الحصري بلا Google (`voice: 'husary'` · `ref` مداها)،
      وما ليس آيةً يُقرأ بلا قوسيه كسائر النثر، وما بينهما يُمسَك بسببه (`core.js` · «الآيةُ المقتبسة في النثر»).
      خمسُ جملٍ على الأكثر، والردُّ قبل ١٥٠ ثانية (حدُّ Supabase): ما لم يتمّ في وقته يعود بسببه ويُطلب ثانية، وما تمّ محفوظ.
      و`text` المنطوقُ نفسُه — تعرضه اللوحةُ ساعةَ التوليد، ومكانُه الدائم `spoken` في R2 بجوار صوته (189 ②).

   🔑 الأسرارُ في Supabase (Edge Functions ← Secrets) لا في المستودع:
        GOOGLE_SA_JSON — مفتاحُ حساب الخدمة بنصّه (JSON): يضعه المالكُ بيده، ولا يُطبع منه شيء
        R2_ACCOUNT_ID · R2_ACCESS_KEY_ID · R2_SECRET_ACCESS_KEY · R2_BUCKET — أسرارُ `r2-sign` نفسُها
   🔒 الحارس: `voice_problem(item)` بهويّة المستدعي (ممنوحٌ لـ`authenticated` في `190`) — بعد فحص شكل الطلب، وقبل الأسرار وأيِّ
      نداءٍ لـGoogle: فلا يُدفع عن طالبٍ ولا زائر، والزائرُ تردّه القاعدةُ قبل أن يُسأل. و`save_voice` يسأله ثانيةً عند الحفظ.
      (وكما في `r2-sign`: `verify_jwt` لا يكفي وحده — المفتاحُ العامّ يبلغ الكود بدور `anon`.)
   ══════════════════════════════════════════════════════════ */
// deno-lint-ignore-file no-explicit-any
import { AwsClient } from 'npm:aws4fetch@1.0.20';
import { createClient } from 'npm:@supabase/supabase-js@2';
import * as T from './core.js';

/* الأصلان اللذان تُخدَم منهما الواجهة — والنطاقُ الرسميّ أوّلاً (كـ`r2-sign`). */
const ORIGINS = ['https://bayanclass.com', 'https://www.bayanclass.com', 'https://bayan-edu.github.io'];

const cors = (req: Request) => {
  const o = req.headers.get('Origin') ?? '';
  return {
    'Access-Control-Allow-Origin': ORIGINS.includes(o) ? o : ORIGINS[0],
    'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Vary': 'Origin',
  };
};

const reply = (req: Request, status: number, body: unknown) =>
  new Response(JSON.stringify(body), {
    status, headers: { ...cors(req), 'Content-Type': 'application/json; charset=utf-8' } });

/* مهلةُ الطلب: Supabase يقطع عند ١٥٠ ثانية، فيُترك عشرٌ للحفظ والردّ. */
const BUDGET = 140_000;
const sleep = (ms: number) => new Promise(r => setTimeout(r, ms));
const ok = (status: number) => status >= 200 && status < 300;

/* رمزُ Google لساعة، يبقى ما بقيت الدالّةُ دافئة — فلا يُوقَّع JWT لكلّ طلب. */
let google: { token: string, exp: number } | null = null;
async function googleToken(sa: any): Promise<string> {
  if (google && google.exp > Date.now() + 60_000) return google.token;
  const res = await fetch(T.TOKEN_URL, { method: 'POST', headers: { 'content-type': 'application/x-www-form-urlencoded' },
                                         body: T.tokenBody(await T.signJwt(sa)) });
  const j = await res.json().catch(() => ({}));
  if (!ok(res.status) || !j.access_token) throw new Error(T.googleError(res.status, j));
  google = { token: j.access_token, exp: Date.now() + (Number(j.expires_in) || 3600) * 1000 };
  return google.token;
}

/* نداءُ Google والعابرُ يُعاد (429 · 503 — `retryable` · `backoffMs`) ما دام في المهلة متّسع؛ وانقطاعُ الشبكة يُعاد مرّتين.
   ⇒ { status, json } أو { error } حين تضيق المهلة أو لا يُبلَغ Google. */
async function call(url: string, token: string, body: string, deadline: number): Promise<any> {
  for (let attempt = 0, dropped = 0; ; attempt++) {
    const left = deadline - Date.now();
    if (left < 5_000) return { error: 'انتهت مهلة الطلب قبل هذه الجملة، فيُعاد طلبها' };
    let res: Response;
    try {
      res = await fetch(url, { method: 'POST', body, signal: AbortSignal.timeout(Math.min(left, 90_000)),
                               headers: { 'content-type': 'application/json', authorization: `Bearer ${token}` } });
    } catch {
      if (++dropped <= 2) { attempt--; await sleep(1_000); continue; }
      return { error: 'تعذّر الوصول إلى Google' };
    }
    const json = await res.json().catch(() => null);
    if (!T.retryable(res.status) || attempt === 3) return { status: res.status, json };
    const wait = T.backoffMs(attempt, res.headers.get('retry-after'));
    if (Date.now() + wait > deadline - 10_000) return { status: res.status, json };
    await sleep(wait);
  }
}

/* 🆕 b207 · ملفّاتُ المصحف من المخزن بعنوانه العامّ — بلا مفتاح: منشورةٌ للطالب أصلاً (`T.MEDIA`) */
async function media(path: string): Promise<Uint8Array> {
  const res = await fetch(T.MEDIA + path, { signal: AbortSignal.timeout(30_000) });
  if (!ok(res.status)) throw new Error(`${res.status} · ${path}`);
  return new Uint8Array(await res.arrayBuffer());
}
/* وفهرسُ المصحف مرّةً ما بقيت الدالّةُ دافئة: نصُّ Tanzil وتوقيتُ quran-align (`T.QURAN`) — وغيابُهما صاخبٌ باسمهما */
let quranIdx: any = null;
async function quran(): Promise<any> {
  if (quranIdx) return quranIdx;
  try {
    const [text, timing] = await Promise.all([media(T.QURAN.text), media(T.QURAN.timing)]);
    const dec = new TextDecoder();
    quranIdx = T.quranIndex(dec.decode(text), JSON.parse(dec.decode(timing)));
  } catch (e) { throw new Error(`بيانات المصحف لم تُقرأ من المخزن (${(e as Error).message})`); }
  return quranIdx;
}
/* الآيةُ المقتبسة: ما كان آيةً قُصّ من تلاوة الحصري (`quoteSpan` · `mp3Cut`) · وما ليس آيةً يُقرأ بلا قوسيه كسائر النثر (`say`) ·
   وما بينهما يُمسَك بسببه */
async function recite(q: any, r: any) {
  const hit = T.findQuote(q, r.s.text), verdict = T.quoteVerdict(hit.score);
  if (verdict === 'prose') { r.say = { ...r.s, text: T.quoteInner(r.s.text) }; r.source = T.tashkeelSource(r.say); return; }
  if (verdict === 'unsure') { r.held = T.quoteUnsure(hit); return; }
  const spans = hit.ranges.map((x: any) => T.quoteSpan(q, x));
  let files: Uint8Array[];
  try { files = await Promise.all(spans.map((x: any) => media(T.QURAN.ayah(x.s, x.a)))); }
  catch { r.error = 'تعذّر جلب تلاوة الآية من المخزن'; return; }
  const cuts = spans.map((x: any, k: number) => T.mp3Cut(files[k], x.start, x.end));
  if (cuts.some((c: any) => !c)) { r.error = 'تعذّر قصّ الآية من ملفّ تلاوتها'; return; }
  const bytes = new Uint8Array(cuts.reduce((n: number, c: any) => n + c.bytes.length, 0));
  let at = 0;
  for (const c of cuts) { bytes.set(c.bytes, at); at += c.bytes.length; }
  Object.assign(r, { quran: true, spans, bytes, ms: cuts.reduce((n: number, c: any) => n + c.ms, 0), source: 'المصحف',
                     spoken: spans.map((x: any) => x.words).join(' '), voice: { id: 'husary', label: T.quoteLabel(spans) } });
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response(null, { status: 204, headers: cors(req) });
  if (req.method !== 'POST') return reply(req, 405, { error: 'POST وحده' });
  const deadline = Date.now() + BUDGET;

  /* شكلُ الطلب أوّلاً — لا سرَّ فيه — لأنّ الحارسَ يسأل عن النصّ بعينه */
  let body: unknown;
  try { body = await req.json(); } catch { return reply(req, 400, { error: 'جسمُ الطلب ليس JSON' }); }
  const c: any = T.checkRequest(body);
  if ('error' in c) return reply(req, c.status, { error: c.error });

  /* ثمّ الحارس بهويّة المستدعي — قبل الأسرار وقبل أيّ كلفة */
  const db = createClient(Deno.env.get('SUPABASE_URL')!, Deno.env.get('SUPABASE_ANON_KEY')!, {
    global: { headers: { Authorization: req.headers.get('Authorization') ?? '' } },
    auth:   { persistSession: false, autoRefreshToken: false },
  });
  const { data: problem, error: denied } = await db.rpc('voice_problem', { p_item: c.item });
  if (denied) return reply(req, 403, { error: 'تعذّر التحقّق من الصلاحية', code: denied.code });
  if (problem) return reply(req, 403, { error: problem });

  /* الجملُ بترتيبها: بصمتُها · ما يُمسَك منها · من أين تشكيلُها. والمكرَّرةُ في الدفعة تُولَّد مرّةً وتأخذ أختُها نتيجتَها */
  const rows: any[] = await Promise.all(c.sentences.map(async (s: any) =>
    ({ s, say: s, sha: await T.sentenceSha(s.text), held: T.held(s), quote: T.isQuote(s.text), source: T.tashkeelSource(s),
       voweled: null, error: null })));
  const first = new Map<string, any>();
  for (const r of rows) { if (first.has(r.s.text)) r.twin = first.get(r.s.text); else first.set(r.s.text, r); }
  const work = rows.filter(r => !r.held && !r.twin);

  if (work.length) {
    const r2 = { accountId: Deno.env.get('R2_ACCOUNT_ID'), accessKeyId: Deno.env.get('R2_ACCESS_KEY_ID'),
                 secretAccessKey: Deno.env.get('R2_SECRET_ACCESS_KEY'), bucket: Deno.env.get('R2_BUCKET') || 'bayan-media' };
    /* صاخبٌ لا صامت: دالّةٌ بلا أسرارها تقول ذلك باسمه — للمأذون وحده */
    if (!r2.accountId || !r2.accessKeyId || !r2.secretAccessKey) return reply(req, 500, { error: 'أسرارُ R2 لم تُضبط في الدالّة' });

    /* ② الآياتُ المقتبسة أوّلاً — بلا Google ولا سرّه (🆕 b207) */
    const quotes = work.filter(r => r.quote);
    if (quotes.length) {
      let q: any = null;
      try { q = await quran(); } catch (e) { for (const r of quotes) r.error = (e as Error).message; }
      if (q) await Promise.all(quotes.map(r => recite(q, r)));
    }

    /* ③ والنثرُ بصوته المولَّد — وما خرج من الأقواس نثراً معه (`say`) */
    const prose = work.filter(r => !r.quran && !r.held && !r.error);
    if (prose.length) {
      const sa = T.readServiceAccount(Deno.env.get('GOOGLE_SA_JSON') ?? '');
      if (!sa) return reply(req, 500, { error: 'مفتاحُ Google لم يُضبط في الدالّة (GOOGLE_SA_JSON)' });
      let token: string;
      try { token = await googleToken(sa); }
      catch (e) { return reply(req, 502, { error: `تعذّر الدخول إلى Google: ${(e as Error).message}` }); }

      /* التشكيل — دفعةً واحدةً لما يحتاجه، ومحاولةٌ ثانيةٌ لما غيّر النموذجُ حروفَه. وتشكيلُ المعلّم والمؤلّف كما هو */
      for (const r of prose) if (r.source !== T.TASHKEEL_MODEL) r.voweled = r.say.spoken ?? r.say.text;
      for (let attempt = 1; attempt <= 2; attempt++) {
        const pending = prose.filter(r => r.voweled === null && !r.error);
        if (!pending.length) break;
        const res = await call(T.tashkeelUrl(sa.project_id), token, JSON.stringify(T.tashkeelRequest(pending.map(r => r.say), c.context)), deadline);
        const t: any = res.error ? { error: res.error }
          : ok(res.status) ? T.readTashkeel(res.json, pending.length) : { error: T.googleError(res.status, res.json) };
        if ('error' in t) {
          if (attempt === 2 || res.error) pending.forEach(r => { r.error = res.error ?? `تعذّر التشكيل: ${t.error}`; });
          continue;
        }
        pending.forEach((r, k) => {
          if (T.sameLetters(r.say.text, t.list[k])) r.voweled = t.list[k];
          else if (attempt === 2) r.error = 'غيّر التشكيلُ حروفَ الجملة مرّتين، فلم يُولَّد صوتها';
        });
      }

      /* الوقفُ والصوت — Gemini اثنان معاً (حصّتُه نحو عشرةٍ في الدقيقة)، وChirp أربعة */
      const ready = prose.filter(r => !r.error && r.voweled !== null);
      for (const r of ready) { r.spoken = T.spokenFor(r.say, r.voweled); r.voice = T.voiceFor(r.say); }
      const speak = async (r: any) => {
        const res = await call(T.TTS.endpoint, token, JSON.stringify(T.ttsRequest(r.spoken, r.voice)), deadline);
        if (res.error) { r.error = res.error; return; }
        if (!ok(res.status)) { r.error = `تعذّر توليد الصوت: ${T.googleError(res.status, res.json)}`; return; }
        const a: any = T.readTts(res.json);
        if ('error' in a) r.error = a.error; else Object.assign(r, { bytes: a.bytes, ms: a.ms });
      };
      const lane = async (list: any[], width: number) => {
        for (let k = 0; k < list.length; k += width) await Promise.all(list.slice(k, k + width).map(speak));
      };
      await Promise.all([lane(ready.filter(r => 'prompt' in r.voice), 2), lane(ready.filter(r => !('prompt' in r.voice)), 4)]);
    }

    /* ④ الملفّان إلى R2 ثمّ الصفُّ في القاعدة بهويّة المستدعي. واسمُ الملفّ بإصداره فلا يُطمَس قائم (`If-None-Match`)، ويُخزَّن
       في الذاكرة أبداً (`immutable`): الصوتُ المعاد توليدُه ملفٌّ جديد (189 ③) */
    const aws = new AwsClient({ accessKeyId: r2.accessKeyId, secretAccessKey: r2.secretAccessKey, service: 's3', region: 'auto' });
    const rev = T.revision();
    const put = (path: string, data: Uint8Array, type: string) => aws.fetch(T.r2Url(r2, path), { method: 'PUT', body: data,
      headers: { 'Content-Type': type, 'Cache-Control': 'public, max-age=31536000, immutable', 'If-None-Match': '*' } });
    /* والآيةُ المقصوصة كذلك: منطوقُها ما تُلي بحرفه من المصحف، واسمُ صوتها مرجعُها (`quoteLabel`) */
    await Promise.all(work.filter(r => r.bytes && !r.error).map(async (r: any) => {
      const k = T.clipKeys(c.item, r.sha, rev);
      try {
        const [a, t] = await Promise.all([put(k.audioPath, r.bytes, 'audio/mpeg'),
                                          put(k.spokenPath, new TextEncoder().encode(r.spoken), 'text/plain; charset=utf-8')]);
        if (!ok(a.status) || !ok(t.status)) { r.error = `تعذّر حفظ الملف في R2 (${ok(a.status) ? t.status : a.status})`; return; }
      } catch { r.error = 'تعذّر الوصول إلى R2'; return; }
      const { data, error } = await db.rpc('save_voice', { p_item: c.item, p_sentence: r.s.text, p_audio: k.audio, p_ms: r.ms,
                                                           p_voice: r.quran ? r.voice.label : T.voiceLabel(r.source, r.voice.label) });
      if (error || !data?.ok) { r.error = error ? `تعذّر حفظ الصوت: ${error.message}` : data.error; return; }
      Object.assign(r, { audio: k.audio, spokenKey: k.spoken });
    }));
  }

  const out = (r: any): any => {
    if (r.twin) return { ...out(r.twin), sha: r.sha };
    if (r.held) return { sha: r.sha, state: 'held', reason: r.held };
    if (r.error || !r.audio) return { sha: r.sha, state: 'error', error: r.error ?? 'لم يُولَّد الصوت' };
    return { sha: r.sha, state: 'ok', audio: r.audio, spoken: r.spokenKey, text: r.spoken, ms: r.ms, voice: r.voice.id, source: r.source,
             ...(r.quran ? { ref: r.spans.map(({ s, a, from, to, whole, widened }: any) => ({ s, a, from, to, whole, widened })) } : {}) };
  };
  return reply(req, 200, { results: rows.map(out) });
});
