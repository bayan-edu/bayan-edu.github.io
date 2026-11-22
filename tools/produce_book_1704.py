import sys
sys.path.append('tools')
from canva_pipeline import create_and_produce_cover

brief = (
    'Book cover design titled "Clean Energy". The title "Clean Energy" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. RADIANT RENEWABLE ENERGY PANORAMA DAYLIGHT STYLE: A bright, sun-drenched future-ready green landscape celebrating clean power under a brilliant blue sky. In harmonious balance across the scenic hills: sleek white wind turbine towers rotating in the breeze, a modern photovoltaic solar farm with sparkling dark blue panels, and a clean hydroelectric waterfall dam with rushing turquoise water in the valley. Subtle glowing green smart-grid electrical transmission lines connecting them harmoniously to a clean, modern eco-city in the distance. Palette: solar navy blue, turbine clean white, meadow emerald green, water aquamarine, and sunlight radiant gold. Renewable energy, sustainability, clean technology, decarbonization, bright, optimistic, and educational. STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. Aspect ratio 2:3 vertical book jacket.'
)

if __name__ == '__main__':
    res = create_and_produce_cover(1704, brief, 'Clean Energy renewable sustainable solar wind hydro grid')
    print("SUCCESS:", res)
