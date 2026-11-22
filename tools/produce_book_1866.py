import sys
sys.path.append('tools')
from canva_pipeline import create_and_produce_cover

brief = (
    'Book cover design titled "Chasing Dreams on Cloud Nine". The title "Chasing Dreams on Cloud Nine" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. METEOROLOGICAL CLOUD ATLAS & CUMULONIMBUS STYLE: A sun-drenched, awe-inspiring view of the atmosphere on a bright summer afternoon. In the center, a colossal, majestic Cumulonimbus calvus cloud (historically Cloud 9 in meteorological cloud classification) billowing miles into a brilliant azure sky, its pure white towers catching radiant golden sunbeams. Below, a sleek solar-powered research glider aircraft soaring peacefully along thermal updrafts above rolling green hills. Palette: cloud billow pure white and silver, sky brilliant cobalt cyan, sunbeam radiant gold, and meadow emerald green. Meteorology, cloud classification, atmospheric physics, soaring flight, wondrous, bright, and educational. STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. Aspect ratio 2:3 vertical book jacket.'
)

if __name__ == '__main__':
    res = create_and_produce_cover(1866, brief, 'Cloud Nine meteorology cumulonimbus cloud classification')
    print("SUCCESS:", res)
