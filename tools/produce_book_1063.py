import sys
sys.path.append('tools')
from canva_pipeline import create_and_produce_cover

brief = (
    'Book cover design titled "Where Do Hummingbirds Get All That Energy?". '
    'The title "Where Do Hummingbirds Get All That Energy?" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. '
    'BRIGHT HUMMINGBIRD FLIGHT & BOTANICAL DAYLIGHT STYLE: A sun-drenched, blooming flower garden on a glorious sunny morning in bright daylight. '
    'In the center foreground, a magnificent Ruby-throated Hummingbird with iridescent emerald-green feathers and a radiant ruby throat frozen in mid-air hover, its delicate wings fluttering in a gentle blur, sipping sparkling sweet nectar from vibrant crimson trumpet honeysuckle blossoms. '
    'Droplets of sparkling morning dew glisten like diamonds on fresh leaves in warm golden sunbeams. '
    'In the background, a lush flowering meadow and garden trellis beneath a brilliant azure sky. '
    'Palette: hummingbird iridescent emerald and ruby red, flowers crimson and coral, foliage vibrant green, and sunbeam gold. '
    'Ornithology, hummingbird biology, animal energy, pollination, bright, educational, vivid, completely daylight. '
    'STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. '
    'NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. '
    'Aspect ratio 2:3 vertical book jacket.'
)

if __name__ == '__main__':
    res = create_and_produce_cover(1063, brief, "Where Do Hummingbirds Get All That Energy?")
    print("SUCCESS:", res)
