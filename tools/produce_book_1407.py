import sys
sys.path.append('tools')
from canva_pipeline import create_and_produce_cover

brief = (
    'Book cover design titled "Reading: Frankenstein". The title "Frankenstein" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. BRIGHT ENLIGHTENMENT NATURAL PHILOSOPHY LABORATORY STYLE: A sunlit, fascinating scientific laboratory in Ingolstadt on a bright morning in natural daylight. In the center foreground, antique brass galvanic batteries, an electrostatic glass friction generator emitting delicate sparks, glass alembics with bubbling clear solutions, and precision surgical instruments on a clean wooden laboratory table. Beside them, an open leather-bound volume of natural philosophy and botanical anatomy charts catching sunbeams pouring through arched stone windows. Palette: brass gleaming gold, glass crystal clear, oak table warm amber, and daylight bright ivory. Classic literature, Mary Shelley, history of science, electricity and galvanic biology, intellectual, bright, educational, completely daylight. STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. Aspect ratio 2:3 vertical book jacket.'
)

if __name__ == '__main__':
    res = create_and_produce_cover(1407, brief, 'Reading Frankenstein')
    print("SUCCESS:", res)
