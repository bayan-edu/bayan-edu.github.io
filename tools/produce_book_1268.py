import sys
sys.path.append('tools')
from canva_pipeline import create_and_produce_cover

brief = (
    'Book cover design titled "Calling All Spiders!". The title "Calling All Spiders!" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. BRIGHT ARACHNOLOGY NATURE DAYLIGHT STYLE: A stunning, sunlit garden trellis in bright morning sunlight. In the center foreground, a magnificent, geometrically perfect orb-weaver spider web spun between climbing rose stems and blackberry leaves, each delicate silk strand glistening with morning dew drops catching rainbow sunbeams. In the center of the web sits a colorful, harmless yellow-and-black garden orb-weaver spider. Nearby on a garden bench rests a brass field magnifying glass and an open naturalist\'s sketchbook with spider anatomy diagrams. Palette: spider golden yellow and jet black, web glistening crystal dew, foliage fresh emerald, and morning sun warm amber. Arachnology, spider webs, garden biodiversity, biology education, bright, fascinating, completely daylight. STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. Aspect ratio 2:3 vertical book jacket.'
)

if __name__ == '__main__':
    res = create_and_produce_cover(1268, brief, 'Calling All Spiders!')
    print("SUCCESS:", res)
