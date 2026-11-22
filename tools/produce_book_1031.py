import sys
sys.path.append('tools')
from canva_pipeline import create_and_produce_cover

brief = (
    'Book cover design titled "A Hidden Figure of the Space Race: Katherine G. Johnson". '
    'The title "A Hidden Figure of the Space Race: Katherine G. Johnson" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. '
    'BRIGHT ORBITAL MATHEMATICS & NASA SPACE RACE DAYLIGHT STYLE: A sunlit, inspiring 1960s NASA mathematics and flight trajectory office on a bright sunny day in natural daylight. '
    'In the center foreground, on a clean mid-century wooden desk: complex hand-calculated orbital flight trajectory maps tracing the translunar injection path between Earth and Moon, a classic vintage Marchant mechanical calculating machine with chrome levers, slide rules, brass dividers, and a detailed desktop model of the Apollo spacecraft. '
    'In the background, sunlit office windows look out toward the Cape Canaveral launch towers under a brilliant blue sky. '
    'Palette: trajectory blueprint cobalt blue, calculation parchment white, calculator chrome and black, and sunny Florida sky cyan. '
    'Space race history, orbital mathematics, Katherine Johnson, NASA, bright, educational, inspiring, completely daylight. '
    'STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. '
    'NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. '
    'Aspect ratio 2:3 vertical book jacket.'
)

if __name__ == '__main__':
    res = create_and_produce_cover(1031, brief, "A Hidden Figure of the Space Race: Katherine G. Johnson")
    print("SUCCESS:", res)
