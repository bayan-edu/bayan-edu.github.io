import sys
sys.path.append('tools')
from canva_pipeline import create_and_produce_cover

brief = (
    'Book cover design titled "The Mango Tree". The title "The Mango Tree" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. BRIGHT SUNNY ORCHARD DAYLIGHT STYLE: A sun-drenched, picturesque tropical orchard on a warm summer afternoon in radiant bright daylight. In the center foreground, a magnificent, sprawling ancient mango tree with a sturdy textured trunk and broad leafy canopy heavy with abundant clusters of luscious ripe golden-yellow and blush-pink mangoes. Beneath the tree on the lush green grass, handwoven wicker harvest baskets are filled to the brim with freshly picked mangoes, with fluttering yellow butterflies and sunbeams filtering through the foliage. Palette: mango golden saffron and blush peach, canopy emerald and jade, wicker warm honey, and brilliant summer azure sky. Botany, fruit agriculture, summer nature, wholesome harvest, bright, cheerful, completely daylight. STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. Aspect ratio 2:3 vertical book jacket.'
)

if __name__ == '__main__':
    res = create_and_produce_cover(1245, brief, 'The Mango Tree')
    print("SUCCESS:", res)
