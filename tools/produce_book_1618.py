import sys
sys.path.append('tools')
from canva_pipeline import create_and_produce_cover

brief = (
    'Book cover design titled "Designing the First Flying Machine". The title "Designing the Flying Machine" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. EARLY AVIATION & AERODYNAMIC DESIGN DAYLIGHT STYLE: A bright, sunlit coastal sand dune on a windy morning at Kitty Hawk under clear skies. In the center foreground, a beautifully constructed early biplane glider made of lightweight spruce wood ribs, white muslin canvas wings, and tensioned bicycle spoke wire rigging. On an outdoor wooden trestle table: hand-drawn cambered wing airfoil cross-section diagrams, a brass wind-tunnel testing lift balance, wooden carving chisels, and spruce propellers. Palette: muslin canvas white, spruce wood honey, dune sand beige, wire chrome silver, and coastal blue sky. Aviation history, aerodynamic engineering, wing lift, pioneering flight, inspiring and educational. STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. Aspect ratio 2:3 vertical book jacket.'
)

if __name__ == '__main__':
    res = create_and_produce_cover(1618, brief, 'Designing the First Flying Machine early aviation aerodynamics glider')
    print("SUCCESS:", res)
