import sys
sys.path.append('tools')
from canva_pipeline import create_and_produce_cover

brief = (
    'Book cover design titled "The Amazing Migration of Sea Turtles". The title "The Amazing Migration of Sea Turtles" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. BRIGHT SEA TURTLE HATCHLING MIGRATION DAYLIGHT STYLE: A sun-drenched tropical sandy beach at dawn meeting calm turquoise ocean waves in bright daylight. In the center foreground, several tiny, adorable green sea turtle hatchlings scurrying bravely across warm golden sand toward the sparkling morning surf. In the clear turquoise water, sunlight rays guide them into the deep blue ocean current where adult sea turtles glide gracefully over coral reefs. Palette: sand warm golden ochre, ocean sparkling turquoise and sapphire, turtle shell olive and cream, and morning sun radiant gold. Marine biology, sea turtle migration, ocean survival, wildlife conservation, inspiring, bright, educational, completely daylight. STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. Aspect ratio 2:3 vertical book jacket.'
)

if __name__ == '__main__':
    res = create_and_produce_cover(1477, brief, 'The Amazing Migration of Sea Turtles')
    print("SUCCESS:", res)
