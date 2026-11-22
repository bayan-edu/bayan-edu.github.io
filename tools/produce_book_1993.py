import sys
sys.path.append('tools')
from canva_pipeline import create_and_produce_cover

brief = (
    'Book cover design titled "What is that smell?". The title "What is that smell?" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. OLFACTORY SCIENCE AROMATIC BOTANY DAYLIGHT STYLE: A sunlit, aromatic scientific botanical laboratory table. Arranged beautifully are fresh botanical sources of fragrance: freshly roasted coffee beans, fragrant cinnamon bark sticks, blooming purple lavender sprigs, fresh yellow citrus peels, and fresh mint leaves, with delicate, luminous swirling scent vapor ribbons incorporating colorful molecular structure models (esters, terpenes, aldehydes) wafting through the air. Palette: coffee warm roasted brown, lavender violet, citrus radiant yellow, mint fresh green, and molecular vapor translucent cyan. Chemistry of smell, olfactory biology, botanical aromatics, sensory science, vibrant and educational. STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. Aspect ratio 2:3 vertical book jacket.'
)

if __name__ == '__main__':
    res = create_and_produce_cover(1993, brief, 'What is that smell olfactory science aromatic botanicals spices chemistry')
    print("SUCCESS:", res)
