import sys
sys.path.append('tools')
from canva_pipeline import create_and_produce_cover

brief = (
    'Book cover design titled "The Hydrologic Cycle". The title "The Hydrologic Cycle" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. BRIGHT GLOBAL WATER CYCLE PANORAMA DAYLIGHT STYLE: A sun-drenched, magnificent educational landscape illustrating the continuous movement of water on Earth in bright daylight. In the center, sparkling turquoise ocean water evaporating into billowing white cumulus clouds, snow-capped alpine mountains receiving fresh snowfall, clear mountain creeks joining a wide blue river, and groundwater filtering through permeable bedrock aquifers. Clean circular educational arrows illustrate evaporation, transpiration, condensation, and precipitation under radiant sunshine. Palette: ocean and river deep blue and aqua, clouds pristine white, mountains emerald and slate, and sunbeams brilliant gold. Hydrology, water cycle, Earth-atmosphere systems, precipitation, environmental science, bright, colorful, educational, completely daylight. STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. Aspect ratio 2:3 vertical book jacket.'
)

if __name__ == '__main__':
    res = create_and_produce_cover(1485, brief, 'The Hydrologic Cycle')
    print("SUCCESS:", res)
