import sys
sys.path.append('tools')
from canva_pipeline import create_and_produce_cover

brief = (
    'Book cover design titled "Tiger Watch". The title "Tiger Watch" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. BENGAL TIGER CONSERVATION DAYLIGHT STYLE: A sunlit, dense tropical monsoon forest in India on a bright morning. In the center foreground, a magnificent royal Bengal tiger (Panthera tigris) prowling with quiet majesty through sun-dappled bamboo thickets, its vibrant orange coat with rich black stripes and white facial accents illuminated by golden sunbeams filtering through the forest canopy. Lush green ferns and wild sal tree trunks under a clear morning sky. Palette: tiger fur rich fiery orange and jet black, jungle foliage emerald and lime green, and morning sunlight golden amber. Apex predator ecology, tiger tracking, wildlife conservation, regal and educational. STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. Aspect ratio 2:3 vertical book jacket.'
)

if __name__ == '__main__':
    res = create_and_produce_cover(1975, brief, 'Tiger Watch Panthera tigris Bengal tiger conservation jungle daylight')
    print("SUCCESS:", res)
