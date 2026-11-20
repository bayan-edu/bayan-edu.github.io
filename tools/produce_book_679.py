import sys
sys.path.append('tools')
from canva_pipeline import create_and_produce_cover

brief = (
    'Book cover design titled "Ears in the Dark". '
    'The title "Ears in the Dark" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. '
    'SERENE ORNITHOLOGY NATURE DAWN STYLE: A sunlit rustic countryside farm at early golden dawn under a soft pastel morning sky. '
    'In the center foreground, a magnificent barn owl perched serenely on an old rustic cedar fence post. '
    'The owl\'s distinctive heart-shaped facial disc, delicate soft fringed wings, and golden-buff speckled plumage are illuminated by gentle morning light. '
    'In the soft background, a traditional wooden barn with an owl nesting box mounted under the gable, surrounded by golden wheat fields catching the early sunrise. '
    'Palette: soft golden buff, owl feather ivory white, weathered wood tan, wheat gold, and delicate morning sky. '
    'Zoological, serene, bright, educational, completely daylight. '
    'STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. '
    'NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. '
    'Aspect ratio 2:3 vertical book jacket.'
)

if __name__ == '__main__':
    res = create_and_produce_cover(679, brief, "Ears in the Dark")
    print("SUCCESS:", res)
