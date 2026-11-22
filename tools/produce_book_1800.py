import sys
sys.path.append('tools')
from canva_pipeline import create_and_produce_cover

brief = (
    'Book cover design titled "The Movement of the Earth". The title "The Movement of the Earth" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. EARTH ORBITAL MECHANICS & FOUR SEASONS DAYLIGHT STYLE: A comprehensive, circular astronomical diagram of Earth\'s annual orbit around the Sun. In the center, the radiant Sun emitting golden light beams. Earth shown at four cardinal orbital positions with its steady 23.5-degree axial tilt: Summer Solstice, Autumn Equinox, Winter Solstice, and Spring Equinox. Clean vector arrows illustrating counter-clockwise 365.25-day revolution and 24-hour daily rotation on its axis. Palette: Earth ocean sapphire and cloud white, Sun golden amber, seasonal orbital trail cyan, and celestial navy. Earth science, astronomy, axial tilt, four seasons, orbital mechanics, rotation vs revolution, clear and educational. STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. Aspect ratio 2:3 vertical book jacket.'
)

if __name__ == '__main__':
    res = create_and_produce_cover(1800, brief, 'Movement of the Earth orbital revolution axial tilt seasons rotation')
    print("SUCCESS:", res)
