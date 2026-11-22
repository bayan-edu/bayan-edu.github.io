import sys
sys.path.append('tools')
from canva_pipeline import create_and_produce_cover

brief = (
    'Book cover design titled "Experimenting with Magnets". The title "Experimenting with Magnets" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. MAGNETIC PHYSICS LAB DAYLIGHT STYLE: A sunlit classroom physics workbench in full daylight. A classic red-and-blue horseshoe magnet with silver poles and a pair of shiny neodymium bar magnets resting on white paper, with fine iron filings aligning into stunning, elegant dipole magnetic field arches and flux loops between the North and South poles, along with a brass pocket compass needle pointing true North. Palette: horseshoe magnet bold crimson red and cobalt blue, iron filing lines crisp black, and lab table clean white with golden sunlight. Electromagnetism, magnetic field theory, physics experimentation, hands-on and educational. STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. Aspect ratio 2:3 vertical book jacket.'
)

if __name__ == '__main__':
    res = create_and_produce_cover(2337, brief, 'Experimenting with Magnets neodymium magnetic field iron filings poles')
    print("SUCCESS:", res)
