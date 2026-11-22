import sys
sys.path.append('tools')
from canva_pipeline import create_and_produce_cover

brief = (
    'Book cover design titled "The Orchid\'s Secret". The title "The Orchid\'s Secret" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. EXQUISITE BOTANICAL GREENHOUSE DAYLIGHT STYLE: A lush, sunlit tropical conservatory greenhouse filled with radiant diffused daylight. In the center foreground, a stunning, exotic flowering orchid (Paphiopedilum slipper orchid and Phalaenopsis) with intricate speckled magenta petals, a golden lip, and delicate pollination pathways. Dewdrops sparkling like diamonds on broad, deep emerald orchid leaves. In the background, climbing jungle vines, hanging ferns, and glass greenhouse arches with soft light rays filtering through. Palette: magenta pink, tropical emerald green, orchid cream, gold nectar accents, and soft conservatory sky blue. Botany, plant adaptations, coevolution, exotic flowers, bright, vibrant, inspiring. STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. Aspect ratio 2:3 vertical book jacket.'
)

if __name__ == '__main__':
    res = create_and_produce_cover(1560, brief, 'The Orchid\'s Secret botanical pollination orchid')
    print("SUCCESS:", res)
