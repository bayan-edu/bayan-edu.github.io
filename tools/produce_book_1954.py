import sys
sys.path.append('tools')
from canva_pipeline import create_and_produce_cover

brief = (
    'Book cover design titled "Planting Grasses to Clean a River". The title "Planting Grasses to Clean a River" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. RIVER RESTORATION ECOLOGY DAYLIGHT STYLE: A sun-drenched, sparkling riverbank restoration project in full summer daylight. Lush green native wetland grasses, sedges, and cattails planted densely along the curving banks of a crystal-clear winding river, with submerged root systems filtering runoff water shown clearly in clean educational cross-section. Dragonflies hovering above the reeds and smooth river stones under a bright blue sky. Palette: wetland reeds vibrant emerald green, river water sparkling turquoise cyan, river pebbles warm grey, and sunny sky blue. Riparian buffers, water purification, ecological restoration, environmental engineering, cheerful and educational. STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. Aspect ratio 2:3 vertical book jacket.'
)

if __name__ == '__main__':
    res = create_and_produce_cover(1954, brief, 'Planting Grasses to Clean a River riparian wetland phytoremediation')
    print("SUCCESS:", res)
