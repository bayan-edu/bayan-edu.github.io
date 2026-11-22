import sys
sys.path.append('tools')
from canva_pipeline import create_and_produce_cover

brief = (
    'Book cover design titled "Study Buddies". The title "Study Buddies" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. ANIMAL COMRADERY STUDY SPACE DAYLIGHT STYLE: A sunlit, cozy library study room on a bright afternoon. On a warm woven rug beside a wooden study desk with open school textbooks and a desk lamp, a golden retriever and a tabby cat are napping peacefully together curled up side-by-side with paws touching, basking in warm golden sunbeams streaming across the wooden floor. Palette: golden retriever honey gold, tabby cat warm marmalade and white, rug soft navy, and sunlight golden warm. Friendship, peer learning, animal comradery, peaceful study habits, heartwarming and educational. STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. Aspect ratio 2:3 vertical book jacket.'
)

if __name__ == '__main__':
    res = create_and_produce_cover(2663, brief, 'Study Buddies animal friendship dog cat reading books desk daylight')
    print("SUCCESS:", res)
