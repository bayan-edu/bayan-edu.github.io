import sys
sys.path.append('tools')
from canva_pipeline import create_and_produce_cover

brief = (
    'Book cover design titled "The Wind in the Willows". The title "The Wind in the Willows" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. PASTORAL RIVERSIDE ADVENTURE STYLE: A sunlit, idyllic English riverbank on a lazy summer afternoon. Weeping green willow branches sweep gently down toward crystal-clear river waters, where a classic green wooden rowing boat is moored to a wooden dock with yellow water lilies, holding a cozy picnic hamper basket, wooden oars, and a blue teapot. Water voles and otters swimming playfully in the reeds under sunny skies. Palette: willow foliage lush lime and sage green, river water sparkling turquoise, boat wood forest green, and sunlight warm buttercup. Classic children\'s literature, pastoral tranquility, riverbank camaraderie, charming and educational. STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. Aspect ratio 2:3 vertical book jacket.'
)

if __name__ == '__main__':
    res = create_and_produce_cover(2139, brief, 'The Wind in the Willows Kenneth Grahame riverbank rowing boat willow')
    print("SUCCESS:", res)
