import sys
sys.path.append('tools')
from canva_pipeline import create_and_produce_cover

brief = (
    'Book cover design titled "Homecoming: The Journey of a Tiny Turtle". The title "Homecoming" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. SEA TURTLE HATCHLING ADVENTURE DAYLIGHT STYLE: A sunlit, golden sandy beach on a tropical morning. A tiny newborn baby sea turtle hatchling making its determined journey down a gentle sand dune, leaving tiny flipper tracks, heading directly toward the refreshing, sun-glistening white seafoam of breaking turquoise ocean waves under sunny skies. Palette: sand warm golden ochre, ocean waves sparkling turquoise and seafoam white, turtle shell olive-green, and sky cyan. Marine biology, sea turtle migration, survival instincts, beach ecosystems, touching and educational. STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. Aspect ratio 2:3 vertical book jacket.'
)

if __name__ == '__main__':
    res = create_and_produce_cover(2632, brief, 'Homecoming Journey Tiny Turtle sea turtle hatchling ocean waves beach')
    print("SUCCESS:", res)
