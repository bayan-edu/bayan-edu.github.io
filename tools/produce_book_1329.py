import sys
sys.path.append('tools')
from canva_pipeline import create_and_produce_cover

brief = (
    'Book cover design titled "The Robots Are Here!". The title "The Robots Are Here!" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. BRIGHT ANIMATRONIC ROBOTICS WORKSHOP DAYLIGHT STYLE: A sunlit, creative robotics laboratory on a glorious sunny day in bright daylight. In the center foreground, an eccentric, cheerful mechanical robot drummer with polished chrome articulated arms and pneumatic pistons poised gracefully with wooden drumsticks over a colorful drum kit. Surrounding the robot on clean workbenches are robotic gears, colorful servo motor wires, an electronic audio synthesizer, and technical animatronic blueprints. Palette: robot polished chrome and cobalt blue, drum kit candy apple red, and studio daylight bright ivory. Robotics, animatronics, mechanical engineering, music and technology, playful, bright, educational, completely daylight. STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. Aspect ratio 2:3 vertical book jacket.'
)

if __name__ == '__main__':
    res = create_and_produce_cover(1329, brief, 'The Robots Are Here')
    print("SUCCESS:", res)
