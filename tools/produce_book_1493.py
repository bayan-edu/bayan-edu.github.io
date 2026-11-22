import sys
sys.path.append('tools')
from canva_pipeline import create_and_produce_cover

brief = (
    'Book cover design titled "A Tree\'s Heart". The title "A Tree\'s Heart" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. BRIGHT DENDROLOGY & TREE RING CHRONOLOGY DAYLIGHT STYLE: A sunlit, peaceful woodland clearing in radiant morning daylight. In the center foreground, a polished cross-section of a magnificent ancient oak tree trunk, clearly displaying concentric annual growth rings, heartwood, sapwood, and cambium layers. Around the stump, fresh green oak seedlings sprout from fertile soil, acorns rest among fallen leaves, and sunbeams filter through a lush emerald forest canopy under a clear sky. Palette: tree ring heartwood rich amber and warm umber, seedlings fresh lime green, forest canopy deep emerald, and sunlight golden. Dendrology, tree growth rings, botany, forest ecology, life cycles of trees, wholesome, peaceful, educational, completely daylight. STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. Aspect ratio 2:3 vertical book jacket.'
)

if __name__ == '__main__':
    res = create_and_produce_cover(1493, brief, 'A Trees Heart')
    print("SUCCESS:", res)
