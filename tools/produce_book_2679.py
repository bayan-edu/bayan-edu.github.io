import sys
sys.path.append('tools')
from canva_pipeline import create_and_produce_cover

brief = (
    'Book cover design titled "The Sparrow Who Flooded a Village". The title "The Sparrow Who Flooded a Village" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. STORYBOOK FOLKLORE VILLAGE DAYLIGHT STYLE: A sunlit, storybook traditional village riverbank on a bright morning. In the center foreground, a plucky, determined little house sparrow (Passer domesticus) with warm brown-and-grey feathers perched on an overturned terracotta water pot, where crystal water overflows like a playful torrent splashing across cobblestones, framed by green village trees and rustic thatched cottages under a blue sky. Palette: sparrow feathers warm chestnut and cream, terracotta pot rich clay orange, splashing water sparkling white and cyan, and sky sunny blue. Traditional folklore, cause and effect storytelling, animal fables, charming and educational. STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. Aspect ratio 2:3 vertical book jacket.'
)

if __name__ == '__main__':
    res = create_and_produce_cover(2679, brief, 'Sparrow Flooded Village house sparrow folktale river clay water pot')
    print("SUCCESS:", res)
