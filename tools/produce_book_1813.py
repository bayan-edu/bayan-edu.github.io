import sys
sys.path.append('tools')
from canva_pipeline import create_and_produce_cover

brief = (
    'Book cover design titled "How Plates Affect Our Planet: Volcanoes". The title "Plates on the Move: Volcanoes" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. PLATE BOUNDARY VOLCANOLOGY & RING OF FIRE STYLE: A sunlit 3D tectonic subduction zone cutaway in bright daylight. A dense oceanic plate subducting beneath a continental plate, releasing trapped water and volatiles to melt the mantle and generate magma. Magma diapirs rising through continental crust to fuel a chain of active stratovolcanoes venting billowing white steam columns along the coast. A regional map of the Pacific "Ring of Fire" highlighting deep ocean trenches and volcanic chains. Palette: subducting magma glowing orange-red, oceanic crust deep blue, continental crust terracotta, and clear sunny sky. Plate tectonics, subduction volcanism, Ring of Fire, volcanic arcs, geophysics, dramatic, clear, and educational. STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. Aspect ratio 2:3 vertical book jacket.'
)

if __name__ == '__main__':
    res = create_and_produce_cover(1813, brief, 'Plates Volcanoes subduction Pacific Ring of Fire volcanic arc')
    print("SUCCESS:", res)
