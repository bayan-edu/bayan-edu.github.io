import sys
sys.path.append('tools')
from canva_pipeline import create_and_produce_cover

brief = (
    'Book cover design titled "What to See During an Eclipse". The title "What to See During an Eclipse" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. SOLAR ECLIPSE PHENOMENA STYLE: A breathtaking daytime celestial event in crisp detail. In the center, a total solar eclipse at the thrilling transition of totality, revealing shimmering Baily\'s beads of sparkling golden sunlight filtering through lunar mountain valleys, the dazzling diamond ring sparkle, and radiant pearlescent white coronal streamers reaching into twilight violet space, with subtle undulating shadow bands projected onto a clean white viewing sheet below. Palette: solar corona pure radiant white, diamond ring brilliant gold, eclipse sky deep twilight indigo, and viewer accents warm amber. Solar physics, eclipse phenomena, celestial observation, awe-inspiring and educational. STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. Aspect ratio 2:3 vertical book jacket.'
)

if __name__ == '__main__':
    res = create_and_produce_cover(2351, brief, 'What to See During an Eclipse astronomy solar corona Baily beads shadow bands')
    print("SUCCESS:", res)
