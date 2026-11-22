import sys
sys.path.append('tools')
from canva_pipeline import create_and_produce_cover

brief = (
    'Book cover design titled "Ice Picks". The title "Ice Picks" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. BRIGHT ANTARCTIC NEUTRINO OBSERVATORY DAYLIGHT STYLE: A breathtaking, sun-illuminated polar research station on the Antarctic ice cap under 24-hour arctic summer sunlight. In the center foreground, the modern IceCube Neutrino Observatory facility raised on red steel pillars above the vast sparkling snow plateau. In the foreground, a cylindrical Antarctic ice core glistening in direct sunlight, hot-water ice drilling cables, and a digital monitor displaying glowing spherical 3D neutrino collision photon events deep within the ice. Palette: Antarctic snow pristine diamond white and ice cyan, station exterior safety red, and sky brilliant polar blue. Astrophysics, neutrino astronomy, IceCube South Pole observatory, polar science, bright, inspiring, educational, completely daylight. STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. Aspect ratio 2:3 vertical book jacket.'
)

if __name__ == '__main__':
    res = create_and_produce_cover(1460, brief, 'Ice Picks')
    print("SUCCESS:", res)
