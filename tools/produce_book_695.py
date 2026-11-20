import sys
sys.path.append('tools')
from canva_pipeline import create_and_produce_cover

brief = (
    'Book cover design titled "Sand Animals". '
    'The title "Sand Animals" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. '
    'BRIGHT DESERT WILDLIFE & ZOOLOGY DAYLIGHT STYLE: A sun-drenched, radiant desert landscape on a glorious morning under a vivid azure sky. '
    'In the center foreground, an adorable desert jerboa with silky soft sand-colored fur, large dark inquisitive eyes, long kangaroo-like hind legs, and a delicate white-tufted tail, sitting alertly on the warm, fine rippled sand dunes. '
    'Delicate footprints in the fine sand and a hardy desert succulent plant bloom nearby, catching golden morning sunbeams. '
    'In the background, majestic wind-swept golden dunes roll toward the sunny horizon. '
    'Palette: desert golden ochre, jerboa silky beige, warm sand cream, succulent green, and azure sky blue. '
    'Zoological, wildlife, bright, educational, completely daylight. '
    'STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. '
    'NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. '
    'Aspect ratio 2:3 vertical book jacket.'
)

if __name__ == '__main__':
    res = create_and_produce_cover(695, brief, "Sand Animals")
    print("SUCCESS:", res)
