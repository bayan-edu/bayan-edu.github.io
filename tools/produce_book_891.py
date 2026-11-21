import sys
sys.path.append('tools')
from canva_pipeline import create_and_produce_cover

brief = (
    'Book cover design titled "Saturn, a Planet with Rings". '
    'The title "Saturn, a Planet with Rings" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. '
    'BRIGHT PLANETARY ASTRONOMY DAYLIGHT STYLE: A sun-illuminated, majestic cosmic view of Saturn glowing brilliantly in warm sunlight. '
    'In the center, the giant gas planet displays soft, elegant atmospheric bands of warm butterscotch, gold, and pale amber. '
    'Its iconic, wide concentric rings made of billions of shimmering water-ice particles gleam with sharp crystalline detail and delicate divisions reflecting bright solar rays. '
    'Tiny spherical ice moons gleam along the ring plane. '
    'Palette: Saturn golden butterscotch, ice crystal white, pale amber, and deep celestial blue. '
    'Planetary science, bright, educational, vivid. '
    'STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. '
    'NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. '
    'Aspect ratio 2:3 vertical book jacket.'
)

if __name__ == '__main__':
    res = create_and_produce_cover(891, brief, "Saturn, a Planet with Rings")
    print("SUCCESS:", res)
