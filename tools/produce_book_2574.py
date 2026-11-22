import sys
sys.path.append('tools')
from canva_pipeline import create_and_produce_cover

brief = (
    'Book cover design titled "Jadav and the Tree-Place". The title "Jadav and the Tree-Place" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. MOLAI FOREST REFORESTATION DAYLIGHT STYLE: A sun-drenched, flourishing forest growing on what was once a barren Brahmaputra river sandbar. Towering bamboo groves, teak trees, and Arjun trees planted over decades, now a thriving wildlife sanctuary where a majestic one-horned rhinoceros grazes peacefully near a watering hole while deer and wild birds feast on wild berries in the golden morning sunshine. Palette: forest foliage deep jade and emerald green, rhino skin textured warm slate, river sandbar gold, and sky sunny cyan. Reforestation triumph, conservation heroism, ecosystem regeneration, inspiring and educational. STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. Aspect ratio 2:3 vertical book jacket.'
)

if __name__ == '__main__':
    res = create_and_produce_cover(2574, brief, 'Jadav Tree Place Molai forest reforestation Assam sandbar wildlife')
    print("SUCCESS:", res)
