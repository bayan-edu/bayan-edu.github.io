import os, sys, glob, re, subprocess, time
sys.path.append('tools')
from db_helper import query

sys.stdout.reconfigure(line_buffering=True)

def get_uncovered_books():
    sql = "SELECT id, title FROM lessons WHERE subject_id = 7 AND cover IS NULL ORDER BY id ASC;"
    try:
        res = query(sql)
        return res if isinstance(res, list) else []
    except Exception as e:
        print(f"[{time.strftime('%H:%M:%S')}] Warning: get_uncovered_books failed: {e}. Sleeping 10s...")
        time.sleep(10)
        return None

def run():
    print(f"[{time.strftime('%H:%M:%S')}] Starting Daemon Cover Runner...")
    while True:
        uncovered = get_uncovered_books()
        if uncovered is None:
            continue
        if len(uncovered) == 0:
            print(f"[{time.strftime('%H:%M:%S')}] All books in subject 7 now have covers! Exiting runner.")
            break
            
        print(f"[{time.strftime('%H:%M:%S')}] Remaining uncovered books in library: {len(uncovered)}")
        
        # Find next book with a prepared script
        next_to_run = None
        for b in uncovered:
            bid = b['id']
            script_path = os.path.join('tools', f"produce_book_{bid}.py")
            if os.path.exists(script_path):
                next_to_run = (bid, b['title'], script_path)
                break
                
        if not next_to_run:
            print(f"[{time.strftime('%H:%M:%S')}] No prepared script found for remaining books. Sleeping 60s...")
            time.sleep(60)
            continue
            
        bid, title, script_path = next_to_run
        print(f"[{time.strftime('%H:%M:%S')}] ==================================================")
        print(f"[{time.strftime('%H:%M:%S')}] >>> PROCESSING BOOK {bid}: '{title}'")
        print(f"[{time.strftime('%H:%M:%S')}] >>> Script: {script_path}")
        print(f"[{time.strftime('%H:%M:%S')}] ==================================================")
        
        # Run the script
        try:
            p = subprocess.run([sys.executable, script_path], check=True)
            print(f"[{time.strftime('%H:%M:%S')}] >>> Successfully finished Book {bid}!")
        except subprocess.CalledProcessError as e:
            print(f"[{time.strftime('%H:%M:%S')}] >>> Error processing Book {bid}: exit code {e.returncode}. Sleeping 30s before retry...")
            time.sleep(30)
            continue
            
        # Give a short pause between scripts (canva_pipeline handles the ~285s cooldown automatically on create-design)
        time.sleep(5)

if __name__ == '__main__':
    run()
