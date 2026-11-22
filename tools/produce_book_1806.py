import sys
sys.path.append('tools')
from canva_pipeline import create_and_produce_cover

brief = (
    'Book cover design titled "Victoria Falls: The Smoke That Thunders". The title "Victoria Falls" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. SPECTACULAR ZAMBEZI WATERFALL GEOLOGY DAYLIGHT STYLE: A breathtaking, sun-drenched panorama of Victoria Falls (Mosi-oa-Tunya) on the Zambezi River in radiant midday sunlight. The colossal curtain of roaring white water plummeting over a mile-wide sheer basalt cliff into the deep zigzagging gorge below. A massive plume of billowing white water spray (the smoke that thunders) rising hundreds of feet into the air, crowned by a brilliant full-circle double rainbow glistening in the sun. Lush green riverine rainforest along the cliff edge under an azure African sky. Palette: cascading water foaming white, mist spray rainbow prismatic colors, basalt gorge charcoal, and lush cliff emerald. Waterfalls, fluvial geomorphology, Zambezi geology, natural wonders of Africa, majestic, thunderous, and educational. STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. Aspect ratio 2:3 vertical book jacket.'
)

if __name__ == '__main__':
    res = create_and_produce_cover(1806, brief, 'Victoria Falls Zambezi river geology waterfall spray rainbow')
    print("SUCCESS:", res)
