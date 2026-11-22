import sys
sys.path.append('tools')
from canva_pipeline import create_and_produce_cover

brief = (
    'Book cover design titled "Sir Isaac Newton and LeBron James". The title "Sir Isaac Newton & Athletic Physics" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. CLASSICAL GRAVITY & MODERN ATHLETIC PHYSICS STYLE: A clever, sunlit conceptual scene combining classical science with basketball physics. In the center, a crisp red apple falling from a leafy green tree branch beside a bright regulation orange basketball swooshing downward toward a basketball hoop. Dynamic glowing parabolic trajectory arcs, gravitational force vectors (F = ma), impulse momentum equations, and bounce elasticity graphics in radiant sunshine. A polished hardwood basketball court blending into a grassy English garden under a brilliant blue sky. Palette: regulation basketball orange, apple crimson red, court hardwood gold, lawn green, and sky cyan. Physics of motion, gravity, Newton\'s laws, athletic kinetics, creative and engaging. STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. Aspect ratio 2:3 vertical book jacket.'
)

if __name__ == '__main__':
    res = create_and_produce_cover(1578, brief, 'Newton and LeBron James physics of gravity momentum sports')
    print("SUCCESS:", res)
