import sys
sys.path.append('tools')
from canva_pipeline import create_and_produce_cover

brief = (
    'Book cover design titled "Dragonfly in Details". The title "Dragonfly in Details" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. BRIGHT MACRO NATURE DAYLIGHT STYLE: A breathtaking, crystal-clear macro photograph of a stunning dragonfly perched on a reed in bright morning sunlight. In the center foreground, a vibrant emerald and electric-blue dragonfly with iridescent, translucent wings showing intricate lace-like venation, shimmering compound eyes reflecting the sunny sky, and glistening morning dew droplets resting on its thorax and the green water lily pad. In the soft background, calm shimmering wetland water reflects golden sunbeams and pink water lily blossoms. Palette: dragonfly electric cyan and metallic emerald, water lily petal soft rose, leaf moss green, and morning dew sparkle gold. Macro entomology, insect anatomy, wetland biodiversity, nature photography, bright, crisp, educational, completely daylight. STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. Aspect ratio 2:3 vertical book jacket.'
)

if __name__ == '__main__':
    res = create_and_produce_cover(1249, brief, 'Dragonfly in Details')
    print("SUCCESS:", res)
