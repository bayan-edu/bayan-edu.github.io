import sys
sys.path.append('tools')
from canva_pipeline import create_and_produce_cover

brief = (
    'Book cover design titled "Little Hands Make A Big Difference". The title "Little Actions, Big Difference" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. COMMUNITY CONSERVATION & TREE PLANTING DAYLIGHT STYLE: A cheerful, sun-drenched community park and garden on a bright sunny morning. In the center foreground, a small, healthy young oak tree seedling thriving in fertile composted soil with fresh water droplets. Beside it, bright green garden watering cans, wooden seed-identification markers, biodegradable fiber pots, and a garden trowel. In the background, blooming community flower beds, a colorful wooden birdhouse, and lush green trees under a brilliant sunny blue sky. Palette: seedling fresh lime green, compost rich loam brown, watering can cheerful yellow, and sunny sky blue. Environmental stewardship, tree planting, community conservation, young gardeners, bright, inspiring, and hopeful. STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE (DO NOT DRAW HUMAN HANDS). NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. Aspect ratio 2:3 vertical book jacket.'
)

if __name__ == '__main__':
    res = create_and_produce_cover(1832, brief, 'Community Conservation tree planting environmental action stewardship')
    print("SUCCESS:", res)
