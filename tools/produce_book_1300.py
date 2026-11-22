import sys
sys.path.append('tools')
from canva_pipeline import create_and_produce_cover

brief = (
    'Book cover design titled "Can Imitating Be Life-Saving?". The title "Can Imitating Be Life-Saving?" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. BRIGHT BIOMIMICRY & BIO-INSPIRED ENGINEERING DAYLIGHT STYLE: A sunlit innovation laboratory workbench bathed in bright natural daylight. In the center foreground, a direct visual comparison between nature and engineering: a fresh green lotus leaf with crystal-clear water droplets beading into perfect spheres (the lotus effect) alongside an advanced waterproof synthetic fabric sample. Beside it, prickly burdock seed burrs resting beside hook-and-loop fasteners, and clean educational engineering diagrams connecting natural structures to modern technology. Palette: lotus leaf fresh jade green, water droplet crystal clear, synthetic fabric technical cyan, and workbench warm beech wood. Biomimicry, bio-inspired engineering, material science, nature innovation, bright, smart, educational, completely daylight. STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. Aspect ratio 2:3 vertical book jacket.'
)

if __name__ == '__main__':
    res = create_and_produce_cover(1300, brief, 'Can Imitating Be Life-Saving?')
    print("SUCCESS:", res)
