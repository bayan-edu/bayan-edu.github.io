import sys
sys.path.append('tools')
from canva_pipeline import create_and_produce_cover

brief = (
    'Book cover design titled "Remya Cleans Up". '
    'The title "Remya Cleans Up" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. '
    'BRIGHT SUSTAINABLE INVENTIONS & MECHANICAL ENGINEERING DAYLIGHT STYLE: A sunlit, inspiring rural artisan workshop and courtyard on a bright sunny morning in natural daylight. '
    'In the center foreground, an ingenious human-powered pedal washing machine crafted from polished bicycle pedals, chrome sprockets, chain drive, and a gleaming perforated metal wash drum filled with clean colorful fabrics and soapy water bubbles glistening in the sunlight. '
    'Beside it on a wooden table, bicycle wrenches, engineering hand sketches, and clean folded woven cotton linens. '
    'In the background, a sunny courtyard with blooming tropical bougainvillea and a clear blue sky. '
    'Palette: mechanical steel and chrome, bicycle frame bright turquoise, linen warm cream, and bougainvillea magenta. '
    'Invention, frugal engineering, sustainability, clean technology, bright, educational, inspiring, completely daylight. '
    'STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. '
    'NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. '
    'Aspect ratio 2:3 vertical book jacket.'
)

if __name__ == '__main__':
    res = create_and_produce_cover(1052, brief, "Remya Cleans Up")
    print("SUCCESS:", res)
