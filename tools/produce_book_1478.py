import sys
sys.path.append('tools')
from canva_pipeline import create_and_produce_cover

brief = (
    'Book cover design titled "The Brain\'s Stress Response: Fight, Flight, or Freeze". The title "The Brain\'s Stress Response: Fight, Flight, or Freeze" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. BRIGHT NEUROBIOLOGY OF STRESS & AUTONOMIC RESPONSE DAYLIGHT STYLE: A sunlit human physiology classroom in bright natural daylight. In the center foreground, an intricate anatomical model of the human brain highlighting the amygdala, hypothalamus, and prefrontal cortex with gentle glowing light. Surrounding the model, clean educational graphics trace the autonomic nervous system pathways, adrenaline release, heart rate spikes, and pupil dilation reflex. Beside the model on a clean oak desk rest a chrome reflex hammer, a stopwatch, and an open neurology text. Palette: brain anatomical coral and lilac, neural pathway amber-gold, desk warm oak, and classroom daylight white. Neurobiology, autonomic nervous system, fight or flight, stress response, endocrinology, bright, educational, completely daylight. STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. Aspect ratio 2:3 vertical book jacket.'
)

if __name__ == '__main__':
    res = create_and_produce_cover(1478, brief, 'The Brains Stress Response Fight Flight or Freeze')
    print("SUCCESS:", res)
