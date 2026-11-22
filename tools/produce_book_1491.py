import sys
sys.path.append('tools')
from canva_pipeline import create_and_produce_cover

brief = (
    'Book cover design titled "Worldwide Loss of Bees a Growing Concern". The title "Worldwide Loss of Bees a Growing Concern" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. BRIGHT APICULTURE & HONEYBEE CONSERVATION DAYLIGHT STYLE: A sun-drenched, blooming wildflower meadow in radiant golden daylight. In the center foreground, a fuzzy, golden honeybee actively foraging on a blooming purple lavender flower spike, its pollen baskets packed with bright yellow pollen grains. In the background, a traditional wooden multi-story apiary beehive box stands among blooming clover and apple orchards under a brilliant blue sky, with a golden honeycomb frame dripping with amber honey resting on a rustic table. Palette: honeybee fuzzy gold and black, lavender purple, clover green, honeycomb amber gold, and sky sunny cyan. Apiculture, bee conservation, pollination ecology, biodiversity loss, environmental awareness, bright, wholesome, educational. STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. Aspect ratio 2:3 vertical book jacket.'
)

if __name__ == '__main__':
    res = create_and_produce_cover(1491, brief, 'Worldwide Loss of Bees a Growing Concern')
    print("SUCCESS:", res)
