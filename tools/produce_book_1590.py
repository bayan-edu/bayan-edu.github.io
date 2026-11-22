import sys
sys.path.append('tools')
from canva_pipeline import create_and_produce_cover

brief = (
    'Book cover design titled "Building a Better Natural History Museum". The title "Building a Better Museum" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. MAGNIFICENT MUSEUM ARCHITECTURE & EXHIBITION DAYLIGHT STYLE: A sunlit, grand architectural atrium of a world-class modern natural history museum. Soaring glass skylights casting radiant sunbeams across the expansive marble exhibition floor. In the center, a towering, perfectly mounted sauropod dinosaur skeleton and a suspended blue whale skeleton model. Architectural blueprint models, interactive touchscreen kiosks, and crystal display dioramas arranged in inspiring harmony. Palette: marble travertine cream, fossil ivory, glass atrium aqua cyan, and warm golden sunbeams. Museum curation, public science, architectural design, paleontology, grand and inspiring. STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. Aspect ratio 2:3 vertical book jacket.'
)

if __name__ == '__main__':
    res = create_and_produce_cover(1590, brief, 'Natural History Museum architecture paleontology exhibition')
    print("SUCCESS:", res)
