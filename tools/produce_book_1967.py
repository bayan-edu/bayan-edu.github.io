import sys
sys.path.append('tools')
from canva_pipeline import create_and_produce_cover

brief = (
    'Book cover design titled "Climate vs. Weather". The title "Climate vs. Weather" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. METEOROLOGY ATMOSPHERIC SCIENCE DAYLIGHT STYLE: An educational dual-panel scientific composition. On one side, instantaneous day-to-day weather: a weather station vane, digital anemometer, rain gauge, and a localized sunshower with a vibrant rainbow. On the other side, long-term climate: a global Earth climate zones sphere showing polar ice caps, temperate forests, and equatorial tropical belts with multi-decade temperature graphs. Palette: atmospheric sky blue, rainbow spectral colors, globe ocean cyan, and instrument silver. Atmospheric science, meteorology vs climatology, data science, clear and educational. STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. Aspect ratio 2:3 vertical book jacket.'
)

if __name__ == '__main__':
    res = create_and_produce_cover(1967, brief, 'Climate vs Weather meteorology atmosphere seasons barometer radar')
    print("SUCCESS:", res)
