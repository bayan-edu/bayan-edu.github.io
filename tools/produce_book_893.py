import sys
sys.path.append('tools')
from canva_pipeline import create_and_produce_cover

brief = (
    'Book cover design titled "Bio-Benefits - A Livable Planet". '
    'The title "Bio-Benefits - A Livable Planet" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. '
    'BRIGHT BIODIVERSITY & ECOLOGY DAYLIGHT STYLE: A sun-drenched, radiant panoramic rainforest sanctuary on a glorious morning under bright sunlight. '
    'In the center foreground, a lush, thriving ecosystem with large dewy green monstera and fern leaves, vibrant blooming tropical orchids, and a crystal-clear forest brook trickling over smooth river stones. '
    'A magnificent brilliant blue morpho butterfly rests gently on a sunlit mossy branch. '
    'In the background, a verdant misty forest canopy catches warm golden sunbeams, symbolizing a healthy, living planet. '
    'Palette: lush rainforest emerald, morpho electric blue, orchid magenta, crystal stream aqua, and golden sunlight. '
    'Ecology, biodiversity, bright, educational, completely daylight. '
    'STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. '
    'NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. '
    'Aspect ratio 2:3 vertical book jacket.'
)

if __name__ == '__main__':
    res = create_and_produce_cover(893, brief, "Bio-Benefits - A Livable Planet")
    print("SUCCESS:", res)
