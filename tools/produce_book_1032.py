import sys
sys.path.append('tools')
from canva_pipeline import create_and_produce_cover

brief = (
    'Book cover design titled "Can the Amazon Be Saved?". '
    'The title "Can the Amazon Be Saved?" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. '
    'BRIGHT AMAZON RAINFOREST BIODIVERSITY DAYLIGHT STYLE: A sun-drenched, breathtaking Amazon rainforest canopy on a glorious sunny morning in bright daylight. '
    'In the center foreground, a magnificent Keel-billed Toucan with vibrant rainbow bill perched gracefully on an orchid-covered tropical branch, surrounded by lush dewy bromeliads and giant leaves of Swiss cheese monstera catching golden sunbeams. '
    'In the background, a wide winding emerald Amazon river flows through pristine dense jungle canopy stretching toward a sunlit horizon under a clear azure sky. '
    'Palette: toucan rainbow bill yellow, cyan, and orange, rainforest lush emerald and jade, orchid magenta, and river sparkling blue. '
    'Rainforest conservation, Amazon ecology, biodiversity, nature, bright, educational, vivid, completely daylight. '
    'STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. '
    'NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. '
    'Aspect ratio 2:3 vertical book jacket.'
)

if __name__ == '__main__':
    res = create_and_produce_cover(1032, brief, "Can the Amazon Be Saved?")
    print("SUCCESS:", res)
