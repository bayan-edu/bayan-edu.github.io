import sys, json, os
sys.path.append('tools')
from db_helper import query

def build_prompts():
    books = query("""
    SELECT l.id, c.id as course_id, coalesce(lv.code, '') as band, l.title, coalesce(s.code, '') as strand
    FROM lessons l
    JOIN courses c ON c.id = l.course_id
    LEFT JOIN levels lv ON lv.id = c.level_id
    LEFT JOIN strands s ON s.id = l.strand_id
    WHERE c.subject_id = 7 AND l.cover IS NULL
    ORDER BY lv.code, l.position, l.id;
    """)
    
    print(f"Total remaining books to prepare specs for: {len(books)}")
    specs = []
    
    for b in books:
        lid = b['id']
        title = b['title']
        band = b['band']
        strand = b['strand']
        
        prompt = (
            f"Professional editorial book cover for an educational library story titled '{title}'. "
            f"The English title '{title}' must be clearly and elegantly displayed at the top in clean typography. "
            f"STRICT RULES: "
            f"1. ABSOLUTELY NO VISIBLE HUMAN FACES (use objects, animals, landscapes, macro details, or distant silhouettes without facial features). "
            f"2. DO NOT INCLUDE ANY AUTHOR NAME. Leave author field completely blank. No 'by', no writer names at all. Only the book title. "
            f"3. Premium book jacket aesthetic, rich color palette, cinematic lighting, 2:3 vertical aspect ratio."
        )
        
        specs.append({
            "lesson_id": lid,
            "title": title,
            "band": band,
            "strand": strand,
            "prompt": prompt
        })
        
    out_path = r"C:\Downloads\library-drafts\cover_queue_198.json"
    with open(out_path, "w", encoding="utf-8") as f:
        json.dump(specs, f, indent=2, ensure_ascii=False)
        
    print(f"Saved {len(specs)} cover specifications to {out_path}")

if __name__ == "__main__":
    build_prompts()
