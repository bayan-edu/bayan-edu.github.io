import sys
sys.path.append('tools')
from canva_pipeline import create_and_produce_cover

brief = (
    'Book cover design titled "Trouble in the Amazon". The title "Trouble in the Amazon" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. AMAZON REFORESTATION & CONSERVATION SCIENCE DAYLIGHT STYLE: A sunlit, compelling ecological conservation scene under bright tropical skies. In the foreground, a flourishing active native tree seedling nursery where young Brazil nut and mahogany saplings in biodegradable pots are ready for replanting. In the background, a protected pristine Amazon rainforest canopy thriving with giant trees, flying scarlet macaws, and a clear river reflecting sunbeams. Satellite habitat monitoring screens and biodiversity conservation maps highlighted in clean educational style. Palette: rainforest emerald green, seedling fresh lime, river aquamarine, macaw scarlet and gold, and sunny sky blue. Tropical conservation, ecological restoration, reforestation science, Amazon preservation, urgent, hopeful, and educational. STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. Aspect ratio 2:3 vertical book jacket.'
)

if __name__ == '__main__':
    res = create_and_produce_cover(1804, brief, 'Trouble in the Amazon rainforest conservation deforestation reforestation')
    print("SUCCESS:", res)
