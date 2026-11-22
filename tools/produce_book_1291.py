import sys
sys.path.append('tools')
from canva_pipeline import create_and_produce_cover

brief = (
    'Book cover design titled "Water, Water, Everywhere!". The title "Water, Water, Everywhere!" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. BRIGHT GLOBAL HYDROLOGICAL CYCLE DAYLIGHT STYLE: A magnificent, sunlit landscape illustrating all forms of water on Earth in bright daylight. In the center, sweeping from snow-capped alpine mountain peaks down through rushing crystalline mountain streams into a wide winding blue river and out into a sparkling turquoise ocean. Billowing white cumulus rain clouds float in a bright azure sky with gentle educational water cycle arrows and droplets illustrating evaporation, condensation, and precipitation. Palette: ocean and river deep blue and sparkling cyan, snow mountain pure white, mountain meadow emerald green, and sunbeam gold. Hydrology, water cycle, Earth systems, freshwater resources, bright, engaging, educational, completely daylight. STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. Aspect ratio 2:3 vertical book jacket.'
)

if __name__ == '__main__':
    res = create_and_produce_cover(1291, brief, 'Water, Water, Everywhere!')
    print("SUCCESS:", res)
