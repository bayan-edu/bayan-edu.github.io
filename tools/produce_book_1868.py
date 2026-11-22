import sys
sys.path.append('tools')
from canva_pipeline import create_and_produce_cover

brief = (
    'Book cover design titled "New Vinci". The title "New Vinci" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. BIOMIMETIC ENGINEERING & POLYMATH INNOVATION DAYLIGHT STYLE: A sunlit, inspiring inventor\'s workshop in bright morning natural light. On a wide oak drafting table, an antique parchment blueprint of Leonardo da Vinci\'s mechanical flying wing merging seamlessly into a cutting-edge 3D CAD holographic wireframe. In the center, a high-tech bio-inspired robotic dragonfly drone with translucent iridescent wings, brass drafting calipers, gear mechanisms, and open botanical sketchbooks. Sunbeams streaming through arched studio windows. Palette: parchment antique gold, robotic dragonfly iridescent cyan and titanium chrome, oak wood, and morning sunbeam white. Biomimicry, historical innovation to modern robotics, engineering design, polymath creativity, scholarly and educational. STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. Aspect ratio 2:3 vertical book jacket.'
)

if __name__ == '__main__':
    res = create_and_produce_cover(1868, brief, 'New Vinci biomimicry bio-inspired engineering Leonardo innovation')
    print("SUCCESS:", res)
