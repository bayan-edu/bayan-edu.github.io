import sys
sys.path.append('tools')
from canva_pipeline import create_and_produce_cover

brief = (
    'Book cover design titled "Bonda and Devi". The title "Bonda and Devi" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. RURAL TRADITIONAL COMPANIONSHIP DAYLIGHT STYLE: A sun-soaked village courtyard in rural India in morning golden light. Two gentle, friendly native Indian humped calves (zebu) with smooth white and fawn coats adorned with handwoven colorful jute collars and brass bells, resting peacefully side-by-side in clean straw near a carved stone grain trough under a shady neem tree. Palette: calves fawn and pure white, woven collars saffron red and yellow, courtyard earth warm terracotta, and morning sunlight golden. Animal friendships, traditional agrarian culture, compassionate care, gentle and educational. STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. Aspect ratio 2:3 vertical book jacket.'
)

if __name__ == '__main__':
    res = create_and_produce_cover(2650, brief, 'Bonda and Devi Indian village friendship cows calves bells courtyard')
    print("SUCCESS:", res)
