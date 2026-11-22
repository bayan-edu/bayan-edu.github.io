import sys
sys.path.append('tools')
from canva_pipeline import create_and_produce_cover

brief = (
    'Book cover design titled "Accidental Butterfly". The title "Accidental Butterfly" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. BOTANICAL BUTTERFLY EMERGENCE DAYLIGHT STYLE: A sun-drenched botanical greenhouse garden in full daylight. A newly emerged, vibrant butterfly with freshly expanded wings of radiant turquoise, violet, and gold resting gently on a split ripe tropical fruit, beside the empty translucent chrysalis shell, with warm sunbeams illuminating dew drops on lush green foliage. Palette: butterfly wings radiant turquoise and amethyst, tropical fruit warm coral, foliage rich emerald, and sunlight golden. Metamorphosis biology, accidental discoveries, butterfly life cycle, enchanting and educational. STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. Aspect ratio 2:3 vertical book jacket.'
)

if __name__ == '__main__':
    res = create_and_produce_cover(2549, brief, 'Accidental Butterfly botanical garden emerging butterfly chrysalis wings')
    print("SUCCESS:", res)
