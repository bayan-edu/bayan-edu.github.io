import sys
sys.path.append('tools')
from canva_pipeline import create_and_produce_cover

brief = (
    'Book cover design titled "The Senses of Smell and Taste". The title "The Senses of Smell and Taste" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. AROMATIC BOTANICAL & SENSORY SCIENCE DAYLIGHT STYLE: A vibrant, sun-drenched culinary sensory research laboratory. In the center foreground, an assortment of aromatic sensory wonders: fragrant cinnamon sticks, fresh vanilla orchid pods, split juicy lemons, fresh peppermint leaves, and ripe strawberries. Whispering aromatic vapor ribbons rising gracefully into stylized molecular structures of vanillin and limonene. A magnifying glass showing microscopic taste bud papillae diagrams and olfactory receptor models in bright daylight. Palette: citrus lemon yellow, peppermint green, strawberry red, warm cinnamon brown, and clean lab white. Sensory biology, olfactory system, taste neuroscience, chemical senses, cheerful and vibrant. STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. Aspect ratio 2:3 vertical book jacket.'
)

if __name__ == '__main__':
    res = create_and_produce_cover(1577, brief, 'The Senses of Smell and Taste olfactory gustatory neuroscience')
    print("SUCCESS:", res)
