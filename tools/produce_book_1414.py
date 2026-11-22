import sys
sys.path.append('tools')
from canva_pipeline import create_and_produce_cover

brief = (
    'Book cover design titled "Reading: Ali Baba and the Forty Thieves". The title "Ali Baba and the Forty Thieves" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. BRIGHT ARABIAN TREASURE CAVERN DAYLIGHT STYLE: A sun-drenched magical mountain cavern entrance in ancient Persia in bright daylight. In the center foreground, the massive enchanted rock portal opened wide to reveal a sunlit treasure cavern brimming with sparkling gold urns, intricate Persian rugs, jeweled brass lanterns, and tall terracotta olive oil jars resting on golden desert sand. Outside the cave, a friendly pack donkey with woven saddlebags stands beside wild desert palms under a brilliant turquoise sky. Palette: treasure gold and ruby, terracotta warm sienna, Persian rug sapphire, and desert sky turquoise blue. Arabian Nights, Middle Eastern folklore, classic literature, treasure adventure, bright, majestic, educational, completely daylight. STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. Aspect ratio 2:3 vertical book jacket.'
)

if __name__ == '__main__':
    res = create_and_produce_cover(1414, brief, 'Reading Ali Baba and the Forty Thieves')
    print("SUCCESS:", res)
