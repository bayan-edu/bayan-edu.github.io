import sys
sys.path.append('tools')
from canva_pipeline import create_and_produce_cover

brief = (
    'Book cover design titled "What\'s This? Iron Grip". The title "Iron Grip" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. BIOMECHANICS & ANIMAL ADAPTIVE GRIP DAYLIGHT STYLE: A sunlit, fascinating biomechanical study in a bright modern science laboratory. In the foreground, a close-up comparative study of extraordinary biological gripping adaptations: a gecko foot showing microscopic spatula setae clinging effortlessly to smooth vertical glass; a powerful eagle talon firmly clasping a weathered branch; and a chameleon zygodactylous grasping foot beside an advanced robotic soft-gripper arm. Clean force vector arrows and microscopic adhesion diagrams in clear educational graphics. Palette: gecko lime green, raptor golden talon amber, branch oak brown, laboratory cyan, and clean studio white. Biomechanics, animal adaptations, structural biology, biomimicry, dynamic and fascinating. STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. Aspect ratio 2:3 vertical book jacket.'
)

if __name__ == '__main__':
    res = create_and_produce_cover(1657, brief, 'Whats This Iron Grip biomechanics gecko toe raptor talons')
    print("SUCCESS:", res)
