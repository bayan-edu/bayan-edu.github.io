import glob, os, json

print('=== CHECKING IMPORT FOLDERS ===')
for d in sorted(glob.glob(r'C:\Downloads\library-drafts\import\*')):
    name = os.path.basename(d)
    mpath = os.path.join(d, 'manifest.json')
    if not os.path.exists(mpath): continue
    m = json.load(open(mpath, encoding='utf-8'))
    sqls = [os.path.basename(f) for f in glob.glob(os.path.join(d, '*.sql'))]
    fulls = len(glob.glob(os.path.join(d, '*.full.json')))
    quizzes = len(glob.glob(os.path.join(d, 'quiz-*.json'))) - fulls
    print(f'{name:6} | Course: {m.get("course")} | Books: {m.get("books")} | Quizzes: {quizzes} | Fulls: {fulls} | SQLs: {len(sqls)}')
