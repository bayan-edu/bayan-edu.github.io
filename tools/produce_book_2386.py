import sys
sys.path.append('tools')
from canva_pipeline import create_and_produce_cover

brief = (
    'Book cover design titled "Making Rocks". The title "Making Rocks" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. GEOLOGY ROCK CYCLE DAYLIGHT STYLE: An educational, dramatic cross-section of the Earth\'s crust showing rock transformation. In the center, a glowing volcanic magma chamber cooling into speckled igneous granite, transitioning into sedimentary layers of sandstone and limestone formed by river erosion, and deeply buried metamorphic banded marble transformed by heat and pressure, with geological mineral crystal specimens displayed in the foreground. Palette: magma fiery molten orange, granite speckled grey and white, sedimentary strata warm terracotta, and sky azure. Geology, rock cycle, Earth science, mineralogy, fascinating and educational. STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. Aspect ratio 2:3 vertical book jacket.'
)

if __name__ == '__main__':
    res = create_and_produce_cover(2386, brief, 'Making Rocks rock cycle igneous sedimentary metamorphic geology volcano')
    print("SUCCESS:", res)
