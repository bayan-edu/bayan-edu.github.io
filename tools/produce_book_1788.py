import sys
sys.path.append('tools')
from canva_pipeline import create_and_produce_cover

brief = (
    'Book cover design titled "How Many Moons?". The title "How Many Moons?" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. SOLAR SYSTEM SATELLITE SYSTEM COMPARISON STYLE: A brilliant, sun-illuminated astronomical diagram comparing moon systems across the solar system. Mercury and Venus shown with a zero (0 moons); Earth with its single glowing Moon (1); Mars with Phobos and Deimos (2); and giant gas giants Jupiter and Saturn surrounded by vast constellations of orbiting natural satellites (over 90+ and 140+ moons!). Concentric circular orbital tracks etched in glowing cyan and gold against a star-sprinkled deep space backdrop. Palette: Saturn golden rings, Jupiter striped amber, Earth ocean blue, lunar silver, and orbital electric cyan. Planetary astronomy, natural satellites, solar system scale, comparative planetology, clear, magnificent, and educational. STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. Aspect ratio 2:3 vertical book jacket.'
)

if __name__ == '__main__':
    res = create_and_produce_cover(1788, brief, 'How Many Moons planetary satellites solar system counts')
    print("SUCCESS:", res)
