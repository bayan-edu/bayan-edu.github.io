import sys
sys.path.append('tools')
from canva_pipeline import create_and_produce_cover

brief = (
    'Book cover design titled "Broken Hearts". The title "Broken Hearts" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. CARDIOVASCULAR MEDICINE INNOVATION STYLE: A luminous, high-precision medical technology illustration of heart healing. A 3D anatomical model of the human heart showing coronary arteries, with a tiny, gleaming nitinol cardiac stent expanding to restore blood flow, beside a digital pulse wave rhythm monitor showing a healthy steady rhythm, and an ECG readout on medical graph paper. Palette: heart muscle healthy coral-red and crimson, stent polished silver, ECG waveform radiant neon green, and background medical white. Cardiovascular science, medical devices, cardiac surgery, health education, clear and educational. STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. Aspect ratio 2:3 vertical book jacket.'
)

if __name__ == '__main__':
    res = create_and_produce_cover(2559, brief, 'Broken Hearts cardiology heart anatomy repair stent bypass catheter')
    print("SUCCESS:", res)
