import sys
sys.path.append('tools')
from canva_pipeline import create_and_produce_cover

brief = (
    'Book cover design titled "Seeing Stars". The title "Seeing Stars" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. OBSERVATIONAL ASTRONOMY & STELLAR CONSTELLATIONS STYLE: A serene, inspiring mountaintop astronomy terrace at twilight dawn transition. On an outdoor wooden observation table: high-power astronomical binoculars on a sturdy brass tripod, a rotatable planisphere star wheel chart, and a red-beam astronomer\'s flashlight. In the deep celestial sky above, prominent constellations (Ursa Major, Orion, and the Pleiades cluster) connected by delicate geometric constellation lines, with twinkling stars graded by stellar magnitude brightness. Palette: celestial deep sapphire, star twinkle gold, constellation cyan, brass telescope amber, and mountain horizon glow. Amateur astronomy, star gazing, constellation navigation, stellar science, magical and educational. STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. Aspect ratio 2:3 vertical book jacket.'
)

if __name__ == '__main__':
    res = create_and_produce_cover(1715, brief, 'Seeing Stars observational astronomy stellar constellations')
    print("SUCCESS:", res)
