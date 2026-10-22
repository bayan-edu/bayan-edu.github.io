/* ══════════════════════════════════════════════════════════
   بيان — tools/build.mjs
   يبني في dist/ ما ينشره Cloudflare على bayanclass.com.
   ولا يكتب حرفاً خارج dist/: المصدرُ يبقى كما هو بتعليقاته.

   لماذا يوجد — اثنان قِيسا في ٢١ أكتوبر ٢٠٢٦:
   ① التعليقاتُ والفراغات أكثرُ من نصف ما يُنزّله الطالب عند الإقلاع
      (brotli ‏340KB ⇒ 160KB). وهي ذاكرةُ المشروع، لا يحتاجها الطالب.
      ⇒ تُحذف من المنشور وحده. 🔴 **ولا تُحذف من المصدر أبداً** —
         فيها سببُ كلّ قرار، وما منع عطلاً قديماً أن يعود.
   ② النطاقُ كان يقدّم المستودعَ كلَّه: `bayanclass.com/AGENTS.md` يُقرأ،
      ومعه STATE.md و00_schema.sql وsql/.
      ⇒ قائمةُ سماح لا قائمةُ منع: ما لم يُذكر في PUBLISH لا يُنشر.

   🔑 **ولا يغيّر سلوكاً — ويُبرهن على ذلك في كلّ بناء:**
      ① كلُّ ملفّ js/css: التصغيرُ الكامل للمصدر = التصغيرُ الكامل
         للمنشور، حرفاً بحرف. فإن اختلفا فقد تغيّر غيرُ التعليق.
      ② كلُّ مسارٍ محلّيّ في المنشور له ملفٌّ في dist/ — إن كان له
         ملفٌّ في المستودع. (والغائبُ عنهما معاً عطلٌ قديم يُنبَّه إليه.)
      ③ 🆕 b167 · وكلُّ مسارٍ يُحلّ على **عنوان الصفحة** مطلقٌ يبدأ بـ«/»:
         ما في index.html وما تكتبه الشيفرةُ نصّاً (img/ · vendor/ …).
         فـindex.html تُقدَّم على كلّ عنوان (/subjects/7/lessons/42)، والنسبيُّ
         يُطلب حينئذٍ من /subjects/7/lessons/… فيُجاب بالمنصّة لا بالملفّ.
         ⚠️ **ولا يرى ما بُني بـ`${…}`** (`img/kind/${k}.webp`) **ولا مجلّداً بلا
            لاحقة** (`vendor/arabic-mathjax`) — ثلاثةٌ أُصلحت باليد في b167، وقِيس
            أنّه يرى الأحدَ عشرَ الباقية على شيفرة b166. فما لا يراه يُكتب مطلقاً ابتداءً.
      وأيُّ فشلٍ يُنهي البناءَ برمزٍ غير الصفر ⇐ Cloudflare لا ينشر،
      **ويبقى الموقعُ الحيّ على ما كان.**

   ⚠️ `charset: 'utf8'` شرط: بدونه يُهرِّب esbuild العربيةَ `\uXXXX`
      فيكبر الملفّ بعد التنقية (قِيس: editor_import.js ‏17 ⇒ 19KB).
   📌 ولكلّ ملفّ js/css خريطةُ مصدر (`.map`) تحمل الأصلَ بتعليقاته:
      أدواتُ المطوّر تُريه إيّاه، والمتصفّحُ لا يطلبها إلّا وهي مفتوحة.
   📌 vendor/ يُنسخ كما هو: شيفرةُ غيرنا، وتراخيصُها في تعليقاتها.
      وsims/ كذلك: صفحاتٌ مستقلّة تُفتح بروابط من القاعدة (items.url).
   ══════════════════════════════════════════════════════════ */

import { readdir, readFile, writeFile, mkdir, rm, copyFile, stat } from 'node:fs/promises';
import { join, dirname, extname, relative, basename, sep, posix } from 'node:path';
import { fileURLToPath } from 'node:url';
import { transform } from 'esbuild';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const OUT  = join(ROOT, 'dist');

/* ── ما يُنشر ─────────────────────────────────────────────────
   أُحصي في ٢١ أكتوبر من ثلاثة مصادر: ما تطلبه الصفحاتُ والشيفرة ·
   ما تشير إليه القاعدة (items.url ⇒ sims/ وحدها) · وحزمةُ العلامة
   لمن يحتاجها خارج المنصّة (brand/README.md).
   ⚠️ ملفٌّ جديدٌ في جذر المستودع يطلبه الموقع؟ يُضاف هنا — وإلّا صاح
      الفحصُ ② أدناه وتوقّف البناء. وذاك مقصود: الصمتُ هنا رابطٌ مكسور. */
const PUBLISH = [
  'index.html', 'privacy.html', '404.html', 'robots.txt', 'sitemap.xml',
  'favicon.ico', 'favicon.svg', 'apple-touch-icon.png', 'icon-192.png',
  'js', 'css', 'img', 'sims', 'vendor',
  'brand/svg', 'brand/png',
];
const SKIP_DIRS = new Set(['_raw']);   // img/kind/_raw: الأصلُ الذهبيّ للمولِّد لا للموقع
const SKIP_EXTS = new Set(['.md']);    // vendor/README.md: وثيقةٌ لا مورد

const rel = abs => relative(ROOT, abs).split(sep).join('/');

const kindOf = r =>
    r.startsWith('vendor/') || r.startsWith('sims/') ? 'copy'
  : r.endsWith('.js')   ? 'js'
  : r.endsWith('.css')  ? 'css'
  : r.endsWith('.html') ? 'html'
  : 'copy';

async function* walk(abs){
  if ((await stat(abs)).isFile()) { yield abs; return; }
  for (const e of await readdir(abs, { withFileTypes: true })) {
    if (e.isDirectory() && SKIP_DIRS.has(e.name)) continue;
    if (e.isFile() && SKIP_EXTS.has(extname(e.name))) continue;
    if (e.isDirectory() || e.isFile()) yield* walk(join(abs, e.name));
  }
}

/* ── التنقية ── */
const STRIP = { minifyWhitespace: true, legalComments: 'none', charset: 'utf8' };
/* ⚠️ ميزانُ الفحص ① بلا `minifyIdentifiers` — قِيس لا رُجِّح: esbuild يختار
   الأسماءَ القصيرة من تواتر الحروف في نصّ الملفّ **وتعليقاتُه منه**، فالشيفرةُ
   نفسُها بتعليقٍ وبلا تعليق تُسمّي `u` هنا و`x` هناك. فشلت به أربعُ وحدات
   سليمة (avatar · book · editor_quiz · teacher) والطولُ متطابق.
   ⇒ يُقارَن البناءُ بأسمائه الأصلية — وهو أصرمُ لا أرخى. */
const FULL  = { minifyWhitespace: true, minifySyntax: true, legalComments: 'none', charset: 'utf8' };

/* HTML: التعليقاتُ خارج <script> و<style> وحدها — داخلهما نصُّ برنامج
   لا تعليقُ HTML، ولا يُمسّ. و`split` بمجموعةٍ ملتقَطة يُعيد الأجزاءَ
   متناوبة: نصٌّ ثمّ كتلةٌ ثمّ نصّ — فالفرديُّ كتلةٌ تبقى كما هي. */
const RAW_BLOCK = /(<script\b[\s\S]*?<\/script\s*>|<style\b[\s\S]*?<\/style\s*>)/i;
const stripHtml = s => s.split(RAW_BLOCK)
  .map((part, i) => i % 2 ? part : part.replace(/<!--[\s\S]*?-->/g, ''))
  .join('');

/* ── المسارات المحلّية في المنشور (الفحص ②) ── */
const EXTERNAL = /^(?:[a-z][a-z0-9+.-]*:|\/\/|#)/i;   // http: · data: · mailto: · r2: · // · #
const ASSET    = /\.(?:png|jpe?g|webp|gif|svg|ico|js|css|html|mp3|ogg|wav|json|woff2?)$/i;

function refsOf(r, text){
  const out = [];            // [مسارٌ كما كُتب, أساسُ حلّه, أيُحلّ على عنوان الصفحة؟]
  const here = posix.dirname(r);
  const add = (p, base, page = false) => {
    p = p.split(/[?#]/)[0];
    if (p && !EXTERNAL.test(p)) out.push([p, base, page]);
  };
  if (r.endsWith('.html')) {
    /* index.html وحدها تُقدَّم على كلّ عنوان — فمساراتُها وحدها «على الصفحة» (③).
       ووحدةُ الإقلاع داخلها (`import … from '/js/auth.js'`) تُقرأ معها. */
    const shell = r === 'index.html';
    for (const m of text.matchAll(/\s(?:src|href)\s*=\s*["']([^"']+)["']/gi)) add(m[1], here, shell);
    for (const m of text.matchAll(/\bfrom\s*["']([^"']+)["']/g))                 add(m[1], here, shell);
  } else if (r.endsWith('.css')) {
    for (const m of text.matchAll(/url\(\s*["']?([^"')]+)["']?\s*\)/gi)) add(m[1], here);
  } else if (r.endsWith('.js')) {
    /* الاستيرادُ يُحلّ من موضع الوحدة … */
    for (const m of text.matchAll(/(?:\bfrom|\bimport)\s*\(?\s*["'](\.{1,2}\/[^"']+)["']/g)) add(m[1], here);
    /* … والمسارُ النصّيّ (img/… · vendor/… · sims/…) من موضع الصفحة:
       يُكتب في src أو يُمرَّر إلى fetch، فيُحلّ على index.html لا على الوحدة. */
    for (const m of text.matchAll(/["'`]((?:\.?\/)?(?:(?:img|vendor|sims|css|js|brand)\/[^"'`$\s?#]+|privacy\.html))["'`?#]/g))
      if (ASSET.test(m[1])) add(m[1], '.', true);
  }
  return out;
}

const exists = async p => { try { await stat(p); return true; } catch { return false; } };

/* ══════════════════════════════════════════════════════════ */

const t0 = Date.now();
await rm(OUT, { recursive: true, force: true });

const published = [];
const sizes = { before: 0, after: 0 };
const fail = [], warn = [];
let checked = 0;

for (const entry of PUBLISH) {
  const abs = join(ROOT, entry);
  if (!(await exists(abs))) { fail.push(`مذكورٌ في PUBLISH ولا وجود له: ${entry}`); continue; }

  for await (const src of walk(abs)) {
    const r = rel(src), dst = join(OUT, r), kind = kindOf(r);
    await mkdir(dirname(dst), { recursive: true });
    published.push(r);

    if (kind === 'copy') { await copyFile(src, dst); continue; }

    const text = await readFile(src, 'utf8');
    let out;

    if (kind === 'html') {
      out = stripHtml(text);
    } else {
      const loader = kind;                       // 'js' · 'css'
      const res = await transform(text, { ...STRIP, loader,
        sourcemap: 'external', sourcefile: `/src/${r}` });
      out = res.code;

      /* الفحص ① — ما حُذف تعليقٌ وفراغٌ لا غير */
      const [a, b] = await Promise.all([
        transform(text, { ...FULL, loader }), transform(out, { ...FULL, loader }) ]);
      if (a.code !== b.code) fail.push(`${r}: المنشورُ يختلف عن المصدر في غير التعليق`);

      const m = basename(r) + '.map';
      await writeFile(dst + '.map', res.map);
      out += loader === 'js' ? `\n//# sourceMappingURL=${m}\n` : `\n/*# sourceMappingURL=${m} */\n`;
    }

    sizes.before += Buffer.byteLength(text);
    sizes.after  += Buffer.byteLength(out);
    await writeFile(dst, out);
  }
}

/* الفحص ② — كلُّ مسارٍ محلّيّ في المنشور يجد ملفَّه */
for (const r of published) {
  if (!/\.(?:html|css|js)$/.test(r) || r.startsWith('vendor/')) continue;
  const text = await readFile(join(OUT, r), 'utf8');
  for (const [p, base, page] of refsOf(r, text)) {
    /* الفحص ③ — ما يُحلّ على عنوان الصفحة يبدأ بـ«/» */
    if (page && !p.startsWith('/'))
      fail.push(`${r}: «${p}» نسبيٌّ يُحلّ على عنوان الصفحة — على /subjects/7/lessons/42 يُطلب من غير موضعه. اكتبه «/${p.replace(/^\.\//, '')}»`);
    const target = p.startsWith('/') ? p.slice(1) : posix.normalize(posix.join(base, p));
    if (target.startsWith('..')) continue;
    checked++;
    if (await exists(join(OUT, target))) continue;
    if (await exists(join(ROOT, target)))
      fail.push(`${r} يطلب «${p}» — في المستودع وليس في المنشور: أضِفه إلى PUBLISH`);
    else
      warn.push(`${r} يطلب «${p}» — ولا وجودَ له في المستودع أصلاً (عطلٌ قائم لا من البناء)`);
  }
}

/* ── التقرير ── */
const kb = n => (n / 1024).toFixed(0) + 'KB';
const left = (await readdir(ROOT)).filter(n =>
  !n.startsWith('.') && n !== 'dist' && n !== 'node_modules' && !PUBLISH.some(p => p.split('/')[0] === n));

console.log(`بيان · البناء — ${published.length} ملفّاً في dist/ (${Date.now() - t0}ms)`);
console.log(`  نُقّي: ${kb(sizes.before)} ⇒ ${kb(sizes.after)} (−${(100 - 100 * sizes.after / sizes.before).toFixed(0)}٪) — خاماً قبل الضغط`);
console.log(`  لا يُنشر من الجذر: ${left.join(' · ')}`);
for (const w of warn) console.log(`  ⚠️ ${w}`);

if (fail.length) {
  for (const f of fail) console.error(`  ⛔ ${f}`);
  console.error(`\n⛔ فشل البناء (${fail.length}) — لا يُنشر شيء، والموقعُ الحيّ باقٍ على ما كان.`);
  process.exit(1);
}
console.log(`  ✅ الفحوص الثلاثة: التصغيرُ الكامل متطابق · وكلُّ مسارٍ يجد ملفَّه (${checked} مساراً) · وما على الصفحة مطلق`);
