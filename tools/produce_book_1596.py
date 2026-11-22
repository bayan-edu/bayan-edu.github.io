import sys
sys.path.append('tools')
from canva_pipeline import create_and_produce_cover

brief = (
    'Book cover design titled "The Earth\'s Moon: In Depth". The title "The Earth\'s Moon: In Depth" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. HIGH-RESOLUTION LUNAR ASTRONOMY STYLE: A majestic, high-detail view of Earth\'s Moon in space, brilliantly illuminated by sunlight. Crisp, razor-sharp details of impact craters (Tycho with bright radiating ejecta rays, Copernicus, and crater rims casting dramatic shadows). Smooth dark basaltic lunar maria (Sea of Tranquility) contrasting with bright mountainous lunar highlands. A modern robotic lunar rover exploring dusty regolith in the foreground, with the beautiful blue-and-white marble of Earth rising gently in the distant background. Palette: lunar silver, titanium grey, deep space black, radiant solar white, and Earth marble blue. Lunar astronomy, space exploration, planetary geology, crater formation, majestic and educational. STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. Aspect ratio 2:3 vertical book jacket.'
)

if __name__ == '__main__':
    res = create_and_produce_cover(1596, brief, 'The Earths Moon In Depth lunar astronomy geology craters')
    print("SUCCESS:", res)
