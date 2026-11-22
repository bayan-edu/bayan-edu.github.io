import sys
sys.path.append('tools')
from canva_pipeline import create_and_produce_cover

brief = (
    'Book cover design titled "Salt: The Rock We Eat". The title "Salt: The Rock We Eat" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. HALITE MINERALOGY AND SALT EVAPORATION DAYLIGHT STYLE: A sun-drenched, radiant natural salt flat landscape in full daylight. In the foreground, a stunning collection of translucent cubic halite salt crystals reflecting sunlight with rainbow prismatic refractions, beside a ceramic pinch bowl of flaky gourmet sea salt and a cubic molecular ball-and-stick model of NaCl (sodium chloride). In the background, geometric salt evaporation ponds glistening with pastel pink and turquoise brine under a bright sunny sky. Palette: salt crystals sparkling white and translucent ice, brine ponds pastel rose and aquamarine, and sky brilliant azure. Mineralogy, food chemistry, crystalline physics, ancient geology, crisp, sparkling and educational. STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. Aspect ratio 2:3 vertical book jacket.'
)

if __name__ == '__main__':
    res = create_and_produce_cover(2395, brief, 'Salt Rock We Eat halite mineral crystals sodium chloride salt flats')
    print("SUCCESS:", res)
