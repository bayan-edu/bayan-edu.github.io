import sys
sys.path.append('tools')
from canva_pipeline import create_and_produce_cover

brief = (
    'Book cover design titled "Protecting Sea Turtles, Seals, and Birds in Hawaii". The title "Protecting Sea Turtles, Seals, and Birds in Hawaii" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. HAWAIIAN WILDLIFE SANCTUARY DAYLIGHT STYLE: A sun-drenched, pristine tropical beach in the Hawaiian Islands on a gorgeous sunny day. In the foreground, an endangered Hawaiian monk seal basking peacefully on black volcanic sand and golden dunes beside an adult green sea turtle (honu) resting by the tide. In the air above, a graceful Laysan albatross soaring over turquoise Pacific waves crashing softly against lush green volcanic headlands. Palette: Pacific ocean crystalline turquoise, black and gold beach sand, monk seal silver-grey coat, and sunny sky cyan. Island ecology, marine species conservation, wildlife sanctuaries, paradise daylight, inspiring and educational. STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. Aspect ratio 2:3 vertical book jacket.'
)

if __name__ == '__main__':
    res = create_and_produce_cover(1999, brief, 'Protecting Hawaiian wildlife monk seal sea turtle albatross conservation')
    print("SUCCESS:", res)
