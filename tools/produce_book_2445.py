import sys
sys.path.append('tools')
from canva_pipeline import create_and_produce_cover

brief = (
    'Book cover design titled "Wildlife in a City Pond". The title "Wildlife in a City Pond" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. URBAN WETLAND ECOLOGY DAYLIGHT STYLE: A sun-drenched freshwater pond in a green city park on a bright summer afternoon. A vibrant male mallard duck with iridescent emerald-green head feathers swimming peacefully through calm, crystal-clear water with pink blooming water lilies, while a brilliant blue dragonfly rests on a cattail reed. In the background, green willow trees and distant sunlit city buildings under a bright blue sky. Palette: pond water sparkling turquoise, duck head iridescent emerald, water lilies soft rose, and sky sunny cyan. Urban biodiversity, pond ecosystems, nature in cities, refreshing and educational. STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. Aspect ratio 2:3 vertical book jacket.'
)

if __name__ == '__main__':
    res = create_and_produce_cover(2445, brief, 'Wildlife in a City Pond urban ecology mallard duck dragonflies pond')
    print("SUCCESS:", res)
