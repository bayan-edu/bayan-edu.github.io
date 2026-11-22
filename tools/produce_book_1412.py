import sys
sys.path.append('tools')
from canva_pipeline import create_and_produce_cover

brief = (
    'Book cover design titled "Reading: The Jungle Book". The title "The Jungle Book" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. BRIGHT SEEONEE HILLS WILDLIFE DAYLIGHT STYLE: A sun-drenched Indian jungle hill clearing in radiant morning daylight. In the center foreground, a noble wolf pack resting peacefully outside a mossy limestone cave entrance, with four playful wolf cubs tumbling joyfully in soft grass among tropical ferns and blooming white jasmine. Sunbeams pierce through the lush canopy of wild fig and banyan trees, illuminating the tranquil beauty of the jungle sanctuary under a clear sky. Palette: wolf coat silver and sable, foliage vibrant jade and emerald, jasmine white, and morning sun golden amber. Classic literature, Rudyard Kipling, wildlife of India, wolf pack sanctuary, majestic, bright, educational, completely daylight. STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. Aspect ratio 2:3 vertical book jacket.'
)

if __name__ == '__main__':
    res = create_and_produce_cover(1412, brief, 'Reading The Jungle Book')
    print("SUCCESS:", res)
