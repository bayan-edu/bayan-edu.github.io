import sys
sys.path.append('tools')
from canva_pipeline import create_and_produce_cover

brief = (
    'Book cover design titled "No Lights on the Beach". '
    'The title "No Lights on the Beach" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. '
    'SERENE COASTAL TURTLE CONSERVATION DAWN STYLE: A pristine, tranquil coastal beach at gentle morning dawn at Ras Al Jinz under a soft pastel twilight sky. '
    'In the center foreground, tiny adorable newborn sea turtle hatchlings crawling naturally down the glistening wet sand toward the glowing turquoise ocean waves. '
    'Gentle morning sea foam laps the smooth shore, reflecting soft rose-gold and amber dawn light on the horizon. '
    'Untouched, natural, serene, peaceful, and clean marine conservation concept. '
    'Palette: gentle ocean turquoise, wet sand gold, soft dawn pink, seafoam white, and deep marine blue. '
    'Environmental, serene, bright, educational, completely daylight. '
    'STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. '
    'NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. '
    'Aspect ratio 2:3 vertical book jacket.'
)

if __name__ == '__main__':
    res = create_and_produce_cover(681, brief, "No Lights on the Beach")
    print("SUCCESS:", res)
