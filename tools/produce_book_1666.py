import sys
sys.path.append('tools')
from canva_pipeline import create_and_produce_cover

brief = (
    'Book cover design titled "What\'s This? Seeing with Sound". The title "Seeing with Sound" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. BIOACOUSTICS & ECHOLOCATION DUAL NATURE STYLE: A sunlit, fascinating split educational scene showing bioacoustic navigation in nature. On one side, a bottlenose dolphin swimming in a sunlit turquoise ocean lagoon, emitting concentric ultrasonic click pulses that bounce off a school of fish. On the other side, an insect-eating bat flying near a leafy forest canopy at dawn, emitting high-frequency sonar waves to pinpoint a flying moth. Clean graphic wave vectors showing outgoing acoustic pulses and reflected echoes in bright educational colors. Palette: dolphin ocean turquoise, echolocation wave electric cyan, forest dawn amber, and sunny sky blue. Echolocation, bioacoustics, sound wave physics, animal sensory systems, dynamic and educational. STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. Aspect ratio 2:3 vertical book jacket.'
)

if __name__ == '__main__':
    res = create_and_produce_cover(1666, brief, 'Seeing with Sound echolocation bioacoustics bats dolphins')
    print("SUCCESS:", res)
