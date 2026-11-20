import sys
sys.path.append('tools')
from db_helper import query
rows = query('SELECT id, title, summary FROM lessons WHERE id BETWEEN 675 AND 685 ORDER BY id;')
for r in rows:
    print(f"ID {r['id']}: '{r['title']}' -> {r['summary']}")
