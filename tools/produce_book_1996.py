import sys
sys.path.append('tools')
from canva_pipeline import create_and_produce_cover

brief = (
    'Book cover design titled "AN ALIEN SHIP LANDS IN SCHOOL DURING MATHS PERIOD". The title "AN ALIEN SHIP LANDS IN SCHOOL DURING MATHS PERIOD" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. PLAYFUL SCI-FI MATHEMATICS DAYLIGHT STYLE: A bright, sunlit school courtyard on a clear sunny afternoon. Hovering gently just above the lawn is a sleek, polished silver extraterrestrial flying saucer spacecraft, projecting whimsical, glowing geometric holograms of 3D polyhedra, golden spirals, fractal triangles, and mathematical formulas into the air. In the foreground, a wooden school desk with a large yellow wooden ruler, brass compass, protractor, and colorful geometric blocks basking in the sun. Palette: saucer sleek chrome silver, mathematical holograms neon lime and electric cyan, schoolyard sunny green, and sky bright blue. Geometry in the universe, playful math concepts, sci-fi imagination, energetic and educational. STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. Aspect ratio 2:3 vertical book jacket.'
)

if __name__ == '__main__':
    res = create_and_produce_cover(1996, brief, 'Alien ship lands maths geometry spacecraft schoolyard geometry shapes')
    print("SUCCESS:", res)
