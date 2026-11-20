import sys
sys.path.append('tools')
from canva_pipeline import create_and_produce_cover

brief = (
    'Book cover design titled "The Bee\'s Line". '
    'The title "The Bee\'s Line" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. '
    'BRIGHT ENTOMOLOGY FLOWER MEADOW DAYLIGHT STYLE: A sun-drenched, radiant wildflower meadow on a glorious sunny morning under a brilliant blue sky. '
    'In the center foreground, a macro view of a hardworking honeybee with delicate iridescent wings and pollen-dusted golden fuzz, sipping nectar from a vibrant purple lavender blossom and cheerful yellow sunflower. '
    'In the soft sunlit background, a wooden observation hive and gentle golden sunbeams highlighting the flight lines of bees across the blossoming meadow. '
    'Palette: sunflower golden-yellow, lavender purple, lush clover green, honey amber, and clear sky blue. '
    'Scientific, bright, educational, vivid, completely daylight. '
    'STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. '
    'NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. '
    'Aspect ratio 2:3 vertical book jacket.'
)

if __name__ == '__main__':
    res = create_and_produce_cover(678, brief, "The Bee's Line")
    print("SUCCESS:", res)
