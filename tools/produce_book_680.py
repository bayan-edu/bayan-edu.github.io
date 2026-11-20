import sys
sys.path.append('tools')
from canva_pipeline import create_and_produce_cover

brief = (
    'Book cover design titled "The Dry River". '
    'The title "The Dry River" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. '
    'BRIGHT SOUTHWEST DESERT GEOLOGY DAYLIGHT STYLE: A sun-drenched, radiant desert canyon on a brilliant afternoon under a vivid turquoise sky. '
    'In the center foreground, a wide sandy arroyo riverbed with smooth river pebbles, cracked dry silt textures, and hardy green desert sagebrush bathed in dazzling sunlight. '
    'Towering red sandstone cliffs and mesas frame the dry wash in rich terracotta and amber tones. '
    'In the far mountain distance on the horizon, dramatic dark monsoon clouds gather against the bright blue sky. '
    'Palette: warm red sandstone terracotta, desert sand gold, sagebrush green, distant cloud violet, and turquoise blue. '
    'Geological, bright, educational, vivid, completely daylight. '
    'STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. '
    'NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. '
    'Aspect ratio 2:3 vertical book jacket.'
)

if __name__ == '__main__':
    res = create_and_produce_cover(680, brief, "The Dry River")
    print("SUCCESS:", res)
