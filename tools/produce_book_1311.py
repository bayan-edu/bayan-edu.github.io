import sys
sys.path.append('tools')
from canva_pipeline import create_and_produce_cover

brief = (
    'Book cover design titled "Keeping the Lions Away". The title "Keeping the Lions Away" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. BRIGHT INVENTIVE SAVANNA CONSERVATION DAYLIGHT STYLE: A sunlit Kenyan grassland pasture near Nairobi National Park at dawn in bright daylight. In the center foreground, a traditional acacia thorn bush livestock boma fence fitted with ingenious solar-powered flickering LED strobe lights mounted on slender poles. Beside the fence, an open solar battery box, wiring tools, and solar panels catching the morning sunbeams. In the distant savanna, a pride of wild lions watches peacefully from afar under acacia trees and golden sunrise skies. Palette: savanna golden ochre, LED flash electric cyan and amber, solar panel cobalt, and sunrise warm apricot. Wildlife conservation, solar engineering, Richard Turere Lion Lights, coexistence innovation, bright, inspiring, educational. STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. Aspect ratio 2:3 vertical book jacket.'
)

if __name__ == '__main__':
    res = create_and_produce_cover(1311, brief, 'Keeping the Lions Away')
    print("SUCCESS:", res)
