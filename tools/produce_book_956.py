import sys
sys.path.append('tools')
from canva_pipeline import create_and_produce_cover

brief = (
    'Book cover design titled "Loopy Loops". '
    'The title "Loopy Loops" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. '
    'BRIGHT SATURN RINGS & SPACE SCIENCE DAYLIGHT STYLE: A sun-illuminated, magnificent close-up of Saturn\'s iconic concentric ring system bathed in direct sunlight. '
    'In the center foreground, billions of shimmering crystalline ice particles create sharp, delicate braided ringlets with clean concentric division gaps reflecting bright solar rays. '
    'A sleek scientific space exploration probe with a large white dish antenna and gold foil insulation sails gracefully along the ring plane. '
    'In the background, the warm golden-amber curve of Saturn\'s banded atmosphere glows under bright celestial illumination. '
    'Palette: ice crystal diamond white, ringlet amber gold, spacecraft gold foil, and Saturn warm cream. '
    'Planetary science, astronomy, bright, educational, vivid, completely daylight. '
    'STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. '
    'NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. '
    'Aspect ratio 2:3 vertical book jacket.'
)

if __name__ == '__main__':
    res = create_and_produce_cover(956, brief, "Loopy Loops")
    print("SUCCESS:", res)
