/* ══════════════════════════════════════════════════════════════════════
   بيان — ناقلُ البطاقات  ·  Apps Script  ·  ١٠ أكتوبر ٢٠٢٦
   ──────────────────────────────────────────────────────────────────────
   يطوف مجلدَ `cards` في Drive كلَّ ساعة، فما وُضع فيه يبلغ القاعدةَ وحدَه
   عبر البوّابة `import_cards` (الملفّ ١٥٩ · ١٦١): **تُرفع وسائطُه أوّلاً
   ويُكتب مفتاحُ كلٍّ مكانَ اسمِه**، ثمّ جافّةٌ، ثمّ اعتمادٌ إن صدقت.
   والتقريرُ بريد.

   ┌─────────── ثوابتُ هذا السكربت ───────────┐
   │                                                                  │
   │  ①  🔴 **لا يحمل من القانون حرفاً.** لا يفحص بطاقةً، ولا يعرف      │
   │     ما الوجهُ ولا ما كودُ التشخيص. العقدُ كلُّه في `import_cards`،  │
   │     وهذا يقرأ الخامَ ويُنادي ويحكي. وسابقتُه مكتوبةٌ في رأس         │
   │     `js/editor_import.js`: صندوقُ الاستيراد القديم حمل نسخةً من    │
   │     الحراسة فسقط منها ثلاثةُ حقولٍ صامتةً. **ونسختان من مسطرةٍ      │
   │     واحدة تفترقان.** فحرّاسُ هذا الملفّ كلُّها عن **النقل** —        │
   │     الوصولُ والحجمُ والهويّة — لا عن المحتوى.                       │
   │     ✅ **والاستثناءُ الموقوتُ رُفع في ١٠ أكتوبر:** كان هنا حارسٌ     │
   │     يقف مكانَ ثقبٍ في البوّابة (غيابُ `cards` يمرّ بـ«تمّت»)،       │
   │     وقد **سدّه `sql/161`** وقِيس على الحيّ أنّه صار `ok=false`.      │
   │     فرُفع الحارسُ كما وُعد — **ولا تبقى مسطرتان لحكمٍ واحد.**       │
   │                                                                  │
   │  ②  🔑 **البصمةُ هنا للناقل لا للقاعدة.** البوّابةُ بلا بصمةِ دفعةٍ  │
   │     بقصد (ثابت ③ في ١٥٩): `cards_deck_key` يجعل إعادةَ الاستيراد   │
   │     تصحيحاً بذاتها. لكنّ **الجافّةَ تُخلّف سطراً في `import_log`**   │
   │     — قِيس على الحيّ: السطر ٢٨٠ `dry_run = true` باقٍ. فمؤقّتٌ      │
   │     يطوف كلَّ ساعة بلا ذاكرةٍ يُنتج سطرَين لكلّ ملفٍّ كلَّ ساعة       │
   │     ⇒ **سجلٌّ لا يُقرأ**. فالبصمةُ تمنع ضجيجَ الإعادة، ولا تمنع     │
   │     تصحيحاً: **ملفٌّ تغيّر يُحمل من جديد**، وهذا خلافُ الاختبارات    │
   │     (هناك يُحكى بريداً لأنّ السؤال المُجاب عنه يتقاعد ولا يُعدَّل).   │
   │                                                                  │
   │  ③  🔒 **البابُ للمدير، والمعلّمَ تردُّه البوّابة.** `import_cards`  │
   │     تشترط `can_curate` (= `is_admin() or curator`) لأنّ المجموعةَ  │
   │     رسميّةٌ للمادّة كلِّها. وناقلُ الاختبارات يعمل بجلسة معلّم،      │
   │     **وهذه لا تكفي هنا.** والسرُّ في خصائص السكربت لا في شيفرته.   │
   │                                                                  │
   │  ④  📐 **المجلدُ يحكم المقرَّر، لا اسمُ الملفّ ولا ما فيه.** خريطةٌ  │
   │     صريحةٌ في `MAP` أدناه، وهي سابقةُ ناقل الاختبارات حرفاً. وملفٌّ  │
   │     في مجلدٍ لا خريطةَ له **يُحكى ولا يُحمل** — ولا يُخمَّن له مقرَّر. │
   │                                                                  │
   │  ⑥  🖼 **والوسيطُ يُرفع قبل أن يُنادى الاعتماد، وذاكرتُه تمنع        │
   │     تكرارَه.** الملفّ يكتب **اسمَ الصورة كما هي في المجلد**         │
   │     (`cell.png` أو `media/cell.png`)، والناقلُ يرفعها إلى المخزن    │
   │     ويكتب **مفتاحَها** مكانَ اسمها في الحمولة. وملفُّ Drive لا       │
   │     يُمسّ بحرف: التبديلُ في النسخة المرسَلة وحدَها.                  │
   │     🔑 **والمفتاحُ يُولَّد بمسطرة `js/media.js` نفسِها**             │
   │     (`مخزن/وسم-ستُّ خاناتٍ.لاحقة`) — فما ترفعه الشاشةُ وما يرفعه     │
   │     الناقلُ شيءٌ واحدٌ في المخزن، لا شكلان.                         │
   │     📌 **والذاكرةُ على ملفِّ الوسيط لا على الـJSON:** صورةٌ رُفعت     │
   │     مرّةً يُعاد مفتاحُها ولا تُرفع ثانيةً، ولو أُعيد حملُ الملفّ       │
   │     عشراً. **وصورةٌ تغيّرت في Drive تُرفع من جديد** لأنّ الذاكرةَ    │
   │     تحمل وقتَ تعديلها.                                             │
   │                                                                  │
   │  ⑤  ⚖️ **والنشرُ ليس هنا.** البطاقةُ تبلغ الطالبَ بمجموعتها         │
   │     الرسميّة بلا نقرةِ نشر، فهذا الناقلُ **يكتب معجمَ المادّة**      │
   │     ولا يفتح شاشةً. ومن أراد وقفَه فإيقافُ المؤقّت (`uninstall`).    │
   │                                                                  │
   └──────────────────────────────────────────────────────────────────┘

   ⚙️ **ما يُثبَّت مرّةً — في «إعدادات المشروع ⇒ خصائص السكربت»:**

        BAYAN_EMAIL           بريدُ حسابٍ مديرٍ في بيان
        BAYAN_PASSWORD        كلمتُه
        BAYAN_CARDS_ROOT_ID   (اختياريّ) معرّفُ مجلد cards في Drive
        BAYAN_MAIL_TO         (اختياريّ) مُستقبِلُ التقرير

   ⚠️ **ولا سرَّ في هذا الملفّ ولا بريدَ شخصيّ** — فهو ملفٌّ يصلح للمستودع
      العامّ كما هو. والمفتاحُ العامّ أدناه مكشوفٌ عمداً (`js/api.js`
      يحمله)، والحمايةُ في RLS.

   ▶️ **الترتيب أوّلَ مرّة:** `probe()` يُقرأ ناتجُه ⇒ تُضبط `MAP` على
      أسماء المجلدات كما هي في Drive ⇒ `round()` مرّةً بيدٍ ⇒ `install()`.

   ✍️ **وكيف يُكتب الوسيطُ في الـJSON — سطرٌ واحدٌ يكفي المؤلّف:**

        {
          "cards": [
            { "front": "Cell", "back": "خليّة",
              "front_image": "cell.png",          ← بجوار ملفّ الـJSON
              "image":       "media/lung.webp",   ← في مجلدٍ تحته
              "audio":       "say.mp3" },

            { "front": "Net", "back": "شبكة",
              "image": "https://i.imgur.com/x.png" }   ← رابطٌ يمرُّ كما هو
          ]
        }

      · `front_image` صورةُ **الوجه** (مع السؤال) · `image` صورةُ **المعنى**
        (بعد الكشف) · `audio` النُّطق.
      · والصورةُ تُقبل `png · jpg · jpeg · webp` وحدُّها ٢ م.ب، والصوتُ
        `mp3 · m4a · ogg · wav · aac` وحدُّه ١٠ م.ب — **وهي حدودُ المخزن
        نفسُها**، لا حدودٌ يضعها الناقل.
      · 🔴 **ووسيطٌ لا يُعثر عليه يردُّ الدفعةَ كلَّها** ويُسمّى في البريد
        ببطاقته وحقله. وذاك مقصود: بطاقةٌ تشير إلى لا شيءٍ أسوأُ من
        بطاقةٍ بلا صورة — الأولى تُصدَّق والثانية تُرى.
      · 📌 **وصورةٌ لا تُرفع مرّتين**: ذاكرةُ الناقل تحفظ مفتاحَ كلِّ وسيطٍ
        رفعه. فإن غُيّر الملفُّ في Drive رُفع من جديد، وإن لم يُغيَّر أُعيد
        مفتاحُه ولو حُمل الـJSON عشراً.
      · ⚠️ **والناقلُ يرى الـJSON لا الصورة:** صورةٌ بُدّلت ولم يُمسّ
        الـJSON لا تُلتقَط، لأنّ بصمةَ الملفّ لم تتغيّر فلا جولةَ له.
        وبابُها: `forget('اسم الملفّ.json')` ثمّ الجولةُ القادمة.
   ══════════════════════════════════════════════════════════════════════ */


/* ─── ① ثوابتٌ تُقرأ ولا تُستنتج ─────────────────────────────────────── */

const CFG = {
  SUPABASE_URL : 'https://tjzrfevymfpktfuormhs.supabase.co',
  SUPABASE_ANON: 'sb_publishable_8kuaa_38VYwyiMnwOik5cg_BvylvgYL',

  ROOT_NAME    : 'cards',          // يُستعمل إن لم تُثبَّت BAYAN_CARDS_ROOT_ID

  //  🔑 حدُّ الحجم هو حدُّ شاشة الاستيراد نفسُه (`editor_import.js`: MAX).
  //     فمسطرتان للحجم تفترقان: ملفٌّ يحمله الناقلُ وتردُّه الشاشة.
  MAX_BYTES    : 2 * 1024 * 1024,

  EVERY_HOURS  : 1,
  BUDGET_MS    : 4.5 * 60 * 1000,  // ستُّ دقائقَ حدُّ التشغيل، وهذا دونه
};


/*  🖼 جدولُ الوسائط: حقلُ الحمولة ← مخزنُه وصيغُه وحدُّه.

    🔑 **والقيمُ مقيسةٌ على `storage.buckets` حرفاً، لا مخترعة:**
       قِيس يوم ١٠ أكتوبر ⇒ `img` حدُّه ٢٠٩٧١٥٢ بايتاً وصيغُه
       `image/png · image/jpeg · image/webp`، و`audio` حدُّه ١٠٤٨٥٧٦٠
       وصيغُه `audio/*`. **ومسطرتان تفترقان**: حدٌّ هنا أوسعُ يُنتج رفعاً
       يُردُّ بعد الانتظار، وأضيقُ يمنع ما يقبله المخزن.
    ⚠️ **والفحصُ هنا راحةٌ لا حراسة** — كما في `js/upload.js` حرفاً:
       الحارسُ الحقيقيّ سياسةُ المخزن، وما يجري عندنا يُتجاوَز.
    📌 واللواحقُ هي لواحقُ `js/media.js` نفسُها (IMG_EXT · AUDIO_EXT).   */

const MEDIA = {
  image       : { bucket: 'img',   max: 2097152 },
  front_image : { bucket: 'img',   max: 2097152 },
  audio       : { bucket: 'audio', max: 10485760 },
};

/*  اللاحقةُ ← نوعُ المحتوى. **ولا يُؤخذ من Drive**: المخزنُ يفحص الترويسةَ
    التي نرسلها، وDrive قد يقول `application/octet-stream` لملفٍّ سليم —
    فيُردُّ رفعٌ صحيح. والخريطةُ هنا صريحةٌ تُقرأ وتُراجَع.                 */

const MIME = {
  png: 'image/png',  jpg: 'image/jpeg', jpeg: 'image/jpeg', webp: 'image/webp',
  mp3: 'audio/mpeg', m4a: 'audio/mp4',  ogg: 'audio/ogg',
  wav: 'audio/wav',  aac: 'audio/aac',
};


/*  خريطةُ {مجلد ← مقرَّر}. والمادّةُ مكتوبةٌ معها لتُقاس لا لتُقرأ:
    البوّابةُ تردُّ `المادة` في جافّتها، فإن خالفت ما هنا وقف الحملُ —
    وبهذا يُمسَك خطأُ خريطةٍ يكتب بطاقاتِ مادّةٍ في معجم أخرى.

    ⚠️ والأسماءُ أدناه أسماءُ المواد في القاعدة، **لا أسماءَ مجلداتِك
       بالضرورة.** `probe()` يسرد ما في Drive حرفاً، ومنه تُضبط.        */

const MAP = {
  'اللغة العربية'    : { course:  2, subject: 2 },
  'English'          : { course:  4, subject: 3 },
  'الرياضيات'        : { course:  8, subject: 4 },
  'التاريخ'          : { course: 10, subject: 5 },
  'الفلسفة والمنطق'  : { course: 11, subject: 6 },
  'العلوم المتكاملة' : { course: 12, subject: 1 },
};


/*  ما تقرؤه البوّابةُ من الحمولة — وما سواه يُحكى في التقرير.

    🔑 **والقائمةُ مقيسةٌ على الحيّ لا منقولةٌ عن ذاكرة.** تُستخرج هكذا:

        select m[1], count(*) from pg_proc p, lateral
               regexp_matches(p.prosrc, '->>?\s*''([a-zA-Z_]+)''', 'g') m
         where p.proname = 'import_cards' group by 1;

    ✅ **و`image` و`front_image` و`audio` انضمّت يوم ١٠ أكتوبر** — كانت
       الثلاثةُ تسقط صامتةً، وفتح `sql/161` عينَ البوّابة عليها.
    ✅ **ولم يبقَ في `LOST_CARD` شيء:** قِيست أعمدةُ `cards` فإذا كلُّ
       عمودٍ تحمله تقرؤه البوّابة. والقائمةُ تبقى — لا لأنّ فيها اليوم
       شيئاً، **بل لأنّ الفجوة تُرى يومَ تعود**، ويومَها يُكتب اسمُها هنا.  */

const READ_TOP  = ['cards'];
const READ_CARD = ['front', 'back', 'note', 'examples', 'lang',
                   'lesson', 'lessons', 'strand', 'strands',
                   'image', 'front_image', 'audio'];
const LOST_CARD = [];


/* ─── ② الأبوابُ التي تُنقر بيد ─────────────────────────────────────── */

/**  يُنشئ المؤقّتَ ويحذف أشباهَه — فمؤقّتان يطوفان يتزاحمان على القفل.  */
function install() {
  uninstall();
  ScriptApp.newTrigger('round').timeBased().everyHours(CFG.EVERY_HOURS).create();
  const n = ScriptApp.getProjectTriggers().length;
  Logger.log('المؤقّت قائم — كلَّ %s ساعة · عددُ المؤقّتات الآن %s',
             CFG.EVERY_HOURS, n);
}

/**  يوقف الطوافَ. ولا يمسّ القاعدةَ ولا بصمات الناقل.  */
function uninstall() {
  let k = 0;
  ScriptApp.getProjectTriggers().forEach(t => {
    if (t.getHandlerFunction() === 'round') { ScriptApp.deleteTrigger(t); k++; }
  });
  Logger.log('أُوقف %s مؤقّتاً', k);
}


/**  طوافٌ بلا نداءٍ للقاعدة ولا كتابةٍ في شيء: يسرد ما يراه الناقلُ في
 *   Drive، ويقول المجهولَ من المجلدات. ومنه تُضبط `MAP` أوّلَ مرّة.     */
function probe() {
  const root = root_();
  const out  = ['مجلدُ الجذر: «' + root.getName() + '» · ' + root.getId(), ''];
  const subs = [];

  const it = root.getFolders();
  while (it.hasNext()) subs.push(it.next());

  const loose = jsonFiles_(root, false);
  if (loose.length) {
    out.push('⚠️ ملفّاتٌ في الجذر بلا مجلدِ مادّة — لا مقرَّرَ لها فلا تُحمل:');
    loose.forEach(f => out.push('    · ' + f.getName()));
    out.push('');
  }

  if (!subs.length) out.push('⚠️ ولا مجلدَ مادّةٍ واحداً في الجذر.');

  subs.sort((a, b) => a.getName().localeCompare(b.getName(), 'ar'));
  subs.forEach(sub => {
    const name  = sub.getName();
    const m     = MAP[name];
    const files = jsonFiles_(sub, true);
    out.push((m ? '✔ ' : '🔴 ') + '«' + name + '» — '
             + (m ? 'المقرَّر ' + m.course + ' · المادة ' + m.subject
                  : 'ليس في الخريطة ⇒ يُحكى ولا يُحمل')
             + ' · ملفّات: ' + files.length);
    files.forEach(f => {
      const fp = fpOf_(f.getId());
      out.push('      ' + (fp ? '·' : '🆕') + ' ' + f.getName()
               + '  (' + f.getSize() + ' بايت)');
    });
  });

  const mem = PropertiesService.getScriptProperties().getKeys()
                .filter(k => k.indexOf('mk:') === 0).length;
  out.push('');
  out.push('🖼 ذاكرةُ الوسائط: ' + mem + ' وسيطاً رُفع سلفاً — '
           + 'ولا يُرفع ثانيةً ما لم يتغيّر في Drive.');

  const text = out.join('\n');
  Logger.log(text);
  return text;
}


/**  يمحو بصمةَ ملفٍّ أو كلِّها فيُعاد حملُه في الجولة القادمة.
 *   ولا تمسّ القاعدةَ بحرف — إنّما ذاكرةُ الناقل وحدها.               */
function forget(fileNameOrId) {
  const props = PropertiesService.getScriptProperties();
  if (!fileNameOrId) { Logger.log('اسمُ الملفّ أو معرّفُه مطلوب'); return; }
  const keys = props.getKeys().filter(k => k.indexOf('fp:') === 0);
  let k = 0;
  keys.forEach(key => {
    const id = key.slice(3);
    let nm = '';
    try { nm = DriveApp.getFileById(id).getName(); } catch (e) { nm = ''; }
    if (id === fileNameOrId || nm === fileNameOrId) { props.deleteProperty(key); k++; }
  });
  Logger.log('مُحيت %s بصمة', k);
}

function forgetAll() {
  const props = PropertiesService.getScriptProperties();
  const keys  = props.getKeys().filter(k => k.indexOf('fp:') === 0);
  keys.forEach(k => props.deleteProperty(k));
  Logger.log('مُحيت %s بصمة — والجولةُ القادمة تحمل كلَّ ملفّ', keys.length);
  Logger.log('ℓ ولم تُمسّ ذاكرةُ الوسائط: ملفّاتٌ تُحمل من جديد '
             + 'لا تعني صوراً تُرفع من جديد.');
}


/**  🖼 يمحو ذاكرةَ الوسائط وحدَها — وهي التي تمنع رفعَ صورةٍ مرّتين.
 *
 *   ⚠️ **ولا يُنقَر إلا بسبب.** محوُها يعني أنّ كلَّ صورةٍ ستُرفع من
 *      جديد بمفتاحٍ جديد في الجولة القادمة، **وتبقى القديمةُ في المخزن
 *      يتيمةً** لا يشير إليها صفّ. وبابُه الصحيح: صورةٌ بُدّلت في Drive
 *      بالاسم نفسِه ولم يلتقطها الناقل — وهي حالةٌ يلتقطها وقتُ التعديل
 *      وحدَه، فلا تكاد تقع.                                              */
function forgetMedia() {
  const props = PropertiesService.getScriptProperties();
  const keys  = props.getKeys().filter(k => k.indexOf('mk:') === 0);
  keys.forEach(k => props.deleteProperty(k));
  Logger.log('مُحيت %s ذاكرةَ وسيط — وما في المخزن لم يُحذف منه شيء، '
             + 'وستُرفع نسخٌ جديدةٌ في الجولة القادمة.', keys.length);
}


/* ─── ③ الجولة ──────────────────────────────────────────────────────── */

function round() {
  const t0   = Date.now();
  const lock = LockService.getScriptLock();
  if (!lock.tryLock(1000)) { Logger.log('جولةٌ تعمل الآن — وهذه تُترك'); return; }

  const say   = [];          // سطورُ التقرير
  let  wrote  = 0;           // ملفّاتٌ اعتُمدت
  let  alarm  = false;       // أحمرٌ يستوجب بريداً وإن لم يُكتب شيء
  let  quiet  = 0;           // ملفّاتٌ لا جديدَ فيها

  try {
    const root  = root_();
    const token = signIn_();

    const subs = [];
    const it = root.getFolders();
    while (it.hasNext()) subs.push(it.next());
    subs.sort((a, b) => a.getName().localeCompare(b.getName(), 'ar'));

    //  ملفّاتٌ في الجذر: لا مجلدَ لها فلا مقرَّر — تُحكى ولا تُحمل (ثابت ④)
    const loose = jsonFiles_(root, false);
    if (loose.length) {
      alarm = true;
      say.push('🔴 ' + loose.length + ' ملفّاً في جذر «' + root.getName()
               + '» بلا مجلدِ مادّة — ولا مقرَّرَ يُخمَّن لها:');
      loose.forEach(f => say.push('    · ' + f.getName()));
      say.push('');
    }

    let budget = true;

    for (let i = 0; i < subs.length && budget; i++) {
      const sub  = subs[i];
      const name = sub.getName();
      const m    = MAP[name];

      if (!m) {
        alarm = true;
        say.push('🔴 مجلدٌ ليس في الخريطة: «' + name + '» — ملفّاتُه لم تُحمل.');
        say.push('');
        continue;
      }

      const files = jsonFiles_(sub, true);
      for (let j = 0; j < files.length; j++) {
        if (Date.now() - t0 > CFG.BUDGET_MS) {
          budget = false;
          alarm  = true;
          say.push('⏱️ انقطعت الجولةُ عند حدِّ الوقت — وما بقي تبلغه الجولةُ '
                   + 'القادمة. ولا نقصَ في شيءٍ حُمل: كلُّ ملفٍّ دفعةٌ تامّة.');
          break;
        }
        const r = carry_(token, files[j], name, m, t0);
        if (r.quiet) { quiet++; continue; }
        if (r.wrote) wrote++;
        if (r.alarm) alarm = true;
        say.push(r.text);
        say.push('');
      }
    }

    if (quiet) say.push('· ' + quiet + ' ملفّاً لا جديدَ فيه — لم تُنادَ لها القاعدة.');

  } catch (e) {
    //  🔑 عطلٌ يُسكت الناقلَ كلَّه: دخولٌ ردّ، أو جذرٌ غائب. وهو أخطرُ ما
    //     يقع لأنّه صامتٌ بطبعه — فيُصاح به بريداً في كلّ مرّة.
    alarm = true;
    say.unshift('🔴 **وقفت الجولةُ قبل أن تبلغ الملفّات:** ' + e.message);
  } finally {
    lock.releaseLock();
  }

  const body = say.join('\n').trim();
  Logger.log(body || 'جولةٌ هادئة');

  //  الصمتُ يُستحقّ: جولةٌ لا جديدَ فيها ولا إنذار لا تُرسل بريداً.
  if (wrote || alarm) {
    report_((alarm ? '🔴 ' : '✔ ') + 'ناقل البطاقات — '
            + (wrote ? wrote + ' ملفّاً اعتُمد' : 'بلا اعتماد'), body);
  }
}


/* ─── ④ حملُ ملفٍّ واحد ─────────────────────────────────────────────── */

function carry_(token, file, folder, m, t0) {
  const head = '«' + folder + ' / ' + file.getName() + '»';
  const out  = L => ({ quiet: false, wrote: false, alarm: true, text: L });

  /*  ① الحجم — يُقاس قبل القراءة. والحدُّ حدُّ الشاشة (CFG).  */
  const size = file.getSize();
  if (size > CFG.MAX_BYTES) {
    return out('🔴 ' + head + ': حجمُه ' + size + ' بايتاً، والحدُّ '
               + CFG.MAX_BYTES + ' — لم يُقرأ. وبابُه تقسيمُ الملفّ.');
  }

  /*  ② الخام لا المُهيَّأ. ودرسٌ مكتوبٌ في `STATE.md`: أداةُ القراءة
      «الطبيعية» تُدخل هروبَ ماركداون فتُفسد JSON سليماً.  */
  let text;
  try {
    text = file.getBlob().getDataAsString('UTF-8').replace(/^﻿/, '');
  } catch (e) {
    return out('🔴 ' + head + ': تعذّرت قراءتُه خاماً — ' + e.message);
  }

  /*  ③ بصمةُ الناقل (ثابت ②) — لا جديدَ ⇒ لا نداءَ ولا سطرَ سجلّ.  */
  const fp  = sha256_(text);
  const was = fpOf_(file.getId());
  if (was === fp) return { quiet: true, wrote: false, alarm: false, text: '' };

  /*  ④ JSON — والخطأُ يُقال بموضعه.  */
  let payload;
  try { payload = JSON.parse(text); }
  catch (e) {
    return out('🔴 ' + head + ': ليس JSON سليماً — ' + e.message);
  }
  if (!payload || typeof payload !== 'object' || Array.isArray(payload)) {
    return out('🔴 ' + head + ': جذرُه ليس كائناً — والمنتظرُ { "cards": [ … ] }');
  }

  /*  ⑤ ✅ **رُفع من هنا حارسٌ كان يقف مكانَ ثقبٍ في البوّابة** (غيابُ
      مفتاح `cards` يمرُّ بـ`ok: true` وخطّةِ أصفار). سدَّه `sql/161`
      وقِيس على الحيّ أنّه صار `ok=false` باسمه، **فرُفع كما وُعد في
      الثابت ①** — ولا تبقى مسطرتان لحكمٍ واحد. والردُّ اليومَ يجيء من
      البوّابة في الخطوة ⑧، وهو موضعُه.
      📌 و`n` يُقرأ هنا بحذر: حمولةٌ بلا قائمةٍ تردُّها البوّابةُ بعد قليل،
         وحتى ذاك الحينِ لا يُقرأ طولُ ما ليس قائمة.  */
  const n = Array.isArray(payload.cards) ? payload.cards.length : 0;

  /*  ⑥ ما لا تقرؤه البوّابة — يُقال ولا يمنع (ثابت ① · القاعدة ⑤).  */
  const notes = unread_(payload);

  /*  ⑦ 🖼 الوسائط — تُرفع ويُكتب مفتاحُها مكانَ اسمها (ثابت ⑥).

      📐 **ولماذا قبل الجافّة لا بعدها:** الجافّةُ تفحص **شكلَ المفتاح**
         (الحارس ⑦ في `161`)، فلو جرت على أسماءِ ملفّاتٍ لردَّت الدفعةَ
         كلَّها بلا سبب. ⇒ تُبدَّل الأسماءُ أوّلاً فتُفحص حقيقةُ ما يُرسل.
      ⚠️ **وثمنُه مكتوب:** جافّةٌ تُردّ بعد الرفع تترك ما رُفع في المخزن.
         ولا يتراكم: الذاكرةُ تحفظ مفتاحَ كلِّ وسيطٍ رُفع، فإذا صُحّح
         الملفُّ وأُعيد حملُه **أُعيد المفتاحُ نفسُه ولم يُرفع شيءٌ ثانيةً**.
      📌 والحمولةُ تُعدَّل في مكانها — **وملفُّ Drive لا يُمسّ بحرف.**     */
  let mt = { ok: true, up: 0, same: 0, keep: 0, why: '' };
  if (Array.isArray(payload.cards) && payload.cards.length) {
    const parents = file.getParents();
    const parent  = parents.hasNext() ? parents.next() : null;
    if (!parent) {
      return out('🔴 ' + head + ': لا مجلدَ أبٍ له — ولا يُبحث عن وسيطٍ بلا مجلد.');
    }
    mt = media_(token, payload, parent, 's' + (m.subject || 0),
                t0 + CFG.BUDGET_MS);
    if (!mt.ok) {
      return out('🔴 ' + head + ': وسيطٌ لم يبلغ المخزنَ، فالدفعةُ كلُّها '
                 + 'موقوفة — وبطاقةٌ تشير إلى لا شيءٍ أسوأُ من بطاقةٍ بلا صورة.'
                 + '\n    ' + mt.why
                 + (mt.up ? '\n    (ورُفع قبلها ' + mt.up + ' وسيطاً، '
                          + 'ومفاتيحُها محفوظةٌ فلا تُرفع ثانيةً.)' : ''));
    }
  }

  /*  ⑧ الجافّة — تجري المسارَ كلَّه بحرّاسه الأحياء ثمّ تُنقضه.  */
  let dry;
  try { dry = rpc_(token, 'import_cards',
                   { p_course: m.course, p_payload: payload, p_dry_run: true }); }
  catch (e) { return out('🔴 ' + head + ': الجافّةُ لم تصل — ' + e.message); }

  if (dry.ok !== true) {
    const why = (dry['أخطاء'] || []).map(x => '    · ' + x).join('\n');
    return out('🔴 ' + head + ': الدفعةُ رُدَّت جملةً — ولا تُصلَح هنا بل عند '
               + 'مؤلّفها.\n' + (why || '    · ' + (dry.error || dry['السبب'] || '؟'))
               + (dry['توقّف عند'] ? '\n    توقّفت عند: ' + dry['توقّف عند'] : ''));
  }

  /*  ⑨ هويّةُ المادّة — حارسُ خريطةٍ مغلوطة، ويقع قبل أيّ كتابة.  */
  const got = Number(dry['المادة']);
  if (m.subject && got && got !== m.subject) {
    return out('🔴 ' + head + ': المقرَّر ' + m.course + ' مادتُه ' + got
               + ' والخريطةُ تقول ' + m.subject + ' — ولا يُكتب معجمُ مادّةٍ '
               + 'في أخرى. الخريطةُ تُصحَّح ثمّ يُعاد.');
  }

  /*  ⑩ الوصول — يُقاس عند القاعدة لا عندنا: خطّتُها تعدُّ كلَّ صفٍّ قرأته،
      فإن خالفت عددَ ما أرسلنا فقد سقط في الطريق شيء.  */
  const plan = dry['الخطّة'] || {};
  const will = Number(plan['سيُنشأ'] || 0) + Number(plan['سيُحدَّث'] || 0);
  if (will !== n) {
    return out('🔴 ' + head + ': أُرسلت ' + n + ' بطاقةً وقرأت القاعدةُ '
               + will + ' — الحملُ موقوفٌ حتى يُعرف السبب.');
  }

  /*  ⑪ الاعتماد.  */
  let off;
  try { off = rpc_(token, 'import_cards',
                   { p_course: m.course, p_payload: payload, p_dry_run: false }); }
  catch (e) { return out('🔴 ' + head + ': صدقت الجافّةُ وتعذّر الاعتماد — '
                         + e.message + '\n    ولم يُكتب شيء: الدفعةُ معاملةٌ واحدة.'); }

  if (off.ok !== true) {
    return out('🔴 ' + head + ': صدقت الجافّةُ ورُدَّ الاعتماد — '
               + (off.error || off['السبب'] || '؟')
               + (off['توقّف عند'] ? ' (عند: ' + off['توقّف عند'] + ')' : ''));
  }

  //  ⑫ البصمةُ تُحفظ بعد الاعتماد لا قبله — فما لم يُكتب يُعاد.
  PropertiesService.getScriptProperties().setProperty('fp:' + file.getId(), fp);

  /*  ⑬ ما كُتب يُقابَل بما وُعد. و`save_cards` تُسقط صامتةً صفّاً لا
      `card_key` له (وجهٌ كلُّه تشكيلٌ أو تطويل)، والبوّابةُ لا تقرأ
      `skipped` — فهذه المقابلةُ هي التي تصيح به.  */
  const made = Number(off['أُنشئت'] || 0), upd = Number(off['حُدِّثت'] || 0);
  const gap  = (made !== Number(plan['سيُنشأ'] || 0))
            || (upd  !== Number(plan['سيُحدَّث'] || 0));

  let L = (gap ? '🔴 ' : '✔ ') + head + ': اعتُمد — أُنشئت ' + made
        + ' · حُدِّثت ' + upd
        + ' · وصلاتُ دروس ' + Number(off['وصلاتُ دروسٍ وقعت'] || 0)
        + ' · وصلاتُ فروع ' + Number(off['وصلاتُ فروعٍ وقعت'] || 0)
        + '  [المقرَّر ' + m.course + ' · المجموعة ' + (off['المجموعة'] || '؟') + ']';

  /*  🖼 والوسائطُ تُحكى **وإن لم يكن فيها جديد**: «رُفع صفر» ليست ضجيجاً
      بل جوابٌ على «أوصلت الصورةُ؟» قبل أن يُسأل. والصمتُ هنا هو الذي
      يجعل المؤلّفَ يفتح الشاشةَ ليتأكّد.  */
  if (mt.up || mt.same || mt.keep) {
    L += '\n    🖼 وسائط: رُفع ' + mt.up + ' · أُعيد مفتاحُ ' + mt.same
       + ' · مرَّ كما هو ' + mt.keep
       + (mt.up ? '' : ' — ولا رفعَ جديدٌ في هذه الجولة.');
  }

  if (gap) {
    L += '\n    🔴 وخالف المكتوبُ الخطّة: وُعد بـ' + Number(plan['سيُنشأ'] || 0)
       + ' إنشاءً و' + Number(plan['سيُحدَّث'] || 0) + ' تحديثاً. وبطاقةٌ '
       + 'وجهُها تشكيلٌ أو تطويلٌ وحده تسقط صامتةً — فتُراجَع وجوهُ الدفعة.';
  }

  const warn = dry['تحذيرات'] || off['تحذيرات'] || [];
  if (warn.length) {
    L += '\n    ⚠️ تحذيراتٌ لا تمنع (' + warn.length + '):';
    warn.slice(0, 12).forEach(w => { L += '\n       · ' + w; });
    if (warn.length > 12) L += '\n       · … وبقيّتُها في سطر `import_log`.';
  }
  if (notes.length) notes.forEach(x => { L += '\n    ' + x; });

  return { quiet: false, wrote: true, alarm: gap, text: L };
}


/* ─── ⑤ الوسائط — تُرفع ويُكتب مفتاحُها مكانَ اسمِها ────────────────── */

/*  شكلُ المفتاح الذي يولّده هذا الناقلُ و`js/media.js` معاً:
    `مخزن/وسم-ستُّ خاناتٍ.لاحقة`. ويُستعمل للتمييز لا للحراسة —
    فقيمةٌ بهذا الشكل **قد كُتبت سلفاً** (من الشاشة أو من جولةٍ ماضية)
    فتُترك كما هي، وما سواها اسمُ ملفٍّ في المجلد يُبحث عنه ويُرفع.
    ⚠️ **وثَمّ لبسٌ نظريٌّ يُكتب ولا يُخفى:** ملفٌّ محلّيٌّ اسمُه بهذا
       الشكل بعينه (`img/خ-abcdef.png`) يُحسب مفتاحاً فلا يُرفع، فتشير
       البطاقةُ إلى لا شيء. واحتمالُه أن يُسمّي مؤلّفٌ ملفَّه بستّ خاناتٍ
       عشوائيّةٍ بعد شَرطة — ويُدفع ثمنُه بحثاً في Drive لكلّ قيمةٍ
       لو أردنا اليقين، وذاك أغلى من العلّة.                              */
const KEY_SHAPE = /^(img|audio)\/[a-z0-9]{1,8}-[a-z0-9]{6}\.[a-z0-9]{2,4}$/;


/**
 *  يمرُّ على بطاقات الحمولة، فيرفع كلَّ وسيطٍ محلّيٍّ ويكتب مفتاحَه مكانَه.
 *  **ويعدّل `payload` في مكانه** — والنسخةُ المرسَلةُ وحدَها، وملفُّ Drive
 *  لا يُمسّ بحرف.
 *
 *  @return {{ok:boolean, why:string, up:number, same:number, keep:number}}
 *          `ok=false` ⇒ **تُردّ الدفعةُ كلُّها**: وسيطٌ لا يُعثر عليه
 *          يعني بطاقةً تشير إلى لا شيء، وبطاقةٌ كهذه أسوأُ من غيابها.
 */
function media_(token, payload, parent, scope, deadline) {
  let up = 0, same = 0, keep = 0;
  const cards = payload.cards;

  for (let i = 0; i < cards.length; i++) {
    const c = cards[i];
    if (!c || typeof c !== 'object') continue;

    for (const field in MEDIA) {
      if (!Object.prototype.hasOwnProperty.call(c, field)) continue;
      const v = c[field];
      if (typeof v !== 'string' || !v.trim()) continue;
      const ref = v.trim();

      //  رابطٌ خارجيّ — يمرّ كما هو، والبوّابةُ تقبله (الحارس ⑦ في ١٦١)
      if (/^https?:\/\//i.test(ref)) { keep++; continue; }

      //  مفتاحٌ كُتب سلفاً — لا يُرفع مرّتين
      if (KEY_SHAPE.test(ref)) { keep++; continue; }

      if (Date.now() > deadline) {
        return { ok: false, up: up, same: same, keep: keep,
                 why: 'انقطع الوقتُ ورفعُ الوسائط لم يتمّ — والملفُّ كلُّه '
                    + 'مؤجَّلٌ إلى الجولة القادمة. وما رُفع محفوظٌ في الذاكرة '
                    + 'فلا يُرفع ثانيةً.' };
      }

      const r = carryMedia_(token, ref, parent, MEDIA[field], scope);
      if (!r.ok) {
        return { ok: false, up: up, same: same, keep: keep,
                 why: 'البطاقةُ ' + (i + 1) + ' · الحقل `' + field + '` = «'
                    + ref + '»: ' + r.why };
      }
      c[field] = r.key;
      if (r.fresh) up++; else same++;
    }
  }
  return { ok: true, why: '', up: up, same: same, keep: keep };
}


/**
 *  وسيطٌ واحد: يُعثر عليه في Drive، ويُقاس، ويُرفع إن لم يكن مرفوعاً.
 *  @return {{ok:boolean, key:string, fresh:boolean, why:string}}
 */
function carryMedia_(token, ref, parent, spec, scope) {
  const bad = W => ({ ok: false, key: '', fresh: false, why: W });

  const found = findFile_(parent, ref);
  if (found.why) return bad(found.why);
  const file = found.file;

  /*  🔑 الذاكرةُ على **ملفِّ الوسيط ووقتِ تعديله** لا على اسمه ولا على
      الـJSON: فملفٌّ لم يتغيّر يُعاد مفتاحُه ولو حُمل الـJSON عشراً،
      وملفٌّ تغيّر يُرفع من جديد بمفتاحٍ جديد.
      ⚠️ **وثمنُه يُكتب:** المفتاحُ القديم يبقى في المخزن يتيماً لا يشير
         إليه صفّ. وهو ثمنُ ألّا تُطمَس نسخةٌ قد تكون مستعملةً في بطاقةٍ
         أخرى — **والطمسُ أسوأ من اليُتم.**                              */
  const memo  = 'mk:' + file.getId() + ':' + file.getLastUpdated().getTime();
  const props = PropertiesService.getScriptProperties();
  const had   = props.getProperty(memo);
  if (had) return { ok: true, key: had, fresh: false, why: '' };

  const ext = (file.getName().split('.').pop() || '').toLowerCase();
  const mime = MIME[ext];
  if (!mime || mime.indexOf(spec.bucket === 'img' ? 'image/' : 'audio/') !== 0) {
    return bad('لاحقتُه «' + ext + '» لا تصلح لمخزن `' + spec.bucket
             + '» — والمقبول: ' + Object.keys(MIME).filter(function (k) {
                 return MIME[k].indexOf(spec.bucket === 'img' ? 'image/' : 'audio/') === 0;
               }).join(' · '));
  }

  const size = file.getSize();
  if (size > spec.max) {
    return bad('حجمُه ' + size + ' بايتاً وحدُّ المخزن ' + spec.max
             + ' — والعلاجُ ضغطُه أو تصغيرُه.');
  }
  if (!size) return bad('ملفٌّ فارغ.');

  const key = mediaKey_(spec.bucket, scope, ext);
  const u   = upload_(token, key, mime, file.getBlob().getBytes());
  if (!u.ok) return bad(u.why);

  props.setProperty(memo, key);
  return { ok: true, key: key, fresh: true, why: '' };
}


/*  مسطرةُ `js/media.js` حرفاً: وسمٌ مطهَّرٌ، وستُّ خاناتٍ بأساس ٣٦.
    و`padEnd` لازمةٌ هناك وهنا: كسرٌ قصير (0.5 ⇒ "0.i") يعود بحرفين.    */
function mediaKey_(bucket, scope, ext) {
  const rand = Math.random().toString(36).slice(2, 8);
  const pad  = (rand + '000000').slice(0, 6);
  const s = String(scope || 'x').replace(/[^a-z0-9]/gi, '').slice(0, 8).toLowerCase() || 'x';
  return bucket + '/' + s + '-' + pad + '.' + ext;
}


/*  البحثُ عن الوسيط: مسارٌ نسبيٌّ من مجلدِ **ملفِّ الـJSON نفسِه**.
    فـ`cell.png` بجواره، و`media/cell.png` في مجلدٍ تحته. ولا يُصعَد فوقه:
    المقرَّرُ محسومٌ بالمجلد (ثابت ④)، وصعودٌ يكسر الحسم.
    🔴 **والاسمُ المكرَّر يُردّ ولا يُختار منه**: ملفّان بالاسم نفسه في
       المجلد نفسِه يجعلان «أيُّهما» سؤالاً ليس للناقل أن يجيبه.          */
function findFile_(parent, ref) {
  const parts = ref.split('/').filter(function (x) { return x && x !== '.'; });
  if (!parts.length) return { file: null, why: 'مسارٌ فارغ.' };
  if (ref.indexOf('..') >= 0) {
    return { file: null, why: 'المسارُ يصعد فوق مجلد الملفّ — ولا يُصعد: '
                            + 'المجلدُ هو الذي يحكم المقرَّر.' };
  }

  let dir = parent;
  for (let i = 0; i < parts.length - 1; i++) {
    const it = dir.getFoldersByName(parts[i]);
    if (!it.hasNext()) {
      return { file: null, why: 'لا مجلدَ «' + parts[i] + '» تحت «'
                              + dir.getName() + '».' };
    }
    dir = it.next();
    if (it.hasNext()) {
      return { file: null, why: 'مجلدان باسم «' + parts[i] + '» — والاختيارُ '
                              + 'بينهما ليس للناقل.' };
    }
  }

  const name = parts[parts.length - 1];
  const fit  = dir.getFilesByName(name);
  if (!fit.hasNext()) {
    return { file: null, why: 'لا ملفَّ «' + name + '» في «' + dir.getName()
                            + '» — أهو في المجلد؟ وأهجاؤه كما في الـJSON؟' };
  }
  const file = fit.next();
  if (fit.hasNext()) {
    return { file: null, why: 'ملفّان باسم «' + name + '» في المجلد نفسِه — '
                            + 'والاختيارُ بينهما ليس للناقل.' };
  }
  return { file: file, why: '' };
}


/*  الرفعُ إلى المخزن — نقطةُ الاختناق الوحيدة نحوَه، كـ`api.uploadMedia`.

    ⚠️ **`x-upsert: false` عمداً — وحجّتُه غيرُ ما يُظنّ.** قِيست سياساتُ
       `storage.objects` يوم ١٠ أكتوبر: `img_update` و`audio_update`
       **قائمتان** ويأذنان للمدير. ⇒ فالطمسُ **ممكنٌ** تقنياً، ولهذا
       يُمنع هنا صراحةً: تصادمٌ (احتمالُه في ملياريّ) يصير خطأً ظاهراً
       لا طمساً صامتاً لصورةٍ قد تكون في بطاقةٍ أخرى.
       📌 وفي `js/api.js` تعليقٌ يقول «السياسةُ لا تسمح بـupdate أصلاً» —
          **وهو مقيسٌ كاذبٌ اليوم**، وقد صُحّح معه في `b136`.
    ورمزُ ٤٠٩ يُترجَم لأنّه الوحيدُ الذي قد يُقرأ خطأً.                   */
function upload_(token, key, mime, bytes) {
  let res;
  try {
    res = UrlFetchApp.fetch(CFG.SUPABASE_URL + '/storage/v1/object/' + key, {
      method: 'post', contentType: mime,
      headers: { apikey: CFG.SUPABASE_ANON, Authorization: 'Bearer ' + token,
                 'x-upsert': 'false' },
      payload: bytes, muteHttpExceptions: true,
    });
  } catch (e) {
    return { ok: false, why: 'الرفعُ لم يصل المخزنَ — ' + e.message };
  }

  const code = res.getResponseCode();
  if (code === 200) return { ok: true, why: '' };

  const txt = res.getContentText().slice(0, 300);
  if (code === 409) {
    return { ok: false, why: 'المفتاحُ «' + key + '» موجودٌ سلفاً — '
                           + 'وتصادمٌ كهذا احتمالُه في ملياريّ، فيُعاد الحمل.' };
  }
  if (code === 403 || code === 401) {
    return { ok: false, why: 'المخزنُ ردَّ الرفعَ (' + code + ') — والحسابُ '
                           + 'المثبَّتُ في BAYAN_EMAIL يلزم أن يكون مديراً: '
                           + 'سياسةُ `img` و`audio` تشترط can_upload_media(). '
                           + txt };
  }
  return { ok: false, why: 'المخزنُ ردَّ برمز ' + code + ' — ' + txt };
}


/*  مفاتيحُ الحمولة التي لا تقرؤها البوّابة. **والصمتُ هنا هو الخطر**:
    حقلٌ يُكتب في الملفّ ولا يصل القاعدةَ يُصدَّق سنةً.                  */
function unread_(payload) {
  const out  = [];
  const top  = Object.keys(payload).filter(k => READ_TOP.indexOf(k) < 0);
  if (top.length) {
    out.push('ℓ مفاتيحُ لا تقرؤها البوّابةُ في جذر الملفّ: ' + top.join(' · '));
  }
  if (!Array.isArray(payload.cards)) return out;

  const seen = {}, lost = {};
  payload.cards.forEach(c => {
    if (!c || typeof c !== 'object') return;
    Object.keys(c).forEach(k => {
      if (LOST_CARD.indexOf(k) >= 0) lost[k] = (lost[k] || 0) + 1;
      else if (READ_CARD.indexOf(k) < 0) seen[k] = (seen[k] || 0) + 1;
    });
  });

  const lk = Object.keys(lost);
  if (lk.length) {
    out.push('🔴 حقولٌ تحملها القاعدةُ ولا تنقلها البوّابةُ فتسقط صامتةً: '
             + lk.map(k => k + ' ×' + lost[k]).join(' · ')
             + ' — وبابُها شاشةُ البطاقات، أو توسيعُ البوّابة بقرار.');
  }
  const sk = Object.keys(seen);
  if (sk.length) {
    out.push('ℓ مفاتيحُ مجهولةٌ في البطاقات: '
             + sk.map(k => k + ' ×' + seen[k]).join(' · '));
  }
  return out;
}


/* ─── ⑤ أطرافٌ رقيقة ───────────────────────────────────────────────── */

function root_() {
  const id = PropertiesService.getScriptProperties()
               .getProperty('BAYAN_CARDS_ROOT_ID');
  if (id) {
    try { return DriveApp.getFolderById(id); }
    catch (e) { throw new Error('BAYAN_CARDS_ROOT_ID لا يفتح مجلداً — ' + e.message); }
  }
  const it = DriveApp.getFoldersByName(CFG.ROOT_NAME);
  if (!it.hasNext()) {
    throw new Error('ولا مجلدَ باسم «' + CFG.ROOT_NAME + '» في Drive. '
                    + 'وبابُه تثبيتُ BAYAN_CARDS_ROOT_ID في خصائص السكربت.');
  }
  const first = it.next();
  if (it.hasNext()) {
    throw new Error('مجلدان أو أكثرُ باسم «' + CFG.ROOT_NAME + '» — '
                    + 'والاختيارُ بينهما ليس للناقل. '
                    + 'يُثبَّت BAYAN_CARDS_ROOT_ID بالمقصود منهما.');
  }
  return first;
}


/*  ملفّاتُ JSON في مجلدٍ — ونزولٌ إلى ما تحته إن أُذن، فالمقرَّرُ محسومٌ
    بالمجلد الأعلى (ثابت ④) فلا يضرُّ تفريعُ المؤلّف تحته.
    📌 وما بدأ اسمُه بـ`_` يُترك عمداً — بابُ إيقافِ ملفٍّ بلا حذفه.     */
function jsonFiles_(folder, deep) {
  const out = [];
  const take = f => {
    const it = f.getFiles();
    while (it.hasNext()) {
      const file = it.next();
      const nm = file.getName();
      if (nm.charAt(0) === '_' || nm.charAt(0) === '~') continue;
      if (!/\.json$/i.test(nm) && file.getMimeType() !== 'application/json') continue;
      out.push(file);
    }
  };
  take(folder);
  if (deep) {
    const dirs = folder.getFolders();
    while (dirs.hasNext()) take(dirs.next());
  }
  out.sort((a, b) => a.getName().localeCompare(b.getName(), 'ar'));
  return out;
}


function signIn_() {
  const props = PropertiesService.getScriptProperties();
  const email = props.getProperty('BAYAN_EMAIL');
  const pass  = props.getProperty('BAYAN_PASSWORD');
  if (!email || !pass) {
    throw new Error('سرُّ الدخول غير مثبَّت — BAYAN_EMAIL و BAYAN_PASSWORD '
                    + 'في خصائص السكربت.');
  }
  const res = UrlFetchApp.fetch(
    CFG.SUPABASE_URL + '/auth/v1/token?grant_type=password', {
      method: 'post', contentType: 'application/json',
      headers: { apikey: CFG.SUPABASE_ANON },
      payload: JSON.stringify({ email: email, password: pass }),
      muteHttpExceptions: true,
    });
  const code = res.getResponseCode();
  if (code !== 200) {
    throw new Error('الدخولُ رُدَّ برمز ' + code + ' — '
                    + res.getContentText().slice(0, 300));
  }
  const tok = JSON.parse(res.getContentText()).access_token;
  if (!tok) throw new Error('الدخولُ مرَّ بلا توكن.');
  return tok;
}


function rpc_(token, name, body) {
  const res = UrlFetchApp.fetch(CFG.SUPABASE_URL + '/rest/v1/rpc/' + name, {
    method: 'post', contentType: 'application/json',
    headers: { apikey: CFG.SUPABASE_ANON, Authorization: 'Bearer ' + token },
    payload: JSON.stringify(body),
    muteHttpExceptions: true,
  });
  const code = res.getResponseCode(), text = res.getContentText();
  if (code !== 200) {
    throw new Error('رمز ' + code + ': ' + text.slice(0, 300));
  }
  let j;
  try { j = JSON.parse(text); }
  catch (e) { throw new Error('ناتجٌ ليس JSON: ' + text.slice(0, 200)); }
  return j;
}


function sha256_(text) {
  const b = Utilities.computeDigest(Utilities.DigestAlgorithm.SHA_256,
                                    text, Utilities.Charset.UTF_8);
  return b.map(x => ((x < 0 ? x + 256 : x) + 0x100).toString(16).slice(1)).join('');
}

function fpOf_(fileId) {
  return PropertiesService.getScriptProperties().getProperty('fp:' + fileId);
}

function report_(subject, body) {
  const to = PropertiesService.getScriptProperties().getProperty('BAYAN_MAIL_TO')
          || Session.getEffectiveUser().getEmail();
  if (!to) { Logger.log('ولا مُستقبِلَ للتقرير — BAYAN_MAIL_TO غير مثبَّتة'); return; }
  MailApp.sendEmail({ to: to, subject: subject, body: body || '—' });
}
