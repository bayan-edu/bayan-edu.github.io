import sys
sys.path.append('tools')
from canva_pipeline import create_and_produce_cover

brief = (
    'Book cover design titled "Horses Come in 3 Basic Body Types". The title "Horses: 3 Basic Body Types" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. EQUINE CONFORMATION & BREED COMPARISON SUNNY PASTURE STYLE: A picturesque, sun-drenched green paddock pasture on a beautiful morning. Side-by-side standing conformation profiles of the three fundamental horse body types: a massive, muscular Draft horse (Clydesdale with feathered hooves), an elegant, refined Light riding horse (Arabian/Thoroughbred with arched neck), and a sturdy, compact Pony (Shetland/Welsh pony with thick mane). Clean architectural measurement height lines and bone structure conformation callouts in the corner under a bright blue sky. Palette: draft horse bay brown, light horse chestnut gold, pony dapple grey, pasture grass green, and sunny sky blue. Equine anatomy, horse conformation, draft vs light vs pony, veterinary science, wholesome and educational. STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. Aspect ratio 2:3 vertical book jacket.'
)

if __name__ == '__main__':
    res = create_and_produce_cover(1712, brief, 'Horses 3 Basic Body Types equine conformation draft light pony')
    print("SUCCESS:", res)
