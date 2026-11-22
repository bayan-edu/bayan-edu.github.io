import sys
sys.path.append('tools')
from canva_pipeline import create_and_produce_cover

brief = (
    'Book cover design titled "Space Rules". The title "Space Rules" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. BRIGHT COSMIC EXPLORATION DAYLIGHT STYLE: A brilliant, vivid space voyage scene filled with cosmic wonder and luminous celestial bodies. In the center foreground, a sleek automated scientific space probe with solar panels outstretched and a gleaming parabolic dish antenna navigating past a majestic swirling ringed gas giant planet. In the background, a radiant golden sun casts dramatic sunbeams through a colorful cosmic nebula of violet and turquoise gas clouds, with distant twinkling stars and clean geometric planetary orbits. Palette: cosmic violet, nebular turquoise, solar flare gold, space probe titanium white, and ringed planet amber. Astronomy, space exploration, solar system science, cosmic wonder, bright, inspiring, educational. STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. Aspect ratio 2:3 vertical book jacket.'
)

if __name__ == '__main__':
    res = create_and_produce_cover(1244, brief, 'Space Rules')
    print("SUCCESS:", res)
