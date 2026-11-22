import sys
sys.path.append('tools')
from canva_pipeline import create_and_produce_cover

brief = (
    'Book cover design titled "Avoiding Earthquake Surprises in the Pacific Northwest". The title "Avoiding Earthquake Surprises in the Pacific Northwest" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. BRIGHT CASCADIA SEISMOLOGY & GEODESY DAYLIGHT STYLE: A sunlit Pacific Northwest coastal geological site on a clear sunny day in bright daylight. In the center foreground, a modern solar-powered continuous GPS geodetic monitoring station and seismic telemetry antenna anchored securely into coastal bedrock, with digital displays recording tectonic subduction strain. In the background, iconic coastal Sitka spruce forests and dramatic sea stack cliffs meet the Pacific Ocean under a brilliant blue sky. Palette: GPS station brushed aluminum and solar cobalt, coastal forest deep evergreen, ocean turquoise, and sky clear cyan. Seismology, Cascadia subduction zone, earthquake early warning, geophysics, vigilant, bright, educational, completely daylight. STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. Aspect ratio 2:3 vertical book jacket.'
)

if __name__ == '__main__':
    res = create_and_produce_cover(1506, brief, 'Avoiding Earthquake Surprises in the Pacific Northwest')
    print("SUCCESS:", res)
