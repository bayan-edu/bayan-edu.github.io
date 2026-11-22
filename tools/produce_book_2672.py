import sys
sys.path.append('tools')
from canva_pipeline import create_and_produce_cover

brief = (
    'Book cover design titled "Turtle Story". The title "Turtle Story" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. FRESHWATER TURTLE NATURE DAYLIGHT STYLE: A peaceful, sunlit freshwater wetland pond in summer daylight. A gentle painted turtle (Chrysemys picta) with bright red and yellow striped neck and patterned dark shell basking contently on a half-submerged mossy log in warm midday sunshine, surrounded by blooming white water lilies, dragonflies, and crystal-clear pond water. Palette: turtle shell deep olive with yellow and crimson markings, pond water clear emerald-blue, water lilies pure white, and sunlight bright gold. Reptile biology, thermoregulation in turtles, wetland habitat, tranquil and educational. STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. Aspect ratio 2:3 vertical book jacket.'
)

if __name__ == '__main__':
    res = create_and_produce_cover(2672, brief, 'Turtle Story freshwater pond turtle shell basking log water lilies')
    print("SUCCESS:", res)
