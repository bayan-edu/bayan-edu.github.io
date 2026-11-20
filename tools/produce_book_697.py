import sys
sys.path.append('tools')
from canva_pipeline import create_and_produce_cover

brief = (
    'Book cover design titled "The Long Bike Ride". '
    'The title "The Long Bike Ride" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. '
    'BRIGHT MOUNTAIN BIKING & OUTDOOR ADVENTURE DAYLIGHT STYLE: A sun-drenched, panoramic mountain trail summit on a crisp, glorious sunny morning under an azure blue sky. '
    'In the center foreground, a sleek modern mountain bicycle in vibrant cherry-red and matte black with rugged knobby tires resting against a scenic wooden overlook fence. '
    'On a sunlit granite boulder next to the bike, a precision analog tire pressure gauge showing accurate dial markings, a compact aluminum bike pump, and a sports water bottle. '
    'In the background, rolling green mountain valleys and winding hiking paths stretch beneath open daylight. '
    'Palette: vibrant cherry red, mountain granite grey, aluminum silver, lush pine green, and brilliant sky blue. '
    'Athletic, adventure, bright, educational, completely daylight. '
    'STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. '
    'NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. '
    'Aspect ratio 2:3 vertical book jacket.'
)

if __name__ == '__main__':
    res = create_and_produce_cover(697, brief, "The Long Bike Ride")
    print("SUCCESS:", res)
