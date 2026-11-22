import sys
sys.path.append('tools')
from canva_pipeline import create_and_produce_cover

brief = (
    'Book cover design titled "Know Your Body Through Rhymes". The title "Know Your Body Through Rhymes" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. FRIENDLY HUMAN ANATOMY DAYLIGHT STYLE: A cheerful, brightly illuminated science classroom workbench in daytime. Colorful, friendly wooden educational model organs: a healthy beating heart model, a model of the lungs, and an eye model, beside a stethoscope, a measuring chart, colorful fresh fruits (apples, oranges, berries), and playful musical notes floating through the sunlit air. Palette: organ models cheerful coral, sky blue and mint green, fruits bright orange and ruby, and workbench light birch. Human body awareness, health, sensory organs, playful and educational. STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. Aspect ratio 2:3 vertical book jacket.'
)

if __name__ == '__main__':
    res = create_and_produce_cover(2450, brief, 'Know Your Body Through Rhymes human anatomy organs senses health')
    print("SUCCESS:", res)
