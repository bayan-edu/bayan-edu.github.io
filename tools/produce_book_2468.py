import sys
sys.path.append('tools')
from canva_pipeline import create_and_produce_cover

brief = (
    'Book cover design titled "Lake of Fire". The title "Lake of Fire" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. VOLCANIC LAVA LAKE GEOLOGY STYLE: A breathtaking daytime view into a massive volcanic caldera (like Kilauea or Nyiragongo). A dynamic, churning lake of molten orange-red basaltic lava covered by geometric plates of dark cooling crust that crack and pull apart, with glowing fountaining lava spatter bursting upward, framed by steep vertical caldera rock walls under a dramatic sky with volcanic steam plumes. Palette: molten lava radiant fiery orange and yellow, basalt crust volcanic black, and steam plumes warm golden-grey. Volcanology, geothermal energy, magma physics, geological forces, magnificent and educational. STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. Aspect ratio 2:3 vertical book jacket.'
)

if __name__ == '__main__':
    res = create_and_produce_cover(2468, brief, 'Lake of Fire lava lake Kilauea volcanology basalt crust magma geology')
    print("SUCCESS:", res)
