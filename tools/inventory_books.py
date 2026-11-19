import sys, json
sys.path.append('tools')
from db_helper import query

q = """
SELECT 
  l.id,
  c.id as course_id,
  coalesce(lv.code, 'NoLevel') as band,
  coalesce(lv.name, '') as level_name,
  l.title,
  l.author_key,
  coalesce(s.code, '') as strand_code,
  coalesce(s.name, '') as strand_name,
  l.position
FROM lessons l
JOIN courses c ON c.id = l.course_id
LEFT JOIN levels lv ON lv.id = c.level_id
LEFT JOIN strands s ON s.id = l.strand_id
WHERE c.subject_id = 7
ORDER BY lv.code, l.position, l.id;
"""
books = query(q)
print(f"Total books in Subject 7: {len(books)}")

# Group by band
by_band = {}
for b in books:
    band = b['band']
    by_band.setdefault(band, []).append(b)

print(f"Bands count: {len(by_band)}")
for band, bks in sorted(by_band.items()):
    print(f"Band {band}: {len(bks)} books")
    for b in bks[:3]:
        print(f"   [{b['id']}] {b['title']} ({b['strand_name']})")
    if len(bks) > 3:
        print(f"   ... and {len(bks) - 3} more")

# Save inventory to json for tooling
with open(r"C:\Downloads\library-drafts\all_182_books_inventory.json", "w", encoding="utf-8") as f:
    json.dump(books, f, ensure_ascii=False, indent=2)
print("Saved inventory to C:\\Downloads\\library-drafts\\all_182_books_inventory.json")
