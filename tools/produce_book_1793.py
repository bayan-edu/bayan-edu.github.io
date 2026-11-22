import sys
sys.path.append('tools')
from canva_pipeline import create_and_produce_cover

brief = (
    'Book cover design titled "Panthers in Peril". The title "Panthers in Peril" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. SUBTROPICAL WILDLIFE CONSERVATION FLORIDA STYLE: A sun-dappled, atmospheric southern cypress and pine flatwoods hammock in morning golden light. In the center foreground, an elusive, magnificent Florida panther with tawny golden coat and alert amber eyes walking gracefully along a fallen mossy oak trunk. Saw palmetto fronds, hanging Spanish moss, and a designated wildlife crossing underpass sign visible in the background. Sunbeams filtering through the cypress canopy in radiant golden rays. Palette: panther tawny gold and cream, cypress moss emerald green, bark deep brown, and sunbeam amber gold. Wildlife conservation, endangered predators, Florida ecology, big cat biology, breathtaking and educational. STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. Aspect ratio 2:3 vertical book jacket.'
)

if __name__ == '__main__':
    res = create_and_produce_cover(1793, brief, 'Panthers in Peril Florida panther conservation subtropical wildlife')
    print("SUCCESS:", res)
