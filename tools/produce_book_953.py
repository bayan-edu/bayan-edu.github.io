import sys
sys.path.append('tools')
from canva_pipeline import create_and_produce_cover

brief = (
    'Book cover design titled "Exploring Space with Telescopes". '
    'The title "Exploring Space with Telescopes" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. '
    'BRIGHT ASTRONOMY & TELESCOPE SCIENCE DAYLIGHT STYLE: A sun-drenched, high-altitude mountain observatory on a glorious clear morning under a deep azure sky. '
    'In the center foreground, a modern white-and-brass astronomical reflecting telescope on an equatorial motorized tripod, its polished optical primary mirror catching morning light. '
    'Beside the telescope on an observation table rest interchangeable brass eyepieces in a velvet case, celestial star charts, and an open tablet displaying a colorful spiral galaxy nebula. '
    'In the background, the iconic curved white dome of the observatory rises above distant alpine peaks and morning cloud banks under bright sunlight. '
    'Palette: observatory white, telescope brass gold, deep space navy, and brilliant azure sky blue. '
    'Optical astronomy, bright, educational, vivid, completely daylight. '
    'STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. '
    'NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. '
    'Aspect ratio 2:3 vertical book jacket.'
)

if __name__ == '__main__':
    res = create_and_produce_cover(953, brief, "Exploring Space with Telescopes")
    print("SUCCESS:", res)
