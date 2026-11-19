import os, sys, json
sys.path.append('tools')
from cover_pipeline import upload_and_set_cover, get_auth_token
from PIL import Image

TARGET_W, TARGET_H = 600, 888

def process_and_upload_cover(lesson_id, source_img_path, user_jwt=None):
    if not os.path.exists(source_img_path):
        raise FileNotFoundError(f"Image not found: {source_img_path}")
        
    img = Image.open(source_img_path).convert("RGB")
    w, h = img.size
    scale = max(TARGET_W / w, TARGET_H / h)
    new_w, new_h = int(w * scale), int(h * scale)
    img = img.resize((new_w, new_h), Image.Resampling.LANCZOS)
    
    left = (new_w - TARGET_W) // 2
    top = (new_h - TARGET_H) // 2
    img = img.crop((left, top, left + TARGET_W, top + TARGET_H))
    
    # Save as temporary WebP
    webp_path = source_img_path.rsplit('.', 1)[0] + '.webp'
    img.save(webp_path, "WEBP", quality=90)
    
    res = upload_and_set_cover(lesson_id, webp_path, user_jwt=user_jwt)
    print(f"Successfully uploaded and linked Book {lesson_id}: {res['cover']}")
    return res

if __name__ == "__main__":
    if len(sys.argv) > 2:
        lid = int(sys.argv[1])
        path = sys.argv[2]
        process_and_upload_cover(lid, path)
