import sys
sys.path.append('tools')
from canva_pipeline import create_and_produce_cover

brief = (
    'Book cover design titled "Earth\'s Dynamic Machine: Basics of Plate Tectonics". The title "Earth\'s Dynamic Machine" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. PLATE TECTONICS AND MANTLE CONVECTION STYLE: A dramatic educational 3D cutaway of the Earth\'s geosphere in bright clarity. Illustrating oceanic and continental tectonic plates sliding over the asthenosphere, with glowing thermal convection currents in the red-hot mantle, a mid-ocean spreading ridge erupting pillow basalt lava, and a deep-sea trench subduction zone uplifting jagged mountain volcanoes. Palette: tectonic plates granite grey and oceanic blue, mantle convection fiery orange and crimson, and oceans deep sapphire. Plate tectonics, geophysics, structural geology, Earth dynamics, powerful and educational. STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. Aspect ratio 2:3 vertical book jacket.'
)

if __name__ == '__main__':
    res = create_and_produce_cover(2467, brief, 'Basics Plate Tectonics mantle convection subduction fault lines geology')
    print("SUCCESS:", res)
