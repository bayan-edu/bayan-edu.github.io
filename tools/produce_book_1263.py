import sys
sys.path.append('tools')
from canva_pipeline import create_and_produce_cover

brief = (
    'Book cover design titled "A Day In Space". The title "A Day In Space" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. BRIGHT RETRO-SPACE ADVENTURE STYLE: A cheerful, vibrant cosmic exploration scene filled with whimsical wonder and celestial bodies. In the center foreground, a charming retro-futuristic red-and-white rocket ship with chrome thrusters soaring past a cratered moon and a golden-ringed planet. Floating nearby are colorful comets with sparkling dust tails, playful celestial asteroids, and an open illustrated astronomy storybook floating in microgravity. Palette: rocket bold crimson and ivory, ringed planet warm saffron, cosmic space vibrant indigo and violet, and starlight golden yellow. Space adventure, astronomy for kids, celestial discovery, cheerful, bright, imaginative, educational. STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. Aspect ratio 2:3 vertical book jacket.'
)

if __name__ == '__main__':
    res = create_and_produce_cover(1263, brief, 'A Day In Space')
    print("SUCCESS:", res)
