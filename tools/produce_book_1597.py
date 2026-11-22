import sys
sys.path.append('tools')
from canva_pipeline import create_and_produce_cover

brief = (
    'Book cover design titled "The Problem Solvers". The title "The Problem Solvers" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. BRIGHT INNOVATIVE MAKER WORKSHOP & ENGINEERING DESIGN STYLE: A cheerful, brightly illuminated collaborative STEM workshop bathed in morning daylight. On a large blonde-wood design table: colorful 3D-printed prototype gears, robotic chassis components, brass calipers, and drafting compasses. Open engineering graph-paper notebooks with sketches, flowcharts of the design thinking cycle (Ask, Imagine, Plan, Create, Improve), and building blocks. Palette: bright maker orange, blueprint cyan, lime green, clean timber blond, and sunny white. Engineering design process, problem solving, innovation, hands-on science, inspiring and energetic. STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. Aspect ratio 2:3 vertical book jacket.'
)

if __name__ == '__main__':
    res = create_and_produce_cover(1597, brief, 'The Problem Solvers engineering design process innovation')
    print("SUCCESS:", res)
