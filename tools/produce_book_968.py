import sys
sys.path.append('tools')
from canva_pipeline import create_and_produce_cover

brief = (
    'Book cover design titled "What Causes Acid Rain?". '
    'The title "What Causes Acid Rain?" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. '
    'BRIGHT ENVIRONMENTAL CHEMISTRY & CLEAN WATER DAYLIGHT STYLE: A sunlit, pristine natural forest lake sanctuary on a glorious morning under bright daylight. '
    'In the center foreground, a modern environmental water-testing station on a clean wooden dock: digital pH meter displaying a clean "pH 7.0 SAFE WATER" readout, glass beakers with colorful indicator solutions, and a rain collection gauge. '
    'In the background, a healthy evergreen pine forest and crystalline blue lake flourish under warm golden sunbeams and a clear azure sky, showing nature restored. '
    'Palette: clean water turquoise, forest pine emerald, chemical indicator amber and cyan, and sunny sky blue. '
    'Atmospheric chemistry, conservation, bright, educational, vivid, completely daylight. '
    'STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. '
    'NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. '
    'Aspect ratio 2:3 vertical book jacket.'
)

if __name__ == '__main__':
    res = create_and_produce_cover(968, brief, "What Causes Acid Rain?")
    print("SUCCESS:", res)
