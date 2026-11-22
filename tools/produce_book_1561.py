import sys
sys.path.append('tools')
from canva_pipeline import create_and_produce_cover

brief = (
    'Book cover design titled "The Origins of the Internet". The title "The Origins of the Internet" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. RETRO COMPUTING & NETWORK ARCHITECTURE DAYLIGHT STYLE: A brightly lit, clean 1970s computer research lab with large windows in morning light. In the center foreground, an early ARPANET Interface Message Processor (IMP) cabinet with toggle switches, tape drives, and glowing green phosphor terminal screens displaying node network packets. On a clean desk: printed network routing topology maps connecting nodes across the nation, spools of perforated paper punch tape, and coaxial cable connectors. Palette: retro terminal green, electric cyan, warm computer beige, copper orange, and bright studio white. Computer history, packet switching, telecommunications, networking pioneers, educational technology. STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. Aspect ratio 2:3 vertical book jacket.'
)

if __name__ == '__main__':
    res = create_and_produce_cover(1561, brief, 'The Origins of the Internet ARPANET computer history')
    print("SUCCESS:", res)
