import sys
sys.path.append('tools')
from canva_pipeline import create_and_produce_cover

brief = (
    'Book cover design titled "The Light on Black Rock". '
    'The title "The Light on Black Rock" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. '
    'BRIGHT MARITIME NAVIGATION DAYLIGHT STYLE: A sun-drenched ship bridge navigation station overlooking a dramatic coastal sea on a clear afternoon. '
    'In the center foreground, a polished teak chart table with an open vintage marine navigation chart showing coastal depths, a solid brass navigational divider tool, and a classic brass ship\'s clock. '
    'Through the panoramic glass bridge window, a majestic white-and-red banded coastal lighthouse perches on a dramatic dark sea rock, surrounded by sparkling turquoise ocean waters and white foaming surf. '
    'Palette: nautical brass gold, deep ocean navy, turquoise water, crisp lighthouse white, and chart parchment ivory. '
    'Navigational, bright, educational, vivid, completely daylight. '
    'STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. '
    'NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. '
    'Aspect ratio 2:3 vertical book jacket.'
)

if __name__ == '__main__':
    res = create_and_produce_cover(683, brief, "The Light on Black Rock")
    print("SUCCESS:", res)
