import sys
sys.path.append('tools')
from canva_pipeline import create_and_produce_cover

brief = (
    'Book cover design titled "Blue Bloods of the Sea". The title "Blue Bloods of the Sea" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. HORSESHOE CRAB BIOLOGY & MEDICAL SCIENCE DAYLIGHT STYLE: A sun-drenched sandy beach and modern biomedical research setting in bright morning daylight. In the center foreground, an ancient Atlantic horseshoe crab resting gracefully on wet golden sand as gentle ocean waves lap nearby. Beside it in clear educational graphics, a sterile medical vial containing distinctive baby-blue hemolymph (copper-based hemocyanin blood) used for Limulus Amebocyte Lysate (LAL) bacterial endotoxin testing. A laboratory pipette, sea shells, and shorebird sandpipers in the sunny background. Palette: horseshoe crab olive-brown shell, hemolymph striking sky blue, beach sand gold, and ocean aquamarine. Living fossils, horseshoe crab biology, hemocyanin, biomedical applications, pharmaceutical safety, unique and educational. STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. Aspect ratio 2:3 vertical book jacket.'
)

if __name__ == '__main__':
    res = create_and_produce_cover(1778, brief, 'Blue Bloods of the Sea horseshoe crab hemocyanin endotoxin medical')
    print("SUCCESS:", res)
