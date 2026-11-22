import sys
sys.path.append('tools')
from canva_pipeline import create_and_produce_cover

brief = (
    'Book cover design titled "Types of Precipitation". The title "Types of Precipitation" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. PRECIPITATION FORMS & ATMOSPHERIC TEMPERATURE PROFILES STYLE: A bright, sunlit educational scene celebrating the varied forms of precipitation in nature. In the center foreground, four distinct precipitation types displayed in high-detail macro clarity: crystal-clear spherical Rain droplets on a green leaf; a delicate, symmetrical six-sided Snow crystal (dendrite flake); translucent Ice Pellets (sleet); and layered concentric Hailstones cut open to reveal onion-like ice growth rings. An atmospheric vertical temperature diagram showing freezing levels (0°C isotherm) in clean graphics. Palette: ice crystal cyan, raindrop aquamarine, leaf emerald green, and cloud billow white. Meteorology, cloud physics, precipitation types, rain, snow, sleet, hail, clear and educational. STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. Aspect ratio 2:3 vertical book jacket.'
)

if __name__ == '__main__':
    res = create_and_produce_cover(1822, brief, 'Types of Precipitation rain snow sleet hail meteorology')
    print("SUCCESS:", res)
