import sys
sys.path.append('tools')
from canva_pipeline import create_and_produce_cover

brief = (
    'Book cover design titled "Journey To A New Planet!". The title "Journey To A New Planet!" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. BRIGHT EXOPLANET EXPLORATION DAYLIGHT STYLE: An awe-inspiring space exploration scene filled with cosmic wonder and discovery. In the center foreground, an advanced exploratory interstellar spacecraft with gleaming solar wings and sensor arrays approaching a newly discovered Earth-like exoplanet with vivid sapphire oceans, swirling cloud systems, and lush green continents. Distant twin stars illuminate the planet in warm golden light, with clean holographic star-navigation coordinate rings floating in space. Palette: exoplanet sapphire blue and emerald green, spacecraft polished silver and white, solar wing gold, and space deep violet. Space exploration, exoplanets, astronomy, futuristic discovery, bright, inspiring, educational. STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. Aspect ratio 2:3 vertical book jacket.'
)

if __name__ == '__main__':
    res = create_and_produce_cover(1259, brief, 'Journey To A New Planet!')
    print("SUCCESS:", res)
