import sys
sys.path.append('tools')
from canva_pipeline import create_and_produce_cover

brief = (
    'Book cover design titled "Saving Hawaiian Monk Seals". The title "Saving Hawaiian Monk Seals" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. HAWAIIAN ATOLL MARINE MAMMAL SANCTUARY STYLE: A sun-drenched, pristine white-sand beach on a remote Hawaiian island in sparkling midday tropical sunlight. In the center foreground, a healthy, peaceful Hawaiian monk seal resting contentedly on warm golden coral sand near gentle lapping turquoise waves. In the background, a protected wildlife conservation rope boundary with educational sanctuary signage, swaying coconut palm fronds, and thriving coral reefs in clear waters. Palette: monk seal slate grey, coral sand white-gold, ocean turquoise aquamarine, palm emerald green, and tropical sky blue. Marine conservation, endangered species protection, Hawaiian wildlife, pinniped biology, beautiful and peaceful. STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. Aspect ratio 2:3 vertical book jacket.'
)

if __name__ == '__main__':
    res = create_and_produce_cover(1682, brief, 'Hawaiian Monk Seals marine mammal conservation atoll')
    print("SUCCESS:", res)
