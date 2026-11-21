import sys
sys.path.append('tools')
from canva_pipeline import create_and_produce_cover

brief = (
    'Book cover design titled "Electricity & Energy: Circuits". '
    'The title "Electricity & Energy: Circuits" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. '
    'BRIGHT ELECTRICAL SCIENCE & CIRCUITS DAYLIGHT STYLE: A sun-drenched, radiant engineering workbench on a bright morning with natural light pouring through modern windows. '
    'In the center foreground, an educational electrical breadboard circuit with neat colorful jumper wires, a glowing green and amber LED indicator, a classic open copper knife switch, and a battery cell. '
    'Beside the circuit on a clean wooden desk rest a digital multimeter with test leads, a spool of gleaming copper wire, and an open notebook with clear schematic diagrams. '
    'Palette: copper wire metallic amber, circuit board emerald green, jumper wire cobalt and yellow, and warm workbench tan. '
    'Electrical engineering, physics, bright, educational, vivid, completely daylight. '
    'STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. '
    'NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. '
    'Aspect ratio 2:3 vertical book jacket.'
)

if __name__ == '__main__':
    res = create_and_produce_cover(952, brief, "Electricity & Energy: Circuits")
    print("SUCCESS:", res)
