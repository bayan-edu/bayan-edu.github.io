import sys
sys.path.append('tools')
from canva_pipeline import create_and_produce_cover

brief = (
    'Book cover design titled "Teff, the Ancient Grain of Ethiopia". The title "Teff: Ancient Grain of Ethiopia" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. ETHIOPIAN HIGHLAND AGRONOMY & ANCIENT BOTANY DAYLIGHT STYLE: A sun-drenched agricultural landscape in the Ethiopian highlands on a glorious sunny morning. In the foreground, graceful, delicate flowering panicles of teff grass (Eragrostis tef) with golden seed heads swaying gently in the breeze. On a rustic woven Ethiopian basket tray: tiny, nutritious reddish-brown and ivory teff grains, a clay grinding stone, and fresh injera flatbread. Rolling green terraced volcanic hills and acacia trees under a brilliant sunny blue sky. Palette: teff grain warm terracotta and ivory, grass golden-green, highland terrace emerald, and sunny sky blue. Agricultural botany, ancient grains, agronomy, food security, Ethiopian history, wholesome, scenic, and educational. STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. Aspect ratio 2:3 vertical book jacket.'
)

if __name__ == '__main__':
    res = create_and_produce_cover(1871, brief, 'Teff Ancient Grain Ethiopia agricultural botany agronomy gluten free')
    print("SUCCESS:", res)
