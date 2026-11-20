import sys
sys.path.append('tools')
from canva_pipeline import create_and_produce_cover

brief = (
    'Book cover design titled "Cold Water, Not Ice". '
    'The title "Cold Water, Not Ice" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. '
    'BRIGHT MODERN KITCHEN FIRST-AID DAYLIGHT STYLE: A sun-drenched, radiant family kitchen on a bright sunny morning with natural sunlight streaming through a clean glass window. '
    'In the center foreground, a sparkling clean chrome kitchen faucet runs clear, cool, refreshing stream of water smoothly into a pristine white ceramic sink basin. '
    'Next to the sink on a bright, clean wooden countertop sits a neat vintage mechanical kitchen timer counting down minutes, a freshly folded soft pastel-blue cotton towel, and a glass cup of fresh water with clear water droplets. '
    'On the sunny windowsill in the soft background are vibrant green potted mint and basil plants glowing in the warm morning daylight. '
    'Palette: fresh sky blue, sparkling crystal water, clean white, warm natural wood, and bright herb green. '
    'Reassuring, bright, educational, vivid, completely daylight. '
    'STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. '
    'NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. '
    'Aspect ratio 2:3 vertical book jacket.'
)

if __name__ == '__main__':
    res = create_and_produce_cover(659, brief, "Cold Water Not Ice")
    print("SUCCESS:", res)
