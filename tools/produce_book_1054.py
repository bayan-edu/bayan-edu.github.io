import sys
sys.path.append('tools')
from canva_pipeline import create_and_produce_cover

brief = (
    'Book cover design titled "Space Junk". '
    'The title "Space Junk" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. '
    'BRIGHT ORBITAL SUSTAINABILITY & SPACE DEBRIS STYLE: A dramatic and inspiring sun-illuminated view of low Earth orbit and active debris remediation. '
    'In the center foreground, an advanced robotic remediation satellite extending an articulated carbon-fiber mechanical capture arm toward a tumbling fragment of a retired rocket booster casing catching bright sunbeams. '
    'Glittering metallic space hardware, disconnected solar cells, and discarded satellite antennas drift harmlessly in high orbit. '
    'In the background, the vast glowing curved horizon of Earth with blue oceans, fluffy white cloud swirls, and golden sunlight along the atmospheric terminator against deep starry space. '
    'Palette: satellite carbon grey and gold foil, debris titanium silver, Earth sapphire blue, and deep space navy. '
    'Space exploration, orbital debris, aerospace engineering, sustainability, bright, educational, futuristic. '
    'STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. '
    'NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. '
    'Aspect ratio 2:3 vertical book jacket.'
)

if __name__ == '__main__':
    res = create_and_produce_cover(1054, brief, "Space Junk")
    print("SUCCESS:", res)
