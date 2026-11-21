import sys
sys.path.append('tools')
from canva_pipeline import create_and_produce_cover

brief = (
    'Book cover design titled "Gecko Feet & Space Robots". '
    'The title "Gecko Feet & Space Robots" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. '
    'BRIGHT BIOMIMICRY & SPACE ROBOTICS DAYLIGHT STYLE: A sunlit, modern biomimetic engineering laboratory on a crisp sunny morning with natural light pouring through panoramic glass windows. '
    'In the center foreground, a vibrant emerald-green and turquoise day gecko resting gracefully on a transparent glass surface, displaying its remarkable climbing toe pads. '
    'Beside it on a pristine white research bench, an advanced aerospace robotic gripper mechanism with synthetic micro-patterned adhesion pads designed for space exploration. '
    'On a digital monitor nearby, a colorful magnified 3D scan illustrates the microscopic setae hairs of gecko feet. '
    'Palette: gecko emerald lime, robotic titanium silver, glass transparency cyan, and bright sunbeam gold. '
    'Biomimicry science, bright, educational, vivid, completely daylight. '
    'STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. '
    'NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. '
    'Aspect ratio 2:3 vertical book jacket.'
)

if __name__ == '__main__':
    res = create_and_produce_cover(917, brief, "Gecko Feet & Space Robots")
    print("SUCCESS:", res)
