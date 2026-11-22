import sys
sys.path.append('tools')
from canva_pipeline import create_and_produce_cover

brief = (
    'Book cover design titled "In the Center of a Group of Planets". The title "At the Center of the Planets" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. HELIOPHYSICS & SOLAR GRAVITATION STYLE: A breathtaking, high-detail view of our Sun reigning supreme at the center of the solar system. The radiant golden surface of the Sun showing granular convection cells, dark magnetic sunspots, and graceful looping coronal prominences. Concentric glowing elliptical planetary orbit lines extending outward with scale miniature planets (Mercury, Venus, Earth, Mars, Jupiter, Saturn) tracing their paths. Palette: thermonuclear solar gold and brilliant white, prominence fiery coral, coronal amber glow, and deep space navy. Solar physics, heliocentric solar system, gravitational center, solar corona, majestic, grand, and educational. STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. Aspect ratio 2:3 vertical book jacket.'
)

if __name__ == '__main__':
    res = create_and_produce_cover(1790, brief, 'Center Group of Planets solar physics heliophysics sun core')
    print("SUCCESS:", res)
