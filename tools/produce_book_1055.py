import sys
sys.path.append('tools')
from canva_pipeline import create_and_produce_cover

brief = (
    'Book cover design titled "Space Weather". '
    'The title "Space Weather" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. '
    'BRIGHT SOLAR WIND & MAGNETOSPHERE ASTROPHYSICS STYLE: A breathtaking, brilliant scientific visualization of space weather and solar-terrestrial physics. '
    'In the center, the blazing golden Sun releasing dynamic coronal mass ejection plasma loops, sending energetic solar wind particles across space toward Earth. '
    'Earth\'s protective magnetic shield glows with electric cobalt field lines deflecting plasma into vibrant dancing emerald and violet auroral curtains over the northern polar cap. '
    'In the foreground, a sleek space weather monitoring scientific satellite with extended magnetometer booms catching brilliant sunbeams. '
    'Palette: solar plasma brilliant gold and amber, magnetosphere electric cobalt, aurora emerald and violet, and cosmic deep navy. '
    'Space physics, solar weather, astronomy, magnetosphere, bright, educational, breathtaking. '
    'STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. '
    'NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. '
    'Aspect ratio 2:3 vertical book jacket.'
)

if __name__ == '__main__':
    res = create_and_produce_cover(1055, brief, "Space Weather")
    print("SUCCESS:", res)
