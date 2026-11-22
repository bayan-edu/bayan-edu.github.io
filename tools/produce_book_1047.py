import sys
sys.path.append('tools')
from canva_pipeline import create_and_produce_cover

brief = (
    'Book cover design titled "Climate". '
    'The title "Climate" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. '
    'BRIGHT GLOBAL CLIMATOLOGY & METEOROLOGY DAYLIGHT STYLE: A sunlit, inspiring earth science study on a glorious clear day under natural daylight. '
    'In the center foreground, on a clean desk: an ornate spinning physical desk globe displaying Earth\'s 23.5-degree axial tilt and distinct colorful climate bands (lush tropical green, temperate amber, and polar crystalline ice white). '
    'Beside the globe, classic polished brass meteorological instruments: a wall thermometer, an aneroid brass barometer, and an open world climate atlas showing warm and cold ocean conveyor currents and atmospheric wind patterns. '
    'In the background, sun-drenched library windows look out over green hills and clear blue skies. '
    'Palette: globe ocean sapphire, climate bands emerald and golden amber, instrument polished brass, and sky cyan. '
    'Earth science, global climate, weather patterns, meteorology, bright, educational, classic, completely daylight. '
    'STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. '
    'NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. '
    'Aspect ratio 2:3 vertical book jacket.'
)

if __name__ == '__main__':
    res = create_and_produce_cover(1047, brief, "Climate")
    print("SUCCESS:", res)
