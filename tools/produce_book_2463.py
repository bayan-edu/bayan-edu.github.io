import sys
sys.path.append('tools')
from canva_pipeline import create_and_produce_cover

brief = (
    'Book cover design titled "How Heavy is Air?". The title "How Heavy is Air?" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. ATMOSPHERIC PRESSURE PHYSICS DAYLIGHT STYLE: A sunlit classroom physics laboratory on a clear bright day. A brass balance scale demonstrating the weight of air: one pan holds an inflated red balloon pulling down against an empty deflated balloon, beside a glass mercury barometer, an inverted cup holding water with a flat card resisting gravity (atmospheric pressure demonstration), and clean diagrams of the air column pressing down on Earth. Palette: brass scales gleaming gold, balloon vivid red, lab glassware sparkling clear, and window daylight bright white. Physics of gases, atmospheric pressure, air mass, density, hands-on and educational. STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. Aspect ratio 2:3 vertical book jacket.'
)

if __name__ == '__main__':
    res = create_and_produce_cover(2463, brief, 'How Heavy is Air atmospheric pressure barometer balance scales physics')
    print("SUCCESS:", res)
