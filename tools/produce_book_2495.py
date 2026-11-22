import sys
sys.path.append('tools')
from canva_pipeline import create_and_produce_cover

brief = (
    'Book cover design titled "Don\'t throw away, repair!". The title "Don\'t throw away, repair!" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. RIGHT TO REPAIR MAKER WORKBENCH DAYLIGHT STYLE: A sunlit maker workshop and electronics repair bench in daytime. A wooden workbench organized with precision screwdrivers, a soldering iron, a digital multimeter testing circuits, an opened vintage wooden radio being carefully restored with fresh copper wires, and neat jars of screws, washers, and wooden glue under sunny window light. Palette: workbench warm wood amber, repair tools chrome and safety yellow, electronic circuit green, and sunlight bright white. Right to repair, sustainable craftsmanship, electronics troubleshooting, circular economy, practical and educational. STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. Aspect ratio 2:3 vertical book jacket.'
)

if __name__ == '__main__':
    res = create_and_produce_cover(2495, brief, 'Dont throw away repair right to repair workbench tools soldering vintage')
    print("SUCCESS:", res)
