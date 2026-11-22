import sys
sys.path.append('tools')
from canva_pipeline import create_and_produce_cover

brief = (
    'Book cover design titled "Life Story: Katherine Johnson". The title "Katherine Johnson" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. BRIGHT SPACE RACE MATHEMATICS & TRAJECTORY STUDY STYLE: A sunlit NASA mathematical computing study during the Apollo space race in bright daylight. In the center foreground, on a clean wooden researcher\'s desk: an open pad filled with elegant handwritten orbital trajectory calculations and geometry equations, a vintage slide rule, a mechanical desktop calculator, and blueprints of space capsule launch trajectories. Through sunny windows, a rocket launch gantry and a clear blue sky with the distant crescent Moon glow in bright sunshine. Palette: desk warm walnut, calculations and paper ivory, slide rule polished bamboo and brass, and sky radiant blue. NASA history, Katherine Johnson legacy, orbital mechanics, mathematical pioneers, inspiring, bright, educational, completely daylight. STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. Aspect ratio 2:3 vertical book jacket.'
)

if __name__ == '__main__':
    res = create_and_produce_cover(1524, brief, 'Life Story Katherine Johnson')
    print("SUCCESS:", res)
