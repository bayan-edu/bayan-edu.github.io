import sys
sys.path.append('tools')
from canva_pipeline import create_and_produce_cover

brief = (
    'Book cover design titled "Race to Town". The title "Race to Town" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. MOUNTAIN CYCLING TRAIL DAYLIGHT STYLE: A sunlit, winding gravel mountain trail descending toward a picturesque valley town on a sunny day. In the foreground, a modern high-performance mountain bike leaning against a rustic wooden trail sign, with clean disc brakes, knobby off-road tires, and a safety helmet resting on handlebars, overlooking the sunlit rooftops of the village below nestled among green hills. Palette: bicycle frame racing yellow and teal, trail earth warm gravel tan, evergreen trees forest green, and sky bright blue. Mountain cycling, trail navigation, kinetic sports physics, exciting and educational. STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. Aspect ratio 2:3 vertical book jacket.'
)

if __name__ == '__main__':
    res = create_and_produce_cover(2594, brief, 'Race to Town mountain bicycle gravel trail downhill pine forest daylight')
    print("SUCCESS:", res)
