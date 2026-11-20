import sys
sys.path.append('tools')
from canva_pipeline import create_and_produce_cover

brief = (
    'Book cover design titled "Wet Cloths on the Floor". '
    'The title "Wet Cloths on the Floor" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. '
    'BRIGHT ARCHITECTURAL CONSTRUCTION & SCIENCE DAYLIGHT STYLE: A sun-drenched, radiant outdoor building site on a clear, sunny morning under a brilliant blue sky. '
    'In the center foreground, a pristine smooth newly-poured architectural concrete floor slab neatly covered with damp, textured natural burlap cloths to cure and retain moisture. '
    'A clean bright-green garden hose with a polished brass nozzle lies nearby, releasing a fine, sparkling mist of water that catches the golden sunlight with tiny prism reflections. '
    'Clean wooden formwork frames the site in the bright, open daylight. '
    'Palette: smooth concrete grey, natural burlap tan, garden hose green, sparkling mist rainbow, and clear azure sky. '
    'Architectural, bright, educational, vivid, completely daylight. '
    'STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. '
    'NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. '
    'Aspect ratio 2:3 vertical book jacket.'
)

if __name__ == '__main__':
    res = create_and_produce_cover(672, brief, "Wet Cloths on the Floor")
    print("SUCCESS:", res)
