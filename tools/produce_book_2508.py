import sys
sys.path.append('tools')
from canva_pipeline import create_and_produce_cover

brief = (
    'Book cover design titled "The Penny Experiment". The title "The Penny Experiment" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. CHEMISTRY SURFACE OXIDATION LAB DAYLIGHT STYLE: A sunlit school chemistry workbench on a bright day. A striking comparison of copper coins: a dull, greenish oxidized tarnished penny (copper oxide) beside a gleaming, shiny polished copper penny freshly cleaned in a small beaker of salt and vinegar solution, with bubbling effervescence and chemical formula labels (Cu, CuO, NaCl, CHâ‚ƒCOOH) written neatly on a lab notebook. Palette: shiny copper gleaming warm bronze, tarnished penny patina malachite green, lab glass sparkling clear, and daylight bright white. Chemical reactions, oxidation-reduction, metallurgy, hands-on kitchen chemistry, lively and educational. STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. Aspect ratio 2:3 vertical book jacket.'
)

if __name__ == '__main__':
    res = create_and_produce_cover(2508, brief, 'The Penny Experiment copper oxidation cleaning chemistry vinegar salt')
    print("SUCCESS:", res)
