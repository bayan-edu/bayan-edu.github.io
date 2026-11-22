import sys
sys.path.append('tools')
from canva_pipeline import create_and_produce_cover

brief = (
    'Book cover design titled "The Eco Pyramid". The title "The Eco Pyramid" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. BRIGHT ECOLOGICAL TROPHIC PYRAMID DAYLIGHT STYLE: A sun-drenched, magnificent natural ecosystem featuring a 3D translucent ecological energy pyramid in bright daylight. The broad green base shows sunlit clover and prairie grass (primary producers) absorbing golden sunbeams; the middle tier shows field mice and grasshoppers (primary consumers); the next tier shows red foxes and owls; and the golden peak shows an eagle (apex predator), with clean 10% energy transfer markers. Palette: pyramid layers radiant gold, meadow emerald, sky daylight cyan, and energy arrows glowing amber. Ecology, trophic pyramid, energy transfer, food web, ecosystem dynamics, bright, engaging, educational, completely daylight. STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. Aspect ratio 2:3 vertical book jacket.'
)

if __name__ == '__main__':
    res = create_and_produce_cover(1480, brief, 'The Eco Pyramid')
    print("SUCCESS:", res)
