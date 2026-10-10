/* ══════════════════════════════════════════════════════════════════════
   بيان — قياسُ ناقل البطاقات  ·  `node tools/naqil_cards.test.mjs`
   ──────────────────────────────────────────────────────────────────────
   🔑 **ولماذا قياسٌ لملفٍّ يعيش في Apps Script:** الناقلُ يطوف بلا عينٍ
      عليه، ويكتب في القاعدة الحيّة، **ولا يُجرَّب إلا بأن يُشغَّل**.
      فما لا يُقاس هنا لا يُقاس أبداً حتى يقع.
   📌 وهو **لا يلمس شبكةً ولا Drive ولا قاعدة**: يُقلَّد كلُّ طرفٍ خارجيّ،
      ويُقاس المنطقُ وحدَه. فيُشغَّل في أيّ مكانٍ وفي أيّ وقت.
   ══════════════════════════════════════════════════════════════════════ */

/*  سقالةٌ تُقلّد ما يُقلَّد وحدَه: Drive والمخزنَ وخصائصَ السكربت.
    ✦ وشيفرةُ الناقل **تُقرأ من ملفّها كما هي** ولا يُنسخ منها سطر —
      فما يُقاس هو ما سيُلصق في Apps Script، لا نسخةٌ تشبهه.          */
import fs from 'node:fs';
import vm from 'node:vm';

const SRC = new URL('./naqil_cards.gs', import.meta.url).pathname;

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
const UPLOADS = [];
const CALLS   = [];
let   FAIL_AT = -1;                      // رقمُ الرفعة التي تفشل (للقياس)

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
        const key = url.split('/storage/v1/object/')[1];
        UPLOADS.push({ key, mime: opt.contentType, upsert: opt.headers['x-upsert'],
                       bytes: opt.payload.length, auth: opt.headers.Authorization });
        const bad = UPLOADS.length === FAIL_AT;
        return { getResponseCode: () => (bad ? 403 : 200),
                 getContentText: () => (bad ? '{"error":"new row violates"}' : '{}') };
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
        //  وحارسُ شكل المفتاح — مسطرةُ js/api.js نفسُها
        for (const c of cs) for (const f of ['image','front_image','audio']) {
          const v = c[f];
          if (v && !/^[a-z0-9][a-z0-9-]*\/.+$/.test(v) && !/^https?:\/\//i.test(v)) {
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
const ok  = (t, c, extra = '') => say.push((c ? '  ✔ ' : '  🔴 ') + t + (extra ? ' — ' + extra : ''));

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
ok('يطابق /^img\\/[a-z0-9]{1,8}-[a-z0-9]{6}\\.png$/', /^img\/s1-[a-z0-9]{6}\.png$/.test(k), k);
ok('ويقبله حارسُ 161 (مخزن/مسار)', /^[a-z0-9][a-z0-9-]*\/.+$/.test(k));
ok('ويعرفه KEY_SHAPE مفتاحاً', ctx.__K.test(k));
ok('واسمُ ملفٍّ محلّيّ ليس مفتاحاً', !ctx.__K.test('cell.png') && !ctx.__K.test('media/cell.png'));

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
ok('يُرفع ويعود بمفتاح', r1.ok && r1.fresh && /^img\/s1-/.test(r1.key), r1.key || r1.why);
ok('وترويسةُ النوع من اللاحقة لا من Drive', UPLOADS[0]?.mime === 'image/png', UPLOADS[0]?.mime);
ok('وupsert=false', UPLOADS[0]?.upsert === 'false');
ok('والتوكن في الترويسة', UPLOADS[0]?.auth === 'Bearer TOK');
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
console.log(say.join('\n')); say.length = 0;

console.log('\n═══ ④ الحمولةُ كلُّها ═══');
const payload = { cards: [
  { front: 'Cell',  back: 'خليّة', front_image: 'cell.png' },
  { front: 'Lung',  back: 'رئة',   image: 'media/lung.webp', audio: 'say.mp3' },
  { front: 'Net',   back: 'شبكة',  image: 'https://i.imgur.com/x.png' },
  { front: 'Done',  back: 'تمّ',    image: 'img/c5-a1b2c3.png' },
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
ok('ومرَّ اثنان كما هما (رابطٌ ومفتاح)', m.keep === 2);
ok('والحقولُ صارت مفاتيح',
   ctx4.__K.test(payload.cards[0].front_image)
   && ctx4.__K.test(payload.cards[1].image)
   && ctx4.__K.test(payload.cards[1].audio));
ok('والرابطُ الخارجيّ لم يُمسّ', payload.cards[2].image === 'https://i.imgur.com/x.png');
ok('والمفتاحُ الجاهز لم يُمسّ', payload.cards[3].image === 'img/c5-a1b2c3.png');
ok('وبطاقةٌ بلا وسيطٍ بلا حقول', !('image' in payload.cards[4]));
ok('والمخزنُ تلقّى ثلاثاً لا أكثر', UPLOADS.length - before === 3);

const p2 = { cards: [{ front:'A', back:'ب', image:'ghost.png' }] };
const m2 = ctx4.media_('TOK', p2, dir, 's1', DEADLINE);
ok('🔴 ووسيطٌ معدومٌ يردُّ الدفعةَ كلَّها', !m2.ok && /البطاقةُ 1/.test(m2.why) && /لا ملفَّ/.test(m2.why));

FAIL_AT = UPLOADS.length + 1;
const p3 = { cards: [{ front:'B', back:'ب', image:'media/lung.webp' }] };
ctx4.forgetMedia();
const m3 = ctx4.media_('TOK', p3, dir, 's1', DEADLINE);
ok('🔴 ورفعٌ يردُّه المخزنُ يقف بالدفعة ويسمّي السبب',
   !m3.ok && /can_upload_media/.test(m3.why), (m3.why||'').slice(0,60));
FAIL_AT = -1;

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
  UPLOADS.length = 0; CALLS.length = 0;

  const r = ctx5.carry_('TOK', json, 'العلوم المتكاملة', { course:12, subject:1 }, Date.now());
  ok('اعتُمد', r.wrote && !r.alarm, (r.text||'').split('\n')[0]);
  ok('🔑 والرفعُ **قبل** الجافّة', UPLOADS.length === 3 && CALLS.length === 2
     && CALLS[0].dry === true);
  ok('والجافّةُ رأت مفاتيحَ لا أسماءَ ملفّات',
     ctx5.__K.test(CALLS[0].payload.cards[0].front_image));
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
