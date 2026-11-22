import sys
sys.path.append('tools')
from canva_pipeline import create_and_produce_cover

brief = (
    'Book cover design titled "Lunar Eclipses and Solar Eclipses". The title "Lunar Eclipses and Solar Eclipses" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. ASTRONOMY CELESTIAL MECHANICS STYLE: A dual celestial educational composition showing both types of eclipses. On one side, a solar eclipse with the Moon perfectly covering the Sun, revealing the dazzling white corona and radiant diamond ring effect against space. On the other side, a deep copper-red Blood Moon during a total lunar eclipse. Between them, a clean geometric orbital diagram displaying the Sun, Earth, and Moon with umbra and penumbra shadow cones. Palette: solar corona radiant white, lunar eclipse rich terracotta crimson, and deep orbital midnight blue. Eclipse science, celestial mechanics, shadow geometry, astronomical wonder, educational and clear. STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. Aspect ratio 2:3 vertical book jacket.'
)

if __name__ == '__main__':
    res = create_and_produce_cover(1947, brief, 'Lunar Eclipses and Solar Eclipses astronomy umbra penumbra orbits')
    print("SUCCESS:", res)
