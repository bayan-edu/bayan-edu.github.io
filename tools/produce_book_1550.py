import sys
sys.path.append('tools')
from canva_pipeline import create_and_produce_cover

brief = (
    'Book cover design titled "Meet the Microbes". The title "Meet the Microbes" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. BRIGHT MODERN MICROBIOLOGY LABORATORY DAYLIGHT STYLE: A sunlit, clean scientific biology lab on a bright morning. In the center foreground, an optical compound microscope with brass and chrome accents, illuminated from below. Beside it, glass petri dishes with vibrant, colorful agar cultures of glowing friendly beneficial microbes, lactobacillus, and spiral spirulina under crisp glass lids. A translucent 3D molecular double-helix model and laboratory test tubes with bright turquoise and emerald solutions sit in an acrylic rack in bright daylight. Palette: turquoise, emerald green, glowing chartreuse, clean optic white, and cobalt blue. Educational, inspiring, microscopic wonder, scientific discovery. STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. Aspect ratio 2:3 vertical book jacket.'
)

if __name__ == '__main__':
    res = create_and_produce_cover(1550, brief, 'Meet the Microbes microbiology')
    print("SUCCESS:", res)
