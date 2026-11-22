import sys
sys.path.append('tools')
from canva_pipeline import create_and_produce_cover

brief = (
    'Book cover design titled "Wind-Related Weather". The title "Wind-Related Weather" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. DYNAMIC ATMOSPHERIC WIND & PRESSURE SYSTEMS DAYLIGHT STYLE: A sunlit coastal weather bluff overlooking a windy ocean bay on a bright afternoon. In the foreground, a modern digital weather station with a rapidly spinning cup anemometer and wind vane pointing into the sea breeze. A synoptic surface weather map showing concentric curved isobar pressure contour lines, High (H) and Low (L) pressure centers, and arrows illustrating the Coriolis force curving winds across the landscape. Windswept coastal cypress trees, dynamic ocean waves with whitecaps, and billowy cloud formations under sunny skies. Palette: ocean deep cobalt and white spray, weather map cyan and red isobars, cypress green, and bright sunny sky. Meteorology, wind physics, atmospheric pressure gradients, Coriolis effect, weather systems, dynamic and educational. STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. Aspect ratio 2:3 vertical book jacket.'
)

if __name__ == '__main__':
    res = create_and_produce_cover(1824, brief, 'Wind Related Weather atmospheric pressure Coriolis anemometer')
    print("SUCCESS:", res)
