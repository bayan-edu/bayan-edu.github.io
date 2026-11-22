import sys
sys.path.append('tools')
from canva_pipeline import create_and_produce_cover

brief = (
    'Book cover design titled "Weather or Not". The title "Weather or Not" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. METEOROLOGICAL SCIENCE INSTRUMENTATION STYLE: A bright, sunlit professional weather station in daytime. A spinning cup anemometer, an antique brass aneroid barometer, a digital Doppler radar display showing rainfall fronts, a glass thermometer, and a rain gauge set against an atmospheric sky with a gentle sunshower and a vibrant double rainbow. Palette: sky atmospheric blue, rainbow vivid spectral spectrum, weather instruments polished brass and silver, and grass fresh green. Meteorology, weather forecasting, atmospheric pressure, scientific instruments, lively and educational. STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. Aspect ratio 2:3 vertical book jacket.'
)

if __name__ == '__main__':
    res = create_and_produce_cover(2402, brief, 'Weather or Not meteorology weather forecasting instruments barometer radar')
    print("SUCCESS:", res)
