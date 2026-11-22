import sys
sys.path.append('tools')
from canva_pipeline import create_and_produce_cover

brief = (
    'Book cover design titled "Crashing, Jumping, Falling". The title "Crashing, Jumping, Falling" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. DYNAMIC CLASSICAL MECHANICS PHYSICS LAB DAYLIGHT STYLE: A brightly lit, spacious modern physics laboratory bathed in natural window light. In the center foreground, an elegant chrome Newton\'s cradle with suspended steel spheres in mid-motion swing, demonstrating conservation of momentum. Beside it, a stroboscopic parabolic trajectory showing a bouncing basketball and colorful bouncing polymer spheres showing kinetic and potential energy vectors. A miniature inclined ramp with low-friction carts and digital timing photogates on a polished blonde-wood workbench. Palette: chrome silver, dynamic kinetic orange, royal blue, wooden oak, and clean bright lab white. Physics of motion, gravity, momentum, kinetic energy, cheerful and clear educational design. STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. Aspect ratio 2:3 vertical book jacket.'
)

if __name__ == '__main__':
    res = create_and_produce_cover(1569, brief, 'Crashing Jumping Falling classical physics motion kinetics')
    print("SUCCESS:", res)
