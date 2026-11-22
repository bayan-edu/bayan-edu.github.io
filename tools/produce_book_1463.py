import sys
sys.path.append('tools')
from canva_pipeline import create_and_produce_cover

brief = (
    'Book cover design titled "Mountain Lions: Purr-fect Predators". The title "Mountain Lions: Purr-fect Predators" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. BRIGHT ROCKY MOUNTAIN COUGAR WILDLIFE DAYLIGHT STYLE: A sun-drenched, rugged Rocky Mountain granite ridge in radiant morning daylight. In the center foreground, a magnificent, healthy mountain lion (cougar) with a muscular golden-tan coat, alert rounded ears, and piercing amber eyes perched regally on a warm granite rock ledge. In the vast background, sweeping evergreen pine forests, alpine meadows, and snow-capped peaks stretch under a brilliant blue sky. Palette: mountain lion warm tawny gold and cream, granite rock warm gray, pine forest evergreen, and sky radiant cyan. Wildlife biology, apex predators, mountain lion ecology, North American mammals, majestic, bright, educational, completely daylight. STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. Aspect ratio 2:3 vertical book jacket.'
)

if __name__ == '__main__':
    res = create_and_produce_cover(1463, brief, 'Mountain Lions Purr fect Predators')
    print("SUCCESS:", res)
