import sys
sys.path.append('tools')
from canva_pipeline import create_and_produce_cover

brief = (
    'Book cover design titled "Energy for Life". The title "Energy for Life" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. CELLULAR BIOENERGETICS STYLE: A luminous, high-detail scientific voyage inside a living cell in vibrant daylight. In the center, a cutaway of an active mitochondrion powerhouse with folded inner cristae membranes generating radiant golden adenosine triphosphate (ATP) molecules, with clean molecular diagrams linking sunlight photosynthesis in a green leaf to cellular glucose metabolism. Palette: ATP energy bursts radiant golden yellow, mitochondrion coral pink and magenta, leaf chloroplasts emerald green, and cellular cytoplasm translucent cyan. Biochemistry, cellular energy, ATP synthesis, biology of life, brilliant and educational. STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. Aspect ratio 2:3 vertical book jacket.'
)

if __name__ == '__main__':
    res = create_and_produce_cover(2385, brief, 'Energy for Life cellular respiration ATP mitochondria glucose sunlight')
    print("SUCCESS:", res)
