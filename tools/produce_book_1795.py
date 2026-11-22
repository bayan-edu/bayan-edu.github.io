import sys
sys.path.append('tools')
from canva_pipeline import create_and_produce_cover

brief = (
    'Book cover design titled "Rocket Ships". The title "Rocket Ships" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. AEROSPACE LAUNCH & MULTI-STAGE ROCKETRY STYLE: A dramatic daytime space launch scene under brilliant sunny skies. A towering, sleek modern multistage space exploration rocket ascending majestically into the clear blue troposphere, leaving a massive, billowing column of clean white exhaust smoke and golden rocket engine fire. Cutaway educational inset showing multi-stage rocket staging: liquid oxygen fuel tanks, combustion chambers, rocket nozzles, and payload fairing capsule. Launchpad gantry tower and ocean coastline in the background far below. Palette: rocket exterior titanium white and chrome, engine flame golden orange, exhaust billow pearl, and launch sky azure blue. Aerospace engineering, rocketry, space exploration, propulsion physics, thrilling, inspiring, and educational. STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. Aspect ratio 2:3 vertical book jacket.'
)

if __name__ == '__main__':
    res = create_and_produce_cover(1795, brief, 'Rocket Ships aerospace engineering space launch multi stage')
    print("SUCCESS:", res)
