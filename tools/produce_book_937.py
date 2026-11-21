import sys
sys.path.append('tools')
from canva_pipeline import create_and_produce_cover

brief = (
    'Book cover design titled "Butterfly Conservation". '
    'The title "Butterfly Conservation" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. '
    'BRIGHT BUTTERFLY SANCTUARY & BOTANICAL DAYLIGHT STYLE: A sun-drenched, radiant wildflower meadow sanctuary on a glorious morning under bright sunlight. '
    'In the center foreground, a magnificent orange-and-black Monarch butterfly and a delicate Karner blue butterfly resting naturally on blooming pink milkweed and purple coneflowers covered in glistening morning dew drops. '
    'Beside the blooms, a clean wooden nature reserve plaque reads "Pollinator Sanctuary", with a botanical field magnifying glass catching warm golden sunbeams. '
    'In the background, a rolling sea of colorful native meadow flowers flourishes under a spotless azure sky. '
    'Palette: monarch vibrant orange, Karner iridescent blue, coneflower magenta, and meadow emerald green. '
    'Pollinator ecology, bright, educational, vivid, completely daylight. '
    'STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. '
    'NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. '
    'Aspect ratio 2:3 vertical book jacket.'
)

if __name__ == '__main__':
    res = create_and_produce_cover(937, brief, "Butterfly Conservation")
    print("SUCCESS:", res)
