import sys
sys.path.append('tools')
from canva_pipeline import create_and_produce_cover

brief = (
    'Book cover design titled "Mangalyaan: A Journey to Mars". The title "Mangalyaan: A Journey to Mars" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. BRIGHT MARS ORBITER MISSION (MOM) DAYLIGHT STYLE: An awe-inspiring, sun-illuminated space encounter in brilliant cosmic daylight. In the center foreground, the Indian Space Research Organisation (ISRO) Mangalyaan spacecraft with its golden Kapton thermal foil body, extended solar panel wings, and large high-gain parabolic antenna in sharp detail. Below the orbiter, the rust-red, cratered surface of Mars displays the towering volcano Olympus Mons and Valles Marineris canyon under the warm light of the golden Sun. Palette: spacecraft gold foil and solar blue, Mars surface rust terracotta and ochre, and cosmic space deep indigo with solar flare. Space exploration, Mars Orbiter Mission, ISRO Mangalyaan, interplanetary science, inspiring, bright, educational. STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. Aspect ratio 2:3 vertical book jacket.'
)

if __name__ == '__main__':
    res = create_and_produce_cover(1492, brief, 'Mangalyaan A Journey to Mars')
    print("SUCCESS:", res)
