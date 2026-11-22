import sys
sys.path.append('tools')
from canva_pipeline import create_and_produce_cover

brief = (
    'Book cover design titled "Match Maker". The title "Match Maker" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. VIBRANT CHEMICAL COMBUSTION SCIENCE STYLE: A bright, modern chemistry exploration bench bathed in natural daylight. In the center foreground, colorful wooden safety matches with vibrant red, sulfur yellow, and cobalt blue tips fanned out neatly in a circle. A vintage illustrated cardboard matchbox with a striking red phosphorus striking strip. Beside them, molecular ball-and-stick models of phosphorus (P4) and sulfur molecules, and clean educational vector diagrams illustrating friction-induced ignition chemistry. Palette: bright flame orange, sulfur yellow, crimson red, pine wood cream, and cobalt blue. Chemistry of fire, safety inventions, industrial chemistry, bright, cheerful, educational. STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. Aspect ratio 2:3 vertical book jacket.'
)

if __name__ == '__main__':
    res = create_and_produce_cover(1557, brief, 'Match Maker chemistry of combustion matches')
    print("SUCCESS:", res)
