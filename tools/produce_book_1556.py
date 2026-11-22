import sys
sys.path.append('tools')
from canva_pipeline import create_and_produce_cover

brief = (
    'Book cover design titled "Louis Braille". The title "Louis Braille" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. TACTILE LITERACY & HISTORIC SCHOLAR DESK DAYLIGHT STYLE: A sunlit 19th-century educational study bathed in gentle morning sunlight. In the center foreground, heavy embossed cream paper showing prominent, raised six-dot Braille alphabet cells arranged in crisp geometric grids. A historic brass Braille slate frame with rectangular cell guides and an elegant wooden-handled metal stylus resting beside open leather-bound embossed volumes. A brass magnifying glass, a glass inkpot, and warm sunbeams grazing across the tactile embossed dots, creating soft, clear tactile shadows. Palette: warm cream parchment, polished walnut wood, brass gold, and soft morning sky blue. Literacy, tactile communication, perseverance, human ingenuity, peaceful and inspiring. STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. Aspect ratio 2:3 vertical book jacket.'
)

if __name__ == '__main__':
    res = create_and_produce_cover(1556, brief, 'Louis Braille tactile alphabet reading invention')
    print("SUCCESS:", res)
