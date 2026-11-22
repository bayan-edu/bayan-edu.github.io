import sys
sys.path.append('tools')
from canva_pipeline import create_and_produce_cover

brief = (
    'Book cover design titled "Frogs at Risk". The title "Frogs at Risk" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. BRIGHT TROPICAL CLOUD FOREST DAYLIGHT STYLE: A lush, sunlit cloud forest canopy in the Andes mountains of Ecuador under bright morning daylight. In the center foreground, a vivid emerald-green red-eyed tree frog perched proudly on the broad leaf of a tropical bromeliad flower, its vibrant crimson eyes and orange webbed toes glistening with crystal raindrops. Nearby on a mossy branch rests a tiny, jewel-toned blue poison dart frog. Surrounding them are misty mountain ferns, wild tropical orchids, and sunbeams filtering through the rainforest canopy. Palette: tree frog lime green and scarlet red, poison dart frog electric azure, bromeliad magenta, and rainforest deep emerald. Herpetology, rainforest biodiversity, amphibian conservation, ecology, bright, colorful, educational, completely daylight. STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. Aspect ratio 2:3 vertical book jacket.'
)

if __name__ == '__main__':
    res = create_and_produce_cover(1275, brief, 'Frogs at Risk')
    print("SUCCESS:", res)
