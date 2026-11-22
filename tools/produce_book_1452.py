import sys
sys.path.append('tools')
from canva_pipeline import create_and_produce_cover

brief = (
    'Book cover design titled "Different Forms of Water". The title "Different Forms of Water" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. BRIGHT STATES OF WATER SCIENCE DAYLIGHT STYLE: A sunlit, pristine kitchen science workbench on a bright sunny day in natural daylight. In the center foreground, a tall crystal-clear drinking glass filled with pure water and crystalline geometric ice cubes clinking together with glistening condensation droplets running down the glass. Beside it, a clean porcelain teapot releasing gentle, translucent steam vapor plumes catching golden morning sunbeams pouring through a window. Palette: water and ice crystal cyan and white, porcelain teapot ivory, and room daylight warm gold. States of matter, water cycle, solid liquid gas, thermal physics, clean, refreshing, bright, educational, completely daylight. STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. Aspect ratio 2:3 vertical book jacket.'
)

if __name__ == '__main__':
    res = create_and_produce_cover(1452, brief, 'Different Forms of Water')
    print("SUCCESS:", res)
