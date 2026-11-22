import sys
sys.path.append('tools')
from canva_pipeline import create_and_produce_cover

brief = (
    'Book cover design titled "A Shade of GREEN". The title "A Shade of GREEN" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. BRIGHT URBAN AIR QUALITY & GREEN OASIS DAYLIGHT STYLE: A sunlit urban rooftop garden and green sanctuary in bright daylight. In the center foreground, lush vertical living walls of ivy, ferns, and air-purifying plants flourishing in sunlight. On a wooden bench rests a clean solar-powered air monitoring station with a glowing green digital readout indicating "Clean Air Zone", beside potted saplings and blooming marigolds under a bright azure sky. Palette: vegetation vibrant lime and emerald green, bench natural teak, flower marigold orange, and sky brilliant cyan. Environmental science, urban pollution solutions, clean air technology, ecology, hopeful, bright, educational, completely daylight. STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. Aspect ratio 2:3 vertical book jacket.'
)

if __name__ == '__main__':
    res = create_and_produce_cover(1439, brief, 'A Shade of GREEN')
    print("SUCCESS:", res)
