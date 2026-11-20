import sys
sys.path.append('tools')
from canva_pipeline import create_and_produce_cover

brief = (
    'Book cover design titled "A Clean Cloth". '
    'The title "A Clean Cloth" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. '
    'BRIGHT HOME SAFETY & CULINARY DAYLIGHT STYLE: A sun-drenched, radiant rustic kitchen counter on a bright morning with golden sunlight streaming through a window. '
    'In the center foreground, a clean polished wooden butcher block cutting board with freshly washed golden potatoes and clean culinary prep tools arranged neatly. '
    'Next to the cutting board, a pristine roll of sterile, woven clean white cotton first-aid cloth and fresh gauze tied neatly with a clean ribbon. '
    'In the warm sunlit background, clean ceramic bowls, fresh kitchen herbs, and a bright, spotless farmhouse kitchen shelf. '
    'Palette: warm honey wood, crisp clean white, golden potato amber, and fresh herb green. '
    'Reassuring, bright, educational, vivid, completely daylight. '
    'STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. '
    'NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. '
    'Aspect ratio 2:3 vertical book jacket.'
)

if __name__ == '__main__':
    res = create_and_produce_cover(661, brief, "A Clean Cloth")
    print("SUCCESS:", res)
