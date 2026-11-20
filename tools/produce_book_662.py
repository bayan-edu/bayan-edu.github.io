import sys
sys.path.append('tools')
from canva_pipeline import create_and_produce_cover

brief = (
    'Book cover design titled "The Cold Bag". '
    'The title "The Cold Bag" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. '
    'BRIGHT SUMMER FOOD SAFETY DAYLIGHT STYLE: A sun-drenched, radiant outdoor picnic table on a brilliant summer day under an azure blue sky. '
    'In the center foreground, a modern insulated thermal cooler bag (cold bag) in crisp navy-blue and bright orange trim, neatly packed with frozen reusable blue ice packs glistening with frosty condensation. '
    'Beside the bag on the warm wooden table sits a fresh glass bottle of cold milk with cool water droplets and crisp red and green apples. '
    'In the sunlit background, a lush green park lawn bathed in warm golden afternoon sunlight. '
    'Palette: cool frosty cyan, crisp navy blue, vibrant orange, sunny green, and fresh milk white. '
    'Scientific, bright, educational, vivid, completely daylight. '
    'STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. '
    'NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. '
    'Aspect ratio 2:3 vertical book jacket.'
)

if __name__ == '__main__':
    res = create_and_produce_cover(662, brief, "The Cold Bag")
    print("SUCCESS:", res)
