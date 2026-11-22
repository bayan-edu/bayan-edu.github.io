import sys
sys.path.append('tools')
from canva_pipeline import create_and_produce_cover

brief = (
    'Book cover design titled "The Blue Beautiful Butterfly". The title "The Blue Beautiful Butterfly" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. TROPICAL BLUE MORPHO BOTANICAL DAYLIGHT STYLE: A radiant, sunlit tropical rainforest garden in full daylight. In the center foreground, a colossal, breathtaking Blue Morpho butterfly (Morpho peleides) resting with open wings on an exotic white tropical orchid flower. The butterfly\'s wings shimmer with intense metallic cobalt and electric sapphire iridescence (structural coloration), with delicate black wing borders. Dappled sunlight playing across glossy Monstera leaves and clear morning dew drops. Palette: butterfly wings electric iridescent blue and sapphire, orchid pure white, tropical leaves emerald green, and sunlight golden white. Structural color physics, entomology, rainforest biodiversity, mesmerizing and educational. STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. Aspect ratio 2:3 vertical book jacket.'
)

if __name__ == '__main__':
    res = create_and_produce_cover(1991, brief, 'Blue Beautiful Butterfly Morpho peleides structural color rainforest')
    print("SUCCESS:", res)
