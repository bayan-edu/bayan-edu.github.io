import sys
sys.path.append('tools')
from canva_pipeline import create_and_produce_cover

brief = (
    'Book cover design titled "Black Hole Rescue". The title "Black Hole Rescue" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. RELATIVISTIC ASTROPHYSICS & BLACK HOLE GRAVITATION STYLE: A scientifically accurate and breathtaking view of a supermassive black hole in deep space. In the center, the pitch-black shadow of the black hole framed by a brilliant, swirling golden-orange accretion disk of superheated relativistic plasma. Dramatic gravitational lensing bending the light of background stars into glowing Einstein rings around the Event Horizon. In the safe foreground, an advanced robotic exploration probe maneuvering with ion thrusters, transmitting telemetry data back to safety. Palette: accretion disk radiant orange and gold, black hole shadow pitch black, Einstein ring cyan, and deep space navy. Astrophysics, general relativity, black holes, event horizon, gravitational lensing, awe-inspiring and educational. STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. Aspect ratio 2:3 vertical book jacket.'
)

if __name__ == '__main__':
    res = create_and_produce_cover(1942, brief, 'Black Hole Rescue relativistic astrophysics event horizon gravitational lensing')
    print("SUCCESS:", res)
