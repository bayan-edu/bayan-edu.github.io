/* ═══════════════════════════════════════════════════════════════════
   ناقلُ التسليمات — Drive ⇐ بيان (المرحلة ②)

   🔑 **ناقلٌ بلا عقل.** لا يفهم JSON ولا يصحّح ولا يقرّر: يجلب الملفَّ
   خاماً، يسلّمه إلى `import_quiz` جافّةً، فإن مرّت اعتمد، وإن قالت
   «لا جديد» مضى، وإن رُدَّ حمل الرفضَ إلى التقرير. **العقدُ كلُّه في
   القاعدة (147–150) — فإن احتجت تغييرَ سلوكٍ فغيّره هناك لا هنا.**

   📐 **ويعتمد ولا ينشر.** الاختبارُ المستورَد يُخلق غيرَ منشورٍ ولا
   يراه طالبٌ حتى ينشره معلّمُه — فبوّابةُ المراجعة البشرية هي النشر،
   والناقلُ لا يملكها.

   🧪 **ودرسُ النقل اليدويّ مقيَّد هنا:** بعد كلّ تنزيلٍ يُحاسَب حجمُ
   البايتات على حجم Drive المعلَن — فحمولةٌ ناقصةٌ تُرفض قبل أن تبلغ
   القاعدة (وقد أسقط النقلُ بيدٍ ١٥ من ١٨ سؤالاً مرّتين قبل أن يُبنى).

   صفرُ اعتماداتٍ خارجية: `node:crypto` يوقّع JWT حسابِ الخدمة.

   ── الأسرار المطلوبة (GitHub → Settings → Secrets → Actions) ──
   SUPABASE_URL        رابط المشروع  https://…supabase.co
   SUPABASE_ANON_KEY   مفتاح anon (عامٌّ أصلاً في js/api.js)
   COURIER_EMAIL       بريد «معلّم الناقل» في بيان
   COURIER_PASSWORD    كلمة مروره
   GDRIVE_SA_KEY       ملف JSON لحساب خدمة Google كاملاً
   DRIVE_FOLDER_ID     معرّف مجلد التسليمات الجذر

   تشغيلٌ محليّ للفحص الذاتي:  BAYAN_SELFTEST=1 node import_quizzes.mjs
   ═══════════════════════════════════════════════════════════════════ */

import { createSign } from 'node:crypto';
import { appendFileSync } from 'node:fs';

/* ── قرارُ ما بعد الجافّة — نقيٌّ ليُفحص بلا شبكة ── */
export function decide(dry){
  if (dry && dry.ok && dry['لا جديد']) return 'skip';
  if (dry && dry.ok)                   return 'commit';
  return 'reject';
}

/* ── مقرَّرُ المجلد من اسمه: «8-eg_math» ⇒ 8 ── */
export function courseOf(name){
  const m = /^(\d+)-/.exec(name || '');
  return m ? Number(m[1]) : null;
}

/* ── سببُ الرفض في سطرٍ يصلح لتقرير ── */
export function reasonOf(res){
  if (!res) return 'بلا ردّ';
  const errs = res['أخطاء'];
  if (Array.isArray(errs) && errs.length)
    return errs[0] + (errs.length > 1 ? ` (+${errs.length - 1})` : '');
  return res['السبب'] || res.error || 'تعثّر بلا سبب معلوم';
}

/* ═══ الفحص الذاتي — يجري في CI قبل أيّ سرّ، وعند كلّ تعديل ═══ */
if (process.env.BAYAN_SELFTEST) {
  const ok = (c, m) => { if (!c) { console.error('✗ ' + m); process.exit(1); } };
  ok(decide({ ok: true, 'لا جديد': true }) === 'skip',   'المطابق يُتجاوز');
  ok(decide({ ok: true })                  === 'commit', 'الجافّة الماضية تُعتمد');
  ok(decide({ ok: false, 'أخطاء': ['س'] }) === 'reject', 'المردود يُرفض');
  ok(decide(null)                          === 'reject', 'غياب الردّ رفض');
  ok(courseOf('8-eg_math') === 8 && courseOf('12-sci1') === 12, 'المقرّر من الاسم');
  ok(courseOf('ملاحظات') === null, 'مجلد بلا رقم يُتجاهل');
  ok(reasonOf({ 'أخطاء': ['أ', 'ب'] }) === 'أ (+1)', 'سبب الرفض يُختصر');
  console.log('✅ الفحص الذاتي: سبعة من سبعة');
  process.exit(0);
}

const need = k => {
  const v = process.env[k];
  if (!v) { console.error(`✗ السرّ ${k} غير مضبوط`); process.exit(1); }
  return v;
};

const SB   = need('SUPABASE_URL').replace(/\/$/, '');
const ANON = need('SUPABASE_ANON_KEY');
const ROOT = need('DRIVE_FOLDER_ID');
const SA   = JSON.parse(need('GDRIVE_SA_KEY'));

const b64u = s => Buffer.from(s).toString('base64url');

/* ── رمز Drive بتوقيع حساب الخدمة — قراءةٌ فقط ── */
async function driveToken(){
  const now = Math.floor(Date.now() / 1000);
  const jwt = b64u(JSON.stringify({ alg: 'RS256', typ: 'JWT' })) + '.' +
              b64u(JSON.stringify({
                iss: SA.client_email,
                scope: 'https://www.googleapis.com/auth/drive.readonly',
                aud: 'https://oauth2.googleapis.com/token',
                iat: now, exp: now + 3600 }));
  const sig = createSign('RSA-SHA256').update(jwt).sign(SA.private_key, 'base64url');
  const r = await fetch('https://oauth2.googleapis.com/token', {
    method: 'POST',
    headers: { 'content-type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      grant_type: 'urn:ietf:params:oauth:grant-type:jwt-bearer',
      assertion: jwt + '.' + sig }) });
  const j = await r.json();
  if (!j.access_token) throw new Error('رمز Drive لم يُمنح: ' + JSON.stringify(j));
  return j.access_token;
}

async function driveList(tok, q, fields){
  const u = new URL('https://www.googleapis.com/drive/v3/files');
  u.searchParams.set('q', q);
  u.searchParams.set('fields', `files(${fields})`);
  u.searchParams.set('pageSize', '1000');
  const r = await fetch(u, { headers: { authorization: 'Bearer ' + tok } });
  if (!r.ok) throw new Error(`Drive ${r.status}: ` + await r.text());
  return (await r.json()).files || [];
}

async function driveBytes(tok, id){
  const r = await fetch(`https://www.googleapis.com/drive/v3/files/${id}?alt=media`,
                        { headers: { authorization: 'Bearer ' + tok } });
  if (!r.ok) throw new Error(`تنزيل ${r.status}: ` + await r.text());
  return Buffer.from(await r.arrayBuffer());
}

/* ── هويّة معلّم الناقل — دخولٌ عاديّ، لا دورَ قوّة ──
   `import_quiz` تردّ من لا auth.uid() له، وservice_role بلا هويّةٍ
   أصلاً ⇒ الناقلُ معلّمٌ كسائر المعلّمين، تحكمه الحرّاسُ نفسُها. */
async function bayanToken(){
  const r = await fetch(`${SB}/auth/v1/token?grant_type=password`, {
    method: 'POST',
    headers: { apikey: ANON, 'content-type': 'application/json' },
    body: JSON.stringify({ email: need('COURIER_EMAIL'),
                           password: need('COURIER_PASSWORD') }) });
  const j = await r.json();
  if (!j.access_token) throw new Error('دخول بيان رُفض: ' + JSON.stringify(j));
  return j.access_token;
}

async function importQuiz(tok, course, payload, dry){
  const r = await fetch(`${SB}/rest/v1/rpc/import_quiz`, {
    method: 'POST',
    headers: { apikey: ANON, authorization: 'Bearer ' + tok,
               'content-type': 'application/json' },
    body: JSON.stringify({ p_course: course, p_payload: payload, p_dry_run: dry }) });
  if (!r.ok) throw new Error(`rpc ${r.status}: ` + await r.text());
  return r.json();
}

/* ═══ الجولة ═══ */
const rows = [];          // [ملف، مقرّر، الحال]
let bad = 0;

const dtok = await driveToken();
const btok = await bayanToken();

const folders = (await driveList(dtok,
  `'${ROOT}' in parents and mimeType='application/vnd.google-apps.folder' and trashed=false`,
  'id,name')).filter(f => courseOf(f.name) !== null);

for (const f of folders){
  const course = courseOf(f.name);
  const files = await driveList(dtok,
    `'${f.id}' in parents and trashed=false and mimeType!='application/vnd.google-apps.folder'`,
    'id,name,size');
  for (const file of files.filter(x => /\.json$/i.test(x.name))){
    const tag = `${f.name}/${file.name}`;
    try {
      const bytes = await driveBytes(dtok, file.id);
      if (file.size && Number(file.size) !== bytes.length)
        throw new Error(`حمولة ناقصة: ${bytes.length} من ${file.size} بايتاً`);
      const payload = JSON.parse(bytes.toString('utf8'));

      const dry = await importQuiz(btok, course, payload, true);
      const d = decide(dry);
      if (d === 'skip') { rows.push([tag, course, 'لا جديد']); continue; }
      if (d === 'reject') { rows.push([tag, course, '⛔ ' + reasonOf(dry)]); bad++; continue; }

      const res = await importQuiz(btok, course, payload, false);
      if (res && res.ok)
        rows.push([tag, course,
          `✅ اعتُمد — ${res.questions} سؤالاً · ${res['الخطّة']?.['الاختبار']?.['الكود'] || ''} · غير منشور`]);
      else { rows.push([tag, course, '⛔ عند الاعتماد: ' + reasonOf(res)]); bad++; }
    } catch (e) {
      rows.push([tag, course, '⛔ ' + e.message]); bad++;
    }
  }
}

/* ── التقرير — يُقرأ في ملخّص التشغيل، والفشل يوقظ البريد ── */
const lines = ['| الملف | المقرّر | الحال |', '|---|---|---|',
  ...rows.map(r => `| ${r[0]} | ${r[1]} | ${r[2]} |`)];
if (!rows.length) lines.push('| — | — | لا ملفّات |');
const report = `### جولة الناقل\n\n${lines.join('\n')}\n`;
console.log(report);
if (process.env.GITHUB_STEP_SUMMARY) appendFileSync(process.env.GITHUB_STEP_SUMMARY, report);

process.exit(bad ? 1 : 0);
