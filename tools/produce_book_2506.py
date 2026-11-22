import sys
sys.path.append('tools')
from canva_pipeline import create_and_produce_cover

brief = (
    'Book cover design titled "The Go-Kart". The title "The Go-Kart" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. KARTING MECHANICAL ENGINEERING DAYLIGHT STYLE: A sunlit workshop pit lane on a bright sunny morning. In the center, a gleaming red-and-white youth racing go-kart with a welded tubular steel chassis, wide slick racing tires, a compact four-stroke engine with chrome exhaust, and a sporty steering wheel, with mechanical wrenches and tire pressure gauges resting on a tool cart. Asphalt racing track in the background under blue skies. Palette: kart chassis racing red and white, tires matte black, track asphalt charcoal, and sky sunny blue. Mechanical engineering, automotive mechanics, kart racing physics, exciting and educational. STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. Aspect ratio 2:3 vertical book jacket.'
)

if __name__ == '__main__':
    res = create_and_produce_cover(2506, brief, 'The Go-Kart karting mechanical engineering chassis wheels steering racetrack')
    print("SUCCESS:", res)
