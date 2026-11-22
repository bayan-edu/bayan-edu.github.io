import sys
sys.path.append('tools')
from canva_pipeline import create_and_produce_cover

brief = (
    'Book cover design titled "A Trip to the Safari Park". The title "A Trip to the Safari Park" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. AFRICAN SAVANNA SAFARI DAYLIGHT STYLE: A sun-soaked safari park savanna landscape in brilliant midday sunshine. Towering, elegant reticulated giraffes reaching for tender leaves in an iconic flat-topped umbrella acacia tree, with a dazzle of zebras displaying bold black-and-white stripes drinking from a watering hole, and an empty open-topped green safari jeep parked nearby with binoculars on the seat. Snow-capped Mount Kilimanjaro in the distant horizon under an azure sky. Palette: savanna grass warm golden ochre, acacia leaves dusty green, zebra stripes crisp monochrome, and sky brilliant blue. Wildlife safari, African animals, savanna biodiversity, sunny, thrilling and educational. STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. Aspect ratio 2:3 vertical book jacket.'
)

if __name__ == '__main__':
    res = create_and_produce_cover(2170, brief, 'Trip Safari Park African savanna giraffe zebra acacia safari vehicle')
    print("SUCCESS:", res)
