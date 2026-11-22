import sys
sys.path.append('tools')
from canva_pipeline import create_and_produce_cover

brief = (
    'Book cover design titled "Lungdai and the Hornbill". The title "Lungdai and the Hornbill" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. GREAT HORNBILL TROPICAL CANOPY STYLE: A sunlit tropical canopy in Northeast India in morning sunshine. Perched majestically on a massive moss-covered rainforest branch is a magnificent Great Hornbill (Buceros bicornis), showing its colossal golden-yellow casque atop its curved beak, piercing ruby eye, and glossy black-and-white wing plumage, holding a wild jungle fig in its beak under golden sunbeams breaking through misty forest foliage. Palette: hornbill casque vivid golden yellow, plumage jet black and snowy white, rainforest canopy emerald green, and sunlight warm amber. Avian ecology, hornbill conservation, seed dispersal, tropical biodiversity, majestic and educational. STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. Aspect ratio 2:3 vertical book jacket.'
)

if __name__ == '__main__':
    res = create_and_produce_cover(2494, brief, 'Lungdai Hornbill Great Hornbill Buceros bicornis tropical rainforest canopy')
    print("SUCCESS:", res)
