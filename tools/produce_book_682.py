import sys
sys.path.append('tools')
from canva_pipeline import create_and_produce_cover

brief = (
    'Book cover design titled "Light First, Noise After". '
    'The title "Light First, Noise After" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. '
    'BRIGHT METEOROLOGY & PHYSICS SCIENCE DAYLIGHT STYLE: A dynamic countryside landscape under an afternoon sky showing weather physics in action. '
    'In the center foreground, a modern stainless-steel digital stopwatch counting seconds (showing "00:05.00") resting on a clean wooden fence post overlooking lush green fields. '
    'In the distant horizon, a dramatic localized rain shower where a bright, crisp branching fork of electric lightning flashes dramatically from cloud to ground, while warm afternoon sunlight illuminates the rolling meadow. '
    'Palette: meadow emerald green, electric lightning brilliant white, slate-blue storm clouds, steel chrome, and warm afternoon gold. '
    'Meteorological, bright, educational, vivid, completely daylight. '
    'STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. '
    'NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. '
    'Aspect ratio 2:3 vertical book jacket.'
)

if __name__ == '__main__':
    res = create_and_produce_cover(682, brief, "Light First, Noise After")
    print("SUCCESS:", res)
