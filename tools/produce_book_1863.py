import sys
sys.path.append('tools')
from canva_pipeline import create_and_produce_cover

brief = (
    'Book cover design titled "Tiger Tale". The title "Tiger Tale" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. MAJESTIC BENGAL TIGER CONSERVATION SUNNY SANCTUARY STYLE: A sun-drenched, golden grassland and sal forest clearing in an Indian national park on a bright morning. In the center foreground, a magnificent, healthy royal Bengal tiger with striking orange-and-black striped coat and white facial markings walking powerfully through tall golden grass. Sunbeams filter through leafy teak branches, illuminating water droplets on a clear forest watering hole where spotted chital deer drink peacefully in the distance. A wooden tiger conservation preserve boundary marker under a clear sunny sky. Palette: tiger coat fiery orange and lacquer black, grass golden amber, teak leaves deep green, and sunny sky blue. Big cat conservation, Bengal tiger, apex predators, Asian wildlife, tropical deciduous forest ecology, majestic and educational. STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. Aspect ratio 2:3 vertical book jacket.'
)

if __name__ == '__main__':
    res = create_and_produce_cover(1863, brief, 'Tiger Tale Bengal tiger conservation big cat wildlife sanctuary')
    print("SUCCESS:", res)
