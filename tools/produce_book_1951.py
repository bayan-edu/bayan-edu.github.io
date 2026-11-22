import sys
sys.path.append('tools')
from canva_pipeline import create_and_produce_cover

brief = (
    'Book cover design titled "Navigation in the Age of Exploration". The title "Navigation in the Age of Exploration" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. HISTORICAL MARITIME CARTOGRAPHY DAYLIGHT STYLE: A sunlit explorer\'s navigation table aboard a classic wooden ship on a bright open ocean morning. In the foreground, an exquisite polished brass sextant, an ornate brass astrolabe, a dry-card compass rose, and an open rolled parchment map chart of the oceans, with brass calipers and an hourglass. Through the window, the bright blue horizon of the sea under sunlit fluffy clouds. Palette: polished brass gleaming gold, vintage parchment warm sepia, mahogany wood deep amber, and ocean azure. Celestial navigation, maritime exploration history, instruments of cartography, refined and educational. STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. Aspect ratio 2:3 vertical book jacket.'
)

if __name__ == '__main__':
    res = create_and_produce_cover(1951, brief, 'Navigation in the Age of Exploration sextant astrolabe cartography')
    print("SUCCESS:", res)
