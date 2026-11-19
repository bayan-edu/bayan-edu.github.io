import json

with open(r'C:\Downloads\library-drafts\cover_queue_198.json', 'r', encoding='utf-8') as f:
    q = json.load(f)

print(f"Total in queue: {len(q)}")
remaining = [x for x in q if x['lesson_id'] >= 861]
print(f"Remaining from 861: {len(remaining)}")
for x in remaining[:15]:
    print(f"{x['lesson_id']}: {x['title']} | Band: {x.get('band','')} | Strand: {x.get('strand','')}")
