import sys
sys.path.append('tools')
from canva_pipeline import create_and_produce_cover

brief = (
    'Book cover design titled "When I Grow Up". The title "When I Grow Up" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. INSPIRING STEM CAREERS & SCIENTIFIC TOOLS DAYLIGHT STYLE: A sun-drenched, joyful exploration workshop celebrating diverse future careers in science and innovation. In harmonious arrangement on a blonde-wood workbench: a brass astronomer\'s telescope, a biologist\'s optical microscope, a geologist\'s rock hammer and compass, an engineer\'s drafting T-square and blueprints, a doctor\'s stethoscope, and an astronaut\'s model rocket. Open sunny windows looking out onto green hills and a brilliant blue sky filled with possibilities. Palette: timber blonde oak, brass gold, laboratory cyan, drafting blueprint blue, and sunny sky white. STEM careers, scientific aspirations, future professions, learning and curiosity, bright, cheerful, and educational. STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. Aspect ratio 2:3 vertical book jacket.'
)

if __name__ == '__main__':
    res = create_and_produce_cover(1876, brief, 'When I Grow Up STEM careers scientific exploration tools')
    print("SUCCESS:", res)
