import sys
sys.path.append('tools')
from canva_pipeline import create_and_produce_cover

brief = (
    'Book cover design titled "Will Human Life on Earth Come to an End?". The title "Earth\'s Future" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. PLANETARY BIOSPHERE & COSMIC RESILIENCE STYLE: A majestic, thought-provoking view of planet Earth in space, bathed in radiant golden sunlight from the Sun. The vibrant blue oceans, swirling white clouds, and green continents wrapped in a glowing, thin atmospheric protective veil. Distant asteroids in harmless solar orbit, orbital solar monitoring arrays, and stylized educational equilibrium scales showing balance between planetary biosphere and cosmic timescales. Palette: Earth ocean blue, cloud pure white, continent green, cosmic deep navy, and brilliant solar gold. Planetary science, Earth\'s future, biosphere conservation, astronomy, majestic and contemplative. STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. Aspect ratio 2:3 vertical book jacket.'
)

if __name__ == '__main__':
    res = create_and_produce_cover(1627, brief, 'Will Human Life on Earth Come to an End planetary science biosphere')
    print("SUCCESS:", res)
