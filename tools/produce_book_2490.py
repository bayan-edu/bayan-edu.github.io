import sys
sys.path.append('tools')
from canva_pipeline import create_and_produce_cover

brief = (
    'Book cover design titled "At Least I\'m Okay!". The title "At Least I\'m Okay!" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. RESILIENCE IN NATURE DAYLIGHT STYLE: A cheerful, sun-soaked meadow sidewalk crack where a resilient, bright yellow dandelion flower is flourishing proudly through a small crack in the stone pavement, its bright golden petals soaking up morning sunshine while its feathery white seeds float gracefully into the warm breeze toward green rolling hills. A friendly ladybug resting on its green leaf. Palette: dandelion flower vibrant golden yellow, sidewalk stone warm grey, meadow green, and sky sunny blue. Emotional resilience, growth mindset, optimism, nature\'s perseverance, uplifting and educational. STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. Aspect ratio 2:3 vertical book jacket.'
)

if __name__ == '__main__':
    res = create_and_produce_cover(2490, brief, 'At Least Im Okay resilience growth mindset sunny meadow dandelion bloom')
    print("SUCCESS:", res)
