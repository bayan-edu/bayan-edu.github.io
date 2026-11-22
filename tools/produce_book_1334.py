import sys
sys.path.append('tools')
from canva_pipeline import create_and_produce_cover

brief = (
    'Book cover design titled "The Wolf Within". The title "The Wolf Within" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. BRIGHT CANINE EVOLUTION & WILDLIFE DAYLIGHT STYLE: A breathtaking, sun-drenched wilderness and meadow landscape in bright morning daylight. In the center foreground, on a sunlit grassy meadow, rests a polished leather dog collar with a brass tag beside an open illustrated volume of canine evolutionary genetics. In the background atop a sunlit rocky ridge against evergreen forests and a clear blue sky, a noble gray wolf stands majestically with alert ears and thick silver coat. Palette: meadow emerald green, wolf coat silver-gray and sable, collar warm tan leather, and sky crisp azure. Canine evolution, wolf biology, animal domestication, genetics, dignified, bright, educational, completely daylight. STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. Aspect ratio 2:3 vertical book jacket.'
)

if __name__ == '__main__':
    res = create_and_produce_cover(1334, brief, 'The Wolf Within')
    print("SUCCESS:", res)
