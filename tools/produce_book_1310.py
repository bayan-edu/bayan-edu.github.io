import sys
sys.path.append('tools')
from canva_pipeline import create_and_produce_cover

brief = (
    'Book cover design titled "How to Build a Pollinator Garden". The title "How to Build a Pollinator Garden" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. BRIGHT POLLINATOR GARDEN HORTICULTURE DAYLIGHT STYLE: A sun-drenched, blooming backyard pollinator sanctuary in radiant spring daylight. In the center foreground, a lush garden bed bursting with native wildflowers: purple coneflowers, bright golden black-eyed Susans, and orange butterfly weed. Flitting gracefully among the flowers are monarch butterflies and busy fuzzy bumblebees, with a shallow stone butterfly puddling dish and a polished garden trowel resting in fertile soil. Palette: coneflower magenta, black-eyed Susan gold, milkweed tangerine orange, foliage fresh emerald, and sky sunny cyan. Horticulture, pollinator conservation, butterfly gardening, native plants, cheerful, bright, educational, completely daylight. STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. Aspect ratio 2:3 vertical book jacket.'
)

if __name__ == '__main__':
    res = create_and_produce_cover(1310, brief, 'How to Build a Pollinator Garden')
    print("SUCCESS:", res)
