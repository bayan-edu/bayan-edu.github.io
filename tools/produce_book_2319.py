import sys
sys.path.append('tools')
from canva_pipeline import create_and_produce_cover

brief = (
    'Book cover design titled "The Great Forest Race". The title "The Great Forest Race" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. WOODLAND ATHLETICS FAIRYTALE DAYLIGHT STYLE: A cheerful, sunlit woodland racetrack winding through a magical forest in broad daylight. A start/finish banner woven from vines and colorful forest flowers hanging across a smooth forest path, with a spunky red squirrel, a swift brown hare, a hedgehog with a leaf on its quills, and a determined little tortoise lined up enthusiastically at the starting line. Sunlight filtering through leaves casting festive golden patterns. Palette: woodland grass fresh emerald, forest animals warm russet and cream, flower banner vibrant red and gold, and morning sunlight cheerful yellow. Animal storytelling, sportsmanship, friendship, energetic, delightful and educational. STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. Aspect ratio 2:3 vertical book jacket.'
)

if __name__ == '__main__':
    res = create_and_produce_cover(2319, brief, 'Great Forest Race woodland animal athletics squirrel hare tortoise meadow')
    print("SUCCESS:", res)
