import sys
sys.path.append('tools')
from canva_pipeline import create_and_produce_cover

brief = (
    'Book cover design titled "Sensing the World Around Us". The title "Sensing the World Around Us" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. THE FIVE SENSES NATURE DAYLIGHT STYLE: A vibrant, sun-drenched montage of sensory wonders in nature. A prism splitting sunlight into a rainbow (Sight), a tuning fork vibrating water drops with sound ripples (Hearing), a fragrant pink rose with morning dew (Smell), a ripe sliced strawberry dripping sweet juice (Taste), and a soft fluffy velvet rabbit ear and smooth river stone (Touch). Palette: rainbow spectral hues, strawberry ruby red, rose petals soft pink, and sunlight radiant warm gold. Sensory neuroscience, human biology, perception, nature exploration, rich, tactile and educational. STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. Aspect ratio 2:3 vertical book jacket.'
)

if __name__ == '__main__':
    res = create_and_produce_cover(2466, brief, 'Sensing the World Around Us five senses sight hearing touch smell taste')
    print("SUCCESS:", res)
