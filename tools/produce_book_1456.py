import sys
sys.path.append('tools')
from canva_pipeline import create_and_produce_cover

brief = (
    'Book cover design titled "Electromagnetic Radiation". The title "Electromagnetic Radiation" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. BRIGHT ELECTROMAGNETIC SPECTRUM PHYSICS DAYLIGHT STYLE: A sunlit, magnificent physics laboratory exhibit in bright natural daylight. In the center foreground, a triangular glass optical prism refracting a beam of natural sunlight into a dazzling, vivid rainbow spectrum across a clean white laboratory table. Curving gracefully above the table is an educational glowing wave spectrum ribbon illustrating the continuum from radio waves to infrared, visible light, ultraviolet, and X-rays with clean frequency markers. Palette: visible spectrum rainbow (red, orange, yellow, green, cyan, indigo, violet), prism crystal glass, and lab daylight white. Electromagnetic radiation, wave physics, optics, light spectrum, physics education, bright, colorful, educational, completely daylight. STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. Aspect ratio 2:3 vertical book jacket.'
)

if __name__ == '__main__':
    res = create_and_produce_cover(1456, brief, 'Electromagnetic Radiation')
    print("SUCCESS:", res)
