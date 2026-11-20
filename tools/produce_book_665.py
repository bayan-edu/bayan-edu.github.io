import sys
sys.path.append('tools')
from canva_pipeline import create_and_produce_cover

brief = (
    'Book cover design titled "A Date for the Box". '
    'The title "A Date for the Box" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. '
    'BRIGHT HOME SAFETY & FAMILY DAYLIGHT STYLE: A sun-drenched, radiant living room on a warm, peaceful sunny afternoon with golden sunlight illuminating a wooden side table. '
    'In the center foreground, a delicate white-and-gold porcelain bowl filled with luscious, plump, sweet golden-brown ripe dates catching the warm natural daylight. '
    'In the soft sunlit background, mounted high on a clean white wall safely above reach, a neat wooden cabinet shelf with a small locked first-aid box. '
    'Beside the dates on the table sits an open children\'s picture book and a glass of fresh milk. '
    'Palette: rich date amber, honey-brown wood, warm cream, clean ceramic white, and golden sunlight. '
    'Reassuring, bright, educational, vivid, completely daylight. '
    'STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. '
    'NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. '
    'Aspect ratio 2:3 vertical book jacket.'
)

if __name__ == '__main__':
    res = create_and_produce_cover(665, brief, "A Date for the Box")
    print("SUCCESS:", res)
