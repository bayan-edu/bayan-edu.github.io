import sys
sys.path.append('tools')
from canva_pipeline import create_and_produce_cover

brief = (
    'Book cover design titled "Leaping Lizards". The title "Leaping Lizards" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. BRIGHT DESERT HERPETOLOGY DAYLIGHT STYLE: A sun-drenched American Southwestern desert landscape in radiant morning daylight. In the center foreground, a magnificent eastern collared lizard perched regally on a warm red sandstone boulder, showing off its vivid turquoise-green body, yellow head, and striking black-and-white neck collar. Surrounding the rock are blooming yellow desert marigolds, saguaro cactus silhouettes, and distant sunlit canyon mesas under a deep azure sky. Palette: lizard turquoise green and sun yellow, desert rock terracotta red, flower lemon yellow, and desert sky radiant blue. Herpetology, desert ecology, reptiles, wildlife exploration, bright, vibrant, educational, completely daylight. STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. Aspect ratio 2:3 vertical book jacket.'
)

if __name__ == '__main__':
    res = create_and_produce_cover(1278, brief, 'Leaping Lizards')
    print("SUCCESS:", res)
