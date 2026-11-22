import sys
sys.path.append('tools')
from canva_pipeline import create_and_produce_cover

brief = (
    'Book cover design titled "Recycling & Conservation: Recycling -- How It Works". The title "How Recycling Works" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. MATERIALS RECOVERY FACILITY & SORTING SCIENCE DAYLIGHT STYLE: A brightly lit, clean modern recycling recovery facility in daylight. In the center, an organized sorting conveyor system demonstrating mechanical separation: magnetic pulleys pulling steel cans, optical air-jet sensors sorting clear PET plastic bottles, and eddy current rotors bouncing aluminum cans into recycling bins. Neat stacks of sorted colored raw plastic pellets (nurdles), compressed aluminum cubes, and shredded paper ready for remanufacturing. Palette: recycling clover green, plastic bottle clear cyan, aluminum silver, and clean industrial white. Recycling technology, materials recovery, mechanical sorting, circular economy, bright, engaging, and educational. STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. Aspect ratio 2:3 vertical book jacket.'
)

if __name__ == '__main__':
    res = create_and_produce_cover(1746, brief, 'Recycling How It Works materials recovery sorting process')
    print("SUCCESS:", res)
