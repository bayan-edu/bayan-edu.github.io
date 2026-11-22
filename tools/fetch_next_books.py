import sys
sys.path.append('tools')
from db_helper import query

sql = """
SELECT l.id, l.title, l.author_key, substring(p.body from 1 for 300) as snippet
FROM lessons l
LEFT JOIN quizzes q ON q.code = l.author_key
LEFT JOIN passages p ON p.quiz_id = q.id
WHERE l.subject_id = 7 AND (l.cover IS NULL OR l.cover = '') AND l.id > 1549
ORDER BY l.id ASC
LIMIT 20;
"""

rows = query(sql)
for r in rows:
    print(f"ID: {r['id']} | Title: {r['title']} | Key: {r['author_key']}")
    print(f"Snippet: {repr(r['snippet'])}\n")
