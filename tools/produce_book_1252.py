import sys
sys.path.append('tools')
from canva_pipeline import create_and_produce_cover

brief = (
    'Book cover design titled "Journey to Earth". The title "Journey to Earth" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. BRIGHT PLANETARY SCIENCE DAYLIGHT STYLE: An awe-inspiring view from the observation deck of an exploratory research spacecraft approaching planet Earth bathed in brilliant sunshine. In the center through the panoramic reinforced glass portal, the radiant blue-and-white marble of Earth glows with swirling white cloud formations over deep blue oceans and green-brown continents. On the spacecraft console below the portal, clean glowing holographic telemetry screens display planetary atmospheric data and orbital trajectories. Palette: Earth deep ocean blue and atmospheric cyan, cloud bright white, spacecraft metallic silver and teal telemetry glow, and brilliant solar flare gold. Planetary science, astronomy, space exploration, Earth systems, bright, inspiring, educational, daylight. STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. Aspect ratio 2:3 vertical book jacket.'
)

if __name__ == '__main__':
    res = create_and_produce_cover(1252, brief, 'Journey to Earth')
    print("SUCCESS:", res)
