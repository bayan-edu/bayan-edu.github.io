import sys
sys.path.append('tools')
from canva_pipeline import create_and_produce_cover

brief = (
    'Book cover design titled "Alien at School". The title "Alien at School" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. WHIMSICAL SCI-FI CLASSROOM DAYLIGHT STYLE: A sunlit, colorful school hallway and classroom on a bright morning. Floating playfully in the hallway is an endearing, friendly spherical extraterrestrial robot companion with glowing green optical sensors, a springy antenna, and anti-gravity propulsion, levitating a stack of colorful school textbooks and pencils across the air. Sunny classroom lockers, student art posters, and bright window daylight. Palette: alien robot iridescent teal and chrome, textbooks bright orange and royal blue, school lockers sunny yellow, and morning light warm white. School adventures, sci-fi fun, friendly technology, imaginative and educational. STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. Aspect ratio 2:3 vertical book jacket.'
)

if __name__ == '__main__':
    res = create_and_produce_cover(2158, brief, 'Alien at School friendly robot gadget hoverboard textbooks classroom')
    print("SUCCESS:", res)
