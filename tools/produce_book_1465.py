import sys
sys.path.append('tools')
from canva_pipeline import create_and_produce_cover

brief = (
    'Book cover design titled "Perfect Fit". The title "Perfect Fit" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. BRIGHT TRANSPLANT IMMUNOLOGY SCIENCE DAYLIGHT STYLE: A sunlit medical research laboratory in bright natural daylight. In the center foreground, an elegant 3D anatomical model of a healthy human liver with detailed vascular architecture, resting beside an intricate, colorful 3D molecular model of compatible blood type antigens and immune cell receptors. On a clean wooden research desk rest a chrome stethoscope, a medical microscope, and an open volume of medical immunology. Palette: anatomical liver warm terra-cotta, immune molecules coral and mint, stethoscope chrome, and daylight bright ivory. Organ transplantation, immunology, medical breakthroughs, cell biology, hopeful, bright, educational, completely daylight. STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. Aspect ratio 2:3 vertical book jacket.'
)

if __name__ == '__main__':
    res = create_and_produce_cover(1465, brief, 'Perfect Fit')
    print("SUCCESS:", res)
