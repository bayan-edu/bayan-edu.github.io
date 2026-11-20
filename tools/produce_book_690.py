import sys
sys.path.append('tools')
from canva_pipeline import create_and_produce_cover

brief = (
    'Book cover design titled "The Tower of Pisa". '
    'The title "The Tower of Pisa" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. '
    'BRIGHT CIVIL ENGINEERING ARCHITECTURE DAYLIGHT STYLE: A sun-drenched, radiant Mediterranean vista in Pisa on a glorious clear morning under an azure blue sky. '
    'In the center, the iconic freestanding white marble Leaning Tower of Pisa rises gracefully with its famous gentle tilt from the pristine emerald green lawn of the Piazza dei Miracoli. '
    'Intricate Romanesque colonnades and tiered marble arches gleam brilliantly under warm Italian sunlight. '
    'In the foreground resting on a stone balustrade, an engineer\'s vintage brass plumb-bob level and drafting compass catching the sun. '
    'Palette: Tuscan Carrara marble white, lush lawn emerald green, architectural brass gold, and brilliant Mediterranean azure blue. '
    'Architectural, engineering, bright, educational, completely daylight. '
    'STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. '
    'NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. '
    'Aspect ratio 2:3 vertical book jacket.'
)

if __name__ == '__main__':
    res = create_and_produce_cover(690, brief, "The Tower of Pisa")
    print("SUCCESS:", res)
