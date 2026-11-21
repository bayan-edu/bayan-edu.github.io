import sys
sys.path.append('tools')
from canva_pipeline import create_and_produce_cover

brief = (
    'Book cover design titled "Spacecraft". '
    'The title "Spacecraft" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. '
    'BRIGHT AEROSPACE ENGINEERING & EXPLORATION DAYLIGHT STYLE: A sun-illuminated orbital view of an advanced deep-space exploration probe bathed in direct brilliant sunlight. '
    'In the center foreground, the spacecraft features large, gleaming solar array wings in shimmering dark-blue, a large white parabolic communication dish antenna, and golden thermal foil insulation details. '
    'In the background, Earth\'s vibrant turquoise oceans, swirling bright white clouds, and sunlit continents curve gracefully beneath the spacecraft. '
    'Palette: spacecraft titanium white, solar panel cobalt, thermal foil gold, and Earth ocean cyan. '
    'Aerospace technology, bright, educational, vivid, completely daylight. '
    'STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. '
    'NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. '
    'Aspect ratio 2:3 vertical book jacket.'
)

if __name__ == '__main__':
    res = create_and_produce_cover(909, brief, "Spacecraft")
    print("SUCCESS:", res)
