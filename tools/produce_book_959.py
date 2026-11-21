import sys
sys.path.append('tools')
from canva_pipeline import create_and_produce_cover

brief = (
    'Book cover design titled "Plants Native to Australia". '
    'The title "Plants Native to Australia" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. '
    'BRIGHT AUSTRALIAN BOTANY & FLORA DAYLIGHT STYLE: A sun-drenched, radiant Australian botanical sanctuary on a glorious sunny morning under bright daylight. '
    'In the center foreground, iconic Australian native wildflowers: a large golden Banksia flower cone with honey nectar, radiant Golden Wattle branches with fluffy yellow blossoms, and silvery-blue Eucalyptus gum leaves. '
    'Beside the flora on a weathered wooden garden bench, a brass botanical magnifying glass and an open illustrated field flora guide catch warm golden sunbeams. '
    'In the background, sunlit Eucalyptus trees and ancient red sandstone rock formations glow under an azure sky. '
    'Palette: wattle bright gold, banksia honey amber, eucalyptus silvery sage, and sunny sky blue. '
    'Botanical science, ecology, bright, educational, vivid, completely daylight. '
    'STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. '
    'NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. '
    'Aspect ratio 2:3 vertical book jacket.'
)

if __name__ == '__main__':
    res = create_and_produce_cover(959, brief, "Plants Native to Australia")
    print("SUCCESS:", res)
