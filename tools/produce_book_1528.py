import sys
sys.path.append('tools')
from canva_pipeline import create_and_produce_cover

brief = (
    'Book cover design titled "Precipitation". The title "Precipitation" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. BRIGHT ATMOSPHERIC PRECIPITATION SCIENCE DAYLIGHT STYLE: A sunlit, dynamic meteorological cross-section landscape in bright daylight. In the center, high-altitude cold cloud layers showing microscopic water droplets freezing onto ice crystals and forming delicate symmetrical snowflakes, which melt into glistening liquid rain droplets as they fall through warmer air layers over green hills and pine forests. In the foreground, a professional rain gauge with graduated measurement lines sits on a wooden post among rain-kissed wildflowers under sunbeams breaking through the clouds. Palette: clouds soft silver and white, rain droplets crystal cyan, rain gauge transparent glass, and meadow emerald green. Meteorology, precipitation physics, rain snow sleet, weather science, refreshing, bright, educational, completely daylight. STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. Aspect ratio 2:3 vertical book jacket.'
)

if __name__ == '__main__':
    res = create_and_produce_cover(1528, brief, 'Precipitation')
    print("SUCCESS:", res)
