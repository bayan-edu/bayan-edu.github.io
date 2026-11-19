import os, sys
from PIL import Image, ImageDraw, ImageFont, ImageFilter

bg_path = r"C:\Users\Mahmoud\.gemini\antigravity\brain\3dd91c27-88c3-4b9b-85ec-f14ed63d859d\polynesian_voyaging_canoe_cover_1795036943795.jpg"
if not os.path.exists(bg_path):
    print("Background not found")
    sys.exit(1)

# Target dimensions: 600 x 888 (1 : 1.48 aspect ratio)
TARGET_W, TARGET_H = 600, 888

img = Image.open(bg_path).convert("RGBA")
# Resize and crop to fill 600x888
img_w, img_h = img.size
scale = max(TARGET_W / img_w, TARGET_H / img_h)
new_w, new_h = int(img_w * scale), int(img_h * scale)
img = img.resize((new_w, new_h), Image.Resampling.LANCZOS)

left = (new_w - TARGET_W) // 2
top = (new_h - TARGET_H) // 2
img = img.crop((left, top, left + TARGET_W, top + TARGET_H))

# Overlay dark gradients for text readability (top and bottom)
overlay = Image.new("RGBA", (TARGET_W, TARGET_H), (0, 0, 0, 0))
draw_ov = ImageDraw.Draw(overlay)

# Top gradient
for y in range(220):
    alpha = int(180 * (1.0 - y / 220.0)**1.2)
    draw_ov.line([(0, y), (TARGET_W, y)], fill=(10, 15, 30, alpha))

# Bottom gradient
for y in range(TARGET_H - 180, TARGET_H):
    progress = (y - (TARGET_H - 180)) / 180.0
    alpha = int(190 * (progress**1.2))
    draw_ov.line([(0, y), (TARGET_W, y)], fill=(10, 15, 30, alpha))

img = Image.alpha_composite(img, overlay)
draw = ImageDraw.Draw(img)

# Fonts
font_series = ImageFont.truetype(r"C:\Windows\Fonts\segoeui.ttf", 18)
font_title_bold = ImageFont.truetype(r"C:\Windows\Fonts\georgiab.ttf", 36)
font_subtitle = ImageFont.truetype(r"C:\Windows\Fonts\georgiai.ttf", 24)
font_badge = ImageFont.truetype(r"C:\Windows\Fonts\segoeuib.ttf", 16)

# 1. Header / Series
series_text = "B A Y A N   L I B R A R Y"
draw.text((TARGET_W / 2, 45), series_text, font=font_series, fill=(230, 235, 245, 220), anchor="mm")
draw.line([(TARGET_W / 2 - 80, 62), (TARGET_W / 2 + 80, 62)], fill=(200, 170, 110, 180), width=1)

# 2. Title
title_main = "Polynesian Voyaging"
title_sub = "To Build a Canoe"

# Title shadow & glow
for offset in [(0, 2), (1, 1), (-1, -1), (0, -1), (1, 0)]:
    draw.text((TARGET_W / 2 + offset[0], 115 + offset[1]), title_main, font=font_title_bold, fill=(5, 10, 20, 230), anchor="mm")
draw.text((TARGET_W / 2, 115), title_main, font=font_title_bold, fill=(255, 255, 255, 255), anchor="mm")

for offset in [(0, 1), (1, 1)]:
    draw.text((TARGET_W / 2 + offset[0], 162 + offset[1]), title_sub, font=font_subtitle, fill=(5, 10, 20, 200), anchor="mm")
draw.text((TARGET_W / 2, 162), title_sub, font=font_subtitle, fill=(235, 215, 165, 240), anchor="mm")

# 3. Bottom badge / band info
badge_text = "LEVEL M4  •  BAND R13"
draw.text((TARGET_W / 2, TARGET_H - 45), badge_text, font=font_badge, fill=(210, 225, 240, 230), anchor="mm")

# Save as WebP
out_path = r"C:\Users\Mahmoud\.gemini\antigravity\brain\3dd91c27-88c3-4b9b-85ec-f14ed63d859d\cover_prototype_sample.webp"
img.convert("RGB").save(out_path, "WEBP", quality=90)
print(f"Cover generated at: {out_path} ({os.path.getsize(out_path)} bytes)")
