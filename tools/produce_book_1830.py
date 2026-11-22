import sys
sys.path.append('tools')
from canva_pipeline import create_and_produce_cover

brief = (
    'Book cover design titled "Sorted!: Reduce, Reuse, Recycle". The title "Sorted!: Reduce, Reuse, Recycle" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. PRACTICAL RECYCLING & COMPOSTING SCIENCE DAYLIGHT STYLE: A sunlit, well-organized eco-friendly community workshop and garden on a sunny spring morning. In the center foreground, three labeled sorting bins: blue (paper), yellow (clean plastics/cans), and green (compostables). Beside them, an active wooden composting tumbler bin showing rich, dark organic compost and earthworms nourishing potted vegetable seedlings. A reusable canvas grocery tote, glass storage jars, and clean circular recycling infinity arrows in vibrant green vector graphics. Palette: recycling clover green, plastic bottle clear cyan, compost rich earth brown, and sunny sky blue. Waste reduction, practical recycling, composting biology, circular economy, cheerful, vibrant, and educational. STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. Aspect ratio 2:3 vertical book jacket.'
)

if __name__ == '__main__':
    res = create_and_produce_cover(1830, brief, 'Reduce Reuse Recycle waste management composting circular economy')
    print("SUCCESS:", res)
