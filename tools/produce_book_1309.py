import sys
sys.path.append('tools')
from canva_pipeline import create_and_produce_cover

brief = (
    'Book cover design titled "How Do Our Brains Process Pain?". The title "How Do Our Brains Process Pain?" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. BRIGHT NEUROSCIENCE & SENSORY BIOLOGY DAYLIGHT STYLE: A sunlit human physiology classroom in bright natural daylight. In the center foreground, an intricate, high-precision anatomical model of the human brain with color-coded neural regions (highlighting the sensory cortex and thalamus). Gently glowing amber and cyan neural pathway lines trace from a model sensory nerve ending on a fingertip up to the brain. Beside the model, a fresh plate of warm homemade cookies with a fabric oven mitt resting on a clean wooden table. Palette: brain anatomical coral and lilac, neural pathway amber-gold, oven mitt red, and room daylight ivory. Neurobiology, sensory perception, nervous system, pain reception, bright, friendly, educational, completely daylight. STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. Aspect ratio 2:3 vertical book jacket.'
)

if __name__ == '__main__':
    res = create_and_produce_cover(1309, brief, 'How Do Our Brains Process Pain')
    print("SUCCESS:", res)
