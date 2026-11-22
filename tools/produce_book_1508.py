import sys
sys.path.append('tools')
from canva_pipeline import create_and_produce_cover

brief = (
    'Book cover design titled "Biochar". The title "Biochar" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. BRIGHT AGRICULTURAL BIOCHAR & SOIL SCIENCE DAYLIGHT STYLE: A sun-drenched university agricultural research test plot in bright natural daylight. In the center foreground, rich, fertile dark loam soil blended with porous black biochar granules, showing healthy, thriving green vegetable seedlings with extensive root nodules. Beside the plot on a clean wooden field table rest glass jars of pure crushed biochar, a stainless steel soil corer, and electronic soil moisture meters. In the background, flourishing green crop fields and modern research greenhouses stand under a clear azure sky. Palette: biochar carbon black, soil rich umber, crop seedlings vibrant lime green, and sky bright summer cyan. Soil science, biochar carbon sequestration, sustainable agriculture, agronomy, bright, green, educational, completely daylight. STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. Aspect ratio 2:3 vertical book jacket.'
)

if __name__ == '__main__':
    res = create_and_produce_cover(1508, brief, 'Biochar')
    print("SUCCESS:", res)
