import sys
sys.path.append('tools')
from canva_pipeline import create_and_produce_cover

brief = (
    'Book cover design titled "Fossils: Tales of Long Ago". '
    'The title "Fossils: Tales of Long Ago" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. '
    'BRIGHT PALEONTOLOGY & EARTH HISTORY DAYLIGHT STYLE: A sun-drenched paleontological field study site on a glorious sunny morning in bright daylight. '
    'In the center foreground, on a flat slab of limestone rock: an exquisite polished golden amber gemstone containing a prehistoric insect glowing in sunlight, a sharply defined black trilobite fossil, a carbonized delicate prehistoric fern frond imprint in slate, and a polished slice of petrified wood with rainbow agate rings. '
    'Beside the fossils rest a steel geological chisel and a camel-hair dusting brush with scattered rock dust. '
    'In the background, sunlit desert canyon cliffs and a brilliant azure sky. '
    'Palette: amber honey gold, trilobite charcoal, petrified wood agate rainbow, and sandstone ochre. '
    'Paleontology, fossils, earth history, geology, bright, educational, fascinating, completely daylight. '
    'STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. '
    'NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. '
    'Aspect ratio 2:3 vertical book jacket.'
)

if __name__ == '__main__':
    res = create_and_produce_cover(1029, brief, "Fossils: Tales of Long Ago")
    print("SUCCESS:", res)
