import sys
sys.path.append('tools')
from canva_pipeline import create_and_produce_cover

brief = (
    'Book cover design titled "Saving the Flying Mammal". The title "Saving the Flying Mammal" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. WILDLIFE CONSERVATION DAYLIGHT CANOPY STYLE: A sunlit tropical rainforest canopy at golden hour. In the center, a majestic golden-crowned fruit bat (flying fox) with warm fox-colored fur and expansive delicate wing membranes perched securely on a branch among lush tropical figs and broad rainforest leaves, with gentle sunbeams breaking through the foliage. Palette: fruit bat fur warm golden russet, wing membranes rich chestnut, rainforest canopy deep emerald, and sunlight warm amber. Mammal conservation, bat ecology, tropical seed dispersal, wondrous and educational. STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. Aspect ratio 2:3 vertical book jacket.'
)

if __name__ == '__main__':
    res = create_and_produce_cover(1957, brief, 'Saving the Flying Mammal bat conservation megabat pollination canopy')
    print("SUCCESS:", res)
