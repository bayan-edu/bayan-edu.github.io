import sys
sys.path.append('tools')
from canva_pipeline import create_and_produce_cover

brief = (
    'Book cover design titled "George Washington Carver: Teaching at Tuskegee Institute". '
    'The title "George Washington Carver: Teaching at Tuskegee Institute" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. '
    'BRIGHT AGRICULTURAL BOTANY & HISTORICAL SCIENCE DAYLIGHT STYLE: A sunlit, rustic historic agricultural laboratory workshop on a glorious sunny morning in bright daylight. '
    'In the center foreground, on a warm wooden workbench: thriving potted peanut plants with green leaves and yellow flowers, clusters of fresh peanuts in shells resting in a woven basket, and glass sample bottles of clear golden peanut oil catching bright morning sunbeams. '
    'Beside them rest a vintage brass microscope, sweet potato tubers, and open botanical sketchbooks with hand-drawn plant anatomy. '
    'In the background, sunlit laboratory windows look out over green Alabama farmland under a brilliant blue sky. '
    'Palette: peanut warm ochre and leaf emerald, oil golden amber, lab wood warm brown, and sunny sky blue. '
    'Agricultural botany, Tuskegee history, sustainable farming, bright, educational, inspiring, completely daylight. '
    'STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. '
    'NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. '
    'Aspect ratio 2:3 vertical book jacket.'
)

if __name__ == '__main__':
    res = create_and_produce_cover(1023, brief, "George Washington Carver: Teaching at Tuskegee Institute")
    print("SUCCESS:", res)
