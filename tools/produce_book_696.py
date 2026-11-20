import sys
sys.path.append('tools')
from canva_pipeline import create_and_produce_cover

brief = (
    'Book cover design titled "The Cloth Shop". '
    'The title "The Cloth Shop" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. '
    'BRIGHT TEXTILE BAZAAR & COMMERCE DAYLIGHT STYLE: A sunlit, vibrant fabric shop on a bustling sunny morning with warm daylight streaming across a polished wooden counter. '
    'In the center foreground, luxurious bolts and draped rolls of premium woven fabrics in vibrant colors: saffron yellow, royal turquoise, terracotta orange, and embroidered cream cotton. '
    'Resting on the wooden counter is an open hardbound merchant sales ledger with neat records, a vintage brass measuring yardstick with engraved units, and a pair of polished tailor shears. '
    'The shop radiates craftsmanship, integrity, warmth, and colorful abundance in full bright daylight. '
    'Palette: vibrant saffron yellow, rich turquoise blue, terracotta amber, polished mahogany wood, and clean cotton white. '
    'Artisanal, bright, educational, vivid, completely daylight. '
    'STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. '
    'NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. '
    'Aspect ratio 2:3 vertical book jacket.'
)

if __name__ == '__main__':
    res = create_and_produce_cover(696, brief, "The Cloth Shop")
    print("SUCCESS:", res)
