import sys
sys.path.append('tools')
from canva_pipeline import create_and_produce_cover

brief = (
    'Book cover design titled "Robots". '
    'The title "Robots" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. '
    'BRIGHT ROBOTICS & AUTOMATION DAYLIGHT STYLE: A sun-drenched, high-tech robotics workshop on a bright morning with natural sunlight streaming through modern glass windows. '
    'In the center foreground, an advanced six-wheeled planetary exploration rover robot with articulated chassis, high-definition optical stereo camera mast, and a solar-powered sensor array. '
    'Beside the rover on a clean white workbench rest precision robotic grippers, colorful microchips with green PCBs, and glowing blue fiber-optic cables. '
    'In the background, a precision industrial robotic arm gleams in bright daylight. '
    'Palette: robotic titanium silver, electric cobalt blue, circuit board emerald, and bright white sunlight. '
    'Robotics technology, bright, educational, vivid, completely daylight. '
    'STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. '
    'NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. '
    'Aspect ratio 2:3 vertical book jacket.'
)

if __name__ == '__main__':
    res = create_and_produce_cover(895, brief, "Robots")
    print("SUCCESS:", res)
