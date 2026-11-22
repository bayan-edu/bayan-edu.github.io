import sys
sys.path.append('tools')
from canva_pipeline import create_and_produce_cover

brief = (
    'Book cover design titled "A Plant Puzzle". The title "A Plant Puzzle" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. CARNIVOROUS BOTANICAL ADAPTATIONS DAYLIGHT STYLE: A sun-drenched, exotic botanical conservatory filled with radiant morning greenhouse sunlight. In the center foreground, a fascinating array of carnivorous plant adaptations: a tropical hanging pitcher plant (Nepenthes) with slippery wax peristome rim and digestive pool; a sundew (Drosera) with glistening ruby-red tentacles dripping with sticky dew drops; and a Venus flytrap with sensitive trigger hairs on green hinged traps. A brass botanist\'s magnifying loupe and botanical sketchbooks in the bright background. Palette: pitcher plant chartreuse green and speckled maroon, sundew ruby red, dew crystal white, and greenhouse sky cyan. Carnivorous plants, nutrient-poor soil adaptations, botanical wonders, plant evolution, fascinating and educational. STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. Aspect ratio 2:3 vertical book jacket.'
)

if __name__ == '__main__':
    res = create_and_produce_cover(1884, brief, 'A Plant Puzzle carnivorous plants Nepenthes sundew botanical adaptations')
    print("SUCCESS:", res)
