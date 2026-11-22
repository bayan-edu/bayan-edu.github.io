import sys
sys.path.append('tools')
from canva_pipeline import create_and_produce_cover

brief = (
    'Book cover design titled "Wired World". The title "Wired World" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. LUMINESCENT FIBER-OPTIC & GLOBAL CONNECTIVITY DAYLIGHT STYLE: A modern, high-tech telecommunications visualization in a sunlit tech laboratory. In the center foreground, a cross-section of a heavy-duty submarine transoceanic cable, with cutaway steel armor revealing hundreds of glowing glass optical fiber strands emitting brilliant pulses of laser light. A stylized 3D translucent globe showing oceanic cable routes connecting continents with glowing light pathways. Optical prism splitting white sunlight into rainbow spectral bands on an engineering workbench. Palette: luminous cyan, electric blue, optic glass white, copper gold, and ocean navy. Fiber optics, global communications, digital infrastructure, telecommunications engineering. STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. Aspect ratio 2:3 vertical book jacket.'
)

if __name__ == '__main__':
    res = create_and_produce_cover(1565, brief, 'Wired World fiber optics undersea cables telecommunication')
    print("SUCCESS:", res)
