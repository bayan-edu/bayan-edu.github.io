/* ══════════════════════════════════════════════════════════
   بيان — الدالّة الطرفيّة r2-sign
   توقيعُ رابطِ رفعٍ إلى Cloudflare R2 لمؤلّفٍ مأذون. والحجّةُ كاملةً
   في رأس core.js، وهنا الغلافُ وحده: CORS · الصلاحية · الأسرار.

   📞 النداء (من api.js وحدها):
        db.functions.invoke('r2-sign', { body: { key, size } })
      ⇒ { key: 'r2:audio/…', url, headers, expires_in }
      ثمّ:  fetch(url, { method: 'PUT', headers, body: file })

   🔑 الأسرارُ في Supabase (Edge Functions ← Secrets) لا في المستودع:
        R2_ACCOUNT_ID · R2_ACCESS_KEY_ID · R2_SECRET_ACCESS_KEY
        R2_BUCKET (اختياريّ · الافتراض bayan-media)
      ومفتاحُ R2 مقصورٌ على المخزن `bayan-media` بصلاحية Object Read & Write.

   🔒 الصلاحية: `can_upload_media()` بهويّة المستدعي نفسِه (ترويسةُ
      Authorization تُمرَّر كما هي) — فلا مسطرةَ ثانية تفترق عن مسطرة
      مخازن Supabase. **وتُنادى أوّلاً، قبل الأسرار والجسم والتوقيع.**
   🔴 و`verify_jwt` لا يكفي وحده — قِيس (٢١ أكتوبر): طلبٌ **بلا ترويسة
      Authorization** ومعه المفتاحُ العامّ وحده بلغ الكودَ (البوّابةُ تقبله
      بدور `anon`). وكان هنا «لا يبلغ الكودَ طلبٌ بلا جلسة» — **وصفٌ كاذبٌ
      صُحّح بالقياس.** فالحارسُ الحقّ هو `can_upload_media()`: ممنوحةٌ
      لـ`authenticated` وحده (`169`)، فالزائرُ يُردّ بـ`403` قبل أن يُقرأ شيء.
   ══════════════════════════════════════════════════════════ */
import { AwsClient } from 'npm:aws4fetch@1.0.20';
import { createClient } from 'npm:@supabase/supabase-js@2';
import { check, presign, EXPIRES } from './core.js';

/* الأصلان اللذان تُخدَم منهما الواجهة — والنطاقُ الرسميّ أوّلاً. */
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

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response(null, { status: 204, headers: cors(req) });
  if (req.method !== 'POST') return reply(req, 405, { error: 'POST وحده' });

  /* الصلاحيةُ أوّلاً — قبل الأسرار والجسم والتوقيع. فالزائرُ لا يعرف
     حتى أنّ للدالّة أسراراً، والمؤلّفُ غيرُ المأذون لا يبلغ الفحص. */
  const db = createClient(Deno.env.get('SUPABASE_URL')!, Deno.env.get('SUPABASE_ANON_KEY')!, {
    global: { headers: { Authorization: req.headers.get('Authorization') ?? '' } },
    auth:   { persistSession: false, autoRefreshToken: false },
  });
  const { data: allowed, error: denied } = await db.rpc('can_upload_media');
  if (denied) return reply(req, 403, { error: 'تعذّر التحقّق من الصلاحية', code: denied.code });
  if (allowed !== true) return reply(req, 403, { error: 'الرفعُ للمؤلّفين المأذونين وحدهم' });

  const env = {
    accountId:       Deno.env.get('R2_ACCOUNT_ID'),
    accessKeyId:     Deno.env.get('R2_ACCESS_KEY_ID'),
    secretAccessKey: Deno.env.get('R2_SECRET_ACCESS_KEY'),
    bucket:          Deno.env.get('R2_BUCKET') || 'bayan-media',
  };
  /* صاخبٌ لا صامت: دالّةٌ بلا أسرارها تقول ذلك باسمه — للمأذون وحده. */
  if (!env.accountId || !env.accessKeyId || !env.secretAccessKey)
    return reply(req, 500, { error: 'أسرارُ R2 لم تُضبط في الدالّة' });

  let body: unknown;
  try { body = await req.json(); } catch { return reply(req, 400, { error: 'جسمُ الطلب ليس JSON' }); }

  const c = check(body);
  if ('error' in c) return reply(req, c.status, { error: c.error });

  const s = await presign(AwsClient, env, c);
  return reply(req, 200, { key: c.key, url: s.url, headers: s.headers, expires_in: EXPIRES });
});
