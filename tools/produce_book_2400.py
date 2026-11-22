import sys
sys.path.append('tools')
from canva_pipeline import create_and_produce_cover

brief = (
    'Book cover design titled "Through the Nose". The title "Through the Nose" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. HUMAN RESPIRATORY AND OLFACTORY ANATOMY STYLE: A luminous, high-precision educational illustration of the human nasal passage and olfactory system. A clean sagittal cutaway model showing inhaled air passing over nasal turbinates warming and filtering air, with microscopic olfactory receptor neurons detecting delicate botanical scent molecules and sending neural signals to the olfactory bulb. Palette: anatomical structures soft rose and coral, airflow streams radiant cyan, olfactory signals golden amber, and background clean medical white. Human anatomy, respiration, sensory biology, olfaction, clear and educational. STRICT VISUAL CONSTRAINT: ABSOLUTELY NO LIVING HUMAN FACES OR PEOPLE (only the clean anatomical cross-section model). NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. Aspect ratio 2:3 vertical book jacket.'
)

if __name__ == '__main__':
    res = create_and_produce_cover(2400, brief, 'Through the Nose olfactory anatomy nasal cavity cilia respiration')
    print("SUCCESS:", res)
