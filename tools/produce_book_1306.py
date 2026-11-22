import sys
sys.path.append('tools')
from canva_pipeline import create_and_produce_cover

brief = (
    'Book cover design titled "Global Circulations". The title "Global Circulations" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. BRIGHT PLANETARY ATMOSPHERE DAYLIGHT STYLE: A magnificent, sunlit view of planet Earth from orbit in bright daylight. In the center foreground, Earth\'s vibrant blue oceans, lush continents, and swirling white cloud spirals illustrating the three global atmospheric circulation cells: Hadley cells at the equator, mid-latitude Ferrel cells, and polar vortexes. Clean, elegant curved atmospheric wind arrows indicate the trade winds and jet streams circulating thermal energy around the globe. Palette: oceans deep sapphire, continents emerald and ochre, clouds brilliant white, and wind streams bright cyan and gold. Meteorology, atmospheric circulation, planetary physics, climate systems, bright, majestic, educational, completely daylight. STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. Aspect ratio 2:3 vertical book jacket.'
)

if __name__ == '__main__':
    res = create_and_produce_cover(1306, brief, 'Global Circulations')
    print("SUCCESS:", res)
