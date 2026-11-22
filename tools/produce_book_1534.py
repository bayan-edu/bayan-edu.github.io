import sys
sys.path.append('tools')
from canva_pipeline import create_and_produce_cover

brief = (
    'Book cover design titled "The Influence of the Arch". The title "The Influence of the Arch" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. BRIGHT ROMAN ARCHITECTURAL ENGINEERING DAYLIGHT STYLE: A sunlit, magnificent Roman engineering aqueduct and bridge spanning a green river valley in bright natural daylight. In the center foreground, towering classical stone arches standing proud under a clear blue sky, with a clean architectural cutaway diagram highlighting the wedge-shaped voussoirs and central locking keystone transferring compressive weight forces smoothly to the piers. Below, a sparkling blue river flows peacefully between grassy riverbanks and Roman paved stone roads. Palette: stone masonry warm travertine cream and honey, river sparkling aqua, valley emerald green, and sky sunny cyan. Architectural history, Roman engineering, structural physics of arches, masonry construction, majestic, bright, educational. STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. Aspect ratio 2:3 vertical book jacket.'
)

if __name__ == '__main__':
    res = create_and_produce_cover(1534, brief, 'The Influence of the Arch')
    print("SUCCESS:", res)
