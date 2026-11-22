import sys
sys.path.append('tools')
from canva_pipeline import create_and_produce_cover

brief = (
    'Book cover design titled "The One and Only Human Body". The title "The One and Only Human Body" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. COMPREHENSIVE HUMAN ANATOMY & PHYSIOLOGY DAYLIGHT STYLE: A sunlit, clean medical biology laboratory and study bathed in bright natural morning light. In the center foreground, an elegant 3D translucent anatomical acrylic model illustrating the major interconnected human body systems: the supportive skeletal bone frame, the branching red-and-blue cardiovascular circulatory vessels, the lungs for respiration, and the nervous system. Medical reference anatomical charts, a microscope, and a glass prism catching sunlight on a polished oak desk. Palette: circulatory red and royal blue, bone ivory white, acrylic clear cyan, and warm desk oak. Human anatomy, physiology, body systems, health science, biology education, dignified, inspiring, and educational. STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. Aspect ratio 2:3 vertical book jacket.'
)

if __name__ == '__main__':
    res = create_and_produce_cover(1882, brief, 'Human Body anatomy physiology systems skeletal circulatory')
    print("SUCCESS:", res)
