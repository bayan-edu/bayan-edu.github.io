import sys
sys.path.append('tools')
from canva_pipeline import create_and_produce_cover

brief = (
    'Book cover design titled "The Wind Tower". '
    'The title "The Wind Tower" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. '
    'BRIGHT TRADITIONAL GULF ARCHITECTURE DAYLIGHT STYLE: A sun-drenched, radiant historic courtyard in the Arabian Gulf on a clear sunny morning under a deep azure sky. '
    'In the center foreground, a majestic traditional Barjeel wind tower built of warm earthen plaster and coral stone, with its four-directional open ventilation shafts and projecting timber poles. '
    'Beneath the wind tower, a tranquil stone-paved courtyard with a cool water fountain, ornate wooden mashrabiya lattice windows, and vibrant magenta bougainvillea flowers glowing in the bright morning sunlight. '
    'Palette: warm desert terracotta, sun-baked clay tan, brilliant azure sky, bougainvillea magenta, and cool shadow stone. '
    'Architectural heritage, bright, educational, vivid, completely daylight. '
    'STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. '
    'NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. '
    'Aspect ratio 2:3 vertical book jacket.'
)

if __name__ == '__main__':
    res = create_and_produce_cover(684, brief, "The Wind Tower")
    print("SUCCESS:", res)
