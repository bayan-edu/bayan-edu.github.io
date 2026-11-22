import sys
sys.path.append('tools')
from canva_pipeline import create_and_produce_cover

brief = (
    'Book cover design titled "What Is Gravity Really?". '
    'The title "What Is Gravity Really?" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. '
    'BRIGHT GENERAL RELATIVITY & GRAVITATIONAL PHYSICS DAYLIGHT STYLE: A sunlit, inspiring physics lecture laboratory and observatory on a glorious clear day under natural daylight. '
    'In the center foreground, on a clean workbench: an artistic physical demonstration of general relativity showing a taut grid membrane indented smoothly by a heavy polished steel sphere (representing mass curving space), guiding smaller chrome marbles along curved orbital paths. '
    'Beside the model, a fresh red apple resting on an open vintage physics textbook, a swinging brass pendulum clock, and chalkboard sketches of spacetime curvature. '
    'In the background, sun-drenched arched windows look out over green university lawns under a clear azure sky. '
    'Palette: spacetime grid electric cobalt, sphere polished chrome, apple crisp red, and sunny daylight ivory. '
    'Physics of gravity, Albert Einstein, general relativity, Isaac Newton, bright, educational, dynamic, completely daylight. '
    'STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. '
    'NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. '
    'Aspect ratio 2:3 vertical book jacket.'
)

if __name__ == '__main__':
    res = create_and_produce_cover(1042, brief, "What Is Gravity Really?")
    print("SUCCESS:", res)
