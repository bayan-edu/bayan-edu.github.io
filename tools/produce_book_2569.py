import sys
sys.path.append('tools')
from canva_pipeline import create_and_produce_cover

brief = (
    'Book cover design titled "Water: A Give and Take". The title "Water: A Give and Take" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. GLOBAL WATER CYCLE DAYLIGHT STYLE: An educational landscape showing the closed loop of the water cycle in clear daylight. Sunlight warming the ocean causing invisible evaporation rising into cumulus clouds, condensation forming rain over mountain forests, snowmelt feeding crystal mountain streams that flow through wetlands back to the sea, with clean cycle arrows connecting each stage. Palette: ocean and river water turquoise, rain clouds silver-white, mountain forests emerald green, and sunbeams radiant gold. Hydrology, water cycle, planetary systems, resource stewardship, clear and educational. STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. Aspect ratio 2:3 vertical book jacket.'
)

if __name__ == '__main__':
    res = create_and_produce_cover(2569, brief, 'Water Give and Take hydrological cycle evaporation precipitation transpiration')
    print("SUCCESS:", res)
