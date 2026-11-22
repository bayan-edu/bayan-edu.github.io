import sys
sys.path.append('tools')
from canva_pipeline import create_and_produce_cover

brief = (
    'Book cover design titled "The Fight Against Polio". The title "The Fight Against Polio" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. BRIGHT MEDICAL VIROLOGY & VACCINE TRIUMPH DAYLIGHT STYLE: A sunlit 1950s medical research laboratory in bright natural daylight. In the center foreground, an antique brass monocular microscope, clear glass vaccine ampoules and serum vials labeled "Polio Vaccine", a glass syringe, and sterile petri dishes on a clean white laboratory table. Beside the equipment, an open medical journal displays Jonas Salk\'s vaccine research notes and a rising immunization curve chart, illuminated by sunbeams streaming through arched laboratory windows. Palette: vaccine vials crystal clear and amber, microscope polished brass, lab table clean white, and daylight warm ivory. History of medicine, polio eradication, Jonas Salk vaccine, virology, public health triumph, dignified, bright, educational. STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. Aspect ratio 2:3 vertical book jacket.'
)

if __name__ == '__main__':
    res = create_and_produce_cover(1483, brief, 'The Fight Against Polio')
    print("SUCCESS:", res)
