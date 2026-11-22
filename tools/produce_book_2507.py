import sys
sys.path.append('tools')
from canva_pipeline import create_and_produce_cover

brief = (
    'Book cover design titled "The Growth Factor". The title "The Growth Factor" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. MOLECULAR CELL DIVISION AND GROWTH STYLE: A luminous, high-detail scientific visualization of cell division and growth factors. In the center, a cell undergoing mitotic division (mitosis) with glowing centrosomes and microtubule spindle fibers separating duplicate chromosomes, surrounded by radiant molecular models of signaling growth factor proteins binding to cell surface receptor kinases. Palette: mitotic spindle electric cyan, chromosomes magenta and violet, signaling molecules radiant gold, and background deep navy. Molecular biology, cell division, growth factors, genetics, brilliant and educational. STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. Aspect ratio 2:3 vertical book jacket.'
)

if __name__ == '__main__':
    res = create_and_produce_cover(2507, brief, 'The Growth Factor cellular growth mitosis DNA replication biology')
    print("SUCCESS:", res)
