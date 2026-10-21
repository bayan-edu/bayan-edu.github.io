# -*- coding: utf-8 -*-
"""قصُّ صورة المادة المجسّمة بلا هالةٍ بيضاء — b160 · ٢١ أكتوبر ٢٠٢٦.

الصورةُ تُولَّد على خلفيةٍ بيضاء نقيّة (Figma · ١٠٢٤px)، ثمّ تُقصّ هنا إلى
٢٨٠px شفّافة. **وهالةُ الصور القديمة سببُها واحد:** بكسلاتُ الحافّة نصفُ
الشفّافة حملت لونَ الجسم ممزوجاً بأبيض الخلفية — لا يُرى على الفاتحة،
ويتوهّج حوافَّ بيضاءَ على الداكنة. فثلاثُ خطوات:

  ① قناعٌ دقيق — ISNet عبر rembg. (BiRefNet أدقّ، لكنّه يُقتل لنفاد الذاكرة
     في بيئةٍ ذاتِ ٧ غ.ب.)
  ② **تقديرُ لون المقدّمة** (pymatting): يأخذ كلُّ بكسلٍ نصفِ شفّاف لونَ
     الجسم الذي خلفه، لا الجسمَ والأبيضَ معاً. **وهذه الخطوةُ هي العلاج.**
  ③ التصغيرُ على اللون **المضروب في الشفافية**، فلا يجرّ التنعيمُ الأبيضَ
     إلى الحافّة من جديد.

⚠️ `--fill-holes` للورق الأبيض المحصور (لوحُ «كيف أذاكر؟»): القناعُ يحسبه
   خلفيةً — أبيضُ على أبيض — فيشفّ على الداكنة. **ولا تُستعمل لحرفٍ ذي عُروة:**
   تملأ عُروةَ الضاد. ولا لثقبٍ حقيقيّ (عينُ دبّوس الخريطة في «الجغرافيا»).
   و`--hole-edge 0.97` حين يكون الورقُ نصفَ معتمٍ في القناع (شاشةُ الحاسبة في
   «المحاسبة»): بالحدّ ٠٫٥ يقف الملءُ في منتصفه فيترك رقعةً مسنّنة — قِيس.

والمقياسُ المطبوع: **بكسلاتُ الحافّة شبهُ البيضاء** — العربيةُ القديمة ٦٨٢،
والمقصوصةُ هنا ٠.

▶️ pip install --break-system-packages "rembg[cpu]" pymatting
   python3 tools/icon_cutout.py مصدر.png img subject_key --model isnet-general-use [--fill-holes]
   ⇒ img/subj_<key>.png و.webp — ثمّ سطرٌ في SUBJ_IMG (js/student.js).
"""
import argparse, pathlib
import numpy as np
from PIL import Image
from rembg import new_session, remove
from pymatting import estimate_foreground_ml

ap = argparse.ArgumentParser()
ap.add_argument("src"); ap.add_argument("out"); ap.add_argument("name")
ap.add_argument("--size", type=int, default=280)
ap.add_argument("--margin", type=float, default=0.025)
ap.add_argument("--model", default="birefnet-general")
ap.add_argument("--fill-holes", action="store_true",
                help="make enclosed holes opaque — for white paper the matte mistook for background."
                     " Never for letters with counters (the loop of ض would fill).")
ap.add_argument("--hole-edge", type=float, default=0.5,
                help="alpha above which a pixel walls a hole. Raise it (0.97) when the paper is"
                     " half-opaque in the matte, or the fill stops halfway and leaves a ragged patch.")
a = ap.parse_args()

out = pathlib.Path(a.out); out.mkdir(parents=True, exist_ok=True)
im = Image.open(a.src).convert("RGB")
mask = remove(im, session=new_session(a.model), only_mask=True, post_process_mask=False)
alpha = np.asarray(mask).astype(np.float64) / 255.0
alpha[alpha < 0.03] = 0.0                     # background residue (soft floor gradient)
alpha[alpha > 0.97] = 1.0
if a.fill_holes:
    from scipy import ndimage
    solid = alpha > a.hole_edge
    holes = ndimage.binary_fill_holes(solid) & ~solid
    lab, n = ndimage.label(holes)
    sizes = ndimage.sum(holes, lab, range(1, n + 1))
    keep = np.isin(lab, [i + 1 for i, sz in enumerate(sizes) if sz >= 50])
    alpha[keep] = 1.0
    print(f"filled {int(keep.sum())} px in {int((sizes >= 50).sum())} enclosed holes")
img = np.asarray(im).astype(np.float64) / 255.0
fg = np.clip(estimate_foreground_ml(img, alpha), 0, 1)

# tight square crop around the object, small even margin
ys, xs = np.nonzero(alpha > 0.02)
y0, y1, x0, x1 = ys.min(), ys.max() + 1, xs.min(), xs.max() + 1
side = int(max(y1 - y0, x1 - x0) * (1 + 2 * a.margin))
cy, cx = (y0 + y1) // 2, (x0 + x1) // 2
H, W = alpha.shape
pad = side  # pad generously so the square never leaves the canvas
P = lambda arr, v: np.pad(arr, ((pad, pad), (pad, pad)) + (((0, 0),) if arr.ndim == 3 else ()), constant_values=v)
fgp, alp = P(fg, 0.0), P(alpha, 0.0)
ty, tx = cy + pad - side // 2, cx + pad - side // 2
fgc, alc = fgp[ty:ty + side, tx:tx + side], alp[ty:ty + side, tx:tx + side]

# resize premultiplied
pm = np.dstack([fgc * alc[..., None], alc])
pm_img = Image.fromarray((pm * 255).round().astype(np.uint8), "RGBA")
# PIL treats RGBA as straight alpha; we resize each channel as float via "F" mode to stay premultiplied
chans = [Image.fromarray((pm[..., i]).astype(np.float32), "F").resize((a.size, a.size), Image.LANCZOS)
         for i in range(4)]
pm_s = np.dstack([np.asarray(c) for c in chans]).clip(0, 1)
al_s = pm_s[..., 3]
rgb_s = np.where(al_s[..., None] > 1e-4, pm_s[..., :3] / np.maximum(al_s[..., None], 1e-4), 0).clip(0, 1)
rgba = np.dstack([rgb_s, al_s])
rgba[rgba[..., 3] < 1 / 255.0] = 0
res = Image.fromarray((rgba * 255).round().astype(np.uint8), "RGBA")
res.save(out / f"subj_{a.name}.png", optimize=True)
res.save(out / f"subj_{a.name}.webp", quality=88, method=6)

# halo score on the dark page (#262626): edge band vs. everything opaque
A = rgba[..., 3]; edge = (A > 0.05) & (A < 0.6); body = A > 0.95
dark = np.array([38, 38, 38]) / 255.0
comp = rgba[..., :3] * A[..., None] + dark * (1 - A[..., None])
lum = comp @ np.array([0.299, 0.587, 0.114])
# a white halo shows as edge pixels much lighter than the dark page mixed with the body
print(f"{a.name}: {res.size} · edge px {int(edge.sum())} · edge lum on dark {lum[edge].mean():.3f}"
      f" · body lum {lum[body].mean():.3f} · near-white edge px {int((edge & (rgba[..., :3].min(axis=2) > 0.92)).sum())}")
