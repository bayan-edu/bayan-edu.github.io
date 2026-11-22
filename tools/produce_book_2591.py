import sys
sys.path.append('tools')
from canva_pipeline import create_and_produce_cover

brief = (
    'Book cover design titled "Blue Lightning". The title "Blue Lightning" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. PLASMA PHYSICS HIGH VOLTAGE STYLE: A dramatic educational science laboratory demonstration. A polished stainless steel Tesla coil toroid discharging brilliant, branching electric blue plasma lightning bolts across the air toward grounding rods, with glowing ionization channels and electrical magnetic field lines illustrated in luminous neon blue and violet. Palette: electric plasma sapphire and cobalt blue, toroid chrome silver, and background deep atmospheric navy. Electromagnetism, plasma physics, high voltage phenomena, electrifying and educational. STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. Aspect ratio 2:3 vertical book jacket.'
)

if __name__ == '__main__':
    res = create_and_produce_cover(2591, brief, 'Blue Lightning electrical discharge atmospheric plasma Tesla coil high voltage')
    print("SUCCESS:", res)
