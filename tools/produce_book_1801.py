import sys
sys.path.append('tools')
from canva_pipeline import create_and_produce_cover

brief = (
    'Book cover design titled "The Northern Lights". The title "The Northern Lights" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. AURORA BOREALIS & MAGNETOSPHERIC PHYSICS STYLE: A spectacular Arctic landscape at twilight showcasing the glowing Northern Lights (Aurora Borealis). Shimmering, undulating curtains of vibrant neon emerald green and violet auroral light dancing across the polar sky, reflected in the calm, glassy waters of a snowy fjord. In an educational diagram inset: Earth\'s magnetic dipole field lines deflecting the solar wind and funneling charged electrons and protons into the polar ionosphere. Snow-covered spruce trees and cozy wooden cabins under the glowing sky. Palette: auroral neon emerald green, violet-magenta, snow diamond white, deep fjord navy, and starlight silver. Auroral physics, Earth\'s magnetosphere, solar-terrestrial interactions, space weather, breathtaking and educational. STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. Aspect ratio 2:3 vertical book jacket.'
)

if __name__ == '__main__':
    res = create_and_produce_cover(1801, brief, 'The Northern Lights aurora borealis magnetosphere solar wind')
    print("SUCCESS:", res)
