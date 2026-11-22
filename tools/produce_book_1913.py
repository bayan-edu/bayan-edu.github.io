import sys
sys.path.append('tools')
from canva_pipeline import create_and_produce_cover

brief = (
    'Book cover design titled "The Peanut Man". The title "The Peanut Man: Agricultural Chemistry" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. HISTORICAL AGRICULTURAL CHEMISTRY & BOTANY DAYLIGHT STYLE: A sunlit, clean laboratory workbench at the Tuskegee Institute in radiant morning daylight. In the center, healthy peanut plants (Arachis hypogaea) with delicate yellow blossoms, green leaves, and underground pegs showing fresh peanut pods clinging to nitrogen-fixing root nodules. Surrounding laboratory apparatus: glass distillation flasks with golden peanut oil, ceramic mortar and pestle, samples of peanut paper and dyes, and crop rotation diagrams (cotton, peanuts, sweet potatoes). Open sunny windows looking out onto thriving experimental test fields. Palette: peanut pod warm ochre and tan, plant leaf vibrant green, laboratory glass amber, and morning sunlight ivory. Agricultural chemistry, George Washington Carver legacy, crop rotation, soil nitrogen fixation, inspiring, dignified, and educational. STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. Aspect ratio 2:3 vertical book jacket.'
)

if __name__ == '__main__':
    res = create_and_produce_cover(1913, brief, 'Peanut Man George Washington Carver agricultural chemistry botany')
    print("SUCCESS:", res)
