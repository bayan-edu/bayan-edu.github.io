import sys
sys.path.append('tools')
from canva_pipeline import create_and_produce_cover

brief = (
    'Book cover design titled "Weaving History: How Binary Coding Transformed the World". The title "Weaving History" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. HISTORY OF COMPUTING & JACQUARD LOOM STYLE: A bright, sunlit nineteenth-century textile workshop in morning daylight. An intricate wooden Jacquard mechanical loom with endless punched cardboard cards linked together by cords, weaving an exquisite silk brocade tapestry, showing how binary holes (1s and 0s) directed the loom hooks, seamlessly transitioning into modern glowing computer binary code. Palette: loom polished oak and walnut wood, punch cards warm parchment ivory, silk fabric rich royal blue and gold, and binary code glowing amber. History of computing, binary code, Jacquard loom, technology evolution, scholarly, elegant and educational. STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. Aspect ratio 2:3 vertical book jacket.'
)

if __name__ == '__main__':
    res = create_and_produce_cover(2403, brief, 'Weaving History Binary Coding Jacquard loom punch cards computer origin')
    print("SUCCESS:", res)
