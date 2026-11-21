import sys
sys.path.append('tools')
from canva_pipeline import create_and_produce_cover

brief = (
    'Book cover design titled "What Is Gravity?". '
    'The title "What Is Gravity?" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. '
    'BRIGHT CLASSICAL PHYSICS & NATURE DAYLIGHT STYLE: A sun-drenched, radiant countryside orchard on a crisp sunny morning under a clear blue sky. '
    'In the center foreground, a ripe, vibrant red apple gracefully caught in mid-descent beneath a leafy apple tree, illustrating gravitational pull. '
    'Beside it on a rustic wooden study bench rest an authentic dual-pan brass balance scale with shiny calibrated weights, a brass pocket compass, and an open notebook with neat orbital diagrams. '
    'In the soft sky above, a faint pale moon is visible in the bright daylight, symbolizing orbital gravity. '
    'Palette: crisp apple red, brass instrument gold, orchard leaf green, weathered timber tan, and clear sky blue. '
    'Physics science, bright, educational, vivid, completely daylight. '
    'STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. '
    'NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. '
    'Aspect ratio 2:3 vertical book jacket.'
)

if __name__ == '__main__':
    res = create_and_produce_cover(892, brief, "What Is Gravity?")
    print("SUCCESS:", res)
