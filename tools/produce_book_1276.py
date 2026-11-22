import sys
sys.path.append('tools')
from canva_pipeline import create_and_produce_cover

brief = (
    'Book cover design titled "How to Band Birds". The title "How to Band Birds" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. BRIGHT ORNITHOLOGY RESEARCH DAYLIGHT STYLE: A sunlit bird banding and research field station nestled at the edge of a deciduous forest in bright morning daylight. In the center foreground, a clean wooden research field table featuring lightweight aluminum bird bands of various numbered sizes arranged neatly on sizing rods, precision brass calipers, an electronic field scale with a soft holding cone, and an open field guide to North American birds. In the lush green background, songbirds perch peacefully on sun-dappled branches under a clear blue sky. Palette: bird band polished aluminum, research table natural wood, field guide colorful plumage illustration, and forest foliage emerald green. Ornithology, bird banding, wildlife tracking, conservation research, bright, educational, completely daylight. STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. Aspect ratio 2:3 vertical book jacket.'
)

if __name__ == '__main__':
    res = create_and_produce_cover(1276, brief, 'How to Band Birds')
    print("SUCCESS:", res)
