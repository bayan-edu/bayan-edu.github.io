import sys
sys.path.append('tools')
from canva_pipeline import create_and_produce_cover

brief = (
    'Book cover design titled "City of Lights". The title "City of Lights" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. PARISIAN ARCHITECTURAL PANORAMA STYLE: A sunlit, romantic panoramic vista of Paris on a crisp autumn morning. The magnificent wrought-iron lattice of the Eiffel Tower soaring proudly into a clear azure sky, overlooking the gentle curves of the River Seine, classic stone bridges with ornate lampposts, Haussmannian rooftops with zinc dormers, and golden autumn foliage along the riverside promenades. Palette: Eiffel Tower warm bronze, Seine water glistening sapphire, autumn trees golden amber, and sky pastel cerulean. World capitals, European architecture, cultural geography, elegant and educational. STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. Aspect ratio 2:3 vertical book jacket.'
)

if __name__ == '__main__':
    res = create_and_produce_cover(2083, brief, 'City of Lights Paris Eiffel Tower Seine river architecture daylight')
    print("SUCCESS:", res)
