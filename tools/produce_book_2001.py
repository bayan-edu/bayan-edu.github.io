import sys
sys.path.append('tools')
from canva_pipeline import create_and_produce_cover

brief = (
    'Book cover design titled "Do Animals Laugh?". The title "Do Animals Laugh?" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. ANIMAL ETHOLOGY PLAYFULNESS DAYLIGHT STYLE: A sun-drenched wildflower meadow in early summer full of joyful animal play behavior. In the foreground, a playful river otter rolling playfully on its back in a sunlit creek splashing crystal water droplets, beside a young chimpanzee and chimpanzee friends represented by playful chimps grooming and chasing through sunny foliage with wide joyful open-mouth expressions, along with clean educational acoustic spectrograms showing ultrasonic rodent and primate play vocalizations. Palette: meadow wildflowers sunny yellow and purple, creek water sparkling cyan, and morning sunlight golden amber. Animal cognition, ethology, play theory, joyous and educational. STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. Aspect ratio 2:3 vertical book jacket.'
)

if __name__ == '__main__':
    res = create_and_produce_cover(2001, brief, 'Do Animals Laugh animal ethology play vocalizations joy wildlife')
    print("SUCCESS:", res)
