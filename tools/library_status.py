import sys
sys.path.append('tools')
from db_helper import query

stats = query('''
SELECT 
    count(*) AS total,
    count(*) FILTER (WHERE cover IS NOT NULL) AS covered,
    count(*) FILTER (WHERE cover IS NULL) AS pending
FROM lessons 
WHERE subject_id = 7;
''')
print('Library Stats:', stats)

courses = query('''
SELECT 
    c.id, c.title, coalesce(lv.code, '') as band,
    count(l.id) as total_books,
    count(l.id) FILTER (WHERE l.cover IS NOT NULL) as covered_books,
    count(l.id) FILTER (WHERE l.cover IS NULL) as pending_books
FROM courses c
LEFT JOIN levels lv ON lv.id = c.level_id
LEFT JOIN lessons l ON l.course_id = c.id
WHERE c.subject_id = 7
GROUP BY c.id, c.title, lv.code
ORDER BY lv.code, c.id;
''')
print('\nCourses Breakdown:')
for c in courses:
    print(f"  Course {c['id']} ({c['band']}) '{c['title']}': {c['covered_books']}/{c['total_books']} covered ({c['pending_books']} pending)")
