import sys
sys.path.append('tools')
from canva_pipeline import create_and_produce_cover

brief = (
    'Book cover design titled "The Mad Teacher". The title "The Mad Teacher" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. WHIMSICAL SCIENCE CLASSROOM DAYLIGHT STYLE: A bright, sunlit, wonderfully eccentric science laboratory classroom in daytime. An oak teacher\'s lab desk brimming with colorful bubbling glass flasks emitting playful plumes of non-toxic rainbow foam, a large brass telescope pointing out the window, a spinning terrestrial globe, and a giant chalkboard in the background covered in funny physics equations and rocket sketches. Palette: glassware neon liquids orange, lime and cyan, chalkboard slate grey with colorful chalk, and desk warm honey oak. Humorous science learning, eccentric experiments, scientific curiosity, energetic and educational. STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. Aspect ratio 2:3 vertical book jacket.'
)

if __name__ == '__main__':
    res = create_and_produce_cover(2176, brief, 'The Mad Teacher eccentric science lab bubbling beakers chalkboard')
    print("SUCCESS:", res)
