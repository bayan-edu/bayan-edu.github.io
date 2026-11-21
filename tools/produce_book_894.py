import sys
sys.path.append('tools')
from canva_pipeline import create_and_produce_cover

brief = (
    'Book cover design titled "What\'s This? Brain Freeze". '
    'The title "What\'s This? Brain Freeze" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. '
    'BRIGHT CRYOBIOLOGY & WINTER NATURE SCIENCE DAYLIGHT STYLE: A sun-drenched, radiant winter nature landscape on a crisp sunny morning under a brilliant azure sky. '
    'In the center foreground, a frost-dusted evergreen pine branch adorned with delicate, sparkling hexagonal ice crystals and a clear crystalline icicle melting in warm morning sunbeams. '
    'On a sunlit granite rock nearby, a laboratory cryo-vial with a digital temperature readout and a clean educational diagram of biological water freezing. '
    'In the background, snow-covered pine forests gleam in brilliant daylight. '
    'Palette: crystalline ice cyan, pure snow white, evergreen needle green, and brilliant sky blue. '
    'Cryobiology, science, bright, educational, vivid, completely daylight. '
    'STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. '
    'NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. '
    'Aspect ratio 2:3 vertical book jacket.'
)

if __name__ == '__main__':
    res = create_and_produce_cover(894, brief, "What's This? Brain Freeze")
    print("SUCCESS:", res)
