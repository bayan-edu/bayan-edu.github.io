import sys
sys.path.append('tools')
from canva_pipeline import create_and_produce_cover

brief = (
    'Book cover design titled "Habitat Loss". The title "Habitat Loss & Conservation" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. ECOLOGICAL RESTORATION & WILDLIFE CORRIDOR DAYLIGHT STYLE: A sunlit, thought-provoking landscape illustrating habitat reconnection in radiant daylight. In the center, a lush green vegetative wildlife overpass bridge covered in native trees, bushes, and wildflowers safely spanning across an infrastructure highway below. A family of white-tailed deer and a red fox crossing the green wildlife bridge between two vast, healthy protected forest reserves. Clean vector infographics showing landscape connectivity, gene flow restoration, and forest fragment reduction. Palette: forest canopy emerald green, bridge earth terracotta, native flower golden yellow, and clear azure sky. Conservation biology, wildlife corridors, habitat fragmentation, environmental solutions, inspiring and hopeful. STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. Aspect ratio 2:3 vertical book jacket.'
)

if __name__ == '__main__':
    res = create_and_produce_cover(1686, brief, 'Habitat Loss wildlife corridor forest fragmentation conservation')
    print("SUCCESS:", res)
