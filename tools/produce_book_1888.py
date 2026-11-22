import sys
sys.path.append('tools')
from canva_pipeline import create_and_produce_cover

brief = (
    'Book cover design titled "From One to Many". The title "From One to Many" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. CELLULAR EMBRYOLOGY & MITOSIS DAYLIGHT STYLE: A bright, sunlit modern genetics and developmental biology laboratory in natural morning daylight. In the center foreground, a striking sequential circular progression of cellular cleavage under high magnification: a single fertilized zygote cell dividing smoothly into 2 cells, then 4, 8, 16 cells (morula), and forming a multicellular blastula with glowing green and cyan cell membranes. Chromosomes aligning on mitotic spindle fibers, DNA double helix models, and petri dishes on a clean white laboratory table. Palette: dividing cells glowing translucent cyan and emerald, nucleus coral pink, laboratory white, and sunny glass reflection. Cell division, mitosis, embryology, developmental biology, from single cell to multicellular organism, inspiring and educational. STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. Aspect ratio 2:3 vertical book jacket.'
)

if __name__ == '__main__':
    res = create_and_produce_cover(1888, brief, 'From One to Many cell division mitosis development multicellular')
    print("SUCCESS:", res)
