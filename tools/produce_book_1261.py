import sys
sys.path.append('tools')
from canva_pipeline import create_and_produce_cover

brief = (
    'Book cover design titled "My City Rocks!". The title "My City Rocks!" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. BRIGHT GEOLOGY & ROCK FORMATIONS DAYLIGHT STYLE: A sun-drenched geological park featuring ancient natural granite rock formations under bright blue skies in full daylight. In the center foreground, magnificent balancing granite boulders and rock tor formations, sculpted by millions of years of natural weathering. On a flat stone in the foreground rest a geologist\'s rock hammer, a brass magnifying hand lens, and an open field notebook with hand-drawn mineral sketches and rock strata diagrams. Palette: granite warm ochre and slate gray, hammer steel and hickory brown, field grass golden-green, and sky clear cyan. Geology, mineralogy, natural heritage, rock walks, educational, bright, rugged, completely daylight. STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. Aspect ratio 2:3 vertical book jacket.'
)

if __name__ == '__main__':
    res = create_and_produce_cover(1261, brief, 'My City Rocks!')
    print("SUCCESS:", res)
