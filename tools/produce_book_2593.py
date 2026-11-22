import sys
sys.path.append('tools')
from canva_pipeline import create_and_produce_cover

brief = (
    'Book cover design titled "Power Play". The title "Power Play" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. SMART ELECTRICAL GRID ENGINEERING STYLE: A sun-drenched landscape featuring clean electrical infrastructure in daytime. Sleek high-voltage transmission towers carrying power lines across rolling green hills, integrating with a modern smart-grid substation equipped with glowing digital telemetry meters, renewable wind turbines, and solar arrays feeding into an illuminated energy network. Palette: sky sunny blue, fields emerald green, transmission steel silver, and glowing telemetry lines neon lime and gold. Electrical power engineering, renewable grid, smart energy distribution, dynamic and educational. STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. Aspect ratio 2:3 vertical book jacket.'
)

if __name__ == '__main__':
    res = create_and_produce_cover(2593, brief, 'Power Play electrical power grid smart meter transmission lines energy')
    print("SUCCESS:", res)
