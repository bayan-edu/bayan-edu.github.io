import sys
sys.path.append('tools')
from canva_pipeline import create_and_produce_cover

brief = (
    'Book cover design titled "A Final Journey". '
    'The title "A Final Journey" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. '
    'BRIGHT WILDLIFE MIGRATION DAYLIGHT STYLE: A sun-drenched, radiant pristine mountain river on a glorious sunny morning under an azure sky. '
    'In the center foreground, a magnificent silver-and-rose wild salmon leaping powerfully upstream through sparkling crystalline waterfall rapids. '
    'Along the sunlit riverbanks, vibrant orange monarch butterflies flutter among blooming wildflowers and lush green mossy evergreen pines. '
    'In the background, sunlit alpine peaks rise peacefully beneath warm golden sunbeams. '
    'Palette: salmon iridescent rose-silver, waterfall sparkling turquoise, monarch orange, forest emerald, and bright golden sunlight. '
    'Natural life cycle, migration, bright, educational, vivid, completely daylight. '
    'STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. '
    'NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. '
    'Aspect ratio 2:3 vertical book jacket.'
)

if __name__ == '__main__':
    res = create_and_produce_cover(927, brief, "A Final Journey")
    print("SUCCESS:", res)
