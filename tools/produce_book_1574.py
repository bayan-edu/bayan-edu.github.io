import sys
sys.path.append('tools')
from canva_pipeline import create_and_produce_cover

brief = (
    'Book cover design titled "NJ Physics Professor Has the \\"Right Stuff\\"". The title "Physics Professor Has the Right Stuff" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. AEROSPACE ENGINEERING & ASTRONAUTICS LAB DAYLIGHT STYLE: A sunlit academic physics and astronautics research laboratory. On a polished oak workbench: precision scale models of orbital rockets, space capsules, and wind-tunnel aerodynamic airfoils. A chalkboard filled with neat orbital mechanics equations, gravitational slingshot diagrams, and delta-v calculations in radiant sunlight. Gleaming gyroscopes, accelerometer sensors, and mission patch insignia displayed under bright daylight. Palette: aerospace navy blue, polished brass gold, chalkboard slate green, rocket white, and sunny sky blue. Astronautics, physics education, space exploration, flight dynamics, inspiring and scholarly. STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. Aspect ratio 2:3 vertical book jacket.'
)

if __name__ == '__main__':
    res = create_and_produce_cover(1574, brief, 'Physics Professor Right Stuff aerospace astronautics physics')
    print("SUCCESS:", res)
