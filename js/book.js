/* ══════════════════════════════════════════════════════════
   بيان — book.js · الكتاب المقلَّب  (b152 · b153 · b154 · b155 · b165 · b170)

   محرّكٌ قائمٌ بنفسه يعرض نصَّ القراءة كتاباً تُقلَّب صفحاته.
   لا يستورد شيئاً من المنصّة: التنسيقُ والأرقامُ والنصوصُ تُمرَّر
   إليه، فيُختبر وحده ويُعرض في صفحةٍ مستقلّة بلا قاعدةٍ ولا دخول.

   🎯 لماذا كتابٌ لا صندوقُ نصٍّ يُمرَّر؟ — ثلاثةٌ تخدم الفهم لا الزينة:
      ① الصفحةُ وحدةُ انتباه. نصٌّ طويلٌ في عمودٍ واحد يُقرأ مسحاً،
         وصفحةٌ لها أوّلٌ وآخرٌ تُقرأ قراءةً، والتقدّمُ فيها يُرى.
      ② الفقرةُ مرقّمةٌ في الهامش. أسئلةُ الفهم تقول «في الفقرة الثالثة»،
         والرقمُ يُغني عن العدّ — والعدُّ ليس ما نقيسه.
      ③ الصفحةُ لا تقطع الجملة إن وجدت لها نهايةً قريبة: جملةٌ تعبر
         التقليبَ تُحمَل في الذاكرة العاملة لحظةَ الحركة، وذاك عبءٌ
         على القارئ لا يقابله شيء.

   🔑 والقياسُ لا العدّ: الصفحاتُ تُقسَم بقياس النصّ في صفحةٍ مخفيّةٍ
      لها مقاسُ الحقيقية وخطُّها — لا بعدد الحروف. فالتشكيلُ والخطُّ
      وحجمُه وعرضُ الشاشة كلُّها تدخل الحساب بلا رقمٍ مكتوب.
   🔑 والاتجاهُ من النصّ لا من وسمه: `lang` في القاعدة يخطئ (نصوصٌ
      إنجليزيةٌ موسومةٌ `ar`)، فيُحسب من غالب حروف النصّ نفسه.
   ♿ يُقلَّب بالأزرار وبالأسهم وبالسحب، ومن يطلب تقليل الحركة يرى
      تبديلاً هادئاً بلا دوران.
   ══════════════════════════════════════════════════════════ */

const CSS_HREF = new URL('../css/book.css', import.meta.url).href;

/* ── النمطُ يُحمَّل مع المحرّك لا مع المنصّة: من لا يفتح كتاباً لا يدفع ثمنه ── */
let cssReady = null;
function loadCss(){
  if(cssReady) return cssReady;
  /* نمطٌ حاضرٌ سلفاً (رابطٌ أو `<style data-bk-css>` في صفحةٍ مستقلّة) ⇒ لا يُحمَّل ثانيةً */
  if(document.querySelector('[data-bk-css]')) return (cssReady = Promise.resolve());
  cssReady = new Promise(done => {
    const l = document.createElement('link');
    l.rel = 'stylesheet'; l.href = CSS_HREF; l.dataset.bkCss = '1';
    /* فشلُ النمط لا يحجب النصّ — يُعرض بلا زينةٍ خيرٌ من ألّا يُعرض */
    l.onload = done; l.onerror = done;
    document.head.append(l);
  });
  return cssReady;
}

/* ── القياسُ قبل الخطّ يكذب: البديلُ أعرضُ من Amiri، فصفحاتٌ تُقسَم قبل
      وصوله تُترك نصفَ فارغة. ⇒ ننتظره، وبسقفٍ زمنيٍّ كي لا يعلق الكتاب.
   🔴 **ومعه نصٌّ عربيٌّ ولاتينيّ — قِيس العطلُ ولم يُقدَّر:** Google Fonts
      تُقدّم Amiri شرائحَ بـ`unicode-range`، و`fonts.load()` بلا نصٍّ تطلب
      شريحةَ المسافة (اللاتينية) وحدها. فقُسِّمت الصفحاتُ العربيةُ بالخطّ
      البديل وبقي ثلثُ كلّ صفحةٍ فارغاً. والنصُّ الثاني يطلب الشريحتين. ── */
const FONT_PROBE = 'بيان Bayan';
function fontsReady(){
  if(!document.fonts?.load) return Promise.resolve();
  const want = ['400 20px Amiri', '800 20px Almarai', '700 20px Almarai'];
  return Promise.race([
    Promise.all(want.map(f => document.fonts.load(f, FONT_PROBE).catch(() => null))),
    new Promise(r => setTimeout(r, 2200))
  ]);
}

/* ═══════════ أدواتٌ نقيّة ═══════════ */

const esc = s => String(s == null ? '' : s)
  .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/"/g, '&quot;');

const INDIC = n => String(n).replace(/[0-9]/g, d => '٠١٢٣٤٥٦٧٨٩'[+d]);

/* تنسيقٌ احتياطيّ إن لم تُمرَّر `fmt` المنصّة — يُهرّب ثمّ يكسر الأسطر */
const plainFormat = s => esc(s).replace(/\n/g, '<br>');

const AR_CH  = /[\u0600-\u06FF\u0750-\u077F\uFB50-\uFDFF\uFE70-\uFEFF]/g;
const LAT_CH = /[A-Za-z\u00C0-\u024F]/g;
const RTL_LANGS = new Set(['ar', 'fa', 'ur', 'he']);

/* غالبُ الحروف لا أوّلُها: نصٌّ إنجليزيٌّ يبدأ باسمٍ عربيّ يبقى إنجليزياً */
function sniffDir(text){
  const t = String(text || '').slice(0, 600);
  const a = (t.match(AR_CH) || []).length;
  const l = (t.match(LAT_CH) || []).length;
  return a >= l ? 'rtl' : 'ltr';
}

/* علاماتُ التنسيق تُحمى من القطع: `**عبارةٌ بكلمتين**` لا تنشطر بين
   صفحتين فتُطبع نجومُها خاماً على الوجهين. */
const KEEP = /\*\*[^*\n]+\*\*|__[^_\n]+__|_[^_\n]+_|\\\([\s\S]+?\\\)|\\\[[\s\S]+?\\\]/g;
const GLUE = '\uE000';
const tokenize = s => String(s)
  .replace(KEEP, m => m.replace(/ /g, GLUE))
  .split(/[ \t]+/).filter(Boolean)
  .map(t => t.split(GLUE).join(' '));

/* نهايةُ جملة — بعد نزع علامات التنسيق وأقواس الإغلاق من ذيلها */
const SENT_END = /[.!?؟؛…](["'”’»)\]]*)$/;
const isSentEnd = tok => SENT_END.test(tok.replace(/(\*\*|__|_)+$/, ''));

const words = s => (String(s).match(/\S+/g) || []).length;
const norm  = s => String(s || '').replace(/[\u064B-\u0652\u0670*_]/g, '')
  .replace(/\s+/g, ' ').trim().toLowerCase();

/* ── تحليل النصّ إلى كتل ──
   الفقرةُ ما فصله سطرٌ فارغ. والعنوانُ سطرٌ واحدٌ قصيرٌ بلا علامة
   وقف يليه نصّ، أو سطرٌ محاطٌ كلُّه بـ`**`. والعنوانُ الأوّلُ الذي
   يطابق عنوانَ الكتاب يسقط: الغلافُ يحمله، واسمٌ يُكتب مرّتين في
   شاشةٍ واحدة يُقرأ سهواً. */
const OWN_NUM = /^\s*[(（]\s*([0-9٠-٩]+)\s*[)）]\s*/;
const LETTERED = /^\s*(\*\*)?[A-H][.)]?(\*\*)?\s+\S/;

/* 🆕 b165 · الصورة سطرٌ وحده: [صورة: المصدر | التعليق] — أو [image: …] في النصّ
   الإنجليزي، فلا تختلط الكتابتان في سطر المعلّم. والتعليقُ اختياريّ.
   🔑 وتُعزل سطراً وإن لم يفصلها سطرٌ فارغ: المعلّمُ يُدرجها حيث المؤشّر،
      ولا يُطالَب بقاعدة فراغٍ لا يراها.
   🆕 b170 · والفيديو أخوها في السطر نفسِه: [فيديو: الرابط | التعليق] — أو [video: …]. */
const FIG = /^\[\s*(صورة|image|فيديو|video)\s*[:：]\s*([^|\]\n]+?)\s*(?:\|\s*([^\]\n]*?))?\s*\]$/i;
const figKind = w => /^(فيديو|video)$/i.test(w) ? 'vid' : 'img';

function parse(body, title){
  const raw = String(body || '').replace(/\r\n?/g, '\n').trim()
    .split('\n').map(l => FIG.test(l.trim()) ? '\n' + l.trim() + '\n' : l).join('\n');
  const chunks = raw.split(/\n[ \t]*\n+/).map(s => s.trim()).filter(Boolean);
  const blocks = [];

  chunks.forEach((c, i) => {
    const fig = c.match(FIG);
    if(fig){ blocks.push({ type: 'f', kind: figKind(fig[1]), src: fig[2].trim(), cap: (fig[3] || '').trim() }); return; }
    const oneLine = !c.includes('\n');
    const wrapped = oneLine && /^\*\*[^*]+\*\*$/.test(c);
    const bare = c.replace(/^\*\*|\*\*$/g, '').trim();
    const short = oneLine && words(c) <= 8 && !/[.!?؟،,:;؛…]$/.test(bare)
                  && i < chunks.length - 1;
    if(wrapped || short){
      if(i === 0 && norm(bare) === norm(title)) return;
      blocks.push({ type: 'h', text: bare });
      return;
    }
    blocks.push({ type: 'p', text: c });
  });

  /* الترقيم ثلاثةُ أحوال:
     ① المؤلّفُ رقّم كلَّ فقرة «(١)» ⇒ رقمُه ينتقل إلى الهامش كما كتبه
     ② الفقراتُ موسومةٌ بحروف (A · B · C) ⇒ لا ترقيم: الحرفُ هو المرجع
        في أسئلة «أيُّ فقرةٍ تذكر…»، ورقمٌ بجواره يُربك
     ③ ما عدا ذلك ⇒ ترقيمٌ آليّ في الهامش */
  const ps = blocks.filter(b => b.type === 'p');
  const own = ps.length > 0 && ps.every(p => OWN_NUM.test(p.text));
  const lettered = !own && ps.length > 1
    && ps.filter(p => LETTERED.test(p.text)).length >= Math.ceil(ps.length * 0.6);

  let k = 0;
  ps.forEach(p => {
    if(own){
      const m = p.text.match(OWN_NUM);
      p.n = m[1]; p.text = p.text.slice(m[0].length);
    } else if(!lettered){
      p.n = String(++k);
    }
    p.tokens = tokenize(p.text);
  });

  const total = ps.reduce((s, p) => s + p.tokens.length, 0);
  return { blocks, paragraphs: ps.length, words: total, numbered: own || !lettered };
}

/* 🆕 b165 · الصورُ قبل التقسيم — المصدرُ يمرّ بحارس المنصّة (`opt.media`) ويُعرف
   قياسُ كلِّ صورة: **الصورةُ تحجز مكانها بنسبتها** فيصدُق قياسُ الصفحة ولا يقفز
   النصّ حين تصل. والكتلةُ تبقى في موضعها وإن سقطت (`drop`)، فلا تنزاح أرقامُ
   الكتل التي تُحفظ بها صفحةُ القارئ.
   ⏱ والانتظارُ مسقوف: صورةٌ بطيئةٌ تأخذ نسبةً مفترضة وتصل في مكانها، وصورةٌ
      مكسورةٌ تسقط — فراغٌ لا يُرسم خيرٌ من إطارٍ فارغ. */
/* وللمحرّر: وسائطُ النصّ [{ kind: 'img'|'vid', src }] — ليُنذَر المعلّمُ عند الحفظ بما
   سيسقط عند الطالب. والقاعدةُ هي FIG نفسُها، فلا تفترق نسختان. */
export const mediaLines = body => String(body || '').split(/\r?\n/)
  .map(l => l.trim().match(FIG)).filter(Boolean)
  .map(m => ({ kind: figKind(m[1]), src: m[2].trim() }));

/* 🆕 b170 · والفيديو لا يُنتظر: إطارُه ١٦:٩ معلومٌ سلفاً، وصورتُه تصل في مكانها.
   ومصدرُه يمرّ بحارسه (`opt.video` = videoOf) فيعود { embed, poster } أو يسقط. */
const FIG_WAIT = 4000, FIG_R = 0.62, VID_R = 0.5625;
const httpsOnly = s => /^https:\/\/[^\s"'<>]+$/.test(s) ? s : null;

function figuresReady(model, resolve, video){
  const figs = model.blocks.filter(b => b.type === 'f');
  return Promise.all(figs.map(f => new Promise(done => {
    if(f.kind === 'vid'){
      f.v = video ? video(f.src) : null;
      if(!f.v) f.drop = true; else f.r = VID_R;
      return done();
    }
    f.url = (resolve || httpsOnly)(f.src);
    if(!f.url){ f.drop = true; return done(); }
    const img = new Image();
    const t = setTimeout(() => { f.r ??= FIG_R; done(); }, FIG_WAIT);
    img.onload  = () => { clearTimeout(t); f.r ??= (img.naturalHeight / img.naturalWidth) || FIG_R; done(); };
    img.onerror = () => { clearTimeout(t); if(f.r == null) f.drop = true; done(); };
    img.src = f.url;
  })));
}

/* ═══════════ المعجم — مفرداتُ الدرس داخل نصّه (b153) ═══════════
   البطاقةُ تُكتب بالجذر («civilization (n)» · «الزَّلّات») والنصُّ يكتب
   الصيغة («civilizations» · «زَلّاتِ»). فالمطابقةُ صيغٌ لا حرفٌ بحرف:

   🔤 الإنجليزية — تُولَّد صيغُ الجذر إلى الأمام (s · es · ies · ed ·
      ing · مضاعفةُ الساكن) ولا يُقطع النصُّ إلى جذرٍ مخمَّن: ما نعرفه
      هو البطاقة، فنشتقّ منها ولا نحزر عليها.
   🔤 العربية — تُنزع الحركاتُ والتطويل، وتُوحَّد الألفات والياء والتاء،
      ثمّ يُجرَّب اللفظُ بلا «ال» وبلا سابقةٍ واحدة (و ف ب ك ل). ⇒
      «بِأَطْنابِ الخِيامِ» تطابق بطاقةَ «أَطْنابُ الخِيام».
   ⚠️ والعبارةُ حتى أربع كلمات؛ وما زاد فبطاقةُ استراتيجيةٍ لا مفردة
      («main idea vs. supporting detail») فلا تُبحث في النصّ. */
const MARKS = /[\u064B-\u065F\u0670\u06D6-\u06ED\u0640]/g;
const normAr = s => s.replace(MARKS, '').replace(/[\u0623\u0625\u0622\u0671]/g, '\u0627')
  .replace(/\u0649/g, '\u064A').replace(/\u0629/g, '\u0647');
const EDGE = /^[^\p{L}\p{N}]+|[^\p{L}\p{N}]+$/gu;
const lemmaOf = front => String(front || '').replace(/\s*\([^)]*\)\s*$/, '').trim();

function enForms(w){
  const f = new Set([w, w + 's', w + 'es']);
  if(/[^aeiou]y$/.test(w)){ f.add(w.slice(0, -1) + 'ies'); f.add(w.slice(0, -1) + 'ied'); }
  if(/e$/.test(w)){ f.add(w + 'd'); f.add(w.slice(0, -1) + 'ing'); }
  else { f.add(w + 'ed'); f.add(w + 'ing'); }
  if(/[^aeiou][aeiou][bdgklmnprt]$/.test(w)){
    const d = w + w.slice(-1); f.add(d + 'ed'); f.add(d + 'ing');
  }
  return f;
}
function arCands(n){
  const c = new Set([n]);
  const noAl = x => { if(x.startsWith('\u0627\u0644') && x.length > 3) c.add(x.slice(2)); };
  noAl(n);
  if(n.startsWith('\u0644\u0644') && n.length > 4) c.add(n.slice(2));            // لل = ل + ال
  for(const p of '\u0648\u0641\u0628\u0643\u0644'){                                // و ف ب ك ل
    if(n.startsWith(p) && n.length >= 4){ const r = n.slice(1); c.add(r); noAl(r); }
  }
  if(/^[\u0648\u0641][\u0628\u0644\u0643]/.test(n) && n.length >= 5){            // وبـ · فلـ …
    const r = n.slice(2); c.add(r); noAl(r);
  }
  /* ولاحقةُ الضمير: «عَذْلَهُ» ⇐ «عَذْل» · «شِيمَتي» ⇐ «شِيمَة» (التاءُ تعود مربوطة).
     ⚠️ والباقي ثلاثةُ أحرفٍ فأكثر — وإلّا صارت «قِرى» «قُرّ»: معنيان بينهما بردٌ وضيافة. */
  for(const x of [...c]){
    for(const suf of SUFFIX){
      if(x.endsWith(suf) && x.length - suf.length >= 3){
        const r = x.slice(0, -suf.length);
        c.add(r);
        if(r.endsWith('\u062A')) c.add(r.slice(0, -1) + '\u0647');                  // ت ⇐ ة
      }
    }
  }
  return c;
}
const SUFFIX = ['\u0647\u0645\u0627', '\u0647\u0645', '\u0647\u0646', '\u0647\u0627', '\u0647',
                '\u0643\u0645', '\u0643', '\u0646\u0627', '\u064A'];      // هما هم هن ها ه كم ك نا ي
const tokKey = (tok, ar) => {
  const w = String(tok).replace(EDGE, '');
  return ar ? normAr(w) : w.toLowerCase().replace(/['’]s$/, '');
};
const tokCands = (tok, ar) => {
  const k = tokKey(tok, ar);
  return k ? (ar ? arCands(k) : new Set([k])) : new Set();
};

/* الفهرس: أوّلُ كلمةٍ من كلّ عبارة ⇒ [{ e: رقمُ المدخل، rest: [صيغُ ما بعدها] }] */
function buildGlossary(entries, ar){
  const index = new Map();
  entries.forEach((en, e) => {
    const ws = lemmaOf(en.front).split(/\s+/).filter(Boolean);
    if(!ws.length || ws.length > 4) return;
    const sets = ws.map(w => {
      const k = tokKey(w, ar);
      if(!k) return null;
      if(!ar) return enForms(k);
      const s = new Set([k]);
      if(k.startsWith('\u0627\u0644') && k.length > 3) s.add(k.slice(2));
      return s;
    });
    if(sets.some(s => !s)) return;
    for(const f of sets[0]){
      if(!index.has(f)) index.set(f, []);
      index.get(f).push({ e, rest: sets.slice(1) });
    }
  });
  return index;
}

/* لكلّ فقرة: hits[i] = { e, last } — والأطولُ يغلب حين تتداخل عبارتان */
function markHits(tokens, index, ar){
  if(!index.size) return null;
  const C = tokens.map(t => tokCands(t, ar));
  const hits = new Array(tokens.length);
  let any = false;
  for(let i = 0; i < tokens.length; i++){
    let best = null;
    for(const c of C[i]){
      for(const cand of index.get(c) || []){
        const n = cand.rest.length;
        if(best && best.n >= n) continue;
        let ok = i + n < tokens.length;
        for(let j = 0; ok && j < n; j++) ok = [...C[i + j + 1]].some(x => cand.rest[j].has(x));
        if(ok) best = { e: cand.e, n };
      }
    }
    if(best){
      for(let j = 0; j <= best.n; j++) hits[i + j] = { e: best.e, last: j === best.n };
      i += best.n; any = true;
    }
  }
  return any ? hits : null;
}

/* النائبان يعبران `fmt` سالمَين (لا تهرّبهما ولا تمسّهما علاماتُها)،
   ثمّ يصيران وسماً. ⇒ لا HTML من المؤلّف، والثابتُ المحروس باقٍ. */
const W_OPEN = k => '\uE001' + k + '\uE003', W_CLOSE = '\uE002';
const W_RX = /\uE001(\d+)\uE003/g;
const SPLIT_TOK = /^([^\p{L}\p{N}\p{M}]*)([\s\S]*?)([^\p{L}\p{N}\p{M}]*)$/u;
const EMPH = /\*\*|__|_/g;

/* 🆕 b155 · الجملةُ وحدةُ القراءة المسموعة: تُلفّ في `.bk-s` فتُظلَّل حين تُقرأ.
   والنقطةُ بعد اختصارٍ ليست نهايةَ جملة («Dr.» · «e.g.» · حرفٌ مفرد). */
const S_OPEN = k => '\uE004' + k + '\uE005', S_CLOSE = '\uE006';
const S_RX = /\uE004(\d+)\uE005/g;
const ABBR = /^(mr|mrs|ms|dr|prof|st|mt|jr|sr|vs|etc|e\.g|i\.e|no|[a-z])\.$/i;
const isAbbr = tok => ABBR.test(String(tok).replace(/^[("'\[\u201C\u2018]+/, '').replace(EMPH, ''));
const plainText = t => String(t).replace(/\*\*|__|_/g, '').replace(/\\[()[\]]/g, '').replace(/\s+/g, ' ').trim();

/* ══════════════════════════════════════════════════════════
   createBook(host, opt) ⇒ { next, prev, jump, destroy }

   opt.title · opt.body · opt.lang · opt.subtitle
   opt.kicker      [المادة، الدرس] — سطرُ السياق على الغلاف
   opt.format      fmt المنصّة (**غامق** __مسطّر__) — وإلا تهريبٌ خام
   opt.num         أرقامُ الواجهة (AR) — وأرقامُ الورقة تتبع لسانَها
   opt.coverMeta   ({paragraphs, words, minutes}) ⇒ نصّ
   opt.endHtml     () ⇒ HTML صفحة الختام · أفعالُها [data-act]
   opt.onAction    (act, book) — نقرةٌ على [data-act]
   opt.onEnd       ({seconds, words}) — بلغ الختامَ بسرعةِ قارئٍ لا ماسح
   opt.onResume    () — فُتح على صفحةٍ محفوظة
   opt.storeKey    مفتاحُ موضع القارئ في localStorage
   opt.say         نصوصُ الواجهة (انظر SAY)

   🆕 b153 · الكلمة والصوت:
   opt.glossary    [{ front, … }] — مفرداتُ الدرس؛ تُلوَّن في النصّ وتُنقَر
   opt.tapAny      (dir) ⇒ bool — كلُّ كلمةٍ تُنقَر لتُسمَع (لا معنى لها)
   opt.wordHtml    (entry|null, word) ⇒ HTML النافذة
   opt.onWord      ({ entry, word, el, reflow, close }) — بعد فتح النافذة

   🆕 b155 · استمع وتابع:
   opt.voice       { available(dir), speak(text,{rate,onend,onerror}), stop(), name() }
   opt.onVoiceFail () — تعذّر النطق على هذا الجهاز

   🆕 b165 · الصورة — سطرٌ وحده في النصّ: [صورة: المصدر | التعليق]:
   opt.media       (src) ⇒ رابطٌ أو null — حارسُ المصادر (srcOf في المنصّة)؛
                   وبدونه لا يُقبل إلا https

   🆕 b170 · الفيديو — [فيديو: الرابط | التعليق]:
   opt.video       (src) ⇒ { embed, poster } أو null — حارسُه (videoOf)؛ وبدونه يسقط
   opt.onNotice    (msg) — تنبيهٌ للقارئ (مقطعٌ أثناء التسجيل)
   ══════════════════════════════════════════════════════════ */

const SAY = {
  book:    t => `كتاب: ${t}`,
  prev:    'الصفحة السابقة',
  next:    'الصفحة التالية',
  smaller: 'تصغير الخط',
  larger:  'تكبير الخط',
  full:    'ملء الشاشة',
  listen:  'استماع',
  pause:   'إيقاف',
  rate:    'سرعة القراءة',
  zoom:    'تكبير الصورة',
  close:   'إغلاق',
  video:   'مقطع فيديو',
  play:    c => c ? `تشغيل المقطع: ${c}` : 'تشغيل المقطع',
  vidLocked: 'المقطع لا يعمل أثناء التسجيل، فلا يدخل صوته فيه',
  cover:   'الغلاف',
  end:     'النهاية',
  page:    (a, b, n) => b ? `الصفحتان ${a} و${b} من ${n}` : `الصفحة ${a} من ${n}`,
  count:   (a, b, n) => `${b ? a + '–' + b : a} / ${n}`,
};

const FS_KEY  = 'bayan.book.fs';
/* 🔇 b154 · صوتُ التقليب جُرِّب في b153 ورُفع — **قرارُ صاحب المنصّة: «مزعجٌ جدّاً».**
   كان ضجيجاً مُرشَّحاً يُركَّب بـWeb Audio، ولم يُسمَع بأذنٍ قبل تسليمه (المتصفّحُ
   بلا سمّاعة) — وهذا بعينه ما سقط فيه. **ولا يعود إلا ملفّاً مسجَّلاً لورقٍ حقيقيّ،
   ناعماً هادئاً، يُسمَع ويُعتمد قبل أن يُكتب سطرُه.** */
const FS_STEPS = { rtl: [1.12, 1.25, 1.4, 1.58], ltr: [1.0, 1.1, 1.22, 1.36] };
const LH       = { rtl: 2.05, ltr: 1.78 };
const WPM_FAST = 450;        /* أسرعُ من هذا مسحٌ لا قراءة — انظر onEnd */
const MIN_WORDS = 6;         /* أقلُّ من سطرٍ في ذيل الصفحة ⇒ الفقرةُ كلُّها تنتقل */
const WIDOW     = 4;         /* ولا تبدأ صفحةٌ بأقلَّ من هذا من ذيل فقرة */
const SENT_BACK = 18;        /* أبعدُ ما يُرجَع إليه بحثاً عن نهاية جملة */

const store = {
  get(k){ try{ return JSON.parse(localStorage.getItem(k)); }catch(e){ return null; } },
  set(k, v){ try{ localStorage.setItem(k, JSON.stringify(v)); }catch(e){} }
};

export async function createBook(host, opt = {}){
  await Promise.all([loadCss(), fontsReady()]);

  const say    = { ...SAY, ...(opt.say || {}) };
  const fmt    = opt.format || plainFormat;
  const uiNum  = opt.num || (n => String(n));
  const title  = String(opt.title || '').trim();
  const dir    = sniffDir(opt.body);
  const lang   = (opt.lang && RTL_LANGS.has(opt.lang) === (dir === 'rtl'))
                 ? opt.lang : (dir === 'rtl' ? 'ar' : 'en');
  const paperNum = n => dir === 'rtl' ? INDIC(n) : String(n);
  const model  = parse(opt.body, title);
  await figuresReady(model, opt.media, opt.video);
  const reduce = matchMedia('(prefers-reduced-motion: reduce)');

  /* المعجم يُطابَق مرّةً عند الفتح — والتقسيمُ يُعاد كثيراً ولا يُعيده */
  const glossary = (opt.glossary || []).filter(g => g && g.front);
  const gIndex   = buildGlossary(glossary, dir === 'rtl');
  model.blocks.forEach(b => { if(b.type === 'p') b.hits = markHits(b.tokens, gIndex, dir === 'rtl'); });
  const tapAny = typeof opt.tapAny === 'function' ? !!opt.tapAny(dir) : !!opt.tapAny;

  /* 🆕 b155 · الجُمَل — تُبنى إن وُجد صوتٌ لهذا اللسان وحده (الجسرُ يقرّر). والعنوانُ
     جملتُها الأولى: من بدأ من الغلاف سمع اسمَ النصّ قبل متنه. */
  const voice = opt.voice?.available?.(dir) ? opt.voice : null;
  const sents = [];
  if(voice){
    if(title) sents.push({ cover: true, text: plainText(title) });
    model.blocks.forEach(blk => {
      if(blk.type === 'h'){ blk.sid = sents.length; sents.push({ text: plainText(blk.text) }); return; }
      if(blk.type !== 'p') return;                 // الصورةُ تُرى ولا تُقرأ
      const T = blk.tokens;
      blk.sids = new Array(T.length);
      let a = 0;
      for(let i = 0; i < T.length; i++){
        if(i === T.length - 1 || (isSentEnd(T[i]) && !isAbbr(T[i]))){
          for(let j = a; j <= i; j++) blk.sids[j] = sents.length;
          sents.push({ text: plainText(T.slice(a, i + 1).join(' ')) });
          a = i + 1;
        }
      }
    });
  }



  let fsStep = Number(store.get(FS_KEY)?.[dir]);
  if(!(fsStep >= 0 && fsStep < FS_STEPS[dir].length)) fsStep = 1;

  /* ── الهيكل ── */
  const root = document.createElement('section');
  root.className = 'bk' + (model.numbered ? ' numbered' : '');
  root.dir = dir; root.lang = lang;
  root.setAttribute('aria-label', say.book(title));
  root.innerHTML = `
    <div class="bk-stage">
      <div class="bk-book">
        <div class="bk-slot a"></div>
        <div class="bk-slot b"></div>
        <button type="button" class="bk-hot prev" tabindex="-1" aria-hidden="true"></button>
        <button type="button" class="bk-hot next" tabindex="-1" aria-hidden="true"></button>
        <div class="bk-fold"></div>
      </div>
    </div>
    <div class="bk-bar">
      <button type="button" class="bk-btn" data-k="prev" aria-label="${esc(say.prev)}">${ICO.prev}</button>
      <div class="bk-mid">
        <div class="bk-track" aria-hidden="true"><i></i></div>
        <span class="bk-count" dir="rtl"></span>
      </div>
      <div class="bk-tools" dir="rtl">
        <button type="button" class="bk-btn sm" data-k="smaller" aria-label="${esc(say.smaller)}">${ICO.aMinus}</button>
        <button type="button" class="bk-btn sm" data-k="larger" aria-label="${esc(say.larger)}">${ICO.aPlus}</button>
        <button type="button" class="bk-btn sm" data-k="full" aria-label="${esc(say.full)}">${ICO.full}</button>
        ${opt.slot ? '<span class="bk-x" data-k="x"></span>' : ''}
        ${voice ? `<button type="button" class="bk-btn sm txt" data-k="rate" hidden aria-label="${esc(say.rate)}"></button>
        <button type="button" class="bk-btn sm pill" data-k="listen" aria-pressed="false"
                aria-label="${esc(say.listen)}">${ICO.listen}<span class="bk-lbl">${esc(say.listen)}</span></button>` : ''}
      </div>
      <button type="button" class="bk-btn" data-k="next" aria-label="${esc(say.next)}">${ICO.next}</button>
    </div>
    <div class="bk-live" aria-live="polite" aria-atomic="true"></div>`;
  host.replaceChildren(root);

  const stage = root.querySelector('.bk-stage');
  const book  = root.querySelector('.bk-book');
  const foldBox = root.querySelector('.bk-fold');
  const slots = { a: root.querySelector('.bk-slot.a'), b: root.querySelector('.bk-slot.b') };
  const bar   = root.querySelector('.bk-bar');
  const live  = root.querySelector('.bk-live');
  const btn   = k => root.querySelector(`[data-k="${k}"]`);
  if(!root.requestFullscreen) btn('full').hidden = true;

  /* الصفحةُ المخفيّة التي يُقاس بها — مقاسُها وخطُّها وحشوُها هي هي */
  const meter = document.createElement('div');
  meter.className = 'bk-meter';
  meter.setAttribute('aria-hidden', 'true');
  meter.innerHTML = `<article class="bk-page bk-text"><div class="bk-run">x</div>
    <div class="bk-body"></div><div class="bk-folio">0</div></article>`;
  root.append(meter);
  const mBody = meter.querySelector('.bk-body');

  /* ── الحالة ── */
  let mode = 'single';           // 'spread' صفحتان · 'single' صفحة
  let pages = [];                // [{kind, html, anchor, words, no}]
  let view = 0;
  let turning = null, pending = 0;
  let dims = '';
  let readMs = 0, tickAt = performance.now();
  const seen = new Map();        // anchor ⇒ كلماتُ الصفحة — ما رآه في هذه الجلسة
  let endFired = false;

  /* ═══════════ التقسيم ═══════════ */

  const fits = () => mBody.scrollHeight <= mBody.clientHeight + 1;

  function setP(node, blk, a, b, brk){
    const cont = a > 0;
    node.className = 'bk-p' + (cont ? ' cont' : '') + (brk ? ' brk' : '');
    const n = (!cont && blk.n) ? `<span class="bk-n">${paperNum(blk.n)}</span>` : '';
    node.innerHTML = n + fragHtml(blk, a, b);
  }

  /* قطعةُ فقرة بكلماتها الملوّنة. والعبارةُ التي تعبر حدَّ الصفحة تُغلَق
     في آخر الأولى وتُفتح في أوّل الثانية — فلا وسمٌ يبقى مفتوحاً.
     🔑 ويسقط تسطيرُ المؤلّف وغامقُه عن الكلمة الملوّنة: اللونُ يقول
        «انقر» ويقول «هذه مهمّة» معاً، وعلامتان على كلمةٍ واحدة ضجيج. */
  function fragHtml(blk, a, b){
    const T = blk.tokens, S = blk.sids;
    if(!blk.hits && !S) return fmt(T.slice(a, b).join(' '));
    const out = [];
    let open = false;
    for(let i = a; i < b; i++){
      /* الجملةُ تُفتح وتُغلق داخل القطعة؛ والكلمةُ داخل الجملة — فإن عبرت
         عبارةٌ حدَّ جملةٍ أُغلقت وفُتحت ثانيةً، ولا يتداخل وسمان. */
      const sOpen  = S && (i === a || S[i] !== S[i - 1]);
      const sClose = S && (i === b - 1 || S[i] !== S[i + 1]);
      const h = blk.hits?.[i];
      let t = T[i];
      if(h){
        const [, lead, core, trail] = t.match(SPLIT_TOK);
        const end = h.last || i === b - 1 || sClose;
        t = lead.replace(EMPH, '') + (open ? '' : W_OPEN(h.e)) + core
          + (end ? W_CLOSE : '') + trail.replace(EMPH, '');
        open = !end;
      }
      out.push((sOpen ? S_OPEN(S[i]) : '') + t + (sClose ? S_CLOSE : ''));
    }
    return fmt(out.join(' '))
      .replace(W_RX, (_, k) => `<span class="bk-w" data-w="${k}" role="button" tabindex="0">`)
      .split(W_CLOSE).join('</span>')
      .replace(S_RX, (_, k) => `<span class="bk-s" data-s="${k}">`)
      .split(S_CLOSE).join('</span>');
  }

  /* 🆕 b165 · الصورةُ في الصفحة: إطارٌ بنسبتها (`--r`) وسقفُ ارتفاعه في CSS نسبةٌ
     من الصفحة — فتبقى للنصّ مساحتُه. ولمسةٌ تكبّرها.
     🔑 والإطارُ ليس `<button>`: السحبُ عليه يقلب الصفحةَ كسائر الورقة (pointerdown
        يتجاهل الأزرار)، والنقرُ وحده يكبّر. والتعليقُ `alt` الصورة — أصدقُ وصفٍ لها. */
  const figHtml = (blk, bi) => {
    const cap = blk.cap ? `<figcaption class="bk-cap" dir="auto">${fmt(blk.cap)}</figcaption>` : '';
    /* 🆕 b170 · الفيديو بطاقةٌ في الورقة لا مشغّلٌ فيها: صورتُه وزرُّ تشغيل، واللمسةُ تفتحه
       فوق الكتاب. مشغّلٌ داخل ورقةٍ تنثني يومض ويُقطع بالتقليب — والبطاقةُ صورةٌ تنثني
       مع الورق كغيرها. والصورةُ بلا مُحيل (`no-referrer`): لا يعرف YouTube من أين نُظر. */
    if(blk.kind === 'vid')
      return `<figure class="bk-fig bk-vid" style="--r:${VID_R}"><div class="bk-fbox" role="button" tabindex="0"`
        + ` data-v="${bi}" aria-label="${esc(say.play(plainText(blk.cap)))}"><img src="${esc(blk.v.poster)}" alt=""`
        + ` decoding="async" draggable="false" referrerpolicy="no-referrer"><span class="bk-play" aria-hidden="true">`
        + `${ICO.play}</span></div>${cap}</figure>`;
    return `<figure class="bk-fig" style="--r:${(+blk.r).toFixed(4)}"><div class="bk-fbox" role="button" tabindex="0"`
      + ` aria-label="${esc(say.zoom)}"><img src="${esc(blk.url)}" alt="${esc(plainText(blk.cap))}"`
      + ` decoding="async" draggable="false"></div>${cap}</figure>`;
  };

  function paginate(){
    const out = [{ kind: 'cover' }];
    let cur = [], anchor = null, count = 0, headAnchor = null;
    /* 🆕 b165 · صورةٌ لم يسعها ذيلُ صفحتها تتصدّر التالية، والنصُّ بعدها يملأ ما بقي
       — مذهبُ الطباعة: لا فراغَ في ذيل صفحة، والصورةُ على مرمى نظرةٍ من فقرتها
       (وفي المنظر المزدوج غالباً على الصفحة المقابلة). */
    const defer = [];
    mBody.innerHTML = '';

    const emit = () => {
      const html = cur.join('');
      const ids = [...html.matchAll(/data-s="(\d+)"/g)].map(m => +m[1]);
      /* صفحةُ صورٍ بلا نصّ (نادرة: صورتان لا تجتمعان، أو صورةٌ في الختام) لا مرسى
         لها ⇒ تحمل مرسى سابقتها، ولا يُرسى عليها قارئٌ عائد (viewOfAnchor). */
      out.push({ kind: 'text', html, anchor: anchor ?? out[out.length - 1]?.anchor ?? null,
                 figOnly: anchor == null, words: count,
                 s0: ids.length ? Math.min(...ids) : -1, s1: ids.length ? Math.max(...ids) : -1 });
      cur = []; anchor = null; count = 0; mBody.innerHTML = '';
    };
    const flush = () => {
      if(cur.length) emit();
      while(defer.length){                       // المؤجَّلةُ تتصدّر الصفحةَ الجديدة
        mBody.insertAdjacentHTML('beforeend', defer[0]);
        if(fits() || !cur.length){ cur.push(defer.shift()); continue; }
        mBody.lastElementChild.remove(); emit();
      }
    };

    model.blocks.forEach((blk, bi) => {
      if(blk.type === 'f'){
        if(blk.drop) return;
        const h = figHtml(blk, bi);
        if(defer.length){ defer.push(h); return; }    // لا تسبق صورةٌ صورةً أُجِّلت قبلها
        mBody.insertAdjacentHTML('beforeend', h);
        if(fits() || !cur.length){ cur.push(h); return; }
        mBody.lastElementChild.remove();
        defer.push(h);
        return;
      }
      if(blk.type === 'h'){
        const h = `<h3 class="bk-h" dir="auto">${blk.sid != null
          ? `<span class="bk-s" data-s="${blk.sid}">${fmt(blk.text)}</span>` : fmt(blk.text)}</h3>`;
        mBody.insertAdjacentHTML('beforeend', h);
        if(!fits() && cur.length){
          mBody.lastElementChild.remove(); flush();
          mBody.insertAdjacentHTML('beforeend', h);
        }
        cur.push(h); headAnchor = `${bi}:0`; anchor ??= headAnchor;
        return;
      }

      const T = blk.tokens;
      let start = 0;
      while(start < T.length){
        const node = document.createElement('p');
        mBody.append(node);
        setP(node, blk, start, T.length, false);
        if(fits()){
          cur.push(node.outerHTML); anchor ??= `${bi}:${start}`;
          count += T.length - start;
          break;
        }

        /* أكبرُ ما يسعه ذيلُ الصفحة — بحثٌ ثنائيّ على الكلمات */
        let lo = 1, hi = T.length - start - 1, best = 0;
        while(lo <= hi){
          const mid = (lo + hi) >> 1;
          setP(node, blk, start, start + mid, true);
          if(fits()){ best = mid; lo = mid + 1; } else hi = mid - 1;
        }

        const others = mBody.children.length > 1;
        if(best < MIN_WORDS && others){
          node.remove();
          /* والعنوانُ لا يبقى يتيماً في ذيل صفحةٍ ونصُّه في التالية */
          const last = mBody.lastElementChild;
          if(last?.matches('.bk-h')){
            const h = cur.pop(); last.remove();
            if(cur.length) flush(); else { mBody.innerHTML = ''; anchor = null; }
            mBody.insertAdjacentHTML('beforeend', h);
            cur.push(h); anchor = headAnchor;
          } else flush();
          continue;
        }
        if(best < 1) best = 1;   // كلمةٌ أعرضُ من صفحةٍ فارغة — تُقبل ولا تُعلِّق الحلقة

        let cut = start + best, brk = true;
        /* ③ نهايةُ جملةٍ قريبة أولى من قطعها */
        for(let j = cut - 1; j >= Math.max(start + MIN_WORDS - 1, cut - SENT_BACK); j--){
          if(isSentEnd(T[j])){ cut = j + 1; brk = false; break; }
        }
        /* ولا يبدأ وجهٌ بكلمتين يتيمتين من ذيل الفقرة */
        const tail = T.length - cut;
        if(tail > 0 && tail < WIDOW && cut - start > WIDOW + MIN_WORDS){
          cut -= WIDOW - tail; brk = true;
        }

        setP(node, blk, start, cut, brk);
        cur.push(node.outerHTML); anchor ??= `${bi}:${start}`;
        count += cut - start;
        flush();
        start = cut;
      }
    });
    flush();
    if(cur.length) emit();                       // صورٌ أُجِّلت بعد آخر النصّ
    out.push({ kind: 'end' });
    let no = 0;
    out.forEach(p => { if(p.kind === 'text') p.no = ++no; });
    return out;
  }

  const textCount = () => pages.filter(p => p.kind === 'text').length;
  const aNum = a => { if(!a) return -1; const [b, t] = a.split(':').map(Number); return b * 1e6 + t; };

  /* ═══════════ المقاس ═══════════ */

  function layout(){
    const fsEl = document.fullscreenElement === root;
    const W = Math.max(280, stage.clientWidth);
    const top = stage.getBoundingClientRect().top + (fsEl ? 0 : window.scrollY);
    const barH = bar.offsetHeight || 64;
    const H = Math.max(360, window.innerHeight - top - barH - (fsEl ? 28 : 24));

    let pw, ph;
    if(W >= 860 && H >= 400){
      mode = 'spread';
      ph = Math.min(H, 780);
      pw = Math.min(ph * 0.72, W / 2 - 6);
      ph = Math.min(ph, pw / 0.6);
    } else {
      mode = 'single';
      pw = Math.min(W, 560);
      ph = Math.min(H, 860, pw / (W < 520 ? 0.54 : 0.6));
    }
    pw = Math.floor(pw); ph = Math.floor(ph);
    const px = Math.round(Math.min(48, Math.max(20, pw * 0.09)));
    const pt = Math.round(Math.min(38, Math.max(16, ph * 0.05)));

    const fs = FS_STEPS[dir][fsStep] * (pw < 380 ? 0.94 : 1);
    root.style.setProperty('--pw', pw + 'px');
    root.style.setProperty('--ph', ph + 'px');
    root.style.setProperty('--px', px + 'px');
    root.style.setProperty('--pt', pt + 'px');
    root.style.setProperty('--bk-fs', fs.toFixed(3) + 'rem');
    root.style.setProperty('--bk-lh', LH[dir]);
    root.classList.toggle('spread', mode === 'spread');
    btn('smaller').disabled = fsStep === 0;
    btn('larger').disabled  = fsStep === FS_STEPS[dir].length - 1;
    return `${mode}|${pw}|${ph}|${fsStep}`;
  }

  /* يُعاد التقسيمُ ويبقى القارئ على سطره — يُحفظ مرسى صفحته الأولى
     ثمّ يُبحث عن الصفحة التي تحويه بعد التقسيم الجديد. */
  function repaginate(force){
    const keep = currentAnchor();
    const atEnd = pages.length && viewPages(view).includes(pages.length - 1);
    const d = layout();
    if(!force && d === dims) return;
    dims = d;
    pages = paginate();
    view = atEnd ? viewCount() - 1 : (keep ? viewOfAnchor(keep) : Math.min(view, viewCount() - 1));
    render();
  }

  /* ═══════════ المناظر ═══════════ */

  const spread    = () => mode === 'spread';
  const viewCount = () => spread() ? Math.ceil(pages.length / 2) : pages.length;
  const viewPages = v => spread() ? [2 * v, 2 * v + 1] : [v];

  function viewOfAnchor(a){
    const n = aNum(a);
    let idx = 0;
    pages.forEach((p, i) => { if(p.kind === 'text' && !p.figOnly && aNum(p.anchor) <= n) idx = i; });
    return spread() ? Math.floor(idx / 2) : idx;
  }
  function currentAnchor(){
    for(const i of viewPages(view)){ if(pages[i]?.kind === 'text' && !pages[i].figOnly) return pages[i].anchor; }
    for(const i of viewPages(view)){ if(pages[i]?.kind === 'text') return pages[i].anchor; }
    return null;
  }

  /* أين يقع خطُّ الكعب من الصفحة — فيزيائياً، لأنّ الظلّ والانحناء
     يُرسمان يميناً أو يساراً لا «بدايةً» أو «نهاية». */
  function spineOf(slot){
    const startIsLeft = dir === 'ltr';
    if(slot === 'single' || slot === 'b') return startIsLeft ? 'sp-l' : 'sp-r';
    return startIsLeft ? 'sp-r' : 'sp-l';
  }

  function pageEl(idx, slot){
    const pg = pages[idx] || { kind: 'blank' };
    const el = document.createElement('article');
    el.className = `bk-page bk-${pg.kind} ${spineOf(slot)}`;
    if(pg.kind === 'text'){
      el.innerHTML = `<div class="bk-run" dir="auto">${esc(title)}</div>
        <div class="bk-body">${pg.html}</div>
        <div class="bk-folio">${paperNum(pg.no)}</div>`;
    } else if(pg.kind === 'cover'){
      el.innerHTML = coverHtml();
    } else if(pg.kind === 'end'){
      el.innerHTML = `<div class="bk-end-in" dir="rtl">${opt.endHtml ? opt.endHtml() : ''}</div>`;
    }
    return el;
  }

  function coverHtml(){
    const minutes = Math.max(1, Math.round(model.words / (lang === 'ar' ? 150 : 120)));
    const meta = opt.coverMeta
      ? opt.coverMeta({ paragraphs: model.paragraphs, words: model.words, minutes }) : '';
    const kick = (opt.kicker || []).filter(Boolean)
      .map(k => `<span dir="auto">${esc(k)}</span>`).join('<i></i>');
    return `<div class="bk-cv">
      <div class="bk-cv-top">${kick}</div>
      <div class="bk-cv-mid">
        <span class="bk-cv-orn" aria-hidden="true"></span>
        <h2 class="bk-cv-t" dir="auto">${esc(title)}</h2>
        ${opt.subtitle ? `<p class="bk-cv-s" dir="auto">${esc(opt.subtitle)}</p>` : ''}
      </div>
      <div class="bk-cv-meta" dir="rtl">${esc(meta)}</div>
    </div>`;
  }

  function fill(slotKey, idx, slotName){
    const s = slots[slotKey];
    s.replaceChildren(idx == null ? '' : pageEl(idx, slotName));
  }

  function render(){
    tick();
    if(spread()){
      const [a, b] = viewPages(view);
      fill('a', a, 'a'); fill('b', b, 'b');
    } else {
      fill('a', view, 'single'); slots.b.replaceChildren();
    }

    const shown = viewPages(view).map(i => pages[i]).filter(Boolean);
    const nums  = shown.filter(p => p.kind === 'text').map(p => p.no);
    const n = textCount();
    let count, spoken;
    if(nums.length){
      const [a, b] = [nums[0], nums[1]];
      count  = say.count(uiNum(a), b ? uiNum(b) : null, uiNum(n));
      spoken = say.page(uiNum(a), b ? uiNum(b) : null, uiNum(n));
    } else {
      count = spoken = shown[0]?.kind === 'end' ? say.end : say.cover;
    }
    root.querySelector('.bk-count').textContent = count;
    live.textContent = spoken;

    const last = viewCount() - 1;
    root.querySelector('.bk-track i').style.inlineSize =
      (last ? Math.round(view / last * 100) : 100) + '%';
    btn('prev').disabled = view === 0;
    btn('next').disabled = view === last;
    root.querySelector('.bk-hot.prev').hidden = view === 0;
    root.querySelector('.bk-hot.next').hidden = view === last;

    shown.forEach(p => { if(p.kind === 'text') seen.set(p.anchor, p.words); });
    if(opt.storeKey){
      const atEnd = shown.some(p => p.kind === 'end');
      store.set(opt.storeKey, { a: atEnd ? null : currentAnchor(), t: Date.now() });
    }
    watchEnd(shown.some(p => p.kind === 'end'));
    if(nar.hl != null) paintHL();
  }

  /* ── زمنُ القراءة: ما مضى والصفحةُ ظاهرةٌ والنصُّ أمامه ── */
  function tick(){
    const now = performance.now();
    const onText = viewPages(view).some(i => pages[i]?.kind === 'text');
    if(document.visibilityState === 'visible' && onText) readMs += now - tickAt;
    tickAt = now;
  }

  /* 🔑 «بلغ الآخر» ليست «قرأ». فمن قلّب إلى الختام أسرعَ من ٤٥٠ كلمة
     في الدقيقة لما رآه في هذه الجلسة فقد مسح ولم يقرأ — فلا يُنادى
     `onEnd` ولا يُسجَّل إتماماً كاذباً. وإشارةٌ كاذبة أسوأ من إشارةٍ
     ناقصة (مذهبُ مشغّل الصوت في student.js).
     🔴 **ويُعاد الحكمُ ما دام الختامُ ظاهراً — وقِيس العطلُ قبل العلاج:**
        في الصفحتين يقع الختامُ بجوار آخر صفحة نصّ، فيُرى **قبل** أن
        تُقرأ تلك الصفحة. والحكمُ لحظةَ الوصول كان يقول «مسح» أبداً،
        فلم يُسجَّل إتمامٌ لقارئٍ متأنٍّ في نصٍّ من صفحتين. ⇒ يُراقَب
        والزمنُ يجري على صفحة النصّ المجاورة، حتى يبلغ حدّه أو يُغادَر. */
  function reachEnd(){
    if(endFired) return;
    tick();
    const w = [...seen.values()].reduce((s, x) => s + x, 0);
    const seconds = Math.round(readMs / 1000);
    if(seconds < w / (WPM_FAST / 60)) return;
    endFired = true;
    watchEnd(false);
    opt.onEnd?.({ seconds, words: model.words });
  }
  let endTimer = 0;
  function watchEnd(on){
    clearInterval(endTimer); endTimer = 0;
    if(!on || endFired) return;
    reachEnd();
    if(!endFired) endTimer = setInterval(() => {
      if(!root.isConnected) return destroy();
      reachEnd();
    }, 2500);
  }

  /* ═══════════ التقليب ═══════════ */

  function plan(delta){
    const nv = view + delta;
    if(nv < 0 || nv >= viewCount()) return null;
    if(spread()){
      return delta > 0
        ? { slot: 'b', under: [2 * view, 2 * nv + 1], front: 2 * view + 1, back: 2 * nv, backSlot: 'a', nv }
        : { slot: 'a', under: [2 * nv, 2 * view + 1], front: 2 * view, back: 2 * nv + 1, backSlot: 'b', nv };
    }
    return delta > 0
      ? { slot: 'single', under: [nv], front: view, back: -1, nv }
      : { slot: 'single', under: [view], front: nv, back: -1, nv, reverse: true };
  }

  /* ═══ الطيُّ الناعم (b154) — حلّ محلَّ الدوران الثلاثيّ الأبعاد ═══
     الصفحةُ لا تدور لوحاً صلباً حول الكعب؛ **الورقُ ينثني**: تُرفع زاويتُها
     ويمشي خطُّ الطيّ عبرها، فيظهر ظهرُها مقلوباً فوق وجهها، وتنكشف تحتها
     الصفحةُ التالية. وهذا ما يعرفه القارئ من الكتاب الورقيّ.

     📐 الهندسةُ في إطارٍ موحَّد: الكعبُ عند x=0 والصفحةُ تمتدّ إلى x=W.
        • الزاويةُ C تُسحب إلى M ⇒ خطُّ الطيّ هو العمودُ المنصِّف لـ CM.
        • الوجهُ = الصفحةُ مقصوصةً إلى جهة الكعب من الخطّ (clip-path).
        • الظهرُ = ما وراء الخطّ منعكساً عليه. وانعكاسان (حول الخطّ ثمّ حول
          الكعب) دورانٌ لا مرآة ⇒ نصُّ الظهر يُقرأ مستقيماً بمصفوفةٍ واحدة.
        • قيدان يمنعان «تمزيقَ» الورقة: |M − ركنِ الكعب القريب| ≤ W ·
          |M − ركنه البعيد| ≤ قطرُ الصفحة.
     🔁 والاتجاهان طبقةٌ واحدة: صفحةٌ يسارَ الكعب ⇒ الطبقةُ تُعكَس (scaleX(-1))
        ومحتوى كلّ صفحةٍ يُعكَس داخلها ⇒ المحصّلةُ مستقيمة، والحسابُ واحد.
     🌗 والظلال ثلاثة: ظلُّ الثنية على الظهر مع لمعةٍ خفيفة · ظلٌّ يُلقيه الطيُّ
        على الصفحة المنكشفة · وظلٌّ ناعم حول الظهر يُلقيه على الوجه.
     ⚠️ ولا 3D ولا perspective: ثنيةٌ مسطّحةٌ تبقى داخل الكتاب — فهي أهدأ على
        العين، ولذلك تبقى (أقصر) لمن طلب تقليل الحركة بدل أن تُستبدل بتلاشٍ
        **كان يُخفي التقليبَ كلَّه** عن كلّ جهازٍ أُطفئت فيه «تأثيراتُ الحركة». */
  const EL = (tag, cls) => { const e = document.createElement(tag); e.className = cls; return e; };
  const clamp01 = x => Math.max(0, Math.min(1, x));
  const cssPoly = (P, ox = 0, oy = 0) => P.length < 3 ? 'polygon(0 0,0 0,0 0)'
    : 'polygon(' + P.map(q => `${(q[0] + ox).toFixed(1)}px ${(q[1] + oy).toFixed(1)}px`).join(',') + ')';

  /* قصُّ مضلّعٍ بنصف مستوى: keep=+1 جهةُ n · keep=−1 خلافُها */
  function halfPlane(poly, X, n, keep){
    const f = q => keep * ((q[0] - X[0]) * n[0] + (q[1] - X[1]) * n[1]);
    const out = [];
    for(let i = 0; i < poly.length; i++){
      const a = poly[i], b = poly[(i + 1) % poly.length], fa = f(a), fb = f(b);
      if(fa >= 0) out.push(a);
      if((fa >= 0) !== (fb >= 0)){
        const t = fa / (fa - fb);
        out.push([a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t]);
      }
    }
    return out;
  }

  function begin(delta, corner = 'bottom'){
    const P = plan(delta);
    if(!P) return null;
    if(nar.on && !nar.auto) narPause();
    tick();
    closeWord();

    if(spread()){ fill('a', P.under[0], 'a'); fill('b', P.under[1], 'b'); }
    else fill('a', P.under[0], 'single');

    const host = P.slot === 'b' ? slots.b : slots.a;
    const s = spineOf(P.slot) === 'sp-l' ? 1 : -1;          // الصفحةُ يمينَ الكعب؟
    const W = host.offsetWidth, H = host.offsetHeight;
    const spineX = host.offsetLeft + (s > 0 ? 0 : W), top = host.offsetTop;
    const single = !spread();

    const layer = EL('div', 'bk-turn');
    /* 🆕 b185 · الطبقةُ في حيّز الطيّ لا في الكتاب مباشرة (العلّةُ عند `.bk-fold`) —
       والحيّزُ أوسعُ من الكتاب، فتُزاح بسعته ليبقى الكعبُ حيث كان. */
    layer.style.left = (spineX - foldBox.offsetLeft) + 'px';
    layer.style.top = (top - foldBox.offsetTop) + 'px';
    if(s < 0) layer.style.transform = 'scaleX(-1)';
    /* 🔴 وفي الصفحة الواحدة يُقصّ الطيُّ على حدود الصفحة — قِيس: جُرِّب أوّلاً
       أن يذوب الظهرُ حين يتجاوز الكعب، **فصار شفّافاً فوق نصّ الوجه فبدا
       النصّان معاً شبحاً.** والقصُّ أصدق: ما يعبر الكعبَ يغيب خلفه كما
       يغيب الورقُ المقلوب خلف حافّة الكتاب. */
    if(single) layer.style.clipPath = `polygon(0 -40px, ${W}px -40px, ${W}px ${H + 40}px, 0 ${H + 40}px)`;
    const sheet = page => {
      const d = EL('div', 'bk-sheet');
      d.style.width = W + 'px'; d.style.height = H + 'px';
      const w = EL('div', 'bk-flipx' + (s < 0 ? ' on' : ''));
      w.append(page); d.append(w);
      return d;
    };
    const shadeLayer = cls => {
      const o = EL('div', 'bk-sh ' + cls);
      o.style.left = -W + 'px'; o.style.top = -H / 2 + 'px';
      o.style.width = 2 * W + 'px'; o.style.height = 2 * H + 'px';
      o.append(EL('i', ''));
      return o;
    };
    const front = sheet(pageEl(P.front, P.slot));
    const back  = sheet(P.back < 0 ? blankBack(P.slot) : pageEl(P.back, P.backSlot));
    const cast  = shadeLayer('c');
    const sheen = shadeLayer('b');
    const flap  = EL('div', 'bk-flap');                       // يحمل ظلَّ الظهر على ما تحته
    flap.append(back, sheen);
    layer.append(front, cast, flap);
    foldBox.append(layer);
    book.classList.add('turning');

    const topC = corner === 'top';
    const C = [W, topC ? 0 : H];
    const A = [0, C[1]], B = [0, H - C[1]], DIAG = Math.hypot(W, H);
    const from = P.reverse ? [-W, C[1]] : C.slice();
    const to   = P.reverse ? C.slice() : [-W, C[1]];
    const lift = (topC ? -1 : 1) * H * 0.08;               // الزاويةُ ترتفع قليلاً في مسيرها
    let M = from.slice();

    const constrain = ([x, y]) => {
      let vx = x - A[0], vy = y - A[1], d = Math.hypot(vx, vy);
      if(d > W){ x = A[0] + vx * W / d; y = A[1] + vy * W / d; }
      vx = x - B[0]; vy = y - B[1]; d = Math.hypot(vx, vy);
      if(d > DIAG){ x = B[0] + vx * DIAG / d; y = B[1] + vy * DIAG / d; }
      return [x, y];
    };
    const prog = () => clamp01((M[0] - from[0]) / (to[0] - from[0]));
    const onPath = p => [from[0] + (to[0] - from[0]) * p,
                         from[1] + (to[1] - from[1]) * p - lift * Math.sin(Math.PI * p)];
    const strip = (o, X, ang, len, op) => {
      const i = o.firstChild;
      i.style.left = (X[0] + W) + 'px';
      i.style.top = (X[1] + H / 2 - DIAG) + 'px';
      i.style.width = Math.max(1, len).toFixed(1) + 'px';
      i.style.height = 2 * DIAG + 'px';
      i.style.transform = `rotate(${ang.toFixed(4)}rad)`;
      o.style.opacity = op;
    };

    function draw(){
      const dx = M[0] - C[0], dy = M[1] - C[1], len = Math.hypot(dx, dy);
      if(len < 0.5){
        front.style.clipPath = 'none';
        flap.style.visibility = 'hidden';
        cast.style.opacity = 0;
        return;
      }
      flap.style.visibility = '';
      const n = [dx / len, dy / len], X = [(C[0] + M[0]) / 2, (C[1] + M[1]) / 2];
      const rect = [[0, 0], [W, 0], [W, H], [0, H]];
      const keep = halfPlane(rect, X, n, 1), gone = halfPlane(rect, X, n, -1);
      const xn = X[0] * n[0] + X[1] * n[1];
      const fold = gone.map(([x, y]) => { const k = 2 * (x * n[0] + y * n[1] - xn); return [x - k * n[0], y - k * n[1]]; });

      front.style.clipPath = cssPoly(keep);
      /* الظهر: q ⇒ انعكاسُ (W − qx، qy) حول خطّ الطيّ. والجزءُ الخطّيّ
         R·diag(−1,1) دورانٌ (محدِّدُه +١) فلا يُقرأ النصُّ مقلوباً. */
      const r00 = 1 - 2 * n[0] * n[0], r01 = -2 * n[0] * n[1], r11 = 1 - 2 * n[1] * n[1];
      back.style.transform = `matrix(${(-r00).toFixed(5)},${(-r01).toFixed(5)},${r01.toFixed(5)},${r11.toFixed(5)},`
        + `${(r00 * W + 2 * xn * n[0]).toFixed(2)},${(r01 * W + 2 * xn * n[1]).toFixed(2)})`;
      back.style.clipPath = cssPoly(gone.map(([x, y]) => [W - x, y]));

      const p = prog(), k = Math.sin(Math.PI * p);
      const ang = Math.atan2(n[1], n[0]);
      const depth = fold.reduce((m, q) => Math.max(m, (q[0] - X[0]) * n[0] + (q[1] - X[1]) * n[1]), 1);
      cast.style.clipPath = cssPoly(gone, W, H / 2);
      sheen.style.clipPath = cssPoly(fold, W, H / 2);
      strip(cast, X, ang + Math.PI, W * (0.08 + 0.22 * k), (0.25 + 0.75 * k).toFixed(3));
      strip(sheen, X, ang, depth, Math.min(1, 0.35 + 2.5 * k).toFixed(3));
    }

    const toNorm = (cx, cy) => {
      const r = book.getBoundingClientRect();
      return [s * (cx - r.left - spineX), cy - r.top - top];
    };

    const animTo = (target, ms, ease) => new Promise(done => {
      const m0 = M.slice(), t0 = performance.now();
      const reach = Math.abs(target[0] - m0[0]) / (2 * W);   // القوسُ بقدر المسافة الباقية
      const step = now => {
        const k = ms > 0 ? Math.min(1, (now - t0) / ms) : 1, e = ease(k);
        M = constrain([m0[0] + (target[0] - m0[0]) * e,
                       m0[1] + (target[1] - m0[1]) * e - lift * reach * Math.sin(Math.PI * e)]);
        draw();
        if(k < 1) requestAnimationFrame(step); else done();
      };
      requestAnimationFrame(step);
    });

    let closed = false;
    const close = commit => {
      if(closed) return; closed = true;
      layer.remove();
      book.classList.remove('turning');
      if(commit) view = P.nv;
      turning = null;
      render();
      if(pending){ const d = pending; pending = 0; go(d, reduce.matches ? 300 : 560); }
    };

    draw();
    return {
      P,
      get p(){ return prog(); },
      get M(){ return M.slice(); },
      toNorm,
      setM(m){ M = constrain(m); draw(); },
      along(p){ M = constrain(onPath(clamp01(p))); draw(); },
      /* زاويةٌ ترتفع قليلاً تحت الفأرة: دعوةٌ إلى السحب لا تقليب */
      peek(){
        const target = P.reverse ? onPath(0.08)
          : [W - Math.min(56, W * 0.12), C[1] + (topC ? 1 : -1) * Math.min(42, H * 0.06)];
        return animTo(target, 240, easeOut);
      },
      async play(ms){
        const t0 = performance.now();
        await new Promise(done => {
          const step = now => {
            const k = Math.min(1, (now - t0) / ms);
            M = constrain(onPath(easeInOut(k))); draw();
            if(k < 1) requestAnimationFrame(step); else done();
          };
          requestAnimationFrame(step);
        });
        close(true);
      },
      async finish(commit, ms){
        await animTo(commit ? to : from, ms, ms > 420 ? easeInOut : easeOut);
        close(commit);
      }
    };
  }

  const blankBack = slot => {
    const el = document.createElement('article');
    el.className = `bk-page bk-blank ${spineOf(slot) === 'sp-l' ? 'sp-r' : 'sp-l'}`;
    return el;
  };
  const easeInOut = k => k < .5 ? 4 * k * k * k : 1 - Math.pow(-2 * k + 2, 3) / 2;
  const easeOut   = k => 1 - Math.pow(1 - k, 3);

  function go(delta, ms){
    if(turning){ pending = delta; return; }
    if(!plan(delta)) return;
    turning = begin(delta, 'bottom');
    turning.play(ms || (reduce.matches ? 380 : 820));
  }

  function jump(v){
    if(turning) return;
    if(nar.on && !nar.auto) narPause();
    view = Math.max(0, Math.min(viewCount() - 1, v));
    render();
  }

  /* ═══════════ استمع وتابع (b155) ═══════════
     🎯 القراءةُ مع السماع تُقوّي الطلاقةَ والنطقَ وحفظَ المفردات في اللغة الثانية —
        **بشروطٍ ثلاثة بُنيت هنا:** لا يبدأ الصوتُ وحده (القراءةُ الأولى صامتة،
        والاختبارُ يقيس القراءة) · الجملةُ المقروءة تُظلَّل فتبقى العينُ على النصّ ·
        والسرعةُ بيد الطالب.
     🔑 جملةً جملة (علّتُها عند `narrate` في media.js)، والصفحةُ تُقلَب حين تبلغ
        القراءةُ ما بعدها. والتقليبُ باليد أو نقرُ كلمة **يوقف مؤقّتاً** ولا يُلغي:
        يبقى الظلُّ على الجملة التي وقف عندها، والاستئنافُ منها إن كانت ظاهرة،
        ومن أوّل الصفحة الظاهرة إن لم تكن.
     🎨 والظلُّ محايدٌ من حبر الورق: موضعُ القراءة حالٌ لا حكم ولا «اضغط هنا». */
  const RATES = [1, 0.8, 1.2];
  const nar = { on: false, started: false, auto: false, i: -1, hl: null, tok: 0, timer: 0, r: 0 };

  const sentPage = id => {
    if(sents[id]?.cover) return 0;
    for(let p = 0; p < pages.length; p++){
      const g = pages[p];
      if(g.kind === 'text' && id >= g.s0 && id <= g.s1) return p;
    }
    return -1;
  };
  const viewOfPage = p => spread() ? Math.floor(p / 2) : p;
  const firstInView = () => {
    for(const p of viewPages(view)){
      const g = pages[p];
      if(g?.kind === 'cover' && sents[0]?.cover) return 0;
      if(g?.kind === 'text' && g.s0 >= 0) return g.s0;
    }
    return -1;
  };

  function paintHL(){
    root.querySelectorAll('.bk-slot .bk-s.on, .bk-slot .bk-cv-t.on').forEach(x => x.classList.remove('on'));
    if(nar.hl == null) return;
    if(sents[nar.hl]?.cover){ root.querySelector('.bk-slot .bk-cv-t')?.classList.add('on'); return; }
    root.querySelectorAll(`.bk-slot .bk-s[data-s="${nar.hl}"]`).forEach(x => x.classList.add('on'));
  }

  function narUI(){
    const b = btn('listen');
    if(!b) return;
    const label = nar.on ? say.pause : say.listen;
    b.setAttribute('aria-pressed', String(nar.on));
    b.setAttribute('aria-label', label);
    b.innerHTML = (nar.on ? ICO.pause : ICO.listen) + `<span class="bk-lbl">${esc(label)}</span>`;
    const r = btn('rate');
    r.hidden = !nar.started;
    r.textContent = uiNum(String(RATES[nar.r])).replace('.', '\u066B') + '\u00D7';
  }

  async function narTurnTo(v){
    nar.auto = true;
    try{
      while(turning) await new Promise(r => setTimeout(r, 60));
      if(v === view + 1){
        turning = begin(1, 'bottom');
        if(turning) await turning.play(reduce.matches ? 380 : 760);
      } else { view = v; render(); }
    } finally { nar.auto = false; }
  }

  async function speakAt(i){
    if(!nar.on) return;
    if(i >= sents.length){                      // تمّ النصّ ⇒ إلى صفحة الختام
      narStop();
      const v = viewOfPage(pages.length - 1);
      if(v !== view) narTurnTo(v);
      return;
    }
    const p = sentPage(i);
    if(p < 0) return speakAt(i + 1);
    const v = viewOfPage(p);
    if(v !== view){ await narTurnTo(v); if(!nar.on) return; }
    nar.i = nar.hl = i;
    paintHL();
    const my = ++nar.tok;
    const next = () => { if(my !== nar.tok || !nar.on) return; clearTimeout(nar.timer); speakAt(i + 1); };
    const text = sents[i].text;
    /* صمّامٌ إن لم يصل `onend` — وهو يتأخّر أو يغيب على بعض الأجهزة */
    clearTimeout(nar.timer);
    nar.timer = setTimeout(next, 4000 + text.length * 110 / RATES[nar.r]);
    const ok = voice.speak(text, { rate: RATES[nar.r], onend: next,
      onerror: e => { if(e === 'interrupted' || e === 'canceled') return; next(); } });
    if(!ok){ narStop(); opt.onVoiceFail?.(); }
  }

  function narStart(){
    if(!voice) return;
    closeWord(false);
    let i = nar.i;
    if(!(i >= 0 && viewPages(view).includes(sentPage(i)))) i = firstInView();
    if(i < 0) i = 0;                             // صفحةُ الختام ⇒ من البداية
    nar.on = nar.started = true;
    const nm = voice.name?.();
    if(nm) btn('listen').title = nm;            // يعرف المعلّمُ بأيّ صوتٍ يُقرأ
    narUI();
    speakAt(i);
  }
  function narPause(){
    if(!nar.on) return;
    nar.on = false; nar.tok++; clearTimeout(nar.timer);
    voice?.stop();
    narUI();
  }
  function narStop(){
    nar.on = false; nar.tok++; clearTimeout(nar.timer);
    voice?.stop();
    nar.hl = null; nar.i = -1;
    paintHL(); narUI();
  }

  /* ═══════════ الإدخال ═══════════ */

  /* الفأرةُ تُظلِّل النصّ — فلا تُقلِّب إلا من الحافّتين، وترفع الزاويةَ حين
     تقترب منها. واللمسُ يُقلِّب من أيّ موضع: الإصبعُ لا يُظلِّل بالسحب الأفقيّ.
     🔑 والزاويةُ تتبع **إزاحةَ** الإصبع لا موضعَه: سحبٌ يبدأ من وسط الصفحة
        لا يقفز بالطيّ إلى منتصفها، بل يبدأ من الزاوية ويمشي معه. */
  let drag = null, peek = null;
  const fwdOf = dx => (dir === 'ltr' ? dx < 0 : dx > 0) ? 1 : -1;
  const hotDelta = h => h.classList.contains('next') ? 1 : -1;
  const cornerAt = cy => {
    const r = slots.a.getBoundingClientRect();
    return cy < r.top + r.height / 2 ? 'top' : 'bottom';
  };

  root.querySelectorAll('.bk-hot').forEach(h => {
    h.addEventListener('pointerenter', e => {
      if(e.pointerType !== 'mouse' || turning || drag) return;
      const T = begin(hotDelta(h), cornerAt(e.clientY));
      if(!T) return;
      turning = T; peek = { T, hot: h };
      T.peek();
    });
    h.addEventListener('pointerleave', () => {
      if(!peek || peek.hot !== h || drag) return;
      const T = peek.T; peek = null;
      T.finish(false, 220);
    });
  });

  book.addEventListener('pointerdown', e => {
    if(e.button !== 0) return;
    const hot = e.target.closest('.bk-hot');
    const start = { x0: e.clientX, y0: e.clientY, id: e.pointerId, hot,
                    hist: [[performance.now(), e.clientX]] };
    if(peek && hot === peek.hot){                     // يمسك الزاويةَ المرفوعة
      const T = peek.T; peek = null;
      drag = { ...start, T, delta: hotDelta(hot), fromPeek: true, M0: T.M, N0: T.toNorm(e.clientX, e.clientY) };
      book.setPointerCapture?.(e.pointerId);
      return;
    }
    if(turning) return;
    if(e.pointerType === 'mouse' && !hot) return;
    if(!hot && e.target.closest('button, a, input, [data-act]')) return;
    drag = { ...start, T: null };
  });

  book.addEventListener('pointermove', e => {
    if(!drag || e.pointerId !== drag.id) return;
    const dx = e.clientX - drag.x0, dy = e.clientY - drag.y0;
    drag.hist.push([performance.now(), e.clientX]);
    if(drag.hist.length > 6) drag.hist.shift();
    if(!drag.T){
      if(Math.abs(dx) < 10 || Math.abs(dx) < Math.abs(dy) * 1.2) return;
      drag.delta = fwdOf(dx);
      drag.T = begin(drag.delta, cornerAt(drag.y0));
      if(!drag.T){ drag = null; return; }
      turning = drag.T;
      drag.M0 = drag.T.M;
      drag.N0 = drag.T.toNorm(drag.x0, drag.y0);
      book.setPointerCapture?.(e.pointerId);
    }
    const T = drag.T;
    if(T.P.reverse){                                  // الصفحةُ السابقة تعود من خلف الكعب
      const along = drag.delta === fwdOf(dx) ? Math.abs(dx) : 0;
      T.along(along / slots.a.offsetWidth);
    } else {
      const N = T.toNorm(e.clientX, e.clientY);
      T.setM([drag.M0[0] + N[0] - drag.N0[0], drag.M0[1] + N[1] - drag.N0[1]]);
    }
  });

  const release = e => {
    if(!drag || e.pointerId !== drag.id) return;
    const d = drag; drag = null;
    const moved = Math.abs(e.clientX - d.x0) + Math.abs(e.clientY - d.y0);
    if(!d.T){
      if(d.hot && moved < 10) go(hotDelta(d.hot));
      return;
    }
    let commit;
    if(d.fromPeek && moved < 10) commit = e.type !== 'pointercancel';   // نقرةٌ على الزاوية المرفوعة
    else {
      const [t0, x0] = d.hist[0], [t1, x1] = d.hist[d.hist.length - 1];
      const v = (x1 - x0) / Math.max(1, t1 - t0);                       // بكسل/مللي
      const flick = Math.abs(v) > 0.45 && fwdOf(x1 - x0) === d.delta;
      commit = e.type !== 'pointercancel' && (d.T.p > 0.3 || flick);
    }
    quietUntil = performance.now() + 350;      // نقرةُ ذيل السحب ليست نقرةً على كلمة
    const left = commit ? 1 - d.T.p : d.T.p;
    d.T.finish(commit, Math.max(200, left * 680));
  };
  let quietUntil = 0;
  book.addEventListener('pointerup', release);
  book.addEventListener('pointercancel', release);

  /* صورةٌ انكسرت بعد التقسيم (رابطٌ حُذف أو شبكةٌ انقطعت) ⇒ يغيب إطارُها ويبقى
     تعليقُها — لا مربّعَ فارغاً في ورقة. و`error` لا يصعد، فيُلتقط في النزول. */
  root.addEventListener('error', e => {
    const f = e.target?.tagName === 'IMG' && e.target.closest('.bk-fig');
    /* وصورةُ مقطعٍ تعذّرت لا تُسقط بطاقتَه: يبقى زرُّ التشغيل على لون الورق */
    if(f) f.classList.add(f.classList.contains('bk-vid') ? 'bk-noposter' : 'bk-broken');
  }, true);

  root.addEventListener('click', e => {
    const b = e.target.closest('[data-k]');
    if(b && !b.disabled){
      const k = b.dataset.k;
      if(k === 'next') go(1);
      else if(k === 'prev') go(-1);
      else if(k === 'smaller' || k === 'larger'){
        fsStep = Math.max(0, Math.min(FS_STEPS[dir].length - 1, fsStep + (k === 'larger' ? 1 : -1)));
        const all = store.get(FS_KEY) || {};
        store.set(FS_KEY, { ...all, [dir]: fsStep });
        repaginate(true);
      }
      else if(k === 'full'){
        document.fullscreenElement ? document.exitFullscreen?.() : root.requestFullscreen?.();
      }
      else if(k === 'listen') nar.on ? narPause() : narStart();
      else if(k === 'rate'){
        nar.r = (nar.r + 1) % RATES.length;
        narUI();
        if(nar.on){ const i = nar.i; narPause(); nar.i = i; narStart(); }   // السرعةُ تسري من الجملة نفسها
      }
      return;
    }
    if(e.target.closest('.bk-zoom')){ if(!e.target.closest('.bk-player')) closeZoom(); return; }
    if(e.target.closest('.bk-turn, .bk-pop')) return;
    const a = e.target.closest('[data-act]');
    if(a){ opt.onAction?.(a.dataset.act, ctl); return; }

    const fb = e.target.closest('.bk-slot .bk-fbox');
    if(fb){ if(performance.now() > quietUntil) openMedia(fb); return; }   // ذيلُ السحب ليس نقرة

    const w = e.target.closest('.bk-w');
    if(w){ toggleWordEl(w); return; }
    if(tapAny && performance.now() > quietUntil && e.target.closest('.bk-slot .bk-body')) tapWord(e);
  });

  /* ═══════════ نافذةُ الكلمة ═══════════
     مرساتُها الكلمةُ نفسُها: تحتها إن اتّسع، وفوقها إن ضاق، ولا تخرج عن
     الشاشة. وتُغلَق بالنقر خارجها وبـEscape وبالتقليب والتمرير.
     ♿ الكلمةُ زرٌّ بلوحة المفاتيح (Enter · Space)، والنافذةُ `dialog`
        تُعلن كلمتَها، ويعود التركيزُ إلى الكلمة حين تُغلَق. */
  let pop = null;

  function place(el, r){
    const vw = window.innerWidth, vh = window.innerHeight, m = 12;
    const w = Math.min(el.classList.contains('mini') ? 250 : 340, vw - 2 * m);
    el.style.width = w + 'px';
    const h = el.offsetHeight;
    const left = Math.max(m, Math.min(vw - w - m, r.left + r.width / 2 - w / 2));
    let top = r.bottom + 12, above = false;
    if(top + h > vh - m){ top = r.top - 12 - h; above = true; }
    if(top < m) top = Math.max(m, vh - h - m);
    el.style.left = left + 'px';
    el.style.top = top + 'px';
    el.classList.toggle('above', above);
    el.style.setProperty('--ax', Math.round(Math.max(18, Math.min(w - 18, r.left + r.width / 2 - left))) + 'px');
  }

  function openWord(entry, word, rect, anchor){
    if(nar.on) narPause();
    closeWord(false);
    const el = document.createElement('div');
    el.className = 'bk-pop' + (entry ? '' : ' mini');     // كلمةٌ بلا معنى: نافذةٌ صغيرة لنطقها
    el.dir = 'rtl';
    el.tabIndex = -1;
    el.setAttribute('role', 'dialog');
    el.setAttribute('aria-label', word);
    el.innerHTML = opt.wordHtml ? opt.wordHtml(entry, word)
      : `<div class="bk-pw"><span class="bk-pw-t" dir="auto">${esc(word)}</span></div>`;
    root.append(el);
    anchor?.classList.add('on');
    const where = () => anchor?.isConnected
      ? (anchor.getClientRects()[0] || anchor.getBoundingClientRect()) : rect;
    pop = { el, anchor };
    const reflow = () => { if(pop?.el === el) place(el, where()); };
    reflow();
    requestAnimationFrame(() => el.classList.add('in'));
    opt.onWord?.({ entry, word, el, reflow, close: () => closeWord() });
  }

  function closeWord(refocus = true){
    if(!pop) return;
    const { el, anchor } = pop;
    pop = null;
    anchor?.classList.remove('on');
    el.remove();
    try{ CSS.highlights?.delete('bk-tap'); }catch(e){}
    if(refocus && anchor?.isConnected && root.contains(document.activeElement || null)) anchor.focus({ preventScroll: true });
  }

  function toggleWordEl(w){
    if(pop?.anchor === w){ closeWord(); return; }
    const entry = glossary[Number(w.dataset.w)] || null;
    openWord(entry, w.textContent.replace(/\s+/g, ' ').trim(),
             w.getClientRects()[0] || w.getBoundingClientRect(), w);
  }

  /* أيُّ كلمةٍ تحت الإصبع؟ — من موضع المؤشّر في النصّ لا من وسمٍ حولها،
     فلا يُلفّ النصُّ كلُّه بأوسمةٍ لأجل نقرةٍ قد لا تقع. */
  const W_CH = /[\p{L}\p{M}'’-]/u;
  function wordAt(x, y){
    let node, off;
    if(document.caretPositionFromPoint){
      const p = document.caretPositionFromPoint(x, y);
      if(!p) return null; node = p.offsetNode; off = p.offset;
    } else if(document.caretRangeFromPoint){
      const r = document.caretRangeFromPoint(x, y);
      if(!r) return null; node = r.startContainer; off = r.startOffset;
    } else return null;
    if(!node || node.nodeType !== 3) return null;
    const s = node.data;
    let a = off, b = off;
    while(a > 0 && W_CH.test(s[a - 1])) a--;
    while(b < s.length && W_CH.test(s[b])) b++;
    while(a < b && /['’-]/.test(s[a])) a++;
    while(b > a && /['’-]/.test(s[b - 1])) b--;
    if(b - a < 2) return null;
    const range = document.createRange();
    range.setStart(node, a); range.setEnd(node, b);
    const rect = range.getBoundingClientRect();
    /* المؤشّرُ آخرَ السطر يقفز إلى أقرب كلمة — فالنقرةُ يجب أن تقع عليها */
    if(x < rect.left - 3 || x > rect.right + 3 || y < rect.top - 3 || y > rect.bottom + 3) return null;
    return { word: s.slice(a, b), range, rect };
  }

  function tapWord(e){
    if(String(window.getSelection?.() || '').trim()) return;     // يُظلِّل ليقتبس، لا لينطق
    const hit = wordAt(e.clientX, e.clientY);
    if(!hit){ closeWord(); return; }
    openWord(null, hit.word, hit.rect, null);
    try{ if(window.Highlight) CSS.highlights.set('bk-tap', new Highlight(hit.range)); }catch(err){}
  }

  /* ═══════════ تكبيرُ الصورة (b165) ═══════════
     فوق الكتاب لا مكانه: يُغلَق بلمسةٍ في أيّ موضع أو بـEscape، ويعود التركيزُ إلى
     الصورة. ويوقف «استماع» مؤقّتاً — العينُ انتقلت، فالصوتُ يتبعها لا يسبقها.
     ♿ `dialog` بزرّ إغلاقٍ يأخذ التركيز، وTab لا يغادره. */
  let zoom = null;
  let micOn = false;             // 🆕 b170 · التسجيلُ جارٍ (voiceLock) ⇒ لا مقطعَ يُشغَّل
  function overlay(inner, label, back, vid){
    closeWord(false);
    if(nar.on) narPause();
    const el = EL('div', 'bk-zoom' + (vid ? ' bk-zv' : ''));
    el.setAttribute('role', 'dialog');
    el.setAttribute('aria-modal', 'true');
    el.setAttribute('aria-label', label);
    el.innerHTML = inner
      + `<button type="button" class="bk-zx" aria-label="${esc(say.close)}">${ICO.close}</button>`;
    root.append(el);
    zoom = { el, back, vid };
    el.querySelector('.bk-zx').focus();
  }
  const capOf = box => {
    const c = box.closest('.bk-fig')?.querySelector('.bk-cap');
    return c ? `<figcaption dir="auto">${c.innerHTML}</figcaption>` : '';
  };
  function openZoom(box){
    const img = box.querySelector('img');
    if(!img) return;
    overlay(`<figure dir="${dir}"><img src="${esc(img.currentSrc || img.src)}" alt="${esc(img.alt)}">`
      + `${capOf(box)}</figure>`, img.alt || say.zoom, box, false);
  }
  /* 🆕 b170 · المقطعُ فوق الكتاب: يُبنى الإطارُ عند الفتح ويُهدَم عند الإغلاق — فيقف الصوتُ
     بالإغلاق لا بزرٍّ يُنسى، ولا يُحمَّل مشغّلٌ لم يُطلب. والنقرُ داخل المشغّل له لا للنافذة.
     🔑 **ولا مقطعَ أثناء التسجيل الجهريّ:** صوتُه يدخل في قراءة الطالب فيُفسدها. */
  function openVideo(box){
    const blk = model.blocks[+box.dataset.v];
    if(!blk?.v) return;
    if(micOn){ opt.onNotice?.(say.vidLocked); return; }
    const t = plainText(blk.cap) || say.video;
    overlay(`<figure dir="${dir}"><div class="bk-player"><iframe src="${esc(blk.v.embed)}" title="${esc(t)}"`
      + ` allow="autoplay; encrypted-media; picture-in-picture; fullscreen"`
      + ` referrerpolicy="strict-origin-when-cross-origin"></iframe></div>${capOf(box)}</figure>`, t, box, true);
  }
  const openMedia = box => box.closest('.bk-vid') ? openVideo(box) : openZoom(box);
  function closeZoom(refocus = true){
    if(!zoom) return;
    const z = zoom; zoom = null;
    z.el.remove();
    if(refocus && z.back.isConnected) z.back.focus();
  }

  const onDocDown = e => {
    if(!pop) return;
    if(pop.el.contains(e.target) || e.target.closest?.('.bk-w')) return;
    closeWord(false);
  };
  const onScroll = () => { if(pop) closeWord(false); };
  document.addEventListener('pointerdown', onDocDown, true);
  window.addEventListener('scroll', onScroll, { passive: true });

  const onKey = e => {
    if(!root.isConnected){ destroy(); return; }
    if(e.defaultPrevented || e.altKey || e.ctrlKey || e.metaKey) return;
    const t = e.target;
    if(t && (/^(INPUT|TEXTAREA|SELECT)$/.test(t.tagName) || t.isContentEditable)) return;
    if(zoom){                                    // الصورةُ المكبَّرة تملك المفاتيح
      if(e.key === 'Escape') closeZoom();
      else if(e.key === 'Tab'){
        const x = zoom.el.querySelector('.bk-zx'), f = zoom.el.querySelector('iframe');
        (f && document.activeElement === x ? f : x).focus();
      }
      else return;
      e.preventDefault(); return;
    }
    if(e.key === 'Escape' && pop){ closeWord(); e.preventDefault(); return; }
    const fk = t?.closest?.('.bk-slot .bk-fbox');
    if(fk && (e.key === 'Enter' || e.key === ' ')){ openMedia(fk); e.preventDefault(); return; }
    const wk = t?.closest?.('.bk-w');
    if(wk && (e.key === 'Enter' || e.key === ' ')){ toggleWordEl(wk); e.preventDefault(); return; }
    if(t?.closest?.('.bk-pop')) return;          // داخل النافذة: الأسهمُ لها لا للكتاب
    const fwd  = dir === 'rtl' ? 'ArrowLeft' : 'ArrowRight';
    const back = dir === 'rtl' ? 'ArrowRight' : 'ArrowLeft';
    let hit = true;
    if(e.key === fwd || e.key === 'PageDown') go(1);
    else if(e.key === back || e.key === 'PageUp') go(-1);
    else if(e.key === 'Home') jump(0);
    else if(e.key === 'End') jump(viewCount() - 1);
    else hit = false;
    if(hit) e.preventDefault();
  };
  document.addEventListener('keydown', onKey);

  let rT = 0;
  const onResize = () => {
    if(!root.isConnected){ destroy(); return; }
    closeWord(false);
    clearTimeout(rT);
    rT = setTimeout(() => { if(!turning) repaginate(false); }, 140);
  };
  const ro = new ResizeObserver(onResize);
  ro.observe(stage);
  window.addEventListener('resize', onResize);
  document.addEventListener('fullscreenchange', onResize);
  const onVis = () => { if(!root.isConnected) return destroy(); tick(); };
  document.addEventListener('visibilitychange', onVis);
  /* وخطٌّ وصل بعد السقف الزمنيّ ⇒ يُعاد التقسيمُ بمقاسه الصحيح */
  const onFonts = () => {
    if(!root.isConnected) return destroy();
    clearTimeout(rT);
    rT = setTimeout(() => { if(!turning) repaginate(true); }, 120);
  };
  document.fonts?.addEventListener?.('loadingdone', onFonts);
  /* والسِمةُ لا تحتاج مستمعاً: ألوانُ الورق متغيّراتٌ تتبع `data-theme`. */

  /* الشاشةُ تُستبدل بـ`app.innerHTML` في المنصّة بلا نداء إغلاق ⇒ يراقب
     الكتابُ حضورَه بنفسه، فلا يبقى مستمعٌ يتيمٌ على المستند. */
  const mo = new MutationObserver(() => { if(!root.isConnected) destroy(); });
  if(host.parentNode) mo.observe(host.parentNode, { childList: true, subtree: true });

  let dead = false;
  function destroy(){
    if(dead) return; dead = true;
    tick();
    document.removeEventListener('keydown', onKey);
    window.removeEventListener('resize', onResize);
    document.removeEventListener('fullscreenchange', onResize);
    document.removeEventListener('visibilitychange', onVis);
    document.fonts?.removeEventListener?.('loadingdone', onFonts);
    document.removeEventListener('pointerdown', onDocDown, true);
    window.removeEventListener('scroll', onScroll);
    clearInterval(endTimer);
    closeWord(false);
    closeZoom(false);
    narStop();
    ro.disconnect(); mo.disconnect();
  }

  const ctl = {
    next: () => go(1), prev: () => go(-1), jump,
    restart: () => { endFired = false; jump(0); },
    destroy,
    /* 🆕 b164 · موضعٌ في الشريط يملؤه الجسر (القراءة الجهرية) — والمحرّكُ لا
       يعرف ما فيه. و`data-k="x"` يجعل نقرَه لا يقع في معالج الشريط أدناه.
       و`voiceLock`: من يسجّل صوتَه لا يُسمَع معه صوتُ الكتاب — يُوقَف ويُعطَّل. */
    get slot(){ return root.querySelector('.bk-x'); },
    voiceLock(on){
      const b = btn('listen');
      if(on && nar.on) narPause();
      if(b) b.disabled = !!on;
      micOn = !!on;                                    // 🆕 b170 · والمقاطعُ معه
      root.classList.toggle('bk-mic', micOn);
      if(micOn && zoom?.vid) closeZoom(false);
    },
    get dir(){ return dir; }, get pages(){ return textCount(); },
    get words(){ return model.words; }
  };

  /* ── البدء: من الغلاف، أو من حيث توقّف ── */
  dims = layout();
  pages = paginate();
  const saved = opt.storeKey ? store.get(opt.storeKey) : null;
  if(saved?.a){
    view = viewOfAnchor(saved.a);
    if(view > 0) opt.onResume?.();
  }
  render();
  return ctl;
}

/* ── الأيقونات: خطّيّةٌ بـcurrentColor تتبع السِمة، والسهمان يُقلَبان
      مع اتجاه الكتاب في CSS — «التالي» يشير حيث تُطوى الصفحة. ── */
const svg = d => `<svg viewBox="0 0 24 24" width="22" height="22" fill="none"
  stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
  aria-hidden="true">${d}</svg>`;
const ICO = {
  next:   `<span class="bk-dir">${svg('<path d="M9 5l7 7-7 7"/>')}</span>`,
  prev:   `<span class="bk-dir">${svg('<path d="M15 5l-7 7 7 7"/>')}</span>`,
  aMinus: svg('<path d="M4 18l5-12 5 12M5.8 14h6.4"/><path d="M16 12h5"/>'),
  aPlus:  svg('<path d="M4 18l5-12 5 12M5.8 14h6.4"/><path d="M16 12h5M18.5 9.5v5"/>'),
  full:   svg('<path d="M4 9V4h5M20 9V4h-5M4 15v5h5M20 15v5h-5"/>'),
  listen: svg('<path d="M4 15v-3a8 8 0 0116 0v3"/><rect x="3" y="14" width="4.5" height="6.5" rx="1.6"/><rect x="16.5" y="14" width="4.5" height="6.5" rx="1.6"/>'),
  pause:  svg('<rect x="6.5" y="5" width="4" height="14" rx="1.2"/><rect x="13.5" y="5" width="4" height="14" rx="1.2"/>'),
  close:  svg('<path d="M6 6l12 12M18 6L6 18"/>'),
  play:   '<svg viewBox="0 0 24 24" width="26" height="26" aria-hidden="true"><path d="M8.5 5.8v12.4L18.6 12z" fill="currentColor"/></svg>',
};
