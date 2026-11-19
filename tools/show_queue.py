import sys
sys.path.append('tools')
from auto_batch_covers import get_remaining_queue

rem = get_remaining_queue()
print(f"Total remaining in queue: {len(rem)}")
for i, b in enumerate(rem):
    print(f"{i+1}. ID {b['lesson_id']}: {b['title']} (Band: {b.get('band','')}, Strand: {b.get('strand','')})")
