import sys, json
sys.path.append('tools')
from db_helper import query

books = query("""
SELECT l.id, l.title, coalesce(l.summary, '') as summary, coalesce(lv.code, '') as band, coalesce(s.code, '') as strand
FROM lessons l
JOIN courses c ON c.id = l.course_id
LEFT JOIN levels lv ON lv.id = c.level_id
LEFT JOIN strands s ON s.id = l.strand_id
WHERE c.subject_id = 7 AND l.cover IS NULL
ORDER BY lv.code, l.position, l.id;
""")

print(f"Fetched {len(books)} books.")
for b in books:
    print(f"ID {b['id']} [{b['band']} - {b['strand']}]: {b['title']} -> {b['summary'][:100]}")
