#!/usr/bin/env node
/* ══════════════════════════════════════════════════════════════════
   brand.mjs — حارسُ العلامة ومولِّدُ حزمتها.  بلا اعتماديّات.

   لماذا يوجد: هندسةُ العلامة مكرَّرةٌ في ثمانيةَ عشرَ موضعاً نصّيّاً
   (index.html ×٢ · privacy.html · favicon.svg · brand/svg/*) ومنها
   أحدَ عشرَ ملفّاً نقطيّاً. والتكرارُ لا يُزال: الـSVG الخارجيّ لا يقرأ
   متغيّرات CSS، ومشهدُ الافتتاح يحتاج مجموعاته في المستند.
   🔑 فالعلاج ألّا يصمت — وهذا الملفّ يجعل الافتراقَ صاخباً.

   ⚠️ وكلُّ عجزٍ عن القراءة خطأٌ لا تجاوُز: فحصٌ يمرّ لأنّه لم يفهم
      الملفّ أسوأ من غياب الفحص — يُدرِّب الناظر على تصديق الأخضر.

   node brand/brand.mjs check          يقارن كلَّ نسخةٍ بالمصدر
   node brand/brand.mjs build          يُعيد توليد brand/svg + manifest
   node brand/brand.mjs build --png    ومعها النقطيّ (يحتاج Playwright)
   ══════════════════════════════════════════════════════════════════ */

import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { createHash } from 'node:crypto';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const P = (...a) => join(ROOT, ...a);
const read = f => readFileSync(P(f), 'utf8');
const G = JSON.parse(read('brand/geometry.json'));

/* بصمةُ الهندسة — تُحفظ مع كلّ مولَّد، فيُكشف البائتُ منه */
const canon = o => Array.isArray(o) ? '[' + o.map(canon).join(',') + ']'
  : (o && typeof o === 'object')
    ? '{' + Object.keys(o).filter(k => !k.startsWith('_')).sort()
        .map(k => JSON.stringify(k) + ':' + canon(o[k])).join(',') + '}'
    : JSON.stringify(o);
const HASH = createHash('sha256').update(canon(G)).digest('hex').slice(0, 12);

/* ── الأخطاء تُجمع كلُّها ثم تُعرض: جولةٌ واحدة تكشف كلَّ انحراف ── */
const errs = [];
const bad = (file, what, want, got) =>
  errs.push(`  ✗ ${file}\n      ${what}\n      المصدر: ${want}\n      الملفّ: ${got}`);
const eq = (file, what, want, got) => {
  const n = s => String(s ?? '').replace(/\s+/g, ' ').trim();
  if (n(want) !== n(got)) bad(file, what, n(want), n(got) || '(غائب)');
};

/* ═══ ١ · توليد نصوص brand/svg من المصدر ═══════════════════════ */

const m = G.mark, ic = G.icon;
const markBody = (ink, teal, gold, { leaves = true, dots = true } = {}) => {
  let s = `<g fill="none" stroke="${ink}" stroke-width="${m.stroke}" stroke-linecap="round" stroke-linejoin="round">`
    + `<path d="${m.strokes.baseline}"/><path d="${m.strokes.tooth}"/>`
    + `<path d="${m.strokes.bowl}"/></g>`;
  s += m.carve.map(d => `<path fill="${ink}" d="${d}"/>`).join('');
  if (leaves) s += `<path fill="${teal}" d="${m.leaves.teal}"/><path fill="${gold}" d="${m.leaves.gold}"/>`;
  if (dots) s += m.dots.map(([x, y]) => `<circle fill="${ink}" cx="${x}" cy="${y}" r="${m.dotR}"/>`).join('');
  return s;
};
const iconBody = (ink, teal, gold) =>
  `<path fill="none" stroke="${ink}" stroke-width="${ic.stroke}" stroke-linecap="round" d="${ic.strokes.bowl}"/>`
  + `<path fill="${teal}" d="${ic.leaves.teal}"/><path fill="${gold}" d="${ic.leaves.gold}"/>`
  + `<circle fill="${ink}" cx="${ic.dot[0]}" cy="${ic.dot[1]}" r="${ic.dotR}"/>`;

const { logo: INK, icon: IINK, teal: TEAL, gold: GOLD } = G.ink;
const W = '#FFFFFF';
const FILES = {
  'bayan-mark':       [m.viewBox, markBody(INK, TEAL, GOLD), 'العلامة الكاملة', 'العلامة الكاملة بحبر الهوية ' + INK.slice(1) + ' والورقتان بلونيهما الثابتين. للخلفيات الفاتحة.'],
  'bayan-mark-white': [m.viewBox, markBody(W, TEAL, GOLD), 'العلامة معكوسة', 'للخلفيات الداكنة: الحبر أبيض والورقتان على حالهما — فهما هوية لا تتبع السِمة.'],
  'bayan-mark-mono':  [m.viewBox, markBody(INK, INK, INK), 'العلامة بلون واحد', 'لونٌ واحد للطباعة الأحادية والختم والتطريز. الورقتان بالحبر نفسه.'],
  'bayan-wordmark':   [m.viewBox, markBody(INK, null, null, { leaves: false }), 'الكلمة بلا ورقتين', 'الكلمة وحدها: الحروف والنقاط بلا الورقتين. لمن أراد الحروف مادةً لعملٍ آخر.'],
  'bayan-icon':       [ic.viewBox, iconBody(IINK, TEAL, GOLD), 'الأيقونة', 'وعاء النون وورقتاه ونقطته. حبرها ' + IINK.slice(1) + ' لا ' + INK.slice(1) + ': درجة أفتح للمقاس الصغير.'],
  'bayan-icon-white': [ic.viewBox, iconBody(W, TEAL, GOLD), 'الأيقونة معكوسة', 'الأيقونة للخلفيات الداكنة.'],
  'bayan-bowl':       ['19 15 202 214', `<g fill="none" stroke="${INK}" stroke-width="${m.stroke}" stroke-linecap="round"><path d="${m.strokes.bowl}"/></g><circle fill="${INK}" cx="120" cy="40" r="${m.dotR}"/>`, 'وعاء النون', 'وعاء النون ونقطته، بنِسَب الشعار (الضربة ' + m.stroke + ' · النقطة ' + m.dotR + ').'],
  'bayan-leaves':     ['58 70 124 118', `<path fill="${TEAL}" d="${m.leaves.teal}"/><path fill="${GOLD}" d="${m.leaves.gold}"/>`, 'الورقتان', 'الورقتان وحدهما: فيروزيٌّ ' + TEAL.slice(1) + ' وذهبيٌّ ' + GOLD.slice(1) + ' — لونان ثابتان لا يتبعان السِمة.'],
};
const svgText = name => {
  const [vb, body, title, note] = FILES[name];
  const [, , w, h] = vb.split(/\s+/);
  return `<?xml version="1.0" encoding="utf-8"?>\n<!-- ${note}\n     مولَّدٌ من brand/geometry.json — لا يُحرَّر بيد. هندسة: ${HASH} -->\n`
    + `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${vb}" width="${w}" height="${h}">`
    + `<title>بيان — ${title}</title>${body}</svg>\n`;
};
const PNG_W = { 'bayan-mark': 2000, 'bayan-mark-white': 2000, 'bayan-mark-mono': 2000, 'bayan-wordmark': 2000,
                'bayan-icon': 1024, 'bayan-icon-white': 1024, 'bayan-bowl': 1024, 'bayan-leaves': 1024 };

/* ═══ ٢ · الفحص ═══════════════════════════════════════════════ */

/* استخراجُ نسخة العلامة من مستند HTML.
   ⚠️ يرمي إن لم يجد ما يتوقّع — ولا يمرّ صامتاً. */
function pullMark(file, html, which) {
  const svgs = [...html.matchAll(new RegExp(`<svg[^>]*viewBox="${m.viewBox}"[\\s\\S]*?<\\/svg>`, 'g'))].map(x => x[0]);
  if (!svgs[which]) throw new Error(`${file}: لم أجد نسخة العلامة رقم ${which + 1} (viewBox "${m.viewBox}")`);
  const s = svgs[which];
  const ds = [...s.matchAll(/<path[^>]*\sd="([^"]+)"/g)].map(x => x[1]);
  const cs = [...s.matchAll(/<circle[^>]*cx="([\d.]+)"[^>]*cy="([\d.]+)"[^>]*r="([\d.]+)"/g)]
    .map(x => [Number(x[1]), Number(x[2]), Number(x[3])]);
  const sw = [...s.matchAll(/stroke-width="([\d.]+)"/g)].map(x => Number(x[1]));
  if (ds.length !== 7) throw new Error(`${file}: توقّعت ٧ مسارات في النسخة ${which + 1} فوجدت ${ds.length}`);
  if (cs.length !== 4) throw new Error(`${file}: توقّعت ٤ نقاط في النسخة ${which + 1} فوجدت ${cs.length}`);
  return { ds, cs, sw, raw: s };
}

/* ⚠️ المقارنة بالمحتوى لا بالموضع: ترتيبُ المسارات في المستند لا أثر
   له بصرياً (الحبر لونٌ واحد)، وإنذارٌ على ترتيبٍ لا يضرّ يُدرِّب
   الناظر على تجاهل الإنذار. أمّا الغياب والتحريف فيُصاح بهما. */
function checkMarkCopy(label, g) {
  const want = {
    'القاع': m.strokes.baseline, 'سنّ الياء': m.strokes.tooth, 'وعاء النون': m.strokes.bowl,
    'النحت الأيمن': m.carve[0], 'النحت الأيسر': m.carve[1],
    'الورقة الفيروزية': m.leaves.teal, 'الورقة الذهبية': m.leaves.gold,
  };
  const norm = s => String(s).replace(/\s+/g, ' ').trim();
  const have = g.ds.map(norm);
  const left = [...have];
  for (const [name, w] of Object.entries(want)) {
    const i = left.indexOf(norm(w));
    if (i < 0) bad(label, `المسار «${name}» غائبٌ أو محرَّف`, norm(w), have.join('\n              | '));
    else left.splice(i, 1);
  }
  left.forEach(d => bad(label, 'مسارٌ زائدٌ لا يعرفه المصدر', '(لا شيء)', d));
  const wantDots = [...m.dots].sort((a, b) => b[0] - a[0]);
  const gotDots = g.cs.map(c => [c[0], c[1]]).sort((a, b) => b[0] - a[0]);
  eq(label, 'مواضع النقاط الأربع', JSON.stringify(wantDots), JSON.stringify(gotDots));
  g.cs.forEach(c => { if (c[2] !== m.dotR) bad(label, `نصف قطر النقطة عند cx ${c[0]}`, m.dotR, c[2]); });
  g.sw.forEach(w => { if (w !== m.stroke) bad(label, 'عرض الضربة', m.stroke, w); });
}

/* تأخيراتُ مشهد الافتتاح — تُحسب لا تُنقل */
const bz = (a, b, t) => 3 * (1 - t) ** 2 * t * a + 3 * (1 - t) * t * t * b + t ** 3;
function delayFor(cx) {
  const [vx, , vw] = m.viewBox.split(/\s+/).map(Number);
  const [x1, y1, x2, y2] = G.splash.ease;
  const e = (vx + vw - cx) / vw;
  let lo = 0, hi = 1;
  for (let i = 0; i < 80; i++) { const t = (lo + hi) / 2; bz(y1, y2, t) < e ? lo = t : hi = t; }
  return G.splash.dur * bz(x1, x2, (lo + hi) / 2);
}

function check() {
  /* ① النسخ المضمَّنة */
  const idx = read('index.html'), pri = read('privacy.html');
  checkMarkCopy('index.html · الكاملة', pullMark('index.html', idx, 0));
  checkMarkCopy('index.html · المختصرة', pullMark('index.html', idx, 1));
  checkMarkCopy('privacy.html', pullMark('privacy.html', pri, 0));
  if ([...idx.matchAll(new RegExp(`viewBox="${m.viewBox}"`, 'g'))].length !== 2)
    bad('index.html', 'عدد نسخ العلامة', 2, [...idx.matchAll(new RegExp(`viewBox="${m.viewBox}"`, 'g'))].length);

  /* ② تأخيرات المشهد — في المصدر وفي index.html معاً */
  const got = Object.fromEntries([...idx.matchAll(/--d:\.?(\d+)s[^>]*cx="(\d+)"/g)].map(x => [x[2], '0.' + x[1]]));
  for (const [cx, want] of Object.entries(G.splash.delays)) {
    const calc = delayFor(Number(cx)).toFixed(2);
    if (calc !== want) bad('brand/geometry.json', `تأخير النقطة عند cx ${cx} لا يطابق حسبته`, calc, want);
    if (got[cx] !== undefined) eq('index.html · مشهد الافتتاح', `تأخير النقطة عند cx ${cx}`, want, got[cx]);
    else bad('index.html · مشهد الافتتاح', `لم أجد تأخيراً للنقطة عند cx ${cx}`, want, '(غائب)');
  }

  /* ③ الأيقونة */
  const fav = read('favicon.svg');
  eq('favicon.svg', 'viewBox', ic.viewBox, (fav.match(/viewBox="([^"]+)"/) || [])[1]);
  eq('favicon.svg', 'عرض الضربة', ic.stroke, (fav.match(/stroke-width="([\d.]+)"/) || [])[1]);
  eq('favicon.svg', 'نصف قطر النقطة', ic.dotR, (fav.match(/<circle[^>]*\sr="([\d.]+)"/) || [])[1]);
  eq('favicon.svg', 'مسار وعاء النون', ic.strokes.bowl, (fav.match(/<path[^>]*stroke-width[^>]*\sd="([^"]+)"/) || [])[1]);
  eq('favicon.svg', 'الورقة الفيروزية', ic.leaves.teal, (fav.match(new RegExp(`fill="${TEAL}" d="([^"]+)"`)) || [])[1]);
  eq('favicon.svg', 'الورقة الذهبية', ic.leaves.gold, (fav.match(new RegExp(`fill="${GOLD}" d="([^"]+)"`)) || [])[1]);
  if (!fav.includes(IINK)) bad('favicon.svg', 'حبر الأيقونة', IINK, '(غير موجود)');

  /* ④ ألوان الهوية في base.css */
  const css = read('css/base.css');
  for (const [k, v] of [['--brand-teal', TEAL], ['--brand-gold', GOLD], ['--logo-ink', INK]]) {
    const re = new RegExp(`${k}\\s*:\\s*(#[0-9A-Fa-f]{6})`);
    const f = (css.match(re) || [])[1];
    if (!f) bad('css/base.css', `لم أجد ${k}`, v, '(غائب)');
    else if (f.toUpperCase() !== v.toUpperCase()) bad('css/base.css', k, v, f);
  }

  /* ⑤ brand/svg — تُقارن بما كان سيولَّد */
  for (const n of Object.keys(FILES)) {
    const f = `brand/svg/${n}.svg`;
    if (!existsSync(P(f))) { bad(f, 'الملفّ غائب', '(مولَّد)', '(لا شيء)'); continue; }
    if (read(f) !== svgText(n)) bad(f, 'يخالف ما يولّده المصدر', `هندسة ${HASH}`, 'محتوى مختلف — شغّل: node brand/brand.mjs build');
  }

  /* ⑥ brand/png — البصمةُ تكشف البائت */
  const mf = existsSync(P('brand/manifest.json')) ? JSON.parse(read('brand/manifest.json')) : null;
  if (!mf) bad('brand/manifest.json', 'غائب', `هندسة ${HASH}`, '(لا شيء)');
  else for (const n of Object.keys(FILES)) {
    const f = `brand/png/${n}.png`;
    if (!existsSync(P(f))) bad(f, 'الملفّ غائب', '(مولَّد)', '(لا شيء)');
    else if (mf.png?.[n] !== HASH)
      bad(f, 'نقطيٌّ بائت — وُلّد من هندسةٍ أقدم', HASH, mf.png?.[n] ?? '(بلا بصمة)');
  }

  /* النتيجة */
  if (errs.length) {
    console.error(`\n🔴 انحرفت العلامة عن مصدرها — ${errs.length} موضعاً:\n`);
    console.error(errs.join('\n\n'));
    console.error(`\n  المصدر: brand/geometry.json (هندسة ${HASH})`);
    console.error('  إن كان المصدرُ هو الصواب فأصلح المواضع أعلاه.');
    console.error('  وإن كان التغييرُ مقصوداً فانقله إلى المصدر ثم: node brand/brand.mjs build\n');
    process.exit(1);
  }
  console.log(`✅ العلامة متّسقة في مواضعها كلِّها — هندسة ${HASH}`);
}

/* ═══ ٣ · التوليد ═════════════════════════════════════════════ */

async function build(withPng) {
  for (const n of Object.keys(FILES)) writeFileSync(P(`brand/svg/${n}.svg`), svgText(n), 'utf8');
  console.log(`✅ وُلّد ${Object.keys(FILES).length} ملفّ svg — هندسة ${HASH}`);

  const mf = existsSync(P('brand/manifest.json')) ? JSON.parse(read('brand/manifest.json')) : { png: {} };
  mf.geometry = HASH;
  mf.svg = Object.fromEntries(Object.keys(FILES).map(n => [n, HASH]));
  mf.png ||= {};

  /* النقطيُّ يحتاج مصيِّراً، والـcheck لا يحتاجه أبداً — فهو وحده ما
     يُشغَّل في CI. ويُجرَّب Playwright العقديّ ثم البايثونيّ. */
  if (withPng) {
    const jobs = Object.keys(FILES).map(n => {
      const [vb] = FILES[n]; const [, , vw, vh] = vb.split(/\s+/).map(Number);
      const w = PNG_W[n], h = Math.round(w * vh / vw);
      const svg = svgText(n).replace(/<\?xml[\s\S]*?\?>/, '').replace(/<!--[\s\S]*?-->/, '')
        .replace(/width="[\d.]+" height="[\d.]+"/, `width="${w}" height="${h}"`).trim();
      return { n, w, h, out: P(`brand/png/${n}.png`), svg };
    });
    const page = j => `<html><head><meta charset="utf-8"><style>html,body{margin:0;background:transparent}svg{display:block}</style></head><body>${j.svg}</body></html>`;
    let done = false;

    try {
      const { chromium } = await import('playwright');
      const br = await chromium.launch(); const pg = await br.newPage();
      for (const j of jobs) {
        await pg.setContent(page(j));
        await pg.setViewportSize({ width: j.w, height: j.h });
        await pg.screenshot({ path: j.out, omitBackground: true, clip: { x: 0, y: 0, width: j.w, height: j.h } });
        console.log(`   ${j.n}.png  ${j.w}×${j.h}`);
      }
      await br.close(); done = true;
    } catch { /* يُجرَّب البايثونيّ */ }

    if (!done) {
      const { spawnSync } = await import('node:child_process');
      const py = `
import json,sys
from playwright.sync_api import sync_playwright
jobs=json.load(sys.stdin)
with sync_playwright() as pw:
    b=pw.chromium.launch(executable_path="/opt/pw-browsers/chromium")
    pg=b.new_page()
    for j in jobs:
        pg.set_content(j["page"]); pg.set_viewport_size({"width":j["w"],"height":j["h"]})
        pg.screenshot(path=j["out"],omit_background=True,
                      clip={"x":0,"y":0,"width":j["w"],"height":j["h"]})
        print("   %s.png  %d\\u00d7%d" % (j["n"], j["w"], j["h"]))
    b.close()
`;
      const r = spawnSync('python3', ['-I', '-c', py], {
        input: JSON.stringify(jobs.map(j => ({ n: j.n, w: j.w, h: j.h, out: j.out, page: page(j) }))),
        encoding: 'utf8', cwd: ROOT,
      });
      if (r.stdout) process.stdout.write(r.stdout);
      if (r.status === 0) done = true;
      else console.error('⚠️  لا Playwright عقديٌّ ولا بايثونيّ — وُلّد الـsvg وحده.\n'
        + '   والنقطيُّ يبقى بائتاً، وسيصيح به الفحص حتى يُولَّد.');
    }
    if (done) { for (const j of jobs) mf.png[j.n] = HASH; console.log('✅ وُلّد النقطيُّ كلُّه'); }
  }
  writeFileSync(P('brand/manifest.json'), JSON.stringify(mf, null, 2) + '\n', 'utf8');
}

/* ═══ البوّابة ════════════════════════════════════════════════ */

const cmd = process.argv[2];
try {
  if (cmd === 'check') check();
  else if (cmd === 'build') await build(process.argv.includes('--png'));
  else { console.error('الاستعمال: node brand/brand.mjs check | build [--png]'); process.exit(2); }
} catch (e) {
  /* ⚠️ عجزٌ عن القراءة خطأٌ لا تجاوُز */
  console.error(`\n🔴 تعذّر الفحص — ولا يُعدّ نجاحاً:\n  ${e.message}\n`);
  process.exit(1);
}
