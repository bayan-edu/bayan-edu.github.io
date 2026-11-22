import sys
sys.path.append('tools')
from canva_pipeline import create_and_produce_cover

brief = (
    'Book cover design titled "Parasites: Kings of the World". The title "Parasites: Kings of the World" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. MICROSCOPIC PARASITOLOGY & EVOLUTIONARY BIOLOGY STYLE: A sunlit, pristine university biological research laboratory in bright morning light. In the center, an illuminated compound optical microscope with a circular field-of-view callout showing the intricate specialized morphology of parasites: microscopic hooked holdfast organs, specialized suckers, and complex multi-host life cycle transmission diagrams. Petri dishes with nutrient media, staining pipettes, and glass specimen slides on a clean white countertop in natural daylight. Palette: microscopic specimen teal and magenta, glass slide crystal clear, laboratory white, and sunny timber. Parasitology, symbiotic biology, host-parasite coevolution, microscopic adaptations, intriguing, respectful, and educational. STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. Aspect ratio 2:3 vertical book jacket.'
)

if __name__ == '__main__':
    res = create_and_produce_cover(1818, brief, 'Parasites Kings of the World evolutionary parasitology symbiosis')
    print("SUCCESS:", res)
