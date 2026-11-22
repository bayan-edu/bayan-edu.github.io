import sys
sys.path.append('tools')
from canva_pipeline import create_and_produce_cover

brief = (
    'Book cover design titled "Reading: 20,000 Leagues under the Sea". The title "20,000 Leagues under the Sea" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. BRIGHT UNDERWATER NAUTILUS SUBMARINE DAYLIGHT STYLE: An awe-inspiring underwater ocean vista bathed in sparkling turquoise sunlight. In the center foreground, the magnificent, steampunk-inspired submarine Nautilus gliding gracefully through deep turquoise waters, its curved riveted steel hull, dorsal spine, and large circular salon window glowing with warm internal golden light. Surrounding the submarine are vibrant coral reefs, schools of tropical fish, and sea turtles swimming in sunbeams piercing the crystal sea. Palette: ocean sparkling turquoise and aquamarine, Nautilus steel bronze and slate, coral pink, and sunbeam bright ivory. Science fiction classic, Jules Verne, submarine exploration, oceanography, adventurous, bright, educational, completely daylight. STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. Aspect ratio 2:3 vertical book jacket.'
)

if __name__ == '__main__':
    res = create_and_produce_cover(1425, brief, 'Reading 20000 Leagues under the Sea')
    print("SUCCESS:", res)
