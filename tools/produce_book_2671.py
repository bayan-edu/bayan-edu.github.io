import sys
sys.path.append('tools')
from canva_pipeline import create_and_produce_cover

brief = (
    'Book cover design titled "Counting on Moru". The title "Counting on Moru" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. NATURE ARITHMETIC FAIRYTALE DAYLIGHT STYLE: A sun-soaked forest clearing in India on a bright morning. A magnificent wild peacock (Moru) proudly displaying its fan of iridescent train feathers, each feather featuring a distinct glowing "eye" spot (ocellus), with clean educational numbers gently counting each eye spot (1, 2, 3... 10) in cheerful typography, surrounded by flowering wild jasmine. Palette: peacock feathers iridescent sapphire, emerald and gold, jasmine white, and morning sunlight golden. Early numeracy, counting in nature, peacock biology, joyous and educational. STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. Aspect ratio 2:3 vertical book jacket.'
)

if __name__ == '__main__':
    res = create_and_produce_cover(2671, brief, 'Counting on Moru animal arithmetic counting peacock feathers nature math')
    print("SUCCESS:", res)
