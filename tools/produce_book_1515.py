import sys
sys.path.append('tools')
from canva_pipeline import create_and_produce_cover

brief = (
    'Book cover design titled "Grace Hopper (1906–1992)". The title "Grace Hopper" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. BRIGHT EARLY COMPUTING & COMPILER INNOVATION STYLE: A sunlit 1940s-1950s naval computing laboratory in bright morning natural daylight. In the center foreground, an antique electromechanical computer relay cabinet with vacuum tubes, paper punch tapes with perforated holes, an open programming manual showing early flowchart compiler code, and an antique brass ship\'s clock. On an oak desk rests an authentic brass handheld magnifying glass focusing on the famous historic logbook with a moth bug taped to the page. Palette: oak desk warm amber, relay cabinet battleship gray, punch tape ivory, and morning daylight bright white. Computer science pioneer, Grace Hopper legacy, programming compilers, computing history, inspiring, bright, educational. STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. Aspect ratio 2:3 vertical book jacket.'
)

if __name__ == '__main__':
    res = create_and_produce_cover(1515, brief, 'Grace Hopper 1906 1992')
    print("SUCCESS:", res)
