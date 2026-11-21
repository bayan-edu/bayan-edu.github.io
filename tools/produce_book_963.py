import sys
sys.path.append('tools')
from canva_pipeline import create_and_produce_cover

brief = (
    'Book cover design titled "She Explained Mysteries". '
    'The title "She Explained Mysteries" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. '
    'BRIGHT HISTORICAL CHINESE ASTRONOMY & ECLIPSE SCIENCE DAYLIGHT STYLE: A sunlit, elegant traditional garden pavilion on a crisp sunny morning with bright daylight streaming through ornate carved wooden lattice windows. '
    'In the center foreground, an authentic 18th-century scientific demonstration: a polished bronze armillary sphere, a hand-painted celestial globe, and a circular bronze mirror capturing sunbeams. '
    'On a carved mahogany scholar\'s desk rest fine bamboo calligraphy brushes, an inkstone, and an open silk scroll with neat geometric diagrams explaining lunar eclipses. '
    'Through the open pavilion arches in the background, a serene lotus pond and weeping willows glow under a brilliant sky. '
    'Palette: polished bronze gold, scholar mahogany tan, silk scroll ivory, lotus green, and sunny morning gold. '
    'Historical astronomy, bright, educational, vivid, completely daylight. '
    'STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. '
    'NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. '
    'Aspect ratio 2:3 vertical book jacket.'
)

if __name__ == '__main__':
    res = create_and_produce_cover(963, brief, "She Explained Mysteries")
    print("SUCCESS:", res)
