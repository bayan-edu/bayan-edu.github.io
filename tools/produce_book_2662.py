import sys
sys.path.append('tools')
from canva_pipeline import create_and_produce_cover

brief = (
    'Book cover design titled "Safe at Any Speed". The title "Safe at Any Speed" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. AUTOMOTIVE SAFETY ENGINEERING STYLE: A high-tech vehicle crash safety testing facility in bright industrial daylight. A high-strength passenger safety cage with an engineered crumple zone absorbing impact energy, showing modern three-point nylon seatbelts, deployed airbag cushions, and clean computer simulation stress-strain color maps (finite element analysis) under bright studio spotlights. Palette: safety cage steel silver, airbag fabric crisp white, stress-strain map rainbow gradient, and test facility clean white. Automotive safety, impact biomechanics, passenger protection engineering, technological innovation, authoritative and educational. STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. Aspect ratio 2:3 vertical book jacket.'
)

if __name__ == '__main__':
    res = create_and_produce_cover(2662, brief, 'Safe at Any Speed automotive safety seatbelt crumple zone crash test dummy')
    print("SUCCESS:", res)
