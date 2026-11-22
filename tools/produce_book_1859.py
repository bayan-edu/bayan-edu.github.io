import sys
sys.path.append('tools')
from canva_pipeline import create_and_produce_cover

brief = (
    'Book cover design titled "The Atacama Desert". The title "The Atacama Desert" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. HYPER-ARID DESERT GEOLOGY & RADIO ASTRONOMY DAYLIGHT STYLE: A sun-drenched, alien-like landscape of the Atacama Desert in Chile under brilliant, cloudless cobalt-blue skies. In the foreground, crystalline salt polygons on the vast Salar de Atacama salt flats, and dramatic wind-carved red clay geological formations in the Valley of the Moon. In the background, soaring snow-dusted Andean volcanoes (Licancabur) and precision white high-altitude ALMA radio telescope parabolic antennas pointing toward the clear sky. Palette: desert red clay terracotta, salt polygon crystal white, volcano basalt, and deep cobalt desert sky blue. Desert geomorphology, Atacama hyper-aridity, radio astronomy, ALMA observatory, Earth extremes, magnificent and educational. STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. Aspect ratio 2:3 vertical book jacket.'
)

if __name__ == '__main__':
    res = create_and_produce_cover(1859, brief, 'The Atacama Desert hyper arid desert geology ALMA astronomy Chile')
    print("SUCCESS:", res)
