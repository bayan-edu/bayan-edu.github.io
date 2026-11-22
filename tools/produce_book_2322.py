import sys
sys.path.append('tools')
from canva_pipeline import create_and_produce_cover

brief = (
    'Book cover design titled "An Exciting Trip to Space". The title "An Exciting Trip to Space" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. SPACE EXPLORATION ADVENTURE STYLE: A thrilling view of a sleek, modern commercial spacecraft ascending gracefully into the upper stratosphere. The blue atmospheric curvature of planet Earth below showing coastlines and swirling white weather patterns, transitioning into the star-studded blackness of space, with the spacecraft\'s solar panels deploying toward the bright rising Sun. Palette: spacecraft sleek white and solar gold, Earth oceans brilliant azure and turquoise, clouds pure white, and space deep navy with distant stars. Space tourism, rocket science, aerospace engineering, exciting and educational. STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. Aspect ratio 2:3 vertical book jacket.'
)

if __name__ == '__main__':
    res = create_and_produce_cover(2322, brief, 'Exciting Trip Space rocket launch spacecraft astronauts orbit Earth solar')
    print("SUCCESS:", res)
