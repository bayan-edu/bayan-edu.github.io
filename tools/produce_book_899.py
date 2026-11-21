import sys
sys.path.append('tools')
from canva_pipeline import create_and_produce_cover

brief = (
    'Book cover design titled "Environmental pollution part 2". '
    'The title "Environmental pollution part 2" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. '
    'BRIGHT ENVIRONMENTAL SCIENCE & CLEAN AIR DAYLIGHT STYLE: A sun-drenched, radiant eco-city vista on a glorious sunny morning under a spotless azure sky. '
    'In the center foreground, a modern digital air-quality monitoring station with a clean LED readout displaying "AQI: CLEAN & FRESH AIR", equipped with precision atmospheric intake sensors. '
    'In the background, visionary green sustainable architecture with vertical plant-covered balconies, clean renewable energy wind turbines, and vibrant rooftop gardens flourishing in pure, clean daylight. '
    'Palette: clean atmospheric sky blue, botanical leaf green, solar panel cobalt, and pure sunlight white. '
    'Environmental science, clean air, bright, educational, vivid, completely daylight. '
    'STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. '
    'NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. '
    'Aspect ratio 2:3 vertical book jacket.'
)

if __name__ == '__main__':
    res = create_and_produce_cover(899, brief, "Environmental pollution part 2")
    print("SUCCESS:", res)
