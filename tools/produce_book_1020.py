import sys
sys.path.append('tools')
from canva_pipeline import create_and_produce_cover

brief = (
    'Book cover design titled "Where Do Old Satellites Go When They Die?". '
    'The title "Where Do Old Satellites Go When They Die?" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. '
    'BRIGHT ORBITAL AEROSPACE & SATELLITE GRAVEYARD STYLE: A brilliant, sun-illuminated view of space and satellite orbital mechanics above Earth. '
    'In the center foreground, an intricate retired communications satellite floating safely in high graveyard orbit, with golden thermal foil insulation, delicate radio antenna dishes, and shimmering blue solar panels catching brilliant sunlight. '
    'In the background, the vast glowing curved horizon of planet Earth with sapphire blue oceans and fluffy white swirling cloud patterns against deep space. '
    'Palette: satellite foil gold, solar cell cobalt blue, Earth sapphire and cloud white, and celestial black. '
    'Aerospace engineering, satellites, space exploration, orbital science, bright, educational, majestic. '
    'STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. '
    'NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. '
    'Aspect ratio 2:3 vertical book jacket.'
)

if __name__ == '__main__':
    res = create_and_produce_cover(1020, brief, "Where Do Old Satellites Go When They Die?")
    print("SUCCESS:", res)
