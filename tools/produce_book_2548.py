import sys
sys.path.append('tools')
from canva_pipeline import create_and_produce_cover

brief = (
    'Book cover design titled "Telephones - Bell to Cell". The title "Telephones - Bell to Cell" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. HISTORY OF TELECOMMUNICATIONS STYLE: A bright, sunlit historical evolution timeline across a polished oak table. An authentic 1890s brass-and-wood candlestick telephone with earpiece, transitioning through a 1950s classic black rotary dial phone, an early 1980s cellular brick phone with antenna, and a sleek modern smartphone with glowing holographic communication signal waves. Palette: candlestick brass gold, rotary phone classic black, smartphone reflective glass, and oak table warm amber. Telecommunications history, acoustic innovation, radio cellular technology, fascinating and educational. STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. Aspect ratio 2:3 vertical book jacket.'
)

if __name__ == '__main__':
    res = create_and_produce_cover(2548, brief, 'Telephones Bell to Cell telecommunications antique candlestick smartphone')
    print("SUCCESS:", res)
