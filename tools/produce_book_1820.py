import sys
sys.path.append('tools')
from canva_pipeline import create_and_produce_cover

brief = (
    'Book cover design titled "Security Buzz". The title "Security Buzz" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. INSECT OLFACTORY BIOSENSING & BIOMIMICRY STYLE: A sunlit, high-tech biomimicry and sensory research laboratory in natural daylight. In the center foreground, a fuzzy, golden honeybee actively extending its proboscis (conditioned olfactory response) toward a micro-airflow scent nozzle. Beside it, advanced electronic "electronic nose" biosensors and microfluidic chemical vapor detection chips that mimic insect antennae. Visual vector scent molecule pathways and digital signal readout waveforms on a clean acrylic workbench in bright sunlight. Palette: honeybee fuzzy gold and black, electric sensor cyan, optic glass white, and warm wooden bench honey. Biosensing, honeybee olfaction, biomimicry, vapor detection, behavioral science, innovative and educational. STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. Aspect ratio 2:3 vertical book jacket.'
)

if __name__ == '__main__':
    res = create_and_produce_cover(1820, brief, 'Security Buzz honeybee olfactory detection biosensors biomimicry')
    print("SUCCESS:", res)
