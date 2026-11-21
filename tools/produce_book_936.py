import sys
sys.path.append('tools')
from canva_pipeline import create_and_produce_cover

brief = (
    'Book cover design titled "Benjamin Banneker Historical Park and Museum". '
    'The title "Benjamin Banneker Historical Park and Museum" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. '
    'BRIGHT HISTORIC ASTRONOMY & SURVEYING SCIENCE DAYLIGHT STYLE: A sunlit, peaceful colonial historic park on a crisp sunny morning under a bright azure sky. '
    'In the center foreground, an authentic handcrafted wooden clock mechanism with carved cedar gears, an antique brass surveyor\'s transit theodolite, and a brass drafting compass. '
    'Resting on a rustic wooden study bench is an open vintage astronomical almanac with neat celestial star calculations, catching golden morning sunbeams. '
    'In the background, a historic log cabin homestead and blooming apple orchard trees bask in warm daylight. '
    'Palette: warm cedar timber, antique brass gold, parchment ivory, orchard green, and sunny sky blue. '
    'Historical science, bright, educational, vivid, completely daylight. '
    'STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. '
    'NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. '
    'Aspect ratio 2:3 vertical book jacket.'
)

if __name__ == '__main__':
    res = create_and_produce_cover(936, brief, "Benjamin Banneker Historical Park and Museum")
    print("SUCCESS:", res)
