import sys
sys.path.append('tools')
from canva_pipeline import create_and_produce_cover

brief = (
    'Book cover design titled "How Plates Affect Our Planet: Hot Spots". The title "Plates on the Move: Hot Spots" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. MANTLE PLUMES & VOLCANIC ISLAND CHAIN DAYLIGHT STYLE: A magnificent 3D oceanographic cutaway block diagram of a stationary mantle plume in bright tropical daylight. A deep thermal magma plume rising through the Earth\'s mantle, creating an active volcanic island over the hot spot. The moving oceanic tectonic plate carrying older, extinct volcanic islands away to the northwest, showing their transition from active shield volcanoes (Hawaii) to eroded atolls and sunken guyot seamounts. Clear ocean waters, volcanic steam, and plate velocity motion arrows. Palette: mantle plume glowing orange-red, Pacific ocean sapphire and turquoise, volcanic basalt, and tropical sky blue. Mantle plumes, hot spot volcanism, plate tectonics, island chain formation, geophysics, grand and educational. STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. Aspect ratio 2:3 vertical book jacket.'
)

if __name__ == '__main__':
    res = create_and_produce_cover(1758, brief, 'Plates Hot Spots mantle plumes Hawaiian island chain seamounts')
    print("SUCCESS:", res)
