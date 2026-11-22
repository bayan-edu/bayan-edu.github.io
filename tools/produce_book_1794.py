import sys
sys.path.append('tools')
from canva_pipeline import create_and_produce_cover

brief = (
    'Book cover design titled "Recycle". The title "Recycle!" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. CHEERFUL ENVIRONMENTAL ACTION & SORTING SUNNY DAYLIGHT STYLE: A sunlit, joyful educational scene in a clean community park on a sunny spring day. In the center foreground, three bright, colorful recycling sorting bins: Blue (clean paper and cardboard), Green (glass bottles), and Yellow (plastic and aluminum cans). Beside them, clean recycled goods: an eco-friendly cardboard birdhouse and colorful flower planters made from recycled containers with blooming daisies. Lush green lawn, leafy trees, and a radiant blue sky with fluffy white clouds in the background. Palette: recycling bin primary blue, yellow, and green, daisy white and gold, and lawn emerald. Recycling education, waste reduction, environmental stewardship, circular economy, cheerful, vibrant, and educational. STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. Aspect ratio 2:3 vertical book jacket.'
)

if __name__ == '__main__':
    res = create_and_produce_cover(1794, brief, 'Recycle primary environmental education curbside sorting')
    print("SUCCESS:", res)
