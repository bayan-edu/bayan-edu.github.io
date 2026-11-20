import sys
sys.path.append('tools')
from canva_pipeline import create_and_produce_cover

brief = (
    'Book cover design titled "Seeds in the Sand". '
    'The title "Seeds in the Sand" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. '
    'BRIGHT DESERT BOTANY DAYLIGHT STYLE: A sun-drenched, radiant desert landscape on a glorious morning after a desert rainstorm under a clear azure sky. '
    'In the center foreground, golden rippled sand dunes bursting with resilient life: patches of vibrant emerald-green fresh grass and cheerful, bright yellow desert wildflowers blooming in clusters. '
    'Tiny, glistening rain droplets rest on the delicate flower petals, reflecting golden morning sunlight. '
    'In the background, sweeping warm red and golden sand dunes stretch to the sunny horizon. '
    'Palette: sunny wildflower yellow, desert golden amber, fresh sprout green, and clear azure sky blue. '
    'Botany, bright, educational, vivid, completely daylight. '
    'STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. '
    'NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. '
    'Aspect ratio 2:3 vertical book jacket.'
)

if __name__ == '__main__':
    res = create_and_produce_cover(675, brief, "Seeds in the Sand")
    print("SUCCESS:", res)
