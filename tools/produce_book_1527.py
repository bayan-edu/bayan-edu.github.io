import sys
sys.path.append('tools')
from canva_pipeline import create_and_produce_cover

brief = (
    'Book cover design titled "Plate Tectonics". The title "Plate Tectonics" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. BRIGHT GEOLOGICAL PLATE BOUNDARIES & MANTLE CONVECTION STYLE: An awe-inspiring, sun-illuminated 3D geological cutaway of planet Earth in bright daylight. In the center foreground, Earth\'s lithospheric plates shown in vivid detail: divergent mid-ocean ridges venting mineral plumes, convergent subduction zones with oceanic crust sinking into the glowing orange mantle, and transform fault lines splitting continental bedrock. Clean directional arrows show the slow convection currents of semi-molten magma driving continental drift beneath blue oceans and green landmasses. Palette: mantle magma radiant orange, oceans sapphire blue, continents emerald, and tectonic boundaries glowing gold. Plate tectonics, geology, mantle convection, continental drift, Earth science, majestic, bright, educational, completely daylight. STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. Aspect ratio 2:3 vertical book jacket.'
)

if __name__ == '__main__':
    res = create_and_produce_cover(1527, brief, 'Plate Tectonics')
    print("SUCCESS:", res)
