import sys
sys.path.append('tools')
from canva_pipeline import create_and_produce_cover

brief = (
    'Book cover design titled "Soap and Water". '
    'The title "Soap and Water" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. '
    'BRIGHT HYGIENE SCIENCE DAYLIGHT STYLE: A sun-drenched, radiant and clean bathroom on a bright sunny morning with natural golden light streaming in. '
    'In the center foreground, a pristine white porcelain washbasin with crystal-clear water flowing smoothly from a gleaming chrome faucet. '
    'Resting on a neat modern ribbed dish is a beautiful translucent amber-gold bar of soap, surrounded by delicate shimmering iridescent foam bubbles and airy white lather. '
    'Beside the sink on the bright countertop sits a fresh, neatly folded sunny-yellow cotton hand towel and a small potted green succulent plant catching the morning sun. '
    'Palette: crisp ceramic white, sparkling water blue, sunny yellow, warm amber gold, and fresh botanical green. '
    'Refreshing, bright, educational, vivid, completely daylight. '
    'STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. '
    'NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. '
    'Aspect ratio 2:3 vertical book jacket.'
)

if __name__ == '__main__':
    res = create_and_produce_cover(660, brief, "Soap and Water")
    print("SUCCESS:", res)
