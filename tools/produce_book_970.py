import sys
sys.path.append('tools')
from canva_pipeline import create_and_produce_cover

brief = (
    'Book cover design titled "Why Does the Sun Burn Us?". '
    'The title "Why Does the Sun Burn Us?" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. '
    'BRIGHT PHOTOBIOLOGY & SOLAR SCIENCE DAYLIGHT STYLE: A sun-drenched, radiant coastal boardwalk on a glorious sunny morning with bright daylight pouring over turquoise ocean waves. '
    'In the center foreground, a modern mineral sunscreen bottle with an SPF 50 shield icon, classic UV-filtering sunglasses reflecting golden sunbeams, and a woven straw sun hat resting on a clean wooden rail. '
    'Beside them, a compact digital UV-index meter with a clear readout and a small glass optical prism splitting sunlight into a soft spectrum. '
    'In the background, sparkling turquoise waves lap onto fine golden sand under a spotless azure sky. '
    'Palette: ocean turquoise, beach sand gold, straw amber, sunscreen pure white, and azure sky blue. '
    'Photobiology, health science, bright, educational, vivid, completely daylight. '
    'STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. '
    'NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. '
    'Aspect ratio 2:3 vertical book jacket.'
)

if __name__ == '__main__':
    res = create_and_produce_cover(970, brief, "Why Does the Sun Burn Us?")
    print("SUCCESS:", res)
