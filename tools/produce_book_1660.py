import sys
sys.path.append('tools')
from canva_pipeline import create_and_produce_cover

brief = (
    'Book cover design titled "How Do You Measure a Horse\'s Height?". The title "How Do You Measure a Horse?" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. TRADITIONAL EQUINE MEASUREMENT & VETERINARY STYLE: A clean, sunlit stable barnyard on a bright sunny morning. In the center foreground, a traditional brass-and-wood horse measuring standard cane with a horizontal crossbar and built-in spirit level. Beside it, a majestic, calm thoroughbred horse standing square on level ground, with an educational measurement indicator pointing to the highest point of the withers. A visual measurement ruler explaining the traditional unit of "Hands" (1 hand = 4 inches = 10.16 cm) with conversion to centimeters. Palette: polished brass gold, honey oak wood, chestnut horse brown, stable lawn green, and bright sunny sky. Equine science, traditional units of measure, veterinary biology, hands and withers, clear and educational. STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. Aspect ratio 2:3 vertical book jacket.'
)

if __name__ == '__main__':
    res = create_and_produce_cover(1660, brief, 'Measure a Horses Height equine measurement hands withers')
    print("SUCCESS:", res)
