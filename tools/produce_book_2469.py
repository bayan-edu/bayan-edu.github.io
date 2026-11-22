import sys
sys.path.append('tools')
from canva_pipeline import create_and_produce_cover

brief = (
    'Book cover design titled "Malai\'s Mission". The title "Malai\'s Mission" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. ASIAN ELEPHANT HABITAT DAYLIGHT STYLE: A sun-drenched, lush tropical rainforest corridor in the Western Ghats of India. A gentle mother Asian elephant and her playful young calf walking along a traditional migration forest path, their textured grey skin dusted with reddish soil, drinking from a clear mountain stream surrounded by bamboo groves and wild flowering ginger. Palette: elephants earthy warm grey, rainforest lush emerald and chartreuse green, stream crystal turquoise, and morning sun golden. Wildlife corridor conservation, Asian elephant ecology, biodiversity protection, touching and educational. STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. Aspect ratio 2:3 vertical book jacket.'
)

if __name__ == '__main__':
    res = create_and_produce_cover(2469, brief, 'Malais Mission Asian elephant conservation Western Ghats rainforest')
    print("SUCCESS:", res)
