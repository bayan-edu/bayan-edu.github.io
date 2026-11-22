import sys
sys.path.append('tools')
from canva_pipeline import create_and_produce_cover

brief = (
    'Book cover design titled "Heavy Metal". '
    'The title "Heavy Metal" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. '
    'BRIGHT MODERN ELECTRONICS RECYCLING & TECHNOLOGY DAYLIGHT STYLE: A sunlit, clean high-tech sustainability and electronics recycling laboratory under natural daylight. '
    'In the center foreground, on a clean workbench: an intricate vintage printed circuit board (PCB) with gold-plated conductive traces, microchips, copper coils, and discarded electronic cathode components being safely sorted for metal recovery. '
    'Beside it, small labeled glass jars containing recycled copper granules and gold flakes gleam in the sunlight, with a modern digital multimeter. '
    'Palette: circuit board emerald green, copper metallic orange, gold luster, and clean lab silver. '
    'Electronics recycling, environmental technology, heavy metals, bright, educational, vivid, completely daylight. '
    'STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. '
    'NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. '
    'Aspect ratio 2:3 vertical book jacket.'
)

if __name__ == '__main__':
    res = create_and_produce_cover(1007, brief, "Heavy Metal")
    print("SUCCESS:", res)
