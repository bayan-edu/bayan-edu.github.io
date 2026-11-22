import sys
sys.path.append('tools')
from canva_pipeline import create_and_produce_cover

brief = (
    'Book cover design titled "Black Beauty". The title "Black Beauty" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. CLASSIC EQUINE PASTORAL STYLE: A sun-drenched, rolling English pasture in full spring daylight. In the center foreground, a magnificent, healthy black horse (stallion) with a sleek, glossy jet-black coat and a single white star on its forehead, its mane and tail flowing gracefully in the fresh morning breeze as it gallops joyfully across emerald meadows with white wooden fences and blooming buttercups. Palette: horse coat glossy jet-black, pasture grass vibrant emerald green, wildflowers golden yellow, and sky bright country azure. Classic animal literature, equine beauty, animal welfare, noble and educational. STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. Aspect ratio 2:3 vertical book jacket.'
)

if __name__ == '__main__':
    res = create_and_produce_cover(2143, brief, 'Black Beauty Anna Sewell black horse stallion meadow paddock pasture')
    print("SUCCESS:", res)
