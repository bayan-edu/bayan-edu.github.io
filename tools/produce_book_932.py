import sys
sys.path.append('tools')
from canva_pipeline import create_and_produce_cover

brief = (
    'Book cover design titled "Train of Thought: Newton\'s Ball". '
    'The title "Train of Thought: Newton\'s Ball" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. '
    'BRIGHT ORBITAL MECHANICS & PHYSICS DAYLIGHT STYLE: A sun-drenched, panoramic mountaintop physics observatory on a glorious sunny morning under a brilliant blue sky. '
    'In the center foreground, a polished brass miniature physics demonstration cannon on a high alpine summit overlooking the vast curvature of the Earth. '
    'A radiant, glowing golden orbital trajectory arc curves gracefully around the Earth\'s blue horizon, illustrating Newton\'s famous cannonball orbital thought experiment. '
    'Beside the cannon on a rustic wooden table rest a brass drafting compass, an hourglass, and an open notebook with neat geometric orbital curves. '
    'Palette: instrument polished brass, glowing arc gold, alpine granite slate, and vibrant Earth curve blue. '
    'Physics science, bright, educational, vivid, completely daylight. '
    'STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. '
    'NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. '
    'Aspect ratio 2:3 vertical book jacket.'
)

if __name__ == '__main__':
    res = create_and_produce_cover(932, brief, "Train of Thought: Newton's Ball")
    print("SUCCESS:", res)
