import sys
sys.path.append('tools')
from canva_pipeline import create_and_produce_cover

brief = (
    'Book cover design titled "The Builder of Dams and Bridges". The title "The Builder of Dams and Bridges" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. MONUMENTAL HYDRAULIC ENGINEERING STYLE: A sun-drenched, grand civil engineering vista in full daylight. The monumental masonry stone Krishna Raja Sagara dam with its iconic automatic sluice floodgates releasing roaring white water into canal networks, surrounded by classical stone aqueducts, a surveyor\'s brass theodolite on tripod, and architectural engineering blueprints under a bright sky. Palette: masonry dam warm sandstone granite, water foaming white and turquoise, theodolite polished brass, and sky azure. Hydraulic engineering, dam construction, civil leadership, nation building, monumental and educational. STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. Aspect ratio 2:3 vertical book jacket.'
)

if __name__ == '__main__':
    res = create_and_produce_cover(2676, brief, 'Visvesvaraya civil engineering Krishna Raja Sagara dam sluice gates bridge')
    print("SUCCESS:", res)
