import sys
sys.path.append('tools')
from canva_pipeline import create_and_produce_cover

brief = (
    'Book cover design titled "The Transfer of Heat Energy". The title "The Transfer of Heat Energy" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. BRIGHT THERMODYNAMICS & HEAT TRANSFER DAYLIGHT STYLE: A sunlit physics laboratory bench in bright natural daylight. In the center foreground, a vivid demonstration of the three modes of heat transfer: a solar radiometer with spinning black-and-white vanes demonstrating radiation from sunbeams; a clear glass beaker with circulating red and blue convection fluid currents demonstrating convection; and a polished copper rod conducting heat to release melting wax droplets demonstrating conduction. Palette: radiometer glass crystal and obsidian black, convection currents ruby red and cobalt blue, copper rod orange, and lab daylight white. Thermal physics, heat transfer, conduction convection radiation, thermodynamics, bright, educational, completely daylight. STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. Aspect ratio 2:3 vertical book jacket.'
)

if __name__ == '__main__':
    res = create_and_produce_cover(1331, brief, 'The Transfer of Heat Energy')
    print("SUCCESS:", res)
