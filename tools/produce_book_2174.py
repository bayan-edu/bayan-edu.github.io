import sys
sys.path.append('tools')
from canva_pipeline import create_and_produce_cover

brief = (
    'Book cover design titled "Little Red Riding Hood". The title "Little Red Riding Hood" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. STORYBOOK FAIRYTALE WOODLAND DAYLIGHT STYLE: A magical, sunlit storybook forest glade on a bright morning. A cobblestone footpath winding through ancient mossy oak trees and wild blackberry brambles. Resting on a rustic mossy wooden tree stump is a classic woven wicker picnic basket filled with fresh baked bread and red apples, draped with a vibrant crimson-red velvet hooded cloak and a bouquet of fresh wild daisies. Sunbeams filtering through green leaves. Palette: cloak vivid crimson red, forest moss emerald green, oak tree trunks warm bark brown, and morning sunlight golden yellow. Classic folklore, fairytale storytelling, woodland nature, inviting and educational. STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. Aspect ratio 2:3 vertical book jacket.'
)

if __name__ == '__main__':
    res = create_and_produce_cover(2174, brief, 'Little Red Riding Hood fairytale forest path picnic basket red hood')
    print("SUCCESS:", res)
