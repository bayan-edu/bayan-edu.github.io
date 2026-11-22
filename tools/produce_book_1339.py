import sys
sys.path.append('tools')
from canva_pipeline import create_and_produce_cover

brief = (
    'Book cover design titled "What Is the International Space Station?". The title "What Is the International Space Station?" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. BRIGHT ISS ORBITAL LABORATORY DAYLIGHT STYLE: An awe-inspiring, sun-illuminated view of the International Space Station in low Earth orbit bathed in brilliant sunlight. In the center foreground, the massive space station showing its gleaming golden-orange solar array wings fully outstretched, pressurized laboratory modules, cupola observation dome, and robotic Canadarm2. Below, the radiant blue curvature of planet Earth shows glittering turquoise coastlines and swirling white cloud patterns against the deep black of space. Palette: solar arrays rich amber gold, station modules titanium white, Earth sapphire and turquoise, and brilliant sun flare white. Astronomy, space stations, ISS, microgravity research, international cooperation, bright, magnificent, educational. STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. Aspect ratio 2:3 vertical book jacket.'
)

if __name__ == '__main__':
    res = create_and_produce_cover(1339, brief, 'What Is the International Space Station')
    print("SUCCESS:", res)
