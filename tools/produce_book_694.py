import sys
sys.path.append('tools')
from canva_pipeline import create_and_produce_cover

brief = (
    'Book cover design titled "Clean River Water". '
    'The title "Clean River Water" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. '
    'BRIGHT ENVIRONMENTAL WATER PURIFICATION SCIENCE DAYLIGHT STYLE: A sun-drenched, radiant water engineering facility on a brilliant morning under a clear blue sky. '
    'In the center foreground, crystal-clear aerated water cascading down tiered clean filtration weirs with sparkling bubbles into gleaming, spotless settling basins. '
    'In the background, a pristine natural freshwater river flows peacefully through lush green forested hills under golden morning sunbeams. '
    'The scene emphasizes purity, life-giving water, cleanliness, and public health science in bright daylight. '
    'Palette: sparkling crystalline aqua, pristine aeration white, fresh river teal, lush forest green, and brilliant sky blue. '
    'Scientific, bright, educational, vivid, completely daylight. '
    'STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. '
    'NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. '
    'Aspect ratio 2:3 vertical book jacket.'
)

if __name__ == '__main__':
    res = create_and_produce_cover(694, brief, "Clean River Water")
    print("SUCCESS:", res)
