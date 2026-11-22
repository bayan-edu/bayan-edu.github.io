import sys
sys.path.append('tools')
from canva_pipeline import create_and_produce_cover

brief = (
    'Book cover design titled "What Is a Galaxy?". '
    'The title "What Is a Galaxy?" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. '
    'BRIGHT VIBRANT ASTROPHYSICS & SPIRAL GALAXY STYLE: A breathtaking cosmic panorama featuring a magnificent grand-design spiral galaxy viewed from an open sunlit space observatory observation deck. '
    'In the center, the spiral galaxy shines with sweeping pinwheel spiral arms filled with billions of sparkling golden and diamond stars, vibrant magenta star-forming nebulae, and a luminous bright galactic core. '
    'In the foreground, the clean curved architectural railing of the observatory deck and an antique brass astrolabe reflecting starlight. '
    'Palette: spiral galaxy golden-white core, nebula magenta and violet, starlight diamond white, and deep cosmic navy. '
    'Astronomy, galaxies, Milky Way, astrophysics, bright, educational, breathtaking. '
    'STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. '
    'NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. '
    'Aspect ratio 2:3 vertical book jacket.'
)

if __name__ == '__main__':
    res = create_and_produce_cover(1000, brief, "What Is a Galaxy?")
    print("SUCCESS:", res)
