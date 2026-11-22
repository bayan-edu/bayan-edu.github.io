import sys
sys.path.append('tools')
from canva_pipeline import create_and_produce_cover

brief = (
    'Book cover design titled "You\'ve Got Nerve(s)!". '
    'The title "You\'ve Got Nerve(s)!" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. '
    'BRIGHT NEUROLOGY & HUMAN BIOLOGY DAYLIGHT STYLE: A sunlit, pristine medical anatomy laboratory on a bright sunny day under natural daylight. '
    'In the center foreground, an intricate, artistic 3D translucent anatomical model of the human nervous system with sparkling electric cobalt-blue neural pathways and golden synaptic nodes radiating along spinal nerve branches. '
    'Beside the model on a clean white desk rest a chrome medical reflex percussion hammer, a brass microscope, and an open neurological diagram showing sensory receptor pathways. '
    'In the background, sunlit laboratory windows look out onto a green garden under a clear blue sky. '
    'Palette: neural electric cobalt and cyan, synaptic gold, reflex hammer chrome, and lab ivory white. '
    'Nervous system, sensory biology, neuroscience, reflex arc, bright, educational, vivid, completely daylight. '
    'STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. '
    'NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. '
    'Aspect ratio 2:3 vertical book jacket.'
)

if __name__ == '__main__':
    res = create_and_produce_cover(1028, brief, "You've Got Nerve(s)!")
    print("SUCCESS:", res)
