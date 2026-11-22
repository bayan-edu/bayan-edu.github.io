import sys
sys.path.append('tools')
from canva_pipeline import create_and_produce_cover

brief = (
    'Book cover design titled "The American Chestnut". The title "The American Chestnut" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. FORESTRY RESTORATION DAYLIGHT STYLE: A sun-drenched Appalachian mountain forest in autumn daylight. A towering, healthy restored American Chestnut tree (Castanea dentata) displaying toothed green leaves and spiky green chestnut burrs cracking open to reveal glossy, rich mahogany-brown chestnuts, with scientific blight-resistant seedling tubes in the foreground under sunny skies. Palette: chestnuts glossy mahogany brown, spiky burrs chartreuse green, forest leaves autumn gold and orange, and sky crisp blue. Forestry conservation, species restoration, tree biology, historical botany, triumphant and educational. STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. Aspect ratio 2:3 vertical book jacket.'
)

if __name__ == '__main__':
    res = create_and_produce_cover(2566, brief, 'American Chestnut Castanea dentata blight restoration burrs leaves')
    print("SUCCESS:", res)
