import sys
sys.path.append('tools')
from canva_pipeline import create_and_produce_cover

brief = (
    'Book cover design titled "Alexander Graham Bell". The title "Alexander Graham Bell" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. BRIGHT 19TH-CENTURY ACOUSTIC INVENTOR WORKSHOP STYLE: A warm, sunlit Victorian inventor workshop filled with radiant morning window light. In the center foreground, the historic original 1876 liquid transmitter telephone and electromagnetic brass transmitter cone on a polished mahogany workbench. Beside it, detailed technical patent blueprints with acoustic soundwave diagrams, spools of insulated copper wire, galvanic zinc batteries, and brass acoustic tuning forks. Natural golden sunbeams streaming across the desk, illuminating notes on acoustic telegraphy. Palette: polished mahogany wood, gleaming brass, parchment cream, blueprint cyan, and copper orange. Invention, acoustic physics, telecommunication history, educational curiosity. STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. Aspect ratio 2:3 vertical book jacket.'
)

if __name__ == '__main__':
    res = create_and_produce_cover(1552, brief, 'Alexander Graham Bell acoustic telephone invention')
    print("SUCCESS:", res)
