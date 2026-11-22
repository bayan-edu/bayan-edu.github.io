import sys
sys.path.append('tools')
from canva_pipeline import create_and_produce_cover

brief = (
    'Book cover design titled "Studying Soil: Why is Dirt Important?". The title "Studying Soil: Why is Dirt Important?" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. BRIGHT PEDOLOGY & SOIL HORIZONS DAYLIGHT STYLE: A sun-drenched, fascinating geological and biological cutaway cross-section of living soil in bright daylight. In the center, stratified soil layers: rich dark organic humus at the surface with sprouting green seedlings and branching root networks, down to mineral subsoil and parent bedrock. Beside the cross-section rest soil scientist tools: a stainless steel soil sampling core probe, magnifying lens, a colorful soil pH colorimeter chart, and glass specimen vials. Palette: rich loam dark umber, clay ochre, seedling fresh lime green, sampling probe polished steel, and sky bright blue. Soil science, pedology, agriculture, nutrient cycle, Earth science, bright, educational, completely daylight. STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. Aspect ratio 2:3 vertical book jacket.'
)

if __name__ == '__main__':
    res = create_and_produce_cover(1287, brief, 'Studying Soil: Why is Dirt Important?')
    print("SUCCESS:", res)
