/* ══════════════════════════════════════════════════════════
   قياسُ الدالّة الطرفيّة r2-sign — بلا شبكةٍ ولا سرٍّ ولا Deno.
     node tools/r2_sign.test.mjs

   يقرأ `supabase/functions/r2-sign/core.js` كما يُشحن، ويقيس ثلاثة:
     ① الفحص   — ما يُقبل وما يُردّ، وبأيّ رمز
     ② التكافؤ — مسطرةُ الدالّة ومسطرةُ js/media.js شيءٌ واحد:
                 يقرأ media.js **نصّاً** ويولّد بها مئتي مفتاحٍ حقيقيّ
     ③ التوقيع — ما يُوقَّع وما لا يُوقَّع (يحتاج aws4fetch)

   ⚠️ وما تعذّر قياسُه لا يُعدّ ناجحاً: غيابُ aws4fetch يُنهي القياسَ
      بالرمز ٢ وباسم القسم الذي لم يُقَس — لا بأخضرَ كاذب.
   ══════════════════════════════════════════════════════════ */
import { readFileSync, mkdtempSync, writeFileSync, rmSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { tmpdir } from 'node:os';
import { fileURLToPath, pathToFileURL } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const core = await import(pathToFileURL(join(ROOT, 'supabase/functions/r2-sign/core.js')));
const { check, presign, RULES, EXPIRES } = core;

let bad = 0, n = 0;
const ok = (name, cond, extra = '') => { n++; if(!cond) bad++; console.log(cond ? '✅' : '❌', name, cond ? '' : extra); };

/* ─────────── ① الفحص ─────────── */
console.log('── ① الفحص');
const MB = 1048576;
const t = (key, size) => check({ key, size });

let r = t('audio/l12-k3j9fq.mp3', 1000);
ok('صوتٌ صالح ⇒ مقبول، ونوعُه من اللاحقة', r.type === 'audio/mpeg' && r.key === 'r2:audio/l12-k3j9fq.mp3' && r.path === 'audio/l12-k3j9fq.mp3', JSON.stringify(r));
r = t('r2:img/c5-abc123.webp', 5000);
ok('الوسمُ r2: مقبولٌ ومنزوعٌ من المسار', r.path === 'img/c5-abc123.webp' && r.key === 'r2:img/c5-abc123.webp', JSON.stringify(r));
ok('jpg ⇒ image/jpeg', t('img/x-abc123.jpg', 9).type === 'image/jpeg');
ok('m4a ⇒ audio/mp4', t('audio/x-abc123.m4a', 9).type === 'audio/mp4');

const refused = [
  ['video/l9-cq7qng.mp4', 100, 400, 'الفيديو غائبٌ حتى يُبنى مشغّله'],
  ['recordings/u1-abc123.webm', 100, 400, 'لا مجلّدَ للتسجيلات — مكانُها Supabase'],
  ['audio/l1-abc123.exe', 100, 400, 'صيغةٌ غير مقبولة'],
  ['img/l1-abc123.svg', 100, 400, 'SVG مُقصاة (قرار 160)'],
  ['audio/../img/a-abc123.png', 100, 400, 'لا صعودَ في المسار'],
  ['audio/l1/x-abc123.mp3', 100, 400, 'لا مجلّدَ متداخل'],
  ['Audio/L1-ABC123.MP3', 100, 400, 'لا حرفَ كبير'],
  ['audio/l1-a1.mp3', 100, 400, 'المفتاحُ القديم القصير لا يُوقَّع له رفعٌ جديد'],
  ['audio/l1-abc123.mp3', 0, 400, 'حجمٌ صفر'],
  ['audio/l1-abc123.mp3', 1.5, 400, 'حجمٌ كسريّ'],
  ['audio/l1-abc123.mp3', 10 * MB + 1, 413, 'الصوتُ فوق ١٠ م.ب'],
  ['img/l1-abc123.png', 2 * MB + 1, 413, 'الصورةُ فوق ٢ م.ب'],
];
for(const [key, size, status, why] of refused){
  const x = t(key, size);
  ok(`يُردّ (${status}): ${why}`, x.error && x.status === status, JSON.stringify(x));
}
ok('الحدُّ نفسُه مقبول: صوتٌ ١٠ م.ب تماماً', !t('audio/l1-abc123.mp3', 10 * MB).error);
ok('جسمٌ فارغ يُردّ', check(undefined).status === 400 && check({}).status === 400);

/* ─────────── ② التكافؤ مع media.js ─────────── */
console.log('── ② التكافؤ مع js/media.js');
const src = readFileSync(join(ROOT, 'js/media.js'), 'utf8');
const arr = name => JSON.parse(src.match(new RegExp(`export const ${name}\\s*=\\s*(\\[[^\\]]*\\])`))[1]);
const num = name => Number(src.match(new RegExp(`export const ${name}\\s*=\\s*(\\d+)`))[1]);
const same = (a, b) => a.length === b.length && a.every(x => b.includes(x));
ok('لواحقُ الصوت = AUDIO_EXT', same(arr('AUDIO_EXT'), Object.keys(RULES.audio.types)), `${arr('AUDIO_EXT')} ≠ ${Object.keys(RULES.audio.types)}`);
ok('حدُّ الصوت = AUDIO_MAX_MB', num('AUDIO_MAX_MB') === RULES.audio.maxMb);
ok('لواحقُ الصورة = IMG_EXT', same(arr('IMG_EXT'), Object.keys(RULES.img.types)), `${arr('IMG_EXT')} ≠ ${Object.keys(RULES.img.types)}`);
ok('حدُّ الصورة = IMG_MAX_MB', num('IMG_MAX_MB') === RULES.img.maxMb);

/* مئتا مفتاحٍ تبنيها media.js نفسُها (ببديلٍ لـapi.js) — وكلُّها يجب أن تُقبل.
   والنطاقاتُ قاسيةٌ عمداً: عربيٌّ وحروفٌ كبيرة ورموزٌ وفراغ. */
const tmp = mkdtempSync(join(tmpdir(), 'r2sign-'));
writeFileSync(join(tmp, 'api.mjs'), 'export const publicUrl = k => k;');
writeFileSync(join(tmp, 'media.mjs'), src.replace(/from '\.\/api\.js'/, "from './api.mjs'"));
const media = await import(pathToFileURL(join(tmp, 'media.mjs')));
rmSync(tmp, { recursive: true, force: true });
const scopes = ['l12', 'q5', 'C7', 'درس', '', null, 'a b!@#', 'VERYLONGSCOPE123', 'x'];
let made = 0, passed = 0, sample = '';
for(let i = 0; i < 200; i++){
  const audio = i % 2 === 0;
  const exts = audio ? arr('AUDIO_EXT') : arr('IMG_EXT');
  const file = { name: `ملف ${i}.${exts[i % exts.length].toUpperCase()}`, size: 1 + i };
  const k = (audio ? media.audioKey : media.imageKey)(scopes[i % scopes.length], file);
  if(k.error) continue;
  made++;
  const c = check({ key: k.key, size: file.size });
  if(!c.error) passed++; else if(!sample) sample = `${k.key} ⇒ ${c.error}`;
}
ok(`كلُّ مفتاحٍ تبنيه media.js تقبله الدالّة (${passed}/${made})`, made === 200 && passed === made, sample);

/* ─────────── ③ التوقيع ─────────── */
console.log('── ③ التوقيع');
let AwsClient = null;
try { ({ AwsClient } = await import('aws4fetch')); } catch {}
if(!AwsClient){
  console.log('⛔ لم يُقَس: aws4fetch غائب (npm i --no-save aws4fetch@1.0.20) — والقياسُ ناقص لا ناجح');
  console.log(`\n${n - bad}/${n} — ناقص`);
  process.exit(2);
}
const env = { accountId: 'acct0000000000000000000000000000', accessKeyId: 'AKIDEXAMPLE',
              secretAccessKey: 'wJalrXUtnFEMI/K7MDENG+bPxRfiCYEXAMPLEKEY', bucket: 'bayan-media' };
const s = await presign(AwsClient, env, t('audio/l12-k3j9fq.mp3', 123456), { datetime: '20261020T120000Z' });
const u = new URL(s.url);
ok('المضيفُ والمسار', u.host === 'acct0000000000000000000000000000.r2.cloudflarestorage.com' && u.pathname === '/bayan-media/audio/l12-k3j9fq.mp3', s.url);
ok(`المدّة ${EXPIRES} ثانية`, u.searchParams.get('X-Amz-Expires') === String(EXPIRES));
ok('يُوقَّع: الحجمُ والنوعُ والمضيفُ ومنعُ الطمس',
   u.searchParams.get('X-Amz-SignedHeaders') === 'content-length;content-type;host;if-none-match',
   u.searchParams.get('X-Amz-SignedHeaders'));
ok('خوارزميةُ التوقيع SigV4', u.searchParams.get('X-Amz-Algorithm') === 'AWS4-HMAC-SHA256');
ok('النطاقُ auto/s3', (u.searchParams.get('X-Amz-Credential') || '').endsWith('/20261020/auto/s3/aws4_request'));
ok('السرُّ لا يظهر في الرابط', !s.url.includes(env.secretAccessKey) && !s.url.includes(encodeURIComponent(env.secretAccessKey)));
ok('ما يرسله المتصفّح: النوعُ ومنعُ الطمس وحدهما (الحجمُ يضعه المتصفّح)',
   JSON.stringify(s.headers) === JSON.stringify({ 'Content-Type': 'audio/mpeg', 'If-None-Match': '*' }), JSON.stringify(s.headers));
const s2 = await presign(AwsClient, env, t('audio/l12-k3j9fq.mp3', 123457), { datetime: '20261020T120000Z' });
ok('حجمٌ يختلف ببايتٍ ⇒ توقيعٌ آخر', new URL(s2.url).searchParams.get('X-Amz-Signature') !== u.searchParams.get('X-Amz-Signature'));
console.log('   التوقيع:', u.searchParams.get('X-Amz-Signature'));

console.log(`\n${n - bad}/${n}${bad ? ' — ❌ سقط ' + bad : ' — ✅'}`);
process.exit(bad ? 1 : 0);
