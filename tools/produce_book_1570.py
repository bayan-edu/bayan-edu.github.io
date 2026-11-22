import sys
sys.path.append('tools')
from canva_pipeline import create_and_produce_cover

brief = (
    'Book cover design titled "Cutting Edge". The title "Cutting Edge" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. PRECISION MATERIAL SCIENCE & ADVANCED MANUFACTURING STYLE: A pristine, high-tech laser fabrication and materials engineering facility in clean daylight. In the center foreground, a high-precision computer-guided laser cutting nozzle emitting a focused golden cutting beam onto aerospace titanium sheet metal. Gleaming diamond-tipped micro-scalpels, obsidian blades, and waterjet cutting nozzles displayed on an engineering velvet tray. Crisp laser alignment grids and microscopic grain boundary crystallography diagrams softly visible in background. Palette: laser beam gold, titanium metallic silver, carbon slate, electric cyan, and clean studio white. Materials science, manufacturing technology, precision physics, industrial innovation. STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. Aspect ratio 2:3 vertical book jacket.'
)

if __name__ == '__main__':
    res = create_and_produce_cover(1570, brief, 'Cutting Edge precision materials science laser cutting')
    print("SUCCESS:", res)
