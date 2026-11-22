import sys
sys.path.append('tools')
from canva_pipeline import create_and_produce_cover

brief = (
    'Book cover design titled "Bones On the Go!". The title "Bones on the Go!" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. DYNAMIC SKELETAL BIOMECHANICS & ANIMAL MOTION DAYLIGHT STYLE: A brightly lit, spacious modern biomechanics physics laboratory in natural daylight. In the center foreground, dynamic skeletal running armatures in mid-motion: a cheetah skeleton captured in full-stride spine-flexing sprint, alongside a kangaroo skeletal leg showing spring-like elastic tendon biomechanics and lever mechanics. Subtle, elegant vector force arrows showing fulcrums, lever ratios (Class 1, 2, and 3 levers in bones and joints), and velocity vectors in radiant daylight. Palette: skeletal ivory bone white, kinetic trajectory orange, biomechanical cyan, and polished studio blond oak. Biomechanics, skeletal systems, animal locomotion, physics of movement, dynamic, clear, and educational. STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. Aspect ratio 2:3 vertical book jacket.'
)

if __name__ == '__main__':
    res = create_and_produce_cover(1779, brief, 'Bones On the Go animal locomotion skeletal biomechanics levers')
    print("SUCCESS:", res)
