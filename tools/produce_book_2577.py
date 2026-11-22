import sys
sys.path.append('tools')
from canva_pipeline import create_and_produce_cover

brief = (
    'Book cover design titled "Up World, Down World". The title "Up World, Down World" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. FOREST STRATIFICATION LAYERS STYLE: A vertical cross-section of a tropical rainforest from sunlit canopy down to forest floor. In the "Up World" canopy: toucans, tree frogs, and orchids basking in bright sunshine; in the "Down World" understory and soil: glowing mushrooms, industrious ants, burrowing beetles, and rich decomposing humus recycling nutrients under dappled forest light. Palette: canopy bright lime and emerald green, forest floor rich loam brown and mossy olive, with sunlight piercing the vertical layers. Forest stratification, canopy ecology, soil biology, ecological niches, fascinating and educational. STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. Aspect ratio 2:3 vertical book jacket.'
)

if __name__ == '__main__':
    res = create_and_produce_cover(2577, brief, 'Up World Down World canopy and forest floor ecology layers rainforest')
    print("SUCCESS:", res)
