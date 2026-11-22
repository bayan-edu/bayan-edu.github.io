import sys
sys.path.append('tools')
from canva_pipeline import create_and_produce_cover

brief = (
    'Book cover design titled "Saving Indonesia\'s Coral Reefs". '
    'The title "Saving Indonesia\'s Coral Reefs" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. '
    'BRIGHT INDONESIAN CORAL REEF RESTORATION DAYLIGHT STYLE: A sunlit, crystal-clear turquoise ocean reef scene on a glorious sunny day in natural daylight. '
    'In the center foreground, a thriving marine coral nursery structure planted with colorful growing fragments of staghorn, table, and brain corals in brilliant peach, purple, and gold. '
    'Vibrant orange clownfish and electric blue damselfish swim playfully among glowing sea anemone tentacles under shimmering sunbeams dancing on white coral sand. '
    'In the background, a lush green Indonesian volcanic island peak rises above the turquoise sea beneath a radiant sapphire sky. '
    'Palette: coral peach and violet, reef turquoise and aquamarine, clownfish bright orange, and island emerald. '
    'Marine conservation, coral restoration, Indonesia, oceanography, bright, educational, vivid, completely daylight. '
    'STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. '
    'NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. '
    'Aspect ratio 2:3 vertical book jacket.'
)

if __name__ == '__main__':
    res = create_and_produce_cover(1053, brief, "Saving Indonesia's Coral Reefs")
    print("SUCCESS:", res)
