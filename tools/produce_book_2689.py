import sys
sys.path.append('tools')
from canva_pipeline import create_and_produce_cover

brief = (
    'Book cover design titled "The Bag". The title "The Bag" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. SUSTAINABLE TEXTILE DESIGN DAYLIGHT STYLE: A sunlit botanical textile workshop on a bright morning. A sturdy, beautifully crafted natural cotton canvas tote bag with woven handles resting on a wooden bench, printed with an artistic green botanical fern leaf pattern, holding fresh farmer\'s market produce (crisp carrots, apples, fresh bread), symbolizing zero-waste living and replacing single-use plastics under sunny morning light. Palette: tote bag natural unbleached ivory cotton, fern print sage green, produce orange and ruby red, and bench warm pine. Zero waste, sustainable materials, reusable design, textile crafts, clean and educational. STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. Aspect ratio 2:3 vertical book jacket.'
)

if __name__ == '__main__':
    res = create_and_produce_cover(2689, brief, 'The Bag sustainable canvas tote bag reusable textile recycling botany')
    print("SUCCESS:", res)
