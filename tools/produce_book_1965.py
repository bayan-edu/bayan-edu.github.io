import sys
sys.path.append('tools')
from canva_pipeline import create_and_produce_cover

brief = (
    'Book cover design titled "Benjamin Franklin and Electricity". The title "Benjamin Franklin and Electricity" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. HISTORICAL PHYSICS DISCOVERY STYLE: The iconic scientific breakthrough of electrical discovery. In the foreground, a classic diamond-shaped silk kite with a metallic lightning rod tip soaring near dramatic stormy clouds, with a conductive hemp cord leading down to a suspended antique brass door key sparkling with vivid electrical static corona. Beside it on a wooden table sits a glass Leyden jar storing electric charge. Palette: lightning electric blue, brass key gleaming gold, storm clouds dramatic slate grey, and silk kite warm ivory. History of physics, electricity discovery, scientific experimentation, electrifying and educational. STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. Aspect ratio 2:3 vertical book jacket.'
)

if __name__ == '__main__':
    res = create_and_produce_cover(1965, brief, 'Benjamin Franklin and Electricity kite experiment Leyden jar lightning')
    print("SUCCESS:", res)
