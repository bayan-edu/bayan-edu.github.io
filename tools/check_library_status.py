import sys
sys.path.append('tools')
from db_helper import query

missing = query("""
    SELECT l.id, l.title, l.author_key, p.body as passage_body
    FROM lessons l
    LEFT JOIN quizzes q ON q.code = l.author_key
    LEFT JOIN passages p ON p.quiz_id = q.id
    WHERE l.subject_id = 7 AND (l.cover IS NULL OR l.cover = '')
    ORDER BY l.id ASC
    LIMIT 10
""")

print(f"Loaded {len(missing)} missing books with text:")
for b in missing:
    body = (b['passage_body'] or '')[:100].replace('\n', ' ')
    print(f"📖 {b['id']}: {b['title']} -> {body}...")
