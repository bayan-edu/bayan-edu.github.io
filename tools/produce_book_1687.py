import sys
sys.path.append('tools')
from canva_pipeline import create_and_produce_cover

brief = (
    'Book cover design titled "How Plates Affect Our Planet: Plates on the Move". The title "Plates on the Move" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. DYNAMIC PLATE TECTONICS & GEOPHYSICS STYLE: A magnificent, 3D cutaway geological block diagram of the Earth\'s lithosphere and upper mantle. Showing a oceanic tectonic plate subducting beneath a continental plate, with a deep oceanic trench, melting magma rising to feed an active volcanic arc, and mountain building folded strata. In the background, a mid-ocean spreading ridge where fresh basaltic magma forms new oceanic crust under turquoise seas. Clean directional vector arrows showing mantle convection currents (hot rising magma, cooler sinking slabs). Palette: magma glowing orange-red, oceanic basalt deep blue, continental crust terracotta, and ocean aquamarine. Plate tectonics, continental drift, geophysics, mountain building, volcanism, grand and educational. STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. Aspect ratio 2:3 vertical book jacket.'
)

if __name__ == '__main__':
    res = create_and_produce_cover(1687, brief, 'Plates on the Move plate tectonics continental drift subduction')
    print("SUCCESS:", res)
