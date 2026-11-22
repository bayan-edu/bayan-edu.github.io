import sys
sys.path.append('tools')
from canva_pipeline import create_and_produce_cover

brief = (
    'Book cover design titled "Rip Currents". The title "Rip Currents" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. COASTAL OCEANOGRAPHY DAYLIGHT STYLE: A sun-drenched aerial view of a pristine ocean beach on a bright sunny afternoon. Clear turquoise coastal waves breaking over sandy sandbars, revealing a distinct channel of calm, darker, churning water flowing rapidly seaward—a textbook rip current. Clean educational arrows indicating wave approach and seaward exit current flow, with beach safety flags planted in the golden sand. Palette: ocean water turquoise and deep sapphire, wave crests foam white, sand warm gold, and safety flags bright red and yellow. Ocean dynamics, rip current safety, beach science, coastal physics, clear and educational. STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. Aspect ratio 2:3 vertical book jacket.'
)

if __name__ == '__main__':
    res = create_and_produce_cover(1972, brief, 'Rip Currents coastal oceanography beach safety water physics')
    print("SUCCESS:", res)
