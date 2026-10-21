/* ══════════════════════════════════════════════════════════════════════
   بيان — قياسُ ناقل البطاقات  ·  `node tools/naqil_cards.test.mjs`
   ──────────────────────────────────────────────────────────────────────
   🔑 **ولماذا قياسٌ لملفٍّ يعيش في Apps Script:** الناقلُ يطوف بلا عينٍ
      عليه، ويكتب في القاعدة الحيّة، **ولا يُجرَّب إلا بأن يُشغَّل**.
      فما لا يُقاس هنا لا يُقاس أبداً حتى يقع.
   📌 وهو **لا يلمس شبكةً ولا Drive ولا قاعدة**: يُقلَّد كلُّ طرفٍ خارجيّ،
      ويُقاس المنطقُ وحدَه. فيُشغَّل في أيّ مكانٍ وفي أيّ وقت.
   🔴 **واستُعيد في b161** — حُذف يوم ١٣ أكتوبر (`4aab3cd`) بلا تعليل، وكان
      يصدق كلُّه على الناقل يومئذ. ورُفع معه عيبُه: **كان يخرج بالرمز ٠ ولو
      سقطت حالات** — فأخضرُ CI أو الطرفيّة يكذب. ⇒ يخرج اليومَ بـ١ عند أيّ سقوط.
   🆕 b161 · والرفعُ صار إلى R2: توقيعٌ من الدالّة `r2-sign` ثمّ `PUT`. والدالّةُ
      المقلَّدةُ تُجيب **بمنطقها الحقيقيّ** (`core.js` · `check`) لا بنسخة —
      فإن افترقت مسطرةُ الناقل عن مسطرتها سقط القياس.
   ══════════════════════════════════════════════════════════════════════ */

/*  سقالةٌ تُقلّد ما يُقلَّد وحدَه: Drive والمخزنَ وخصائصَ السكربت.
    ✦ وشيفرةُ الناقل **تُقرأ من ملفّها كما هي** ولا يُنسخ منها سطر —
      فما يُقاس هو ما سيُلصق في Apps Script، لا نسخةٌ تشبهه.          */
import fs from 'node:fs';
import vm from 'node:vm';

const SRC = new URL('./naqil_cards.gs', import.meta.url).pathname;
/*  🆕 b161 · منطقُ الدالّة الطرفيّة نفسُه — به تُجيب الدالّةُ المقلَّدة. */
const { check } = await import(new URL('../supabase/functions/r2-sign/core.js', import.meta.url));

/* ── Drive مُقلَّد: شجرةُ مجلداتٍ وملفّات ───────────────────────── */
let NEXT = 1;
function mkFile(name, size, bytes = 'x', updated = 1000) {
  const id = 'f' + (NEXT++);
  return {
    _f: true, id, name, size, updated,
    getId: () => id, getName: () => name, getSize: () => size,
    getLastUpdated: function(){ return new Date(this.updated); },  // الخاصّيةَ لا المُغلَقَ عليه
    getBlob: () => ({ getBytes: () => Buffer.from(bytes),
                      getDataAsString: () => bytes }),
    getMimeType: () => 'application/octet-stream',
    getParents: function(){ return iter(this._parents || []); },
  };
}
function mkDir(name, files = [], dirs = []) {
  const d = {
    _d: true, name, files, dirs,
    getName: () => name, getId: () => 'd:' + name,
    getFiles: () => iter(files),
    getFolders: () => iter(dirs),
    getFilesByName:   n => iter(files.filter(f => f.name === n)),
    getFoldersByName: n => iter(dirs .filter(x => x.name === n)),
  };
  files.forEach(f => (f._parents = [d]));
  return d;
}
const iter = a => { let i = 0; return { hasNext: () => i < a.length, next: () => a[i++] }; };

/* ── المخزنُ والشبكة ─────────────────────────────────────────── */
const UPLOADS = [];                      // ما بلغ R2 (PUT)
const SIGNS   = [];                      // طلباتُ التوقيع من r2-sign
const STORAGE = [];                      // 🔴 ما بلغ Supabase Storage — يجب أن يبقى صفراً
const CALLS   = [];
let   FAIL_AT = -1;                      // رقمُ الرفعة التي يردّها R2 (للقياس)
let   FAIL_CODE = 403;                   // ورمزُها: 403 توقيعٌ مخالف · 412 اسمٌ قائم
let   SIGN_DENY = false;                 // الدالّةُ تردّ الصلاحية (403)
let   SIGN_TYPE = null;                  // نوعٌ تُرجعه الدالّة غيرُ نوعها (لقياس افتراق المسطرتين)

function makeCtx(root) {
  const props = new Map();
  const ctx = {
    console, Date, Math, JSON, String, Number, Object, Array, Boolean, RegExp, Error,
    PropertiesService: { getScriptProperties: () => ({
      getProperty: k => (props.has(k) ? props.get(k) : null),
      setProperty: (k, v) => props.set(k, v),
      deleteProperty: k => props.delete(k),
      getKeys: () => [...props.keys()],
    })},
    DriveApp: { getFolderById: () => root, getFoldersByName: n => iter([root]) },
    Utilities: {
      DigestAlgorithm: { SHA_256: 1 }, Charset: { UTF_8: 1 },
      computeDigest: (a, t) => [...Buffer.from(String(t))].slice(0, 32),
    },
    Logger: { log: () => {} },
    LockService: { getScriptLock: () => ({ tryLock: () => true, releaseLock(){} }) },
    ScriptApp: { getProjectTriggers: () => [], newTrigger: () => ({ timeBased: () => ({ everyHours: () => ({ create(){} }) }) }) },
    Session: { getEffectiveUser: () => ({ getEmail: () => 'x@y.z' }) },
    MailApp: { sendEmail: () => {} },
    UrlFetchApp: { fetch: (url, opt) => {
      if (url.includes('/storage/v1/object/')) {
        STORAGE.push(url);
        return { getResponseCode: () => 200, getContentText: () => '{}' };
      }
      /*  الدالّةُ الطرفيّة: الصلاحيةُ أوّلاً ثمّ `check` الحقيقيّة — كترتيبها هناك. */
      if (url.includes('/functions/v1/r2-sign')) {
        const b = JSON.parse(opt.payload);
        SIGNS.push({ key: b.key, size: b.size, auth: opt.headers.Authorization, apikey: opt.headers.apikey });
        const reply = (code, obj) => ({ getResponseCode: () => code, getContentText: () => JSON.stringify(obj) });
        if (SIGN_DENY) return reply(403, { error: 'الرفعُ للمؤلّفين المأذونين وحدهم' });
        const c = check(b);
        if (c.error) return reply(c.status, { error: c.error });
        return reply(200, { key: c.key, expires_in: 600,
          url: 'https://acct.r2.cloudflarestorage.com/bayan-media/' + c.path + '?X-Amz-Signature=x',
          headers: { 'Content-Type': SIGN_TYPE || c.type, 'If-None-Match': '*' } });
      }
      if (url.includes('.r2.cloudflarestorage.com/')) {
        const path = url.split('/bayan-media/')[1].split('?')[0];
        UPLOADS.push({ key: 'r2:' + path, method: opt.method, mime: opt.contentType,
                       inm: opt.headers['If-None-Match'], bytes: opt.payload.length });
        const bad = UPLOADS.length === FAIL_AT;
        return { getResponseCode: () => (bad ? FAIL_CODE : 200),
                 getContentText: () => (bad ? '<Error><Code>' + (FAIL_CODE === 412 ? 'PreconditionFailed' : 'SignatureDoesNotMatch') + '</Code></Error>' : '') };
      }
      if (url.includes('/rpc/import_cards')) {
        const b = JSON.parse(opt.payload);
        CALLS.push({ dry: b.p_dry_run, payload: b.p_payload });
        const cs = b.p_payload && b.p_payload.cards;
        //  حارسُ 161 كما هو: غيابُ القائمة يُردّ باسمه
        if (!Array.isArray(cs)) {
          return { getResponseCode: () => 200, getContentText: () =>
            JSON.stringify({ ok:false, 'أخطاء':['المفتاح cards غائبٌ أو ليس قائمة'] }) };
        }
        //  وحارسُ شكل المفتاح — مسطرةُ `170` (وسمُ r2: اختياريّ قبل مخزن/مسار)
        for (const c of cs) for (const f of ['image','front_image','audio']) {
          const v = c[f];
          if (v && !/^(r2:)?[a-z0-9][a-z0-9-]*\/.+$/.test(v) && !/^https?:\/\//i.test(v)) {
            return { getResponseCode: () => 200, getContentText: () =>
              JSON.stringify({ ok:false, 'أخطاء':[f + ' ليس مفتاحَ مخزنٍ ولا رابطاً: ' + v] }) };
          }
        }
        return { getResponseCode: () => 200, getContentText: () => JSON.stringify({
          ok:true, 'المادة':1, 'المجموعة':7,
          'الخطّة':{ 'سيُنشأ': cs.length, 'سيُحدَّث':0 },
          'أُنشئت': cs.length, 'حُدِّثت':0,
          'وصلاتُ دروسٍ وقعت':0, 'وصلاتُ فروعٍ وقعت':0 }) };
      }
      return { getResponseCode: () => 200, getContentText: () => '{}' };
    }},
    __props: props,
  };
  vm.createContext(ctx);
  /*  ⚠️ `const` في أعلى سكربتٍ لا يصير خاصّيةً في السياق (نطاقٌ معجميّ)،
      و`function` يصير. فيُلحَق بالمصدر ذيلٌ **يكشف الثوابتَ ولا يغيّرها** —
      ولا يُمسّ المصدرُ بحرف.  */
  const tail = ';globalThis.__K = KEY_SHAPE; globalThis.__MEDIA = MEDIA;'
             + 'globalThis.__MIME = MIME; globalThis.__READ = READ_CARD;'
             + 'globalThis.__LOST = LOST_CARD; globalThis.__CFG = CFG;';
  vm.runInContext(fs.readFileSync(SRC, 'utf8') + tail, ctx, { filename: 'naqil_cards.gs' });
  return ctx;
}

/* ── الحالات ──────────────────────────────────────────────────── */
const say = [];
/*  🔴 b161 · والعدُّ كلِّيٌّ لا لكلّ قسم: الأقسامُ تُفرغ `say` بعد طباعتها، فكان
    سقوطٌ في ①–③ لا يبلغ رمزَ الخروج أبداً. ⇒ `FAILS` يعدّ كلَّ حالةٍ حيث وقعت. */
let FAILS = 0, CASES = 0;
const ok  = (t, c, extra = '') => { CASES++; if (!c) FAILS++;
  say.push((c ? '  ✔ ' : '  🔴 ') + t + (extra ? ' — ' + extra : '')); };

const png  = mkFile('cell.png', 5000, 'PNGDATA');
const deep = mkFile('lung.webp', 4000, 'WEBP');
const big  = mkFile('huge.png', 3_000_000, 'BIG');
const wrong= mkFile('notes.txt', 100, 'TXT');
const dup1 = mkFile('two.png', 10, 'A'), dup2 = mkFile('two.png', 10, 'B');
const mp3  = mkFile('say.mp3', 20000, 'MP3');
const sub  = mkDir('media', [deep]);
const dir  = mkDir('العلوم المتكاملة', [png, big, wrong, dup1, dup2, mp3], [sub]);
const root = mkDir('cards', [], [dir]);

const ctx = makeCtx(root);
const DEADLINE = Date.now() + 60000;
const spec = { bucket: 'img', max: 2097152 };

console.log('═══ ① شكلُ المفتاح — مسطرةُ js/media.js ═══');
const k = ctx.mediaKey_('img', 's1', 'png');
ok('🆕 موسومٌ r2: ويطابق /^r2:img\\/s1-[a-z0-9]{6}\\.png$/', /^r2:img\/s1-[a-z0-9]{6}\.png$/.test(k), k);
ok('ويقبله حارسُ 170 (r2:مخزن/مسار)', /^(r2:)?[a-z0-9][a-z0-9-]*\/.+$/.test(k));
ok('🆕 وتقبله الدالّةُ r2-sign بمنطقها', !check({ key: k, size: 10 }).error);
ok('ويعرفه KEY_SHAPE مفتاحاً', ctx.__K.test(k));
ok('🆕 والمفتاحُ القديم بلا وسم (Supabase) ما زال مفتاحاً يمرّ', ctx.__K.test('img/c5-a1b2c3.png'));
ok('واسمُ ملفٍّ محلّيّ ليس مفتاحاً', !ctx.__K.test('cell.png') && !ctx.__K.test('media/cell.png'));
/* 🆕 ومسطرتا النوع واحدة: MIME الناقل = RULES الدالّة — لاحقةً لاحقة */
const RULES_TYPES = {}; for (const [e, ty] of Object.entries(ctx.__MIME)) {
  const b = ty.startsWith('image/') ? 'img' : 'audio';
  RULES_TYPES[e] = check({ key: b + '/x-abc123.' + e, size: 1 }).type; }
ok('🆕 MIME الناقل = أنواعُ الدالّة لكلّ لاحقة', Object.entries(ctx.__MIME).every(([e, ty]) => RULES_TYPES[e] === ty),
   JSON.stringify(Object.entries(ctx.__MIME).filter(([e, ty]) => RULES_TYPES[e] !== ty)));
ok('🆕 وحدودُ الناقل = حدودُ الدالّة', ctx.__MEDIA.image.max === 2 * 1048576 && ctx.__MEDIA.audio.max === 10 * 1048576
   && !check({ key: 'img/x-abc123.png', size: 2 * 1048576 }).error && check({ key: 'img/x-abc123.png', size: 2 * 1048576 + 1 }).status === 413
   && !check({ key: 'audio/x-abc123.mp3', size: 10 * 1048576 }).error && check({ key: 'audio/x-abc123.mp3', size: 10 * 1048576 + 1 }).status === 413);

console.log(say.join('\n')); say.length = 0;

console.log('\n═══ ② البحثُ في Drive ═══');
ok('بجوار الـJSON', ctx.findFile_(dir, 'cell.png').file?.getName() === 'cell.png');
ok('وفي مجلدٍ تحته', ctx.findFile_(dir, 'media/lung.webp').file?.getName() === 'lung.webp');
ok('ولا صعودَ فوقه', /يصعد فوق/.test(ctx.findFile_(dir, '../x.png').why));
ok('ومعدومٌ يُسمّى', /لا ملفَّ/.test(ctx.findFile_(dir, 'ghost.png').why));
ok('ومكرَّرٌ يُردّ ولا يُختار', /ملفّان/.test(ctx.findFile_(dir, 'two.png').why));
ok('ومجلدٌ معدوم يُسمّى', /لا مجلدَ/.test(ctx.findFile_(dir, 'nope/x.png').why));
console.log(say.join('\n')); say.length = 0;

console.log('\n═══ ③ وسيطٌ واحد ═══');
const r1 = ctx.carryMedia_('TOK', 'cell.png', dir, spec, 's1');
ok('يُرفع ويعود بمفتاحٍ موسوم', r1.ok && r1.fresh && /^r2:img\/s1-/.test(r1.key), r1.key || r1.why);
ok('🆕 التوقيعُ من r2-sign بالمفتاح والحجم والتوكن', SIGNS[0]?.key === r1.key && SIGNS[0]?.size === 7
   && SIGNS[0]?.auth === 'Bearer TOK' && !!SIGNS[0]?.apikey, JSON.stringify(SIGNS[0]));
ok('🆕 ثمّ PUT إلى R2 بالمفتاح نفسِه', UPLOADS[0]?.method === 'put' && UPLOADS[0]?.key === r1.key && UPLOADS[0]?.bytes === 7);
ok('وترويسةُ النوع من اللاحقة لا من Drive', UPLOADS[0]?.mime === 'image/png', UPLOADS[0]?.mime);
ok('🆕 وIf-None-Match: * (لا طمس — خلفُ x-upsert:false)', UPLOADS[0]?.inm === '*');
ok('🔴 ولا شيءَ بلغ Supabase Storage', STORAGE.length === 0, STORAGE.join(' · '));
const r2 = ctx.carryMedia_('TOK', 'cell.png', dir, spec, 's1');
ok('🔑 وثانيةً: يُعاد المفتاحُ ولا يُرفع', r2.ok && !r2.fresh && r2.key === r1.key && UPLOADS.length === 1);
png.updated = 9999;
const r3 = ctx.carryMedia_('TOK', 'cell.png', dir, spec, 's1');
ok('وتغيُّرُ الملفّ في Drive يُرفع من جديد', r3.ok && r3.fresh && r3.key !== r1.key && UPLOADS.length === 2);
ok('وكبيرٌ يُردّ بحدِّ المخزن', /حجمُه .* وحدُّ المخزن 2097152/.test(ctx.carryMedia_('TOK','huge.png',dir,spec,'s1').why));
ok('ولاحقةٌ لا تصلح تُردّ', /لا تصلح لمخزن/.test(ctx.carryMedia_('TOK','notes.txt',dir,spec,'s1').why));
ok('وصوتٌ في مخزن الصور يُردّ',
   /لا تصلح لمخزن/.test(ctx.carryMedia_('TOK','say.mp3',dir,spec,'s1').why));
ok('وصوتٌ في مخزنه يُقبل',
   ctx.carryMedia_('TOK','say.mp3',dir,{bucket:'audio',max:10485760},'s1').ok);
ok('وترويسةُ الصوت audio/mpeg', UPLOADS[UPLOADS.length-1]?.mime === 'audio/mpeg');

/* 🆕 b161 · ما تردّه الدالّةُ وR2 — والسببُ يُسمّى في كلٍّ */
const fresh = name => { const f = mkFile(name, 30, 'Z' + name); dir.files.push(f); f._parents = [dir]; return name; };
SIGN_DENY = true; let n0 = UPLOADS.length;
let rr = ctx.carryMedia_('TOK', fresh('deny.png'), dir, spec, 's1');
ok('🆕 الدالّةُ تردّ الصلاحية ⇒ يُسمّى can_upload_media ولا PUT', !rr.ok && /can_upload_media/.test(rr.why) && UPLOADS.length === n0, rr.why);
SIGN_DENY = false;
FAIL_AT = UPLOADS.length + 1; FAIL_CODE = 412;
rr = ctx.carryMedia_('TOK', fresh('clash.png'), dir, spec, 's1');
ok('🆕 R2 يردّ اسماً قائماً (412) ⇒ «موجودٌ سلفاً»', !rr.ok && /موجودٌ سلفاً/.test(rr.why), rr.why);
FAIL_AT = UPLOADS.length + 1; FAIL_CODE = 403;
rr = ctx.carryMedia_('TOK', fresh('sig.png'), dir, spec, 's1');
ok('🆕 R2 يردّ التوقيع (403) ⇒ يُسمّى النوعُ والحجم', !rr.ok && /النوعَ والحجم/.test(rr.why), rr.why);
FAIL_AT = -1;
SIGN_TYPE = 'image/x-png'; n0 = UPLOADS.length;
rr = ctx.carryMedia_('TOK', fresh('type.png'), dir, spec, 's1');
ok('🆕 نوعُ الدالّة غيرُ نوع الناقل ⇒ يُردّ ولا PUT', !rr.ok && /مسطرتان افترقتا/.test(rr.why) && UPLOADS.length === n0, rr.why);
SIGN_TYPE = null;
ok('🔴 ولا شيءَ بلغ Supabase Storage في القسم كلّه', STORAGE.length === 0);
console.log(say.join('\n')); say.length = 0;

console.log('\n═══ ④ الحمولةُ كلُّها ═══');
const payload = { cards: [
  { front: 'Cell',  back: 'خليّة', front_image: 'cell.png' },
  { front: 'Lung',  back: 'رئة',   image: 'media/lung.webp', audio: 'say.mp3' },
  { front: 'Net',   back: 'شبكة',  image: 'https://i.imgur.com/x.png' },
  { front: 'Done',  back: 'تمّ',    image: 'img/c5-a1b2c3.png' },
  { front: 'R2',    back: 'موسوم',  image: 'r2:img/c5-a1b2c4.png' },
  { front: 'Plain', back: 'بلا شيء' },
]};
/*  🔑 سياقٌ جديدٌ بذاكرةٍ فارغة: القسمُ ③ رفع `cell.png` و`say.mp3`،
    فقياسُ «كم رُفع» هنا على السياق نفسِه يقيس أثرَ ما قبله لا هذه
    الحمولةَ. (وقد وقعتُ فيه فظهر up=1 حيث انتظرتُ ٣ — والعيبُ في
    التوقّع لا في الناقل: إعادةُ المفتاح هي المطلوبةُ بعينها.)  */
const ctx4 = makeCtx(root);
const before = UPLOADS.length;
const m = ctx4.media_('TOK', payload, dir, 's1', DEADLINE);
ok('مرّت', m.ok, m.why);
ok('رُفع ثلاثة', m.up === 3, 'up=' + m.up + ' same=' + m.same + ' keep=' + m.keep);
ok('ومرَّ ثلاثةٌ كما هي (رابطٌ ومفتاحٌ قديم ومفتاحٌ موسوم)', m.keep === 3, 'keep=' + m.keep);
ok('والحقولُ صارت مفاتيح',
   ctx4.__K.test(payload.cards[0].front_image)
   && ctx4.__K.test(payload.cards[1].image)
   && ctx4.__K.test(payload.cards[1].audio));
ok('والرابطُ الخارجيّ لم يُمسّ', payload.cards[2].image === 'https://i.imgur.com/x.png');
ok('والمفتاحُ الجاهز لم يُمسّ', payload.cards[3].image === 'img/c5-a1b2c3.png');
ok('🆕 والموسومُ الجاهز لم يُمسّ', payload.cards[4].image === 'r2:img/c5-a1b2c4.png');
ok('وبطاقةٌ بلا وسيطٍ بلا حقول', !('image' in payload.cards[5]));
ok('🆕 والحقولُ المرفوعة موسومةٌ r2:', /^r2:/.test(payload.cards[0].front_image) && /^r2:/.test(payload.cards[1].image)
   && /^r2:/.test(payload.cards[1].audio));
ok('وR2 تلقّى ثلاثاً لا أكثر', UPLOADS.length - before === 3);

const p2 = { cards: [{ front:'A', back:'ب', image:'ghost.png' }] };
const m2 = ctx4.media_('TOK', p2, dir, 's1', DEADLINE);
ok('🔴 ووسيطٌ معدومٌ يردُّ الدفعةَ كلَّها', !m2.ok && /البطاقةُ 1/.test(m2.why) && /لا ملفَّ/.test(m2.why));

SIGN_DENY = true;
const p3 = { cards: [{ front:'B', back:'ب', image:'media/lung.webp' }] };
ctx4.forgetMedia();
const m3 = ctx4.media_('TOK', p3, dir, 's1', DEADLINE);
ok('🔴 ورفعٌ تردُّه الدالّةُ يقف بالدفعة ويسمّي السبب',
   !m3.ok && /can_upload_media/.test(m3.why), (m3.why||'').slice(0,60));
SIGN_DENY = false;

const m4 = ctx4.media_('TOK', { cards:[{front:'C',back:'ج',image:'cell.png'}] },
                      dir, 's1', Date.now() - 1);
ok('⏱️ وانقطاعُ الوقت يؤجّل الملفَّ كلَّه', !m4.ok && /انقطع الوقت/.test(m4.why));
console.log(say.join('\n'));

const bad = say.filter(x => x.startsWith('  🔴 ')).length;   // بدايةُ السطر لا وسطُه
console.log('\n' + (bad ? '🔴 ' + bad + ' حالةٌ خالفت' : '✅ الحالاتُ كلُّها صدقت'));


console.log('\n═══ ⑤ المسارُ كلُّه — carry_ بترتيبه الجديد ═══');
say.length = 0;
{
  const json = mkFile('bio.json', 400, JSON.stringify({ cards: [
    { front:'Cell', back:'خليّة', front_image:'cell.png', image:'media/lung.webp' },
    { front:'Say',  back:'قول',   audio:'say.mp3' },
  ]}));
  const dir5  = mkDir('العلوم المتكاملة', [json, mkFile('cell.png',500,'P'),
                                            mkFile('say.mp3',900,'M')],
                      [mkDir('media', [mkFile('lung.webp',700,'W')])]);
  const ctx5 = makeCtx(mkDir('cards', [], [dir5]));
  UPLOADS.length = 0; CALLS.length = 0; SIGNS.length = 0;

  const r = ctx5.carry_('TOK', json, 'العلوم المتكاملة', { course:12, subject:1 }, Date.now());
  ok('اعتُمد', r.wrote && !r.alarm, (r.text||'').split('\n')[0]);
  ok('🔑 والرفعُ **قبل** الجافّة', UPLOADS.length === 3 && CALLS.length === 2
     && CALLS[0].dry === true);
  ok('والجافّةُ رأت مفاتيحَ لا أسماءَ ملفّات',
     ctx5.__K.test(CALLS[0].payload.cards[0].front_image));
  ok('🆕 مفاتيحَ موسومةً r2: — وقبلتها البوّابةُ (170)', /^r2:img\//.test(CALLS[0].payload.cards[0].front_image)
     && /^r2:audio\//.test(CALLS[0].payload.cards[1].audio));
  ok('🆕 وكلُّ رفعةٍ سبقها توقيع', SIGNS.length === 3 && SIGNS.every((s, i) => s.key === UPLOADS[i].key));
  ok('والاعتمادُ رأى المفاتيحَ نفسَها',
     CALLS[1].dry === false &&
     CALLS[1].payload.cards[0].front_image === CALLS[0].payload.cards[0].front_image);
  ok('والتقريرُ يحكي الوسائط', /🖼 وسائط: رُفع 3/.test(r.text), (r.text.match(/🖼.*/)||[''])[0]);
  ok('ولا صياحَ بحقلٍ صامت', !/تسقط صامتةً/.test(r.text));

  //  ثانيةً بالملفّ نفسِه: بصمةُ الـJSON لم تتغيّر ⇒ صمتٌ تامّ
  const again = ctx5.carry_('TOK', json, 'العلوم المتكاملة', { course:12, subject:1 }, Date.now());
  ok('وإعادةُ الجولة: لا نداءَ ولا رفع', again.quiet && UPLOADS.length === 3 && CALLS.length === 2);

  //  ملفٌّ بلا قائمة: الحارسُ رُفع من الناقل ⇒ البوّابةُ هي التي تردّ
  const bad = mkFile('bad.json', 20, '{"cardz":[]}');
  mkDir('x', [bad]);
  const rb = ctx5.carry_('TOK', bad, 'العلوم المتكاملة', { course:12, subject:1 }, Date.now());
  ok('🔴 وحمولةٌ بلا `cards` تردُّها **البوّابةُ** باسمها لا الناقل',
     rb.alarm && /رُدَّت جملةً/.test(rb.text) && /cards غائب/.test(rb.text));
  ok('ولم يُرفع لها وسيط', UPLOADS.length === 3);
}
console.log(say.join('\n'));
const bad5 = say.filter(x => x.startsWith('  🔴 ')).length;
console.log('\n' + (bad5 ? '🔴 ' + bad5 + ' حالةٌ خالفت في ⑤' : '✅ والمسارُ كلُّه صدق'));
console.log('🔴 ما بلغ Supabase Storage: ' + STORAGE.length + (STORAGE.length ? ' — والمنتظَرُ صفر' : ''));

/* 🔴 b161 · رمزُ الخروج يقول الحقّ — وكان صفراً دائماً ولو سقطت حالات. */
console.log('\n' + (CASES - FAILS) + '/' + CASES + (FAILS ? ' — 🔴 سقط ' + FAILS : ' — ✅'));
process.exit(FAILS || STORAGE.length ? 1 : 0);
