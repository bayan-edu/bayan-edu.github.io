import sys
sys.path.append('tools')
from canva_pipeline import create_and_produce_cover

brief = (
    'Book cover design titled "Black Lines on the Sand". '
    'The title "Black Lines on the Sand" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. '
    'BRIGHT DESERT AGRICULTURE DAYLIGHT STYLE: A sun-drenched, radiant desert date palm oasis on a brilliant morning under an azure blue sky. '
    'In the center foreground, sleek black drip irrigation pipes neatly aligned across golden rippled sand dunes, with micro-dripper nozzles releasing glistening, sparkling droplets of cool water into the moist dark soil around the base of flourishing date palm trees. '
    'Towering lush green date palms with golden date clusters rise into the bright sunlit horizon. '
    'Palette: warm desert gold, lush palm emerald green, matte black tubing, sparkling water cyan, and azure sky blue. '
    'Agricultural, bright, educational, vivid, completely daylight. '
    'STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. '
    'NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. '
    'Aspect ratio 2:3 vertical book jacket.'
)

if __name__ == '__main__':
    res = create_and_produce_cover(668, brief, "Black Lines on the Sand")
    print("SUCCESS:", res)
