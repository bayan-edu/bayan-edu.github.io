import sys
sys.path.append('tools')
from canva_pipeline import create_and_produce_cover

brief = (
    'Book cover design titled "Saving Frogs Using DNA". The title "Saving Frogs Using DNA" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. BRIGHT CONSERVATION GENETICS DAYLIGHT STYLE: A sunlit, pristine mountain forest stream in bright daylight. In the center foreground, an open waterproof scientific field sampling case containing environmental DNA (eDNA) collection test tubes with clear water samples, micropipettes, and clean genetic barcode charts. Beside the case on a mossy boulder, a vibrant yellow-legged mountain frog sits peacefully beside crystal-clear rippling creek water. A subtle, glowing double-helix DNA graphic arches cleanly across the background foliage in bright daylight. Palette: frog olive and sunshine yellow, eDNA tube crystal cyan, field case safety orange, and stream moss emerald. Conservation genetics, amphibian ecology, eDNA technology, wildlife protection, bright, educational, completely daylight. STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. Aspect ratio 2:3 vertical book jacket.'
)

if __name__ == '__main__':
    res = create_and_produce_cover(1285, brief, 'Saving Frogs Using DNA')
    print("SUCCESS:", res)
