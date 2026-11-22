import sys
sys.path.append('tools')
from canva_pipeline import create_and_produce_cover

brief = (
    'Book cover design titled "Miss Bandicota Bengalensis Digs Up the Seashore". The title "Miss Bandicota Bengalensis" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. COASTAL DUNE NATURALIST EXPLORATION STYLE: A sunlit coastal beach and sand dune habitat in morning light. An inquisitive bandicoot rat exploring a sandy burrows system among coastal sea oats and beach morning glory vines, discovering beach treasures: colorful spiral seashells, a moulted horseshoe crab shell, and gentle tidal foam in the background under sunny skies. Palette: beach sand golden tan, sea oats fresh green, sea water turquoise and white foam, and sky sunny cyan. Coastal ecology, intertidal zones, beach burrowing animals, playful and educational. STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. Aspect ratio 2:3 vertical book jacket.'
)

if __name__ == '__main__':
    res = create_and_produce_cover(2665, brief, 'Bandicota seashore marine intertidal burrows crab shells sand dunes daylight')
    print("SUCCESS:", res)
