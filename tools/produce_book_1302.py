import sys
sys.path.append('tools')
from canva_pipeline import create_and_produce_cover

brief = (
    'Book cover design titled "Fake It ‘til You Make It!". The title "Fake It ‘til You Make It!" must appear boldly and cleanly at the top in friendly, modern, clear educational typography. BRIGHT TROPICAL SEABED MIMICRY DAYLIGHT STYLE: A sun-drenched, crystal-clear tropical coral reef seabed in bright turquoise daylight. In the center foreground, a fascinating mimic octopus (Thaumoctopus mimicus) actively morphing its brown-and-white banded arms to simulate the venomous spines of a lionfish over rippled golden seabed sand. Surrounding it are colorful brain corals, sea anemones, and sparkling rays of sunshine penetrating the pristine ocean water. Palette: octopus banded chestnut and cream, ocean sparkling turquoise, coral coral-pink, and sand sunny gold. Marine biology, animal mimicry, camouflage, cephalopod intelligence, bright, fascinating, educational, completely daylight. STRICT VISUAL CONSTRAINT: ABSOLUTELY NO HUMAN FACES OR PEOPLE. NO AUTHOR NAME: Do not write any author name or credit on the cover, leave the author field completely empty. Aspect ratio 2:3 vertical book jacket.'
)

if __name__ == '__main__':
    res = create_and_produce_cover(1302, brief, 'Fake It til You Make It')
    print("SUCCESS:", res)
