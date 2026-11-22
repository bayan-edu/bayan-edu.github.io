import sys
sys.path.append('tools')
from canva_pipeline import create_and_produce_cover

brief = (
    'Book cover design titled "Literature: A Picture to Remember". The title "Literature: A Picture to Remember" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. BRIGHT FINE ART STUDIO DAYLIGHT STYLE: A sunlit artist\'s restoration atelier in bright natural morning daylight. In the center foreground, a wooden studio easel holding a vibrant oil painting of a sunlit Venetian canal and historic stone bridge. On an artist\'s taboret beside the easel rest tubes of oil paints, fine sable brushes, a palette knife with dabbed colors, a wooden painter\'s palette, and a brass magnifying glass. Palette: canvas Venetian aqua and ochre, paint tubes cobalt blue and crimson, easel warm beech, and studio daylight bright ivory. Art history, mystery, artistic restoration, painting studio, creative, bright, educational, completely daylight. STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. Aspect ratio 2:3 vertical book jacket.'
)

if __name__ == '__main__':
    res = create_and_produce_cover(1377, brief, 'Literature A Picture to Remember')
    print("SUCCESS:", res)
