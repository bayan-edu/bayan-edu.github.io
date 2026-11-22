import sys
sys.path.append('tools')
from canva_pipeline import create_and_produce_cover

brief = (
    'Book cover design titled "Held Up". The title "Held Up" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. BRIGHT GEOTECHNICAL ENGINEERING & TOWER OF PISA DAYLIGHT STYLE: A sunlit, breathtaking architectural portrait of the Leaning Tower of Pisa in Italy in radiant daylight. In the center foreground, the iconic white marble campanile tower leaning gracefully on the lush green Campo dei Miracoli lawn under a clear blue sky. Clean, elegant engineering graphic diagrams demonstrate the geotechnical ground extraction drills, lead counterweights, and soil stabilization anchors that saved the monument. Palette: tower marble pristine white and cream, lawn vibrant emerald green, engineering graphics bright cyan and gold, and sky sunny azure. Civil engineering, geotechnical stabilization, Leaning Tower of Pisa, architectural history, bright, educational, completely daylight. STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. Aspect ratio 2:3 vertical book jacket.'
)

if __name__ == '__main__':
    res = create_and_produce_cover(1518, brief, 'Held Up')
    print("SUCCESS:", res)
