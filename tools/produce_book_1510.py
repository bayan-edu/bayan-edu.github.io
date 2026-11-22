import sys
sys.path.append('tools')
from canva_pipeline import create_and_produce_cover

brief = (
    'Book cover design titled "Crash Test". The title "Crash Test" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. BRIGHT HIGH-VELOCITY SHOCK PHYSICS LABORATORY STYLE: A sunlit, high-tech planetary impact research laboratory in bright daytime. In the center foreground, a massive stainless steel light-gas gun barrel aiming into an illuminated, heavy steel vacuum impact test chamber with observation viewports. Surrounding the apparatus are high-speed laser chronograph sensors, fractured target ice blocks with cratering patterns, and digital telemetry monitors displaying 3D impact shockwave simulations. Palette: light-gas gun brushed stainless steel, target ice crystalline cyan, laser sensors neon red, and lab daylight white. Impact physics, planetary collisions, shock physics, planetary evolution, high-tech, bright, educational, completely daylight. STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. Aspect ratio 2:3 vertical book jacket.'
)

if __name__ == '__main__':
    res = create_and_produce_cover(1510, brief, 'Crash Test')
    print("SUCCESS:", res)
