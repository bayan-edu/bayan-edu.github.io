import sys
sys.path.append('tools')
from canva_pipeline import create_and_produce_cover

brief = (
    'Book cover design titled "3... 2... 1... Blast-off!". The title "3... 2... 1... Blast-Off!" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. EXCITING ROCKET LAUNCH & PROPULSION PHYSICS STYLE: A dramatic, sunlit coastal spaceport launchpad scene under clear azure skies. In the center, a powerful multistage exploration rocket lifting off with immense energy, brilliant golden-white engine exhaust flames, and colossal billowing clouds of water steam from the launchpad sound suppression trenches. Digital countdown clock numbers (3, 2, 1) and velocity telemetry readout curves in clean graphic design. Blue ocean and Florida coastline in the background under bright sunshine. Palette: rocket exterior titanium white and orange, engine flame solar gold, launch steam billowing white, and sky azure cyan. Rocketry, spaceflight, launch countdown, propulsion physics, aerospace excitement, dynamic and educational. STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. Aspect ratio 2:3 vertical book jacket.'
)

if __name__ == '__main__':
    res = create_and_produce_cover(1877, brief, '3 2 1 Blast-off rocket propulsion launch physics countdown')
    print("SUCCESS:", res)
