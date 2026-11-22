import sys
sys.path.append('tools')
from canva_pipeline import create_and_produce_cover

brief = (
    'Book cover design titled "Saving the Rain Forests". The title "Saving the Rain Forests" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. MAJESTIC TROPICAL RAINFOREST CONSERVATION DAYLIGHT STYLE: A breathtaking, sun-illuminated tropical rainforest canopy panorama under bright azure skies. Towering emergent kapok and Brazil nut trees with lush buttress roots draped in flowering liana vines and vibrant bromeliads. A colorful keel-billed toucan with rainbow bill and a brilliant blue morpho butterfly perched near clear river shallows. In the background, a pristine winding river reflecting sunbeams, and a green canopy conservation research walkway suspended between trees. Palette: deep jungle emerald green, toucan rainbow yellow and cyan, morpho electric blue, and sunny sky gold. Rainforest ecology, tropical conservation, biodiversity protection, environmental stewardship, lush and vibrant. STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. Aspect ratio 2:3 vertical book jacket.'
)

if __name__ == '__main__':
    res = create_and_produce_cover(1676, brief, 'Saving the Rain Forests tropical conservation biodiversity canopy')
    print("SUCCESS:", res)
