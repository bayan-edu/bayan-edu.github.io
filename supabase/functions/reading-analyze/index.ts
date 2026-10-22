/* ══════════════════════════════════════════════════════════
   بيان — reading-analyze · الدالّةُ الطرفيّة الثالثة (176 · تجربة)

   تحليلُ القراءة الجهريّة — **تجربةٌ على تسجيلات المالك**، ونتيجتُها في
   `reading_analyses` للمشرف وحده. المنطقُ في core.js.

   🎙️ السمعُ: Whisper (`@cf/openai/whisper-large-v3-turbo`) على Workers AI —
      نموذجٌ مفتوح (MIT) يعمل على خوادم Cloudflare، فلا يذهب الصوتُ إلى OpenAI.
      وشروطُ Cloudflare: لا تدريبَ على المحتوى · لا احتفاظَ بعد الطلب · لا قيدَ عمر.
      ⛔ وكان Gemini — وأُسقط: شروطُ Google تمنع خدمةً يصلها من دون ١٨ (STATE `176`).
   🔑 من يناديها: SQL وحدَه عبر `pg_net`، ومعه `x-analyze-secret` من Vault —
      والقاعدةُ تطابقه (`reading_analyze_ok`). ⇒ `verify_jwt=false`.
      وسرّا Cloudflare في أسرار الدالّة: `CF_ACCOUNT_ID` · `CF_AI_TOKEN`
      (رمزٌ لا يملك إلا «Workers AI»: قراءةٌ وتشغيل).
   📥 المدخل (JSON):
      { "recording_id": 13 }                        ⇐ قراءةٌ من المنصّة: الصوتُ والنصُّ من القاعدة
      { "path": "…", "reference": "…", "lang": "ar" } ⇐ ملفٌّ رُفع للتجربة ونصٌّ يُمرَّر
      و"asr": { … } اختياريٌّ في الحالين — خياراتُ Whisper تُجرَّب ولا تُفرض
      ⛔ و`vad_filter: true` قِيس فاخترع Whisper معه ٣٦ كلمةً وأفسد كلماتٍ داخل النصّ — لا يُستعمل.
   🔒 ولا يُمرَّر نصُّ الدرس إلى Whisper (`initial_prompt`): من يعرف ما يُنتظر
      يسمعه — فيُصلح الخطأَ الذي جئنا نقيسه.
   ══════════════════════════════════════════════════════════ */
import { createClient } from 'npm:@supabase/supabase-js@2.45.4';
import { encodeBase64 } from 'jsr:@std/encoding@1.0.5/base64';
import { readable, align, asrInfo, mimeOf } from './core.js';

const ASR_MODEL = '@cf/openai/whisper-large-v3-turbo';
const MAX_BYTES = 10 * 1048576;        // مخزنُ التسجيلات حدُّه ٥ م.ب — وهذا سقفُ ملفّات التجربة

const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), { status, headers: { 'Content-Type': 'application/json' } });

/* خياراتُ Whisper التي تُجرَّب في التجربة — وما عداها يُردّ (لا يمرّ حقلٌ لم نختره) */
const ASR_KEYS = ['vad_filter', 'condition_on_previous_text', 'hallucination_silence_threshold', 'beam_size'];
const ASR_DEFAULTS: Record<string, unknown> = {};
function asrOptions(raw: any){
  const o: Record<string, unknown> = { ...ASR_DEFAULTS };
  for(const k of ASR_KEYS) if(raw && raw[k] !== undefined) o[k] = raw[k];
  return o;
}

async function whisper(acct: string, token: string, audioB64: string, lang: string, opts: Record<string, unknown>){
  const r = await fetch(`https://api.cloudflare.com/client/v4/accounts/${acct}/ai/run/${ASR_MODEL}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
    body: JSON.stringify({ audio: audioB64, task: 'transcribe', language: lang, ...opts })
  });
  const b = await r.json().catch(() => ({}));
  if(!r.ok || b?.success === false){
    const why = (b?.errors || []).map((e: any) => e?.message).filter(Boolean).join(' · ');
    return { error: `Workers AI ${r.status}: ${why || 'error'}` };
  }
  return { data: b?.result ?? {} };
}

Deno.serve(async (req) => {
  if(req.method !== 'POST') return json({ error: 'POST وحده' }, 405);
  const url = Deno.env.get('SUPABASE_URL'), sk = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');
  if(!url || !sk) return json({ error: 'مفتاحُ الخدمة غائب' }, 500);
  const db = createClient(url, sk, { auth: { persistSession: false, autoRefreshToken: false } });

  const { data: okSecret, error: eAuth } = await db.rpc('reading_analyze_ok', { p_secret: req.headers.get('x-analyze-secret') ?? '' });
  if(eAuth) return json({ error: eAuth.message }, 500);
  if(!okSecret) return json({ error: 'مرفوض' }, 403);

  const acct = (Deno.env.get('CF_ACCOUNT_ID') || '').trim(), token = (Deno.env.get('CF_AI_TOKEN') || '').trim();
  if(!acct || !token) return json({ error: 'CF_ACCOUNT_ID أو CF_AI_TOKEN غائبٌ عن أسرار الدالّة' }, 500);

  const inp = await req.json().catch(() => ({}));

  /* ① الصوتُ والنصّ */
  let path = '', reference = '', lang = '', recordingId: number | null = null;
  if(inp.recording_id){
    const { data: r, error } = await db.from('recordings')
      .select('id, path, deleted_at, items(body, lang)').eq('id', inp.recording_id).maybeSingle();
    if(error || !r) return json({ error: error?.message || 'لا قراءة بهذا الرقم' }, 404);
    if(r.deleted_at) return json({ error: 'حُذف صوتُ هذه القراءة' }, 410);
    recordingId = r.id; path = r.path;
    reference = (r as any).items?.body || '';
    lang = (r as any).items?.lang === 'en' ? 'en' : 'ar';
  } else {
    path = String(inp.path || ''); reference = String(inp.reference || ''); lang = inp.lang === 'en' ? 'en' : 'ar';
  }
  reference = readable(reference);           // وسومُ القارئ لا تُنطق فلا تُقارَن
  if(!path || !reference) return json({ error: 'المسارُ أو النصُّ ناقص' }, 400);
  if(!mimeOf(path)) return json({ error: 'صيغةٌ غير معروفة: ' + path }, 400);

  const { data: blob, error: eDl } = await db.storage.from('recordings').download(path);
  if(eDl || !blob) return json({ error: 'تعذّر تنزيل الصوت: ' + (eDl?.message || '') }, 404);
  if(blob.size > MAX_BYTES) return json({ error: 'الملفّ أكبر من سقف التجربة' }, 413);

  /* ② Whisper يكتب ما سمعه — بلا نصّ الدرس */
  const opts = asrOptions(inp.asr);
  const t0 = Date.now();
  const w = await whisper(acct, token, encodeBase64(new Uint8Array(await blob.arrayBuffer())), lang, opts);
  const ms = Date.now() - t0;

  let transcript = '', alignment: any = null, info: any = null, segments: any = null;
  const err: string | null = w.error ?? null;
  if(!err){
    transcript = String(w.data?.text || '').trim();
    /* ③ المقارنةُ بشيفرة — وما بعد آخر كلمةٍ في النصّ (اختراعُ Whisper في الصمت) يُحفظ ولا يُعدّ */
    alignment = align(reference, transcript, lang);
    /* ④ الطلاقةُ على كلمات القراءة وحدها */
    info = asrInfo(w.data, lang, { start: alignment.before_text.length, end: alignment.after_text.length });
    segments = Array.isArray(w.data?.segments)
      ? w.data.segments.slice(0, 80).map(({ vtt, ...rest }: any) => rest) : null;   // vtt نسخةٌ ثانيةٌ من النصّ
  }

  const { data: row, error: eIns } = await db.from('reading_analyses').insert({
    recording_id: recordingId, path, lang, model: ASR_MODEL, reference, transcript, alignment,
    feedback: info && { asr: info, options: opts, segments }, error: err, ms
  }).select('id').single();

  const out = { id: row?.id ?? null, model: ASR_MODEL, ms, lang, transcript,
                summary: alignment && { ref_words: alignment.ref_words, correct: alignment.correct,
                  substituted: alignment.substituted, omitted: alignment.omitted, inserted: alignment.inserted,
                  accuracy: alignment.accuracy, ending_checked: alignment.ending_checked,
                  ending_mismatch: alignment.ending_mismatch.length,
                  before_text: alignment.before_text, after_text: alignment.after_text },
                fluency: info, options: opts, error: err || (eIns ? 'حفظ: ' + eIns.message : null) };
  console.log('reading-analyze', JSON.stringify({ id: out.id, ms, lang, error: out.error }));
  return json(out, out.error ? 500 : 200);
});
