import sys
sys.path.append('tools')
from canva_pipeline import create_and_produce_cover

brief = (
    'Book cover design titled "Magnetism". The title "Magnetism" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. CLASSICAL MAGNETISM & FORCE FIELD PHYSICS STYLE: A bright, sunlit laboratory demonstration table in natural morning daylight. In the center foreground, a classic painted steel horseshoe magnet with bold red (North) and blue (South) poles, attracting a cluster of shiny steel ball bearings and paperclips. Beside it, a clear glass plate with fine iron filings forming beautiful, symmetrical arched magnetic field flux lines between poles. Small brass compasses arranged in a circle, their needles aligning perfectly with the invisible magnetic force. Palette: magnet North crimson red, South royal blue, iron filing graphite grey, brass gold, and clean laboratory white. Physics of magnetism, magnetic poles, magnetic field lines, forces of attraction, clear, dynamic, and educational. STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. Aspect ratio 2:3 vertical book jacket.'
)

if __name__ == '__main__':
    res = create_and_produce_cover(1791, brief, 'Magnetism physics magnetic field lines dipole attraction repulsion')
    print("SUCCESS:", res)
