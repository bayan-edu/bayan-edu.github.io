import sys
sys.path.append('tools')
from canva_pipeline import create_and_produce_cover

brief = (
    'Book cover design titled "What Are Electric and Magnetic Fields?". The title "Electric & Magnetic Fields" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. ELECTROMAGNETISM & FIELD LINES PHYSICS STYLE: A clean, brightly illuminated university physics demonstration bench in natural daylight. In the center foreground, a classic red-and-blue bar magnet surrounded by iron filings aligning into perfect magnetic field flux loop arcs. Beside it, a pair of charged electrodes showing electric field dipole lines (+ and -) glowing in electric cyan and magenta. A copper induction coil, a galvanometer needle deflecting to show induced electromagnetic current, and compasses pointing along field lines. Palette: magnet poles crimson red and royal blue, electric field glowing cyan, copper wire orange, and clean lab white. Electromagnetism, magnetic field lines, electric fields, Faraday induction, physics education, clear and dynamic. STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. Aspect ratio 2:3 vertical book jacket.'
)

if __name__ == '__main__':
    res = create_and_produce_cover(1754, brief, 'Electric and Magnetic Fields electromagnetism flux lines Faraday')
    print("SUCCESS:", res)
