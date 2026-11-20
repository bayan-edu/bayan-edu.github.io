import sys
sys.path.append('tools')
from db_helper import query
rows = query('SELECT id, title, summary FROM lessons WHERE id BETWEEN 686 AND 698 ORDER BY id;')
for r in rows:
    print(f"ID {r['id']}: '{r['title']}' -> {r['summary']}")
