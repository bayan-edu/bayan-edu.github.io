import sys
sys.path.append('tools')
from canva_pipeline import create_and_produce_cover

brief = (
    'Book cover design titled "The White Desert". The title "The White Desert" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. RANN OF KUTCH SALT DESERT DAYLIGHT STYLE: A vast, breathtaking panoramic expanse of the Great Rann of Kutch in brilliant daylight. Endless glistening white salt crust flatlands stretching to the horizon, reflecting the azure sky and drifting clouds like a colossal mirror, with geometric cracked polygon salt tiles in the foreground and a solitary traditional camel saddle resting on a carved wooden stand. Palette: salt flats pure brilliant white, sky azure blue, camel saddle colorful Gujarati embroidered textiles (crimson, saffron, mirrorwork). Geological salt flats, unique desert ecosystems, cultural geography, magnificent and educational. STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. Aspect ratio 2:3 vertical book jacket.'
)

if __name__ == '__main__':
    res = create_and_produce_cover(2555, brief, 'The White Desert Rann of Kutch salt marsh geological landscape sunset daylight')
    print("SUCCESS:", res)
