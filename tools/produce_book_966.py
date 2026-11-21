import sys
sys.path.append('tools')
from canva_pipeline import create_and_produce_cover

brief = (
    'Book cover design titled "What\'s the Big Idea about Water?". '
    'The title "What\'s the Big Idea about Water?" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. '
    'BRIGHT HYDROLOGY & WATER CYCLE DAYLIGHT STYLE: A sun-drenched, radiant panoramic Earth systems landscape on a glorious morning celebrating the power of water. '
    'In the center foreground, a rushing mountain river of crystal-clear turquoise water cascading over smooth granite stones into a calm, reflective lake. '
    'In the background, a majestic sunlit blue glacier sits among snowcapped alpine peaks, while fluffy white rainclouds release a sunlit shower with a vibrant rainbow arching over green valleys. '
    'Palette: pristine river turquoise, glacier ice blue, meadow emerald, and luminous rainbow gold. '
    'Hydrology science, Earth systems, bright, educational, vivid, completely daylight. '
    'STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. '
    'NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. '
    'Aspect ratio 2:3 vertical book jacket.'
)

if __name__ == '__main__':
    res = create_and_produce_cover(966, brief, "What's the Big Idea about Water? Water's Impact on the Earth")
    print("SUCCESS:", res)
