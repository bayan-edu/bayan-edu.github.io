import sys
sys.path.append('tools')
from canva_pipeline import create_and_produce_cover

brief = (
    'Book cover design titled "The ABCs of Healthy Me!". The title "The ABCs of Healthy Me!" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. CHILDHOOD WELLNESS AND HYGIENE DAYLIGHT STYLE: A cheerful, brightly illuminated health and wellness tabletop in daytime. Colorful wooden alphabet building blocks (A, B, C) beside a basket of fresh colorful fruits (red apples, bananas, blueberries), a child\'s blue toothbrush with foaming toothpaste, a jump rope, and a sparkling glass of clean water under morning sunlight. Palette: blocks cheerful primary colors, fruits vivid red and yellow, toothbrush sky blue, and tabletop clean white. Childhood health, personal hygiene, active lifestyle, nutrition habits, vibrant and educational. STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. Aspect ratio 2:3 vertical book jacket.'
)

if __name__ == '__main__':
    res = create_and_produce_cover(2655, brief, 'ABCs Healthy Me pediatric health nutrition exercise toothbrush fruits')
    print("SUCCESS:", res)
