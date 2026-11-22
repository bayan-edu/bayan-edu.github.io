import sys
sys.path.append('tools')
from canva_pipeline import create_and_produce_cover

brief = (
    'Book cover design titled "Tugboats: Pushers and Pullers". The title "Tugboats: Pushers and Pullers" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. MARITIME ENGINEERING DAYLIGHT STYLE: A busy, sunlit commercial seaport harbor on a bright clear day. In the center, a rugged, powerful red and white harbor tugboat churning white frothy water with its heavy-duty propellers, guiding a massive colorful cargo container ship into dock with thick synthetic towlines under bright sunny skies. Harbor cranes, navigation buoys, and seagulls gliding over glistening deep blue harbor waves. Palette: tugboat bold red and crisp white, ocean deep sapphire, container ship colorful shipping boxes, and bright blue sky. Naval engineering, harbor navigation, maritime power, dynamic and educational. STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. Aspect ratio 2:3 vertical book jacket.'
)

if __name__ == '__main__':
    res = create_and_produce_cover(1976, brief, 'Tugboats Pushers and Pullers maritime engineering harbor shipping')
    print("SUCCESS:", res)
