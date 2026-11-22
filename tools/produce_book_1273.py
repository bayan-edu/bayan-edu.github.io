import sys
sys.path.append('tools')
from canva_pipeline import create_and_produce_cover

brief = (
    'Book cover design titled "Engineering and Natural Gas". The title "Engineering and Natural Gas" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. BRIGHT MECHANICAL ENGINEERING DAYLIGHT STYLE: A clean, modern natural gas distribution and pipeline engineering facility under bright blue skies in daylight. In the center foreground, gleaming industrial steel pipes with bright yellow coating, high-pressure brass control valves, precision digital pressure gauges, and pipeline inspection gauges. On an outdoor engineer\'s drafting table rests an open set of mechanical pipeline schematics and blueprints, a yellow safety hardhat, and a digital tablet showing flow analytics. Palette: pipe safety yellow and brushed steel silver, valve polished brass, blueprint technical blue, and daylight sky cyan. Mechanical engineering, energy distribution, pipeline infrastructure, utilities, bright, educational, completely daylight. STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. Aspect ratio 2:3 vertical book jacket.'
)

if __name__ == '__main__':
    res = create_and_produce_cover(1273, brief, 'Engineering and Natural Gas')
    print("SUCCESS:", res)
