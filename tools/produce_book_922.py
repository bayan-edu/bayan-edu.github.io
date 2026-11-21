import sys
sys.path.append('tools')
from canva_pipeline import create_and_produce_cover

brief = (
    'Book cover design titled "The Earth". '
    'The title "The Earth" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. '
    'BRIGHT BLUE MARBLE PLANETARY DAYLIGHT STYLE: A sun-drenched, breathtaking cosmic view of planet Earth glowing brilliantly in full direct sunlight. '
    'In the center, the vibrant living planet displays deep cobalt oceans, emerald-green continents, swirling brilliant white clouds, and golden sunlit coastlines. '
    'A luminous cyan atmospheric glow rims the Earth against the cosmic horizon, radiating vitality and natural beauty under bright celestial daylight. '
    'Palette: ocean deep cobalt, continent emerald green, cloud pristine white, and glowing atmospheric cyan. '
    'Earth science, planetary geography, bright, educational, vivid, completely daylight. '
    'STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. '
    'NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. '
    'Aspect ratio 2:3 vertical book jacket.'
)

if __name__ == '__main__':
    res = create_and_produce_cover(922, brief, "The Earth")
    print("SUCCESS:", res)
