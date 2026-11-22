import sys
sys.path.append('tools')
from canva_pipeline import create_and_produce_cover

brief = (
    'Book cover design titled "The Dance of the Flamingo". The title "The Dance of the Flamingo" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. FLAMINGO LAGOON ECOLOGY DAYLIGHT STYLE: A sun-drenched alkaline salt lake in Kenya in bright morning light. A spectacular flock of vibrant pink greater flamingos (Phoenicopterus roseus) engaged in synchronized courtship display, arching their long graceful necks, opening radiant coral and black wings, and marching together in shallow turquoise brine reflecting sunbeams. Palette: flamingo plumage brilliant coral-pink and crimson, lake water turquoise and pastel reflection, and sky sunny cyan. Avian ethology, animal courtship behavior, wetland biodiversity, magnificent, graceful and educational. STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. Aspect ratio 2:3 vertical book jacket.'
)

if __name__ == '__main__':
    res = create_and_produce_cover(2651, brief, 'Dance Flamingo Phoenicopterus pink flock lagoon salt lake courtship')
    print("SUCCESS:", res)
