import sys
sys.path.append('tools')
from canva_pipeline import create_and_produce_cover

brief = (
    'Book cover design titled "Earth\'s Atmosphere: The Troposphere". '
    'The title "Earth\'s Atmosphere: The Troposphere" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. '
    'BRIGHT WEATHER & METEOROLOGY DAYLIGHT STYLE: A sun-drenched, radiant green meadow landscape on a glorious morning celebrating Earth\'s weather layer. '
    'In the center foreground, a modern meteorological field station with a spinning brass cup anemometer, a precision rain gauge, and a classic glass barometer resting on a wooden observation post. '
    'In the expansive sunny sky above, majestic, towering white cumulus clouds drift peacefully, catching golden sunbeams, with a delicate luminous rainbow arching over verdant rolling hills. '
    'Palette: brilliant sky azure, cloud puff white, meadow emerald green, instrument brass gold, and soft rainbow spectrum. '
    'Meteorological science, bright, educational, vivid, completely daylight. '
    'STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. '
    'NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. '
    'Aspect ratio 2:3 vertical book jacket.'
)

if __name__ == '__main__':
    res = create_and_produce_cover(915, brief, "Earth's Atmosphere: The Troposphere")
    print("SUCCESS:", res)
