import sys
sys.path.append('tools')
from canva_pipeline import create_and_produce_cover

brief = (
    'Book cover design titled "Apples: The Health Benefits". The title "Apples: The Health Benefits" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. BRIGHT APPLE ORCHARD & NUTRITIONAL SCIENCE DAYLIGHT STYLE: A sun-drenched, blooming apple orchard on a glorious autumn morning in bright daylight. In the center foreground, a rustic wooden harvest crate overflowing with polished, crisp red and green apples with fresh morning dew droplets glistening on their skin. Beside the crate on a wooden table: a sliced apple revealing star-shaped seed chambers, a glass of fresh apple cider, and an open illustrated nutritional science book detailing dietary fiber, vitamins, and antioxidants. Palette: apples ruby crimson and crisp granny smith green, wooden crate warm honey, and orchard foliage golden-green. Nutritional science, pomology, dietary health, agricultural botany, wholesome, refreshing, educational, completely daylight. STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. Aspect ratio 2:3 vertical book jacket.'
)

if __name__ == '__main__':
    res = create_and_produce_cover(1504, brief, 'Apples The Health Benefits')
    print("SUCCESS:", res)
