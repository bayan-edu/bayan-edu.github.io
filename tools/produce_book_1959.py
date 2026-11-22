import sys
sys.path.append('tools')
from canva_pipeline import create_and_produce_cover

brief = (
    'Book cover design titled "The Nervous System". The title "The Nervous System" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. NEUROBIOLOGY ANATOMICAL SCIENCE STYLE: A luminous, high-precision educational illustration of the nervous system. In the center, an intricately branching network of glowing neurons, dendrites, and axon pathways firing luminous electrochemical impulses across synaptic gaps. Clean anatomical silhouette of the brain and spinal column coordinating motor and sensory signals. Palette: neural signals electric cyan and golden amber, axons deep cobalt blue, and background crisp educational navy. Human anatomy, neurobiology, brain science, electrical impulse transmission, brilliant and educational. STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. Aspect ratio 2:3 vertical book jacket.'
)

if __name__ == '__main__':
    res = create_and_produce_cover(1959, brief, 'The Nervous System neurobiology neurons synapses human biology')
    print("SUCCESS:", res)
