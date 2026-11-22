import sys
sys.path.append('tools')
from canva_pipeline import create_and_produce_cover

brief = (
    'Book cover design titled "Literature: Black Beauty". The title "Black Beauty" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. BRIGHT VICTORIAN COUNTRYSIDE DAYLIGHT STYLE: A sun-drenched English countryside meadow on a glorious summer morning in bright natural daylight. In the center foreground, a magnificent, healthy thoroughbred horse with a sleek, glossy jet-black coat and a distinctive white star on its forehead standing proudly on lush green pasture grass dotted with yellow buttercups. Beside the horse, a traditional rustic white wooden post-and-rail fence and rolling green hills under a clear blue sky. Palette: horse glossy jet black, meadow emerald green, fence white, and sky radiant cyan. Classic literature, equestrian life, English countryside, Anna Sewell, bright, majestic, educational, completely daylight. STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. Aspect ratio 2:3 vertical book jacket.'
)

if __name__ == '__main__':
    res = create_and_produce_cover(1348, brief, 'Literature Black Beauty')
    print("SUCCESS:", res)
