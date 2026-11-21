import sys
sys.path.append('tools')
from canva_pipeline import create_and_produce_cover

brief = (
    'Book cover design titled "Power of the Sun". '
    'The title "Power of the Sun" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. '
    'BRIGHT SOLAR ENERGY & RENEWABLE SCIENCE DAYLIGHT STYLE: A sun-drenched, radiant green agricultural landscape on a glorious sunny morning under a brilliant sky. '
    'In the center foreground, a modern angled photovoltaic solar panel array with shimmering deep-blue crystalline silicon cells catching bright golden sunbeams. '
    'Beside the solar panels, a clean smart-energy inverter with glowing LED indicators powers a sparkling freshwater drip-irrigation system nourishing a vibrant field of golden sunflowers. '
    'Palette: solar panel navy blue, sunflower golden yellow, meadow emerald green, and brilliant sky blue. '
    'Renewable energy, bright, educational, vivid, completely daylight. '
    'STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. '
    'NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. '
    'Aspect ratio 2:3 vertical book jacket.'
)

if __name__ == '__main__':
    res = create_and_produce_cover(890, brief, "Power of the Sun")
    print("SUCCESS:", res)
