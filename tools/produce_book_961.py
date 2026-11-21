import sys
sys.path.append('tools')
from canva_pipeline import create_and_produce_cover

brief = (
    'Book cover design titled "Sara Seager: Planet Discoverer". '
    'The title "Sara Seager: Planet Discoverer" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. '
    'BRIGHT EXOPLANET ASTROPHYSICS & SPACE SCIENCE STYLE: A luminous, awe-inspiring space view capturing the discovery of distant exoplanets. '
    'In the center, a bright sun-like star shines with radiant golden rays, with a futuristic flower-shaped Starshade spacecraft blocking star glare to reveal a beautiful glowing Earth-like exoplanet with blue oceans and white clouds. '
    'In the orbital foreground, an advanced space telescope with hexagonal golden mirrors conducts spectral atmospheric analysis. '
    'Palette: exoplanet sapphire blue, starflare brilliant gold, telescope gold mirror, and deep cosmic navy. '
    'Astrophysics, exoplanet discovery, bright, educational, vivid. '
    'STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. '
    'NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. '
    'Aspect ratio 2:3 vertical book jacket.'
)

if __name__ == '__main__':
    res = create_and_produce_cover(961, brief, "Sara Seager: Planet Discoverer")
    print("SUCCESS:", res)
