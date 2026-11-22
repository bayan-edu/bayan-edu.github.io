import sys
sys.path.append('tools')
from canva_pipeline import create_and_produce_cover

brief = (
    'Book cover design titled "Coastal Drilling in Sunny California". The title "Coastal Drilling in Sunny California" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. OFFSHORE ENERGY INFRASTRUCTURE DAYLIGHT STYLE: A sun-drenched coastal California seascape on a bright sunny morning. In the distance off the Pacific coast, an offshore oil drilling platform stands tall above rolling blue ocean swells, with clean educational cross-section diagrams showing subsea geological strata, drilling drillstrings, and environmental marine monitoring buoys. Pelicans flying overhead under sunny skies. Palette: Pacific ocean deep royal blue, platform steel slate grey and yellow safety accents, coastal cliffs warm terracotta, and sunny sky blue. Petroleum geology, energy infrastructure, offshore engineering, coastal science, balanced and educational. STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. Aspect ratio 2:3 vertical book jacket.'
)

if __name__ == '__main__':
    res = create_and_produce_cover(2336, brief, 'Coastal Drilling Sunny California offshore platform energy marine geology')
    print("SUCCESS:", res)
