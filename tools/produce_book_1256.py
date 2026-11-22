import sys
sys.path.append('tools')
from canva_pipeline import create_and_produce_cover

brief = (
    'Book cover design titled "Why are Bubbles Round?". The title "Why are Bubbles Round?" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. BRIGHT SURFACE TENSION PHYSICS DAYLIGHT STYLE: A sun-drenched, cheerful garden lawn on a glorious sunny day in bright daylight. In the center foreground, a cluster of shimmering, crystal-clear spherical soap bubbles floating gracefully in the air, their translucent curved surfaces catching sunlight to display swirling rainbow iridescent colors. On a wooden garden table below rests a colorful plastic bubble wand and a small bottle of soap solution, beside a clean educational diagram illustrating minimal surface area and surface tension forces. Palette: bubble iridescent rainbow, grass vibrant emerald, wand sunny yellow, and sky bright cyan. Physics of bubbles, surface tension, fluid dynamics, cheerful, educational, bright, completely daylight. STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. Aspect ratio 2:3 vertical book jacket.'
)

if __name__ == '__main__':
    res = create_and_produce_cover(1256, brief, 'Why are Bubbles Round?')
    print("SUCCESS:", res)
