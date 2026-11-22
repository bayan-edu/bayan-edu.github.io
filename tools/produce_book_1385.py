import sys
sys.path.append('tools')
from canva_pipeline import create_and_produce_cover

brief = (
    'Book cover design titled "Reading: The Merchant of Venice". The title "The Merchant of Venice" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. BRIGHT VENETIAN RIALTO DAYLIGHT STYLE: A sun-drenched, magnificent view of Venice\'s Grand Canal and Rialto bridge on a clear morning in bright daylight. In the center foreground, on a merchant\'s stone balustrade: an ornate brass merchant\'s balance scale weighing gleaming gold Venetian ducat coins, beside an open parchment contract scroll sealed with red wax, and a quill pen. In the background, gondolas glide gracefully across sparkling turquoise waters past historic Venetian Gothic palazzos under a radiant azure sky. Palette: canal sparkling turquoise, palazzo terracotta and white marble, ducat coin brilliant gold, and sky sunny cyan. Shakespearean literature, Venetian history, Renaissance commerce, classic drama, bright, majestic, educational, completely daylight. STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. Aspect ratio 2:3 vertical book jacket.'
)

if __name__ == '__main__':
    res = create_and_produce_cover(1385, brief, 'Reading The Merchant of Venice')
    print("SUCCESS:", res)
