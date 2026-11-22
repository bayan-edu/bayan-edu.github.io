import sys
sys.path.append('tools')
from canva_pipeline import create_and_produce_cover

brief = (
    'Book cover design titled "Where Am I?". The title "Where Am I?" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. GLOBAL SATELLITE NAVIGATION & CARTOGRAPHY DAYLIGHT STYLE: A sunlit, high-tech cartography and navigation explorer desk. In the center foreground, a rugged handheld GPS receiver displaying digital topographic elevation contours and precise latitude-longitude coordinates. Beside it, a traditional brass mariner\'s compass, a folded paper geological map, and a brass drafting divider. Overhead in daylight, a 3D orbital diagram showing a constellation of GPS satellites transmitting trilateration signal beams to the surface of Earth. Palette: navigation cyan, map parchment cream, brass gold, satellite solar blue, and mountain green. Satellite navigation, GPS technology, cartography, triangulation, geometry of positioning, clear and engaging. STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. Aspect ratio 2:3 vertical book jacket.'
)

if __name__ == '__main__':
    res = create_and_produce_cover(1637, brief, 'Where Am I satellite navigation GPS cartography')
    print("SUCCESS:", res)
