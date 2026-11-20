import sys
sys.path.append('tools')
from canva_pipeline import create_and_produce_cover

brief = (
    'Book cover design titled "White Flowers for the Date Trees". '
    'The title "White Flowers for the Date Trees" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. '
    'BRIGHT TRADITIONAL PALM OASIS BOTANY DAYLIGHT STYLE: A sun-drenched, radiant date palm grove on a fresh spring morning with golden sunbeams filtering through tall emerald fronds. '
    'In the center foreground, a traditional woven palm-frond basket resting on a rustic wooden bench, overflowing with delicate, fragrant cream-white date palm pollen flower clusters, lightly dusted with golden-yellow pollen grain. '
    'Behind the basket, majestic tall date palm trunks rise gracefully toward a brilliant clear blue morning sky. '
    'Palette: lush palm green, delicate cream white, golden pollen yellow, warm woven fiber tan, and bright sky blue. '
    'Botanical, bright, educational, vivid, completely daylight. '
    'STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. '
    'NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. '
    'Aspect ratio 2:3 vertical book jacket.'
)

if __name__ == '__main__':
    res = create_and_produce_cover(677, brief, "White Flowers for the Date Trees")
    print("SUCCESS:", res)
