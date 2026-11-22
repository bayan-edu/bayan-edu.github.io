import sys
sys.path.append('tools')
from canva_pipeline import create_and_produce_cover

brief = (
    'Book cover design titled "The Secrets of Viking Ships". The title "The Secrets of Viking Ships" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. BRIGHT SCANDINAVIAN FJORD & VIKING LONGSHIP DAYLIGHT STYLE: A sun-drenched Scandinavian fjord on a clear sunny morning in bright daylight. In the center foreground, an authentic wooden Viking longship (drakkar) with overlapping clinker-built oak planks, a carved spiral dragon prow, and a hoisted red-and-white striped woolen square sail resting in crystal-clear fjord waters. On a stone jetty in the foreground rest traditional iron woodworking adzes, iron ship rivets, and a crystalline calcite sunstone navigation crystal catching sunbeams. In the background, sheer granite fjord cliffs and waterfalls rise beneath a clear blue sky. Palette: longship weathered oak and pine, sail red and cream, water sparkling turquoise, and sky clear Nordic cyan. Maritime history, Viking longships, naval architecture, clinker boatbuilding, historic, bright, educational, completely daylight. STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. Aspect ratio 2:3 vertical book jacket.'
)

if __name__ == '__main__':
    res = create_and_produce_cover(1539, brief, 'The Secrets of Viking Ships')
    print("SUCCESS:", res)
