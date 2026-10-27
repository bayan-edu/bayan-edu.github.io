/* ══════════════════════════════════════════════════════════
   بيان — tools/google.mjs · الطريقُ إلى Google لأدوات `tools/` (لا يُنشر)

   وحدةٌ واحدةٌ لما تحتاجه أداتا الصوت والتشكيل (`tts_compare.mjs` · `tashkeel_eval.mjs`): طلبٌ يبلغ،
   ورمزُ دخولٍ بحساب خدمة. ونسختان من التوقيع تفترقان يوماً بصمت — والتوقيعُ أدقُّ ما فيهما.

   🔴 الطلبُ بـ`https.request` لا بـ`fetch` — قِيس على جهاز المالك (٢٧ أكتوبر): من عناوين `oauth2.googleapis.com`
      ما لا يُبلَغ من شبكته (216.239.x.x)، و`fetch` يقف عنده عشرَ ثوانٍ ثمّ يفشل («UND_ERR_CONNECT_TIMEOUT»)،
      و`https.request` بـ`autoSelectFamily` ينتقل إلى ما يُبلَغ (١٫٣ ث). والشبكةُ شبكةُ الجهاز لا Google: PowerShell
      بلغه بالعنوان نفسِه.
   ══════════════════════════════════════════════════════════ */
import { readFileSync } from 'node:fs';
import { createSign } from 'node:crypto';
import { request } from 'node:https';

export function post(url, headers, body, timeout = 180000){
  return new Promise((resolve, reject) => {
    const req = request(url, { method: 'POST', headers, timeout,
                               autoSelectFamily: true, autoSelectFamilyAttemptTimeout: 1500 }, res => {
      const chunks = [];
      res.on('data', c => chunks.push(c));
      res.on('end', () => resolve({ status: res.statusCode, text: Buffer.concat(chunks).toString('utf8') }));
    });
    req.on('timeout', () => req.destroy(new Error(`timeout after ${timeout} ms`)));
    req.on('error', reject);
    req.end(body);
  });
}
export const parse = t => { try { return JSON.parse(t); } catch { return {}; } };
export const okStatus = s => s >= 200 && s < 300;

/* ── رمزُ الدخول بحساب الخدمة ── JWT موقَّعٌ بمفتاحه الخاصّ (RS256 من `node:crypto` بلا مكتبة) يُبادَل برمزٍ لساعة.
   والملفُّ يُقرأ ولا يُطبع منه شيء، ويُعاد منه بريدُ الحساب ومشروعُه وحدهما.
   ⚠️ ولا `x-goog-user-project` مع رمز الحساب: حصّتُه على مشروعه أصلاً، والترويسةُ تطلب صلاحيةً أخرى
      (`serviceusage.services.use`) فتردّ طلباً صحيحاً. */
const b64url = b => Buffer.from(b).toString('base64').replace(/=+$/, '').replace(/\+/g, '-').replace(/\//g, '_');
export async function saToken(file){
  const sa = JSON.parse(readFileSync(file, 'utf8'));
  if(!sa.client_email || !sa.private_key) throw new Error('the file has no client_email/private_key — is it a service account JSON key?');
  const aud = sa.token_uri || 'https://oauth2.googleapis.com/token';
  const now = Math.floor(Date.now() / 1000);
  const head = b64url(JSON.stringify({ alg: 'RS256', typ: 'JWT' }));
  const claim = b64url(JSON.stringify({ iss: sa.client_email, aud, iat: now, exp: now + 3600,
                                        scope: 'https://www.googleapis.com/auth/cloud-platform' }));
  const sig = createSign('RSA-SHA256').update(`${head}.${claim}`).sign(sa.private_key);
  const res = await post(aud, { 'content-type': 'application/x-www-form-urlencoded' },
    new URLSearchParams({ grant_type: 'urn:ietf:params:oauth:grant-type:jwt-bearer',
                          assertion: `${head}.${claim}.${b64url(sig)}` }).toString(), 60000);
  const j = parse(res.text);
  if(!okStatus(res.status) || !j.access_token)
    throw new Error(`token ${res.status} ${j.error || ''} ${j.error_description || ''}`.trim());
  return { token: j.access_token, email: sa.client_email, project: sa.project_id };
}
