import os, sys, json, time
sys.path.append('tools')
from db_helper import query
from cover_pipeline import get_books_needing_covers, upload_and_set_cover, get_auth_token

PROGRESS_FILE = r"C:\Downloads\library-drafts\covers_progress.json"

def load_progress():
    if os.path.exists(PROGRESS_FILE):
        return json.load(open(PROGRESS_FILE, encoding='utf-8'))
    return {"completed": [], "total_books": 182, "last_run": None}

def save_progress(prog):
    with open(PROGRESS_FILE, "w", encoding="utf-8") as f:
        json.dump(prog, f, ensure_ascii=False, indent=2)

def get_status_summary():
    sql = """
    SELECT 
      count(*) as total_books,
      count(cover) as with_cover,
      count(*) - count(cover) as remaining
    FROM lessons l
    JOIN courses c ON c.id = l.course_id
    WHERE c.subject_id = 7;
    """
    res = query(sql)[0]
    return res

if __name__ == "__main__":
    st = get_status_summary()
    print(f"Current Library Cover Status: {st['with_cover']} / {st['total_books']} completed, {st['remaining']} remaining.")
