import sys
sys.path.append('tools')
from canva_pipeline import create_and_produce_cover

brief = (
    'Book cover design titled "Are the Everglades Forever?". The title "Are the Everglades Forever?" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. LUSH SUBTROPICAL EVERGLADES WETLANDS DAYLIGHT STYLE: A breathtaking, sun-drenched panoramic view of the Florida Everglades "River of Grass" in brilliant daylight. Vast expanses of golden-green sawgrass stretching to the horizon under sweeping azure skies with billowy white cumulus clouds. In the foreground, a tranquil freshwater slough with floating fragrant water lilies and bald cypress trees with distinctive knobby knees emerging from clear water. A pink roseate spoonbill and a snowy egret wading gracefully near the water\'s edge. Palette: sawgrass golden-green, cypress moss emerald, spoonbill coral pink, slough aquamarine, and vast sky blue. Subtropical ecology, wetland conservation, Everglades preservation, biodiversity, vibrant and scenic. STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. Aspect ratio 2:3 vertical book jacket.'
)

if __name__ == '__main__':
    res = create_and_produce_cover(1615, brief, 'Are the Everglades Forever wetlands subtropical ecology')
    print("SUCCESS:", res)
