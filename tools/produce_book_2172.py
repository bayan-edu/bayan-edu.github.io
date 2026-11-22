import sys
sys.path.append('tools')
from canva_pipeline import create_and_produce_cover

brief = (
    'Book cover design titled "The Enormous Turnip". The title "The Enormous Turnip" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. STORYBOOK VEGETABLE GARDEN DAYLIGHT STYLE: A sunlit, storybook rustic vegetable garden on a gorgeous summer morning. In the center, a colossal, gigantic turnip with a vibrant purple-and-white bulbous root bulging proudly out of rich garden soil, with enormous, lush ruffled green leaves reaching skyward. Beside it sits a classic rustic wooden wheelbarrow, a watering can, and garden trowels. Sunflowers and wooden picket fences in the background under sunny skies. Palette: turnip root vivid magenta-purple and crisp white, foliage lush leafy green, garden soil rich dark loam, and sky cheerful blue. Classic folktale, teamwork storytelling, garden botany, delightful and educational. STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. Aspect ratio 2:3 vertical book jacket.'
)

if __name__ == '__main__':
    res = create_and_produce_cover(2172, brief, 'The Enormous Turnip folktale vegetable garden giant turnip wheelbarrow')
    print("SUCCESS:", res)
