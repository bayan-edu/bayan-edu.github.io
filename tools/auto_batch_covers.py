import sys, json, os, time
sys.path.append('tools')
from db_helper import query
from cover_pipeline import upload_and_set_cover, get_auth_token
from process_and_upload import process_and_upload_cover

QUEUE_FILE = r"C:\Downloads\library-drafts\cover_queue_198.json"

def get_remaining_queue():
    if not os.path.exists(QUEUE_FILE):
        print("Queue file not found!")
        return []
        
    with open(QUEUE_FILE, "r", encoding="utf-8") as f:
        queue = json.load(f)
        
    # Filter out already covered books from DB
    res = query("SELECT id FROM lessons WHERE subject_id = 7 AND cover IS NOT NULL;") if False else []
    covered_ids = set([x['id'] for x in query("SELECT l.id FROM lessons l JOIN courses c ON c.id = l.course_id WHERE c.subject_id = 7 AND l.cover IS NOT NULL;")])
    
    remaining = [b for b in queue if b['lesson_id'] not in covered_ids]
    return remaining

def print_status():
    covered = query("SELECT count(*) as count FROM lessons l JOIN courses c ON c.id = l.course_id WHERE c.subject_id = 7 AND l.cover IS NOT NULL;")[0]['count']
    total = query("SELECT count(*) as count FROM lessons l JOIN courses c ON c.id = l.course_id WHERE c.subject_id = 7;")[0]['count']
    print(f"Bayan Library Cover Progress: {covered}/{total} covered ({total - covered} remaining).")

if __name__ == "__main__":
    print_status()
    remaining = get_remaining_queue()
    print(f"Remaining in queue: {len(remaining)} books.")
    if remaining:
        print(f"Next book ready: ID {remaining[0]['lesson_id']} - '{remaining[0]['title']}'")
