import sys
sys.path.append('tools')
from canva_pipeline import create_and_produce_cover

brief = (
    'Book cover design titled "The Astronomical Mystery Solvers". The title "The Astronomical Mystery Solvers" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. OBSERVATORY ASTRONOMY DAYLIGHT STYLE: A bright, sunlit mountaintop observatory interior overlooking alpine mountain ranges in daytime. A large brass-and-steel astronomical refractor telescope pointed upward toward the sky, surrounded by open celestial star atlases, a rotating brass armillary sphere, colorful prism spectral emission line charts of distant stars, and scientific logbooks under clear skylights. Palette: brass instruments warm gleaming gold, star charts navy and cream, spectral lines rainbow spectrum, and sky alpine cyan. Astronomy, spectroscopy, celestial navigation, scientific deduction, inspiring and educational. STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. Aspect ratio 2:3 vertical book jacket.'
)

if __name__ == '__main__':
    res = create_and_produce_cover(2455, brief, 'Astronomical Mystery Solvers telescope observatory star map spectroscopy')
    print("SUCCESS:", res)
