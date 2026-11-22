import sys
sys.path.append('tools')
from canva_pipeline import create_and_produce_cover

brief = (
    'Book cover design titled "The History of Planet Earth". The title "The History of Planet Earth" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. BRIGHT GEOLOGICAL TIMESCALE OF EARTH DAYLIGHT STYLE: An awe-inspiring, sunlit geological timeline cross-section of Earth across 4.6 billion years in bright daylight. Curving gracefully through the center, a luminous geological spiral ribbon illustrating the great eons: early volcanic crust, ancient stromatolite fossils in turquoise oceans, Paleozoic trilobite and ammonite fossils, Mesozoic dinosaur footprints, and modern green continents. At the center, the radiant blue planet Earth glows under golden sunlight. Palette: geological ribbon terracotta, ochre, and slate, Earth oceans sapphire, and sunlight radiant gold. Geology, Earth history, geological timescale, paleontology, planet evolution, majestic, bright, educational, completely daylight. STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. Aspect ratio 2:3 vertical book jacket.'
)

if __name__ == '__main__':
    res = create_and_produce_cover(1484, brief, 'The History of Planet Earth')
    print("SUCCESS:", res)
