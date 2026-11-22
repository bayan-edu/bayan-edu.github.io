import sys
sys.path.append('tools')
from canva_pipeline import create_and_produce_cover

brief = (
    'Book cover design titled "Air Pressure". '
    'The title "Air Pressure" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. '
    'BRIGHT ATMOSPHERIC METEOROLOGY & PHYSICS DAYLIGHT STYLE: A sunlit, airy open mountain overlook on a glorious clear sunny morning under bright daylight. '
    'In the center foreground, on a weathered stone ledge: an antique ornate polished brass aneroid barometer with a detailed dial and delicate brass pointer, catching gleaming morning sunbeams. '
    'In the background across a wide blue sky, colorful striped hot air balloons ascend majestically above green rolling hills and fluffy white cumulus clouds. '
    'Palette: polished brass gold, sky sapphire and cerulean, cloud brilliant white, and landscape meadow green. '
    'Atmospheric science, meteorology, physics of air pressure, bright, educational, uplifting, completely daylight. '
    'STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. '
    'NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. '
    'Aspect ratio 2:3 vertical book jacket.'
)

if __name__ == '__main__':
    res = create_and_produce_cover(1003, brief, "Air Pressure")
    print("SUCCESS:", res)
