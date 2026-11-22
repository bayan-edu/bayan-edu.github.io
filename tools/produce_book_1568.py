import sys
sys.path.append('tools')
from canva_pipeline import create_and_produce_cover

brief = (
    'Book cover design titled "Biomimicry". The title "Biomimicry" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. ELEGANT BIO-INSPIRED ENGINEERING DAYLIGHT STYLE: A bright, sunlit futuristic design studio and nature observation terrace. Side-by-side comparative visual wonders: a kingfisher bird\'s streamlined aerodynamic beak placed beside the aerodynamic nose of a Japanese Shinkansen bullet train; a lotus leaf repelling glistening spherical water droplets (superhydrophobic effect); and gecko toe pad micro-structures beside advanced nano-adhesives. Blueprint grid lines and natural organic curves merging harmoniously in radiant daylight. Palette: kingfisher turquoise, lotus leaf emerald green, technical blueprint cyan, clean architectural white, and bright daylight yellow. Biomimicry, sustainable design, nature-inspired engineering, scientific wonder. STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. Aspect ratio 2:3 vertical book jacket.'
)

if __name__ == '__main__':
    res = create_and_produce_cover(1568, brief, 'Biomimicry nature inspired engineering technology')
    print("SUCCESS:", res)
