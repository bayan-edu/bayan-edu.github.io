import sys
sys.path.append('tools')
from canva_pipeline import create_and_produce_cover

brief = (
    'Book cover design titled "Why Is Acid Rain Harmful?". The title "Why Is Acid Rain Harmful?" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. ENVIRONMENTAL CHEMISTRY & ACID DEPOSITION DAYLIGHT STYLE: A sunlit, compelling scientific study scene on a bright morning. In the foreground, a detailed split comparative demonstration: a carved limestone statue surface showing chemical weathering from sulfurous acid rain vs a pristine marble specimen. Beside it, a beaker of rain water with bright red litmus pH indicator paper (pH 4.0), and a healthy green pine seedling growing in buffered soil with limestone granules. In the background, a sunny forest and clean blue skies showing environmental recovery and emission scrubbers. Palette: litmus test red and orange, limestone cream, pine needle green, and sunny sky blue. Acid rain chemistry, pH scale, chemical weathering, environmental buffering, air pollution solutions, clear and educational. STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. Aspect ratio 2:3 vertical book jacket.'
)

if __name__ == '__main__':
    res = create_and_produce_cover(1901, brief, 'Acid Rain Harmful environmental chemistry pH scale forest buffering')
    print("SUCCESS:", res)
