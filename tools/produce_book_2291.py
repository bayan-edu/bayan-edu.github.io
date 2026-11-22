import sys
sys.path.append('tools')
from canva_pipeline import create_and_produce_cover

brief = (
    'Book cover design titled "The Body Builders". The title "The Body Builders" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. HUMAN ANATOMY MUSCULOSKELETAL STYLE: A bright, sunlit sports science and human anatomy laboratory. In the center, a clean, high-precision anatomical model illustrating the human muscular system and skeletal frame working in perfect harmony, beside molecular models of protein amino acid chains, colorful healthy foods (legumes, nuts, grains), and athletic fitness equipment under bright daylight. Palette: muscular model healthy coral-red and white tendons, skeletal frame ivory, nutrition accents emerald and golden, and lab background bright white. Human physiology, muscle development, nutrition science, strength biology, inspiring and educational. STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. Aspect ratio 2:3 vertical book jacket.'
)

if __name__ == '__main__':
    res = create_and_produce_cover(2291, brief, 'The Body Builders human anatomy muscles skeleton nutrition protein cells')
    print("SUCCESS:", res)
