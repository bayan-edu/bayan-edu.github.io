import sys
sys.path.append('tools')
from canva_pipeline import create_and_produce_cover

brief = (
    'Book cover design titled "Magnetic Fields and the Magnetic Compass". The title "Magnetic Fields & Compasses" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. GEOMAGNETISM & MARITIME NAVIGATION DAYLIGHT STYLE: A sun-drenched maritime navigation explorer desk bathed in bright morning sunlight. In the center foreground, an ornate antique brass gimbaled mariner\'s compass resting on a weathered maritime sea chart. Beside it, a 3D translucent model of Earth in space showing the geomagnetic dipole core generating magnetic field lines that wrap around the planet, deflecting solar wind particles. Fine iron filings on glass tracing invisible magnetic flux lines. Palette: polished brass gold, sea chart parchment cream, geomagnetic field line electric cyan, and oceanic navy blue. Geomagnetism, magnetic compass, maritime navigation, Earth\'s magnetic field, physics of magnetism, clear and educational. STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. Aspect ratio 2:3 vertical book jacket.'
)

if __name__ == '__main__':
    res = create_and_produce_cover(1852, brief, 'Magnetic Fields Magnetic Compass geomagnetism navigation Faraday')
    print("SUCCESS:", res)
