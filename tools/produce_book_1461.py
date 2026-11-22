import sys
sys.path.append('tools')
from canva_pipeline import create_and_produce_cover

brief = (
    'Book cover design titled "Ingredients for a Thunderstorm". The title "Ingredients for a Thunderstorm" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. BRIGHT METEOROLOGY & THUNDERSTORM MECHANICS DAYLIGHT STYLE: A sunlit, dynamic meteorological landscape in bright daylight. In the center, a colossal, billowing white cumulonimbus cloud rising majestically into a bright blue sky over green rolling hills, showing the three key ingredients: moisture from sunny blue lakes, atmospheric thermal instability, and updraft lift arrows. Beside the cloud, clean educational graphic callouts illustrate warm updrafts, moisture evaporation, and condensation levels. Palette: cloud billowing brilliant white, sky deep azure cyan, landscape fresh emerald green, and educational arrows bright yellow. Meteorology, thunderstorm formation, atmospheric physics, weather science, dynamic, educational, bright, completely daylight. STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. Aspect ratio 2:3 vertical book jacket.'
)

if __name__ == '__main__':
    res = create_and_produce_cover(1461, brief, 'Ingredients for a Thunderstorm')
    print("SUCCESS:", res)
