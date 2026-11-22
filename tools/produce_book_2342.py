import sys
sys.path.append('tools')
from canva_pipeline import create_and_produce_cover

brief = (
    'Book cover design titled "Play Time". The title "Play Time" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. ANIMAL PLAY AND DEVELOPMENT DAYLIGHT STYLE: A sunlit, vibrant green meadow on a bright spring morning. Young wild animals engaged in natural play behaviors that build survival skills: a fluffy fox kit playfully pouncing on a fluttering yellow butterfly, and two bear cubs wrestling gently in the soft clover grass, under sunny skies. Palette: meadow grass fresh emerald green, fox fur bright russet, wildflowers sunny yellow, and morning sky pale blue. Animal behavioral development, play in nature, juvenile learning, heartwarming and educational. STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. Aspect ratio 2:3 vertical book jacket.'
)

if __name__ == '__main__':
    res = create_and_produce_cover(2342, brief, 'Play Time animal play behavior young animals toys meadow daylight')
    print("SUCCESS:", res)
