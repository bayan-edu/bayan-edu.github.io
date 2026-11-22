import sys
sys.path.append('tools')
from canva_pipeline import create_and_produce_cover

brief = (
    'Book cover design titled "Rising Water: How Climate Is Affecting Coastal Areas". '
    'The title "Rising Water: How Climate Is Affecting Coastal Areas" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. '
    'BRIGHT COASTAL OCEANOGRAPHY & RESILIENCE DAYLIGHT STYLE: A sunlit, stunning coastal estuary and barrier island shoreline on a bright sunny morning in natural daylight. '
    'In the center foreground, on a weathered wooden maritime walkway: a precision brass and digital coastal tide-gauge sensor with water level markings, an open oceanographic bathymetry chart, and natural thriving mangrove roots and sea oats stabilizing the sandy dune barrier. '
    'In the background, sparkling turquoise ocean tides meeting clean sandy shores, with a classic white-and-red lighthouse standing firm under a radiant blue sky. '
    'Palette: ocean turquoise and sapphire, sand golden ochre, mangrove lush green, and lighthouse clean white. '
    'Oceanography, coastal climate resilience, sea levels, ecology, bright, educational, inspiring, completely daylight. '
    'STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. '
    'NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. '
    'Aspect ratio 2:3 vertical book jacket.'
)

if __name__ == '__main__':
    res = create_and_produce_cover(1039, brief, "Rising Water: How Climate Is Affecting Coastal Areas")
    print("SUCCESS:", res)
