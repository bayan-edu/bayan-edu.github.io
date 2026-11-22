import sys
sys.path.append('tools')
from canva_pipeline import create_and_produce_cover

brief = (
    'Book cover design titled "Continents That Drift". The title "Continents That Drift" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. CONTINENTAL DRIFT & PANGAEA JIGSAW PUZZLE STYLE: A brilliant, scientifically grounded historical geology diagram in bright daylight. In the center, the ancient supercontinent of Pangaea fitting together like giant jigsaw puzzle pieces, highlighting how the Atlantic coastlines of South America and Africa lock perfectly together. Matching fossil bands (Mesosaurus and Glossopteris fern fossils) and identical ancient mountain belts color-coded across both continents. Compass rose, continental drift velocity arrows (cm per year), and globe in clean educational style. Palette: continental landmass warm terracotta and green, ocean deep azure blue, fossil correlation bands golden yellow, and map parchment. Continental drift, Alfred Wegener, Pangaea, plate tectonics, fossil evidence, clear, fascinating, and educational. STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. Aspect ratio 2:3 vertical book jacket.'
)

if __name__ == '__main__':
    res = create_and_produce_cover(1842, brief, 'Continents That Drift continental drift Wegener Pangaea plate tectonics')
    print("SUCCESS:", res)
