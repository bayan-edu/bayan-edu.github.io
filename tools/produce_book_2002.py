import sys
sys.path.append('tools')
from canva_pipeline import create_and_produce_cover

brief = (
    'Book cover design titled "How Do Our Brains Retain and Remember Information?". The title "How Do Our Brains Retain and Remember Information?" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. COGNITIVE NEUROSCIENCE MEMORY CONSOLIDATION STYLE: A luminous, intricate scientific visualization of memory encoding. In the center, an elegant botanical-like branching network of glowing neural synapses and dendritic spines strengthening through long-term potentiation (LTP). Stylized luminous hippocampus memory architecture organizing glowing data nodes like crystal spheres of knowledge into permanent cortical storage. Palette: synaptic impulses warm golden amber, neural dendrites electric cyan, background deep navy blue. Neuroscience of memory, cognitive psychology, learning mechanisms, brilliant and educational. STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. Aspect ratio 2:3 vertical book jacket.'
)

if __name__ == '__main__':
    res = create_and_produce_cover(2002, brief, 'Brains Retain Remember Information memory neuroscience hippocampus')
    print("SUCCESS:", res)
