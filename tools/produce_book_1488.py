import sys
sys.path.append('tools')
from canva_pipeline import create_and_produce_cover

brief = (
    'Book cover design titled "Visual Processing in the Brain". The title "Visual Processing in the Brain" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. BRIGHT OPTICAL NEUROSCIENCE & VISUAL CORTEX DAYLIGHT STYLE: A sunlit human neuroscience laboratory exhibit in bright natural daylight. In the center foreground, an optical model of the human eye focusing a colorful geometric image through the cornea and lens onto the retina. Gently glowing electric-blue and amber optic nerve fibers trace backward to the primary visual cortex (V1) in a translucent anatomical brain model, illustrating edge detection, color processing, and motion perception. Palette: eye model crystal clear and white, optic nerve fibers cyan and gold, brain model coral-pink, and lab daylight white. Neuroscience, visual perception, optics, brain processing, sensory biology, crisp, bright, educational, completely daylight. STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. Aspect ratio 2:3 vertical book jacket.'
)

if __name__ == '__main__':
    res = create_and_produce_cover(1488, brief, 'Visual Processing in the Brain')
    print("SUCCESS:", res)
