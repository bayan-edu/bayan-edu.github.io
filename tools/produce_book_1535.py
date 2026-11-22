import sys
sys.path.append('tools')
from canva_pipeline import create_and_produce_cover

brief = (
    'Book cover design titled "The Inner Limits". The title "The Inner Limits" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. BRIGHT NANOTECHNOLOGY & SEMICONDUCTOR DAYLIGHT STYLE: A sunlit, high-tech semiconductor research cleanroom in bright natural daylight. In the center foreground, a polished 300mm circular silicon wafer disc catching light to display shimmering iridescent rainbow diffraction patterns across microscopic microchip dies. Beside the wafer, an electron microscope monitor displays atomic-scale semiconductor gate lattices and transistors, surrounded by precision silicon fabrication tools. Palette: silicon wafer iridescent rainbow (cyan, magenta, gold), cleanroom titanium white, and diagnostic monitors electric blue. Nanotechnology, semiconductor physics, microprocessors, Moore\'s law, computing innovation, high-tech, bright, educational. STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. Aspect ratio 2:3 vertical book jacket.'
)

if __name__ == '__main__':
    res = create_and_produce_cover(1535, brief, 'The Inner Limits')
    print("SUCCESS:", res)
