import sys
sys.path.append('tools')
from canva_pipeline import create_and_produce_cover

brief = (
    'Book cover design titled "From the Sun to Your Food". '
    'The title "From the Sun to Your Food" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. '
    'BRIGHT AGRICULTURAL BIOLOGY & FOOD CHAIN DAYLIGHT STYLE: A sun-drenched, radiant organic farm landscape on a glorious sunny morning under a brilliant sky. '
    'In the center foreground, a vibrant harvest of sun-ripened produce: glossy red strawberries, golden ears of sweet corn, and crisp green spinach leaves catching golden sunbeams. '
    'A honeybee hovers gently over a blooming yellow squash blossom, illustrating natural pollination. '
    'In the background, peaceful cows graze on lush emerald green pastures beside a classic wooden barn under bright morning sunlight. '
    'Palette: strawberry scarlet, sweetcorn golden yellow, leaf emerald green, and brilliant sky blue. '
    'Biology, photosynthesis, food webs, bright, educational, vivid, completely daylight. '
    'STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. '
    'NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. '
    'Aspect ratio 2:3 vertical book jacket.'
)

if __name__ == '__main__':
    res = create_and_produce_cover(954, brief, "From the Sun to Your Food")
    print("SUCCESS:", res)
