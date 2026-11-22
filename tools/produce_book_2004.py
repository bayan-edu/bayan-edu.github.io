import sys
sys.path.append('tools')
from canva_pipeline import create_and_produce_cover

brief = (
    'Book cover design titled "The Latest Buzz". The title "The Latest Buzz" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. APIARY HONEYBEE ECOLOGY DAYLIGHT STYLE: A radiant, sun-soaked view into a thriving, healthy honeybee colony on a sunny summer morning. In the center foreground, an intricate hexagonal beeswax honeycomb dripping with liquid golden honey, with worker honeybees (Apis mellifera) with fuzzy striped bodies and translucent gossamer wings tending to hexagonal brood cells and packing golden pollen pellets into pollen baskets. Blooming clover and apple blossoms bathed in golden sunlight in the background. Palette: honey and pollen radiant golden yellow, beeswax warm amber, honeybee stripes black and ochre, and meadow green. Apiculture, honeybee communication, pollination ecology, bustling and educational. STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. Aspect ratio 2:3 vertical book jacket.'
)

if __name__ == '__main__':
    res = create_and_produce_cover(2004, brief, 'The Latest Buzz honeybee colony honeycomb pollination apiary')
    print("SUCCESS:", res)
