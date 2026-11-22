import sys
sys.path.append('tools')
from canva_pipeline import create_and_produce_cover

brief = (
    'Book cover design titled "Literature: The House of Stairs". The title "The House of Stairs" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. BRIGHT ARCHITECTURAL STAIRCASE MYSTERY DAYLIGHT STYLE: A sunlit, breathtaking grand Victorian architectural atrium bathed in bright natural daylight. In the center foreground, an extraordinary series of sweeping, interlocking polished oak and wrought-iron staircases ascending through multiple gallery levels. Sunbeams pour through tall stained-glass skylights, casting vibrant rainbow geometric light patterns across the polished marble floors and balustrades. Palette: staircase warm polished oak, railing wrought-iron black, light patterns ruby and sapphire, and atrium marble ivory. Architectural mystery, psychological literature, grand staircases, elegant, bright, educational, completely daylight. STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. Aspect ratio 2:3 vertical book jacket.'
)

if __name__ == '__main__':
    res = create_and_produce_cover(1362, brief, 'Literature The House of Stairs')
    print("SUCCESS:", res)
