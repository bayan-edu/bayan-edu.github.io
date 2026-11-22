import sys
sys.path.append('tools')
from canva_pipeline import create_and_produce_cover

brief = (
    'Book cover design titled "The Eastern Indigo Snake". The title "The Eastern Indigo Snake" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. BRIGHT PINE FLATWOODS HERPETOLOGY DAYLIGHT STYLE: A sunlit longleaf pine flatwoods and wiregrass savanna in Florida in radiant morning daylight. In the center foreground, a magnificent Eastern indigo snake (Drymarchon couperi) with smooth, glossy, iridescent blue-black scales glistening in direct sunlight, coiled peacefully beside a sandy gopher tortoise burrow entrance. Surrounding the snake are longleaf pine needles, native saw palmetto shrubs, and blooming yellow wiregrass flowers under a clear azure sky. Palette: indigo snake lustrous midnight-blue and iridescent violet, sand pale cream, palmetto emerald, and sky sunny cyan. Herpetology, Eastern indigo snake, reptile conservation, longleaf pine ecosystems, magnificent, bright, educational, completely daylight. STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. Aspect ratio 2:3 vertical book jacket.'
)

if __name__ == '__main__':
    res = create_and_produce_cover(1479, brief, 'The Eastern Indigo Snake')
    print("SUCCESS:", res)
