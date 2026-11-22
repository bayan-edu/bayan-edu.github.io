import sys
sys.path.append('tools')
from canva_pipeline import create_and_produce_cover

brief = (
    'Book cover design titled "Reduce Waste". The title "Reduce Waste" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. CIRCULAR SUSTAINABILITY DAYLIGHT STYLE: A cheerful, sunlit community garden and sustainability hub in full daylight. Neatly arranged color-coded recycling and composting bins (paper, glass, compost) alongside reusable canvas tote bags, stainless steel water bottles, and rich dark organic compost nurturing healthy green tomato seedlings in clay pots under a bright sunny sky. Palette: recycling bins bright green, yellow and blue, garden plants fresh emerald, and sky cheerful cyan. Waste reduction, recycling, composting, environmental sustainability, proactive and educational. STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. Aspect ratio 2:3 vertical book jacket.'
)

if __name__ == '__main__':
    res = create_and_produce_cover(2465, brief, 'Reduce Waste recycling circular economy compost reusable ecology')
    print("SUCCESS:", res)
