import sys
sys.path.append('tools')
from canva_pipeline import create_and_produce_cover

brief = (
    'Book cover design titled "Nasreddin: Ten Stories". The title "Nasreddin: Ten Stories" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. TRADITIONAL FOLKLORE VILLAGE SQUARE STYLE: A sun-soaked, ancient Mediterranean and Middle Eastern village square on a bright morning. Under a sprawling, shady old olive tree, a gentle, friendly grey donkey stands patiently, equipped with colorful woven kilim saddlebags overflowing with bound storybooks and rolled parchment scrolls. A clay water jug resting on cobblestones, and whitewashed village buildings with terracotta tiled roofs under a brilliant azure sky. Palette: donkey coat soft warm grey, woven saddlebags colorful terracotta, turquoise and ochre, and village sky Mediterranean azure. Traditional folklore, wit and wisdom stories, humorous cultural tales, warm and educational. STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. Aspect ratio 2:3 vertical book jacket.'
)

if __name__ == '__main__':
    res = create_and_produce_cover(2191, brief, 'Nasreddin Hodja folklore donkey saddlebags books olive tree village')
    print("SUCCESS:", res)
