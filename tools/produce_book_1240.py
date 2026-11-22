import sys
sys.path.append('tools')
from canva_pipeline import create_and_produce_cover

brief = (
    'Book cover design titled "Earth Calling Aru". The title "Earth Calling Aru" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. BRIGHT GRAVITY & PLANETARY ATMOSPHERE DAYLIGHT STYLE: A vibrant, uplifting perspective of planet Earth surrounded by its glowing protective atmosphere in bright sunshine. In the foreground, colorful kites of geometric patterns, maple leaves, and paper airplanes float gently along visible curved lines of gravitational pull and aerodynamic air currents under a bright azure sky. Below, the lush green curve of the Earth shows rolling meadows and blue seas firmly anchored by gravity. Palette: atmospheric sky blue, earth turquoise, meadow emerald, kite vibrant crimson and yellow. Physics of gravity, atmospheric sciences, aerodynamic forces, friendly, bright, educational, completely daylight. STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. Aspect ratio 2:3 vertical book jacket.'
)

if __name__ == '__main__':
    res = create_and_produce_cover(1240, brief, 'Earth Calling Aru')
    print("SUCCESS:", res)
