import sys
sys.path.append('tools')
from canva_pipeline import create_and_produce_cover

brief = (
    'Book cover design titled "Observing the Weather". The title "Observing the Weather" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. PROFESSIONAL METEOROLOGICAL OBSERVATION STATION STYLE: A sun-drenched outdoor weather monitoring lawn on a clear, sunny morning. In the center foreground, a classic white slatted wooden Stevenson screen weather shelter with door open, revealing precision maximum-minimum thermometers and hygrometers. Beside it, a spinning three-cup anemometer measuring wind speed, a tipping-bucket rain gauge, and a brass aneroid barometer on a testing table. In the background, a white meteorological weather balloon ascending into a brilliant blue sky with scattered fair-weather cumulus clouds. Palette: weather shelter crisp white, brass instrument gold, lawn clover green, and brilliant sunny sky blue. Meteorology, weather observation, instruments, atmospheric science, barometric pressure, clear and educational. STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. Aspect ratio 2:3 vertical book jacket.'
)

if __name__ == '__main__':
    res = create_and_produce_cover(1817, brief, 'Observing the Weather meteorology instruments Stevenson screen barometer')
    print("SUCCESS:", res)
