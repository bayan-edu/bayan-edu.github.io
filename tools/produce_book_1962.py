import sys
sys.path.append('tools')
from canva_pipeline import create_and_produce_cover

brief = (
    'Book cover design titled "What\'s the Sun\'s Mood Today?". The title "What\'s the Sun\'s Mood Today?" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. SOLAR ASTRONOMY SPACE WEATHER STYLE: A breathtaking, high-detail view of our Sun captured through specialized scientific solar observatory filters. Massive glowing plasma prominences and magnetic loops arching thousands of kilometers above the turbulent, granular golden photosphere. Dark sunspots revealing magnetic vortexes and energetic coronal mass ejection solar flares radiating outward into the solar system. Palette: solar plasma fiery golden-yellow, radiant orange, solar flares brilliant white, and space deep black. Solar dynamics, space weather, heliophysics, magnetic fields, awe-inspiring and educational. STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. Aspect ratio 2:3 vertical book jacket.'
)

if __name__ == '__main__':
    res = create_and_produce_cover(1962, brief, 'Whats the Suns Mood Today solar flares coronal mass ejection space weather')
    print("SUCCESS:", res)
