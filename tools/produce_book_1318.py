import sys
sys.path.append('tools')
from canva_pipeline import create_and_produce_cover

brief = (
    'Book cover design titled "Ocean Circulations". The title "Ocean Circulations" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. BRIGHT OCEANOGRAPHIC CURRENTS DAYLIGHT STYLE: A sunlit, sparkling open Pacific Ocean panorama on a glorious sunny day in bright daylight. In the center foreground, several bright yellow toy rubber ducks bobbing cheerfully on gentle ocean swells along a visible flowing ocean current drift track. Beside them, an oceanographic research surface buoy with solar panels and a satellite telemetry transmitter antenna measures current speed and salinity under a clear blue sky. Palette: rubber duck bright sunny yellow, ocean deep sapphire and sparkling cyan, buoy safety orange, and sky brilliant azure. Ocean currents, oceanography, marine hydrology, friendly cargo drift science, bright, cheerful, educational, completely daylight. STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. Aspect ratio 2:3 vertical book jacket.'
)

if __name__ == '__main__':
    res = create_and_produce_cover(1318, brief, 'Ocean Circulations')
    print("SUCCESS:", res)
