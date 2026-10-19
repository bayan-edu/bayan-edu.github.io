# -*- coding: utf-8 -*-
"""تقطيعُ ورقتَي الأيقونات وتفريغُ خلفيّتهما.

الطريقة: كلُّ أيقونةٍ مكوّنٌ متّصلٌ من بكسلاتٍ غيرِ بيضاء. يُلتقط المكوّن،
وتُملأ ثقوبُه (الرمزُ الأبيض داخل الزجاج ثقبٌ في القناع)، ثمّ يُنعَّم حدُّه.
والظلُّ الرماديُّ تحت الأيقونة **يُطرح عمداً** — لأنّه مرسومٌ على ورقٍ أبيض
فيصير لطخةً على السِمة الداكنة. وتُعاد إضافتُه في CSS بـdrop-shadow،
فيتبع السِمتين.
"""
import numpy as np
from PIL import Image, ImageFilter
from scipy import ndimage

RAW = '/mnt/user-data/uploads/bayan-edu.github.io/img/kind/_raw'
OUT = '/mnt/user-data/outputs/kind'
SIZE = 160                      # ضعفُ أكبر مقاسِ عرضٍ (٨٠) — يكفي شاشات 2x

import os; os.makedirs(OUT, exist_ok=True)


def components(path, expect):
    im = Image.open(path).convert('RGB')
    a = np.asarray(im).astype(np.int16)
    # «غيرُ أبيض» = ابتعادٌ عن الأبيض في أيّ قناة. ٢٢ يُبقي جسمَ الزجاج
    # ويُسقط الهالةَ والظلَّ الباهتَين.
    lo = a.min(axis=2)
    # 🔑 الصورةُ المولَّدة فيها **انعكاسُ** الأيقونة على الأرضية البيضاء —
    #    رقعةٌ فاتحةٌ ملتصقةٌ بأسفل الجسم، لو بقيت لصارت لطخةً بيضاء على
    #    السِمة الداكنة. وقِيست فصارت الحدُّ: الانعكاس lo≈٢٢٢ وجسمُ أغمق
    #    أيقونةٍ (النصّ الرماديّ) lo≈١٦٠ ⇒ ٢٠٥ يفصلهما بأمان.
    #    وبريقُ الحافّة الأبيض يسقط معه، فيُستردّ بالإغلاق أدناه.
    mask = lo < 205
    mask = ndimage.binary_opening(mask, np.ones((3, 3)))
    lab, n = ndimage.label(mask)
    sizes = ndimage.sum(mask, lab, range(1, n + 1))
    order = np.argsort(sizes)[::-1][:expect]
    slices = ndimage.find_objects(lab)
    boxes = []
    for i in order:
        sl = slices[i]
        boxes.append((sl[1].start, sl[0].start, sl[1].stop, sl[0].stop, i + 1))
    # الترتيب: صفّاً صفّاً ثمّ يساراً فيميناً (ترتيبُ قراءة الورقة)
    hs = [b[3] - b[1] for b in boxes]
    rowh = np.median(hs)
    boxes.sort(key=lambda b: (round(b[1] / rowh), b[0]))
    return im, lab, lo, boxes


def cut(im, lab, loarr, box, name):
    x0, y0, x1, y1, idx = box
    pad = 10
    X0, Y0 = max(0, x0 - pad), max(0, y0 - pad)
    X1, Y1 = min(im.width, x1 + pad), min(im.height, y1 + pad)

    m = (lab[Y0:Y1, X0:X1] == idx)

    # ✂️ قدمُ الانعكاس: الصورةُ المولَّدة فيها انعكاسُ الأيقونة على الأرضية
    #    البيضاء، ملتصقٌ بالقاعدة — لو بقي لصار لطخةً بيضاء على السِمة الداكنة.
    #    والانتقالُ بينهما ناعمٌ فلا يفصله حدٌّ ثابت ⇒ الحدُّ **نسبيٌّ لكلّ
    #    أيقونةٍ بلونها**: أساسُها متوسّطُ فتوحها في أعلى ٧٠٪، وما تجاوز
    #    منتصفَ المسافة بينه وبين الأبيض فهو انعكاسٌ لا زجاج.
    #    (ولولا النسبية لابتُلعت أيقونةُ «نصّ» الرمادية كلُّها — فتوحُها ١٦٠.)
    sub = loarr[Y0:Y1, X0:X1]
    rows = [(sub[r][m[r]].mean() if m[r].any() else None) for r in range(m.shape[0])]
    seen = [v for v in rows[: int(len(rows) * 0.7)] if v is not None]
    if seen:
        base = float(np.median(seen))
        limit = base + 0.45 * (255 - base)
        for r in range(len(rows) - 1, -1, -1):
            if rows[r] is not None and rows[r] <= limit:
                m[r + 1:] = False
                break

    m = ndimage.binary_fill_holes(m)                    # الرمزُ الأبيض ثقبٌ ⇒ يُملأ
    m = ndimage.binary_closing(m, np.ones((11, 11)))
    m = ndimage.binary_fill_holes(m)

    rgb = im.crop((X0, Y0, X1, Y1))
    alpha = Image.fromarray((m * 255).astype(np.uint8), 'L')
    # تنعيمُ الحدّ: تمويهٌ خفيف ثمّ شدٌّ، فلا يبقى سنٌّ ولا هالةٌ بيضاء
    alpha = alpha.filter(ImageFilter.GaussianBlur(1.1)).point(lambda v: 0 if v < 118 else min(255, int((v - 118) * 3.2)))

    out = rgb.convert('RGBA')
    out.putalpha(alpha)
    out = out.crop(out.getbbox())

    # مربّعٌ متساوي الضلعين، فلا تختلف أحجامُ الأيقونات في الصفّ
    s = max(out.size) + 6
    sq = Image.new('RGBA', (s, s), (0, 0, 0, 0))
    sq.paste(out, ((s - out.width) // 2, (s - out.height) // 2), out)
    sq = sq.resize((SIZE, SIZE), Image.LANCZOS)
    sq.save(f'{OUT}/{name}.webp', 'WEBP', quality=92, method=6)
    sq.save(f'{OUT}/{name}.png', 'PNG', optimize=True)
    return os.path.getsize(f'{OUT}/{name}.webp')


A = ['pdf', 'video', 'audio', 'quiz', 'worksheet', 'simulation']
B = ['infographic', 'image', 'link', 'slides', 'mindmap', 'recording', 'text', 'book']

tot = 0
for f, names in ((f'{RAW}/a.png', A), (f'{RAW}/b.png', B)):
    im, lab, loarr, boxes = components(f, len(names))
    print(f'{os.path.basename(f)}: وجدتُ {len(boxes)} مكوّناً')
    for b, nm in zip(boxes, names):
        tot += cut(im, lab, loarr, b, nm)
        print(f'   {nm:12s} من ({b[0]},{b[1]}) حجمُه {b[2]-b[0]}×{b[3]-b[1]}')
print(f'\nالمجموع webp: {tot/1024:.1f} ك.ب')
