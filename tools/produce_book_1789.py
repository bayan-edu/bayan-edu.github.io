import sys
sys.path.append('tools')
from canva_pipeline import create_and_produce_cover

brief = (
    'Book cover design titled "How Plates Affect Our Planet: Structure of the Earth". The title "Structure of the Earth" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. GEOPHYSICS & INTERNAL EARTH LAYERS CUTAWAY STYLE: A magnificent 3D spherical cutaway diagram of planet Earth in space illuminated by bright sunlight. Peeling back concentric geological layers in crisp detail: solid nickel-iron inner core (white-hot gold), liquid outer core (radiant orange), convective silicate mantle (deep terracotta red), and the thin brittle lithospheric crust supporting blue oceans and green continents. Depth measurement scale indicators (6,371 km to Earth\'s center) and temperature markers in clean educational graphics. Palette: inner core white-gold, outer core fiery orange, mantle terracotta, crust oceanic blue and continental green. Earth structure, geophysics, internal layers, seismology, core to crust, striking, clear, and educational. STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. Aspect ratio 2:3 vertical book jacket.'
)

if __name__ == '__main__':
    res = create_and_produce_cover(1789, brief, 'Structure of the Earth core mantle crust geophysics lithosphere')
    print("SUCCESS:", res)
