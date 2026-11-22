import sys
sys.path.append('tools')
from canva_pipeline import create_and_produce_cover

brief = (
    'Book cover design titled "The Invention of the Toothbrush". The title "The Invention of the Toothbrush" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. HISTORICAL HYGIENE INVENTIONS & APOTHECARY DAYLIGHT STYLE: A bright, sunlit historical study and apothecary table in natural morning daylight. In chronological sequence: an ancient Babylonian and Egyptian natural frayed twig chew-stick (miswak), an 18th-century carved cattle bone handle with natural boar bristles, and a sleek modern ergonomic nylon-bristle toothbrush with hygienic wave contours. A vintage porcelain tooth powder jar, fresh peppermint leaves, sea salt crystals, and patent diagrams on parchment in clean daylight. Palette: porcelain white, mint leaf emerald green, polished bone ivory, amber twig brown, and sky morning cyan. History of inventions, dental hygiene, material science from bone to nylon, public health, clean, bright, and educational. STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. Aspect ratio 2:3 vertical book jacket.'
)

if __name__ == '__main__':
    res = create_and_produce_cover(1760, brief, 'Invention of the Toothbrush dental hygiene history miswak')
    print("SUCCESS:", res)
