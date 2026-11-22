import sys
sys.path.append('tools')
from canva_pipeline import create_and_produce_cover

brief = (
    'Book cover design titled "The Club of the Century". The title "The Club of the Century" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. CRICKET TRADITION AND SPORTS HERITAGE DAYLIGHT STYLE: A sun-soaked, pristine cricket oval on a glorious summer afternoon. In the foreground, an authentic handcrafted English willow cricket bat, a polished red leather cricket ball with white seam, and polished wooden wickets with bails standing firmly in the turf pitch, with clean parabolic trajectory lines showing spin bowling aerodynamics. Palette: cricket bat English willow honey blonde, ball glossy cherry red, pitch grass emerald green, and sunny sky azure. Cricket history, sportsmanship, ball physics, traditional sports culture, elegant and educational. STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. Aspect ratio 2:3 vertical book jacket.'
)

if __name__ == '__main__':
    res = create_and_produce_cover(2554, brief, 'Club of the Century cricket bat leather ball wicket pitch grass daylight')
    print("SUCCESS:", res)
