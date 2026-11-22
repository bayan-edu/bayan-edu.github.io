import sys
sys.path.append('tools')
from canva_pipeline import create_and_produce_cover

brief = (
    'Book cover design titled "Life Story: Sarah \\"Madam C.J.\\" Breedlove Walker". The title "Madam C.J. Walker" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. BRIGHT EARLY-20TH-CENTURY BOTANICAL BEAUTY LABORATORY STYLE: A sunlit, inspiring apothecary and cosmetic formulation study on a bright sunny morning in natural daylight. In the center foreground, on a warm wooden workbench: vintage amber glass bottles of herbal hair tonics, decorative tin containers of scalp pomades, a white porcelain mortar and pestle with coconut oil and botanical herbs, and an ornate antique brass hair comb. Beside them, an open leather-bound business ledger with fountain pen and historic beauty formulas, illuminated by golden sunbeams. Palette: amber glass warm gold, porcelain ivory, wood mahogany, and morning daylight bright white. Historical biography, entrepreneurship, Madam C.J. Walker legacy, cosmetic chemistry, inspiring, dignified, educational, completely daylight. STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. Aspect ratio 2:3 vertical book jacket.'
)

if __name__ == '__main__':
    res = create_and_produce_cover(1525, brief, 'Life Story Sarah Madam CJ Breedlove Walker')
    print("SUCCESS:", res)
