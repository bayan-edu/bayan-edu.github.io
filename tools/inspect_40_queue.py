import sys
sys.path.append('tools')
from auto_batch_covers import get_remaining_queue
from db_helper import query

rem = get_remaining_queue()
ids = [b['lesson_id'] for b in rem]
rows = query(f"SELECT id, title, summary FROM lessons WHERE id IN ({','.join(map(str, ids))});")
lookup = {r['id']: r for r in rows}

print(f"Total remaining in queue: {len(rem)}")
for b in rem[:15]:
    lid = b['lesson_id']
    info = lookup.get(lid, {})
    print(f"ID {lid}: '{b['title']}' ({b.get('band','')})")
    print(f"  Summary: {info.get('summary')}")
