import sys
sys.path.append('tools')
from canva_pipeline import create_and_produce_cover

brief = (
    'Book cover design titled "Let\'s learn about calamities". The title "Let\'s Learn About Calamities" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. NATURAL HAZARDS AND PREPAREDNESS DAYLIGHT STYLE: An educational emergency management science workbench in daytime. An active rotating drum seismograph recording earthquake tremor waveforms, beside an emergency preparedness backpack kit with flashlight and radio, a meteorological storm tracking radar map, and an educational volcano cross-section diagram under bright room lighting. Palette: emergency gear safety red and yellow, seismograph chart white and red lines, and lab desk clean light wood. Natural disaster science, earthquake preparedness, disaster resilience, emergency readiness, empowering and educational. STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. Aspect ratio 2:3 vertical book jacket.'
)

if __name__ == '__main__':
    res = create_and_produce_cover(2633, brief, 'calamities natural disasters preparedness earthquake seismograph volcano storm')
    print("SUCCESS:", res)
