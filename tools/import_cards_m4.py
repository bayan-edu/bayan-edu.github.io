import sys, os, glob, json, re
sys.path.append(os.path.dirname(__file__))
from db_helper import query

# 1. Match each file to its lesson in subject 7
lessons = query("""
SELECT l.id, l.title, l.author_key, l.course_id 
FROM lessons l 
JOIN courses c ON c.id = l.course_id 
WHERE c.subject_id = 7;
""")

files = sorted(glob.glob(r'C:\Downloads\library-drafts\*.cards.json') + glob.glob(r'C:\Downloads\library-drafts\fixed\*.cards.json'))

matched_cards = [] # list of (lesson_id, card_dict)

for f in files:
    fname = os.path.basename(f)
    base = fname.replace('.cards.json', '')
    clean = re.sub(r'^R\d+_', '', base)
    
    cards = json.load(open(f, 'r', encoding='utf-8'))
    
    found = None
    for l in lessons:
        ak = (l.get('author_key') or '').lower()
        lt = (l.get('title') or '').lower()
        norm_ak = re.sub(r'[^a-z0-9]', '', ak)
        norm_clean = re.sub(r'[^a-z0-9]', '', clean.lower())
        norm_title = re.sub(r'[^a-z0-9]', '', lt)
        
        if norm_clean.startswith(norm_ak.replace('rwr', '')) or norm_ak.startswith('rw' + norm_clean[:20]):
            found = l; break
        if norm_clean[:15] in norm_title or norm_title[:15] in norm_clean:
            found = l; break

    if not found:
        print(f"Error: unmatched file {fname}")
        sys.exit(1)
        
    for c in cards:
        matched_cards.append((found['id'], c))

print(f"Loaded {len(matched_cards)} card instances across {len(files)} files.")

# Build SQL
sql_lines = [
    "BEGIN;",
    "-- 1. Get or create official deck for Subject 7",
    "INSERT INTO public.decks (subject_id, level_id, owner_id, title, position, created_by)",
    "VALUES (7, NULL, NULL, 'بطاقات مكتبة بيان', 1, NULL)",
    "ON CONFLICT (subject_id, COALESCE(level_id, 0)) WHERE owner_id IS NULL DO NOTHING;",
    "",
    "DO $$",
    "DECLARE",
    "  v_deck bigint;",
    "  v_cid bigint;",
    "BEGIN",
    "  SELECT id INTO v_deck FROM public.decks WHERE subject_id = 7 AND level_id IS NULL AND owner_id IS NULL;",
    "  IF v_deck IS NULL THEN RAISE EXCEPTION 'No deck found'; END IF;",
]

for lid, c in matched_cards:
    term = c.get('term', '').replace("'", "''").strip()
    ar = c.get('ar', '').replace("'", "''").strip()
    en = c.get('en', '').replace("'", "''").strip()
    ex = c.get('ex', '').replace("'", "''").strip()
    
    # Back: Arabic translation · English definition
    if en:
        back = f"{ar} · {en}"
    else:
        back = ar
        
    note = ex
    
    sql_lines.append(f"""
  INSERT INTO public.cards (deck_id, front, back, note, lang, position, created_by)
  VALUES (v_deck, '{term}', '{back}', NULLIF('{note}', ''), 'en', 0, NULL)
  ON CONFLICT (deck_id, front_key) DO UPDATE
    SET back = EXCLUDED.back,
        note = COALESCE(EXCLUDED.note, cards.note)
  RETURNING id INTO v_cid;

  INSERT INTO public.card_lessons (card_id, lesson_id, created_by)
  VALUES (v_cid, {lid}, NULL)
  ON CONFLICT DO NOTHING;
""")

sql_lines.append("END $$;")
sql_lines.append("COMMIT;")
sql_lines.append("""
SELECT 
  (SELECT count(*) FROM cards WHERE deck_id = (SELECT id FROM decks WHERE subject_id = 7 AND level_id IS NULL AND owner_id IS NULL)) as total_cards_in_deck,
  (SELECT count(*) FROM card_lessons WHERE lesson_id IN (SELECT l.id FROM lessons l JOIN courses c ON c.id = l.course_id WHERE c.subject_id = 7)) as total_card_lesson_links;
""")

full_sql = "\n".join(sql_lines)
print("Executing live commit...")
res = query(full_sql)
print("Commit result:")
print(json.dumps(res, ensure_ascii=False, indent=2))

