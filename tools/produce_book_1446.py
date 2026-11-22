import sys
sys.path.append('tools')
from canva_pipeline import create_and_produce_cover

brief = (
    'Book cover design titled "Houston Affects the Earth". The title "Houston Affects the Earth" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. BRIGHT URBAN SUSTAINABILITY & GREEN INFRASTRUCTURE DAYLIGHT STYLE: A sunlit, inspiring panoramic view of modern urban environmental initiatives in bright daylight. In the center foreground, a lush green urban bayou park with native wetlands, bike trails, and tree-lined bayous buffering city waterways. In the background, the modern skyline shines in sunlight with solar-paneled municipal rooftops, urban tree canopies, and clear blue Texas skies with soft white clouds. Palette: bayou greenway vibrant emerald, solar panels cobalt blue, urban architecture reflective glass, and sky radiant cyan. Urban ecology, sustainability, city planning, watershed protection, bright, civic, educational, completely daylight. STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. Aspect ratio 2:3 vertical book jacket.'
)

if __name__ == '__main__':
    res = create_and_produce_cover(1446, brief, 'Houston Affects the Earth')
    print("SUCCESS:", res)
