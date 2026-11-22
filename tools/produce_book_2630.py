import sys
sys.path.append('tools')
from canva_pipeline import create_and_produce_cover

brief = (
    'Book cover design titled "Together We\'re Strong". The title "Together We\'re Strong" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. SOUTH AFRICAN HERITAGE AND UNITY STYLE: A sunlit, dignified historical tribute in bright daylight. In the foreground, a vibrant, majestic King Protea flower (South Africa\'s national flower) blooming in full glory, beside a nurse\'s vintage stethoscope, open books of justice and education, and a colorful woven African textile quilt of unity, with Table Mountain glowing softly under a bright golden sunrise. Palette: King Protea petals rich rose-pink and cream, African textiles emerald, saffron and cobalt, and morning sunrise golden amber. South African history, courage and solidarity, nurse\'s healing legacy, inspiring and educational. STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. Aspect ratio 2:3 vertical book jacket.'
)

if __name__ == '__main__':
    res = create_and_produce_cover(2630, brief, 'Together Strong South Africa freedom struggle protea flowers unity books')
    print("SUCCESS:", res)
