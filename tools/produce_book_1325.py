import sys
sys.path.append('tools')
from canva_pipeline import create_and_produce_cover

brief = (
    'Book cover design titled "Super-Shoe Controversy". The title "Super-Shoe Controversy" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. BRIGHT SPORTS BIOMECHANICS & SHOE TECH DAYLIGHT STYLE: A sunlit athletic stadium running track on a glorious clear day in bright daylight. In the center foreground, a state-of-the-art high-performance marathon running sneaker resting on the red track surface, featuring a cutaway view showing its curved carbon-fiber spring plate embedded within responsive energy-return foam. Clean graphic overlays display kinetic energy force arrows, rebound percentages, and a precision digital chronograph stopwatch. Palette: running shoe neon volt green and electric cyan, track terracotta red, carbon plate graphite black, and stadium grass emerald. Sports science, athletic engineering, biomechanics, carbon fiber footwear, bright, dynamic, educational, completely daylight. STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. Aspect ratio 2:3 vertical book jacket.'
)

if __name__ == '__main__':
    res = create_and_produce_cover(1325, brief, 'Super-Shoe Controversy')
    print("SUCCESS:", res)
