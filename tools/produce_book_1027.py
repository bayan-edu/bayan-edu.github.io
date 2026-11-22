import sys
sys.path.append('tools')
from canva_pipeline import create_and_produce_cover

brief = (
    'Book cover design titled "Women Programmers of ENIAC". '
    'The title "Women Programmers of ENIAC" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. '
    'BRIGHT VINTAGE COMPUTING & MATHEMATICS DAYLIGHT STYLE: A sunlit 1940s computing laboratory on a bright sunny day in natural daylight. '
    'In the center foreground, on a clean wooden console desk: stacks of vintage cardboard punch cards with precision rectangular holes, flexible patch cables with brass connectors plugged into switchboard jacks, glowing glass vacuum tubes emitting a gentle warm amber filament glow, and handwritten mathematical logic tables. '
    'In the background, tall ENIAC computer metal relay cabinets with dials, switches, and patchboards illuminated by sunbeams through high warehouse windows. '
    'Palette: vacuum tube warm amber, punch card cream, patch cable crimson and cobalt, and laboratory steel grey. '
    'Computer science history, ENIAC, programming, mathematics, bright, educational, classic, completely daylight. '
    'STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. '
    'NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. '
    'Aspect ratio 2:3 vertical book jacket.'
)

if __name__ == '__main__':
    res = create_and_produce_cover(1027, brief, "Women Programmers of ENIAC")
    print("SUCCESS:", res)
