import sys
sys.path.append('tools')
from canva_pipeline import create_and_produce_cover

brief = (
    'Book cover design titled "What Is Heat?". The title "What Is Heat?" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. VIBRANT THERMAL PHYSICS & KINETIC MOLECULAR STYLE: A clean, brightly illuminated physics laboratory bathed in natural daylight. In the center foreground, a precision glass laboratory thermometer and a digital thermal sensor with heat gradient scale. A split visualization showing molecules at low temperature (slow, blue, calm crystalline vibration) transitioning smoothly into high temperature (fast, vibrating, red and golden energetic kinetic collision particles). Conduction, convection, and radiation thermal wave graphics softly illustrated in clean educational infographic style. Palette: thermal gradient red, radiant flame orange, gold, cool ice cyan, and clean lab white. Thermodynamics, kinetic energy, heat transfer, molecular physics, clear and engaging. STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. Aspect ratio 2:3 vertical book jacket.'
)

if __name__ == '__main__':
    res = create_and_produce_cover(1564, brief, 'What Is Heat thermodynamics thermal physics')
    print("SUCCESS:", res)
