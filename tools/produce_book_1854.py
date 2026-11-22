import sys
sys.path.append('tools')
from canva_pipeline import create_and_produce_cover

brief = (
    'Book cover design titled "Oh No! Volcano". The title "Oh No! Volcano" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. DYNAMIC VOLCANIC ERUPTION & LAVA FOUNTAIN STYLE: A dramatic geological landscape capturing an active volcanic eruption in bright daytime lighting. In the center, an incandescent orange-red lava fountain erupting powerfully from a volcanic cinder cone vent. Aerodynamically shaped volcanic bombs flying through the air and cooling on basaltic slopes, with rivers of glowing orange lava flowing into dark basalt fields. A volcano monitoring research drone hovering in the distance under a blue sky fringed with white volcanic steam clouds. Palette: molten lava glowing incandescent orange and red, volcanic basalt dark grey, and sky sunny cyan. Volcanology, active eruptions, lava fountains, volcanic geology, dynamic, powerful, and educational. STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. Aspect ratio 2:3 vertical book jacket.'
)

if __name__ == '__main__':
    res = create_and_produce_cover(1854, brief, 'Oh No Volcano active eruption lava fountain volcanic hazards')
    print("SUCCESS:", res)
