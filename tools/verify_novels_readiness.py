import os, sys, json, re, glob

ROOT = r"C:\Downloads\library-drafts"
EXTRACTED = os.path.join(ROOT, "import", "novels_extracted")
sys.path.insert(0, ROOT)
import build_import_helpers as H

# 1. Load items
sys.path.insert(0, EXTRACTED)
import novels_items

items_dict = novels_items.ITEMS
print(f"=== 1. ITEMS COUNT ===")
print(f"Total novel keys: {len(items_dict)}")
print(f"Total questions: {sum(len(v) for v in items_dict.values())}")

# 2. Verify evidence matching against cleaned_novels
print(f"\n=== 2. SENTENCE & EVIDENCE MATCHING ===")
match_errors = []
text_stats = {}

for key, items in items_dict.items():
    txt_path = os.path.join(EXTRACTED, "cleaned_novels", f"{key}.txt")
    if not os.path.exists(txt_path):
        match_errors.append(f"Missing text file: {txt_path}")
        continue
    
    raw = open(txt_path, "r", encoding="utf-8-sig").read()
    lines = [l.strip() for l in raw.split("\n") if l.strip()]
    body = "\n\n".join(lines)
    words = len(re.findall(r'\b\w+\b', raw))
    text_stats[key] = {"lines": len(lines), "words": words}
    
    for it in items:
        q_num = it.get("n")
        kind = it.get("kind")
        obj = it.get("obj")
        
        if kind == "point":
            key_lines = it.get("key", [])
            sents = H.body_sents_for_lines(lines, body, key_lines)
            if not sents:
                match_errors.append(f"{key} Q{q_num} (point): no matching sentences for lines {key_lines}")
        elif kind == "order":
            key_lines = it.get("key", [])
            for lidx in key_lines:
                if lidx < 1 or lidx > len(lines):
                    match_errors.append(f"{key} Q{q_num} (order): line index {lidx} out of range (1..{len(lines)})")
        elif kind == "judge":
            for pos, ev in it.get("positions", []):
                sents = H.body_sents_for_lines(lines, body, ev)
                if not sents:
                    match_errors.append(f"{key} Q{q_num} (judge '{pos}'): no matching sentences for lines {ev}")
        else:
            match_errors.append(f"{key} Q{q_num}: unknown kind '{kind}'")

if not match_errors:
    print(f"SUCCESS: Zero matching errors across all {len(items_dict)} novels and 182 questions!")
else:
    print(f"FAILED: Found {len(match_errors)} matching errors:")
    for err in match_errors[:15]:
        print("  -", err)

# 3. Verify packages in novels_import (N21, N22, N24)
print(f"\n=== 3. IMPORT PACKAGES (N21, N22, N24) ===")
for band in ["N21", "N22", "N24"]:
    bp = os.path.join(EXTRACTED, "novels_import", band)
    if not os.path.exists(bp):
        print(f"Missing package folder: {bp}")
        continue
    
    manifest_f = os.path.join(bp, "manifest.json")
    lessons_f = os.path.join(bp, "lessons.json")
    objectives_f = os.path.join(bp, "objectives.json")
    texts_f = os.path.join(bp, "texts.json")
    quizzes = glob.glob(os.path.join(bp, "quiz-*.json"))
    
    manifest = json.load(open(manifest_f, encoding="utf-8")) if os.path.exists(manifest_f) else {}
    lessons = json.load(open(lessons_f, encoding="utf-8")) if os.path.exists(lessons_f) else {}
    texts = json.load(open(texts_f, encoding="utf-8")) if os.path.exists(texts_f) else {}
    objectives = json.load(open(objectives_f, encoding="utf-8")) if os.path.exists(objectives_f) else {}
    
    l_list = lessons.get("lessons", [])
    t_list = texts.get("texts", [])
    
    print(f"\nBand {band}:")
    print(f"  - Manifest course: {manifest.get('course')}, band: {manifest.get('band')}")
    print(f"  - Lessons count: {len(l_list)}")
    print(f"  - Texts count: {len(t_list)}")
    print(f"  - Quizzes count: {len(quizzes)}")
    
    # Check consistency
    l_keys = set(x["key"] for x in l_list)
    t_keys = set(x["lesson"] for x in t_list)
    q_keys = set(os.path.basename(q).replace("quiz-", "").replace(".json", "") for q in quizzes)
    
    diff_lt = l_keys ^ t_keys
    diff_lq = l_keys ^ q_keys
    if diff_lt:
        print(f"  WARNING: Lessons vs Texts mismatch: {diff_lt}")
    if diff_lq:
        print(f"  WARNING: Lessons vs Quizzes mismatch: {diff_lq}")
    if not diff_lt and not diff_lq:
        print(f"  - Lessons, texts, and quizzes match 1:1 ({len(l_keys)} books)!")

print("\nSummary of texts word count:")
for k, s in sorted(text_stats.items()):
    print(f"  {k}: {s['words']} words, {s['lines']} paragraphs")
