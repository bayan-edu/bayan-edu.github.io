import sys
sys.path.append('tools')
from canva_pipeline import create_and_produce_cover

brief = (
    'Book cover design titled "Welcome to Tomorrow!". The title "Welcome to Tomorrow!" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. BRIGHT VIRTUAL REALITY & SPATIAL COMPUTING DAYLIGHT STYLE: A sunlit, sleek modern technology living room in bright natural daylight. In the center foreground, an elegant white standalone virtual reality headset with sleek integrated lenses resting on a minimalist glass coffee table. Rising gently from the headset is a translucent, glowing holographic portal displaying a magnificent miniature virtual 3D panorama of the Serengeti plain with giraffes and the Eiffel Tower. Palette: VR headset pristine white and soft gray, holographic portal radiant cyan and violet, and room daylight ivory. Virtual reality, spatial computing, future technology, digital travel, bright, forward-looking, educational, completely daylight. STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. Aspect ratio 2:3 vertical book jacket.'
)

if __name__ == '__main__':
    res = create_and_produce_cover(1338, brief, 'Welcome to Tomorrow')
    print("SUCCESS:", res)
