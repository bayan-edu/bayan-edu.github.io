import sys
sys.path.append('tools')
from canva_pipeline import create_and_produce_cover

brief = (
    'Book cover design titled "Keya\'s Day at the Beach". The title "A Day at the Beach" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. COASTAL SHORELINE & TIDE POOL EXPLORATION SUNNY STYLE: A sun-drenched, cheerful sandy beach and tide pool on a glorious summer morning. In the center foreground, a glistening, clear seawater tidal pool surrounded by polished granite stones and colorful treasures: a spiraling pink conch shell, a striped scallop shell, an orange starfish, and a small hermit crab peeking curiously out of a periwinkle shell. Gentle turquoise waves lapping against the white sand shore, with sea oats on sand dunes and seagulls soaring under a bright blue sky. Palette: sand warm golden buff, ocean clear turquoise aquamarine, shell coral pink, and sunny sky blue. Coastal ecology, tide pool life, malacology, beach discovery, joyful, bright, and educational. STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. Aspect ratio 2:3 vertical book jacket.'
)

if __name__ == '__main__':
    res = create_and_produce_cover(1920, brief, 'Beach tidal ecology shells coastal shoreline crabs marine')
    print("SUCCESS:", res)
