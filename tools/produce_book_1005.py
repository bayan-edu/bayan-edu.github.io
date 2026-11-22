import sys
sys.path.append('tools')
from canva_pipeline import create_and_produce_cover

brief = (
    'Book cover design titled "Big News About Old Rocks". '
    'The title "Big News About Old Rocks" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. '
    'BRIGHT GRAND CANYON GEOLOGY DAYLIGHT STYLE: A breathtaking, sun-drenched geological panorama of the Grand Canyon on a brilliant sunny day under bright daylight. '
    'In the center foreground, resting on a flat sunlit sandstone cliff ledge: sparkling ancient zircon mineral crystal specimens, stratified sedimentary rock core samples, a brass geological surveying compass, and a jeweler\'s loupe magnifying glass. '
    'In the background, colossal terraced red and ochre canyon strata cliffs carved deeply by the winding sunlit Colorado River under a clear turquoise sky. '
    'Palette: canyon terracotta and ochre red, zircon crystalline amber, river turquoise, and sunny sky cyan. '
    'Geology, radiometric dating, earth history, bright, educational, majestic, completely daylight. '
    'STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. '
    'NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. '
    'Aspect ratio 2:3 vertical book jacket.'
)

if __name__ == '__main__':
    res = create_and_produce_cover(1005, brief, "Big News About Old Rocks")
    print("SUCCESS:", res)
