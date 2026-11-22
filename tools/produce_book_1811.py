import sys
sys.path.append('tools')
from canva_pipeline import create_and_produce_cover

brief = (
    'Book cover design titled "Capturing the Memories". The title "Capturing Memories" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. HISTORICAL OPTICS & PHOTOGRAPHY INVENTION DAYLIGHT STYLE: A sunlit 19th-century photographer and optics study in natural morning window light. In the center foreground, a classic vintage brass-and-polished-mahogany folding bellows view camera mounted on a wooden tripod. Beside it, a mirror daguerreotype plate, silver gelatin glass negative plates, and a brass camera obscura box showing light rays inverting a sunny garden image on ground glass. Glass photographic lenses, developing trays, and aperture diaphragm diagrams on a dark oak desk. Palette: polished mahogany wood, gleaming brass gold, daguerreotype silver, and warm morning sunlight. History of photography, optics, camera obscura, light sensitivity, photographic chemistry, scholarly and educational. STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. Aspect ratio 2:3 vertical book jacket.'
)

if __name__ == '__main__':
    res = create_and_produce_cover(1811, brief, 'Capturing the Memories history of photography camera obscura optics')
    print("SUCCESS:", res)
