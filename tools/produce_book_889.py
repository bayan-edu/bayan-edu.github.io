import sys
sys.path.append('tools')
from canva_pipeline import create_and_produce_cover

brief = (
    'Book cover design titled "Mars Is the Red Planet". '
    'The title "Mars Is the Red Planet" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. '
    'BRIGHT PLANETARY ASTRONOMY DAYLIGHT STYLE: A sun-drenched, radiant vista of Mars under a delicate salmon-pink Martian sky in bright sunlight. '
    'In the center foreground, rust-red volcanic desert terrain with fine iron-oxide sand ripples, basalt boulders, and an autonomous robotic exploration rover with gleaming solar panels deployed. '
    'In the distant sunny horizon, the majestic volcanic slopes of Olympus Mons rise beneath the bright sun. '
    'Palette: rust-red ochre, warm copper orange, basalt charcoal, solar panel navy, and salmon sky. '
    'Space science, astronomy, bright, educational, vivid, completely daylight. '
    'STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. '
    'NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. '
    'Aspect ratio 2:3 vertical book jacket.'
)

if __name__ == '__main__':
    res = create_and_produce_cover(889, brief, "Mars Is the Red Planet")
    print("SUCCESS:", res)
