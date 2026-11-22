import sys
sys.path.append('tools')
from canva_pipeline import create_and_produce_cover

brief = (
    'Book cover design titled "Shanti\'s Friend". The title "Shanti\'s Friend" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. RURAL VILLAGE ANIMAL COMPANIONSHIP STYLE: A sun-drenched, cheerful village courtyard in rural India on a bright morning. An adorable young baby goat (kid) with soft caramel-and-white fur and shiny brown eyes wearing a festive woven red bead collar with tiny brass bells, nibbling happily on fresh green grass beside a terracotta water trough and blooming yellow marigolds under sunny skies. Palette: baby goat fur caramel and cream, marigolds vibrant golden-yellow, courtyard terracotta clay, and morning sky pale blue. Domestic animal care, village life, companionship with animals, heartwarming and educational. STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. Aspect ratio 2:3 vertical book jacket.'
)

if __name__ == '__main__':
    res = create_and_produce_cover(2629, brief, 'Shantis Friend companion pet goat calf Indian rural village daylight')
    print("SUCCESS:", res)
