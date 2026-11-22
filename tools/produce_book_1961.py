import sys
sys.path.append('tools')
from canva_pipeline import create_and_produce_cover

brief = (
    'Book cover design titled "Turtles Love the Beach, Too". The title "Turtles Love the Beach, Too" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. SEA TURTLE BEACH CONSERVATION DAYLIGHT STYLE: A sun-drenched tropical beach on a bright morning. In the foreground, a tiny newborn green sea turtle hatchling making its determined journey across smooth golden sand dunes toward the gentle foam of sparkling turquoise ocean waves breaking softly in the morning sun. Tiny flipper tracks in the sand and sunny skies above. Palette: sand warm golden yellow, ocean water crystal turquoise and seafoam white, turtle olive-brown shell, and sunny sky cyan. Marine biology, sea turtle conservation, beach ecosystems, heartwarming, inspiring and educational. STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. Aspect ratio 2:3 vertical book jacket.'
)

if __name__ == '__main__':
    res = create_and_produce_cover(1961, brief, 'Turtles Love the Beach sea turtle hatchling marine conservation')
    print("SUCCESS:", res)
