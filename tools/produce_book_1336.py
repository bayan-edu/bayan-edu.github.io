import sys
sys.path.append('tools')
from canva_pipeline import create_and_produce_cover

brief = (
    'Book cover design titled "Valley Nuts". The title "Valley Nuts" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. BRIGHT CALIFORNIA ALMOND ORCHARD DAYLIGHT STYLE: A sun-drenched, blooming California Central Valley almond orchard in radiant spring daylight. In the center foreground, rows of mature almond trees covered in a breathtaking snow-white and blush-pink canopy of blossoms under a cloudless blue sky. In the foreground on a rustic wooden orchard crate, green velvety almond hulls on a leafy twig beside cracked wooden shells and wholesome golden roasted almonds in a burlap sack. Palette: almond blossom white and blush pink, foliage spring green, almond kernels golden tan, and sky brilliant azure. Agricultural horticulture, almond farming, Central Valley agriculture, tree nuts, wholesome, bright, educational, completely daylight. STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. Aspect ratio 2:3 vertical book jacket.'
)

if __name__ == '__main__':
    res = create_and_produce_cover(1336, brief, 'Valley Nuts')
    print("SUCCESS:", res)
