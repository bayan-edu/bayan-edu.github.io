import sys
sys.path.append('tools')
from canva_pipeline import create_and_produce_cover

brief = (
    'Book cover design titled "Machines Get Smarter". The title "Machines Get Smarter" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. BRIGHT ARTIFICIAL INTELLIGENCE & ROBOTICS DAYLIGHT STYLE: A sunlit, cutting-edge robotics and computer science laboratory in bright daytime. In the center foreground, a sleek, friendly robotic arm with delicate multi-jointed fingers assembling an intricate microchip circuit on a clean glass workbench. In the background, transparent holographic screens display colorful neural network node diagrams, machine learning algorithms, and optical sensor data. Palette: robot clean titanium white and brushed chrome, neural graphic cyan and amber, and laboratory sunny daylight. Artificial intelligence, robotics, machine learning, computer science, bright, forward-looking, educational, completely daylight. STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. Aspect ratio 2:3 vertical book jacket.'
)

if __name__ == '__main__':
    res = create_and_produce_cover(1317, brief, 'Machines Get Smarter')
    print("SUCCESS:", res)
