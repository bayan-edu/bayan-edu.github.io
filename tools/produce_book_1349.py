import sys
sys.path.append('tools')
from canva_pipeline import create_and_produce_cover

brief = (
    'Book cover design titled "Literature: Round the World in Eighty Days". The title "Round the World in Eighty Days" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. BRIGHT VICTORIAN GLOBAL TRAVEL DAYLIGHT STYLE: A sunlit, inspiring Victorian gentleman\'s travel study in bright natural daylight. In the center foreground, a large ornate polished brass desk globe with travel route lines connecting London, Suez, India, and Yokohama. Beside the globe rest an antique gold pocket watch with ticking second hand, a brass navigation compass, rolled train timetables, and miniature models of an iron steam locomotive and paddle steamship. Through sunny windows in the background, a colorful hot-air balloon drifts across a bright blue sky. Palette: brass polished gold, globe ocean sapphire, leather warm tan, and sky brilliant daylight cyan. Classic literature, world travel, Victorian adventure, Jules Verne, bright, inspiring, educational, completely daylight. STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. Aspect ratio 2:3 vertical book jacket.'
)

if __name__ == '__main__':
    res = create_and_produce_cover(1349, brief, 'Literature Round the World in Eighty Days')
    print("SUCCESS:", res)
