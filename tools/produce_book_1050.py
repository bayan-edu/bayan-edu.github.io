import sys
sys.path.append('tools')
from canva_pipeline import create_and_produce_cover

brief = (
    'Book cover design titled "Energy Control". '
    'The title "Energy Control" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. '
    'BRIGHT ENDOCRINE BIOLOGY & METABOLISM DAYLIGHT STYLE: A sunlit, pristine medical endocrinology laboratory on a bright sunny day under natural daylight. '
    'In the center foreground, on a clean desk: an exquisite, glowing 3D translucent anatomical model of the human butterfly-shaped thyroid gland on the trachea, with radiant golden and amber metabolic energy particles streaming outward toward stylized cell models. '
    'Beside the model, a gleaming chrome stethoscope, a colorful 3D molecular ball-and-stick model of thyroid hormone, and an open physiology textbook showing human metabolic pathways. '
    'In the background, sunlit laboratory windows look out over green gardens under a clear azure sky. '
    'Palette: thyroid warm coral and magenta, energy radiant gold, stethoscope chrome, and lab ivory white. '
    'Human biology, endocrine system, thyroid gland, metabolism, bright, educational, inspiring, completely daylight. '
    'STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. '
    'NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. '
    'Aspect ratio 2:3 vertical book jacket.'
)

if __name__ == '__main__':
    res = create_and_produce_cover(1050, brief, "Energy Control")
    print("SUCCESS:", res)
