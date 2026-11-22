import sys
sys.path.append('tools')
from canva_pipeline import create_and_produce_cover

brief = (
    'Book cover design titled "Smart About Medicine". The title "Smart About Medicine" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. BRIGHT PHARMACEUTICAL SCIENCE & SAFETY DAYLIGHT STYLE: A sunlit, clean medical laboratory and pharmacy study in bright natural daylight. In the center foreground, on a polished white research desk: amber glass apothecary medicine bottles with clean prescription labels, child-resistant safety caps, a blister pack of colorful capsules, a white marble mortar and pestle, and a medical reference handbook. Beside them, a modern digital prescription tablet and clean educational icons illustrating medical safety and following doctor instructions. Palette: amber bottle warm gold, capsule coral and teal, desk pristine white, and morning daylight ivory. Pharmacology, medicine safety, healthcare science, prescription education, clean, responsible, educational, completely daylight. STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. Aspect ratio 2:3 vertical book jacket.'
)

if __name__ == '__main__':
    res = create_and_produce_cover(1474, brief, 'Smart About Medicine')
    print("SUCCESS:", res)
