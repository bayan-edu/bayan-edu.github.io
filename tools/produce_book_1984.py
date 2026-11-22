import sys
sys.path.append('tools')
from canva_pipeline import create_and_produce_cover

brief = (
    'Book cover design titled "Fly Safe, Godavan". The title "Fly Safe, Godavan" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. GREAT INDIAN BUSTARD CONSERVATION DAYLIGHT STYLE: A sun-soaked semi-arid grassland savannah in Rajasthan at morning light. In the center foreground, a magnificent Great Indian Bustard (Godavan / Ardeotis nigriceps) walking gracefully among tall golden sewan grasses, showing its long white neck, black crown crest, and patterned brown wings. In the background, bird diverter spirals installed on powerlines to ensure safe flight under sunny skies. Palette: golden savannah yellow, bustard plumage earthy brown and pure white, and bright desert morning sky azure. Endangered bird conservation, grassland ecology, wildlife safety, poignant and educational. STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. Aspect ratio 2:3 vertical book jacket.'
)

if __name__ == '__main__':
    res = create_and_produce_cover(1984, brief, 'Godavan Great Indian Bustard Ardeotis nigriceps grassland conservation')
    print("SUCCESS:", res)
