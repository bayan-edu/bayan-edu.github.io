import sys
sys.path.append('tools')
from canva_pipeline import create_and_produce_cover

brief = (
    'Book cover design titled "Happy Maths : Time and Money". The title "Happy Maths: Time and Money" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. PRACTICAL MATHEMATICS CLASSROOM DAYLIGHT STYLE: A bright, sunlit elementary mathematics desk in daytime. A large, colorful educational clock face with moving hour and minute hands, beside an antique brass sand hourglass, neatly stacked shiny golden and silver coins, play currency bills, and a colorful wooden abacus with counting beads under morning sunlight. Palette: clock face cheerful yellow and blue, coins gleaming gold and silver, abacus beads rainbow colors, and desk light wood. Elementary mathematics, time-telling skills, financial literacy, practical counting, delightful and educational. STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. Aspect ratio 2:3 vertical book jacket.'
)

if __name__ == '__main__':
    res = create_and_produce_cover(2669, brief, 'Happy Maths Time Money clock currency coins bills hourglass math')
    print("SUCCESS:", res)
