import sys
sys.path.append('tools')
from canva_pipeline import create_and_produce_cover

brief = (
    'Book cover design titled "P.S. What\'s up with the climate?". The title "P.S. What\'s up with the climate?" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. EARTH SCIENCE AND CLIMATE BALANCE DAYLIGHT STYLE: An educational, balanced split-composition of our planet\'s climate in clear daylight. On one side, a pristine melting arctic glacier with turquoise meltwater feeding a clean river; on the other side, modern green solutions: modern white wind turbines on green rolling hills, sleek rooftop solar panels, and reforestation saplings, tied together by an atmospheric temperature gradient and carbon cycle diagram. Palette: glacier ice turquoise and white, rolling hills emerald green, solar panels cobalt blue, and sky clear sunny azure. Climate science, renewable energy, environmental stewardship, Earth systems, empowering and educational. STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. Aspect ratio 2:3 vertical book jacket.'
)

if __name__ == '__main__':
    res = create_and_produce_cover(2366, brief, 'Whats up with climate global warming polar ice renewable solar earth science')
    print("SUCCESS:", res)
