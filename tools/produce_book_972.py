import sys
sys.path.append('tools')
from canva_pipeline import create_and_produce_cover

brief = (
    'Book cover design titled "First Public Demonstration of Edison\'s Light Bulb". '
    'The title "First Public Demonstration of Edison\'s Light Bulb" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. '
    'BRIGHT HISTORICAL INVENTOR LABORATORY & ELECTRICITY DAYLIGHT STYLE: A sunlit, historic 19th-century inventor\'s workshop on a crisp morning with daylight pouring through tall window panes. '
    'In the center foreground, a classic early hand-blown glass incandescent light bulb with a glowing golden carbon filament loop on an antique brass base. '
    'Surrounding the bulb on a rich mahogany workbench are spools of copper wire, an early brass voltmeter, and an open notebook with authentic electrical patent sketches. '
    'In the background, a vintage polished brass-and-iron electrical dynamo generator catches warm morning sunbeams. '
    'Palette: glowing filament amber, polished brass gold, mahogany timber tan, and bright daylight ivory. '
    'Historical technology, electrical science, bright, educational, completely daylight. '
    'STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. '
    'NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. '
    'Aspect ratio 2:3 vertical book jacket.'
)

if __name__ == '__main__':
    res = create_and_produce_cover(972, brief, "First Public Demonstration of Edison's Light Bulb")
    print("SUCCESS:", res)
