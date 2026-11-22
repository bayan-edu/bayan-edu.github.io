import sys
sys.path.append('tools')
from canva_pipeline import create_and_produce_cover

brief = (
    'Book cover design titled "What Are Climate and Climate Change?". The title "What Are Climate and Climate Change?" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. BRIGHT GLOBAL CLIMATE ZONES & WEATHER SCIENCE DAYLIGHT STYLE: A sun-drenched, engaging comparative montage of Earth\'s climate zones in bright daylight. In the center, an illuminated physical desk globe displaying distinct climate bands (tropical rainforest, temperate meadow, arid desert, and polar ice sheet). Surrounding the globe on a wooden study table are polished weather instruments: an aneroid brass barometer, a classic thermometer, a rain gauge, and open climate maps illustrating decades-long weather patterns. Palette: globe oceans sapphire, tropical zones emerald, arid zones ochre, brass instruments polished gold, and room daylight ivory. Climatology, global climate zones, weather vs climate, environmental science, clear, engaging, educational, completely daylight. STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. Aspect ratio 2:3 vertical book jacket.'
)

if __name__ == '__main__':
    res = create_and_produce_cover(1542, brief, 'What Are Climate and Climate Change')
    print("SUCCESS:", res)
