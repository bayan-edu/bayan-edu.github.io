import sys
sys.path.append('tools')
from canva_pipeline import create_and_produce_cover

brief = (
    'Book cover design titled "Old-Time Operations". The title "Old-Time Operations" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. HISTORY OF MEDICINE DAYLIGHT APOTHECARY STYLE: A bright, sunlit historical physician\'s study and botanical laboratory. On a polished oak workbench, vintage brass microscopes, hand-blown amber glass apothecary vials with botanical tinctures, an antique anatomical model skeleton of the hand, dried medicinal herbs, and illustrated botanical medical folios under warm morning window light. Palette: amber glass, polished brass gold, parchment ivory, and botanical green. History of medicine, surgical evolution, medical breakthroughs, scholarly and educational. STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. Aspect ratio 2:3 vertical book jacket.'
)

if __name__ == '__main__':
    res = create_and_produce_cover(1952, brief, 'Old-Time Operations history of medicine surgery apothecary botany')
    print("SUCCESS:", res)
