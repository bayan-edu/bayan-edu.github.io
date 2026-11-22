import sys
sys.path.append('tools')
from canva_pipeline import create_and_produce_cover

brief = (
    'Book cover design titled "Reading: O. Henry\'s Short Stories". The title "O. Henry\'s Short Stories" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. BRIGHT GREENWICH VILLAGE ARTIST WINDOW DAYLIGHT STYLE: A charming, sun-drenched brick townhouse artist\'s studio window in Greenwich Village in bright morning daylight. In the center foreground, a single resilient green ivy vine leaf painted lovingly on the exterior brick wall outside the windowpane (symbol of The Last Leaf). On the wooden interior windowsill rest an antique pocket watch with a leather strap, a set of tortoise-shell hair combs studded with jewels, an artist\'s wooden watercolor paint box, and an open volume of short stories. Palette: brick warm terracotta red, ivy leaf fresh emerald, windowsill weathered pine, and morning sunshine warm amber. Classic American literature, O. Henry stories, ironic wit, heartwarming tales, bright, nostalgic, educational, completely daylight. STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. Aspect ratio 2:3 vertical book jacket.'
)

if __name__ == '__main__':
    res = create_and_produce_cover(1386, brief, 'Reading O Henrys Short Stories')
    print("SUCCESS:", res)
