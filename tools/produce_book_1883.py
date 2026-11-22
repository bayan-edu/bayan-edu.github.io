import sys
sys.path.append('tools')
from canva_pipeline import create_and_produce_cover

brief = (
    'Book cover design titled "Asteroid Attack!". The title "Asteroid Attack!" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. PLANETARY IMPACT GEOLOGY & METEOR CRATER STYLE: A sunlit, breathtaking panoramic view of the famous Barringer Meteor Crater in northern Arizona in bright desert sunlight. The colossal, deep circular impact basin with overturned rock strata and breccia rim rising sharply above the flat Colorado Plateau. In a split space diagram above: an irregular rocky asteroid traveling through space, kinetic impact energy equations, and planetary defense deflection satellites. Palette: desert red sandstone terracotta, limestone rim buff, sky brilliant cobalt cyan, and asteroid charcoal. Impact cratering, meteoritics, planetary defense, solar system collisions, Earth geology, dramatic and educational. STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. Aspect ratio 2:3 vertical book jacket.'
)

if __name__ == '__main__':
    res = create_and_produce_cover(1883, brief, 'Asteroid Attack impact craters planetary defense meteor crater Arizona')
    print("SUCCESS:", res)
