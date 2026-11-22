import sys
sys.path.append('tools')
from canva_pipeline import create_and_produce_cover

brief = (
    'Book cover design titled "What Is a Volcano?". The title "What Is a Volcano?" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. GEOLOGICAL VOLCANOLOGY CUTAWAY DAYLIGHT STYLE: A magnificent 3D cutaway block diagram of an active stratovolcano in bright sunny daylight. Clearly displaying internal geological anatomy: deep subterranean magma chamber, central conduit chimney vent, side vents, alternating strata of hardened basaltic lava and tephra ash layers. The summit caldera crater emitting billowing white geothermal steam and volcanic gas into a bright azure sky. A seismometer monitoring station and geological rock hammer on the green lower slopes. Palette: molten magma glowing orange-red, volcanic basalt dark grey, sulfur yellow, hillside green, and azure sky blue. Volcanology, plate tectonics, internal Earth structure, geological hazards, clear, majestic, and educational. STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. Aspect ratio 2:3 vertical book jacket.'
)

if __name__ == '__main__':
    res = create_and_produce_cover(1709, brief, 'What Is a Volcano volcanology magma chamber crater eruption')
    print("SUCCESS:", res)
