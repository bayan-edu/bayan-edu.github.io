import sys
sys.path.append('tools')
from canva_pipeline import create_and_produce_cover

brief = (
    'Book cover design titled "Reading: Aesop\'s Fables". The title "Aesop\'s Fables" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. BRIGHT PASTORAL FABLE MEADOW DAYLIGHT STYLE: A sunlit, cheerful country path through blooming green meadows on a glorious sunny day in bright daylight. In the center foreground, a steady, determined green tortoise with short sturdy legs reaching a colorful checkered wooden finish line ribbon. Further back in the lush meadow under a shady apple tree, a fluffy brown hare dozes peacefully on a patch of sunny yellow buttercups, with an open vintage fable storybook resting on the grass. Palette: meadow emerald green, tortoise shell olive and gold, finish ribbon bright red and white, and sky sunny cyan. Aesop\'s fables, moral literature, Tortoise and Hare, classic storytelling, playful, bright, educational, completely daylight. STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. Aspect ratio 2:3 vertical book jacket.'
)

if __name__ == '__main__':
    res = create_and_produce_cover(1413, brief, 'Reading Aesops Fables')
    print("SUCCESS:", res)
