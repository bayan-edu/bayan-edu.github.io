import sys
sys.path.append('tools')
from canva_pipeline import create_and_produce_cover

brief = (
    'Book cover design titled "The Inventor of the Telephone". '
    'The title "The Inventor of the Telephone" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. '
    'BRIGHT HISTORICAL TELECOMMUNICATIONS DAYLIGHT STYLE: A sunlit, fascinating 19th-century acoustics and electrical invention laboratory on a bright sunny day in natural daylight. '
    'In the center foreground, on a rich mahogany workbench: an authentic antique brass-and-wood acoustic liquid transmitter telephone prototype with a conical speaking funnel, coils of bright copper wire, and a glass galvanic wet-cell battery. '
    'Beside it, vibrating brass acoustic tuning forks with visible soundwave ripples, and open technical blueprint diagrams of acoustic diaphragms catching warm morning sunbeams. '
    'In the background, sunlit laboratory shelves filled with glass chemistry jars, telegraph keys, and a window overlooking a clear blue sky. '
    'Palette: polished brass gold, mahogany warm brown, copper orange, and sunny laboratory daylight. '
    'History of technology, Alexander Graham Bell, telephone invention, telecommunications, bright, educational, classic, completely daylight. '
    'STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. '
    'NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. '
    'Aspect ratio 2:3 vertical book jacket.'
)

if __name__ == '__main__':
    res = create_and_produce_cover(1026, brief, "The Inventor of the Telephone")
    print("SUCCESS:", res)
