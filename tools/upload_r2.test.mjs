/* ══════════════════════════════════════════════════════════
   قياسُ طريق الرفع إلى R2 في الواجهة (b161) — بلا شبكةٍ ولا Supabase.
     node tools/upload_r2.test.mjs

   يقرأ الوحداتِ المشحونةَ نفسَها نصّاً، ويستبدل **سطراً واحداً** في api.js
   (استيرادَ supabase-js من الشبكة) ببديلٍ يحاكي `functions.invoke` و
   `storage.from().upload` — وما سواه كما يُشحن. ويقيس ثلاثة:
     ① المفاتيح  — media.js: الجديدُ موسومٌ `r2:` والقديمُ بلا وسمٍ باقٍ في Supabase
     ② الطريق    — api.js: الموسومُ إلى الدالّة ثمّ PUT، وغيرُه إلى Supabase
     ③ الرسائل   — upload.js: `upMsg` تقرأ الرمزَ أوّلاً
   ══════════════════════════════════════════════════════════ */
import { readFileSync, mkdtempSync, writeFileSync, rmSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { tmpdir } from 'node:os';
import { fileURLToPath, pathToFileURL } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const read = p => readFileSync(join(ROOT, p), 'utf8');
let bad = 0, n = 0;
const ok = (name, cond, extra = '') => { n++; if(!cond) bad++; console.log(cond ? '✅' : '❌', name, cond ? '' : extra); };

const tmp = mkdtempSync(join(tmpdir(), 'upr2-'));
try {
/* ─────────── البدائل ─────────── */
writeFileSync(join(tmp, 'sb_stub.mjs'), `
export const calls = { invoke: [], upload: [] };
export const plan = { invoke: null };
const deep = () => new Proxy(function(){}, { get: (t, k) => k === 'then' ? undefined : deep(), apply: () => deep() });
export function createClient(){
  return new Proxy({
    functions: { invoke: async (name, opts) => { calls.invoke.push({ name, opts }); return plan.invoke(name, opts); } },
    storage: { from: b => ({
      upload: async (path, file, o) => { calls.upload.push({ b, path, o }); return { error: null }; },
      getPublicUrl: p => ({ data: { publicUrl: 'https://sb.example/' + b + '/' + p } }) }) },
  }, { get: (t, k) => k in t ? t[k] : deep() });
}`);
const apiSrc = read('js/api.js');
const IMPORT = /^import \{ createClient \} from 'https:\/\/cdn\.jsdelivr\.net\/npm\/@supabase\/supabase-js@2\/\+esm';$/m;
ok('سطرُ استيراد supabase-js في api.js كما يتوقّعه القياس', IMPORT.test(apiSrc));
writeFileSync(join(tmp, 'api.mjs'), apiSrc.replace(IMPORT, "import { createClient } from './sb_stub.mjs';"));
writeFileSync(join(tmp, 'media.mjs'), read('js/media.js').replace(/from '\.\/api\.js'/, "from './api.mjs'"));

const stub  = await import(pathToFileURL(join(tmp, 'sb_stub.mjs')));
const api   = await import(pathToFileURL(join(tmp, 'api.mjs')));
const media = await import(pathToFileURL(join(tmp, 'media.mjs')));
const { check } = await import(pathToFileURL(join(ROOT, 'supabase/functions/r2-sign/core.js')));

/* ─────────── ① المفاتيح ─────────── */
console.log('── ① المفاتيح (media.js)');
const fA = { name: 'درس ١.MP3', size: 1234 }, fI = { name: 'cell.webp', size: 999 };
const kA = media.audioKey('l12', fA).key, kI = media.imageKey('c5', fI).key;
ok('مفتاحُ الصوت الجديد موسومٌ r2:', /^r2:audio\/l12-[a-z0-9]{6}\.mp3$/.test(kA), kA);
ok('مفتاحُ الصورة الجديد موسومٌ r2:', /^r2:img\/c5-[a-z0-9]{6}\.webp$/.test(kI), kI);
ok('والدالّةُ الطرفيّة تقبلهما', !check({ key: kA, size: fA.size }).error && !check({ key: kI, size: fI.size }).error);
/* 🔴 الفخّ الذي فُصل له ثابتان: القديمُ بلا وسمٍ يبقى في Supabase */
ok('🔴 المفتاحُ القديم بلا وسم يبقى في Supabase', media.mediaUrl('audio/q12-tljivt.mp3') === 'https://sb.example/audio/q12-tljivt.mp3', media.mediaUrl('audio/q12-tljivt.mp3'));
ok('والموسومُ إلى نطاق R2', media.mediaUrl('r2:audio/l1-a1.mp3') === 'https://media.bayanclass.com/audio/l1-a1.mp3');
ok('mediaHome: القديمُ sb والموسومُ r2', media.mediaHome('audio/x.mp3') === 'sb' && media.mediaHome('r2:audio/x.mp3') === 'r2');

/* ─────────── ② الطريق ─────────── */
console.log('── ② الطريق (api.js · uploadMedia)');
const file = { size: 38, type: 'audio/mpeg' };
const KEY = 'r2:audio/l12-abc123.mp3';
const SIGNED = { key: KEY, url: 'https://acct.r2.cloudflarestorage.com/bayan-media/audio/l12-abc123.mp3?X-Amz-Signature=x',
                 headers: { 'Content-Type': 'audio/mpeg', 'If-None-Match': '*' }, expires_in: 600 };
let puts = [], putPlan = null;
globalThis.fetch = async (url, opts) => { puts.push({ url, opts }); return putPlan(url, opts); };
const reset = () => { stub.calls.invoke.length = 0; stub.calls.upload.length = 0; puts = []; };

reset(); stub.plan.invoke = async () => ({ data: SIGNED, error: null }); putPlan = async () => ({ ok: true, status: 200 });
let r = await api.uploadMedia(KEY, file);
ok('الموسومُ: يطلب التوقيعَ من r2-sign بالمفتاح والحجم', stub.calls.invoke.length === 1 && stub.calls.invoke[0].name === 'r2-sign'
   && JSON.stringify(stub.calls.invoke[0].opts.body) === JSON.stringify({ key: KEY, size: 38 }), JSON.stringify(stub.calls.invoke));
ok('ثمّ PUT إلى الرابط الموقَّع بترويساته وبالملف نفسِه', puts.length === 1 && puts[0].url === SIGNED.url && puts[0].opts.method === 'PUT'
   && puts[0].opts.headers === SIGNED.headers && puts[0].opts.body === file);
ok('ولا يلمس مخزنَ Supabase', stub.calls.upload.length === 0);
ok('والنتيجةُ { error: null }', r.error === null, JSON.stringify(r));

reset(); stub.plan.invoke = async () => ({ data: null, error: { message: 'Edge Function returned a non-2xx status code',
  context: { status: 403, json: async () => ({ error: 'الرفعُ للمؤلّفين المأذونين وحدهم' }) } } });
r = await api.uploadMedia(KEY, file);
ok('ردُّ الدالّة 403: رسالتُها العربيّة ورمزُها، ولا PUT', r.error?.status === 403 && r.error.message === 'الرفعُ للمؤلّفين المأذونين وحدهم' && puts.length === 0, JSON.stringify(r));

reset(); stub.plan.invoke = async () => ({ data: SIGNED, error: null }); putPlan = async () => { throw new TypeError('Failed to fetch'); };
r = await api.uploadMedia(KEY, file);
ok('PUT مردودٌ بلا CORS (TypeError — مقيسٌ على R2): رمزٌ ٠ ورسالةٌ تُقرأ', r.error?.status === 0 && /انقطع الاتصال/.test(r.error.message), JSON.stringify(r));

reset(); putPlan = async () => ({ ok: false, status: 412 });
r = await api.uploadMedia(KEY, file);
ok('PUT على اسمٍ قائم: 412', r.error?.status === 412, JSON.stringify(r));

reset(); stub.plan.invoke = async () => ({ data: { ...SIGNED, key: 'r2:audio/zz-zzzzzz.mp3' }, error: null });
r = await api.uploadMedia(KEY, file);
ok('مفتاحٌ مردودٌ غيرُ المطلوب: يُرفض ولا PUT', r.error && puts.length === 0, JSON.stringify(r));

reset(); stub.plan.invoke = async () => { throw new Error('يجب ألّا تُنادى'); };
r = await api.uploadMedia('audio/l1-abc123.mp3', file);
ok('بلا وسم: إلى Supabase كما كان (upsert:false) ولا دالّة ولا PUT',
   stub.calls.upload.length === 1 && stub.calls.upload[0].b === 'audio' && stub.calls.upload[0].path === 'l1-abc123.mp3'
   && stub.calls.upload[0].o.upsert === false && stub.calls.invoke.length === 0 && puts.length === 0 && r.error === null, JSON.stringify(stub.calls));

/* ─────────── ③ الرسائل ─────────── */
console.log('── ③ الرسائل (upload.js · upMsg)');
const up = read('js/upload.js');
const body = up.match(/function upMsg\(e, maxMb\)\{[\s\S]*?\n\}/);
ok('upMsg تُنتزع من upload.js كما تُشحن', !!body);
const upMsg = new Function(`${body[0]}; return upMsg;`)();
ok('403 ⇒ لا صلاحية', /لا صلاحية/.test(upMsg({ status: 403, message: 'x' }, 10)));
ok('413 ⇒ الحدُّ بالرقم', /\(10 م\.ب\)/.test(upMsg({ status: 413, message: 'x' }, 10)));
ok('412 ⇒ الاسم نفسه', /بالاسم نفسه/.test(upMsg({ status: 412, message: 'x' }, 10)));
ok('0 ⇒ «تعذّر الرفع — رُدّ الطلبُ…» بلا تكرار', upMsg({ status: 0, message: 'رُدّ الطلبُ أو انقطع الاتصال' }, 10) === 'تعذّر الرفع — رُدّ الطلبُ أو انقطع الاتصال');
ok('ورسالةُ Supabase القديمة ما زالت تُترجم', /لا صلاحية/.test(upMsg({ message: 'new row violates row-level security policy' }, 10)));
} finally { rmSync(tmp, { recursive: true, force: true }); }

console.log(`\n${n - bad}/${n}${bad ? ' — ❌ سقط ' + bad : ' — ✅'}`);
process.exit(bad ? 1 : 0);
