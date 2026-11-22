import sys
sys.path.append('tools')
from canva_pipeline import create_and_produce_cover

brief = (
    'Book cover design titled "Designing from Scratch". The title "Designing from Scratch" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. BRIGHT GREEN TECH PRODUCT DESIGN STUDIO DAYLIGHT STYLE: A sunlit industrial design studio on a bright morning in natural daylight. In the center foreground, a wooden drafting workbench featuring modular smartphone component prototypes made of plant-based bioplastics, recycled aluminum chassis, and flexible solar cells. Beside them, an open digital drawing tablet with stylus showing 3D CAD design models, vernier calipers, and color swatch wheels under bright skylights. Palette: bioplastic natural sage green and ivory, aluminum sleek silver, blueprint cyan, and studio daylight bright white. Industrial design, green technology, sustainable product engineering, innovation, bright, forward-looking, educational. STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. Aspect ratio 2:3 vertical book jacket.'
)

if __name__ == '__main__':
    res = create_and_produce_cover(1511, brief, 'Designing from Scratch')
    print("SUCCESS:", res)
