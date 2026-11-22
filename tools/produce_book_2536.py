import sys
sys.path.append('tools')
from canva_pipeline import create_and_produce_cover

brief = (
    'Book cover design titled "The Maldhok in the Desert". The title "The Maldhok in the Desert" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. THAR DESERT BUSTARD CONSERVATION DAYLIGHT STYLE: A sun-soaked Thar desert landscape in Rajasthan in early morning golden light. A majestic Great Indian Bustard (locally known as Maldhok) striding proudly among desert grasses and khejri trees, displaying its tall upright stature, deep black crown, and patterned brown wings, with golden sand dunes stretching toward a clear sunny horizon. Palette: sand dunes warm golden ochre, bustard plumage earthy brown and white, and morning desert sky pale cyan. Desert ecology, critically endangered wildlife, bustard sanctuary, regal and educational. STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. Aspect ratio 2:3 vertical book jacket.'
)

if __name__ == '__main__':
    res = create_and_produce_cover(2536, brief, 'Maldhok Great Indian Bustard Thar desert grassland conservation')
    print("SUCCESS:", res)
