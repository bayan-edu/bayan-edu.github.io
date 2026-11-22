import sys
sys.path.append('tools')
from canva_pipeline import create_and_produce_cover

brief = (
    'Book cover design titled "Jumping the Tallest Cliff in the Solar System". The title "Tallest Cliff in the Solar System" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. EXTRATERRESTRIAL GEOLOGY & VERONA RUPES STYLE: An awe-inspiring planetary landscape of the giant Verona Rupes fault scarp on Uranus\'s moon Miranda in radiant sunlight. A colossal, sheer 20-kilometer-high vertical ice-and-rock cliff face plunging dramatically down into heavily cratered terrain below. A small robotic exploratory lander probe drifting downward on tiny thrusters in the ultra-low gravity of Miranda. In the deep cosmic sky above, the pale cyan gas giant Uranus with faint delicate rings glows proudly. Palette: cliff face fractured ice silver and charcoal, Uranus pale cyan, and deep cosmic black. Planetary geology, Verona Rupes, Miranda, Uranian moons, extreme topography, breathtaking and educational. STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. Aspect ratio 2:3 vertical book jacket.'
)

if __name__ == '__main__':
    res = create_and_produce_cover(1892, brief, 'Tallest Cliff Solar System Verona Rupes Miranda Uranus geology')
    print("SUCCESS:", res)
