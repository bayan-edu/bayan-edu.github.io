import sys
sys.path.append('tools')
from canva_pipeline import create_and_produce_cover

brief = (
    'Book cover design titled "Where Does the Sun\'s Energy Come From?". '
    'The title "Where Does the Sun\'s Energy Come From?" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. '
    'BRIGHT SOLAR ASTROPHYSICS & NUCLEAR FUSION STYLE: A breathtaking, brilliant scientific visualization of the Sun and nuclear fusion power. '
    'In the center, the blazing golden-orange Sun in space with dynamic magnetic loops, solar prominences arching off the limb, and shimmering coronal waves releasing brilliant photons of light. '
    'In the foreground, an artistic conceptual inset or sparkling atomic visualization of hydrogen nuclei fusing into helium, releasing brilliant golden energy beams. '
    'Palette: solar brilliant gold, plasma orange, core radiant white, and deep cosmic navy. '
    'Solar physics, astronomy, nuclear fusion, energy, bright, educational, inspiring. '
    'STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. '
    'NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. '
    'Aspect ratio 2:3 vertical book jacket.'
)

if __name__ == '__main__':
    res = create_and_produce_cover(1002, brief, "Where Does the Sun's Energy Come From?")
    print("SUCCESS:", res)
