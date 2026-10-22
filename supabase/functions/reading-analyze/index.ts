/* ══════════════════════════════════════════════════════════
   بيان — reading-analyze · الدالّةُ الطرفيّة الثالثة (176 · تجربة)

   تحليلُ القراءة الجهريّة بـGemini — **تجربةٌ على تسجيلات المالك**،
   ونتيجتُها في `reading_analyses` للمشرف وحده. المنطقُ في core.js.

   🔑 من يناديها: SQL وحدَه عبر `pg_net`، ومعه `x-analyze-secret` من
      Vault — والقاعدةُ تطابقه (`reading_analyze_ok`). ⇒ `verify_jwt=false`
      ولا سرَّ هنا غيرُ مفتاح Gemini (`GEMINI_API_KEY` في أسرار الدالّة).
   📥 المدخل (JSON):
      { "mode": "models" }                          ⇐ ما يتيحه المفتاحُ من نماذج
      { "recording_id": 12 }                        ⇐ قراءةٌ من المنصّة: الصوتُ والنصُّ من القاعدة
      { "path": "…", "reference": "…", "lang": "ar" } ⇐ ملفٌّ رُفع للتجربة ونصٌّ يُمرَّر
      و"model" اختياريّ في الحالين.
   🔒 والمفتاحُ يُرسَل في الترويسة `x-goog-api-key` لا في الرابط — فلا يُكتب في سجلّ.
   ══════════════════════════════════════════════════════════ */
import { createClient } from 'npm:@supabase/supabase-js@2.45.4';
import { encodeBase64 } from 'jsr:@std/encoding@1.0.5/base64';
import { readable, align, alignmentBrief, transcribePrompt, feedbackPrompt, parseGemini, mimeOf } from './core.js';

const API = 'https://generativelanguage.googleapis.com/v1beta';
/* نموذجٌ ثابتٌ مسمّى لا «‎-latest‎» ولا معاينة — توصيةُ Google للمشاريع الجديدة
   (قِيس ٢٢ أكتوبر: «Gemini 3.8 Flash · Stable»). والتجربةُ تمرّر غيره إن شاءت. */
const DEFAULT_MODEL = 'gemini-3.8-flash';
const MAX_BYTES = 15 * 1048576;        // الطلبُ المضمَّن حدُّه ٢٠ م.ب كلُّه — والصوتُ يكبر بالترميز ثلثاً

const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), { status, headers: { 'Content-Type': 'application/json' } });

async function gemini(key: string, model: string, parts: unknown[]){
  const r = await fetch(`${API}/models/${encodeURIComponent(model)}:generateContent`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'x-goog-api-key': key },
    body: JSON.stringify({
      contents: [{ role: 'user', parts }],
      generationConfig: { temperature: 0, responseMimeType: 'application/json' }
    })
  });
  const body = await r.json().catch(() => ({}));
  if(!r.ok) return { error: `Gemini ${r.status}: ${body?.error?.message || 'error'}` };
  return parseGemini(body);
}

Deno.serve(async (req) => {
  if(req.method !== 'POST') return json({ error: 'POST وحده' }, 405);
  const url = Deno.env.get('SUPABASE_URL'), sk = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');
  const key = Deno.env.get('GEMINI_API_KEY');
  if(!url || !sk) return json({ error: 'مفتاحُ الخدمة غائب' }, 500);
  const db = createClient(url, sk, { auth: { persistSession: false, autoRefreshToken: false } });

  const { data: okSecret, error: eAuth } = await db.rpc('reading_analyze_ok', { p_secret: req.headers.get('x-analyze-secret') ?? '' });
  if(eAuth) return json({ error: eAuth.message }, 500);
  if(!okSecret) return json({ error: 'مرفوض' }, 403);
  if(!key) return json({ error: 'GEMINI_API_KEY غائبٌ عن أسرار الدالّة' }, 500);

  const inp = await req.json().catch(() => ({}));

  /* ⓪ ما يتيحه المفتاح — يُختار منه النموذجُ قبل أوّل تحليل */
  if(inp.mode === 'models'){
    const r = await fetch(`${API}/models?pageSize=200`, { headers: { 'x-goog-api-key': key } });
    const b = await r.json().catch(() => ({}));
    if(!r.ok) return json({ error: `Gemini ${r.status}: ${b?.error?.message || 'error'}` }, 502);
    const names = (b.models || [])
      .filter((m: any) => (m.supportedGenerationMethods || []).includes('generateContent'))
      .map((m: any) => m.name.replace(/^models\//, ''));
    return json({ models: names });
  }

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
  const mime = mimeOf(path);
  if(!mime) return json({ error: 'صيغةٌ غير معروفة: ' + path }, 400);

  const { data: blob, error: eDl } = await db.storage.from('recordings').download(path);
  if(eDl || !blob) return json({ error: 'تعذّر تنزيل الصوت: ' + (eDl?.message || '') }, 404);
  if(blob.size > MAX_BYTES) return json({ error: 'الملفّ أكبر من حدّ الطلب المضمَّن' }, 413);
  const audio = { inline_data: { mime_type: mime, data: encodeBase64(new Uint8Array(await blob.arrayBuffer())) } };

  const model = String(inp.model || DEFAULT_MODEL);
  const t0 = Date.now();

  /* ② المرّة الأولى: ما سمعه حرفيّاً — بلا نصّ الدرس */
  const p1 = await gemini(key, model, [audio, { text: transcribePrompt(lang) }]);
  let transcript = '', alignment: any = null, feedback: any = null, err: string | null = null;
  if(p1.error){ err = 'pass1: ' + p1.error; }
  else {
    transcript = String(p1.data?.transcript || '');
    /* ③ المقارنةُ بشيفرة */
    alignment = align(reference, transcript, lang);
    /* ④ المرّة الثانية: يسمع ثانيةً ومعه النصُّ والمقارنة */
    const p2 = await gemini(key, model, [audio, { text: feedbackPrompt(lang, reference, transcript, alignmentBrief(alignment)) }]);
    if(p2.error) err = 'pass2: ' + p2.error; else feedback = p2.data;
  }
  const ms = Date.now() - t0;

  const { data: row, error: eIns } = await db.from('reading_analyses').insert({
    recording_id: recordingId, path, lang, model, reference, transcript, alignment, feedback, error: err, ms
  }).select('id').single();

  const out = { id: row?.id ?? null, model, ms, lang, transcript,
                summary: alignment && { ref_words: alignment.ref_words, correct: alignment.correct,
                  substituted: alignment.substituted, omitted: alignment.omitted, inserted: alignment.inserted,
                  accuracy: alignment.accuracy, ending_checked: alignment.ending_checked,
                  ending_mismatch: alignment.ending_mismatch.length },
                feedback, error: err || (eIns ? 'حفظ: ' + eIns.message : null) };
  console.log('reading-analyze', JSON.stringify({ id: out.id, model, ms, lang, error: out.error }));
  return json(out, out.error ? 500 : 200);
});
