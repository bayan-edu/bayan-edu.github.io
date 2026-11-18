import sys, os
sys.path.append(os.path.dirname(__file__))
from db_helper import query
import json

routines = ['import_quiz', 'import_texts', 'import_cards', 'link_cards_lesson', 'set_card_lessons', 'save_lesson', 'save_quiz']
for r in routines:
    rows = query(f"SELECT proname, pg_get_function_arguments(oid) as args, pg_get_functiondef(oid) as def FROM pg_proc WHERE proname = '{r}';")
    print(f"=== {r} ===")
    for row in rows:
        print(f"Signature: {row['proname']}({row['args']})")
        # print first 500 chars of def
        print(row['def'][:600])
        print("---")
