import sys
sys.path.append('tools')
from canva_pipeline import create_and_produce_cover

brief = (
    'Book cover design titled "What\'s This? Life in the Dark". The title "Life in the Dark" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. SUBTERRANEAN SPELEOLOGY & CAVE BIOLOGY STYLE: A mysterious, beautifully illuminated subterranean limestone cave chamber. Dramatic golden scientific exploration lamps casting warm light across glistening calcite stalactites, stalagmites, and crystal-clear underground cave pools. In the water, fascinating troglobitic organisms with unique adaptations: a translucent, eyeless cave crayfish with elongated sensory antennae, and a blind white cave salamander (olm). Clean educational callouts showing sensory tactile adaptations replacing vision in the dark. Palette: limestone calcite amber gold, cave pool crystal turquoise, cave shadow deep indigo, and lantern warm yellow. Cave biology, speleology, troglobites, evolutionary adaptation, sensory evolution, intriguing and educational. STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. Aspect ratio 2:3 vertical book jacket.'
)

if __name__ == '__main__':
    res = create_and_produce_cover(1691, brief, 'Whats This Life in the Dark cave biology troglobites subterranean')
    print("SUCCESS:", res)
