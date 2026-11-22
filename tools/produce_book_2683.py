import sys
sys.path.append('tools')
from canva_pipeline import create_and_produce_cover

brief = (
    'Book cover design titled "Happy Maths : Shapes and Data". The title "Happy Maths: Shapes and Data" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. GEOMETRY AND DATA VISUALIZATION DAYLIGHT STYLE: A bright, sunlit modern mathematics desk in daytime. Arranged with joy are colorful wooden 3D geometric shapes: a golden sphere, a cyan cube, a coral cone, and an emerald pyramid, beside a 3D wooden block bar chart and a colorful pie chart puzzle, with geometric drawing compasses and rulers on graph paper under sunny window light. Palette: geometric solids bright primary and pastel hues, graph paper crisp white with blue grid, and desk light pine wood. Geometry, 3D shapes, data charts, early mathematical thinking, vibrant, playful and educational. STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. Aspect ratio 2:3 vertical book jacket.'
)

if __name__ == '__main__':
    res = create_and_produce_cover(2683, brief, 'Happy Maths Shapes Data geometry 3D shapes bar charts pie chart math')
    print("SUCCESS:", res)
