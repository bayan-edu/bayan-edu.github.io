import sys
sys.path.append('tools')
from canva_pipeline import create_and_produce_cover

brief = (
    'Book cover design titled "The Night Flight". '
    'The title "The Night Flight" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. '
    'BRIGHT MOUNTAIN AVIATION & MEDICAL AID DAYLIGHT STYLE: A sun-drenched, radiant alpine airstrip runway on a crisp, clear morning following a night flight. '
    'In the center foreground, a sleek twin-engine utility propeller airplane painted in crisp white and royal blue parked on the sunlit tarmac. '
    'The aircraft\'s cargo door is open, revealing insulated white medical transport boxes labeled with a clean red cross. '
    'In the background, majestic snow-dusted alpine mountain peaks and green pine valleys shine brilliantly under a deep azure sky. '
    'Palette: aviation crisp white, vibrant royal blue, emergency red, snowcapped mountain granite, and deep sky blue. '
    'Aeronautical, heroic, bright, educational, completely daylight. '
    'STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. '
    'NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. '
    'Aspect ratio 2:3 vertical book jacket.'
)

if __name__ == '__main__':
    res = create_and_produce_cover(693, brief, "The Night Flight")
    print("SUCCESS:", res)
