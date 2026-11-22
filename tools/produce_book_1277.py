import sys
sys.path.append('tools')
from canva_pipeline import create_and_produce_cover

brief = (
    'Book cover design titled "If Rocks Could Talk! Deformed Conglomerate". The title "If Rocks Could Talk! Deformed Conglomerate" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. BRIGHT METAMORPHIC GEOLOGY DAYLIGHT STYLE: A sunlit geology laboratory table in bright natural daylight. In the center foreground, a polished geological specimen of deformed conglomerate rock, clearly showing pebbles and cobbles stretched and flattened into colorful ribbons by intense tectonic heat and pressure. Beside it are comparison specimens of sedimentary sandstone and igneous basalt, a brass geological pocket transit compass, a streak plate, and an illustrated chart of the rock cycle. Palette: conglomerate pebble multicolor (quartz white, jasper red, basalt dark gray), laboratory table warm oak, and chart clear primary colors. Geology, metamorphic rocks, rock cycle, plate tectonics, Earth science, bright, educational, completely daylight. STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. Aspect ratio 2:3 vertical book jacket.'
)

if __name__ == '__main__':
    res = create_and_produce_cover(1277, brief, 'If Rocks Could Talk! Deformed Conglomerate')
    print("SUCCESS:", res)
