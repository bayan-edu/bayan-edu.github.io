import sys
sys.path.append('tools')
from canva_pipeline import create_and_produce_cover

brief = (
    'Book cover design titled "Types of Obscuration". The title "Types of Obscuration" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. METEOROLOGICAL ATMOSPHERIC OPTICS & VISIBILITY STYLE: A daylight comparative landscape illustrating different forms of atmospheric obscuration under clear natural light. Four quadrant comparisons: Water-based Mist (dew droplets on grass), Fog (low marine stratus enveloping coastal rocks), Lithometeor Haze (fine dry aerosol particles scattering sunlight), and Mineral Dust (suspended desert sand particles in a golden glow). An optical visibility target transmissometer sensor measuring atmospheric light extinction in clean educational graphics. Palette: mist pearl grey, fog soft white, haze pale golden, dust warm amber, and clear sky blue. Atmospheric physics, meteorological visibility, aerosols, condensation vs suspended dust, clear and educational. STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. Aspect ratio 2:3 vertical book jacket.'
)

if __name__ == '__main__':
    res = create_and_produce_cover(1821, brief, 'Types of Obscuration meteorology fog mist haze smoke dust')
    print("SUCCESS:", res)
