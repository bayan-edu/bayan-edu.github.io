import sys
sys.path.append('tools')
from canva_pipeline import create_and_produce_cover

brief = (
    'Book cover design titled "The Train in the Desert". '
    'The title "The Train in the Desert" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. '
    'BRIGHT HISTORIC DESERT RAILWAY DAYLIGHT STYLE: A sun-drenched, radiant desert railway landscape on a clear sunny morning under a brilliant blue sky. '
    'In the center foreground, a vintage Ottoman steam locomotive in classic black and polished brass trim, pulling passenger coaches along gleaming steel tracks curving through golden desert sand dunes. '
    'A soft, billowy white cloud of steam rises into the fresh desert air. '
    'In the distance, an authentic historic carved limestone arched station building stands proudly in the sunlit desert vista. '
    'Palette: warm desert gold, locomotive black, polished brass, crisp steam white, and azure sky blue. '
    'Historical engineering, bright, educational, vivid, completely daylight. '
    'STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. '
    'NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. '
    'Aspect ratio 2:3 vertical book jacket.'
)

if __name__ == '__main__':
    res = create_and_produce_cover(687, brief, "The Train in the Desert")
    print("SUCCESS:", res)
