import sys
sys.path.append('tools')
from canva_pipeline import create_and_produce_cover

brief = (
    'Book cover design titled "The Mighty Semiconductor and the Rise of Silicon Valley". The title "The Mighty Semiconductor" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. SEMICONDUCTOR SILICON WAFER CLEANROOM STYLE: A high-tech, sunlit semiconductor fabrication facility in daytime. In the center foreground, a polished 300mm crystalline silicon wafer gleaming with iridescent rainbow diffraction patterns across thousands of microchip dies, beside an integrated circuit package with microscopic gold bonding wires and microscopic nanometer transistor diagrams under bright cleanroom lighting. Palette: silicon wafer iridescent rainbow and mirror silver, silicon chip dark charcoal with gold bonding wire accents, and cleanroom crisp white. Semiconductor physics, microchip manufacturing, Silicon Valley history, computer hardware, cutting-edge and educational. STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. Aspect ratio 2:3 vertical book jacket.'
)

if __name__ == '__main__':
    res = create_and_produce_cover(2347, brief, 'Semiconductor Silicon Valley silicon wafer microchip transistors cleanroom')
    print("SUCCESS:", res)
