import sys
sys.path.append('tools')
from canva_pipeline import create_and_produce_cover

brief = (
    'Book cover design titled "DIVE!". The title "DIVE!" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. TROPICAL UNDERWATER REEF EXPLORATION STYLE: An exhilarating underwater panoramic view looking upward toward sun-dappled surface waves. Shafts of brilliant midday sunlight penetrating down into crystal-clear turquoise waters, illuminating a thriving coral reef pinnacle swarming with schools of colorful anthias, clownfish darting among sea anemones, and a graceful spotted eagle ray gliding effortlessly through the blue. Palette: ocean water crystalline turquoise and deep cerulean, corals vibrant coral-pink and yellow, and sunbeams radiant gold. Marine biology, coral reef ecology, ocean diving, dynamic, refreshing and educational. STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. Aspect ratio 2:3 vertical book jacket.'
)

if __name__ == '__main__':
    res = create_and_produce_cover(2287, brief, 'DIVE ocean coral reef marine life underwater sunlight tropical fish')
    print("SUCCESS:", res)
