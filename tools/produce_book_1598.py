import sys
sys.path.append('tools')
from canva_pipeline import create_and_produce_cover

brief = (
    'Book cover design titled "Uninvited Guests". The title "Uninvited Guests" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. MICROSCOPIC BIOLOGY & PARASITOLOGY DAYLIGHT STYLE: A sunlit, clean university biology laboratory with high-powered digital optical microscopes. An illuminated glass specimen slide showing microscopic protozoa, harmless dust mites, and symbiotic organisms rendered in fascinating, clean scientific detail. Educational circular magnified callouts showing life cycles, host interactions, and biological adaptations. Petri dishes with nutrient agar and precision laboratory forceps on a clean white countertop. Palette: translucent microscopic teal, amber gold, clean lab white, and cobalt blue. Parasitology, symbiosis, microscopic life, biological adaptations, intriguing and educational. STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. Aspect ratio 2:3 vertical book jacket.'
)

if __name__ == '__main__':
    res = create_and_produce_cover(1598, brief, 'Uninvited Guests biological parasites symbiosis microbiology')
    print("SUCCESS:", res)
