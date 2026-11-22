import sys
sys.path.append('tools')
from canva_pipeline import create_and_produce_cover

brief = (
    'Book cover design titled "Pluto: The Planet That Wasn\'t". '
    'The title "Pluto: The Planet That Wasn\'t" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. '
    'BRIGHT ASTRONOMY & DWARF PLANET STYLE: A vivid, dramatic space vista of dwarf planet Pluto, illuminated by the distant bright sun. '
    'In the center foreground, Pluto showcases its iconic bright heart-shaped nitrogen ice glacier (Tombaugh Regio), rugged reddish-brown hydrocarbon terrain, and subtle blue atmospheric haze rim. '
    'In the background, its large moon Charon hovers gracefully, with the sleek robotic New Horizons probe dish antenna catching a glint of sunlight in the starfield. '
    'Palette: Pluto reddish-terracotta and ice white, atmospheric pale cyan, and deep celestial navy. '
    'Planetary science, astronomy, Kuiper Belt, educational, striking, clear. '
    'STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. '
    'NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. '
    'Aspect ratio 2:3 vertical book jacket.'
)

if __name__ == '__main__':
    res = create_and_produce_cover(993, brief, "Pluto: The Planet That Wasn't")
    print("SUCCESS:", res)
