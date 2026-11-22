import sys
sys.path.append('tools')
from canva_pipeline import create_and_produce_cover

brief = (
    'Book cover design titled "Telescopes". The title "Telescopes" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. OPTICAL ASTRONOMY & TELESCOPE ENGINEERING DAYLIGHT STYLE: A sunlit, high-altitude mountain astronomical observatory dome on a bright morning. In the foreground, a classic polished brass refractor telescope on a wooden tripod standing beside a modern robotic Schmidt-Cassegrain reflector telescope. An educational cutaway diagram showing optical ray tracing: convex objective lenses gathering light, and primary parabolic mirrors focusing light rays to an eyepiece. A massive observatory dome with open slit revealing clear mountain skies in the background. Palette: polished brass gold, observatory white, optical glass cyan, mahogany wood, and high-altitude azure sky. Astronomical optics, telescope history, optical engineering, lenses and mirrors, bright and inspiring. STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. Aspect ratio 2:3 vertical book jacket.'
)

if __name__ == '__main__':
    res = create_and_produce_cover(1662, brief, 'Telescopes astronomical optics refractor reflector mirrors')
    print("SUCCESS:", res)
