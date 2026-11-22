import sys
sys.path.append('tools')
from canva_pipeline import create_and_produce_cover

brief = (
    'Book cover design titled "Let\'s Play Some Kickball!". The title "Let\'s Play Some Kickball!" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. BRIGHT SPORTS PHYSICS & KICKBALL DIAMOND DAYLIGHT STYLE: A sunlit school athletic field and red clay kickball diamond on a glorious sunny afternoon. In the center foreground, a classic textured bright red rubber kickball resting on a clean white home-plate base. Colorful, energetic physics graphic overlays illustrate the forces of motion: force push vectors, trajectory arc curves, gravity, and ground friction arrows. In the background, groomed green outfield grass and white boundary lines stretch beneath a clear blue sky. Palette: kickball candy apple red, base white, clay terracotta, grass emerald, and force arrows bright yellow and cyan. Physics in sports, Newton\'s laws of motion, recreational kickball, energetic, cheerful, educational, completely daylight. STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. Aspect ratio 2:3 vertical book jacket.'
)

if __name__ == '__main__':
    res = create_and_produce_cover(1522, brief, 'Lets Play Some Kickball')
    print("SUCCESS:", res)
