import sys
sys.path.append('tools')
from canva_pipeline import create_and_produce_cover

brief = (
    'Book cover design titled "Why Do Boats Float and Rocks Sink?". The title "Why Do Boats Float & Rocks Sink?" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. BUOYANCY & DENSITY FLUID DYNAMICS DAYLIGHT STYLE: A sun-drenched, clear harbor and physics demonstration scene in bright natural daylight. In the foreground, a large hollow steel boat hull floating effortlessly high on the water surface, contrasted with a small, dense granite pebble sinking to the sandy sea floor. Clean, bold physics vector diagrams: Upward Buoyant Force (F_buoyant) balanced with Downward Gravitational Weight, and water displacement volume containers. Glistening water ripples, sailboats on the sunny bay, and clear blue skies. Palette: ocean aquamarine and clear cyan, boat hull navy and red, granite rock grey, and sunny harbor gold. Archimedes\' principle, density, buoyancy, fluid physics, water displacement, clear, playful, and educational. STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. Aspect ratio 2:3 vertical book jacket.'
)

if __name__ == '__main__':
    res = create_and_produce_cover(1874, brief, 'Why Do Boats Float Rocks Sink Archimedes buoyancy density fluid physics')
    print("SUCCESS:", res)
