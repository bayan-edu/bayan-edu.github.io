import sys
sys.path.append('tools')
from canva_pipeline import create_and_produce_cover

brief = (
    'Book cover design titled "Mount Pinatubo and the Ring of Fire". The title "Mount Pinatubo and the Ring of Fire" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. VOLCANOLOGY PACIFIC RING OF FIRE STYLE: A dramatic educational panorama of volcanic geology in full daylight. In the center, the monumental volcanic crater caldera of Mount Pinatubo holding a breathtaking turquoise acid crater lake, surrounded by rugged lahars and volcanic ash valleys, with a clean educational inset map showing the tectonic Pacific Ring of Fire subduction zones and glowing volcanic hotspots. Palette: caldera lake crystalline turquoise, volcanic ash layers warm pumice grey and ochre, tectonic map lines neon crimson, and sky clear cyan. Volcanology, plate tectonics, geological history, natural disasters science, powerful and educational. STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. Aspect ratio 2:3 vertical book jacket.'
)

if __name__ == '__main__':
    res = create_and_produce_cover(2392, brief, 'Mount Pinatubo Ring of Fire volcanology caldera eruption ash cloud')
    print("SUCCESS:", res)
