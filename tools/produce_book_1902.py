import sys
sys.path.append('tools')
from canva_pipeline import create_and_produce_cover

brief = (
    'Book cover design titled "Your Recycled House". The title "Your Recycled House" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. SUSTAINABLE ARCHITECTURE & GREEN BUILDING DAYLIGHT STYLE: A sun-drenched, innovative modern eco-home in a sunny garden setting in bright natural daylight. Clearly showcasing ingenious recycled building materials: reclaimed weathered timber siding, polished terrazzo countertops made from crushed recycled colored glass, recycled denim and cellulose insulation cutaway, and rooftop solar photovoltaic tiles under clear blue skies. A rainwater harvesting barrel and a blooming rooftop sedum living green roof. Palette: reclaimed timber warm honey, crushed glass sparkling multi-color, solar panel navy, and garden emerald green. Green architecture, sustainable building materials, circular economy, eco-homes, bright, inspiring, and educational. STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. Aspect ratio 2:3 vertical book jacket.'
)

if __name__ == '__main__':
    res = create_and_produce_cover(1902, brief, 'Your Recycled House sustainable architecture green building materials')
    print("SUCCESS:", res)
