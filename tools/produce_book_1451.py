import sys
sys.path.append('tools')
from canva_pipeline import create_and_produce_cover

brief = (
    'Book cover design titled "Coast Beast". The title "Coast Beast" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. BRIGHT KINETIC BEACH SCULPTURE DAYLIGHT STYLE: A sun-drenched, windy beach on the coast of Holland on a clear summer day in bright daylight. In the center foreground, a magnificent Theo Jansen Strandbeest kinetic sculpture made of intricate yellow PVC tubes and nylon joints, its delicate multi-legged linkage walking gracefully across golden wet beach sands powered by wind sails. In the background, ocean waves break with white seafoam under a bright azure sky and soaring coastal gulls. Palette: Strandbeest tubes sunny yellow, beach sand golden ochre, seafoam white, and ocean sea green. Kinetic art, biomimetic engineering, Theo Jansen Strandbeest, wind power, physics, fascinating, bright, educational, completely daylight. STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. Aspect ratio 2:3 vertical book jacket.'
)

if __name__ == '__main__':
    res = create_and_produce_cover(1451, brief, 'Coast Beast')
    print("SUCCESS:", res)
