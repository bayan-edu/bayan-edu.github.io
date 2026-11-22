import sys
sys.path.append('tools')
from canva_pipeline import create_and_produce_cover

brief = (
    'Book cover design titled "Monumental Maths". The title "Monumental Maths" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. BRIGHT ANCIENT EGYPTIAN GEOMETRY & PYRAMID MATH DAYLIGHT STYLE: A sun-drenched architectural drafting table overlooking the Pyramids of Giza in bright morning daylight. In the center foreground, ancient Egyptian royal cubit measuring rods made of polished wood, brass drafting divider calipers, and papyrus scrolls showing geometric calculations, golden ratio spirals, and right-triangle slope diagrams (seked). Through sunny windows, the majestic Great Pyramid of Giza rises proudly against a cloudless turquoise sky. Palette: papyrus parchment warm gold, brass calipers polished gold, pyramid limestone cream, and desert sky turquoise cyan. Ancient mathematics, Egyptian geometry, pyramid construction, architectural history, fascinating, bright, educational, completely daylight. STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. Aspect ratio 2:3 vertical book jacket.'
)

if __name__ == '__main__':
    res = create_and_produce_cover(1494, brief, 'Monumental Maths')
    print("SUCCESS:", res)
