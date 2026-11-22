import sys
sys.path.append('tools')
from canva_pipeline import create_and_produce_cover

brief = (
    'Book cover design titled "Watching the Weather". The title "Watching the Weather" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. CHEERFUL METEOROLOGY & WEATHER INSTRUMENTS SUNNY STYLE: A sunlit, picturesque hilltop weather observation garden on a clear breezy morning. In the center foreground, a bright orange-and-white striped windsock catching the wind, a spinning red rooster wind vane atop a wooden post, and a clear glass rain gauge with measuring increments. An illustrated cloud classification chart showing cirrus, cumulus, and stratus clouds floating across a bright blue sky. Palette: windsock bright orange and white, wind vane barn red, lawn fresh green, and clear sunny sky cyan. Weather observation, meteorology, wind direction, rain measurement, cloud types, cheerful, engaging, and educational. STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. Aspect ratio 2:3 vertical book jacket.'
)

if __name__ == '__main__':
    res = create_and_produce_cover(1897, brief, 'Watching the Weather meteorological observation tools wind cloud rain')
    print("SUCCESS:", res)
