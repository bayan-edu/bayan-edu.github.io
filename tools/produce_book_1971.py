import sys
sys.path.append('tools')
from canva_pipeline import create_and_produce_cover

brief = (
    'Book cover design titled "News Debate: Virtual Ed". The title "News Debate: Virtual Ed" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. EDUCATIONAL TECHNOLOGY DAYLIGHT STYLE: A bright, sunlit modern study space in daylight. On a clean light wood desk, a sleek modern tablet displaying interactive digital learning software, beside a digital stylus, headphones, and a glowing, translucent holographic 3D model of planet Earth floating above the screen with interactive learning icons. Open notebook with neat diagrams and a cup of water under morning window light. Palette: desk light birch wood, holographic projections radiant cyan and emerald, tablet silver, and sunlight warm white. Digital education, remote learning debate, interactive educational tools, bright and thoughtful. STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. Aspect ratio 2:3 vertical book jacket.'
)

if __name__ == '__main__':
    res = create_and_produce_cover(1971, brief, 'News Debate Virtual Ed digital learning tablets holographic globe')
    print("SUCCESS:", res)
