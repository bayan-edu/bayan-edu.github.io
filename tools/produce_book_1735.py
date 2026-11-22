import sys
sys.path.append('tools')
from canva_pipeline import create_and_produce_cover

brief = (
    'Book cover design titled "What Is a Comet?". The title "What Is a Comet?" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. CELESTIAL COMETARY ASTRONOMY & SOLAR WIND STYLE: A high-detail, scientifically grounded view of an active comet orbiting through the inner solar system, bathed in bright sunlight. In the center foreground, the irregular icy comet nucleus (dirty snowball of rock, dust, and water ice) actively venting volatile jets of gas and dust. A glowing cyan spherical coma envelope and two spectacular sweeping tails: a straight, glowing electric blue ion gas tail pointed away from the Sun, and a curved golden-white dust tail. Orbital perihelion path diagrams and planetary orbits illustrated cleanly in the background. Palette: ion tail electric cyan, dust tail golden white, nucleus dark charcoal, and deep space sapphire. Cometary science, Oort cloud and Kuiper belt, solar wind interaction, celestial astronomy, majestic and educational. STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. Aspect ratio 2:3 vertical book jacket.'
)

if __name__ == '__main__':
    res = create_and_produce_cover(1735, brief, 'What Is a Comet cometary astronomy dirty snowball coma tail')
    print("SUCCESS:", res)
