import sys
sys.path.append('tools')
from canva_pipeline import create_and_produce_cover

brief = (
    'Book cover design titled "Literature: Lord Jim". The title "Lord Jim" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. BRIGHT TROPICAL MARITIME HARBOR DAYLIGHT STYLE: A sun-drenched maritime anchorage in the tropical East Indies under brilliant daylight. In the center foreground, the teak deck of a sailing ship with a polished brass binnacle compass, ship\'s wooden steering wheel, coiled manila mooring ropes, and a brass marine sextant catching dazzling morning sunbeams. In the background across turquoise harbor waters, a vintage iron steamship rests near lush green tropical volcanic islands under a clear azure sky. Palette: ship teak warm amber, binnacle brass polished gold, ocean water sparkling turquoise, and island jungle emerald. Maritime literature, tropical seafaring, Joseph Conrad classic, nautical adventures, bright, educational, completely daylight. STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. Aspect ratio 2:3 vertical book jacket.'
)

if __name__ == '__main__':
    res = create_and_produce_cover(1370, brief, 'Literature Lord Jim')
    print("SUCCESS:", res)
