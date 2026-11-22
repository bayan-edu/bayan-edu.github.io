import sys
sys.path.append('tools')
from canva_pipeline import create_and_produce_cover

brief = (
    'Book cover design titled "DISCOVERING GRAVITY". The title "DISCOVERING GRAVITY" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. PHYSICS AND GRAVITATIONAL MECHANICS DAYLIGHT STYLE: A bright, sunlit English orchard setting on a glorious afternoon. In the foreground, a ripe, perfect red apple falling from a gnarled oak-apple branch, surrounded by clean, glowing educational gravitational vector arrows demonstrating acceleration and downward force (9.8 m/sÂ²). The vector lines elegantly curve upward into the sky, connecting seamlessly to the orbital trajectory of the Moon around Earth. Open parchment notebook on grass with geometrical physics diagrams. Palette: falling apple bright ruby red, orchard leaves rich green, gravitational vectors radiant cyan, and sunny sky blue. Classical physics, Newton\'s laws of gravitation, scientific discovery, clear and educational. STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. Aspect ratio 2:3 vertical book jacket.'
)

if __name__ == '__main__':
    res = create_and_produce_cover(2325, brief, 'DISCOVERING GRAVITY Isaac Newton apple falling orbital mechanics physics')
    print("SUCCESS:", res)
