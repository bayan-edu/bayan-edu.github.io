import sys
sys.path.append('tools')
from canva_pipeline import create_and_produce_cover

brief = (
    'Book cover design titled "What Is Happening in the Ocean?". The title "What Is Happening in the Ocean?" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. BRIGHT GLOBAL OCEANOGRAPHY & WATER WORLD STYLE: An awe-inspiring, sunlit view of the blue water planet Earth in bright daylight. In the upper portion, the brilliant blue-and-white planet Earth with 70% ocean coverage glowing in sunlight. The lower portion reveals a stunning underwater ocean vista: shimmering turquoise sunbeams penetrating down to a flourishing coral reef shelf where sea turtles, dolphins, and schools of yellow tang swim freely among colorful sea anemones. Palette: ocean deep sapphire and sparkling turquoise, coral coral-pink and amber, and sunbeam bright ivory. Oceanography, marine ecosystems, global water world, Earth science, majestic, bright, educational, completely daylight. STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. Aspect ratio 2:3 vertical book jacket.'
)

if __name__ == '__main__':
    res = create_and_produce_cover(1503, brief, 'What Is Happening in the Ocean')
    print("SUCCESS:", res)
