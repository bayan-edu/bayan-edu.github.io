import sys
sys.path.append('tools')
from canva_pipeline import create_and_produce_cover

brief = (
    'Book cover design titled "Braking Bad". The title "Braking Bad" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. HIGH-PERFORMANCE MECHANICAL ENGINEERING DAYLIGHT STYLE: A modern, brightly illuminated engineering testing laboratory. In the center foreground, a cross-drilled, ventilated carbon-ceramic disc brake assembly and a gleaming red hydraulic brake caliper in crisp mechanical detail. Subtle, elegant friction velocity arrows, kinetic energy conversion diagrams, and heat dissipation vector graphics illustrating deceleration physics. Gleaming chrome wrenches, pressure gauges, and dynamic speed line accents under bright daylight. Palette: racing red, metallic chrome silver, carbon grey, golden friction spark accent, and clean studio white. Automotive engineering, physics of friction, deceleration science, dynamic and educational. STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. Aspect ratio 2:3 vertical book jacket.'
)

if __name__ == '__main__':
    res = create_and_produce_cover(1554, brief, 'Braking Bad automotive brake physics friction')
    print("SUCCESS:", res)
