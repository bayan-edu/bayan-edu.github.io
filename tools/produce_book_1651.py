import sys
sys.path.append('tools')
from canva_pipeline import create_and_produce_cover

brief = (
    'Book cover design titled "Moving Through Space". The title "Moving Through Space" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. DYNAMIC ORBITAL MECHANICS & PROPULSION STYLE: A high-tech spacecraft maneuvering through solar orbit, bathed in brilliant sunlight. An advanced interplanetary probe firing glowing blue ion propulsion thrusters, leaving a subtle ionized plasma trail. Curved orbital trajectory lines showing Hohmann transfer orbits, gravitational slingshot velocity vectors, and elliptical planetary transfer paths around the Sun. Solar array wings glistening with golden photovoltaic reflections against the vast cosmic vista. Palette: ion thruster electric cyan, solar gold, spacecraft thermal foil silver, and deep orbit navy blue. Orbital mechanics, space propulsion, trajectory physics, astrodynamics, futuristic and educational. STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. Aspect ratio 2:3 vertical book jacket.'
)

if __name__ == '__main__':
    res = create_and_produce_cover(1651, brief, 'Moving Through Space orbital mechanics propulsion spacecraft')
    print("SUCCESS:", res)
