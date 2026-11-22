import sys
sys.path.append('tools')
from canva_pipeline import create_and_produce_cover

brief = (
    'Book cover design titled "Lost and Found". The title "Lost and Found" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. BRIGHT FOJA MOUNTAINS EXPEDITION DAYLIGHT STYLE: A sun-dappled, misty tropical cloud forest mountain peak in New Guinea in bright morning daylight. In the center foreground, a magnificent golden-fronted bowerbird\'s elaborate bower constructed of twigs on mossy ground, decorated meticulously with bright blue berries and red flower petals. Nearby rests an explorer\'s brass field compass, waterproof binoculars, and an open botanical specimen press with rare orchids. Palette: forest moss emerald, bowerbird golden saffron, berry cobalt blue, orchid magenta, and morning mist silver. Biological exploration, newly discovered species, Foja mountains expedition, biodiversity, bright, adventurous, educational, completely daylight. STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. Aspect ratio 2:3 vertical book jacket.'
)

if __name__ == '__main__':
    res = create_and_produce_cover(1316, brief, 'Lost and Found')
    print("SUCCESS:", res)
