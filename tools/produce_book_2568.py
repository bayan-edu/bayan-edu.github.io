import sys
sys.path.append('tools')
from canva_pipeline import create_and_produce_cover

brief = (
    'Book cover design titled "The Wonders of Flight". The title "The Wonders of Flight" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. BIOLOGICAL FLIGHT BIOMIMICRY STYLE: A sun-drenched tribute to flight in nature in full daylight. A ruby-throated hummingbird hovering with blurred figure-eight wingbeats beside a red hibiscus flower, alongside a glittering four-winged dragonfly and a soaring peregrine falcon, showing the marvels of natural aerodynamics and wing structure under sunny skies. Palette: hummingbird iridescent emerald and ruby, hibiscus vivid scarlet, dragonfly shimmering sapphire, and sky bright blue. Bio-aerodynamics, wing evolution, animal flight adaptations, miraculous and educational. STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. Aspect ratio 2:3 vertical book jacket.'
)

if __name__ == '__main__':
    res = create_and_produce_cover(2568, brief, 'Wonders of Flight bird wing hummingbird dragonflies aerodynamic biomimicry')
    print("SUCCESS:", res)
