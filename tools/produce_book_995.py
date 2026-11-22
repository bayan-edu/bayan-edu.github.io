import sys
sys.path.append('tools')
from canva_pipeline import create_and_produce_cover

brief = (
    'Book cover design titled "Saturn and Its Rings". '
    'The title "Saturn and Its Rings" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. '
    'BRIGHT MAJESTIC PLANETARY ASTRONOMY STYLE: A brilliant, sun-illuminated view of the magnificent ringed planet Saturn in all its glory. '
    'In the center, Saturn\'s vast, dazzling system of thousands of concentric ice ringlets gleaming brightly in direct sunlight, casting crisp dark shadows across its pastel golden-amber and cream cloud bands. '
    'A tiny sparkling icy moon (like Enceladus) glimmers nearby like a diamond against the vast starry cosmos. '
    'Palette: Saturn golden amber and cream, ice rings brilliant radiant white, and cosmic sapphire. '
    'Astronomy, planetary science, gas giants, bright, majestic, educational. '
    'STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. '
    'NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. '
    'Aspect ratio 2:3 vertical book jacket.'
)

if __name__ == '__main__':
    res = create_and_produce_cover(995, brief, "Saturn and Its Rings")
    print("SUCCESS:", res)
