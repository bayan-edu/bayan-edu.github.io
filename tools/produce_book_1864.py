import sys
sys.path.append('tools')
from canva_pipeline import create_and_produce_cover

brief = (
    'Book cover design titled "When Water Moves Sediments". The title "When Water Moves Sediments" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. FLUVIAL GEOMORPHOLOGY & SEDIMENT TRANSPORT DAYLIGHT STYLE: A sunlit, comprehensive landscape illustrating water erosion, transport, and deposition in bright daylight. From alpine river rapids carving steep V-shaped canyons and transporting boulders, meandering through a wide alluvial floodplain, to a classic fan-shaped river delta depositing golden silt and sand into a clear blue sea. In the foreground, a geological stream table demonstration tray with sorting gravel, sand, and clay particles, with grain size measurement calipers. Palette: river water crystal turquoise, sediment sand golden buff, canyon terracotta, and sunny sky cyan. Fluvial geomorphology, erosion and deposition, sediment transport, delta formation, Earth science, clear and educational. STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. Aspect ratio 2:3 vertical book jacket.'
)

if __name__ == '__main__':
    res = create_and_produce_cover(1864, brief, 'When Water Moves Sediments erosion deposition fluvial delta geomorphology')
    print("SUCCESS:", res)
