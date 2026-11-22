import sys
sys.path.append('tools')
from canva_pipeline import create_and_produce_cover

brief = (
    'Book cover design titled "The Cells That Make Us". The title "The Cells That Make Us" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. CELL BIOLOGY MICROSCOPIC STYLE: A luminous, vibrant 3D cutaway of a living eukaryotic animal cell in brilliant clarity. Showing the central nucleus with double-helix DNA chromatin, mitochondria powerhouses, endoplasmic reticulum, Golgi apparatus, and delicate cytoskeleton filaments suspended in translucent cytoplasm surrounded by a phospholipid bilayer membrane. Palette: nucleus deep royal blue and violet, mitochondria glowing magenta, cytoplasm luminous turquoise, and ribosomes golden yellow. Cytology, cell biology, microscopic anatomy, life sciences, dazzling and educational. STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. Aspect ratio 2:3 vertical book jacket.'
)

if __name__ == '__main__':
    res = create_and_produce_cover(2470, brief, 'Cells That Make Us cell biology nucleus organelles cytoplasm membrane')
    print("SUCCESS:", res)
