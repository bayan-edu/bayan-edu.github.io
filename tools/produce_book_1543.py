import sys
sys.path.append('tools')
from canva_pipeline import create_and_produce_cover

brief = (
    'Book cover design titled "What Is a Satellite?". The title "What Is a Satellite?" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. BRIGHT ORBITAL SATELLITES & CELESTIAL MECHANICS STYLE: An awe-inspiring, sun-illuminated view of space around planet Earth in brilliant daylight. In the center foreground, a modern telecommunications satellite with gold foil thermal blankets, solar panel arrays, and parabolic communication antennas pointed toward the blue Earth below. In the background, Earth\'s natural satellite—the cratered white Moon—orbits gracefully along a glowing geometric orbital trajectory line under golden sunlight. Palette: satellite gold foil and solar blue, Earth sapphire and white clouds, Moon pearl white, and space deep navy. Space technology, artificial and natural satellites, telecommunications, orbital mechanics, inspiring, bright, educational. STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. Aspect ratio 2:3 vertical book jacket.'
)

if __name__ == '__main__':
    res = create_and_produce_cover(1543, brief, 'What Is a Satellite')
    print("SUCCESS:", res)
