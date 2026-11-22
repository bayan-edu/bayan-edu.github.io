import sys
sys.path.append('tools')
from canva_pipeline import create_and_produce_cover

brief = (
    'Book cover design titled "The Caterpillar Mom!". The title "The Caterpillar Mom!" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. ENTOMOLOGY METAMORPHOSIS DAYLIGHT STYLE: A radiant, sunlit garden macro composition in full daylight. On a vibrant green milkweed plant, an adorable plump green-and-yellow striped caterpillar gently tending to tiny glistening golden butterfly eggs laid carefully on the underside of a leaf, alongside a jade-green chrysalis with golden dots hanging from a twig in the warm morning sun. Palette: caterpillar lime green, black and yellow stripes, chrysalis jade green and gold, garden leaves emerald, and sky sunny blue. Insect metamorphosis, life cycles, maternal care in nature, botany, charming and educational. STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. Aspect ratio 2:3 vertical book jacket.'
)

if __name__ == '__main__':
    res = create_and_produce_cover(2459, brief, 'The Caterpillar Mom insect metamorphosis chrysalis leaf botany butterfly')
    print("SUCCESS:", res)
